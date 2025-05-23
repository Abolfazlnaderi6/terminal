"use client"

import { useState } from "react"
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react"

type FileItem = {
  name: string
  type: "file" | "folder"
  children?: FileItem[]
  expanded?: boolean
}

export default function FileExplorer() {
  const [files, setFiles] = useState<FileItem[]>([
    {
      name: "Documents",
      type: "folder",
      expanded: true,
      children: [
        { name: "Project.txt", type: "file" },
        { name: "Notes.md", type: "file" },
        {
          name: "Work",
          type: "folder",
          children: [
            { name: "Report.pdf", type: "file" },
            { name: "Presentation.pptx", type: "file" },
          ],
        },
      ],
    },
    {
      name: "Downloads",
      type: "folder",
      children: [
        { name: "image.png", type: "file" },
        { name: "archive.zip", type: "file" },
      ],
    },
    {
      name: "system",
      type: "folder",
      children: [
        { name: "config.json", type: "file" },
        { name: "logs.txt", type: "file" },
      ],
    },
  ])

  const toggleFolder = (path: number[]) => {
    const newFiles = [...files]
    let current = newFiles
    let target = null

    for (const index of path) {
      target = current[index]
      if (target.type === "folder") {
        if (index === path[path.length - 1]) {
          target.expanded = !target.expanded
        }
        current = target.children || []
      }
    }

    setFiles(newFiles)
  }

  const renderFileTree = (items: FileItem[], path: number[] = []) => {
    return items.map((item, index) => {
      const currentPath = [...path, index]

      return (
        <div key={`${item.name}-${index}`} className="ml-4">
          <div
            className="flex items-center py-1 cursor-pointer hover:text-green-300"
            onClick={() => item.type === "folder" && toggleFolder(currentPath)}
          >
            {item.type === "folder" ? (
              <>
                {item.expanded ? <ChevronDown className="w-3 h-3 mr-1" /> : <ChevronRight className="w-3 h-3 mr-1" />}
                <Folder className="w-4 h-4 mr-1" />
              </>
            ) : (
              <File className="w-4 h-4 mr-1" />
            )}
            <span className="text-xs">{item.name}</span>
          </div>

          {item.type === "folder" && item.expanded && item.children && (
            <div>{renderFileTree(item.children, currentPath)}</div>
          )}
        </div>
      )
    })
  }

  return (
    <div className="h-full p-2 overflow-auto">
      <h3 className="text-xs uppercase tracking-wider mb-1 text-green-500">File Explorer</h3>
      <div className="mt-1">{renderFileTree(files)}</div>
    </div>
  )
}
