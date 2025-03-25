"use client";
import { useEffect, useState, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { YouTubeEmbed } from '@next/third-parties/google';
import Turnstile from "@/components/Turnstile";
import PricingPortal from "@/components/PricingPortal";
import SavedMindmaps from "@/components/SavedMindmaps";

export default function Home() {
  const { data: session } = useSession();
  const [isVerified, setIsVerified] = useState(false);
  const [htmlContent, setHtmlContent] = useState("12");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const editorRef = useRef<EditorView | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    if (!isMounted) return;
    if (!editorRef.current) {
      editorRef.current = new EditorView({
        parent: document.body,
        doc: htmlContent,
        extensions: [
          basicSetup,
          html(),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const newContent = update.state.doc.toString();
              setHtmlContent(newContent);
            }
          }),
        ],
      });
    }
    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
    const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const mindmapId = urlParams?.get("id");
    if (mindmapId) {
      loadSavedMindmap(mindmapId);
    } else {
      fetchHtmlContent();
    }
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("turnstile_verified");
      if (storedToken) {
        setIsVerified(true);
      }
    }
  }, []);

  const handleSave = async () => {
    if (!session?.user?.email) {
      console.error('User not authenticated');
      return;
    }
    setSaving(true);
    try {
      const currentHtml = editorRef.current?.state.doc.toString() || htmlContent;
      const urlParams = new URLSearchParams(window.location.search);
      const mindmapId = urlParams.get('id');
      const endpoint = mindmapId ? `/api/mindmaps/${mindmapId}` : '/api/mindmaps';
      const method = mindmapId ? 'PUT' : 'POST';
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Mindmap - ${new Date().toLocaleString()}`, 
          youtubeUrl: inputValue,
          htmlContent: currentHtml,
        }),
      });
      if (response.ok) {
        console.log('Mindmap saved:', await response.json());
      } else {
        console.error('Failed to save mindmap');
      }
    } catch (error) {
      console.error('Error saving mindmap:', error);
    } finally {
      setSaving(false);
    }
  };

  const fetchHtmlContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://yt2mapapi.blob.core.windows.net/html/test.html', { cache: 'no-store' });
      const text = await response.text();
      setHtmlContent(text);
      if (editorRef.current) {
        editorRef.current.dispatch({
          changes: { from: 0, to: editorRef.current.state.doc.length, insert: text },
        });
      }
    } catch (error) {
      console.error('Error fetching HTML content:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSavedMindmap = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/mindmaps/${id}`);
      if (response.ok) {
        const data = await response.json();
        setHtmlContent(data.htmlContent);
        setInputValue(data.metadata?.youtubeUrl || '');
        if (editorRef.current) {
          editorRef.current.dispatch({
            changes: { from: 0, to: editorRef.current.state.doc.length, insert: data.htmlContent },
          });
        }
      }
    } catch (error) {
      console.error('Error loading mindmap:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitWebhook = async () => {
    setLoading(true);
    try {
      const taskId = Math.random().toString(36).substring(2);
      const response = await fetch('/api/yt-transcript-webhook-old', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: inputValue, taskId }),
      });
      console.log("sent to taskade")
      if (response.ok) {
        // Increment chat usage count
        await fetch('/api/chat-usage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        await fetch('/api/webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ taskId }),
        });
        console.log("Webhook submitted successfully.");
        await checkTaskStatus(taskId);
      } else {
        console.error("Failed to submit webhook:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting webhook:", error);
    } finally {
      setLoading(false);
    }
  };
  const [currentStep, setCurrentStep] = useState('');
  const loadingMessages = [
    'Processing video transcript...',
    'Analyzing content structure...',
    'Generating mindmap layout...',
    'Optimizing node connections...',
    'Applying visual styles...',
    'Finalizing mindmap...'
  ];
  const [messageIndex, setMessageIndex] = useState(0);

  const checkTaskStatus = async (taskId: string, maxRetries = 20, interval = 5000) => {
    let attempts = 0;
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 10000);

    while (attempts < maxRetries) {
      try {
        const res = await fetch(`/api/webhook?taskId=${taskId}`);
        const data = await res.json();
        setCurrentStep(data.status);
        if (data.task.status == 'complete') {
          clearInterval(messageInterval);
          setLoading(false)
          console.log("Task completed");
          await new Promise(resolve => setTimeout(resolve, 2000));
          fetchHtmlContent();
      await fetch('/api/webhook', { method: 'POST' });
      return data.data;
        }
        await new Promise(resolve => setTimeout(resolve, interval));
        attempts++;
      } catch (error) {
        console.error("Error checking task status:", error);
        clearInterval(messageInterval);
      }
    }
    console.error("Task polling timed out.");
    clearInterval(messageInterval);
  };
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const enterFullscreen = () => {
    const iframe = iframeRef.current;
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };
  return (
    <div className="flex h-screen">
      <PricingPortal isOpen={showPricing} />
      {session && (
        <div className="w-64 bg-gray-100 p-4 border-r border-gray-300 overflow-y-auto">
          <SavedMindmaps />
        </div>
      )}
      <div className="flex-1 flex flex-col items-center pb-[80px]"> {/* Added padding-bottom for footer */}
        {/* Top section: Input and Controls */}
        <div className="w-full flex flex-col items-center justify-start pt-8 pb-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            Youtube to <span className="text-blue-600">MindMap</span>
          </h1>
          {!isVerified ? (
            <div className="flex flex-col items-center">
              <p className="mb-4 text-gray-600">Please complete the verification to continue</p>
              {(
                <Turnstile
                  onVerify={async () => {
                    try {
                      const response = await fetch("/api/chat-usage", {
                        method: "GET",
                      });
                      const data = await response.json();
                      if (data.usage_count > 3) {
                        setShowPricing(true);
                      } else {
                        setIsVerified(true);
                      }
                    } catch (error) {
                      console.error("Error updating usage count:", error);
                      setIsVerified(true);
                    }
                  }}
                />
              )}
            </div>
          ) : (
            <>
              <Input
                placeholder="Enter Youtube Link"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="pl-2 pr-2 w-1/2 justify-center mb-6"
              />
              <Button variant="outline" onClick={handleSubmitWebhook} disabled={loading}>
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Test Webhook"}
              </Button>
            </>
          )}
          {loading && (
            <div className="justify-center">
              <p>{loadingMessages[messageIndex]}</p>
              {currentStep && (
                <div className="mt-2 text-center">
                  <p className="text-sm text-gray-600 capitalize">{currentStep}</p>
                  <div className="w-64 h-2 bg-gray-200 rounded-full mt-2">
                  </div>
                </div>
              )}
            </div>
          )}
          {inputValue.includes("https://www.youtube.com/") && (
            <div className="justify-center mt-3">
              <YouTubeEmbed videoid={inputValue.split("=")[1]} height={8} />
              <iframe></iframe>
            </div>
          )}
        </div>

        {/* Middle section: Mindmap Iframe */}
        <iframe
          title="HTML Preview"
          style={{ width: "80%", height: "700px", border: "1px solid #ccc" }} // Kept height for visibility
          srcDoc={htmlContent}
          allowFullScreen
          className="mb-4 mt-4"
          ref={iframeRef}
        />

        {/* Bottom section: Buttons and Editor */}
        <div className="w-full flex flex-col items-center">
          <div className="flex space-x-2 mb-4">
            <Button variant="outline" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="animate-spin w-4 h-4" /> : 'Save Changes'}
            </Button>
            <Button variant="outline" onClick={enterFullscreen}>Go Fullscreen</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';