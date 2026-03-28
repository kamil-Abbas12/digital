"use client";

import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard, ListTree, Users, PlusCircle, ArrowLeftRight,
  Send, Download, History, Award, Share2, Gift, Ticket,
  Bell, Settings, Zap,
} from "lucide-react";

const navItems = [
  { label: "dashboard", name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "schemas", name: "All Schemas", icon: ListTree, path: "/schemas" },
  { label: "crowd", name: "All Crowd Schemas", icon: Users, path: "/crowd" },
  { label: "add-money", name: "Add Money", icon: PlusCircle, path: "/add-money" },
  { label: "wallet", name: "Wallet Exchange", icon: ArrowLeftRight, path: "/wallet" },
  { label: "send", name: "Send Money", icon: Send, path: "/send" },
  { label: "withdraw", name: "Withdraw", icon: Download, path: "/withdraw" },
  { label: "transactions", name: "All Transactions", icon: History, path: "/transactions" },
  { label: "ranking", name: "Ranking Badge", icon: Award, path: "/ranking" },
  { label: "referral", name: "Referral", icon: Share2, path: "/referral" },
  { label: "rewards", name: "Rewards", icon: Gift, path: "/rewards" },
  { label: "tickets", name: "Support Tickets", icon: Ticket, path: "/tickets" },
  { label: "notification", name: "Notification", icon: Bell, path: "/notification" },
  { label: "settings", name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-surface-sidebar border-r border-slate-100 flex flex-col">
      
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-slate-100">
        <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shadow-btn">
          <Zap className="w-4 h-4 text-white fill-white" />
        </div>
        <span className="font-display text-xl font-800 text-slate-900 tracking-tight">
          Neovest
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ name, icon: Icon, path }) => {
          const isActive = pathname === path;

          return (
            <button
              key={name}
              onClick={() => router.push(path)}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-brand text-white shadow-btn"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4",
                  isActive ? "text-white" : "text-slate-400"
                )}
              />
              <span>{name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}