"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download } from "lucide-react"

export default function ExportOptions() {
  const handleExportArrangement = () => {
    // This would call the API in a real implementation
    console.log("Exporting current arrangement")
  }

  const handleExportLogs = () => {
    // This would call the API in a real implementation
    console.log("Exporting logs")
  }

  const handleExportWasteItems = () => {
    // This would call the API in a real implementation
    console.log("Exporting waste items")
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Current Arrangement</CardTitle>
          <CardDescription>Export the current arrangement of items in containers</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handleExportArrangement}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>Export logs of all item movements and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handleExportLogs}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Waste Items</CardTitle>
          <CardDescription>Export a list of all waste items</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handleExportWasteItems}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

