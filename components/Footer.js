import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-card bg-background py-8 mt-auto">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-subtle">
                    © {new Date().getFullYear()} Sudhanshu. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                    <Link href="https://github.com/Sudhanshu517" target="_blank" className="text-subtle hover:text-primary transition-colors">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href="https://www.linkedin.com/in/sudhanshu517/" target="_blank" className="text-subtle hover:text-primary transition-colors">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    {/* <Link href="mailto:sudhanshusharma517@gmail.com" className="text-subtle hover:text-primary transition-colors">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                    </Link> */}
                </div>
            </div>
        </footer>
    )
}
