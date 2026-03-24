"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
  delay?: string;
}

export default function StatCard({ label, value, icon: Icon, gradient, iconBg, delay = "" }: StatCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl p-5 shadow-card border border-white/60 animate-fade-up",
      gradient,
      delay
    )}>
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-sm", iconBg)}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
      <p className="font-display text-2xl font-700 text-slate-800 tracking-tight">{value}</p>

      {/* Decorative blob */}
      <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/30" />
    </div>
  );
}
