"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle, Share } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReferralShare() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    type: "internship",
    company: "",
    position: "",
    location: "",
    deadline: "",
    description: "",
    requirements: "",
    perks: "",
    link: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the referral
    console.log("Submitting referral:", formData)
    alert("Thank you for sharing this opportunity!")
    setOpen(false)
    setFormData({
      type: "internship",
      company: "",
      position: "",
      location: "",
      deadline: "",
      description: "",
      requirements: "",
      perks: "",
      link: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-accent hover:bg-yellow-accent/90 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Share Opportunity
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Share an Opportunity</DialogTitle>
            <DialogDescription>
              Help your fellow students by sharing internships, jobs, scholarships, or events.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="job">Job</SelectItem>
                    <SelectItem value="scholarship">Scholarship</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleChange("deadline", e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900"
                  placeholder="City, State or Remote"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position/Title</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleChange("position", e.target.value)}
                className="bg-gray-50 dark:bg-gray-900"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="min-h-[80px] bg-gray-50 dark:bg-gray-900"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => handleChange("requirements", e.target.value)}
                className="min-h-[60px] bg-gray-50 dark:bg-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="perks">Perks/Benefits</Label>
              <Textarea
                id="perks"
                value={formData.perks}
                onChange={(e) => handleChange("perks", e.target.value)}
                className="min-h-[60px] bg-gray-50 dark:bg-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Application Link</Label>
              <Input
                id="link"
                type="url"
                value={formData.link}
                onChange={(e) => handleChange("link", e.target.value)}
                className="bg-gray-50 dark:bg-gray-900"
                placeholder="https://..."
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-yellow-accent hover:bg-yellow-accent/90 text-white">
              <Share className="mr-2 h-4 w-4" />
              Share Opportunity
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
