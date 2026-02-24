"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) setMatches(media.matches)
    const listener = () => setMatches(media.matches)
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches, query])
  return matches
}

/**
 * Full "Building Today" section with mission statement, focus areas (Blockchain, AI, Network states),
 * and impact quote. Use this when you want to show the expanded section; the main page uses a
 * collapsed version that only shows the impact quote.
 */
export function BuildingTodayFullSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px -100px 0px" })
  const isMobile = useMediaQuery("(max-width: 768px)")

  const containerVariants = {
    hidden: { opacity: isMobile ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: isMobile ? {} : { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: isMobile ? {} : { duration: 0.6, ease: "easeOut" as const },
    },
  }

  return (
    <section
      ref={ref}
      className="py-20 bg-stone-100 dark:bg-stone-700 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-white dark:bg-stone-800 border-4 border-stone-800 dark:border-stone-600 shadow-lg p-8 transition-all duration-300"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Header */}
            <motion.div className="text-center mb-10" variants={itemVariants}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span
                  className="text-5xl"
                  style={{ imageRendering: "pixelated" }}
                >
                  🚀
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-200">
                  Building Today
                </h3>
              </div>
            </motion.div>

            <div className="space-y-10">
              {/* Mission Statement */}
              <motion.div className="text-center" variants={itemVariants}>
                <p className="text-xl sm:text-2xl text-stone-800 dark:text-stone-200 leading-relaxed font-semibold">
                  We&apos;re building technology that serves human flourishing
                </p>
              </motion.div>

              {/* Focus Areas Section */}
              <motion.div className="text-left" variants={itemVariants}>
                <h4 className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-8 text-center">
                  Focus Areas
                </h4>

                <div className="grid gap-6">
                  {/* Blockchain Focus Area */}
                  <motion.div
                    className="group bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-2 border-green-200 dark:border-green-700 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-green-400 dark:hover:border-green-500"
                    variants={itemVariants}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-600 dark:bg-green-500 border-2 border-stone-800 dark:border-stone-600 flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110" style={{ imageRendering: "pixelated" }}>
                        🔗
                      </div>
                      <div className="flex-1">
                        <h5 className="text-lg sm:text-xl font-bold text-stone-800 dark:text-stone-200 mb-2">
                          Blockchain as truth infrastructure
                        </h5>
                        <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                          Using decentralized consensus to build genuine
                          cooperation between people
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* AI Focus Area */}
                  <motion.div
                    className="group bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-2 border-blue-200 dark:border-blue-700 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-blue-400 dark:hover:border-blue-500"
                    variants={itemVariants}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 dark:bg-blue-500 border-2 border-stone-800 dark:border-stone-600 flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110" style={{ imageRendering: "pixelated" }}>
                        🧠
                      </div>
                      <div className="flex-1">
                        <h5 className="text-lg sm:text-xl font-bold text-stone-800 dark:text-stone-200 mb-2">
                          AI that amplifies rather than replaces
                        </h5>
                        <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                          Technology that enhances human reasoning and creativity
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Network States Focus Area */}
                  <motion.div
                    className="group bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-2 border-purple-200 dark:border-purple-700 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-purple-400 dark:hover:border-purple-500"
                    variants={itemVariants}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-600 dark:bg-purple-500 border-2 border-stone-800 dark:border-stone-600 flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110" style={{ imageRendering: "pixelated" }}>
                        🌐
                      </div>
                      <div className="flex-1">
                        <h5 className="text-lg sm:text-xl font-bold text-stone-800 dark:text-stone-200 mb-2">
                          Network states and coordination
                        </h5>
                        <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                          New models for human organization that unlock human
                          capital
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Impact Statement */}
              <motion.div
                className="text-center pt-6 border-t border-stone-300 dark:border-stone-500"
                variants={itemVariants}
              >
                <p className="text-lg sm:text-xl text-stone-800 dark:text-stone-200 leading-relaxed font-semibold">
                  The underutilization of human potential is one of our most
                  critical problems. Technology should amplify what makes us
                  human, not exploit our weaknesses.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
