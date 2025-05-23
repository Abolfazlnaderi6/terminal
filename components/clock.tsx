"use client"

import { useState, useEffect } from "react"

export default function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <div className="p-2 border border-green-800/30 rounded-md mb-4">
      <h3 className="text-xs uppercase tracking-wider mb-2 text-green-500">System Time</h3>
      <div className="text-2xl font-bold mb-1">{formatTime(time)}</div>
      <div className="text-sm text-green-300">{formatDate(time)}</div>
    </div>
  )
}
