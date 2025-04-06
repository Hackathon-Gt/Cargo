"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ImportForm() {
  const [itemsFile, setItemsFile] = useState<File | null>(null)
  const [containersFile, setContainersFile] = useState<File | null>(null)
  const [importResults, setImportResults] = useState<{
    success: boolean
    itemsImported?: number
    containersImported?: number
    errors?: { row: number; message: string }[]
  } | null>(null)

  const handleItemsFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setItemsFile(e.target.files[0])
    }
  }

  const handleContainersFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setContainersFile(e.target.files[0])
    }
  }

  const handleImportItems = () => {
    // This would call the API in a real implementation
    console.log("Importing items:", itemsFile)

    // Mock response
    setImportResults({
      success: true,
      itemsImported: 15,
      errors: [
        { row: 3, message: "Invalid priority value" },
        { row: 7, message: "Missing expiry date" },
      ],
    })
  }

  const handleImportContainers = () => {
    // This would call the API in a real implementation
    console.log("Importing containers:", containersFile)

    // Mock response
    setImportResults({
      success: true,
      containersImported: 5,
      errors: [],
    })
  }

  return (
    <Tabs defaultValue="items">
      <TabsList>
        <TabsTrigger value="items">Import Items</TabsTrigger>
        <TabsTrigger value="containers">Import Containers</TabsTrigger>
      </TabsList>

      <TabsContent value="items" className="space-y-4">
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Upload className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Upload items CSV file</p>
              <p className="text-xs text-muted-foreground">
                CSV file should contain item details including ID, name, dimensions, priority, etc.
              </p>
            </div>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              id="items-file-upload"
              onChange={handleItemsFileChange}
            />
            <label htmlFor="items-file-upload">
              <Button variant="outline" className="cursor-pointer">
                Choose File
              </Button>
            </label>
          </div>

          {itemsFile && (
            <div className="mt-4 text-center">
              <p className="text-sm font-medium">{itemsFile.name}</p>
              <p className="text-xs text-muted-foreground">{(itemsFile.size / 1024).toFixed(2)} KB</p>
              <Button className="mt-2" onClick={handleImportItems}>
                Import Items
              </Button>
            </div>
          )}
        </div>

        {importResults && importResults.itemsImported !== undefined && (
          <Alert variant={importResults.success ? "default" : "destructive"}>
            <AlertTitle>{importResults.success ? "Import Successful" : "Import Failed"}</AlertTitle>
            <AlertDescription>
              {importResults.success ? (
                <p>Successfully imported {importResults.itemsImported} items.</p>
              ) : (
                <p>Failed to import items. Please check the file format and try again.</p>
              )}

              {importResults.errors && importResults.errors.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium">Errors:</p>
                  <ul className="ml-4 list-disc">
                    {importResults.errors.map((error, index) => (
                      <li key={index} className="text-sm">
                        Row {error.row}: {error.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
      </TabsContent>

      <TabsContent value="containers" className="space-y-4">
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Upload className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Upload containers CSV file</p>
              <p className="text-xs text-muted-foreground">
                CSV file should contain container details including ID, zone, dimensions, etc.
              </p>
            </div>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              id="containers-file-upload"
              onChange={handleContainersFileChange}
            />
            <label htmlFor="containers-file-upload">
              <Button variant="outline" className="cursor-pointer">
                Choose File
              </Button>
            </label>
          </div>

          {containersFile && (
            <div className="mt-4 text-center">
              <p className="text-sm font-medium">{containersFile.name}</p>
              <p className="text-xs text-muted-foreground">{(containersFile.size / 1024).toFixed(2)} KB</p>
              <Button className="mt-2" onClick={handleImportContainers}>
                Import Containers
              </Button>
            </div>
          )}
        </div>

        {importResults && importResults.containersImported !== undefined && (
          <Alert variant={importResults.success ? "default" : "destructive"}>
            <AlertTitle>{importResults.success ? "Import Successful" : "Import Failed"}</AlertTitle>
            <AlertDescription>
              {importResults.success ? (
                <p>Successfully imported {importResults.containersImported} containers.</p>
              ) : (
                <p>Failed to import containers. Please check the file format and try again.</p>
              )}

              {importResults.errors && importResults.errors.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium">Errors:</p>
                  <ul className="ml-4 list-disc">
                    {importResults.errors.map((error, index) => (
                      <li key={index} className="text-sm">
                        Row {error.row}: {error.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
      </TabsContent>
    </Tabs>
  )
}

