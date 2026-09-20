"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Eraser, Play, Shuffle } from "lucide-react"

const ROWS = 11
const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
]

function solve(walls, cols, start, goal, algo) {
  const total = cols * ROWS
  const cost = new Array(total).fill(Infinity)
  const from = new Array(total).fill(-1)
  const seen = new Array(total).fill(false)
  const order = []
  const h = (i) => Math.abs((i % cols) - (goal % cols)) + Math.abs(Math.floor(i / cols) - Math.floor(goal / cols))
  const open = [start]
  cost[start] = 0

  while (open.length) {
    let best = 0
    if (algo === "astar") {
      for (let k = 1; k < open.length; k++) {
        if (cost[open[k]] + h(open[k]) < cost[open[best]] + h(open[best])) best = k
      }
    }
    const cur = algo === "astar" ? open.splice(best, 1)[0] : open.shift()
    if (seen[cur]) continue
    seen[cur] = true
    order.push(cur)
    if (cur === goal) break
    const cx = cur % cols
    const cy = Math.floor(cur / cols)
    for (const [dx, dy] of DIRS) {
      const nx = cx + dx
      const ny = cy + dy
      if (nx < 0 || ny < 0 || nx >= cols || ny >= ROWS) continue
      const ni = ny * cols + nx
      if (walls[ni] || seen[ni] || cost[cur] + 1 >= cost[ni]) continue
      cost[ni] = cost[cur] + 1
      from[ni] = cur
      open.push(ni)
    }
  }

  const path = []
  if (seen[goal]) for (let c = goal; c !== -1; c = from[c]) path.push(c)
  return { order, path: path.reverse() }
}

export function PathfindingViz() {
  const wrap = useRef(null)
  const canvas = useRef(null)
  const { resolvedTheme } = useTheme()
  const [cols, setCols] = useState(30)
  const [algo, setAlgo] = useState("bfs")
  const [stats, setStats] = useState(null)
  const walls = useRef(new Array(30 * ROWS).fill(false))
  const paint = useRef(null)
  const anim = useRef({ visited: new Set(), path: new Set(), raf: 0 })
  const cell = useRef(24)

  const start = Math.floor(ROWS / 2) * cols + 2
  const goal = Math.floor(ROWS / 2) * cols + cols - 3

  const draw = useCallback(() => {
    const c = canvas.current
    if (!c) return
    const ctx = c.getContext("2d")
    const css = getComputedStyle(document.documentElement)
    const col = (name) => css.getPropertyValue(name).trim()
    const size = cell.current
    const dpr = window.devicePixelRatio || 1
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, c.width, c.height)

    for (let i = 0; i < cols * ROWS; i++) {
      const x = (i % cols) * size
      const y = Math.floor(i / cols) * size
      const pad = 1.5
      let fill = null
      if (walls.current[i]) fill = col("--ink")
      else if (anim.current.path.has(i)) fill = col("--signal")
      else if (anim.current.visited.has(i)) fill = col("--paper-3")
      ctx.strokeStyle = col("--line")
      ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1)
      if (fill) {
        ctx.fillStyle = fill
        ctx.fillRect(x + pad, y + pad, size - pad * 2, size - pad * 2)
      }
    }
    for (const [i, label] of [
      [start, "A"],
      [goal, "B"],
    ]) {
      const x = (i % cols) * size
      const y = Math.floor(i / cols) * size
      ctx.fillStyle = col("--ink")
      ctx.beginPath()
      ctx.arc(x + size / 2, y + size / 2, size * 0.42, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = col("--paper")
      ctx.font = `600 ${size * 0.42}px ${col("--font-geist-mono") || "monospace"}`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(label, x + size / 2, y + size / 2 + 1)
    }
  }, [cols, start, goal])

  // Size the grid to the container.
  useEffect(() => {
    const el = wrap.current
    const resize = () => {
      const width = el.clientWidth
      const target = width < 520 ? 18 : 26
      const nextCols = Math.max(14, Math.floor(width / target))
      const size = width / nextCols
      cell.current = size
      const c = canvas.current
      const dpr = window.devicePixelRatio || 1
      c.width = width * dpr
      c.height = size * ROWS * dpr
      c.style.width = `${width}px`
      c.style.height = `${size * ROWS}px`
      if (nextCols !== cols) {
        walls.current = new Array(nextCols * ROWS).fill(false)
        anim.current = { visited: new Set(), path: new Set(), raf: 0 }
        setStats(null)
        setCols(nextCols)
      } else {
        draw()
      }
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    return () => ro.disconnect()
  }, [cols, draw])

  useEffect(() => {
    draw()
  }, [draw, resolvedTheme])

  useEffect(() => () => cancelAnimationFrame(anim.current.raf), [])

  const reset = useCallback(() => {
    cancelAnimationFrame(anim.current.raf)
    anim.current = { visited: new Set(), path: new Set(), raf: 0 }
    setStats(null)
  }, [])

  const run = () => {
    reset()
    const { order, path } = solve(walls.current, cols, start, goal, algo)
    let i = 0
    const step = () => {
      const batch = Math.max(2, Math.round(order.length / 90))
      for (let k = 0; k < batch && i < order.length; k++, i++) anim.current.visited.add(order[i])
      draw()
      if (i < order.length) {
        anim.current.raf = requestAnimationFrame(step)
      } else {
        path.forEach((p) => anim.current.path.add(p))
        draw()
        setStats({ visited: order.length, length: path.length ? path.length - 1 : null })
      }
    }
    anim.current.raf = requestAnimationFrame(step)
  }

  const cellAt = (e) => {
    const r = canvas.current.getBoundingClientRect()
    const x = Math.floor(((e.clientX - r.left) / r.width) * cols)
    const y = Math.floor(((e.clientY - r.top) / r.height) * ROWS)
    if (x < 0 || y < 0 || x >= cols || y >= ROWS) return -1
    return y * cols + x
  }

  const toggle = (i, value) => {
    if (i < 0 || i === start || i === goal) return
    walls.current[i] = value
    draw()
  }

  const onDown = (e) => {
    const i = cellAt(e)
    if (i < 0) return
    reset()
    paint.current = { value: !walls.current[i], touch: e.pointerType === "touch", moved: false, i }
    if (!paint.current.touch) {
      canvas.current.setPointerCapture(e.pointerId)
      toggle(i, paint.current.value)
    }
  }
  const onMove = (e) => {
    const p = paint.current
    if (!p || p.touch) return
    toggle(cellAt(e), p.value)
  }
  const onUp = () => {
    const p = paint.current
    if (p?.touch) toggle(p.i, p.value)
    paint.current = null
  }

  const maze = () => {
    reset()
    walls.current = walls.current.map((_, i) => i !== start && i !== goal && Math.random() < 0.27)
    draw()
  }
  const clear = () => {
    reset()
    walls.current = new Array(cols * ROWS).fill(false)
    draw()
  }

  const btn =
    "inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm transition-colors hover:border-signal"

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label="Algorithm" className="flex rounded-full bg-paper p-1">
          {[
            ["bfs", "BFS"],
            ["astar", "A*"],
          ].map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={algo === id}
              onClick={() => {
                setAlgo(id)
                reset()
                draw()
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                algo === id ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button onClick={run} className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2 text-sm font-medium text-on-signal transition-transform hover:scale-[1.03]">
          <Play className="h-4 w-4" aria-hidden="true" /> Run
        </button>
        <button onClick={maze} className={btn}>
          <Shuffle className="h-4 w-4" aria-hidden="true" /> Random walls
        </button>
        <button onClick={clear} className={btn}>
          <Eraser className="h-4 w-4" aria-hidden="true" /> Clear
        </button>
        <p className="ml-auto font-mono text-xs text-ink-2" aria-live="polite">
          {stats
            ? stats.length !== null
              ? `${stats.visited} cells explored · path of ${stats.length} steps`
              : `${stats.visited} cells explored · no path`
            : "Draw walls, then run."}
        </p>
      </div>
      <div ref={wrap} className="overflow-hidden rounded-2xl border border-line-strong bg-paper">
        <canvas
          ref={canvas}
          role="img"
          aria-label="Pathfinding grid. Click or drag to draw walls, then run a search from A to B."
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="block cursor-crosshair"
          style={{ touchAction: "pan-y" }}
          data-cursor="Draw"
        />
      </div>
    </div>
  )
}
