"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { useFinePointer } from "@/hooks/useMedia"

const INTERACTIVE = "a, button, input, textarea, select, summary, [role='button']"

/**
 * A trailing ring that grows over interactive elements.
 * Elements can opt into a text label with data-cursor="View".
 * The native cursor is never hidden.
 */
export function Cursor() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 420, damping: 38, mass: 0.35 })
  const [hover, setHover] = useState({ on: false, label: "" })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!fine || reduce) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e) => {
      const labelled = e.target.closest?.("[data-cursor]")
      const interactive = e.target.closest?.(INTERACTIVE)
      setHover({
        on: Boolean(labelled || interactive),
        label: labelled?.getAttribute("data-cursor") ?? "",
      })
    }
    const leave = () => setVisible(false)
    window.addEventListener("pointermove", move, { passive: true })
    document.addEventListener("pointerover", over, { passive: true })
    document.documentElement.addEventListener("pointerleave", leave)
    return () => {
      window.removeEventListener("pointermove", move)
      document.removeEventListener("pointerover", over)
      document.documentElement.removeEventListener("pointerleave", leave)
    }
  }, [fine, reduce, x, y])

  if (!fine || reduce) return null

  const size = hover.label ? 84 : hover.on ? 46 : 26

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[95]"
    >
      <motion.div
        animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border font-mono text-[0.65rem] uppercase tracking-widest transition-colors duration-200 ${
          hover.label
            ? "border-signal bg-signal text-on-signal"
            : hover.on
              ? "border-signal bg-signal/15"
              : "border-ink/60"
        }`}
      >
        {hover.label}
      </motion.div>
    </motion.div>
  )
}
