import type { Metadata } from "next";
import MechanicsClient from "./MechanicsClient";

export const metadata: Metadata = {
  title: "For mechanics — earn $500+ per engine job",
  description:
    "Join 2,400+ mechanics on AutoMotor. We source the engine, you install and keep the markup. White-label quotes under your shop's name. No contracts.",
  openGraph: {
    title: "AutoMotor for Mechanics",
    description:
      "Earn $500+ per engine job. Our AI handles sourcing — you handle the install.",
  },
};

export default function MechanicsPage() {
  return <MechanicsClient />;
}
