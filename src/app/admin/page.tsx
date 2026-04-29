"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, AlertTriangle, Activity, BarChart3 } from "lucide-react";

const kpis = [
  { label: "Today's GMV", value: "$47,280", trend: "+12%", up: true },
  { label: "Leads today", value: "347", sub: "4.2% conversion", trend: "+8%", up: true },
  { label: "Active yards", value: "312", sub: "+3 this week", trend: "+1%", up: true },
  { label: "Active mechanics", value: "847", sub: "+12 this week", trend: "+1.4%", up: true },
  { label: "Platform uptime", value: "99.98%", sub: "0 incidents", trend: "", up: true },
  { label: "AI call success", value: "91%", sub: "vs 89% last week", trend: "+2%", up: true },
];

const anomalies = [
  { level: "warning", msg: "Yard XYZ response rate dropped 40% in last 24h", time: "5 min ago" },
  { level: "critical", msg: "Spike in failed AI calls — 15% above baseline", time: "12 min ago" },
  { level: "warning", msg: "Dispute queue has 3 items older than 4 hours", time: "18 min ago" },
  { level: "info", msg: "New yard signup: Premier Salvage, Dallas TX (Score: 94)", time: "32 min ago" },
];

const routingData = [
  { label: "Yard only", pct: 42 },
  { label: "Mechanic primary", pct: 28 },
  { label: "Parallel both", pct: 18 },
  { label: "Exclusive yard", pct: 8 },
  { label: "Direct connect", pct: 4 },
];

const COLORS = ["#FF6B1A", "#4ADE80", "#60A5FA", "#FBBF24", "#A78BFA"];

export default function AdminOverviewPage() {
  const [chartPeriod, setChartPeriod] = useState<"GMV" | "leads" | "subs" | "take">("GMV");

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-semibold tracking-tight text-2xl text-text-primary">Operations Overview</h1>
        <div className="flex items-center gap-2 text-xs text-green-400">
          <Activity size={12} aria-hidden="true" />
          All systems operational
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-panel rounded-xl border border-line p-4">
            <p className="text-xs text-text-secondary mb-1">{k.label}</p>
            <p className="font-semibold tracking-tight text-2xl text-text-primary">{k.value}</p>
            <div className="flex items-center gap-2 mt-0.5">
              {k.sub && <p className="text-xs text-text-secondary">{k.sub}</p>}
              {k.trend && (
                <span className={`text-xs font-medium flex items-center gap-0.5 ${k.up ? "text-green-400" : "text-red-400"}`}>
                  {k.up ? <TrendingUp size={10} aria-hidden="true" /> : <TrendingDown size={10} aria-hidden="true" />}
                  {k.trend}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 mb-6">
        {/* Revenue chart placeholder */}
        <div className="bg-panel rounded-xl border border-line p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Revenue (last 90 days)</h3>
            <div className="flex gap-1">
              {(["GMV", "leads", "subs", "take"] as const).map((p) => (
                <button key={p} onClick={() => setChartPeriod(p)} className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${chartPeriod === p ? "bg-orange-DEFAULT/20 text-orange-DEFAULT" : "text-text-secondary hover:text-text-primary"}`}>
                  {p === "GMV" ? "GMV" : p === "leads" ? "Leads" : p === "subs" ? "Subscriptions" : "Take rate"}
                </button>
              ))}
            </div>
          </div>
          <div className="h-48 bg-bg rounded-xl flex items-center justify-center">
            <p className="text-text-secondary text-sm flex items-center gap-2"><BarChart3 size={14} aria-hidden="true" /> Chart: {chartPeriod} revenue trend</p>
          </div>
        </div>

        {/* Routing donut */}
        <div className="bg-panel rounded-xl border border-line p-5">
          <h3 className="font-semibold text-text-primary mb-4">Lead routing</h3>
          <div className="space-y-2">
            {routingData.map((r, i) => (
              <div key={r.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-secondary">{r.label}</span>
                  <span className="text-text-primary font-medium">{r.pct}%</span>
                </div>
                <div className="h-1.5 bg-elevated rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: COLORS[i] }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Anomalies */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-text-primary">Live anomalies</h3>
          <Link href="/admin/anomalies" className="text-xs text-orange-DEFAULT hover:underline">View all →</Link>
        </div>
        <div className="space-y-2">
          {anomalies.map((a, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${
              a.level === "critical" ? "bg-red-500/10 border-red-500/30" :
              a.level === "warning" ? "bg-yellow-500/10 border-yellow-500/30" :
              "bg-blue-500/10 border-blue-500/30"
            }`}>
              <AlertTriangle size={14} className={a.level === "critical" ? "text-red-400" : a.level === "warning" ? "text-yellow-400" : "text-blue-400"} aria-hidden="true" />
              <span className={`flex-1 ${a.level === "critical" ? "text-red-300" : a.level === "warning" ? "text-yellow-300" : "text-blue-300"}`}>{a.msg}</span>
              <span className="text-xs text-text-secondary flex-shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
