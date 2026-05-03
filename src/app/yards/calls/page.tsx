"use client";

import { Play } from "lucide-react";

const calls = [
  { id: "C-8821", user: "Mike R.", part: "3.5L EcoBoost Engine", duration: "4:32", outcome: "Quoted", sentiment: 88, time: "11:42 AM", ai: true },
  { id: "C-8820", user: "Sarah K.", part: "4T65E Transmission", duration: "2:18", outcome: "Callback", sentiment: 62, time: "10:55 AM", ai: true },
  { id: "C-8819", user: "James T.", part: "5.3L LS Engine", duration: "6:01", outcome: "Won", sentiment: 94, time: "10:12 AM", ai: false },
  { id: "C-8818", user: "Linda B.", part: "6.6L Duramax", duration: "1:07", outcome: "Voicemail", sentiment: 50, time: "9:44 AM", ai: true },
  { id: "C-8817", user: "Carlos M.", part: "6L Duramax Engine", duration: "3:55", outcome: "Won", sentiment: 91, time: "9:01 AM", ai: false },
  { id: "C-8816", user: "Dana W.", part: "Marine Mercruiser 5.7L", duration: "8:22", outcome: "Won", sentiment: 97, time: "Yesterday", ai: true },
];

const outcomeColors: Record<string, string> = {
  Won: "bg-green-500/20 text-green-400",
  Quoted: "bg-orange-DEFAULT/20 text-orange-DEFAULT",
  Callback: "bg-yellow-500/20 text-yellow-400",
  Voicemail: "bg-elevated text-text-secondary",
  Lost: "bg-red-500/20 text-red-400",
};

export default function YardCallsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
      <h1 className="font-semibold tracking-tight text-xl sm:text-2xl text-text-primary mb-5 sm:mb-6">Calls</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Calls today", value: "18" },
          { label: "Avg. duration", value: "4:21" },
          { label: "Win rate", value: "61%" },
          { label: "AI-handled", value: "72%" },
        ].map((s) => (
          <div key={s.label} className="bg-panel rounded-xl border border-line p-4">
            <p className="text-xs text-text-secondary mb-1">{s.label}</p>
            <p className="font-semibold tracking-tight text-xl text-text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-panel rounded-xl border border-line overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line">
              {["ID", "Customer", "Part requested", "Duration", "Outcome", "Sentiment", "Handled by", "Time", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs text-text-secondary font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calls.map((c) => (
              <tr key={c.id} className="border-b border-line last:border-0 hover:bg-elevated transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">{c.id}</td>
                <td className="px-4 py-3 font-medium text-text-primary">{c.user}</td>
                <td className="px-4 py-3 text-text-secondary text-xs truncate max-w-[140px]">{c.part}</td>
                <td className="px-4 py-3 font-mono text-text-secondary">{c.duration}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${outcomeColors[c.outcome]}`}>{c.outcome}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-12 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${c.sentiment >= 80 ? "bg-green-400" : c.sentiment >= 60 ? "bg-yellow-400" : "bg-red-400"}`}
                        style={{ width: `${c.sentiment}%` }}
                      />
                    </div>
                    <span className="text-xs text-text-secondary">{c.sentiment}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {c.ai ? <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">AI</span> : <span className="text-xs text-text-secondary">Human</span>}
                </td>
                <td className="px-4 py-3 text-text-secondary text-xs">{c.time}</td>
                <td className="px-4 py-3">
                  <button aria-label="Play recording" className="w-7 h-7 flex items-center justify-center rounded-lg border border-line text-text-secondary hover:text-orange-DEFAULT transition-colors">
                    <Play size={11} aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <div className="mt-5 bg-panel rounded-xl border border-line p-5">
        <h3 className="font-semibold text-text-primary mb-2">AI call insights — today</h3>
        <ul className="space-y-1.5 text-sm text-text-secondary">
          <li>• Top request: <span className="text-text-primary">5.3L LS engine (4 inquiries)</span></li>
          <li>• Avg. time to quote: <span className="text-text-primary">38 seconds</span></li>
          <li>• Calls escalated to you: <span className="text-text-primary">2 (high-value marine engine)</span></li>
        </ul>
      </div>
    </div>
  );
}
