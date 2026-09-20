"use client"

import { ThemeProvider } from "next-themes"
import { MotionConfig } from "framer-motion"
import { SmoothScroll } from "./SmoothScroll"
import { ScrollProgress } from "./ScrollProgress"
import { Cursor } from "./Cursor"
import { Navbar } from "./Navbar"

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <ScrollProgress />
          <Cursor />
          <Navbar />
          {children}
        </SmoothScroll>
      </MotionConfig>
    </ThemeProvider>
  )
}
