import { buildGraph } from "@/lib/graph"

const graph = buildGraph({ count: 78 })
const project = ({ x, y, z }) => {
  const k = 1 / (1 + z * 0.045)
  return [x * k, y * k]
}

/** Static SVG twin of the WebGL scene: SSR-safe, and used on low-power devices. */
export function GraphFallback({ className = "" }) {
  const pts = graph.nodes.map(project)
  return (
    <svg
      viewBox="-7 -4 14 8"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(1.5 0)" className="text-ink">
        <g stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.012" fill="none">
          {graph.edges.map(([a, b], i) => (
            <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} />
          ))}
        </g>
        <g fill="currentColor">
          {pts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={graph.hubs.includes(i) ? 0.085 : 0.04} />
          ))}
        </g>
      </g>
    </svg>
  )
}
