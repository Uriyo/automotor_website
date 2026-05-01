"use client";

import { useState } from "react";
import { X, Download, Copy, Check, MessageSquare, Smartphone, Music, Instagram, Twitter, Facebook } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LogoMark } from "@/components/Logo";

interface SavingsReceiptProps {
  savings: number;
  marketAvg: number;
  yourPrice: number;
  vehicle: string;
  secondsElapsed: number;
  onClose: () => void;
}

const shareTargets: { icon: LucideIcon; label: string }[] = [
  { icon: MessageSquare, label: "iMessage" },
  { icon: Smartphone, label: "WhatsApp" },
  { icon: Music, label: "TikTok" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "X" },
  { icon: Facebook, label: "Facebook" },
];

export default function SavingsReceiptModal({
  savings,
  marketAvg,
  yourPrice,
  vehicle,
  secondsElapsed,
  onClose,
}: SavingsReceiptProps) {
  const [copied, setCopied] = useState(false);
  const shareLink = "https://automotor.ai/s/abc123";

  const copy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="savings-receipt-headline"
        className="relative w-full max-w-[500px] bg-panel border border-line rounded-xl p-6 shadow-lg overflow-hidden"
      >
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors">
          <X size={18} aria-hidden="true" />
        </button>

        {/* Headline */}
        <div className="text-center mb-6 relative z-10">
          <p
            id="savings-receipt-headline"
            className="font-semibold tracking-tight text-4xl text-text-primary mb-1"
          >
            You just saved ${savings.toLocaleString()}.
          </p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="text-text-secondary line-through text-sm">Market avg: ${marketAvg.toLocaleString()}</span>
            <span className="text-text-primary font-semibold">→ Your best quote: ${yourPrice.toLocaleString()}</span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            On your {vehicle} — in {secondsElapsed} seconds.
          </p>
        </div>

        {/* Shareable card preview */}
        <div className="bg-bg border border-orange-DEFAULT/30 rounded-xl p-4 mb-4 relative z-10">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-semibold tracking-tight text-2xl text-text-primary">
                I saved ${savings.toLocaleString()}
              </p>
              <p className="text-sm text-text-secondary">on my {vehicle}.</p>
              <p className="text-sm text-text-secondary">using <span className="text-orange-DEFAULT font-semibold">AutoMotor.AI</span>.</p>
              <p className="text-sm text-text-secondary">in {secondsElapsed} seconds.</p>
            </div>
            <div className="w-12 h-12 bg-elevated border border-line rounded-lg flex items-center justify-center">
              <LogoMark size={28} className="text-text-primary" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-text-secondary">AutoMotor.AI</span>
            <button className="flex items-center gap-1 text-xs text-orange-DEFAULT hover:underline">
              <Download size={11} aria-hidden="true" />
              Save image
            </button>
          </div>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4 relative z-10">
          {shareTargets.map((s) => (
            <button key={s.label} className="flex flex-col items-center gap-1 py-2 rounded-xl border border-line hover:bg-elevated transition-colors">
              <s.icon size={18} className="text-text-secondary" aria-hidden="true" />
              <span className="text-[10px] text-text-secondary">{s.label}</span>
            </button>
          ))}
          <button onClick={copy} className="flex flex-col items-center gap-1 py-2 rounded-xl border border-line hover:bg-elevated transition-colors">
            {copied ? <Check size={18} className="text-green-400" aria-hidden="true" /> : <Copy size={18} className="text-text-secondary" aria-hidden="true" />}
            <span className="text-[10px] text-text-secondary">{copied ? "Copied!" : "Copy link"}</span>
          </button>
        </div>

        {/* Reward messaging */}
        <div className="bg-orange-DEFAULT/10 border border-orange-DEFAULT/30 rounded-xl px-4 py-2.5 text-center mb-4 relative z-10">
          <p className="text-sm font-medium text-orange-DEFAULT">
            Share your receipt — earn $25 credit + your friends get $25 off.
          </p>
        </div>

        <button onClick={onClose} className="w-full text-center text-xs text-text-secondary hover:text-text-primary transition-colors relative z-10">
          Maybe later
        </button>
      </div>
    </div>
  );
}
