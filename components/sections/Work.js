import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { archive } from "@/data/projects"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { CareConnect } from "./CareConnect"
import { ProjectShowcase } from "./ProjectShowcase"
import { ProjectRow } from "@/components/project/ProjectRow"
import { btnPrimary } from "@/lib/styles"
import { Magnetic } from "@/components/ui/Magnetic"

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          id="work-title"
          index="03"
          eyebrow="Selected work"
          title="Products, not exercises."
          lead="A real-time SaaS, an NLP pipeline, and AI-assisted tools — each built end to end."
        />

        <CareConnect />
        <ProjectShowcase />

        <div className="mt-28 md:mt-40">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h3 className="display text-[clamp(2.4rem,5vw,4.4rem)]">Archive</h3>
            <p className="max-w-sm text-sm text-ink-2">
              Smaller builds and experiments — interfaces, clones and early projects.
            </p>
          </div>
          <ul className="border-t border-line">
            {archive.map((p, i) => (
              <ProjectRow key={p.id} project={p} index={i} />
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <Magnetic>
              <Link href="/projects" className={btnPrimary} data-cursor="Open">
                Browse every project <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
