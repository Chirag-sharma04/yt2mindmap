import { Brain, PlayCircle, Zap, BookOpen, Network, Edit3, Save, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Footer() {
    return ( 
        <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Brain className="h-6 w-6 text-purple-400" />
              <span className="text-white font-bold">yt2mindmap</span>
            </div>
            
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            © {new Date().getFullYear()} yt2mindmap. All rights reserved.
          </div>
        </div>
      </footer>
)}
