"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Bold,
  Italic,
  ImageIcon,
  PaperclipIcon,
  SendIcon,
  SmileIcon,
  LinkIcon,
  Code,
  List,
  ListOrdered,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: "m1",
    text: "Hey, did you finish the assignment?",
    timestamp: "10:42 AM",
    sender: "other",
    isRead: true,
    richText: false,
  },
  {
    id: "m2",
    text: "Not yet, I'm still working on the last problem",
    timestamp: "10:45 AM",
    sender: "self",
    isRead: true,
    richText: false,
  },
  {
    id: "m3",
    text: "It's pretty challenging. Do you want to meet up at the library later to work on it together?",
    timestamp: "10:47 AM",
    sender: "other",
    isRead: true,
    richText: false,
  },
  {
    id: "m4",
    text: "That sounds good! How about 3pm?",
    timestamp: "10:50 AM",
    sender: "self",
    isRead: true,
    richText: false,
  },
  {
    id: "m5",
    text: "Perfect, see you then! 👍",
    timestamp: "10:51 AM",
    sender: "other",
    isRead: true,
    richText: false,
  },
  {
    id: "m6",
    text: "<b>Important reminder:</b> Don't forget to bring your <i>textbook</i> and notes!",
    timestamp: "11:15 AM",
    sender: "other",
    isRead: true,
    richText: true,
  },
]

// Emoji categories
const emojiCategories = {
  smileys: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘"],
  gestures: ["👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "👇", "👋", "🤚", "🖐️", "✋", "🖖"],
  symbols: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟"],
  objects: ["📚", "📝", "📒", "📓", "📔", "📕", "📖", "📗", "📘", "📙", "📌", "📍", "📎", "🖇️", "📏", "📐", "✂️"],
}

interface ChatInterfaceProps {
  conversation: {
    id: string
    user: {
      id: string
      name: string
      username: string
      avatar: string
      status: "online" | "offline"
    }
  }
  onSendMessage: (message: string) => void
}

export function ChatInterface({ conversation, onSendMessage }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [richTextMode, setRichTextMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate typing indicator
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "self") {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setIsTyping(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) return

    // Add message to the chat
    const newMessage = {
      id: `m${Date.now()}`,
      text: message,
      timestamp: "Just now",
      sender: "self",
      isRead: false,
      richText: richTextMode,
    }

    setMessages([...messages, newMessage])
    onSendMessage(message)
    setMessage("")
  }

  const insertEmoji = (emoji: string) => {
    setMessage(message + emoji)
    inputRef.current?.focus()
  }

  const insertRichTextTag = (tag: string) => {
    setMessage(message + `<${tag}></${tag}>`)
    inputRef.current?.focus()
    // Position cursor between tags
    if (inputRef.current) {
      const position = message.length + tag.length + 2
      setTimeout(() => {
        inputRef.current?.setSelectionRange(position, position)
      }, 0)
    }
  }

  const renderMessageText = (text: string, isRichText: boolean) => {
    if (!isRichText) return text

    // Simple HTML rendering for rich text
    // In a real app, you'd use a proper sanitizer
    return <div dangerouslySetInnerHTML={{ __html: text }} />
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
            <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-medium">{conversation.user.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {conversation.user.status === "online" ? (
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-accent mr-1"></span> Online
                </span>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "self" ? "justify-end" : "justify-start"}`}>
            <div
              className={`
                max-w-[80%] rounded-lg p-3 
                ${
                  msg.sender === "self"
                    ? "bg-blue-accent text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-800 rounded-bl-none"
                }
              `}
            >
              <div className="space-y-1">
                {renderMessageText(msg.text, msg.richText)}
                <p
                  className={`text-xs mt-1 flex items-center gap-1 ${msg.sender === "self" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}
                >
                  {msg.timestamp}
                  {msg.sender === "self" && (
                    <span className="ml-1">
                      {msg.isRead ? <span className="text-xs">✓✓</span> : <span className="text-xs">✓</span>}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-gray-200 dark:bg-gray-800 rounded-bl-none">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="space-y-2">
          {richTextMode && (
            <div className="flex items-center gap-1 pb-2 border-b border-gray-200 dark:border-gray-800">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 dark:text-gray-400"
                onClick={() => insertRichTextTag("b")}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 dark:text-gray-400"
                onClick={() => insertRichTextTag("i")}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 dark:text-gray-400"
                onClick={() => insertRichTextTag('a href=""')}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 dark:text-gray-400"
                onClick={() => insertRichTextTag("code")}
              >
                <Code className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 dark:text-gray-400"
                onClick={() => insertRichTextTag("ul")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 dark:text-gray-400"
                onClick={() => insertRichTextTag("ol")}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="ml-auto text-xs h-7"
                onClick={() => setRichTextMode(false)}
              >
                Plain Text
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
              <PaperclipIcon className="h-5 w-5" />
            </Button>

            <Button type="button" variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
              <ImageIcon className="h-5 w-5" />
            </Button>

            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
                  <SmileIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <Tabs defaultValue="smileys">
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="smileys">😀</TabsTrigger>
                    <TabsTrigger value="gestures">👍</TabsTrigger>
                    <TabsTrigger value="symbols">❤️</TabsTrigger>
                    <TabsTrigger value="objects">📚</TabsTrigger>
                  </TabsList>
                  {Object.entries(emojiCategories).map(([category, emojis]) => (
                    <TabsContent key={category} value={category} className="p-2">
                      <div className="grid grid-cols-8 gap-1">
                        {emojis.map((emoji) => (
                          <Button
                            key={emoji}
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => insertEmoji(emoji)}
                          >
                            {emoji}
                          </Button>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </PopoverContent>
            </Popover>

            {!richTextMode && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-gray-500 dark:text-gray-400"
                onClick={() => setRichTextMode(true)}
                title="Enable rich text formatting"
              >
                <Bold className="h-5 w-5" />
              </Button>
            )}

            <Button
              type="submit"
              size="icon"
              className="bg-blue-accent hover:bg-blue-accent/90 text-white"
              disabled={!message.trim()}
            >
              <SendIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
