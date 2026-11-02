"use client"

import { useState, useEffect } from "react"

interface HeroMarqueeProps {
  language: "pl" | "en"
  startDelay?: number
}

export function HeroMarquee({ language, startDelay = 3150 }: HeroMarqueeProps) {
  const [isBarOpen, setIsBarOpen] = useState(false)
  const [isFullyRevealed, setIsFullyRevealed] = useState(false)

  const phrases = [
    {
      highlight: "15+",
      label: language === "pl" ? "Projektów" : "Projects",
    },
    {
      highlight: "Full-Stack",
      label: "Craft",
    },
    {
      highlight: "Software",
      label: "Engineer",
    },
  ]

  useEffect(() => {
    const barTimer = setTimeout(() => {
      setIsBarOpen(true)
    }, startDelay)


    const revealTimer = setTimeout(() => {
      setIsFullyRevealed(true)
    }, startDelay + 800)

    return () => {
      clearTimeout(barTimer)
      clearTimeout(revealTimer)
    }
  }, [startDelay])

  const repeatedPhrases = Array.from({ length: 6 }).flatMap(() => phrases)

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20 h-11 sm:h-12 pointer-events-none select-none overflow-hidden isolate"
      style={{
        clipPath: isFullyRevealed
          ? undefined
          : isBarOpen
          ? "inset(0 0% 0 0)"
          : "inset(0 100% 0 0)",
        transition: isFullyRevealed ? "none" : "clip-path 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        contain: "paint layout",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-50/95 via-white to-zinc-50/95 border-t border-zinc-200/90 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d40027]/40 to-transparent" />

      <div className="relative w-full h-full flex items-center overflow-hidden">
        <div
          className="flex items-center whitespace-nowrap shrink-0 animate-marquee-right"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        >
          {/* First track */}
          <div className="flex items-center shrink-0">
            {repeatedPhrases.map((phrase, idx) => (
              <div
                key={`track1-${idx}`}
                className="inline-flex items-center gap-3 sm:gap-4 shrink-0 px-4 sm:px-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#d40027] shadow-[0_0_8px_rgba(212,0,39,0.5)] shrink-0" />
                <span className="font-vietnam font-black text-[11px] sm:text-xs tracking-wider uppercase text-zinc-900 flex items-center gap-1.5">
                  <span className="text-[#d40027]">{phrase.highlight}</span>
                  <span>{phrase.label}</span>
                </span>
                <span className="text-zinc-300 font-mono text-xs select-none">/</span>
              </div>
            ))}
          </div>

          {/* Duplicate track for loop */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {repeatedPhrases.map((phrase, idx) => (
              <div
                key={`track2-${idx}`}
                className="inline-flex items-center gap-3 sm:gap-4 shrink-0 px-4 sm:px-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#d40027] shadow-[0_0_8px_rgba(212,0,39,0.5)] shrink-0" />
                <span className="font-vietnam font-black text-[11px] sm:text-xs tracking-wider uppercase text-zinc-900 flex items-center gap-1.5">
                  <span className="text-[#d40027]">{phrase.highlight}</span>
                  <span>{phrase.label}</span>
                </span>
                <span className="text-zinc-300 font-mono text-xs select-none">/</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
