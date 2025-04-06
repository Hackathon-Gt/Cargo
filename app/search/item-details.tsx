"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ItemDetails() {
  // This would be fetched from the API in a real implementation
  const item = {
    id: "001",
    name: "Food Packet",
    width: 10,
    depth: 10,
    height: 20,
    mass: 0.5,
    priority: 80,
    expiryDate: "2025-05-20",
    usageLimit: 1,
    usesRemaining: 1,
    preferredZone: "Crew Quarters",
    containerId: "contA",
    position: {
      startCoordinates: { width: 0, depth: 0, height: 0 },
      endCoordinates: { width: 10, depth: 10, height: 20 },
    },
  }

  // Calculate days until expiry
  const today = new Date()
  const expiry = new Date(item.expiryDate)
  const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="space-y-4">
      {!item ? (
        <p className="text-sm text-muted-foreground">No item selected. Please search for an item.</p>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <Badge variant={item.priority > 70 ? "destructive" : "secondary"}>Priority: {item.priority}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Item ID</p>
              <p className="text-sm text-muted-foreground">{item.id}</p>
            </div>

            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-muted-foreground">
                {item.containerId} ({item.preferredZone})
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Dimensions</p>
              <p className="text-sm text-muted-foreground">
                {item.width}cm × {item.depth}cm × {item.height}cm
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Mass</p>
              <p className="text-sm text-muted-foreground">{item.mass} kg</p>
            </div>

            <div>
              <p className="text-sm font-medium">Expiry Date</p>
              <p className="text-sm text-muted-foreground">
                {item.expiryDate} ({daysUntilExpiry} days)
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Uses Remaining</p>
              <div className="flex items-center gap-2">
                <Progress value={(item.usesRemaining / item.usageLimit) * 100} className="h-2" />
                <span className="text-sm text-muted-foreground">
                  {item.usesRemaining}/{item.usageLimit}
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">Position</p>
            <p className="text-sm text-muted-foreground">
              Start: ({item.position.startCoordinates.width}, {item.position.startCoordinates.depth},{" "}
              {item.position.startCoordinates.height})
              <br />
              End: ({item.position.endCoordinates.width}, {item.position.endCoordinates.depth},{" "}
              {item.position.endCoordinates.height})
            </p>
          </div>
        </>
      )}
    </div>
  )
}

