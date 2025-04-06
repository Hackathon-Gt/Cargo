"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Box, Package, Trash2, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"

export default function StatsCards() {
  // This would be fetched from the API in a real implementation
  const stats = {
    totalItems: 248,
    availableSpace: 65,
    wasteItems: 12,
    criticalItems: 5,
  }

  const [progressValue, setProgressValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(stats.availableSpace), 500)
    return () => clearTimeout(timer)
  }, [stats.availableSpace])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-effect card-hover border-border/40">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          <Package className="h-4 w-4 text-space-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalItems}</div>
          <p className="text-xs text-muted-foreground">Items currently in storage</p>
        </CardContent>
      </Card>

      <Card className="glass-effect card-hover border-border/40">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Available Space</CardTitle>
          <Box className="h-4 w-4 text-space-blue" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">{stats.availableSpace}%</div>
          </div>
          <div className="mt-2">
            <Progress value={progressValue} className="h-2 bg-muted/50" />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Of total storage capacity</p>
        </CardContent>
      </Card>

      <Card className="glass-effect card-hover border-border/40">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Waste Items</CardTitle>
          <Trash2 className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.wasteItems}</div>
          <p className="text-xs text-muted-foreground">Items marked for disposal</p>
        </CardContent>
      </Card>

      <Card className="glass-effect card-hover border-border/40">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Critical Items</CardTitle>
          <AlertTriangle className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.criticalItems}</div>
          <p className="text-xs text-muted-foreground">High priority items near expiry</p>
        </CardContent>
      </Card>
    </div>
  )
}

