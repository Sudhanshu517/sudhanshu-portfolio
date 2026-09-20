"use client"

import { useSyncExternalStore } from "react"

function subscribeTo(query) {
  return (callback) => {
    const mql = window.matchMedia(query)
    mql.addEventListener("change", callback)
    return () => mql.removeEventListener("change", callback)
  }
}

/** SSR-safe matchMedia hook; returns `fallback` on the server. */
export function useMedia(query, fallback = false) {
  return useSyncExternalStore(
    subscribeTo(query),
    () => window.matchMedia(query).matches,
    () => fallback
  )
}

// Pinned (scroll-driven) layouts only when the viewport is big enough to hold them without clipping.
export const usePinnedShowcase = () => useMedia("(min-width: 1280px) and (min-height: 660px)")
export const usePinnedSteps = () => useMedia("(min-width: 1024px) and (min-height: 640px)")
// Hydration-safe: server + first client render agree (false), then it updates.
export const usePrefersReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)")
export const useFinePointer = () => useMedia("(hover: hover) and (pointer: fine)")
