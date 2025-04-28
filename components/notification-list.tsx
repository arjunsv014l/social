"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, MessageCircle, UserPlus } from "lucide-react"

// Mock data for notifications
const notifications = [
  {
    id: "1",
    type: "like",
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg",
    },
    content: "liked your post",
    postSnippet: "Just finished my final project for Computer Science!",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "comment",
    user: {
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "/placeholder.svg",
    },
    content: "commented on your post",
    postSnippet: "Thanks for sharing! This is exactly what I needed.",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "follow",
    user: {
      name: "Mark Wilson",
      username: "markw",
      avatar: "/placeholder.svg",
    },
    content: "started following you",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "like",
    user: {
      name: "David Park",
      username: "davidp",
      avatar: "/placeholder.svg",
    },
    content: "liked your comment",
    postSnippet: "Our professor mentioned this in class too.",
    timestamp: "1 day ago",
    read: true,
  },
]

export function NotificationList() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-accent" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-accent" />
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-accent" />
      default:
        return null
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "like":
        return "bg-red-accent/10 dark:bg-red-accent/20"
      case "comment":
        return "bg-blue-accent/10 dark:bg-blue-accent/20"
      case "follow":
        return "bg-green-accent/10 dark:bg-green-accent/20"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button variant="outline" size="sm" className="text-blue-accent border-blue-accent/30 hover:bg-blue-accent/10">
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`flex items-start gap-4 p-4 ${
              notification.read ? "bg-white dark:bg-black" : `${getNotificationColor(notification.type)}`
            } border-gray-200 dark:border-gray-800 hover-lift`}
          >
            <Avatar>
              <AvatarImage src={notification.user.avatar || "/placeholder.svg"} alt={notification.user.name} />
              <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{notification.user.name}</span>
                <span className="text-gray-700 dark:text-gray-300">{notification.content}</span>
                {getNotificationIcon(notification.type)}
              </div>

              {notification.postSnippet && (
                <p className="text-sm text-gray-500 dark:text-gray-400">"{notification.postSnippet}"</p>
              )}

              <p className="text-xs text-gray-500 dark:text-gray-500">{notification.timestamp}</p>
            </div>

            {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-accent animate-pulse-slow" />}
          </Card>
        ))}
      </div>
    </div>
  )
}
