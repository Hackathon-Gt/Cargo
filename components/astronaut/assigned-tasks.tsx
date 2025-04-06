"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AssignedTasks() {
  // This would be fetched from the API in a real implementation
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Retrieve Medical Supplies",
      description: "Retrieve Medical Kit (003) from Laboratory",
      priority: "high",
      status: "pending",
      assignedBy: "Commander Smith",
    },
    {
      id: 2,
      title: "Organize Food Storage",
      description: "Rearrange food packets in Crew Quarters for optimal space usage",
      priority: "medium",
      status: "pending",
      assignedBy: "Commander Smith",
    },
    {
      id: 3,
      title: "Check Oxygen Levels",
      description: "Verify remaining uses in Oxygen Cylinders (002, 007, 012)",
      priority: "high",
      status: "pending",
      assignedBy: "System",
    },
  ])

  const completeTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: "completed" } : task)))
  }

  return (
    <Card className="glass-effect card-hover border-border/40">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <ClipboardList className="mr-2 h-5 w-5 text-space-blue" />
          Assigned Tasks
        </CardTitle>
        <CardDescription>Cargo operations assigned to you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="rounded-lg border border-border/40 bg-muted/20 p-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{task.title}</h3>
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : task.priority === "medium" ? "secondary" : "outline"
                      }
                    >
                      {task.priority}
                    </Badge>
                    {task.status === "completed" && (
                      <Badge variant="outline" className="bg-success/20 text-success">
                        Completed
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Assigned by: {task.assignedBy}</p>
                </div>

                {task.status === "pending" && (
                  <Button variant="outline" size="sm" className="ml-2 shrink-0" onClick={() => completeTask(task.id)}>
                    <CheckCircle2 className="mr-1 h-4 w-4" />
                    Complete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

