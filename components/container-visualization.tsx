"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RotateCw, ZoomIn, ZoomOut } from "lucide-react"

export default function ContainerVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [view, setView] = useState<"3d" | "2d">("3d")
  const [container, setContainer] = useState<string>("contA")
  const [zoom, setZoom] = useState<number>(1)

  // This would be fetched from the API in a real implementation
  const containers = [
    { id: "contA", name: "Container A - Crew Quarters", width: 100, depth: 85, height: 200 },
    { id: "contB", name: "Container B - Airlock", width: 50, depth: 85, height: 200 },
    { id: "contC", name: "Container C - Laboratory", width: 200, depth: 85, height: 200 },
  ]

  // Mock data for items in the container
  const items = [
    {
      id: "001",
      name: "Food Packet",
      width: 10,
      depth: 10,
      height: 20,
      position: { x: 0, y: 0, z: 0 },
      color: "#4CAF50",
    },
    {
      id: "002",
      name: "Oxygen Cylinder",
      width: 15,
      depth: 15,
      height: 50,
      position: { x: 20, y: 0, z: 0 },
      color: "#2196F3",
    },
    {
      id: "003",
      name: "First Aid Kit",
      width: 20,
      depth: 20,
      height: 10,
      position: { x: 0, y: 0, z: 30 },
      color: "#F44336",
    },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set scale factor for zoom
    const scale = zoom * 2 // Base scale factor

    // Find the selected container
    const selectedContainer = containers.find((c) => c.id === container)
    if (!selectedContainer) return

    if (view === "2d") {
      // Draw container outline
      ctx.strokeStyle = "#666"
      ctx.lineWidth = 2
      ctx.strokeRect(50, 50, selectedContainer.width * scale, selectedContainer.depth * scale)

      // Draw items
      items.forEach((item) => {
        ctx.fillStyle = item.color
        ctx.fillRect(50 + item.position.x * scale, 50 + item.position.z * scale, item.width * scale, item.depth * scale)

        // Draw item label
        ctx.fillStyle = "#000"
        ctx.font = "12px Arial"
        ctx.fillText(
          item.id,
          50 + item.position.x * scale + (item.width * scale) / 2 - 10,
          50 + item.position.z * scale + (item.depth * scale) / 2 + 5,
        )
      })
    } else {
      // Simple 3D-like visualization (isometric view)
      const offsetX = 150
      const offsetY = 300

      // Draw container
      drawIsometricBox(
        ctx,
        offsetX,
        offsetY,
        selectedContainer.width * scale,
        selectedContainer.depth * scale,
        selectedContainer.height * scale,
        "#eee",
        "#ccc",
        "#ddd",
      )

      // Draw items
      items.forEach((item) => {
        drawIsometricBox(
          ctx,
          offsetX + item.position.x * scale,
          offsetY - item.position.y * scale - item.height * scale,
          item.width * scale,
          item.depth * scale,
          item.height * scale,
          item.color,
          adjustColor(item.color, -20),
          adjustColor(item.color, -40),
        )

        // Draw item label
        ctx.fillStyle = "#000"
        ctx.font = "12px Arial"
        const labelX = offsetX + (item.position.x + item.width / 2) * scale
        const labelY = offsetY - (item.position.y + item.height) * scale
        ctx.fillText(item.id, labelX, labelY)
      })
    }
  }, [view, container, zoom])

  // Helper function to draw isometric box
  const drawIsometricBox = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    depth: number,
    height: number,
    colorTop: string,
    colorRight: string,
    colorLeft: string,
  ) => {
    // Top face
    ctx.fillStyle = colorTop
    ctx.beginPath()
    ctx.moveTo(x, y - height / 2)
    ctx.lineTo(x + width, y - height / 2)
    ctx.lineTo(x + width + depth / 2, y - height / 4)
    ctx.lineTo(x + depth / 2, y - height / 4)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Right face
    ctx.fillStyle = colorRight
    ctx.beginPath()
    ctx.moveTo(x + width, y - height / 2)
    ctx.lineTo(x + width, y + height / 2)
    ctx.lineTo(x + width + depth / 2, y + height / 4)
    ctx.lineTo(x + width + depth / 2, y - height / 4)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Left face
    ctx.fillStyle = colorLeft
    ctx.beginPath()
    ctx.moveTo(x, y - height / 2)
    ctx.lineTo(x, y + height / 2)
    ctx.lineTo(x + depth / 2, y + height / 4)
    ctx.lineTo(x + depth / 2, y - height / 4)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  // Helper function to adjust color brightness
  const adjustColor = (color: string, amount: number): string => {
    const hex = color.replace("#", "")
    const r = Math.max(0, Math.min(255, Number.parseInt(hex.substring(0, 2), 16) + amount))
    const g = Math.max(0, Math.min(255, Number.parseInt(hex.substring(2, 4), 16) + amount))
    const b = Math.max(0, Math.min(255, Number.parseInt(hex.substring(4, 6), 16) + amount))
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Select value={container} onValueChange={setContainer}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select container" />
          </SelectTrigger>
          <SelectContent>
            {containers.map((container) => (
              <SelectItem key={container.id} value={container.id}>
                {container.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Tabs value={view} onValueChange={(value) => setView(value as "3d" | "2d")}>
          <TabsList>
            <TabsTrigger value="3d">3D View</TabsTrigger>
            <TabsTrigger value="2d">2D View</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setZoom(1)}>
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative h-[400px] w-full overflow-hidden rounded-lg border bg-background">
        <canvas ref={canvasRef} width={800} height={600} className="h-full w-full" />
      </div>
    </div>
  )
}

