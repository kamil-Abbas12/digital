"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  Lock,
  Mail,
} from "lucide-react";

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0f1e]" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand/10 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-[100px]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-brand/40 animate-pulse" />
      <div
        className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-cyan-400/40 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-emerald-400/50 animate-pulse"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}

function StatsTicker() {
  const stats = [
    { label: "Active Investors", value: "12,450+" },
    { label: "Total Invested", value: "$4.2M USDT" },
    { label: "Avg. Return", value: "8.4% / mo" },
    { label: "Payouts Today", value: "$18,320" },
  ];

  return (
    <div className="flex items-center gap-8 overflow-hidden">
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-2 shrink-0">
          <TrendingUp className="w-3 h-3 text-emerald-400" />
          <span className="text-xs text-slate-400">{s.label}:</span>
          <span className="text-xs font-bold text-emerald-400">{s.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function SignInClient({
  callbackUrl,
}: {
  callbackUrl: string;
}) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(result?.url || callbackUrl);
    router.refresh();
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <GridBackground />

      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand to-brand/60 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">MTFE</span>
          <span className="text-slate-500 text-sm font-medium">Invest</span>
        </Link>

        <div className="hidden sm:block">
          <StatsTicker />
        </div>

        <Link
          href="/auth/sign-up"
          className="text-xs font-semibold text-slate-400 hover:text-white transition-colors border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg"
        >
          Create Account
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand/20 to-brand/5 border border-brand/20 mb-4">
                <Lock className="w-6 h-6 text-brand" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Welcome back
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Sign in to your investment account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand/50 focus:bg-white/8 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-brand hover:text-brand/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand/50 focus:bg-white/8 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-brand hover:bg-brand/90 text-white font-semibold transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Signing in…
                  </>
                ) : (
                  "Sign In to Dashboard"
                )}
              </button>

              <div className="relative flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-slate-600">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <p className="text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-brand hover:text-brand/80 font-semibold transition-colors"
                >
                  Create one free
                </Link>
              </p>
            </form>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            {[
              { icon: ShieldCheck, label: "2FA Protected" },
              { icon: Lock, label: "256-bit SSL" },
              { icon: TrendingUp, label: "KYC Verified" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 text-slate-600 text-xs"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
