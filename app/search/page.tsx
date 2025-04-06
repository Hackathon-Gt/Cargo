import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import ItemDetails from "./item-details"
import RetrievalSteps from "./retrieval-steps"

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Item Search & Retrieval</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search for Items</CardTitle>
          <CardDescription>Find items by ID or name to get retrieval instructions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Enter item ID or name" />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>Information about the selected item</CardDescription>
          </CardHeader>
          <CardContent>
            <ItemDetails />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Retrieval Instructions</CardTitle>
            <CardDescription>Step-by-step guide to retrieve the item</CardDescription>
          </CardHeader>
          <CardContent>
            <RetrievalSteps />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Place Item</CardTitle>
          <CardDescription>Update the location of an item after use</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="container">
            <TabsList>
              <TabsTrigger value="container">Place in Container</TabsTrigger>
              <TabsTrigger value="waste">Mark as Waste</TabsTrigger>
            </TabsList>

            <TabsContent value="container" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="container-id" className="text-sm font-medium">
                    Container ID
                  </label>
                  <Input id="container-id" placeholder="Enter container ID" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="position" className="text-sm font-medium">
                    Position
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input id="position-x" placeholder="X" />
                    <Input id="position-y" placeholder="Y" />
                    <Input id="position-z" placeholder="Z" />
                  </div>
                </div>
              </div>

              <Button>Update Item Location</Button>
            </TabsContent>

            <TabsContent value="waste" className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="waste-reason" className="text-sm font-medium">
                  Reason
                </label>
                <Input id="waste-reason" placeholder="Reason for marking as waste" />
              </div>

              <Button variant="destructive">Mark as Waste</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

