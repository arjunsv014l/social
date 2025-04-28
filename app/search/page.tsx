"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PostCard } from "@/components/post-card"
import { UserSearchResult } from "@/components/user-search-result"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for search results
const mockPosts = [
  {
    id: "1",
    author: {
      name: "Jane Smith",
      username: "janesmith",
      avatar: "/placeholder-user.jpg",
    },
    content: "Just finished my final project for Computer Science! 🎉 The late nights were worth it.",
    timestamp: "2h ago",
    likes: 24,
    comments: [],
    image: "/collaborative-learning-space.png",
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
  },
]

const mockUsers = [
  {
    id: "1",
    name: "Jane Smith",
    username: "janesmith",
    avatar: "/placeholder-user.jpg",
    bio: "Computer Science student at State University",
  },
  {
    id: "2",
    name: "Mark Wilson",
    username: "markw",
    avatar: "/placeholder.svg",
    bio: "Mathematics major, tutor, and coffee enthusiast",
  },
  {
    id: "3",
    name: "Sarah Chen",
    username: "sarahc",
    avatar: "/placeholder.svg",
    bio: "Physics PhD candidate researching quantum computing",
  },
]

const mockMedia = [
  {
    id: "1",
    image: "/collaborative-learning-space.png",
    author: {
      name: "Jane Smith",
      username: "janesmith",
      avatar: "/placeholder-user.jpg",
    },
    timestamp: "2h ago",
  },
  {
    id: "2",
    image: "/coding-collaboration.png",
    author: {
      name: "Mark Wilson",
      username: "markw",
      avatar: "/placeholder.svg",
    },
    timestamp: "1d ago",
  },
  {
    id: "3",
    image: "/interconnected-learning.png",
    author: {
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "/placeholder.svg",
    },
    timestamp: "3d ago",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const filterParam = searchParams.get("filter") || "all"
  const [activeTab, setActiveTab] = useState(filterParam)

  // Update active tab when URL parameters change
  useEffect(() => {
    setActiveTab(filterParam)
  }, [filterParam])

  // In a real app, you would fetch search results based on the query
  // For now, we'll filter the mock data
  const filteredPosts = mockPosts.filter(
    (post) =>
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.author.name.toLowerCase().includes(query.toLowerCase()) ||
      post.author.username.toLowerCase().includes(query.toLowerCase()),
  )

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.bio.toLowerCase().includes(query.toLowerCase()),
  )

  const filteredMedia = mockMedia.filter(
    (media) =>
      media.author.name.toLowerCase().includes(query.toLowerCase()) ||
      media.author.username.toLowerCase().includes(query.toLowerCase()),
  )

  const handleLike = (postId: string) => {
    // Handle like functionality
    console.log("Liked post:", postId)
  }

  const handleAddComment = (postId: string, comment: string) => {
    // Handle comment functionality
    console.log("Added comment to post:", postId, comment)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-black">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {filteredUsers.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">People</h2>
                <div className="space-y-4">
                  {filteredUsers.slice(0, 3).map((user) => (
                    <UserSearchResult key={user.id} user={user} />
                  ))}
                </div>
              </div>
            )}

            {filteredPosts.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Posts</h2>
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onLike={() => handleLike(post.id)}
                      onAddComment={(comment) => handleAddComment(post.id, comment)}
                    />
                  ))}
                </div>
              </div>
            )}

            {filteredMedia.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Media</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredMedia.slice(0, 3).map((media) => (
                    <div key={media.id} className="relative aspect-square rounded-md overflow-hidden group">
                      <Image
                        src={media.image || "/placeholder.svg"}
                        alt="Media"
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <div className="text-white text-sm">
                          <p className="font-medium">{media.author.name}</p>
                          <p className="text-xs opacity-80">{media.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredUsers.length === 0 && filteredPosts.length === 0 && filteredMedia.length === 0 && (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-800">
                <p className="text-gray-500 dark:text-gray-400">No results found for "{query}"</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={() => handleLike(post.id)}
                  onAddComment={(comment) => handleAddComment(post.id, comment)}
                />
              ))
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-800">
                <p className="text-gray-500 dark:text-gray-400">No posts found for "{query}"</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="people" className="space-y-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => <UserSearchResult key={user.id} user={user} />)
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-800">
                <p className="text-gray-500 dark:text-gray-400">No people found for "{query}"</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            {filteredMedia.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMedia.map((media) => (
                  <div key={media.id} className="relative aspect-square rounded-md overflow-hidden group">
                    <Image
                      src={media.image || "/placeholder.svg"}
                      alt="Media"
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <div className="text-white text-sm">
                        <p className="font-medium">{media.author.name}</p>
                        <p className="text-xs opacity-80">{media.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-800">
                <p className="text-gray-500 dark:text-gray-400">No media found for "{query}"</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
