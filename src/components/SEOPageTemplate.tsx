"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Star, CheckCircle, Zap, Search, AlertTriangle, X, Check } from "lucide-react";
import ChatInput from "@/components/ChatInput";
import QuoteCard from "@/components/chat/QuoteCard";
import { SEOPageData } from "@/lib/seo-data";
import { useRouter } from "next/navigation";

const mockQuotes = (data: SEOPageData) => [
  { isBestMatch: true, yardName: "Tommy's Auto Salvage", rating: 4.8, reviewCount: 312, city: "Dallas, TX", distance: "23 mi", partDesc: `${data.partName} · 87,432 mi`, price: data.priceLow + 400, marketAvg: data.priceAvg, warranty: "90-day", shipsDay: "Monday", quoteId: "q1" },
  { isBestMatch: false, yardName: "Pick-n-Pull Dallas", rating: 4.5, reviewCount: 847, city: "Dallas, TX", distance: "18 mi", partDesc: `${data.partName} · 102,100 mi`, price: data.priceAvg, marketAvg: data.priceAvg, warranty: "60-day", shipsDay: "Wednesday", quoteId: "q2" },
  { isBestMatch: false, yardName: "LKQ Garland", rating: 4.7, reviewCount: 1204, city: "Garland, TX", distance: "31 mi", partDesc: `${data.partName} · 94,800 mi`, price: data.priceAvg - 150, marketAvg: data.priceAvg, warranty: "90-day", shipsDay: "Tuesday", quoteId: "q3" },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left text-text-primary text-sm font-medium hover:text-orange-DEFAULT transition-colors">
        {q}
        {open ? <ChevronUp size={15} className="flex-shrink-0 text-text-secondary" aria-hidden="true" /> : <ChevronDown size={15} className="flex-shrink-0 text-text-secondary" aria-hidden="true" />}
      </button>
      {open && <p className="pb-4 text-sm text-text-secondary leading-relaxed">{a}</p>}
    </div>
  );
}

export default function SEOPageTemplate({ data, slug }: { data: SEOPageData; slug: string }) {
  const router = useRouter();
  const quotes = mockQuotes(data);

  const handleChat = (val: string) => {
    router.push(`/chat/new?q=${encodeURIComponent(val)}`);
  };

  const prefilledQ = data.cityName
    ? `Looking for a used engine in ${data.cityName}`
    : `Looking for a used ${data.partName} for my ${data.vehicleName}`;

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 pb-16">
      {/* Breadcrumbs */}
      <nav className="text-xs text-text-secondary mb-4 flex items-center gap-1.5">
        <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
        <span>›</span>
        <span>Used {data.partName}s</span>
        <span>›</span>
        <span className="text-text-primary">{data.vehicleName}</span>
      </nav>

      {/* H1 + hero */}
      <h1 className="font-semibold tracking-tight text-3xl lg:text-4xl text-text-primary mb-3">
        {data.h1}
      </h1>
      <p className="text-text-secondary mb-4">
        Live quotes from 500+ junkyards. AI-verified fitment. 90-day warranty.
      </p>

      {/* Chat input */}
      <div className="mb-2">
        <ChatInput
          placeholder={prefilledQ}
          onSubmit={handleChat}
        />
      </div>
      <p className="text-xs text-text-secondary mb-8 flex items-center gap-1"><Zap size={12} className="text-orange-DEFAULT" aria-hidden="true" /> No signup. 90 sec to quote.</p>

      {/* Pricing intelligence */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold tracking-tight text-xl text-text-primary mb-3">
            Market pricing
          </h2>
          <div className="space-y-3">
            {[
              { label: "Low", value: data.priceLow, color: "text-text-secondary" },
              { label: "Average", value: data.priceAvg, color: "text-orange-DEFAULT" },
              { label: "High", value: data.priceHigh, color: "text-text-secondary" },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-3">
                <span className="text-xs text-text-secondary w-12">{p.label}</span>
                <div className="flex-1 h-1.5 bg-elevated rounded-full overflow-hidden">
                  <div className="h-full bg-orange-DEFAULT/40 rounded-full" style={{ width: `${((p.value - data.priceLow) / (data.priceHigh - data.priceLow)) * 100 + 10}%` }} />
                </div>
                <span className={`font-semibold tracking-tight text-lg ${p.color}`}>
                  ${p.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-text-secondary">
            Based on <span className="text-text-primary font-semibold">{data.transactionCount} real transactions</span> in the last 90 days through AutoMotor.
          </p>
        </div>
      </div>

      {/* Live inventory */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold tracking-tight text-xl text-text-primary flex items-center gap-2">
            <Search size={18} className="text-orange-DEFAULT" aria-hidden="true" /> 3 {data.partName.toLowerCase()}s available near you (75001)
          </h2>
          <button onClick={() => handleChat(prefilledQ)} className="text-sm text-orange-DEFAULT hover:underline">
            See all →
          </button>
        </div>
        <div className="space-y-3">
          {quotes.map((q, i) => (
            <QuoteCard key={i} {...q} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {/* Specs table */}
          {data.displacement !== "Various" && (
            <div className="bg-panel rounded-xl border border-line p-5 mb-6">
              <h2 className="font-semibold tracking-tight text-xl text-text-primary mb-4">
                Specifications
              </h2>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "Displacement", value: data.displacement },
                    { label: "Horsepower", value: data.horsepower },
                    { label: "Torque", value: data.torque },
                    { label: "Configuration", value: data.cylinders },
                  ].filter(r => r.value !== "N/A").map((row) => (
                    <tr key={row.label} className="border-b border-line last:border-0">
                      <td className="py-2 text-text-secondary">{row.label}</td>
                      <td className="py-2 text-text-primary font-medium">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-text-secondary mt-3">
                <span className="text-text-primary font-medium">Compatible variants:</span>{" "}
                {data.fitmentNote}
              </p>
            </div>
          )}

          {/* What to watch for */}
          {data.commonFailures.length > 0 && (
            <div className="bg-panel rounded-xl border border-line p-5 mb-6 space-y-5">
              <h2 className="font-semibold tracking-tight text-xl text-text-primary">
                What to watch for — from a master mechanic
              </h2>
              {data.commonFailures.length > 0 && (
                <div>
                  <h3 className="font-semibold text-text-primary mb-2 text-sm">Common failure modes</h3>
                  <ul className="space-y-2">
                    {data.commonFailures.map((f, i) => (
                      <li key={i} className="text-sm text-text-secondary leading-relaxed flex items-start gap-2">
                        <AlertTriangle size={13} className="text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {data.inspectionTips.length > 0 && (
                <div>
                  <h3 className="font-semibold text-text-primary mb-2 text-sm">What to inspect before buying</h3>
                  <ul className="space-y-2">
                    {data.inspectionTips.map((t, i) => (
                      <li key={i} className="text-sm text-text-secondary leading-relaxed flex items-start gap-2">
                        <CheckCircle size={13} className="text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />{t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {data.redFlags.length > 0 && (
                <div>
                  <h3 className="font-semibold text-text-primary mb-2 text-sm">Red flags from bad yards</h3>
                  <ul className="space-y-2">
                    {data.redFlags.map((r, i) => (
                      <li key={i} className="text-sm text-text-secondary leading-relaxed flex items-start gap-2">
                        <X size={13} className="text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />{r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          {/* Installation section */}
          <div className="bg-panel rounded-xl border border-line p-5 mb-6">
            <h2 className="font-semibold tracking-tight text-xl text-text-primary mb-3">
              Installation
            </h2>
            <div className="space-y-2 text-sm text-text-secondary mb-4">
              <p>Typical install labor: <span className="text-text-primary font-medium">{data.laborHours}</span></p>
              <p>Estimated cost: <span className="text-text-primary font-medium">{data.laborCostRange}</span></p>
            </div>
            <button onClick={() => handleChat(`Find a mechanic to install a ${data.partName} for my ${data.vehicleName}`)} className="w-full py-3 rounded-xl border border-orange-DEFAULT/40 text-orange-DEFAULT text-sm font-semibold hover:bg-orange-DEFAULT/10 transition-colors">
              Find a certified installer near you →
            </button>
          </div>

          {/* Local yards (city pages) */}
          {data.yards && (
            <div className="bg-panel rounded-xl border border-line p-5 mb-6">
              <h2 className="font-semibold tracking-tight text-xl text-text-primary mb-4">
                Top yards in {data.cityName}
              </h2>
              <div className="space-y-3">
                {data.yards.map((yard, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{yard.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Star size={11} className="text-orange-DEFAULT fill-orange-DEFAULT" aria-hidden="true" />
                        <span className="text-xs text-text-secondary">{yard.rating}</span>
                        <span className="text-xs text-text-secondary">· {yard.distance}</span>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-orange-DEFAULT/10 text-orange-DEFAULT font-medium">
                      {yard.specialty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related pages */}
          <div className="bg-panel rounded-xl border border-line p-5">
            <h2 className="font-semibold text-text-primary mb-3 text-sm">Related pages</h2>
            <div className="space-y-1.5">
              {[...data.relatedVehicles, ...data.relatedCities].map((link, i) => (
                <Link key={i} href="/" className="block text-sm text-text-secondary hover:text-orange-DEFAULT transition-colors">
                  → {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-8 bg-panel rounded-xl border border-line px-6">
        <div className="py-5 border-b border-line">
          <h2 className="font-semibold tracking-tight text-xl text-text-primary">
            Frequently asked questions
          </h2>
        </div>
        {data.faqs.map((f, i) => <FAQItem key={i} {...f} />)}
      </div>

      {/* Trust bar */}
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        {["Fitment Guarantee", "90-day warranty", "Escrow Protection", "30-day returns", "Free expert consultation"].map((t) => (
          <span key={t} className="text-xs text-text-secondary bg-panel border border-line px-3 py-1.5 rounded-full inline-flex items-center gap-1">
            <Check size={11} className="text-green-400" aria-hidden="true" /> {t}
          </span>
        ))}
      </div>

      {/* Final CTA */}
      <div className="mt-8 text-center">
        <h2 className="font-semibold tracking-tight text-2xl text-text-primary mb-3">
          Get 15 yards quoting in <span className="text-orange-DEFAULT">90 seconds.</span>
        </h2>
        <ChatInput onSubmit={handleChat} className="max-w-2xl mx-auto" />
      </div>
    </div>
  );
}
