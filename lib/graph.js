// Deterministic three-layer "system graph": client → API → data.
// Pure functions so the WebGL scene and the static SVG fallback share one layout.

function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const LAYER_CENTERS = [-3.7, 0, 3.7]

export function buildGraph({ count = 78, seed = 11 } = {}) {
  const rand = mulberry32(seed)
  const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5
  const nodes = []

  for (let i = 0; i < count; i++) {
    const layer = i % 3
    nodes.push({
      layer,
      x: LAYER_CENTERS[layer] + gauss() * 1.25,
      y: gauss() * 2.5,
      z: gauss() * 2.1,
    })
  }

  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)
  const adj = nodes.map(() => ({ same: [], next: [], prev: [] }))
  const edgeKeys = new Set()
  const edges = []

  const link = (a, b, kind) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`
    if (!edgeKeys.has(key)) {
      edgeKeys.add(key)
      edges.push([a, b])
    }
    const la = nodes[a].layer
    const lb = nodes[b].layer
    if (kind === "cross") {
      const [lo, hi] = la < lb ? [a, b] : [b, a]
      if (!adj[lo].next.includes(hi)) adj[lo].next.push(hi)
      if (!adj[hi].prev.includes(lo)) adj[hi].prev.push(lo)
    } else {
      if (!adj[a].same.includes(b)) adj[a].same.push(b)
      if (!adj[b].same.includes(a)) adj[b].same.push(a)
    }
  }

  const nearest = (i, filter, k) =>
    nodes
      .map((n, j) => ({ j, d: j === i || !filter(n) ? Infinity : dist(nodes[i], n) }))
      .filter((o) => o.d < Infinity)
      .sort((p, q) => p.d - q.d)
      .slice(0, k)
      .map((o) => o.j)

  nodes.forEach((node, i) => {
    nearest(i, (n) => n.layer === node.layer, 2).forEach((j) => link(i, j, "same"))
    if (node.layer < 2) nearest(i, (n) => n.layer === node.layer + 1, 2).forEach((j) => link(i, j, "cross"))
    if (node.layer > 0) nearest(i, (n) => n.layer === node.layer - 1, 1).forEach((j) => link(i, j, "cross"))
  })

  // Hubs: best-connected node of each layer, drawn slightly larger.
  const degree = (i) => adj[i].same.length + adj[i].next.length + adj[i].prev.length
  const hubs = [0, 1, 2].flatMap((layer) =>
    nodes
      .map((n, i) => ({ i, layer: n.layer, deg: degree(i) }))
      .filter((o) => o.layer === layer)
      .sort((a, b) => b.deg - a.deg)
      .slice(0, 3)
      .map((o) => o.i)
  )

  return { nodes, edges, adj, hubs }
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

/** A request going client → API → data and the response coming back. */
export function requestRoute(graph) {
  const { nodes, adj } = graph
  const starts = nodes.map((n, i) => (n.layer === 0 && adj[i].next.length ? i : -1)).filter((i) => i >= 0)
  const s = pick(starts)
  const n1 = pick(adj[s].next)
  const n2 = adj[n1].next.length ? pick(adj[n1].next) : n1
  const r1 = adj[n2].prev.length ? pick(adj[n2].prev) : n1
  const r0 = adj[r1].prev.length ? pick(adj[r1].prev) : s
  return [s, n1, n2, r1, r0].filter((v, i, a) => i === 0 || v !== a[i - 1])
}

/** Short random walk used when the visitor clicks the scene. */
export function burstRoute(graph, start, hops = 4) {
  const { adj } = graph
  const route = [start]
  let cur = start
  for (let h = 0; h < hops; h++) {
    const a = adj[cur]
    const options = [...a.same, ...a.next, ...a.prev].filter((v) => v !== route[route.length - 2])
    if (!options.length) break
    cur = pick(options)
    route.push(cur)
  }
  return route
}
