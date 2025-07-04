"use client"

import type React from "react"

import { useState } from "react"
import { Minus, Square, X } from "lucide-react"

interface TerminalWindowProps {
  title: string
  children: React.ReactNode
}

export function TerminalWindow({ title, children }: TerminalWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false)

  return (
    <div className="terminal-window">
      {/* Window Title Bar */}
      <div className="terminal-titlebar">
        <div className="terminal-title">{title}</div>
        <div className="terminal-controls">
          <button className="terminal-control minimize">
            <Minus size={12} />
          </button>
          <button className="terminal-control maximize" onClick={() => setIsMaximized(!isMaximized)}>
            <Square size={10} />
          </button>
          <button className="terminal-control close">
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="terminal-content">{children}</div>
    </div>
  )
}
