"use client";

import { AlertTriangle, CheckCircle, Info } from "lucide-react";

const anomalies = [
  { level: "critical", msg: "Spike in failed AI calls — 15% above baseline (37 failures in last hour)", time: "12 min ago", resolved: false },
  { level: "warning", msg: "Yard Tommy's Auto Salvage response rate dropped 40% in last 24h", time: "5 min ago", resolved: false },
  { level: "warning", msg: "Dispute queue has 3 items older than 4 hours", time: "18 min ago", resolved: false },
  { level: "info", msg: "New yard onboarding: Premier Salvage, Dallas TX — quality score 94/100", time: "32 min ago", resolved: true },
  { level: "info", msg: "SEO crawl completed: 87,420 pages indexed (+240 new)", time: "1h ago", resolved: true },
  { level: "warning", msg: "Stripe webhook latency elevated: avg 340ms (baseline: 80ms)", time: "2h ago", resolved: true },
];

const levelConfig = {
  critical: { color: "border-red-500/30 bg-red-500/10", textColor: "text-red-300", icon: AlertTriangle, iconColor: "text-red-400", label: "Critical" },
  warning: { color: "border-yellow-500/30 bg-yellow-500/10", textColor: "text-yellow-300", icon: AlertTriangle, iconColor: "text-yellow-400", label: "Warning" },
  info: { color: "border-blue-500/30 bg-blue-500/10", textColor: "text-blue-300", icon: Info, iconColor: "text-blue-400", label: "Info" },
};

export default function AdminAnomaliesPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-3xl">
      <h1 className="font-semibold tracking-tight text-2xl text-text-primary mb-6 flex items-center gap-2"><AlertTriangle size={22} className="text-red-400" aria-hidden="true" /> Anomalies</h1>

      <div className="space-y-3">
        {anomalies.map((a, i) => {
          const cfg = levelConfig[a.level as keyof typeof levelConfig];
          const Icon = cfg.icon;
          return (
            <div key={i} className={`flex items-start gap-3 px-4 py-3.5 rounded-xl border ${cfg.color} ${a.resolved ? "opacity-50" : ""}`}>
              <Icon size={15} className={`flex-shrink-0 mt-0.5 ${cfg.iconColor}`} aria-hidden="true" />
              <div className="flex-1">
                <p className={`text-sm ${cfg.textColor}`}>{a.msg}</p>
                <p className="text-xs text-text-secondary mt-0.5">{a.time}</p>
              </div>
              {a.resolved ? (
                <CheckCircle size={14} className="text-green-400 flex-shrink-0" aria-hidden="true" />
              ) : (
                <button className="text-xs text-text-secondary border border-line px-2 py-1 rounded-lg hover:text-text-primary transition-colors flex-shrink-0">
                  Resolve
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
