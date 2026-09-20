"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { skillGroups } from "@/data/skills"
import { allProjects } from "@/data/projects"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Reveal } from "@/components/ui/Reveal"

// Only projects that actually list a stack take part in the linking.
const linkable = allProjects.filter((p) => p.stack.length > 0)

export function Stack() {
  const [tech, setTech] = useState(null)
  const [project, setProject] = useState(null)

  const litTech = useMemo(() => {
    if (tech) return new Set([tech])
    if (project) return new Set(linkable.find((p) => p.id === project)?.stack ?? [])
    return null
  }, [tech, project])

  const litProjects = useMemo(() => {
    if (project) return new Set([project])
    if (tech) return new Set(linkable.filter((p) => p.stack.includes(tech)).map((p) => p.id))
    return null
  }, [tech, project])

  const readout = tech
    ? litProjects.size
      ? `${tech} is used in ${litProjects.size} ${litProjects.size === 1 ? "project" : "projects"}: ${linkable
          .filter((p) => litProjects.has(p.id))
          .map((p) => p.name)
          .join(", ")}.`
      : `${tech} is on my resume, but isn't tagged on a specific project here.`
    : project
      ? `${linkable.find((p) => p.id === project).name} is built with ${linkable
          .find((p) => p.id === project)
          .stack.join(", ")}.`
      : "Hover or tap a technology to see where I've used it — or a project to see what it's built with."

  const clear = () => {
    setTech(null)
    setProject(null)
  }

  return (
    <section id="stack" aria-labelledby="stack-title" className="relative border-t border-line bg-paper-2 px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          id="stack-title"
          index="02"
          eyebrow="Technical identity"
          title="Tools I reach for."
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16" onMouseLeave={clear}>
          <div className="lg:col-span-8">
            {skillGroups.map((group, gi) => (
              <Reveal
                key={group.id}
                delay={gi * 0.05}
                className="grid gap-3 border-t border-line py-6 md:grid-cols-[10rem_1fr] md:gap-8 md:py-8"
              >
                <h3 className="eyebrow pt-2">{group.label}</h3>
                <ul className="flex flex-wrap gap-x-2 gap-y-1">
                  {group.items.map((item) => {
                    const on = litTech?.has(item)
                    const dim = litTech && !on
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          aria-pressed={tech === item}
                          onMouseEnter={() => {
                            setProject(null)
                            setTech(item)
                          }}
                          onFocus={() => {
                            setProject(null)
                            setTech(item)
                          }}
                          onClick={() => setTech((t) => (t === item ? null : item))}
                          className={`display relative rounded-full px-3 py-0.5 text-[clamp(1.7rem,3.2vw,2.9rem)] transition-all duration-300 ${
                            on ? "bg-signal text-on-signal" : dim ? "text-ink-3" : "text-ink hover:text-signal-ink"
                          }`}
                        >
                          {item}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </Reveal>
            ))}
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow mb-4">Where it&rsquo;s used</p>
              <div aria-live="polite" className="min-h-[5.5rem] text-[0.95rem] text-ink-2">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={readout}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {readout}
                  </motion.p>
                </AnimatePresence>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2 lg:block lg:space-y-1">
                {linkable.map((p) => {
                  const on = litProjects?.has(p.id)
                  const dim = litProjects && !on
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        aria-pressed={project === p.id}
                        onMouseEnter={() => {
                          setTech(null)
                          setProject(p.id)
                        }}
                        onFocus={() => {
                          setTech(null)
                          setProject(p.id)
                        }}
                        onClick={() => setProject((c) => (c === p.id ? null : p.id))}
                        className={`flex w-full items-center justify-between gap-6 rounded-full border px-4 py-2 text-left text-sm transition-all duration-300 lg:rounded-xl lg:py-3 ${
                          on
                            ? "border-signal bg-signal text-on-signal"
                            : dim
                              ? "border-line text-ink-3"
                              : "border-line-strong hover:border-ink"
                        }`}
                      >
                        <span className="font-medium">{p.name}</span>
                        <span className="hidden font-mono text-[0.68rem] lg:block">{p.stack.length} tech</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
              {(tech || project) && (
                <button
                  type="button"
                  onClick={clear}
                  className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-2 underline underline-offset-4 hover:text-ink"
                >
                  Clear selection
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
