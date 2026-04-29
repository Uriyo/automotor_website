import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="text-center max-w-md">
        <p className="text-xs uppercase tracking-wider text-text-tertiary mb-3">404 — not found</p>
        <h1 className="font-semibold tracking-tight text-3xl lg:text-4xl text-text-primary mb-3">
          We couldn&apos;t find that page.
        </h1>
        <p className="text-text-secondary text-sm mb-8">
          The page you&apos;re looking for might have moved, been deleted, or never existed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-orange-DEFAULT text-white text-sm font-medium hover:bg-orange-hover transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" /> Back to home
        </Link>
      </div>
    </div>
  );
}
