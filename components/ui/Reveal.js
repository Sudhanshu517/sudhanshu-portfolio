"use client"

import { motion } from "framer-motion"

const EASE = [0.22, 1, 0.36, 1]

/** Fade + rise when scrolled into view. Reduced-motion is handled by MotionConfig. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  amount = 0.2,
  as = "div",
  className,
  ...rest
}) {
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export { EASE }
