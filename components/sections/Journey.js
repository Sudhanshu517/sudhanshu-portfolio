"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { journey } from "@/data/journey"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Reveal } from "@/components/ui/Reveal"

export function Journey() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] })
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  return (
    <section id="journey" aria-labelledby="journey-title" className="relative border-t border-line bg-paper-2 px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          id="journey-title"
          index="06"
          eyebrow="Journey"
          title="Learning, building, shipping."
          lead="From first-year coursework to internships, leadership and freelance work."
        />

        <ol ref={ref} className="relative">
          <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 w-px bg-line-strong md:left-[calc(12rem+7px)]" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: draw }}
            className="absolute bottom-0 left-[6px] top-2 w-[3px] origin-top bg-signal md:left-[calc(12rem+6px)]"
          />

          {journey.map((item) => {
            const now = item.id === "now"
            return (
              <li key={item.id} className="relative grid gap-3 pb-14 pl-10 last:pb-0 md:grid-cols-[12rem_1fr] md:gap-0 md:pl-0">
                <Reveal className="md:pr-10 md:text-right" y={16}>
                  <p className="font-mono text-sm text-ink-2 md:pt-1.5">{item.when}</p>
                </Reveal>

                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 md:left-[calc(12rem)] ${
                    now ? "border-signal bg-signal" : "border-ink bg-paper-2"
                  }`}
                />
                {now && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 h-[15px] w-[15px] animate-ping rounded-full bg-signal md:left-[calc(12rem)]"
                  />
                )}

                <Reveal className="md:pl-12 xl:grid xl:grid-cols-[1fr_1.15fr] xl:gap-14" delay={0.05}>
                  <div>
                  <span className="eyebrow">{item.kind}</span>
                  <h3 className="display mt-2 text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.02]">{item.title}</h3>
                  <p className="mt-1.5 font-medium text-signal-ink">{item.org}</p>
                  </div>
                  <ul className="mt-4 max-w-2xl space-y-2 text-[0.95rem] text-ink-2 xl:mt-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-ink-3" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
