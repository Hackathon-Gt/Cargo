import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Box, Calendar, Package, Trash2, Search } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import ImprovedContainerVisualization from "@/frontend/components/improved-container-visualization"

export default function AstronautDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-space-blue glow-text">Astronaut Dashboard</h1>
          <p className="text-muted-foreground">Daily cargo operations and tasks</p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/search">
            <Button className="group bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300">
              Find Item
              <Search className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="glass-effect card-hover border-border/40 md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-lg">
                <Box className="mr-2 h-5 w-5 text-space-blue" />
                Quick Item Search
              </CardTitle>
            </div>
            <CardDescription>Find items by ID or name</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center space-x-2">
              <Input type="text" placeholder="Enter item ID or name" className="bg-muted/50" />
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>

            <div className="mt-4 rounded-md border border-border/40 bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">
                Recent searches:
                <Badge variant="outline" className="ml-2 cursor-pointer">
                  Oxygen Cylinder (002)
                </Badge>
                <Badge variant="outline" className="ml-2 cursor-pointer">
                  Food Packet (001)
                </Badge>
                <Badge variant="outline" className="ml-2 cursor-pointer">
                  Medical Kit (003)
                </Badge>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect card-hover border-border/40">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Calendar className="mr-2 h-5 w-5 text-space-blue" />
              Today's Schedule
            </CardTitle>
            <CardDescription>May 21, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <span className="text-xs font-medium">08:00</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Inventory Check</p>
                  <p className="text-xs text-muted-foreground">Crew Quarters</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <span className="text-xs font-medium">10:30</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Resupply Preparation</p>
                  <p className="text-xs text-muted-foreground">Airlock</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <span className="text-xs font-medium">14:00</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Waste Collection</p>
                  <p className="text-xs text-muted-foreground">All Zones</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-effect card-hover border-border/40">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Package className="mr-2 h-5 w-5 text-space-blue" />
            Current Container Status
          </CardTitle>
          <CardDescription>View and locate items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ImprovedContainerVisualization />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                Search for items and get step-by-step retrieval instructions with minimal movement of other items.
              </p>
              <Button variant="ghost" size="sm" className="mt-4 group">
                View <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/placement" className="block">
          <Card className="glass-effect card-hover h-full border-border/40 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Package className="mr-2 h-5 w-5 text-space-blue" />
                Place Items
              </CardTitle>
              <CardDescription>Store items efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get optimal placement recommendations for new items based on priority and space availability.
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
              <CardDescription>Handle expired items</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Identify and process expired or depleted items and prepare them for return during undocking.
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

