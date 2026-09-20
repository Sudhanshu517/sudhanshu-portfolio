"use client"

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { buildGraph, burstRoute, requestRoute } from "@/lib/graph"

const AMBIENT = 12
const BURST = 6
const NODE_RADIUS = 1.9

const PALETTE = {
  light: { ink: "#14130f", bg: "#ece8de", signal: "#ff5a1f", line: 0.3 },
  dark: { ink: "#ece8de", bg: "#0f0e0b", signal: "#ff6a2e", line: 0.22 },
}

function makeDotTexture() {
  const c = document.createElement("canvas")
  c.width = c.height = 64
  const g = c.getContext("2d")
  g.beginPath()
  g.arc(32, 32, 29, 0, Math.PI * 2)
  g.fillStyle = "#fff"
  g.fill()
  return new THREE.CanvasTexture(c)
}

const bufferGeometry = (array) => {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.BufferAttribute(array, 3))
  return geometry
}

function createBuffers(graph) {
  const n = graph.nodes.length
  const base = new Float32Array(n * 3)
  graph.nodes.forEach((node, i) => {
    base[i * 3] = node.x
    base[i * 3 + 1] = node.y
    base[i * 3 + 2] = node.z
  })
  const pos = new Float32Array(base)
  const lines = new Float32Array(graph.edges.length * 6)
  const hubs = new Float32Array(graph.hubs.length * 3)
  const packetPos = new Float32Array((AMBIENT + BURST) * 3).fill(9999)
  return {
    base,
    pos,
    lines,
    hubs,
    packetPos,
    nodeGeom: bufferGeometry(pos),
    lineGeom: bufferGeometry(lines),
    hubGeom: bufferGeometry(hubs),
    packetGeom: bufferGeometry(packetPos),
  }
}

// The functions below imperatively update GPU buffers; they live outside the component
// on purpose so the render function stays pure.

function writeResting(buffers, graph) {
  const { pos, lines, hubs } = buffers
  graph.edges.forEach(([a, b], e) => {
    lines.set([pos[a * 3], pos[a * 3 + 1], pos[a * 3 + 2], pos[b * 3], pos[b * 3 + 1], pos[b * 3 + 2]], e * 6)
  })
  graph.hubs.forEach((node, i) => hubs.set([pos[node * 3], pos[node * 3 + 1], pos[node * 3 + 2]], i * 3))
  buffers.lineGeom.attributes.position.needsUpdate = true
  buffers.hubGeom.attributes.position.needsUpdate = true
}

function disposeBuffers(buffers) {
  buffers.nodeGeom.dispose()
  buffers.lineGeom.dispose()
  buffers.hubGeom.dispose()
  buffers.packetGeom.dispose()
}

function stepNodes(buffers, graph, time, lx, ly, inside) {
  const { base, pos, lines, hubs } = buffers
  const { nodes, edges } = graph

  for (let i = 0; i < nodes.length; i++) {
    let x = base[i * 3] + Math.sin(time * 0.55 + i * 1.7) * 0.09
    let y = base[i * 3 + 1] + Math.cos(time * 0.47 + i * 2.3) * 0.09
    const z = base[i * 3 + 2] + Math.sin(time * 0.41 + i * 0.9) * 0.09
    if (inside) {
      const dx = x - lx
      const dy = y - ly
      const d2 = dx * dx + dy * dy
      if (d2 < NODE_RADIUS * NODE_RADIUS) {
        const d = Math.sqrt(d2) + 1e-4
        const f = 1 - d / NODE_RADIUS
        x += (dx / d) * f * f * 1.1
        y += (dy / d) * f * f * 1.1
      }
    }
    pos[i * 3] = x
    pos[i * 3 + 1] = y
    pos[i * 3 + 2] = z
  }
  for (let e = 0; e < edges.length; e++) {
    const [a, b] = edges[e]
    lines[e * 6] = pos[a * 3]
    lines[e * 6 + 1] = pos[a * 3 + 1]
    lines[e * 6 + 2] = pos[a * 3 + 2]
    lines[e * 6 + 3] = pos[b * 3]
    lines[e * 6 + 4] = pos[b * 3 + 1]
    lines[e * 6 + 5] = pos[b * 3 + 2]
  }
  for (let h = 0; h < graph.hubs.length; h++) {
    const n = graph.hubs[h]
    hubs[h * 3] = pos[n * 3]
    hubs[h * 3 + 1] = pos[n * 3 + 1]
    hubs[h * 3 + 2] = pos[n * 3 + 2]
  }
}

function nearestNode(buffers, graph, lx, ly) {
  const { pos } = buffers
  let best = 0
  let bestD = Infinity
  for (let i = 0; i < graph.nodes.length; i++) {
    const d = (pos[i * 3] - lx) ** 2 + (pos[i * 3 + 1] - ly) ** 2
    if (d < bestD) {
      bestD = d
      best = i
    }
  }
  return best
}

function stepPackets(buffers, graph, list, dt, onLayer, mem) {
  const { pos, packetPos } = buffers
  list.forEach((p, i) => {
    const o = i * 3
    const hide = () => {
      packetPos[o] = packetPos[o + 1] = packetPos[o + 2] = 9999
    }
    if (!p.route) return hide()
    p.t += dt * p.speed
    if (p.t < 0) return hide()
    if (p.t >= 1) {
      p.t -= 1
      p.seg += 1
      if (p.seg >= p.route.length - 1) {
        if (p.ambient) {
          p.route = requestRoute(graph)
          p.seg = 0
          p.t = -Math.random() * 0.8
        } else {
          p.route = null
        }
        return hide()
      }
    }
    const a = p.route[p.seg]
    const b = p.route[p.seg + 1]
    const k = p.t * p.t * (3 - 2 * p.t)
    packetPos[o] = pos[a * 3] + (pos[b * 3] - pos[a * 3]) * k
    packetPos[o + 1] = pos[a * 3 + 1] + (pos[b * 3 + 1] - pos[a * 3 + 1]) * k
    packetPos[o + 2] = pos[a * 3 + 2] + (pos[b * 3 + 2] - pos[a * 3 + 2]) * k

    if (i === 0) {
      const layer = graph.nodes[p.route[p.seg]].layer
      if (layer !== mem.layer) {
        mem.layer = layer
        onLayer?.(layer)
      }
    }
  })
}

function flush(buffers) {
  buffers.nodeGeom.attributes.position.needsUpdate = true
  buffers.lineGeom.attributes.position.needsUpdate = true
  buffers.hubGeom.attributes.position.needsUpdate = true
  buffers.packetGeom.attributes.position.needsUpdate = true
}

function Graph({ pointer, progress, palette, count, still, onLayer }) {
  const group = useRef(null)
  const memory = useRef({ layer: -1, clicks: 0, px: 0, py: 0 })
  const packets = useRef([])
  const { camera, size, invalidate } = useThree()
  const aspect = size.width / size.height
  // Portrait screens: turn the graph 90° so the request runs top-to-bottom and fills the tall viewport.
  const portrait = aspect < 0.9
  const baseScale = portrait
    ? THREE.MathUtils.clamp(aspect * 1.55, 0.5, 0.78)
    : THREE.MathUtils.clamp(aspect * 0.78, 0.4, 1.05)
  const shiftX = aspect > 1.3 ? 1.5 : 0

  const graph = useMemo(() => buildGraph({ count }), [count])
  const dot = useMemo(() => makeDotTexture(), [])
  const scratch = useMemo(
    () => ({ v: new THREE.Vector3(), dir: new THREE.Vector3(), local: new THREE.Vector3() }),
    []
  )
  const buffers = useMemo(() => createBuffers(graph), [graph])

  // Resting layout: also what the reduced-motion (static) frame shows.
  useEffect(() => {
    writeResting(buffers, graph)
    invalidate()
    packets.current = Array.from({ length: AMBIENT + BURST }, (_, i) => ({
      ambient: i < AMBIENT,
      route: i < AMBIENT ? requestRoute(graph) : null,
      seg: 0,
      t: i < AMBIENT ? -i * 0.32 : 0,
      speed: 0.7 + Math.random() * 0.45,
    }))
    return () => disposeBuffers(buffers)
  }, [buffers, graph, invalidate])

  useEffect(() => () => dot.dispose(), [dot])

  useFrame((frame, delta) => {
    if (still || !group.current) return
    const dt = Math.min(delta, 0.05)
    const time = frame.clock.elapsedTime
    const s = memory.current
    const g = group.current

    s.px += (pointer.current.x - s.px) * Math.min(1, dt * 5)
    s.py += (pointer.current.y - s.py) * Math.min(1, dt * 5)
    const prog = progress.current

    g.rotation.y += (s.px * 0.32 + prog * 1.1 + Math.sin(time * 0.15) * 0.07 - g.rotation.y) * Math.min(1, dt * 3)
    g.rotation.x += (-s.py * 0.14 - g.rotation.x) * Math.min(1, dt * 3)
    g.scale.setScalar(baseScale * (1 - prog * 0.2))
    g.updateMatrixWorld()

    // Pointer projected onto the z=0 plane, then into the graph's local space.
    scratch.v.set(pointer.current.x, pointer.current.y, 0.5).unproject(camera)
    scratch.dir.copy(scratch.v).sub(camera.position).normalize()
    scratch.v.copy(camera.position).addScaledVector(scratch.dir, -camera.position.z / scratch.dir.z)
    g.worldToLocal(scratch.local.copy(scratch.v))
    const lx = scratch.local.x
    const ly = scratch.local.y

    stepNodes(buffers, graph, time, lx, ly, pointer.current.inside)

    // Click / tap: emit a short burst of packets from the nearest node.
    if (pointer.current.clicks !== s.clicks) {
      s.clicks = pointer.current.clicks
      const start = nearestNode(buffers, graph, lx, ly)
      packets.current
        .filter((p) => !p.ambient && !p.route)
        .slice(0, 3)
        .forEach((p) => {
          p.route = burstRoute(graph, start)
          p.seg = 0
          p.t = 0
          p.speed = 1.6 + Math.random() * 0.6
        })
    }

    stepPackets(buffers, graph, packets.current, dt, onLayer, s)
    flush(buffers)
  })

  return (
    <group ref={group} position={[shiftX, 0, 0]} scale={baseScale} rotation={[0, 0, portrait ? Math.PI / 2 : 0]}>
      <lineSegments geometry={buffers.lineGeom} frustumCulled={false}>
        <lineBasicMaterial color={palette.ink} transparent opacity={palette.line} />
      </lineSegments>
      <points geometry={buffers.nodeGeom} frustumCulled={false}>
        <pointsMaterial map={dot} color={palette.ink} size={0.1} sizeAttenuation transparent alphaTest={0.3} depthWrite={false} />
      </points>
      <points geometry={buffers.hubGeom} frustumCulled={false}>
        <pointsMaterial map={dot} color={palette.ink} size={0.26} sizeAttenuation transparent alphaTest={0.3} depthWrite={false} />
      </points>
      <points geometry={buffers.packetGeom} frustumCulled={false}>
        <pointsMaterial map={dot} color={palette.signal} size={0.85} sizeAttenuation transparent opacity={0.16} depthWrite={false} />
      </points>
      <points geometry={buffers.packetGeom} frustumCulled={false}>
        <pointsMaterial map={dot} color={palette.signal} size={0.24} sizeAttenuation transparent alphaTest={0.3} depthWrite={false} />
      </points>
    </group>
  )
}

/**
 * @param pointer  ref → { x, y, inside, clicks }   (normalised -1..1)
 * @param progress ref → 0..1 as the hero scrolls away
 * @param still    render a single static frame (reduced motion)
 * @param active   false pauses the render loop entirely (offscreen)
 */
export default function SystemGraph({ pointer, progress, dark, count = 78, still = false, active = true, onLayer, onReady }) {
  const palette = dark ? PALETTE.dark : PALETTE.light
  return (
    <Canvas
      dpr={[1, count < 60 ? 1.25 : 1.5]}
      frameloop={still ? "demand" : active ? "always" : "never"}
      camera={{ position: [0, 0, 10.5], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <fog attach="fog" args={[palette.bg, 9, 19]} />
      <Graph pointer={pointer} progress={progress} palette={palette} count={count} still={still} onLayer={onLayer} />
    </Canvas>
  )
}
