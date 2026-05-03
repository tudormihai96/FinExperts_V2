import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth, BROKER_ACCOUNTS, setBrokerAccounts, getBrokerAccounts } from "@/lib/auth";
import { AlertCircle, Eye, EyeOff, Lock, Shield } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const { login, isLocked, lockRemainingMin, failedAttempts } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = login(email.trim().toLowerCase(), password);
    if (result.success) {
      const emailNorm = email.trim().toLowerCase();
      if (emailNorm === "admin@finexperts.ro") {
        setLocation("/admin");
      } else if (BROKER_ACCOUNTS[emailNorm]) {
        const accounts = getBrokerAccounts();
        const account = accounts[emailNorm] || BROKER_ACCOUNTS[emailNorm];
        setBrokerAccounts({ ...accounts, [emailNorm]: account });
        setLocation("/broker");
      } else {
        setLocation("/cont");
      }
    } else {
      setError(result.error || "Email sau parolă incorectă.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="https://customer-assets.emergentagent.com/job_kiwi-credit-calc/artifacts/79s0uoxb_logo2_corectr.png"
            alt="FinExperts"
            className="h-40 mx-auto mb-5"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <h1 className="text-2xl font-bold text-[#0B2E2E]">Intră în contul tău</h1>
          <p className="text-sm text-[#64748B] mt-1">Accesează aplicările și ofertele tale</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-7">
          {isLocked && (
            <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
              <Lock className="h-4 w-4 shrink-0" />
              <span>Cont blocat temporar — reîncearcă în <strong>{lockRemainingMin} min</strong></span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">Email</label>
              <input
                data-testid="input-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ion@exemplu.ro"
                required
                disabled={isLocked}
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E] transition-colors disabled:opacity-50"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider">Parolă</label>
              </div>
              <div className="relative">
                <input
                  data-testid="input-password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLocked}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-[#0B2E2E] transition-colors disabled:opacity-50"
                />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0B2E2E]">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {failedAttempts > 0 && failedAttempts < 5 && !isLocked && (
              <div className="text-xs text-amber-600 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                {5 - failedAttempts} încercări rămase înainte de blocare temporară
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              data-testid="btn-login"
              disabled={isLocked}
              className="w-full bg-[#0B2E2E] hover:bg-[#132846] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
            >
              Intră în cont
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-[#E2E8F0] text-center text-sm text-[#64748B]">
            Nu ai cont?{" "}
            <Link href="/register" className="text-[#0B2E2E] font-semibold hover:text-[#C49A20] transition-colors">
              Creează cont
            </Link>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#94A3B8]">
          <Lock className="h-3 w-3" />
          Sesiune securizată · Blocare după 5 încercări eșuate
        </div>
      </div>
    </div>
  );
}
