"use client"

import { useState } from "react"
import Waves from "@/components/Waves"
import { Button } from "@/components/ui/button"
import DivinationChat from "@/components/DivinationChat"
import FloatingFortuneTeller from "@/components/FloatingFortuneTeller"
import { Twitter } from "lucide-react"

export default function WavesDemo() {
  const [config, setConfig] = useState({
    lineColor: "rgba(251, 146, 60, 0.5)",
    backgroundColor: "#7c2d12",
    waveSpeedX: 0.02,
    waveSpeedY: 0.005,
    waveAmpX: 50,
    waveAmpY: 10,
    xGap: 10,
    yGap: 32,
    friction: 0.925,
    tension: 0.005,
    maxCursorMove: 100,
  })

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Waves {...config} />

      {/* Twitter Icon in top right corner */}
      <div className="fixed top-3 right-3 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open("https://x.com/bonkdivinefun", "_blank")}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 backdrop-blur-sm"
          aria-label="Follow us on Twitter"
        >
          <Twitter className="h-5 w-5" />
        </Button>
      </div>

      {/* Floating Fortune Teller */}
      <FloatingFortuneTeller />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white pt-20">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            BonkDivine
          </h1>
          <p className="text-xl text-gray-300 mb-2">Combine Chinese divination culture with AI. </p>
          <p className="text-xl text-gray-300 mb-8">“卜” ON BONK </p>
          <p className="text-xl text-gray-300 mb-2">2WPiNJsEjAVU85NueTr1JxFUhnFDKMbneMTRurMYbonk </p>

          <div className="flex gap-4 justify-center mb-8">
            {/* X Button - Links to X.com */}
            <Button
              variant="outline"
              onClick={() => window.open("https://x.com/bonkdivinefun", "_blank")}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              X
            </Button>

            {/* Dex Screener Button - Links to DexScreener */}
            <Button
              variant="outline"
              onClick={() => window.open("https://dexscreener.com/solana/dar5hkw75dgs5mpoixw4bzxrxgwerybww6yw6ch37h72", "_blank")}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Dex Screener
            </Button>
          </div>

          {/* Add Fortune Teller Mascot Image */}
          <div className="mb-8 flex justify-center">
            <img
              src="/images/fortune-teller-mascot.png"
              alt="算卦大师"
              className="w-48 h-48 object-contain rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Add Divination Chat directly below the image */}
          <div className="mb-8">
            <DivinationChat />
          </div>
        </div>
      </div>
    </div>
  )
}
