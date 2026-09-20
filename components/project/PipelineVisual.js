"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"

/**
 * A stage-by-stage flow built from the project's own description.
 * Auto-advances while visible; hovering or focusing a stage takes over.
 */
export function PipelineVisual({ flow, pattern = "grid" }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: "-15% 0px" })
  const reduce = useReducedMotion()
  const [auto, setAuto] = useState(0)
  const [held, setHeld] = useState(null)

  useEffect(() => {
    if (!inView || reduce || held !== null) return
    const id = setInterval(() => setAuto((i) => (i + 1) % flow.length), 1500)
    return () => clearInterval(id)
  }, [inView, reduce, held, flow.length])

  const active = held ?? auto

  return (
    <div ref={ref} className={`pattern-${pattern} p-4 sm:p-6`}>
      <ol className="relative">
        {flow.map((stage, i) => {
          const on = i === active
          const passed = i < active
          return (
            <li key={stage.label} className="relative pl-10">
              {i < flow.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute left-[15px] top-8 h-[calc(100%-0.25rem)] w-px transition-colors duration-500 ${
                    passed ? "bg-signal" : "bg-line-strong"
                  }`}
                />
              )}
              <span
                aria-hidden="true"
                className={`absolute left-2 top-[0.95rem] grid h-4 w-4 place-items-center rounded-full border-2 transition-all duration-300 ${
                  on ? "scale-125 border-signal bg-signal" : passed ? "border-signal bg-paper" : "border-line-strong bg-paper"
                }`}
              />
              <button
                type="button"
                onMouseEnter={() => setHeld(i)}
                onMouseLeave={() => setHeld(null)}
                onFocus={() => setHeld(i)}
                onBlur={() => setHeld(null)}
                onClick={() => setHeld((h) => (h === i ? null : i))}
                aria-pressed={on}
                className={`mb-2 w-full rounded-xl border px-4 py-2.5 text-left transition-all duration-300 ${
                  on ? "border-signal bg-paper shadow-sm" : "border-transparent hover:bg-paper/70"
                }`}
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="display text-[1.55rem] leading-none">{stage.label}</span>
                  <span className="font-mono text-[0.62rem] text-ink-2">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="mt-1 block font-mono text-[0.7rem] text-ink-2">{stage.sub}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
