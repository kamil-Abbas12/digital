"use client";
import { signIn } from "next-auth/react";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  User,
  Phone,
  CheckCircle2,
  XCircle,
  Users,
  Gift,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Animated background — same design language as SignIn ──────────────────────
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0f1e]" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-emerald-500/8 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand/8 blur-[100px]" />
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
      <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-emerald-400/40 animate-pulse" />
      <div
        className="absolute top-2/3 left-1/4 w-1.5 h-1.5 rounded-full bg-brand/40 animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />
    </div>
  );
}

// ── Password strength meter ───────────────────────────────────────────────────
function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 8 characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /\d/.test(password) },
    { label: "Special character", pass: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][score];
  const strengthColor = ["", "bg-rose-500", "bg-amber-500", "bg-blue-500", "bg-emerald-500"][score];
  const strengthText = ["", "text-rose-400", "text-amber-400", "text-blue-400", "text-emerald-400"][score];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Bar */}
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i <= score ? strengthColor : "bg-white/10"
            )}
          />
        ))}
      </div>
      <p className={cn("text-xs font-semibold", strengthText)}>{strengthLabel} password</p>
      {/* Checks */}
      <div className="grid grid-cols-2 gap-1">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-1.5">
            {c.pass ? (
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-3 h-3 text-slate-600 shrink-0" />
            )}
            <span className={cn("text-xs", c.pass ? "text-slate-400" : "text-slate-600")}>
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Referral benefits banner ──────────────────────────────────────────────────
function ReferralBanner() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-emerald-500/10 to-brand/10 border border-emerald-500/20 p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
          <Gift className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Referral Program Active</p>
          <p className="text-xs text-slate-400 mt-0.5">
            Earn <span className="text-emerald-400 font-bold">5%</span> on Level 1 ·{" "}
            <span className="text-emerald-400 font-bold">3%</span> on Level 2 ·{" "}
            <span className="text-emerald-400 font-bold">2%</span> on Level 3 referrals
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"form" | "verify">("form");
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    agreedTerms: false,
    agreedKYC: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setError("");
  }

  function validate() {
    if (!form.fullName.trim()) return "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email address.";
    if (form.phone && !/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) return "Enter a valid phone number.";
    if (form.password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(form.password)) return "Password must contain an uppercase letter.";
    if (!/\d/.test(form.password)) return "Password must contain a number.";
    if (form.password !== form.confirmPassword) return "Passwords do not match.";
    if (!form.agreedTerms) return "Please agree to the Terms of Service.";
    if (!form.agreedKYC) return "Please acknowledge the KYC requirement.";
    return null;
  }
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const err = validate();
  if (err) {
    setError(err);
    return;
  }

  try {
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        referralCode: form.referralCode,
        agreedTerms: form.agreedTerms,
        agreedKYC: form.agreedKYC,
      }),
    });

    const data = await res.json().catch(() => ({}));

    console.log("REGISTER RESPONSE:", data);

    if (!res.ok) {
      setError(data.message || "Failed to create account.");
      return;
    }

    router.push("/auth/sign-in");
  } catch (error) {
    console.error("SIGNUP_FETCH_ERROR:", error);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
}


  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (verifyCode.length !== 6) {
      setVerifyError("Enter the 6-digit code sent to your email.");
      return;
    }
    setVerifyLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setVerifyLoading(false);
    router.push("/dashboard");
  }

  // ── Email verification step ──────────────────────────────────────────────────
  if (step === "verify") {
    return (
      <div className="min-h-screen flex flex-col relative">
        <GridBackground />
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand/20 border border-brand/30 flex items-center justify-center mx-auto mb-5">
                <Mail className="w-8 h-8 text-brand" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verify your email</h2>
              <p className="text-slate-400 text-sm mb-6">
                We sent a 6-digit code to{" "}
                <span className="text-white font-semibold">{form.email}</span>
              </p>

              <form onSubmit={handleVerify} className="space-y-4">
                <input
                  type="text"
                  maxLength={6}
                  value={verifyCode}
                  onChange={(e) => { setVerifyCode(e.target.value.replace(/\D/g, "")); setVerifyError(""); }}
                  placeholder="000000"
                  className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-center text-3xl font-mono tracking-[0.6em] placeholder:text-slate-700 focus:outline-none focus:border-brand/50 transition-all"
                />

                {verifyError && (
                  <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {verifyError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={verifyLoading || verifyCode.length !== 6}
                  className="w-full py-3.5 rounded-xl bg-brand hover:bg-brand/90 text-white font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {verifyLoading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</>
                  ) : (
                    <><CheckCircle2 className="w-4 h-4" /> Confirm & Enter Dashboard</>
                  )}
                </button>

                <button
                  type="button"
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                  onClick={() => setStep("form")}
                >
                  ← Back to sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main registration form ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col relative">
      <GridBackground />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand to-brand/60 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">MTFE</span>
          <span className="text-slate-500 text-sm font-medium">Invest</span>
        </Link>
        <Link
          href="/auth/sign-in"
          className="text-xs font-semibold text-slate-400 hover:text-white transition-colors border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg"
        >
          Sign In
        </Link>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 mb-4">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Create Account</h1>
              <p className="text-slate-400 text-sm mt-1">Join thousands of investors on MTFE</p>
            </div>

            <ReferralBanner />

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full name */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    autoComplete="name"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand/50 focus:bg-white/8 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Email */}
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

              {/* Phone (optional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Phone Number{" "}
                  <span className="text-slate-600 normal-case font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 8900"
                    autoComplete="tel"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand/50 focus:bg-white/8 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand/50 focus:bg-white/8 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <PasswordStrength password={form.password} />
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className={cn(
                      "w-full pl-11 pr-12 py-3 rounded-xl bg-white/5 border text-white placeholder:text-slate-600 focus:outline-none focus:bg-white/8 transition-all text-sm",
                      form.confirmPassword && form.password !== form.confirmPassword
                        ? "border-rose-500/50 focus:border-rose-500/70"
                        : form.confirmPassword && form.password === form.confirmPassword
                        ? "border-emerald-500/50 focus:border-emerald-500/70"
                        : "border-white/10 focus:border-brand/50"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> Passwords do not match
                  </p>
                )}
                {form.confirmPassword && form.password === form.confirmPassword && (
                  <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Passwords match
                  </p>
                )}
              </div>

              {/* Referral code */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Referral Code{" "}
                  <span className="text-slate-600 normal-case font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <Gift className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    name="referralCode"
                    value={form.referralCode}
                    onChange={handleChange}
                    placeholder="e.g. REF-ABC123"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all text-sm font-mono"
                  />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  If someone referred you, enter their code to activate Level 1 commission.
                </p>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-1">
                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setForm((p) => ({ ...p, agreedTerms: !p.agreedTerms }))}
                    className={cn(
                      "mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all",
                      form.agreedTerms ? "bg-brand border-brand" : "border-white/20 bg-white/5"
                    )}
                  >
                    {form.agreedTerms && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-xs text-slate-400 leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-brand hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-brand hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {/* KYC */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setForm((p) => ({ ...p, agreedKYC: !p.agreedKYC }))}
                    className={cn(
                      "mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all",
                      form.agreedKYC ? "bg-emerald-500 border-emerald-500" : "border-white/20 bg-white/5"
                    )}
                  >
                    {form.agreedKYC && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-xs text-slate-400 leading-relaxed">
                    I understand that KYC verification (NID/Passport) will be required before
                    withdrawals, as part of platform security policy.
                  </span>
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-brand hover:from-emerald-500/90 hover:to-brand/90 text-white font-semibold transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</>
                ) : (
                  "Create My Account"
                )}
              </button>

              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link href="/auth/sign-in" className="text-brand hover:text-brand/80 font-semibold transition-colors">
                  Sign in
                </Link>
              </p>
            </form>
          </div>

          {/* Security badges */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {[
              { icon: ShieldCheck, label: "2FA Protected" },
              { icon: Lock, label: "256-bit SSL" },
              { icon: Users, label: "KYC Required" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-slate-600 text-xs">
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