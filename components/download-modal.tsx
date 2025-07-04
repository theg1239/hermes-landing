"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const downloadOptions = [
    {
      id: "hermes-client",
      name: "hermes-client.deb",
      description: "Main application package",
      size: "2.4 MB",
    },
    {
      id: "documentation",
      name: "hermes-docs.tar.gz",
      description: "Documentation and manual pages",
      size: "856 KB",
    },
    {
      id: "source-code",
      name: "hermes-src.tar.xz",
      description: "Complete source code",
      size: "12.8 MB",
    },
  ]

  const handleDownload = (file: string) => {
    setSelectedFile(file)
    setTimeout(() => {
      setSelectedFile(null)
      onClose()
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="download-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <span>Download Center</span>
              <button onClick={onClose} className="close-btn">
                ×
              </button>
            </div>

            <div className="modal-content">
              {downloadOptions.map((option) => (
                <div key={option.id} className="download-item" onClick={() => handleDownload(option.name)}>
                  <div className="download-info">
                    <div className="download-name">{option.name}</div>
                    <div className="download-desc">{option.description}</div>
                  </div>
                  <div className="download-size">{selectedFile === option.name ? "downloading..." : option.size}</div>
                  {selectedFile === option.name && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                      className="progress-bar"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="modal-footer">Press 'd' to download • Press 'q' to quit • ESC to cancel</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
