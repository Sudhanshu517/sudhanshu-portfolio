# Sudhanshu — Portfolio

Personal developer portfolio built with Next.js (App Router), Tailwind CSS v4, Framer Motion, Lenis and a lazy-loaded React Three Fiber scene. JavaScript / JSX only.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where the content lives

All copy and links are plain data files — edit these, not the components:

| File | What it controls |
| --- | --- |
| `data/profile.js` | Name, email, links, hero copy, stats, principles, hackathons, nav |
| `data/projects.js` | CareConnect (flagship), the pinned showcase, the archive |
| `data/skills.js` | Stack groups (also drives the tech ↔ project linking) |
| `data/journey.js` | The timeline |
| `data/engineering.js` | The two request-path walkthroughs |

Placeholder links are marked `REPLACE-ME` — search the repo for that string. A project with `placeholder: true` shows a "Details soon" tag until you remove the flag.

Every technology in `data/projects.js` `stack` arrays that also appears in `data/skills.js` is linked automatically in the Stack section.

## Structure

```
app/                 routes, metadata, sitemap/robots, page transition (template.js)
components/
  layout/            navbar, smooth scroll (Lenis), cursor, progress bar, theme toggle
  sections/          Hero, About, Stack, Work, Engineering, ProblemSolving, Journey, Contact
  project/           project visuals, CareConnect simulation, rows
  three/             WebGL hero scene + static SVG fallback
  ui/                Reveal, SplitText, ScrollText, Magnetic, Counter, TiltCard, Terminal, ...
  viz/               pathfinding visualiser
data/                content (see above)
hooks/               media-query hooks (SSR-safe)
lib/                 graph generator, shared class strings
```

## Design notes

- **System:** warm paper / ink with one signal-orange accent. Tokens live in `app/globals.css` (`:root` and `.dark`).
- **Type:** Instrument Serif (display), Geist (UI), Geist Mono (labels).
- **3D:** `three` + `@react-three/fiber` only, loaded after first paint and only when WebGL is usable. It pauses when off-screen, renders a single static frame under `prefers-reduced-motion`, and falls back to an SVG twin on low-power devices.
- **Scroll-pinned sections** (project showcase, engineering walkthrough) only pin when the viewport is large enough to hold them; smaller screens get a stacked / stepper layout.
- **Reduced motion:** Lenis, the marquee, cursor, magnetic and tilt effects are disabled.

## Content sources

Projects, experience and achievements come from the résumé (`public/resume.pdf`) and the previous version of this site. The CareConnect walkthrough and the code shown in the Engineering section are labelled as simulations / simplified illustrations.
