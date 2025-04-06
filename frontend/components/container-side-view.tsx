"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RotateCw, ZoomIn, ZoomOut, Info, Move } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useUser } from "@/frontend/context/user-context"

interface ContainerSideViewProps {
  containerId?: string
}

export default function ContainerSideView({ containerId = "contA" }: ContainerSideViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [view, setView] = useState<"side" | "front">("side")
  const [zoom, setZoom] = useState<number>(1)
  const [showItemDetails, setShowItemDetails] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const { userRole } = useUser()

  // This would be fetched from the API in a real implementation
  const containers = [
    { id: "contA", name: "Container A - Crew Quarters", width: 100, depth: 85, height: 200 },
    { id: "contB", name: "Container B - Airlock", width: 50, depth: 85, height: 200 },
    { id: "contC", name: "Container C - Laboratory", width: 200, depth: 85, height: 200 },
    { id: "contD", name: "Container D - Medical Bay", width: 120, depth: 60, height: 150 },
  ]

  // Mock data for items in the container
  const [items, setItems] = useState([
    {
      id: "001",
      name: "Food Packet",
      width: 10,
      depth: 10,
      height: 20,
      position: { x: 10, y: 150, z: 20 },
      color: "#4CAF50",
      priority: 80,
    },
    {
      id: "002",
      name: "Oxygen Cylinder",
      width: 15,
      depth: 15,
      height: 50,
      position: { x: 30, y: 130, z: 20 },
      color: "#2196F3",
      priority: 95,
    },
    {
      id: "003",
      name: "First Aid Kit",
      width: 20,
      depth: 20,
      height: 10,
      position: { x: 60, y: 170, z: 30 },
      color: "#F44336",
      priority: 90,
    },
    {
      id: "004",
      name: "Tool Box",
      width: 25,
      depth: 15,
      height: 15,
      position: { x: 50, y: 150, z: 50 },
      color: "#FF9800",
      priority: 70,
    },
    {
      id: "005",
      name: "Water Filter",
      width: 15,
      depth: 15,
      height: 30,
      position: { x: 80, y: 140, z: 20 },
      color: "#00BCD4",
      priority: 85,
    },
  ])

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

    // Find the selected container
    const selectedContainer = containers.find((c) => c.id === containerId)
    if (!selectedContainer) return

    // Set scale factor for zoom
    const scale = zoom

    // Calculate container dimensions
    const containerWidth = selectedContainer.width * scale
    const containerHeight = selectedContainer.height * scale

    // Calculate offset to center the container
    const offsetX = (canvas.width - containerWidth) / 2
    const offsetY = (canvas.height - containerHeight) / 2

    if (view === "side") {
      // Draw container background
      ctx.fillStyle = "#1e293b"
      ctx.fillRect(offsetX, offsetY, containerWidth, containerHeight)

      // Draw grid
      ctx.strokeStyle = "#334155"
      ctx.lineWidth = 0.5

      // Vertical grid lines
      for (let x = 0; x <= containerWidth; x += 10 * scale) {
        ctx.beginPath()
        ctx.moveTo(offsetX + x, offsetY)
        ctx.lineTo(offsetX + x, offsetY + containerHeight)
        ctx.stroke()
      }

      // Horizontal grid lines
      for (let y = 0; y <= containerHeight; y += 10 * scale) {
        ctx.beginPath()
        ctx.moveTo(offsetX, offsetY + y)
        ctx.lineTo(offsetX + containerWidth, offsetY + y)
        ctx.stroke()
      }

      // Draw container border
      ctx.strokeStyle = "#64D9FF"
      ctx.lineWidth = 2
      ctx.strokeRect(offsetX, offsetY, containerWidth, containerHeight)

      // Draw items (side view - showing width and height)
      items.forEach((item) => {
        // Calculate item position and dimensions
        const itemX = offsetX + item.position.x * scale
        const itemY = offsetY + item.position.y * scale
        const itemWidth = item.width * scale
        const itemHeight = item.height * scale

        // Draw item background with priority-based opacity
        const priorityOpacity = 0.4 + (item.priority / 100) * 0.6
        ctx.fillStyle = hexToRgba(item.color, priorityOpacity)
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
          const itemY = offsetY + item.position.y * scale
          const itemWidth = item.width * scale
          const itemHeight = item.height * scale

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
    } else if (view === "front") {
      // Draw container background
      ctx.fillStyle = "#1e293b"
      ctx.fillRect(offsetX, offsetY, containerWidth, containerHeight)

      // Draw grid
      ctx.strokeStyle = "#334155"
      ctx.lineWidth = 0.5

      // Vertical grid lines
      for (let x = 0; x <= containerWidth; x += 10 * scale) {
        ctx.beginPath()
        ctx.moveTo(offsetX + x, offsetY)
        ctx.lineTo(offsetX + x, offsetY + containerHeight)
        ctx.stroke()
      }

      // Horizontal grid lines
      for (let y = 0; y <= containerHeight; y += 10 * scale) {
        ctx.beginPath()
        ctx.moveTo(offsetX, offsetY + y)
        ctx.lineTo(offsetX + containerWidth, offsetY + y)
        ctx.stroke()
      }

      // Draw container border
      ctx.strokeStyle = "#64D9FF"
      ctx.lineWidth = 2
      ctx.strokeRect(offsetX, offsetY, containerWidth, containerHeight)

      // Draw items (front view - showing width and height)
      items.forEach((item) => {
        // Calculate item position and dimensions
        const itemX = offsetX + item.position.x * scale
        const itemY = offsetY + item.position.y * scale
        const itemWidth = item.width * scale
        const itemDepth = item.depth * scale

        // Draw item background with priority-based opacity
        const priorityOpacity = 0.4 + (item.priority / 100) * 0.6
        ctx.fillStyle = hexToRgba(item.color, priorityOpacity)
        ctx.fillRect(itemX, itemY, itemWidth, itemDepth)

        // Draw item border
        ctx.strokeStyle = item.color
        ctx.lineWidth = 2
        ctx.strokeRect(itemX, itemY, itemWidth, itemDepth)

        // Draw item label
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 12px Inter"
        ctx.textAlign = "center"
        ctx.fillText(item.id, itemX + itemWidth / 2, itemY + itemDepth / 2 + 5)

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
          const itemY = offsetY + item.position.y * scale
          const itemWidth = item.width * scale
          const itemDepth = item.depth * scale

          // Draw highlight
          ctx.strokeStyle = "#ffffff"
          ctx.lineWidth = 3
          ctx.setLineDash([5, 3])
          ctx.strokeRect(itemX - 2, itemY - 2, itemWidth + 4, itemDepth + 4)
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
    }

    // Draw dragging item with transparency if dragging
    if (isDragging && draggedItem) {
      const item = items.find((i) => i.id === draggedItem)
      if (item) {
        const mousePos = dragStartPos
        const itemWidth = item.width * scale
        const itemHeight = (view === "side" ? item.height : item.depth) * scale

        // Draw item with transparency
        ctx.globalAlpha = 0.6
        ctx.fillStyle = hexToRgba(item.color, 0.7)
        ctx.fillRect(mousePos.x - itemWidth / 2, mousePos.y - itemHeight / 2, itemWidth, itemHeight)

        // Draw item border
        ctx.strokeStyle = item.color
        ctx.lineWidth = 2
        ctx.strokeRect(mousePos.x - itemWidth / 2, mousePos.y - itemHeight / 2, itemWidth, itemHeight)

        // Reset transparency
        ctx.globalAlpha = 1.0
      }
    }
  }, [view, containerId, zoom, selectedItem, showItemDetails, items, isDragging, draggedItem, dragStartPos])

  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  // Helper function to get priority color
  const getPriorityColor = (priority: number): string => {
    if (priority >= 90) return "#ef4444" // High priority
    if (priority >= 70) return "#f59e0b" // Medium priority
    return "#10b981" // Low priority
  }

  // Handle canvas click to select items
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Find the selected container
    const selectedContainer = containers.find((c) => c.id === containerId)
    if (!selectedContainer) return

    // Set scale factor for zoom
    const scale = zoom

    // Calculate container dimensions
    const containerWidth = selectedContainer.width * scale
    const containerHeight = selectedContainer.height * scale

    // Calculate offset to center the container
    const offsetX = (canvas.width - containerWidth) / 2
    const offsetY = (canvas.height - containerHeight) / 2

    // Check if click is on an item
    let clickedItem = null

    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i]
      const itemX = offsetX + item.position.x * scale
      const itemY = offsetY + item.position.y * scale
      const itemWidth = item.width * scale
      const itemHeight = (view === "side" ? item.height : item.depth) * scale

      if (x >= itemX && x <= itemX + itemWidth && y >= itemY && y <= itemY + itemHeight) {
        clickedItem = item.id
        break
      }
    }

    // Toggle selection
    if (clickedItem === selectedItem) {
      setSelectedItem(null)
    } else {
      setSelectedItem(clickedItem)
    }
  }

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (userRole !== "commander" || !selectedItem) return

    setIsDragging(true)
    setDraggedItem(selectedItem)
    setDragStartPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
  }

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !draggedItem) return

    setDragStartPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
  }

  // Handle mouse up for dropping
  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !draggedItem) return

    const canvas = canvasRef.current
    if (!canvas) return

    // Find the selected container
    const selectedContainer = containers.find((c) => c.id === containerId)
    if (!selectedContainer) return

    // Set scale factor for zoom
    const scale = zoom

    // Calculate container dimensions
    const containerWidth = selectedContainer.width * scale
    const containerHeight = selectedContainer.height * scale

    // Calculate offset to center the container
    const offsetX = (canvas.width - containerWidth) / 2
    const offsetY = (canvas.height - containerHeight) / 2

    // Calculate new position
    const mouseX = e.nativeEvent.offsetX
    const mouseY = e.nativeEvent.offsetY

    // Check if within container bounds
    if (
      mouseX >= offsetX &&
      mouseX <= offsetX + containerWidth &&
      mouseY >= offsetY &&
      mouseY <= offsetY + containerHeight
    ) {
      // Update item position
      const newX = Math.floor((mouseX - offsetX) / scale)
      const newY = Math.floor((mouseY - offsetY) / scale)

      setItems(
        items.map((item) =>
          item.id === draggedItem ? { ...item, position: { ...item.position, x: newX, y: newY } } : item,
        ),
      )
    }

    setIsDragging(false)
    setDraggedItem(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Tabs value={view} onValueChange={(value) => setView(value as "side" | "front")}>
          <TabsList>
            <TabsTrigger value="side">Side View</TabsTrigger>
            <TabsTrigger value="front">Front View</TabsTrigger>
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

        {userRole === "commander" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="ml-auto">
                  <Move className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select and drag items to reposition</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="relative h-[350px] w-full overflow-hidden rounded-lg border bg-background/30">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="h-full w-full cursor-pointer"
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            setIsDragging(false)
            setDraggedItem(null)
          }}
        />

        {selectedItem && (
          <div className="absolute bottom-2 left-2 rounded-md bg-background/80 p-2 backdrop-blur">
            <p className="text-xs font-medium">Selected: {selectedItem}</p>
            <p className="text-xs text-muted-foreground">
              {userRole === "commander" ? "Click and drag to move items" : "Click on items to select"}
            </p>
          </div>
        )}
      </div>

      <div className="text-xs text-muted-foreground">
        <p>
          {userRole === "commander"
            ? "Tip: Select an item and drag to reposition. Items are color-coded by priority."
            : "Tip: Click on items to view details. Items are color-coded by priority."}
        </p>
      </div>
    </div>
  )
}

