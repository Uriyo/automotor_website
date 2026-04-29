"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, Plus, Eye, Phone, Flame, AlertTriangle, DollarSign, Gem, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const activeQuotes = [
  {
    id: "q1",
    vehicle: "2014 Silverado",
    part: "5.3 engine",
    customer: "Dave M.",
    base: 1800,
    retail: 2350,
    status: "Viewing",
    views: 4,
    time: "2h open",
    hot: true,
  },
  {
    id: "q2",
    vehicle: "2018 F-150",
    part: "5.0L engine",
    customer: "Marcus T.",
    base: 2100,
    retail: 2680,
    status: "Sent",
    views: 1,
    time: "8h open",
    hot: false,
  },
  {
    id: "q3",
    vehicle: "2019 Ram 1500",
    part: "3.6L engine",
    customer: "Jennifer R.",
    base: 1400,
    retail: 1850,
    status: "Not opened",
    views: 0,
    time: "3d open",
    hot: false,
    lost: true,
  },
];

const aiCards: { icon: LucideIcon; iconColor: string; text: string; action: string }[] = [
  {
    icon: Flame,
    iconColor: "text-orange-DEFAULT",
    text: "Dave Martinez just opened your quote for the 4th time — 83% likely to buy. Call him now.",
    action: "Call now",
  },
  {
    icon: AlertTriangle,
    iconColor: "text-yellow-400",
    text: "Jessica hasn't opened her quote in 72 hours — likely lost. Send re-engagement?",
    action: "Yes, draft one",
  },
];

export default function MechanicDashboardPage() {
  const PLATINUM_GOAL = 9;
  const currentDeals = 7;
  const pctToPlat = (currentDeals / PLATINUM_GOAL) * 100;

  return (
    <div className="px-4 lg:px-8 py-8 max-w-5xl">
      {/* Greeting */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-semibold tracking-tight text-2xl text-text-primary">
            Welcome back, Mike&apos;s Auto.
          </h1>
        </div>
        <div className="text-right text-sm text-text-secondary flex items-center gap-1">
          +$640 · Closed Silverado engine · 2 days ago
          <DollarSign size={14} className="text-green-400 ml-1" aria-hidden="true" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Earned this month", value: "$4,280" },
          { label: "Jobs closed", value: "12" },
          { label: "Avg margin", value: "2.3×" },
          { label: "Platinum status", value: `${currentDeals}/${PLATINUM_GOAL}` },
        ].map((s) => (
          <div key={s.label} className="bg-panel rounded-xl border border-line p-4">
            <p className="text-xs text-text-secondary mb-1">{s.label}</p>
            <p className="font-semibold tracking-tight text-2xl text-text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Platinum tier progress */}
      <div className="bg-panel rounded-xl border border-line p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-text-primary inline-flex items-center gap-1.5">
            <Gem size={14} className="text-orange-DEFAULT" aria-hidden="true" /> Platinum status progress
          </p>
          <p className="text-xs text-text-secondary">
            {currentDeals} of {PLATINUM_GOAL} deals this month
          </p>
        </div>
        <div className="h-2 bg-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-DEFAULT to-yellow-400 rounded-full transition-all duration-1000"
            style={{ width: `${pctToPlat}%` }}
          />
        </div>
        <p className="text-xs text-text-secondary mt-1.5">
          {PLATINUM_GOAL - currentDeals} more deal{PLATINUM_GOAL - currentDeals !== 1 ? "s" : ""} to unlock Platinum (6% fee, dedicated CSM)
        </p>
      </div>

      {/* New Part Request CTA */}
      <Link
        href="/mechanics/requests/new"
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-orange-DEFAULT text-white font-medium hover:bg-orange-hover transition-colors mb-6"
      >
        <Plus size={20} aria-hidden="true" />
        New Part Request
      </Link>

      {/* Active quotes */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold tracking-tight text-xl text-text-primary">Active quotes</h2>
          <Link href="/mechanics/quotes" className="text-xs text-orange-DEFAULT hover:underline">
            View all →
          </Link>
        </div>
        <div className="space-y-2">
          {activeQuotes.map((q) => (
            <div
              key={q.id}
              className="bg-panel rounded-xl border border-line px-4 py-3 flex items-center gap-3"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-text-primary">
                    {q.vehicle} · {q.part}
                  </span>
                  {q.hot && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-semibold inline-flex items-center gap-0.5">
                      <Flame size={10} aria-hidden="true" /> HOT
                    </span>
                  )}
                  {q.lost && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-elevated text-text-secondary font-semibold">
                      likely lost
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-secondary">
                  Base ${q.base.toLocaleString()} · Your quote ${q.retail.toLocaleString()} ·{" "}
                  {q.customer} · {q.status}{" "}
                  {q.views > 0 && `(${q.views}×)`} · {q.time}
                </p>
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                {q.hot && (
                  <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-orange-DEFAULT text-white text-xs font-semibold hover:bg-orange-hover transition-colors">
                    <Phone size={11} aria-hidden="true" />
                    Call
                  </button>
                )}
                {q.lost && (
                  <button className="px-2.5 py-1.5 rounded-lg border border-orange-DEFAULT/40 text-orange-DEFAULT text-xs font-medium hover:bg-orange-DEFAULT/10 transition-colors">
                    Re-engage
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Intelligence cards */}
      <div>
        <h2 className="font-semibold tracking-tight text-xl text-text-primary mb-4 flex items-center gap-2">
          <Bot size={20} className="text-orange-DEFAULT" aria-hidden="true" /> AI Intelligence
        </h2>
        <div className="space-y-2">
          {aiCards.map((c, i) => (
            <div
              key={i}
              className="bg-panel rounded-xl border border-line px-4 py-3 flex items-center gap-3"
            >
              <c.icon size={20} className={`flex-shrink-0 ${c.iconColor}`} aria-hidden="true" />
              <p className="flex-1 text-sm text-text-secondary">{c.text}</p>
              <button className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-orange-DEFAULT/10 border border-orange-DEFAULT/30 text-orange-DEFAULT text-xs font-medium hover:bg-orange-DEFAULT/20 transition-colors">
                {c.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
