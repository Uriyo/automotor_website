"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Wrench, Send, Bot } from "lucide-react";

const mockConversation = [
  { role: "ai", text: "Hi! I can help you find a used engine for your 2015 F-150. What's the engine size?" },
  { role: "user", text: "5.0L V8" },
  { role: "ai", text: "Got it. Is the engine completely seized, or is it running rough / knocking?" },
  { role: "user", text: "It's knocking really bad at startup and getting louder. Running for about 2 months like this." },
  { role: "ai", text: "That's a classic rod knock — likely spun rod bearing from oil starvation. You'll need an engine replacement. Want me to call 15 yards for quotes?" },
  { role: "user", text: "Yeah let's do it. My number is (214) 555-1234" },
];

export default function LeadDetailPage() {
  const [price, setPrice] = useState("2250");
  const [mileage, setMileage] = useState("89000");
  const [warranty, setWarranty] = useState("90");
  const [notes, setNotes] = useState("");

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      <Link href="/yards/leads" className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary text-sm mb-6 transition-colors">
        <ArrowLeft size={14} aria-hidden="true" />
        Back to leads
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: conversation */}
        <div>
          <h2 className="font-semibold tracking-tight text-xl text-text-primary mb-4">
            Customer conversation
          </h2>
          <div className="bg-panel rounded-xl border border-line p-4 space-y-3 max-h-[500px] overflow-y-auto">
            {mockConversation.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "items-start gap-2"}`}>
                {msg.role === "ai" && (
                  <div className="w-6 h-6 rounded-full bg-orange-DEFAULT/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Wrench size={11} className="text-orange-DEFAULT" aria-hidden="true" />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-xl px-3 py-2.5 text-sm ${
                  msg.role === "user"
                    ? "bg-panel border-l-2 border-orange-DEFAULT/40 text-text-primary"
                    : "bg-bg text-text-primary border border-line"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: quote submission */}
        <div>
          <h2 className="font-semibold tracking-tight text-xl text-text-primary mb-4">
            Submit your quote
          </h2>
          <div className="bg-panel rounded-xl border border-line p-5">
            <div className="bg-orange-DEFAULT/10 border border-orange-DEFAULT/30 rounded-xl p-3 mb-5">
              <p className="text-xs text-orange-DEFAULT font-medium flex items-center gap-1"><Bot size={12} aria-hidden="true" /> AI suggestion</p>
              <p className="text-sm text-text-secondary mt-1">
                Customer budget $2,400 · Market avg $2,100 · Suggest quoting $2,150–$2,350 for 74% close probability
              </p>
            </div>

            <div className="space-y-4 mb-5">
              {[
                { label: "Your price ($)", value: price, onChange: setPrice, type: "number" },
                { label: "Mileage", value: mileage, onChange: setMileage, type: "number" },
                { label: "Warranty (days)", value: warranty, onChange: setWarranty, type: "number" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-sm text-text-secondary mb-1.5 block">{f.label}</label>
                  <input
                    type={f.type}
                    value={f.value}
                    onChange={(e) => f.onChange(e.target.value)}
                    className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-text-primary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors"
                  />
                </div>
              ))}

              {[
                { label: "Shipping available", type: "toggle" },
                { label: "Condition", options: ["Tested & verified", "Tested", "As-is"] },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-sm text-text-secondary mb-1.5 block">{f.label}</label>
                  {"options" in f ? (
                    <select className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-text-primary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors">
                      {f.options!.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="accent-orange-DEFAULT w-4 h-4" defaultChecked />
                      <span className="text-sm text-text-secondary">Yes, we can ship</span>
                    </div>
                  )}
                </div>
              ))}

              <div>
                <label className="text-sm text-text-secondary mb-1.5 block">Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional details..."
                  rows={2}
                  className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors resize-none"
                />
              </div>
            </div>

            <button className="w-full py-3.5 rounded-xl bg-orange-DEFAULT text-white font-semibold flex items-center justify-center gap-2 hover:bg-orange-hover transition-colors">
              <Send size={15} aria-hidden="true" />
              Send quote
            </button>
            <p className="text-xs text-text-secondary text-center mt-2">
              Quote will be sent as SMS to customer and appear in their chat
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
