"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wrench,
  Plus,
  Car,
  Truck,
  Anchor,
  Settings,
  User,
  X,
  Menu,
  Clock,
  Warehouse,
} from "lucide-react";
import clsx from "clsx";

const pastConversations = [
  { id: "1", title: "5.3 Silverado engine", time: "2h ago" },
  { id: "2", title: "F-150 transmission", time: "Yesterday" },
  { id: "3", title: "Cummins diesel search", time: "2 days ago" },
  { id: "4", title: "Mercruiser outboard quote", time: "3 days ago" },
  { id: "5", title: "Ram 1500 transfer case", time: "4 days ago" },
  { id: "6", title: "Peterbilt 379 head", time: "1 week ago" },
  { id: "7", title: "6.7 Powerstroke rebuild", time: "1 week ago" },
  { id: "8", title: "Duramax LML engine swap", time: "2 weeks ago" },
];

const categories = [
  { href: "/", icon: Car, label: "Cars" },
  { href: "/", icon: Truck, label: "Trucks" },
  { href: "/", icon: Anchor, label: "Marine" },
  { href: "/", icon: Wrench, label: "Commercial Parts" },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isAdminOrDash =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/yards/") ||
    pathname.startsWith("/mechanics/dashboard") ||
    pathname.startsWith("/mechanics/requests") ||
    pathname.startsWith("/mechanics/quotes") ||
    pathname.startsWith("/mechanics/customers") ||
    pathname.startsWith("/mechanics/earnings") ||
    pathname.startsWith("/mechanics/referrals") ||
    pathname.startsWith("/mechanics/ai-tools") ||
    pathname.startsWith("/mechanics/settings");

  if (isAdminOrDash) return null;

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-xl bg-panel border border-line"
        aria-label="Open menu"
      >
        <Menu size={20} className="text-text-primary" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        aria-label="Primary navigation"
        className={clsx(
          "fixed lg:relative z-50 lg:z-auto",
          "w-[260px] h-full flex-shrink-0",
          "bg-panel border-r border-line",
          "flex flex-col",
          "transition-transform duration-200 ease-out lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button mobile */}
        <button
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary"
        >
          <X size={18} />
        </button>

        {/* Logo */}
        <div className="px-5 pt-5 pb-4">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <Wrench size={14} className="text-orange-DEFAULT" />
            <span className="font-semibold text-text-primary text-sm tracking-tight">
              AutoMotor.AI
            </span>
          </Link>
        </div>

        {/* New chat button */}
        <div className="px-3 pb-3">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg border border-line text-text-primary text-sm font-medium hover:border-text-tertiary hover:bg-elevated transition-colors"
          >
            <Plus size={14} />
            New chat
          </Link>
        </div>

        {/* Past conversations */}
        <div className="flex-1 overflow-y-auto px-3 no-scrollbar">
          <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wider px-2 mb-2">
            Recent
          </p>
          <div className="space-y-0.5">
            {pastConversations.map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-elevated group transition-colors duration-200"
              >
                <Clock size={13} aria-hidden="true" className="text-text-secondary flex-shrink-0" />
                <span className="text-sm text-text-secondary group-hover:text-text-primary truncate transition-colors duration-200">
                  {chat.title}
                </span>
                <span className="ml-auto text-[11px] text-text-secondary/60 flex-shrink-0">
                  {chat.time}
                </span>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-line" />

          {/* Categories */}
          <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wider px-2 mb-2">
            Browse
          </p>
          <div className="space-y-0.5">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-elevated group transition-colors duration-200"
              >
                <cat.icon size={14} aria-hidden="true" className="text-text-secondary group-hover:text-text-primary transition-colors flex-shrink-0" />
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-line" />

          {/* Nav links */}
          <div className="space-y-0.5">
            {[
              { href: "/garage", icon: Car, label: "My Garage" },
              { href: "/mechanics", icon: Wrench, label: "For Mechanics" },
              { href: "/junkyards", icon: Warehouse, label: "For Junkyards" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className={clsx(
                  "flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-elevated group transition-colors duration-200",
                  pathname === link.href && "bg-elevated"
                )}
              >
                <link.icon size={14} aria-hidden="true" className="text-text-secondary group-hover:text-text-primary transition-colors flex-shrink-0" />
                <span
                  className={clsx(
                    "text-sm transition-colors duration-200",
                    pathname === link.href
                      ? "text-text-primary"
                      : "text-text-secondary group-hover:text-text-primary"
                  )}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* User profile */}
        <div className="px-3 py-4 border-t border-line">
          <button
            type="button"
            aria-label="Open account settings"
            className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-elevated transition-colors w-full text-left"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-DEFAULT/40 to-orange-DEFAULT/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <User size={14} className="text-orange-DEFAULT" />
            </div>
            <span className="text-sm text-text-primary font-medium flex-1">Guest</span>
            <Settings size={15} aria-hidden="true" className="text-text-secondary" />
          </button>
        </div>
      </aside>
    </>
  );
}
