"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Menu, X, Mail, Github, MapPin, Sun, Moon } from "lucide-react"
import { motion, useInView } from "framer-motion"

// useMediaQuery hook for responsive behavior
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

// Floating Text Card Component with Full-Screen Background
interface CardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  textPosition: string
  disableBreathing?: boolean
}

const FloatingTextCard: React.FC<CardProps> = ({ title, description, imageSrc, imageAlt, textPosition, disableBreathing = false }) => {
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  // Mobile detection
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Desktop breathing animation - full scale
  const desktopBreathingAnimation = (prefersReducedMotion || disableBreathing) ? {} : {
    scale: [1, 1.03, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }

  // Mobile breathing animation - reduced scale for performance
  const mobileBreathingAnimation = (prefersReducedMotion || disableBreathing) ? {} : {
    scale: [1, 1.02, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }

  // Text box entrance animation
  const textBoxAnimation = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" as const }
  }

  // Mobile split layout (< 768px)
  if (isMobile) {
    return (
      <div className="relative h-screen flex flex-col bg-stone-900">
        {/* Image Section (Top 60%) */}
        <div className="relative overflow-hidden bg-stone-800">
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-contain"
            style={{ imageRendering: 'pixelated' }}
            animate={mobileBreathingAnimation}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-900/20" />
        </div>

        {/* Text Section (Bottom 40%) */}
        <div className="h-2/5 bg-stone-900 p-6 flex flex-col justify-center border-t-4 border-stone-600">
          <motion.div {...textBoxAnimation} className="text-center max-w-sm mx-auto space-y-6">
            <h4 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-tight mt-8">
              {title}
            </h4>
            <p className="text-stone-300 text-lg sm:text-xl leading-relaxed font-medium">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  // Desktop floating text box layout (≥ 768px) - unchanged
  return (
    <div className="relative h-screen w-full overflow-hidden flex justify-center">
      {/* Container for 60% width card */}
      <div className="relative w-[72%] h-[72%] overflow-hidden rounded-xl shadow-2xl floating-text-card-container">
        {/* Background image with breathing animation */}
        <motion.img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            imageRendering: 'pixelated',
            willChange: 'transform'
          }}
          animate={desktopBreathingAnimation}
          loading="lazy"
        />

        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Floating text box */}
        <div className={`absolute ${textPosition} z-10`}>
          <motion.div
            className="floating-text-card rounded-lg p-6 shadow-xl mx-4"
            {...textBoxAnimation}
          >
            <h4 className="text-2xl font-bold text-stone-900 mb-4 leading-snug">{title}</h4>
            <p className="text-lg text-stone-700 leading-snug">{description}</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Garden Sticky Scroll Section Component
const GardenStickyScrollSection: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionMediaQuery.matches)

    const handleMotionChange = () => setPrefersReducedMotion(motionMediaQuery.matches)

    motionMediaQuery.addEventListener('change', handleMotionChange)

    return () => {
      motionMediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  // Disable sticky scroll effect only if user prefers reduced motion
  const shouldUseStaticLayout = prefersReducedMotion

  // For the simplified approach, all cards can breathe since they're separate sections
  const shouldAnimateCard1 = true
  const shouldAnimateCard2 = true
  const shouldAnimateCard3 = true

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
            How I got here
          </h3>
        </div>

        {/* Cards in vertical sequence */}
        <div className="space-y-8">
          <FloatingTextCard
            title="Big Tech gave me the tools"
            description="I spent years at Coinbase and Uber building systems that serve millions. I learned how to ship, how to scale, and how to build things that work. But I also saw how technology can optimize for engagement without ever asking whether it's making people better."
            imageSrc="/farm-landscapes/pixelated-divine-logos-0.png"
            imageAlt="Rolling farmland with clouds"
            textPosition="bottom-8 left-4 right-4 flex justify-center"
          />

          <FloatingTextCard
            title="Japan gave me the roots"
            description="I walked away to study theology, farm in rural Japan, and ask harder questions. What would technology look like if it served human flourishing — not just growth metrics? The answer started taking shape."
            imageSrc="/farm-landscapes/pixelated-divine-logos-1.png"
            imageAlt="Seedling breaking through soil"
            textPosition="bottom-6 left-6"
          />

          <FloatingTextCard
            title="Now I'm growing something different"
            description="Software that helps you own your habits, reason through hard problems, and control your own data. Tools built on the conviction that technology should make people freer and more capable — not more dependent."
            imageSrc="/farm-landscapes/pixelated-divine-logos-2.png"
            imageAlt="Lush, abundant landscape"
            textPosition="bottom-4 left-4"
          />
        </div>
      </section>
    )
  }

  // Desktop sticky scroll version - simplified approach
  return (
    <div id="divine-logos" className="bg-stone-200 dark:bg-stone-800 transition-colors duration-300">
      {/* Title */}
      <div className="container mx-auto px-4 pt-20 pb-8">
        <h3 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-200 text-center transition-colors duration-300">
          How I got here
        </h3>
      </div>

      {/* Card 1 - Sticky section */}
      <section className="sticky top-20 h-screen bg-stone-200 dark:bg-stone-800 z-10 mt-12">
        <div className="h-full flex items-center justify-center px-0 md:px-8 py-24">
          <FloatingTextCard
            title="Big Tech gave me the tools"
            description="I spent years at Coinbase and Uber building systems that serve millions. I learned how to ship, how to scale, and how to build things that work. But I also saw how technology can optimize for engagement without ever asking whether it's making people better."
            imageSrc="/farm-landscapes/pixelated-divine-logos-0.png"
            imageAlt="Rolling farmland with clouds"
            textPosition="top-2/3 left-8 right-8 transform -translate-y-1/8 text-justify"
            disableBreathing={!shouldAnimateCard1}
          />
        </div>
      </section>

      {/* Card 2 - Sticky section */}
      <section className="sticky top-20 h-screen bg-stone-200 dark:bg-stone-800 z-20">
        <div className="h-full flex items-center justify-center px-0 md:px-8 py-24">
          <FloatingTextCard
            title="Japan gave me the roots"
            description="I walked away to study theology, farm in rural Japan, and ask harder questions. What would technology look like if it served human flourishing — not just growth metrics? The answer started taking shape."
            imageSrc="/farm-landscapes/pixelated-divine-logos-1.png"
            imageAlt="Seedling breaking through soil"
            textPosition="bottom-8 left-8 w-1/2 flex justify-center"
            disableBreathing={!shouldAnimateCard2}
          />
        </div>
      </section>

      {/* Card 3 - Sticky section */}
      <section className="sticky top-20 h-screen bg-stone-200 dark:bg-stone-800 z-30">
        <div className="h-full flex items-center justify-center px-0 md:px-8 py-24">
          <FloatingTextCard
            title="Now I'm growing something different"
            description="Software that helps you own your habits, reason through hard problems, and control your own data. Tools built on the conviction that technology should make people freer and more capable — not more dependent."
            imageSrc="/farm-landscapes/pixelated-divine-logos-2.png"
            imageAlt="Lush, abundant landscape"
            textPosition="bottom-8 left-1/2 transform -translate-x-1/2"
            disableBreathing={!shouldAnimateCard3}
          />
        </div>
      </section>
    </div>
  )
}

// Building Today Section (collapsed: quote only). Full section with focus areas lives in components/BuildingTodayFullSection.tsx for reuse.
const BuildingTodaySection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px -100px 0px" })
  const isMobile = useMediaQuery("(max-width: 768px)")

  const containerVariants = {
    hidden: { opacity: isMobile ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: isMobile ? {} : { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: isMobile ? {} : { duration: 0.5, ease: "easeOut" as const },
    },
  }

  return (
    <section id="mission" ref={ref} className="py-20 bg-stone-100 dark:bg-stone-700 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-white dark:bg-stone-800 border-4 border-stone-800 dark:border-stone-600 shadow-lg p-8 transition-all duration-300"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div className="text-center" variants={itemVariants}>
              <p className="text-xl sm:text-2xl text-stone-800 dark:text-stone-200 leading-relaxed font-semibold">
                The underutilization of human potential is one of our most critical problems. Technology should amplify what makes us human, not exploit our weaknesses.
              </p>
            </motion.div>
          </motion.div>
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
                href="#mission"
                className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
              >
                Mission
              </a>
              <a
                href="#products"
                className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
              >
                Products
              </a>
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
                  href="#mission"
                  className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
                >
                  Mission
                </a>
                <a
                  href="#products"
                  className="text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-300"
                >
                  Products
                </a>
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
      <section className="relative min-h-[64vh] w-full overflow-hidden bg-stone-700 dark:bg-stone-700 transition-colors duration-300 py-12 lg:py-0 px-4 lg:px-0">
        <div className="grid w-full min-h-[64vh] lg:grid-cols-2 gap-0 lg:gap-12">
          {/* Image side */}
          <div className="relative order-2 lg:order-1 overflow-hidden flex items-center justify-center lg:pl-4 xl:pl-8">
            <motion.img
              src="/farmer-programmer.png"
              alt="Pixelated scene of a programmer working at a desk with a view of pastoral farmland through a window"
              className="w-full h-full object-cover max-h-[50vh] lg:max-h-none lg:absolute inset-0 lg:w-full lg:h-full"
              style={{ imageRendering: "pixelated" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              loading="eager"
            />
          </div>
          {/* Text side */}
          <div className="order-1 lg:order-2 flex flex-col justify-center text-center lg:text-left py-8 lg:py-16 lg:pr-4 xl:pr-8 lg:pl-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-6"
            >
              <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-100 leading-tight transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                I left Silicon Valley to start a farm in rural Japan
              </motion.h2>
              <motion.p
                className="text-lg sm:text-xl text-stone-200 leading-relaxed transition-colors duration-300 whitespace-pre-line"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                Ex-Coinbase engineer gone full solopreneur. I build products that build better people — software that enables human autonomy and cooperation.{"\n\n"}
                When I&apos;m not shipping, I&apos;m farming sweet potatoes and edamame in the countryside.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white border-2 border-stone-800 dark:border-stone-600 shadow-lg font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Read the Full Story
                  <span className="text-lg">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Garden Sticky Scroll Section */}
      <GardenStickyScrollSection />

      {/* Building Today Section */}
      <BuildingTodaySection />

      {/* Product Showcase */}
      <section id="products" className="py-20 bg-stone-200 dark:bg-stone-800 transition-colors duration-300">
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
          </div>
        </div>
      </section>

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
                  <a href="/truthexchange" className="hover:text-green-400 transition-colors">
                    TruthExchange
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
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-lg font-bold">Connect</h5>
              <div className="flex space-x-4">
                <a href="https://github.com/thehonestfarmer/" target="_blank" rel="noopener noreferrer" className="text-stone-300 hover:text-green-400 transition-colors">
                  <Github size={24} />
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
                  <a href="mailto:thehonestfarmer@proton.me" className="hover:text-green-400 transition-colors">thehonestfarmer@proton.me</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-400 text-sm">© 2025 Honest Farming. All rights reserved.</p>
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

        /* How I got here card styles */
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

        /* Ensure proper aspect ratio for How I got here images */
        @media (min-width: 768px) {
          .divine-logos-image-container img {
            aspect-ratio: 16/10;
          }
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

        /* Floating text card styles */
        .floating-text-card {
          /* Fallback for browsers without backdrop-filter support */
          background: rgba(255, 255, 255, 0.95);
        }
        
        @supports (backdrop-filter: blur(10px)) {
          .floating-text-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(12px);
          }
        }

        /* Ensure smooth scroll transforms without throttling */
        .scroll-transform-layer {
          /* Force GPU acceleration */
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
          /* Remove any transition delays that might interfere */
          transition: none !important;
          /* Optimize for smooth animations */
          will-change: transform;
          /* Match section background to prevent black flash */
          background-color: #e7e5e4; /* stone-200 */
        }

        .dark .scroll-transform-layer {
          background-color: #292524; /* stone-800 */
        }

        /* Simple scroll anchoring fixes */
        html {
          overflow-anchor: none;
        }
        
        #divine-logos {
          overflow-anchor: none;
        }
        
        #mission {
          overflow-anchor: none;
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

          /* Mobile sticky scroll adjustments */
          .mobile-sticky-container {
            top: 80px !important; /* Adjust for mobile header */
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
