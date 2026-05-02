import { useState } from "react";
import { banks } from "@/lib/data";
import { BROKERS, CC_EMAIL, getBroker, getStoredBrokerId, buildBrokerMailto } from "@/lib/brokers";
import { CheckCircle, MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";

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

  const broker = getBroker(getStoredBrokerId());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Aplicare Credit - ${form.tipCredit} - ${form.nume}`;
    const body = `Bună ziua,\n\nAm o cerere de credit cu următoarele detalii:\n\nNume: ${form.nume}\nTelefon: ${form.telefon}\nEmail: ${form.email}\nTip credit: ${form.tipCredit}\nSumă: ${form.suma} RON\nPerioadă: ${form.perioada} luni\nVenit lunar: ${form.venit || "nedeclarat"} RON\nBancă preferată: ${form.banca}\nMesaj: ${form.mesaj || "—"}\n\nVă mulțumesc.`;
    const mailto = buildBrokerMailto(broker, subject, body);
    window.open(mailto, "_self");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center max-w-md w-full shadow-sm">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="h-9 w-9 text-[#2E7D5B]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0B2E2E] mb-3">Cerere trimisă!</h2>
          <p className="text-[#64748B] mb-4 leading-relaxed">
            Aplicarea a fost trimisă brokerului tău,{" "}
            <strong className="text-[#0B2E2E]">{broker.name}</strong>, cu CC la {CC_EMAIL}.
          </p>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-[#64748B] leading-relaxed">
              Aplicarea este gratuită și fără obligații. Decizia finală aparține băncii.
            </p>
          </div>
          <Link href="/calculator">
            <button className="w-full border border-[#E2E8F0] text-[#0B2E2E] hover:border-[#0B2E2E] font-medium py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
              Calculează o altă rată <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">

      {/* ── Page header ── */}
      <div className="bg-[#0B2E2E] pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Aplicare credit</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            Trimite cererea, <span className="text-[#C49A20]">primești oferta ta</span>
          </h1>
          <p className="text-gray-400 text-base max-w-xl">
            Completezi datele o singură dată. Brokerul tău te contactează în maxim 24h cu oferta personalizată — 100% gratuit.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 items-start">

          {/* Left: form card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 lg:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-[#0B2E2E] mb-1">Formular de aplicare</h2>
            <p className="text-xs text-[#64748B] mb-6">Câmpurile marcate cu <span className="text-[#C4432F]">*</span> sunt obligatorii.</p>

            {/* Broker assigned */}
            <div className="flex items-center gap-3 bg-[#F4F6FB] border border-[#E2E8F0] rounded-xl px-4 py-3 mb-6">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ backgroundColor: broker.color }}>{broker.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-[#64748B]">Brokerul tău</div>
                <div className="text-sm font-semibold text-[#0B2E2E]">{broker.name}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] text-[#64748B]">Email va merge la</div>
                <div className="text-[11px] font-medium text-[#0B2E2E] truncate max-w-[160px]">{broker.email}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">
                    Nume complet <span className="text-[#C4432F]">*</span>
                  </label>
                  <input name="nume" value={form.nume} onChange={handleChange} required
                    className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">
                    Telefon <span className="text-[#C4432F]">*</span>
                  </label>
                  <input name="telefon" value={form.telefon} onChange={handleChange} placeholder="07xx xxx xxx" required
                    className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E] transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">
                  Email <span className="text-[#C4432F]">*</span>
                </label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E] transition-colors" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">Tip credit</label>
                  <select name="tipCredit" value={form.tipCredit} onChange={handleChange}
                    className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E] bg-white">
                    <option>Credit ipotecar</option>
                    <option>Credit de Nevoi Personale</option>
                    <option>Refinanțare</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">Sumă (RON)</label>
                  <input name="suma" type="number" value={form.suma} onChange={handleChange}
                    className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">Perioadă (luni)</label>
                  <input name="perioada" type="number" value={form.perioada} onChange={handleChange}
                    className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">
                    Venit lunar (RON, opțional)
                  </label>
                  <input name="venit" type="number" value={form.venit} onChange={handleChange}
                    className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">
                    Banca preferată (opțional)
                  </label>
                  <select name="banca" value={form.banca} onChange={handleChange}
                    className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E] bg-white">
                    <option>Cea mai bună ofertă</option>
                    {banks.map(b => <option key={b.id}>{b.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">
                  Mesaj (opțional)
                </label>
                <textarea name="mesaj" value={form.mesaj} onChange={handleChange} rows={3}
                  className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E] resize-none" />
              </div>

              <button type="submit" data-testid="btn-submit"
                className="w-full bg-[#0B2E2E] hover:bg-[#132846] text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                Trimite aplicarea <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-xs text-[#64748B] text-center leading-relaxed">
                Aplicarea se trimite pe email la brokerul tău cu CC la {CC_EMAIL}.
                Prin trimitere, ești de acord cu{" "}
                <Link href="/confidentialitate" className="text-[#C49A20] hover:underline">Politica de date personale</Link>.
              </p>
            </form>
          </div>

          {/* Right: benefits + office */}
          <div className="space-y-5 pt-2">

            {/* Brokers list */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#0B2E2E] uppercase tracking-wider mb-4">Echipa FinExperts</h3>
              <div className="space-y-3">
                {BROKERS.map(b => (
                  <div key={b.id} className="flex items-center gap-3 py-2">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: b.color }}>{b.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#0B2E2E]">{b.name}</div>
                      <div className="text-xs text-[#64748B]">{b.role}</div>
                    </div>
                    <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="text-xs text-[#64748B] hover:text-[#0B2E2E] transition-colors whitespace-nowrap">
                      {b.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#0B2E2E] uppercase tracking-wider mb-4">De ce să aplici prin noi</h3>
              <div className="space-y-3.5">
                {[
                  { icon: "🎯", title: "100% gratuit", desc: "Nicio taxă pentru tine. Suntem plătiți de bancă." },
                  { icon: "⚡", title: "Răspuns în 24h", desc: "Brokerul tău te contactează rapid cu oferta." },
                  { icon: "🔒", title: "Date protejate", desc: "Trimitem datele doar la banca aleasă de tine." },
                  { icon: "🏆", title: "Cel mai bun preț", desc: "Negociem dobânzi sub oferta publică standard." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F5F7FA] flex items-center justify-center shrink-0 text-base">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0B2E2E]">{item.title}</p>
                      <p className="text-xs text-[#64748B] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office + Map */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
              <div className="px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#C49A20]/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-[#C49A20]" style={{ width: "18px", height: "18px" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[#C49A20] uppercase tracking-wider mb-0.5">Birou consultanță</p>
                    <p className="text-sm font-semibold text-[#0B2E2E]">Str. Ion Câmpineanu nr. 26, bl. 8, sc. 2, et. 1</p>
                    <p className="text-xs text-[#64748B]">Sector 1, București · KIWI Finance</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <a href="tel:0799715101" className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#0B2E2E] transition-colors">
                    <Phone className="h-3 w-3 text-[#C49A20] shrink-0" /> 0799 715 101
                  </a>
                  <a href={`mailto:${CC_EMAIL}`} className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#0B2E2E] transition-colors col-span-2">
                    <Mail className="h-3 w-3 text-[#C49A20] shrink-0" /> {CC_EMAIL}
                  </a>
                  <span className="flex items-center gap-1.5 text-xs text-[#64748B] col-span-3">
                    <Clock className="h-3 w-3 text-[#C49A20] shrink-0" /> Luni–Vineri, 09:00–18:00
                  </span>
                </div>
              </div>
              <div className="h-[180px] w-full">
                <iframe
                  title="Birou FinExperts"
                  src="https://maps.google.com/maps?q=Bd.+Ion+C%C3%A2mpineanu+26,+Bucure%C8%99ti&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%" height="100%" style={{ border: 0 }}
                  allowFullScreen={false} loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="px-5 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                <a href="https://maps.google.com/?q=Str.+Ion+Câmpineanu+nr.+26,+bl.+8,+sc.+2,+et.+1,+Sector+1,+București"
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs text-[#C49A20] hover:underline font-medium flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Deschide în Google Maps
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
