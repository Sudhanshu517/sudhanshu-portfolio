"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { tracks } from "@/data/engineering"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { useScrollControls } from "@/components/layout/SmoothScroll"
import { usePinnedSteps } from "@/hooks/useMedia"

const EASE = [0.22, 1, 0.36, 1]

function Diagram({ track, active }) {
  const n = track.nodes.length
  return (
    <div>
      <div className="relative mb-3 h-6" aria-hidden="true">
        <div className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
        {track.nodes.map((_, i) => (
          <span
            key={i}
            className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-line-strong"
            style={{ left: `${((i + 0.5) / n) * 100}%` }}
          />
        ))}
        <motion.span
          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_0_6px_color-mix(in_srgb,var(--signal)_25%,transparent)]"
          animate={{ left: `${((active + 0.5) / n) * 100}%` }}
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
        />
      </div>
      <ol className="grid gap-2" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {track.nodes.map((node, i) => (
          <li
            key={node.label}
            className={`rounded-xl border px-2 py-3 text-center transition-colors duration-500 sm:px-3 ${
              i === active ? "border-ink bg-ink text-paper" : "border-line-strong"
            }`}
          >
            <span className="block text-[0.72rem] font-medium leading-tight sm:text-sm">{node.label}</span>
            <span className={`mt-0.5 block font-mono text-[0.58rem] leading-tight sm:text-[0.66rem] ${i === active ? "opacity-70" : "text-ink-2"}`}>
              {node.sub}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Code({ lines, lit }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line-strong bg-paper-2">
      <figcaption className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="eyebrow">Simplified illustration</span>
        <span className="font-mono text-[0.62rem] text-ink-2">JavaScript</span>
      </figcaption>
      <pre className="overflow-x-auto py-3 font-mono text-[0.72rem] leading-6 sm:text-[0.78rem]" tabIndex={0}>
        <code>
          {lines.map((line, i) => (
            <span
              key={i}
              className={`block whitespace-pre px-4 transition-colors duration-500 ${
                lit.includes(i) ? "bg-signal/25 text-ink" : "text-ink-2"
              }`}
            >
              {line}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  )
}

function Stage({ track, step }) {
  const current = track.steps[step]
  return (
    <div className="space-y-5">
      <Diagram track={track} active={current.node} />
      <div className="min-h-[13rem]">
        <AnimatePresence mode="wait" initial={false}>
          {current.stats ? (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="grid grid-cols-2 gap-4 rounded-2xl border border-line-strong bg-paper-2 p-6"
            >
              {current.stats.map((s) => (
                <div key={s.label}>
                  <p className="display text-[clamp(3.4rem,7vw,5.6rem)] leading-none text-signal-ink">{s.value}</p>
                  <p className="mt-2 text-sm text-ink-2">{s.label}</p>
                </div>
              ))}
              <p className="col-span-2 font-mono text-[0.68rem] text-ink-2">
                Results reported for the modules built during the Yahweh Software Solutions internship.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`${track.id}-code`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <Code lines={track.code} lit={current.lines} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function Engineering() {
  const desktop = usePinnedSteps()
  const [trackId, setTrackId] = useState("rest")
  const [step, setStep] = useState(0)
  const ref = useRef(null)
  const { scrollTo } = useScrollControls()
  const track = tracks.find((t) => t.id === trackId)
  const n = track.steps.length

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (desktop) setStep(Math.min(n - 1, Math.max(0, Math.floor(v * n))))
  })

  const jump = (i) => {
    if (!desktop) return setStep(i)
    const el = ref.current
    const top = el.getBoundingClientRect().top + window.scrollY
    scrollTo(top + ((el.offsetHeight - window.innerHeight) * (i + 0.5)) / n)
  }

  const pickTrack = (id) => {
    setTrackId(id)
    setStep(0)
  }

  return (
    <section id="engineering" aria-labelledby="engineering-title" className="relative border-t border-line bg-paper-2 px-5 pt-24 md:px-10 md:pt-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          id="engineering-title"
          index="04"
          eyebrow="Engineering"
          title="What happens behind the UI."
          lead="Two paths through systems I've actually built — a REST request and a real-time chat session."
        />

        <div
          ref={ref}
          style={desktop ? { height: `${n * 78 + 60}vh` } : undefined}
          className="relative"
        >
          <div className={desktop ? "sticky top-0 flex h-screen items-center" : ""}>
            <div className="grid w-full gap-10 pb-24 lg:grid-cols-12 lg:gap-16 lg:pb-0">
              <div className="min-w-0 lg:col-span-5">
                <div role="tablist" aria-label="Choose a path" className="mb-8 inline-flex rounded-full bg-paper p-1">
                  {tracks.map((t) => (
                    <button
                      key={t.id}
                      role="tab"
                      aria-selected={t.id === trackId}
                      onClick={() => pickTrack(t.id)}
                      className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                        t.id === trackId ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <p className="eyebrow mb-5">{track.source}</p>

                <ol className="border-l border-line">
                  {track.steps.map((s, i) => {
                    const on = i === step
                    return (
                      <li key={s.title} className="relative">
                        <span
                          aria-hidden="true"
                          className={`absolute -left-[5px] top-[1.15rem] h-[9px] w-[9px] rounded-full transition-all duration-300 ${
                            on ? "scale-150 bg-signal" : i < step ? "bg-ink" : "bg-line-strong"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => jump(i)}
                          aria-current={on ? "step" : undefined}
                          className="block w-full py-2.5 pl-6 text-left"
                        >
                          <span className="eyebrow">Step {i + 1}</span>
                          <span
                            className={`display mt-0.5 block text-[clamp(1.5rem,2.3vw,2rem)] leading-tight transition-colors duration-300 ${
                              on ? "text-ink" : "text-ink-3"
                            }`}
                          >
                            {s.title}
                          </span>
                          <AnimatePresence initial={false}>
                            {on && (
                              <motion.span
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: EASE }}
                                className="block overflow-hidden text-sm text-ink-2"
                              >
                                <span className="block pt-2">{s.body}</span>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>
                      </li>
                    )
                  })}
                </ol>

                {!desktop && (
                  <div className="mt-6 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      disabled={step === 0}
                      aria-label="Previous step"
                      className="grid h-11 w-11 place-items-center rounded-full border border-line-strong disabled:opacity-30"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.min(n - 1, s + 1))}
                      disabled={step === n - 1}
                      aria-label="Next step"
                      className="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper disabled:opacity-30"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="min-w-0 lg:col-span-7">
                <Stage track={track} step={step} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
