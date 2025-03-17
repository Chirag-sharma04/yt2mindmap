import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MindMapAI - Transform YouTube Learning with AI Mind Mapping",
  description:
    "Convert passive YouTube watching into active learning with AI-powered mind mapping. Extract insights, visualize connections, and master knowledge.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

