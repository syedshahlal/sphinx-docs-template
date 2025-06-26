import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    action: "created a new document",
    document: "API Authentication",
    avatar: "/placeholder.svg?width=40&height=40",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    action: "updated a page",
    document: "Getting Started",
    avatar: "/placeholder.svg?width=40&height=40",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    action: "commented on",
    document: "Installation Guide",
    avatar: "/placeholder.svg?width=40&height=40",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    action: "merged a pull request for",
    document: "v2.0 Release Notes",
    avatar: "/placeholder.svg?width=40&height=40",
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>An overview of the latest updates to your documentation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.name} />
              <AvatarFallback>
                {activity.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p>
                <span className="font-medium">{activity.name}</span> {activity.action}{" "}
                <span className="font-medium text-blue-600 dark:text-blue-400">{activity.document}</span>
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
