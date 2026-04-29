"use client";

import { ChevronRight, BookOpen } from "lucide-react";

interface DiagnosisCardProps {
  onGetQuotes: () => void;
}

export default function DiagnosisCard({ onGetQuotes }: DiagnosisCardProps) {
  return (
    <div className="bg-bg border border-line rounded-xl p-4 mt-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
        <span className="font-semibold tracking-tight text-text-primary">
          Most likely: AFM Lifter Failure
        </span>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-text-secondary">Confidence</span>
          <span className="text-xs font-semibold text-orange-DEFAULT">78%</span>
        </div>
        <div className="h-1.5 bg-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-DEFAULT rounded-full"
            style={{ width: "78%" }}
          />
        </div>
      </div>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Worn timing chain</span>
          <span className="text-xs text-text-secondary">52%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Rod bearing failure</span>
          <span className="text-xs text-text-secondary">31%</span>
        </div>
      </div>

      <div className="border-t border-line pt-3 mb-4">
        <p className="text-sm text-text-secondary">
          <span className="text-text-primary font-medium">Typical fix:</span>{" "}
          Used engine swap —{" "}
          <span className="text-orange-DEFAULT font-semibold">$1,800–$3,200</span>
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onGetQuotes}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-orange-DEFAULT text-white text-sm font-semibold hover:bg-orange-hover transition-colors"
        >
          Get quotes
          <ChevronRight size={14} aria-hidden="true" />
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-line text-text-primary text-sm font-medium hover:bg-elevated transition-colors">
          <BookOpen size={14} aria-hidden="true" />
          Learn more
        </button>
      </div>
    </div>
  );
}
