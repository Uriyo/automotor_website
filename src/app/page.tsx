"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  Zap,
  Clock,
  DollarSign,
  Headphones,
  X,
  ChevronDown,
} from "lucide-react";
import ChatInput from "@/components/ChatInput";
import { LogoLockup } from "@/components/Logo";

function useCountUp(end: number, duration = 2000, active = false) {
  const [value, setValue] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * end));
      if (t < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [end, duration, active]);

  return value;
}

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

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
    title: "Describe your problem",
    desc: "Tell our AI what\u2019s wrong with your vehicle \u2014 year, make, model, symptoms. It understands plain English and diagnoses the issue in seconds.",
    detail: "No VIN lookup needed. No phone trees.",
  },
  {
    icon: Phone,
    title: "AI calls 15+ yards simultaneously",
    desc: "Our AI agent makes parallel calls to salvage yards across the country. Real conversations, real-time negotiation, verified inventory.",
    detail: "Works 24/7. Covers 250,000+ partner yards.",
  },
  {
    icon: CheckCircle,
    title: "Compare and buy with confidence",
    desc: "Review quotes side-by-side with warranty info, mileage, shipping costs. Pick the best deal \u2014 we handle logistics and escrow payment.",
    detail: "30-day fitment guarantee on every order.",
  },
];

const features = [
  {
    icon: Zap,
    title: "AI-Powered Search",
    desc: "Natural language understanding. Describe your problem like you\u2019d tell a mechanic \u2014 our AI handles the rest.",
  },
  {
    icon: Clock,
    title: "90-Second Quotes",
    desc: "Parallel calls to 15+ yards simultaneously. What used to take hours of phone calls now takes 90 seconds.",
  },
  {
    icon: Shield,
    title: "Fitment Guarantee",
    desc: "30-day money-back guarantee if the part doesn\u2019t fit. We verify compatibility before you buy.",
  },
  {
    icon: DollarSign,
    title: "Escrow Protection",
    desc: "Your payment is held in escrow until you confirm the part arrived and fits. Zero risk.",
  },
  {
    icon: Truck,
    title: "Nationwide Shipping",
    desc: "Parts shipped from 250,000+ yards across all 50 states. Most deliveries in 3\u20135 business days.",
  },
  {
    icon: Headphones,
    title: "Human Backup",
    desc: "AI handles 95% of cases. For the tricky ones, our expert team steps in within minutes.",
  },
];

const comparisonOld = [
  "Call yards one by one",
  "Wait on hold for 20+ minutes each",
  "No price comparison",
  "No warranty or fitment guarantee",
  "Pay upfront, hope it works",
  "Takes 2\u20133 days of phone calls",
];

const comparisonNew = [
  "AI calls 15 yards in parallel",
  "Quotes in under 90 seconds",
  "Side-by-side price comparison",
  "30-day fitment guarantee included",
  "Escrow payment protection",
  "Done in 2 minutes, not 2 days",
];

const faqs = [
  {
    q: "How does AutoMotor find parts so fast?",
    a: "Our AI agent makes parallel phone calls to 15+ salvage yards simultaneously \u2014 like having 15 people searching for your part at the same time. Traditional searches are sequential; ours are parallel.",
  },
  {
    q: "What\u2019s the fitment guarantee?",
    a: "Every part comes with a 30-day fitment guarantee. If the part doesn\u2019t fit your vehicle, we\u2019ll arrange a return and full refund \u2014 no questions asked.",
  },
  {
    q: "How does escrow payment work?",
    a: "When you purchase a part, your payment is held securely in escrow. The seller only receives payment after you confirm the part arrived and fits your vehicle. This protects you from fraud and defective parts.",
  },
  {
    q: "Do you ship nationwide?",
    a: "Yes. Our network of 250,000+ partner yards spans all 50 states. Most parts ship within 24 hours and arrive in 3\u20135 business days. Expedited shipping is available.",
  },
  {
    q: "Can mechanics use AutoMotor?",
    a: "Absolutely. We have a dedicated mechanic partner program. Source parts for your customers through AutoMotor and earn $200\u2013$500 per engine job. You can even white-label quotes under your shop\u2019s name.",
  },
  {
    q: "Is my payment information safe?",
    a: "100%. All payments are processed through Stripe, a PCI Level 1 certified payment processor. Your card details never touch our servers.",
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

function StatsSection() {
  const { ref, inView } = useInView(0.3);
  const parts = useCountUp(250000, 2000, inView);
  const savings = useCountUp(1400, 2000, inView);
  const rating = useCountUp(49, 2000, inView);

  const stats = [
    { value: parts.toLocaleString() + "+", label: "Parts Sourced" },
    { value: "90s", label: "Average Quote Time", static: true },
    { value: "$" + savings.toLocaleString(), label: "Average Savings" },
    { value: (rating / 10).toFixed(1) + "\u2605", label: "Customer Rating" },
  ];

  return (
    <section ref={ref} className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-t border-line">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight">
                {s.value}
              </p>
              <p className="text-sm text-text-secondary mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-t border-line">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-wider text-text-tertiary text-center mb-3">FAQ</p>
        <h2 className="font-semibold text-2xl sm:text-3xl tracking-tight text-text-primary text-center mb-12">
          Questions? We&rsquo;ve got answers.
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="bg-panel rounded-xl border border-line">
                <button
                  onClick={() => toggle(i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-text-primary pr-4">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-text-tertiary flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <div className={`accordion-content ${isOpen ? "open" : ""}`}>
                  <div className="accordion-inner">
                    <p className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const router = useRouter();

  const handleChatSubmit = (value: string) => {
    router.push(`/chat/new?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100dvh-3.5rem)] lg:min-h-screen px-4 sm:px-6 lg:px-8 py-12 lg:py-0 text-center">
        <div className="w-full max-w-[680px] mx-auto">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3 py-1.5 rounded-full border border-line bg-panel text-[11px] sm:text-xs text-text-secondary mb-5 sm:mb-6 max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
            <span>12,847 drivers</span>
            <span aria-hidden="true">&middot;</span>
            <span>4.9 rating</span>
            <span aria-hidden="true">&middot;</span>
            <span>$3.2M saved this year</span>
          </div>
          <h1 className="font-semibold text-3xl sm:text-4xl lg:text-6xl tracking-tight text-text-primary mb-3 sm:mb-4 text-balance">
            The fastest way to find a used engine.
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-text-secondary mb-8 sm:mb-10 max-w-xl mx-auto text-balance">
            Describe what you need. Our AI calls 15 junkyards in parallel and returns
            comparable quotes in under 90 seconds.
          </p>

          <ChatInput
            autoFocus
            onSubmit={handleChatSubmit}
            className="mb-4"
          />

          <div className="-mx-4 sm:mx-0 px-4 sm:px-0 flex sm:flex-wrap gap-2 overflow-x-auto no-scrollbar pb-1 justify-start sm:justify-center">
            {suggestionChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChatSubmit(chip)}
                className="flex-shrink-0 px-3 py-2 sm:py-1.5 rounded-full border border-line text-text-secondary text-xs hover:border-text-tertiary hover:text-text-primary transition-colors whitespace-nowrap"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-t border-line">
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
                Real recordings &middot; 90 seconds end-to-end
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* How it works */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-text-tertiary text-center mb-3">How it works</p>
          <h2 className="font-semibold text-2xl sm:text-3xl tracking-tight text-text-primary text-center mb-12">
            From problem to quote in under two minutes.
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[calc(16.66%+20px)] right-[calc(16.66%+20px)] h-px bg-line" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full border border-orange-DEFAULT flex items-center justify-center text-xs font-mono text-orange-DEFAULT flex-shrink-0">
                      0{i + 1}
                    </span>
                    <step.icon size={16} className="text-orange-DEFAULT" aria-hidden="true" />
                  </div>
                  <h3 className="font-medium text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    {step.desc}
                  </p>
                  <p className="text-xs text-text-tertiary">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-text-tertiary text-center mb-3">Platform</p>
          <h2 className="font-semibold text-2xl sm:text-3xl tracking-tight text-text-primary text-center mb-12">
            Built different. Built for drivers.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((f) => (
              <div key={f.title} className="bg-panel rounded-xl border border-line p-6">
                <f.icon size={18} className="text-orange-DEFAULT mb-4" aria-hidden="true" />
                <h3 className="font-medium text-text-primary mb-1.5">{f.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-text-tertiary text-center mb-3">Coverage</p>
          <h2 className="font-semibold text-2xl sm:text-3xl tracking-tight text-text-primary text-center mb-12">
            Engines, transmissions, and parts &mdash; every category.
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

      {/* Trust badges */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-text-tertiary text-center mb-3">Why drivers trust us</p>
          <h2 className="font-semibold text-2xl sm:text-3xl tracking-tight text-text-primary text-center mb-12">
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

      {/* Comparison */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-text-tertiary text-center mb-3">Why AutoMotor</p>
          <h2 className="font-semibold text-2xl sm:text-3xl tracking-tight text-text-primary text-center mb-12">
            The old way vs. the AutoMotor way.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-panel rounded-xl border border-line p-6">
              <p className="text-xs uppercase tracking-wider text-text-tertiary mb-5">The old way</p>
              <ul className="space-y-3.5">
                {comparisonOld.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X size={14} className="text-red-500/70 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-panel rounded-xl border border-orange-DEFAULT/30 p-6">
              <p className="text-xs uppercase tracking-wider text-orange-DEFAULT mb-5">The AutoMotor way</p>
              <ul className="space-y-3.5">
                {comparisonNew.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-text-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-text-tertiary text-center mb-3">Customers</p>
          <h2 className="font-semibold text-2xl sm:text-3xl tracking-tight text-text-primary text-center mb-12">
            12,847 drivers and counting.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                  <p className="text-xs text-text-secondary mt-0.5">{t.location} &middot; {t.vehicle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For mechanics and junkyards */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-t border-line">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-panel rounded-xl border border-line p-6">
            <Wrench size={18} className="text-orange-DEFAULT mb-4" aria-hidden="true" />
            <h3 className="font-medium text-base text-text-primary mb-1.5">
              For mechanics
            </h3>
            <p className="text-sm text-text-secondary mb-5 leading-relaxed">
              Earn $200&ndash;$500 per engine job by sourcing parts through AutoMotor.
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

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 border-t border-line">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-semibold text-3xl sm:text-4xl tracking-tight text-text-primary mb-4">
            Find your part in 90 seconds.
          </h2>
          <p className="text-text-secondary mb-10">
            Join 12,847 drivers who saved an average of $1,400.
          </p>
          <ChatInput onSubmit={handleChatSubmit} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line px-4 sm:px-6 lg:px-8 pt-16 pb-10 mb-14 lg:mb-0">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-line">
            <p className="text-xs text-text-tertiary">
              &copy; 2025 AutoMotor.AI &middot; Austin, TX
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
