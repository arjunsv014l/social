import { DashboardLayout } from "@/components/dashboard-layout"
import { JournalDashboard } from "@/components/journal/journal-dashboard"

export default function JournalPage() {
  return (
    <DashboardLayout>
      <JournalDashboard />
    </DashboardLayout>
  )
}
