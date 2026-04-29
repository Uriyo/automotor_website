"use client";

import { useState } from "react";
import { Phone, Play, Download } from "lucide-react";

const calls = [
  { id: "C-4421", user: "Mike R.", duration: "4:32", outcome: "Quoted", yard: "Tommy's Auto Salvage", sentiment: 88, ai: true, time: "11:42 AM" },
  { id: "C-4420", user: "Sarah K.", duration: "2:18", outcome: "Callback", yard: "Pick-n-Pull Dallas", sentiment: 62, ai: true, time: "10:55 AM" },
  { id: "C-4419", user: "James T.", duration: "6:01", outcome: "Won", yard: "Desert Parts Phoenix", sentiment: 94, ai: false, time: "10:12 AM" },
  { id: "C-4418", user: "Linda B.", duration: "1:07", outcome: "Voicemail", yard: "Midwest Salvage", sentiment: 50, ai: true, time: "9:44 AM" },
  { id: "C-4417", user: "Carlos M.", duration: "3:55", outcome: "Lost", yard: "Premier Auto Parts", sentiment: 31, ai: false, time: "9:01 AM" },
  { id: "C-4416", user: "Dana W.", duration: "8:22", outcome: "Won", yard: "Tommy's Auto Salvage", sentiment: 97, ai: true, time: "Yesterday" },
];

const outcomeColors: Record<string, string> = {
  Quoted: "bg-orange-DEFAULT/20 text-orange-DEFAULT",
  Callback: "bg-yellow-500/20 text-yellow-400",
  Won: "bg-green-500/20 text-green-400",
  Voicemail: "bg-elevated text-text-secondary",
  Lost: "bg-red-500/20 text-red-400",
};

export default function AdminCallsPage() {
  const [outcome, setOutcome] = useState("All");

  const filtered = outcome === "All" ? calls : calls.filter((c) => c.outcome === outcome);

  return (
    <div className="px-4 lg:px-8 py-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-semibold tracking-tight text-2xl text-text-primary">Calls</h1>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-medium">2 live now</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Calls today", value: "89" },
          { label: "Avg. duration", value: "3:47" },
          { label: "AI-handled", value: "68%" },
          { label: "Avg. sentiment", value: "76" },
        ].map((s) => (
          <div key={s.label} className="bg-panel rounded-xl border border-line p-4">
            <p className="text-xs text-text-secondary mb-1">{s.label}</p>
            <p className="font-semibold tracking-tight text-2xl text-text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {["All", "Won", "Quoted", "Callback", "Voicemail", "Lost"].map((f) => (
          <button
            key={f}
            onClick={() => setOutcome(f)}
            className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${outcome === f ? "bg-orange-DEFAULT/20 border-orange-DEFAULT text-orange-DEFAULT" : "border-line text-text-secondary hover:border-text-tertiary"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-panel rounded-xl border border-line overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line">
              {["ID", "User", "Duration", "Outcome", "Yard", "Sentiment", "AI", "Time", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs text-text-secondary font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-line last:border-0 hover:bg-elevated transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">{c.id}</td>
                <td className="px-4 py-3 font-medium text-text-primary">{c.user}</td>
                <td className="px-4 py-3 font-mono text-text-secondary">{c.duration}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${outcomeColors[c.outcome]}`}>{c.outcome}</span>
                </td>
                <td className="px-4 py-3 text-text-secondary text-xs truncate max-w-[140px]">{c.yard}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full rounded-full ${c.sentiment >= 80 ? "bg-green-400" : c.sentiment >= 60 ? "bg-yellow-400" : "bg-red-400"}`} style={{ width: `${c.sentiment}%` }} />
                    </div>
                    <span className="text-xs text-text-secondary">{c.sentiment}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {c.ai ? <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">AI</span> : <span className="text-xs text-text-secondary">Human</span>}
                </td>
                <td className="px-4 py-3 text-text-secondary text-xs">{c.time}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button aria-label="Play recording" className="w-6 h-6 flex items-center justify-center rounded-lg border border-line text-text-secondary hover:text-orange-DEFAULT transition-colors">
                      <Play size={10} aria-hidden="true" />
                    </button>
                    <button aria-label="Download recording" className="w-6 h-6 flex items-center justify-center rounded-lg border border-line text-text-secondary hover:text-text-primary transition-colors">
                      <Download size={10} aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <div className="mt-6 bg-panel rounded-xl border border-line p-5">
        <h3 className="font-semibold text-text-primary mb-3">AI call summary — today</h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>• Most common request: <span className="text-text-primary">6.0L LS engine for 2014–2019 Silverado</span></p>
          <p>• Top objection: <span className="text-text-primary">Shipping time (&gt;5 days concern on 14 calls)</span></p>
          <p>• AI escalated to human: <span className="text-text-primary">6 calls (dispute risk x3, high-value x3)</span></p>
          <p>• Avg. hold before pickup: <span className="text-text-primary">8 seconds</span></p>
        </div>
      </div>
    </div>
  );
}
