"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  motionValue,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowDown, ArrowUpRight, Github, Linkedin } from "lucide-react"
import { heroRotator, profile } from "@/data/profile"
import { HeroBackground } from "@/components/three/HeroBackground"
import { Magnetic } from "@/components/ui/Magnetic"
import { usePrefersReducedMotion } from "@/hooks/useMedia"
import { btnGhost, btnPrimary, iconBtn } from "@/lib/styles"
import { EASE } from "@/components/ui/Reveal"

const LETTERS = profile.name.split("")

const LAYERS = [
  { label: "Client", stack: "React · Next.js" },
  { label: "API", stack: "Node.js · Express · Socket.IO" },
  { label: "Data", stack: "MongoDB · PostgreSQL" },
]

function NameLetter({ char, index, y }) {
  const spring = useSpring(y, { stiffness: 240, damping: 20, mass: 0.6 })
  return (
    <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top">
      <motion.span
        className="inline-block"
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.05, ease: EASE, delay: 0.15 + index * 0.06 }}
      >
        <motion.span
          data-letter
          style={{ y: spring }}
          className="inline-block transition-colors duration-300 hover:text-signal"
        >
          {char}
        </motion.span>
      </motion.span>
    </span>
  )
}

function Rotator() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [widths, setWidths] = useState(null)
  const measureRefs = useRef([])

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setIndex((i) => (i + 1) % heroRotator.length), 2600)
    return () => clearInterval(id)
  }, [reduce])

  // Measure each word so the container can animate its real width (no gap before "software.").
  useLayoutEffect(() => {
    const measure = () => setWidths(measureRefs.current.map((el) => el?.offsetWidth ?? 0))
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <>
      <span className="sr-only">full-stack, real-time and AI-enabled</span>
      <motion.span
        aria-hidden="true"
        className="relative inline-block overflow-hidden whitespace-nowrap align-bottom italic text-signal-ink"
        style={{ paddingRight: '0.06em', marginRight: '-0.06em' }}
        initial={false}
        animate={widths ? { width: widths[index] + 6 } : undefined}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="pointer-events-none invisible absolute left-0 top-0 h-0 overflow-hidden">
          {heroRotator.map((word, i) => (
            <span key={word} ref={(el) => (measureRefs.current[i] = el)} className="inline-block">
              {word}
            </span>
          ))}
        </span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={heroRotator[index]}
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {heroRotator[index]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  )
}

function RequestHud({ layer }) {
  return (
    <aside
      aria-label="Live request path through my typical stack"
      className="hidden w-64 shrink-0 md:block"
    >
      <p className="eyebrow mb-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
        Request path
      </p>
      <ol className="border-l border-line">
        {LAYERS.map((item, i) => {
          const on = layer === i
          return (
            <li key={item.label} className="relative pl-4 pb-3 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute -left-[4px] top-[0.55rem] h-[7px] w-[7px] rounded-full transition-all duration-300 ${
                  on ? "scale-150 bg-signal" : "bg-ink-3"
                }`}
              />
              <span className={`block text-sm font-medium transition-colors ${on ? "text-ink" : "text-ink-2"}`}>
                {item.label}
              </span>
              <span className="block font-mono text-[0.7rem] text-ink-2">{item.stack}</span>
            </li>
          )
        })}
      </ol>
      <p className="mt-4 font-mono text-[0.68rem] leading-relaxed text-ink-2">
        Move the cursor to push the graph. Click to send a request.
      </p>
    </aside>
  )
}

export function Hero() {
  const sectionRef = useRef(null)
  const pointer = useRef({ x: 0, y: 0, inside: false, clicks: 0 })
  const progress = useRef(0)
  const nameRef = useRef(null)
  const [letterY] = useState(() => LETTERS.map(() => motionValue(0)))
  const [layer, setLayer] = useState(0)
  const inView = useInView(sectionRef, { margin: "160px 0px" })
  const reduce = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-10%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const onPointerMove = (e) => {
    const r = sectionRef.current.getBoundingClientRect()
    pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1
    pointer.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1)
    pointer.current.inside = true

    const nr = nameRef.current?.getBoundingClientRect()
    if (nr && e.clientY > nr.top - 80 && e.clientY < nr.bottom + 80) {
      nameRef.current.querySelectorAll("[data-letter]").forEach((el, i) => {
        const b = el.getBoundingClientRect()
        const d = Math.abs(e.clientX - (b.left + b.width / 2))
        const f = Math.max(0, 1 - d / 230)
        letterY[i].set(-f * f * 34)
      })
    } else {
      letterY.forEach((m) => m.set(0))
    }
  }
  const onPointerLeave = () => {
    pointer.current.x = 0
    pointer.current.y = 0
    pointer.current.inside = false
    letterY.forEach((m) => m.set(0))
  }
  const onPointerDown = (e) => {
    if (e.target.closest("a, button")) return
    pointer.current.clicks += 1
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Introduction"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      className="relative min-h-[100svh] overflow-hidden"
    >
      <motion.div aria-hidden="true" style={{ y: bgY }} className="absolute inset-0">
        <HeroBackground pointer={pointer} progress={progress} active={inView} onLayer={setLayer} />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[55%] bg-gradient-to-t from-paper via-paper/85 to-transparent md:hidden"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="pointer-events-none relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-5 pb-8 pt-24 md:px-10 md:pt-28"
      >
        <div className="flex items-start justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
            className="space-y-1"
          >
            <p className="eyebrow">{profile.title}</p>
            <p className="eyebrow">B.Tech CSE · MSIT · {profile.education.period.split("–")[1].trim()}</p>
            <p className="eyebrow">{profile.location}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <RequestHud layer={layer} />
          </motion.div>
        </div>

        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="eyebrow mb-3 md:mb-5"
          >
            Hi, I&rsquo;m
          </motion.p>

          <h1
            ref={nameRef}
            aria-label={profile.name}
            className="display pointer-events-auto -ml-[0.04em] select-none text-[22vw] leading-[0.82] md:text-[clamp(4.2rem,19.4vw,21rem)] tracking-[-0.045em]"
          >
            {LETTERS.map((char, i) => (
              <NameLetter key={i} char={char} index={i} y={letterY[i]} />
            ))}
          </h1>

          <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-[1.35fr_1fr] md:items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.9, ease: EASE }}
            >
              <p className="display text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.02]">
                I build <Rotator /> software.
              </p>
              <p className="mt-4 max-w-md text-[0.95rem] text-ink-2 md:text-base">{profile.tagline}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
              className="pointer-events-auto flex flex-wrap items-center gap-3 md:justify-end"
            >
              <Magnetic>
                <a href="#work" data-cursor="Explore" className={btnPrimary}>
                  View projects <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={profile.links.resume} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                  Resume <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic strength={0.5}>
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconBtn}>
                  <Github className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic strength={0.5}>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconBtn}>
                  <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
