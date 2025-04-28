"use client"

import { useState } from "react"
import { ConversationList } from "@/components/conversation-list"
import { ChatInterface } from "@/components/chat-interface"
import { Card } from "@/components/ui/card"

// Mock data for conversations
const mockConversations = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg",
      status: "online",
    },
    lastMessage: {
      text: "Hey, did you finish the assignment?",
      timestamp: "10:42 AM",
      isRead: true,
      sender: "u1",
    },
    unreadCount: 0,
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "/placeholder.svg",
      status: "offline",
    },
    lastMessage: {
      text: "Thanks for sharing those notes!",
      timestamp: "Yesterday",
      isRead: false,
      sender: "u2",
    },
    unreadCount: 1,
  },
  {
    id: "3",
    user: {
      id: "u3",
      name: "Mark Wilson",
      username: "markw",
      avatar: "/placeholder.svg",
      status: "online",
    },
    lastMessage: {
      text: "Are you coming to the study group tomorrow?",
      timestamp: "Yesterday",
      isRead: false,
      sender: "u3",
    },
    unreadCount: 2,
  },
  {
    id: "4",
    user: {
      id: "u4",
      name: "David Park",
      username: "davidp",
      avatar: "/placeholder.svg",
      status: "offline",
    },
    lastMessage: {
      text: "I'll send you my part of the project tonight",
      timestamp: "Monday",
      isRead: true,
      sender: "currentUser",
    },
    unreadCount: 0,
  },
]

export function MessageCenter() {
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [conversations, setConversations] = useState(mockConversations)

  const selectedConversation = conversations.find((conv) => conv.id === activeConversation)

  const handleSendMessage = (message: string) => {
    if (!activeConversation) return

    // Update the conversation with the new message
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === activeConversation
          ? {
              ...conv,
              lastMessage: {
                text: message,
                timestamp: "Just now",
                isRead: true,
                sender: "currentUser",
              },
            }
          : conv,
      ),
    )
  }

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversation(conversationId)

    // Mark conversation as read when selected
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              unreadCount: 0,
              lastMessage: {
                ...conv.lastMessage,
                isRead: true,
              },
            }
          : conv,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Messages</h1>

      <Card className="border-gray-300 dark:border-gray-800 overflow-hidden">
        <div className="grid md:grid-cols-[300px_1fr] h-[calc(100vh-200px)] min-h-[500px]">
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversation}
            onSelectConversation={handleSelectConversation}
          />

          {activeConversation ? (
            <ChatInterface conversation={selectedConversation!} onSendMessage={handleSendMessage} />
          ) : (
            <div className="flex items-center justify-center h-full border-l border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <div className="text-center p-6">
                <h3 className="font-medium text-lg mb-2">Select a conversation</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
