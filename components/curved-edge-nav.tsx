"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, BookOpen, FileText, Home, MessageSquare, Share2, User, HelpCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  badge?: number
}

export function CurvedEdgeNav() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")
  const [isOpen, setIsOpen] = useState(false)

  // Navigation items
  const navItems: NavItem[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Notifications", href: "/notifications", icon: Bell, badge: 3 },
    { name: "Journal", href: "/journal", icon: BookOpen },
    { name: "Resume", href: "/resume", icon: FileText },
    { name: "Referrals", href: "/referrals", icon: Share2, badge: 2 },
  ]

  // Detect orientation
  useEffect(() => {
    const handleResize = () => {
      setOrientation(window.innerHeight > window.innerWidth ? "portrait" : "landscape")
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Don't render on desktop
  if (!isMobile) return null

  return (
    <>
      {/* Edge handle */}
      <div
        className={cn(
          "fixed z-50 flex items-center justify-center",
          orientation === "portrait"
            ? "right-0 top-1/2 -translate-y-1/2 h-32 w-6"
            : "bottom-0 left-1/2 -translate-x-1/2 w-32 h-6",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          className={cn(
            "bg-white/80 backdrop-blur-md border-black/10 flex items-center justify-center",
            orientation === "portrait"
              ? "h-32 w-6 rounded-l-xl border-l border-y"
              : "w-32 h-6 rounded-t-xl border-t border-x",
          )}
          whileHover={{
            width: orientation === "portrait" ? 12 : undefined,
            height: orientation === "landscape" ? 12 : undefined,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className={cn("bg-green-500 w-1 rounded-full", orientation === "portrait" ? "h-16" : "w-16 h-1")} />
        </motion.div>
      </div>

      {/* Navigation panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "fixed z-40 bg-white/80 backdrop-blur-md border-black/10",
              orientation === "portrait"
                ? "right-0 top-0 h-full w-20 border-l"
                : "bottom-0 left-0 w-full h-20 border-t",
            )}
            initial={{
              x: orientation === "portrait" ? 100 : 0,
              y: orientation === "landscape" ? 100 : 0,
            }}
            animate={{
              x: 0,
              y: 0,
            }}
            exit={{
              x: orientation === "portrait" ? 100 : 0,
              y: orientation === "landscape" ? 100 : 0,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div
              className={cn(
                "flex items-center justify-evenly h-full w-full",
                orientation === "portrait" ? "flex-col" : "flex-row",
              )}
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href} className="relative group" onClick={() => setIsOpen(false)}>
                    <motion.div
                      className={cn(
                        "flex flex-col items-center justify-center p-2 rounded-full",
                        isActive ? "text-green-500" : "text-black/70",
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <item.icon
                        className={cn(
                          "h-6 w-6",
                          isActive && "text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]",
                        )}
                      />
                      <span className="text-xs mt-1 opacity-80">{item.name}</span>

                      {item.badge && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-black text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </motion.div>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className={cn(
                          "absolute bg-green-500",
                          orientation === "portrait"
                            ? "left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full"
                            : "bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full",
                        )}
                        layoutId="activeIndicator"
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      />
                    )}
                  </Link>
                )
              })}

              {/* Tutorial button */}
              <Link
                href="#"
                className="relative group"
                onClick={(e) => {
                  e.preventDefault()
                  setIsOpen(false)
                  document.dispatchEvent(new CustomEvent("open-tutorial"))
                }}
              >
                <motion.div
                  className="flex flex-col items-center justify-center p-2 rounded-full text-green-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HelpCircle className="h-6 w-6 text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                  <span className="text-xs mt-1 opacity-80">Tutorial</span>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
