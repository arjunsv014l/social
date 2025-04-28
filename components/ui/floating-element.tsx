"use client"

import * as React from "react"
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingElementProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: number
  glowColor?: string
  rotateIntensity?: number
  floatHeight?: number
  interactive?: boolean
}

export function FloatingElement({
  children,
  className,
  intensity = 20,
  glowColor = "rgba(34, 197, 94, 0.3)",
  rotateIntensity = 10,
  floatHeight = 10,
  interactive = true,
  ...props
}: FloatingElementProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  // Motion values for mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring animation for smoother movement
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [0, intensity], [rotateIntensity, -rotateIntensity]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, intensity], [-rotateIntensity, rotateIntensity]), springConfig)

  // Float animation for continuous movement
  const floatY = useMotionValue(0)

  React.useEffect(() => {
    if (!interactive) return

    const floatAnimation = setInterval(() => {
      const random = Math.sin(Date.now() / 1000) * floatHeight
      floatY.set(random)
    }, 50)

    return () => clearInterval(floatAnimation)
  }, [floatY, floatHeight, interactive])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return

    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate mouse position relative to center
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)

    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (!interactive) return

    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      className={cn("relative transition-all duration-200", className)}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          y: floatY,
          transformStyle: "preserve-3d",
          boxShadow: isHovered ? `0 5px 15px -5px ${glowColor}` : `0 2px 10px -5px ${glowColor}`,
          transition: "box-shadow 0.3s ease",
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
