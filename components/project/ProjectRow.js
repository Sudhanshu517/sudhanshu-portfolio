import { ArrowUpRight, Github, PlayCircle } from "lucide-react"

/** One line of the archive: hover inverts the row. Shared by the home page and /projects. */
export function ProjectRow({ project, index }) {
  const { links } = project
  const icon =
    "grid h-9 w-9 place-items-center rounded-full border border-current/30 transition-colors hover:bg-signal hover:text-on-signal hover:border-signal"

  return (
    <li className="group border-b border-line transition-colors duration-500 hover:bg-ink hover:text-paper">
      <div className="grid gap-x-8 gap-y-3 px-1 py-6 sm:px-4 md:grid-cols-[3rem_1.3fr_1.4fr_auto] md:items-center">
        <span className="eyebrow hidden text-ink-2 transition-colors group-hover:text-paper md:block">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3 className="display flex flex-wrap items-baseline gap-x-3 text-[clamp(1.8rem,3.4vw,2.8rem)] leading-none">
            {project.name}
            {project.placeholder && (
              <span className="rounded-full border border-current/40 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest">
                Details soon
              </span>
            )}
          </h3>
          <p className="mt-2 max-w-md text-sm opacity-70">{project.summary}</p>
        </div>
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.slice(0, 6).map((t) => (
            <li key={t} className="rounded-full border border-current/25 px-2.5 py-0.5 font-mono text-[0.66rem] opacity-80">
              {t}
            </li>
          ))}
        </ul>
        <div className="flex gap-2 md:justify-end">
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} on GitHub`} className={icon}>
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {links.video && (
            <a href={links.video} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} video demo`} className={icon}>
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {links.live && (
            <a href={links.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} live site`} className={icon}>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </li>
  )
}
