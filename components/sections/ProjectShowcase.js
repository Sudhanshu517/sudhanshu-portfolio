"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { showcase } from "@/data/projects"
import { ProjectDetails, ProjectVisual } from "@/components/project/ProjectParts"
import { Reveal } from "@/components/ui/Reveal"
import { useScrollControls } from "@/components/layout/SmoothScroll"
import { usePinnedShowcase } from "@/hooks/useMedia"

const EASE = [0.22, 1, 0.36, 1]

function Pinned() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollTo } = useScrollControls()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(showcase.length - 1, Math.max(0, Math.floor(v * showcase.length))))
  })

  const jump = (i) => {
    const el = ref.current
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight - window.innerHeight
    scrollTo(top + (span * (i + 0.5)) / showcase.length)
  }

  const project = showcase[active]

  return (
    <div ref={ref} style={{ height: `${showcase.length * 105}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="grid w-full grid-cols-12 gap-10">
          <nav aria-label="Projects" className="col-span-3 xl:col-span-2">
            <p className="eyebrow mb-6">More builds</p>
            <ol className="relative border-l border-line">
              <motion.span
                aria-hidden="true"
                className="absolute -left-px top-0 w-px origin-top bg-signal"
                style={{ scaleY: scrollYProgress, height: "100%" }}
              />
              {showcase.map((p, i) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={i === active ? "true" : undefined}
                    className="group flex w-full items-baseline gap-3 py-2.5 pl-5 text-left"
                  >
                    <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={`display text-2xl leading-tight transition-colors duration-300 ${
                        i === active ? "text-ink" : "text-ink-3 group-hover:text-ink-2"
                      }`}
                    >
                      {p.name}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div className="col-span-9 xl:col-span-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 12% 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="grid items-center gap-8 xl:grid-cols-[1.05fr_1fr]"
              >
                <ProjectVisual project={project} />
                <ProjectDetails project={project} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stacked() {
  return (
    <div className="space-y-20 md:space-y-28">
      {showcase.map((project, i) => (
        <Reveal key={project.id} amount={0.15}>
          <p className="eyebrow mb-4">{String(i + 1).padStart(2, "0")} / {String(showcase.length).padStart(2, "0")}</p>
          <ProjectVisual project={project} />
          <div className="mt-8">
            <ProjectDetails project={project} />
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export function ProjectShowcase() {
  const desktop = usePinnedShowcase()
  return (
    <div className="mt-20 md:mt-8">
      {desktop ? <Pinned /> : <Stacked />}
    </div>
  )
}
