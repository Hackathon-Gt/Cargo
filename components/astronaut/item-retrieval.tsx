"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Box, Check, MoveHorizontal, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ItemRetrieval() {
  // This would be fetched from the API in a real implementation
  const retrievalData = {
    item: {
      id: "003",
      name: "Medical Kit",
      containerId: "contC",
      zone: "Laboratory",
      position: {
        startCoordinates: { width: 0, depth: 0, height: 30 },
        endCoordinates: { width: 20, depth: 20, height: 40 },
      },
    },
    steps: [
      { step: 1, action: "remove", itemId: "009", itemName: "Science Sample" },
      { step: 2, action: "setAside", itemId: "009", itemName: "Science Sample" },
      { step: 3, action: "retrieve", itemId: "003", itemName: "Medical Kit" },
      { step: 4, action: "placeBack", itemId: "009", itemName: "Science Sample" },
    ],
  }

  return (
    <Card className="glass-effect card-hover border-border/40">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Box className="mr-2 h-5 w-5 text-space-blue" />
          Current Retrieval
        </CardTitle>
        <CardDescription>Step-by-step retrieval instructions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 rounded-lg border border-border/40 bg-muted/20 p-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{retrievalData.item.name}</h3>
              <p className="text-sm text-muted-foreground">ID: {retrievalData.item.id}</p>
            </div>
            <Badge variant="outline">{retrievalData.item.zone}</Badge>
          </div>
          <p className="mt-2 text-sm">
            Location: Container {retrievalData.item.containerId} at position (
            {retrievalData.item.position.startCoordinates.width},{retrievalData.item.position.startCoordinates.depth},
            {retrievalData.item.position.startCoordinates.height})
          </p>
        </div>

        <div className="space-y-3">
          {retrievalData.steps.map((step) => (
            <div key={step.step} className="flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                {step.step}
              </div>
              <div className="space-y-1">
                <p className="font-medium">
                  {step.action === "remove" && "Remove item"}
                  {step.action === "setAside" && "Set aside item"}
                  {step.action === "retrieve" && "Retrieve target item"}
                  {step.action === "placeBack" && "Place back item"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {step.itemName} ({step.itemId})
                </p>
              </div>
              <div className="ml-auto">
                {step.action === "remove" && <MoveHorizontal className="h-5 w-5 text-muted-foreground" />}
                {step.action === "setAside" && <Package className="h-5 w-5 text-muted-foreground" />}
                {step.action === "retrieve" && <Check className="h-5 w-5 text-green-500" />}
                {step.action === "placeBack" && <MoveHorizontal className="h-5 w-5 text-muted-foreground" />}
              </div>
            </div>
          ))}
        </div>

        <Button className="mt-4 w-full">Mark Item as Retrieved</Button>
      </CardContent>
    </Card>
  )
}

