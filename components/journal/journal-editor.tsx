"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, Save } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface JournalEntry {
  id: string
  title: string
  content: string
  date: string
  mood: string
  category: string
  isPrivate: boolean
}

interface JournalEditorProps {
  entry?: JournalEntry | null
  onSave: (entry: JournalEntry) => void
  onCancel: () => void
}

export function JournalEditor({ entry, onSave, onCancel }: JournalEditorProps) {
  const [title, setTitle] = useState(entry?.title || "")
  const [content, setContent] = useState(entry?.content || "")
  const [date, setDate] = useState<Date>(entry?.date ? new Date(entry.date) : new Date())
  const [mood, setMood] = useState(entry?.mood || "productive")
  const [category, setCategory] = useState(entry?.category || "academic")
  const [isPrivate, setIsPrivate] = useState(entry?.isPrivate ?? true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) return

    onSave({
      id: entry?.id || "",
      title,
      content,
      date: date.toISOString(),
      mood,
      category,
      isPrivate,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entry title"
          required
          className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts..."
          required
          className="min-h-[200px] bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category" className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="projects">Projects</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Mood</Label>
        <RadioGroup value={mood} onValueChange={setMood} className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="excited" id="excited" />
            <Label htmlFor="excited" className="flex items-center">
              <span className="mr-1">😃</span> Excited
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="productive" id="productive" />
            <Label htmlFor="productive" className="flex items-center">
              <span className="mr-1">💪</span> Productive
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="inspired" id="inspired" />
            <Label htmlFor="inspired" className="flex items-center">
              <span className="mr-1">💡</span> Inspired
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="stressed" id="stressed" />
            <Label htmlFor="stressed" className="flex items-center">
              <span className="mr-1">😓</span> Stressed
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="relaxed" id="relaxed" />
            <Label htmlFor="relaxed" className="flex items-center">
              <span className="mr-1">😌</span> Relaxed
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="private" checked={isPrivate} onCheckedChange={setIsPrivate} />
        <Label htmlFor="private">Make this entry private</Label>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-purple-accent hover:bg-purple-accent/90 text-white">
          <Save className="mr-2 h-4 w-4" />
          Save Entry
        </Button>
      </div>
    </form>
  )
}
