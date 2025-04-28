"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HolographicCard } from "@/components/ui/holographic-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, Calendar, ExternalLink, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"

export function DynamicContent() {
  const [activeTab, setActiveTab] = useState("recommendations")

  return (
    <div className="mt-8 space-y-6">
      <motion.h2
        className="text-xl font-bold neon-text-green"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Personalized For You
      </motion.h2>

      <Tabs defaultValue="recommendations" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TabsList className="grid w-full grid-cols-3 bg-white border border-black/10 neon-border-green">
            <TabsTrigger value="recommendations" className={activeTab === "recommendations" ? "neon-text-green" : ""}>
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="trending" className={activeTab === "trending" ? "neon-text-green" : ""}>
              Trending
            </TabsTrigger>
            <TabsTrigger value="upcoming" className={activeTab === "upcoming" ? "neon-text-green" : ""}>
              Upcoming
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="recommendations" className="space-y-4 mt-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <HolographicCard variant="sketch" className="h-full">
                <div className="p-5 h-full flex flex-col">
                  <div className="flex justify-between">
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                      <Zap className="h-3 w-3 mr-1" />
                      Course
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mt-2 neon-text-green">Advanced Machine Learning</h3>
                  <p className="text-xs text-black/50">Based on your interests</p>

                  <p className="text-sm mb-4 mt-4 text-black/70">
                    This course covers deep learning, neural networks, and practical applications in AI.
                  </p>

                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center text-sm text-black/50">
                      <BookOpen className="mr-1 h-4 w-4" />
                      CS Department
                    </div>
                    <Button size="sm" className="bg-black text-white hover:bg-black/80">
                      View Details
                    </Button>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
              }}
            >
              <HolographicCard variant="sketch" className="h-full">
                <div className="p-5 h-full flex flex-col">
                  <div className="flex justify-between">
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                      <Zap className="h-3 w-3 mr-1" />
                      Internship
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mt-2 neon-text-green">Software Developer Intern</h3>
                  <p className="text-xs text-black/50">Matches your resume</p>

                  <p className="text-sm mb-4 mt-4 text-black/70">
                    Summer internship opportunity at a leading tech company with mentorship.
                  </p>

                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center text-sm text-black/50">
                      <Calendar className="mr-1 h-4 w-4" />
                      Deadline: Dec 15
                    </div>
                    <Link href="/referrals">
                      <Button size="sm" className="bg-black text-white hover:bg-black/80">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
              }}
            >
              <HolographicCard variant="sketch" className="h-full">
                <div className="p-5 h-full flex flex-col">
                  <div className="flex justify-between">
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                      <Zap className="h-3 w-3 mr-1" />
                      Scholarship
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mt-2 neon-text-green">Tech Innovation Award</h3>
                  <p className="text-xs text-black/50">You may qualify</p>

                  <p className="text-sm mb-4 mt-4 text-black/70">
                    $2,500 scholarship for students with creative tech projects and strong academics.
                  </p>

                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center text-sm text-black/50">
                      <Award className="mr-1 h-4 w-4" />
                      Merit-based
                    </div>
                    <Link href="/referrals">
                      <Button size="sm" className="bg-black text-white hover:bg-black/80">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-4 mt-4">
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <HolographicCard variant="sketch" className="w-full">
                <div className="p-5">
                  <div className="flex justify-between">
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      Trending Topic
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mt-2 neon-text-green">AI Ethics in Education</h3>

                  <p className="text-sm mb-4 mt-2 text-black/70">
                    Students are discussing the implications of AI tools like ChatGPT in academic settings.
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-white">
                          <AvatarImage
                            src={`/mystical-forest-spirit.png?height=30&width=30&query=avatar${i}`}
                            alt="User"
                          />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-sm text-black/50">42 students participating</span>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
              }}
            >
              <HolographicCard variant="sketch" className="w-full">
                <div className="p-5">
                  <div className="flex justify-between">
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      Popular Event
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mt-2 neon-text-green">Tech Career Fair</h3>

                  <p className="text-sm mb-4 mt-2 text-black/70">
                    Virtual networking event with top tech companies recruiting for internships and entry-level
                    positions.
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-black/50">
                      <Calendar className="mr-1 h-4 w-4" />
                      Nov 15, 2023
                    </div>
                    <Button size="sm" className="bg-black text-white hover:bg-black/80">
                      Register
                    </Button>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4 mt-4">
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <HolographicCard variant="sketch" className="w-full">
                <div className="p-5">
                  <h3 className="text-lg font-bold neon-text-green">Final Project Deadline</h3>
                  <p className="text-xs text-black/50">Computer Science 401</p>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1 h-4 w-4 text-green-500" />
                      <span className="font-medium">Dec 10, 2023</span>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                      5 days left
                    </Badge>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
              }}
            >
              <HolographicCard variant="sketch" className="w-full">
                <div className="p-5">
                  <h3 className="text-lg font-bold neon-text-green">Study Group Session</h3>
                  <p className="text-xs text-black/50">Calculus II</p>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1 h-4 w-4 text-green-500" />
                      <span className="font-medium">Tomorrow, 3:00 PM</span>
                    </div>
                    <div className="flex items-center text-sm text-black/50">
                      <ExternalLink className="mr-1 h-4 w-4" />
                      Library, Room 204
                    </div>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
              }}
            >
              <HolographicCard variant="sketch" className="w-full">
                <div className="p-5">
                  <h3 className="text-lg font-bold neon-text-green">Scholarship Application Deadline</h3>
                  <p className="text-xs text-black/50">Tech Innovation Award</p>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1 h-4 w-4 text-green-500" />
                      <span className="font-medium">Dec 1, 2023</span>
                    </div>
                    <Link href="/referrals">
                      <Button size="sm" className="bg-black text-white hover:bg-black/80">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
