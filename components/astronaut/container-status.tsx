"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Layers } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ImprovedContainerVisualization from "@/components/improved-container-visualization"

export default function ContainerStatus() {
  // This would be fetched from the API in a real implementation
  const containers = [
    { id: "contA", name: "Container A", zone: "Crew Quarters", capacity: 75, items: 24 },
    { id: "contB", name: "Container B", zone: "Airlock", capacity: 80, items: 12 },
    { id: "contC", name: "Container C", zone: "Laboratory", capacity: 90, items: 36 },
    { id: "contD", name: "Container D", zone: "Medical Bay", capacity: 50, items: 8 },
  ]

  return (
    <Card className="glass-effect card-hover border-border/40">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Layers className="mr-2 h-5 w-5 text-space-blue" />
          Container Status
        </CardTitle>
        <CardDescription>Current container arrangement</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="contA">
          <TabsList className="mb-4 w-full justify-start overflow-auto">
            {containers.map((container) => (
              <TabsTrigger key={container.id} value={container.id} className="min-w-[120px]">
                <div className="flex flex-col items-start">
                  <span>{container.name}</span>
                  <span className="text-xs text-muted-foreground">{container.zone}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {containers.map((container) => (
            <TabsContent key={container.id} value={container.id}>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{container.name}</h3>
                  <p className="text-sm text-muted-foreground">{container.zone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{container.capacity}% Full</Badge>
                  <Badge variant="outline">{container.items} Items</Badge>
                </div>
              </div>

              <div className="h-[400px] rounded-lg border border-border/40">
                <ImprovedContainerVisualization containerId={container.id} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

