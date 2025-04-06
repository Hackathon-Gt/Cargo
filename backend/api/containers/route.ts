import { NextResponse } from "next/server"

// Mock data for containers
const containers = [
  { id: "contA", name: "Container A - Crew Quarters", width: 100, depth: 85, height: 200 },
  { id: "contB", name: "Container B - Airlock", width: 50, depth: 85, height: 200 },
  { id: "contC", name: "Container C - Laboratory", width: 200, depth: 85, height: 200 },
  { id: "contD", name: "Container D - Medical Bay", width: 120, depth: 60, height: 150 },
]

export async function GET() {
  return NextResponse.json(containers)
}

export async function POST(request: Request) {
  const container = await request.json()

  // In a real implementation, this would validate and save to a database
  return NextResponse.json({ success: true, container })
}

