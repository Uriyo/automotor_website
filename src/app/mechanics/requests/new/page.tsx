"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check, Flame, Phone, Wrench, Smartphone, Mail, Link as LinkIcon } from "lucide-react";
import clsx from "clsx";
import QuoteCard from "@/components/chat/QuoteCard";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const partTypes = [
  "Engine", "Transmission", "Transfer case", "Differential",
  "Axle", "Turbo", "Head", "Other",
];

const engineSubtypes = [
  "Complete long block", "Short block", "Cylinder heads",
];

const mockBaseQuotes = [
  { yardName: "Tommy's Auto Salvage", price: 1800, mileage: 87432, warranty: "90-day", shipping: "$0", total: 1800 },
  { yardName: "Pick-n-Pull Dallas", price: 2100, mileage: 102000, warranty: "60-day", shipping: "$0", total: 2100 },
  { yardName: "LKQ Garland", price: 1950, mileage: 94800, warranty: "90-day", shipping: "$180", total: 2130 },
];

const priceTiers = (base: number) => [
  { label: "Low", margin: 0.15, desc: "Conservative — wins in price-sensitive markets", hot: false },
  { label: "Mid", margin: 0.22, desc: "Recommended — wins 74% of similar jobs", recommended: true, hot: true },
  { label: "High", margin: 0.31, desc: "Premium — best for established customer relationships", hot: false },
];

export default function NewPartRequestPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [vin, setVin] = useState("");
  const [vinDecoded, setVinDecoded] = useState(false);
  const [vinLoading, setVinLoading] = useState(false);
  const [partType, setPartType] = useState("");
  const [subType, setSubType] = useState("");
  const [selectedQuote, setSelectedQuote] = useState(0);
  const [retailPrice, setRetailPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [callingActive, setCallingActive] = useState(false);
  const [callsDone, setCallsDone] = useState(false);

  const decodeVin = () => {
    if (vin.length !== 17) return;
    setVinLoading(true);
    setTimeout(() => {
      setVinLoading(false);
      setVinDecoded(true);
    }, 1200);
  };

  const submitRequest = () => {
    setCallingActive(true);
    setTimeout(() => {
      setCallingActive(false);
      setCallsDone(true);
      setStep(5);
    }, 4000);
  };

  const baseQuote = mockBaseQuotes[selectedQuote];
  const tiers = priceTiers(baseQuote.total);
  const currentRetail = retailPrice ? Number(retailPrice) : Math.round(baseQuote.total * 1.22);
  const profit = currentRetail - baseQuote.total;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-lg">
      {/* Progress */}
      {step < 7 && (
        <div className="mb-8">
          <div className="flex justify-between text-xs text-text-secondary mb-2">
            <span>Step {step} of 6</span>
            <span>{Math.round(((step - 1) / 5) * 100)}%</span>
          </div>
          <div className="h-1 bg-elevated rounded-full">
            <div className="h-full bg-orange-DEFAULT rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 5) * 100}%` }} />
          </div>
        </div>
      )}

      {/* Step 1 — Vehicle */}
      {step === 1 && (
        <div>
          <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">What vehicle?</h2>
          <p className="text-text-secondary mb-6">Enter the VIN for the fastest decode.</p>
          <input
            value={vin}
            onChange={(e) => setVin(e.target.value.toUpperCase().slice(0, 17))}
            placeholder="17-character VIN"
            className="w-full bg-panel border border-line rounded-xl px-4 py-3.5 text-text-primary placeholder:text-text-secondary font-mono text-sm uppercase tracking-widest outline-none focus:border-orange-DEFAULT/60 transition-colors mb-2"
          />
          <p className="text-xs text-text-secondary mb-3">{vin.length}/17</p>
          {vinDecoded ? (
            <div className="bg-panel rounded-xl border border-green-500/30 p-4 mb-4">
              <p className="text-xs text-green-400 mb-1 flex items-center gap-1"><Check size={12} aria-hidden="true" /> Confirmed</p>
              <p className="font-semibold tracking-tight text-text-primary">2014 Chevrolet Silverado 1500</p>
              <p className="text-sm text-text-secondary">5.3L V8 · 4WD · LT trim</p>
            </div>
          ) : (
            <button onClick={decodeVin} disabled={vin.length !== 17 || vinLoading} className="w-full py-3 rounded-xl bg-orange-DEFAULT/10 border border-orange-DEFAULT/30 text-orange-DEFAULT text-sm font-semibold hover:bg-orange-DEFAULT/20 disabled:opacity-40 transition-colors flex items-center justify-center gap-2 mb-4">
              {vinLoading && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
              Decode VIN
            </button>
          )}
          <button onClick={() => setStep(2)} disabled={!vinDecoded} className="w-full py-4 rounded-xl bg-orange-DEFAULT text-white font-semibold disabled:opacity-40 hover:bg-orange-hover transition-colors">
            Continue →
          </button>
        </div>
      )}

      {/* Step 2 — What's needed */}
      {step === 2 && (
        <div>
          <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">What&apos;s needed?</h2>
          <p className="text-text-secondary mb-6">2014 Silverado 1500 · 5.3L V8</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {partTypes.map((p) => (
              <button key={p} onClick={() => setPartType(p)} className={clsx("py-3 rounded-xl border text-sm font-medium transition-all", partType === p ? "bg-orange-DEFAULT/20 border-orange-DEFAULT text-orange-DEFAULT" : "bg-panel border-line text-text-secondary hover:border-text-tertiary")}>
                {p}
              </button>
            ))}
          </div>
          {partType === "Engine" && (
            <div className="mb-4">
              <p className="text-sm text-text-secondary mb-2">Engine type</p>
              <div className="space-y-2">
                {engineSubtypes.map((s) => (
                  <button key={s} onClick={() => setSubType(s)} className={clsx("w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all", subType === s ? "bg-orange-DEFAULT/20 border-orange-DEFAULT text-orange-DEFAULT" : "bg-panel border-line text-text-secondary hover:border-text-tertiary")}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="space-y-3 mb-6">
            {[
              { label: "Max miles", placeholder: "150,000" },
              { label: "Max price", placeholder: "$3,000" },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-sm text-text-secondary mb-1.5 block">{f.label}</label>
                <input placeholder={f.placeholder} className="w-full bg-panel border border-line rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors" />
              </div>
            ))}
          </div>
          <button onClick={() => setStep(3)} disabled={!partType} className="w-full py-4 rounded-xl bg-orange-DEFAULT text-white font-semibold disabled:opacity-40 hover:bg-orange-hover transition-colors">
            Continue →
          </button>
        </div>
      )}

      {/* Step 3 — Customer info */}
      {step === 3 && (
        <div>
          <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">Customer info</h2>
          <p className="text-text-secondary mb-6">Optional. Skip if using Markup model.</p>
          <div className="space-y-4 mb-6">
            {[
              { label: "Customer name", placeholder: "Dave Martinez" },
              { label: "Customer phone", placeholder: "(555) 123-4567" },
              { label: "Budget range", placeholder: "$2,000–$2,500" },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-sm text-text-secondary mb-1.5 block">{f.label}</label>
                <input placeholder={f.placeholder} className="w-full bg-panel border border-line rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors" />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStep(4)} className="flex-1 py-4 rounded-xl bg-orange-DEFAULT text-white font-semibold hover:bg-orange-hover transition-colors">
              Continue →
            </button>
            <button onClick={() => setStep(4)} className="px-4 py-4 rounded-xl border border-line text-text-secondary text-sm hover:text-text-primary hover:bg-elevated transition-colors">
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Step 4 — Submit */}
      {step === 4 && (
        <div>
          <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">Ready to submit?</h2>
          <p className="text-text-secondary mb-6">
            5.3L long block for 2014 Silverado 1500 · max $3,000 · max 150k mi
          </p>
          {callingActive ? (
            <div className="bg-panel rounded-xl border border-line p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-orange-DEFAULT/10 flex items-center justify-center mx-auto mb-3">
                <Phone size={26} className="text-orange-DEFAULT" aria-hidden="true" />
              </div>
              <p className="font-semibold tracking-tight text-text-primary mb-2">Calling 15 yards...</p>
              <div className="dot-pulse flex items-center justify-center gap-1">
                <span /><span /><span />
              </div>
            </div>
          ) : (
            <button
              onClick={submitRequest}
              className="w-full py-3.5 rounded-lg bg-orange-DEFAULT text-white font-medium hover:bg-orange-hover transition-colors"
            >
              Submit request — Get base quotes in 90 seconds
            </button>
          )}
        </div>
      )}

      {/* Step 5 — Base quotes */}
      {step === 5 && (
        <div>
          <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">Base quotes in</h2>
          <p className="text-text-secondary mb-6">Select one to build your quote for the customer.</p>
          <div className="space-y-3 mb-6">
            {mockBaseQuotes.map((q, i) => (
              <button
                key={i}
                onClick={() => setSelectedQuote(i)}
                className={clsx("w-full text-left p-4 rounded-xl border transition-all", selectedQuote === i ? "border-orange-DEFAULT/60 bg-orange-DEFAULT/10" : "border-line bg-panel hover:border-text-tertiary")}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-text-primary text-sm">{q.yardName}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{q.mileage.toLocaleString()} mi · {q.warranty} warranty · Ships: {q.shipping}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold tracking-tight text-lg text-text-primary">${q.price.toLocaleString()}</p>
                    <p className="text-xs text-text-secondary">Your cost</p>
                  </div>
                </div>
                {selectedQuote === i && (
                  <div className="mt-1.5">
                    <Check size={14} className="text-orange-DEFAULT" aria-hidden="true" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <button onClick={() => { setRetailPrice(String(Math.round(mockBaseQuotes[selectedQuote].total * 1.22))); setStep(6); }} className="w-full py-4 rounded-xl bg-orange-DEFAULT text-white font-semibold hover:bg-orange-hover transition-colors">
            Build customer quote →
          </button>
        </div>
      )}

      {/* Step 6 — Quote Builder */}
      {step === 6 && (
        <div>
          <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">Set your price</h2>
          <div className="bg-panel rounded-xl border border-line p-4 mb-4">
            <p className="text-sm text-text-secondary">Total cost to you</p>
            <p className="font-semibold tracking-tight text-2xl text-text-primary">${mockBaseQuotes[selectedQuote].total.toLocaleString()}</p>
          </div>

          <p className="text-sm text-text-secondary mb-3">AI Pricing suggestions</p>
          <div className="space-y-2 mb-4">
            {tiers.map((t) => {
              const price = Math.round(mockBaseQuotes[selectedQuote].total * (1 + t.margin));
              return (
                <button
                  key={t.label}
                  onClick={() => setRetailPrice(String(price))}
                  className={clsx("w-full text-left p-3 rounded-xl border transition-all", String(price) === retailPrice ? "border-orange-DEFAULT/60 bg-orange-DEFAULT/10" : t.recommended ? "border-orange-DEFAULT/30 bg-panel hover:border-orange-DEFAULT/50" : "border-line bg-panel hover:border-text-tertiary")}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium text-text-primary inline-flex items-center gap-1">
                        {t.label}
                        {t.hot && <Flame size={12} className="text-orange-DEFAULT" aria-hidden="true" />}
                      </span>
                      <p className="text-xs text-text-secondary mt-0.5">{t.desc}</p>
                    </div>
                    <span className="font-semibold tracking-tight text-lg text-text-primary">${price.toLocaleString()}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mb-4">
            <label className="text-sm text-text-secondary mb-1.5 block">Custom price</label>
            <input
              type="number"
              value={retailPrice}
              onChange={(e) => setRetailPrice(e.target.value)}
              className="w-full bg-panel border border-line rounded-xl px-4 py-3 text-text-primary text-lg font-mono outline-none focus:border-orange-DEFAULT/60 transition-colors"
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Your profit</span>
              <span className="font-semibold text-green-400 text-lg">${profit.toLocaleString()}</span>
            </div>
          </div>

          <button onClick={() => setStep(7)} className="w-full py-4 rounded-xl bg-orange-DEFAULT text-white font-semibold hover:bg-orange-hover transition-colors">
            Generate customer quote →
          </button>
        </div>
      )}

      {/* Step 7 — Customer quote delivery */}
      {step === 7 && (
        <div>
          <h2 className="font-semibold tracking-tight text-3xl text-text-primary mb-2">Send to customer</h2>
          <p className="text-text-secondary mb-6">Your branding. AutoMotor is invisible.</p>
          <div className="bg-panel rounded-xl border border-orange-DEFAULT/20 p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-DEFAULT/10 flex items-center justify-center">
                <Wrench size={18} className="text-orange-DEFAULT" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">Mike&apos;s Auto Repair</p>
                <p className="text-xs text-text-secondary">(214) 555-0100</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary mb-1">Quote for:</p>
            <p className="font-semibold text-text-primary">5.3L Long Block — 2014 Silverado 1500</p>
            <div className="flex justify-between mt-3 pt-3 border-t border-line">
              <span className="text-text-secondary text-sm">Your price</span>
              <span className="font-semibold tracking-tight text-xl text-text-primary">${currentRetail.toLocaleString()}</span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-text-secondary mb-2">AI-drafted SMS</p>
            <textarea
              rows={3}
              defaultValue={`Hi Dave! Here's your quote for the 5.3 engine for your '14 Silverado: $${currentRetail.toLocaleString()} installed, 90-day warranty. Ready to go Monday. Want to lock it in? — Mike's Auto`}
              className="w-full bg-panel border border-line rounded-xl px-4 py-3 text-text-secondary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { icon: Smartphone, label: "SMS" },
              { icon: Mail, label: "Email" },
              { icon: LinkIcon, label: "Link" },
            ].map((opt) => (
              <button key={opt.label} className="py-3 rounded-xl border border-line text-text-secondary text-sm hover:border-text-tertiary hover:text-text-primary transition-colors flex items-center justify-center gap-1.5">
                <opt.icon size={14} aria-hidden="true" /> {opt.label}
              </button>
            ))}
          </div>

          <button onClick={() => router.push("/mechanics/dashboard")} className="w-full py-4 rounded-xl bg-orange-DEFAULT text-white font-semibold hover:bg-orange-hover transition-colors">
            Send quote →
          </button>
        </div>
      )}
    </div>
  );
}
