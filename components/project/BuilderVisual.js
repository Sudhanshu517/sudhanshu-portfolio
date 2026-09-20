"use client"

import { useState } from "react"
import { Reorder } from "framer-motion"
import { GripVertical } from "lucide-react"

const BLOCKS = [
  { id: "nav", label: "Navigation", h: "h-5" },
  { id: "hero", label: "Hero", h: "h-20" },
  { id: "features", label: "Features", h: "h-16" },
  { id: "cta", label: "Call to action", h: "h-11" },
  { id: "footer", label: "Footer", h: "h-7" },
]

/** Drag the components to reorder them; the canvas mirrors the order (illustrative). */
export function BuilderVisual() {
  const [items, setItems] = useState(BLOCKS)

  return (
    <div className="pattern-hatch grid gap-4 p-4 sm:grid-cols-[1fr_1.15fr] sm:p-6">
      <div>
        <p className="eyebrow mb-3">Components · drag to reorder</p>
        <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-2">
          {items.map((item) => (
            <Reorder.Item
              key={item.id}
              value={item}
              whileDrag={{ scale: 1.03, boxShadow: "0 18px 40px -18px rgb(20 19 15 / 0.5)" }}
              className="flex cursor-grab touch-none items-center gap-2 rounded-xl border border-line-strong bg-paper px-3 py-2.5 text-sm active:cursor-grabbing"
              data-cursor="Drag"
            >
              <GripVertical className="h-4 w-4 text-ink-3" aria-hidden="true" />
              {item.label}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>

      <div>
        <p className="eyebrow mb-3">Canvas preview</p>
        <div className="space-y-1.5 rounded-xl border border-line-strong bg-paper p-2.5">
          {items.map((item) => (
            <div key={item.id} className="relative">
              <div
                className={`${item.h} overflow-hidden rounded-md border border-line bg-paper-2`}
                style={{ transition: "none" }}
              >
                <div className="h-full w-full bg-[repeating-linear-gradient(135deg,var(--line)_0_1px,transparent_1px_8px)]" />
              </div>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 rounded bg-paper px-1.5 font-mono text-[0.58rem] uppercase tracking-wider text-ink-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
