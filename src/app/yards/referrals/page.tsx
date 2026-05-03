"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const REFERRAL_LINK = "https://automotor.ai/yards/r/tommys-a8x3";

const referrals = [
  { name: "Desert Parts Phoenix", status: "Active", deals: 18, earned: "$900" },
  { name: "Midwest Salvage KC", status: "First lead", deals: 0, earned: "$500" },
  { name: "Gulf Coast Auto Parts", status: "Signed up", deals: 0, earned: "$0" },
];

export default function YardReferralsPage() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-3xl">
      <h1 className="font-semibold tracking-tight text-xl sm:text-2xl text-text-primary mb-5 sm:mb-6">Referrals</h1>

      <div className="bg-panel rounded-xl border border-orange-DEFAULT/20 p-6 text-center mb-6">
        <p className="text-text-secondary text-sm mb-1">Earned in referral bonuses</p>
        <p className="font-semibold tracking-tight text-4xl text-text-primary mb-2">$1,400</p>
        <p className="text-sm text-text-secondary">Refer a yard → earn $500 + 5% override for 12 months</p>
      </div>

      <div className="bg-panel rounded-xl border border-line p-5 mb-6">
        <p className="text-sm font-semibold text-text-primary mb-3">Your referral link</p>
        <div className="flex gap-2">
          <input readOnly value={REFERRAL_LINK} className="flex-1 bg-bg border border-line rounded-xl px-3 py-2.5 text-text-secondary text-sm font-mono outline-none" />
          <button
            onClick={() => { navigator.clipboard.writeText(REFERRAL_LINK); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-line text-text-secondary text-sm hover:text-text-primary transition-colors"
          >
            {copied ? <Check size={14} className="text-green-400" aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="bg-panel rounded-xl border border-line overflow-hidden">
        <div className="px-5 py-4 border-b border-line">
          <h3 className="font-semibold text-text-primary">Referred yards</h3>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line">
              {["Yard", "Status", "Deals", "Earned"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs text-text-secondary font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {referrals.map((r, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                <td className="px-5 py-3 font-medium text-text-primary">{r.name}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    r.status === "Active" ? "bg-green-500/20 text-green-400" :
                    r.status === "First lead" ? "bg-orange-DEFAULT/20 text-orange-DEFAULT" :
                    "bg-elevated text-text-secondary"
                  }`}>{r.status}</span>
                </td>
                <td className="px-5 py-3 text-text-secondary">{r.deals}</td>
                <td className="px-5 py-3 font-semibold text-green-400">{r.earned}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
