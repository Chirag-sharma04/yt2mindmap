"use client"; 
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Brain } from "lucide-react"; 
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="container mx-auto py-6 px-4 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
        <Brain className="h-8 w-8 text-purple-600" />
        <span className="text-xl font-bold">yt2mindmap</span>
      </Link>
      <nav className="hidden md:flex gap-6">
        <Link 
          href="/" 
          className={`hover:text-purple-600 transition-colors ${pathname === "/" ? "text-purple-600 font-medium" : ""}`}
        >
          Home
        </Link>
        <Link 
          href="/about" 
          className={`hover:text-purple-600 transition-colors ${pathname === "/about" ? "text-purple-600 font-medium" : ""}`}
        >
          About
        </Link>
        <Link 
          href="/features" 
          className={`hover:text-purple-600 transition-colors ${pathname === "/features" ? "text-purple-600 font-medium" : ""}`}
        >
          Features
        </Link>
      </nav>
      <Button className="bg-purple-600 hover:bg-purple-700">Free</Button>
    </header>
  );
}
