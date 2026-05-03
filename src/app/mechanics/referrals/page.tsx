"use client";

import { useState } from "react";
import { Copy, Check, Share2, Smartphone, Facebook, Mail, Megaphone, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const referrals = [
  { name: "Carlos R.", shop: "South TX Auto", status: "Active", deals: 4, earned: "$280" },
  { name: "Jessica L.", shop: "Precision Motors", status: "First deal", deals: 1, earned: "$200" },
  { name: "Bob T.", shop: "Bob's Garage", status: "Signed up", deals: 0, earned: "$0" },
];

const REFERRAL_LINK = "https://automotor.ai/r/mike-auto-d83f";

export default function MechanicReferralsPage() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(REFERRAL_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-3xl">
      <h1 className="font-semibold tracking-tight text-xl sm:text-2xl text-text-primary mb-5 sm:mb-6">Referrals</h1>

      {/* Hero earned */}
      <div className="bg-panel rounded-xl border border-orange-DEFAULT/20 p-6 text-center mb-4">
        <p className="text-text-secondary text-sm mb-1">You&apos;ve earned in referral credit</p>
        <p className="font-semibold tracking-tight text-4xl text-orange-DEFAULT mb-2">$480</p>
        <p className="text-sm text-text-secondary">Refer a mechanic → earn $200 + 10% override for 12 months</p>
      </div>

      {/* Referral link */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <p className="text-sm font-semibold text-text-primary mb-3">Your referral link</p>
        <div className="flex gap-2">
          <input
            readOnly
            value={REFERRAL_LINK}
            className="flex-1 bg-bg border border-line rounded-xl px-3 py-2.5 text-text-secondary text-sm font-mono outline-none"
          />
          <button onClick={copy} className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-line text-text-secondary text-sm hover:text-text-primary hover:bg-elevated transition-colors">
            {copied ? <Check size={14} className="text-green-400" aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Share buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {([
          { icon: Smartphone, label: "Share via SMS", text: "Hey, been using AutoMotor to source used engines — making an extra $3-4K/month. Worth checking out: " + REFERRAL_LINK },
          { icon: Facebook, label: "Facebook", text: "Share on Facebook" },
          { icon: Mail, label: "Email template", text: "" },
          { icon: Megaphone, label: "Order physical cards", text: "" },
        ] as { icon: LucideIcon; label: string; text: string }[]).map((btn) => (
          <button key={btn.label} className="py-3 rounded-xl border border-line text-text-secondary text-sm hover:text-text-primary hover:bg-elevated transition-colors flex items-center justify-center gap-2">
            <btn.icon size={14} aria-hidden="true" /> {btn.label}
          </button>
        ))}
      </div>

      {/* Progress ladder */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <p className="font-semibold text-text-primary mb-3">Progress ladder</p>
        <p className="text-sm text-text-secondary mb-4">
          3 friends signed up. <span className="text-text-primary">5 more = Garage Gang status</span> (lifetime 10% off install fees + priority access to rare parts).
        </p>
        <div className="flex gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full ${i < 3 ? "bg-orange-DEFAULT" : "bg-elevated"}`} />
          ))}
        </div>
        <p className="text-xs text-text-secondary mt-1.5">3/8 · 5 more to Garage Gang</p>
      </div>

      {/* Leaderboard */}
      <div className="bg-panel rounded-xl border border-line px-4 py-3 mb-4">
        <p className="text-sm font-medium text-orange-DEFAULT flex items-center gap-1.5"><Trophy size={14} aria-hidden="true" /> You&apos;re #12 in Texas this month</p>
      </div>

      {/* Referrals table */}
      <div className="bg-panel rounded-xl border border-line overflow-hidden">
        <div className="px-5 py-4 border-b border-line">
          <h3 className="font-semibold text-text-primary">Your referrals</h3>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line">
              {["Mechanic", "Status", "Deals", "Earned"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs text-text-secondary font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {referrals.map((r, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                <td className="px-5 py-3">
                  <p className="font-medium text-text-primary">{r.name}</p>
                  <p className="text-xs text-text-secondary">{r.shop}</p>
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    r.status === "Active" ? "bg-green-500/20 text-green-400" :
                    r.status === "First deal" ? "bg-orange-DEFAULT/20 text-orange-DEFAULT" :
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
