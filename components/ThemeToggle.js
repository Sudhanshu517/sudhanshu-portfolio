"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="w-9 h-9" /> // Avoid hydration mismatch

    // Helper to determine which icon to show on the main button
    const CurrentIcon = theme === 'system' ? Monitor : theme === 'dark' ? Moon : Sun

    return (
        <div className="relative">
            {/* Main Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-card transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Toggle Theme Menu"
            >
                <CurrentIcon className="h-5 w-5 text-text" />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-36 rounded-md border border-border bg-background shadow-lg z-50"
                    >
                        <div className="flex flex-col p-1">
                            <ThemeOption 
                                icon={Sun} 
                                label="Light" 
                                active={theme === 'light'} 
                                onClick={() => { setTheme("light"); setIsOpen(false); }} 
                            />
                            <ThemeOption 
                                icon={Moon} 
                                label="Dark" 
                                active={theme === 'dark'} 
                                onClick={() => { setTheme("dark"); setIsOpen(false); }} 
                            />
                            <ThemeOption 
                                icon={Monitor} 
                                label="System" 
                                active={theme === 'system'} 
                                onClick={() => { setTheme("system"); setIsOpen(false); }} 
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// Sub-component for cleaner code
function ThemeOption({ icon: Icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-sm w-full text-left transition-colors
                ${active ? "bg-accent text-accent-foreground" : "hover:bg-muted text-muted-foreground"}
            `}
        >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
        </button>
    )
}