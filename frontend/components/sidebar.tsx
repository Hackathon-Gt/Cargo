"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Box,
  Calendar,
  ClipboardList,
  Home,
  Package,
  Settings,
  Trash2,
  Upload,
  Rocket,
  Layers,
  Shield,
  UserCheck,
} from "lucide-react"
import { useUser } from "@/frontend/context/user-context"

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { userRole, userName } = useUser()

  const commanderNavItems = [
    { name: "Mission Control", href: "/", icon: Rocket },
    { name: "Placement", href: "/placement", icon: Package },
    { name: "Search & Retrieval", href: "/search", icon: Box },
    { name: "Waste Management", href: "/waste", icon: Trash2 },
    { name: "Time Simulation", href: "/simulation", icon: Calendar },
    { name: "Import & Export", href: "/import-export", icon: Upload },
    { name: "Logs", href: "/logs", icon: ClipboardList },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const astronautNavItems = [
    { name: "Dashboard", href: "/astronaut", icon: Home },
    { name: "Search & Retrieval", href: "/search", icon: Box },
    { name: "Placement", href: "/placement", icon: Package },
    { name: "Waste Management", href: "/waste", icon: Trash2 },
    { name: "Logs", href: "/logs", icon: ClipboardList },
  ]

  const navItems = userRole === "commander" ? commanderNavItems : astronautNavItems

  return (
    <div
      className={cn(
        "z-20 flex h-full flex-col border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center border-b border-border/40 px-3 py-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-space-blue" />
            <h2 className="text-lg font-bold tracking-tight text-space-blue glow-text">ISS CARGO</h2>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto", collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Layers className="h-5 w-5 text-space-blue" /> : <Layers className="h-5 w-5 text-space-blue" />}
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                collapsed && "justify-center px-0",
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t border-border/40 p-2">
        <div
          className={cn(
            "flex h-10 items-center rounded-md px-3 text-sm font-medium text-muted-foreground",
            collapsed && "justify-center px-0",
          )}
        >
          {userRole === "commander" ? (
            <Shield className={cn("h-5 w-5 text-space-blue", collapsed ? "mr-0" : "mr-2")} />
          ) : (
            <UserCheck className={cn("h-5 w-5 text-green-500", collapsed ? "mr-0" : "mr-2")} />
          )}
          {!collapsed && <span>{userRole === "commander" ? "Commander" : `Astronaut ${userName}`}</span>}
        </div>
      </div>
    </div>
  )
}

