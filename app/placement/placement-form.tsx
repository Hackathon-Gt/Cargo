"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function PlacementForm() {
  const [items, setItems] = useState([{ id: 1, name: "", width: 0, depth: 0, height: 0, priority: 50, zone: "" }])

  const addItem = () => {
    setItems([...items, { id: items.length + 1, name: "", width: 0, depth: 0, height: 0, priority: 50, zone: "" }])
  }

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const updateItem = (id: number, field: string, value: any) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This would call the API in a real implementation
    console.log("Submitting items for placement:", items)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor={`item-name-${item.id}`}>Item Name</Label>
                <Input
                  id={`item-name-${item.id}`}
                  value={item.name}
                  onChange={(e) => updateItem(item.id, "name", e.target.value)}
                  placeholder="Food Packet"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`item-width-${item.id}`}>Width (cm)</Label>
                <Input
                  id={`item-width-${item.id}`}
                  type="number"
                  value={item.width || ""}
                  onChange={(e) => updateItem(item.id, "width", Number(e.target.value))}
                  placeholder="10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`item-depth-${item.id}`}>Depth (cm)</Label>
                <Input
                  id={`item-depth-${item.id}`}
                  type="number"
                  value={item.depth || ""}
                  onChange={(e) => updateItem(item.id, "depth", Number(e.target.value))}
                  placeholder="10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`item-height-${item.id}`}>Height (cm)</Label>
                <Input
                  id={`item-height-${item.id}`}
                  type="number"
                  value={item.height || ""}
                  onChange={(e) => updateItem(item.id, "height", Number(e.target.value))}
                  placeholder="20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`item-priority-${item.id}`}>Priority ({item.priority})</Label>
                <Slider
                  id={`item-priority-${item.id}`}
                  min={1}
                  max={100}
                  step={1}
                  value={[item.priority]}
                  onValueChange={(value) => updateItem(item.id, "priority", value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`item-zone-${item.id}`}>Preferred Zone</Label>
                <Select value={item.zone} onValueChange={(value) => updateItem(item.id, "zone", value)}>
                  <SelectTrigger id={`item-zone-${item.id}`}>
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crew-quarters">Crew Quarters</SelectItem>
                    <SelectItem value="airlock">Airlock</SelectItem>
                    <SelectItem value="laboratory">Laboratory</SelectItem>
                    <SelectItem value="medical-bay">Medical Bay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeItem(item.id)}
                disabled={items.length <= 1}
              >
                Remove Item
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={addItem}>
          Add Another Item
        </Button>
        <Button type="submit">Get Placement Recommendations</Button>
      </div>
    </form>
  )
}

