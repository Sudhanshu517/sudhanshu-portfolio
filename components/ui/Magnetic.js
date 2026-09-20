"use client"

import { useRef } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { useFinePointer } from "@/hooks/useMedia"

/** Pulls its child toward the pointer. No-op on touch devices and reduced motion. */
export function Magnetic({ children, strength = 0.32, className }) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  if (!fine || reduce) return <span className={className ?? "inline-block"}>{children}</span>

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className ?? "inline-block"}
    >
      {children}
    </motion.span>
  )
}
