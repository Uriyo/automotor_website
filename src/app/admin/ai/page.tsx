"use client";

import { useState } from "react";
import { Check, AlertTriangle } from "lucide-react";

const prompts = [
  {
    name: "Lead diagnosis",
    version: "v2.3",
    conversionA: "4.8%",
    conversionB: "5.2%",
    active: true,
  },
  {
    name: "Quote recommendation",
    version: "v1.8",
    conversionA: "6.1%",
    conversionB: "6.4%",
    active: true,
  },
];

export default function AdminAIPage() {
  const [activeTab, setActiveTab] = useState<"conversations" | "calls" | "prompts">("prompts");
  const [promptText, setPromptText] = useState(
    "You are AutoMotor's AI mechanic. Your role is to diagnose vehicle issues and find used parts from junkyards at the best price. Be direct, technical, and confidence-inspiring. You have access to 500+ junkyard inventory feeds..."
  );

  return (
    <div className="px-4 lg:px-8 py-6 max-w-4xl">
      <h1 className="font-semibold tracking-tight text-2xl text-text-primary mb-6">AI Monitor</h1>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-panel rounded-xl mb-6 max-w-xs">
        {(["conversations", "calls", "prompts"] as const).map((t) => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${activeTab === t ? "bg-bg text-text-primary" : "text-text-secondary hover:text-text-primary"}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "prompts" && (
        <div className="space-y-4">
          {prompts.map((p) => (
            <div key={p.name} className="bg-panel rounded-xl border border-line p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text-primary">{p.name}</span>
                  <span className="text-xs text-text-secondary bg-elevated px-2 py-0.5 rounded">{p.version}</span>
                  {p.active && <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded">Active</span>}
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-text-secondary">A: <span className="text-text-primary">{p.conversionA}</span></span>
                  <span className="text-text-secondary">B: <span className="text-green-400 font-medium">{p.conversionB}</span></span>
                  <span className="text-green-400">↑ B winning</span>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-panel rounded-xl border border-line p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-text-primary">System prompt editor</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-line text-text-secondary text-xs hover:text-text-primary hover:bg-elevated transition-colors">
                  View history
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-orange-DEFAULT/10 border border-orange-DEFAULT/30 text-orange-DEFAULT text-xs font-medium hover:bg-orange-DEFAULT/20 transition-colors">
                  Deploy
                </button>
              </div>
            </div>
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              rows={8}
              className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-text-secondary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors resize-none font-mono"
            />
          </div>
        </div>
      )}

      {activeTab === "conversations" && (
        <div className="bg-panel rounded-xl border border-line p-5">
          <p className="text-text-secondary text-sm">Sampling 100 random conversations/day for quality review.</p>
          <div className="space-y-2 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-bg rounded-xl border border-line px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-primary">Conversation #{10234 + i}</p>
                  <p className="text-xs text-text-secondary flex items-center gap-1">
                    {i * 3 + 2}h ago ·{" "}
                    {i % 2 === 0 ? (
                      <span className="inline-flex items-center gap-1"><Check size={11} className="text-green-400" aria-hidden="true" /> Normal</span>
                    ) : (
                      <span className="inline-flex items-center gap-1"><AlertTriangle size={11} className="text-yellow-400" aria-hidden="true" /> Flagged for review</span>
                    )}
                  </p>
                </div>
                <button className="text-xs text-orange-DEFAULT hover:underline">Replay</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "calls" && (
        <div className="bg-panel rounded-xl border border-line overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line">
                {["Yard", "Outcome", "Score", "Duration"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-text-secondary font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { yard: "Tommy's Auto Salvage", outcome: "Quote received", score: 94, dur: "1:23" },
                { yard: "Pick-n-Pull Dallas", outcome: "Voicemail", score: 0, dur: "0:32" },
                { yard: "LKQ Garland", outcome: "Quote received", score: 88, dur: "2:01" },
                { yard: "Desert Parts", outcome: "Not available", score: 0, dur: "0:45" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 text-text-primary">{row.yard}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${row.score > 0 ? "text-green-400 bg-green-500/10" : "text-text-secondary bg-elevated"}`}>
                      {row.outcome}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{row.score > 0 ? row.score : "—"}</td>
                  <td className="px-4 py-3 font-mono text-text-secondary text-xs">{row.dur}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}
