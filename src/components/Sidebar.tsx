"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wrench,
  Plus,
  Car,
  Truck,
  Anchor,
  X,
  Menu,
  Clock,
  Warehouse,
  LogIn,
  LogOut,
  Trash2,
} from "lucide-react";
import clsx from "clsx";
import { useAuth } from "@/components/AuthProvider";
import { getSupabase } from "@/lib/supabase";

type ConversationItem = {
  id: string;
  title: string | null;
  updated_at: string;
};

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "1 week ago";
  return `${weeks} weeks ago`;
}

const categories = [
  { href: "/cars", icon: Car, label: "Cars" },
  { href: "/trucks", icon: Truck, label: "Trucks" },
  { href: "/marine", icon: Anchor, label: "Marine" },
  { href: "/commercial-parts", icon: Wrench, label: "Commercial Parts" },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const [conversations, setConversations] = useState<ConversationItem[]>([]);

  useEffect(() => {
    if (!user) {
      setConversations([]);
      return;
    }

    async function loadConversations() {
      const supabase = getSupabase();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from("conversations")
        .select("id, title, updated_at")
        .eq("user_id", user!.id)
        .order("updated_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error("Failed to load conversations:", error);
        return;
      }
      if (data) setConversations(data);
    }

    loadConversations();

    window.addEventListener("conversation-created", loadConversations);
    return () => window.removeEventListener("conversation-created", loadConversations);
  }, [user]);

  async function deleteConversation(id: string) {
    const supabase = getSupabase();
    const { error } = await supabase
      .from("conversations")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Failed to delete conversation:", error);
      return;
    }

    setConversations((prev) => prev.filter((c) => c.id !== id));
    window.dispatchEvent(new Event("conversation-created"));
  }

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
            {!loading && !user && (
              <p className="text-xs text-text-tertiary px-2 py-3">
                <Link href="/auth/login" className="text-orange-DEFAULT hover:underline">
                  Sign in
                </Link>{" "}
                to save your conversations
              </p>
            )}
            {!loading && user && conversations.length === 0 && (
              <p className="text-xs text-text-tertiary px-2 py-3">
                No conversations yet
              </p>
            )}
            {conversations.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-elevated group transition-colors duration-200"
              >
                <Link
                  href={`/chat/${chat.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 flex-1 min-w-0"
                >
                  <Clock size={13} aria-hidden="true" className="text-text-secondary flex-shrink-0" />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary truncate transition-colors duration-200">
                    {chat.title || "Untitled"}
                  </span>
                  <span className="ml-auto text-[11px] text-text-secondary/60 flex-shrink-0">
                    {relativeTime(chat.updated_at)}
                  </span>
                </Link>
                <button
                  type="button"
                  aria-label="Delete conversation"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(chat.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 flex-shrink-0 w-6 h-6 flex items-center justify-center rounded text-text-tertiary hover:text-red-500 transition-all"
                >
                  <Trash2 size={12} />
                </button>
              </div>
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

        {/* User profile / auth */}
        <div className="px-3 py-4 border-t border-line">
          {!loading && user ? (
            <button
              type="button"
              onClick={signOut}
              className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-elevated transition-colors w-full text-left"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-DEFAULT/40 to-orange-DEFAULT/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <LogOut size={14} className="text-orange-DEFAULT" />
              </div>
              <span className="text-sm text-text-primary font-medium flex-1 truncate">
                {user.email}
              </span>
            </button>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-elevated transition-colors w-full"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-DEFAULT/40 to-orange-DEFAULT/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <LogIn size={14} className="text-orange-DEFAULT" />
              </div>
              <span className="text-sm text-text-primary font-medium flex-1">Sign In</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
