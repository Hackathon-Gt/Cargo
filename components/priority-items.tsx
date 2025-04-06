"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function PriorityItems() {
  // This would be fetched from the API in a real implementation
  const priorityItems = [
    {
      id: "002",
      name: "Oxygen Cylinder",
      priority: 95,
      expiryDate: "2025-08-15",
      usesRemaining: 5,
      usageLimit: 100,
    },
    {
      id: "005",
      name: "Water Filter",
      priority: 90,
      expiryDate: "2025-06-10",
      usesRemaining: 2,
      usageLimit: 10,
    },
    {
      id: "008",
      name: "Medical Supplies",
      priority: 85,
      expiryDate: "2025-07-20",
      usesRemaining: 3,
      usageLimit: 5,
    },
  ]

  // Calculate days until expiry
  const today = new Date()
  const getExpiryDays = (dateStr: string) => {
    const expiry = new Date(dateStr)
    return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  }

  return (
    <Card className="glass-effect card-hover border-border/40">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <AlertTriangle className="mr-2 h-5 w-5 text-warning" />
          Priority Items
        </CardTitle>
        <CardDescription>Critical items requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {priorityItems.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.id}</p>
                </div>
                <Badge variant="outline" className="bg-warning/20 text-warning">
                  P{item.priority}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Expiry</p>
                  <p>
                    {item.expiryDate} ({getExpiryDays(item.expiryDate)} days)
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Uses Remaining</p>
                  <div className="flex items-center gap-2">
                    <Progress value={(item.usesRemaining / item.usageLimit) * 100} className="h-1.5" />
                    <span>
                      {item.usesRemaining}/{item.usageLimit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

