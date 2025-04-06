import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search } from "lucide-react"
import LogsTable from "./logs-table"

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Activity Logs</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Logs</CardTitle>
          <CardDescription>Filter logs by date, item, user, or action type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label htmlFor="start-date" className="text-sm font-medium">
                Start Date
              </label>
              <Input id="start-date" type="date" />
            </div>

            <div className="space-y-2">
              <label htmlFor="end-date" className="text-sm font-medium">
                End Date
              </label>
              <Input id="end-date" type="date" />
            </div>

            <div className="space-y-2">
              <label htmlFor="item-id" className="text-sm font-medium">
                Item ID
              </label>
              <Input id="item-id" placeholder="Enter item ID" />
            </div>

            <div className="space-y-2">
              <label htmlFor="user-id" className="text-sm font-medium">
                User ID
              </label>
              <Input id="user-id" placeholder="Enter user ID" />
            </div>

            <div className="space-y-2">
              <label htmlFor="action-type" className="text-sm font-medium">
                Action Type
              </label>
              <Select>
                <SelectTrigger id="action-type">
                  <SelectValue placeholder="Select action type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="placement">Placement</SelectItem>
                  <SelectItem value="retrieval">Retrieval</SelectItem>
                  <SelectItem value="rearrangement">Rearrangement</SelectItem>
                  <SelectItem value="disposal">Disposal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="mt-4">
            <Search className="mr-2 h-4 w-4" />
            Filter Logs
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logs</CardTitle>
          <CardDescription>Activity logs for all cargo operations</CardDescription>
        </CardHeader>
        <CardContent>
          <LogsTable />
        </CardContent>
      </Card>
    </div>
  )
}

