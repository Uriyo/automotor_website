"use client";

import { useState } from "react";
import { Phone, MessageSquare, ChevronDown } from "lucide-react";

const leads = [
  { id: "L-8821", user: "Mike R.", part: "3.5L EcoBoost Engine", vehicle: "2018 Ford F-150", yard: "Tommy's Auto Salvage", status: "Quoted", value: "$1,240", intent: 91, created: "2h ago" },
  { id: "L-8820", user: "Sarah K.", part: "6L Duramax Engine", vehicle: "2016 Chevy Silverado", yard: "Pick-n-Pull Dallas", status: "Called", value: "$2,100", intent: 87, created: "3h ago" },
  { id: "L-8819", user: "James T.", part: "4T65E Transmission", vehicle: "2014 Buick LaCrosse", yard: "Desert Parts Phoenix", status: "New", value: "$480", intent: 72, created: "4h ago" },
  { id: "L-8818", user: "Linda B.", part: "5.3L LS Engine", vehicle: "2015 GMC Sierra", yard: "Midwest Salvage", status: "Won", value: "$1,850", intent: 96, created: "5h ago" },
  { id: "L-8817", user: "Carlos M.", part: "6R80 Transmission", vehicle: "2019 Ford F-150", yard: "Premier Auto Parts", status: "Lost", value: "$920", intent: 44, created: "6h ago" },
  { id: "L-8816", user: "Dana W.", part: "Marine Mercruiser 5.7L", vehicle: "2012 Sea Ray 270", yard: "Tommy's Auto Salvage", status: "Quoted", value: "$3,400", intent: 83, created: "8h ago" },
  { id: "L-8815", user: "Kevin P.", part: "6.6L Duramax LML", vehicle: "2013 GMC Sierra 2500", yard: "Pick-n-Pull Dallas", status: "Won", value: "$4,200", intent: 94, created: "10h ago" },
];

const statusColors: Record<string, string> = {
  New: "bg-blue-500/20 text-blue-400",
  Called: "bg-yellow-500/20 text-yellow-400",
  Quoted: "bg-orange-DEFAULT/20 text-orange-DEFAULT",
  Won: "bg-green-500/20 text-green-400",
  Lost: "bg-elevated text-text-secondary",
};

export default function AdminLeadsPage() {
  const [status, setStatus] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = status === "All" ? leads : leads.filter((l) => l.status === status);

  return (
    <div className="px-4 lg:px-8 py-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-semibold tracking-tight text-2xl text-text-primary">Leads</h1>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-green-400 font-semibold">↑ 18%</span> vs last 7 days
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total today", value: "142" },
          { label: "Conversion rate", value: "34%" },
          { label: "Avg. intent score", value: "78" },
          { label: "Revenue routed", value: "$48,200" },
        ].map((s) => (
          <div key={s.label} className="bg-panel rounded-xl border border-line p-4">
            <p className="text-xs text-text-secondary mb-1">{s.label}</p>
            <p className="font-semibold tracking-tight text-2xl text-text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {["All", "New", "Called", "Quoted", "Won", "Lost"].map((f) => (
          <button
            key={f}
            onClick={() => setStatus(f)}
            className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${status === f ? "bg-orange-DEFAULT/20 border-orange-DEFAULT text-orange-DEFAULT" : "border-line text-text-secondary hover:border-text-tertiary"}`}
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
              {["ID", "User", "Part", "Yard", "Status", "Intent", "Value", "Created", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs text-text-secondary font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <>
                <tr
                  key={l.id}
                  className="border-b border-line last:border-0 hover:bg-elevated transition-colors cursor-pointer"
                  onClick={() => setExpanded(expanded === l.id ? null : l.id)}
                >
                  <td className="px-4 py-3 font-mono text-xs text-text-secondary">{l.id}</td>
                  <td className="px-4 py-3 font-medium text-text-primary">{l.user}</td>
                  <td className="px-4 py-3 text-text-secondary max-w-[160px] truncate">{l.part}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{l.yard}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[l.status]}`}>{l.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-mono text-sm ${l.intent >= 85 ? "text-green-400" : l.intent >= 65 ? "text-yellow-400" : "text-red-400"}`}>{l.intent}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-text-primary">{l.value}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{l.created}</td>
                  <td className="px-4 py-3"><ChevronDown size={14} className={`text-text-secondary transition-transform ${expanded === l.id ? "rotate-180" : ""}`} aria-hidden="true" /></td>
                </tr>
                {expanded === l.id && (
                  <tr key={`${l.id}-detail`} className="border-b border-line bg-elevated">
                    <td colSpan={9} className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-text-secondary text-xs">{l.vehicle}</span>
                        <span className="text-white/20">·</span>
                        <button className="flex items-center gap-1 text-xs text-orange-DEFAULT hover:underline"><Phone size={11} aria-hidden="true" /> Call user</button>
                        <button className="flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary"><MessageSquare size={11} aria-hidden="true" /> View chat</button>
                        <button className="text-xs text-red-400 hover:underline ml-auto">Flag lead</button>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
