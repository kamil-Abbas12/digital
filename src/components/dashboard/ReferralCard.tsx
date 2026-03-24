"use client";
import { Share2, Copy, CheckCheck } from "lucide-react";
import { useState } from "react";

export default function ReferralCard() {
  const [copied, setCopied] = useState(false);
  const url = "https://neovest-hyiprio.tdevs.co/register?invite=liPe7X20AY";

  const handleCopy = () => {
    navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Referral URL</h2>
      
      <div className="bg-brand/5 border border-brand/15 rounded-2xl p-3 mb-4">
        <p className="text-xs text-brand font-medium break-all leading-relaxed">{url}</p>
      </div>

      <p className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
        <span className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 text-[10px] font-bold shrink-0">0</span>
        people joined using this URL
      </p>

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-700">Share URL:</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-brand/40 hover:bg-brand/5 transition-all text-xs font-medium text-slate-600 hover:text-brand group"
        >
          {copied ? (
            <><CheckCheck className="w-3.5 h-3.5 text-emerald-500" /><span className="text-emerald-600">Copied!</span></>
          ) : (
            <><Share2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" /><span>Copy Link</span></>
          )}
        </button>
      </div>
    </div>
  );
}
