"use client"

import { useEffect, useRef } from "react"

export default function WorldView() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth - 20 // Adjust for padding
        canvas.height = 150
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Draw world map
    const drawWorldMap = () => {
      if (!ctx) return

      // Clear canvas
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = "#0f3320"
      ctx.lineWidth = 0.5

      // Horizontal grid lines
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw simplified world map
      ctx.strokeStyle = "#33ff33"
      ctx.lineWidth = 1
      ctx.beginPath()

      // Simplified continent outlines
      // North America
      ctx.moveTo(canvas.width * 0.1, canvas.height * 0.3)
      ctx.lineTo(canvas.width * 0.3, canvas.height * 0.2)
      ctx.lineTo(canvas.width * 0.3, canvas.height * 0.5)
      ctx.lineTo(canvas.width * 0.2, canvas.height * 0.6)

      // South America
      ctx.moveTo(canvas.width * 0.3, canvas.height * 0.5)
      ctx.lineTo(canvas.width * 0.35, canvas.height * 0.8)
      ctx.lineTo(canvas.width * 0.25, canvas.height * 0.9)
      ctx.lineTo(canvas.width * 0.2, canvas.height * 0.6)

      // Europe and Africa
      ctx.moveTo(canvas.width * 0.5, canvas.height * 0.2)
      ctx.lineTo(canvas.width * 0.55, canvas.height * 0.3)
      ctx.lineTo(canvas.width * 0.5, canvas.height * 0.7)
      ctx.lineTo(canvas.width * 0.45, canvas.height * 0.5)
      ctx.lineTo(canvas.width * 0.5, canvas.height * 0.2)

      // Asia
      ctx.moveTo(canvas.width * 0.5, canvas.height * 0.2)
      ctx.lineTo(canvas.width * 0.8, canvas.height * 0.2)
      ctx.lineTo(canvas.width * 0.8, canvas.height * 0.5)
      ctx.lineTo(canvas.width * 0.6, canvas.height * 0.6)
      ctx.lineTo(canvas.width * 0.5, canvas.height * 0.5)

      // Australia
      ctx.moveTo(canvas.width * 0.8, canvas.height * 0.6)
      ctx.lineTo(canvas.width * 0.9, canvas.height * 0.6)
      ctx.lineTo(canvas.width * 0.9, canvas.height * 0.7)
      ctx.lineTo(canvas.width * 0.8, canvas.height * 0.7)
      ctx.lineTo(canvas.width * 0.8, canvas.height * 0.6)

      ctx.stroke()

      // Simulate a moving dot (could represent user location or satellite)
      const time = Date.now() / 1000
      const x = (Math.sin(time) * 0.4 + 0.5) * canvas.width
      const y = (Math.cos(time * 0.7) * 0.3 + 0.5) * canvas.height

      ctx.fillStyle = "#33ff33"
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()

      // Draw a pulsing circle around the dot
      const pulseSize = (Math.sin(time * 3) * 0.5 + 0.5) * 15 + 5
      ctx.strokeStyle = "rgba(51, 255, 51, 0.5)"
      ctx.beginPath()
      ctx.arc(x, y, pulseSize, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Animation loop
    let animationFrame: number
    const animate = () => {
      drawWorldMap()
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="p-2 border border-green-800/30 rounded-md h-full">
      <h3 className="text-xs uppercase tracking-wider mb-2 text-green-500">World View</h3>
      <canvas ref={canvasRef} className="w-full rounded-sm" />
    </div>
  )
}
