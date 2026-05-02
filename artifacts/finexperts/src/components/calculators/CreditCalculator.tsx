import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Slider } from "@/components/ui/slider";
import { banks, calculateMonthlyPayment, formatRON } from "@/lib/data";
import { TrendingDown, Info, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

export function SliderInput({
  label, value, min, max, step, onChange, format, testId,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; format?: (v: number) => string; testId?: string;
}) {
  const [editing, setEditing] = useState(false);
  const display = format ? format(value) : value.toLocaleString("ro-RO");
  const commit = (s: string) => {
    const n = parseFloat(s.replace(/[^0-9.]/g, ""));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
    setEditing(false);
  };
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">{label}</span>
        {editing ? (
          <input autoFocus type="number" defaultValue={value}
            className="w-36 text-right text-sm font-bold text-[#0C1A2E] border-b-2 border-[#C49A20] bg-transparent focus:outline-none"
            onBlur={e => commit(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") commit((e.target as HTMLInputElement).value); }} />
        ) : (
          <button onClick={() => setEditing(true)}
            className="text-sm font-bold text-[#0C1A2E] hover:text-[#C49A20] transition-colors border-b border-dashed border-[#C49A20]/40 hover:border-[#C49A20]"
            title="Click pentru a edita manual">{display}</button>
        )}
      </div>
      <Slider data-testid={testId} min={min} max={max} step={step} value={[value]}
        onValueChange={([v]) => onChange(v)} className="mb-1" />
      <div className="flex justify-between text-[10px] text-[#64748B]">
        <span>{format ? format(min) : min.toLocaleString("ro-RO")}</span>
        <span>{format ? format(max) : max.toLocaleString("ro-RO")}</span>
      </div>
    </div>
  );
}

export function CreditCalculator({ type }: { type: "personal" | "ipotecar" }) {
  const isIp = type === "ipotecar";
  const [amount, setAmount] = useState(isIp ? 150000 : 30000);
  const [months, setMonths] = useState(isIp ? 120 : 36);
  const [rate, setRate] = useState(isIp ? 4.85 : 5.55);
  const [dtiOpen, setDtiOpen] = useState(false);
  const [venit, setVenit] = useState(5000);
  const [obligatii, setObligatii] = useState(0);

  const monthly = useMemo(() => calculateMonthlyPayment(amount, rate, months), [amount, rate, months]);
  const total = monthly * months;
  const totalDobanda = total - amount;

  const sortedBanks = useMemo(() =>
    [...banks].sort((a, b) => (type === "personal" ? a.ratePersonal - b.ratePersonal : a.rateIpotecar - b.rateIpotecar)),
    [type]);
  const bestBank = sortedBanks[0];
  const bestRate = type === "personal" ? bestBank.ratePersonal : bestBank.rateIpotecar;
  const bestMonthly = calculateMonthlyPayment(amount, bestRate, months);
  const bestDae = type === "personal" ? bestBank.daePersonal : bestBank.daeIpotecar;

  const dtiMax = venit * 0.4 - obligatii;
  const dtiOk = monthly <= dtiMax;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px]">
      {/* Left — sliders */}
      <div className="p-6 lg:p-8 border-r border-[#E2E8F0]">
        <p className="text-xs text-[#64748B] mb-5 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C49A20]" />
          Click pe orice cifră pentru a introduce valoarea manual
        </p>
        <SliderInput label={isIp ? "Valoare imobil" : "Sumă dorită"} value={amount}
          min={isIp ? 30000 : 1000} max={isIp ? 600000 : 250000}
          step={isIp ? 5000 : 1000} onChange={setAmount}
          format={formatRON} testId="slider-amount" />
        <SliderInput label="Perioadă rambursare" value={months}
          min={isIp ? 12 : 6} max={isIp ? 360 : 60}
          step={isIp ? 12 : 6} onChange={setMonths}
          format={v => `${v} luni (${(v / 12).toFixed(1)} ani)`} testId="slider-months" />
        <SliderInput label="Dobândă estimativă" value={rate}
          min={isIp ? 3.0 : 4.0} max={isIp ? 12.0 : 18.0}
          step={0.01} onChange={v => setRate(Math.round(v * 100) / 100)}
          format={v => `${v.toFixed(2)}%`} testId="slider-rate" />

        {/* DTI */}
        <div className="border border-[#E2E8F0] rounded-xl overflow-hidden mt-2">
          <button onClick={() => setDtiOpen(!dtiOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#0C1A2E] hover:bg-[#F5F7FA] transition-colors">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-[#64748B]" />
              <span>Verifică gradul de îndatorare (DTI 40% BNR) — opțional</span>
            </div>
            {dtiOpen ? <ChevronUp className="h-4 w-4 text-[#64748B]" /> : <ChevronDown className="h-4 w-4 text-[#64748B]" />}
          </button>
          {dtiOpen && (
            <div className="px-4 pb-4 border-t border-[#E2E8F0] bg-[#F5F7FA]">
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="text-xs text-[#64748B] block mb-1">Venit net lunar (RON)</label>
                  <input type="number" value={venit}
                    onChange={e => setVenit(parseFloat(e.target.value) || 0)}
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-[#0C1A2E]" />
                </div>
                <div>
                  <label className="text-xs text-[#64748B] block mb-1">Rate alte credite (RON/lună)</label>
                  <input type="number" value={obligatii}
                    onChange={e => setObligatii(parseFloat(e.target.value) || 0)}
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-[#0C1A2E]" />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="bg-white rounded-lg p-2 border border-[#E2E8F0]">
                  <div className="text-xs text-[#64748B] mb-0.5">Plafon 40%</div>
                  <div className="text-sm font-bold text-[#0C1A2E]">{formatRON(venit * 0.4)}</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-[#E2E8F0]">
                  <div className="text-xs text-[#64748B] mb-0.5">Rate existente</div>
                  <div className="text-sm font-bold text-[#0C1A2E]">{formatRON(obligatii)}</div>
                </div>
                <div className={`rounded-lg p-2 border ${dtiOk ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                  <div className="text-xs text-[#64748B] mb-0.5">Rată max posibilă</div>
                  <div className={`text-sm font-bold ${dtiOk ? "text-[#2E7D5B]" : "text-[#C4432F]"}`}>{formatRON(Math.max(0, dtiMax))}</div>
                </div>
              </div>
              <div className={`mt-3 text-sm font-medium flex items-center gap-2 ${dtiOk ? "text-[#2E7D5B]" : "text-[#C4432F]"}`}>
                <div className={`w-2 h-2 rounded-full ${dtiOk ? "bg-[#2E7D5B]" : "bg-[#C4432F]"}`} />
                {dtiOk
                  ? `Te încadrezi în limita BNR (rata ${formatRON(Math.round(monthly))} ≤ ${formatRON(Math.round(dtiMax))})`
                  : `Nu te încadrezi — rata depășește plafonul de 40% DTI`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right — results */}
      <div className="bg-[#0C1A2E] p-6 lg:p-8 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Rată lunară estimativă</div>
        <div className="text-5xl font-bold text-white mb-1">{Math.round(monthly).toLocaleString("ro-RO")} RON</div>
        <div className="text-sm text-gray-400 mb-6">pe lună, timp de {months} luni</div>
        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/10">
          <div><div className="text-xs text-gray-400 mb-1">Total rambursat</div><div className="text-base font-semibold text-white">{formatRON(total)}</div></div>
          <div><div className="text-xs text-gray-400 mb-1">Cost total dobândă</div><div className="text-base font-semibold text-white">{formatRON(totalDobanda)}</div></div>
        </div>
        {bestBank && (
          <div className="bg-white/8 rounded-xl p-4 mb-5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C49A20] mb-2">
              <TrendingDown className="h-3.5 w-3.5" />Cea mai bună ofertă azi
            </div>
            <div className="flex items-center gap-2 mb-1">
              <img src={bestBank.logo} alt={bestBank.name}
                className="w-6 h-6 rounded object-contain bg-white p-0.5"
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <span className="text-sm font-medium text-white">{bestBank.name}</span>
              <span className="ml-auto text-sm font-bold text-white">{Math.round(bestMonthly).toLocaleString("ro-RO")} RON/lună</span>
            </div>
            <div className="text-xs text-gray-400">Dobândă {bestRate.toFixed(2)}% · DAE {bestDae.toFixed(2)}%</div>
          </div>
        )}
        <div className="space-y-2 mb-5">
          {sortedBanks.slice(0, 3).map((bank, i) => {
            const r = type === "personal" ? bank.ratePersonal : bank.rateIpotecar;
            const m = calculateMonthlyPayment(amount, r, months);
            return (
              <div key={bank.id} className={`flex items-center justify-between py-1.5 px-2 rounded-lg ${i === 0 ? "bg-[#C49A20]/10" : ""}`}>
                <div className="flex items-center gap-2">
                  <img src={bank.logo} alt={bank.name} className="w-5 h-5 rounded object-contain bg-white p-0.5"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <span className="text-xs text-gray-300">{bank.name}</span>
                </div>
                <span className="text-xs font-bold text-white">{Math.round(m).toLocaleString("ro-RO")} RON</span>
              </div>
            );
          })}
        </div>
        <Link href="/aplica">
          <button className="w-full bg-[#C49A20] hover:bg-[#b09255] text-[#0C1A2E] font-semibold text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
            Aplică pentru acest credit <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}
