"use client"

import { useEffect, useReducer, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ImageIcon, Plus, Send, X } from "lucide-react"

const TENANTS = [
  { id: "clinic", label: "Clinic" },
  { id: "agency", label: "Agency" },
]
const MAX_LIVE = 4
const rid = () => Math.random().toString(16).slice(2, 6)

const initial = {
  tenant: "clinic",
  selected: "a3f9",
  pulse: { room: null, n: 0 },
  sessions: [
    {
      id: "a3f9",
      tenant: "clinic",
      name: "Visitor 1",
      status: "live",
      messages: [{ from: "visitor", kind: "text", text: "Hi — do you have any appointments this week?" }],
    },
    {
      id: "c71e",
      tenant: "agency",
      name: "Visitor 1",
      status: "live",
      messages: [{ from: "visitor", kind: "text", text: "Can someone walk me through your packages?" }],
    },
  ],
  log: ['tenant:clinic  room session-a3f9 opened', 'tenant:agency  room session-c71e opened'],
}

const pushLog = (log, line) => [...log, line].slice(-6)
const live = (state, tenant = state.tenant) =>
  state.sessions.filter((s) => s.tenant === tenant && s.status === "live")

function reducer(state, action) {
  switch (action.type) {
    case "tenant": {
      const first = live(state, action.tenant)[0]
      return { ...state, tenant: action.tenant, selected: first?.id ?? null }
    }
    case "select":
      return { ...state, selected: action.id }
    case "add": {
      if (live(state).length >= MAX_LIVE) return state
      const id = rid()
      const count = state.sessions.filter((s) => s.tenant === state.tenant).length + 1
      return {
        ...state,
        selected: id,
        sessions: [
          ...state.sessions,
          { id, tenant: state.tenant, name: `Visitor ${count}`, status: "live", messages: [] },
        ],
        log: pushLog(state.log, `tenant:${state.tenant}  visitor joined → room session-${id}`),
      }
    }
    case "send": {
      const { room, message } = action
      return {
        ...state,
        pulse: { room, n: state.pulse.n + 1 },
        sessions: state.sessions.map((s) => (s.id === room ? { ...s, messages: [...s.messages, message] } : s)),
        log: pushLog(state.log, `emit "message" → room session-${room}`),
      }
    }
    case "end": {
      return {
        ...state,
        sessions: state.sessions.map((s) => (s.id === action.id ? { ...s, status: "ended" } : s)),
        log: pushLog(state.log, `session ended → room session-${action.id} closed, data cleared`),
      }
    }
    case "remove": {
      const sessions = state.sessions.filter((s) => s.id !== action.id)
      const next = state.selected === action.id ? live({ ...state, sessions })[0]?.id ?? null : state.selected
      return { ...state, sessions, selected: next }
    }
    default:
      return state
  }
}

function Bubble({ message, mine }) {
  const image = message.kind === "image"
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-[85%] rounded-2xl px-3 py-2 text-[0.82rem] leading-snug ${
        mine ? "ml-auto rounded-br-md bg-ink text-paper" : "mr-auto rounded-bl-md bg-paper-3 text-ink"
      }`}
    >
      {image ? (
        <span className="flex items-center gap-2">
          <span className="grid h-10 w-14 place-items-center rounded-md bg-signal/80 text-on-signal">
            <ImageIcon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-mono text-[0.68rem] opacity-80">photo.jpg · shared</span>
        </span>
      ) : (
        message.text
      )}
    </motion.div>
  )
}

function Thread({ session, me, placeholder }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [session?.messages.length])

  return (
    <div ref={ref} data-lenis-prevent className="flex h-56 flex-col gap-2 overflow-y-auto p-3">
      {session ? (
        session.messages.length ? (
          session.messages.map((m, i) => <Bubble key={i} message={m} mine={m.from === me} />)
        ) : (
          <p className="m-auto text-center text-xs text-ink-2">{placeholder}</p>
        )
      ) : (
        <p className="m-auto text-center text-xs text-ink-2">No conversation selected.</p>
      )}
    </div>
  )
}

function Composer({ disabled, onSend, label }) {
  const ref = useRef(null)
  const submit = (e) => {
    e.preventDefault()
    const text = ref.current.value.trim()
    if (!text) return
    onSend(text)
    ref.current.value = ""
  }
  return (
    <form onSubmit={submit} className="flex items-center gap-2 border-t border-line p-2.5">
      <input
        ref={ref}
        disabled={disabled}
        aria-label={label}
        placeholder="Type a message…"
        className="min-w-0 flex-1 rounded-full bg-paper-2 px-3.5 py-2 text-sm outline-none placeholder:text-ink-3 focus-visible:ring-2 focus-visible:ring-signal disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled}
        aria-label="Send message"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-paper transition-colors hover:bg-signal hover:text-on-signal disabled:opacity-40"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  )
}

const ring = (hint, key) =>
  hint === key ? "ring-2 ring-signal ring-offset-2 ring-offset-paper transition-shadow" : "transition-shadow"

/**
 * Interactive walkthrough of the architecture described in the resume:
 * room-per-session, ephemeral sessions, tenant isolation, media sharing.
 * It is a simulation — the labels say so.
 */
export function CareConnectSim({ hint }) {
  const [state, dispatch] = useReducer(reducer, initial)
  const tenantLive = live(state)
  const selected = state.sessions.find((s) => s.id === state.selected && s.tenant === state.tenant)
  const selectedLive = selected?.status === "live"

  const send = (from) => (payload) => {
    if (!selected || !selectedLive) return
    dispatch({
      type: "send",
      room: selected.id,
      message: typeof payload === "string" ? { from, kind: "text", text: payload } : { from, ...payload },
    })
  }

  const endSession = (id) => {
    dispatch({ type: "end", id })
    setTimeout(() => dispatch({ type: "remove", id }), 900)
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-line-strong bg-paper-2">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="eyebrow">Architecture walkthrough · simulated, not the live product</p>
        <div
          role="tablist"
          aria-label="Choose a business (tenant)"
          className={`flex rounded-full bg-paper p-1 ${ring(hint, "tenant")}`}
        >
          {TENANTS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={state.tenant === t.id}
              onClick={() => dispatch({ type: "tenant", tenant: t.id })}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                state.tenant === t.id ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-px bg-line lg:grid-cols-[1fr_0.9fr_1.1fr]">
        {/* Visitor side */}
        <section aria-label="Visitor's chat widget" className="bg-paper">
          <header className="flex items-center justify-between gap-2 border-b border-line px-3.5 py-3">
            <div>
              <p className="eyebrow">Visitor · no login</p>
              <p className="text-sm font-medium">{TENANTS.find((t) => t.id === state.tenant).label} website</p>
            </div>
            <button
              onClick={() => dispatch({ type: "add" })}
              disabled={tenantLive.length >= MAX_LIVE}
              className="flex items-center gap-1 rounded-full border border-line-strong px-3 py-1.5 text-xs transition-colors hover:border-signal hover:bg-signal hover:text-on-signal disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" /> New visitor
            </button>
          </header>
          <div className="flex flex-wrap gap-1.5 border-b border-line px-3 py-2 min-h-[2.9rem]">
            <AnimatePresence initial={false}>
              {tenantLive.map((s) => (
                <motion.button
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  onClick={() => dispatch({ type: "select", id: s.id })}
                  className={`rounded-full px-3 py-1 text-xs transition-colors ${
                    state.selected === s.id ? "bg-signal text-on-signal" : "border border-line-strong hover:border-ink"
                  }`}
                >
                  {s.name}
                </motion.button>
              ))}
            </AnimatePresence>
            {!tenantLive.length && <span className="py-1 text-xs text-ink-2">No live visitors — add one.</span>}
          </div>
          <Thread session={selected} me="visitor" placeholder="Say hello — the agent dashboard sees it instantly." />
          <div className="flex items-center gap-2 border-t border-line px-2.5 pt-2.5">
            <button
              onClick={() => send("visitor")({ kind: "image" })}
              disabled={!selectedLive}
              className={`flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-xs transition-colors hover:border-signal disabled:opacity-40 ${ring(hint, "media")}`}
            >
              <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" /> Share image
            </button>
            <button
              onClick={() => selected && endSession(selected.id)}
              disabled={!selectedLive}
              className={`ml-auto flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-xs transition-colors hover:border-signal disabled:opacity-40 ${ring(hint, "ephemeral")}`}
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" /> End session
            </button>
          </div>
          <Composer disabled={!selectedLive} onSend={send("visitor")} label="Message as visitor" />
        </section>

        {/* Server */}
        <section
          aria-label="Socket.IO server rooms"
          className={`bg-paper-2 p-4 ${hint === "rooms" ? "outline outline-2 -outline-offset-2 outline-signal" : ""}`}
        >
          <p className="eyebrow">Socket.IO server</p>
          <p className="mt-1 text-sm font-medium">One room per session</p>
          <div className="mt-4 space-y-4">
            {TENANTS.map((t) => {
              const rooms = state.sessions.filter((s) => s.tenant === t.id)
              return (
                <div key={t.id}>
                  <p className="font-mono text-[0.68rem] text-ink-2">tenant:{t.id}</p>
                  <ul className="mt-1.5 space-y-1.5">
                    <AnimatePresence initial={false}>
                      {rooms.map((r) => {
                        const flash = state.pulse.room === r.id
                        return (
                          <motion.li
                            key={r.id}
                            layout
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: r.status === "ended" ? 0.35 : 1, x: 0 }}
                            exit={{ opacity: 0, x: 12, height: 0 }}
                            className="flex items-center gap-2 rounded-lg border border-line bg-paper px-2.5 py-1.5 font-mono text-[0.7rem]"
                          >
                            <motion.span
                              key={flash ? state.pulse.n : "idle"}
                              initial={flash ? { scale: 2.2, backgroundColor: "var(--signal)" } : false}
                              animate={{ scale: 1, backgroundColor: r.status === "ended" ? "var(--ink-3)" : "var(--signal)" }}
                              transition={{ duration: 0.6 }}
                              className="h-2 w-2 rounded-full"
                            />
                            session-{r.id}
                            <span className="ml-auto text-ink-2">{r.status === "ended" ? "closing…" : `${r.messages.length} msg`}</span>
                          </motion.li>
                        )
                      })}
                    </AnimatePresence>
                    {!rooms.length && <li className="font-mono text-[0.68rem] text-ink-3">— no rooms —</li>}
                  </ul>
                </div>
              )
            })}
          </div>
          <div className="mt-5 rounded-lg bg-term p-3 font-mono text-[0.66rem] leading-relaxed text-term-fg" aria-live="polite">
            {state.log.map((line, i) => (
              <p key={`${line}-${i}`} className={i === state.log.length - 1 ? "text-signal" : "opacity-60"}>
                <span aria-hidden="true">› </span>
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* Agent dashboard */}
        <section aria-label="Agent dashboard" className="bg-paper">
          <header className="border-b border-line px-3.5 py-3">
            <p className="eyebrow">Agent dashboard · one worker</p>
            <p className="text-sm font-medium">
              {tenantLive.length} live {tenantLive.length === 1 ? "conversation" : "conversations"} ·{" "}
              {TENANTS.find((t) => t.id === state.tenant).label}
            </p>
          </header>
          <div className="flex flex-wrap gap-1.5 border-b border-line px-3 py-2 min-h-[2.9rem]">
            {tenantLive.map((s) => {
              const last = s.messages[s.messages.length - 1]
              return (
                <button
                  key={s.id}
                  onClick={() => dispatch({ type: "select", id: s.id })}
                  className={`max-w-[11rem] truncate rounded-lg border px-2.5 py-1 text-left text-xs transition-colors ${
                    state.selected === s.id ? "border-signal bg-signal/15" : "border-line-strong hover:border-ink"
                  }`}
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="block truncate text-[0.68rem] text-ink-2">
                    {last ? (last.kind === "image" ? "Image shared" : last.text) : "New chat"}
                  </span>
                </button>
              )
            })}
          </div>
          <Thread session={selected} me="agent" placeholder="Waiting for the visitor's first message." />
          <div className="h-[3.35rem] border-t border-line px-3.5 pt-2.5 text-xs text-ink-2">
            {selectedLive ? "Replying as agent — every message goes to that room only." : ""}
          </div>
          <Composer disabled={!selectedLive} onSend={send("agent")} label="Reply as agent" />
        </section>
      </div>
    </div>
  )
}
