// Source of truth: resume (CareConnect, InsightMiner AI) and the previous portfolio
// (everything else). Nothing here is invented — where a field was not stated
// anywhere, it is left out.

// Links marked as placeholders are intentionally obvious so they can be found
// and replaced: search the repo for "REPLACE-ME".
const PLACEHOLDER = "https://github.com/Sudhanshu517/REPLACE-ME"

export const flagship = {
  id: "careconnect",
  name: "CareConnect",
  kicker: "Multi-tenant real-time support chat · SaaS",
  summary:
    "A multi-tenant SaaS support-chat platform that lets businesses without in-house IT — clinics, service agencies — deploy real-time customer communication.",
  problem:
    "Scoped from a real client need surfaced through a digital marketing agency's client base: businesses that want live conversations with website visitors but have no engineering team to build or run it.",
  highlights: [
    {
      title: "Room-per-session architecture",
      body: "Every visitor conversation lives in its own Socket.IO room, so a single worker can manage many simultaneous conversations from one dashboard.",
    },
    {
      title: "Ephemeral, no-login sessions",
      body: "Visitors start chatting without an account. Session data is cleaned up automatically when the session ends, removing persistent-identity overhead for time-sensitive use cases.",
    },
    {
      title: "Tenant-isolated backend",
      body: "A modular backend keeps each business's conversations separate from every other tenant.",
    },
    {
      title: "Real-time media sharing",
      body: "Images and video can be shared live across chats.",
    },
  ],
  stack: ["Node.js", "Express", "Socket.IO", "React", "MongoDB"],
  links: { github: "https://github.com/Sudhanshu517/CareConnect",
      live: "https://care-connect-client-six.vercel.app/"
   },
}

// Major projects shown in the pinned showcase, in order of weight.
export const showcase = [
  {
    id: "insightminer",
    name: "InsightMiner AI",
    kicker: "NLP · review analytics",
    summary:
      "A data-analysis pipeline that turns large consumer-review datasets into sentiment trends, pain points and automated product insights.",
    problem:
      "Consumer reviews come in volumes too large to read; the useful signal — what people like and what hurts — stays buried.",
    features: [
      "Processes large-scale consumer review datasets",
      "NLP preprocessing and sentiment analysis to surface key trends and pain points",
      "Generates automated insights to support product-improvement decisions",
    ],
    flow: [
      { label: "Review data", sub: "large-scale datasets" },
      { label: "NLP preprocessing", sub: "text preprocessing" },
      { label: "Sentiment analysis", sub: "sentiment scoring" },
      { label: "Trends & pain points", sub: "what keeps coming up" },
      { label: "Automated insights", sub: "for product decisions" },
    ],
    stack: ["Next.js", "Python", "NLP", "FastAPI", "MongoDB"],
    links: { github: "https://github.com/Sudhanshu517/InsightMiner_AI",
             live: "https://insight-miner-ai.vercel.app/"
     },
    pattern: "dots",
  },
  {
    id: "ai-prep-tracker",
    name: "AI Prep Tracker",
    kicker: "AI · DSA practice",
    summary:
      "An AI-powered DSA practice tracker that pulls questions from LeetCode, GFG and TUF, shows recent activity, and generates personalised recommendations with the Gemini API.",
    problem:
      "DSA practice is spread across several platforms, which makes it hard to see progress or decide what to solve next.",
    features: [
      "Fetches questions from LeetCode, GFG and TUF",
      "Displays recent practice activity in one place",
      "Personalised recommendations generated with the Gemini API",
    ],
    flow: [
      { label: "LeetCode · GFG · TUF", sub: "practice platforms" },
      { label: "Fetch questions", sub: "platform data" },
      { label: "Recent activity", sub: "one unified view" },
      { label: "Gemini API", sub: "recommendation engine" },
      { label: "Recommendations", sub: "what to solve next" },
    ],
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Puppeteer",
      "Docker",
      "Clerk",
      "Gemini API",
    ],
    links: {
      github: "https://github.com/Sudhanshu517/AIPrepTracker",
      live: "https://aipreptracker-1.onrender.com",
    },
    pattern: "grid",
  },
  {
    id: "startup-builder",
    name: "Startup Builder",
    kicker: "Full-stack · drag-and-drop builder",
    summary:
      "A full-stack drag-and-drop landing-page builder with real-time canvas preview, reusable components, exportable templates and PostgreSQL persistence through Drizzle ORM.",
    problem:
      "Putting together a landing page normally means writing it from scratch; a visual builder makes that a matter of arranging components.",
    features: [
      "Drag-and-drop composition with real-time canvas preview",
      "Reusable components and exportable templates",
      "PostgreSQL-backed persistence using Drizzle ORM",
    ],
    stack: ["React", "TypeScript", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
    links: {
      github: "https://github.com/Sudhanshu517/startup-launch-builder",
      video: "https://drive.google.com/file/d/1DGNSAuJd_93zNqPBAPoKL2iFKpAcM6r9/view",
    },
    pattern: "hatch",
    interactive: "builder",
  },
  {
    id: "finsight-ai",
    name: "FinSight AI",
    kicker: "AI · personal finance",
    status: "Work in progress",
    summary:
      "An AI-assisted finance tracker that categorises expenses, analyses spending patterns and generates smart budgeting recommendations.",
    problem:
      "Tracking spending by hand is tedious, and raw transaction lists rarely tell you what to change.",
    features: [
      "Categorises expenses automatically",
      "Analyses spending patterns",
      "Generates budgeting recommendations",
    ],
    flow: [
      { label: "Expenses", sub: "transactions in" },
      { label: "Categorisation", sub: "AI-assisted" },
      { label: "Spending patterns", sub: "analysis" },
      { label: "Budget advice", sub: "recommendations" },
    ],
    stack: ["React", "Node.js", "Express", "AI", "MongoDB"],
    links: {
      github: "https://github.com/Sudhanshu517/FinSight-AI",
      live: "https://fin-sight-ai-wine.vercel.app/",
    },
    pattern: "lines",
  },
  {
    id: "password-manager",
    name: "Secure Password Manager",
    kicker: "Full-stack · security",
    summary:
      "A full-stack password manager built with React and Express, with encrypted password storage, CRUD operations and MongoDB-backed persistence.",
    problem:
      "Passwords need to be stored somewhere you control, without leaving them readable at rest.",
    features: [
      "Encrypted password storage",
      "Full CRUD operations",
      "MongoDB-backed persistence",
    ],
    flow: [
      { label: "React UI", sub: "add · edit · delete" },
      { label: "Express API", sub: "CRUD routes" },
      { label: "Encrypted storage", sub: "passwords protected" },
      { label: "MongoDB", sub: "persistence" },
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    links: {
      github: "https://github.com/Sudhanshu517/react-password-manager-secure",
      live: "https://react-password-manager-secure.vercel.app/",
    },
    pattern: "dots",
  },
]

// Smaller builds and placeholders, shown in the searchable archive.
export const archive = [
  {
    id: "screenwise-ai",
    name: "ScreenWise AI",
    summary: "An AI-powered candidate screening platform that automates resume evaluation using Gemini AI.",
    stack: [],
    kind: "AI",
    placeholder: true,
    links: { github: `https://github.com/Sudhanshu517/ScreenWise_AI`,
       live: `https://mynachiketa-ai-screening.vercel.app/` },
  },
  {
    id: "vectordb",
    name: "VectorDB",
    summary: "Project details are being added.",
    stack: [],
    kind: "Systems",
    placeholder: true,
    links: { github: `https://github.com/Sudhanshu517/VectorDB-CPP-Vector-Database`,
       live: `${PLACEHOLDER}-vectordb-live` },
  },
  {
    id: "spotify-clone",
    name: "Spotify UI Clone",
    summary:
      "A dynamic Spotify-like music player UI with playlist switching, real-time song updates and interactive JavaScript.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    kind: "UI",
    links: {
      github: "https://github.com/Sudhanshu517/Spotify-Clone",
      video: "https://drive.google.com/file/d/1Ww-5umm3Tje7SLsSliQ8IlxNyPEfujq-/view",
    },
  },
  {
    id: "lifelinkr",
    name: "LifeLinkr Landing Page",
    summary:
      "A clean, responsive landing page built for a technical assignment with HTML5, CSS3, Bootstrap 5 and JavaScript.",
    stack: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    kind: "UI",
    links: {
      github: "https://github.com/Sudhanshu517/Lifelinkr-Landing_Page",
      live: "https://lifelinkr-landing-page-virid.vercel.app/",
    },
  },
  {
    id: "netflix-clone",
    name: "Netflix UI Clone",
    summary:
      "A pixel-perfect Netflix homepage clone in HTML and CSS with a clean structure and responsive sections.",
    stack: ["HTML5", "CSS3"],
    kind: "UI",
    links: {
      github: "https://github.com/Sudhanshu517/netflix-clone-html-css",
      live: "https://netflix-clone-html-css-ashy.vercel.app/",
    },
  },
  {
    id: "twitter-clone",
    name: "Twitter UI Clone",
    summary:
      "A modern Twitter-style UI in Tailwind CSS with a responsive layout and reusable components.",
    stack: ["Tailwind CSS", "HTML5"],
    kind: "UI",
    links: {
      github: "https://github.com/Sudhanshu517/X-Twitter-Clone-using-Tailwind-CSS",
      video: "https://drive.google.com/file/d/1jvtxA6YN5ShIKrdqbwLks-inWIAuIcVY/view",
    },
  },
  {
    id: "todo-app",
    name: "Todo List App",
    summary:
      "A simple todo manager in React with LocalStorage persistence, UUID-based item IDs and a clean Tailwind CSS UI.",
    stack: ["React", "Tailwind CSS"],
    kind: "Web app",
    links: {
      github: "https://github.com/Sudhanshu517/TodoList-React",
      live: "https://todo-list-using-react-tailwind-and-react-icons.vercel.app/",
    },
  },
]

// Flat list used by the stack ↔ project linking and the /projects page.
export const allProjects = [
  { id: flagship.id, name: flagship.name, stack: flagship.stack },
  ...showcase.map(({ id, name, stack }) => ({ id, name, stack })),
  ...archive.map(({ id, name, stack }) => ({ id, name, stack })),
]
