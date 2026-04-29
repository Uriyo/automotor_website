"use client";

import { useEffect } from "react";
import { RotateCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="text-center max-w-md">
        <p className="text-xs uppercase tracking-wider text-text-tertiary mb-3">Something broke</p>
        <h1 className="font-semibold tracking-tight text-3xl lg:text-4xl text-text-primary mb-3">
          Unexpected error.
        </h1>
        <p className="text-text-secondary text-sm mb-2">
          We hit a snag rendering this page. Try again, or head home.
        </p>
        {error.digest && (
          <p className="text-xs font-mono text-text-tertiary mb-8">
            ref: {error.digest}
          </p>
        )}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-orange-DEFAULT text-white text-sm font-medium hover:bg-orange-hover transition-colors"
          >
            <RotateCw size={14} aria-hidden="true" /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-line text-text-primary text-sm font-medium hover:bg-elevated transition-colors"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Home
          </Link>
        </div>
      </div>
    </div>
  );
}
