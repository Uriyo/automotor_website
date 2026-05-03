"use client";

import { useState } from "react";
import { Download } from "lucide-react";

const transactions = [
  { id: "TXN-9941", type: "Reservation", user: "Mike R.", yard: "Tommy's Auto Salvage", amount: "$99.00", net: "$89.10", status: "Captured", date: "Oct 18, 2024" },
  { id: "TXN-9940", type: "Lead PPL", yard: "Pick-n-Pull Dallas", user: "Platform", amount: "$8.00", net: "$8.00", status: "Settled", date: "Oct 18, 2024" },
  { id: "TXN-9939", type: "Subscription", yard: "Desert Parts Phoenix", user: "Platform", amount: "$599.00", net: "$587.02", status: "Settled", date: "Oct 17, 2024" },
  { id: "TXN-9938", type: "Reservation", user: "Sarah K.", yard: "Pick-n-Pull Dallas", amount: "$99.00", net: "$89.10", status: "Refunded", date: "Oct 17, 2024" },
  { id: "TXN-9937", type: "Payout", yard: "Tommy's Auto Salvage", user: "Platform", amount: "$1,847.00", net: "-$1,847.00", status: "Sent", date: "Oct 15, 2024" },
  { id: "TXN-9936", type: "Lead PPL", yard: "Midwest Salvage", user: "Platform", amount: "$6.00", net: "$6.00", status: "Settled", date: "Oct 15, 2024" },
  { id: "TXN-9935", type: "Reservation", user: "Dana W.", yard: "Tommy's Auto Salvage", amount: "$99.00", net: "$89.10", status: "Captured", date: "Oct 14, 2024" },
];

const typeColors: Record<string, string> = {
  Reservation: "bg-orange-DEFAULT/20 text-orange-DEFAULT",
  "Lead PPL": "bg-blue-500/20 text-blue-400",
  Subscription: "bg-purple-500/20 text-purple-400",
  Payout: "bg-red-500/20 text-red-400",
};

const statusColors: Record<string, string> = {
  Captured: "text-yellow-400",
  Settled: "text-green-400",
  Refunded: "text-red-400",
  Sent: "text-text-secondary",
};

export default function AdminTransactionsPage() {
  const [type, setType] = useState("All");

  const filtered = type === "All" ? transactions : transactions.filter((t) => t.type === type);
  const totalNet = filtered.reduce((sum, t) => sum + parseFloat(t.net.replace(/[$,]/g, "")), 0);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-semibold tracking-tight text-xl sm:text-2xl text-text-primary">Transactions</h1>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line text-text-secondary text-sm hover:text-text-primary transition-colors">
          <Download size={14} aria-hidden="true" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Gross today", value: "$4,821" },
          { label: "Net today", value: "$3,940" },
          { label: "Reservations", value: "38" },
          { label: "Refund rate", value: "2.1%" },
        ].map((s) => (
          <div key={s.label} className="bg-panel rounded-xl border border-line p-4">
            <p className="text-xs text-text-secondary mb-1">{s.label}</p>
            <p className="font-semibold tracking-tight text-2xl text-text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {["All", "Reservation", "Lead PPL", "Subscription", "Payout"].map((f) => (
          <button
            key={f}
            onClick={() => setType(f)}
            className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${type === f ? "bg-orange-DEFAULT/20 border-orange-DEFAULT text-orange-DEFAULT" : "border-line text-text-secondary hover:border-text-tertiary"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-panel rounded-xl border border-line overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-line">
          <span className="text-xs text-text-secondary">{filtered.length} transactions</span>
          <span className="text-xs font-semibold text-text-primary">
            Net: <span className={totalNet >= 0 ? "text-green-400" : "text-red-400"}>${Math.abs(totalNet).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          </span>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line">
              {["ID", "Type", "User / Yard", "Gross", "Net", "Status", "Date", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs text-text-secondary font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-line last:border-0 hover:bg-elevated transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">{t.id}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[t.type] ?? "bg-elevated text-text-secondary"}`}>{t.type}</span>
                </td>
                <td className="px-4 py-3">
                  <p className="text-text-primary font-medium text-xs">{t.user}</p>
                  <p className="text-text-secondary text-xs">{t.yard}</p>
                </td>
                <td className="px-4 py-3 font-semibold text-text-primary">{t.amount}</td>
                <td className="px-4 py-3 font-semibold text-text-primary">{t.net}</td>
                <td className="px-4 py-3 text-xs font-medium">
                  <span className={statusColors[t.status] ?? "text-text-secondary"}>{t.status}</span>
                </td>
                <td className="px-4 py-3 text-text-secondary text-xs">{t.date}</td>
                <td className="px-4 py-3">
                  <button className="px-2 py-1 rounded-lg border border-line text-text-secondary text-xs hover:text-text-primary transition-colors">Detail</button>
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
