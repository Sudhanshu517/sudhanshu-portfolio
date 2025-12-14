"use client"

import * as React from "react"
import Link from "next/link"
import { Mail, Github, Linkedin, Send } from "lucide-react"

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isSubmitted, setIsSubmitted] = React.useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setIsSubmitted(true)
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
            <div className="space-y-4 text-center mb-12">
                <h1 className="text-4xl font-bold text-text">Get in Touch</h1>
                <p className="text-lg text-subtle">
                    Have a project in mind or just want to say hi? I'd love to hear from you.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-card p-6 rounded-lg border border-card space-y-6">
                        <h2 className="text-2xl font-bold text-text">Contact Information</h2>
                        <div className="space-y-4">
                            <Link href="mailto:sudhanshusharma517@gmail.com" className="flex items-start gap-3 text-subtle hover:text-primary transition-colors">
                                <Mail className="h-5 w-5 mt-1 shrink-0" />
                                <span className="break-all">sudhanshusharma517@gmail.com</span>
                            </Link>
                            <Link href="https://github.com/Sudhanshu517" target="_blank" className="flex items-start gap-3 text-subtle hover:text-primary transition-colors">
                                <Github className="h-5 w-5 mt-1 shrink-0" />
                                <span className="break-all">github.com/Sudhanshu517</span>
                            </Link>
                            <Link href="https://linkedin.com/in/sudhanshu517" target="_blank" className="flex items-start gap-3 text-subtle hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5 mt-1 shrink-0" />
                                <span className="break-all">https://www.linkedin.com/in/sudhanshu517/</span>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-card/50 p-6 rounded-lg border border-card">
                        <p className="text-subtle italic">
                            "The only way to do great work is to love what you do."
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-card p-8 rounded-lg border border-card">
                    {isSubmitted ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
                            <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                <Send className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold text-text">Message Sent!</h3>
                            <p className="text-subtle">
                                Thanks for reaching out. I'll get back to you as soon as possible.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-primary hover:underline text-sm"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-text">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Sid"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-text">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="sid@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-text">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Your message here..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
