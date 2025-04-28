"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Trash2 } from "lucide-react"

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

interface ResumeEditorProps {
  resumeData: ResumeData
  onUpdate: (data: ResumeData) => void
}

export function ResumeEditor({ resumeData, onUpdate }: ResumeEditorProps) {
  const updatePersonalInfo = (field: keyof ResumeData["personalInfo"], value: string) => {
    onUpdate({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    })
  }

  const updateSummary = (value: string) => {
    onUpdate({
      ...resumeData,
      summary: value,
    })
  }

  const addEducation = () => {
    onUpdate({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: `edu${Date.now()}`,
          institution: "",
          degree: "",
          date: "",
          description: "",
        },
      ],
    })
  }

  const updateEducation = (id: string, field: keyof ResumeData["education"][0], value: string) => {
    onUpdate({
      ...resumeData,
      education: resumeData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    onUpdate({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    })
  }

  const addExperience = () => {
    onUpdate({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: `exp${Date.now()}`,
          company: "",
          position: "",
          date: "",
          description: "",
        },
      ],
    })
  }

  const updateExperience = (id: string, field: keyof ResumeData["experience"][0], value: string) => {
    onUpdate({
      ...resumeData,
      experience: resumeData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    onUpdate({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    })
  }

  const addSkill = () => {
    onUpdate({
      ...resumeData,
      skills: [
        ...resumeData.skills,
        {
          id: `skill${Date.now()}`,
          category: "",
          items: "",
        },
      ],
    })
  }

  const updateSkill = (id: string, field: keyof ResumeData["skills"][0], value: string) => {
    onUpdate({
      ...resumeData,
      skills: resumeData.skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)),
    })
  }

  const removeSkill = (id: string) => {
    onUpdate({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill.id !== id),
    })
  }

  const addProject = () => {
    onUpdate({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          id: `proj${Date.now()}`,
          title: "",
          date: "",
          description: "",
          link: "",
        },
      ],
    })
  }

  const updateProject = (id: string, field: keyof ResumeData["projects"][0], value: string) => {
    onUpdate({
      ...resumeData,
      projects: resumeData.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    })
  }

  const removeProject = (id: string) => {
    onUpdate({
      ...resumeData,
      projects: resumeData.projects.filter((proj) => proj.id !== id),
    })
  }

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible defaultValue="personal-info">
        <AccordionItem value="personal-info">
          <AccordionTrigger className="text-lg font-semibold">Personal Information</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => updatePersonalInfo("name", e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  value={resumeData.personalInfo.title}
                  onChange={(e) => updatePersonalInfo("title", e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo("location", e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website/Portfolio</Label>
                <Input
                  id="website"
                  value={resumeData.personalInfo.website}
                  onChange={(e) => updatePersonalInfo("website", e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="summary">
          <AccordionTrigger className="text-lg font-semibold">Professional Summary</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={resumeData.summary}
                onChange={(e) => updateSummary(e.target.value)}
                className="min-h-[100px] bg-gray-50 dark:bg-gray-900"
                placeholder="Write a brief summary of your professional background and goals..."
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger className="text-lg font-semibold">Education</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="p-4 border rounded-md border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Education #{index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-accent hover:text-red-accent/90 h-8 px-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`edu-institution-${edu.id}`}>Institution</Label>
                      <Input
                        id={`edu-institution-${edu.id}`}
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                        className="bg-gray-50 dark:bg-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edu-degree-${edu.id}`}>Degree</Label>
                      <Input
                        id={`edu-degree-${edu.id}`}
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        className="bg-gray-50 dark:bg-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edu-date-${edu.id}`}>Date</Label>
                      <Input
                        id={`edu-date-${edu.id}`}
                        value={edu.date}
                        onChange={(e) => updateEducation(edu.id, "date", e.target.value)}
                        className="bg-gray-50 dark:bg-gray-900"
                        placeholder="e.g., 2020 - 2024"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`edu-description-${edu.id}`}>Description</Label>
                      <Textarea
                        id={`edu-description-${edu.id}`}
                        value={edu.description}
                        onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                        className="min-h-[80px] bg-gray-50 dark:bg-gray-900"
                        placeholder="GPA, relevant coursework, achievements, etc."
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addEducation} className="w-full mt-2">
                <Plus className="mr-2 h-4 w-4" />
                Add Education
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger className="text-lg font-semibold">Work Experience</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 border rounded-md border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Experience #{index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-accent hover:text-red-accent/90 h-8 px-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`exp-company-${exp.id}`}>Company</Label>
                      <Input
                        id={`exp-company-${exp.id}`}
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        className="bg-gray-50 dark:bg-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`exp-position-${exp.id}`}>Position</Label>
                      <Input
                        id={`exp-position-${exp.id}`}
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                        className="bg-gray-50 dark:bg-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`exp-date-${exp.id}`}>Date</Label>
                      <Input
                        id={`exp-date-${exp.id}`}
                        value={exp.date}
                        onChange={(e) => updateExperience(exp.id, "date", e.target.value)}
                        className="bg-gray-50 dark:bg-gray-900"
                        placeholder="e.g., Jan 2022 - Present"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`exp-description-${exp.id}`}>Description</Label>
                      <Textarea
                        id={`exp-description-${exp.id}`}
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                        className="min-h-[80px] bg-gray-50 dark:bg-gray-900"
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addExperience} className="w-full mt-2">
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills">
          <AccordionTrigger className="text-lg font-semibold">Skills</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {resumeData.skills.map((skill, index) => (
                <div key={skill.id} className="p-4 border rounded-md border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Skill Category #{index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill.id)}
                      className="text-red-accent hover:text-red-accent/90 h-8 px-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`skill-category-${skill.id}`}>Category</Label>
                      <Input
                        id={`skill-category-${skill.id}`}
                        value={skill.category}
                        onChange={(e) => updateSkill(skill.id, "category", e.target.value)}
                        className="bg-gray-50 dark:bg-gray-900"
                        placeholder="e.g., Programming Languages"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`skill-items-${skill.id}`}>Skills</Label>
                      <Textarea
                        id={`skill-items-${skill.id}`}
                        value={skill.items}
                        onChange={(e) => updateSkill(skill.id, "items", e.target.value)}
                        className="min-h-[60px] bg-gray-50 dark:bg-gray-900"
                        placeholder="e.g., JavaScript, Python, Java"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addSkill} className="w-full mt-2">
                <Plus className="mr-2 h-4 w-4" />
                Add Skill Category
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="projects">
          <AccordionTrigger className="text-lg font-semibold">Projects</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {resumeData.projects.map((project, index) => (
                <div key={project.id} className="p-4 border rounded-md border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Project #{index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(project.id)}
                      className="text-red-accent hover:text-red-accent/90 h-8 px-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`project-title-${project.id}`}>Title</Label>
                      <Input
                        id={`project-title-${project.id}`}
                        value={project.title}
                        onChange={(e) => updateProject(project.id, "title", e.target.value)}
                        className="bg-gray-50 dark:bg-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`project-date-${project.id}`}>Date</Label>
                      <Input
                        id={`project-date-${project.id}`}
                        value={project.date}
                        onChange={(e) => updateProject(project.id, "date", e.target.value)}
                        className="bg-gray-50 dark:bg-gray-900"
                        placeholder="e.g., 2023"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`project-description-${project.id}`}>Description</Label>
                      <Textarea
                        id={`project-description-${project.id}`}
                        value={project.description}
                        onChange={(e) => updateProject(project.id, "description", e.target.value)}
                        className="min-h-[80px] bg-gray-50 dark:bg-gray-900"
                        placeholder="Describe the project, technologies used, and your role..."
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`project-link-${project.id}`}>Link (Optional)</Label>
                      <Input
                        id={`project-link-${project.id}`}
                        value={project.link || ""}
                        onChange={(e) => updateProject(project.id, "link", e.target.value)}
                        className="bg-gray-50 dark:bg-gray-900"
                        placeholder="e.g., github.com/username/project"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addProject} className="w-full mt-2">
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
