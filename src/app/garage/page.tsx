import type { Metadata } from "next";
import GarageClient from "./GarageClient";

export const metadata: Metadata = {
  title: "My garage — track your vehicles",
  description:
    "Save your vehicles to AutoMotor. Get part fitment, history, price alerts, and one-click new chat for any car in your garage.",
};

export default function GaragePage() {
  return <GarageClient />;
}
