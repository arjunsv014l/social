"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Lock, Globe } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface JournalEntry {
  id: string
  title: string
  content: string
  date: string
  mood: string
  category: string
  isPrivate: boolean
}

interface JournalEntryListProps {
  entries: JournalEntry[]
  onEdit: (entry: JournalEntry) => void
  onDelete: (id: string) => void
}

export function JournalEntryList({ entries, onEdit, onDelete }: JournalEntryListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "excited":
        return "😃"
      case "productive":
        return "💪"
      case "inspired":
        return "💡"
      case "stressed":
        return "😓"
      case "relaxed":
        return "😌"
      default:
        return "📝"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-accent/20 text-blue-accent border-blue-accent/30"
      case "projects":
        return "bg-green-accent/20 text-green-accent border-green-accent/30"
      case "personal":
        return "bg-purple-accent/20 text-purple-accent border-purple-accent/30"
      default:
        return "bg-gray-200 dark:bg-gray-800"
    }
  }

  if (entries.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-400">No journal entries yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id} className="border-gray-200 dark:border-gray-800 hover-lift overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">
                  {getMoodEmoji(entry.mood)}
                </span>
                <CardTitle>{entry.title}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                {entry.isPrivate ? (
                  <Lock className="h-4 w-4 text-yellow-accent" />
                ) : (
                  <Globe className="h-4 w-4 text-green-accent" />
                )}
                <Badge variant="outline" className={getCategoryColor(entry.category)}>
                  {entry.category}
                </Badge>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(entry.date)}</p>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line line-clamp-3">{entry.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
            <Button variant="ghost" size="sm" onClick={() => onEdit(entry)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-red-accent hover:text-red-accent/90">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this journal entry. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(entry.id)}
                    className="bg-red-accent hover:bg-red-accent/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
