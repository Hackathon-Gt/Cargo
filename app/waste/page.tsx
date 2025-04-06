import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Trash2 } from "lucide-react"
import WasteItemsList from "./waste-items-list"
import ReturnPlanSteps from "./return-plan-steps"

export default function WastePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Waste Management</h1>
        <Button>
          <Trash2 className="mr-2 h-4 w-4" />
          Identify Waste Items
        </Button>
      </div>

      <Tabs defaultValue="current-waste">
        <TabsList>
          <TabsTrigger value="current-waste">Current Waste</TabsTrigger>
          <TabsTrigger value="return-plan">Return Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="current-waste" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Waste Items</CardTitle>
              <CardDescription>Items that have expired or are out of uses</CardDescription>
            </CardHeader>
            <CardContent>
              <WasteItemsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="return-plan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Return Plan</CardTitle>
              <CardDescription>Plan for returning waste items during undocking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label htmlFor="undocking-container" className="text-sm font-medium">
                    Undocking Container
                  </label>
                  <Input id="undocking-container" placeholder="Container ID" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="undocking-date" className="text-sm font-medium">
                    Undocking Date
                  </label>
                  <Input id="undocking-date" type="date" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="max-weight" className="text-sm font-medium">
                    Max Weight (kg)
                  </label>
                  <Input id="max-weight" type="number" placeholder="50" />
                </div>
              </div>

              <Button className="mt-4">Generate Return Plan</Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Return Plan Steps</CardTitle>
                <CardDescription>Step-by-step instructions for waste return</CardDescription>
              </CardHeader>
              <CardContent>
                <ReturnPlanSteps />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Return Manifest</CardTitle>
                <CardDescription>Summary of items to be returned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Undocking Container</p>
                    <p className="text-sm text-muted-foreground">contB (Airlock)</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Undocking Date</p>
                    <p className="text-sm text-muted-foreground">2025-06-15</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Items</p>
                    <ul className="mt-2 space-y-2">
                      <li className="text-sm text-muted-foreground">Food Packet (001) - Expired</li>
                      <li className="text-sm text-muted-foreground">First Aid Kit (003) - Out of Uses</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Total Volume</p>
                      <p className="text-sm text-muted-foreground">4,200 cm³</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Total Weight</p>
                      <p className="text-sm text-muted-foreground">3.1 kg</p>
                    </div>
                  </div>

                  <Button className="w-full">
                    Complete Undocking
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

