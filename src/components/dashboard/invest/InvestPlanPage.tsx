"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Loader2,
  TrendingUp,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  slug: string;
  badge: string;
  price: string;
  minAmount: number;
  rateLabel: string;
  holiday: string;
  details: Record<string, string>;
};

const plans: Plan[] = [
  {
    name: "Starter Plan",
    slug: "starter-plan",
    badge: "Economic",
    rateLabel: "Weekly 1.2 %",
    price: "$30",
    minAmount: 30,
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
    rateLabel: "Daily 2 %",
    price: "$50",
    minAmount: 50,
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
    badge: "Popular",
    rateLabel: "Daily 2.5 %",
    price: "$100",
    minAmount: 100,
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
    rateLabel: "Hour 3 %",
    price: "$200",
    minAmount: 200,
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
    rateLabel: "Weekly 9 %",
    price: "$500",
    minAmount: 500,
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
    rateLabel: "Weekly 12 %",
    price: "$1000",
    minAmount: 1000,
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

// Company USDT wallet addresses
const COMPANY_WALLETS = {
  TRC20: "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE",
  BEP20: "0x4e2a3bd9b8b2e8a5f3c1d7f9e0b6a2c4d8e1f3a5",
};

const SERVICE_FEE_RATE = 0.02; // 2%

type Network = "TRC20" | "BEP20";
type Step = "details" | "payment" | "confirm" | "success";

function fmtUSDT(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handle}
      className="ml-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-brand shrink-0"
      title="Copy"
    >
      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "details", label: "Plan Details" },
    { key: "payment", label: "Payment" },
    { key: "confirm", label: "Confirm" },
    { key: "success", label: "Done" },
  ];
  const idx = steps.findIndex((s) => s.key === step);

  return (
    <div className="flex items-center mb-8">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all",
                i < idx
                  ? "bg-brand border-brand text-white"
                  : i === idx
                  ? "bg-brand border-brand text-white shadow-btn"
                  : "bg-white border-slate-200 text-slate-400"
              )}
            >
              {i < idx ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={cn(
                "text-xs mt-1 font-medium whitespace-nowrap",
                i === idx ? "text-brand" : i < idx ? "text-slate-500" : "text-slate-300"
              )}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "h-0.5 w-10 sm:w-16 mx-1 mb-4 transition-all",
                i < idx ? "bg-brand" : "bg-slate-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Inner component — receives a guaranteed non-undefined plan ─────────────────
function InvestPlanContent({ plan }: { plan: Plan }) {
  const [step, setStep] = useState<Step>("details");
  const [amount, setAmount] = useState<string>(String(plan.minAmount));
  const [network, setNetwork] = useState<Network>("TRC20");
  const [txHash, setTxHash] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amountError, setAmountError] = useState("");

  const numAmount = parseFloat(amount) || 0;
  const serviceFee = numAmount * SERVICE_FEE_RATE;
  const totalPayable = numAmount + serviceFee;

  function validateAmount() {
    if (!numAmount || numAmount < plan.minAmount) {
      setAmountError(`Minimum investment is $${plan.minAmount} USDT`);
      return false;
    }
    setAmountError("");
    return true;
  }

  function goToPayment() {
    if (!validateAmount()) return;
    setStep("payment");
  }

  function goToConfirm() {
    if (!txHash.trim()) return;
    setStep("confirm");
  }

  function submitInvestment() {
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 2000);
  }

  return (
    <div className="flex-1 overflow-auto p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <StepIndicator step={step} />

        {/* ── STEP 1: Plan Details + Amount ─────────────────────────────────── */}
        {step === "details" && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 sm:p-8 animate-fade-up">
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{plan.name}</h1>
                <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60">
                  <TrendingUp className="w-3 h-3" />
                  {plan.rateLabel}
                </span>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700 mb-1">
                  {plan.badge}
                </span>
                <p className="text-3xl font-bold text-brand">{plan.price}</p>
                <p className="text-xs text-slate-400">Minimum investment</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 overflow-hidden mb-6">
              {Object.entries(plan.details).map(([key, value], i) => {
                const isNeg = value === "Not Available" || value === "No";
                const isPos = value === "Available" || value === "Yes" || value === "Anytime";
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
                        "font-semibold flex items-center gap-1",
                        isNeg ? "text-rose-500" : isPos ? "text-emerald-600" : "text-slate-800"
                      )}
                    >
                      {isNeg ? (
                        <XCircle className="w-3.5 h-3.5" />
                      ) : isPos ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : null}
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 mb-6 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-500 shrink-0" />
              <p className="text-sm text-amber-700 font-medium">{plan.holiday}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Investment Amount (USDT)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                  $
                </span>
                <input
                  type="number"
                  min={plan.minAmount}
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setAmountError("");
                  }}
                  className={cn(
                    "w-full pl-8 pr-4 py-3 rounded-xl border text-slate-900 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-brand/30 transition-all",
                    amountError ? "border-rose-300 bg-rose-50" : "border-slate-200 bg-slate-50"
                  )}
                  placeholder={String(plan.minAmount)}
                />
              </div>
              {amountError && (
                <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> {amountError}
                </p>
              )}
              <p className="text-xs text-slate-400 mt-1.5">
                Minimum: ${plan.minAmount} USDT · 2% service fee applies
              </p>
            </div>

            {numAmount >= plan.minAmount && (
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 mb-6 space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Investment Amount</span>
                  <span className="font-semibold">${fmtUSDT(numAmount)} USDT</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Service Fee (2%)</span>
                  <span className="font-semibold text-rose-500">
                    +${fmtUSDT(serviceFee)} USDT
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-brand">${fmtUSDT(totalPayable)} USDT</span>
                </div>
              </div>
            )}

            <button
              onClick={goToPayment}
              className="w-full py-3.5 bg-slate-900 hover:bg-brand text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-btn flex items-center justify-center gap-2"
            >
              Proceed to Payment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── STEP 2: Payment ────────────────────────────────────────────────── */}
        {step === "payment" && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 sm:p-8 animate-fade-up">
            <h2 className="text-xl font-bold text-slate-900 mb-1">Send Payment</h2>
            <p className="text-slate-500 text-sm mb-6">
              Transfer exactly{" "}
              <span className="font-bold text-brand">${fmtUSDT(totalPayable)} USDT</span> to the
              wallet address below.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Select Network
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(["TRC20", "BEP20"] as Network[]).map((net) => (
                  <button
                    key={net}
                    onClick={() => setNetwork(net)}
                    className={cn(
                      "py-3 rounded-xl border-2 font-semibold text-sm transition-all",
                      network === net
                        ? "border-brand bg-brand/5 text-brand"
                        : "border-slate-200 text-slate-500 hover:border-slate-300"
                    )}
                  >
                    USDT ({net})
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Company Wallet Address ({network})
              </label>
              <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-mono text-slate-800 break-all">
                  {COMPANY_WALLETS[network]}
                </span>
                <CopyButton text={COMPANY_WALLETS[network]} />
              </div>
              <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 shrink-0" />
                Only send USDT on the {network} network. Wrong network = lost funds.
              </p>
            </div>

            <div className="rounded-xl bg-brand/5 border border-brand/20 p-4 mb-6 space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Investment</span>
                <span className="font-semibold">${fmtUSDT(numAmount)} USDT</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Service Fee (2%)</span>
                <span className="font-semibold">+${fmtUSDT(serviceFee)} USDT</span>
              </div>
              <div className="border-t border-brand/20 pt-1.5 flex justify-between font-bold text-brand">
                <span>Send Exactly</span>
                <span>${fmtUSDT(totalPayable)} USDT</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Transaction Hash / TxID
              </label>
              <input
                type="text"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="Paste your transaction hash here..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 transition-all placeholder:text-slate-300"
              />
              <p className="text-xs text-slate-400 mt-1.5">
                After sending, paste the TxID from your Binance / wallet app.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("details")}
                className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all"
              >
                Back
              </button>
              <button
                onClick={goToConfirm}
                disabled={!txHash.trim()}
                className="flex-1 py-3 bg-slate-900 hover:bg-brand text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-btn disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Next: Review <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Confirm ────────────────────────────────────────────────── */}
        {step === "confirm" && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 sm:p-8 animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Review & Confirm</h2>
                <p className="text-slate-500 text-sm">Double-check before submitting.</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 overflow-hidden mb-6">
              {[
                { label: "Plan", value: plan.name },
                { label: "Network", value: `USDT (${network})` },
                { label: "Investment Amount", value: `$${fmtUSDT(numAmount)} USDT` },
                { label: "Service Fee (2%)", value: `$${fmtUSDT(serviceFee)} USDT` },
                { label: "Total Paid", value: `$${fmtUSDT(totalPayable)} USDT` },
                {
                  label: "Wallet",
                  value: `${COMPANY_WALLETS[network].slice(0, 10)}...${COMPANY_WALLETS[network].slice(-6)}`,
                },
                {
                  label: "TxID",
                  value: `${txHash.slice(0, 12)}...${txHash.slice(-6)}`,
                },
              ].map(({ label, value }, i) => (
                <div
                  key={label}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 text-sm",
                    i % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                  )}
                >
                  <span className="text-slate-500">{label}</span>
                  <span className="font-semibold text-slate-900 text-right max-w-[55%] break-all">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 mb-6 text-sm text-blue-800">
              <p className="font-semibold mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Security Notice
              </p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>KYC verification (NID/Passport) may be required for withdrawals.</li>
                <li>Two-Factor Authentication (2FA) protects your account.</li>
                <li>Returns are variable and based on real market performance.</li>
                <li>The 2% service fee is non-refundable.</li>
              </ul>
            </div>

            <label className="flex items-start gap-3 cursor-pointer mb-6 select-none">
              <div
                onClick={() => setAgreed(!agreed)}
                className={cn(
                  "mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all",
                  agreed ? "bg-brand border-brand" : "border-slate-300 bg-white"
                )}
              >
                {agreed && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm text-slate-600">
                I confirm that I have sent{" "}
                <strong className="text-slate-900">${fmtUSDT(totalPayable)} USDT</strong> to the
                company wallet and agree to the platform terms, including the 2% service fee and
                variable return policy.
              </span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("payment")}
                className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all"
              >
                Back
              </button>
              <button
                onClick={submitInvestment}
                disabled={!agreed || loading}
                className="flex-1 py-3 bg-slate-900 hover:bg-brand text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-btn disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing…
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Confirm Investment
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Success ────────────────────────────────────────────────── */}
        {step === "success" && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-8 animate-fade-up flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Investment Submitted!</h2>
            <p className="text-slate-500 mb-6 max-w-sm">
              Your investment request for{" "}
              <span className="font-semibold text-slate-800">{plan.name}</span> has been received.
              Our team will verify your transaction within <strong>24 hours</strong>.
            </p>

            <div className="w-full rounded-xl bg-slate-50 border border-slate-100 p-4 mb-6 space-y-2 text-sm text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Plan</span>
                <span className="font-semibold text-slate-900">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Invested</span>
                <span className="font-semibold text-slate-900">${fmtUSDT(numAmount)} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service Fee Paid</span>
                <span className="font-semibold text-slate-900">${fmtUSDT(serviceFee)} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Network</span>
                <span className="font-semibold text-slate-900">USDT ({network})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="font-semibold text-amber-600 flex items-center gap-1">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Pending Verification
                </span>
              </div>
            </div>

            <div className="w-full rounded-xl bg-blue-50 border border-blue-100 p-4 mb-6 text-sm text-blue-700 text-left">
              <p className="font-semibold mb-1">What happens next?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Admin verifies your TxID on-chain.</li>
                <li>Investment activates within 24 hours.</li>
                <li>Track returns in your Dashboard.</li>
                <li>Profits are withdrawable anytime via USDT (TRC20/BEP20).</li>
              </ul>
            </div>

            <a
              href="/dashboard"
              className="w-full py-3.5 bg-slate-900 hover:bg-brand text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-btn text-center block"
            >
              Go to Dashboard
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page shell — handles the undefined guard cleanly ──────────────────────────
export default function InvestPlanPage({ slug }: { slug: string }) {
  const plan = plans.find((item) => item.slug === slug);

  if (!plan) {
    notFound();
    // notFound() throws internally, but this return satisfies TypeScript
    return null;
  }

  return <InvestPlanContent plan={plan} />;
}