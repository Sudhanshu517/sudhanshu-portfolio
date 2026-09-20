import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProjectsExplorer } from "@/components/sections/ProjectsExplorer"
import { SplitText } from "@/components/ui/SplitText"

export const metadata = {
  title: "Projects",
  description:
    "Every project by Sudhanshu — CareConnect, InsightMiner AI, AI Prep Tracker, Startup Builder and more. Search by name or technology.",
  alternates: { canonical: "/projects" },
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-10 md:pt-40">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-2 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Back to work
      </Link>
      <h1 className="display mt-6 text-[clamp(3.6rem,11vw,10rem)]">
        <SplitText text="Every project." amount={0.2} />
      </h1>
      <p className="mt-6 max-w-xl text-lg text-ink-2">
        The flagship builds, the AI experiments and the early ones — searchable by name or technology.
      </p>
      <div className="mt-14">
        <ProjectsExplorer />
      </div>
    </div>
  )
}
