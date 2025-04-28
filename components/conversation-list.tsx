"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  name: string
  username: string
  avatar: string
  status: "online" | "offline"
}

interface Message {
  text: string
  timestamp: string
  isRead: boolean
  sender: string
}

interface Conversation {
  id: string
  user: User
  lastMessage: Message
  unreadCount: number
}

interface ConversationListProps {
  conversations: Conversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
}

export function ConversationList({ conversations, activeConversationId, onSelectConversation }: ConversationListProps) {
  return (
    <div className="border-r border-gray-200 dark:border-gray-800 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search messages..."
            className="pl-8 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`
              flex items-center gap-3 p-3 cursor-pointer transition-colors
              hover:bg-gray-100 dark:hover:bg-gray-800
              ${activeConversationId === conversation.id ? "bg-gray-100 dark:bg-gray-800" : ""}
              ${conversation.unreadCount > 0 ? "bg-blue-50 dark:bg-blue-900/20" : ""}
            `}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="relative">
              <Avatar>
                <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
                <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-black
                  ${conversation.user.status === "online" ? "bg-green-500" : "bg-gray-400"}
                `}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-medium truncate">{conversation.user.name}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {conversation.lastMessage.timestamp}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <p
                  className={`text-sm truncate ${!conversation.lastMessage.isRead && conversation.lastMessage.sender !== "currentUser" ? "font-semibold" : "text-gray-500 dark:text-gray-400"}`}
                >
                  {conversation.lastMessage.sender === "currentUser" && "You: "}
                  {conversation.lastMessage.text}
                </p>

                {conversation.unreadCount > 0 && (
                  <Badge className="ml-2 bg-blue-500 hover:bg-blue-600 text-white">{conversation.unreadCount}</Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
