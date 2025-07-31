"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Users, CheckCircle, AlertTriangle, Eye, Network, FileText, Shield } from "lucide-react"
import MobileBackFooter from "@/components/MobileBackFooter"

export default function TruthExchangeLanding() {
  const [email, setEmail] = useState("")
  const [interest, setInterest] = useState("")

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("TruthExchange waitlist signup:", email, "Interest:", interest)
    setEmail("")
    setInterest("")
    alert("Thank you for joining the TruthExchange waitlist! You'll be notified when we launch the beta.")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/truthexchange-logo-1.png"
                alt="TruthExchange logo - geometric diamond crystal representing truth verification"  
                className="w-8 h-8 object-contain"
                style={{
                  imageRendering: 'pixelated',
                }}
              />
              <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 tracking-tight transition-colors duration-300">
                TruthExchange
              </h1>
            </div>
            <Button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-sm font-medium px-6 transition-all duration-300"
            >
              Join
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex justify-center mb-8">
              <img
                src="/truthexchange-logo-1.png"
                alt="TruthExchange logo - geometric diamond crystal representing truth verification"
                className="w-20 h-20 object-contain"
                style={{
                  imageRendering: 'pixelated',
                }}
              />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight transition-colors duration-300">
              Truth Through
              <br />
              <span className="text-blue-600 dark:text-blue-400">Community Intelligence</span>
            </h2>
            <p className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed transition-colors duration-300 max-w-3xl mx-auto">
              What Wikipedia promised, TruthExchange delivers—collaborative truth-seeking with systematic evidence evaluation
            </p>
            <Button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            >
              Join
            </Button>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Join researchers, citizens, and truth-seekers building transparent methodology
            </p>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-12 text-center transition-colors duration-300">
              The Truth Crisis
            </h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <Card className="border-2 border-slate-200 dark:border-slate-600 shadow-md bg-white dark:bg-slate-800 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    Wikipedia&apos;s Gatekeeping
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Editorial gatekeeping controls &quot;truth&quot;—especially on modern controversies where bias matters most.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-200 dark:border-slate-600 shadow-md bg-white dark:bg-slate-800 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    Biased Fact-Checkers
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Centralized bias disguised as objectivity—trust us, we&apos;re the experts.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-200 dark:border-slate-600 shadow-md bg-white dark:bg-slate-800 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    Social Media Echo Chambers
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Echo chambers without evidence standards—confirmation bias at scale.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300">
              Our Solution
            </h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8">
              <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                TruthExchange applies social networking to evidence evaluation. Submit claims, verify sources together, 
                follow researchers you trust, and expose manipulation attempts through transparent community methodology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-12 text-center transition-colors duration-300">
              How It Works
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Submit Claims
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Post controversial claims and start gathering evidence. Claims and evidence are first-class objects, not buried in narrative articles.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Evaluate Evidence
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Community verifies sources, identifies logical fallacies, and tracks manipulation through systematic methodology.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Track Truth
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Transparent consensus emerges through systematic methodology that can&apos;t be controlled by ideological gatekeepers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-12 text-center transition-colors duration-300">
              Our Approach
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Claims and Evidence as First-Class Objects
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    Not buried in narrative articles—evidence and claims stand on their own for transparent evaluation.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Network className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Social Networks Determine Credibility
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    Follow trusted researchers and build credibility weighting through transparent community relationships.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Systematic Fallacy Identification
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    Logical fallacies identified systematically, not left to editorial judgment or political bias.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Expose Source Manipulation
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    Community verification exposes manipulation attempts through transparent methodology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-20 bg-slate-100 dark:bg-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-12 transition-colors duration-300">
              Perfect For
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-slate-200 dark:border-slate-600 shadow-md bg-white dark:bg-slate-800 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    Researchers & Truth-Seekers
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Researchers who need reliable source verification and citizens seeking truth over confirmation bias.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-200 dark:border-slate-600 shadow-md bg-white dark:bg-slate-800 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    Wikipedia Refugees
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Anyone frustrated with Wikipedia&apos;s political spin and ready for transparent methodology.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 bg-blue-600 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h3 className="text-3xl sm:text-4xl font-bold text-white">
              Join the Truth Network
            </h3>
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
              Be among the first to experience collaborative truth-seeking when we launch the beta.
            </p>
            
            <form onSubmit={handleWaitlistSubmit} className="space-y-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-0 bg-white text-slate-900 font-medium py-3 px-4 rounded-lg shadow-sm"
              />
              
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full border-0 bg-white text-slate-900 font-medium py-3 px-4 rounded-lg shadow-sm appearance-none cursor-pointer"
                style={{ backgroundImage: "url(\"data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23666' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "12px" }}
              >
                <option value="" disabled>What topics are you most interested in verifying?</option>
                <option value="politics">Political Claims & Media Analysis</option>
                <option value="science">Scientific Studies & Health Claims</option>
                <option value="technology">Technology & AI Development</option>
                <option value="history">Historical Events & Narratives</option>
                <option value="economics">Economic Data & Policy Claims</option>
                <option value="other">Other / General Truth-Seeking</option>
              </select>

              <Button
                type="submit"
                className="w-full bg-white hover:bg-slate-50 text-blue-600 border-0 shadow-lg font-semibold py-3 px-8 text-lg transition-all duration-300 hover:scale-105"
              >
                Join the Waitlist
              </Button>
            </form>
            
            <div className="flex items-center justify-center space-x-6 text-blue-200">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>5,000+ researchers waiting</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Privacy-first platform</span>
              </div>
            </div>
            
            <p className="text-sm text-blue-200">
              You&apos;ll be notified when we launch the beta. No spam, just truth.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <img
                src="/truthexchange-logo-1.png"
                alt="TruthExchange logo"
                className="w-8 h-8 object-contain"
                style={{
                  imageRendering: 'pixelated',
                }}
              />
              <h4 className="text-xl font-semibold">TruthExchange</h4>
            </div>
            <p className="text-slate-300 max-w-md mx-auto">
              Truth through community intelligence. What Wikipedia promised, TruthExchange delivers.
            </p>
            <div className="border-t border-slate-700 pt-6">
              <p className="text-slate-400 text-sm">
                © 2024 TruthExchange by Honest Farming. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Mobile Back Footer */}
      <MobileBackFooter />
    </div>
  )
}