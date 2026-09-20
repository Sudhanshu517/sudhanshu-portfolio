import { SplitText } from "./SplitText"
import { Reveal } from "./Reveal"

/** Numbered editorial section opener: hairline, index, eyebrow, big serif title. */
export function SectionHeader({ index, eyebrow, title, lead, id }) {
  return (
    <header className="mb-14 md:mb-20">
      <div className="flex items-baseline justify-between border-t border-line pt-4">
        <span className="eyebrow">{index}</span>
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2
        id={id}
        className="display mt-8 max-w-[19ch] text-balance text-[clamp(2.9rem,8.4vw,7.4rem)] text-ink md:mt-12"
      >
        <SplitText text={title} />
      </h2>
      {lead ? (
        <Reveal delay={0.15} className="mt-6 max-w-xl text-lg text-ink-2 md:text-xl">
          <p>{lead}</p>
        </Reveal>
      ) : null}
    </header>
  )
}
