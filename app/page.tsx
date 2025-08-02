"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Menu, X, Mail, Github, Twitter, Linkedin, MapPin, Sun, Moon } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import TruthExchangeNetwork, { heroNetworkConfig } from "@/components/TruthExchangeNetwork"
import InteractiveTimeline from "@/components/InteractiveTimeline"

// Base Card Component with Breathing Animation
interface CardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

const BaseCard: React.FC<CardProps> = ({ title, description, imageSrc, imageAlt }) => {

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Breathing animation - reduced intensity for mobile and accessibility
  const breathingAnimation = prefersReducedMotion ? false : {
    scale: [1, 1.03, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="grid md:grid-cols-1 gap-8">
        <div className="bg-white dark:bg-stone-700 rounded-xl p-6 sm:p-8 border-4 border-stone-800 dark:border-stone-600 shadow-lg transition-all duration-300 min-h-[500px] sm:min-h-[600px]">

          {/* Breathing animated image */}
          <div className="w-full h-60 sm:h-72 mb-6 sm:mb-8 overflow-hidden rounded-lg border-b-4 border-stone-800 dark:border-stone-600">
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-contain"
              style={{
                imageRendering: 'pixelated',
              }}
              animate={breathingAnimation}
              loading="lazy"
            />
          </div>

          <h4 className="text-xl sm:text-2xl font-bold text-stone-800 dark:text-stone-200 mb-4 sm:mb-6">
            {title}
          </h4>

          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
            {description}
          </p>

        </div>
      </div>
    </div>
  )
}

// Garden Sticky Scroll Section Component
const GardenStickyScrollSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionMediaQuery.matches)

    // Check for mobile screen size
    const mobileMediaQuery = window.matchMedia('(max-width: 768px)')
    setIsMobile(mobileMediaQuery.matches)

    const handleMotionChange = () => setPrefersReducedMotion(motionMediaQuery.matches)
    const handleMobileChange = () => setIsMobile(mobileMediaQuery.matches)

    motionMediaQuery.addEventListener('change', handleMotionChange)
    mobileMediaQuery.addEventListener('change', handleMobileChange)

    return () => {
      motionMediaQuery.removeEventListener('change', handleMotionChange)
      mobileMediaQuery.removeEventListener('change', handleMobileChange)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Disable sticky scroll effect on mobile or if user prefers reduced motion
  const shouldUseStaticLayout = isMobile || prefersReducedMotion

  // Card 2 animation: slides up when 50% scrolled with more aggressive spacing
  const card2Y = useTransform(
    scrollYProgress,
    [0, 0.50, 0.75],
    shouldUseStaticLayout ? ["0%", "0%", "0%"] : ["150%", "0%", "0%"]
  )

  // Card 3 animation: slides up when 75% scrolled with more aggressive spacing
  const card3Y = useTransform(
    scrollYProgress,
    [0, 0.90, 1.60],
    shouldUseStaticLayout ? ["0%", "0%", "0%"] : ["200%", "0%", "0%"]
  )

  // Mobile fallback: render cards in sequence without sticky effect
  if (shouldUseStaticLayout) {
    return (
      <section
        id="divine-logos"
        className="py-12 bg-stone-200 dark:bg-stone-800 transition-colors duration-300"
      >
        {/* Title */}
        <div className="container mx-auto px-4 mb-8">
          <h3 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-200 text-center transition-colors duration-300">
            What We Mean by Divine Logos
          </h3>
        </div>

        {/* Cards in vertical sequence */}
        <div className="space-y-8">
          <BaseCard
            title="For the philosophically curious"
            description="Natural laws govern how seeds become flourishing plants. The same rational principles that order reality enable authentic human cooperation when we align with them rather than fight against them."
            imageSrc="/farm-landscapes/pixelated-divine-logos-0.png"
            imageAlt="Pixelated representation of philosophical foundations with abstract geometric patterns representing rational principles"
          />

          <BaseCard
            title="For the theologically minded"
            description="The Logos is the divine Word through which all things were made, the source of truth that enables authentic human cooperation to take root."
            imageSrc="/farm-landscapes/pixelated-divine-logos-1.png"
            imageAlt="Pixelated divine light illuminating a cross or sacred symbol with rays extending to growing plants"
          />

          <BaseCard
            title="For the practically focused"
            description="Whether you call it natural law, universal reason, or divine ordering - there are underlying principles that, when cultivated properly, enable human growth."
            imageSrc="/farm-landscapes/pixelated-divine-logos-2.png"
            imageAlt="Pixelated scene of people working together in harmony with flourishing gardens and cooperative structures"
          />
        </div>
      </section>
    )
  }

  // Desktop sticky scroll version
  return (
    <section
      id="divine-logos"
      ref={containerRef}
      className="relative bg-stone-200 dark:bg-stone-800 transition-colors duration-300"
    >
      {/* Title positioned within sticky container */}
      <div className="container mx-auto px-4 pt-20 pb-8 relative z-40">
        <h3 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-200 text-center transition-colors duration-300">
          What We Mean by Divine Logos
        </h3>
      </div>

      {/* Scroll trigger container - defines scroll distance */}
      <div className="relative h-[1000vh]">

        {/* Sticky cards container */}
        <div className="sticky top-40 h-screen overflow-hidden">

          {/* Cards container */}
          <div className="flex items-center justify-center h-full -mt-28">

            {/* Card 1 - Base layer (Always visible) */}
            <div className="absolute inset-0 z-10 flex justify-center">
              <BaseCard
                title="For the philosophically curious"
                description="Natural laws govern how seeds become flourishing plants. The same rational principles that order reality enable authentic human cooperation when we align with them rather than fight against them."
                imageSrc="/farm-landscapes/pixelated-divine-logos-0.png"
                imageAlt="Pixelated representation of philosophical foundations with abstract geometric patterns representing rational principles"
              />
            </div>

            {/* Card 2 - Middle layer (Slides up at 33%) */}
            <motion.div
              className="absolute inset-0 z-20 flex justify-center"
              style={{ y: card2Y, willChange: 'transform' }}
            >
              <BaseCard
                title="For the theologically minded"
                description="The Logos is the divine Word through which all things were made, the source of truth that enables authentic human cooperation to take root."
                imageSrc="/farm-landscapes/pixelated-divine-logos-1.png"
                imageAlt="Pixelated divine light illuminating a cross or sacred symbol with rays extending to growing plants"
              />
            </motion.div>

            {/* Card 3 - Top layer (Slides up at 66%) */}
            <motion.div
              className="absolute inset-0 z-30 flex justify-center"
              style={{ y: card3Y, willChange: 'transform' }}
            >
              <BaseCard
                title="For the practically focused"
                description="Whether you call it natural law, universal reason, or divine ordering - there are underlying principles that, when cultivated properly, enable human growth."
                imageSrc="/farm-landscapes/pixelated-divine-logos-2.png"
                imageAlt="Pixelated scene of people working together in harmony with flourishing gardens and cooperative structures"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default function HonestFarmingLanding() {
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
      // Default to dark mode if no preference is saved
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleProductNavigation = () => {
    try {
      sessionStorage.setItem('honestfarming-navigation-source', 'main-page')
    } catch {
      // Silently fail if sessionStorage is not available
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 font-mono transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-stone-100 dark:bg-stone-800 border-b-4 border-stone-800 dark:border-stone-600 shadow-lg transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with animation */}
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
              <a
                href="#products"
                className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
              >
                Products
              </a>
              <a
                href="#founder-story"
                className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
              >
                Contact
              </a>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 bg-stone-200 dark:bg-stone-700 border-2 border-stone-800 dark:border-stone-600 hover:bg-stone-300 dark:hover:bg-stone-600 transition-all duration-300 hover:scale-110 hover:rotate-12"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-600" /> : <Moon className="w-5 h-5 text-stone-700" />}
              </button>

              <Button 
                onClick={() => scrollToSection('newsletter')}
                className="bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white border-2 border-stone-800 dark:border-stone-600 shadow-lg font-bold px-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Subscribe to Updates
              </Button>
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
                <a
                  href="#products"
                  className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
                >
                  Products
                </a>
                <a
                  href="#founder-story"
                  className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
                >
                  Contact
                </a>

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

                <Button 
                  onClick={() => scrollToSection('newsletter')}
                  className="bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white border-2 border-stone-800 dark:border-stone-600 shadow-lg font-bold w-full"
                >
                  Subscribe to Updates
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 min-h-[64vh] bg-gradient-to-b from-stone-100 to-stone-200 dark:from-slate-700 dark:to-slate-800 transition-colors duration-300 overflow-hidden">
        {/* TruthExchange Network Background Animation */}
        <div className="absolute inset-0 opacity-50 z-1">
          <TruthExchangeNetwork
            isDarkMode={isDarkMode}
            className="w-full h-full hero-network-canvas"
            {...heroNetworkConfig}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 hero-content">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h2 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-800 dark:text-stone-200 leading-tight transition-colors duration-300">
                Technology for
                <br />
                <span className="text-green-700 dark:text-green-400">Human Growth</span>
              </h2>
              <p className="hero-subtitle text-xl sm:text-2xl text-stone-600 dark:text-stone-400 leading-relaxed transition-colors duration-300 max-w-2xl mx-auto">
                Cultivating cooperation with the divine Logos
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => scrollToSection('newsletter')}
                className="bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white border-2 border-stone-800 dark:border-stone-600 shadow-lg font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Join the Community
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('divine-logos')}
                className="border-2 border-stone-800 dark:border-stone-600 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 font-bold px-8 py-4 text-lg bg-transparent transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Garden Sticky Scroll Section */}
      <GardenStickyScrollSection />



      {/* Product Showcase */}
      <section id="products" className="py-20 bg-stone-100 dark:bg-stone-700 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-200 mb-4 transition-colors duration-300">
              Our Products
            </h3>
            <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto transition-colors duration-300">
              Truth-driven solutions for authentic communities and transparent systems
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            {/* TruthExchange Card - Clickable */}
            <Link href="/truthexchange" className="block" onClick={handleProductNavigation}>
              <Card className="border-4 border-stone-800 dark:border-stone-600 shadow-lg bg-white dark:bg-stone-700 hover:shadow-xl transition-all duration-300 product-card overflow-hidden cursor-pointer hover:scale-105">
                <CardContent className="p-0 m-0">
                  <div className="h-48 bg-gradient-to-br from-blue-400/20 to-blue-600/20 border-b-4 border-stone-800 dark:border-stone-600 flex items-center justify-center">
                    <div className="text-center">
                      <img
                        src="/truthexchange-logo-1.png"
                        alt="TruthExchange logo - geometric diamond crystal representing truth verification"
                        className="w-24 h-24 mx-auto mb-3 object-contain"
                        style={{
                          imageRendering: 'pixelated',
                        }}
                      />
                      <p className="text-stone-700 dark:text-stone-300 font-semibold">Knowledge Network</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg sm:text-xl font-bold text-stone-800 dark:text-stone-200 transition-colors duration-300">
                        TruthExchange
                      </h4>
                      <span className="text-xs sm:text-sm px-2 py-1 border font-semibold whitespace-nowrap bg-green-200 text-green-800 border-green-600">
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 transition-colors duration-300 leading-relaxed">
                      Fertile ground for knowledge to grow - Claims, evidence, and confidence scores for everything that matters
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Garden Card - Static (temporarily disabled) */}
            <Card className="border-4 border-stone-800 dark:border-stone-600 shadow-lg bg-white dark:bg-stone-700 hover:shadow-xl transition-shadow product-card overflow-hidden">
                <CardContent className="p-0 m-0">
                  <div className="h-48 bg-gradient-to-br from-amber-500/20 to-amber-700/20 border-b-4 border-stone-800 dark:border-stone-600 flex items-center justify-center">
                    <div className="text-center">
                      <img
                        src="/garden-logo-1.png"
                        alt="Garden logo - cross with growing leaves representing Christian apologetics"
                        className="w-24 h-24 mx-auto mb-3 object-contain"
                        style={{
                          imageRendering: 'pixelated',
                          transform: 'scale(1.15)',
                        }}
                      />
                      <p className="text-stone-700 dark:text-stone-300 font-semibold">Newsletter & Wisdom</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg sm:text-xl font-bold text-stone-800 dark:text-stone-200 transition-colors duration-300">
                        Garden
                      </h4>
                      <span className="text-xs sm:text-sm px-2 py-1 border font-semibold whitespace-nowrap bg-amber-200 text-amber-800 border-amber-600">
                        Launching Q3 2025
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 transition-colors duration-300 leading-relaxed">
                      Cultivating apologetic wisdom for faithful families. AI-curated truth without bias or manipulation.
                    </p>
                  </div>
                </CardContent>
              </Card>

            {/* Seurat Card - Static */}
            <Card className="border-4 border-stone-800 dark:border-stone-600 shadow-lg bg-white dark:bg-stone-700 hover:shadow-xl transition-shadow product-card overflow-hidden">
              <CardContent className="p-0 m-0">
                <div className="h-48 bg-gradient-to-br from-gray-500/20 to-gray-700/20 border-b-4 border-stone-800 dark:border-stone-600 flex items-center justify-center">
                  <div className="text-center">
                    <img
                      src="/seurat-logo-1.png"
                      alt="Seurat logo - colorful pointillist human silhouette representing AI-enhanced human potential"
                      className="w-24 h-24 mx-auto mb-3 object-contain"
                      style={{
                        imageRendering: 'pixelated',
                      }}
                    />
                    <p className="text-stone-700 dark:text-stone-300 font-semibold">Human Potential</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg sm:text-xl font-bold text-stone-800 dark:text-stone-200 transition-colors duration-300">
                      Seurat
                    </h4>
                    <span className="text-xs sm:text-sm px-2 py-1 border font-semibold whitespace-nowrap bg-gray-200 text-gray-800 border-gray-600">
                      In Development
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 transition-colors duration-300 leading-relaxed">
                    Tending to your personal garden - AI-powered tools to cultivate your full human potential
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* HappyHomeJapan Card - Clickable */}
            <a href="https://www.happyhomejapan.com/" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="border-4 border-stone-800 dark:border-stone-600 shadow-lg bg-white dark:bg-stone-700 hover:shadow-xl transition-all duration-300 product-card overflow-hidden cursor-pointer hover:scale-105">
                <CardContent className="p-0 m-0">
                  <div className="h-48 bg-gradient-to-br from-green-500/20 to-green-700/20 border-b-4 border-stone-800 dark:border-stone-600 flex items-center justify-center">
                    <div className="text-center">
                      <img
                        src="/happyhomejapan-logo-1.png"
                        alt="HappyHomeJapan logo - house icon in rounded square container representing Japanese real estate"
                        className="w-24 h-24 mx-auto mb-3 object-contain"
                        style={{
                          imageRendering: 'pixelated',
                        }}
                      />
                      <p className="text-stone-700 dark:text-stone-300 font-semibold">Japanese Real Estate</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg sm:text-xl font-bold text-stone-800 dark:text-stone-200 transition-colors duration-300">
                        HappyHomeJapan
                      </h4>
                      <span className="text-xs sm:text-sm px-2 py-1 border font-semibold whitespace-nowrap bg-orange-200 text-orange-800 border-orange-600">
                        Paused
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 transition-colors duration-300 leading-relaxed">
                      Navigate Japan&apos;s unique real estate market with confidence. Tools to help international buyers discover, understand, and purchase homes in Japan through transparent processes and local expertise.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <InteractiveTimeline />

      {/* Newsletter Signup */}
      <section id="newsletter" className="py-20 bg-green-700 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h3 className="text-3xl sm:text-4xl font-bold text-white">Plant Seeds of Truth</h3>
            <p className="text-lg sm:text-xl text-green-100 leading-relaxed">
              Get updates on cultivating knowledge, growing verified information systems, and tending the tools for
              human cooperation.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
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
                className="bg-stone-800 hover:bg-stone-900 text-white border-2 border-stone-800 shadow-lg font-bold px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            {submitMessage && (
              <p className={`text-sm mt-4 ${submitMessage.includes('Successfully') ? 'text-green-200' : 'text-red-200'}`}>
                {submitMessage}
              </p>
            )}
            <p className="text-sm text-green-200">
              No spam. Just honest updates about our mission.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-stone-800 dark:bg-stone-900 text-white py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 border border-stone-600 flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-300 border border-stone-500"></div>
                </div>
                <h4 className="text-xl font-bold">HONEST FARMING</h4>
              </div>
              <p className="text-stone-300">Technology rooted in truth, serving authentic communities.</p>
            </div>

            <div className="space-y-4">
              <h5 className="text-lg font-bold">Products</h5>
              <ul className="space-y-2 text-stone-300">
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    TruthExchange
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Garden
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Seurat
                  </a>
                </li>
                <li>
                  <a href="https://www.happyhomejapan.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                    HappyHomeJapan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Open Source
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-lg font-bold">Company</h5>
              <ul className="space-y-2 text-stone-300">
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Mission
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-lg font-bold">Connect</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-stone-300 hover:text-green-400 transition-colors">
                  <Github size={24} />
                </a>
                <a href="#" className="text-stone-300 hover:text-green-400 transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-stone-300 hover:text-green-400 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="text-stone-300 hover:text-green-400 transition-colors">
                  <Mail size={24} />
                </a>
              </div>
              <div className="space-y-2 text-stone-300 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>Rural Japan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>thehonestfarmer@proton.me</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-400 text-sm">© 2025 Honest Farming. All rights reserved.</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-sm text-stone-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-green-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Legal
              </a>
            </div>
          </div>
        </div>
      </footer>
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delayed {
          0%, 20% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delayed-2 {
          0%, 40% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes pixel-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.8), 0 0 30px rgba(34, 197, 94, 0.6);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in-delayed {
          animation: fade-in-delayed 1.2s ease-out forwards;
        }

        .animate-fade-in-delayed-2 {
          animation: fade-in-delayed-2 1.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-typewriter {
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 2s steps(20) forwards;
        }

        .animate-pixel-glow {
          animation: pixel-glow 2s ease-in-out infinite;
        }

        /* Hover animations for interactive elements */
        .hover-grow {
          transition: transform 0.3s ease;
        }

        .hover-grow:hover {
          transform: scale(1.05);
        }

        /* Staggered animation for product cards */
        .product-card:nth-child(1) { animation-delay: 0s; }
        .product-card:nth-child(2) { animation-delay: 0.1s; }
        .product-card:nth-child(3) { animation-delay: 0.2s; }
        .product-card:nth-child(4) { animation-delay: 0.3s; }
        .product-card:nth-child(5) { animation-delay: 0.4s; }
        .product-card:nth-child(6) { animation-delay: 0.5s; }

        /* Farm landscape card styles */
        .truth-driven-cards {
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .farm-landscape-card {
          position: relative;
          border: 4px solid #1c1917;
          background: #f5f5f4;
          padding: 0;
          overflow: hidden;
          min-height: 400px;
        }

        .farm-landscape-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }

        .farm-card-content {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.95);
        }

        /* Divine Logos card styles */
        .divine-logos-image-container {
          position: relative;
          overflow: hidden;
        }

        .divine-logos-image-container img {
          transition: transform 0.3s ease;
        }

        .divine-logos-image-container:hover img {
          transform: scale(1.05);
        }

        /* Ensure proper aspect ratio for Divine Logos images */
        @media (min-width: 768px) {
          .divine-logos-image-container img {
            aspect-ratio: 16/10;
          }
        }

        .hero-network-canvas {
          opacity: 0.5;
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 10;
        }

        /* Hero text styling with earthy, solarpunk-inspired shadows */
        .hero-title {
          text-shadow: 
            2px 2px 4px rgba(101, 69, 34, 0.8),    /* Warm brown earth */
            -1px -1px 2px rgba(92, 51, 23, 0.6) !important;   /* Darker earth tone */
          letter-spacing: -0.02em;
        }
        
        .hero-subtitle {
          text-shadow: 1px 1px 3px rgba(101, 69, 34, 0.7) !important;  /* Warm brown earth */
          letter-spacing: 0.01em;
        }

        /* Dark mode earthy text shadows */
        .dark .hero-title {
          text-shadow: 
            2px 2px 4px rgba(22, 101, 52, 0.8),    /* Deep forest green */
            -1px -1px 2px rgba(20, 83, 45, 0.6) !important;   /* Forest shadow */
        }
        
        .dark .hero-subtitle {
          text-shadow: 1px 1px 3px rgba(22, 101, 52, 0.7) !important;  /* Deep forest green */
        }

        /* Ensure span elements within hero title inherit the shadow */
        .hero-title span {
          text-shadow: inherit !important;
        }
        
        .dark .hero-title span {
          text-shadow: inherit !important;
        }

        /* Additional backdrop for enhanced readability */
        .hero-content::before {
          content: '';
          position: absolute;
          top: -2rem;
          left: -2rem;
          right: -2rem;
          bottom: -2rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(1px);
          border-radius: 1rem;
          z-index: -1;
        }

        .dark .hero-content::before {
          background: rgba(45, 55, 72, 0.15); /* Matches network background */
        }

        /* Loading state for farm landscapes */
        .farm-landscape-loading {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Accessibility: Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .hero-network-canvas {
            display: none;
          }
          
          /* Show static backdrop for hero when animation is disabled */
          .hero-network-canvas + .hero-content::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(22, 163, 74, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(21, 128, 61, 0.04) 0%, transparent 50%);
            z-index: -2;
          }
          
          .dark .hero-network-canvas + .hero-content::after {
            background: 
              radial-gradient(circle at 20% 30%, rgba(104, 211, 145, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(72, 187, 120, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(52, 168, 83, 0.03) 0%, transparent 50%);
          }
          
          .farm-landscape-card {
            /* Show static versions only */
          }
          
          .animate-fade-in-up,
          .animate-fade-in-delayed,
          .animate-fade-in-delayed-2,
          .animate-float,
          .animate-typewriter,
          .animate-pixel-glow {
            animation: none !important;
          }
          
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Responsive text sizing */
        @media (max-width: 640px) {
          .animate-typewriter {
            animation: none;
            overflow: visible;
            white-space: normal;
          }
          
          .truth-driven-cards {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .farm-landscape-card {
            min-height: 350px;
          }
          
          .farm-landscape-image {
            height: 200px;
          }
        }

        @media (max-width: 768px) {
          .truth-driven-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
