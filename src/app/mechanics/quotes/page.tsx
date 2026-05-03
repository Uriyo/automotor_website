"use client";

import { useState } from "react";
import { ChevronDown, Phone, Send, Bot } from "lucide-react";

const quotes = [
  { id: "q1", customer: "Dave M.", vehicle: "2014 Silverado", part: "5.3L engine", price: 2350, status: "Viewing", views: 4, lastActivity: "2h ago", score: 83, expanded: false },
  { id: "q2", customer: "Marcus T.", vehicle: "2018 F-150", part: "5.0L engine", price: 2680, status: "Sent", views: 1, lastActivity: "1d ago", score: 45, expanded: false },
  { id: "q3", customer: "Jennifer R.", vehicle: "2019 Ram 1500", part: "3.6L engine", price: 1850, status: "Not opened", views: 0, lastActivity: "3d ago", score: 12, expanded: false },
];

export default function MechanicQuotesPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-semibold tracking-tight text-xl sm:text-2xl text-text-primary">Active Quotes</h1>
      </div>

      <div className="space-y-2">
        {quotes.map((q) => (
          <div key={q.id} className="bg-panel rounded-xl border border-line">
            <div
              className="flex items-center gap-3 px-4 py-3 cursor-pointer"
              onClick={() => setExpanded(expanded === q.id ? null : q.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-text-primary">{q.customer}</span>
                  <span className="text-xs text-text-secondary">·</span>
                  <span className="text-sm text-text-secondary">{q.vehicle} · {q.part}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <span>Your price: ${q.price.toLocaleString()}</span>
                  <span className={`px-1.5 py-0.5 rounded-full font-medium ${
                    q.status === "Viewing" ? "bg-orange-DEFAULT/20 text-orange-DEFAULT" :
                    q.status === "Sent" ? "bg-blue-500/20 text-blue-400" :
                    "bg-elevated text-text-secondary"
                  }`}>{q.status} {q.views > 0 && `(${q.views}×)`}</span>
                  <span>Last: {q.lastActivity}</span>
                  <span className={`px-1.5 py-0.5 rounded font-semibold ${q.score >= 70 ? "text-green-400" : q.score >= 40 ? "text-yellow-400" : "text-text-secondary"}`}>
                    Intent: {q.score}%
                  </span>
                </div>
              </div>
              <ChevronDown size={16} className={`text-text-secondary transition-transform ${expanded === q.id ? "rotate-180" : ""}`} aria-hidden="true" />
            </div>

            {expanded === q.id && (
              <div className="border-t border-line px-4 py-4 flex gap-2 flex-wrap">
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-line text-text-primary text-sm hover:bg-elevated transition-colors">
                  <Phone size={13} className="text-orange-DEFAULT" aria-hidden="true" />
                  Call customer
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-line text-text-primary text-sm hover:bg-elevated transition-colors">
                  <Send size={13} className="text-orange-DEFAULT" aria-hidden="true" />
                  Send follow-up
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-orange-DEFAULT/10 border border-orange-DEFAULT/30 text-orange-DEFAULT text-sm hover:bg-orange-DEFAULT/20 transition-colors">
                  <Bot size={13} aria-hidden="true" /> AI draft message
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
