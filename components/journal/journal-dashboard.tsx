"use client"

import { useState } from "react"
import { JournalEntryList } from "@/components/journal/journal-entry-list"
import { JournalEditor } from "@/components/journal/journal-editor"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock journal entries
const mockEntries = [
  {
    id: "1",
    title: "First Week Reflections",
    content:
      "Today marks the end of my first week in the new semester. The classes seem challenging but interesting...",
    date: "2023-09-05T14:30:00",
    mood: "excited",
    category: "academic",
    isPrivate: true,
  },
  {
    id: "2",
    title: "Study Group Formation",
    content: "Met with classmates to form a study group for Calculus. We decided to meet twice a week...",
    date: "2023-09-10T18:45:00",
    mood: "productive",
    category: "academic",
    isPrivate: false,
  },
  {
    id: "3",
    title: "Project Ideas",
    content: "Brainstorming session for the final project. I'm thinking of building a machine learning model that...",
    date: "2023-09-15T20:15:00",
    mood: "inspired",
    category: "projects",
    isPrivate: true,
  },
]

export function JournalDashboard() {
  const [entries, setEntries] = useState(mockEntries)
  const [isCreating, setIsCreating] = useState(false)
  const [editingEntry, setEditingEntry] = useState<(typeof mockEntries)[0] | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const handleSaveEntry = (entry: (typeof mockEntries)[0]) => {
    if (editingEntry) {
      // Update existing entry
      setEntries(entries.map((e) => (e.id === entry.id ? entry : e)))
    } else {
      // Add new entry
      setEntries([{ ...entry, id: `${Date.now()}` }, ...entries])
    }
    setIsCreating(false)
    setEditingEntry(null)
  }

  const handleEditEntry = (entry: (typeof mockEntries)[0]) => {
    setEditingEntry(entry)
    setIsCreating(true)
  }

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }

  const filteredEntries = entries.filter((entry) => {
    if (activeTab === "all") return true
    return entry.category === activeTab
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Journal</h1>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)} className="bg-purple-accent hover:bg-purple-accent/90 text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        )}
      </div>

      {isCreating ? (
        <Card className="p-4 border-purple-accent/20">
          <JournalEditor
            entry={editingEntry}
            onSave={handleSaveEntry}
            onCancel={() => {
              setIsCreating(false)
              setEditingEntry(null)
            }}
          />
        </Card>
      ) : (
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All Entries</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <JournalEntryList entries={filteredEntries} onEdit={handleEditEntry} onDelete={handleDeleteEntry} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
