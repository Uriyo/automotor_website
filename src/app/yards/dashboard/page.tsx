"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, AlertCircle, BarChart2, Zap } from "lucide-react";

const mockLeads = [
  { score: 91, vehicle: "2015 F-150", part: "5.0L engine", city: "Dallas", budget: "$2,400", time: "2 min ago", id: "l1" },
  { score: 87, vehicle: "2014 Silverado", part: "5.3L engine", city: "Plano", budget: "$2,000", time: "5 min ago", id: "l2" },
  { score: 74, vehicle: "2019 Ram 1500", part: "3.6L engine", city: "Fort Worth", budget: "$1,800", time: "12 min ago", id: "l3" },
  { score: 68, vehicle: "2016 Sierra", part: "Transmission", city: "Irving", budget: "$1,200", time: "18 min ago", id: "l4" },
];

const alerts = [
  { msg: "3 leads awaiting response — respond within 10 min to stay at priority.", type: "warning" },
  { msg: "2 inventory items have stale pricing — update for better match rate.", type: "info" },
  { msg: "Monthly ROI report ready.", type: "success", link: "View" },
];

// Simple sparkline mock
function MiniChart({ label, data, color }: { label: string; data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 40;
  const w = 200;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div>
      <p className="text-xs text-text-secondary mb-1">{label}</p>
      <svg width={w} height={h} className="overflow-visible">
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function YardDashboardPage() {
  const [chartPeriod, setChartPeriod] = useState<"week" | "month" | "quarter">("week");

  const kpis = [
    { label: "New leads today", value: "12", sub: "+3 from yesterday", icon: TrendingUp, color: "text-green-400" },
    { label: "Calls completed", value: "4", sub: "2 pending callback", icon: BarChart2, color: "text-text-secondary" },
    { label: "Revenue won", value: "$2,180", sub: "2 deals closed", icon: TrendingUp, color: "text-green-400" },
    { label: "ROI this month", value: "6.2×", sub: "vs 4.1× last month", icon: TrendingUp, color: "text-green-400" },
  ];

  const weekData = {
    leads: [8, 12, 6, 14, 9, 12, 10],
    quotes: [4, 7, 3, 9, 6, 8, 7],
    won: [1, 3, 1, 4, 2, 3, 2],
  };

  return (
    <div className="px-4 lg:px-8 py-8 max-w-7xl">
      {/* Upgrade banner */}
      <div className="bg-orange-DEFAULT/10 border border-orange-DEFAULT/30 rounded-xl px-4 py-3 mb-6 flex items-center justify-between">
        <p className="text-sm text-text-secondary flex items-center gap-2">
          <Zap size={14} className="text-orange-DEFAULT flex-shrink-0" aria-hidden="true" />
          <span>
            You&apos;re leaving money on the table — upgrade to{" "}
            <span className="text-orange-DEFAULT font-semibold">Exclusive</span>{" "}
            saves you $180/month at your current lead volume.
          </span>
        </p>
        <button className="ml-4 flex-shrink-0 px-3 py-1.5 rounded-full bg-orange-DEFAULT text-white text-xs font-semibold hover:bg-orange-hover transition-colors">
          Upgrade
        </button>
      </div>

      {/* Greeting */}
      <div className="mb-6">
        <h1 className="font-semibold tracking-tight text-2xl text-text-primary">
          Good morning, Tommy&apos;s Auto Salvage.
        </h1>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-panel rounded-xl border border-line p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-text-secondary">{k.label}</p>
              <k.icon size={14} className={k.color} aria-hidden="true" />
            </div>
            <p className="font-semibold tracking-tight text-2xl text-text-primary">{k.value}</p>
            <p className="text-xs text-text-secondary mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Lifetime profit hero */}
      <div className="bg-panel rounded-xl border border-line p-6 mb-6 text-center">
        <p className="text-text-secondary text-sm mb-1">Lifetime profit through AutoMotor</p>
        <p className="font-semibold tracking-tight text-4xl text-text-primary">$87,420</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 mb-6">
        {/* Live leads */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold tracking-tight text-xl text-text-primary">Live leads</h2>
            <Link href="/yards/leads" className="text-xs text-orange-DEFAULT hover:underline">
              View all →
            </Link>
          </div>
          <div className="space-y-2">
            {mockLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-panel rounded-xl border border-line px-4 py-3 flex items-center gap-3"
              >
                <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex-shrink-0 ${lead.score >= 85 ? "bg-green-500/20 text-green-400" : lead.score >= 70 ? "bg-yellow-500/20 text-yellow-400" : "bg-elevated text-text-secondary"}`}>
                  {lead.score}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {lead.vehicle} · {lead.part}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {lead.city} · {lead.budget} budget · {lead.time}
                  </p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <Link
                    href={`/yards/leads/${lead.id}`}
                    className="px-3 py-1.5 rounded-lg bg-orange-DEFAULT text-white text-xs font-semibold hover:bg-orange-hover transition-colors"
                  >
                    Quote
                  </Link>
                  <button className="px-3 py-1.5 rounded-lg border border-line text-text-secondary text-xs hover:text-text-primary hover:bg-elevated transition-colors">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div>
          <div className="bg-panel rounded-xl border border-line p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary text-sm">Performance</h3>
              <div className="flex gap-1">
                {(["week", "month", "quarter"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setChartPeriod(p)}
                    className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${chartPeriod === p ? "bg-orange-DEFAULT/20 text-orange-DEFAULT" : "text-text-secondary hover:text-text-primary"}`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <MiniChart label="Leads received" data={weekData.leads} color="#FF6B1A" />
              <MiniChart label="Quotes sent" data={weekData.quotes} color="#4ADE80" />
              <MiniChart label="Deals won" data={weekData.won} color="#60A5FA" />
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-text-secondary">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-DEFAULT inline-block" />Leads</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" />Quotes</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />Won</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-2">
        {alerts.map((a, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${
              a.type === "warning"
                ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-300"
                : a.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-300"
                : "bg-blue-500/10 border-blue-500/30 text-blue-300"
            }`}
          >
            <AlertCircle size={15} className="flex-shrink-0" aria-hidden="true" />
            <span className="flex-1">{a.msg}</span>
            {a.link && (
              <button className="underline text-xs font-medium">{a.link}</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
