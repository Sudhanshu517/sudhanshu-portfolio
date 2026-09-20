"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { useMedia } from "@/hooks/useMedia"
import { useTheme } from "next-themes"
import { GraphFallback } from "./GraphFallback"

// three.js + R3F are only fetched after first paint, and only if WebGL is usable.
const SystemGraph = dynamic(() => import("./SystemGraph"), { ssr: false })

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl")
    if (!gl) return false
  } catch {
    return false
  }
  const cores = navigator.hardwareConcurrency ?? 8
  const memory = navigator.deviceMemory ?? 8
  return cores > 2 && memory > 2
}

export function HeroBackground({ pointer, progress, active, onLayer }) {
  const reduce = useReducedMotion()
  const { resolvedTheme } = useTheme()
  const [enabled, setEnabled] = useState(false)
  const [ready, setReady] = useState(false)
  const compact = useMedia("(max-width: 767px)")

  useEffect(() => {
    if (!canUseWebGL()) return
    const start = () => setEnabled(true)
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1200 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(start, 400)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="absolute inset-0">
      <GraphFallback
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
      {enabled && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
        >
          <SystemGraph
            pointer={pointer}
            progress={progress}
            dark={resolvedTheme === "dark"}
            count={compact ? 48 : 78}
            still={Boolean(reduce)}
            active={active}
            onLayer={onLayer}
            onReady={() => setReady(true)}
          />
        </div>
      )}
    </div>
  )
}
