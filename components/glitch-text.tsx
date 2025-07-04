"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface GlitchTextProps {
  text: string
  isActive: boolean
  className?: string
}

export function GlitchText({ text, isActive, className = "" }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    if (!isActive) return

    const glitchInterval = setInterval(() => {
      setIsGlitching(true)

      // Create glitch effect
      const glitched = text
        .split("")
        .map((char, index) => {
          if (Math.random() < 0.1) {
            const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          }
          return char
        })
        .join("")

      setGlitchText(glitched)

      setTimeout(() => {
        setGlitchText(text)
        setIsGlitching(false)
      }, 100)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [text, isActive])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
      className={`font-mono ${className} ${isGlitching ? "text-red-400" : "text-purple-300"}`}
    >
      {glitchText}
    </motion.div>
  )
}
