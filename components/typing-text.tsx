"use client"

import { useState, useEffect } from "react"

interface TypingTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

export function TypingText({ text, speed = 50, delay = 0, className = "", onComplete }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(delayTimer)
    } else {
      setStarted(true)
    }
  }, [delay])

  useEffect(() => {
    if (!started) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [text, currentIndex, speed, started, onComplete])

  return (
    <span className={className}>
      {displayedText}
      {started && currentIndex < text.length && <span className="terminal-cursor">█</span>}
    </span>
  )
}
