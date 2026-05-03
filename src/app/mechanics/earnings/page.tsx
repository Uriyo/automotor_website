"use client";

const payouts = [
  { date: "Oct 18, 2024", amount: "$640", job: "5.3 Silverado engine", transfer: "tr_1ABC..." },
  { date: "Oct 11, 2024", amount: "$820", job: "6.7 Cummins engine", transfer: "tr_1DEF..." },
  { date: "Oct 4, 2024", amount: "$410", job: "F-150 transmission", transfer: "tr_1GHI..." },
  { date: "Sep 27, 2024", amount: "$550", job: "Ram 1500 engine", transfer: "tr_1JKL..." },
];

export default function MechanicEarningsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-3xl">
      <h1 className="font-semibold tracking-tight text-xl sm:text-2xl text-text-primary mb-5 sm:mb-6">Earnings</h1>

      {/* Lifetime hero */}
      <div className="bg-panel rounded-xl border border-orange-DEFAULT/20 p-6 text-center mb-4">
        <p className="text-text-secondary text-sm mb-1">Lifetime earnings</p>
        <p className="font-semibold tracking-tight text-4xl text-text-primary">$47,820</p>
      </div>

      {/* This month */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-4">
        <h3 className="font-semibold text-text-primary mb-4">This month breakdown</h3>
        <div className="space-y-2">
          {[
            { label: "Gross earnings", value: "$4,280" },
            { label: "Platform fees (9%)", value: "-$385" },
            { label: "Net payout", value: "$3,895" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between text-sm">
              <span className="text-text-secondary">{row.label}</span>
              <span className={`font-medium ${row.value.startsWith("-") ? "text-red-400" : "text-text-primary"}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tier progress */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-text-primary text-sm">Tier progress</p>
          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-semibold">Gold</span>
        </div>
        <div className="h-2 bg-elevated rounded-full overflow-hidden mb-2">
          <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-DEFAULT rounded-full" style={{ width: "78%" }} />
        </div>
        <p className="text-xs text-text-secondary">7 of 9 deals to Platinum · Unlocks 6% fee + dedicated CSM</p>
      </div>

      {/* Payout history */}
      <div className="bg-panel rounded-xl border border-line overflow-hidden">
        <div className="px-5 py-4 border-b border-line">
          <h3 className="font-semibold text-text-primary">Payout history</h3>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody>
            {payouts.map((p, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                <td className="px-5 py-3 text-text-secondary text-xs">{p.date}</td>
                <td className="px-5 py-3 text-text-secondary">{p.job}</td>
                <td className="px-5 py-3 font-semibold text-green-400">{p.amount}</td>
                <td className="px-5 py-3 font-mono text-xs text-text-secondary">{p.transfer}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
