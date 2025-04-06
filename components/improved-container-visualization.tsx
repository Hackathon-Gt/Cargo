"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RotateCw, ZoomIn, ZoomOut, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ContainerVisualizationProps {
  containerId?: string
}

export default function ImprovedContainerVisualization({ containerId = "contA" }: ContainerVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [view, setView] = useState<"3d" | "2d">("2d")
  const [zoom, setZoom] = useState<number>(1)
  const [showItemDetails, setShowItemDetails] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  // This would be fetched from the API in a real implementation
  const containers = [
    { id: "contA", name: "Container A - Crew Quarters", width: 100, depth: 85, height: 200 },
    { id: "contB", name: "Container B - Airlock", width: 50, depth: 85, height: 200 },
    { id: "contC", name: "Container C - Laboratory", width: 200, depth: 85, height: 200 },
    { id: "contD", name: "Container D - Medical Bay", width: 120, depth: 60, height: 150 },
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
      priority: 80,
    },
    {
      id: "002",
      name: "Oxygen Cylinder",
      width: 15,
      depth: 15,
      height: 50,
      position: { x: 20, y: 0, z: 0 },
      color: "#2196F3",
      priority: 95,
    },
    {
      id: "003",
      name: "First Aid Kit",
      width: 20,
      depth: 20,
      height: 10,
      position: { x: 0, y: 0, z: 30 },
      color: "#F44336",
      priority: 90,
    },
    {
      id: "004",
      name: "Tool Box",
      width: 25,
      depth: 15,
      height: 15,
      position: { x: 40, y: 0, z: 0 },
      color: "#FF9800",
      priority: 70,
    },
    {
      id: "005",
      name: "Water Filter",
      width: 15,
      depth: 15,
      height: 30,
      position: { x: 0, y: 0, z: 50 },
      color: "#00BCD4",
      priority: 85,
    },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions based on container
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set scale factor for zoom
    const scale = zoom * 2 // Base scale factor

    // Find the selected container
    const selectedContainer = containers.find((c) => c.id === containerId)
    if (!selectedContainer) return

    if (view === "2d") {
      // Draw container outline with a grid
      const gridSize = 10 * scale
      const containerWidth = selectedContainer.width * scale
      const containerDepth = selectedContainer.depth * scale

      // Calculate offset to center the container
      const offsetX = (canvas.width - containerWidth) / 2
      const offsetY = (canvas.height - containerDepth) / 2

      // Draw background
      ctx.fillStyle = "#1e293b"
      ctx.fillRect(offsetX, offsetY, containerWidth, containerDepth)

      // Draw grid
      ctx.strokeStyle = "#334155"
      ctx.lineWidth = 0.5

      // Vertical grid lines
      for (let x = 0; x <= containerWidth; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(offsetX + x, offsetY)
        ctx.lineTo(offsetX + x, offsetY + containerDepth)
        ctx.stroke()
      }

      // Horizontal grid lines
      for (let y = 0; y <= containerDepth; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(offsetX, offsetY + y)
        ctx.lineTo(offsetX + containerWidth, offsetY + y)
        ctx.stroke()
      }

      // Draw container border
      ctx.strokeStyle = "#64D9FF"
      ctx.lineWidth = 2
      ctx.strokeRect(offsetX, offsetY, containerWidth, containerDepth)

      // Draw coordinate labels
      ctx.fillStyle = "#94a3b8"
      ctx.font = "10px Inter"

      // X-axis labels
      for (let x = 0; x <= selectedContainer.width; x += 20) {
        ctx.fillText(x.toString(), offsetX + x * scale, offsetY + containerDepth + 15)
      }

      // Y-axis labels
      for (let y = 0; y <= selectedContainer.depth; y += 20) {
        ctx.fillText(y.toString(), offsetX - 15, offsetY + y * scale)
      }

      // Draw items
      items.forEach((item) => {
        const itemX = offsetX + item.position.x * scale
        const itemY = offsetY + item.position.z * scale
        const itemWidth = item.width * scale
        const itemHeight = item.depth * scale

        // Draw item background
        ctx.fillStyle = item.color + "80" // Add transparency
        ctx.fillRect(itemX, itemY, itemWidth, itemHeight)

        // Draw item border
        ctx.strokeStyle = item.color
        ctx.lineWidth = 2
        ctx.strokeRect(itemX, itemY, itemWidth, itemHeight)

        // Draw item label
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 12px Inter"
        ctx.textAlign = "center"
        ctx.fillText(item.id, itemX + itemWidth / 2, itemY + itemHeight / 2 + 5)

        // Draw priority indicator
        const priorityRadius = 8
        ctx.beginPath()
        ctx.arc(itemX + itemWidth - priorityRadius, itemY + priorityRadius, priorityRadius, 0, Math.PI * 2)
        ctx.fillStyle = getPriorityColor(item.priority)
        ctx.fill()

        // Draw priority text
        ctx.fillStyle = "#ffffff"
        ctx.font = "8px Inter"
        ctx.textAlign = "center"
        ctx.fillText("P" + item.priority, itemX + itemWidth - priorityRadius, itemY + priorityRadius + 3)
      })

      // Draw selected item highlight
      if (selectedItem) {
        const item = items.find((i) => i.id === selectedItem)
        if (item) {
          const itemX = offsetX + item.position.x * scale
          const itemY = offsetY + item.position.z * scale
          const itemWidth = item.width * scale
          const itemHeight = item.depth * scale

          // Draw highlight
          ctx.strokeStyle = "#ffffff"
          ctx.lineWidth = 3
          ctx.setLineDash([5, 3])
          ctx.strokeRect(itemX - 2, itemY - 2, itemWidth + 4, itemHeight + 4)
          ctx.setLineDash([])

          // Draw item details if enabled
          if (showItemDetails) {
            const detailsX = itemX + itemWidth / 2
            const detailsY = itemY - 10
            const detailsWidth = 150
            const detailsHeight = 80

            // Ensure details box stays within canvas
            const adjustedX = Math.max(10, Math.min(canvas.width - detailsWidth - 10, detailsX - detailsWidth / 2))
            const adjustedY = Math.max(10, Math.min(canvas.height - detailsHeight - 10, detailsY - detailsHeight))

            // Draw details background
            ctx.fillStyle = "rgba(15, 23, 42, 0.9)"
            ctx.fillRect(adjustedX, adjustedY, detailsWidth, detailsHeight)

            // Draw details border
            ctx.strokeStyle = item.color
            ctx.lineWidth = 2
            ctx.strokeRect(adjustedX, adjustedY, detailsWidth, detailsHeight)

            // Draw details content
            ctx.fillStyle = "#ffffff"
            ctx.font = "bold 12px Inter"
            ctx.textAlign = "left"
            ctx.fillText(item.name, adjustedX + 10, adjustedY + 20)

            ctx.font = "10px Inter"
            ctx.fillText(`ID: ${item.id}`, adjustedX + 10, adjustedY + 35)
            ctx.fillText(`Size: ${item.width}×${item.depth}×${item.height} cm`, adjustedX + 10, adjustedY + 50)
            ctx.fillText(`Priority: ${item.priority}`, adjustedX + 10, adjustedY + 65)
          }
        }
      }
    } else {
      // Simple 3D-like visualization (isometric view)
      const containerWidth = selectedContainer.width * scale
      const containerDepth = selectedContainer.depth * scale
      const containerHeight = selectedContainer.height * scale

      // Calculate offset to center the container
      const offsetX = (canvas.width - containerWidth) / 2
      const offsetY = (canvas.height - containerHeight / 2) / 2 + containerHeight / 4

      // Draw container
      drawIsometricBox(
        ctx,
        offsetX,
        offsetY,
        containerWidth,
        containerDepth,
        containerHeight,
        "#1e293b",
        "#0f172a",
        "#172033",
      )

      // Draw grid lines on the container
      const gridSize = 20 * scale

      // Draw grid on top face
      ctx.strokeStyle = "#334155"
      ctx.lineWidth = 0.5

      // X grid lines
      for (let x = 0; x <= containerWidth; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(offsetX + x, offsetY - containerHeight / 2)
        ctx.lineTo(offsetX + x + containerDepth / 2, offsetY - containerHeight / 4)
        ctx.stroke()
      }

      // Y grid lines
      for (let y = 0; y <= containerDepth; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(offsetX + containerWidth, offsetY - containerHeight / 2 + y / 2)
        ctx.lineTo(offsetX + containerWidth + containerDepth / 2, offsetY - containerHeight / 4 + y / 2)
        ctx.stroke()
      }

      // Draw items
      items.forEach((item) => {
        const itemWidth = item.width * scale
        const itemDepth = item.depth * scale
        const itemHeight = item.height * scale

        drawIsometricBox(
          ctx,
          offsetX + item.position.x * scale,
          offsetY - item.position.y * scale - itemHeight,
          itemWidth,
          itemDepth,
          itemHeight,
          item.color,
          adjustColor(item.color, -20),
          adjustColor(item.color, -40),
        )

        // Draw item label
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 12px Inter"
        ctx.textAlign = "center"
        const labelX = offsetX + (item.position.x + item.width / 2) * scale
        const labelY = offsetY - (item.position.y + item.height) * scale
        ctx.fillText(item.id, labelX, labelY)

        // Draw selected item highlight
        if (selectedItem === item.id) {
          const x = offsetX + item.position.x * scale
          const y = offsetY - item.position.y * scale - itemHeight

          // Draw highlight
          ctx.strokeStyle = "#ffffff"
          ctx.lineWidth = 2
          ctx.setLineDash([5, 3])

          // Top face
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + itemWidth, y)
          ctx.lineTo(x + itemWidth + itemDepth / 2, y + itemDepth / 2)
          ctx.lineTo(x + itemDepth / 2, y + itemDepth / 2)
          ctx.closePath()
          ctx.stroke()

          // Front face
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x, y + itemHeight)
          ctx.lineTo(x + itemWidth, y + itemHeight)
          ctx.lineTo(x + itemWidth, y)
          ctx.stroke()

          // Side face
          ctx.beginPath()
          ctx.moveTo(x + itemWidth, y)
          ctx.lineTo(x + itemWidth, y + itemHeight)
          ctx.lineTo(x + itemWidth + itemDepth / 2, y + itemHeight - itemDepth / 2)
          ctx.lineTo(x + itemWidth + itemDepth / 2, y + itemDepth / 2)
          ctx.stroke()

          ctx.setLineDash([])
        }
      })
    }
  }, [view, containerId, zoom, selectedItem, showItemDetails])

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
    ctx.moveTo(x, y)
    ctx.lineTo(x + width, y)
    ctx.lineTo(x + width + depth / 2, y + depth / 2)
    ctx.lineTo(x + depth / 2, y + depth / 2)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 1
    ctx.stroke()

    // Right face
    ctx.fillStyle = colorRight
    ctx.beginPath()
    ctx.moveTo(x + width, y)
    ctx.lineTo(x + width, y + height)
    ctx.lineTo(x + width + depth / 2, y + height - depth / 2)
    ctx.lineTo(x + width + depth / 2, y + depth / 2)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Left face
    ctx.fillStyle = colorLeft
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x, y + height)
    ctx.lineTo(x + depth / 2, y + height - depth / 2)
    ctx.lineTo(x + depth / 2, y + depth / 2)
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

  // Helper function to get priority color
  const getPriorityColor = (priority: number): string => {
    if (priority >= 90) return "#ef4444" // High priority
    if (priority >= 70) return "#f59e0b" // Medium priority
    return "#10b981" // Low priority
  }

  // Handle canvas click to select items
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Find the selected container
    const selectedContainer = containers.find((c) => c.id === containerId)
    if (!selectedContainer) return

    // Set scale factor for zoom
    const scale = zoom * 2

    // Calculate offset to center the container
    const containerWidth = selectedContainer.width * scale
    const containerDepth = selectedContainer.depth * scale
    const offsetX = (canvas.width - containerWidth) / 2
    const offsetY = (canvas.height - containerDepth) / 2

    // Check if click is on an item
    let clickedItem = null

    if (view === "2d") {
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i]
        const itemX = offsetX + item.position.x * scale
        const itemY = offsetY + item.position.z * scale
        const itemWidth = item.width * scale
        const itemHeight = item.depth * scale

        if (x >= itemX && x <= itemX + itemWidth && y >= itemY && y <= itemY + itemHeight) {
          clickedItem = item.id
          break
        }
      }
    }

    // Toggle selection
    if (clickedItem === selectedItem) {
      setSelectedItem(null)
    } else {
      setSelectedItem(clickedItem)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Tabs value={view} onValueChange={(value) => setView(value as "3d" | "2d")}>
          <TabsList>
            <TabsTrigger value="2d">2D View</TabsTrigger>
            <TabsTrigger value="3d">3D View</TabsTrigger>
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

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowItemDetails(!showItemDetails)}
                className={showItemDetails ? "bg-muted" : ""}
              >
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle item details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative h-[350px] w-full overflow-hidden rounded-lg border bg-background/30">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="h-full w-full cursor-pointer"
          onClick={handleCanvasClick}
        />

        {selectedItem && (
          <div className="absolute bottom-2 left-2 rounded-md bg-background/80 p-2 backdrop-blur">
            <p className="text-xs font-medium">Selected: {selectedItem}</p>
            <p className="text-xs text-muted-foreground">Click on items to select</p>
          </div>
        )}
      </div>

      <div className="text-xs text-muted-foreground">
        <p>Tip: Click on items to select them. Use the zoom controls to adjust the view.</p>
      </div>
    </div>
  )
}

