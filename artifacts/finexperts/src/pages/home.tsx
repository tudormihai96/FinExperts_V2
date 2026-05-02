import { useState, useMemo } from "react";
import { Link } from "wouter";
import { banks, calculateMonthlyPayment, formatRON } from "@/lib/data";
import { Star, ArrowRight, ShieldCheck, Users, TrendingDown, FileText, Phone } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function HomePage() {
  const [activeType, setActiveType] = useState<"personal" | "ipotecar">("ipotecar");
  const [amount, setAmount] = useState(30000);
  const [months, setMonths] = useState(36);

  const topBanks = useMemo(() =>
    [...banks]
      .sort((a, b) => (activeType === "personal" ? a.ratePersonal - b.ratePersonal : a.rateIpotecar - b.rateIpotecar))
      .slice(0, 3),
    [activeType]
  );

  const calcAmount = activeType === "personal" ? amount : amount * 5;
  const calcMonths = activeType === "personal" ? months : months * 3;

  // duplicate banks for seamless marquee
  const marqueeItems = [...banks, ...banks];

  return (
    <div className="min-h-screen bg-[#F8F7F4]">

      {/* ── HERO ── */}
      <section className="bg-[#0D1F3C] pt-16 pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-[#B8944F]/40 rounded-full px-3 py-1 mb-6">
              <ShieldCheck className="h-3.5 w-3.5 text-[#B8944F]" />
              <span className="text-xs text-[#B8944F] font-medium">Partener oficial KIWI Finance</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              Cel mai bun credit.<br />
              <span className="text-[#B8944F]">Fără stres.</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Compară rata lunară la toate cele 11 bănci din România. Calculatoare gratuite, broker dedicat, aprobare garantată.
            </p>
            <div className="flex gap-3 flex-wrap mb-12">
              <Link href="/calculator">
                <button className="bg-[#B8944F] hover:bg-[#a07e3e] text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 shadow-md">
                  Calculează rata
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/aplica">
                <button className="border border-white/30 text-white hover:bg-white/10 font-medium px-6 py-3 rounded-xl transition-colors">
                  Aplică acum
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ── MARQUEE bănci ── */}
        <div className="border-t border-white/10 pt-5 pb-6 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 mb-3">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">11 bănci partenere</span>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0D1F3C] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0D1F3C] to-transparent z-10 pointer-events-none" />
            <div className="flex gap-4 animate-marquee" style={{ width: "max-content" }}>
              {marqueeItems.map((bank, i) => (
                <div
                  key={`${bank.id}-${i}`}
                  className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-2xl px-5 py-3 shrink-0 hover:bg-white/18 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 overflow-hidden p-1">
                    <img
                      src={bank.logo}
                      alt={bank.name}
                      className="w-10 h-10 object-contain"
                      onError={e => {
                        const img = e.target as HTMLImageElement;
                        const parent = img.parentElement!;
                        img.style.display = "none";
                        parent.style.backgroundColor = bank.color;
                        parent.innerHTML = `<span style="color:white;font-weight:700;font-size:${bank.initials.length > 2 ? "8px" : "11px"}">${bank.initials}</span>`;
                      }}
                    />
                  </div>
                  <span className="text-base font-semibold text-white whitespace-nowrap">{bank.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-white border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E5E3D9]">
            {[
              { value: "12+", label: "ani experiență" },
              { value: "11", label: "bănci partenere" },
              { value: "1.000+", label: "clienți mulțumiți" },
              { value: ">90%", label: "rată aprobare" },
            ].map((stat, i) => (
              <div key={i} className="py-5 px-6 text-center">
                <div className="text-2xl font-bold text-[#0A1A2E]">{stat.value}</div>
                <div className="text-xs text-[#5A6478]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MINI CALCULATOR ── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left text */}
          <div>
            <div className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider mb-3">Calculator rapid</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A1A2E] mb-4">
              Află rata lunară<br />în câteva secunde.
            </h2>
            <p className="text-[#5A6478] text-base mb-6 leading-relaxed">
              Folosește calculatorul nostru gratuit pentru a compara ofertele de la toate cele 11 bănci partenere, fără date personale.
            </p>
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveType("ipotecar")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeType === "ipotecar" ? "bg-[#0A1A2E] text-white" : "border border-[#E5E3D9] text-[#5A6478] hover:text-[#0A1A2E]"}`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Credit ipotecar
              </button>
              <button
                onClick={() => setActiveType("personal")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeType === "personal" ? "bg-[#0A1A2E] text-white" : "border border-[#E5E3D9] text-[#5A6478] hover:text-[#0A1A2E]"}`}
              >
                <FileText className="h-4 w-4" />
                Credit de Nevoi Personale
              </button>
            </div>
            <Link href="/calculator">
              <button className="text-sm text-[#C6A667] font-medium flex items-center gap-1 hover:underline">
                Calculator complet cu toate băncile <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>

          {/* Right: mini calc card */}
          <div className="bg-white border border-[#E5E3D9] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-[#E5E3D9]">
              {/* Amount slider */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">
                    {activeType === "personal" ? "Sumă dorită" : "Valoare imobil"}
                  </span>
                  <span className="text-sm font-bold text-[#0A1A2E]">
                    {activeType === "personal" ? formatRON(amount) : formatRON(amount * 5)}
                  </span>
                </div>
                <Slider
                  min={activeType === "personal" ? 1000 : 6000}
                  max={activeType === "personal" ? 100000 : 120000}
                  step={activeType === "personal" ? 1000 : 5000}
                  value={[amount]}
                  onValueChange={([v]) => setAmount(v)}
                />
                <div className="flex justify-between text-[10px] text-[#5A6478] mt-1">
                  <span>{activeType === "personal" ? "1.000 RON" : "30.000 RON"}</span>
                  <span>{activeType === "personal" ? "100.000 RON" : "600.000 RON"}</span>
                </div>
              </div>
              {/* Months slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">Perioadă</span>
                  <span className="text-sm font-bold text-[#0A1A2E]">
                    {activeType === "personal" ? months : months * 3} luni
                  </span>
                </div>
                <Slider
                  min={1}
                  max={activeType === "personal" ? 60 : 40}
                  step={1}
                  value={[months]}
                  onValueChange={([v]) => setMonths(v)}
                />
                <div className="flex justify-between text-[10px] text-[#5A6478] mt-1">
                  <span>{activeType === "personal" ? "6 luni" : "12 luni"}</span>
                  <span>{activeType === "personal" ? "60 luni" : "360 luni"}</span>
                </div>
              </div>
            </div>

            {/* Top 3 banks mini */}
            <div className="divide-y divide-[#E5E3D9]">
              {topBanks.map((bank, idx) => {
                const rate = activeType === "personal" ? bank.ratePersonal : bank.rateIpotecar;
                const principal = activeType === "personal" ? amount : amount * 5;
                const m = activeType === "personal" ? months : months * 3;
                const monthly = calculateMonthlyPayment(principal, rate, m);
                return (
                  <div key={bank.id} className={`flex items-center justify-between px-5 py-3.5 ${idx === 0 ? "bg-[#F7F4EC]" : ""}`}>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shrink-0"
                        style={{ backgroundColor: bank.color, fontSize: bank.initials.length > 2 ? "8px" : "10px" }}
                      >
                        {bank.initials}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#0A1A2E]">{bank.name}</div>
                        <div className="text-[10px] text-[#5A6478]">{rate.toFixed(2)}% dobândă</div>
                      </div>
                    </div>
                    <div className="text-right">
                      {idx === 0 && <div className="text-[9px] text-[#C6A667] font-bold uppercase mb-0.5">⭐ Cea mai bună</div>}
                      <div className="text-sm font-bold text-[#0A1A2E]">{Math.round(monthly).toLocaleString("ro-RO")} RON/lună</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-4">
              <Link href="/calculator">
                <button className="w-full bg-[#0A1A2E] hover:bg-[#132846] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                  Vezi toate cele 11 bănci <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP RATES ── */}
      <section className="bg-white border-y border-[#E5E3D9] py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <div className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider mb-2">Oferte active</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1A2E]">Cele mai bune dobânzi acum.</h2>
            </div>
            <div className="flex gap-2">
              {(["personal", "ipotecar"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${activeType === t ? "bg-[#0A1A2E] text-white" : "border border-[#E5E3D9] text-[#5A6478] hover:text-[#0A1A2E]"}`}
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
                <div
                  key={bank.id}
                  className={`bg-white border rounded-xl p-5 hover:shadow-sm transition-shadow ${idx === 0 ? "border-[#C6A667]" : "border-[#E5E3D9]"}`}
                >
                  {idx === 0 && (
                    <div className="text-[10px] font-bold text-[#C6A667] uppercase tracking-wider mb-2">⭐ Cea mai bună ofertă</div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                      style={{ backgroundColor: bank.color, fontSize: bank.initials.length > 2 ? "9px" : "12px" }}
                    >
                      {bank.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-[#0A1A2E] text-sm">{bank.name}</div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-[#C6A667] text-[#C6A667]" />
                        <span className="text-xs text-[#5A6478]">{bank.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-xs text-[#5A6478]">Dobândă</div>
                      <div className="text-2xl font-bold text-[#0A1A2E]">{rate.toFixed(2)}%</div>
                      <div className="text-xs text-[#5A6478]">DAE {dae.toFixed(2)}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#5A6478]">Rată / lună*</div>
                      <div className="text-lg font-bold text-[#0A1A2E]">{Math.round(monthly).toLocaleString("ro-RO")} RON</div>
                      <div className="text-[10px] text-[#5A6478]">*30.000 RON / 36 luni</div>
                    </div>
                  </div>
                  {bank.badge && (
                    <div
                      className="mt-3 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full inline-block"
                      style={{ backgroundColor: (bank.badgeColor || "#5A6478") + "18", color: bank.badgeColor || "#5A6478" }}
                    >
                      {bank.badge}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <Link href="/banci">
              <button className="border border-[#E5E3D9] text-[#0A1A2E] hover:border-[#0A1A2E] font-medium px-6 py-2.5 rounded-xl transition-colors text-sm">
                Vezi toate cele 11 bănci →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CUM FUNCȚIONEAZĂ (broker) ── */}
      <section className="bg-[#0A1A2E] py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider mb-3">Cum intermediem</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              De la cerere la cea mai bună ofertă — în 3 pași.
            </h2>
            <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
              Nu suntem bancă. Suntem broker autorizat — negociem în locul tău la toate cele 11 bănci partenere pentru a-ți obține rata minimă posibilă.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Calculezi și aplici gratuit",
                desc: "Folosești calculatorul pentru a estima rata, apoi trimiți o cerere simplă. Nu ai nevoie de cont, fără date sensibile în acest pas.",
              },
              {
                step: "02",
                title: "Brokerul tău negociază",
                desc: "Un broker FinExperts dedicat analizează dosarul tău și îl prezintă simultan la mai multe bănci partenere, obținând dobânda cea mai mică disponibilă.",
              },
              {
                step: "03",
                title: "Tu alegi și semnezi",
                desc: "Îți prezentăm ofertele comparate și te ghidăm pas cu pas. Tu decizi — brokerul tău te însoțește până la semnarea contractului.",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="text-4xl font-bold text-[#C6A667]/30 shrink-0 leading-none mt-1">{item.step}</div>
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
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider mb-3">De ce FinExperts</div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0A1A2E] mb-8">
          Nu suntem bancă. Suntem de partea ta.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: ShieldCheck,
              title: "100% gratuit",
              desc: "Nu percepem niciun cost față de tine. Suntem remunerați de bancă doar dacă creditul se aprobă.",
            },
            {
              icon: TrendingDown,
              title: "Dobânzi negociate",
              desc: "Avem acorduri speciale cu băncile care ne permit să obținem dobânzi sub oferta publică standard.",
            },
            {
              icon: Users,
              title: "Broker dedicat",
              desc: "Primești un broker personal care te însoțește de la aplicare până la semnarea contractului.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="bg-white border border-[#E5E3D9] rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[#0A1A2E]/8 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-[#0A1A2E]" />
                </div>
                <h3 className="font-semibold text-[#0A1A2E] mb-2">{item.title}</h3>
                <p className="text-sm text-[#5A6478] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#C6A667] py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1A2E] mb-4">
            Gata să obții cel mai bun credit?
          </h2>
          <p className="text-[#0A1A2E]/70 mb-8 text-lg">
            Trimite cererea gratuit și brokerul tău te contactează în maxim 24h cu oferta personalizată.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/aplica">
              <button className="bg-[#0A1A2E] hover:bg-[#132846] text-white font-semibold px-8 py-3 rounded-xl transition-colors flex items-center gap-2">
                Aplică acum gratuit
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/calculator">
              <button className="bg-white text-[#0A1A2E] hover:bg-white/90 font-medium px-8 py-3 rounded-xl transition-colors">
                Calculează mai întâi
              </button>
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-[#0A1A2E]/60">
            <Phone className="h-4 w-4" />
            <span className="text-sm">Sau sună direct: <a href="tel:0799715101" className="font-semibold text-[#0A1A2E] hover:underline">0799 715 101</a></span>
          </div>
        </div>
      </section>
    </div>
  );
}
