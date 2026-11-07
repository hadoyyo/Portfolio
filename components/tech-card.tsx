"use client"

import React, { useRef, useState, useEffect } from "react"
import { CircuitTraces, getSkillTheme } from "@/components/circuit-traces"

interface TechCardProps {
  skill: {
    name: string
    description: string
    logo: string
    background: string
  }
  index: number
  isActive: boolean
  isDimmed?: boolean
  onToggle: (e: React.MouseEvent) => void
  onHoverChange?: (hovered: boolean) => void
  logoNode: React.ReactNode
}

export const TechCard: React.FC<TechCardProps> = ({
  skill,
  index,
  isActive,
  isDimmed = false,
  onToggle,
  onHoverChange,
  logoNode,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 240, height: 190 })

  useEffect(() => {
    if (!cardRef.current) return
    const updateSize = () => {
      if (cardRef.current) {
        const w = cardRef.current.offsetWidth
        const h = cardRef.current.offsetHeight
        if (w > 0 && h > 0) {
          setDimensions({ width: w, height: h })
        }
      }
    }
    updateSize()
    const ro = new ResizeObserver(updateSize)
    ro.observe(cardRef.current)
    return () => ro.disconnect()
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHoverChange?.(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHoverChange?.(false)
  }

  const isVisible = isHovered || isActive
  const [isElevated, setIsElevated] = useState(false)
  const elevateTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isVisible) {
      if (elevateTimeoutRef.current) clearTimeout(elevateTimeoutRef.current)
      setIsElevated(true)
    } else {
      elevateTimeoutRef.current = setTimeout(() => {
        setIsElevated(false)
      }, 500)
    }
    return () => {
      if (elevateTimeoutRef.current) clearTimeout(elevateTimeoutRef.current)
    }
  }, [isVisible])

  const theme = getSkillTheme(skill.name)
  const zIndexClass = isVisible ? "z-30" : isElevated ? "z-20" : "z-10"

  return (
    <div
      ref={cardRef}
      data-tech-card
      onClick={onToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group flex flex-col justify-between min-h-[190px] cursor-pointer transition-all duration-500 ${zIndexClass} ${
        isDimmed ? "opacity-55 scale-[0.985]" : "opacity-100 scale-100"
      }`}
    >
      <CircuitTraces
        isVisible={isVisible}
        theme={theme}
        variant={index % 4}
        width={dimensions.width}
        height={dimensions.height}
      />

      <div
        className={`relative z-10 w-full h-full rounded-2xl p-6 overflow-hidden flex flex-col justify-between min-h-[190px] transition-all duration-500 ${
          isVisible
            ? "bg-zinc-950 shadow-xl -translate-y-1 ring-0"
            : "bg-white shadow-xs ring-1 ring-zinc-200/70 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:ring-0 group-hover:bg-zinc-950"
        }`}
      >
        <div
          className={`absolute -inset-px bg-cover bg-center transition-all duration-500 ease-out pointer-events-none rounded-2xl ${
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100"
          }`}
          style={{
            backgroundImage: `url('${skill.background}')`,
          }}
        />

        <div
          className={`absolute -inset-px bg-gradient-to-t from-black/85 via-black/50 to-black/30 transition-opacity duration-500 pointer-events-none rounded-2xl ${
            isVisible ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        />

        <div className="relative z-10 flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl border p-2 flex items-center justify-center transition-all duration-300 overflow-hidden ${
              isVisible
                ? "scale-110 bg-white border-white shadow-md"
                : "bg-zinc-50 border-zinc-200/80 shadow-2xs group-hover:scale-110 group-hover:bg-white group-hover:border-white group-hover:shadow-md"
            }`}
          >
            {logoNode}
          </div>
          <span
            className={`text-[10px] font-mono uppercase tracking-widest font-semibold transition-colors duration-300 ${
              isVisible ? "text-white/70" : "text-zinc-400 group-hover:text-white/70"
            }`}
          >
            0{index + 1}
          </span>
        </div>

        <div className="relative z-10">
          <h4
            className={`font-plakat text-xl font-black mb-1 transition-colors duration-300 ${
              isVisible ? "text-white" : "text-zinc-950 group-hover:text-white"
            }`}
          >
            {skill.name}
          </h4>
          <p
            className={`font-founders text-xs leading-relaxed line-clamp-3 transition-colors duration-300 ${
              isVisible ? "text-zinc-200" : "text-zinc-500 group-hover:text-zinc-200"
            }`}
          >
            {skill.description}
          </p>
        </div>
      </div>
    </div>
  )
}
