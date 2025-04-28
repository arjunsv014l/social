"use client"

import { useTheme } from "next-themes"
import { NeonButton } from "@/components/ui/neon-button"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { SunMoon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <NeonButton
      onClick={toggleTheme}
      variant="neon"
      size="icon"
      className="relative w-10 h-10 overflow-hidden"
      neonColor="cyan"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <SunMoon className="w-5 h-5" />
      </motion.div>
    </NeonButton>
  )
}
