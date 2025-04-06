import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Box, Calendar, ClipboardList, Package, Trash2 } from "lucide-react"
import Link from "next/link"
import StatsCards from "@/components/stats-cards"
import MissionStatus from "@/components/mission-status"
import CargoCapacityChart from "@/components/cargo-capacity-chart"
import PriorityItems from "@/components/priority-items"
import RecentActivity from "@/components/recent-activity"

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-space-blue glow-text">Mission Control</h1>
          <p className="text-muted-foreground">International Space Station Cargo Management</p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/simulation">
            <Button className="group bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300">
              Simulate Time
              <Calendar className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
            </Button>
          </Link>
        </div>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MissionStatus />
        <CargoCapacityChart />
        <PriorityItems />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="glass-effect card-hover border-border/40">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Package className="mr-2 h-5 w-5 text-space-blue" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common cargo operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link href="/placement" className="block">
                <Button variant="secondary" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Place New Items
                </Button>
              </Link>

              <Link href="/search" className="block">
                <Button variant="secondary" className="w-full justify-start">
                  <Box className="mr-2 h-4 w-4" />
                  Find Item
                </Button>
              </Link>

              <Link href="/waste" className="block">
                <Button variant="secondary" className="w-full justify-start">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Manage Waste
                </Button>
              </Link>

              <Link href="/logs" className="block">
                <Button variant="secondary" className="w-full justify-start">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  View Logs
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <RecentActivity />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link href="/placement" className="block">
          <Card className="glass-effect card-hover h-full border-border/40 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Package className="mr-2 h-5 w-5 text-space-blue" />
                Placement Recommendations
              </CardTitle>
              <CardDescription>Optimize cargo placement</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get recommendations for placing new cargo based on space availability, priority, and accessibility.
              </p>
              <Button variant="ghost" size="sm" className="mt-4 group">
                View <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/search" className="block">
          <Card className="glass-effect card-hover h-full border-border/40 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Box className="mr-2 h-5 w-5 text-space-blue" />
                Item Search & Retrieval
              </CardTitle>
              <CardDescription>Find and retrieve items</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Search for items and get retrieval instructions with minimal movement of other items.
              </p>
              <Button variant="ghost" size="sm" className="mt-4 group">
                View <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/waste" className="block">
          <Card className="glass-effect card-hover h-full border-border/40 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Trash2 className="mr-2 h-5 w-5 text-space-blue" />
                Waste Management
              </CardTitle>
              <CardDescription>Handle expired and used items</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track expired or depleted items and plan for waste return during undocking.
              </p>
              <Button variant="ghost" size="sm" className="mt-4 group">
                View <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

import { useEffect, useState } from "react"
import axios from "axios"

// Inside Home() function
const [missionStatus, setMissionStatus] = useState("Loading...")

useEffect(() => {
  axios.get("http://127.0.0.1:5000/api/mission-status")
    .then((res) => {
      setMissionStatus(res.data.status)
    })
    .catch((err) => {
      console.error(err)
      setMissionStatus("Error fetching status")
    })
}, [])
