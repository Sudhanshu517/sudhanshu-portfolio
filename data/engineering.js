// Each track walks through something that appears in the resume or portfolio.
// Code is a simplified illustration of the pattern, and is labelled as such in the UI.
export const tracks = [
  {
    id: "rest",
    label: "REST request",
    source: "Backend internship · Yahweh Software Solutions",
    nodes: [
      { label: "Client", sub: "React / Next.js" },
      { label: "Express API", sub: "Node.js routes" },
      { label: "Auth", sub: "JWT middleware" },
      { label: "Tenant scope", sub: "filtered queries" },
      { label: "MongoDB", sub: "CRUD" },
    ],
    code: [
      'router.get("/helpdesk", requireAuth, async (req, res) => {',
      "  const tickets = await Ticket.find({ tenantId: req.user.tenantId })",
      "  res.json(tickets)",
      "})",
    ],
    steps: [
      {
        node: 0,
        title: "The request leaves the client",
        body: "A React interface calls a REST endpoint — the same pattern as the Lesson Plan and Helpdesk modules I built.",
        lines: [],
      },
      {
        node: 2,
        title: "Authenticated before any handler runs",
        body: "JWT-based authentication lives in middleware, so an unauthenticated request never reaches the route logic.",
        lines: [0],
      },
      {
        node: 3,
        title: "Scoped to the tenant",
        body: "Queries are filtered per tenant, so one organisation never reads another's records.",
        lines: [1],
      },
      {
        node: 4,
        title: "Persisted and validated",
        body: "CRUD workflows persist to MongoDB, with Excel import/export through ExcelJS. Endpoints were validated in Postman.",
        lines: [2],
      },
      {
        node: 1,
        title: "Then made faster",
        body: "I optimised backend queries and the surrounding architecture during the internship.",
        lines: [],
        stats: [
          { value: "30%", label: "better data efficiency" },
          { value: "40%", label: "lower API latency" },
        ],
      },
    ],
  },
  {
    id: "realtime",
    label: "Real-time session",
    source: "CareConnect",
    nodes: [
      { label: "Visitor", sub: "no login" },
      { label: "Socket.IO", sub: "server" },
      { label: "Session room", sub: "one per visitor" },
      { label: "Agent dashboard", sub: "one worker" },
    ],
    code: [
      'io.on("connection", (socket) => {',
      "  socket.join(session.room)",
      '  socket.on("message", (m) => io.to(session.room).emit("message", m))',
      '  socket.on("disconnect", () => cleanUp(session))',
      "})",
    ],
    steps: [
      {
        node: 0,
        title: "A visitor opens the chat",
        body: "No account, no sign-up — an ephemeral session starts the moment they say hello.",
        lines: [],
      },
      {
        node: 2,
        title: "They get their own room",
        body: "The server places each session in its own Socket.IO room, keeping conversations separate.",
        lines: [1],
      },
      {
        node: 3,
        title: "One worker, many conversations",
        body: "A single worker manages several simultaneous visitors from one dashboard.",
        lines: [2],
      },
      {
        node: 2,
        title: "Media travels the same room",
        body: "Images and video are shared in real time across chats, through a modular, tenant-isolated backend.",
        lines: [2],
      },
      {
        node: 0,
        title: "The session ends, the data goes",
        body: "When the session closes its data is cleaned up automatically — no persistent identity to manage.",
        lines: [3],
      },
    ],
  },
]
