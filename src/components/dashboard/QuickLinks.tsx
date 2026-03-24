"use client";
import { PlusCircle, Send, Download, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Add Money", icon: PlusCircle, color: "text-blue-500 bg-blue-50 hover:bg-blue-100" },
  { label: "Send Money", icon: Send, color: "text-purple-500 bg-purple-50 hover:bg-purple-100" },
  { label: "Withdraw", icon: Download, color: "text-emerald-500 bg-emerald-50 hover:bg-emerald-100" },
  { label: "Invest Now", icon: TrendingUp, color: "text-rose-500 bg-rose-50 hover:bg-rose-100" },
];

export default function QuickLinks() {
  return (
    <div className="h-full">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Quick link</h2>
      <div className="grid grid-cols-2 gap-3 h-[calc(100%-2rem)]">
        {links.map(({ label, icon: Icon, color }) => (
          <button
            key={label}
            className={cn(
              "flex flex-col items-center justify-center gap-2.5 rounded-2xl py-4 transition-all duration-200 hover:scale-105 active:scale-95 border border-transparent hover:border-slate-100 hover:shadow-card",
              color
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-semibold text-slate-700">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
