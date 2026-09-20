import { ArrowUpRight, Github, PlayCircle } from "lucide-react"
import { BrowserFrame } from "./BrowserFrame"
import { PipelineVisual } from "./PipelineVisual"
import { BuilderVisual } from "./BuilderVisual"

export function LinkRow({ links, className = "" }) {
  const item =
    "inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-on-signal"
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {links.github && (
        <a href={links.github} target="_blank" rel="noopener noreferrer" className={item}>
          <Github className="h-4 w-4" aria-hidden="true" /> GitHub
        </a>
      )}
      {links.live && (
        <a href={links.live} target="_blank" rel="noopener noreferrer" className={item}>
          Live site <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
      {links.video && (
        <a href={links.video} target="_blank" rel="noopener noreferrer" className={item}>
          <PlayCircle className="h-4 w-4" aria-hidden="true" /> Video demo
        </a>
      )}
    </div>
  )
}

export function StackChips({ stack, className = "" }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies">
      {stack.map((t) => (
        <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] text-ink-2">
          {t}
        </li>
      ))}
    </ul>
  )
}

function frameUrl(project) {
  if (project.links.live) return new URL(project.links.live).host
  return `github.com/Sudhanshu517/${project.links.github.split("/").pop()}`
}

export function ProjectVisual({ project }) {
  return (
    <BrowserFrame url={frameUrl(project)} label={project.interactive ? "Interactive" : "Flow"}>
      {project.interactive === "builder" ? (
        <BuilderVisual />
      ) : (
        <PipelineVisual flow={project.flow} pattern={project.pattern} />
      )}
    </BrowserFrame>
  )
}

export function ProjectDetails({ project, headingTag: Heading = "h3" }) {
  return (
    <div>
      <p className="eyebrow flex flex-wrap items-center gap-3">
        {project.kicker}
        {project.status && (
          <span className="rounded-full bg-signal px-2.5 py-0.5 text-[0.62rem] text-on-signal">{project.status}</span>
        )}
      </p>
      <Heading className="display mt-3 text-[clamp(2.6rem,5vw,4.4rem)]">{project.name}</Heading>
      <p className="mt-4 max-w-xl text-ink-2">{project.summary}</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h4 className="eyebrow mb-2">The problem</h4>
          <p className="text-sm text-ink-2">{project.problem}</p>
        </div>
        <div>
          <h4 className="eyebrow mb-2">Key features</h4>
          <ul className="space-y-1.5 text-sm text-ink-2">
            {project.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <StackChips stack={project.stack} className="mt-6" />
      <LinkRow links={project.links} className="mt-6" />
    </div>
  )
}
