"use client";

import Link from "next/link";
import { Star, Phone, MessageSquare, CheckCircle, Eye, Trophy, AlertTriangle, Check } from "lucide-react";
import clsx from "clsx";

interface QuoteCardProps {
  isBestMatch?: boolean;
  yardName: string;
  rating: number;
  reviewCount: number;
  city: string;
  distance: string;
  partDesc: string;
  price: number;
  marketAvg: number;
  warranty: string;
  shipsDay: string;
  quoteId?: string;
  compact?: boolean;
}

export default function QuoteCard({
  isBestMatch = false,
  yardName,
  rating,
  reviewCount,
  city,
  distance,
  partDesc,
  price,
  marketAvg,
  warranty,
  shipsDay,
  quoteId = "q1",
  compact = false,
}: QuoteCardProps) {
  const saving = marketAvg - price;
  const isGoodDeal = saving > 0;

  return (
    <div
      className={clsx(
        "bg-bg border rounded-xl mt-2 slide-in-right",
        isBestMatch ? "border-orange-DEFAULT/40" : "border-line"
      )}
    >
      {isBestMatch && (
        <div className="px-4 pt-3 pb-0">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-DEFAULT/20 text-orange-DEFAULT text-[11px] font-semibold uppercase tracking-wide">
            <Trophy size={10} aria-hidden="true" /> Best Match
          </span>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="font-semibold text-text-primary">{yardName}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Star size={12} className="text-orange-DEFAULT fill-orange-DEFAULT" aria-hidden="true" />
              <span className="text-xs text-text-secondary">
                {rating} ({reviewCount})
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-secondary">{city}</p>
            <p className="text-xs text-text-secondary">{distance}</p>
          </div>
        </div>

        <p className="text-sm text-text-secondary mb-2">{partDesc}</p>

        <div className="mb-3">
          <span className="font-semibold tracking-tight text-3xl text-text-primary">
            ${price.toLocaleString()}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs text-text-secondary line-through">
              market avg: ${marketAvg.toLocaleString()}
            </span>
            {isGoodDeal ? (
              <span className="text-xs text-green-400 flex items-center gap-0.5">
                <CheckCircle size={11} aria-hidden="true" />
                good deal
              </span>
            ) : (
              <span className="text-xs text-yellow-400 flex items-center gap-0.5"><AlertTriangle size={11} aria-hidden="true" /> above market</span>
            )}
          </div>
        </div>

        {!compact && (
          <div className="space-y-1.5 mb-4">
            {[
              `${warranty} warranty`,
              `Ships ${shipsDay}`,
              "Tested & verified",
            ].map((item) => (
              <p key={item} className="text-sm text-text-secondary flex items-center gap-1.5">
                <Check size={13} className="text-green-400 flex-shrink-0" aria-hidden="true" />
                {item}
              </p>
            ))}
          </div>
        )}

        {!compact && (
          <>
            <div className="flex gap-2 mb-3">
              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-line text-text-primary text-sm font-medium hover:bg-elevated transition-colors">
                <Phone size={13} aria-hidden="true" />
                Call
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-line text-text-primary text-sm font-medium hover:bg-elevated transition-colors">
                <MessageSquare size={13} aria-hidden="true" />
                Chat
              </button>
            </div>
            <Link
              href={`/quotes/${quoteId}`}
              className="block w-full text-center py-3 rounded-xl bg-orange-DEFAULT text-white text-sm font-semibold hover:bg-orange-hover transition-colors"
            >
              Reserve for $99 →
            </Link>
            <p className="text-xs text-text-secondary text-center mt-2 flex items-center justify-center gap-1">
              <Eye size={11} aria-hidden="true" />
              2 other shoppers viewing this
            </p>
          </>
        )}
      </div>
    </div>
  );
}
