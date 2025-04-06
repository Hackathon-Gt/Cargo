import { NextResponse } from "next/server"

// Mock data for items
const items = [
  {
    id: "001",
    name: "Food Packet",
    width: 10,
    depth: 10,
    height: 20,
    position: { x: 10, y: 150, z: 20 },
    color: "#4CAF50",
    priority: 80,
    containerId: "contA",
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
    containerId: "contA",
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
    containerId: "contA",
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
    containerId: "contA",
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
    containerId: "contA",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const containerId = searchParams.get("containerId")

  if (containerId) {
    return NextResponse.json(items.filter((item) => item.containerId === containerId))
  }

  return NextResponse.json(items)
}

export async function POST(request: Request) {
  const item = await request.json()

  // In a real implementation, this would validate and save to a database
  return NextResponse.json({ success: true, item })
}

export async function PUT(request: Request) {
  const updatedItem = await request.json()

  // In a real implementation, this would update the item in a database
  return NextResponse.json({ success: true, item: updatedItem })
}

