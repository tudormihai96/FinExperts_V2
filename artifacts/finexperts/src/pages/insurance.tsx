import { useState } from "react";
import { Home, Activity, Plane, Heart, Shield, ArrowRight, CheckCircle, X, Car } from "lucide-react";

type InsuranceExtra = { key: string; label: string; placeholder: string };

const insurances = [
  {
    id: "locuinta",
    title: "Asigurare Locuință",
    subtitle: "PAD obligatoriu + Facultativă extinsă",
    description: "Asigurarea locuinței este obligatorie prin lege (PAD) și te protejează în caz de cutremur, inundații sau alunecări de teren. Facultativa extinde acoperirea la incendiu, furt, daune apă și răspundere civilă față de vecini.",
    icon: Home,
    iconBg: "#0B2E2E",
    priceFrom: 120,
    priceNote: "PAD zonă B · Facultativă de la 250 RON/an",
    providers: ["Allianz", "Groupama", "Omniasig", "Asirom"],
    covers: [
      "PAD — cutremure, inundații, alunecări de teren",
      "Incendiu, explozie și fulgere",
      "Furt și vandalism",
      "Daune produse de apă (conducte, infiltrații)",
      "Răspundere civilă față de terți",
    ],
    highlight: "PAD obligatoriu de la 100 RON/an · Facultativă de la 250 RON/an",
    extraFields: [
      { key: "address", label: "Adresa proprietății", placeholder: "Str., Nr., Bl., Ap., Localitate" },
      { key: "year", label: "Anul construcției clădirii", placeholder: "ex: 1990" },
      { key: "surface", label: "Suprafața utilă (mp)", placeholder: "ex: 75 mp" },
    ] as InsuranceExtra[],
  },
  {
    id: "rca",
    title: "RCA — Răspundere Civilă Auto",
    subtitle: "Asigurare obligatorie pentru orice vehicul înmatriculat",
    description: "RCA acoperă daunele produse terților (persoane sau bunuri) în cazul unui accident din culpa ta. Este obligatorie prin lege, sancționată cu amendă de 1.000–5.000 RON dacă lipsește. Prețul variază în funcție de mașină, zonă și istoricul de daune.",
    icon: Activity,
    iconBg: "#C49A20",
    priceFrom: 650,
    priceNote: "mașină medie, fără daune, zona 3 — tarif Allianz/GRAWE",
    providers: ["Allianz Tiriac", "GRAWE", "Groupama", "Omniasig", "Generali", "Asirom"],
    covers: [
      "Daune materiale terți — acoperire nelimitată conform legii",
      "Vătămări corporale — cheltuieli medicale complete",
      "Pierderea capacității de muncă a terților",
      "Asistență juridică inclusă",
      "Asistență rutieră 24/7 (la unii asigurători)",
    ],
    highlight: "Cel mai mic preț din piață prin comparare la toți asigurătorii autorizați ASF",
    extraFields: [
      { key: "carMake", label: "Marca și modelul vehiculului", placeholder: "ex: Dacia Logan 1.5 dCi 2019" },
      { key: "plate", label: "Număr înmatriculare", placeholder: "ex: B 123 XYZ" },
      { key: "drivingHistory", label: "Ani fără daune (Bonus-Malus)", placeholder: "ex: 5 ani fără daune" },
    ] as InsuranceExtra[],
  },
  {
    id: "casco",
    title: "CASCO Auto",
    subtitle: "Protecție completă indiferent de culpă",
    description: "CASCO protejează vehiculul tău împotriva oricăror daune — accidente, furt, fenomene naturale sau vandalism — indiferent de cine este vinovat. Obligatorie la creditele auto, recomandată pentru mașini cu valoare peste 30.000 RON.",
    icon: Car,
    iconBg: "#64748B",
    priceFrom: 1500,
    priceNote: "mașină 40.000 RON · tarif 3–4%/an · Allianz/Generali",
    providers: ["Allianz Tiriac", "Generali", "Groupama", "Omniasig"],
    covers: [
      "Coliziune și răsturnare — indiferent de culpă",
      "Furt total sau parțial al vehiculului",
      "Fenomene naturale (grindină, inundații, copaci căzuți)",
      "Vandalism și incendiu",
      "Asistență la drum 24/7 și mașină de înlocuire",
    ],
    highlight: "Tarif de la 3% din valoarea vehiculului — include asistență rutieră 24/7",
    extraFields: [
      { key: "carMake", label: "Marca, modelul și motorizarea", placeholder: "ex: Volkswagen Golf 1.6 TDI 2021" },
      { key: "carValue", label: "Valoarea estimată a vehiculului (RON)", placeholder: "ex: 55.000 RON" },
      { key: "plate", label: "Număr înmatriculare", placeholder: "ex: B 456 ABC" },
    ] as InsuranceExtra[],
  },
  {
    id: "calatorie",
    title: "Asigurare de Călătorie",
    subtitle: "Urgențe medicale și protecție completă în afara țării",
    description: "Esențială pentru orice deplasare în afara României. Acoperă urgențele medicale, repatrierea, bagajele pierdute și anularea zborului. Disponibilă per-călătorie sau ca abonament anual nelimitat — cel mai economic pentru călătorii frecvenți.",
    icon: Plane,
    iconBg: "#0EA5E9",
    priceFrom: 25,
    priceNote: "de la 25 RON/călătorie 7 zile Europa · abonament anual de la 150 RON",
    providers: ["Allianz Travel", "Groupama Voyage", "Generali", "AXA Assistance"],
    covers: [
      "Urgențe medicale internaționale — cheltuieli nelimitate",
      "Transport medical de urgență și repatriere",
      "Anulare și întârziere zbor — despăgubire directă",
      "Pierdere, furt sau deteriorare bagaje",
      "Asistență juridică și căutare-salvare",
    ],
    highlight: "Abonament anual Europa nelimitat de la 150 RON — ideal pentru călători frecvenți",
    extraFields: [
      { key: "destination", label: "Destinație / Zonă de acoperire", placeholder: "ex: Europa, SUA-Canada, Worldwide" },
      { key: "travelDates", label: "Perioada estimată de călătorie", placeholder: "ex: 10–25 august 2026" },
      { key: "travelers", label: "Număr și vârsta călătorilor", placeholder: "ex: 2 adulți (35, 38 ani), 1 copil 8 ani" },
    ] as InsuranceExtra[],
  },
  {
    id: "viata",
    title: "Asigurare de Viată",
    subtitle: "Protecție financiară pentru familia ta",
    description: "Asigurarea de viată asigură securitatea financiară a familiei în caz de deces sau invaliditate permanentă. Disponibilă ca asigurare de risc pur (perioadă determinată) sau cu componentă investițională Unit-Linked. Obligatorie și cesionată în favoarea băncii pentru creditele ipotecare.",
    icon: Heart,
    iconBg: "#E11D48",
    priceFrom: 700,
    priceNote: "risc pur · 150.000 RON acoperire · 35 ani · nefumător",
    providers: ["Allianz Life", "Generali Romania", "Asirom Vienna Insurance", "NN Insurance"],
    covers: [
      "Deces din orice cauză — sumă asigurată plătită integral",
      "Invaliditate permanentă totală sau parțială",
      "Boli grave critice — cancer, infarct, AVC (opțional)",
      "Componentă de economisire Unit-Linked (opțional)",
      "Cesionare bancă pentru credit ipotecar — inclus în dosar",
    ],
    highlight: "Obligatorie pentru ipotecar — o negociem grupat cu dosarul de credit, preț special",
    extraFields: [
      { key: "age", label: "Vârsta persoanei asigurate", placeholder: "ex: 35 ani" },
      { key: "coverage", label: "Suma asigurată dorită (RON)", placeholder: "ex: 250.000 RON" },
      { key: "smoker", label: "Fumător? (influențează prima)", placeholder: "Da / Nu" },
    ] as InsuranceExtra[],
  },
  {
    id: "sanatate",
    title: "Asigurare Sănătate Privată",
    subtitle: "Acces instant la clinici private fără aşteptare",
    description: "Îți oferă acces la consultații, investigații și tratamente la clinicile partenere (Medicover, Regina Maria, MedLife) fără cozi, fără bilet de trimitere și fără costuri la ghișeu. Disponibilă individual sau pentru întreaga familie.",
    icon: Shield,
    iconBg: "#059669",
    priceFrom: 1200,
    priceNote: "plan individual de bază · Medicover StartUp de la 1.260 RON/an",
    providers: ["Medicover", "Regina Maria", "MedLife", "Sanador"],
    covers: [
      "Consultații specialiști nelimitate — fără bilet de trimitere",
      "Analize și investigații paraclinice (ecografii, CT, RMN)",
      "Urgențe medicale în rețeaua parteneră",
      "Prevenție și medicina muncii (plan extins)",
      "Stomatologie și spitalizare (plan premium)",
    ],
    highlight: "Medicover StartUp de la 1.260 RON/an — planul cel mai accesat în 2026",
    extraFields: [
      { key: "age", label: "Vârsta persoanei asigurate", placeholder: "ex: 40 ani" },
      { key: "members", label: "Individual sau familie?", placeholder: "ex: Individual / Familie 2 adulți + 1 copil" },
      { key: "clinic", label: "Clinică preferată (opțional)", placeholder: "ex: Medicover, Regina Maria, MedLife" },
    ] as InsuranceExtra[],
  },
];

type FormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
  [key: string]: string;
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
            FinExperts colaborează cu cele mai mari societăți de asigurări autorizate ASF din România. Prețuri reale 2026, ofertă personalizată în 24h, consultanță 100% gratuită.
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
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: ins.iconBg }}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B2E2E] text-base leading-tight">{ins.title}</h3>
                    <p className="text-[11px] text-[#C49A20] font-medium mt-0.5">{ins.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-[#64748B] leading-relaxed mb-3">{ins.description}</p>

                {/* Covers */}
                <ul className="space-y-1.5 mb-3 flex-1">
                  {ins.covers.slice(0, 3).map(c => (
                    <li key={c} className="flex items-start gap-2 text-[12px] text-[#475569]">
                      <CheckCircle className="h-3.5 w-3.5 text-[#059669] shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                  {ins.covers.length > 3 && (
                    <li className="text-[11px] text-[#94A3B8] pl-5">+{ins.covers.length - 3} altele incluse</li>
                  )}
                </ul>

                {/* Providers */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {ins.providers.map(p => (
                    <span key={p} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F4F6FB] border border-[#E2E8F0] text-[#475569]">{p}</span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-end justify-between">
                  <div>
                    <div className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold mb-0.5">De la</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-[#0B2E2E]">{ins.priceFrom.toLocaleString("ro-RO")}</span>
                      <span className="text-sm text-[#64748B]">RON</span>
                    </div>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5">{ins.priceNote}</div>
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
                {selected ? (
                  <>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
                      {selected.title}
                    </h2>
                    <p className="text-[#C49A20] text-sm font-medium mb-4">{selected.subtitle}</p>
                    <div className="space-y-2 mb-6">
                      {selected.covers.map(c => (
                        <div key={c} className="flex items-start gap-2.5">
                          <CheckCircle className="h-4 w-4 text-[#059669] shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-300">{c}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-[11px] text-gray-500 mb-1 uppercase tracking-wider font-semibold">Asigurători parteneri</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.providers.map(p => (
                        <span key={p} className="text-[11px] px-2 py-0.5 rounded-full border border-white/20 text-gray-300">{p}</span>
                      ))}
                    </div>
                    <div className="mt-4 bg-white/10 rounded-xl px-4 py-3">
                      <div className="text-xs text-[#C49A20] font-semibold mb-0.5">De reținut</div>
                      <div className="text-[12px] text-gray-300 leading-snug">{selected.highlight}</div>
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
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

                    {/* Dynamic extra fields based on insurance type */}
                    {selected?.extraFields.map(field => (
                      <div key={field.key}>
                        <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">{field.label}</label>
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          value={form[field.key] || ""}
                          onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                          className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">Detalii suplimentare</label>
                      <textarea
                        rows={3}
                        placeholder="Orice informație suplimentară relevantă pentru ofertă..."
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
