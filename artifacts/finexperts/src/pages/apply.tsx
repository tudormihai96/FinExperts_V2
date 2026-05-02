import { useState } from "react";
import { banks } from "@/lib/data";
import { CheckCircle } from "lucide-react";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nume: "",
    telefon: "",
    email: "",
    tipCredit: "Credit ipotecar",
    suma: "30000",
    perioada: "36",
    venit: "",
    banca: "Cea mai bună ofertă",
    mesaj: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center max-w-md mx-auto">
          <CheckCircle className="h-14 w-14 text-[#2E7D5B] mx-auto mb-5" />
          <h2 className="text-2xl font-bold text-[#0C1A2E] mb-3">Cerere trimisă!</h2>
          <p className="text-[#64748B]">Un consultant FinExperts te va contacta în maxim 24h pentru a te ghida în procesul de aprobare.</p>
          <div className="text-xs text-[#64748B] bg-[#F5F7FA] rounded-lg p-3 mt-5">
            Aplicarea este gratuită. Orice aplicare rămâne decizia finală la bancă.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: text */}
          <div>
            <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Aplicare credit</div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0C1A2E] leading-tight mb-4">
              Trimite un formular,<br />
              <span className="text-[#C49A20]">primești oferta ta</span><br />
              personalizată.
            </h1>
            <p className="text-[#64748B] mb-8">
              Completezi datele o singură dată. Noi ne ocupăm să obținem oferta de la banca aleasă sau de la cea mai avantajoasă pentru profilul tău.
            </p>
            <div className="space-y-4">
              {[
                { icon: "✓", text: "Gratuit și fără obligații" },
                { icon: "✓", text: "Răspuns în maxim 24h" },
                { icon: "✓", text: "Datele sunt trimise doar către banca aleasă" },
                { icon: "✓", text: "Consilier dedicat" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#C49A20] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-[#C49A20]">{item.icon}</span>
                  </div>
                  <span className="text-sm text-[#64748B]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Nume + Telefon */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0C1A2E] uppercase tracking-wider mb-1.5">
                    Nume complet <span className="text-[#C4432F]">*</span>
                  </label>
                  <input
                    name="nume"
                    value={form.nume}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0C1A2E] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0C1A2E] uppercase tracking-wider mb-1.5">
                    Telefon <span className="text-[#C4432F]">*</span>
                  </label>
                  <input
                    name="telefon"
                    value={form.telefon}
                    onChange={handleChange}
                    placeholder="07xx xxx xxx"
                    required
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0C1A2E] transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-[#0C1A2E] uppercase tracking-wider mb-1.5">
                  Email <span className="text-[#C4432F]">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0C1A2E] transition-colors"
                />
              </div>

              {/* Row: Tip credit + Sumă + Perioadă */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0C1A2E] uppercase tracking-wider mb-1.5">Tip credit</label>
                  <select
                    name="tipCredit"
                    value={form.tipCredit}
                    onChange={handleChange}
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0C1A2E] bg-white"
                  >
                    <option>Credit ipotecar</option>
                    <option>Credit de Nevoi Personale</option>
                    <option>Refinanțare</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0C1A2E] uppercase tracking-wider mb-1.5">Sumă (RON)</label>
                  <input
                    name="suma"
                    type="number"
                    value={form.suma}
                    onChange={handleChange}
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0C1A2E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0C1A2E] uppercase tracking-wider mb-1.5">Perioadă (luni)</label>
                  <input
                    name="perioada"
                    type="number"
                    value={form.perioada}
                    onChange={handleChange}
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0C1A2E]"
                  />
                </div>
              </div>

              {/* Row: Venit + Banca preferată */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0C1A2E] uppercase tracking-wider mb-1.5">
                    Venit lunar (RON, opțional)
                  </label>
                  <input
                    name="venit"
                    type="number"
                    value={form.venit}
                    onChange={handleChange}
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0C1A2E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0C1A2E] uppercase tracking-wider mb-1.5">
                    Banca preferată (opțional)
                  </label>
                  <select
                    name="banca"
                    value={form.banca}
                    onChange={handleChange}
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0C1A2E] bg-white"
                  >
                    <option>Cea mai bună ofertă</option>
                    {banks.map(b => <option key={b.id}>{b.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Mesaj */}
              <div>
                <label className="block text-xs font-semibold text-[#0C1A2E] uppercase tracking-wider mb-1.5">
                  Mesaj (opțional)
                </label>
                <textarea
                  name="mesaj"
                  value={form.mesaj}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0C1A2E] resize-none"
                />
              </div>

              <button
                type="submit"
                data-testid="btn-submit"
                className="w-full bg-[#0C1A2E] hover:bg-[#132846] text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Trimite aplicarea
              </button>

              <p className="text-xs text-[#64748B] text-center">
                Prin trimitere, ești de acord cu prelucrarea datelor pentru obținerea ofertei de credit.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
