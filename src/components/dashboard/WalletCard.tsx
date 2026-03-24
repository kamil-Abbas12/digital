"use client";

interface WalletCardProps {
  mainBalance: string;
  profitBalance: string;
}

export default function WalletCard({ mainBalance, profitBalance }: WalletCardProps) {
  return (
    <div className="relative h-full min-h-[200px]">
      {/* Back card (shadow) */}
      <div className="absolute inset-x-4 bottom-0 h-[85%] bg-brand/20 rounded-3xl" />
      
      {/* Main Card */}
      <div className="relative h-full bg-gradient-to-br from-brand-400 via-brand to-brand-700 rounded-3xl p-6 shadow-wallet overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-36 h-36 bg-white/10 rounded-full" />
        <div className="absolute top-8 -right-4 w-20 h-20 bg-white/10 rounded-full" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/5 rounded-full" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <p className="text-brand-100 text-xs font-medium uppercase tracking-widest mb-1">Main Wallet</p>
            <p className="text-white font-display text-4xl font-800 tracking-tight">{mainBalance}</p>
          </div>
          <div className="mt-auto">
            <p className="text-brand-200 text-xs font-medium uppercase tracking-widest mb-1">Profit Wallet</p>
            <p className="text-white font-display text-2xl font-700">{profitBalance}</p>
          </div>
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 50%),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize:"24px 24px"}} />
      </div>
    </div>
  );
}
