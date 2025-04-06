"use client"

import { Check, MoveHorizontal, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RetrievalSteps() {
  // This would be fetched from the API in a real implementation
  const steps = [
    { step: 1, action: "remove", itemId: "003", itemName: "First Aid Kit" },
    { step: 2, action: "setAside", itemId: "003", itemName: "First Aid Kit" },
    { step: 3, action: "retrieve", itemId: "001", itemName: "Food Packet" },
    { step: 4, action: "placeBack", itemId: "003", itemName: "First Aid Kit" },
  ]

  return (
    <div className="space-y-4">
      {steps.length === 0 ? (
        <p className="text-sm text-muted-foreground">No retrieval steps available. Please search for an item.</p>
      ) : (
        <>
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.step} className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
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

          <Button className="w-full">Mark Item as Retrieved</Button>
        </>
      )}
    </div>
  )
}

