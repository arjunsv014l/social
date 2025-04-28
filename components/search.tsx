"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon, X, Filter, Sparkles } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface SearchProps {
  className?: string
}

type FilterType = "all" | "posts" | "people" | "media"

export function Search({ className }: SearchProps) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<FilterType>("all")
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}&filter=${filter}`)
    }
  }

  const clearSearch = () => {
    setQuery("")
    inputRef.current?.focus()
  }

  const filterLabels = {
    all: "All",
    posts: "Posts",
    people: "People",
    media: "Media",
  }

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <motion.div
            animate={isFocused ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            className="absolute inset-0 -m-1 rounded-md bg-green-500/10 blur-md"
          />

          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/50" />

          <Input
            ref={inputRef}
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="pl-10 pr-8 bg-white/80 backdrop-blur-sm border-black/10 text-black placeholder:text-black/40 focus:border-green-500 focus:ring-green-500"
          />

          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 text-black/50"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-black/10">
              <Filter className="mr-1 h-4 w-4" />
              <span className="sr-only md:not-sr-only md:mr-1">{filterLabels[filter]}</span>
              <Badge
                variant="outline"
                className="hidden md:flex ml-1 bg-green-500/10 text-green-600 border-green-500/30"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Filter
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-md border-black/10">
            <DropdownMenuLabel className="text-green-600">Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-black/10" />
            <DropdownMenuItem onClick={() => setFilter("all")} className="focus:bg-green-500/10">
              All
              {filter === "all" && <SearchIcon className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("posts")} className="focus:bg-green-500/10">
              Posts
              {filter === "posts" && <SearchIcon className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("people")} className="focus:bg-green-500/10">
              People
              {filter === "people" && <SearchIcon className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("media")} className="focus:bg-green-500/10">
              Media
              {filter === "media" && <SearchIcon className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </form>
  )
}
