"use client"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Globe, Calendar } from "lucide-react"

interface ResumeData {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    website: string
  }
  summary: string
  education: Array<{
    id: string
    institution: string
    degree: string
    date: string
    description: string
  }>
  experience: Array<{
    id: string
    company: string
    position: string
    date: string
    description: string
  }>
  skills: Array<{
    id: string
    category: string
    items: string
  }>
  projects: Array<{
    id: string
    title: string
    date: string
    description: string
    link?: string
  }>
}

interface ResumePreviewProps {
  resumeData: ResumeData
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  return (
    <div className="bg-white text-black p-8 max-w-4xl mx-auto shadow-sm print:shadow-none">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">{resumeData.personalInfo.name}</h1>
          <p className="text-lg text-gray-600">{resumeData.personalInfo.title}</p>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-600 pt-2">
            {resumeData.personalInfo.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
            {resumeData.personalInfo.website && (
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                <span>{resumeData.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-gray-300" />

        {/* Summary */}
        {resumeData.summary && (
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Professional Summary</h2>
            <p className="text-gray-700 whitespace-pre-line">{resumeData.summary}</p>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Education</h2>
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{edu.institution}</h3>
                    <p className="text-gray-700">{edu.degree}</p>
                  </div>
                  {edu.date && (
                    <div className="text-gray-600 text-sm flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {edu.date}
                    </div>
                  )}
                </div>
                {edu.description && <p className="text-gray-700 text-sm whitespace-pre-line">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Experience</h2>
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  {exp.date && (
                    <div className="text-gray-600 text-sm flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {exp.date}
                    </div>
                  )}
                </div>
                {exp.description && <p className="text-gray-700 text-sm whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.skills.map((skill) => (
                <div key={skill.id} className="space-y-1">
                  <h3 className="font-semibold">{skill.category}</h3>
                  <p className="text-gray-700 text-sm">{skill.items}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Projects</h2>
            {resumeData.projects.map((project) => (
              <div key={project.id} className="space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    {project.link && <p className="text-blue-600 text-sm">{project.link}</p>}
                  </div>
                  {project.date && (
                    <div className="text-gray-600 text-sm flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {project.date}
                    </div>
                  )}
                </div>
                {project.description && (
                  <p className="text-gray-700 text-sm whitespace-pre-line">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
