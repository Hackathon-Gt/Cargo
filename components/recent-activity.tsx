"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardList } from "lucide-react"

export default function RecentActivity() {
  // This would be fetched from the API in a real implementation
  const activities = [
    {
      timestamp: "2025-05-20T10:15:30Z",
      userId: "user001",
      actionType: "placement",
      itemId: "001",
      itemName: "Food Packet",
      details: {
        fromContainer: null,
        toContainer: "contA",
        reason: null,
      },
    },
    {
      timestamp: "2025-05-20T11:30:45Z",
      userId: "user002",
      actionType: "retrieval",
      itemId: "002",
      itemName: "Oxygen Cylinder",
      details: {
        fromContainer: "contB",
        toContainer: null,
        reason: null,
      },
    },
    {
      timestamp: "2025-05-20T14:20:15Z",
      userId: "user001",
      actionType: "placement",
      itemId: "002",
      itemName: "Oxygen Cylinder",
      details: {
        fromContainer: null,
        toContainer: "contB",
        reason: null,
      },
    },
    {
      timestamp: "2025-05-20T16:45:10Z",
      userId: "user003",
      actionType: "disposal",
      itemId: "003",
      itemName: "First Aid Kit",
      details: {
        fromContainer: "contA",
        toContainer: "contB",
        reason: "Out of Uses",
      },
    },
  ]

  return (
    <Card className="glass-effect card-hover border-border/40">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <ClipboardList className="mr-2 h-5 w-5 text-space-blue" />
          Recent Activity
        </CardTitle>
        <CardDescription>Latest cargo operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                <span className="text-xs font-medium">{activity.userId.slice(-2)}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">
                    {activity.actionType === "placement" && "Placed"}
                    {activity.actionType === "retrieval" && "Retrieved"}
                    {activity.actionType === "disposal" && "Disposed"} {activity.itemName}
                  </p>
                  <Badge
                    variant={
                      activity.actionType === "placement"
                        ? "outline"
                        : activity.actionType === "retrieval"
                          ? "secondary"
                          : "destructive"
                    }
                    className="text-xs"
                  >
                    {activity.actionType}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground">
                  {activity.actionType === "placement" && `Placed in ${activity.details.toContainer}`}
                  {activity.actionType === "retrieval" && `Retrieved from ${activity.details.fromContainer}`}
                  {activity.actionType === "disposal" && `Reason: ${activity.details.reason}`}
                </p>

                <p className="text-xs text-muted-foreground">
                  {new Date(activity.timestamp).toLocaleTimeString()} by {activity.userId}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

