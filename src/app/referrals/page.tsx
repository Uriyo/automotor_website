"use client";

import { useState } from "react";
import { Copy, Check, MessageSquare, Smartphone, Music, Instagram, Twitter, Facebook, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const REFERRAL_LINK = "https://automotor.ai/s/guest-r9x2";

const referrals = [
  { name: "Alex T.", status: "Purchased", credit: "$25" },
  { name: "Sarah M.", status: "Quoted", credit: "$0" },
  { name: "Roberto V.", status: "Signed up", credit: "$0" },
];

const shareTargets: { icon: LucideIcon; label: string }[] = [
  { icon: MessageSquare, label: "iMessage" },
  { icon: Smartphone, label: "WhatsApp" },
  { icon: Music, label: "TikTok" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "X" },
  { icon: Facebook, label: "Facebook" },
];

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(REFERRAL_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-3xl mx-auto pb-20 lg:pb-8">
      {/* Hero */}
      <div className="bg-panel rounded-xl border border-orange-DEFAULT/20 p-6 text-center mb-6">
        <p className="text-text-secondary text-sm mb-1">You&apos;ve earned in referral credit</p>
        <p className="font-semibold tracking-tight text-4xl text-text-primary mb-2">$325</p>
        <p className="text-sm text-text-secondary">Share your link → earn $25 credit + your friends get $25 off.</p>
      </div>

      {/* Referral link */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <p className="text-sm font-semibold text-text-primary mb-3">Your referral link</p>
        <div className="flex gap-2">
          <input readOnly value={REFERRAL_LINK} className="flex-1 bg-bg border border-line rounded-xl px-3 py-2.5 text-text-secondary text-sm font-mono outline-none" />
          <button onClick={copy} className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-line text-text-secondary text-sm hover:text-text-primary hover:bg-elevated transition-colors flex-shrink-0">
            {copied ? <Check size={14} className="text-green-400" aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Share buttons */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {shareTargets.map((s) => (
          <button key={s.label} className="flex flex-col items-center gap-1 py-3 rounded-xl border border-line hover:bg-elevated transition-colors">
            <s.icon size={20} className="text-text-secondary" aria-hidden="true" />
            <span className="text-xs text-text-secondary">{s.label}</span>
          </button>
        ))}
        <button onClick={copy} className="flex flex-col items-center gap-1 py-3 rounded-xl border border-line hover:bg-elevated transition-colors">
          {copied ? <Check size={18} className="text-green-400" aria-hidden="true" /> : <Copy size={18} className="text-text-secondary" aria-hidden="true" />}
          <span className="text-xs text-text-secondary">Copy link</span>
        </button>
      </div>

      {/* Progress ladder */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <p className="font-semibold text-text-primary mb-3">Progress ladder</p>
        <p className="text-sm text-text-secondary mb-4">
          3 friends signed up.{" "}
          <span className="text-text-primary font-medium">5 more = Garage Gang status</span>{" "}
          (lifetime 10% off install fees + priority access to rare parts).
        </p>
        <div className="flex gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full ${i < 3 ? "bg-orange-DEFAULT" : "bg-elevated"}`} />
          ))}
        </div>
        <p className="text-xs text-text-secondary mt-1.5">3/8 toward Garage Gang status</p>
      </div>

      {/* Leaderboard */}
      <div className="bg-panel rounded-xl border border-line px-4 py-3 mb-4">
        <p className="text-sm font-medium text-orange-DEFAULT flex items-center gap-1.5"><Trophy size={14} aria-hidden="true" /> You&apos;re #47 in Texas this month</p>
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
              {["Name", "Status", "Credit"].map((h) => (
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
                    r.status === "Purchased" ? "bg-green-500/20 text-green-400" :
                    r.status === "Quoted" ? "bg-orange-DEFAULT/20 text-orange-DEFAULT" :
                    "bg-elevated text-text-secondary"
                  }`}>{r.status}</span>
                </td>
                <td className="px-5 py-3 font-semibold text-green-400">{r.credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
