"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface AsciiDisplayProps {
  art: string
  isActive: boolean
  delay?: number
}

export function AsciiDisplay({ art, isActive, delay = 0 }: AsciiDisplayProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setDisplayedText("")
      setCurrentIndex(0)
      return
    }

    const timer = setTimeout(() => {
      if (currentIndex < art.length) {
        setDisplayedText(art.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }
    }, 20)

    return () => clearTimeout(timer)
  }, [art, isActive, currentIndex])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.8,
        filter: isActive ? "blur(0px)" : "blur(4px)",
      }}
      transition={{ duration: 0.5, delay }}
      className="font-mono text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-purple-300 whitespace-pre leading-tight"
    >
      {displayedText}
      {isActive && currentIndex < art.length && <span className="animate-pulse text-purple-400">█</span>}
    </motion.div>
  )
}
