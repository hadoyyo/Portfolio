import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { getAssetPath } from "@/lib/assets"
import "./globals.css"

export const metadata: Metadata = {
  title: "Portfolio | Hubert Jędruchniewicz",
  description: "Portfolio of a web and mobile developer",
  icons: {
    icon: process.env.NODE_ENV === "production" ? "/Portfolio/favicon.ico" : "/favicon.ico"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className="scroll-smooth bg-white text-zinc-900">
      <head>
        <link
          rel="preload"
          as="image"
          href={getAssetPath("/sky-clouds.jfif")}
          type="image/jpeg"
        />
      </head>
      <body className="bg-white text-zinc-900 font-founders antialiased selection:bg-[#d40027] selection:text-white">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}