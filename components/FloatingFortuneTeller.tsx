"use client"

import { useEffect, useState } from "react"

export default function FloatingFortuneTeller() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [direction, setDirection] = useState({ x: 1, y: 1 })

  useEffect(() => {
    // 初始化随机位置
    setPosition({
      x: Math.random() * (window.innerWidth - 120),
      y: Math.random() * (window.innerHeight - 120),
    })

    const moveFloat = () => {
      setPosition((prev) => {
        const speed = 0.5
        let newX = prev.x + direction.x * speed
        let newY = prev.y + direction.y * speed
        let newDirectionX = direction.x
        let newDirectionY = direction.y

        // 边界检测和反弹
        if (newX <= 0 || newX >= window.innerWidth - 120) {
          newDirectionX = -direction.x
          newX = Math.max(0, Math.min(window.innerWidth - 120, newX))
        }
        if (newY <= 0 || newY >= window.innerHeight - 120) {
          newDirectionY = -direction.y
          newY = Math.max(0, Math.min(window.innerHeight - 120, newY))
        }

        // 更新方向
        if (newDirectionX !== direction.x || newDirectionY !== direction.y) {
          setDirection({ x: newDirectionX, y: newDirectionY })
        }

        return { x: newX, y: newY }
      })
    }

    const interval = setInterval(moveFloat, 16) // ~60fps

    return () => clearInterval(interval)
  }, [direction])

  return (
    <div
      className="fixed pointer-events-none z-20 transition-transform duration-100"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translateX(${Math.sin(Date.now() * 0.002) * 10}px) translateY(${Math.cos(Date.now() * 0.001) * 5}px)`,
      }}
    >
      <img
        src="/images/floating-fortune-teller.png"
        alt="漂浮的算卦大师"
        className="w-24 h-24 object-contain drop-shadow-lg animate-pulse"
        style={{
          filter: "drop-shadow(0 0 10px rgba(255, 165, 0, 0.3))",
          animation: "float 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate",
        }}
      />
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes glow {
          0% { filter: drop-shadow(0 0 5px rgba(255, 165, 0, 0.3)); }
          100% { filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.6)); }
        }
      `}</style>
    </div>
  )
}
