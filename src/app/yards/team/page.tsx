"use client";

import { useState } from "react";
import { UserPlus, Mail, Trash2, Check } from "lucide-react";

const members = [
  { name: "Tommy H.", email: "tommy@tommysauto.com", role: "Owner", lastActive: "Now", avatar: "TH" },
  { name: "Rita M.", email: "rita@tommysauto.com", role: "Manager", lastActive: "2h ago", avatar: "RM" },
  { name: "Dave S.", email: "dave@tommysauto.com", role: "Staff", lastActive: "Yesterday", avatar: "DS" },
];

const roles = ["Owner", "Manager", "Staff"];

export default function YardTeamPage() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Staff");
  const [sent, setSent] = useState(false);

  function sendInvite() {
    if (!inviteEmail) return;
    setSent(true);
    setTimeout(() => { setSent(false); setInviteEmail(""); }, 2000);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-3xl">
      <h1 className="font-semibold tracking-tight text-xl sm:text-2xl text-text-primary mb-5 sm:mb-6">Team</h1>

      {/* Members list */}
      <div className="bg-panel rounded-xl border border-line overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-line">
          <h3 className="font-semibold text-text-primary">Members ({members.length}/5)</h3>
        </div>
        <div className="divide-y divide-line">
          {members.map((m, i) => (
            <div key={i} className="flex items-center px-5 py-4 gap-3">
              <div className="w-9 h-9 rounded-full bg-orange-DEFAULT/20 flex items-center justify-center text-orange-DEFAULT text-xs font-semibold flex-shrink-0">
                {m.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary">{m.name}</p>
                <p className="text-xs text-text-secondary truncate">{m.email}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                m.role === "Owner" ? "bg-orange-DEFAULT/20 text-orange-DEFAULT" :
                m.role === "Manager" ? "bg-blue-500/20 text-blue-400" :
                "bg-elevated text-text-secondary"
              }`}>
                {m.role}
              </span>
              <span className="text-xs text-text-secondary flex-shrink-0">{m.lastActive}</span>
              {m.role !== "Owner" && (
                <button aria-label={`Remove ${m.name}`} className="text-text-secondary hover:text-red-400 transition-colors flex-shrink-0">
                  <Trash2 size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Invite */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <UserPlus size={16} className="text-orange-DEFAULT" aria-hidden="true" />
          <h3 className="font-semibold text-text-primary">Invite team member</h3>
        </div>
        <div className="flex gap-2">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="colleague@example.com"
            className="flex-1 bg-bg border border-line rounded-xl px-3 py-2.5 text-text-primary text-sm outline-none focus:border-orange-DEFAULT/50 placeholder:text-text-secondary"
          />
          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
            className="bg-bg border border-line rounded-xl px-3 py-2.5 text-text-secondary text-sm outline-none focus:border-orange-DEFAULT/50"
          >
            {roles.filter((r) => r !== "Owner").map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <button
            onClick={sendInvite}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              sent ? "bg-green-500 text-white" : "bg-orange-DEFAULT text-white hover:bg-orange-hover"
            }`}
          >
            <Mail size={14} aria-hidden="true" />
            {sent ? "Sent!" : "Invite"}
          </button>
        </div>
        <p className="text-xs text-text-secondary mt-2">They&apos;ll receive an email to set up their account. Pro plan allows up to 5 members.</p>
      </div>

      {/* Role permissions */}
      <div className="bg-panel rounded-xl border border-line p-5">
        <h3 className="font-semibold text-text-primary mb-4">Role permissions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-line">
                <th className="text-left py-2 pr-4 text-text-secondary font-medium">Permission</th>
                {roles.map((r) => <th key={r} className="py-2 px-3 text-text-secondary font-medium text-center">{r}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                { perm: "View leads & quotes", owner: true, manager: true, staff: true },
                { perm: "Submit quotes", owner: true, manager: true, staff: true },
                { perm: "Manage inventory", owner: true, manager: true, staff: false },
                { perm: "Billing & payouts", owner: true, manager: false, staff: false },
                { perm: "Invite team members", owner: true, manager: true, staff: false },
                { perm: "Settings & plan", owner: true, manager: false, staff: false },
              ].map((row) => (
                <tr key={row.perm} className="border-b border-line last:border-0">
                  <td className="py-2 pr-4 text-text-secondary">{row.perm}</td>
                  {[row.owner, row.manager, row.staff].map((has, i) => (
                    <td key={i} className="py-2 px-3 text-center">{has ? <Check size={14} className="text-green-400 inline-block" aria-hidden="true" /> : <span className="text-white/20">—</span>}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
