import { Briefcase, GraduationCap, Trophy, Target, Code } from "lucide-react"

export default function About() {
    return (
        // CHANGED: Replaced 'container' with 'max-w-7xl' to match the Home page layout
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-16">
            {/* Header */}
            <div className="space-y-4 text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-text">About Me</h1>
                <p className="text-lg text-subtle">
                    I'm Sudhanshu — a Full Stack Developer focused on building fast, scalable, and polished web applications.
                </p>
            </div>

            {/* Bio & Career Goals */}
            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-text flex items-center gap-2">
                        <Target className="h-6 w-6 text-primary" />
                        Focus & Drive
                    </h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-subtle">
                        <p>
                            I care about clean architecture, great developer experience, and shipping real products that people actually use.
                        </p>
                        
                        <div className="text-subtle space-y-4 mt-4">
                            <div>
                                <h3 className="font-bold text-text text-lg mb-2">What I Do</h3>
                                <ul className="space-y-2 list-disc pl-4">
                                    <li>Build responsive, performant UIs with React, Next.js & TypeScript.</li>
                                    <li>Design reliable backend systems with Node.js, Express, PostgreSQL & MongoDB.</li>
                                    <li>Integrate AI features where they enhance real workflow and user experience.</li>
                                    <li>Solve problems with clarity, structure, and measurable improvements.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold text-text text-lg mb-2">What Drives Me</h3>
                                <ul className="space-y-2 list-disc pl-4">
                                    <li>Turning complex problems into simple, maintainable solutions.</li>
                                    <li>Writing code that scales — technically and collaboratively.</li>
                                    <li>Continuously improving through projects, system thinking, and DSA.</li>
                                    <li>Working toward high-impact engineering roles in top tech companies.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-text flex items-center gap-2">
                        <Code className="h-6 w-6 text-primary" />
                        Technical Skills
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-text mb-2">Frontend</h3>
                            <div className="flex flex-wrap gap-2">
                                {["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript (ES6+)"].map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-card rounded-full text-sm text-subtle border border-card hover:border-primary transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium text-text mb-2">Backend</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "Drizzle ORM", "Firebase Auth"].map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-card rounded-full text-sm text-subtle border border-card hover:border-primary transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium text-text mb-2">Tools</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Git", "GitHub", "Vercel", "VS Code", "Figma", "Gemini API"].map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-card rounded-full text-sm text-subtle border border-card hover:border-primary transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Computer Science Knowledge */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    CS Foundations
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        "DSA (Data Structures & Algorithms)",
                        "OOP (Object-Oriented Programming)",
                        "Operating Systems",
                        "Computer Networks",
                        "DBMS",
                        "System Design (growing)"
                    ].map((topic) => (
                        <div key={topic} className="p-4 bg-card rounded-lg border border-card text-subtle text-center font-medium hover:border-primary transition-colors cursor-default">
                            {topic}
                        </div>
                    ))}
                </div>
            </div>

            {/* Experience - UNTOUCHED AS REQUESTED */}
            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-text flex items-center gap-2">
                    <Briefcase className="h-6 w-6 text-primary" />
                    Experience
                </h2>
                <div className="space-y-8 relative border-l-2 border-card ml-3 pl-8 pb-4">
                    <div className="relative">
                        <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary" />
                        <h3 className="text-xl font-bold text-text">Freelance Frontend Developer</h3>
                        <p className="text-primary font-medium"> Sunsyze •  Nov 2025 – Present</p>
                        <p className="mt-2 text-subtle">
                            Maintained and optimized a production HTML/CSS/JS + Tailwind website by delivering UI fixes, responsive improvements, and performance enhancements.
                        </p>
                        <p className="mt-2 text-subtle">
                            Implementing client-requested updates, ensuring cross-browser compatibility, and executing continuous UI/UX refinements.
                        </p>
                    </div>
                    <div className="relative">
                        <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background bg-subtle" />
                        <h3 className="text-xl font-bold text-text">Backend Intern</h3>
                        <p className="text-primary font-medium"> Yahweh Software Solutions •  Jul 2025 – Oct 2025</p>
                        <p className="mt-2 text-subtle">
                            Built Lesson Plan & Helpdesk modules (CRUD, Excel import/export, tenant-based filtering) using
                            Node.js, Express, MongoDB, JWT, and ExcelJS.</p>
                        <p className="mt-2 text-subtle">Optimized backend queries and architecture, boosting data efficiency by 30% and reducing API latency
                            by 40%.</p>
                    </div>
                    <div className="relative">
                        <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background bg-subtle" />
                        <h3 className="text-xl font-bold text-text">Open Source Contributor</h3>
                        <p className="text-primary font-medium"> Summer of Source Code (SSOC) •  Jun 2025 – Aug 2025</p>
                        <p className="mt-2 text-subtle">
                            Added PYQs module features, raised PRs, and proposed UI/feature enhancements in collaboration with
                            maintainers.
                        </p>
                    </div>

                    <div className="relative">
                        <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background bg-subtle" />
                        <h3 className="text-xl font-bold text-text">Frontend Intern</h3>
                        <p className="text-primary font-medium"> Airtech India •  Jun 2025 – Jul 2025</p>
                        <p className="mt-2 text-subtle">
                            Updated and enhanced an existing Next.js website by implementing UI components, responsive layouts, and design improvements.</p>
                        <p className="mt-2 text-subtle">
                            Collaborated with stakeholders to deliver iterative feature updates, ensuring alignment with business and UX requirements.
                        </p>
                    </div>
                </div>
            </div>

            {/* Education & Achievements */}
            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-text flex items-center gap-2">
                        <GraduationCap className="h-6 w-6 text-primary" />
                        Education
                    </h2>
                    <div className="bg-card p-6 rounded-lg border border-card">
                        <h3 className="text-lg font-bold text-text">Bachelor of Technology in Computer Science</h3>
                        <p className="text-primary">University of Technology • 2017 - 2021</p>
                        <p className="mt-2 text-subtle text-sm">
                            Focused on Software Engineering, Data Structures, and System Architecture.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-text flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-primary" />
                        Achievements
                    </h2>
                    <div className="bg-card p-6 rounded-lg border border-card">
                        <ul className="space-y-3 text-subtle">
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span>Built multiple production-quality full-stack applications</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span>Hackathon participant (Hackcraft 2.0)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span>Completed technical training at Airtech India</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span>Consistent progress on Striver DSA patterns</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}