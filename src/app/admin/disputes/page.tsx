"use client";

import { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, AlertCircle, Bot } from "lucide-react";

interface Dispute {
  id: string;
  priority: "urgent" | "standard" | "low";
  customer: string;
  yard: string;
  amount: number;
  issue: string;
  aiSuggestion: string;
  created: string;
  slaMinutes: number;
}

const disputes: Dispute[] = [
  { id: "d1", priority: "urgent", customer: "Dave M.", yard: "Tommy's Auto Salvage", amount: 2450, issue: "Engine doesn't match fitment — VIN mismatch", aiSuggestion: "Refund recommended based on fitment mismatch evidence. Yard confirmed wrong engine sent.", created: "3h ago", slaMinutes: 900 },
  { id: "d2", priority: "urgent", customer: "Marcus T.", yard: "LKQ Garland", amount: 3100, issue: "Part arrived with hidden damage", aiSuggestion: "Partial refund likely — damage pre-existing per photo evidence. Suggest 40% refund.", created: "4h ago", slaMinutes: 600 },
  { id: "d3", priority: "standard", customer: "Jennifer R.", yard: "Pick-n-Pull Dallas", amount: 980, issue: "Shipping delay — 3 weeks past ETA", aiSuggestion: "Goodwill credit + full refund if customer requests. Yard confirmed lost shipment.", created: "1d ago", slaMinutes: 14400 },
  { id: "d4", priority: "low", customer: "Carlos R.", yard: "Desert Parts", amount: 450, issue: "Minor warranty question", aiSuggestion: "No refund needed — warranty terms clearly cover this. Send clarification.", created: "2d ago", slaMinutes: 86400 },
];

function SLATimer({ minutes }: { minutes: number }) {
  const [remaining, setRemaining] = useState(minutes * 60);
  useEffect(() => {
    const t = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  const isLow = remaining < 1800;

  return (
    <span className={`font-mono text-xs ${isLow ? "text-red-400" : "text-text-secondary"}`}>
      {h > 0 ? `${h}h ` : ""}{m}m {s}s
    </span>
  );
}

const GROUPS = [
  { label: "Urgent", dotColor: "bg-red-500", subLabel: "15-min SLA", priority: "urgent" as const },
  { label: "Standard", dotColor: "bg-yellow-400", subLabel: "4-hour SLA", priority: "standard" as const },
  { label: "Low priority", dotColor: "bg-white/40", subLabel: "24-hour SLA", priority: "low" as const },
];

export default function AdminDisputesPage() {
  return (
    <div className="px-4 lg:px-8 py-6 max-w-4xl">
      <h1 className="font-semibold tracking-tight text-2xl text-text-primary mb-6">Disputes</h1>
      <div className="space-y-8">
        {GROUPS.map((group) => {
          const items = disputes.filter((d) => d.priority === group.priority);
          return (
            <div key={group.priority}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full inline-block ${group.dotColor}`} />
                <h2 className="font-semibold text-text-primary">{group.label}</h2>
                <span className="text-xs text-text-secondary">({group.subLabel})</span>
                <span className="text-xs bg-elevated px-2 py-0.5 rounded-full text-text-secondary">{items.length}</span>
              </div>
              <div className="space-y-3">
                {items.map((d) => (
                  <div key={d.id} className={`bg-panel rounded-xl border p-4 ${
                    d.priority === "urgent" ? "border-red-500/30" :
                    d.priority === "standard" ? "border-yellow-500/30" :
                    "border-line"
                  }`}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="font-medium text-text-primary text-sm">
                          {d.customer} vs {d.yard}
                        </p>
                        <p className="text-xs text-text-secondary">{d.issue}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold tracking-tight text-text-primary">${d.amount.toLocaleString()}</p>
                        <p className="text-xs text-text-secondary">{d.created}</p>
                      </div>
                    </div>
                    <div className="bg-bg rounded-xl border border-orange-DEFAULT/20 p-3 mb-3">
                      <p className="text-xs font-medium text-orange-DEFAULT mb-0.5 flex items-center gap-1"><Bot size={12} aria-hidden="true" /> AI suggestion</p>
                      <p className="text-xs text-text-secondary">{d.aiSuggestion}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                        <Clock size={11} aria-hidden="true" />
                        SLA: <SLATimer minutes={d.slaMinutes / 60} />
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/30 transition-colors">
                          <CheckCircle size={12} aria-hidden="true" />
                          Approve
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-line text-text-secondary text-xs hover:text-text-primary hover:bg-elevated transition-colors">
                          <AlertCircle size={12} aria-hidden="true" />
                          More info
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30 transition-colors">
                          <XCircle size={12} aria-hidden="true" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
