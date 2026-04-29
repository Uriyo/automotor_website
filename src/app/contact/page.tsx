import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Questions, partnerships, press, or feedback? Reach the AutoMotor team. We typically reply within one business day.",
  openGraph: {
    title: "Contact AutoMotor.AI",
    description: "Reach the AutoMotor team — we typically reply within one business day.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
