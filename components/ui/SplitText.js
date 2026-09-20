"use client"

import { motion } from "framer-motion"
import { EASE } from "./Reveal"

/**
 * Masked word-by-word reveal for headings.
 * The visible pieces are aria-hidden; the wrapper carries the full text.
 */
export function SplitText({
  text,
  as = "span",
  className,
  delay = 0,
  stagger = 0.06,
  amount = 0.6,
}) {
  const Tag = motion[as]
  const words = text.split(" ")

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-top pb-[0.14em] -mb-[0.14em]"
        >
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "112%" }, shown: { y: "0%" } }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
