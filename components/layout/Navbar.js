"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from "lucide-react"
import { navItems, profile } from "@/data/profile"
import { ThemeToggle } from "./ThemeToggle"
import { useScrollControls } from "./SmoothScroll"

const DESKTOP_ITEMS = navItems.filter((item) => item.id !== "home")

function NavAnchor({ id, onHome, className, children, onClick, ...rest }) {
  if (onHome) {
    return (
      <a href={`#${id}`} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={`/#${id}`} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  )
}

function Logo() {
  return (
    <Link
      href="/"
      aria-label="Sudhanshu — home"
      className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3"
    >
      <span className="display grid h-9 w-9 place-items-center rounded-full bg-ink text-xl text-paper transition-transform duration-300 group-hover:-rotate-12">
        S
      </span>
      <span className="hidden text-sm font-medium tracking-tight sm:block">{profile.name}</span>
    </Link>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const onHome = pathname === "/"
  const [active, setActive] = useState("home")
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const { stop, start } = useScrollControls()
  const firstLink = useRef(null)
  const menuButton = useRef(null)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(latest > 480 && latest > previous && !open)
  })

  useEffect(() => {
    if (!onHome) return
    const targets = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[visible.length - 1].target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [onHome])

  useEffect(() => {
    if (open) {
      stop()
      firstLink.current?.focus()
    } else {
      start()
    }
    const onKey = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, stop, start])

  const close = () => setOpen(false)

  return (
    <>
      {/* Desktop: floating pill */}
      <motion.header
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-[70] hidden justify-center lg:flex"
      >
        <nav
          aria-label="Primary"
          className="flex items-center gap-1 rounded-full border border-line bg-paper/75 p-1.5 pr-2 backdrop-blur-xl"
        >
          <Logo />
          <ul className="flex items-center">
            {DESKTOP_ITEMS.map((item) => {
              const isActive = onHome && active === item.id
              return (
                <li key={item.id}>
                  <NavAnchor
                    id={item.id}
                    onHome={onHome}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative block rounded-full px-3.5 py-2 text-sm transition-colors ${
                      isActive ? "text-paper" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-ink"
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </NavAnchor>
                </li>
              )
            })}
          </ul>
          <span className="mx-1 h-6 w-px bg-line" aria-hidden="true" />
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-full bg-signal px-4 py-2 text-sm font-medium text-on-signal transition-transform hover:scale-[1.04]"
          >
            Resume <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <ThemeToggle className="ml-1.5" />
        </nav>
      </motion.header>

      {/* Mobile: bar + full-screen menu */}
      <div className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between p-3 lg:hidden">
        <div className="rounded-full border border-line bg-paper/80 backdrop-blur-xl">
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle className="bg-paper/80 backdrop-blur-xl" />
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full bg-ink text-paper"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "circle(0% at calc(100% - 28px) 32px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 28px) 32px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 28px) 32px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[65] flex flex-col bg-paper px-6 pb-8 pt-24 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto" data-lenis-prevent>
              <ul className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavAnchor
                      id={item.id}
                      onHome={onHome}
                      onClick={close}
                      ref={i === 0 ? firstLink : undefined}
                      className="flex items-baseline gap-4 border-b border-line py-2.5"
                    >
                      <span className="eyebrow w-6">{String(i + 1).padStart(2, "0")}</span>
                      <span className="display text-[clamp(2.4rem,11vw,3.4rem)]">{item.label}</span>
                    </NavAnchor>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 flex items-center justify-between">
              <a
                href={profile.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-signal px-5 py-3 text-sm font-medium text-on-signal"
              >
                Resume <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <div className="flex gap-2">
                {[
                  { href: profile.links.github, label: "GitHub", Icon: Github },
                  { href: profile.links.linkedin, label: "LinkedIn", Icon: Linkedin },
                  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
