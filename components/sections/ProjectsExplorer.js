"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { archive, flagship, showcase } from "@/data/projects"
import { ProjectRow } from "@/components/project/ProjectRow"

const everything = [flagship, ...showcase, ...archive]

const techCounts = everything
  .flatMap((p) => p.stack)
  .reduce((acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1), new Map())
const topTech = [...techCounts.entries()]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .slice(0, 14)
  .map(([t]) => t)

export function ProjectsExplorer() {
  const [query, setQuery] = useState("")
  const [tech, setTech] = useState(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return everything.filter((p) => {
      if (tech && !p.stack.includes(tech)) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.stack.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [query, tech])

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <label className="relative block w-full md:max-w-md">
          <span className="sr-only">Search projects</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, technology or keyword"
            className="w-full rounded-full border border-line-strong bg-paper py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-ink-3 focus-visible:border-signal focus-visible:ring-2 focus-visible:ring-signal/40"
          />
        </label>
        <p className="font-mono text-xs text-ink-2" aria-live="polite">
          {results.length} of {everything.length} projects
        </p>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Filter by technology">
        {topTech.map((t) => (
          <li key={t}>
            <button
              type="button"
              aria-pressed={tech === t}
              onClick={() => setTech((c) => (c === t ? null : t))}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                tech === t ? "border-signal bg-signal text-on-signal" : "border-line-strong hover:border-ink"
              }`}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>

      {results.length ? (
        <ul className="mt-10 border-t border-line">
          {results.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </ul>
      ) : (
        <p className="mt-16 text-center text-ink-2">Nothing matches that search. Try another technology.</p>
      )}
    </div>
  )
}
