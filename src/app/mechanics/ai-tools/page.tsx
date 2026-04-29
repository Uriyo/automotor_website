"use client";

import { useState } from "react";
import { Loader2, Bot, Search, PenLine, Flame } from "lucide-react";

export default function MechanicAIToolsPage() {
  const [pricingResult, setPricingResult] = useState("");
  const [quoteDraft, setQuoteDraft] = useState("");
  const [concerns, setConcerns] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const runTool = (tool: string) => {
    setLoading(tool);
    setTimeout(() => {
      setLoading(null);
      if (tool === "pricing") {
        setPricingResult("Low: $2,150 (15% margin) · Mid: $2,380 (22%) [recommended] · High: $2,650 (31%)");
      } else if (tool === "quote") {
        setQuoteDraft("Hi Dave, I've sourced a tested 5.3L long block (87k mi, 90-day warranty) that'll fit your '14 Silverado perfectly. Installed price: $2,350. I can have it in by next Friday. Want to lock it in?");
      }
    }, 1500);
  };

  return (
    <div className="px-4 lg:px-8 py-8 max-w-3xl">
      <h1 className="font-semibold tracking-tight text-2xl text-text-primary mb-6 flex items-center gap-2"><Bot size={22} className="text-orange-DEFAULT" aria-hidden="true" /> AI Tools</h1>

      {/* Pricing AI */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <h3 className="font-semibold tracking-tight text-text-primary mb-1">Pricing AI</h3>
        <p className="text-sm text-text-secondary mb-4">Enter part + vehicle, get instant price suggestions.</p>
        <div className="flex gap-2 mb-3">
          <input placeholder="Part (e.g. 5.3L engine)" className="flex-1 bg-bg border border-line rounded-xl px-3 py-2.5 text-text-primary placeholder:text-text-secondary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors" />
          <input placeholder="Vehicle (e.g. 2014 Silverado)" className="flex-1 bg-bg border border-line rounded-xl px-3 py-2.5 text-text-primary placeholder:text-text-secondary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors" />
        </div>
        <button onClick={() => runTool("pricing")} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-DEFAULT text-white text-sm font-semibold hover:bg-orange-hover transition-colors">
          {loading === "pricing" ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : <Search size={14} aria-hidden="true" />}
          Get price suggestion
        </button>
        {pricingResult && (
          <div className="mt-3 bg-bg rounded-xl border border-orange-DEFAULT/20 p-3">
            <p className="text-sm text-text-primary">{pricingResult}</p>
          </div>
        )}
      </div>

      {/* Quote drafting AI */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <h3 className="font-semibold tracking-tight text-text-primary mb-1">Quote Drafting AI</h3>
        <p className="text-sm text-text-secondary mb-4">Paste customer&apos;s concerns, get a ready-to-send SMS.</p>
        <textarea
          value={concerns}
          onChange={(e) => setConcerns(e.target.value)}
          placeholder="Paste customer message or describe their concerns..."
          rows={3}
          className="w-full bg-bg border border-line rounded-xl px-3 py-2.5 text-text-primary placeholder:text-text-secondary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors resize-none mb-3"
        />
        <button onClick={() => runTool("quote")} disabled={!concerns} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-DEFAULT text-white text-sm font-semibold hover:bg-orange-hover disabled:opacity-40 transition-colors">
          {loading === "quote" ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : <PenLine size={14} aria-hidden="true" />}
          Draft quote
        </button>
        {quoteDraft && (
          <div className="mt-3 bg-bg rounded-xl border border-green-500/20 p-3">
            <p className="text-sm text-text-secondary leading-relaxed">{quoteDraft}</p>
            <button className="mt-2 text-xs text-orange-DEFAULT hover:underline">Copy to clipboard</button>
          </div>
        )}
      </div>

      {/* Customer message AI */}
      <div className="bg-panel rounded-xl border border-line p-5">
        <h3 className="font-semibold tracking-tight text-text-primary mb-1">Customer Follow-up AI</h3>
        <p className="text-sm text-text-secondary mb-4">Suggested follow-ups for each active quote.</p>
        <div className="space-y-2">
          {[
            { customer: "Dave M.", quote: "5.3 Silverado · $2,350", suggestion: "Dave opened your quote 4× today — text him: 'Hey Dave, just following up on that 5.3 quote. Still available — any questions?'" },
            { customer: "Jennifer R.", quote: "3.6 Ram · $1,850", suggestion: "Jennifer hasn't opened in 72h. Try: 'Hi Jennifer, wanted to check if you still need that 3.6 — I can hold it through Friday.'" },
          ].map((item, i) => (
            <div key={i} className="bg-bg rounded-xl border border-line p-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-text-primary">{item.customer}</span>
                <span className="text-xs text-text-secondary">{item.quote}</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">{item.suggestion}</p>
              <button className="mt-2 text-xs text-orange-DEFAULT hover:underline">Use this →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
