"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell, BookOpen, FileText, Home, LogOut, Menu, MessageSquare, Share2, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import { CreatePost } from "@/components/create-post"
import { Search } from "@/components/search"
import { DynamicContent } from "@/components/dynamic-content"
import { CurvedEdgeNav } from "@/components/curved-edge-nav"
import { DashboardTutorial } from "@/components/dashboard-tutorial"

// Doodle-inspired background with green animations
const DoodleBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
    {/* Base doodle pattern */}
    <div className="absolute inset-0 doodle-grid"></div>

    {/* Animated green doodles */}
    <div className="absolute inset-0">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 50 + 10}px`,
            height: `${Math.random() * 50 + 10}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
            border: `${Math.random() * 2 + 1}px solid rgba(34, 197, 94, ${Math.random() * 0.2 + 0.1})`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            x: [0, Math.random() * 20 - 10],
            y: [0, Math.random() * 20 - 10],
            rotate: [0, Math.random() * 20 - 10],
            scale: [1, Math.random() * 0.2 + 0.9],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>

    {/* Green floating particles */}
    <div className="absolute inset-0">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-green-400"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>

    {/* Doodle lines */}
    <div className="absolute inset-0 opacity-10">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.svg
          key={i}
          className="absolute"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            rotate: [0, Math.random() * 10 - 5],
            scale: [1, Math.random() * 0.1 + 0.95],
          }}
          transition={{
            duration: Math.random() * 8 + 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <path
            d={`M${Math.random() * 50} ${Math.random() * 50} Q${Math.random() * 100 + 50} ${
              Math.random() * 100 + 50
            } ${Math.random() * 50 + 100} ${Math.random() * 50 + 100}`}
            fill="none"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5,5"
          />
        </motion.svg>
      ))}
    </div>
  </div>
)

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [animateItems, setAnimateItems] = useState(false)
  const [showTutorialButton, setShowTutorialButton] = useState(false)

  useEffect(() => {
    // Delay animation to ensure smooth loading
    const timer = setTimeout(() => setAnimateItems(true), 300)

    // Show tutorial button after a delay
    const tutorialTimer = setTimeout(() => setShowTutorialButton(true), 2000)

    return () => {
      clearTimeout(timer)
      clearTimeout(tutorialTimer)
    }
  }, [])

  const navigation = [
    { name: "Home", href: "/", icon: Home, current: pathname === "/" },
    { name: "Profile", href: "/profile", icon: User, current: pathname === "/profile" },
    { name: "Messages", href: "/messages", icon: MessageSquare, current: pathname === "/messages" },
    { name: "Notifications", href: "/notifications", icon: Bell, current: pathname === "/notifications", badge: 3 },
    { name: "Journal", href: "/journal", icon: BookOpen, current: pathname === "/journal" },
    { name: "Resume", href: "/resume", icon: FileText, current: pathname === "/resume" },
    { name: "Referrals", href: "/referrals", icon: Share2, current: pathname === "/referrals", badge: 2 },
  ]

  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  const Sidebar = () => (
    <div className="flex h-full flex-col gap-y-5">
      <div className="flex flex-col gap-4 h-auto shrink-0 border-b border-black/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-full bg-white p-1 neon-border-green pulse-glow">
              <div className="h-6 w-6 rounded-full bg-black" />
            </div>
            <span className="text-xl font-bold neon-text-green">StudentSocial</span>
          </Link>
        </div>
        <Search className="w-full" />
      </div>

      <motion.nav
        className="flex flex-1 flex-col px-6"
        initial="hidden"
        animate={animateItems ? "visible" : "hidden"}
        variants={sidebarVariants}
      >
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="-mx-2 space-y-2">
              {navigation.map((item) => (
                <motion.li key={item.name} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className={`
                      futuristic-nav-item group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                      ${
                        item.current
                          ? "bg-black/5 active text-black"
                          : "text-black/70 hover:bg-black/5 hover:text-black"
                      }
                    `}
                  >
                    <item.icon className={`h-6 w-6 shrink-0 ${item.current ? "green-accent" : ""}`} />
                    {item.name}
                    {item.badge && <Badge className="ml-auto bg-black text-white">{item.badge}</Badge>}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <CreatePost />
          </li>
          <li className="mt-6 -mx-6 border-t border-black/10 pt-6">
            <div className="flex items-center px-6">
              <div className="flex items-center gap-x-4">
                <Avatar className="neon-border-green">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-semibold neon-text-green">Jane Smith</p>
                  <p className="text-black/60">@janesmith</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto text-black/70 hover:text-black">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          </li>
        </ul>
      </motion.nav>
    </div>
  )

  return (
    <div className="flex h-screen text-black">
      <DoodleBackground />

      {/* Mobile sidebar */}
      {isMobile ? (
        <>
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="w-72 border-r border-black/10 bg-white p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center gap-x-6 border-b border-black/10 bg-white/80 backdrop-blur-md px-4 shadow-sm">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open sidebar</span>
            </Button>
            <div className="flex flex-1 items-center gap-x-4 lg:gap-x-6">
              <div className="flex-1 flex items-center gap-4">
                <h1 className="text-xl font-semibold hidden sm:block neon-text-green">StudentSocial</h1>
                <Search className="w-full max-w-xs" />
              </div>
              <Avatar className="neon-border-green">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Samsung Edge-style curved navigation */}
          <CurvedEdgeNav />
        </>
      ) : (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col border-r border-black/10 bg-white/80 backdrop-blur-md">
          <Sidebar />
        </div>
      )}

      <main className={`flex-1 ${isMobile ? "pt-16" : "lg:pl-72"} bg-transparent`}>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {children}

          {pathname === "/" && pathname !== "/" && <DynamicContent />}
        </div>
      </main>

      {/* Tutorial button (desktop) */}
      {!isMobile && showTutorialButton && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={() => document.dispatchEvent(new CustomEvent("open-tutorial"))}
            className="rounded-full bg-black text-white hover:bg-black/80"
          >
            Take the Tour
          </Button>
        </motion.div>
      )}

      {/* 3D Tutorial */}
      <DashboardTutorial />
    </div>
  )
}
