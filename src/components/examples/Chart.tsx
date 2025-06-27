"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface DataPoint {
  label: string
  value: number
  color?: string
}

interface ChartProps {
  data: DataPoint[]
  type?: "bar" | "line" | "pie"
  title?: string
  width?: number
  height?: number
}

export const Chart: React.FC<ChartProps> = ({ data, type = "bar", title, width = 400, height = 300 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw based on chart type
    switch (type) {
      case "bar":
        drawBarChart(ctx, data, width, height)
        break
      case "line":
        drawLineChart(ctx, data, width, height)
        break
      case "pie":
        drawPieChart(ctx, data, width, height)
        break
    }
  }, [data, type, width, height])

  const drawBarChart = (ctx: CanvasRenderingContext2D, data: DataPoint[], w: number, h: number) => {
    const padding = 40
    const chartWidth = w - padding * 2
    const chartHeight = h - padding * 2
    const barWidth = (chartWidth / data.length) * 0.8
    const maxValue = Math.max(...data.map((d) => d.value))

    data.forEach((point, index) => {
      const barHeight = (point.value / maxValue) * chartHeight
      const x = padding + (index * chartWidth) / data.length + (chartWidth / data.length - barWidth) / 2
      const y = h - padding - barHeight

      // Draw bar
      ctx.fillStyle = point.color || "#3b82f6"
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw label
      ctx.fillStyle = "#374151"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(point.label, x + barWidth / 2, h - padding + 15)

      // Draw value
      ctx.fillText(point.value.toString(), x + barWidth / 2, y - 5)
    })
  }

  const drawLineChart = (ctx: CanvasRenderingContext2D, data: DataPoint[], w: number, h: number) => {
    const padding = 40
    const chartWidth = w - padding * 2
    const chartHeight = h - padding * 2
    const maxValue = Math.max(...data.map((d) => d.value))

    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.beginPath()

    data.forEach((point, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth
      const y = h - padding - (point.value / maxValue) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      // Draw point
      ctx.fillStyle = "#3b82f6"
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    })

    ctx.stroke()
  }

  const drawPieChart = (ctx: CanvasRenderingContext2D, data: DataPoint[], w: number, h: number) => {
    const centerX = w / 2
    const centerY = h / 2
    const radius = Math.min(w, h) / 2 - 20
    const total = data.reduce((sum, point) => sum + point.value, 0)

    let currentAngle = -Math.PI / 2

    data.forEach((point, index) => {
      const sliceAngle = (point.value / total) * Math.PI * 2

      ctx.fillStyle = point.color || `hsl(${(index * 360) / data.length}, 70%, 50%)`
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.closePath()
      ctx.fill()

      // Draw label
      const labelAngle = currentAngle + sliceAngle / 2
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)

      ctx.fillStyle = "#ffffff"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(point.label, labelX, labelY)

      currentAngle += sliceAngle
    })
  }

  return (
    <div className="chart-container bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">{title}</h3>}
      <canvas ref={canvasRef} className="max-w-full h-auto" style={{ width: "100%", height: "auto" }} />
    </div>
  )
}
