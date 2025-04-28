"use client"

import { useState } from "react"
import { ReferralList } from "@/components/referrals/referral-list"
import { ReferralStats } from "@/components/referrals/referral-stats"
import { ReferralShare } from "@/components/referrals/referral-share"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

// Mock referral data
const mockReferrals = [
  {
    id: "1",
    type: "internship",
    company: "Tech Innovations Inc.",
    position: "Software Engineering Intern",
    location: "San Francisco, CA",
    deadline: "2023-12-15",
    description:
      "Looking for a talented software engineering intern to join our team for the summer. Work on real projects with experienced developers.",
    requirements:
      "Currently pursuing a degree in Computer Science or related field. Knowledge of JavaScript, React, and Node.js preferred.",
    perks: "Competitive pay, flexible hours, mentorship program, potential for full-time offer.",
    link: "https://techinnovations.com/careers/intern",
    referredBy: "Prof. Johnson",
    status: "open",
  },
  {
    id: "2",
    type: "job",
    company: "DataViz Solutions",
    position: "Junior Data Analyst",
    location: "Remote",
    deadline: "2023-11-30",
    description: "Entry-level position for recent graduates interested in data analysis and visualization.",
    requirements:
      "Bachelor's degree in Statistics, Mathematics, Computer Science, or related field. Experience with SQL and Python.",
    perks: "Remote work, health benefits, professional development budget.",
    link: "https://dataviz.com/jobs",
    referredBy: "Career Center",
    status: "open",
  },
  {
    id: "3",
    type: "scholarship",
    company: "Future Tech Foundation",
    position: "Merit Scholarship",
    location: "N/A",
    deadline: "2023-12-01",
    description: "$5,000 scholarship for students pursuing degrees in STEM fields.",
    requirements: "Minimum GPA of 3.5, essay submission, two letters of recommendation.",
    perks: "Non-renewable scholarship, recognition at annual gala.",
    link: "https://futuretechfoundation.org/scholarships",
    referredBy: "Financial Aid Office",
    status: "open",
  },
  {
    id: "4",
    type: "event",
    company: "Tech Career Fair",
    position: "Virtual Networking Event",
    location: "Online",
    deadline: "2023-11-15",
    description: "Connect with recruiters from top tech companies in a virtual setting.",
    requirements: "Registration required. Open to all students and recent graduates.",
    perks: "Resume review, mock interviews, direct connections with hiring managers.",
    link: "https://techcareerfair.com/register",
    referredBy: "Student Services",
    status: "closed",
  },
]

export function ReferralDashboard() {
  const [referrals, setReferrals] = useState(mockReferrals)
  const [activeTab, setActiveTab] = useState("all")

  const filteredReferrals = referrals.filter((referral) => {
    if (activeTab === "all") return true
    if (activeTab === "open") return referral.status === "open"
    return referral.type === activeTab
  })

  const referralStats = {
    total: referrals.length,
    open: referrals.filter((r) => r.status === "open").length,
    internships: referrals.filter((r) => r.type === "internship").length,
    jobs: referrals.filter((r) => r.type === "job").length,
    scholarships: referrals.filter((r) => r.type === "scholarship").length,
    events: referrals.filter((r) => r.type === "event").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Opportunities & Referrals</h1>
        <ReferralShare />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReferralStats stats={referralStats} />
      </div>

      <Card className="border-gray-200 dark:border-gray-800">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="internship">Internships</TabsTrigger>
            <TabsTrigger value="job">Jobs</TabsTrigger>
            <TabsTrigger value="scholarship">Scholarships</TabsTrigger>
            <TabsTrigger value="event">Events</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="p-4">
            <ReferralList referrals={filteredReferrals} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
