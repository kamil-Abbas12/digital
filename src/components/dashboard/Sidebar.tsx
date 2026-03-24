"use client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, ListTree, Users, PlusCircle, ArrowLeftRight,
  Send, Download, History, Award, Share2, Gift, Ticket,
  Bell, Settings, Zap,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "All Schemas", icon: ListTree },
  { label: "All Crowd Schemas", icon: Users },
  { label: "Add Money", icon: PlusCircle },
  { label: "Wallet Exchange", icon: ArrowLeftRight },
  { label: "Send Money", icon: Send },
  { label: "Withdraw", icon: Download },
  { label: "All Transactions", icon: History },
  { label: "Ranking Badge", icon: Award },
  { label: "Referral", icon: Share2 },
  { label: "Rewards", icon: Gift },
  { label: "Support Tickets", icon: Ticket },
  { label: "Notification", icon: Bell },
  { label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="w-64 min-h-screen bg-surface-sidebar border-r border-slate-100 flex flex-col animate-slide-in">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-slate-100">
        <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shadow-btn">
          <Zap className="w-4 h-4 text-white fill-white" />
        </div>
        <span className="font-display text-xl font-800 text-slate-900 tracking-tight">Neovest</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, icon: Icon }, i) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              style={{ animationDelay: `${i * 30}ms` }}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group animate-fade-up",
                isActive
                  ? "bg-brand text-white shadow-btn"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}
            >
              <Icon className={cn(
                "w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                isActive ? "text-white" : "text-slate-400 group-hover:text-brand"
              )} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
