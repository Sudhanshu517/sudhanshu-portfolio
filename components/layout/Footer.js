"use client"

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react"
import { profile } from "@/data/profile"
import { useScrollControls } from "./SmoothScroll"
import { Magnetic } from "@/components/ui/Magnetic"

export function Footer() {
  const { scrollTo } = useScrollControls()
  const links = [
    { label: "GitHub", href: profile.links.github, Icon: Github },
    { label: "LinkedIn", href: profile.links.linkedin, Icon: Linkedin },
    { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
  ]

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-mono text-xs text-ink-2">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <ul className="flex items-center gap-5">
          {links.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-ink"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
        <Magnetic>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm transition-colors hover:border-signal hover:bg-signal hover:text-on-signal"
          >
            Back to top <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </Magnetic>
      </div>
    </footer>
  )
}
