"use client"

import { useState, useEffect } from "react"
import { TypingText } from "./typing-text"

export function ManPage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="man-page">
      {showContent && (
        <>
          {/* Header */}
          <div className="man-header">
            <span className="man-section">HERMES(1)</span>
            <span className="man-center">HERMES</span>
            <span className="man-section">HERMES(1)</span>
          </div>

          {/* NAME Section */}
          <div className="man-section-block">
            <div className="man-section-title">NAME</div>
            <div className="man-content">
              <TypingText text="hermes - Neural network interface and data transmission system" speed={30} />
            </div>
          </div>

          {/* SYNOPSIS Section */}
          <div className="man-section-block">
            <div className="man-section-title">SYNOPSIS</div>
            <div className="man-content">
              <div className="man-synopsis">
                <TypingText text="hermes [-c|-s|-E] [-std=standard]" speed={25} delay={1000} />
              </div>
              <div className="man-synopsis">
                <TypingText text="       [-n] [-p] [-Olevel]" speed={25} delay={1500} />
              </div>
              <div className="man-synopsis">
                <TypingText text="       [-Wwarn...] [-Wpedantic]" speed={25} delay={2000} />
              </div>
              <div className="man-synopsis">
                <TypingText text="       [-Idir...] [-Ldir...]" speed={25} delay={2500} />
              </div>
              <div className="man-synopsis">
                <TypingText text="       [-Dmacro[=defn]...] [-Umacro]" speed={25} delay={3000} />
              </div>
              <div className="man-synopsis">
                <TypingText text="       [-foption...] [-mmachine-option...]" speed={25} delay={3500} />
              </div>
              <div className="man-synopsis">
                <TypingText text="       [-o outfile] [@file] infile..." speed={25} delay={4000} />
              </div>
            </div>
          </div>

          {/* DESCRIPTION Section */}
          <div className="man-section-block">
            <div className="man-section-title">DESCRIPTION</div>
            <div className="man-content">
              <TypingText
                text="When you invoke HERMES, it normally establishes neural pathways, processes data streams, and creates secure connections. The 'network options' allow you to control this process at various stages. For example, the -c option establishes connection without full activation. The output consists of encrypted data packets transmitted through the neural interface."
                speed={15}
                delay={5000}
              />
            </div>
          </div>

          {/* Status Bar */}
          <div className="man-status-bar">
            <TypingText text="Manual page hermes(1) line 1 (press h for help or q to quit)" speed={20} delay={8000} />
          </div>
        </>
      )}
    </div>
  )
}
