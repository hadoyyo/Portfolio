"use client"

import React, { useEffect, useState, useRef, useCallback } from "react"
import { getAssetPath } from "@/lib/assets"
import { translations, Language } from "@/data/translations"

export const TOTAL_STICKERS = 25
export const STICKER_PATHS = Array.from({ length: TOTAL_STICKERS }, (_, i) =>
  getAssetPath(`/stickers/sticker_${i + 1}.png`)
)

const AUTO_CYCLE_INTERVAL = 3800
const FIRST_PEEL_DELAY = 1200

interface CornerConfig {
  className: string
  restRotation: number
  curlAngle: number
  flyVector: { x: number; y: number }
}

const CORNER_CONFIGS: CornerConfig[] = [
  {
    className: "top-[15%] sm:top-[14%] left-[6%] sm:left-[8%] lg:left-[12%]",
    restRotation: -12,
    curlAngle: 45,
    flyVector: { x: -90, y: -90 },
  },
  {
    className: "top-[15%] sm:top-[14%] right-[6%] sm:right-[8%] lg:right-[12%]",
    restRotation: 15,
    curlAngle: 135,
    flyVector: { x: 90, y: -90 },
  },
  {
    className: "bottom-[10%] sm:bottom-[14%] left-[6%] sm:left-[8%] lg:left-[12%]",
    restRotation: 8,
    curlAngle: 315,
    flyVector: { x: -90, y: 90 },
  },
  {
    className: "bottom-[10%] sm:bottom-[14%] right-[6%] sm:right-[8%] lg:right-[12%]",
    restRotation: -10,
    curlAngle: 225,
    flyVector: { x: 90, y: 90 },
  },
]

function shuffleArray(arr: number[]): number[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function computeFoldVars(size: number, angleDeg: number, p: number, src: string) {
  const angle = (angleDeg * Math.PI) / 180
  const u = [Math.cos(angle), Math.sin(angle)]
  const w = [-Math.sin(angle), Math.cos(angle)]
  const projs = [
    [0, 0],
    [size, 0],
    [size, size],
    [0, size],
  ].map((c) => c[0] * u[0] + c[1] * u[1])
  const minP = Math.min(...projs)
  const span = Math.max(...projs) - minP

  return {
    "--src": `url("${src}")`,
    "--u0": u[0],
    "--u1": u[1],
    "--w0": w[0],
    "--w1": w[1],
    "--minp": minP,
    "--span": span,
    "--big": size * 6,
    "--s": size,
    "--ca": 90 + (angle * 180) / Math.PI,
    "--a": 1 - 2 * u[0] * u[0],
    "--b": -2 * u[0] * u[1],
    "--d": 1 - 2 * u[1] * u[1],
    "--p": p,
  }
}

interface CornerStickerProps {
  cornerIndex: number
  stickerNumber: number
  language?: Language
  onPeelDone: (cornerIndex: number) => void
  onHoverStart: () => void
  onHoverEnd: () => void
}

const CornerSticker = React.memo(function CornerSticker({
  cornerIndex,
  stickerNumber,
  language = 'pl',
  onPeelDone,
  onHoverStart,
  onHoverEnd,
}: CornerStickerProps) {
  const elRef = useRef<HTMLDivElement>(null)
  const sizeRef = useRef(110)
  const animCancelRef = useRef<(() => void) | null>(null)
  const [phase, setPhase] = useState<"entering" | "stuck" | "settling" | "peeling">("entering")
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const corner = CORNER_CONFIGS[cornerIndex]
  const stickerUrl = getAssetPath(`/stickers/sticker_${stickerNumber}.png`)

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    const measuredSize = el.offsetWidth || 110
    sizeRef.current = measuredSize
    const vars = computeFoldVars(measuredSize, corner.curlAngle, 0.12, stickerUrl)
    for (const [k, v] of Object.entries(vars)) {
      el.style.setProperty(k, String(v))
    }

    setPhase("entering")
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })

    const duration = 750
    const start = performance.now()
    let cancelled = false

    el.style.transition = "none"
    el.style.transform = `rotate(${corner.restRotation}deg) scale(1.06)`
    el.style.opacity = "0"

    function tick(now: number) {
      if (cancelled) return
      const elapsed = now - start
      const t = Math.min(1, elapsed / duration)
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      const currentP = 0.12 + (1.0 - 0.12) * eased
      el.style.setProperty("--p", currentP.toFixed(4))

      if (t < 0.25) {
        const entryT = t / 0.25
        el.style.opacity = String(entryT)
        el.style.transform = `rotate(${corner.restRotation}deg) scale(${1.06 - 0.06 * entryT})`
      } else {
        el.style.opacity = "1"
        el.style.transform = `rotate(${corner.restRotation}deg) scale(1)`
      }

      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        el.style.setProperty("--p", "1")
        el.style.transform = `rotate(${corner.restRotation}deg) scale(1)`
        el.style.opacity = "1"
        el.style.transition = ""
        setPhase("stuck")
      }
    }

    requestAnimationFrame(tick)
    animCancelRef.current = () => {
      cancelled = true
    }

    return () => {
      if (animCancelRef.current) animCancelRef.current()
    }
  }, [cornerIndex, stickerNumber, stickerUrl, corner.curlAngle, corner.restRotation])

  const peel = useCallback(() => {
    if (phase !== "stuck") return
    if (animCancelRef.current) animCancelRef.current()

    const el = elRef.current
    if (!el) return

    const wasInspecting = isHovered || tilt.x !== 0 || tilt.y !== 0
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
    if (wasInspecting) {
      onHoverEnd()
    }

    const startPeelingAnimation = () => {
      el.style.transition = "none"
      el.style.transform = `translate3d(0, 0, 0) rotate(${corner.restRotation}deg) scale(1)`
      el.style.filter = "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.16)) drop-shadow(0 5px 10px rgba(0, 0, 0, 0.01))"

      const measuredSize = sizeRef.current || 110
      const vars = computeFoldVars(measuredSize, corner.curlAngle, 1.0, stickerUrl)
      for (const [k, v] of Object.entries(vars)) {
        el.style.setProperty(k, String(v))
      }

      setPhase("peeling")

      const duration = 600
      const start = performance.now()
      let cancelled = false

      function tick(now: number) {
        if (cancelled) return
        const elapsed = now - start
        const t = Math.min(1, elapsed / duration)
        const eased = t * t
        const currentP = Math.max(0, 1 - eased)
        el.style.setProperty("--p", currentP.toFixed(4))

        if (t > 0.3) {
          const flyT = (t - 0.3) / 0.7
          const flyEased = flyT * flyT
          const dx = corner.flyVector.x * flyEased
          const dy = corner.flyVector.y * flyEased
          const scale = 1.0 + 0.06 * Math.sin(flyT * Math.PI)
          const opacity = 1 - flyEased
          el.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${corner.restRotation}deg) scale(${scale})`
          el.style.opacity = String(opacity)
        } else {
          el.style.transform = `translate3d(0, 0, 0) rotate(${corner.restRotation}deg) scale(1)`
          el.style.opacity = "1"
        }

        if (t < 1) {
          requestAnimationFrame(tick)
        } else {
          el.style.opacity = "0"
          onPeelDone(cornerIndex)
        }
      }

      requestAnimationFrame(tick)
      animCancelRef.current = () => {
        cancelled = true
      }
    }

    if (wasInspecting) {
      setPhase("settling")
      const settleTimer = setTimeout(() => {
        startPeelingAnimation()
      }, 230)

      animCancelRef.current = () => {
        clearTimeout(settleTimer)
      }
    } else {
      startPeelingAnimation()
    }
  }, [cornerIndex, onPeelDone, onHoverEnd, corner.flyVector.x, corner.flyVector.y, corner.restRotation, corner.curlAngle, stickerUrl, phase, isHovered, tilt.x, tilt.y])

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    ;(el as unknown as { __peel: () => void }).__peel = peel
  }, [peel])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (phase !== "stuck") return
    if (!elRef.current) return
    const rect = elRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = ((e.clientX - centerX) / (rect.width / 2)) * 15
    const y = ((e.clientY - centerY) / (rect.height / 2)) * -15
    setTilt({ x, y })
  }, [phase])

  const handleMouseEnter = useCallback(() => {
    if (phase !== "stuck") return
    setIsHovered(true)
    onHoverStart()
  }, [phase, onHoverStart])

  const handleMouseLeave = useCallback(() => {
    if (phase !== "stuck") return
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
    onHoverEnd()
  }, [phase, onHoverEnd])

  const handleTouchStart = useCallback(() => {
    if (phase !== "stuck") return
    setIsHovered(true)
    onHoverStart()
  }, [phase, onHoverStart])

  const handleTouchEnd = useCallback(() => {
    if (phase !== "stuck") return
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
    onHoverEnd()
  }, [phase, onHoverEnd])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (phase !== "stuck") return
    if (!elRef.current || !e.touches[0]) return
    const rect = elRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = ((e.touches[0].clientX - centerX) / (rect.width / 2)) * 15
    const y = ((e.touches[0].clientY - centerY) / (rect.height / 2)) * -15
    setTilt({ x, y })
  }, [phase])

  const getTransform = () => {
    if (phase === "entering") {
      return `rotate(${corner.restRotation}deg) scale(1.06)`
    }
    if (phase === "stuck" && isHovered) {
      return `rotate(${corner.restRotation + tilt.x * 0.3}deg) scale(1.12) perspective(400px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`
    }
    return `rotate(${corner.restRotation}deg) scale(1)`
  }

  const getFilter = () => {
    if (phase === "stuck" && isHovered) {
      return "drop-shadow(0 12px 24px rgba(0,0,0,0.22))"
    }
    return "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.16)) drop-shadow(0 5px 10px rgba(0, 0, 0, 0.01))"
  }

  const isCurling = phase === "entering" || phase === "peeling"

  return (
    <div
      ref={elRef}
      className={`sticker z-30 ${phase === "stuck" ? "cursor-pointer" : "pointer-events-none"} ${corner.className}`}
      style={{
        width: "clamp(80px, 12vw, 130px)",
        height: "clamp(80px, 12vw, 130px)",
        transform: getTransform(),
        filter: getFilter(),
        opacity: phase === "entering" ? 0 : 1,
        pointerEvents: phase === "stuck" ? "auto" : "none",
        transition: phase === "settling"
          ? "transform 0.22s cubic-bezier(0.2, 0.8, 0.25, 1), filter 0.22s ease-out"
          : phase === "stuck"
          ? (isHovered ? "transform 0.15s ease-out, filter 0.15s ease-out" : "transform 0.3s ease-out, filter 0.3s ease-out")
          : "none",
        willChange: "transform, filter",
      }}
      onClick={peel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      title={translations[language]?.hero?.peelSticker || (language === 'en' ? "Click to peel off the sticker!" : "Kliknij, aby odkleić naklejkę!")}
    >
      {isCurling ? (
        <>
          <div className="sticker__layer sticker__flat">
            <img className="sticker__img" src={stickerUrl} alt={`Sticker ${stickerNumber}`} draggable={false} />
          </div>

          <div className="sticker__layer sticker__flap-shadow">
            <div className="sticker__layer sticker__flap-clip">
              <div className="sticker__layer sticker__flap-inner">
                <div className="sticker__layer sticker__flap-fill" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <img
          src={stickerUrl}
          alt={`Sticker ${stickerNumber}`}
          className="w-full h-full object-contain pointer-events-none block select-none"
          draggable={false}
        />
      )}
    </div>
  )
})

interface CornerSlotState {
  visible: boolean
  stickerNumber: number
  key: number
}

interface StickerLayerProps {
  language?: Language
}

export function StickerLayer({ language = 'pl' }: StickerLayerProps) {
  const [slots, setSlots] = useState<CornerSlotState[]>([
    { visible: false, stickerNumber: 1, key: 100 },
    { visible: false, stickerNumber: 2, key: 200 },
    { visible: false, stickerNumber: 3, key: 300 },
    { visible: false, stickerNumber: 4, key: 400 },
  ])

  const hoverCountRef = useRef(0)
  const mountedRef = useRef(true)
  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const nextCornerToCycleRef = useRef(0)

  const handleHoverStart = useCallback(() => {
    hoverCountRef.current++
    if (cycleTimerRef.current) {
      clearTimeout(cycleTimerRef.current)
      cycleTimerRef.current = null
    }
  }, [])

  const handleHoverEnd = useCallback(() => {
    hoverCountRef.current = Math.max(0, hoverCountRef.current - 1)
    if (hoverCountRef.current === 0) {
      scheduleNextCycle()
    }
  }, [])

  const handleCornerPeelDone = useCallback((cornerIndex: number) => {
    if (!mountedRef.current) return
    setSlots((prev) => {
      const next = [...prev]
      const currentNumbers = next.filter((s) => s.visible).map((s) => s.stickerNumber)
      const available = Array.from({ length: TOTAL_STICKERS }, (_, i) => i + 1).filter((n) => !currentNumbers.includes(n))
      const nextNum = available.length > 0
        ? available[Math.floor(Math.random() * available.length)]
        : Math.floor(Math.random() * TOTAL_STICKERS) + 1
      next[cornerIndex] = {
        visible: true,
        stickerNumber: nextNum,
        key: next[cornerIndex].key + 1,
      }
      return next
    })
  }, [])

  const cycleNext = useCallback(() => {
    if (!mountedRef.current || hoverCountRef.current > 0) return

    const cornerEls = containerRef.current?.querySelectorAll(".sticker")
    if (cornerEls && cornerEls.length > 0) {
      const cornerIdx = nextCornerToCycleRef.current % 4
      nextCornerToCycleRef.current = (nextCornerToCycleRef.current + 1) % 4

      const el = cornerEls[cornerIdx] as unknown as { __peel?: () => void }
      if (el && typeof el.__peel === "function") {
        el.__peel()
      }
    }
  }, [])

  const scheduleNextCycle = useCallback((customDelay?: number) => {
    if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current)
    cycleTimerRef.current = setTimeout(() => {
      if (!mountedRef.current) return
      if (hoverCountRef.current > 0) return

      cycleNext()
      scheduleNextCycle()
    }, customDelay ?? AUTO_CYCLE_INTERVAL)
  }, [cycleNext])

  useEffect(() => {
    mountedRef.current = true
    const initialNums = shuffleArray(Array.from({ length: TOTAL_STICKERS }, (_, i) => i + 1)).slice(0, 4)
    const timers: ReturnType<typeof setTimeout>[] = []

    initialNums.forEach((num, index) => {
      const t = setTimeout(() => {
        if (!mountedRef.current) return
        setSlots((prev) => {
          const next = [...prev]
          next[index] = { visible: true, stickerNumber: num, key: next[index].key }
          return next
        })
      }, 250 + index * 700)
      timers.push(t)
    })

    const totalLandingTime = 250 + 3 * 700 + 750
    const startCycleTimer = setTimeout(() => {
      if (!mountedRef.current) return
      cycleNext()
      scheduleNextCycle()
    }, totalLandingTime + FIRST_PEEL_DELAY)
    timers.push(startCycleTimer)

    return () => {
      mountedRef.current = false
      timers.forEach(clearTimeout)
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current)
    }
  }, [cycleNext, scheduleNextCycle])

  return (
    <>
      <style>{`
        @property --p {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }

        .sticker {
          position: absolute;
          user-select: none;
          pointer-events: auto;
          will-change: transform, filter;

          --fold: calc(var(--minp) + var(--span) * var(--p));
          --half-plane: polygon(
            calc((var(--fold) * var(--u0) + var(--big) * var(--w0)) * 1px)
              calc((var(--fold) * var(--u1) + var(--big) * var(--w1)) * 1px),
            calc((var(--fold) * var(--u0) - var(--big) * var(--w0)) * 1px)
              calc((var(--fold) * var(--u1) - var(--big) * var(--w1)) * 1px),
            calc(
                (
                    var(--fold) * var(--u0) - var(--big) * var(--w0) - var(--big) *
                      var(--u0)
                  ) *
                  1px
              )
              calc(
                (
                    var(--fold) * var(--u1) - var(--big) * var(--w1) - var(--big) *
                      var(--u1)
                  ) *
                  1px
              ),
            calc(
                (
                    var(--fold) * var(--u0) + var(--big) * var(--w0) - var(--big) *
                      var(--u0)
                  ) *
                  1px
              )
              calc(
                (
                    var(--fold) * var(--u1) + var(--big) * var(--w1) - var(--big) *
                      var(--u1)
                  ) *
                  1px
              )
          );
        }

        .sticker__layer {
          position: absolute;
          inset: 0;
        }

        .sticker__img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
        }

        .sticker__flat {
          clip-path: var(--half-plane);
        }

        .sticker__flap-clip {
          clip-path: var(--half-plane);
        }

        .sticker__flap-inner {
          width: 100%;
          height: 100%;
          transform-origin: 0 0;
          transform: matrix(
            var(--a),
            var(--b),
            var(--b),
            var(--d),
            calc(2 * var(--fold) * var(--u0)),
            calc(2 * var(--fold) * var(--u1))
          );
        }

        .sticker__flap-fill {
          width: 100%;
          height: 100%;
          -webkit-mask-image: var(--src);
          mask-image: var(--src);
          -webkit-mask-size: contain;
          mask-size: contain;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-position: center;
          mask-mode: alpha;
          background-image: linear-gradient(
            calc(var(--ca) * 1deg),
            #cdcdcd calc(var(--p) * 100%),
            #f3f3f3 calc((var(--p) + (1 - var(--p)) * 0.1) * 100%),
            #ffffff calc((var(--p) + (1 - var(--p)) * 0.45) * 100%),
            #f0f0f0 calc((var(--p) + (1 - var(--p)) * 0.82) * 100%),
            #c6c6c6 100%
          );
        }

        .sticker__flap-shadow {
          filter: drop-shadow(
            calc(var(--u0) * var(--s) * -0.05 * (1 - var(--p)) * 1px)
              calc((var(--u1) * -0.05 + 0.04) * var(--s) * (1 - var(--p)) * 1px)
              calc(var(--s) * 0.025 * 1px) rgba(0, 0, 0, calc(0.35 * (1 - var(--p))))
          );
        }
      `}</style>

      <div
        ref={containerRef}
        className="absolute inset-0 z-20 pointer-events-none overflow-hidden isolate"
        style={{ contain: "layout style", transform: "translateZ(0)" }}
      >
        {slots.map((slot, index) => (
          slot.visible ? (
            <CornerSticker
              key={`corner-${index}-${slot.key}`}
              cornerIndex={index}
              stickerNumber={slot.stickerNumber}
              language={language}
              onPeelDone={handleCornerPeelDone}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            />
          ) : null
        ))}
      </div>
    </>
  )
}
