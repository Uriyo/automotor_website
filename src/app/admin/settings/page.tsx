"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [pplRate, setPplRate] = useState("8");
  const [reserveFee, setReserveFee] = useState("99");
  const [aiEnabled, setAiEnabled] = useState(true);
  const [callEnabled, setCallEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-2xl">
      <h1 className="font-semibold tracking-tight text-xl sm:text-2xl text-text-primary mb-5 sm:mb-6">Settings</h1>

      {/* Platform pricing */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <h3 className="font-semibold text-text-primary mb-4">Platform pricing</h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-text-secondary block mb-1.5">Default PPL rate ($/lead)</label>
            <div className="flex items-center gap-2">
              <span className="text-text-secondary">$</span>
              <input
                type="number"
                value={pplRate}
                onChange={(e) => setPplRate(e.target.value)}
                className="w-24 bg-bg border border-line rounded-xl px-3 py-2 text-text-primary text-sm outline-none focus:border-orange-DEFAULT/50"
              />
              <span className="text-text-secondary text-sm">per lead</span>
            </div>
          </div>
          <div>
            <label className="text-xs text-text-secondary block mb-1.5">Reservation fee</label>
            <div className="flex items-center gap-2">
              <span className="text-text-secondary">$</span>
              <input
                type="number"
                value={reserveFee}
                onChange={(e) => setReserveFee(e.target.value)}
                className="w-24 bg-bg border border-line rounded-xl px-3 py-2 text-text-primary text-sm outline-none focus:border-orange-DEFAULT/50"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-text-secondary block mb-1.5">Stripe platform fee</label>
            <div className="flex items-center gap-2">
              <input
                value="10"
                readOnly
                className="w-24 bg-elevated border border-line rounded-xl px-3 py-2 text-text-secondary text-sm outline-none cursor-not-allowed"
              />
              <span className="text-text-secondary text-sm">% of reservation (locked)</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI & calling */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <h3 className="font-semibold text-text-primary mb-4">AI & calling</h3>
        <div className="space-y-4">
          {[
            { label: "AI chat enabled", desc: "AI answers incoming chats and collects part requests", value: aiEnabled, set: setAiEnabled },
            { label: "AI calling enabled", desc: "AI calls yards on behalf of users to get live quotes", value: callEnabled, set: setCallEnabled },
          ].map((item) => (
            <div key={item.label} className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">{item.label}</p>
                <p className="text-xs text-text-secondary mt-0.5">{item.desc}</p>
              </div>
              <button
                onClick={() => item.set(!item.value)}
                role="switch"
                aria-checked={item.value}
                aria-label={`Toggle ${item.label}`}
                className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 mt-0.5 ${item.value ? "bg-orange-DEFAULT" : "bg-elevated"}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${item.value ? "translate-x-5" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <h3 className="font-semibold text-text-primary mb-4">Alert thresholds</h3>
        <div className="space-y-3">
          {[
            { label: "Dispute SLA warning (hours)", default: "20" },
            { label: "Low intent score flag", default: "40" },
            { label: "Yard response timeout (hours)", default: "2" },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between">
              <label className="text-sm text-text-secondary">{f.label}</label>
              <input
                defaultValue={f.default}
                type="number"
                className="w-20 bg-bg border border-line rounded-xl px-3 py-1.5 text-text-primary text-sm outline-none focus:border-orange-DEFAULT/50 text-right"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Admin users */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-6">
        <h3 className="font-semibold text-text-primary mb-4">Admin users</h3>
        <div className="space-y-3">
          {[
            { name: "Alex Chen", email: "alex@automotor.ai", role: "Super Admin" },
            { name: "Jordan Smith", email: "jordan@automotor.ai", role: "Ops" },
          ].map((u, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-line last:border-0">
              <div>
                <p className="text-sm font-medium text-text-primary">{u.name}</p>
                <p className="text-xs text-text-secondary">{u.email}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.role === "Super Admin" ? "bg-orange-DEFAULT/20 text-orange-DEFAULT" : "bg-elevated text-text-secondary"}`}>
                {u.role}
              </span>
            </div>
          ))}
        </div>
        <button className="mt-3 text-sm text-orange-DEFAULT hover:underline">+ Add admin user</button>
      </div>

      <button
        onClick={save}
        className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors ${saved ? "bg-green-500 text-white" : "bg-orange-DEFAULT text-white hover:bg-orange-hover"}`}
      >
        {saved ? "Saved!" : "Save changes"}
      </button>
    </div>
  );
}
