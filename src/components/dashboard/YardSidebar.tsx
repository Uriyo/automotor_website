"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench, LogOut, Menu, X, LayoutDashboard, Inbox, Phone, Package, Star, DollarSign, Users, Settings, BookOpen } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const nav = [
  { href: "/yards/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/yards/leads", icon: Inbox, label: "Leads" },
  { href: "/yards/calls", icon: Phone, label: "Calls" },
  { href: "/yards/inventory", icon: Package, label: "Inventory" },
  { href: "/yards/reviews", icon: Star, label: "Reviews" },
  { href: "/yards/billing", icon: DollarSign, label: "Billing" },
  { href: "/yards/team", icon: Users, label: "Team" },
  { href: "/yards/settings", icon: Settings, label: "Settings" },
  { href: "/yards/help", icon: BookOpen, label: "Help" },
];

export default function YardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-panel border border-line"
      >
        <Menu size={20} />
      </button>
      {open && <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setOpen(false)} aria-hidden="true" />}
      <aside
        aria-label="Yard dashboard navigation"
        className={clsx(
          "fixed lg:relative z-50 lg:z-auto w-[260px] h-full flex-shrink-0 bg-panel border-r border-line flex flex-col transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button aria-label="Close menu" onClick={() => setOpen(false)} className="lg:hidden absolute top-4 right-4 text-text-secondary hover:text-text-primary">
          <X size={18} />
        </button>
        <div className="px-5 pt-6 pb-3">
          <div className="flex items-center gap-2 mb-0.5">
            <Wrench size={16} className="text-orange-DEFAULT" />
            <span className="font-semibold text-sm text-text-primary tracking-tight">AutoMotor for Yards</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-semibold text-text-primary">Tommy&apos;s Auto Salvage</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-DEFAULT/15 text-orange-DEFAULT font-medium">Pro</span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-3 space-y-0.5">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className={clsx(
                "flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-colors",
                pathname === item.href
                  ? "bg-orange-DEFAULT/10 text-orange-DEFAULT"
                  : "text-text-secondary hover:text-text-primary hover:bg-elevated"
              )}
            >
              <item.icon size={15} aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-line">
          <button className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-elevated transition-colors w-full">
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
