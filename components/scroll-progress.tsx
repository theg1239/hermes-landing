"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-purple-900/30">
      <motion.div style={{ width }} className="h-full bg-gradient-to-r from-purple-500 to-pink-500" />
    </div>
  )
}
