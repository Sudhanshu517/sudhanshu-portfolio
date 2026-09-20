import { ArrowUpRight, FileText, Github, Linkedin, Mail, Code2 } from "lucide-react"
import { profile } from "@/data/profile"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Reveal } from "@/components/ui/Reveal"
import { Magnetic } from "@/components/ui/Magnetic"
import { Terminal } from "@/components/ui/Terminal"

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: "GitHub", value: "github.com/Sudhanshu517", href: profile.links.github, Icon: Github },
  { label: "LinkedIn", value: "linkedin.com/in/sudhanshu517", href: profile.links.linkedin, Icon: Linkedin },
  { label: "DSA profile", value: "takeuforward.org", href: profile.links.dsa, Icon: Code2 },
  { label: "Resume", value: "resume.pdf", href: profile.links.resume, Icon: FileText },
]

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line px-5 pt-24 md:px-10 md:pt-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          id="contact-title"
          index="07"
          eyebrow="Contact"
          title="Open a connection."
          lead="Send a command to the terminal, or pick a channel. I read every message."
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Terminal />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <Magnetic strength={0.12} className="block">
              <a
                href={`mailto:${profile.email}`}
                data-cursor="Write"
                className="display block break-all text-[clamp(1.7rem,3.2vw,2.8rem)] leading-tight underline decoration-signal decoration-[3px] underline-offset-[0.25em] transition-colors hover:text-signal-ink"
              >
                {profile.email}
              </a>
            </Magnetic>

            <ul className="mt-10 border-t border-line">
              {channels.map(({ label, value, href, Icon }) => (
                <li key={label} className="border-b border-line">
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-4 transition-all duration-300 hover:pl-3"
                  >
                    <Icon className="h-5 w-5 text-ink-2 transition-colors group-hover:text-signal-ink" aria-hidden="true" />
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{label}</span>
                      <span className="block font-mono text-xs text-ink-2">{value}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <p
          aria-hidden="true"
          className="display mt-24 select-none whitespace-nowrap text-center text-[clamp(5rem,23vw,25rem)] leading-[0.78] tracking-[-0.045em] text-transparent [-webkit-text-stroke:1px_var(--line-strong)] md:mt-32"
        >
          Sudhanshu
        </p>
      </div>
    </section>
  )
}
