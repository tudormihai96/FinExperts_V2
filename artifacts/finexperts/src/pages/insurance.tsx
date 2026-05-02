import { useState } from "react";
import { Home, Activity, Plane, Heart, Shield, ArrowRight, CheckCircle, X, Car } from "lucide-react";

const insurances = [
  {
    id: "locuinta",
    title: "Asigurare locuință",
    description: "PAD obligatoriu (~120 RON) + facultativă extinsă pentru incendiu, inundații, furt, daune apă.",
    icon: Home,
    iconBg: "#0B2E2E",
    price: 280,
    note: "PAD + facultativă de bază",
  },
  {
    id: "rca",
    title: "RCA — Răspundere civilă",
    description: "Comparator instant cu toate societățile autorizate ASF. Preț calculat în funcție de mașină și profil.",
    icon: Activity,
    iconBg: "#C49A20",
    price: 450,
    note: "mașină clasa A, profil mediu",
  },
  {
    id: "casco",
    title: "CASCO auto",
    description: "Acoperire all-risk pentru autoturism. Preț ~2-4% din valoarea mașinii, în funcție de asigurător.",
    icon: Car,
    iconBg: "#64748B",
    price: 850,
    note: "mașină ~40.000 RON valoare",
  },
  {
    id: "calatorie",
    title: "Asigurare călătorie",
    description: "Acoperire medicală internațională, bagaje și anulare zbor. Disponibil per-călătorie sau anual.",
    icon: Plane,
    iconBg: "#0EA5E9",
    price: 120,
    note: "abonament anual Europa",
  },
  {
    id: "viata",
    title: "Asigurare de viață",
    description: "Protecție familie + componentă investițională opțională. Plan de bază sau premium cu economisire.",
    icon: Heart,
    iconBg: "#E11D48",
    price: 700,
    note: "plan standard 250.000 RON acoperire",
  },
  {
    id: "sanatate",
    title: "Asigurare sănătate privată",
    description: "Acces clinici partenere (Medicover, Regina Maria, MedLife) fără cozi sau bilet de trimitere.",
    icon: Shield,
    iconBg: "#059669",
    price: 900,
    note: "plan de bază individual",
  },
];

type FormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export default function InsurancePage() {
  const [selectedIns, setSelectedIns] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({ name: "", phone: "", email: "", message: "" });

  const selected = insurances.find(i => i.id === selectedIns);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleClose() {
    setSelectedIns(null);
    setSubmitted(false);
    setForm({ name: "", phone: "", email: "", message: "" });
  }

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Asigurări</div>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#0B2E2E] leading-tight mb-3">
            Asigurări complete,<br />
            <span className="text-[#C49A20]">alături de creditul tău.</span>
          </h1>
          <p className="text-[#64748B] text-sm sm:text-base max-w-xl">
            FinExperts colaborează cu cele mai mari societăți de asigurări din România. Prețuri reale 2026, ofertă personalizată în 24h.
          </p>
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-12">
          {insurances.map((ins) => {
            const Icon = ins.icon;
            return (
              <div
                key={ins.id}
                data-testid={`insurance-card-${ins.id}`}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-all duration-200 flex flex-col group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: ins.iconBg }}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-[#0B2E2E] mb-2 text-base">{ins.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed flex-1">{ins.description}</p>
                <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-end justify-between">
                  <div>
                    <div className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold mb-0.5">De la</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-[#0B2E2E]">{ins.price.toLocaleString("ro-RO")}</span>
                      <span className="text-sm text-[#64748B]">RON/an</span>
                    </div>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5">{ins.note}</div>
                  </div>
                  <button
                    onClick={() => { setSelectedIns(ins.id); setSubmitted(false); document.getElementById("formular-asigurare")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#059669] hover:bg-[#047857] active:bg-[#065F46] px-4 py-2.5 rounded-xl transition-colors shadow-sm"
                  >
                    Solicită
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inline apply form */}
        <div id="formular-asigurare" className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left info panel */}
            <div className="bg-[#0B2E2E] p-7 sm:p-10 text-white flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-4">Solicită ofertă asigurare</div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                  Ofertă personalizată<br />
                  <span className="text-[#C49A20]">în mai puțin de 24h.</span>
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-8">
                  Completează formularul și un consultant FinExperts te va contacta cu cea mai bună ofertă — fără obligații și fără costuri ascunse.
                </p>
                <div className="space-y-3">
                  {[
                    "Comparăm toate societățile autorizate ASF",
                    "Ofertă personalizată în 24h",
                    "Consultanță gratuită end-to-end",
                    "Fără obligații la cererea ofertei",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-[#059669] shrink-0" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-500">Partener oficial KIWI Finance · Autorizat ASF · ARBC</p>
              </div>
            </div>

            {/* Right form */}
            <div className="p-7 sm:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#D1FAE5] flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-[#059669]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B2E2E] mb-2">Cerere trimisă!</h3>
                  <p className="text-[#64748B] text-sm mb-6 max-w-xs">
                    Te vom contacta în cel mult 24h cu oferta personalizată.
                  </p>
                  <button
                    onClick={handleClose}
                    className="text-sm font-medium text-[#0B2E2E] hover:text-[#C49A20] transition-colors flex items-center gap-1"
                  >
                    <X className="h-4 w-4" /> Închide
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-[#0B2E2E] mb-1">
                      {selected ? `Ofertă: ${selected.title}` : "Solicită ofertă asigurare"}
                    </h3>
                    <p className="text-sm text-[#64748B]">
                      {selected ? "Completează datele de contact și te sunăm noi." : "Alege tipul de asigurare și completează datele."}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">
                        Tip asigurare *
                      </label>
                      <select
                        required
                        value={selectedIns || ""}
                        onChange={e => setSelectedIns(e.target.value)}
                        className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0B2E2E] focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669] bg-white"
                      >
                        <option value="">Selectează tipul de asigurare</option>
                        {insurances.map(i => (
                          <option key={i.id} value={i.id}>{i.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">Nume *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ion Popescu"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">Telefon *</label>
                        <input
                          type="tel"
                          required
                          placeholder="07XX XXX XXX"
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">Email</label>
                      <input
                        type="email"
                        placeholder="email@exemplu.ro"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">Detalii suplimentare</label>
                      <textarea
                        rows={3}
                        placeholder="Ex: mașină an 2022, valoare 45.000 RON, fără daune anterioare..."
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#059669] hover:bg-[#047857] active:bg-[#065F46] text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm text-[15px]"
                    >
                      Trimite cererea de ofertă
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <p className="text-xs text-[#94A3B8] text-center">
                      Serviciile de consultanță sunt 100% gratuite. Nu ești obligat să achiziționezi.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
