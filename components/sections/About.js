import Image from "next/image"
import { profile, principles, stats } from "@/data/profile"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { ScrollText } from "@/components/ui/ScrollText"
import { Reveal } from "@/components/ui/Reveal"
import { Counter } from "@/components/ui/Counter"
import { TiltCard } from "@/components/ui/TiltCard"

function Badge() {
  const text = "B.TECH CSE · MSIT · 2027 · FULL-STACK · "
  return (
    <div className="absolute -bottom-9 -left-6 h-32 w-32 md:-left-14 md:h-40 md:w-40" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full animate-[spin_26s_linear_infinite]">
        <defs>
          <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <circle cx="60" cy="60" r="58" className="fill-signal" />
        <text className="fill-on-signal font-mono" fontSize="9.6" letterSpacing="1.6">
          <textPath href="#badge-circle">{text.repeat(2)}</textPath>
        </text>
      </svg>
      <span className="display absolute inset-0 grid place-items-center text-4xl text-on-signal">✺</span>
    </div>
  )
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          id="about-title"
          index="01"
          eyebrow="About"
          title="I build products end to end."
        />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ScrollText
              text="I care about clean architecture, great developer experience, and shipping real products that people actually use."
              className="display text-[clamp(1.9rem,3.9vw,3.4rem)] leading-[1.08]"
            />
            <Reveal delay={0.1} className="mt-10 max-w-xl space-y-4 text-ink-2">
              <p>
                From a multi-tenant, real-time support platform built for small businesses to an NLP pipeline that
                reads consumer reviews, I gravitate to problems with a real user on the other end — and to the
                engineering underneath them.
              </p>
              <p>
                I&rsquo;m studying Computer Science &amp; Engineering at {profile.education.school}, working
                across React and Node.js in internships, open source and freelance work.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal className="relative mx-auto max-w-md lg:ml-auto lg:mr-0">
              <TiltCard>
                <figure className="relative overflow-hidden rounded-[1.75rem] border border-line-strong bg-paper-2">
                  <Image
                    src="/sudhanshu.webp"
                    alt="Portrait of Sudhanshu"
                    width={1149}
                    height={1369}
                    sizes="(min-width: 1024px) 34vw, 90vw"
                    className="h-auto w-full"
                    priority={false}
                  />
                  <figcaption className="flex items-center justify-between border-t border-line px-4 py-3">
                    <span className="eyebrow">Fig. 01</span>
                    <span className="eyebrow">{profile.name} · {profile.location}</span>
                  </figcaption>
                </figure>
              </TiltCard>
              <Badge />
            </Reveal>
          </div>
        </div>

        <dl className="mt-28 grid gap-10 border-t border-line pt-10 md:mt-40 md:grid-cols-3 md:gap-0">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.1}
              className={`flex flex-col md:px-8 ${i > 0 ? "md:border-l md:border-line" : "md:pl-0"}`}
            >
              <dt className="order-2 mt-3 text-base font-medium">{s.label}</dt>
              <dd className="display order-1 text-[clamp(4rem,9vw,8rem)] leading-none">
                <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </dd>
              <dd className="order-3 mt-1 max-w-[26ch] text-sm text-ink-2">{s.note}</dd>
            </Reveal>
          ))}
        </dl>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:mt-28 md:grid-cols-2 xl:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.08} className="group bg-paper p-7 transition-colors duration-500 hover:bg-paper-2 md:p-9">
              <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-6 text-3xl md:text-4xl">{p.title}</h3>
              <p className="mt-4 text-sm text-ink-2 md:text-[0.95rem]">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
