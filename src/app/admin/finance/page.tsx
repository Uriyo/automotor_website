"use client";

export default function AdminFinancePage() {
  const revenue = [
    { type: "Subscriptions", amount: "$84,200", pct: 28 },
    { type: "Per-lead fees", amount: "$142,400", pct: 47 },
    { type: "Transaction take", amount: "$47,800", pct: 16 },
    { type: "Pay-per-call", amount: "$18,200", pct: 6 },
    { type: "Ads", amount: "$9,100", pct: 3 },
  ];

  return (
    <div className="px-4 lg:px-8 py-6 max-w-4xl">
      <h1 className="font-semibold tracking-tight text-2xl text-text-primary mb-6">Finance</h1>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "MRR", value: "$301,700" },
          { label: "ARR", value: "$3.62M" },
          { label: "Churn", value: "2.1%" },
        ].map((s) => (
          <div key={s.label} className="bg-panel rounded-xl border border-line p-4 text-center">
            <p className="text-xs text-text-secondary mb-1">{s.label}</p>
            <p className="font-semibold tracking-tight text-2xl text-text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <h3 className="font-semibold text-text-primary mb-4">Revenue breakdown</h3>
        <div className="space-y-3">
          {revenue.map((r) => (
            <div key={r.type}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">{r.type}</span>
                <span className="text-text-primary font-medium">{r.amount}</span>
              </div>
              <div className="h-1.5 bg-elevated rounded-full overflow-hidden">
                <div className="h-full bg-orange-DEFAULT rounded-full" style={{ width: `${r.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-panel rounded-xl border border-line px-4 py-3">
        <p className="text-sm text-text-primary font-medium">Payout queue: <span className="text-orange-DEFAULT">$184,320</span> pending for Friday</p>
      </div>
    </div>
  );
}
