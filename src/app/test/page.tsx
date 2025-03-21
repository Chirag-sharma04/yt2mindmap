"use client"
import { useEffect, useState, useRef } from "react";
import {EditorView, basicSetup} from "codemirror"
import {html} from "@codemirror/lang-html"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useSession, signOut } from "next-auth/react";
import { YouTubeEmbed } from '@next/third-parties/google'
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
    const [showPricing, setShowPricing] = useState(false);
    
   
    const handleSave = () => {
      if (editorRef.current) {
        requestAnimationFrame(() => {
          if (editorRef.current) {
            setHtmlContent(editorRef.current.state.doc.toString());
          }
        });
      }
    };
    
    
    const fetchHtmlContent = async () => {
      setLoading(true);
      try {
          const response = await fetch('https://yt2mapapi.blob.core.windows.net/html/test.html', {cache: 'no-store',});
          console.log(response) 
          const text = await response.text();
          console.log(text)
          setHtmlContent(text);
      } catch (error) {
          console.error('Error fetching HTML content:', error);
      } finally {
          setLoading(false);
      }
  };
  useEffect(() => {
    
    setIsMounted(true); // Mark as mounted when the component loads on the client
    //const urlParams = new URLSearchParams(window.location.search);
    //const mindmapId = urlParams.get("id");
    //if (mindmapId) {
    //  loadSavedMindmap(mindmapId);
    //}
    // Check for existing verification token only if mounted
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("turnstile_verified");
      if (storedToken) {
        setIsVerified(true);
      }
    }
    fetchHtmlContent(); // Fetch content when the component mounts
  }, []);
   // Log htmlContent when it changes
   useEffect(() => {
    editorRef.current = new EditorView({
      parent: document.body,
      doc: htmlContent,
      extensions: [basicSetup, html()],
      
      
    });
    // Cleanup the editor on unmount
    return () => {
      editorRef.current?.destroy();
      
    }; // This will log the updated htmlContent
  }); // Runs every time htmlContent changes

  
  const handleSubmitWebhook = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/yt-transcript-webhook-old', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputValue }),
      });

      if (response.ok) {
        console.log("Webhook submitted successfully. Checking status...");
        const result = await checkTaskStatus();
        console.log("Received webhook data:", result);
      } else {
        console.error("Failed to submit webhook:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting webhook:", error);
    } finally {
      setLoading(false);
    }
};

const checkTaskStatus = async (maxRetries = 20, interval = 5000) => {
    try {
      let attempts = 0;

      while (attempts < maxRetries) {
        const res = await fetch(`/api/webhook`);
        const data = await res.json();

        if (data.status === "completed") {
          console.log("Task completed. Data received:", data.data);
          return data.data; // Return data to frontend
        }

        console.log(`Task still in progress... (Attempt ${attempts + 1}/${maxRetries})`);
        await new Promise((resolve) => setTimeout(resolve, interval));
        attempts++;
      }

      console.error("Task polling timed out.");
    } catch (error) {
      console.error("Error checking task status:", error);
    }
};

  
  const handleSubmit = async () => {
      setLoading(true);
      <Loader2 className="animate-spin"/>
      console.log("submit");

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
        
      try {
        
        const response = await fetch('/api/yt-transcript-webhook-old', {
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
          console.log(taskId);
          
        } // 1 minute in milliseconds
          
        
      } catch (error) {
        console.error('Error saving journal entry:', error);
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
    return (
      
      
      <div className="flex h-screen">
      <PricingPortal isOpen={showPricing} />
  {/* Sidebar */}
  
  {session && (
    <div className="w-64 bg-gray-100 p-4 border-r border-gray-300 overflow-y-auto">
      <SavedMindmaps />
    </div>
  )}

      <div className='flex-1 flex flex-col items-center justify-center'>
        
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
              {!isVerified && (
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
              <Button
                variant="outline"
                onClick={handleSubmitWebhook}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Test webhook"
                )}
              </Button>
            </>
          )}
          {loading && (
            <div className="justify-center">
              <p>{"Processing"}</p>
            </div>
          )}
          {inputValue.includes("https://www.youtube.com/") && (
            <div className="justify-center mt-3">
              <YouTubeEmbed videoid={`${inputValue.split("=")[1]}`} height={8} />
              <iframe></iframe>
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
      <div className="flex space-x-2 mb-4">
  <Button variant="outline" onClick={handleSave}>Save Changes</Button>
  <Button variant="outline" onClick={enterFullscreen}>Go Fullscreen</Button>
</div>

    </div></div>
      
    );
    
}