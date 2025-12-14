"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function HeroSection() {
    const subtitle = "Full-Stack Developer | AI-Driven Systems | Problem Solver"
    const letters = subtitle.split("")

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
        }),
    }

    const childVariants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    }

    return (
        <section className="flex flex-col items-center justify-center text-center min-h-[80vh] px-4 bg-gradient-to-b from-background to-card/50 overflow-hidden relative">
            {/* Background subtle glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="space-y-6 max-w-3xl z-10">
                <motion.h1
                    className="text-4xl md:text-6xl font-bold tracking-tight text-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Hi, I'm{" "}
                    <motion.span
                        className="text-primary inline-block"
                        animate={{
                            textShadow: [
                                "0 0 0px rgba(37, 99, 235, 0)",
                                "0 0 10px rgba(37, 99, 235, 0.3)",
                                "0 0 0px rgba(37, 99, 235, 0)",
                            ],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        Sudhanshu
                    </motion.span>
                </motion.h1>

                <motion.h2
                    className="text-xl md:text-3xl font-medium text-subtle flex flex-wrap justify-center gap-1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {letters.map((letter, index) => (
                        <motion.span key={index} variants={childVariants}>
                            {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                    ))}
                </motion.h2>

                <motion.p
                    className="text-lg text-subtle max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    I build scalable, performant, and visually polished digital experiences.
                    My expertise spans modern frontend engineering, robust backend architecture, and AI-powered features that enhance real-world usability.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center pt-4 w-full sm:w-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                >
                    <Link href="/projects" className="w-full sm:w-auto">
                        <motion.div
                            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                y: [0, -5, 0],
                            }}
                            transition={{
                                y: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    repeatDelay: 3,
                                },
                            }}
                        >
                            View Projects
                        </motion.div>
                    </Link>
                    <Link href="/contact" className="w-full sm:w-auto">
                        <motion.div
                            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-card hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Me
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
