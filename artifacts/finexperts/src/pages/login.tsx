import { useState } from "react";
import { Link } from "wouter";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#F7F4EC] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="https://customer-assets.emergentagent.com/job_kiwi-credit-calc/artifacts/79s0uoxb_logo2_corectr.png"
            alt="FinExperts"
            className="h-10 mx-auto mb-5"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <h1 className="text-2xl font-bold text-[#0A1A2E]">Intră în contul tău</h1>
          <p className="text-sm text-[#5A6478] mt-1">Accesează aplicările și ofertele tale</p>
        </div>

        <div className="bg-white border border-[#E5E3D9] rounded-xl p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0A1A2E] uppercase tracking-wider mb-1.5">Email</label>
              <input
                data-testid="input-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ion@exemplu.ro"
                required
                className="w-full border border-[#E5E3D9] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0A1A2E] transition-colors"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-[#0A1A2E] uppercase tracking-wider">Parolă</label>
                <a href="#" className="text-xs text-[#5A6478] hover:text-[#0A1A2E] transition-colors">Ai uitat parola?</a>
              </div>
              <input
                data-testid="input-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-[#E5E3D9] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0A1A2E] transition-colors"
              />
            </div>
            <button
              type="submit"
              data-testid="btn-login"
              className="w-full bg-[#0A1A2E] hover:bg-[#132846] text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Intră în cont
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-[#E5E3D9] text-center text-sm text-[#5A6478]">
            Nu ai cont?{" "}
            <Link href="/register" className="text-[#0A1A2E] font-semibold hover:text-[#C6A667] transition-colors">
              Creează cont
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
