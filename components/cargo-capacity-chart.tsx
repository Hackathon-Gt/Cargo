"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers } from "lucide-react"

export default function CargoCapacityChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = 200

    // Data for the chart
    const data = [
      { name: "Crew Quarters", used: 75, total: 100, color: "#64D9FF" },
      { name: "Airlock", used: 40, total: 50, color: "#9F7AEA" },
      { name: "Laboratory", used: 180, total: 200, color: "#F59E0B" },
      { name: "Medical Bay", used: 15, total: 30, color: "#10B981" },
    ]

    // Calculate total width for each bar
    const barWidth = (canvas.width - 40) / data.length
    const barSpacing = 10
    const actualBarWidth = barWidth - barSpacing

    // Draw the chart
    data.forEach((item, index) => {
      const x = 20 + index * barWidth
      const usedHeight = (item.used / item.total) * 150
      const emptyHeight = 150 - usedHeight

      // Draw empty part
      ctx.fillStyle = "#1e293b"
      ctx.fillRect(x, 20, actualBarWidth, emptyHeight)

      // Draw used part
      ctx.fillStyle = item.color
      ctx.fillRect(x, 20 + emptyHeight, actualBarWidth, usedHeight)

      // Draw label
      ctx.fillStyle = "#94a3b8"
      ctx.font = "10px Inter"
      ctx.textAlign = "center"
      ctx.fillText(item.name, x + actualBarWidth / 2, 190)

      // Draw percentage
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 12px Inter"
      ctx.fillText(`${Math.round((item.used / item.total) * 100)}%`, x + actualBarWidth / 2, 20 + emptyHeight - 5)
    })

    // Handle window resize
    function handleResize() {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        // Redraw chart
        // (simplified for this example - would need to call the drawing function again)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Card className="glass-effect card-hover border-border/40">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Layers className="mr-2 h-5 w-5 text-space-blue" />
          Cargo Capacity
        </CardTitle>
        <CardDescription>Storage usage by zone</CardDescription>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} className="h-[200px] w-full" />
      </CardContent>
    </Card>
  )
}

