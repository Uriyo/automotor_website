"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Star, ClipboardList, Bell, DollarSign, AlertTriangle, Check } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Upload inventory.",
    desc: "CSV from Hollander, Checkmate, or Pinnacle. We handle the rest.",
  },
  {
    icon: Bell,
    title: "Get qualified leads via SMS.",
    desc: "Score 80+ leads only. No tire kickers.",
  },
  {
    icon: DollarSign,
    title: "Quote, close, get paid.",
    desc: "Stripe Connect. Payouts every Friday.",
  },
];

const tiers = [
  {
    name: "Basic",
    price: "$0/mo",
    features: [
      "3-hour delayed leads",
      "Up to 50 inventory items",
      "Per-lead pricing",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$599/mo",
    features: [
      "60-second leads",
      "Unlimited inventory",
      "30% off per-lead fees",
    ],
    popular: true,
  },
  {
    name: "Exclusive",
    price: "$2,499/mo",
    features: [
      "First-look leads",
      "AI voice agent for inbound calls",
      "Dedicated CSM",
      "Exclusive zip codes",
      "100 leads included",
    ],
    popular: false,
  },
];

const testimonials = [
  {
    name: "Tommy R.",
    yard: "Tommy's Auto Salvage",
    city: "Dallas, TX",
    quote: "We were getting maybe 20 engine calls a month. Now we close 35+ deals. AutoMotor basically replaced our sales team.",
    stat: "+$18K/month after 60 days",
  },
  {
    name: "Carla M.",
    yard: "Desert Parts Phoenix",
    city: "Phoenix, AZ",
    quote: "The lead quality is insane. These customers already know what they want and have a budget. We just quote and close.",
    stat: "+$12K/month after 45 days",
  },
  {
    name: "Jeff B.",
    yard: "Midwest Salvage",
    city: "Kansas City, MO",
    quote: "Switched from Pro to Exclusive after month 2. The first-look leads alone paid for the subscription 3x over.",
    stat: "+$24K/month after 90 days",
  },
];

const faqs = [
  {
    q: "How quickly do I get leads?",
    a: "Pro and Exclusive yards receive leads within 60 seconds of a customer match. Basic yards receive delayed leads (up to 3 hours). Premium tiers see dramatically higher close rates because you're first to respond.",
  },
  {
    q: "Do I have to pay upfront?",
    a: "No. Basic is completely free. Pro and Exclusive plans have a 90-day free trial. You only pay after you've seen the results.",
  },
  {
    q: "What happens if a lead is bad?",
    a: "Every lead is guaranteed. If a lead is invalid (fake number, duplicate, impossible fitment), dispute it within 48 hours for a full credit. Our quality team reviews all disputes within 4 hours.",
  },
  {
    q: "Can I pause my subscription?",
    a: "Yes. Pause anytime from your dashboard. We'll stop sending leads and pause your billing. Resume with one click.",
  },
  {
    q: "How do payouts work?",
    a: "Payouts happen every Friday via Stripe Connect. Funds are held in escrow until delivery confirmation, protecting both you and the customer.",
  },
];

function ROICalculator() {
  const [engines, setEngines] = useState(20);
  const [avgPrice, setAvgPrice] = useState(1800);
  const [closeRate, setCloseRate] = useState(30);

  const revenue = Math.round((engines * (closeRate / 100) * avgPrice) / 100) * 100;
  const profit = Math.round(revenue * 0.35);
  const roi = profit > 0 ? Math.round(profit / 599) : 0;

  return (
    <div className="bg-panel rounded-xl border border-line p-6">
      <h3 className="font-semibold tracking-tight text-2xl text-text-primary mb-6">
        Calculate your ROI
      </h3>
      <div className="space-y-5 mb-6">
        {[
          { label: "Engines sold per month", value: engines, min: 1, max: 200, onChange: setEngines },
          { label: "Average engine price ($)", value: avgPrice, min: 500, max: 10000, onChange: setAvgPrice, step: 100 },
          { label: "Current close rate (%)", value: closeRate, min: 5, max: 80, onChange: setCloseRate },
        ].map((s) => (
          <div key={s.label}>
            <div className="flex justify-between mb-1.5">
              <span className="text-sm text-text-secondary">{s.label}</span>
              <span className="text-sm font-semibold text-text-primary">
                {s.label.includes("$") ? `$${s.value.toLocaleString()}` : s.label.includes("%") ? `${s.value}%` : s.value}
              </span>
            </div>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step || 1}
              value={s.value}
              onChange={(e) => s.onChange(Number(e.target.value))}
              aria-label={s.label}
              className="w-full accent-orange-DEFAULT"
            />
          </div>
        ))}
      </div>
      <div className="bg-bg rounded-xl border border-orange-DEFAULT/20 p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Est. monthly revenue through AutoMotor</span>
          <span className="font-semibold text-text-primary">${revenue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Est. monthly profit</span>
          <span className="font-semibold text-text-primary">${profit.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-base font-semibold border-t border-line pt-2 mt-2">
          <span className="text-text-primary">ROI</span>
          <span className="text-orange-DEFAULT">{roi}×</span>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left text-text-primary font-medium text-sm hover:text-orange-DEFAULT transition-colors"
      >
        {q}
        {open ? <ChevronUp size={16} className="flex-shrink-0 text-text-secondary" aria-hidden="true" /> : <ChevronDown size={16} className="flex-shrink-0 text-text-secondary" aria-hidden="true" />}
      </button>
      {open && (
        <p className="pb-4 text-sm text-text-secondary leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function JunkyardsPage() {
  return (
    <div className="min-h-screen pb-16">
      {/* Hero */}
      <section className="px-4 lg:px-8 py-10 sm:py-14 lg:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <div>
            <h1 className="font-semibold tracking-tight text-2xl sm:text-3xl lg:text-4xl text-text-primary mb-4 leading-tight text-balance">
              AI-qualified leads.
              <br />
              Delivered to your phone.
            </h1>
            <p className="text-text-secondary text-sm sm:text-base lg:text-lg mb-6 text-balance">
              Stop playing phone tag. Our AI calls customers for you. You just quote and close.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-8">
              <div>
                <p className="font-semibold tracking-tight text-2xl text-orange-DEFAULT">500+</p>
                <p className="text-xs text-text-secondary">yards on the platform</p>
              </div>
              <div>
                <p className="font-semibold tracking-tight text-2xl text-orange-DEFAULT">$48M</p>
                <p className="text-xs text-text-secondary">in parts sold</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/junkyards/signup"
                className="px-4 py-2.5 rounded-lg bg-orange-DEFAULT text-white font-semibold hover:bg-orange-hover transition-colors"
              >
                Become a Partner Yard — Free 90 days
              </Link>
              <button className="px-4 py-2.5 rounded-lg border border-line text-text-primary text-sm font-medium hover:bg-elevated transition-colors">
                Watch 2-min demo
              </button>
            </div>
          </div>

          {/* SMS mockup */}
          <div className="flex justify-center">
            <div className="bg-panel border border-line rounded-xl p-5 max-w-[320px] w-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-orange-DEFAULT animate-pulse" />
                <span className="text-xs text-text-secondary font-medium">AutoMotor Lead Alert</span>
              </div>
              <div className="bg-bg rounded-xl p-4 border border-orange-DEFAULT/20">
                <p className="text-sm text-text-primary font-mono leading-relaxed flex flex-wrap items-start gap-x-1.5">
                  <AlertTriangle size={14} className="text-orange-DEFAULT inline-block mt-0.5" aria-hidden="true" />
                  <span><strong>NEW LEAD</strong> — 2014 Silverado 5.3 engine.<br />
                  Budget $2K. Dallas.<br />
                  <span className="text-orange-DEFAULT font-semibold">Score 87/100.</span><br />
                  Reply YES to quote.</span>
                </p>
              </div>
              <p className="text-xs text-text-secondary text-center mt-3">
                Avg response time: 3 min → 68% close rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-semibold tracking-tight text-xl sm:text-2xl lg:text-3xl text-text-primary text-center mb-6 sm:mb-8 text-balance">
            How it works for yards
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {steps.map((s, i) => (
              <div key={i} className="bg-panel rounded-xl border border-line p-6">
                <div className="w-10 h-10 rounded-xl bg-orange-DEFAULT/10 flex items-center justify-center mb-3">
                  <s.icon size={18} className="text-orange-DEFAULT" aria-hidden="true" />
                </div>
                <h3 className="font-semibold tracking-tight text-text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-semibold tracking-tight text-xl sm:text-2xl lg:text-3xl text-text-primary text-center mb-6 sm:mb-8 text-balance">
            Simple, transparent pricing
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`bg-panel rounded-xl border p-6 ${
                  t.popular ? "border-orange-DEFAULT/60" : "border-line"
                }`}
              >
                {t.popular && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-orange-DEFAULT/20 text-orange-DEFAULT text-xs font-semibold mb-3">
                    Most popular
                  </span>
                )}
                <h3 className="font-semibold tracking-tight text-xl text-text-primary">{t.name}</h3>
                <p className="font-semibold tracking-tight text-3xl text-orange-DEFAULT my-3">
                  {t.price}
                </p>
                <ul className="space-y-2 mb-6">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Check size={14} className="text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/junkyards/signup"
                  className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition-colors ${
                    t.popular
                      ? "bg-orange-DEFAULT text-white hover:bg-orange-hover"
                      : "border border-line text-text-primary hover:bg-elevated"
                  }`}
                >
                  Start free trial
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-2xl mx-auto">
          <ROICalculator />
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-semibold tracking-tight text-xl sm:text-2xl lg:text-3xl text-text-primary text-center mb-6 sm:mb-8 text-balance">
            What yards are saying
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-panel rounded-xl border border-line p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={13} className="text-orange-DEFAULT fill-orange-DEFAULT" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-line pt-3">
                  <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-secondary">{t.yard} · {t.city}</p>
                  <p className="text-sm text-orange-DEFAULT font-semibold mt-1">{t.stat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-semibold tracking-tight text-2xl text-text-primary mb-6">
            Frequently asked questions
          </h2>
          <div className="bg-panel rounded-xl border border-line px-6">
            {faqs.map((f, i) => <FAQItem key={i} {...f} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center bg-panel rounded-xl border border-line p-10">
          <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-3">
            Stop waiting on phone calls.
            <br />
            Start closing deals.
          </h2>
          <p className="text-text-secondary mb-6">
            Join 500+ yards already making money with AutoMotor.
          </p>
          <Link
            href="/junkyards/signup"
            className="inline-block px-5 py-3 rounded-lg bg-orange-DEFAULT text-white font-medium hover:bg-orange-hover transition-colors"
          >
            Sign up as a yard — Free 90 days
          </Link>
        </div>
      </section>
    </div>
  );
}
