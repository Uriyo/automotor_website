"use client";

import { useState } from "react";
import { Upload, Plus, AlertTriangle } from "lucide-react";

const mockInventory = [
  { id: "i1", part: "5.3L Vortec Engine", hollander: "4400-E5300H", vehicle: "2014 Silverado", mileage: "87k", condition: "Tested", price: 1850, status: "Available", stale: false },
  { id: "i2", part: "6L90 Transmission", hollander: "5800-T6L90", vehicle: "2015 Silverado", mileage: "62k", condition: "Tested", price: 1200, status: "Pending", stale: false },
  { id: "i3", part: "5.0L Coyote Engine", hollander: "4400-E5000C", vehicle: "2013 F-150", mileage: "103k", condition: "As-is", price: 1400, status: "Available", stale: true },
  { id: "i4", part: "6.7L Powerstroke", hollander: "4400-E6700P", vehicle: "2017 F-250", mileage: "78k", condition: "Tested", price: 3800, status: "Available", stale: true },
  { id: "i5", part: "3.5L EcoBoost Engine", hollander: "4400-E3500E", vehicle: "2016 F-150", mileage: "91k", condition: "Tested", price: 2100, status: "Sold", stale: false },
];

export default function YardInventoryPage() {
  const [search, setSearch] = useState("");
  const filtered = mockInventory.filter(
    (item) =>
      item.part.toLowerCase().includes(search.toLowerCase()) ||
      item.vehicle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-semibold tracking-tight text-xl sm:text-2xl text-text-primary">Inventory</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-line text-text-secondary text-sm hover:text-text-primary hover:bg-elevated transition-colors">
            <Upload size={14} aria-hidden="true" />
            Upload CSV
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-DEFAULT text-white text-sm font-semibold hover:bg-orange-hover transition-colors">
            <Plus size={14} aria-hidden="true" />
            Add part
          </button>
        </div>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by part or vehicle..."
        className="w-full max-w-sm bg-panel border border-line rounded-xl px-4 py-2.5 text-text-primary placeholder:text-text-secondary text-sm outline-none focus:border-orange-DEFAULT/60 transition-colors mb-4"
      />

      <div className="bg-panel rounded-xl border border-line overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line">
                {["Part", "Hollander #", "Vehicle", "Mileage", "Condition", "Price", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-text-secondary font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-line hover:bg-elevated transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-text-primary font-medium">{item.part}</span>
                    {item.stale && (
                      <span className="ml-2 inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400">
                        <AlertTriangle size={10} aria-hidden="true" /> Update price
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-secondary">{item.hollander}</td>
                  <td className="px-4 py-3 text-text-secondary">{item.vehicle}</td>
                  <td className="px-4 py-3 text-text-secondary">{item.mileage}</td>
                  <td className="px-4 py-3 text-text-secondary">{item.condition}</td>
                  <td className="px-4 py-3 font-semibold text-text-primary">${item.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      item.status === "Available" ? "bg-green-500/20 text-green-400" :
                      item.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-elevated text-text-secondary"
                    }`}>
                      {item.status}
                    </span>
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
