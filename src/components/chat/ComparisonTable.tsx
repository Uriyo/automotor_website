"use client";

import { Star } from "lucide-react";

const quotes = [
  {
    yard: "Tommy's Auto",
    price: "$1,800",
    mileage: "87k mi",
    warranty: "90 days",
    ships: "Monday",
    rating: "4.8",
    isBest: true,
  },
  {
    yard: "Pick-n-Pull Dallas",
    price: "$2,100",
    mileage: "102k mi",
    warranty: "60 days",
    ships: "Wednesday",
    rating: "4.5",
    isBest: false,
  },
  {
    yard: "LKQ Garland",
    price: "$1,950",
    mileage: "94k mi",
    warranty: "90 days",
    ships: "Tuesday",
    rating: "4.7",
    isBest: false,
  },
];

const rows = ["Price", "Mileage", "Warranty", "Ships in", "Rating"];
const bestRow: Record<string, string> = {
  Price: "$1,800",
  Mileage: "87k mi",
  Warranty: "90 days",
  Ships: "Monday",
  Rating: "4.8",
};

export default function ComparisonTable() {
  return (
    <div className="bg-bg border border-line rounded-xl mt-2 overflow-hidden">
      <div className="px-4 pt-3 pb-2 border-b border-line">
        <h4 className="font-semibold tracking-tight text-text-primary text-sm">
          Quote Comparison
        </h4>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full min-w-[400px] text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="text-left px-4 py-2 text-xs text-text-secondary font-medium">
                Metric
              </th>
              {quotes.map((q) => (
                <th
                  key={q.yard}
                  className="px-3 py-2 text-xs font-medium text-center"
                >
                  <span
                    className={
                      q.isBest ? "text-orange-DEFAULT" : "text-text-secondary"
                    }
                  >
                    {q.yard}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row} className="border-b border-line">
                <td className="px-4 py-2.5 text-text-secondary text-xs">{row}</td>
                {quotes.map((q) => {
                  const val =
                    row === "Price"
                      ? q.price
                      : row === "Mileage"
                      ? q.mileage
                      : row === "Warranty"
                      ? q.warranty
                      : row === "Ships in"
                      ? q.ships
                      : q.rating;
                  const isBestVal = bestRow[row] === val || (row === "Rating" && q.rating === "4.8");
                  return (
                    <td
                      key={q.yard}
                      className={`px-3 py-2.5 text-center text-xs ${
                        isBestVal
                          ? "text-orange-DEFAULT font-semibold"
                          : "text-text-primary"
                      }`}
                    >
                      {isBestVal && (
                        <Star
                          size={10}
                          className="inline mr-0.5 text-orange-DEFAULT fill-orange-DEFAULT"
                          aria-hidden="true"
                        />
                      )}
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="px-4 py-3" />
              {quotes.map((q) => (
                <td key={q.yard} className="px-3 py-3 text-center">
                  <button
                    className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${
                      q.isBest
                        ? "bg-orange-DEFAULT text-white hover:bg-orange-hover"
                        : "border border-line text-text-primary hover:bg-elevated"
                    }`}
                  >
                    Pick this one
                  </button>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
