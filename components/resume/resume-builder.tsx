"use client"

import { useState } from "react"
import { ResumeEditor } from "@/components/resume/resume-editor"
import { ResumePreview } from "@/components/resume/resume-preview"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileDown, Printer } from "lucide-react"
import { Card } from "@/components/ui/card"

// Default resume data
const defaultResumeData = {
  personalInfo: {
    name: "Jane Smith",
    title: "Computer Science Student",
    email: "jane.smith@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    website: "janesmith.dev",
  },
  summary:
    "Computer Science student at State University with a passion for web development and artificial intelligence. Seeking internship opportunities to apply and expand my skills in a real-world setting.",
  education: [
    {
      id: "edu1",
      institution: "State University",
      degree: "Bachelor of Science in Computer Science",
      date: "2021 - Present",
      description:
        "GPA: 3.8/4.0\nRelevant coursework: Data Structures, Algorithms, Database Systems, Machine Learning, Web Development",
    },
  ],
  experience: [
    {
      id: "exp1",
      company: "Tech Solutions Inc.",
      position: "Web Development Intern",
      date: "Summer 2022",
      description:
        "Developed and maintained company website using React and Node.js\nCollaborated with a team of 5 developers using Git and Agile methodologies\nImplemented responsive design principles to ensure mobile compatibility",
    },
  ],
  skills: [
    {
      id: "skill1",
      category: "Programming Languages",
      items: "JavaScript, Python, Java, C++, HTML/CSS",
    },
    {
      id: "skill2",
      category: "Frameworks & Libraries",
      items: "React, Node.js, Express, TensorFlow",
    },
    {
      id: "skill3",
      category: "Tools & Platforms",
      items: "Git, GitHub, VS Code, AWS, Docker",
    },
  ],
  projects: [
    {
      id: "proj1",
      title: "Student Social Platform",
      date: "2023",
      description:
        "Developed a social networking platform for students to connect, share resources, and collaborate on projects",
      link: "github.com/janesmith/student-social",
    },
  ],
}

export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(defaultResumeData)
  const [activeTab, setActiveTab] = useState("edit")

  const handleUpdateResumeData = (newData: typeof defaultResumeData) => {
    setResumeData(newData)
  }

  const handleExportPDF = () => {
    // In a real app, this would generate a PDF
    console.log("Exporting PDF...")
    alert("Your resume has been exported as PDF")
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Resume Builder</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button onClick={handleExportPDF} className="bg-green-accent hover:bg-green-accent/90 text-white gap-2">
            <FileDown className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <Card className="border-gray-200 dark:border-gray-800 p-0 overflow-hidden">
        <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="p-4">
            <ResumeEditor resumeData={resumeData} onUpdate={handleUpdateResumeData} />
          </TabsContent>
          <TabsContent value="preview" className="p-0 border-t border-gray-200 dark:border-gray-800">
            <ResumePreview resumeData={resumeData} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
