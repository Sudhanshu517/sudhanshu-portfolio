import { ArrowUpRight } from "lucide-react"
import { coreCS, hackathons, profile } from "@/data/profile"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Reveal } from "@/components/ui/Reveal"
import { Counter } from "@/components/ui/Counter"
import { PathfindingViz } from "@/components/viz/PathfindingViz"
import { btnGhost } from "@/lib/styles"

export function ProblemSolving() {
  return (
    <section id="problem-solving" aria-labelledby="dsa-title" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          id="dsa-title"
          index="05"
          eyebrow="Problem solving"
          title="Algorithms, in practice."
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="display text-[clamp(6rem,15vw,13rem)] leading-[0.8] text-signal-ink">
              <Counter value={300} suffix="+" />
            </p>
            <p className="mt-4 text-lg font-medium">Data structures &amp; algorithms problems solved</p>
            <p className="mt-2 max-w-sm text-ink-2">
              Across coding platforms — with my profile on TUF for the details.
            </p>
            <a
              href={profile.links.dsa}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnGhost} mt-6`}
            >
              DSA profile <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <PathfindingViz />
            <p className="mt-3 font-mono text-[0.68rem] text-ink-2">
              BFS explores every direction evenly; A* uses a distance heuristic to explore fewer cells. Draw walls
              and compare.
            </p>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-14 border-t border-line pt-14 md:mt-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h3 className="eyebrow mb-5">CS foundations</h3>
            <ul className="flex flex-wrap gap-2">
              {coreCS.map((topic) => (
                <li key={topic} className="rounded-full border border-line-strong px-4 py-2 text-sm">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <h3 className="eyebrow mb-5">Competitions</h3>
            <ul className="divide-y divide-line border-y border-line">
              {hackathons.map((h) => (
                <Reveal as="li" key={h.title} className="grid gap-2 py-6 md:grid-cols-[1.2fr_1fr] md:gap-8">
                  <div>
                    <p className="display text-[clamp(1.7rem,2.8vw,2.4rem)] leading-tight">{h.title}</p>
                    <p className="mt-2 text-sm text-ink-2">{h.detail}</p>
                  </div>
                  <p className="font-mono text-sm text-signal-ink md:text-right">{h.result}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
