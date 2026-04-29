"use client";

import Link from "next/link";
import { Download } from "lucide-react";

const invoices = [
  { date: "Oct 2024", desc: "Pro subscription + 8 leads", amount: "$679", status: "Paid" },
  { date: "Sep 2024", desc: "Pro subscription + 12 leads", amount: "$719", status: "Paid" },
  { date: "Aug 2024", desc: "Pro subscription + 6 leads", amount: "$659", status: "Paid" },
];

export default function YardBillingPage() {
  return (
    <div className="p-4 lg:p-8 max-w-3xl">
      <h1 className="font-semibold tracking-tight text-2xl text-text-primary mb-6">Billing</h1>

      {/* Current plan */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-text-secondary text-xs">Current plan</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-semibold tracking-tight text-xl text-text-primary">Pro</span>
              <span className="text-sm text-text-secondary">$599/mo</span>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-orange-DEFAULT/10 border border-orange-DEFAULT/30 text-orange-DEFAULT text-sm font-semibold hover:bg-orange-DEFAULT/20 transition-colors">
            Upgrade to Exclusive
          </button>
        </div>
      </div>

      {/* This month usage */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <h3 className="font-semibold text-text-primary mb-4">This month</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Leads received", value: "47" },
            { label: "PPL spend", value: "$320" },
            { label: "Subscription", value: "$599" },
            { label: "Total spend", value: "$919" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-xs text-text-secondary mb-0.5">{s.label}</p>
              <p className="font-semibold tracking-tight text-xl text-text-primary">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ROI */}
      <div className="bg-panel rounded-xl border border-orange-DEFAULT/20 p-5 mb-4 text-center">
        <p className="text-text-secondary text-sm mb-1">
          Revenue generated / Total spend
        </p>
        <p className="font-semibold tracking-tight text-4xl text-text-primary">6.2×</p>
        <p className="text-text-secondary text-sm mt-1">ROI this month</p>
      </div>

      {/* Payout schedule */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <p className="text-text-secondary text-sm">Next payout</p>
        <p className="font-semibold tracking-tight text-xl text-text-primary mt-1">
          Friday, Oct 25 — <span className="text-green-400">$1,847.00</span>
        </p>
        <p className="text-xs text-text-secondary mt-1">Chase ****4821</p>
      </div>

      {/* Invoices */}
      <div className="bg-panel rounded-xl border border-line overflow-hidden">
        <div className="px-5 py-4 border-b border-line">
          <h3 className="font-semibold text-text-primary">Invoices</h3>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody>
            {invoices.map((inv, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                <td className="px-5 py-3 text-text-secondary">{inv.date}</td>
                <td className="px-5 py-3 text-text-secondary">{inv.desc}</td>
                <td className="px-5 py-3 font-semibold text-text-primary">{inv.amount}</td>
                <td className="px-5 py-3">
                  <span className="text-xs text-green-400">{inv.status}</span>
                </td>
                <td className="px-5 py-3">
                  <button aria-label="Download invoice" className="text-text-secondary hover:text-text-primary transition-colors">
                    <Download size={14} aria-hidden="true" />
                  </button>
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
