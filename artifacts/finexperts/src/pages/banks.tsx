import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Slider } from "@/components/ui/slider";
import { banks, calculateMonthlyPayment, formatRON } from "@/lib/data";
import { Star, ArrowRight, TrendingDown, Info } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from "recharts";

const IRCC_HISTORY = [
  { q: "T2'22", v: 2.65 },
  { q: "T3'22", v: 5.00 },
  { q: "T4'22", v: 7.18 },
  { q: "T1'23", v: 8.00 },
  { q: "T2'23", v: 7.18 },
  { q: "T3'23", v: 6.37 },
  { q: "T4'23", v: 6.17 },
  { q: "T1'24", v: 6.17 },
  { q: "T2'24", v: 6.08 },
  { q: "T3'24", v: 5.89 },
  { q: "T4'24", v: 6.06 },
  { q: "T1'25", v: 6.06 },
  { q: "T2'25", v: 6.06 },
  { q: "T3'25", v: 5.68 },
  { q: "T4'25", v: 5.68 },
  { q: "T1'26", v: 5.68 },
  { q: "T2'26", v: 5.58 },
  { q: "T3'26*", v: 5.56 },
];

function IRCCSection() {
  const current = 5.58;
  const prev = 5.68;
  const est = 5.56;
  const diff = current - prev;
  return (
    <div className="mt-10 bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
      <div className="px-5 sm:px-7 py-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-[#C49A20] uppercase tracking-wider mb-1">Indicele de referință BNR</div>
          <h2 className="text-xl font-bold text-[#0B2E2E]">Evoluția IRCC — 2022–2026</h2>
          <p className="text-sm text-[#64748B] mt-1">
            IRCC (Indicele de Referință pentru Creditele Consumatorilor) se recalculează trimestrial de BNR.
            Creditele ipotecare cu dobândă variabilă se calculează ca IRCC + marjă fixă a băncii.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <div className="bg-[#0B2E2E] rounded-xl px-4 py-3 text-center min-w-[80px]">
            <div className="text-xs text-gray-400 mb-0.5">T2 2026</div>
            <div className="text-2xl font-extrabold text-white">{current}%</div>
            <div className={`text-[10px] font-semibold mt-0.5 flex items-center justify-center gap-0.5 ${diff < 0 ? "text-green-400" : "text-red-400"}`}>
              <TrendingDown className="h-2.5 w-2.5" />
              {diff > 0 ? "+" : ""}{diff.toFixed(2)} pp vs T1
            </div>
          </div>
          <div className="bg-[#F4F6FB] border border-[#E2E8F0] rounded-xl px-4 py-3 text-center min-w-[80px]">
            <div className="text-xs text-[#64748B] mb-0.5">T3 2026 est.</div>
            <div className="text-2xl font-extrabold text-[#0B2E2E]">{est}%</div>
            <div className="text-[10px] text-[#64748B] mt-0.5">Estimat BNR</div>
          </div>
        </div>
      </div>

      <div className="px-2 sm:px-4 pt-4 pb-2">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={IRCC_HISTORY} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="irccGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0B2E2E" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#0B2E2E" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="q" tick={{ fontSize: 9, fill: "#94A3B8" }} tickLine={false} axisLine={false} interval={1} />
            <YAxis domain={[0, 10]} tick={{ fontSize: 9, fill: "#94A3B8" }} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} width={32} />
            <Tooltip
              formatter={(val: number) => [`${val.toFixed(2)}%`, "IRCC"]}
              contentStyle={{ fontSize: 12, border: "1px solid #E2E8F0", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
              labelStyle={{ fontWeight: 600, color: "#0B2E2E" }}
            />
            <ReferenceLine y={current} stroke="#C49A20" strokeDasharray="5 3" strokeWidth={1.5} label={{ value: `${current}% actual`, fontSize: 9, fill: "#C49A20", position: "insideTopRight" }} />
            <Area type="monotone" dataKey="v" stroke="#0B2E2E" strokeWidth={2} fill="url(#irccGrad)" dot={{ r: 2.5, fill: "#0B2E2E", strokeWidth: 0 }} activeDot={{ r: 5, fill: "#C49A20", stroke: "#0B2E2E", strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="px-5 sm:px-7 py-4 border-t border-[#E2E8F0] bg-[#F4F6FB] flex items-start gap-2">
        <Info className="h-3.5 w-3.5 text-[#64748B] shrink-0 mt-0.5" />
        <p className="text-xs text-[#64748B]">
          <strong className="text-[#0B2E2E]">Cum îți afectează rata?</strong> Dacă ai un credit ipotecar variabil de 150.000 RON pe 25 ani cu marjă 2%, o scădere de 0,1 pp a IRCC înseamnă ~10 RON/lună mai puțin. De la vârful T1 2023 (8,00%) la valoarea actuală (5,58%) rata a scăzut cu ~250 RON/lună. <span className="text-[#C49A20] font-medium">*estimat</span>
        </p>
      </div>
    </div>
  );
}

type SortKey = "monthly" | "rate" | "dae" | "rating";

function BankLogo({ logo, name, initials, color }: { logo: string; name: string; initials: string; color: string }) {
  return (
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 overflow-hidden relative"
      style={{ backgroundColor: color }}
    >
      <img
        src={logo}
        alt={name}
        className="w-full h-full object-contain p-1"
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.style.display = "none";
          const span = img.nextElementSibling as HTMLElement;
          if (span) span.style.display = "flex";
        }}
      />
      <span
        className="absolute inset-0 items-center justify-center text-white text-xs font-bold"
        style={{ display: "none" }}
      >
        {initials}
      </span>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      <Star className="h-3 w-3 fill-[#C49A20] text-[#C49A20]" />
      <span className="text-xs text-[#64748B]">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function BanksPage() {
  const [activeType, setActiveType] = useState<"personal" | "ipotecar">("ipotecar");
  const [amount, setAmount] = useState(30000);
  const [months, setMonths] = useState(36);
  const [sortBy, setSortBy] = useState<SortKey>("monthly");

  const sortedBanks = useMemo(() => {
    return [...banks].map(bank => {
      const rate = activeType === "personal" ? bank.ratePersonal : bank.rateIpotecar;
      const dae = activeType === "personal" ? bank.daePersonal : bank.daeIpotecar;
      const monthly = calculateMonthlyPayment(amount, rate, months);
      const total = monthly * months;
      return { ...bank, rate, dae, monthly, total };
    }).sort((a, b) => {
      if (sortBy === "monthly") return a.monthly - b.monthly;
      if (sortBy === "rate") return a.rate - b.rate;
      if (sortBy === "dae") return a.dae - b.dae;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [activeType, amount, months, sortBy]);

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Comparator bănci</div>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#0B2E2E] leading-tight mb-3">
            Compară cele 11 bănci<br />românești.
          </h1>
          <p className="text-[#64748B] text-sm sm:text-base max-w-xl">
            Setează suma și durata dorită; vei vedea rata lunară exactă pentru fiecare bancă, plus DAE și rating.
          </p>
        </div>

        {/* Sliders + tab panel */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5 mb-5 sm:mb-6">
          <div className="flex gap-2 mb-5 flex-wrap">
            <button
              data-testid="tab-ipotecar"
              onClick={() => { setActiveType("ipotecar"); setAmount(150000); setMonths(120); }}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeType === "ipotecar" ? "bg-[#0B2E2E] text-white" : "text-[#64748B] hover:text-[#0B2E2E]"
              }`}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Credit ipotecar
            </button>
            <button
              data-testid="tab-personal"
              onClick={() => { setActiveType("personal"); setAmount(30000); setMonths(36); }}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeType === "personal" ? "bg-[#0B2E2E] text-white" : "text-[#64748B] hover:text-[#0B2E2E]"
              }`}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
              Credit de Nevoi Personale
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Sumă</span>
                <span className="text-sm font-semibold text-[#0B2E2E]">{formatRON(amount)}</span>
              </div>
              <Slider
                min={activeType === "personal" ? 1000 : 30000}
                max={activeType === "personal" ? 200000 : 600000}
                step={activeType === "personal" ? 1000 : 5000}
                value={[amount]}
                onValueChange={([v]) => setAmount(v)}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Perioadă</span>
                <span className="text-sm font-semibold text-[#0B2E2E]">{months} luni</span>
              </div>
              <Slider
                min={activeType === "personal" ? 6 : 12}
                max={activeType === "personal" ? 60 : 360}
                step={activeType === "personal" ? 6 : 12}
                value={[months]}
                onValueChange={([v]) => setMonths(v)}
              />
            </div>
          </div>
        </div>

        {/* Sort buttons */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-sm text-[#64748B] mr-1">Sortează:</span>
          {([
            { key: "monthly" as SortKey, label: "Rată lunară" },
            { key: "rate" as SortKey, label: "Dobândă" },
            { key: "dae" as SortKey, label: "DAE" },
            { key: "rating" as SortKey, label: "Rating" },
          ]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors flex items-center gap-1 ${
                sortBy === key
                  ? "bg-[#0B2E2E] text-white border-[#0B2E2E]"
                  : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0B2E2E] hover:text-[#0B2E2E]"
              }`}
            >
              ↕ {label}
            </button>
          ))}
        </div>

        {/* Banks table — desktop */}
        <div className="hidden sm:block bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr_auto] items-center px-5 py-3 bg-[#F4F6FB] border-b border-[#E2E8F0]">
            <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Banca</div>
            <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider text-center">Dobândă</div>
            <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider text-center">DAE</div>
            <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider text-right">Rată / lună</div>
            <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider text-right pr-1">Acțiune</div>
          </div>

          {sortedBanks.map((bank) => (
            <div
              key={bank.id}
              data-testid={`bank-row-${bank.id}`}
              className="grid grid-cols-[2fr_1fr_1fr_1.5fr_auto] items-center px-5 py-4 border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F4F6FB]/60 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <BankLogo logo={bank.logo} name={bank.name} initials={bank.initials} color={bank.color} />
                <div className="min-w-0">
                  <div className="font-semibold text-[#0B2E2E] text-sm truncate">{bank.name}</div>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <div className="flex items-center gap-1">
                      <StarRating rating={bank.rating} />
                      <span className="text-[10px] text-[#64748B]">• #{bank.rank}</span>
                    </div>
                    {bank.badge && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ backgroundColor: (bank.badgeColor || "#64748B") + "18", color: bank.badgeColor || "#64748B" }}>
                        {bank.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center"><span className="text-sm font-semibold text-[#0B2E2E]">{bank.rate.toFixed(2)}%</span></div>
              <div className="text-center"><span className="text-sm text-[#64748B]">{bank.dae.toFixed(2)}%</span></div>
              <div className="text-right">
                <div className="text-sm font-bold text-[#0B2E2E]">{Math.round(bank.monthly).toLocaleString("ro-RO")} RON</div>
                <div className="text-xs text-[#64748B]">Total: {formatRON(Math.round(bank.total))}</div>
              </div>
              <div className="flex items-center gap-2 pl-3">
                <Link href={`/banci/${bank.slug}`}>
                  <button className="px-3 py-1.5 text-xs font-medium border border-[#E2E8F0] rounded-lg text-[#0B2E2E] hover:border-[#0B2E2E] transition-colors whitespace-nowrap">Detalii</button>
                </Link>
                <Link href="/aplica">
                  <button className="px-3 py-1.5 text-xs font-medium bg-[#0B2E2E] text-white rounded-lg hover:bg-[#132846] transition-colors flex items-center gap-1 whitespace-nowrap">
                    Aplică <ArrowRight className="h-3 w-3" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Banks cards — mobile */}
        <div className="sm:hidden space-y-3" data-section="mobile-banks">
          {sortedBanks.map((bank, idx) => (
            <div
              key={bank.id}
              data-testid={`bank-row-${bank.id}`}
              className={`bg-white border rounded-2xl p-4 ${idx === 0 ? "border-[#C49A20]" : "border-[#E2E8F0]"}`}
            >
              {idx === 0 && (
                <div className="text-[9px] font-bold text-[#C49A20] uppercase tracking-wider mb-2">⭐ Cea mai bună ofertă</div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <BankLogo logo={bank.logo} name={bank.name} initials={bank.initials} color={bank.color} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#0B2E2E] text-sm">{bank.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StarRating rating={bank.rating} />
                    {bank.badge && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ backgroundColor: (bank.badgeColor || "#64748B") + "18", color: bank.badgeColor || "#64748B" }}>
                        {bank.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3 bg-[#F4F6FB] rounded-xl p-3">
                <div className="text-center">
                  <div className="text-[10px] text-[#64748B] mb-0.5">Dobândă</div>
                  <div className="text-sm font-bold text-[#0B2E2E]">{bank.rate.toFixed(2)}%</div>
                </div>
                <div className="text-center border-x border-[#E2E8F0]">
                  <div className="text-[10px] text-[#64748B] mb-0.5">DAE</div>
                  <div className="text-sm font-semibold text-[#0B2E2E]">{bank.dae.toFixed(2)}%</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-[#64748B] mb-0.5">Rată/lună</div>
                  <div className="text-sm font-bold text-[#0B2E2E]">{Math.round(bank.monthly).toLocaleString("ro-RO")}</div>
                  <div className="text-[9px] text-[#94A3B8]">RON</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/banci/${bank.slug}`} className="flex-1">
                  <button className="w-full py-2 text-xs font-medium border border-[#E2E8F0] rounded-xl text-[#0B2E2E] hover:border-[#0B2E2E] transition-colors">Detalii</button>
                </Link>
                <Link href="/aplica" className="flex-1">
                  <button className="w-full py-2 text-xs font-semibold bg-[#0B2E2E] text-white rounded-xl flex items-center justify-center gap-1">
                    Aplică <ArrowRight className="h-3 w-3" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <IRCCSection />
      </div>
    </div>
  );
}
