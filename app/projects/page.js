"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { ProjectCard } from "@/components/ProjectCard"

const allProjects = [
    {
        title: "Startup Builder",
        description: "A full-stack drag-and-drop landing page builder with real-time canvas preview, reusable components, exportable templates, and PostgreSQL–backed persistence using Drizzle ORM.",
        tags: ["React", "TypeScript", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
        github: "https://github.com/Sudhanshu517/startup-launch-builder",
        video: "https://drive.google.com/file/d/1DGNSAuJd_93zNqPBAPoKL2iFKpAcM6r9/view",
        image: "https://placehold.co/600x400/2563EB/FFFFFF?text=Startup+Builder",
    },
    {
        title: "AI Prep Tracker",
        description: "AI-powered DSA practice tracker that fetches questions from LeetCode, GFG, and TUF, displays recent activity, and generates personalized recommendations using Gemini API.",
        tags: [ "React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Puppeteer", "Docker", "Clerk", "Gemini AI"],
        github: "https://github.com/Sudhanshu517/AIPrepTracker",
        live: "https://aipreptracker-1.onrender.com",
        image: "https://placehold.co/600x400/0EA5E9/FFFFFF?text=AI+Prep+Tracker",
    },
    {
        title: "FinSight AI",
        description: "AI-assisted finance tracker that categorizes expenses, analyzes spending patterns, and generates smart budgeting recommendations. (Work in progress)",
        tags: ["React", "Node.js", "Express", "AI", "MongoDB"],
        github: "https://github.com/Sudhanshu517/FinSight-AI",
        live: "https://fin-sight-ai-wine.vercel.app/",
        image: "https://placehold.co/600x400/F59E0B/FFFFFF?text=FinSight+AI",
    },
    {
        title: "Secure Password Manager",
        description: "A full-stack password manager built with React and Express, featuring encrypted password storage, CRUD operations, and MongoDB-backed persistence.",
        tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
        github: "https://github.com/Sudhanshu517/react-password-manager-secure",
        live: "https://react-password-manager-secure.vercel.app/",
        image: "https://placehold.co/600x400/10B981/FFFFFF?text=Password+Manager",
    },
    {
        title: "Spotify UI Clone",
        description: "A dynamic Spotify-like music player UI featuring playlist switching, real-time song updates, and interactive JavaScript functionality.",
        tags: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/Sudhanshu517/Spotify-Clone",
        video: "https://drive.google.com/file/d/1Ww-5umm3Tje7SLsSliQ8IlxNyPEfujq-/view",
        image: "https://placehold.co/600x400/22C55E/FFFFFF?text=Spotify+Clone",
    },
    {
        title: "LifeLinkr Frontend (Assignment Project)",
        description: "A clean, responsive landing page built as part of a technical assignment using HTML5, CSS3, Bootstrap 5, and JavaScript.",
        tags: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
        github: "https://github.com/Sudhanshu517/Lifelinkr-Landing_Page",
        live: "https://lifelinkr-landing-page-virid.vercel.app/",
        image: "https://placehold.co/600x400/475569/FFFFFF?text=LifeLinkr",
    },
    {
        title: "Netflix UI Clone",
        description: "A pixel-perfect Netflix homepage clone built using HTML and CSS with clean structure and responsive sections.",
        tags: ["HTML", "CSS"],
        github: "https://github.com/Sudhanshu517/netflix-clone-html-css",
        live: "https://netflix-clone-html-css-ashy.vercel.app/",
        image: "https://placehold.co/600x400/EF4444/FFFFFF?text=Netflix+Clone",
    },
    {
        title: "Twitter UI Clone",
        description: "A modern Twitter-style UI created using Tailwind CSS. Includes responsive layout and reusable components.",
        tags: ["Tailwind CSS", "HTML"],
        github: "https://github.com/Sudhanshu517/X-Twitter-Clone-using-Tailwind-CSS",
        video: "https://drive.google.com/file/d/1jvtxA6YN5ShIKrdqbwLks-inWIAuIcVY/view",
        image: "https://placehold.co/600x400/1DA1F2/FFFFFF?text=Twitter+Clone",
    },
    {
        title: "Todo List App",
        description: "A simple and efficient todo manager built with React, featuring LocalStorage persistence, UUID-based item IDs, and a clean Tailwind CSS UI.",
        tags: ["React", "Tailwind CSS", "LocalStorage"],
        github: "https://github.com/Sudhanshu517/TodoList-React",
        live: "https://todo-list-using-react-tailwind-and-react-icons.vercel.app/",
        image: "https://placehold.co/600x400/6366F1/FFFFFF?text=Todo+App",
    },
];


export default function Projects() {
    const [query, setQuery] = React.useState("")

    const filteredProjects = allProjects.filter((project) => {
        const searchLower = query.toLowerCase()
        return (
            project.title.toLowerCase().includes(searchLower) ||
            project.description.toLowerCase().includes(searchLower) ||
            project.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        )
    })

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 space-y-12">
            <div className="space-y-4 text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-text">Projects</h1>
                <p className="text-lg text-subtle">
                    A collection of my work, ranging from web applications to open source contributions.
                </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-subtle" />
                </div>
                <input
                    type="text"
                    placeholder="Search projects by name, tech, or keywords..."
                    className="block w-full pl-10 pr-3 py-2 border border-card rounded-md leading-5 bg-card text-text placeholder-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-subtle text-lg">No projects found matching your search.</p>
                </div>
            )}
        </div>
    )
}
