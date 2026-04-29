"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench, Menu, X, LayoutDashboard, Inbox, Phone, Building2, CreditCard, Scale, Bot, TrendingUp, DollarSign, AlertTriangle, Settings } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const nav = [
  { href: "/admin", icon: LayoutDashboard, label: "Overview" },
  { href: "/admin/leads", icon: Inbox, label: "Leads" },
  { href: "/admin/calls", icon: Phone, label: "Calls" },
  { href: "/admin/yards", icon: Building2, label: "Yards" },
  { href: "/admin/mechanics", icon: Wrench, label: "Mechanics" },
  { href: "/admin/transactions", icon: CreditCard, label: "Transactions" },
  { href: "/admin/disputes", icon: Scale, label: "Disputes" },
  { href: "/admin/ai", icon: Bot, label: "AI Monitor" },
  { href: "/admin/seo", icon: TrendingUp, label: "SEO" },
  { href: "/admin/finance", icon: DollarSign, label: "Finance" },
  { href: "/admin/anomalies", icon: AlertTriangle, label: "Anomalies" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button aria-label="Open menu" onClick={() => setOpen(true)} className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-panel border border-line">
        <Menu size={20} />
      </button>
      {open && <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setOpen(false)} aria-hidden="true" />}
      <aside aria-label="Admin navigation" className={clsx("fixed lg:relative z-50 lg:z-auto w-[240px] h-full flex-shrink-0 bg-panel border-r border-line flex flex-col transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <button aria-label="Close menu" onClick={() => setOpen(false)} className="lg:hidden absolute top-4 right-4 text-text-secondary hover:text-text-primary"><X size={18} /></button>
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <Wrench size={14} className="text-orange-DEFAULT" />
            <span className="font-semibold text-sm text-text-primary tracking-tight">AutoMotor Admin</span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className={clsx("flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors",
                pathname === item.href ? "bg-orange-DEFAULT/10 text-orange-DEFAULT" : "text-text-secondary hover:text-text-primary hover:bg-elevated"
              )}>
              <item.icon size={15} aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
