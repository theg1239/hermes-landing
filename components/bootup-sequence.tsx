"use client"

import { useState, useEffect } from "react"
import { asciiArt } from "@/lib/ascii-art"

interface BootupSequenceProps {
  onComplete?: () => void
}

export function BootupSequence({ onComplete }: BootupSequenceProps) {
  const [logoProgress, setLogoProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasCompletedFullCycle, setHasCompletedFullCycle] = useState(false)

  const bootSteps = [
    "SYSTEM INITIALIZATION...",
    "LOADING NEURAL PATHWAYS...", 
    "ESTABLISHING CONNECTIONS...",
    "HERMES NETWORK ONLINE",
  ]

  const asciiLogo = asciiArt.hermes.split('\n').filter(line => line.trim() !== '')

  const maxLength = Math.max(...asciiLogo.map(line => line.length))

  useEffect(() => {
    const logoTimer = setInterval(() => {
      setLogoProgress((prev) => {
        const nextProgress = (prev + 1) % (maxLength + 1)
        
        if (prev === maxLength && nextProgress === 0 && !hasCompletedFullCycle) {
          setHasCompletedFullCycle(true)
        }
        
        return nextProgress
      })
    }, 50)

    return () => clearInterval(logoTimer)
  }, [maxLength, hasCompletedFullCycle])

  useEffect(() => {
    if (hasCompletedFullCycle) {
      const completeTimer = setTimeout(() => {
        onComplete?.()
      }, 100)

      return () => clearTimeout(completeTimer)
    }
  }, [hasCompletedFullCycle, onComplete])

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % bootSteps.length)
    }, 1500)

    return () => clearInterval(stepTimer)
  }, [bootSteps.length])

  const getVisibleText = (line: string, progress: number) => {
    if (progress === 0) return ""
    const totalLength = line.length
    const visibleLength = Math.min(progress, totalLength)
    
    const charsPerSide = Math.floor(visibleLength / 2)
    const extraChar = visibleLength % 2
    
    const leftChars = charsPerSide + extraChar
    const rightChars = charsPerSide
    
    const leftPart = line.slice(0, leftChars)
    const rightPart = rightChars > 0 ? line.slice(-rightChars) : ""
    
    const middleSpacing = totalLength - leftChars - rightChars
    const middlePart = " ".repeat(middleSpacing)
    
    return leftPart + middlePart + rightPart
  }

  return (
    <div className="bootup-screen">
      <div className="bootup-content">
        <div className="ascii-logo">
          {asciiLogo.map((line, index) => (
            <div key={index} className="ascii-line-centered">
              <span className="ascii-visible">
                {getVisibleText(line, logoProgress)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
