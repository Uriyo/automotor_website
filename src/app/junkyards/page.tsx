import type { Metadata } from "next";
import JunkyardsClient from "./JunkyardsClient";

export const metadata: Metadata = {
  title: "For junkyards — get qualified leads delivered by SMS",
  description:
    "Join 500+ yards on AutoMotor. AI-qualified leads delivered in real time. First 90 days free, no contracts, payouts via Stripe Connect every Friday.",
  openGraph: {
    title: "AutoMotor for Junkyards",
    description:
      "AI-qualified leads delivered to your phone. Stop playing phone tag — quote and close.",
  },
};

export default function JunkyardsPage() {
  return <JunkyardsClient />;
}
