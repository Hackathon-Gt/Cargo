"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"

export default function LogsTable() {
  // This would be fetched from the API in a real implementation
  const logs = [
    {
      timestamp: "2025-05-20T10:15:30Z",
      userId: "user001",
      actionType: "placement",
      itemId: "001",
      details: {
        fromContainer: null,
        toContainer: "contA",
        reason: null,
      },
    },
    {
      timestamp: "2025-05-20T11:30:45Z",
      userId: "user002",
      actionType: "retrieval",
      itemId: "002",
      details: {
        fromContainer: "contB",
        toContainer: null,
        reason: null,
      },
    },
    {
      timestamp: "2025-05-20T14:20:15Z",
      userId: "user001",
      actionType: "placement",
      itemId: "002",
      details: {
        fromContainer: null,
        toContainer: "contB",
        reason: null,
      },
    },
    {
      timestamp: "2025-05-20T16:45:10Z",
      userId: "user003",
      actionType: "disposal",
      itemId: "003",
      details: {
        fromContainer: "contA",
        toContainer: "contB",
        reason: "Out of Uses",
      },
    },
  ]

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-5 gap-4 p-4 font-medium">
          <div>Timestamp</div>
          <div>User</div>
          <div>Action</div>
          <div>Item</div>
          <div className="text-right">Details</div>
        </div>

        {logs.map((log, index) => (
          <div key={index} className="grid grid-cols-5 gap-4 border-t p-4">
            <div>
              <p className="text-sm">{new Date(log.timestamp).toLocaleDateString()}</p>
              <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</p>
            </div>

            <div>
              <p className="text-sm">{log.userId}</p>
            </div>

            <div>
              <Badge
                variant={
                  log.actionType === "placement"
                    ? "default"
                    : log.actionType === "retrieval"
                      ? "secondary"
                      : log.actionType === "disposal"
                        ? "destructive"
                        : "outline"
                }
              >
                {log.actionType}
              </Badge>
            </div>

            <div>
              <p className="text-sm">{log.itemId}</p>
            </div>

            <div className="flex justify-end">
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{" "}
          <span className="font-medium">4</span> results
        </p>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" disabled>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

