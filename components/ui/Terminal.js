"use client"

import { useEffect, useRef, useState } from "react"
import { profile } from "@/data/profile"
import { flagship, showcase } from "@/data/projects"
import { skillGroups } from "@/data/skills"

const CHIPS = ["help", "whoami", "email", "github", "linkedin", "resume", "projects", "skills"]

const Ext = ({ href, children }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    className="underline decoration-signal decoration-2 underline-offset-4 hover:text-signal"
  >
    {children}
  </a>
)

function respond(cmd, { copy, clear }) {
  switch (cmd) {
    case "help":
      return (
        <div className="grid grid-cols-[6.5rem_1fr] gap-x-3">
          {[
            ["whoami", "who I am"],
            ["email", "my email address"],
            ["copy", "copy my email to the clipboard"],
            ["github", "GitHub profile"],
            ["linkedin", "LinkedIn profile"],
            ["resume", "open my resume (PDF)"],
            ["dsa", "DSA profile on TUF"],
            ["projects", "what I've built"],
            ["skills", "my stack"],
            ["clear", "clear the screen"],
          ].map(([name, desc]) => (
            <div key={name} className="contents">
              <span className="text-signal">{name}</span>
              <span className="opacity-70">{desc}</span>
            </div>
          ))}
        </div>
      )
    case "whoami":
      return `${profile.name} — ${profile.title}. B.Tech CSE at ${profile.education.school}, ${profile.education.period}. Based in ${profile.location}.`
    case "email":
      return <Ext href={`mailto:${profile.email}`}>{profile.email}</Ext>
    case "copy":
      copy()
      return `Copied ${profile.email} to your clipboard.`
    case "github":
      return <Ext href={profile.links.github}>{profile.links.github}</Ext>
    case "linkedin":
      return <Ext href={profile.links.linkedin}>{profile.links.linkedin}</Ext>
    case "resume":
      return <Ext href={profile.links.resume}>Open resume.pdf</Ext>
    case "dsa":
      return <Ext href={profile.links.dsa}>{profile.links.dsa}</Ext>
    case "projects":
      return (
        <ul className="space-y-1">
          {[flagship, ...showcase].map((p) => (
            <li key={p.id}>
              <span className="text-signal">{p.name}</span> <span className="opacity-70">— {p.kicker}</span>
            </li>
          ))}
        </ul>
      )
    case "skills":
      return (
        <ul className="space-y-1">
          {skillGroups.map((g) => (
            <li key={g.id}>
              <span className="text-signal">{g.label.toLowerCase()}</span>{" "}
              <span className="opacity-70">{g.items.join(", ")}</span>
            </li>
          ))}
        </ul>
      )
    case "sudo hire-me":
      return (
        <>
          Permission granted. <Ext href={`mailto:${profile.email}?subject=Hello%20Sudhanshu`}>Start the email →</Ext>
        </>
      )
    case "clear":
      clear()
      return null
    default:
      return `command not found: ${cmd}. Type "help" to see what's available.`
  }
}

export function Terminal() {
  const [lines, setLines] = useState([
    { id: 0, out: 'Connection open. Type "help", or tap a command below.' },
  ])
  const [history, setHistory] = useState([])
  const [cursor, setCursor] = useState(-1)
  const inputRef = useRef(null)
  const logRef = useRef(null)
  const counter = useRef(1)

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [lines])

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase().replace(/\s+/g, " ")
    if (!cmd) return
    setHistory((h) => [cmd, ...h])
    setCursor(-1)
    const out = respond(cmd, {
      copy: () => navigator.clipboard?.writeText(profile.email),
      clear: () => setLines([]),
    })
    if (cmd === "clear") return
    setLines((l) => [...l, { id: counter.current++, input: cmd, out }])
  }

  const onSubmit = (e) => {
    e.preventDefault()
    run(inputRef.current.value)
    inputRef.current.value = ""
  }

  const onKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      const next = Math.min(cursor + 1, history.length - 1)
      if (history[next]) {
        setCursor(next)
        inputRef.current.value = history[next]
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const next = cursor - 1
      setCursor(next)
      inputRef.current.value = next >= 0 ? history[next] : ""
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-term-fg/15 bg-term text-term-fg shadow-[0_40px_90px_-40px_rgb(20_19_15/0.6)]" data-cursor="Type">
      <div className="flex items-center gap-2 border-b border-term-fg/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-term-fg/25" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-term-fg/25" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal" aria-hidden="true" />
        <span className="ml-3 font-mono text-xs opacity-60">sudhanshu@portfolio</span>
      </div>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        data-lenis-prevent
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="h-[22rem] overflow-y-auto px-4 py-4 font-mono text-[0.8rem] leading-relaxed"
      >
        {lines.map((line) => (
          <div key={line.id} className="mb-3">
            {line.input && (
              <p>
                <span className="text-signal">›</span> {line.input}
              </p>
            )}
            {line.out && <div className="opacity-90">{line.out}</div>}
          </div>
        ))}
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <label htmlFor="terminal-input" className="text-signal">
            ›
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal command"
            className="min-w-0 flex-1 bg-transparent font-mono outline-none placeholder:text-term-fg/45"
            placeholder="type a command"
          />
        </form>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-term-fg/10 px-4 py-3">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => run(chip)}
            className="rounded-full border border-term-fg/25 px-3 py-1 font-mono text-xs transition-colors hover:border-signal hover:bg-signal hover:text-on-signal"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  )
}
