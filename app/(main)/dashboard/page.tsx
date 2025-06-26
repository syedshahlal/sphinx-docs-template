import { StatsCard } from "@/components/dashboard/StatsCard"
import { AreaChartComponent } from "@/components/dashboard/AreaChart"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"
import { BarChart, Users, Activity, DollarSign } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Revenue" value="$45,231.89" change="+20.1% from last month" icon={DollarSign} />
        <StatsCard title="Active Users" value="+2350" change="+180.1% from last month" icon={Users} />
        <StatsCard title="Page Views" value="+12,234" change="+19% from last month" icon={BarChart} />
        <StatsCard title="API Calls" value="2.6M" change="+2% from last month" icon={Activity} />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <AreaChartComponent />
        </div>
        <div className="col-span-3">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
