"use client"

import { useEffect, useRef } from "react"

interface ChartProps {
  data?: Array<{ label: string; value: number }>
  type?: "bar" | "line" | "pie"
  width?: number
  height?: number
  title?: string
}

const defaultData = [
  { label: "API Calls", value: 1200 },
  { label: "Users", value: 800 },
  { label: "Deployments", value: 450 },
  { label: "Errors", value: 23 },
]

export function Chart({
  data = defaultData,
  type = "bar",
  width = 400,
  height = 300,
  title = "Platform Metrics",
}: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Set up drawing area
    const padding = 60
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Find max value for scaling
    const maxValue = Math.max(...data.map((d) => d.value))

    if (type === "bar") {
      const barWidth = chartWidth / data.length - 10

      data.forEach((item, index) => {
        const barHeight = (item.value / maxValue) * chartHeight
        const x = padding + index * (barWidth + 10)
        const y = height - padding - barHeight

        // Draw bar
        ctx.fillStyle = `hsl(${index * 60}, 70%, 50%)`
        ctx.fillRect(x, y, barWidth, barHeight)

        // Draw label
        ctx.fillStyle = "#666"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(item.label, x + barWidth / 2, height - padding + 20)

        // Draw value
        ctx.fillStyle = "#333"
        ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5)
      })
    }

    // Draw axes
    ctx.strokeStyle = "#ccc"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()
  }, [data, type, width, height])

  return (
    <div className="p-6 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <canvas ref={canvasRef} width={width} height={height} className="border rounded" />
    </div>
  )
}
