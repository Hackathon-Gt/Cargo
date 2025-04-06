"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function SimulationResults() {
  // This would be fetched from the API in a real implementation
  const simulationResults = {
    newDate: "2025-05-21",
    changes: {
      itemsUsed: [
        { itemId: "001", name: "Food Packet", remainingUses: 0 },
        { itemId: "002", name: "Oxygen Cylinder", remainingUses: 99 },
      ],
      itemsExpired: [],
      itemsDepletedToday: [{ itemId: "001", name: "Food Packet" }],
    },
  }

  return (
    <div className="space-y-4">
      {!simulationResults ? (
        <p className="text-sm text-muted-foreground">No simulation results available. Please run a simulation.</p>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">New Date: {simulationResults.newDate}</p>
          </div>

          <Tabs defaultValue="used">
            <TabsList>
              <TabsTrigger value="used">Items Used</TabsTrigger>
              <TabsTrigger value="expired">Items Expired</TabsTrigger>
              <TabsTrigger value="depleted">Items Depleted</TabsTrigger>
            </TabsList>

            <TabsContent value="used" className="space-y-4">
              {simulationResults.changes.itemsUsed.length === 0 ? (
                <p className="text-sm text-muted-foreground">No items were used during this simulation.</p>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-3 gap-4 p-4 font-medium">
                    <div>Item</div>
                    <div>Remaining Uses</div>
                    <div>Status</div>
                  </div>

                  {simulationResults.changes.itemsUsed.map((item) => (
                    <div key={item.itemId} className="grid grid-cols-3 gap-4 border-t p-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.itemId}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Progress value={item.remainingUses} max={100} className="h-2 w-full" />
                        <span className="text-sm text-muted-foreground">{item.remainingUses}</span>
                      </div>

                      <div>
                        {item.remainingUses === 0 ? (
                          <Badge variant="destructive">Depleted</Badge>
                        ) : (
                          <Badge variant="secondary">Active</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="expired" className="space-y-4">
              {simulationResults.changes.itemsExpired.length === 0 ? (
                <p className="text-sm text-muted-foreground">No items expired during this simulation.</p>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-2 gap-4 p-4 font-medium">
                    <div>Item</div>
                    <div>Expiry Date</div>
                  </div>

                  {simulationResults.changes.itemsExpired.map((item) => (
                    <div key={item.itemId} className="grid grid-cols-2 gap-4 border-t p-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.itemId}</p>
                      </div>

                      <div>
                        <Badge variant="destructive">Expired</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="depleted" className="space-y-4">
              {simulationResults.changes.itemsDepletedToday.length === 0 ? (
                <p className="text-sm text-muted-foreground">No items were depleted during this simulation.</p>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-2 gap-4 p-4 font-medium">
                    <div>Item</div>
                    <div>Status</div>
                  </div>

                  {simulationResults.changes.itemsDepletedToday.map((item) => (
                    <div key={item.itemId} className="grid grid-cols-2 gap-4 border-t p-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.itemId}</p>
                      </div>

                      <div>
                        <Badge variant="destructive">Out of Uses</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

