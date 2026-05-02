import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Slider } from "@/components/ui/slider";
import { banks, calculateMonthlyPayment, formatRON } from "@/lib/data";
import { Star, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Comparator bănci</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0C1A2E] leading-tight mb-3">
            Compară cele 11 bănci<br />românești.
          </h1>
          <p className="text-[#64748B] text-base max-w-xl">
            Setează suma și durata dorită; vei vedea rata lunară exactă pentru fiecare bancă, plus DAE și rating.
          </p>
        </div>

        {/* Sliders + tab panel */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 mb-6">
          <div className="flex gap-2 mb-5">
            <button
              data-testid="tab-ipotecar"
              onClick={() => { setActiveType("ipotecar"); setAmount(150000); setMonths(120); }}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeType === "ipotecar" ? "bg-[#0C1A2E] text-white" : "text-[#64748B] hover:text-[#0C1A2E]"
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
                activeType === "personal" ? "bg-[#0C1A2E] text-white" : "text-[#64748B] hover:text-[#0C1A2E]"
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
                <span className="text-sm font-semibold text-[#0C1A2E]">{formatRON(amount)}</span>
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
                <span className="text-sm font-semibold text-[#0C1A2E]">{months} luni</span>
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
                  ? "bg-[#0C1A2E] text-white border-[#0C1A2E]"
                  : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0C1A2E] hover:text-[#0C1A2E]"
              }`}
            >
              ↕ {label}
            </button>
          ))}
        </div>

        {/* Banks table */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr_auto] items-center px-5 py-3 bg-[#F5F7FA] border-b border-[#E2E8F0]">
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
              className="grid grid-cols-[2fr_1fr_1fr_1.5fr_auto] items-center px-5 py-4 border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F5F7FA]/50 transition-colors"
            >
              {/* Bank logo + info */}
              <div className="flex items-center gap-3 min-w-0">
                <BankLogo logo={bank.logo} name={bank.name} initials={bank.initials} color={bank.color} />
                <div className="min-w-0">
                  <div className="font-semibold text-[#0C1A2E] text-sm truncate">{bank.name}</div>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <div className="flex items-center gap-1">
                      <StarRating rating={bank.rating} />
                      <span className="text-[10px] text-[#64748B]">• #{bank.rank}</span>
                    </div>
                    {bank.badge && (
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: (bank.badgeColor || "#64748B") + "18",
                          color: bank.badgeColor || "#64748B"
                        }}
                      >
                        {bank.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Dobândă */}
              <div className="text-center">
                <span className="text-sm font-semibold text-[#0C1A2E]">{bank.rate.toFixed(2)}%</span>
              </div>

              {/* DAE */}
              <div className="text-center">
                <span className="text-sm text-[#64748B]">{bank.dae.toFixed(2)}%</span>
              </div>

              {/* Rată */}
              <div className="text-right">
                <div className="text-sm font-bold text-[#0C1A2E]">{Math.round(bank.monthly).toLocaleString("ro-RO")} RON</div>
                <div className="text-xs text-[#64748B]">Total: {formatRON(Math.round(bank.total))}</div>
              </div>

              {/* Acțiuni */}
              <div className="flex items-center gap-2 pl-3">
                <Link href={`/banci/${bank.slug}`}>
                  <button className="px-3 py-1.5 text-xs font-medium border border-[#E2E8F0] rounded-lg text-[#0C1A2E] hover:border-[#0C1A2E] transition-colors whitespace-nowrap">
                    Detalii
                  </button>
                </Link>
                <Link href="/aplica">
                  <button className="px-3 py-1.5 text-xs font-medium bg-[#0C1A2E] text-white rounded-lg hover:bg-[#132846] transition-colors flex items-center gap-1 whitespace-nowrap">
                    Aplică <ArrowRight className="h-3 w-3" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
