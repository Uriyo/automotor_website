"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Copy,
  Bell,
  History,
  MessageSquare,
  X,
  Loader2,
  ChevronDown,
  BarChart3,
  Check,
  Car,
} from "lucide-react";
import clsx from "clsx";

interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  engine: string;
  vin: string;
  partsTracked: number;
  priceChange: string;
  priceAlerts: boolean;
  rareAlerts: boolean;
}

const mockVehicles: Vehicle[] = [
  {
    id: "v1",
    year: 2014,
    make: "Chevrolet",
    model: "Silverado 1500",
    trim: "LT",
    engine: "5.3L V8",
    vin: "3GCUKRECXEG175021",
    partsTracked: 3,
    priceChange: "dropping 4%",
    priceAlerts: true,
    rareAlerts: true,
  },
  {
    id: "v2",
    year: 2019,
    make: "Ford",
    model: "F-150",
    trim: "XLT",
    engine: "3.5L EcoBoost",
    vin: "1FTEW1E57KFB12345",
    partsTracked: 1,
    priceChange: "stable",
    priceAlerts: true,
    rareAlerts: false,
  },
];

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label?: string }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      aria-label={label ?? "Toggle"}
      className={clsx(
        "relative w-10 h-5 rounded-full transition-colors flex-shrink-0",
        on ? "bg-orange-DEFAULT" : "bg-elevated"
      )}
    >
      <div
        className={clsx(
          "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
          on ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [priceAlerts, setPriceAlerts] = useState(vehicle.priceAlerts);
  const [rareAlerts, setRareAlerts] = useState(vehicle.rareAlerts);
  const [copied, setCopied] = useState(false);

  const copyVin = () => {
    navigator.clipboard.writeText(vehicle.vin);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-panel rounded-xl border border-line p-5">
      <div className="mb-3">
        <h3 className="font-semibold tracking-tight text-text-primary text-lg">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-text-secondary text-sm mt-0.5">
          {vehicle.engine} · {vehicle.trim}
        </p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <code className="font-mono text-xs text-text-secondary bg-bg rounded px-2 py-1 flex-1 truncate">
          {vehicle.vin.slice(0, 10)}…
        </code>
        <button
          onClick={copyVin}
          aria-label="Copy VIN"
          className="w-7 h-7 flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-elevated transition-colors"
        >
          <Copy size={13} aria-hidden="true" />
        </button>
        {copied && (
          <span className="text-xs text-green-400">Copied!</span>
        )}
      </div>

      <div className="border-t border-line pt-3 mb-3">
        <p className="text-sm text-text-secondary flex items-center gap-1.5">
          <BarChart3 size={14} className="flex-shrink-0" aria-hidden="true" />
          <span>
            This month:{" "}
            <span className="text-text-primary font-medium">
              {vehicle.partsTracked} parts tracked.
            </span>{" "}
            Avg price {vehicle.priceChange}.
          </span>
        </p>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Bell size={14} aria-hidden="true" />
            Price alerts · SMS
          </div>
          <Toggle on={priceAlerts} onToggle={() => setPriceAlerts(!priceAlerts)} label="Toggle price alerts" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Bell size={14} aria-hidden="true" />
            Rare part alerts · SMS
          </div>
          <Toggle on={rareAlerts} onToggle={() => setRareAlerts(!rareAlerts)} label="Toggle rare part alerts" />
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-line text-text-primary text-sm font-medium hover:bg-elevated transition-colors">
          <History size={14} aria-hidden="true" />
          View history
        </button>
        <Link
          href={`/chat/new?q=New+search+for+${vehicle.year}+${vehicle.make}+${vehicle.model}`}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-orange-DEFAULT text-white text-sm font-semibold hover:bg-orange-hover transition-colors"
        >
          <MessageSquare size={14} aria-hidden="true" />
          New chat
        </Link>
      </div>
    </div>
  );
}

type ModalTab = "vin" | "plate" | "manual";

function AddVehicleModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<ModalTab>("vin");
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [decoded, setDecoded] = useState<null | { year: string; make: string; model: string; engine: string }>(null);

  const decodeVin = () => {
    if (vin.length !== 17) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDecoded({ year: "2014", make: "Chevrolet", model: "Silverado 1500", engine: "5.3L V8" });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center lg:items-center items-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-vehicle-heading"
        className="relative w-full max-w-[560px] bg-panel border border-line rounded-xl mx-4 lg:mx-0 p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 id="add-vehicle-heading" className="font-semibold tracking-tight text-xl text-text-primary">
            Add a vehicle
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-bg rounded-xl mb-5">
          {(["vin", "plate", "manual"] as ModalTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={clsx(
                "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                tab === t
                  ? "bg-panel text-text-primary shadow"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              {t === "vin" ? "VIN" : t === "plate" ? "License Plate" : "Manual"}
            </button>
          ))}
        </div>

        {tab === "vin" && (
          <div>
            <input
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase().slice(0, 17))}
              placeholder="Enter 17-character VIN"
              className="w-full bg-bg border border-line rounded-xl px-4 py-3.5 text-text-primary placeholder:text-text-secondary font-mono text-sm uppercase tracking-widest outline-none focus:border-orange-DEFAULT/60 transition-colors mb-3"
            />
            <p className="text-xs text-text-secondary mb-3">
              {vin.length}/17 characters
            </p>
            {decoded ? (
              <div className="bg-bg rounded-xl border border-green-500/30 p-4 mb-4">
                <p className="text-xs text-green-400 mb-1 flex items-center gap-1"><Check size={12} aria-hidden="true" /> VIN decoded successfully</p>
                <p className="font-semibold tracking-tight text-text-primary">
                  {decoded.year} {decoded.make} {decoded.model}
                </p>
                <p className="text-sm text-text-secondary">{decoded.engine}</p>
              </div>
            ) : (
              <button
                onClick={decodeVin}
                disabled={vin.length !== 17 || loading}
                className="w-full py-3 rounded-xl bg-orange-DEFAULT/10 border border-orange-DEFAULT/30 text-orange-DEFAULT text-sm font-semibold hover:bg-orange-DEFAULT/20 disabled:opacity-40 transition-colors flex items-center justify-center gap-2 mb-4"
              >
                {loading && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
                {loading ? "Decoding VIN..." : "Decode VIN"}
              </button>
            )}
          </div>
        )}

        {tab === "plate" && (
          <div className="space-y-3 mb-4">
            <div className="flex gap-2">
              <select className="bg-bg border border-line rounded-xl px-3 py-3 text-text-secondary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors w-28">
                <option>TX</option>
                <option>CA</option>
                <option>FL</option>
                <option>NY</option>
              </select>
              <input
                placeholder="License plate"
                className="flex-1 bg-bg border border-line rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary text-sm uppercase outline-none focus:border-orange-DEFAULT/60 transition-colors"
              />
            </div>
            <button className="w-full py-3 rounded-xl bg-orange-DEFAULT/10 border border-orange-DEFAULT/30 text-orange-DEFAULT text-sm font-semibold hover:bg-orange-DEFAULT/20 transition-colors">
              Look up vehicle
            </button>
          </div>
        )}

        {tab === "manual" && (
          <div className="space-y-3 mb-4">
            {["Year", "Make", "Model", "Trim", "Engine"].map((field) => (
              <div key={field} className="relative">
                <select className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-text-secondary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors appearance-none pr-8">
                  <option>Select {field}</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" aria-hidden="true" />
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 pt-4 border-t border-line">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-line text-text-secondary text-sm font-medium hover:text-text-primary hover:bg-elevated transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 py-3 rounded-xl bg-orange-DEFAULT text-white text-sm font-semibold hover:bg-orange-hover transition-colors">
            Save vehicle
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GaragePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="px-4 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-semibold tracking-tight text-3xl lg:text-4xl text-text-primary mb-2 flex items-center gap-3">
            <Car size={32} className="text-orange-DEFAULT" aria-hidden="true" /> My Garage.
          </h1>
          <p className="text-text-secondary">
            Save your vehicles. We&apos;ll hunt for rare parts. Text you when prices drop.
          </p>
        </div>

        {/* Vehicle grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockVehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}

          {/* Add vehicle card */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-panel rounded-xl border-2 border-dashed border-orange-DEFAULT/40 p-5 flex flex-col items-center justify-center gap-3 hover:border-orange-DEFAULT/70 hover:bg-orange-DEFAULT/5 transition-all min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-full bg-orange-DEFAULT/10 flex items-center justify-center">
              <Plus size={24} className="text-orange-DEFAULT" aria-hidden="true" />
            </div>
            <p className="text-text-secondary font-medium">Add a vehicle</p>
          </button>
        </div>
      </div>

      {showModal && <AddVehicleModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
