import { useState } from "react";
import { banks } from "@/lib/data";
import { CheckCircle, MapPin, Phone, Mail, Clock } from "lucide-react";

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

          {/* Left: text + contact info + map */}
          <div>
            <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Aplicare credit</div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0C1A2E] leading-tight mb-4">
              Trimite un formular,<br />
              <span className="text-[#C49A20]">primești oferta ta</span><br />
              personalizată.
            </h1>
            <p className="text-[#64748B] mb-6">
              Completezi datele o singură dată. Noi ne ocupăm să obținem oferta de la banca aleasă sau de la cea mai avantajoasă pentru profilul tău.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Gratuit și fără obligații",
                "Răspuns în maxim 24h",
                "Datele sunt trimise doar către banca aleasă",
                "Consilier dedicat",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#C49A20] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-[#C49A20]">✓</span>
                  </div>
                  <span className="text-sm text-[#64748B]">{text}</span>
                </div>
              ))}
            </div>

            {/* Office locations */}
            <div className="space-y-4">

              {/* Biroul principal — Ion Câmpineanu */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-[#E2E8F0]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#C49A20]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4 text-[#C49A20]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#C49A20] uppercase tracking-wider mb-1">Birou consultanță — București</p>
                      <p className="text-sm font-semibold text-[#0C1A2E]">Bd. Ion Câmpineanu, nr. 26</p>
                      <p className="text-xs text-[#64748B]">Sector 1, București · KIWI Finance</p>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <a href="tel:0799715101" className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#0C1A2E] transition-colors">
                          <Phone className="h-3 w-3 text-[#C49A20]" /> 0799 715 101
                        </a>
                        <a href="mailto:kbaa@kiwifinance.ro" className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#0C1A2E] transition-colors">
                          <Mail className="h-3 w-3 text-[#C49A20]" /> kbaa@kiwifinance.ro
                        </a>
                        <span className="flex items-center gap-1.5 text-xs text-[#64748B]">
                          <Clock className="h-3 w-3 text-[#C49A20]" /> Luni–Vineri, 09:00–18:00
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Google Maps embed */}
                <div className="w-full h-[220px]">
                  <iframe
                    title="Birou FinExperts — Bd. Ion Câmpineanu 26, București"
                    src="https://maps.google.com/maps?q=Bd.+Ion+C%C3%A2mpineanu+26,+Bucure%C8%99ti&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="px-4 py-2 bg-[#F8FAFC]">
                  <a
                    href="https://maps.google.com/?q=Bd.+Ion+Câmpineanu+26,+București"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#C49A20] hover:underline font-medium"
                  >
                    Deschide în Google Maps →
                  </a>
                </div>
              </div>

              {/* Sediu înregistrat */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0C1A2E]/5 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4 text-[#64748B]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">Sediu înregistrat</p>
                    <p className="text-sm font-semibold text-[#0C1A2E]">Alexandra Achim PFA · CUI 54405887</p>
                    <p className="text-xs text-[#64748B] leading-relaxed mt-0.5">
                      Str. Stejarului, nr. 117A, cam. 1, parter, ap. 3<br />
                      Sat Dobroiești, Com. Dobroiești, Jud. Ilfov
                    </p>
                  </div>
                </div>
              </div>

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
                Prin trimitere, ești de acord cu prelucrarea datelor pentru obținerea ofertei de credit.{" "}
                <a href="/confidentialitate" className="text-[#C49A20] hover:underline">Politica de date personale</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
