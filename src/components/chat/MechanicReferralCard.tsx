"use client";

import { Star, Wrench } from "lucide-react";

const mechanics = [
  {
    name: "Mike's Auto Repair",
    rating: 4.9,
    distance: "2.1 mi",
    specialty: "Engine Specialist",
  },
  {
    name: "Precision Motors",
    rating: 4.7,
    distance: "4.3 mi",
    specialty: "Domestic Trucks",
  },
  {
    name: "Dallas Engine Pro",
    rating: 4.8,
    distance: "6.8 mi",
    specialty: "GM / Chevy",
  },
];

export default function MechanicReferralCard() {
  return (
    <div className="bg-bg border border-line rounded-xl mt-2 p-4">
      <div className="flex items-center gap-2 mb-1">
        <Wrench size={16} className="text-orange-DEFAULT" aria-hidden="true" />
        <h4 className="font-semibold tracking-tight text-text-primary text-sm">
          Need it installed?
        </h4>
      </div>
      <p className="text-xs text-text-secondary mb-3">
        Here are 3 certified mechanics near you.
      </p>

      <div className="space-y-2 mb-4">
        {mechanics.map((m) => (
          <div
            key={m.name}
            className="flex items-center justify-between bg-panel rounded-xl px-3 py-2.5 border border-line"
          >
            <div>
              <p className="text-sm font-medium text-text-primary">{m.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={11} className="text-orange-DEFAULT fill-orange-DEFAULT" aria-hidden="true" />
                <span className="text-xs text-text-secondary">{m.rating}</span>
                <span className="text-xs text-text-secondary">· {m.distance}</span>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-DEFAULT/10 text-orange-DEFAULT font-medium">
              {m.specialty}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-text-secondary mb-3 leading-relaxed">
        Your mechanic can order this engine through AutoMotor and handle the whole job —{" "}
        <span className="text-text-primary">one price, one warranty.</span>
      </p>

      <button className="w-full py-2.5 rounded-xl border border-orange-DEFAULT/40 text-orange-DEFAULT text-sm font-semibold hover:bg-orange-DEFAULT/10 transition-colors">
        Get install quotes →
      </button>
    </div>
  );
}
