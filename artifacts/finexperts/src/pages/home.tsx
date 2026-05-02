import { useState, useMemo } from "react";
import { Link } from "wouter";
import { banks, calculateMonthlyPayment, formatRON } from "@/lib/data";
import { Star, ArrowRight, ShieldCheck, Users, TrendingDown, FileText, Phone } from "lucide-react";
import { CreditCalculator } from "@/components/calculators/CreditCalculator";

export default function HomePage() {
  const [activeType, setActiveType] = useState<"personal" | "ipotecar">("ipotecar");

  const topBanks = useMemo(() =>
    [...banks]
      .sort((a, b) => (activeType === "personal" ? a.ratePersonal - b.ratePersonal : a.rateIpotecar - b.rateIpotecar))
      .slice(0, 3),
    [activeType]
  );

  const marqueeItems = [...banks, ...banks];

  return (
    <div className="min-h-screen bg-[#F4F6FB]">

      {/* ── HERO ── */}
      <section className="bg-[#0C1A2E] pt-12 sm:pt-16 pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-[#C49A20]/40 rounded-full px-3 py-1 mb-5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C49A20]" />
              <span className="text-xs text-[#C49A20] font-medium">Partener oficial KIWI Finance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 sm:mb-5">
              Credite mai inteligente.<br />
              <span className="text-[#C49A20]">Negociate de experți.</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg mb-7 sm:mb-8 leading-relaxed">
              Accesăm toate ofertele de la 11 bănci din România și negociem în locul tău. Rapid, gratuit, profesional.
            </p>
            <div className="flex gap-3 flex-wrap mb-10 sm:mb-12">
              <Link href="/calculator">
                <button className="bg-[#C49A20] hover:bg-[#a07e3e] text-white font-semibold px-5 sm:px-6 py-3 rounded-xl transition-colors flex items-center gap-2 shadow-md text-sm sm:text-base">
                  Calculează rata
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/aplica">
                <button className="border border-white/30 text-white hover:bg-white/10 font-medium px-5 sm:px-6 py-3 rounded-xl transition-colors text-sm sm:text-base">
                  Aplică acum
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ── MARQUEE bănci ── */}
        <div className="bg-white border-t border-gray-100 overflow-hidden">
          <div className="relative py-4">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex gap-10 animate-marquee" style={{ width: "max-content" }}>
              {marqueeItems.map((bank, i) => (
                <div key={`${bank.id}-${i}`} className="flex items-center gap-3 shrink-0 px-2">
                  <img src={bank.logo} alt={bank.name}
                    className="h-11 w-auto object-contain" style={{ maxWidth: "62px" }}
                    onError={e => {
                      const img = e.target as HTMLImageElement;
                      img.style.backgroundColor = bank.color;
                      img.style.borderRadius = "8px";
                      img.style.padding = "5px";
                    }} />
                  <span className="text-[15px] font-semibold text-[#1E293B] whitespace-nowrap">{bank.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E2E8F0]">
            {[
              { value: "11", label: "bănci partenere" },
              { value: "1.000+", label: "clienți mulțumiți" },
              { value: ">90%", label: "rată aprobare" },
              { value: "100%", label: "gratuit" },
            ].map((stat, i) => (
              <div key={i} className="py-4 sm:py-5 px-3 sm:px-6 text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#0C1A2E]">{stat.value}</div>
                <div className="text-[11px] sm:text-xs text-[#64748B]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULATOR DETALIAT ── */}
      <section className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
        <div className="mb-6">
          <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-2">Calculator rapid</div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0C1A2E]">
              Află rata lunară în câteva secunde.
            </h2>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setActiveType("ipotecar")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeType === "ipotecar" ? "bg-[#0C1A2E] text-white" : "border border-[#E2E8F0] text-[#64748B] hover:text-[#0C1A2E] bg-white"}`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Credit ipotecar
              </button>
              <button
                onClick={() => setActiveType("personal")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeType === "personal" ? "bg-[#0C1A2E] text-white" : "border border-[#E2E8F0] text-[#64748B] hover:text-[#0C1A2E] bg-white"}`}
              >
                <FileText className="h-4 w-4" />
                Nevoi Personale
              </button>
            </div>
          </div>
          <p className="text-[#64748B] text-sm mt-2">
            Compară ofertele de la toate cele 11 bănci partenere — fără date personale.
          </p>
        </div>

        {/* Full detailed calculator */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
          <CreditCalculator key={activeType} type={activeType} />
        </div>

        <div className="mt-4 text-center">
          <Link href="/calculator">
            <button className="text-sm text-[#C49A20] font-medium flex items-center gap-1 hover:underline mx-auto">
              Calculator complet cu refinanțare și sumă maximă <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </Link>
        </div>
      </section>

      {/* ── TOP RATES ── */}
      <section className="bg-white border-y border-[#E2E8F0] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-2">Oferte active</div>
              <h2 className="text-xl sm:text-3xl font-bold text-[#0C1A2E]">Cele mai bune dobânzi acum.</h2>
            </div>
            <div className="flex gap-2">
              {(["personal", "ipotecar"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeType === t ? "bg-[#0C1A2E] text-white" : "border border-[#E2E8F0] text-[#64748B] hover:text-[#0C1A2E]"}`}
                >
                  {t === "personal" ? "Personal" : "Ipotecar"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {topBanks.map((bank, idx) => {
              const rate = activeType === "personal" ? bank.ratePersonal : bank.rateIpotecar;
              const dae = activeType === "personal" ? bank.daePersonal : bank.daeIpotecar;
              const monthly = calculateMonthlyPayment(30000, rate, 36);
              return (
                <div key={bank.id} className={`bg-white border rounded-xl p-5 hover:shadow-sm transition-shadow ${idx === 0 ? "border-[#C49A20]" : "border-[#E2E8F0]"}`}>
                  {idx === 0 && (
                    <div className="text-[10px] font-bold text-[#C49A20] uppercase tracking-wider mb-2">⭐ Cea mai bună ofertă</div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                      style={{ backgroundColor: bank.color, fontSize: bank.initials.length > 2 ? "9px" : "12px" }}>
                      {bank.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-[#0C1A2E] text-sm">{bank.name}</div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-[#C49A20] text-[#C49A20]" />
                        <span className="text-xs text-[#64748B]">{bank.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-xs text-[#64748B]">Dobândă</div>
                      <div className="text-2xl font-bold text-[#0C1A2E]">{rate.toFixed(2)}%</div>
                      <div className="text-xs text-[#64748B]">DAE {dae.toFixed(2)}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#64748B]">Rată / lună*</div>
                      <div className="text-lg font-bold text-[#0C1A2E]">{Math.round(monthly).toLocaleString("ro-RO")} RON</div>
                      <div className="text-[10px] text-[#64748B]">*30.000 RON / 36 luni</div>
                    </div>
                  </div>
                  {bank.badge && (
                    <div className="mt-3 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full inline-block"
                      style={{ backgroundColor: (bank.badgeColor || "#64748B") + "18", color: bank.badgeColor || "#64748B" }}>
                      {bank.badge}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <Link href="/banci">
              <button className="border border-[#E2E8F0] text-[#0C1A2E] hover:border-[#0C1A2E] font-medium px-6 py-2.5 rounded-xl transition-colors text-sm">
                Vezi toate cele 11 bănci →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CUM FUNCȚIONEAZĂ ── */}
      <section className="bg-[#0C1A2E] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10">
            <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Cum intermediem</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              De la cerere la cea mai bună ofertă — în 3 pași.
            </h2>
            <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
              Nu suntem bancă. Suntem broker autorizat — negociem în locul tău la toate cele 11 bănci partenere pentru a-ți obține rata minimă posibilă.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Calculezi și aplici gratuit", desc: "Folosești calculatorul pentru a estima rata, apoi trimiți o cerere simplă. Nu ai nevoie de cont, fără date sensibile în acest pas." },
              { step: "02", title: "Brokerul tău negociază", desc: "Un broker FinExperts dedicat analizează dosarul tău și îl prezintă simultan la mai multe bănci partenere, obținând dobânda cea mai mică disponibilă." },
              { step: "03", title: "Tu alegi și semnezi", desc: "Îți prezentăm ofertele comparate și te ghidăm pas cu pas. Tu decizi — brokerul tău te însoțește până la semnarea contractului." },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="text-4xl font-bold text-[#C49A20]/30 shrink-0 leading-none mt-1">{item.step}</div>
                <div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DE CE FINEXPERTS ── */}
      <section className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
        <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">De ce FinExperts</div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0C1A2E] mb-8">Nu suntem bancă. Suntem de partea ta.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: ShieldCheck, title: "100% gratuit", desc: "Nu percepem niciun cost față de tine. Suntem remunerați de bancă doar dacă creditul se aprobă." },
            { icon: TrendingDown, title: "Dobânzi negociate", desc: "Avem acorduri speciale cu băncile care ne permit să obținem dobânzi sub oferta publică standard." },
            { icon: Users, title: "Broker dedicat", desc: "Primești un broker personal care te însoțește de la aplicare până la semnarea contractului." },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="bg-white border border-[#E2E8F0] rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[#0C1A2E]/8 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-[#0C1A2E]" />
                </div>
                <h3 className="font-semibold text-[#0C1A2E] mb-2">{item.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#C49A20] py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0C1A2E] mb-3 sm:mb-4">Gata să obții cel mai bun credit?</h2>
          <p className="text-[#0C1A2E]/70 mb-6 sm:mb-8 text-base sm:text-lg">
            Trimite cererea gratuit și brokerul tău te contactează în maxim 24h cu oferta personalizată.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/aplica">
              <button className="bg-[#0C1A2E] hover:bg-[#132846] text-white font-semibold px-6 sm:px-8 py-3 rounded-xl transition-colors flex items-center gap-2 text-sm sm:text-base">
                Aplică acum gratuit <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/calculator">
              <button className="bg-white text-[#0C1A2E] hover:bg-white/90 font-medium px-6 sm:px-8 py-3 rounded-xl transition-colors text-sm sm:text-base">
                Calculează mai întâi
              </button>
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-[#0C1A2E]/60">
            <Phone className="h-4 w-4" />
            <span className="text-sm">Sau sună direct: <a href="tel:0799715101" className="font-semibold text-[#0C1A2E] hover:underline">0799 715 101</a></span>
          </div>
        </div>
      </section>
    </div>
  );
}
