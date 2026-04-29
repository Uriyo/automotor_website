"use client";

import { useState } from "react";

const yards = [
  { name: "Tommy's Auto Salvage", tier: "Pro", score: 94, gmv: "$87,420", state: "TX", responseRate: "92%", disputes: 1 },
  { name: "Pick-n-Pull Dallas", tier: "Exclusive", score: 88, gmv: "$142,000", state: "TX", responseRate: "88%", disputes: 0 },
  { name: "Desert Parts Phoenix", tier: "Pro", score: 91, gmv: "$62,100", state: "AZ", responseRate: "95%", disputes: 2 },
  { name: "Midwest Salvage", tier: "Basic", score: 71, gmv: "$18,400", state: "MO", responseRate: "72%", disputes: 0 },
  { name: "Premier Auto Parts", tier: "Pro", score: 85, gmv: "$44,800", state: "FL", responseRate: "89%", disputes: 1 },
];

export default function AdminYardsPage() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="px-4 lg:px-8 py-6 max-w-5xl">
      <h1 className="font-semibold tracking-tight text-2xl text-text-primary mb-6">Yards</h1>
      <div className="flex gap-2 mb-4">
        {["All", "Basic", "Pro", "Exclusive"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${filter === f ? "bg-orange-DEFAULT/20 border-orange-DEFAULT text-orange-DEFAULT" : "border-line text-text-secondary hover:border-text-tertiary"}`}>
            {f}
          </button>
        ))}
      </div>
      <div className="bg-panel rounded-xl border border-line overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line">
              {["Yard", "Tier", "Score", "GMV", "State", "Response", "Disputes", "Actions"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs text-text-secondary font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {yards.filter(y => filter === "All" || y.tier === filter).map((y, i) => (
              <tr key={i} className="border-b border-line last:border-0 hover:bg-elevated transition-colors">
                <td className="px-4 py-3 font-medium text-text-primary">{y.name}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${y.tier === "Exclusive" ? "bg-purple-500/20 text-purple-400" : y.tier === "Pro" ? "bg-orange-DEFAULT/20 text-orange-DEFAULT" : "bg-elevated text-text-secondary"}`}>
                    {y.tier}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-sm ${y.score >= 90 ? "text-green-400" : y.score >= 75 ? "text-yellow-400" : "text-red-400"}`}>{y.score}</span>
                </td>
                <td className="px-4 py-3 text-text-primary font-medium">{y.gmv}</td>
                <td className="px-4 py-3 text-text-secondary">{y.state}</td>
                <td className="px-4 py-3 text-text-secondary">{y.responseRate}</td>
                <td className="px-4 py-3">
                  {y.disputes > 0 ? <span className="text-red-400 font-medium">{y.disputes}</span> : <span className="text-text-secondary">0</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="px-2 py-1 rounded-lg border border-line text-text-secondary text-xs hover:text-text-primary transition-colors">View</button>
                    <button className="px-2 py-1 rounded-lg border border-line text-text-secondary text-xs hover:text-orange-DEFAULT transition-colors">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
