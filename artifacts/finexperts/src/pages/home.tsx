import { useState } from "react";
import { Link } from "wouter";
import { banks, calculateMonthlyPayment } from "@/lib/data";
import { Star, ArrowRight, ShieldCheck, Users, TrendingDown } from "lucide-react";

const BANKS_HOME = [
  "ING Bank", "BCR", "BRD", "Raiffeisen Bank", "Garanti BBVA",
  "UniCredit Bank", "Intesa Sanpaolo Bank", "Exim Bank",
  "Libra Bank", "Patria Bank", "Nexent Bank"
];

export default function HomePage() {
  const [activeType, setActiveType] = useState<"personal" | "ipotecar">("personal");

  const topBanks = [...banks]
    .sort((a, b) => (activeType === "personal" ? a.ratePersonal - b.ratePersonal : a.rateIpotecar - b.rateIpotecar))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      {/* Hero section */}
      <section className="bg-[#0A1A2E] pt-16 pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-[#C6A667]/40 rounded-full px-3 py-1 mb-6">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C6A667]" />
              <span className="text-xs text-[#C6A667] font-medium">Partener oficial KIWI Finance</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              Cel mai bun credit.<br />
              <span className="text-[#C6A667]">Fără stres.</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Compară rata lunară la toate cele 11 bănci din România. Calculatoare gratuite, consilier dedicat, aprobare garantată.
            </p>
            <div className="flex gap-3 flex-wrap mb-12">
              <Link href="/calculator">
                <button className="bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2">
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

          {/* Bank chips row */}
          <div className="flex flex-wrap gap-2 pb-8 border-t border-white/10 pt-6">
            <span className="text-xs text-gray-500 mr-1 self-center">11 bănci partenere:</span>
            {BANKS_HOME.map((name, i) => {
              const bank = banks.find(b => b.name === name);
              return (
                <div
                  key={i}
                  className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-2.5 py-1"
                >
                  {bank && (
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: bank.color, fontSize: "7px", fontWeight: 700 }}
                    >
                      {bank.initials.slice(0, 1)}
                    </div>
                  )}
                  <span className="text-xs text-gray-300">{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-[#E5E3D9]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E5E3D9]">
            {[
              { value: "12+", label: "ani experiență" },
              { value: "11", label: "bănci partenere" },
              { value: "500+", label: "clienți serviți" },
              { value: "98%", label: "rată aprobare" },
            ].map((stat, i) => (
              <div key={i} className="py-5 px-6 text-center">
                <div className="text-2xl font-bold text-[#0A1A2E]">{stat.value}</div>
                <div className="text-xs text-[#5A6478]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top rates section */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <div className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider mb-2">Oferte active</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A1A2E]">Cele mai bune dobânzi acum.</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveType("personal")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeType === "personal" ? "bg-[#0A1A2E] text-white" : "border border-[#E5E3D9] text-[#5A6478] hover:text-[#0A1A2E]"
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => setActiveType("ipotecar")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeType === "ipotecar" ? "bg-[#0A1A2E] text-white" : "border border-[#E5E3D9] text-[#5A6478] hover:text-[#0A1A2E]"
              }`}
            >
              Ipotecar
            </button>
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
                data-testid={`home-bank-card-${bank.id}`}
                className={`bg-white border rounded-xl p-5 hover:shadow-sm transition-shadow ${idx === 0 ? "border-[#C6A667]" : "border-[#E5E3D9]"}`}
              >
                {idx === 0 && (
                  <div className="text-[10px] font-bold text-[#C6A667] uppercase tracking-wider mb-2">⭐ Cea mai bună ofertă</div>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: bank.color }}
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
      </section>

      {/* How it works */}
      <section className="bg-[#0A1A2E] py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider mb-3">Proces simplu</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              De la idee la aprobare în 3 pași.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Calculezi rata",
                desc: "Folosești calculatorul pentru a vedea rata lunară la fiecare bancă. Fără cont, fără date personale.",
              },
              {
                step: "02",
                title: "Trimiți formularul",
                desc: "Completezi datele de contact o singură dată. Un consultant FinExperts te va contacta în 24h.",
              },
              {
                step: "03",
                title: "Primești aprobarea",
                desc: "Consultantul negociază oferta cu banca și te ghidează pas cu pas prin semnare.",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="text-4xl font-bold text-[#C6A667]/30 shrink-0">{item.step}</div>
                <div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why FinExperts */}
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
              desc: "Nu percepem niciun cost față de tine. Suntem remunerați de bancă dacă creditul se aprobă.",
            },
            {
              icon: TrendingDown,
              title: "Dobânzi negociate",
              desc: "Avem acorduri speciale cu băncile care ne permit să obținem dobânzi sub oferta publică.",
            },
            {
              icon: Users,
              title: "Consilier dedicat",
              desc: "Primești un consultant personal care te însoțește de la aplicare până la semnarea contractului.",
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

      {/* CTA Banner */}
      <section className="bg-[#C6A667] py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1A2E] mb-4">
            Gata să obții cel mai bun credit?
          </h2>
          <p className="text-[#0A1A2E]/70 mb-8 text-lg">
            Trimite formularul gratuit și primești oferta personalizată în 24h.
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
        </div>
      </section>
    </div>
  );
}
