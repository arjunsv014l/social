"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HolographicCard } from "@/components/ui/holographic-card"
import { FloatingElement } from "@/components/ui/floating-element"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, TrendingUp, Clock, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock data for posts
const initialPosts = [
  {
    id: "1",
    author: {
      name: "Jane Smith",
      username: "janesmith",
      avatar: "/placeholder-user.jpg",
    },
    content:
      "Just finished my final project for Computer Science! 🎉 The late nights were worth it. Anyone else wrapping up their semester projects?",
    timestamp: "2h ago",
    likes: 24,
    comments: [
      {
        id: "c1",
        author: {
          name: "Alex Johnson",
          username: "alexj",
          avatar: "/placeholder.svg",
        },
        content: "Congrats! What was your project about?",
        timestamp: "1h ago",
      },
    ],
    image: "/coding-collaboration.png",
    category: "academic",
    featured: true,
  },
  {
    id: "2",
    author: {
      name: "Mark Wilson",
      username: "markw",
      avatar: "/placeholder.svg",
    },
    content: "Study group for tomorrow's calculus exam at the library, 6PM. DM me if you want to join! #StudyBuddies",
    timestamp: "5h ago",
    likes: 15,
    comments: [],
    category: "study",
  },
  {
    id: "3",
    author: {
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "/placeholder.svg",
    },
    content:
      "Just discovered this amazing resource for learning machine learning concepts. Highly recommend for anyone in CS 401!",
    timestamp: "1d ago",
    likes: 42,
    comments: [
      {
        id: "c2",
        author: {
          name: "Jane Smith",
          username: "janesmith",
          avatar: "/placeholder-user.jpg",
        },
        content: "Thanks for sharing! This is exactly what I needed for my project.",
        timestamp: "20h ago",
      },
      {
        id: "c3",
        author: {
          name: "David Park",
          username: "davidp",
          avatar: "/placeholder.svg",
        },
        content: "Our professor mentioned this in class too. It's really helpful!",
        timestamp: "18h ago",
      },
    ],
    image: "/abstract-neural-network.png",
    category: "resources",
  },
  {
    id: "4",
    author: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg",
    },
    content: "Anyone interested in joining the hackathon next weekend? Looking for team members with UI/UX experience!",
    timestamp: "3h ago",
    likes: 8,
    comments: [],
    category: "events",
  },
  {
    id: "5",
    author: {
      name: "Emily Zhang",
      username: "emilyzhang",
      avatar: "/placeholder.svg",
    },
    content: "Just got my internship offer from Tech Innovations Inc! So excited to start this summer! 🚀",
    timestamp: "6h ago",
    likes: 56,
    comments: [],
    category: "career",
    featured: true,
  },
  {
    id: "6",
    author: {
      name: "David Park",
      username: "davidp",
      avatar: "/placeholder.svg",
    },
    content:
      "Does anyone have notes from yesterday's Systems Architecture lecture? I had to miss class due to a doctor's appointment.",
    timestamp: "1d ago",
    likes: 3,
    comments: [],
    category: "academic",
  },
]

// Categories for filtering
const categories = [
  { value: "all", label: "All Posts" },
  { value: "academic", label: "Academic" },
  { value: "study", label: "Study Groups" },
  { value: "resources", label: "Resources" },
  { value: "events", label: "Events" },
  { value: "career", label: "Career" },
]

export function Feed() {
  const [posts, setPosts] = useState(initialPosts)
  const [filteredPosts, setFilteredPosts] = useState(initialPosts)
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"latest" | "trending" | "featured">("latest")

  // Filter and sort posts when dependencies change
  useEffect(() => {
    let result = [...posts]

    // Apply category filter
    if (activeCategory !== "all") {
      result = result.filter((post) => post.category === activeCategory)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (post) =>
          post.content.toLowerCase().includes(query) ||
          post.author.name.toLowerCase().includes(query) ||
          post.author.username.toLowerCase().includes(query),
      )
    }

    // Apply tab filter
    if (activeTab === "featured") {
      result = result.filter((post) => post.featured)
    }

    // Apply sorting
    switch (sortOrder) {
      case "latest":
        // Simple mock sorting by assuming the array is already in chronological order
        break
      case "trending":
        result.sort((a, b) => b.likes - a.likes)
        break
      case "featured":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    setFilteredPosts(result)
  }, [posts, activeCategory, searchQuery, sortOrder, activeTab])

  const handleLike = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  const handleAddComment = (postId: string, comment: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: `c${Date.now()}`,
                  author: {
                    name: "Jane Smith",
                    username: "janesmith",
                    avatar: "/placeholder-user.jpg",
                  },
                  content: comment,
                  timestamp: "Just now",
                },
              ],
            }
          : post,
      ),
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with search and filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold neon-text-green">Your Feed</h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            {/* Search input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/50" />
              <Input
                type="search"
                placeholder="Search posts..."
                className="pl-8 pr-4 py-2 w-full border-black/10 focus:border-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-black/10">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Sort</span>
                  <Badge variant="outline" className="ml-1 bg-green-500/10 text-green-600 border-green-500/30">
                    {sortOrder === "latest" ? "Latest" : sortOrder === "trending" ? "Trending" : "Featured"}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortOrder("latest")} className="gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Latest</span>
                  {sortOrder === "latest" && <Check className="h-4 w-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("trending")} className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Trending</span>
                  {sortOrder === "trending" && <Check className="h-4 w-4 ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("featured")} className="gap-2">
                  <Star className="h-4 w-4" />
                  <span>Featured</span>
                  {sortOrder === "featured" && <Check className="h-4 w-4 ml-auto" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs for main content filtering */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-white border border-black/10 mb-6">
            <TabsTrigger value="all" className={cn(activeTab === "all" ? "neon-text-green" : "")}>
              All Posts
            </TabsTrigger>
            <TabsTrigger value="featured" className={cn(activeTab === "featured" ? "neon-text-green" : "")}>
              Featured
            </TabsTrigger>
            <TabsTrigger value="following" className={cn(activeTab === "following" ? "neon-text-green" : "")}>
              Following
            </TabsTrigger>
          </TabsList>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  "rounded-full px-4 py-1 text-sm",
                  activeCategory === category.value
                    ? "bg-black text-white"
                    : "bg-white text-black border-black/10 hover:bg-black/5",
                )}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Feed content */}
          <TabsContent value={activeTab} className="mt-0">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    animate="show"
                    className="doodle-float"
                  >
                    <FloatingElement
                      intensity={5}
                      rotateIntensity={2}
                      floatHeight={3}
                      glowColor="rgba(34, 197, 94, 0.2)"
                    >
                      <HolographicCard
                        variant="sketch"
                        animate3d={false}
                        interactive={false}
                        className={cn(post.featured && "border-green-500/30 border-2")}
                      >
                        <PostCard
                          post={post}
                          onLike={() => handleLike(post.id)}
                          onAddComment={(comment) => handleAddComment(post.id, comment)}
                          compact={!post.featured}
                        />
                      </HolographicCard>
                    </FloatingElement>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-black/5 flex items-center justify-center">
                  <Search className="h-8 w-8 text-black/30" />
                </div>
                <h3 className="text-lg font-medium mb-1">No posts found</h3>
                <p className="text-black/60 max-w-md">
                  {searchQuery
                    ? `No posts matching "${searchQuery}" in the selected category.`
                    : "No posts in the selected category."}
                </p>
                <Button
                  onClick={() => {
                    setActiveCategory("all")
                    setSearchQuery("")
                  }}
                  className="mt-4 bg-black text-white hover:bg-black/80"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

// Check icon component for the dropdown menu
function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
