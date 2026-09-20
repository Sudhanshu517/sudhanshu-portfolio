"use client"

import { useEffect, useRef } from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"

const format = (n, decimals) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

/** Counts up once when scrolled into view. Final value is in the server HTML. */
export function Counter({ value, decimals = 0, suffix = "", duration = 1.8, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-12% 0px" })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !ref.current) return
    ref.current.textContent = format(0, decimals)
  }, [reduce, decimals])

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v, decimals)
      },
    })
    return () => controls.stop()
  }, [inView, reduce, value, decimals, duration])

  return (
    <span className={className}>
      <span ref={ref}>{format(value, decimals)}</span>
      {suffix}
    </span>
  )
}
