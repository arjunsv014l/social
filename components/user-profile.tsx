"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/post-card"
import { CalendarDays, MapPin, Pencil } from "lucide-react"

// Mock data for user profile
const userProfile = {
  name: "Jane Smith",
  username: "janesmith",
  avatar: "/placeholder-user.jpg",
  bio: "Computer Science student at State University. Passionate about web development and AI. Always learning something new!",
  location: "San Francisco, CA",
  joinedDate: "September 2022",
  following: 245,
  followers: 189,
  posts: [
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
    },
    {
      id: "3",
      author: {
        name: "Jane Smith",
        username: "janesmith",
        avatar: "/placeholder-user.jpg",
      },
      content:
        "Working on a new machine learning project for my AI class. Neural networks are fascinating but challenging!",
      timestamp: "2d ago",
      likes: 31,
      comments: [],
      image: "/abstract-neural-network.png",
    },
  ],
}

export function UserProfile() {
  const handleLike = (postId: string) => {
    // Handle like functionality
    console.log("Liked post:", postId)
  }

  const handleAddComment = (postId: string, comment: string) => {
    // Handle comment functionality
    console.log("Added comment to post:", postId, comment)
  }

  return (
    <div className="space-y-6">
      <Card className="border-gray-800 bg-black">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-1 flex-col space-y-4 text-center sm:text-left">
              <div>
                <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                <p className="text-gray-400">@{userProfile.username}</p>
              </div>

              <p>{userProfile.bio}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                {userProfile.location && (
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {userProfile.location}
                  </div>
                )}
                {userProfile.joinedDate && (
                  <div className="flex items-center">
                    <CalendarDays className="mr-1 h-4 w-4" />
                    Joined {userProfile.joinedDate}
                  </div>
                )}
              </div>

              <div className="flex gap-4 text-sm">
                <div>
                  <span className="font-bold">{userProfile.following}</span>{" "}
                  <span className="text-gray-400">Following</span>
                </div>
                <div>
                  <span className="font-bold">{userProfile.followers}</span>{" "}
                  <span className="text-gray-400">Followers</span>
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6 space-y-4">
          {userProfile.posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
              onAddComment={(comment) => handleAddComment(post.id, comment)}
            />
          ))}
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-800">
            <p className="text-gray-400">No media posts yet</p>
          </div>
        </TabsContent>

        <TabsContent value="likes" className="mt-6">
          <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-800">
            <p className="text-gray-400">No liked posts yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
