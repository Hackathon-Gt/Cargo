import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload } from "lucide-react"
import PlacementForm from "./placement-form"
import ContainerVisualization from "@/components/container-visualization"

export default function PlacementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Placement Recommendations</h1>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Import Items
        </Button>
      </div>

      <Tabs defaultValue="new-items">
        <TabsList>
          <TabsTrigger value="new-items">New Items</TabsTrigger>
          <TabsTrigger value="rearrangement">Rearrangement</TabsTrigger>
          <TabsTrigger value="current">Current Arrangement</TabsTrigger>
        </TabsList>

        <TabsContent value="new-items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Items Placement</CardTitle>
              <CardDescription>
                Get recommendations for placing new items based on priority and space availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PlacementForm />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Placement Preview</CardTitle>
                <CardDescription>Visual representation of recommended placements</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ContainerVisualization />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Placement Details</CardTitle>
                <CardDescription>Detailed information about recommended placements</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] overflow-auto">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    No placement recommendations available. Please submit items for placement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rearrangement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rearrangement Recommendations</CardTitle>
              <CardDescription>Optimize space usage by rearranging existing items</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No rearrangement recommendations available at this time.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Arrangement</CardTitle>
              <CardDescription>View the current arrangement of items in containers</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ContainerVisualization />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

