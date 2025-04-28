"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink, MapPin, Share2, Briefcase, Award, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface Referral {
  id: string
  type: "internship" | "job" | "scholarship" | "event"
  company: string
  position: string
  location: string
  deadline: string
  description: string
  requirements: string
  perks: string
  link: string
  referredBy: string
  status: "open" | "closed"
}

interface ReferralListProps {
  referrals: Referral[]
}

export function ReferralList({ referrals }: ReferralListProps) {
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const getTypeIcon = (type: Referral["type"]) => {
    switch (type) {
      case "internship":
        return <Briefcase className="h-5 w-5 text-blue-accent" />
      case "job":
        return <Briefcase className="h-5 w-5 text-green-accent" />
      case "scholarship":
        return <Award className="h-5 w-5 text-yellow-accent" />
      case "event":
        return <Users className="h-5 w-5 text-purple-accent" />
    }
  }

  const getTypeColor = (type: Referral["type"]) => {
    switch (type) {
      case "internship":
        return "bg-blue-accent/20 text-blue-accent border-blue-accent/30"
      case "job":
        return "bg-green-accent/20 text-green-accent border-green-accent/30"
      case "scholarship":
        return "bg-yellow-accent/20 text-yellow-accent border-yellow-accent/30"
      case "event":
        return "bg-purple-accent/20 text-purple-accent border-purple-accent/30"
    }
  }

  const getStatusColor = (status: Referral["status"]) => {
    switch (status) {
      case "open":
        return "bg-green-accent/20 text-green-accent border-green-accent/30"
      case "closed":
        return "bg-red-accent/20 text-red-accent border-red-accent/30"
    }
  }

  const handleShare = (referral: Referral) => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(referral.link)
    alert("Link copied to clipboard!")
  }

  if (referrals.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-400">No referrals found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {referrals.map((referral) => (
          <Card key={referral.id} className="border-gray-200 dark:border-gray-800 hover-lift overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className={getTypeColor(referral.type)}>
                  <span className="flex items-center gap-1">
                    {getTypeIcon(referral.type)}
                    {referral.type.charAt(0).toUpperCase() + referral.type.slice(1)}
                  </span>
                </Badge>
                <Badge variant="outline" className={getStatusColor(referral.status)}>
                  {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                </Badge>
              </div>
              <CardTitle className="text-lg">{referral.position}</CardTitle>
              <CardDescription>{referral.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="mr-1 h-4 w-4" />
                  {referral.location}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="mr-1 h-4 w-4" />
                  Deadline: {formatDate(referral.deadline)}
                </div>
                <p className="text-sm line-clamp-2">{referral.description}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedReferral(referral)}>
                    View Details
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button variant="ghost" size="sm" onClick={() => handleShare(referral)}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedReferral && (
        <Dialog open={!!selectedReferral} onOpenChange={(open) => !open && setSelectedReferral(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getTypeColor(selectedReferral.type)}>
                  <span className="flex items-center gap-1">
                    {getTypeIcon(selectedReferral.type)}
                    {selectedReferral.type.charAt(0).toUpperCase() + selectedReferral.type.slice(1)}
                  </span>
                </Badge>
                <Badge variant="outline" className={getStatusColor(selectedReferral.status)}>
                  {selectedReferral.status.charAt(0).toUpperCase() + selectedReferral.status.slice(1)}
                </Badge>
              </div>
              <DialogTitle className="text-xl mt-2">{selectedReferral.position}</DialogTitle>
              <DialogDescription className="text-base font-medium">{selectedReferral.company}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <MapPin className="mr-1 h-4 w-4" />
                  {selectedReferral.location}
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Calendar className="mr-1 h-4 w-4" />
                  Deadline: {formatDate(selectedReferral.deadline)}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-semibold">Description</h4>
                <p className="text-sm">{selectedReferral.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Requirements</h4>
                <p className="text-sm">{selectedReferral.requirements}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Perks</h4>
                <p className="text-sm">{selectedReferral.perks}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Referred By</h4>
                <p className="text-sm">{selectedReferral.referredBy}</p>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => handleShare(selectedReferral)}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button
                className="bg-blue-accent hover:bg-blue-accent/90 text-white"
                onClick={() => window.open(selectedReferral.link, "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Apply Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
