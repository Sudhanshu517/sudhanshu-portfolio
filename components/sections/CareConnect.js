"use client"

import { useState } from "react"
import { flagship } from "@/data/projects"
import { CareConnectSim } from "@/components/project/CareConnectSim"
import { LinkRow, StackChips } from "@/components/project/ProjectParts"
import { Reveal } from "@/components/ui/Reveal"
import { SplitText } from "@/components/ui/SplitText"

const HINTS = ["rooms", "ephemeral", "tenant", "media"]

export function CareConnect() {
  const [hint, setHint] = useState(null)

  return (
    <article aria-labelledby="careconnect-title" className="border-t border-line pt-10">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3">
            <span className="rounded-full bg-signal px-2.5 py-0.5 text-[0.62rem] text-on-signal">Flagship</span>
            {flagship.kicker}
          </p>
          <h3
            id="careconnect-title"
            className="display mt-5 text-[clamp(4rem,12.5vw,11.5rem)] leading-[0.85] tracking-[-0.04em]"
          >
            <SplitText text={flagship.name} amount={0.4} />
          </h3>
        </div>
        <Reveal delay={0.15} className="lg:col-span-5 lg:pt-6">
          <p className="text-lg text-ink md:text-xl">{flagship.summary}</p>
          <p className="mt-4 text-ink-2">{flagship.problem}</p>
          <StackChips stack={flagship.stack} className="mt-6" />
          <LinkRow links={flagship.links} className="mt-6" />
        </Reveal>
      </div>

      <Reveal className="mt-12 md:mt-16" amount={0.1}>
        <CareConnectSim hint={hint} />
        <p className="mt-3 font-mono text-[0.68rem] text-ink-2">
          Try it: add a visitor, send messages from either side, switch business, then end a session.
        </p>
      </Reveal>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
        {flagship.highlights.map((h, i) => (
          <li
            key={h.title}
            onMouseEnter={() => setHint(HINTS[i])}
            onMouseLeave={() => setHint(null)}
            onFocus={() => setHint(HINTS[i])}
            onBlur={() => setHint(null)}
            tabIndex={0}
            className="bg-paper p-7 transition-colors duration-500 hover:bg-paper-2 focus-visible:bg-paper-2 md:p-8"
          >
            <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
            <h4 className="display mt-5 text-[1.9rem] leading-[1.02]">{h.title}</h4>
            <p className="mt-3 text-sm text-ink-2">{h.body}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}
