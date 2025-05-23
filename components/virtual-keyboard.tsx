"use client"

import { useState } from "react"

export default function VirtualKeyboard() {
  const [activeKey, setActiveKey] = useState<string | null>(null)

  const keyboardRows = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "BKSP"],
    ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["CAPS", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "ENTER"],
    ["SHIFT", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "SHIFT"],
    ["CTRL", "ALT", "SPACE", "ALT", "CTRL"],
  ]

  const getKeyWidth = (key: string) => {
    switch (key) {
      case "BKSP":
        return "w-16"
      case "TAB":
        return "w-14"
      case "CAPS":
        return "w-16"
      case "ENTER":
        return "w-16"
      case "SHIFT":
        return "w-[4.5rem]"
      case "CTRL":
      case "ALT":
        return "w-12"
      case "SPACE":
        return "w-[18rem]"
      default:
        return "w-10"
    }
  }

  const handleKeyPress = (key: string) => {
    setActiveKey(key)
    setTimeout(() => setActiveKey(null), 150)
  }

  return (
    <div className="h-full p-2 overflow-hidden">
      <h3 className="text-xs uppercase tracking-wider mb-1 text-green-500">Virtual Keyboard</h3>
      <div className="flex flex-col gap-1 items-center justify-center h-[calc(100%-1.5rem)]">
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 w-full justify-center">
            {row.map((key) => (
              <button
                key={key}
                className={`${getKeyWidth(key)} h-8 rounded flex items-center justify-center text-xs border border-green-800/50 transition-colors ${
                  activeKey === key ? "bg-green-800 text-black" : "bg-black/50 hover:bg-green-900/30"
                }`}
                onClick={() => handleKeyPress(key)}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
