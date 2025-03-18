"use client"
import { useEffect, useState, useRef } from "react";
import {EditorView, basicSetup} from "codemirror"
import {html} from "@codemirror/lang-html"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Save, LogOut } from "lucide-react"
import { YouTubeEmbed } from '@next/third-parties/google'
import { useSession, signOut } from 'next-auth/react'
import SavedMindmaps from '@/components/SavedMindmaps'
import Turnstile from '@/components/Turnstile'
import PricingPortal from '@/components/PricingPortal'

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
    const [progress, setprogress] = useState<ProgressData | null>(null);
    const [position, setPosition] = useState(0);
    const [isVerified, setIsVerified] = useState(false);
    const [showPricing, setShowPricing] = useState(false);

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const mindmapId = urlParams.get('id');
      if (mindmapId) {
        loadSavedMindmap(mindmapId);
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
        console.error('Error loading mindmap:', error);
      } finally {
        setLoading(false);
      }
    };
    // create an array of html urls. Each successive request from clients should fetch the next url in the array
    // Create a container for the editor
    
    const fetchHtmlContent = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://yt2mapapi.blob.core.windows.net/html/test.html', {
            cache: 'no-store',
        });
        const text = await response.text();
        setHtmlContent(text);
    } catch (error) {
          console.error('Error fetching HTML content:', error);
      } finally {
          setLoading(false);
          setprogress(null)
      }
  };
   // Log htmlContent when it changes
   useEffect(() => {
    const view = new EditorView({
      parent: document.body,
      doc: htmlContent,
      extensions: [basicSetup, html(),EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          // Update the HTML content when the editor content changes
          setHtmlContent(update.state.doc.toString());
        }
      }),],
      
      
    });
    // Cleanup the editor on unmount
    return () => {
      view.destroy();
    }; // This will log the updated htmlContent
  }, [htmlContent]); // Runs every time htmlContent changes
    const handleSubmit = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/yt-transcript-webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
              cache: 'no-store',
            });
            const queueData = await queueResponse.json();
            setPosition(queueData.position);
            if (queueData.position === 1) {
              clearInterval(intervalId);
              // Add 1 second delay before processing
              await new Promise(resolve => setTimeout(resolve, 2000));
              fetch("http://localhost:8000/process-queue");
              
              // Initialize EventSource only when position is 1
              eventSource = new EventSource(`http://localhost:8000/sse/${taskId}`);
              eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('SSE Message:', data);
                setprogress(data);
                if (data.status === 'Complete') {
                  eventSource?.close();
                  setTimeout(() => {
                    fetchHtmlContent();
                    setLoading(false);
                    setprogress(null);
                  }, 1000);
                }
              };
              eventSource.onerror = (error) => {
                console.error('SSE Error:', error);
                eventSource?.close();
                setLoading(false);
                clearInterval(intervalId);
              };
            }
          };
          
          const intervalId = setInterval(checkQueuePosition, 10000);
          // Initial check
          await checkQueuePosition();
          
          // Cleanup interval and eventSource on component unmount
          return () => {
            clearInterval(intervalId);
            if (eventSource) {
              eventSource.close();
            }
          };
        } else {
          const error = await response.json();
          console.error('Failed to process video:', error.message);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error processing video:', error);
        setLoading(false);
      }
    };
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const enterFullscreen = () => {
    const iframe = iframeRef.current;
    if (iframe) { // Check if iframe is not null
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } 
    }
  };
    const handleSave = async () => {
      if (!session?.user?.email) {
        window.location.href = '/login';
        return;
      }
      setSaving(true);
      try {
        const response = await fetch('/api/mindmaps', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: `Mindmap - ${new Date().toLocaleDateString()}`,
            youtubeUrl: inputValue,
            htmlContent: htmlContent,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to save mindmap');
        }
      } catch (error) {
        console.error('Error saving mindmap:', error);
      } finally {
        setSaving(false);
      }
    };

    return (
      <div className='flex relative'>
        <PricingPortal isOpen={showPricing} />
        <div className='absolute top-4 right-4'>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: '/login' })}
            className='flex items-center gap-2'
          >
            <LogOut className='w-4 h-4' />
            Logout
          </Button>
        </div>
        {session && <SavedMindmaps />}
        <div className='flex-1 flex flex-col items-center justify-center'>
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                  Youtube to <span className="text-blue-600">MindMap</span>
                </h1>
        {!isVerified ? (
          <div className="flex flex-col items-center">
            <p className="mb-4 text-gray-600">Please complete the verification to continue</p>
            <Turnstile onVerify={async () => {
              try {
                const response = await fetch('/api/chat-usage', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email: session?.user?.email
                  })
                });
                const data = await response.json();
                if (data.usage_count > 3) {
                  setShowPricing(true);
                } else {
                  setIsVerified(true);
                }
              } catch (error) {
                console.error('Error updating usage count:', error);
                setIsVerified(true);
              }
            }} />
          </div>
        ) : (
          <>
            <Input
              placeholder="Enter Youtube Link"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={`pl-2 pr-2 w-1/2 justify-center mb-6`}
            />
            <Button variant="outline" onClick={handleSubmit} disabled={loading}>
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Try Free"}
            </Button>
          </>
        )}
        {/* Display the message only when loading */}
        {loading && (
          <div className="justify-center">  
            <p>{progress?.message || position || "Processing"}</p>
            </div>
        )
        }
        {inputValue.includes("https://www.youtube.com/") && (
          <div className="justify-center mt-3">
              <YouTubeEmbed videoid={`${inputValue.split("=")[1]}`} height={8} />
              <iframe>
              
              </iframe>
        </div>
        )}
    </div>
    <iframe
        title="HTML Preview"
        style={{ width: "80%", height: "700px", border: "1px solid #ccc" }}
        srcDoc={htmlContent}
        allowFullScreen
        className = "mb-4 mt-4 "
        ref={iframeRef}
        
      ></iframe>   
      <div className="flex gap-2">
        <Button variant="outline" onClick={enterFullscreen}>Go Fullscreen</Button>
        {session && (
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={saving || !htmlContent}
          >
            {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
            Save Mindmap
          </Button>
        )}
      </div>
    </div>
    </div>
    );  
}
