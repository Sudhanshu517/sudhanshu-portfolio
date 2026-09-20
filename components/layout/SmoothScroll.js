"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react"
import Lenis from "lenis"
import { useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"

const ScrollContext = createContext({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
})

export const useScrollControls = () => useContext(ScrollContext)

export function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  const reduce = useReducedMotion()
  const pathname = usePathname()

  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenisRef.current = lenis
    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduce])

  const scrollTo = useCallback(
    (target, options = {}) => {
      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.5, force: true, ...options })
        return
      }
      if (target === 0) {
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
        return
      }
      const el = typeof target === "string" ? document.querySelector(target) : target
      el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
    },
    [reduce]
  )

  const stop = useCallback(() => {
    lenisRef.current?.stop()
    if (!lenisRef.current) document.documentElement.style.overflow = "hidden"
  }, [])
  const start = useCallback(() => {
    lenisRef.current?.start()
    document.documentElement.style.overflow = ""
  }, [])

  // In-page anchors ("#work") glide instead of jumping.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.("a[href^='#']")
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return
      const hash = a.getAttribute("href")
      if (hash === "#") return
      const el = document.querySelector(hash)
      if (!el) return
      e.preventDefault()
      // A locked page (mobile menu open) must resume *before* scrolling; Lenis.start() cancels running animations.
      if (lenisRef.current?.isStopped) lenisRef.current.start()
      document.documentElement.style.overflow = ""
      scrollTo(el)
      history.pushState(null, "", hash)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [scrollTo])

  useEffect(() => {
    if (window.location.hash) return
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  const value = useMemo(() => ({ scrollTo, stop, start }), [scrollTo, stop, start])
  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
}
