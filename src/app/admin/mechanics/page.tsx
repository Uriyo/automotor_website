"use client";

import { useState } from "react";

const mechanics = [
  { name: "Raul V.", shop: "Raul's Auto Repair", tier: "Platinum", score: 96, gmv: "$32,400", city: "Dallas, TX", responseRate: "97%", installs: 84 },
  { name: "Omar K.", shop: "K&M Garage", tier: "Gold", score: 88, gmv: "$18,200", city: "Phoenix, AZ", responseRate: "91%", installs: 47 },
  { name: "Tina P.", shop: "Precision Auto Works", tier: "Gold", score: 84, gmv: "$14,600", city: "Kansas City, MO", responseRate: "86%", installs: 38 },
  { name: "Dwayne H.", shop: "Highway Auto", tier: "Silver", score: 71, gmv: "$7,800", city: "Houston, TX", responseRate: "78%", installs: 19 },
  { name: "Anita F.", shop: "Falcon Mechanix", tier: "Platinum", score: 93, gmv: "$28,100", city: "Tampa, FL", responseRate: "95%", installs: 72 },
  { name: "Steve L.", shop: "Steve's Imports", tier: "Silver", score: 67, gmv: "$5,200", city: "Denver, CO", responseRate: "69%", installs: 12 },
];

const tierColors: Record<string, string> = {
  Platinum: "bg-purple-500/20 text-purple-400",
  Gold: "bg-yellow-500/20 text-yellow-400",
  Silver: "bg-elevated text-text-secondary",
};

export default function AdminMechanicsPage() {
  const [tier, setTier] = useState("All");

  const filtered = tier === "All" ? mechanics : mechanics.filter((m) => m.tier === tier);

  return (
    <div className="px-4 lg:px-8 py-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-semibold tracking-tight text-2xl text-text-primary">Mechanics</h1>
        <span className="text-text-secondary text-sm">
          <span className="text-text-primary font-semibold">142</span> active mechanics
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total mechanics", value: "142" },
          { label: "Avg. install score", value: "81" },
          { label: "Installs this month", value: "624" },
          { label: "Mechanic GMV", value: "$124K" },
        ].map((s) => (
          <div key={s.label} className="bg-panel rounded-xl border border-line p-4">
            <p className="text-xs text-text-secondary mb-1">{s.label}</p>
            <p className="font-semibold tracking-tight text-2xl text-text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {["All", "Platinum", "Gold", "Silver"].map((f) => (
          <button
            key={f}
            onClick={() => setTier(f)}
            className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${tier === f ? "bg-orange-DEFAULT/20 border-orange-DEFAULT text-orange-DEFAULT" : "border-line text-text-secondary hover:border-text-tertiary"}`}
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
              {["Mechanic", "Shop", "Tier", "Score", "GMV", "City", "Response", "Installs", "Actions"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs text-text-secondary font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={i} className="border-b border-line last:border-0 hover:bg-elevated transition-colors">
                <td className="px-4 py-3 font-medium text-text-primary">{m.name}</td>
                <td className="px-4 py-3 text-text-secondary text-xs">{m.shop}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tierColors[m.tier]}`}>{m.tier}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-sm ${m.score >= 90 ? "text-green-400" : m.score >= 75 ? "text-yellow-400" : "text-red-400"}`}>{m.score}</span>
                </td>
                <td className="px-4 py-3 font-semibold text-text-primary">{m.gmv}</td>
                <td className="px-4 py-3 text-text-secondary text-xs">{m.city}</td>
                <td className="px-4 py-3 text-text-secondary">{m.responseRate}</td>
                <td className="px-4 py-3 text-text-secondary">{m.installs}</td>
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
