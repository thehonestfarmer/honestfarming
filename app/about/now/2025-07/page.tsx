"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Sun, Moon, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function July2025NowPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
      setIsDarkMode(false)
    } else {
      setIsDarkMode(true)
    }
  }, [])

  useEffect(() => {
    // Save theme preference and apply to document
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 font-mono transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-stone-100 dark:bg-stone-800 border-b-4 border-stone-800 dark:border-stone-600 shadow-lg transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-green-700 dark:bg-green-600 border-2 border-stone-800 dark:border-stone-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <div className="w-8 h-8 bg-green-500 dark:bg-green-400 border border-stone-800 dark:border-stone-600 relative transition-colors duration-300">
                  <div className="absolute inset-1 bg-green-300 dark:bg-green-200 border border-stone-600 dark:border-stone-500"></div>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-200 tracking-tight transition-colors duration-300 group-hover:text-green-700 dark:group-hover:text-green-400">
                HONEST FARMING
              </h1>
            </div>

            {/* Desktop Navigation with dark mode toggle */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/#mission"
                className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
              >
                Mission
              </Link>
              <Link
                href="/#products"
                className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
              >
                About
              </Link>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 bg-stone-200 dark:bg-stone-700 border-2 border-stone-800 dark:border-stone-600 hover:bg-stone-300 dark:hover:bg-stone-600 transition-all duration-300 hover:scale-110 hover:rotate-12"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-600" /> : <Moon className="w-5 h-5 text-stone-700" />}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-stone-700 dark:text-stone-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t-2 border-stone-300 pt-4">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/#mission"
                  className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
                >
                  Mission
                </Link>
                <Link
                  href="/#products"
                  className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
                >
                  About
                </Link>

                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-stone-700 dark:text-stone-300 font-semibold">Theme</span>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 bg-stone-200 dark:bg-stone-700 border-2 border-stone-800 dark:border-stone-600 hover:bg-stone-300 dark:hover:bg-stone-600 transition-all duration-300 hover:scale-110 hover:rotate-12"
                    aria-label="Toggle dark mode"
                  >
                    {isDarkMode ? <Sun className="w-5 h-5 text-yellow-600" /> : <Moon className="w-5 h-5 text-stone-700" />}
                  </button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Back to About Navigation */}
      <div className="bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-3">
          <Link href="/about" className="flex items-center space-x-2 text-stone-600 dark:text-stone-400 hover:text-green-700 dark:hover:text-green-400 transition-colors inline-flex">
            <ArrowLeft size={18} />
            <span className="font-semibold">Back to About</span>
          </Link>
        </div>
      </div>

      {/* Page Content */}
      <main className="py-16">
        {/* Page Title */}
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-sm text-stone-500 dark:text-stone-400 mb-4 font-semibold">
              July 2025
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-800 dark:text-stone-200 mb-4 transition-colors duration-300">
              Building in Public
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-lg">📍</span>
              <span className="text-lg font-semibold text-stone-700 dark:text-stone-300">Bangkok, Thailand</span>
            </div>
            <p className="text-xl text-stone-600 dark:text-stone-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
              Taking a month in Bangkok to train Muay Thai and learn to dance, while reflecting on building technology with wisdom.
            </p>
          </motion.div>
        </div>

        {/* Content Sections */}
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-16">
            
            {/* What We're Picking Up */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-stone-800 border-4 border-stone-800 dark:border-stone-600 shadow-lg p-8 transition-all duration-300">
                <h2 className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-400 mb-6 transition-colors duration-300">
                  What We&apos;re Picking Up
                </h2>
                <div className="space-y-4">
                  <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed transition-colors duration-300">
                    <strong>Cross-modal learning experiments:</strong> Learning both tango (intuition, feeling, weight shifts) and salsa (technical precision, rhythm-driven) as complementary skills rather than competing approaches. The assumption that "more technical = better" misses half the picture - sustainable mastery requires both systematic execution and intuitive adaptation.
                  </p>
                  <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed transition-colors duration-300">
                    <strong>AI coordination limitations:</strong> Prototyping multi-agent systems revealed that Claude Projects and similar tools hit walls when you need persistent, domain-specific intelligence. The general-purpose AI dream breaks down at implementation scale - you need specialized processing pipelines that don&apos;t eat through API budgets.
                  </p>
                  <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed transition-colors duration-300">
                    <strong>Hierarchical Reasoning Machines:</strong> This challenges the fundamental "scale = intelligence" assumption driving current AI development. What if architectural efficiency matters more than parameter count? Real products need sustainable tokenomics, not just impressive demos.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* What We're Working On */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white dark:bg-stone-800 border-4 border-stone-800 dark:border-stone-600 shadow-lg p-8 transition-all duration-300">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6 transition-colors duration-300">
                  What We&apos;re Working On
                </h2>
                <div className="space-y-4">
                  <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed transition-colors duration-300">
                    <strong>Content processing pipeline:</strong> Building systems that can ingest lectures, academic papers, and complex arguments into queryable knowledge bases. Think "search engine for systematic reasoning patterns" - but with anti-hallucination measures because accuracy matters when processing authoritative sources.
                  </p>
                  <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed transition-colors duration-300">
                    <strong>Token economics reality check:</strong> Hit the cost wall building consumer AI applications with real user data at scale. Led me down compression algorithms, context optimization, and selective processing. The &quot;just throw more tokens at it&quot; approach doesn&apos;t work for sustainable products.
                  </p>
                  <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed transition-colors duration-300">
                    <strong>Truth verification infrastructure:</strong> Got burned by AI-generated fake academic references in grad school submissions. Now building verification layers as a separate service. When you&apos;re processing complex arguments and authoritative content, hallucinations aren&apos;t just annoying - they&apos;re academically destructive.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* What We're Letting Go */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-white dark:bg-stone-800 border-4 border-stone-800 dark:border-stone-600 shadow-lg p-8 transition-all duration-300">
                <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 dark:text-purple-400 mb-6 transition-colors duration-300">
                  What We&apos;re Letting Go
                </h2>
                <div className="space-y-4">
                  <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed transition-colors duration-300">
                    <strong>Blockchain-first solutions:</strong> Moved from &quot;how do we use distributed ledgers?&quot; to &quot;what specific problems need decentralized verification?&quot; Most applications don&apos;t need immutable records - they need reliable information processing. Better to solve specific verification problems than build abstract truth infrastructure.
                  </p>
                  <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed transition-colors duration-300">
                    <strong>Overoptimization fallacy:</strong> Was training Muay Thai 8x/week while maintaining academic work and building projects. Reduced to 4x/week after recognizing that sustainable performance beats peak bursts. Energy management matters more than maximum effort when you&apos;re working on multiple complex problems.
                  </p>
                  <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed transition-colors duration-300">
                    <strong>General-purpose AI coordination:</strong> The elegant multi-agent architecture worked beautifully in testing, terribly at scale. Pivoting from trying to make everything work together to building specialized systems that do one thing well. Constraints breed better solutions than unlimited resources.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* What We're Seeing */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="bg-white dark:bg-stone-800 border-4 border-stone-800 dark:border-stone-600 shadow-lg p-8 transition-all duration-300">
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-700 dark:text-amber-400 mb-6 transition-colors duration-300">
                  What We&apos;re Seeing
                </h2>
                <div className="space-y-4">
                  <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed transition-colors duration-300">
                    We&apos;re at an inflection point where raw compute is abundant enough to solve interesting problems, but expensive enough that sustainable solutions require actual engineering discipline. The next wave of useful AI applications will come from efficiency innovations, not scale increases - from people who&apos;ve hit the token wall and been forced to think systematically about what actually matters.
                  </p>
                  <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed transition-colors duration-300">
                    Most AI discussion happens in two bubbles: researchers with unlimited budgets, or consumers who never see backend costs. The sustainable products emerge from the narrow middle - people building real applications for real users with real constraints.
                  </p>
                </div>
              </div>
            </motion.section>

          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="container mx-auto px-4 mt-16">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link 
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-700 hover:bg-stone-800 text-white border-2 border-stone-800 dark:border-stone-600 shadow-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <ArrowLeft size={18} />
              Back to About
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  )
}