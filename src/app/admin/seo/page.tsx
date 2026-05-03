"use client";

import Link from "next/link";
import { TrendingUp, AlertTriangle } from "lucide-react";

const topPages = [
  { url: "/used-engine/2014-chevrolet-silverado-1500", visits: 12840, conversions: 347 },
  { url: "/used-transmission/ford-f150", visits: 9210, conversions: 218 },
  { url: "/used-engines/dallas-tx", visits: 7650, conversions: 184 },
  { url: "/used-engine/2007-dodge-cummins", visits: 6380, conversions: 162 },
  { url: "/used-engine/2018-ford-powerstroke", visits: 5920, conversions: 141 },
];

export default function AdminSEOPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-4xl">
      <h1 className="font-semibold tracking-tight text-xl sm:text-2xl text-text-primary mb-5 sm:mb-6">SEO</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Pages generated", value: "87,420" },
          { label: "Pages indexed", value: "62,180" },
          { label: "Monthly organic", value: "1.3M" },
          { label: "Gen queue", value: "2,140" },
        ].map((s) => (
          <div key={s.label} className="bg-panel rounded-xl border border-line p-4">
            <p className="text-xs text-text-secondary mb-1">{s.label}</p>
            <p className="font-semibold tracking-tight text-2xl text-text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-panel rounded-xl border border-line overflow-hidden mb-4">
        <div className="px-5 py-4 border-b border-line">
          <h3 className="font-semibold text-text-primary">Top converting pages</h3>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line">
              {["Page", "Visits/mo", "Conversions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs text-text-secondary font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topPages.map((p, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                <td className="px-5 py-3 font-mono text-xs text-text-secondary">{p.url}</td>
                <td className="px-5 py-3 text-text-primary font-medium">{p.visits.toLocaleString()}</td>
                <td className="px-5 py-3">
                  <span className="text-green-400 font-medium">{p.conversions}</span>
                  <span className="text-text-secondary ml-1 text-xs">({((p.conversions / p.visits) * 100).toFixed(1)}%)</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <div className="bg-panel rounded-xl border border-yellow-500/20 px-4 py-3">
        <p className="text-sm text-yellow-300 flex items-start gap-2">
          <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span><strong>2,140 pages</strong> have {"<"}3 visits/month — recommended for deindex to improve crawl budget.</span>
        </p>
      </div>
    </div>
  );
}
