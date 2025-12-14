import Link from "next/link"
import { Github, ExternalLink, PlayCircle } from "lucide-react"

export function ProjectCard({ project }) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border border-card bg-card transition-all hover:shadow-lg hover:border-primary/50">
            {project.image && (
                <div className="relative h-48 w-full overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            )}
            
            <div className="p-6 flex flex-col flex-grow">
                {/* Header: Title Left, Buttons Right */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>

                    {/* Dynamic Button Group */}
                    <div className="flex flex-wrap gap-2 shrink-0">
                        {/* Github - Keeps secondary outline style */}
                        {project.github && (
                            <Link
                                href={project.github}
                                target="_blank"
                                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors text-xs font-medium"
                            >
                                <Github className="h-3.5 w-3.5" />
                                GitHub
                            </Link>
                        )}
                        
                        {/* Video Demo Button - Now uses primary blue style */}
                        {project.video && (
                            <Link
                                href={project.video}
                                target="_blank"
                                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs font-medium shadow-sm"
                            >
                                <PlayCircle className="h-3.5 w-3.5" />
                                Video Demo
                            </Link>
                        )}

                        {/* Live Demo Button - Primary blue style */}
                        {project.live && (
                            <Link
                                href={project.live}
                                target="_blank"
                                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs font-medium shadow-sm"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                Live Website
                            </Link>
                        )}
                    </div>
                </div>

                <p className="mb-4 text-subtle flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}