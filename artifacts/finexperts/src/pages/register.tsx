import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    setLocation("/cont");
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
          <h1 className="text-2xl font-bold text-[#0B2E2E]">Creează cont gratuit</h1>
          <p className="text-sm text-[#64748B] mt-1">Aplică credite și urmărește ofertele tale</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-7 mb-4">
          <div className="space-y-2 mb-5 pb-5 border-b border-[#E2E8F0]">
            {[
              "Urmărești starea aplicărilor tale",
              "Acces rapid la toate asigurările",
              "Consultanță gratuită de la broker",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#2E7D5B] shrink-0" />
                <span className="text-sm text-[#64748B]">{text}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">Nume complet</label>
              <input
                data-testid="input-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ion Popescu"
                required
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E] transition-colors"
              />
            </div>
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
              <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">Parolă</label>
              <input
                data-testid="input-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minim 6 caractere"
                required
                minLength={6}
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E] transition-colors"
              />
            </div>
            <button
              type="submit"
              data-testid="btn-register"
              className="w-full bg-[#0B2E2E] hover:bg-[#132846] text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Creează cont gratuit
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-[#E2E8F0] text-center text-sm text-[#64748B]">
            Ai deja cont?{" "}
            <Link href="/login" className="text-[#0B2E2E] font-semibold hover:text-[#C49A20] transition-colors">
              Conectare
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
