"use client";
import { useEffect, useState, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Save, LogOut } from "lucide-react";
import { YouTubeEmbed } from "@next/third-parties/google";
import { useSession, signOut } from "next-auth/react";
import SavedMindmaps from "@/components/SavedMindmaps";
import Turnstile from "@/components/Turnstile";
import PricingPortal from "@/components/PricingPortal";

interface ProgressData {
  message: string;
  status: string;
}

export default function Home() {
  const { data: session } = useSession();
  const [htmlContent, setHtmlContent] = useState("12");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [position, setPosition] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Add this to track client-side mounting

  // Ensure this runs only on the client side
  useEffect(() => {
    setIsMounted(true); // Mark as mounted when the component loads on the client
    const urlParams = new URLSearchParams(window.location.search);
    const mindmapId = urlParams.get("id");
    if (mindmapId) {
      loadSavedMindmap(mindmapId);
    }
    // Check for existing verification token only if mounted
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("turnstile_verified");
      if (storedToken) {
        setIsVerified(true);
      }
    }
  }, []);

  const loadSavedMindmap = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/mindmaps/${id}`);
      if (response.ok) {
        const data = await response.json();
        setHtmlContent(data.htmlContent);
      }
    } catch (error) {
      console.error("Error loading mindmap:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHtmlContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://yt2mapapi.blob.core.windows.net/html/test.html",
        {
          cache: "no-store",
        }
      );
      const text = await response.text();
      setHtmlContent(text);
    } catch (error) {
      console.error("Error fetching HTML content:", error);
    } finally {
      setLoading(false);
      setProgress(null);
    }
  };

  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // Cleanup previous instance
    if (viewRef.current) {
      viewRef.current.destroy();
    }

    // Create new instance
    viewRef.current = new EditorView({
      parent: editorRef.current,
      doc: htmlContent,
      extensions: [
        basicSetup,
        html(),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            setHtmlContent(update.state.doc.toString());
          }
        }),
      ],
    });

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [htmlContent]);


  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/yt-transcript-webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: inputValue,
        }),
      });
      if (response.ok) {
        const { taskId } = await response.json();
        let eventSource: EventSource | null = null;

        const checkQueuePosition = async () => {
          const queueResponse = await fetch(`/api/queue-position/${taskId}`, {
            cache: "no-store",
          });
          const queueData = await queueResponse.json();
          setPosition(queueData.position);
          if (queueData.position === 1) {
            clearInterval(intervalId);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            fetch("http://localhost:8000/process-queue");

            eventSource = new EventSource(`http://localhost:8000/sse/${taskId}`);
            eventSource.onmessage = (event) => {
              const data = JSON.parse(event.data);
              console.log("SSE Message:", data);
              setProgress(data);
              if (data.status === "Complete") {
                eventSource?.close();
                setTimeout(() => {
                  fetchHtmlContent();
                  setLoading(false);
                  setProgress(null);
                }, 1000);
              }
            };
            eventSource.onerror = (error) => {
              console.error("SSE Error:", error);
              eventSource?.close();
              setLoading(false);
              clearInterval(intervalId);
            };
          }
        };

        const intervalId = setInterval(checkQueuePosition, 10000);
        await checkQueuePosition();

        return () => {
          clearInterval(intervalId);
          if (eventSource) {
            eventSource.close();
          }
        };
      } else {
        const error = await response.json();
        console.error("Failed to process video:", error.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error processing video:", error);
      setLoading(false);
    }
  };

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const enterFullscreen = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  const handleSave = async () => {
    if (!session?.user?.email) {
      window.location.href = "/login";
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/mindmaps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `Mindmap - ${new Date().toLocaleDateString()}`,
          youtubeUrl: inputValue,
          htmlContent: htmlContent,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save mindmap");
      }
    } catch (error) {
      console.error("Error saving mindmap:", error);
    } finally {
      setSaving(false);
    }
  };

  // Prevent rendering until mounted to avoid SSR issues
  if (!isMounted) {
    return null; // or a loading placeholder
  }

  return (
    <div className="flex relative">
      <PricingPortal isOpen={showPricing} />
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
      {session && <SavedMindmaps />}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Top section with title, editor, and controls */}
        <div className="w-full flex flex-col items-center justify-start pt-8 pb-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            Youtube to <span className="text-blue-600">MindMap</span>
          </h1>
         
          {!isVerified ? (
            <div className="flex flex-col items-center">
              <p className="mb-4 text-gray-600">
                Please complete the verification to continue
              </p>
              {!sessionStorage.getItem("turnstile_verified") && (
                <Turnstile
                  onVerify={async () => {
                    try {
                      const response = await fetch("/api/chat-usage", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          email: session?.user?.email,
                        }),
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
              <Button
                variant="outline"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Try Free"
                )}
              </Button>
            </>
          )}
          {loading && (
            <div className="justify-center">
              <p>{progress?.message || position || "Processing"}</p>
            </div>
          )}
          {inputValue.includes("https://www.youtube.com/") && (
            <div className="justify-center mt-3">
              <YouTubeEmbed videoid={`${inputValue.split("=")[1]}`} height={8} />
              <iframe></iframe>
            </div>
          )}
        </div>
        
        {/* Bottom section with HTML preview iframe */}
        <div className="w-full flex flex-col items-center justify-end mt-auto">
          <iframe
            title="HTML Preview"
            style={{ width: "80%", height: "700px", border: "1px solid #ccc" }}
            srcDoc={htmlContent}
            allowFullScreen
            className="mb-4"
            ref={iframeRef}
          ></iframe>
          <div className="flex gap-2 mb-8">
            <Button variant="outline" onClick={enterFullscreen}>
              Go Fullscreen
            </Button>
            {session && (
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={saving || !htmlContent}
              >
                {saving ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Mindmap
              </Button>
            )}
           
          </div>
          <div ref={editorRef} className="w-full max-w-4xl mb-6 border rounded-lg p-4 overflow-auto" ></div>
        </div>
      </div>
      
    </div>
  );
}