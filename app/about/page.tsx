"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Menu, X, Mail, Github, Twitter, Linkedin, MapPin, Sun, Moon, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import InteractiveTimeline from "@/components/InteractiveTimeline"

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

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

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage(data.message)
        setEmail("")
      } else {
        setSubmitMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Current journal entry
  const journalEntries = [
    {
      id: 1,
      title: "Building in Public",
      date: "July 2025",
      excerpt: "Thoughts on transparency, authentic community, and what it means to build technology with wisdom in rural Japan.",
      slug: "2025-07"
    }
  ]

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
                className="text-green-700 dark:text-green-400 font-semibold"
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

              <a
                href="#stay-connected"
                className="bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white border-2 border-stone-800 dark:border-stone-600 shadow-lg font-bold px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Subscribe to Updates
              </a>
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
                  className="text-green-700 dark:text-green-400 font-semibold"
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

                <a
                  href="#stay-connected"
                  className="bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white border-2 border-stone-800 dark:border-stone-600 shadow-lg font-bold w-full py-3 text-center transition-all duration-300"
                >
                  Subscribe to Updates
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Back to Home Navigation */}
      <div className="bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-3">
          <Link href="/" className="flex items-center space-x-2 text-stone-600 dark:text-stone-400 hover:text-green-700 dark:hover:text-green-400 transition-colors inline-flex">
            <ArrowLeft size={18} />
            <span className="font-semibold">Back to Home</span>
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
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-800 dark:text-stone-200 mb-6 transition-colors duration-300">
              About Honest Farming
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
              The story behind our mission to cultivate technology with wisdom, rooted in eternal principles.
            </p>
          </motion.div>
        </div>

        {/* Interactive Timeline */}
        <InteractiveTimeline />

        {/* Now Section - Journal Entries */}
        <section className="py-20 bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-200 mb-4 transition-colors duration-300">
                Now
              </h2>
              <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto transition-colors duration-300">
                Monthly reflections on building technology with wisdom and purpose.
              </p>
            </motion.div>

            <div className="flex justify-center max-w-4xl mx-auto">
              {journalEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="w-full max-w-lg"
                >
                  <Link href={`/about/now/${entry.slug}`} className="block">
                    <Card className="border-4 border-stone-800 dark:border-stone-600 shadow-lg bg-white dark:bg-stone-700 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                      <CardContent className="p-8">
                        <div className="text-sm text-stone-500 dark:text-stone-400 mb-3 font-semibold">
                          {entry.date}
                        </div>
                        <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-4 leading-tight transition-colors duration-300">
                          {entry.title}
                        </h3>
                        <p className="text-stone-600 dark:text-stone-400 leading-relaxed transition-colors duration-300">
                          {entry.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Simple CTA Section */}
        <section id="stay-connected" className="py-20 bg-stone-100 dark:bg-stone-800 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-200 mb-8 transition-colors duration-300">
              Stay Connected
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-400 mb-8 leading-relaxed transition-colors duration-300">
              Join our community to receive updates on our journey building technology with wisdom.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="flex-1 border-2 border-stone-800 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold transition-colors duration-300 disabled:opacity-50"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white border-2 border-stone-800 dark:border-stone-600 shadow-lg font-bold px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            
            {submitMessage && (
              <p className={`text-sm mt-4 ${submitMessage.includes('Successfully') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {submitMessage}
              </p>
            )}
            
            <p className="text-sm text-stone-500 dark:text-stone-500">
              No spam. Just honest updates about our mission.
            </p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}