"use client"

import { Minus, Square, X } from "lucide-react"

export default function TitleBar() {
  const handleMinimize = () => {
    if (typeof window !== "undefined" && window.electronAPI) {
      // Add minimize functionality
    }
  }

  const handleMaximize = () => {
    if (typeof window !== "undefined" && window.electronAPI) {
      // Add maximize functionality
    }
  }

  const handleClose = () => {
    if (typeof window !== "undefined" && window.electronAPI) {
      // Add close functionality
    }
  }

  return (
    <div className="h-8 bg-gray-900 flex items-center justify-between px-4 select-none drag-region">
      <div className="text-sm text-green-400 font-mono">EDEX Terminal v1.0.0</div>

      <div className="flex items-center space-x-2 no-drag">
        <button
          onClick={handleMinimize}
          className="w-6 h-6 rounded-full bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center"
        >
          <Minus className="w-3 h-3 text-black" />
        </button>
        <button
          onClick={handleMaximize}
          className="w-6 h-6 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center"
        >
          <Square className="w-3 h-3 text-black" />
        </button>
        <button
          onClick={handleClose}
          className="w-6 h-6 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center"
        >
          <X className="w-3 h-3 text-black" />
        </button>
      </div>
    </div>
  )
}
