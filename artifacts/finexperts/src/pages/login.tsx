import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = login(email, password);
    if (ok) {
      if (email === "admin@finexperts.ro") {
        setLocation("/admin");
      } else {
        setLocation("/cont");
      }
    } else {
      setError("Email sau parolă incorectă. Încearcă din nou.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="https://customer-assets.emergentagent.com/job_kiwi-credit-calc/artifacts/79s0uoxb_logo2_corectr.png"
            alt="FinExperts"
            className="h-10 mx-auto mb-5"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <h1 className="text-2xl font-bold text-[#0B2E2E]">Intră în contul tău</h1>
          <p className="text-sm text-[#64748B] mt-1">Accesează aplicările și ofertele tale</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-7">
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
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E] transition-colors"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider">Parolă</label>
                <a href="#" className="text-xs text-[#64748B] hover:text-[#0B2E2E] transition-colors">Ai uitat parola?</a>
              </div>
              <input
                data-testid="input-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E] transition-colors"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              data-testid="btn-login"
              className="w-full bg-[#0B2E2E] hover:bg-[#132846] text-white font-semibold py-3 rounded-xl transition-colors"
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

        <div className="mt-4 bg-[#0B2E2E]/5 border border-[#E2E8F0] rounded-xl p-4">
          <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">Acces Admin</div>
          <div className="text-xs text-[#64748B]">
            Email: <span className="font-mono text-[#0B2E2E]">admin@finexperts.ro</span><br />
            Parolă: <span className="font-mono text-[#0B2E2E]">admin123</span>
          </div>
        </div>
      </div>
    </div>
  );
}
