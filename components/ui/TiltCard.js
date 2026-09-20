"use client"

import { useRef } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"
import { useFinePointer } from "@/hooks/useMedia"

/** Card that tilts toward the cursor; `depth` layers move opposite for parallax. */
export function TiltCard({ children, className, max = 7 }) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 180, damping: 18 })
  const sy = useSpring(py, { stiffness: 180, damping: 18 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max])
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max])

  const enabled = fine && !reduce

  const onMove = (e) => {
    if (!enabled) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={enabled ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
