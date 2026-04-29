"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Star, Wrench, DollarSign, Smartphone, Award, Trophy, Gem, Check, Flame, Bot } from "lucide-react";

const steps = [
  {
    icon: Wrench,
    title: "Customer needs a used engine.",
    desc: "You submit the vehicle. We handle the calls.",
  },
  {
    icon: DollarSign,
    title: "We show you base prices.",
    desc: "You set your markup. AI suggests the winning price.",
  },
  {
    icon: Smartphone,
    title: "Send the quote under your name.",
    desc: "Customer sees only your shop. You keep the markup.",
  },
];

const earningModels = [
  {
    name: "Commission",
    sub: "Model A",
    desc: "Refer customers to us. Earn $200–$500 per closed deal.",
    highlight: false,
  },
  {
    name: "Markup",
    sub: "Model B — Recommended",
    desc: "We source. You set the final price. Keep the margin.",
    highlight: true,
  },
  {
    name: "Hybrid",
    sub: "Model C",
    desc: "Best of both worlds. Reserved for Platinum partners.",
    highlight: false,
  },
];

const tiers = [
  {
    name: "Silver",
    badge: Award,
    badgeColor: "text-text-secondary",
    fee: "12% platform fee",
    features: ["Entry tier", "Access to all parts"],
    highlight: false,
  },
  {
    name: "Gold",
    badge: Trophy,
    badgeColor: "text-yellow-400",
    fee: "9% platform fee",
    features: ["3+ deals/mo", "Priority leads", "9% fee"],
    highlight: false,
  },
  {
    name: "Platinum",
    badge: Gem,
    badgeColor: "text-purple-400",
    fee: "6% platform fee",
    features: [
      "9+ deals/mo",
      "Dedicated CSM",
      "Exclusive territory options",
      "6% fee",
    ],
    highlight: true,
  },
];

const testimonials = [
  {
    name: "Mike T.",
    shop: "Mike's Auto Repair",
    city: "Dallas, TX",
    quote: "I was spending 4 hours a week calling yards for engines. Now I click submit and get base quotes in 90 seconds. Makes me an extra $4K/month easy.",
  },
  {
    name: "Jessica L.",
    shop: "Precision Motors",
    city: "Austin, TX",
    quote: "The Markup model is perfect. Customers think I have a secret supplier network. I just forward the AutoMotor quote with my number on it.",
  },
  {
    name: "Carlos R.",
    shop: "South TX Auto",
    city: "San Antonio, TX",
    quote: "Got to Platinum in my second month. The 6% fee and dedicated CSM have been game-changing for my shop.",
  },
];

const faqs = [
  {
    q: "How much can I actually earn?",
    a: "Average Markup model partners earn $3,800–$5,200/month in additional profit. Top earners in high-volume markets exceed $12K/month. Earnings depend on your deal volume and how aggressively you price.",
  },
  {
    q: "Do I need to change how my shop operates?",
    a: "No. AutoMotor fits into your existing workflow. You still quote customers, still handle installs. The only thing that changes is where you source parts — and how fast you do it.",
  },
  {
    q: "How does payment work?",
    a: "You collect full payment from your customer. AutoMotor invoices you the base price + platform fee after delivery. Net 15 terms for established partners.",
  },
  {
    q: "Is there a contract?",
    a: "No contracts. Month-to-month. Cancel anytime with 30 days notice. We earn our place in your workflow every month.",
  },
  {
    q: "Can my customer see AutoMotor's branding?",
    a: "Never. All customer-facing documents (quotes, invoices, receipts) use your shop name and logo. AutoMotor is invisible to your customers.",
  },
];

const liveTicker = [
  "Mike's Auto in Dallas just earned $640 on a Silverado engine · 3 min ago",
  "Jessica's Shop in Austin just earned $410 on a transmission · 12 min ago",
  "Carlos Auto SA just earned $820 on a Cummins diesel · 18 min ago",
  "Premier Motors in Houston just earned $550 on a Ram engine · 25 min ago",
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left text-text-primary font-medium text-sm hover:text-orange-DEFAULT transition-colors"
      >
        {q}
        {open ? (
          <ChevronUp size={16} className="flex-shrink-0 text-text-secondary" aria-hidden="true" />
        ) : (
          <ChevronDown size={16} className="flex-shrink-0 text-text-secondary" aria-hidden="true" />
        )}
      </button>
      {open && (
        <p className="pb-4 text-sm text-text-secondary leading-relaxed">{a}</p>
      )}
    </div>
  );
}

function EarningsTicker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % liveTicker.length);
        setVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-panel rounded-xl border border-line px-4 py-3">
      <p
        className={`text-sm text-text-secondary transition-all duration-400 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
      >
        <DollarSign size={14} className="inline text-green-400 mr-1" aria-hidden="true" />
        {liveTicker[idx]}
      </p>
    </div>
  );
}

export default function MechanicsPage() {
  return (
    <div className="min-h-screen pb-16">
      {/* Hero */}
      <section className="px-4 lg:px-8 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-semibold tracking-tight text-3xl lg:text-4xl text-text-primary mb-4 leading-tight">
              Earn $500+ per engine job.
              <br />
              Without the sourcing headache.
            </h1>
            <p className="text-text-secondary text-lg mb-6">
              Our AI finds the engine. You install it and keep the markup. Simple.
            </p>
            <div className="flex gap-6 mb-8">
              {[
                { num: "2,400+", label: "mechanic partners" },
                { num: "$4,200", label: "avg extra/month" },
                { num: "10%", label: "override on referrals" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-semibold tracking-tight text-2xl text-orange-DEFAULT">{s.num}</p>
                  <p className="text-xs text-text-secondary">{s.label}</p>
                </div>
              ))}
            </div>
            <Link
              href="/mechanics/signup"
              className="inline-block px-4 py-2.5 rounded-lg bg-orange-DEFAULT text-white font-semibold hover:bg-orange-hover transition-colors"
            >
              Become a Partner Mechanic — Free to start
            </Link>
          </div>

          {/* Dashboard mockup */}
          <div className="flex justify-center">
            <div className="bg-panel border border-line rounded-xl p-5 w-full max-w-[340px]">
              <p className="text-xs text-text-secondary mb-3 font-medium">New quote request</p>
              <div className="bg-bg rounded-xl border border-line p-3 mb-3">
                <p className="text-sm font-semibold text-text-primary">2014 Silverado · 5.3L V8</p>
                <p className="text-xs text-text-secondary mt-0.5">Customer: Dave M. · Budget: $2,500</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Base cost (from AutoMotor)</span>
                  <span className="text-text-primary font-mono">$1,800</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Your markup</span>
                  <span className="text-orange-DEFAULT font-mono font-semibold">+$550</span>
                </div>
                <div className="flex justify-between text-sm font-semibold border-t border-line pt-2">
                  <span className="text-text-primary">Your quote to customer</span>
                  <span className="text-text-primary">$2,350</span>
                </div>
              </div>
              <p className="text-xs text-green-400 text-center mt-3 flex items-center justify-center gap-1.5">
                <Bot size={12} aria-hidden="true" /> AI suggestion: $2,350 wins 74% of similar jobs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-semibold tracking-tight text-2xl lg:text-3xl text-text-primary text-center mb-8">
            How it works for mechanics
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

      {/* Earning models */}
      <section className="px-4 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-semibold tracking-tight text-2xl lg:text-3xl text-text-primary text-center mb-8">
            Choose your earning model
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {earningModels.map((m) => (
              <div
                key={m.name}
                className={`bg-panel rounded-xl border p-6 ${
                  m.highlight ? "border-orange-DEFAULT/40" : "border-line"
                }`}
              >
                {m.highlight && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-DEFAULT/20 text-orange-DEFAULT text-xs font-semibold mb-2">
                    <Flame size={11} aria-hidden="true" /> Recommended
                  </span>
                )}
                <p className="text-xs text-text-secondary mb-1">{m.sub}</p>
                <h3 className="font-semibold tracking-tight text-xl text-text-primary mb-3">
                  {m.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier system */}
      <section className="px-4 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-semibold tracking-tight text-2xl lg:text-3xl text-text-primary text-center mb-8">
            Tier system — the more you do, the less you pay
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`bg-panel rounded-xl border p-6 ${
                  t.highlight ? "border-orange-DEFAULT/60" : "border-line"
                }`}
              >
                <t.badge size={28} className={`mb-2 ${t.badgeColor}`} aria-hidden="true" />
                {t.highlight && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-orange-DEFAULT/20 text-orange-DEFAULT text-xs font-semibold mb-2">
                    Best value
                  </span>
                )}
                <h3 className="font-semibold tracking-tight text-xl text-text-primary">{t.name}</h3>
                <p className="text-orange-DEFAULT font-semibold text-sm mt-1 mb-3">{t.fee}</p>
                <ul className="space-y-1.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                      <Check size={13} className="text-green-400 flex-shrink-0" aria-hidden="true" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live earnings ticker */}
      <section className="px-4 lg:px-8 mb-16">
        <div className="max-w-2xl mx-auto">
          <h3 className="font-semibold tracking-tight text-lg text-text-primary text-center mb-4">
            Partner earnings, live
          </h3>
          <EarningsTicker />
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
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
                  <p className="text-xs text-text-secondary">{t.shop} · {t.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 lg:px-8 mb-16">
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
            Turn every engine job into
            <br />
            <span className="text-orange-DEFAULT">$500+ extra profit.</span>
          </h2>
          <p className="text-text-secondary mb-6">Free to start. No contracts. Cancel anytime.</p>
          <Link
            href="/mechanics/signup"
            className="inline-block px-5 py-3 rounded-lg bg-orange-DEFAULT text-white font-medium hover:bg-orange-hover transition-colors"
          >
            Apply to become a partner
          </Link>
        </div>
      </section>
    </div>
  );
}
