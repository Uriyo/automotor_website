"use client";

import { Star, ThumbsUp, Flag } from "lucide-react";

const reviews = [
  { id: 1, user: "Mike R.", rating: 5, text: "Super fast response! Got my 5.3L LS engine shipped in 3 days, great condition and matched perfectly. Will definitely use again.", part: "5.3L LS Engine", date: "Oct 17, 2024", replied: false },
  { id: 2, user: "Sarah K.", rating: 4, text: "Good experience overall. Part was as described. Took an extra day to ship but they communicated well.", part: "4T65E Transmission", date: "Oct 14, 2024", replied: true },
  { id: 3, user: "James T.", rating: 5, text: "AutoMotor found me the best price by far. The yard even included warranty paperwork without being asked.", part: "6.6L Duramax LML", date: "Oct 10, 2024", replied: true },
  { id: 4, user: "Linda B.", rating: 3, text: "Part worked fine but the listing said low miles — it was definitely higher. Would have appreciated more accuracy.", part: "3.5L EcoBoost", date: "Oct 5, 2024", replied: false },
  { id: 5, user: "Carlos M.", rating: 5, text: "Incredible service. AI handled everything, got 4 quotes in minutes. Chose this yard and zero regrets.", part: "Marine Mercruiser 5.7L", date: "Sep 28, 2024", replied: true },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} className={i <= n ? "text-yellow-400 fill-yellow-400" : "text-white/20"} aria-hidden="true" />
      ))}
    </div>
  );
}

const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

export default function YardReviewsPage() {
  return (
    <div className="px-4 lg:px-8 py-8 max-w-3xl">
      <h1 className="font-semibold tracking-tight text-2xl text-text-primary mb-6">Reviews</h1>

      {/* Summary */}
      <div className="bg-panel rounded-xl border border-orange-DEFAULT/20 p-5 flex items-center gap-6 mb-6">
        <div className="text-center">
          <p className="font-semibold tracking-tight text-4xl text-text-primary">{avgRating}</p>
          <Stars n={Math.round(parseFloat(avgRating))} />
          <p className="text-xs text-text-secondary mt-1">{reviews.length} reviews</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            const pct = Math.round((count / reviews.length) * 100);
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-text-secondary w-3">{star}</span>
                <Star size={10} className="text-yellow-400 fill-yellow-400" aria-hidden="true" />
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-yellow-400" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-text-secondary w-5 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="bg-panel rounded-xl border border-line p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-text-primary text-sm">{r.user}</span>
                  <Stars n={r.rating} />
                </div>
                <p className="text-xs text-text-secondary">{r.part} · {r.date}</p>
              </div>
              {r.replied && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-medium">Replied</span>
              )}
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">&ldquo;{r.text}&rdquo;</p>
            {!r.replied && (
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-xl bg-orange-DEFAULT/10 border border-orange-DEFAULT/30 text-orange-DEFAULT text-xs font-semibold hover:bg-orange-DEFAULT/20 transition-colors">
                  Reply
                </button>
                <button className="px-3 py-1.5 rounded-xl border border-line text-text-secondary text-xs hover:text-text-primary transition-colors flex items-center gap-1">
                  <ThumbsUp size={11} aria-hidden="true" /> Thank
                </button>
                <button className="ml-auto px-3 py-1.5 rounded-xl border border-line text-text-secondary text-xs hover:text-red-400 transition-colors flex items-center gap-1">
                  <Flag size={11} aria-hidden="true" /> Report
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
