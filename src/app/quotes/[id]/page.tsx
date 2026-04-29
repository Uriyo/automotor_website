"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  CheckCircle,
  Phone,
  MessageSquare,
  Eye,
  MapPin,
  Clock,
  Shield,
  ChevronRight,
  Trophy,
  X,
} from "lucide-react";

const specs = [
  { label: "Mileage", value: "87,432 mi" },
  { label: "Condition", value: "Tested & verified" },
  { label: "Warranty", value: "90 days parts" },
  { label: "Ships", value: "Monday, arrives Thursday" },
  { label: "Donor vehicle", value: "2015 Silverado 1500, 5.3L V8" },
  { label: "Compression test", value: "Passed" },
  { label: "Stock number", value: "T-22847" },
];

const included = [
  "Engine assembly",
  "Intake manifold",
  "Valve covers",
  "Oil pan",
  "Timing cover",
  "Accessory brackets",
];

const notIncluded = [
  "Exhaust manifolds",
  "Turbo/supercharger (N/A)",
  "Wiring harness",
  "ECU",
  "Accessories (alternator, power steering pump, AC compressor)",
];

const reviews = [
  {
    stars: 5,
    name: "Dave M.",
    state: "TX",
    vehicle: "2014 F-250",
    quote: "Great engine, shipped fast and ran great on first start. Highly recommend.",
    date: "Oct 2024",
  },
  {
    stars: 5,
    name: "Marcus T.",
    state: "AZ",
    vehicle: "2013 Silverado",
    quote: "Tested and verified as claimed. No issues 6 months later.",
    date: "Sep 2024",
  },
  {
    stars: 4,
    name: "Jessica R.",
    state: "OK",
    vehicle: "2015 Tahoe",
    quote: "Solid engine. Packaging could have been better but arrived intact.",
    date: "Aug 2024",
  },
  {
    stars: 5,
    name: "Brian K.",
    state: "LA",
    vehicle: "2014 Silverado",
    quote: "Called with a question and they answered on first ring. Great yard.",
    date: "Jul 2024",
  },
];

const similarQuotes = [
  { price: 2100, yard: "Pick-n-Pull Dallas", mileage: "102k mi", warranty: "60d" },
  { price: 1950, yard: "LKQ Garland", mileage: "94k mi", warranty: "90d" },
  { price: 2300, yard: "IAA Auto Parts", mileage: "78k mi", warranty: "90d" },
  { price: 2050, yard: "Copart Parts", mileage: "111k mi", warranty: "30d" },
];

function CountdownTimer({ hours }: { hours: number }) {
  const [secs, setSecs] = useState(hours * 3600);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;

  return (
    <span className="font-mono text-orange-DEFAULT font-semibold">
      {h}:{m.toString().padStart(2, "0")}:{s.toString().padStart(2, "0")}
    </span>
  );
}

export default function QuoteDetailPage() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [zip, setZip] = useState("");
  const [shipping, setShipping] = useState<string | null>(null);

  const photos = Array.from({ length: 4 }, (_, i) => i);

  const calcShipping = () => {
    if (zip.length === 5) {
      setShipping(`Ships to ${zip} — $245 freight. Delivered Thursday, Oct 24.`);
    }
  };

  return (
    <div className="px-4 lg:px-8 py-6 pb-24 lg:pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/chat/1"
          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors text-sm mb-4"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to chat
        </Link>

        <div className="flex items-start gap-3 mb-6">
          <div>
            <h1 className="font-semibold tracking-tight text-2xl lg:text-3xl text-text-primary">
              5.3L Vortec Engine — 2014 Silverado 1500
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-DEFAULT/20 text-orange-DEFAULT text-xs font-semibold uppercase tracking-wide">
                <Trophy size={11} aria-hidden="true" /> Best Match
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Left column */}
          <div className="space-y-6">
            {/* Image gallery */}
            <div>
              <div className="aspect-video bg-gradient-to-br from-panel to-bg rounded-2xl overflow-hidden mb-3 flex items-center justify-center">
                <div className="text-text-secondary text-sm">Engine photo {activePhoto + 1}</div>
              </div>
              <div className="flex gap-2">
                {photos.map((i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`flex-1 aspect-square rounded-xl overflow-hidden bg-panel border-2 transition-colors flex items-center justify-center ${
                      activePhoto === i
                        ? "border-orange-DEFAULT"
                        : "border-line"
                    }`}
                  >
                    <span className="text-xs text-text-secondary">{i + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Key details */}
            <div className="bg-panel rounded-xl border border-line p-5">
              <div className="font-semibold tracking-tight text-4xl text-text-primary mb-1">
                $1,800
              </div>
              <div className="flex items-center gap-2 text-sm mb-5">
                <span className="text-text-secondary">Market average: $2,100</span>
                <span className="text-green-400 flex items-center gap-1">
                  <CheckCircle size={13} aria-hidden="true" />
                  You&apos;re saving $300 (14%)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {specs.map((s) => (
                  <div key={s.label}>
                    <p className="text-xs text-text-secondary mb-0.5">{s.label}</p>
                    <p className="text-sm text-text-primary font-medium">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What's included */}
            <div className="bg-panel rounded-xl border border-line p-5">
              <h3 className="font-semibold tracking-tight text-text-primary mb-3">
                What&apos;s included
              </h3>
              <ul className="space-y-1.5">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                    <CheckCircle size={14} className="text-green-400 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-panel rounded-xl border border-line p-5">
              <h3 className="font-semibold tracking-tight text-text-primary mb-3">
                What&apos;s NOT included
              </h3>
              <ul className="space-y-1.5">
                {notIncluded.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                    <X size={14} className="text-red-400 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Fitment */}
            <div className="bg-panel rounded-xl border border-green-500/20 p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} className="text-green-400" aria-hidden="true" />
                <p className="font-semibold text-text-primary text-sm">
                  Confirmed fits your 2014 Silverado 1500 5.3L V8
                </p>
              </div>
              <p className="text-xs text-text-secondary">
                Cross-reference: GM part # 12624676. Also fits 2010–2014
                Silverado/Sierra/Tahoe/Yukon 5.3L.
              </p>
            </div>

            {/* Yard info */}
            <div className="bg-panel rounded-xl border border-line p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold tracking-tight text-text-primary">
                    Tommy&apos;s Auto Salvage
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star size={13} className="text-orange-DEFAULT fill-orange-DEFAULT" aria-hidden="true" />
                    <span className="text-sm text-text-secondary">4.8 (312 reviews)</span>
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-DEFAULT/10 text-orange-DEFAULT font-medium">
                  Verified partner since 2021
                </span>
              </div>
              <div className="space-y-1.5 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-text-secondary" aria-hidden="true" />
                  123 Industrial Blvd, Dallas, TX 75201 — 23 miles from you
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-text-secondary" aria-hidden="true" />
                  Mon–Sat 8 AM – 6 PM
                </div>
              </div>
              <div className="mt-3 h-24 bg-bg rounded-xl border border-line flex items-center justify-center">
                <span className="text-xs text-text-secondary flex items-center gap-1"><MapPin size={12} aria-hidden="true" /> Map placeholder</span>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="font-semibold tracking-tight text-xl text-text-primary mb-4">
                Reviews of this yard
              </h3>
              <div className="space-y-3">
                {reviews.map((r, i) => (
                  <div
                    key={i}
                    className="bg-panel rounded-xl border border-line p-4"
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <div>
                        <div className="flex gap-0.5 mb-1">
                          {Array.from({ length: r.stars }).map((_, s) => (
                            <Star
                              key={s}
                              size={12}
                              className="text-orange-DEFAULT fill-orange-DEFAULT"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="text-sm font-medium text-text-primary">
                          {r.name}, {r.state} · {r.vehicle}
                        </p>
                      </div>
                      <span className="text-xs text-text-secondary">{r.date}</span>
                    </div>
                    <p className="text-sm text-text-secondary">&ldquo;{r.quote}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar quotes */}
            <div>
              <h3 className="font-semibold tracking-tight text-xl text-text-primary mb-4">
                Similar quotes
              </h3>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {similarQuotes.map((q, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-48 bg-panel rounded-xl border border-line p-3"
                  >
                    <p className="font-semibold tracking-tight text-xl text-text-primary">
                      ${q.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5 truncate">{q.yard}</p>
                    <p className="text-xs text-text-secondary mt-1">
                      {q.mileage} · {q.warranty} warranty
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — sticky reserve card */}
          <div className="hidden lg:block">
            <div className="sticky top-6 space-y-4">
              <div className="bg-panel rounded-xl border border-line p-5">
                <h3 className="font-semibold tracking-tight text-xl text-text-primary mb-1">
                  Reserve this engine.
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  $99 refundable deposit
                </p>

                <div className="space-y-2 mb-5">
                  {[
                    "Holds the engine for 48 hours",
                    "Fitment guarantee — full refund if it doesn't fit",
                    "Escrow protected — pay yard on delivery",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>

                <button className="w-full py-3.5 rounded-xl bg-orange-DEFAULT text-white font-semibold hover:bg-orange-hover transition-colors mb-3">
                  Reserve for $99 →
                </button>
                <button className="w-full py-3 rounded-xl border border-line text-text-primary text-sm font-medium hover:bg-elevated transition-colors flex items-center justify-center gap-2 mb-2">
                  <Phone size={14} className="text-orange-DEFAULT" aria-hidden="true" />
                  Call yard directly
                </button>
                <button className="w-full text-center text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center gap-1.5">
                  <MessageSquare size={13} aria-hidden="true" />
                  Ask AI about this
                </button>

                <div className="border-t border-line pt-3 mt-3 space-y-2">
                  <p className="text-xs text-text-secondary flex items-center gap-1.5">
                    <Eye size={11} aria-hidden="true" />
                    2 other shoppers viewing this in the last hour
                  </p>
                  <p className="text-xs text-text-secondary flex items-center gap-1.5">
                    <Clock size={11} aria-hidden="true" />
                    Price valid for{" "}
                    <CountdownTimer hours={4} />
                  </p>
                </div>
              </div>

              {/* Shipping calc */}
              <div className="bg-panel rounded-xl border border-line p-5">
                <h4 className="font-semibold text-text-primary text-sm mb-3">
                  Shipping calculator
                </h4>
                <div className="flex gap-2">
                  <input
                    value={zip}
                    onChange={(e) => setZip(e.target.value.slice(0, 5))}
                    onKeyDown={(e) => e.key === "Enter" && calcShipping()}
                    placeholder="ZIP code"
                    className="flex-1 bg-bg border border-line rounded-xl px-3 py-2.5 text-text-primary placeholder:text-text-secondary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors"
                  />
                  <button
                    onClick={calcShipping}
                    className="px-3 py-2.5 rounded-xl bg-orange-DEFAULT/10 border border-orange-DEFAULT/30 text-orange-DEFAULT text-sm font-medium hover:bg-orange-DEFAULT/20 transition-colors"
                  >
                    Calculate
                  </button>
                </div>
                {shipping && (
                  <p className="text-sm text-text-secondary mt-2">{shipping}</p>
                )}
              </div>

              {/* Installation helper */}
              <div className="bg-panel rounded-xl border border-line p-5">
                <h4 className="font-semibold text-text-primary text-sm mb-1">
                  Need it installed?
                </h4>
                <p className="text-xs text-text-secondary mb-3">
                  We&apos;ll match you with 3 certified mechanics near you.
                </p>
                <button className="w-full py-2.5 rounded-xl border border-orange-DEFAULT/40 text-orange-DEFAULT text-sm font-semibold hover:bg-orange-DEFAULT/10 transition-colors">
                  Find a mechanic →
                </button>
                <p className="text-xs text-text-secondary text-center mt-2">
                  Average install cost: $1,400–$1,800
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky reserve bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-panel border-t border-line p-4 pb-safe">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-semibold tracking-tight text-xl text-text-primary">$1,800</p>
            <p className="text-xs text-text-secondary">Tommy&apos;s Auto Salvage</p>
          </div>
          <button className="flex-1 py-3.5 rounded-xl bg-orange-DEFAULT text-white font-semibold text-sm hover:bg-orange-hover transition-colors">
            Reserve for $99 →
          </button>
        </div>
      </div>
    </div>
  );
}
