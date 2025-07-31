"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Check, Users, BookOpen, Heart, Star, ChevronDown, ChevronUp } from "lucide-react"
import MobileBackFooter from "@/components/MobileBackFooter"

export default function GardenLanding() {
  const [email, setEmail] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("family")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle waitlist signup
    console.log("Waitlist signup:", email, "Plan:", selectedPlan)
    setEmail("")
    alert("Thank you for joining the Garden waitlist! We'll notify you when the first newsletter launches in Q3 2025.")
  }

  const pricingPlans = [
    {
      id: "individual",
      name: "Individual Age Group",
      price: "$12",
      period: "/month",
      description: "Perfect for families with children in one age range",
      features: [
        "One age-appropriate newsletter weekly",
        "Biblical frameworks for current events",
        "Discussion guides included",
        "7-day free trial"
      ],
      badge: null
    },
    {
      id: "family",
      name: "Family Complete",
      price: "$19",
      period: "/month",
      description: "All age groups for growing families",
      features: [
        "All three age group newsletters",
        "Family discussion integration",
        "Cross-age learning opportunities",
        "7-day free trial",
        "Priority support"
      ],
      badge: "Most Popular"
    },
    {
      id: "premium",
      name: "Premium Family Plus",
      price: "$29",
      period: "/month",
      description: "Complete family experience with extras",
      features: [
        "Everything in Family Complete",
        "Monthly family devotional guide",
        "Quarterly video Q&A sessions",
        "Early access to new features",
        "Direct creator feedback channel"
      ],
      badge: "Best Value"
    },
    {
      id: "agnostic",
      name: "Agnostic Exploration",
      price: "$15",
      period: "/month",
      description: "For curious minds seeking genuine Christian arguments",
      features: [
        "Adult-level content focus",
        "Rigorous intellectual engagement",
        "Historical and philosophical context",
        "No assumed belief required",
        "Respectful exploration format"
      ],
      badge: null
    }
  ]

  const ageExamples = [
    {
      age: "Ages 8-12",
      topic: "Why AI Can't Replace Humans",
      content: "God made people special with souls and creativity. Even the smartest computer can&apos;t love, imagine new things, or choose between right and wrong like we can. When we use AI tools, we&apos;re using the gifts God gave us to think and create!",
      color: "from-green-400/20 to-green-600/20"
    },
    {
      age: "Ages 13-17", 
      topic: "AI Ethics & Human Dignity",
      content: "The imago Dei (image of God) gives humans unique value that no artificial intelligence can replicate. While AI excels at pattern recognition, humans possess consciousness, moral agency, and creative reasoning that reflects our divine design.",
      color: "from-blue-400/20 to-blue-600/20"
    },
    {
      age: "Ages 18+",
      topic: "Transhumanism & Biblical Anthropology",
      content: "Christian anthropology offers a compelling alternative to transhumanist enhancement ideology. While technology can serve human flourishing, the embodied soul doctrine provides boundaries for ethical AI development and human augmentation.",
      color: "from-purple-400/20 to-purple-600/20"
    }
  ]

  const faqs = [
    {
      question: "When will the first Garden newsletter be available?",
      answer: "The first Garden newsletter will launch at the end of Q3 2025. We're currently in the pre-launch phase, building our content ingestion engines and developing the curriculum. Waitlist members will be notified as soon as we&apos;re ready to launch."
    },
    {
      question: "What's included in the 7-day free trial?",
      answer: "Your free trial includes the first full newsletter for your chosen age group(s), complete with biblical frameworks, current event analysis, and family discussion guides. No credit card required during the trial period."
    },
    {
      question: "How do the age groups work exactly?",
      answer: "Each age group receives the same core biblical content and frameworks, but presented at appropriate complexity levels. Younger children get concrete examples and simple language, while older groups engage with philosophical depth and nuanced arguments."
    },
    {
      question: "What makes this different from other Christian family resources?",
      answer: "Garden combines seminary-level apologetics rigor with age-appropriate presentation. Each newsletter addresses real current events through biblical frameworks, helping families think Christianly about everything from AI ethics to cultural challenges."
    },
    {
      question: "Is this suitable for families with mixed beliefs?",
      answer: "Absolutely. Our Agnostic Exploration tier is designed for curious minds who want to understand genuine Christian arguments without assumed belief. We present ideas respectfully and intellectually, making space for questions and exploration."
    },
    {
      question: "Can I switch plans after subscribing?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle. We want you to find the perfect fit for your family's needs."
    }
  ]

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 font-mono transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-stone-100 dark:bg-stone-800 border-b-4 border-stone-800 dark:border-stone-600 shadow-lg transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/garden-logo-1.png"
                alt="Garden logo - cross with growing leaves representing Christian apologetics"
                className="w-10 h-10 object-contain"
                style={{
                  imageRendering: 'pixelated',
                }}
              />
              <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-200 tracking-tight transition-colors duration-300">
                GARDEN
              </h1>
            </div>
            <Button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white border-2 border-stone-800 dark:border-stone-600 shadow-lg font-bold px-6 transition-all duration-300 hover:scale-105"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex justify-center mb-8">
              <img
                src="/garden-logo-1.png"
                alt="Garden logo - cross with growing leaves representing Christian apologetics"
                className="w-24 h-24 object-contain"
                style={{
                  imageRendering: 'pixelated',
                  transform: 'scale(1.2)',
                }}
              />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 dark:text-stone-200 leading-tight transition-colors duration-300">
              Biblical Frameworks for
              <br />
              <span className="text-green-700 dark:text-green-400">Every Age</span>
            </h2>
            <p className="text-xl sm:text-2xl text-stone-600 dark:text-stone-400 leading-relaxed transition-colors duration-300 max-w-3xl mx-auto">
              Weekly apologetics newsletters that help Christian families think biblically about AI, culture, and current events—with age-appropriate depth for everyone.
            </p>
            <div className="bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-600 dark:border-amber-400 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-amber-800 dark:text-amber-200 font-semibold">
                🌱 Pre-Launch Waitlist • First Newsletter: End of Q3 2025 • 7-Day Free Trial
              </p>
            </div>
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 border-2 border-stone-800 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold transition-colors duration-300"
              />
              <Button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white border-2 border-stone-800 shadow-lg font-bold px-8 whitespace-nowrap transition-all duration-300 hover:scale-105"
              >
                Join Waitlist
              </Button>
            </form>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Join 2,500+ families preparing for launch. No spam, just updates.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-stone-200 dark:bg-stone-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h3 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-200 mb-8 transition-colors duration-300">
              The Challenge Christian Families Face
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-4 border-stone-800 dark:border-stone-600 shadow-lg bg-white dark:bg-stone-700 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-red-500 border-2 border-stone-800 mx-auto mb-4 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">
                    Too Complex or Too Simple
                  </h4>
                  <p className="text-stone-600 dark:text-stone-400">
                    Apologetics resources are either seminary-level dense or oversimplified for children—nothing bridges the gap for families.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-stone-800 dark:border-stone-600 shadow-lg bg-white dark:bg-stone-700 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-500 border-2 border-stone-800 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">
                    Disconnected Generations
                  </h4>
                  <p className="text-stone-600 dark:text-stone-400">
                    Parents and children consume different content, missing opportunities for meaningful family discussions about faith and culture.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-stone-800 dark:border-stone-600 shadow-lg bg-white dark:bg-stone-700 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-500 border-2 border-stone-800 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">
                    Current Events Anxiety
                  </h4>
                  <p className="text-stone-600 dark:text-stone-400">
                    Families struggle to process AI developments, cultural shifts, and complex issues through a biblical worldview.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-stone-100 dark:bg-stone-700 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-200 mb-4 transition-colors duration-300">
                Same Truth, Perfect Depth
              </h3>
              <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-400 max-w-3xl mx-auto transition-colors duration-300">
                Garden delivers rigorous biblical frameworks through age-appropriate newsletters that grow with your family.
              </p>
            </div>

            <div className="space-y-8">
              {ageExamples.map((example, index) => (
                <Card key={index} className="border-4 border-stone-800 dark:border-stone-600 shadow-lg bg-white dark:bg-stone-700 overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`h-32 bg-gradient-to-br ${example.color} border-b-4 border-stone-800 dark:border-stone-600 flex items-center justify-center`}>
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-stone-800 dark:text-stone-200 mb-2">
                          {example.age}
                        </h4>
                        <p className="text-stone-700 dark:text-stone-300 font-semibold">
                          {example.topic}
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                        {example.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="bg-green-100 dark:bg-green-900/30 border-2 border-green-600 dark:border-green-400 rounded-lg p-6 max-w-3xl mx-auto">
                <h4 className="text-xl font-bold text-green-800 dark:text-green-200 mb-3">
                  Family Discussion Integration
                </h4>
                <p className="text-green-700 dark:text-green-300">
                  Each newsletter includes conversation starters that help families connect insights across age groups, fostering deeper understanding and stronger family bonds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-stone-200 dark:bg-stone-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-200 mb-4 transition-colors duration-300">
                Choose Your Garden Plan
              </h3>
              <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto transition-colors duration-300">
                All plans include a 7-day free trial when we launch. Start with any plan and switch anytime.
              </p>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
              {pricingPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`border-4 ${
                    plan.badge ? 'border-green-600 dark:border-green-400' : 'border-stone-800 dark:border-stone-600'
                  } shadow-lg bg-white dark:bg-stone-700 relative overflow-hidden transition-all duration-300 hover:scale-105`}
                >
                  {plan.badge && (
                    <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 text-sm font-bold">
                      {plan.badge}
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-stone-800 dark:text-stone-200 mb-2">
                      {plan.name}
                    </h4>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-green-700 dark:text-green-400">
                        {plan.price}
                      </span>
                      <span className="text-stone-600 dark:text-stone-400">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
                      {plan.description}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-stone-600 dark:text-stone-400">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      onClick={() => {
                        setSelectedPlan(plan.id)
                        document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className={`w-full ${
                        plan.badge 
                          ? 'bg-green-700 hover:bg-green-800 text-white' 
                          : 'bg-stone-700 hover:bg-stone-800 text-white'
                      } border-2 border-stone-800 shadow-lg font-bold transition-all duration-300 hover:scale-105`}
                    >
                      Join Waitlist
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-stone-100 dark:bg-stone-700 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-200 transition-colors duration-300">
                  Seminary-Level Rigor,<br />Family-Friendly Wisdom
                </h3>
                <div className="space-y-4 text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed transition-colors duration-300">
                  <p>
                    As an M.Div in Apologetics student at Southern Evangelical Seminary, I&apos;m training under some of the sharpest Christian minds in philosophy, theology, and cultural engagement.
                  </p>
                  <p>
                    But academic rigor means nothing if families can&apos;t access it. Garden bridges that gap—bringing seminary-quality biblical thinking to kitchen table conversations.
                  </p>
                  <p>
                    Every newsletter reflects years of theological study, but speaks in the language your family understands.
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-600 dark:border-blue-400 rounded-lg p-4">
                  <p className="text-blue-800 dark:text-blue-200 font-semibold text-center">
                    📚 Southern Evangelical Seminary • M.Div in Apologetics (In Progress)
                  </p>
                </div>
              </div>
              <div className="relative">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto border-4 border-stone-800 dark:border-stone-600 shadow-2xl transition-all duration-300 hover:scale-105"
                  style={{
                    imageRendering: 'pixelated',
                  }}
                >
                  <source src="/farm-landscape-6sec.webm" type="video/webm" />
                  <source src="/farm-landscape-6sec.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-stone-200 dark:bg-stone-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-200 mb-12 text-center transition-colors duration-300">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-4 border-stone-800 dark:border-stone-600 shadow-lg bg-white dark:bg-stone-700">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-stone-50 dark:hover:bg-stone-600 transition-colors duration-300"
                    >
                      <h4 className="text-lg font-bold text-stone-800 dark:text-stone-200 pr-4">
                        {faq.question}
                      </h4>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-stone-600 dark:text-stone-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-stone-600 dark:text-stone-400 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="waitlist" className="py-20 bg-green-700 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h3 className="text-3xl sm:text-4xl font-bold text-white">
              Plant Seeds of Biblical Wisdom
            </h3>
            <p className="text-lg sm:text-xl text-green-100 leading-relaxed">
              Join the waitlist and be among the first families to receive Garden when we launch at the end of Q3 2025.
            </p>
            
            <div className="bg-green-800 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-green-100 font-semibold mb-4">Selected Plan:</p>
              <p className="text-white text-lg font-bold">
                {pricingPlans.find(p => p.id === selectedPlan)?.name}
              </p>
              <p className="text-green-200 text-sm">
                {pricingPlans.find(p => p.id === selectedPlan)?.price}/month • 7-day free trial
              </p>
            </div>

            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 border-2 border-stone-800 bg-white text-stone-800 font-semibold"
              />
              <Button
                type="submit"
                className="bg-stone-800 hover:bg-stone-900 text-white border-2 border-stone-800 shadow-lg font-bold px-8 whitespace-nowrap"
              >
                Join Waitlist
              </Button>
            </form>
            
            <div className="flex items-center justify-center space-x-6 text-green-200">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>2,500+ families waiting</span>
              </div>
            </div>
            
            <p className="text-sm text-green-200">
              No spam, no sales pressure. Just honest updates about our progress toward launch.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 dark:bg-stone-900 text-white py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <img
                src="/garden-logo-1.png"
                alt="Garden logo"
                className="w-8 h-8 object-contain"
                style={{
                  imageRendering: 'pixelated',
                }}
              />
              <h4 className="text-xl font-bold">GARDEN</h4>
            </div>
            <p className="text-stone-300 max-w-md mx-auto">
              Biblical frameworks for every age. Launching Q3 2025.
            </p>
            <div className="border-t border-stone-600 pt-6">
              <p className="text-stone-400 text-sm">
                © 2024 Garden by Honest Farming. All rights reserved.
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