"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"

export default function WasteItemsList() {
  // This would be fetched from the API in a real implementation
  const wasteItems = [
    {
      itemId: "001",
      name: "Food Packet",
      reason: "Expired",
      containerId: "contA",
      position: {
        startCoordinates: { width: 0, depth: 0, height: 0 },
        endCoordinates: { width: 10, depth: 10, height: 20 },
      },
    },
    {
      itemId: "003",
      name: "First Aid Kit",
      reason: "Out of Uses",
      containerId: "contA",
      position: {
        startCoordinates: { width: 0, depth: 0, height: 30 },
        endCoordinates: { width: 20, depth: 20, height: 40 },
      },
    },
  ]

  return (
    <div className="space-y-4">
      {wasteItems.length === 0 ? (
        <p className="text-sm text-muted-foreground">No waste items identified.</p>
      ) : (
        <>
          <div className="rounded-md border">
            <div className="grid grid-cols-4 gap-4 p-4 font-medium">
              <div>Item</div>
              <div>Reason</div>
              <div>Location</div>
              <div className="text-right">Actions</div>
            </div>

            {wasteItems.map((item) => (
              <div key={item.itemId} className="grid grid-cols-4 gap-4 border-t p-4">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.itemId}</p>
                </div>

                <div>
                  <Badge variant={item.reason === "Expired" ? "destructive" : "secondary"}>{item.reason}</Badge>
                </div>

                <div>
                  <p className="text-sm">{item.containerId}</p>
                  <p className="text-xs text-muted-foreground">
                    ({item.position.startCoordinates.width}, {item.position.startCoordinates.depth},{" "}
                    {item.position.startCoordinates.height})
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button>
              <Trash2 className="mr-2 h-4 w-4" />
              Move All to Waste Container
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

