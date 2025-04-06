"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Clock, Calendar } from "lucide-react"

export default function MissionStatus() {
  // This would be fetched from the API in a real implementation
  const missionData = {
    name: "Expedition 69",
    status: "In Progress",
    daysInOrbit: 142,
    nextResupply: "2025-06-15",
    nextUndock: "2025-07-02",
  }

  // Calculate days until next resupply
  const today = new Date()
  const resupply = new Date(missionData.nextResupply)
  const daysUntilResupply = Math.ceil((resupply.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Card className="glass-effect card-hover border-border/40">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Rocket className="mr-2 h-5 w-5 text-space-blue" />
            Mission Status
          </CardTitle>
          <Badge variant="outline" className="bg-success/20 text-success">
            {missionData.status}
          </Badge>
        </div>
        <CardDescription>Current mission information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <Rocket className="h-4 w-4 text-space-blue" />
              </div>
              <div>
                <p className="text-sm font-medium">{missionData.name}</p>
                <p className="text-xs text-muted-foreground">Current Mission</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{missionData.daysInOrbit} days</p>
              <p className="text-xs text-muted-foreground">In orbit</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <Calendar className="h-4 w-4 text-space-blue" />
              </div>
              <div>
                <p className="text-sm font-medium">Next Resupply</p>
                <p className="text-xs text-muted-foreground">{missionData.nextResupply}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{daysUntilResupply} days</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <Clock className="h-4 w-4 text-space-blue" />
              </div>
              <div>
                <p className="text-sm font-medium">Next Undocking</p>
                <p className="text-xs text-muted-foreground">{missionData.nextUndock}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

