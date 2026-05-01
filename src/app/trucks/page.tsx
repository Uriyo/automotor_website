"use client";

import { Truck } from "lucide-react";
import CategoryPage from "@/components/CategoryPage";

const popularSearches = [
  { label: "F-150 5.0 Coyote engine", query: "Used 5.0 Coyote engine for F-150" },
  { label: "Silverado 5.3 motor", query: "Used 5.3L engine for Chevy Silverado" },
  { label: "Ram 5.7 Hemi", query: "5.7 Hemi engine for Ram 1500" },
  { label: "Duramax 6.6L", query: "6.6L Duramax diesel engine" },
  { label: "Cummins 6.7L", query: "6.7L Cummins turbo diesel engine" },
  { label: "Powerstroke 6.7L", query: "6.7L Powerstroke diesel for F-250" },
];

const popularParts = [
  "Diesel Engine",
  "Allison Transmission",
  "Transfer Case",
  "Turbocharger",
  "Exhaust Manifold",
  "Fuel Injectors",
  "EGR Cooler",
  "Differential",
  "Driveshaft",
];

export default function TrucksPage() {
  return (
    <CategoryPage
      icon={Truck}
      title="Trucks"
      subtitle="F-150, Silverado, Ram, Duramax, Cummins & Powerstroke"
      description="Heavy-duty truck parts from the yards that specialize in them. Whether you need a Cummins rebuild, an Allison transmission, or a Powerstroke turbo — we find it fast."
      popularSearches={popularSearches}
      popularParts={popularParts}
    />
  );
}
