"use client"
import { useEffect, useState, useRef } from "react";
import {EditorView, basicSetup} from "codemirror"
import {html} from "@codemirror/lang-html"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { YouTubeEmbed } from '@next/third-parties/google'

interface ProgressData {
  message: string;
  status: string;
}

export default function Home() {
    const [htmlContent, setHtmlContent] = useState("12");
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [progress, setprogress] = useState<ProgressData | null>(null);
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
          const eventSource = new EventSource(`http://localhost:8000/sse/${taskId}`);
          await fetch('http://localhost:8000/process-queue', {
            cache: 'no-store',
        });
          eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setprogress(data)
            if (data.status === 'Complete') {
              eventSource.close();
              setTimeout(() => {
                fetchHtmlContent();
                setLoading(false);
                setprogress(null);
              }, 1000);
            }
          };
          eventSource.onerror = (error) => {
            console.error('SSE Error:', error);
            eventSource.close();
            setLoading(false);
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
    return (
      <div className='flex flex-col items-center justify-center'>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                  Youtube to <span className="text-blue-600">MindMap</span>
                </h1>
        <Input placeholder="Enter Youtube Link" value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`pl-2 pr-2 w-1/2 justify-center mb-6   
        }`}/>
        <Button variant="outline" onClick={handleSubmit} disabled={loading}>
        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Try Free"}
        </Button>
        {/* Display the message only when loading */}
        {loading && (
          <div className="justify-center">  
            <p>{progress?.message || 'Processing your request...'}</p>
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
      <Button variant="outline" onClick={enterFullscreen}>Go Fullscreen</Button>
    </div>
    );  
}
