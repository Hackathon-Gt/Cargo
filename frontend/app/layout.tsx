import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/frontend/components/theme-provider"
import Sidebar from "@/frontend/components/sidebar"
import Header from "@/frontend/components/header"
import SpaceBackground from "@/frontend/components/space-background"
import { UserProvider } from "@/frontend/context/user-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })

export const metadata: Metadata = {
  title: "ISS Cargo Management System",
  description: "Advanced cargo management system for the International Space Station",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <UserProvider>
            <div className="relative min-h-screen">
              <SpaceBackground />
              <div className="relative flex h-screen overflow-hidden">
                <Sidebar />
                <div className="flex flex-1 flex-col">
                  <Header />
                  <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
                </div>
              </div>
            </div>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

