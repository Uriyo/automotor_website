"use client";

import { Car } from "lucide-react";
import CategoryPage from "@/components/CategoryPage";

const popularSearches = [
  { label: "Honda Accord engine", query: "Used engine for Honda Accord" },
  { label: "Toyota Camry transmission", query: "Used transmission for Toyota Camry" },
  { label: "BMW 328i motor", query: "Used motor for BMW 328i" },
  { label: "Nissan Altima CVT", query: "CVT transmission for Nissan Altima" },
  { label: "Chevy Malibu 2.5L", query: "2.5L engine for Chevy Malibu" },
  { label: "Ford Fusion hybrid battery", query: "Hybrid battery for Ford Fusion" },
];

const popularParts = [
  "Complete Engine",
  "Transmission",
  "Transfer Case",
  "Alternator",
  "Starter Motor",
  "A/C Compressor",
  "Power Steering Pump",
  "Radiator",
  "Turbocharger",
];

export default function CarsPage() {
  return (
    <CategoryPage
      icon={Car}
      title="Cars"
      subtitle="Sedans, coupes, hatchbacks, SUVs & crossovers"
      description="Find used engines, transmissions, and drivetrain parts for every make and model. Honda, Toyota, Ford, Chevy, BMW, Nissan — we source from 250,000+ partner yards nationwide."
      popularSearches={popularSearches}
      popularParts={popularParts}
    />
  );
}
