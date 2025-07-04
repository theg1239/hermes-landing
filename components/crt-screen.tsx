"use client"

import type { ReactNode } from "react"

interface CRTScreenProps {
  children: ReactNode
}

export function CRTScreen({ children }: CRTScreenProps) {
  return (
    <div className="crt-container">
      <div className="crt-screen">
        <div className="crt-content">{children}</div>
        <div className="crt-scanlines"></div>
        <div className="crt-flicker"></div>
      </div>
    </div>
  )
}
