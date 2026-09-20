"use client"

import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useReducedMotion } from "framer-motion"

/** Toggles light/dark with a circular reveal from the button (View Transitions API). */
export function ThemeToggle({ className = "" }) {
  const { resolvedTheme, setTheme } = useTheme()
  const reduce = useReducedMotion()

  const toggle = async (e) => {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    const supportsTransition = typeof document.startViewTransition === "function"
    if (!supportsTransition || reduce) {
      setTheme(next)
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })
    try {
      await transition.ready
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 700,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    } catch {
      /* transition skipped — theme already applied */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className={`relative grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-signal hover:text-signal-ink ${className}`}
    >
      <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden="true" />
      <Moon className="h-[18px] w-[18px] dark:hidden" aria-hidden="true" />
    </button>
  )
}
