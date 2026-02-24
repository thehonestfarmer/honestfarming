"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TruthExchangeNetwork, { heroNetworkConfig } from "@/components/TruthExchangeNetwork"
import MobileBackFooter from "@/components/MobileBackFooter"

const WHITEPAPER_URL = "https://hackmd.io/@achungus/rkD2mAUvWl"

export default function TruthExchangeLanding() {
  const [email, setEmail] = useState("")
  const [interest, setInterest] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const response = await fetch("/api/truthexchange-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, interest }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage(data.message)
        setEmail("")
        setInterest("")
      } else {
        setSubmitMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      setSubmitMessage("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToWaitlist = () =>
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })

  return (
    <div className="min-h-screen bg-[#faf6f0] font-serif text-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#faf6f0] border-b-2 border-black">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/truthexchange-logo-1.png"
                alt="TruthExchange logo"
                className="h-8 w-8 object-contain"
                style={{ imageRendering: "pixelated" }}
              />
              <h1 className="text-xl font-serif font-bold tracking-tight md:text-2xl">
                TruthExchange $TX
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={WHITEPAPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black bg-white px-4 py-2 font-serif text-sm font-medium shadow-[4px_4px_0_0_#0a0a0a] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#0a0a0a]"
              >
                Read Whitepaper →
              </a>
              <Button
                onClick={scrollToWaitlist}
                className="rounded-none border-2 border-black bg-[#1a5799] font-serif font-medium text-white shadow-[4px_4px_0_0_#0a0a0a] hover:bg-[#1a5799]/90 hover:shadow-[6px_6px_0_0_#0a0a0a]"
              >
                Join
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[64vh] overflow-hidden border-b-2 border-black bg-[#faf6f0] py-20">
        <div className="absolute inset-0 z-[1] opacity-50">
          <TruthExchangeNetwork
            isDarkMode={false}
            className="w-full h-full"
            backgroundColor="#faf6f0"
            backgroundColorDark="#0a0a0a"
            particleColors={["#1a5799", "#2563eb", "#1e40af", "#1e3a8a"]}
            connectionColor="#1a5799"
            connectionColorDark="#60a5fa"
            {...heroNetworkConfig}
          />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="w-full rounded-2xl border-2 border-black/10 bg-[#faf6f0]/65 px-6 py-10 shadow-[4px_4px_0_0_rgba(10,10,10,0.08)] sm:px-10 sm:py-12">
            <div className="mx-auto w-[80%] max-w-full text-center">
              <div className="mb-8 flex justify-center">
                <img
                  src="/truthexchange-logo-1.png"
                  alt="TruthExchange logo"
                  className="h-20 w-20 object-contain"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <h2 className="font-serif text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Infrastructure for Reasoning
              </h2>
              <p className="mx-auto mt-6 text-lg leading-relaxed sm:text-xl">
                $TX is the native token of the TruthExchange protocol — a political
                reasoning marketplace where beliefs are living structures that update
                based on new information. A decentralized, reimagined Wikipedia for
                political reasoning.
              </p>
              <p className="mt-4 font-serif text-base italic text-[#0a0a0a]/80">
                Quis custodiet ipsos custodes?
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button
                  onClick={scrollToWaitlist}
                  size="lg"
                  className="rounded-none border-2 border-black bg-[#1a5799] px-8 py-4 font-serif text-lg font-semibold text-white shadow-[4px_4px_0_0_#0a0a0a] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#0a0a0a]"
                >
                  Join Waitlist
                </Button>
                <a
                  href={WHITEPAPER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-2 border-black bg-white px-6 py-3 font-serif text-lg font-semibold shadow-[4px_4px_0_0_#0a0a0a] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#0a0a0a]"
                >
                  Read Whitepaper →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="border-b-2 border-black bg-[#0a0a0a] py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <h3 className="mb-12 text-center font-serif text-3xl font-black tracking-tight sm:text-4xl">
              THE PROBLEM
            </h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="border-2 border-white bg-[#0a0a0a] p-6 shadow-[4px_4px_0_0_#fff]">
                <p className="mb-2 font-serif text-sm font-bold uppercase tracking-wide text-[#f5d000]">
                  Epistemological Fragmentation
                </p>
                <p className="font-serif leading-relaxed">
                  The deepest problem isn&apos;t necessarily polarization. It&apos;s
                  the deliberate fracturing of shared frameworks for evaluating
                  truth. When a distributed public can&apos;t agree on how to
                  evaluate evidence — let alone what the evidence says — they
                  cannot coordinate effectively.
                </p>
                <p className="mt-4 font-serif text-sm italic">
                  We are being made dumber. On purpose. Because dumber is more
                  profitable.
                </p>
              </div>
              <div className="border-2 border-white bg-[#0a0a0a] p-6 shadow-[4px_4px_0_0_#fff]">
                <p className="mb-2 font-serif text-sm font-bold uppercase tracking-wide text-[#f5d000]">
                  Word Theater
                </p>
                <p className="font-serif leading-relaxed">
                  The information ecosystem runs on performative speech
                  disconnected from consequences. Expert predictions carry no stake
                  in accuracy. Politicians make promises without binding
                  mechanisms. The entire discourse operates like writing checks on
                  an account with no balance — all commitment, no consequence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Insight */}
      <section className="border-b-2 border-black bg-[#faf6f0] py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h3 className="mb-4 text-center font-serif text-3xl font-black tracking-tight sm:text-4xl">
              THE INSIGHT
            </h3>
            <p className="text-center font-serif text-lg leading-relaxed">
              Every person carries an implicit belief tree — a structure of
              axioms, evidence, warrants, and conclusions that produces their
              positions on policy questions. But this tree is invisible. It lives
              in intuition, tribal affiliation, and inherited assumptions.
            </p>
            <p className="mt-6 text-center font-serif text-2xl font-bold text-[#1a5799]">
              TruthExchange makes the invisible visible.
            </p>
            <p className="mt-4 text-center font-serif leading-relaxed">
              When you can see your own belief tree, you discover internal
              contradictions, identify what would change your mind, and find
              unexpected common ground with people whose reasoning diverges at a
              specific, identifiable point — rather than across an unbridgeable
              ideological chasm.
            </p>
          </div>
        </div>
      </section>

      {/* What $TX Is — 3 primitives */}
      <section className="border-b-2 border-black bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h3 className="mb-12 text-center font-serif text-3xl font-black tracking-tight sm:text-4xl">
              WHAT $TX IS
            </h3>
            <div className="space-y-8">
              <div className="border-2 border-black bg-[#faf6f0] p-6 shadow-[4px_4px_0_0_#0a0a0a]">
                <div className="mb-2 h-1 w-16 bg-[#1a5799]" />
                <p className="font-serif text-sm font-bold uppercase tracking-wide text-[#1a5799]">
                  Evidence Node (Atom)
                </p>
                <p className="mt-2 font-serif leading-relaxed">
                  The irreducible unit. A piece of evidence exists independently
                  of any argument — a study, a dataset, a court ruling. Evidence
                  nodes are globally shared; the same piece can support claims in
                  thousands of belief trees. Each carries verification status and
                  confidence scores.
                </p>
              </div>
              <div className="border-2 border-black bg-[#faf6f0] p-6 shadow-[4px_4px_0_0_#0a0a0a]">
                <div className="mb-2 h-1 w-16 bg-[#1a5799]" />
                <p className="font-serif text-sm font-bold uppercase tracking-wide text-[#1a5799]">
                  CEWI Node (Molecule)
                </p>
                <p className="mt-2 font-serif leading-relaxed">
                  A structured argument: Claim, Evidence, Warrant, Impact — plus
                  Falsification (the inverse argument that would break this
                  chain). Every claim contains its structural opposite. The CEWI
                  framework gives every argument a consistent, traceable
                  structure adapted from competitive debate methodology.
                </p>
              </div>
              <div className="border-2 border-black bg-[#faf6f0] p-6 shadow-[4px_4px_0_0_#0a0a0a]">
                <div className="mb-2 h-1 w-16 bg-[#1a5799]" />
                <p className="font-serif text-sm font-bold uppercase tracking-wide text-[#1a5799]">
                  Belief Tree (Compound)
                </p>
                <p className="mt-2 font-serif leading-relaxed">
                  Multiple CEWI molecules connected by logical dependencies into a
                  coherent worldview. Organized like a filesystem — topic domains
                  as folders, CEWI chains as contents. Yours to share, compare,
                  and update as new evidence enters the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Token Utility */}
      <section className="border-b-2 border-black bg-[#faf6f0] py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h3 className="mb-12 text-center font-serif text-3xl font-black tracking-tight sm:text-4xl">
              TOKEN UTILITY
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: "FREE",
                  title: "Build your tree",
                  body: "Full conversational AI, shareable output. Always free.",
                },
                {
                  label: "SOCIAL",
                  title: "$TX required",
                  body: "Compare trees, reveal nodes, see how your reasoning clusters with others.",
                },
                {
                  label: "STAKING",
                  title: "Skin in the game",
                  body: "Stake $TX on CEWI nodes. Challenge or defend. Polymarket tells you what; $TX tells you why.",
                },
                {
                  label: "VERIFICATION",
                  title: "$TX required",
                  body: "Submit evidence nodes, verify sources, contribute to the global evidence layer.",
                },
              ].map((tier) => (
                <div
                  key={tier.label}
                  className="border-2 border-black bg-white p-5 shadow-[4px_4px_0_0_#0a0a0a]"
                >
                  <span className="inline-block border border-black bg-[#f5d000] px-2 py-0.5 font-serif text-xs font-bold uppercase">
                    {tier.label}
                  </span>
                  <p className="mt-3 font-serif font-bold">{tier.title}</p>
                  <p className="mt-1 font-serif text-sm leading-relaxed">
                    {tier.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Now */}
      <section className="border-b-2 border-black bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h3 className="mb-12 text-center font-serif text-3xl font-black tracking-tight sm:text-4xl">
              WHY NOW
            </h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="border-2 border-black bg-[#faf6f0] p-6 shadow-[4px_4px_0_0_#0a0a0a]">
                <p className="font-serif text-sm font-bold uppercase tracking-wide text-[#1a5799]">
                  AI capabilities
                </p>
                <p className="mt-3 font-serif leading-relaxed">
                  LLMs can extract structured arguments, conduct Socratic
                  dialogue, and surface evidence to help users articulate
                  positions. Combined with verification layers, they scaffold
                  human reasoning at scale.
                </p>
              </div>
              <div className="border-2 border-black bg-[#faf6f0] p-6 shadow-[4px_4px_0_0_#0a0a0a]">
                <p className="font-serif text-sm font-bold uppercase tracking-wide text-[#1a5799]">
                  Blockchain infrastructure
                </p>
                <p className="mt-3 font-serif leading-relaxed">
                  Immutable records create commitment devices. Smart contracts
                  enable automated accountability. Token mechanics align economic
                  incentives with epistemic quality. Fast chains enable
                  real-time interaction at negligible cost.
                </p>
              </div>
              <div className="border-2 border-black bg-[#faf6f0] p-6 shadow-[4px_4px_0_0_#0a0a0a]">
                <p className="font-serif text-sm font-bold uppercase tracking-wide text-[#1a5799]">
                  Cultural demand
                </p>
                <p className="mt-3 font-serif leading-relaxed">
                  Trust in institutions is at historic lows. Identity-driven
                  politics is a recent phenomenon, not human nature. The demand
                  for substance over spectacle is real — and necessary for a
                  democratic social order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Whitepaper callout */}
      <section className="border-b-2 border-black bg-[#1a5799] py-10">
        <div className="container mx-auto px-4 text-center">
          <a
            href={WHITEPAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-serif text-lg font-bold text-white underline decoration-2 underline-offset-4 hover:no-underline"
          >
            Read the full whitepaper →
          </a>
        </div>
      </section>

      {/* Waitlist */}
      <section
        id="waitlist"
        className="border-b-2 border-black bg-[#faf6f0] py-20"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl space-y-8 text-center">
            <h3 className="font-serif text-3xl font-black tracking-tight sm:text-4xl">
              JOIN THE WAITLIST
            </h3>
            <p className="font-serif leading-relaxed">
              Be among the first when we launch the belief tree builder and $TX.
            </p>

            <form
              onSubmit={handleWaitlistSubmit}
              className="mx-auto max-w-md space-y-4 text-left"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full rounded-none border-2 border-black bg-white font-serif disabled:opacity-50"
              />
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                disabled={isSubmitting}
                className="w-full rounded-none border-2 border-black bg-white px-4 py-3 font-serif disabled:opacity-50"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%230a0a0a' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  backgroundSize: "12px",
                }}
              >
                <option value="" disabled>
                  What topics interest you?
                </option>
                <option value="politics">Political Claims & Media</option>
                <option value="science">Scientific & Health Claims</option>
                <option value="technology">Technology & AI</option>
                <option value="history">Historical Events</option>
                <option value="economics">Economic & Policy</option>
                <option value="other">Other / General</option>
              </select>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-none border-2 border-black bg-[#1a5799] font-serif font-semibold text-white shadow-[4px_4px_0_0_#0a0a0a] disabled:opacity-50"
              >
                {isSubmitting ? "Joining…" : "Join the Waitlist"}
              </Button>
            </form>

            {submitMessage && (
              <div
                className={`rounded-none border-2 border-black p-3 text-sm font-serif ${
                  submitMessage.includes("Successfully")
                    ? "border-green-700 bg-green-100 text-green-900"
                    : "border-red-700 bg-red-100 text-red-900"
                }`}
              >
                {submitMessage}
              </div>
            )}

            {!submitMessage && (
              <p className="text-sm font-serif text-[#0a0a0a]/70">
                We&apos;ll notify you at launch. No spam.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <img
                src="/truthexchange-logo-1.png"
                alt="TruthExchange logo"
                className="h-8 w-8 object-contain"
                style={{ imageRendering: "pixelated" }}
              />
              <h4 className="font-serif text-xl font-bold">TruthExchange</h4>
            </div>
            <p className="mx-auto max-w-md font-serif text-sm text-white/80">
              Infrastructure for a world where political claims have
              consequences, reasoning is visible, and changing your mind based on
              evidence is rewarded.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 font-serif text-sm">
              <a
                href={WHITEPAPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-2 hover:no-underline"
              >
                Whitepaper
              </a>
              <a
                href="https://x.com/anhonestfarmer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-2 hover:no-underline"
              >
                @anhonestfarmer
              </a>
              <span>$TX on Solana (Pump.fun)</span>
            </div>
            <div className="border-t border-white/20 pt-6">
              <p className="font-serif text-xs text-white/60">
                © 2026 TruthExchange by Honest Farming. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <MobileBackFooter />
    </div>
  )
}
