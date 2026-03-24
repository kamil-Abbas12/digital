"use client";
import { Globe, Bell, ChevronDown } from "lucide-react";

export default function Header({ title }: { title: string }) {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10">
      <h1 className="font-display text-xl font-700 text-slate-900 tracking-tight">{title}</h1>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-all border border-slate-200">
          <Globe className="w-4 h-4" />
          <span>English</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 border border-slate-200 transition-all">
          <Bell className="w-4.5 h-4.5 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full border-2 border-white" />
        </button>
        <button className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand/20 to-brand/40 flex items-center justify-center ring-2 ring-brand/20 hover:ring-brand/40 transition-all">
          <span className="text-brand font-semibold text-sm">N</span>
        </button>
      </div>
    </header>
  );
}
