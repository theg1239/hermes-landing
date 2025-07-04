"use client"

import { useState, useEffect } from "react"
import { TerminalScreen } from "@/components/terminal-screen"
import { DownloadModal } from "@/components/download-modal"
import { BootupSequence } from "@/components/bootup-sequence"

export default function HermesTerminal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showBootup, setShowBootup] = useState(true)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "d" || event.key === "D") {
        setIsModalOpen(true)
      }
      if (event.key === "Escape") {
        setIsModalOpen(false)
      }
      if (event.key === "q" || event.key === "Q") {
        window.close()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  if (showBootup) {
    return (
      <TerminalScreen>
        <BootupSequence onComplete={() => setShowBootup(false)} />
      </TerminalScreen>
    )
  }

  return (
    <TerminalScreen>
      <div className="terminal-fullscreen">
        {/* Window Header */}
        <div className="window-header">
          <div className="window-title">man hermes</div>
          <div className="window-controls">
            <div className="control minimize"></div>
            <div className="control maximize"></div>
            <div className="control close"></div>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="terminal-content">
          {/* Man Page Header */}
          <div className="man-header">
            <span>HERMES(1)</span>
            <span></span>
            <span>HERMES(1)</span>
          </div>

          {/* NAME Section */}
          <div className="man-section">
            <div className="section-title">NAME</div>
            <div className="section-content">hermes - Neural network interface and data transmission system</div>
          </div>

          {/* SYNOPSIS Section */}
          <div className="man-section">
            <div className="section-title">SYNOPSIS</div>
            <div className="section-content synopsis">
              <div>hermes [-c|-s|-E] [-std=standard]</div>
              <div> [-n] [-p] [-Olevel]</div>
              <div> [-Wwarn...] [-Wpedantic]</div>
              <div> [-Idir...] [-Ldir...]</div>
              <div>
                [-o <span className="underline">outfile</span>] [<span className="underline">@file</span>]{" "}
                <span className="underline">infile</span>...
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="man-section">
            <div className="section-content">
              Only the most useful options are listed here; see below for the
              <br />
              remainder. hermes accepts mostly the same options as gcc.
            </div>
          </div>

          {/* DESCRIPTION Section */}
          <div className="man-section">
            <div className="section-title">DESCRIPTION</div>
            <div className="section-content">
              When you invoke HERMES, it normally does preprocessing, compilation,
              <br />
              assembly and linking. The "overall options" allow you to stop
              <br />
              this process at an intermediate stage.
            </div>
          </div>

          {/* Status Bar */}
          <div className="status-bar">Manual page hermes(1) line 1 (press h for help or q to quit)</div>
        </div>

        {/* Download Modal */}
        <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </TerminalScreen>
  )
}
