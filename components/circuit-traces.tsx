"use client"

import React, { useMemo } from "react"

export interface SkillTheme {
  primary: string
  glow: string
}

export function getSkillTheme(skillName: string): SkillTheme {
  const name = skillName.toLowerCase().trim()

  if (name.includes("node")) {
    return {
      primary: "#78b13e",
      glow: "rgba(120, 177, 62, 0.6)",
    }
  }
  if (name.includes("react")) {
    return {
      primary: "#00d8ff",
      glow: "rgba(0, 216, 255, 0.55)",
    }
  }
  if (name.includes("kotlin")) {
    return {
      primary: "#a855f7",
      glow: "rgba(168, 85, 247, 0.55)",
    }
  }
  if (name.includes("javascript") || name === "js") {
    return {
      primary: "#facc15",
      glow: "rgba(250, 204, 21, 0.55)",
    }
  }
  if (name.includes("swift")) {
    return {
      primary: "#fb923c",
      glow: "rgba(251, 146, 60, 0.55)",
    }
  }
  if (name.includes("css")) {
    return {
      primary: "#38bdf8",
      glow: "rgba(56, 189, 248, 0.55)",
    }
  }
  if (name.includes("html")) {
    return {
      primary: "#f97316",
      glow: "rgba(249, 115, 22, 0.55)",
    }
  }
  return {
    primary: "#000000",
    glow: "rgba(0, 0, 0, 0.25)",
  }
}

interface TraceData {
  d: string
  end: [number, number]
  len: number
}

function generateTraces(variant: number, w: number, h: number, pad: number): TraceData[] {
  const R = 7
  const arc = (Math.PI / 2) * R

  switch (variant) {
    case 0: {
      const x1 = pad + w * 0.22
      const y1 = pad - 14
      const endY1 = y1 - R
      const endX1 = pad + 12
      const d1 = `M ${x1} ${pad + 10} L ${x1} ${y1} Q ${x1} ${endY1} ${x1 - R} ${endY1} L ${endX1} ${endY1}`
      const len1 = (pad + 10 - y1) + arc + (x1 - R - endX1)

      const x2 = pad + w * 0.70
      const y2 = pad - 12
      const turnY2 = y2 - R
      const rightX2 = pad + w + 14
      const endX2 = rightX2 + R
      const endY2 = pad - 4
      const d2 = `M ${x2} ${pad + 10} L ${x2} ${y2} Q ${x2} ${turnY2} ${x2 + R} ${turnY2} L ${rightX2} ${turnY2} Q ${endX2} ${turnY2} ${endX2} ${turnY2 + R} L ${endX2} ${endY2}`
      const len2 = (pad + 10 - y2) + arc + (rightX2 - (x2 + R)) + arc + (endY2 - (turnY2 + R))

      const startY3 = pad + h * 0.32
      const x3 = pad + w + 16
      const endX3 = x3 + R
      const endY3 = pad + h * 0.48
      const d3 = `M ${pad + w - 10} ${startY3} L ${x3} ${startY3} Q ${endX3} ${startY3} ${endX3} ${startY3 + R} L ${endX3} ${endY3}`
      const len3 = (x3 - (pad + w - 10)) + arc + (endY3 - (startY3 + R))

      const startY4 = pad + h * 0.72
      const endX4 = pad + w + 24
      const endY4 = startY4
      const d4 = `M ${pad + w - 10} ${startY4} L ${endX4} ${endY4}`
      const len4 = endX4 - (pad + w - 10)

      const startX5 = pad + w * 0.82
      const y5 = pad + h + 14
      const endY5 = y5 + R
      const endX5 = pad + w + 16
      const d5 = `M ${startX5} ${pad + h - 10} L ${startX5} ${y5} Q ${startX5} ${endY5} ${startX5 + R} ${endY5} L ${endX5} ${endY5}`
      const len5 = (y5 - (pad + h - 10)) + arc + (endX5 - (startX5 + R))

      const startX6 = pad + w * 0.48
      const y6 = pad + h + 15
      const turnY6 = y6 + R
      const turnX6 = pad + w * 0.32
      const endX6 = turnX6 - R
      const endY6 = pad + h + 28
      const d6 = `M ${startX6} ${pad + h - 10} L ${startX6} ${y6} Q ${startX6} ${turnY6} ${startX6 - R} ${turnY6} L ${turnX6} ${turnY6} Q ${endX6} ${turnY6} ${endX6} ${turnY6 + R} L ${endX6} ${endY6}`
      const len6 = (y6 - (pad + h - 10)) + arc + (startX6 - R - turnX6) + arc + (endY6 - (turnY6 + R))

      const startX7 = pad + w * 0.18
      const endX7 = startX7
      const endY7 = pad + h + 22
      const d7 = `M ${startX7} ${pad + h - 10} L ${endX7} ${endY7}`
      const len7 = endY7 - (pad + h - 10)

      const startY8 = pad + h * 0.68
      const x8 = pad - 14
      const endX8 = x8 - R
      const endY8 = pad + h * 0.84
      const d8 = `M ${pad + 10} ${startY8} L ${x8} ${startY8} Q ${endX8} ${startY8} ${endX8} ${startY8 + R} L ${endX8} ${endY8}`
      const len8 = (pad + 10 - x8) + arc + (endY8 - (startY8 + R))

      const startY9 = pad + h * 0.30
      const x9 = pad - 14
      const endX9 = x9 - R
      const endY9 = pad + 16
      const d9 = `M ${pad + 10} ${startY9} L ${x9} ${startY9} Q ${endX9} ${startY9} ${endX9} ${startY9 - R} L ${endX9} ${endY9}`
      const len9 = (pad + 10 - x9) + arc + (startY9 - R - endY9)

      return [
        { d: d1, end: [endX1, endY1], len: len1 },
        { d: d2, end: [endX2, endY2], len: len2 },
        { d: d3, end: [endX3, endY3], len: len3 },
        { d: d4, end: [endX4, endY4], len: len4 },
        { d: d5, end: [endX5, endY5], len: len5 },
        { d: d6, end: [endX6, endY6], len: len6 },
        { d: d7, end: [endX7, endY7], len: len7 },
        { d: d8, end: [endX8, endY8], len: len8 },
        { d: d9, end: [endX9, endY9], len: len9 },
      ]
    }

    case 1: {
      const x1 = pad + w * 0.35
      const y1 = pad - 16
      const endY1 = y1 - R
      const endX1 = pad + w * 0.58
      const d1 = `M ${x1} ${pad + 10} L ${x1} ${y1} Q ${x1} ${endY1} ${x1 + R} ${endY1} L ${endX1} ${endY1}`
      const len1 = (pad + 10 - y1) + arc + (endX1 - (x1 + R))

      const endX2 = pad + w * 0.82
      const endY2 = pad - 22
      const d2 = `M ${endX2} ${pad + 10} L ${endX2} ${endY2}`
      const len2 = pad + 10 - endY2

      const startY3 = pad + h * 0.24
      const endX3 = pad + w + 22
      const endY3 = startY3
      const d3 = `M ${pad + w - 10} ${startY3} L ${endX3} ${endY3}`
      const len3 = endX3 - (pad + w - 10)

      const startY4 = pad + h * 0.58
      const x4 = pad + w + 14
      const endX4 = x4 + R
      const endY4 = pad + h * 0.76
      const d4 = `M ${pad + w - 10} ${startY4} L ${x4} ${startY4} Q ${endX4} ${startY4} ${endX4} ${startY4 + R} L ${endX4} ${endY4}`
      const len4 = (x4 - (pad + w - 10)) + arc + (endY4 - (startY4 + R))

      const endX5 = pad + w * 0.72
      const endY5 = pad + h + 24
      const d5 = `M ${endX5} ${pad + h - 10} L ${endX5} ${endY5}`
      const len5 = endY5 - (pad + h - 10)

      const startX6 = pad + w * 0.40
      const y6 = pad + h + 15
      const endY6 = y6 + R
      const endX6 = pad + w * 0.60
      const d6 = `M ${startX6} ${pad + h - 10} L ${startX6} ${y6} Q ${startX6} ${endY6} ${startX6 + R} ${endY6} L ${endX6} ${endY6}`
      const len6 = (y6 - (pad + h - 10)) + arc + (endX6 - (startX6 + R))

      const startX7 = pad + w * 0.16
      const y7 = pad + h + 14
      const endY7 = y7 + R
      const endX7 = pad + 10
      const d7 = `M ${startX7} ${pad + h - 10} L ${startX7} ${y7} Q ${startX7} ${endY7} ${startX7 - R} ${endY7} L ${endX7} ${endY7}`
      const len7 = (y7 - (pad + h - 10)) + arc + (startX7 - R - endX7)

      const startY8 = pad + h * 0.78
      const endX8 = pad - 22
      const endY8 = startY8
      const d8 = `M ${pad + 10} ${startY8} L ${endX8} ${endY8}`
      const len8 = pad + 10 - endX8

      const startY9 = pad + h * 0.42
      const x9 = pad - 14
      const endX9 = x9 - R
      const endY9 = pad + h * 0.22
      const d9 = `M ${pad + 10} ${startY9} L ${x9} ${startY9} Q ${endX9} ${startY9} ${endX9} ${startY9 - R} L ${endX9} ${endY9}`
      const len9 = (pad + 10 - x9) + arc + (startY9 - R - endY9)

      return [
        { d: d1, end: [endX1, endY1], len: len1 },
        { d: d2, end: [endX2, endY2], len: len2 },
        { d: d3, end: [endX3, endY3], len: len3 },
        { d: d4, end: [endX4, endY4], len: len4 },
        { d: d5, end: [endX5, endY5], len: len5 },
        { d: d6, end: [endX6, endY6], len: len6 },
        { d: d7, end: [endX7, endY7], len: len7 },
        { d: d8, end: [endX8, endY8], len: len8 },
        { d: d9, end: [endX9, endY9], len: len9 },
      ]
    }

    case 2: {
      const endX1 = pad + w * 0.18
      const endY1 = pad - 20
      const d1 = `M ${endX1} ${pad + 10} L ${endX1} ${endY1}`
      const len1 = pad + 10 - endY1

      const x2 = pad + w * 0.58
      const y2 = pad - 14
      const endY2 = y2 - R
      const endX2 = pad + w * 0.32
      const d2 = `M ${x2} ${pad + 10} L ${x2} ${y2} Q ${x2} ${endY2} ${x2 - R} ${endY2} L ${endX2} ${endY2}`
      const len2 = (pad + 10 - y2) + arc + (x2 - R - endX2)

      const startY3 = pad + h * 0.18
      const x3 = pad + w + 16
      const endX3 = x3 + R
      const endY3 = pad + h * 0.38
      const d3 = `M ${pad + w - 10} ${startY3} L ${x3} ${startY3} Q ${endX3} ${startY3} ${endX3} ${startY3 + R} L ${endX3} ${endY3}`
      const len3 = (x3 - (pad + w - 10)) + arc + (endY3 - (startY3 + R))

      const startY4 = pad + h * 0.65
      const x4 = pad + w + 15
      const endX4 = x4 + R
      const endY4 = pad + h * 0.50
      const d4 = `M ${pad + w - 10} ${startY4} L ${x4} ${startY4} Q ${endX4} ${startY4} ${endX4} ${startY4 - R} L ${endX4} ${endY4}`
      const len4 = (x4 - (pad + w - 10)) + arc + (startY4 - R - endY4)

      const startX5 = pad + w * 0.78
      const y5 = pad + h + 16
      const endY5 = y5 + R
      const endX5 = pad + w * 0.56
      const d5 = `M ${startX5} ${pad + h - 10} L ${startX5} ${y5} Q ${startX5} ${endY5} ${startX5 - R} ${endY5} L ${endX5} ${endY5}`
      const len5 = (y5 - (pad + h - 10)) + arc + (startX5 - R - endX5)

      const endX6 = pad + w * 0.30
      const endY6 = pad + h + 24
      const d6 = `M ${endX6} ${pad + h - 10} L ${endX6} ${endY6}`
      const len6 = endY6 - (pad + h - 10)

      const startY7 = pad + h * 0.82
      const x7 = pad - 15
      const endX7 = x7 - R
      const endY7 = pad + h * 0.64
      const d7 = `M ${pad + 10} ${startY7} L ${x7} ${startY7} Q ${endX7} ${startY7} ${endX7} ${startY7 - R} L ${endX7} ${endY7}`
      const len7 = (pad + 10 - x7) + arc + (startY7 - R - endY7)

      const startY8 = pad + h * 0.25
      const endX8 = pad - 23
      const endY8 = startY8
      const d8 = `M ${pad + 10} ${startY8} L ${endX8} ${endY8}`
      const len8 = pad + 10 - endX8

      return [
        { d: d1, end: [endX1, endY1], len: len1 },
        { d: d2, end: [endX2, endY2], len: len2 },
        { d: d3, end: [endX3, endY3], len: len3 },
        { d: d4, end: [endX4, endY4], len: len4 },
        { d: d5, end: [endX5, endY5], len: len5 },
        { d: d6, end: [endX6, endY6], len: len6 },
        { d: d7, end: [endX7, endY7], len: len7 },
        { d: d8, end: [endX8, endY8], len: len8 },
      ]
    }

    case 3:
    default: {
      const x1 = pad + w * 0.65
      const y1 = pad - 15
      const endY1 = y1 - R
      const endX1 = pad + w * 0.88
      const d1 = `M ${x1} ${pad + 10} L ${x1} ${y1} Q ${x1} ${endY1} ${x1 + R} ${endY1} L ${endX1} ${endY1}`
      const len1 = (pad + 10 - y1) + arc + (endX1 - (x1 + R))

      const endX2 = pad + w * 0.30
      const endY2 = pad - 22
      const d2 = `M ${endX2} ${pad + 10} L ${endX2} ${endY2}`
      const len2 = pad + 10 - endY2

      const startY3 = pad + h * 0.40
      const endX3 = pad + w + 24
      const endY3 = startY3
      const d3 = `M ${pad + w - 10} ${startY3} L ${endX3} ${endY3}`
      const len3 = endX3 - (pad + w - 10)

      const startY4 = pad + h * 0.80
      const x4 = pad + w + 16
      const endX4 = x4 + R
      const endY4 = pad + h * 0.62
      const d4 = `M ${pad + w - 10} ${startY4} L ${x4} ${startY4} Q ${endX4} ${startY4} ${endX4} ${startY4 - R} L ${endX4} ${endY4}`
      const len4 = (x4 - (pad + w - 10)) + arc + (startY4 - R - endY4)

      const endX5 = pad + w * 0.65
      const endY5 = pad + h + 22
      const d5 = `M ${endX5} ${pad + h - 10} L ${endX5} ${endY5}`
      const len5 = endY5 - (pad + h - 10)

      const startX6 = pad + w * 0.22
      const y6 = pad + h + 15
      const endY6 = y6 + R
      const endX6 = pad + w * 0.45
      const d6 = `M ${startX6} ${pad + h - 10} L ${startX6} ${y6} Q ${startX6} ${endY6} ${startX6 + R} ${endY6} L ${endX6} ${endY6}`
      const len6 = (y6 - (pad + h - 10)) + arc + (endX6 - (startX6 + R))

      const startY7 = pad + h * 0.55
      const x7 = pad - 15
      const endX7 = x7 - R
      const endY7 = pad + h * 0.72
      const d7 = `M ${pad + 10} ${startY7} L ${x7} ${startY7} Q ${endX7} ${startY7} ${endX7} ${startY7 + R} L ${endX7} ${endY7}`
      const len7 = (pad + 10 - x7) + arc + (endY7 - (startY7 + R))

      const startY8 = pad + h * 0.15
      const x8 = pad - 14
      const endX8 = x8 - R
      const endY8 = pad - 6
      const d8 = `M ${pad + 10} ${startY8} L ${x8} ${startY8} Q ${endX8} ${startY8} ${endX8} ${startY8 - R} L ${endX8} ${endY8}`
      const len8 = (pad + 10 - x8) + arc + (startY8 - R - endY8)

      return [
        { d: d1, end: [endX1, endY1], len: len1 },
        { d: d2, end: [endX2, endY2], len: len2 },
        { d: d3, end: [endX3, endY3], len: len3 },
        { d: d4, end: [endX4, endY4], len: len4 },
        { d: d5, end: [endX5, endY5], len: len5 },
        { d: d6, end: [endX6, endY6], len: len6 },
        { d: d7, end: [endX7, endY7], len: len7 },
        { d: d8, end: [endX8, endY8], len: len8 },
      ]
    }
  }
}

interface CircuitTracesProps {
  isVisible: boolean
  theme: SkillTheme
  variant: number
  width: number
  height: number
}

export const CircuitTraces: React.FC<CircuitTracesProps> = React.memo(
  ({ isVisible, theme, variant, width, height }) => {
    const pad = 60
    const svgW = width + 2 * pad
    const svgH = height + 2 * pad

    const traces = useMemo(() => {
      if (width <= 0 || height <= 0) return []
      return generateTraces(variant, width, height, pad)
    }, [variant, width, height, pad])

    if (width <= 0 || height <= 0 || traces.length === 0) return null

    return (
      <svg
        className="absolute pointer-events-none"
        style={{
          width: `${svgW}px`,
          height: `${svgH}px`,
          left: `-${pad}px`,
          top: `-${pad}px`,
          zIndex: 1,
          overflow: "visible",
          transform: isVisible ? "translateY(-4px)" : "none",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        viewBox={`0 0 ${svgW} ${svgH}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {traces.map((trace, idx) => (
          <path
            key={`trace-${idx}`}
            d={trace.d}
            stroke={theme.primary}
            strokeWidth={2.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity={isVisible ? 1 : 0}
            style={{
              strokeDasharray: `${trace.len} ${trace.len}`,
              strokeDashoffset: isVisible ? 0 : trace.len,
              transition: isVisible
                ? `stroke-dashoffset 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 25}ms, opacity 0.3s ease ${idx * 25}ms`
                : "stroke-dashoffset 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 0.35s ease 0ms",
              willChange: isVisible ? "stroke-dashoffset, opacity" : "auto",
            }}
          />
        ))}

        {traces.map((trace, idx) => {
          const [endX, endY] = trace.end
          return (
            <g
              key={`dot-group-${idx}`}
              transform={`translate(${endX}, ${endY})`}
            >
              <g
                style={{
                  transform: isVisible ? "scale(1)" : "scale(0)",
                  opacity: isVisible ? 1 : 0,
                  transformOrigin: "0 0",
                  transition: isVisible
                    ? `transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) ${380 + idx * 22}ms, opacity 0.18s ease ${380 + idx * 22}ms`
                    : "transform 0.18s cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 0.18s ease 0ms",
                  willChange: isVisible ? "transform, opacity" : "auto",
                }}
              >
                <circle cx={0} cy={0} r={4.2} fill={theme.primary} />
                <circle cx={0} cy={0} r={1.8} fill="#ffffff" />
              </g>
            </g>
          )
        })}
      </svg>
    )
  }
)

CircuitTraces.displayName = "CircuitTraces"
