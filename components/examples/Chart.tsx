"use client"

import type React from "react"
import { useRef, useEffect } from "react"

interface ChartProps {
  width?: number
  height?: number
}

const Chart: React.FC<ChartProps> = ({ width = 400, height = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Example drawing - replace with your actual chart logic
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "lightblue"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "black"
    ctx.font = "20px Arial"
    ctx.fillText("Sample Chart", 20, 30)

    // Example using an image
    const logo = new Image()
    logo.crossOrigin = "anonymous"
    logo.src = "https://via.placeholder.com/50" // Replace with your image URL
    logo.onload = () => {
      ctx.drawImage(logo, 20, 50)
    }

    const bg = new Image()
    bg.crossOrigin = "anonymous"
    bg.src = "https://via.placeholder.com/350x150"
    bg.onload = () => {
      ctx.globalAlpha = 0.3
      ctx.drawImage(bg, 50, 50, 300, 100)
      ctx.globalAlpha = 1
    }
  }, [width, height])

  return <canvas ref={canvasRef} width={width} height={height} style={{ border: "1px solid black" }} />
}

export default Chart
