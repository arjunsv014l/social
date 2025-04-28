"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HolographicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gradient" | "minimal" | "sketch"
  animate3d?: boolean
  glowIntensity?: "low" | "medium" | "high"
  interactive?: boolean
}

const HolographicCard = React.forwardRef<HTMLDivElement, HolographicCardProps>(
  (
    {
      className,
      variant = "default",
      animate3d = true,
      glowIntensity = "medium",
      interactive = true,
      children,
      ...props
    },
    ref,
  ) => {
    const [rotateX, setRotateX] = React.useState(0)
    const [rotateY, setRotateY] = React.useState(0)
    const [glowing, setGlowing] = React.useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive) return

      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX
      const mouseY = e.clientY

      // Calculate rotation based on mouse position relative to center of card
      // Limit rotation to +/- 10 degrees
      const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 3
      const rotateX = ((centerY - mouseY) / (rect.height / 2)) * 3

      setRotateX(rotateX)
      setRotateY(rotateY)
      setGlowing(true)
    }

    const handleMouseLeave = () => {
      if (!interactive) return

      setRotateX(0)
      setRotateY(0)
      setGlowing(false)
    }

    // Update the variant classes for black and white theme with green accents
    const variantClasses = {
      default: "bg-white border-black/10",
      gradient: "bg-gradient-to-br from-white to-gray-50 border-black/10",
      minimal: "bg-white/80 backdrop-blur-sm border-black/5",
      sketch: "sketch-card",
    }

    // Update the glow classes for green accents
    const glowClasses = {
      low: "after:opacity-10",
      medium: "after:opacity-20",
      high: "after:opacity-30",
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-xl",
          variantClasses[variant],
          glowClasses[glowIntensity],
          animate3d ? "perspective-card" : "",
          glowing ? "after:opacity-100" : "after:opacity-0",
          interactive ? "cursor-pointer" : "",
          className,
        )}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.1s ease-out",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300",
            glowing ? "opacity-5" : "opacity-0",
            "from-green-500/10 to-transparent",
          )}
        />
      </motion.div>
    )
  },
)
HolographicCard.displayName = "HolographicCard"

export { HolographicCard }
