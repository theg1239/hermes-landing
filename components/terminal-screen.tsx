"use client"

import type React from "react"

export function TerminalScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="crt-monitor">
      {/* CRT Bezel */}
      <div className="crt-bezel">
        {/* Screen Content */}
        <div className="crt-screen">{children}</div>
      </div>
    </div>
  )
}
