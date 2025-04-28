import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Briefcase, Calendar, Users } from "lucide-react"

interface ReferralStatsProps {
  stats: {
    total: number
    open: number
    internships: number
    jobs: number
    scholarships: number
    events: number
  }
}

export function ReferralStats({ stats }: ReferralStatsProps) {
  return (
    <>
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
          <div className="h-4 w-4 text-blue-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{stats.open} currently open</p>
        </CardContent>
      </Card>
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">By Type</CardTitle>
          <div className="h-4 w-4 text-green-accent" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4 text-blue-accent" />
              <span className="text-sm">{stats.internships} Internships</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4 text-green-accent" />
              <span className="text-sm">{stats.jobs} Jobs</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-yellow-accent" />
              <span className="text-sm">{stats.scholarships} Scholarships</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-purple-accent" />
              <span className="text-sm">{stats.events} Events</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
          <Calendar className="h-4 w-4 text-red-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Opportunities closing this month</p>
        </CardContent>
      </Card>
    </>
  )
}
