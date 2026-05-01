"use client";

import { Anchor } from "lucide-react";
import CategoryPage from "@/components/CategoryPage";

const popularSearches = [
  { label: "Mercruiser 5.7L", query: "Used Mercruiser 5.7L sterndrive engine" },
  { label: "Volvo Penta 4.3L", query: "Used Volvo Penta 4.3L marine engine" },
  { label: "Yamaha outboard 150hp", query: "Yamaha 150hp outboard motor" },
  { label: "OMC Cobra outdrive", query: "OMC Cobra sterndrive outdrive" },
  { label: "Mercury 90hp", query: "Mercury 90hp outboard engine" },
  { label: "Mercruiser Alpha One", query: "Mercruiser Alpha One lower unit" },
];

const popularParts = [
  "Sterndrive Engine",
  "Outboard Motor",
  "Lower Unit",
  "Outdrive",
  "Water Pump",
  "Gimbal Bearing",
  "Trim Motor",
  "Prop Shaft",
  "Exhaust Manifold",
];

export default function MarinePage() {
  return (
    <CategoryPage
      icon={Anchor}
      title="Marine"
      subtitle="Mercruiser, Volvo Penta, Yamaha, Mercury & OMC"
      description="Marine engines and drive components sourced from specialized marine yards. Sterndrive, outboard, and inboard — with dock-to-dock delivery available."
      popularSearches={popularSearches}
      popularParts={popularParts}
    />
  );
}
