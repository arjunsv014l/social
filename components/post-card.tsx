"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share, Star } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Author {
  name: string
  username: string
  avatar: string
}

interface Comment {
  id: string
  author: Author
  content: string
  timestamp: string
}

interface Post {
  id: string
  author: Author
  content: string
  timestamp: string
  likes: number
  comments: Comment[]
  image?: string
  category?: string
  featured?: boolean
}

interface PostCardProps {
  post: Post
  onLike: () => void
  onAddComment: (comment: string) => void
  compact?: boolean
}

export function PostCard({ post, onLike, onAddComment, compact = false }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [liked, setLiked] = useState(false)

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      onAddComment(newComment)
      setNewComment("")
    }
  }

  const handleLike = () => {
    setLiked(!liked)
    onLike()
  }

  // Get category color
  const getCategoryColor = (category?: string) => {
    if (!category) return "bg-gray-100 text-gray-600 border-gray-200"

    switch (category) {
      case "academic":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "study":
        return "bg-purple-50 text-purple-600 border-purple-200"
      case "resources":
        return "bg-yellow-50 text-yellow-600 border-yellow-200"
      case "events":
        return "bg-pink-50 text-pink-600 border-pink-200"
      case "career":
        return "bg-green-50 text-green-600 border-green-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  return (
    <div className="text-black">
      <CardHeader className={cn("flex flex-row items-start gap-4 space-y-0", compact ? "pb-2" : "pb-3")}>
        <Avatar className={liked ? "neon-border-green pulse-glow" : ""}>
          <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-semibold truncate">{post.author.name}</span>
              <span className="text-xs text-black/50 truncate">@{post.author.username}</span>
              {post.featured && (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-600 border-green-200 flex items-center gap-1"
                >
                  <Star className="h-3 w-3" />
                  <span className="text-xs">Featured</span>
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {post.category && (
                <Badge variant="outline" className={cn("text-xs", getCategoryColor(post.category))}>
                  {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                </Badge>
              )}
              <span className="text-xs text-black/50 whitespace-nowrap">{post.timestamp}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className={cn(compact ? "pb-2" : "pb-3", "space-y-3")}>
        <p className={cn("whitespace-pre-wrap", compact ? "line-clamp-3" : "")}>{post.content}</p>

        {post.image && (
          <motion.div
            className="relative rounded-md overflow-hidden doodle-border"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className={cn("w-full relative", compact ? "aspect-[16/9]" : "aspect-video")}>
              <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
            </div>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-0">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 px-2 ${liked ? "text-green-500" : ""}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-green-500" : ""}`} />
              <span className="text-xs">{post.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 px-2"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{post.comments.length}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
              <Share className="h-4 w-4" />
            </Button>
          </div>

          {compact && post.comments.length > 0 && !showComments && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(true)}
              className="text-xs text-black/60 hover:text-black"
            >
              View {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
            </Button>
          )}
        </div>

        {showComments && (
          <div className="w-full space-y-4">
            <Separator className="bg-black/10" />

            {post.comments.length > 0 && (
              <div className="space-y-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 rounded-lg bg-black/5 p-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold">{comment.author.name}</span>
                        <span className="text-xs text-black/50">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmitComment} className="flex gap-2">
              <Avatar className="h-8 w-8 neon-border-green">
                <AvatarImage src="/placeholder-user.jpg" alt="Your avatar" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 items-center gap-2">
                <Input
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 bg-white border-black/10 focus:border-green-500"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!newComment.trim()}
                  className="bg-black text-white hover:bg-black/80"
                >
                  Post
                </Button>
              </div>
            </form>
          </div>
        )}
      </CardFooter>
    </div>
  )
}
