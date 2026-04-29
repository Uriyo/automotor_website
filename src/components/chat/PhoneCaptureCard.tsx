"use client";

import { useState } from "react";
import { Zap, Lock, Rocket } from "lucide-react";

interface PhoneCaptureCardProps {
  onSubmit: (phone: string) => void;
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function PhoneCaptureCard({ onSubmit }: PhoneCaptureCardProps) {
  const [phone, setPhone] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const isValid = phone.replace(/\D/g, "").length === 10;

  return (
    <div className="bg-bg border border-orange-DEFAULT/40 rounded-xl p-4 mt-2">
      <div className="flex items-start gap-2 mb-3">
        <Rocket size={20} className="text-orange-DEFAULT flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <h4 className="font-semibold tracking-tight text-text-primary text-base">
            Ready to call 15 yards for you.
          </h4>
          <p className="text-sm text-text-secondary mt-0.5">
            Where should I text the quotes?
          </p>
        </div>
      </div>

      <input
        type="tel"
        value={phone}
        onChange={handleChange}
        placeholder="(555) 123-4567"
        className="w-full bg-panel border border-line rounded-xl px-4 py-3.5 text-text-primary placeholder:text-text-secondary text-lg font-mono outline-none focus:border-orange-DEFAULT/60 transition-colors mb-4"
      />

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Zap size={14} className="text-orange-DEFAULT flex-shrink-0" aria-hidden="true" />
          Quotes in 90 seconds
        </div>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Lock size={14} className="text-orange-DEFAULT flex-shrink-0" aria-hidden="true" />
          We never call you — SMS only
        </div>
      </div>

      <button
        onClick={() => isValid && onSubmit(phone)}
        disabled={!isValid}
        className="w-full py-3.5 rounded-xl bg-orange-DEFAULT text-white font-semibold text-sm hover:bg-orange-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Get My Quotes →
      </button>

      <p className="text-xs text-text-secondary text-center mt-2">
        No account needed · No spam
      </p>
    </div>
  );
}
