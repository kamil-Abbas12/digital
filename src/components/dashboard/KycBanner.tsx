"use client";
import { Clock } from "lucide-react";

export default function KycBanner() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 bg-amber-50 border border-amber-200/60 rounded-2xl animate-fade-up">
      <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
        <Clock className="w-5 h-5 text-amber-500 animate-pulse2" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-amber-800">KYC Pending</p>
        <p className="text-xs text-amber-600 mt-0.5">
          You need to submit your <span className="font-semibold">KYC</span> before proceed to the system.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button className="px-4 py-2 bg-brand text-white text-xs font-semibold rounded-xl shadow-btn hover:bg-brand-600 transition-all hover:scale-105 active:scale-95">
          Submit Now
        </button>
        <button className="px-4 py-2 bg-red-500 text-white text-xs font-semibold rounded-xl hover:bg-red-600 transition-all hover:scale-105 active:scale-95">
          Later
        </button>
      </div>
    </div>
  );
}
