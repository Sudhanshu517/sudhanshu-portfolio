import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProjectCard } from "@/components/ProjectCard"
import { HeroSection } from "@/components/HeroSection"
import Image from "next/image"

export default function Home() {
  const featuredProjects = [
     {
        title: "FinSight AI",
        description: "AI-assisted finance tracker that categorizes expenses, analyzes spending patterns, and generates smart budgeting recommendations. (Work in progress)",
        tags: ["React", "Node.js", "Express", "AI", "MongoDB"],
        github: "https://github.com/Sudhanshu517/FinSight-AI",
        live: "https://fin-sight-ai-wine.vercel.app/",
    },
    {
      title: "Startup Builder",
      description: "A full-stack drag-and-drop landing page builder with real-time canvas preview, reusable components, exportable templates, and PostgreSQL–backed persistence using Drizzle ORM.",
      tags: ["React", "TypeScript", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
      github: "https://github.com/Sudhanshu517/startup-launch-builder",
      video: "https://drive.google.com/file/d/1DGNSAuJd_93zNqPBAPoKL2iFKpAcM6r9/view",
    },
    {
      title: "AI Prep Tracker",
      description: "AI-powered DSA practice tracker that fetches questions from LeetCode, GFG, and TUF, displays recent activity, and generates personalized recommendations using Gemini API.",
      tags: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Puppeteer", "Docker", "Clerk", "Gemini AI"],
      github: "https://github.com/Sudhanshu517/AIPrepTracker",
      live: "https://aipreptracker-1.onrender.com",
    },
    {
      title: "Secure Password Manager",
      description: "A full-stack password manager built with React and Express, featuring encrypted password storage, CRUD operations, and MongoDB-backed persistence.",
      tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/Sudhanshu517/react-password-manager-secure",
      live: "https://react-password-manager-secure.vercel.app/",
    },

    
  ]

  return (
    <div className="flex flex-col gap-16 md:gap-20 pb-20">
      {/* Hero Section */}
      <HeroSection />

      {/* About Preview */}
      {/* CHANGED: max-w-6xl -> max-w-7xl to reduce side margins */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="flex flex-col md:flex-row gap-8 md:gap-2 items-center">
          <div className="flex-1 space-y-3 md:space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-text">About Me</h2>
            
            <p className="text-subtle text-base md:text-lg">
             I'm a Full Stack Developer who loves building fast, reliable, and user-focused applications.
            </p>
            
            <p className="text-subtle text-sm md:text-base">
            I solve problems with clean code, modern tools, and a mindset for continuous improvement.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium mt-2 text-sm md:text-base"
            >
              Read full bio <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          {/* IMAGE SECTION */}
          <div className="shrink-0 w-full max-w-sm md:w-[550px] p-5 bg-card rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center overflow-hidden">
              <span className="text-4xl">
              </span>
              <Image 
                src="/sid1.png" 
                alt="developer image" 
                width={1200} 
                height={1200}
                className="object-cover w-full h-full" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="bg-card/50 py-16 md:py-20">
        {/* CHANGED: max-w-6xl -> max-w-7xl */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 md:space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-text text-center">Tech Stack</h2>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Frontend */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-primary text-center">Frontend</h3>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {["React", "Next.js", "Typescript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript (ES6+)"].map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-background rounded-full shadow-sm border border-card text-text text-xs md:text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-primary text-center">Backend</h3>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {["Node.js", "Express.js", "PostgreSQL", "MongoDB", "REST APIs", "Firebase Auth"].map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-background rounded-full shadow-sm border border-card text-text text-xs md:text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Others */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-primary text-center">AI & Tools</h3>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {["Gemini API", "Git", "GitHub", "VS Code", "Vercel", "Figma"].map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-background rounded-full shadow-sm border border-card text-text text-xs md:text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {/* CHANGED: max-w-6xl -> max-w-7xl */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 md:space-y-10 w-full">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-text">Featured Projects</h2>
            <p className="text-subtle text-sm md:text-base">Some of my recent work.</p>
          </div>
          <Link
            href="/projects"
            className="hidden md:inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            View all projects <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="text-center md:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90"
          >
            See More Projects
          </Link>
        </div>
      </section>
    </div>
  )
}