"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff, Activity } from "lucide-react"

export default function NetworkStatus() {
  const [online, setOnline] = useState(true)
  const [latency, setLatency] = useState<number | null>(null)
  const [networkActivity, setNetworkActivity] = useState(0)

  useEffect(() => {
    // Check online status
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Simulate latency check
    const checkLatency = () => {
      const start = Date.now()

      fetch("https://www.google.com", { mode: "no-cors", cache: "no-store" })
        .then(() => {
          const latencyValue = Date.now() - start
          setLatency(latencyValue)
        })
        .catch(() => {
          setLatency(null)
        })
    }

    // Simulate network activity
    const simulateActivity = () => {
      setNetworkActivity(Math.floor(Math.random() * 100))
    }

    const latencyInterval = setInterval(checkLatency, 5000)
    const activityInterval = setInterval(simulateActivity, 2000)

    // Initial checks
    checkLatency()
    simulateActivity()

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      clearInterval(latencyInterval)
      clearInterval(activityInterval)
    }
  }, [])

  return (
    <div className="p-2 border border-green-800/30 rounded-md">
      <h3 className="text-xs uppercase tracking-wider mb-2 text-green-500">Network Status</h3>

      <div className="flex items-center mb-2">
        {online ? <Wifi className="w-5 h-5 text-green-400 mr-2" /> : <WifiOff className="w-5 h-5 text-red-500 mr-2" />}
        <span>{online ? "Connected" : "Disconnected"}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <div className="text-green-300">Latency</div>
          <div>{latency !== null ? `${latency}ms` : "N/A"}</div>
        </div>
        <div>
          <div className="text-green-300">Activity</div>
          <div className="flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            <div className="w-full bg-green-900/30 h-1.5 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{ width: `${networkActivity}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
