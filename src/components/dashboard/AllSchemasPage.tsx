"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutList, Clock, TrendingUp, CheckCircle2, XCircle, PlayCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const YOUTUBE_VIDEO_ID = "7j38y3qkCXw";

const plans = [
  {
    name: "Starter Plan",
    slug: "starter-plan",
    badge: "Economic",
    badgeColor: "bg-violet-100 text-violet-600",
    rateLabel: "Weekly 1.2 %",
    price: "$30",
    priceColor: "text-brand",
    details: {
      Investment: "$30",
      "Capital Back": "Yes",
      "Return Type": "Period",
      "Return Interest Type": "Periodic",
      Periods: "2 Times",
      "Auto Renewal": "Available",
      Compounding: "Available",
      "Profit withdraw": "Anytime",
      Cancel: "In 59 Minutes",
    },
    holiday: "* No Profit Holidays",
  },
  {
    name: "Basic Plan",
    slug: "basic-plan",
    badge: "Popular",
    badgeColor: "bg-emerald-100 text-emerald-600",
    rateLabel: "Daily 2 %",
    price: "$50",
    priceColor: "text-brand",
    details: {
      Investment: "$50",
      "Capital Back": "Yes",
      "Return Type": "Period",
      "Return Interest Type": "Periodic",
      Periods: "5 Times",
      "Auto Renewal": "Available",
      Compounding: "Not Available",
      "Profit withdraw": "Anytime",
      Cancel: "In 59 Minutes",
    },
    holiday: "* No Profit Holidays",
  },
  {
    name: "Standard Plan",
    slug: "standard-plan",
    badge: "Standard",
    badgeColor: "bg-sky-100 text-sky-600",
    rateLabel: "Daily 2.5 %",
    price: "$100",
    priceColor: "text-brand",
    details: {
      Investment: "$100",
      "Capital Back": "Yes",
      "Return Type": "Period",
      "Return Interest Type": "Periodic",
      Periods: "7 Times",
      "Auto Renewal": "Available",
      Compounding: "Not Available",
      "Profit withdraw": "Anytime",
      Cancel: "In 120 Minutes",
    },
    holiday: "* No Profit Holidays",
  },
  {
    name: "Premium",
    slug: "premium",
    badge: "Premium",
    badgeColor: "bg-blue-100 text-blue-600",
    rateLabel: "Hour 3 %",
    price: "$200",
    priceColor: "text-brand",
    details: {
      Investment: "$200",
      "Capital Back": "Yes",
      "Return Type": "Period",
      "Return Interest Type": "Periodic",
      Periods: "10 Times",
      "Auto Renewal": "Available",
      Compounding: "Available",
      "Profit withdraw": "Anytime",
      Cancel: "No",
    },
    holiday: "* Saturday are Holidays",
  },
  {
    name: "Enterprise",
    slug: "enterprise-plan",
    badge: "Professional",
    badgeColor: "bg-orange-100 text-orange-600",
    rateLabel: "Weekly 9 %",
    price: "$500",
    priceColor: "text-brand",
    details: {
      Investment: "$500",
      "Capital Back": "Yes",
      "Return Type": "Period",
      "Return Interest Type": "After Maturity",
      Periods: "5 Times",
      "Auto Renewal": "Available",
      Compounding: "Available",
      "Profit withdraw": "Anytime",
      Cancel: "In 59 Minutes",
    },
    holiday: "* No Profit Holidays",
  },
  {
    name: "VIP Plan",
    slug: "vip-plan",
    badge: "VIP",
    badgeColor: "bg-yellow-100 text-yellow-600",
    rateLabel: "Weekly 12 %",
    price: "$1000",
    priceColor: "text-brand",
    details: {
      Investment: "$1000+",
      "Capital Back": "Yes",
      "Return Type": "Period",
      "Return Interest Type": "After Maturity",
      Periods: "8 Times",
      "Auto Renewal": "Available",
      Compounding: "Available",
      "Profit withdraw": "Anytime",
      Cancel: "In 59 Minutes",
    },
    holiday: "* No Profit Holidays",
  },
];

// ── Video Modal ────────────────────────────────────────────────────────────────
function VideoModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-up"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 16:9 responsive iframe */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
            title="MTFE Copy Trading Platform — How to Register & Start AI Smart Transaction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

// ── Tutorial Banner ────────────────────────────────────────────────────────────
function TutorialBanner({ onPlay }: { onPlay: () => void }) {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 animate-fade-up border border-brand/20 shadow-card">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />

      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-brand/10 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-brand/10 blur-2xl" />

      {/* YouTube thumbnail as subtle background */}
      <div
        className="absolute inset-0 opacity-10 bg-center bg-cover"
        style={{
          backgroundImage: `url(https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg)`,
        }}
      />

      <div className="relative flex flex-col sm:flex-row items-center gap-5 p-6">
        {/* Thumbnail with play button */}
        <button
          onClick={onPlay}
          className="relative shrink-0 group"
          aria-label="Play tutorial video"
        >
          <img
            src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/mqdefault.jpg`}
            alt="Tutorial thumbnail"
            className="w-36 h-20 object-cover rounded-xl border-2 border-white/10 group-hover:border-brand/60 transition-all"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-brand/90 group-hover:bg-brand group-hover:scale-110 transition-all flex items-center justify-center shadow-lg">
              <PlayCircle className="w-5 h-5 text-white fill-white" />
            </div>
          </div>
        </button>

        {/* Text */}
        <div className="flex-1 text-center sm:text-left">
          <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-brand/20 text-brand border border-brand/30 mb-2">
            📹 Getting Started Tutorial
          </span>
          <h3 className="text-white font-bold text-base leading-snug mb-1">
            MTFE Copy Trading Platform
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            How to register through Email and start AI Smart Transactions — watch before investing.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onPlay}
          className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand hover:bg-brand/90 text-white text-sm font-semibold transition-all hover:shadow-btn hover:scale-[1.02] active:scale-[0.98]"
        >
          <PlayCircle className="w-4 h-4" />
          Watch Now
        </button>
      </div>
    </div>
  );
}

// ── Plan Card ──────────────────────────────────────────────────────────────────
function PlanCard({
  plan,
  delay,
  onInvest,
}: {
  plan: typeof plans[0];
  delay: string;
  onInvest: (slug: string) => void;
}) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 shadow-card flex flex-col animate-fade-up overflow-hidden hover:shadow-lg hover:border-brand/20 transition-all duration-300"
      style={{ animationDelay: delay }}
    >
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display text-lg font-700 text-slate-900">{plan.name}</h3>
          <span className={cn("text-xs font-semibold px-3 py-1 rounded-full", plan.badgeColor)}>
            {plan.badge}
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60 mb-4">
          <TrendingUp className="w-3 h-3" />
          {plan.rateLabel}
        </span>

        <p className={cn("font-display text-4xl font-800 tracking-tight", plan.priceColor)}>
          {plan.price}
        </p>
      </div>

      <div className="mx-6 mb-4 rounded-xl border border-slate-100 overflow-hidden">
        {Object.entries(plan.details).map(([key, val], i) => {
          const isNegative = val === "Not Available" || val === "No";
          const isPositive = val === "Available" || val === "Yes" || val === "Anytime";

          return (
            <div
              key={key}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 text-sm",
                i % 2 === 0 ? "bg-white" : "bg-slate-50/60"
              )}
            >
              <span className="text-slate-500">{key}</span>
              <span
                className={cn(
                  "font-semibold text-right",
                  isNegative ? "text-rose-500" : isPositive ? "text-emerald-600" : "text-slate-800"
                )}
              >
                {isNegative ? (
                  <span className="flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" />
                    {val}
                  </span>
                ) : isPositive ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {val}
                  </span>
                ) : (
                  val
                )}
              </span>
            </div>
          );
        })}
      </div>

      <div className="px-6 pb-4 mt-auto">
        <button
          onClick={() => onInvest(plan.slug)}
          className="w-full py-3.5 bg-slate-900 hover:bg-brand text-white text-sm font-semibold rounded-2xl transition-all duration-300 hover:shadow-btn hover:scale-[1.02] active:scale-[0.98]"
        >
          Invest Now
        </button>
        <p className="text-center text-xs text-slate-400 mt-2.5">{plan.holiday}</p>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function AllSchemasPage() {
  const [tab, setTab] = useState<"plan" | "log">("plan");
  const [videoOpen, setVideoOpen] = useState(false);
  const router = useRouter();

  const handleInvest = (slug: string) => {
    router.push(`/dashboard/invest/${slug}`);
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Video Modal */}
      {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}

      {/* Top nav bar */}
      <div className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10">
        <h1 className="font-display text-xl font-700 text-slate-900 tracking-tight">All Schema</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-all border border-slate-200">
            <span>English</span>
          </button>
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 border border-slate-200">
            <span className="text-slate-500 text-lg">🔔</span>
          </button>
          <button className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand/20 to-brand/40 flex items-center justify-center">
            <span className="text-brand font-semibold text-sm">N</span>
          </button>
        </div>
      </div>

      <main className="p-8">
        {/* Tab switcher */}
        <div className="flex items-center gap-2 mb-8 animate-fade-up">
          <button
            onClick={() => setTab("plan")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
              tab === "plan"
                ? "bg-brand text-white shadow-btn"
                : "bg-white border border-slate-200 text-slate-600 hover:border-brand/40 hover:text-brand"
            )}
          >
            <LayoutList className="w-4 h-4" />
            Schema Plan
          </button>
          <button
            onClick={() => setTab("log")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
              tab === "log"
                ? "bg-brand text-white shadow-btn"
                : "bg-white border border-slate-200 text-slate-600 hover:border-brand/40 hover:text-brand"
            )}
          >
            <Clock className="w-4 h-4" />
            Schema Log
          </button>
        </div>

        {tab === "plan" ? (
          <>
            {/* Tutorial Banner — shown above plans */}
            <TutorialBanner onPlay={() => setVideoOpen(true)} />

            {/* Plan cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {plans.map((plan, i) => (
                <PlanCard
                  key={plan.name}
                  plan={plan}
                  delay={`${i * 80}ms`}
                  onInvest={handleInvest}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-12 flex flex-col items-center justify-center text-center animate-fade-up">
            <Clock className="w-12 h-12 text-slate-200 mb-4" />
            <p className="text-slate-400 font-medium">No schema logs yet.</p>
            <p className="text-slate-300 text-sm mt-1">Your investment history will appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
}