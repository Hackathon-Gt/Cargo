"use client"

import { MoveHorizontal } from "lucide-react"

export default function ReturnPlanSteps() {
  // This would be fetched from the API in a real implementation
  const steps = [
    { step: 1, itemId: "001", itemName: "Food Packet", fromContainer: "contA", toContainer: "contB" },
    { step: 2, itemId: "003", itemName: "First Aid Kit", fromContainer: "contA", toContainer: "contB" },
  ]

  return (
    <div className="space-y-4">
      {steps.length === 0 ? (
        <p className="text-sm text-muted-foreground">No return plan available. Please generate a return plan.</p>
      ) : (
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.step} className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {step.step}
              </div>
              <div className="space-y-1">
                <p className="font-medium">Move {step.itemName}</p>
                <p className="text-sm text-muted-foreground">
                  From {step.fromContainer} to {step.toContainer}
                </p>
              </div>
              <div className="ml-auto">
                <MoveHorizontal className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

