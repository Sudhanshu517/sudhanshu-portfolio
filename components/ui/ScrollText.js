"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { usePrefersReducedMotion } from "@/hooks/useMedia"

function Word({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  )
}

/** Words light up one by one as the paragraph scrolls through the viewport. */
export function ScrollText({ text, className }) {
  const ref = useRef(null)
  const reduce = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.55"],
  })
  const words = text.split(" ")

  if (reduce) return <p className={className}>{text}</p>

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          <Word
            word={word}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          />
        </span>
      ))}
    </p>
  )
}
