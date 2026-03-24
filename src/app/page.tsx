"use client";
import {
  History, Wallet, TrendingUp, BarChart2, ArrowLeftRight,
  Download, Users, DollarSign, LineChart, Shield,
} from "lucide-react";
import Header from "@/components/dashboard/Header";
import KycBanner from "@/components/dashboard/KycBanner";
import WalletCard from "@/components/dashboard/WalletCard";
import QuickLinks from "@/components/dashboard/QuickLinks";
import ReferralCard from "@/components/dashboard/ReferralCard";
import StatCard from "@/components/dashboard/StatCard";

const stats = [
  { label: "All Transactions", value: "1", icon: History, gradient: "bg-gradient-to-br from-blue-50 to-blue-100/60", iconBg: "bg-blue-500", delay: "delay-100" },
  { label: "Total Deposit", value: "$0", icon: Wallet, gradient: "bg-gradient-to-br from-pink-50 to-pink-100/60", iconBg: "bg-pink-500", delay: "delay-200" },
  { label: "Total Investment", value: "$0", icon: TrendingUp, gradient: "bg-gradient-to-br from-violet-50 to-violet-100/60", iconBg: "bg-violet-500", delay: "delay-300" },
  { label: "Total Profit", value: "$8", icon: BarChart2, gradient: "bg-gradient-to-br from-emerald-50 to-emerald-100/60", iconBg: "bg-emerald-500", delay: "delay-400" },
  { label: "Total Transfer", value: "$0", icon: ArrowLeftRight, gradient: "bg-gradient-to-br from-amber-50 to-amber-100/60", iconBg: "bg-amber-500", delay: "delay-500" },
  { label: "Total Withdraw", value: "$0", icon: Download, gradient: "bg-gradient-to-br from-cyan-50 to-cyan-100/60", iconBg: "bg-cyan-500", delay: "delay-600" },
  { label: "Total Referrals", value: "0", icon: Users, gradient: "bg-gradient-to-br from-indigo-50 to-indigo-100/60", iconBg: "bg-indigo-500", delay: "delay-100" },
  { label: "Total Bonus", value: "$0", icon: DollarSign, gradient: "bg-gradient-to-br from-rose-50 to-rose-100/60", iconBg: "bg-rose-500", delay: "delay-200" },
  { label: "Total Earning", value: "$0", icon: LineChart, gradient: "bg-gradient-to-br from-teal-50 to-teal-100/60", iconBg: "bg-teal-500", delay: "delay-300" },
  { label: "Total Commissions", value: "$0", icon: Shield, gradient: "bg-gradient-to-br from-orange-50 to-orange-100/60", iconBg: "bg-orange-500", delay: "delay-400" },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 overflow-auto">
      <Header title="Dashboard" />
      <main className="p-8 space-y-6 max-w-[1400px]">
        {/* KYC Banner */}
        <KycBanner />

        {/* Main Widget Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Wallets + Quick Links */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-card border border-slate-100 p-6 animate-fade-up delay-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              <div>
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">My Wallets</h2>
                <WalletCard mainBalance="$0" profitBalance="$8" />
              </div>
              <QuickLinks />
            </div>
          </div>

          {/* Referral */}
          <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6 animate-fade-up delay-200 relative overflow-hidden">
            <ReferralCard />
            {/* Decorative megaphone illustration placeholder */}
            <div className="absolute bottom-3 right-3 w-20 h-20 opacity-10">
              <svg viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="#3659f5" />
                <path d="M20 35l30-15v40L20 45v-10z" fill="white" />
                <rect x="14" y="37" width="8" height="14" rx="4" fill="white" />
              </svg>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
          {stats.slice(0, 5).map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.slice(5).map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </main>
    </div>
  );
}
