"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

type Column = "New" | "Quoted" | "Won" | "Lost" | "Refunded";

const COLUMNS: Column[] = ["New", "Quoted", "Won", "Lost", "Refunded"];

interface Lead {
  id: string;
  score: number;
  vehicle: string;
  part: string;
  budget: string;
  customer: string;
  summary: string;
  time: string;
  col: Column;
}

const initialLeads: Lead[] = [
  { id: "l1", score: 91, vehicle: "2015 F-150", part: "5.0L engine", budget: "$2,400", customer: "Dave M.", summary: "Customer's F-150 has a spun rod bearing. Looking for a long-block under $2,400. Zip 75001.", time: "2 min ago", col: "New" },
  { id: "l2", score: 87, vehicle: "2014 Silverado", part: "5.3L engine", budget: "$2,000", customer: "Marcus T.", summary: "AFM lifter failure confirmed. Customer wants tested & verified engine with 90-day warranty.", time: "5 min ago", col: "New" },
  { id: "l3", score: 74, vehicle: "2019 Ram 1500", part: "3.6L engine", budget: "$1,800", customer: "Jennifer R.", summary: "Customer described oil consumption issue. Likely ring wear. Looking for low-mileage option.", time: "12 min ago", col: "New" },
  { id: "l4", score: 68, vehicle: "2016 Sierra", part: "6L90 Transmission", budget: "$1,200", customer: "Brian K.", summary: "Transmission slipping in 4th gear. Customer is a mechanic, will self-install.", time: "18 min ago", col: "Quoted" },
  { id: "l5", score: 95, vehicle: "2018 F-250", part: "6.7 Powerstroke", budget: "$4,500", customer: "Carlos R.", summary: "Catastrophic failure, hole in block. Customer needs quick turnaround, fleet vehicle.", time: "1h ago", col: "Won" },
  { id: "l6", score: 62, vehicle: "2013 Silverado", part: "5.3L engine", budget: "$1,400", customer: "Sarah L.", summary: "Budget is tight. Customer is flexible on mileage but needs warranty.", time: "2h ago", col: "Lost" },
];

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 85 ? "bg-green-500/20 text-green-400" : score >= 70 ? "bg-yellow-500/20 text-yellow-400" : "bg-elevated text-text-secondary";
  return <span className={`inline-block px-2 py-0.5 rounded-lg text-xs font-semibold ${color}`}>{score}</span>;
}

export default function YardLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [dragging, setDragging] = useState<string | null>(null);

  const moveCard = (id: string, toCol: Column) => {
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, col: toCol } : l));
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-semibold tracking-tight text-xl sm:text-2xl text-text-primary">Leads</h1>
      </div>

      {/* Filter bar */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
        {["All scores", "80+", "70–79", "Under 70"].map((f) => (
          <button key={f} className="flex-shrink-0 px-3 py-1.5 rounded-full border border-line text-text-secondary text-xs hover:border-text-tertiary hover:text-text-primary transition-colors">
            {f}
          </button>
        ))}
        {["Engines", "Transmissions", "All parts"].map((f) => (
          <button key={f} className="flex-shrink-0 px-3 py-1.5 rounded-full border border-line text-text-secondary text-xs hover:border-text-tertiary hover:text-text-primary transition-colors">
            {f}
          </button>
        ))}
      </div>

      {/* Kanban */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
        {COLUMNS.map((col) => (
          <div
            key={col}
            className="flex-shrink-0 w-64"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => dragging && moveCard(dragging, col)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-text-primary text-sm">{col}</h3>
              <span className="text-xs text-text-secondary bg-elevated px-2 py-0.5 rounded-full">
                {leads.filter((l) => l.col === col).length}
              </span>
            </div>
            <div className="space-y-2 min-h-[100px]">
              {leads
                .filter((l) => l.col === col)
                .map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => setDragging(lead.id)}
                    onDragEnd={() => setDragging(null)}
                    className="bg-panel rounded-xl border border-line p-3 cursor-grab hover:border-text-tertiary transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <ScoreBadge score={lead.score} />
                      <span className="text-[11px] text-text-secondary">{lead.time}</span>
                    </div>
                    <p className="text-sm font-medium text-text-primary mb-0.5">
                      {lead.vehicle} · {lead.part}
                    </p>
                    <p className="text-xs text-text-secondary mb-1">
                      {lead.customer} · {lead.budget}
                    </p>
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                      {lead.summary}
                    </p>
                    <div className="flex gap-1.5 mt-2">
                      <Link
                        href={`/yards/leads/${lead.id}`}
                        className="flex-1 text-center py-1.5 rounded-lg bg-orange-DEFAULT/20 text-orange-DEFAULT text-xs font-semibold hover:bg-orange-DEFAULT/30 transition-colors"
                      >
                        Quote
                      </Link>
                      <button className="px-2.5 py-1.5 rounded-lg border border-line text-text-secondary text-xs hover:text-red-400 hover:border-red-400/30 transition-colors">
                        Dispute
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
