"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type UserRole = "commander" | "astronaut"

interface UserContextType {
  userRole: UserRole
  setUserRole: (role: UserRole) => void
  userName: string
  setUserName: (name: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>("commander")
  // Change the userName state to remove the default name for commander
  const [userName, setUserName] = useState<string>(userRole === "commander" ? "" : "Smith")

  return (
    <UserContext.Provider value={{ userRole, setUserRole, userName, setUserName }}>{children}</UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

