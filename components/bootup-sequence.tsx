"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface BootupSequenceProps {
  onComplete: () => void
}

export function BootupSequence({ onComplete }: BootupSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const bootSteps = [
    "SYSTEM INITIALIZATION...",
    "LOADING NEURAL PATHWAYS...",
    "ESTABLISHING CONNECTIONS...",
    "HERMES NETWORK ONLINE",
  ]

  const asciiLogo = [
    "██╗  ██╗███████╗██████╗ ███╗   ███╗███████╗███████╗",
    "██║  ██║██╔════╝██╔══██╗████╗ ████║██╔════╝██╔════╝",
    "███████║█████╗  ██████╔╝██╔████╔██║█████╗  ███████╗",
    "██╔══██║██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══╝  ╚════██║",
    "██║  ██║███████╗██║  ██║██║ ╚═╝ ██║███████╗███████║",
    "╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 1000)
          return 100
        }
        return prev + 1.5
      })
    }, 80)

    return () => clearInterval(timer)
  }, [onComplete])

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % bootSteps.length)
    }, 1500)

    return () => clearInterval(stepTimer)
  }, [bootSteps.length])

  const getVisibleText = (line: string, progress: number) => {
    const totalChars = line.length
    const visibleChars = Math.floor((progress / 100) * totalChars)
    return line.slice(0, visibleChars)
  }

  return (
    <div className="bootup-screen">
      <div className="bootup-content">
        {/* ASCII Logo with Character-by-Character Loading */}
        <div className="ascii-logo">
          {asciiLogo.map((line, index) => (
            <div key={index} className="ascii-line-centered">
              <span className="ascii-visible">{getVisibleText(line, loadingProgress)}</span>
              <span className="ascii-cursor">
                {loadingProgress < 100 && getVisibleText(line, loadingProgress).length < line.length ? "█" : ""}
              </span>
            </div>
          ))}
        </div>

        {/* Loading Bar */}
        <div className="loading-section">
          <div className="loading-bar-container">
            <div className="loading-bar-bg">
              <motion.div
                className="loading-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
            <div className="loading-percentage">{Math.floor(loadingProgress)}%</div>
          </div>

          {/* Boot Messages */}
          <div className="boot-messages">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="boot-message"
            >
              {"> "}
              {bootSteps[currentStep]}
            </motion.div>
          </div>
        </div>

        {/* System Info */}
        <div className="system-info">
          <div>HERMES NEURAL INTERFACE v2.1.4</div>
          <div>Copyright (c) 2024 Neural Systems Corp.</div>
          <div>All rights reserved.</div>
        </div>
      </div>
    </div>
  )
}
