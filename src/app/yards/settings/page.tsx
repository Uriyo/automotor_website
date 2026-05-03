"use client";

import { useState } from "react";

export default function YardSettingsPage() {
  const [name, setName] = useState("Tommy's Auto Salvage");
  const [phone, setPhone] = useState("(214) 555-0192");
  const [radius, setRadius] = useState(150);
  const [notifications, setNotifications] = useState({ sms: true, email: true, newLead: true, dailySummary: false });
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-2xl">
      <h1 className="font-semibold tracking-tight text-xl sm:text-2xl text-text-primary mb-5 sm:mb-6">Settings</h1>

      {/* Business info */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <h3 className="font-semibold text-text-primary mb-4">Business info</h3>
        <div className="space-y-4">
          {[
            { label: "Business name", value: name, set: setName, type: "text" },
            { label: "Contact phone", value: phone, set: setPhone, type: "tel" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs text-text-secondary block mb-1.5">{f.label}</label>
              <input
                type={f.type}
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                className="w-full bg-bg border border-line rounded-xl px-3 py-2.5 text-text-primary text-sm outline-none focus:border-orange-DEFAULT/50"
              />
            </div>
          ))}
          <div>
            <label className="text-xs text-text-secondary block mb-1">Address</label>
            <input
              defaultValue="4821 Industrial Blvd, Dallas, TX 75201"
              className="w-full bg-bg border border-line rounded-xl px-3 py-2.5 text-text-primary text-sm outline-none focus:border-orange-DEFAULT/50"
            />
          </div>
          <div>
            <label className="text-xs text-text-secondary block mb-1.5">Specialty categories</label>
            <div className="flex flex-wrap gap-2">
              {["Cars & Trucks", "Marine", "Commercial"].map((cat) => (
                <button key={cat} className="px-3 py-1.5 rounded-full border border-orange-DEFAULT text-orange-DEFAULT text-xs bg-orange-DEFAULT/10">
                  {cat}
                </button>
              ))}
              <button className="px-3 py-1.5 rounded-full border border-line text-text-secondary text-xs hover:border-text-tertiary transition-colors">
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage radius */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <h3 className="font-semibold text-text-primary mb-1">Coverage radius</h3>
        <p className="text-xs text-text-secondary mb-4">Leads within this distance will be routed to you first.</p>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={25}
            max={500}
            step={25}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            aria-label="Coverage radius in miles"
            className="flex-1 accent-orange-DEFAULT"
          />
          <span className="font-semibold text-text-primary w-20 text-right">{radius} miles</span>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-6">
        <h3 className="font-semibold text-text-primary mb-4">Notifications</h3>
        <div className="space-y-4">
          {[
            { key: "sms", label: "SMS alerts", desc: "Receive texts for new leads" },
            { key: "email", label: "Email alerts", desc: "Receive email notifications" },
            { key: "newLead", label: "New lead push", desc: "Instant push when a lead arrives" },
            { key: "dailySummary", label: "Daily summary", desc: "Morning digest of yesterday's activity" },
          ].map((item) => (
            <div key={item.key} className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">{item.label}</p>
                <p className="text-xs text-text-secondary">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                role="switch"
                aria-checked={notifications[item.key as keyof typeof notifications]}
                aria-label={`Toggle ${item.label}`}
                className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 mt-0.5 ${notifications[item.key as keyof typeof notifications] ? "bg-orange-DEFAULT" : "bg-elevated"}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications[item.key as keyof typeof notifications] ? "translate-x-5" : ""}`} />
              </button>
            </div>
          ))}
        </div>
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
