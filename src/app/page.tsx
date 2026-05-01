"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Play,
  MessageSquare,
  Phone,
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Truck,
  Award,
  Car,
  Anchor,
  Wrench,
  Warehouse,
} from "lucide-react";
import ChatInput from "@/components/ChatInput";
import { LogoLockup, LogoMark } from "@/components/Logo";

const suggestionChips = [
  "My truck won't start",
  "Need a used 5.3 motor",
  "Transmission shudders on my F-150",
  "What's my totaled car worth?",
  "Looking for a Cummins diesel",
  "Need a Mercruiser marine engine",
];

const testimonials = [
  {
    stars: 5,
    quote: "Saved me $2,800 on a transmission for my F-250. Took 94 seconds.",
    name: "Dave M.",
    location: "Houston, TX",
    vehicle: "2018 F-250 Super Duty",
  },
  {
    stars: 5,
    quote:
      "I called 6 yards myself and got nowhere. This AI got me 4 quotes in 90 seconds. Unbelievable.",
    name: "Marcus T.",
    location: "Phoenix, AZ",
    vehicle: "2014 Chevy Silverado 5.3",
  },
  {
    stars: 5,
    quote:
      "My Mercruiser blew up mid-season. AutoMotor found a rebuilt replacement in 2 minutes. Back on the water in a week.",
    name: "Ryan C.",
    location: "Tampa, FL",
    vehicle: "2016 Sea Ray with 6.2L Mercruiser",
  },
];

const categoryCards = [
  {
    icon: Car,
    title: "Cars",
    desc: "Used engines and transmissions for every make and model.",
    href: "/cars",
  },
  {
    icon: Truck,
    title: "Trucks",
    desc: "F-150, Silverado, Ram, Duramax, Cummins, Powerstroke. We've got it.",
    href: "/trucks",
  },
  {
    icon: Anchor,
    title: "Marine",
    desc: "Mercruiser, Volvo Penta, Yamaha, OMC. Dock-to-dock delivery.",
    href: "/marine",
  },
  {
    icon: Wrench,
    title: "Commercial",
    desc: "Peterbilt, Kenworth, Freightliner. Fleet-ready parts.",
    href: "/commercial-parts",
  },
];

const steps = [
  {
    icon: MessageSquare,
    title: "Describe your problem.",
    desc: "Tell our AI what's wrong — it diagnoses in seconds.",
  },
  {
    icon: Phone,
    title: "AI calls 15 yards.",
    desc: "Parallel calls. Live quotes. No waiting on hold.",
  },
  {
    icon: CheckCircle,
    title: "Pick your quote.",
    desc: "Compare prices, warranties, and shipping. We handle the rest.",
  },
];

const trustBadges = [
  { icon: Award, label: "BBB A+ Accredited" },
  { icon: Shield, label: "30-Day Fitment Guarantee" },
  { icon: Shield, label: "Escrow Payment Protection" },
  { icon: Truck, label: "250,000+ Partner Yards" },
  { icon: Shield, label: "Secured by Stripe" },
];

const footerCols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "My Garage", href: "/garage" },
      { label: "For Mechanics", href: "/mechanics" },
      { label: "For Junkyards", href: "/junkyards" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Cars", href: "/cars" },
      { label: "Trucks", href: "/trucks" },
      { label: "Marine", href: "/marine" },
      { label: "Commercial", href: "/commercial-parts" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "CCPA", href: "#" },
      { label: "Do Not Sell My Info", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
];

export default function HomePage() {
  const router = useRouter();

  const handleChatSubmit = (value: string) => {
    router.push(`/chat/new?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Top nav */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-8 border-b border-line">
        <Link href="/" aria-label="AutoMotor.AI home">
          <LogoLockup size={28} textClassName="text-base" />
        </Link>
        <div className="flex items-center gap-2">
          <button className="text-sm text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5">
            Sign in
          </button>
          <Link
            href="/chat/new"
            className="px-3.5 py-1.5 rounded-lg bg-orange-DEFAULT text-white text-sm font-medium hover:bg-orange-hover transition-colors"
          >
            Get a quote
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[78vh] px-4 lg:px-8 text-center">
        <div className="w-full max-w-[680px] mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-line bg-panel text-xs text-text-secondary mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            12,847 drivers · 4.9 rating · $3.2M saved this year
          </div>
          <h1 className="font-semibold text-4xl lg:text-6xl tracking-tight text-text-primary mb-4">
            The fastest way to find a used engine.
          </h1>
          <p className="text-base lg:text-lg text-text-secondary mb-10 max-w-xl mx-auto">
            Describe what you need. Our AI calls 15 junkyards in parallel and returns
            comparable quotes in under 90 seconds.
          </p>

          <ChatInput
            autoFocus
            onSubmit={handleChatSubmit}
            className="mb-4"
          />

          {/* Suggestion chips */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 justify-start lg:justify-center">
            {suggestionChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChatSubmit(chip)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full border border-line text-text-secondary text-xs hover:border-text-tertiary hover:text-text-primary transition-colors whitespace-nowrap"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section A — Video */}
      <section className="px-4 lg:px-8 py-20 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <div className="bg-panel rounded-xl border border-line overflow-hidden">
            <div className="relative aspect-video bg-elevated flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200&auto=format&fit=crop&q=60')] bg-cover bg-center opacity-15" />
              <button aria-label="Play video" className="relative w-14 h-14 rounded-full bg-orange-DEFAULT flex items-center justify-center hover:bg-orange-hover transition-colors">
                <Play size={20} className="text-white ml-0.5" fill="white" aria-hidden="true" />
              </button>
            </div>
            <div className="px-5 py-4 border-t border-line">
              <p className="font-medium text-sm text-text-primary">
                See AutoMotor call 15 yards in parallel
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                Real recordings · 90 seconds end-to-end
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section B — How it works */}
      <section className="px-4 lg:px-8 py-20 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-text-tertiary text-center mb-3">How it works</p>
          <h2 className="font-semibold text-2xl lg:text-3xl tracking-tight text-text-primary text-center mb-12">
            From problem to quote in under two minutes.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-line rounded-xl overflow-hidden border border-line">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-panel p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-mono text-text-tertiary">0{i + 1}</span>
                  <step.icon size={14} className="text-orange-DEFAULT" aria-hidden="true" />
                </div>
                <h3 className="font-medium text-text-primary mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section C — Category cards */}
      <section className="px-4 lg:px-8 py-20 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-text-tertiary text-center mb-3">Coverage</p>
          <h2 className="font-semibold text-2xl lg:text-3xl tracking-tight text-text-primary text-center mb-12">
            Engines, transmissions, and parts — every category.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {categoryCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group bg-panel rounded-xl border border-line p-5 hover:border-text-tertiary transition-colors"
              >
                <card.icon size={18} className="text-orange-DEFAULT mb-4" aria-hidden="true" />
                <h3 className="font-medium text-text-primary mb-1 flex items-center gap-1.5">
                  {card.title}
                  <ArrowRight
                    size={13}
                    className="text-text-tertiary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                    aria-hidden="true"
                  />
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {card.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section D — Trust badges */}
      <section className="px-4 lg:px-8 py-20 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-text-tertiary text-center mb-3">Why drivers trust us</p>
          <h2 className="font-semibold text-2xl lg:text-3xl tracking-tight text-text-primary text-center mb-12">
            Built on guarantees, not promises.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 bg-panel rounded-xl border border-line px-4 py-3.5"
              >
                <badge.icon size={16} className="text-orange-DEFAULT flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-text-primary">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section E — Testimonials */}
      <section className="px-4 lg:px-8 py-20 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-text-tertiary text-center mb-3">Customers</p>
          <h2 className="font-semibold text-2xl lg:text-3xl tracking-tight text-text-primary text-center mb-12">
            12,847 drivers and counting.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <div
                key={i}
                className="bg-panel rounded-xl border border-line p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star
                      key={s}
                      size={12}
                      className="text-orange-DEFAULT fill-orange-DEFAULT"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-sm text-text-primary leading-relaxed mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-line">
                  <p className="text-sm font-medium text-text-primary">
                    {t.name}
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">{t.location} · {t.vehicle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section F — For mechanics and junkyards */}
      <section className="px-4 lg:px-8 py-20 border-t border-line">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="bg-panel rounded-xl border border-line p-6">
            <Wrench size={18} className="text-orange-DEFAULT mb-4" aria-hidden="true" />
            <h3 className="font-medium text-base text-text-primary mb-1.5">
              For mechanics
            </h3>
            <p className="text-sm text-text-secondary mb-5 leading-relaxed">
              Earn $200–$500 per engine job by sourcing parts through AutoMotor.
              White-label quotes under your shop&apos;s name.
            </p>
            <Link
              href="/mechanics"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-DEFAULT hover:gap-2 transition-all"
            >
              Become a partner <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <div className="bg-panel rounded-xl border border-line p-6">
            <Warehouse size={18} className="text-orange-DEFAULT mb-4" aria-hidden="true" />
            <h3 className="font-medium text-base text-text-primary mb-1.5">
              For junkyards
            </h3>
            <p className="text-sm text-text-secondary mb-5 leading-relaxed">
              Get qualified leads delivered by SMS in real time. No tire kickers.
              First 90 days free.
            </p>
            <Link
              href="/junkyards"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-DEFAULT hover:gap-2 transition-all"
            >
              Join as a yard <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section G — Final CTA */}
      <section className="px-4 lg:px-8 py-24 border-t border-line">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-semibold text-3xl lg:text-4xl tracking-tight text-text-primary mb-4">
            Find your part in 90 seconds.
          </h2>
          <p className="text-text-secondary mb-10">
            Join 12,847 drivers who saved an average of $1,400.
          </p>
          <ChatInput onSubmit={handleChatSubmit} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line px-4 lg:px-8 pt-16 pb-10 mb-14 lg:mb-0">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-1">
              <LogoLockup size={24} textClassName="text-base" className="mb-3" />
              <p className="text-xs text-text-secondary leading-relaxed max-w-[180px]">
                The fastest way to source used engines and transmissions.
              </p>
            </div>
            {footerCols.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-8 border-t border-line">
            <p className="text-xs text-text-tertiary">
              © 2025 AutoMotor.AI · Austin, TX
            </p>
            <div className="flex items-center gap-5">
              {["X", "Instagram", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs text-text-tertiary hover:text-text-primary transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
