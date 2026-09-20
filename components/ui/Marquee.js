const items = [
  "Full-stack development",
  "Real-time systems",
  "AI-enabled products",
  "Data structures & algorithms",
  "Modern web engineering",
]

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="mx-8 h-6 w-6 shrink-0 text-signal md:mx-12 md:h-9 md:w-9" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0c.6 6.7 4.7 10.8 12 12-7.3 1.2-11.4 5.3-12 12-.6-6.7-4.7-10.8-12-12C7.3 10.8 11.4 6.7 12 0Z"
      />
    </svg>
  )
}

/** Slow ticker; pauses on hover, static under reduced motion (see globals.css). */
export function Marquee() {
  const row = items.map((text, i) => (
    <div key={text} className="flex shrink-0 items-center">
      <span
        className={`display whitespace-nowrap text-[clamp(2.4rem,6vw,5.2rem)] ${
          i % 2 ? "text-transparent [-webkit-text-stroke:1px_var(--ink)]" : "text-ink"
        }`}
      >
        {text}
      </span>
      <Star />
    </div>
  ))

  return (
    <div
      className="marquee overflow-hidden border-y border-line py-5 md:py-7"
      role="presentation"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  )
}
