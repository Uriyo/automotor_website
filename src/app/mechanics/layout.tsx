"use client";

import { usePathname } from "next/navigation";
import MechanicSidebar from "@/components/dashboard/MechanicSidebar";

const DASHBOARD_PREFIXES = [
  "/mechanics/dashboard",
  "/mechanics/requests",
  "/mechanics/quotes",
  "/mechanics/customers",
  "/mechanics/earnings",
  "/mechanics/referrals",
  "/mechanics/ai-tools",
  "/mechanics/settings",
];

export default function MechanicsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = DASHBOARD_PREFIXES.some((p) => pathname.startsWith(p));

  if (!isDashboard) return <>{children}</>;

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <MechanicSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
