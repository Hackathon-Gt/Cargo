import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, FastForward } from "lucide-react"
import SimulationResults from "./simulation-results"

export default function SimulationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Time Simulation</h1>
        <Button variant="outline">Current Date: {new Date().toLocaleDateString()}</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Simulate Time</CardTitle>
          <CardDescription>Fast forward time to simulate item usage and expiry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="num-days" className="text-sm font-medium">
                  Number of Days
                </label>
                <Input id="num-days" type="number" placeholder="1" />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Calendar className="mr-2 h-4 w-4" />
                  Next Day
                </Button>
                <Button className="flex-1">
                  <FastForward className="mr-2 h-4 w-4" />
                  Fast Forward
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Items to be Used Each Day</label>
              <div className="max-h-[200px] overflow-y-auto rounded-md border p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input placeholder="Item ID or Name" />
                    <Button variant="outline" size="sm">
                      Add
                    </Button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
                      <span>Food Packet (001)</span>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
                      <span>Oxygen Cylinder (002)</span>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Simulation Results</CardTitle>
          <CardDescription>Changes that occurred during the simulation</CardDescription>
        </CardHeader>
        <CardContent>
          <SimulationResults />
        </CardContent>
      </Card>
    </div>
  )
}

