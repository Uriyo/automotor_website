"use client";

import { Wrench } from "lucide-react";
import CategoryPage from "@/components/CategoryPage";

const popularSearches = [
  { label: "Peterbilt 379 engine", query: "Used engine for Peterbilt 379" },
  { label: "Kenworth T680 transmission", query: "Used transmission for Kenworth T680" },
  { label: "Freightliner Cascadia motor", query: "Used engine for Freightliner Cascadia" },
  { label: "CAT C15 engine", query: "Caterpillar C15 diesel engine" },
  { label: "Detroit DD15", query: "Detroit Diesel DD15 engine" },
  { label: "Eaton Fuller 10-speed", query: "Eaton Fuller 10-speed manual transmission" },
];

const popularParts = [
  "Diesel Engine",
  "Manual Transmission",
  "DPF Filter",
  "Turbocharger",
  "EGR Valve",
  "Fuel Pump",
  "Rear Axle",
  "Air Compressor",
  "Starter Motor",
];

export default function CommercialPartsPage() {
  return (
    <CategoryPage
      icon={Wrench}
      title="Commercial Parts"
      subtitle="Peterbilt, Kenworth, Freightliner, CAT & Detroit"
      description="Fleet-ready commercial truck parts. Class 7 and 8 engines, transmissions, and components from yards that handle big rigs daily."
      popularSearches={popularSearches}
      popularParts={popularParts}
    />
  );
}
