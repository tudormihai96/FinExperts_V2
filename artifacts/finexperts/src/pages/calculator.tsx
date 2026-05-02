import React, { useState, useMemo } from "react";
import { Link } from "wouter";
import { Slider } from "@/components/ui/slider";
import { banks, calculateMonthlyPayment, formatRON } from "@/lib/data";
import { FileText, TrendingDown, Table, ArrowRight, Info, ChevronDown, ChevronUp, Sparkles, Star } from "lucide-react";

// ─── Shared SliderInput ───────────────────────────────────────────────────────
function SliderInput({
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

// ─── Calculator Credit (personal + ipotecar) ─────────────────────────────────
function CreditCalculator({ type }: { type: "personal" | "ipotecar" }) {
  const isIp = type === "ipotecar";
  const [amount, setAmount] = useState(isIp ? 150000 : 30000);
  const [months, setMonths] = useState(isIp ? 120 : 36);
  const [rate, setRate] = useState(isIp ? 4.85 : 5.55);
  const maxAmount = isIp ? 600000 : 250000;
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
      {/* Left */}
      <div className="p-6 lg:p-8 border-r border-[#E2E8F0]">
        <p className="text-xs text-[#64748B] mb-5 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C49A20]" />
          Click pe orice cifră pentru a introduce valoarea manual
        </p>
        <SliderInput label="Sumă dorită" value={amount}
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
                {dtiOk ? `Te încadrezi în limita BNR (rata ${formatRON(Math.round(monthly))} ≤ ${formatRON(Math.round(dtiMax))})` : `Nu te încadrezi — rata depășește plafonul de 40% DTI`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="bg-[#0C1A2E] p-6 lg:p-8 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Rată lunară estimativă</div>
        <div data-testid="result-monthly" className="text-5xl font-bold text-white mb-1">{Math.round(monthly).toLocaleString("ro-RO")} RON</div>
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
        {/* Top 3 mini */}
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

// ─── Suma Maximă ─────────────────────────────────────────────────────────────
function MaxLoanCalculator() {
  const [activeType, setActiveType] = useState<"personal" | "ipotecar">("personal");
  const [venit, setVenit] = useState(5000);
  const [rateAlte, setRateAlte] = useState(0);
  const [perioada, setPerioada] = useState(60);

  const result = useMemo(() => {
    const bestRate = activeType === "personal" ? 5.55 : 4.69;
    const rataMaxima = venit * 0.4 - rateAlte;
    if (rataMaxima <= 0) return { maxLoan: 0, rataMaxima: 0, bestRate };
    const r = bestRate / 12 / 100;
    const maxLoan = r === 0 ? rataMaxima * perioada
      : rataMaxima * (Math.pow(1 + r, perioada) - 1) / (r * Math.pow(1 + r, perioada));
    return { maxLoan: Math.max(0, maxLoan), rataMaxima, bestRate };
  }, [activeType, venit, rateAlte, perioada]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px]">
      <div className="p-6 lg:p-8 border-r border-[#E2E8F0]">
        <div className="flex gap-2 mb-6">
          {(["personal", "ipotecar"] as const).map(t => (
            <button key={t} onClick={() => setActiveType(t)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeType === t ? "bg-[#0C1A2E] text-white" : "border border-[#E2E8F0] text-[#64748B] hover:text-[#0C1A2E]"}`}>
              {t === "personal" ? "Credit de Nevoi Personale" : "Credit ipotecar"}
            </button>
          ))}
        </div>
        <p className="text-xs text-[#64748B] mb-5 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C49A20]" />
          Click pe cifre pentru a introduce valorile manual
        </p>
        <SliderInput label="Venit net lunar (RON)" value={venit} min={1000} max={30000} step={500}
          onChange={setVenit} format={v => `${v.toLocaleString("ro-RO")} RON`} testId="slider-venit" />
        <SliderInput label="Rate la alte credite (RON/lună)" value={rateAlte} min={0} max={5000} step={100}
          onChange={setRateAlte} format={v => `${v.toLocaleString("ro-RO")} RON`} testId="slider-rate-alte" />
        <SliderInput label="Perioadă rambursare" value={perioada}
          min={activeType === "personal" ? 6 : 12} max={activeType === "personal" ? 60 : 360}
          step={activeType === "personal" ? 6 : 12} onChange={setPerioada}
          format={v => `${v} luni (${(v / 12).toFixed(1)} ani)`} testId="slider-perioada" />
      </div>
      <div className="bg-[#0C1A2E] p-6 lg:p-8 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sumă maximă disponibilă</div>
        {result.maxLoan > 0 ? (
          <>
            <div className="text-5xl font-bold text-white mb-1" data-testid="result-max-loan">{formatRON(Math.round(result.maxLoan))}</div>
            <div className="text-sm text-gray-400 mb-6">cu rată lunară până la {formatRON(Math.round(result.rataMaxima))}</div>
          </>
        ) : (
          <>
            <div className="text-3xl font-bold text-[#C4432F] mb-1">Nu te încadrezi</div>
            <div className="text-sm text-gray-400 mb-6">Obligațiile depășesc 40% din venit</div>
          </>
        )}
        <div className="bg-white/8 rounded-xl p-4 mb-5">
          <div className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-semibold">Calcul DTI detaliat</div>
          <div className="space-y-2">
            {[
              { label: "Venit net lunar", val: formatRON(venit) },
              { label: "Plafon 40% BNR", val: formatRON(venit * 0.4) },
              { label: "Rate existente", val: `- ${formatRON(rateAlte)}` },
            ].map(r => (
              <div key={r.label} className="flex justify-between text-sm">
                <span className="text-gray-400">{r.label}</span>
                <span className="text-white font-medium">{r.val}</span>
              </div>
            ))}
            <div className="border-t border-white/10 pt-2 flex justify-between text-sm">
              <span className="text-[#C49A20] font-semibold">Rată max nouă</span>
              <span className="text-[#C49A20] font-bold">{formatRON(Math.round(result.rataMaxima))}</span>
            </div>
          </div>
        </div>
        <Link href="/aplica">
          <button className="w-full bg-[#C49A20] hover:bg-[#b09255] text-[#0C1A2E] font-semibold text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
            Aplică pentru această sumă <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
        <div className="mt-4 flex items-start gap-2 text-xs text-gray-400">
          <Info className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#C49A20]" />
          Calcul la cea mai bună dobândă actuală ({result.bestRate}%). Banca poate aplica marje diferite.
        </div>
      </div>
    </div>
  );
}

// ─── Refinanțare ─────────────────────────────────────────────────────────────
function calcMonthly(p: number, r: number, n: number) {
  const m = r / 12 / 100;
  if (m === 0) return p / n;
  return p * m * Math.pow(1 + m, n) / (Math.pow(1 + m, n) - 1);
}

function RefinanceCalculator() {
  const [sold, setSold] = useState(80000);
  const [dobCurenta, setDobCurenta] = useState(9.50);
  const [luniRamase, setLuniRamase] = useState(48);
  const [comision, setComision] = useState(1.00);
  const [dobNoua, setDobNoua] = useState(5.55);
  const [perioadaNoua, setPerioadaNoua] = useState(48);
  const [taxaAnaliza, setTaxaAnaliza] = useState(500);

  const r = useMemo(() => {
    const rataActuala = calcMonthly(sold, dobCurenta, luniRamase);
    const comisionVal = sold * (comision / 100);
    const principalNou = sold + comisionVal + taxaAnaliza;
    const rataNoua = calcMonthly(principalNou, dobNoua, perioadaNoua);
    const totalCurent = rataActuala * luniRamase;
    const totalNou = rataNoua * perioadaNoua;
    const economiePerLuna = rataActuala - rataNoua;
    const economieTotal = totalCurent - totalNou;
    const recuperare = economiePerLuna > 0 ? (comisionVal + taxaAnaliza) / economiePerLuna : Infinity;
    return { rataActuala, rataNoua, comisionVal, principalNou, totalCurent, totalNou, economiePerLuna, economieTotal, recuperare };
  }, [sold, dobCurenta, luniRamase, comision, dobNoua, perioadaNoua, taxaAnaliza]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]">
      <div className="border-r border-[#E2E8F0]">
        {/* Creditul actual */}
        <div className="p-6 lg:p-8 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 bg-[#C49A20] rounded-full" />
            <span className="text-xs font-bold text-[#0C1A2E] uppercase tracking-wider">Creditul actual</span>
          </div>
          <p className="text-xs text-[#64748B] mb-5 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C49A20]" />Click pe cifre pentru valori manuale
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <SliderInput label="Sold rămas (RON)" value={sold} min={5000} max={500000} step={5000} onChange={setSold} format={formatRON} />
            <SliderInput label="Dobândă curentă (%)" value={dobCurenta} min={3} max={20} step={0.01}
              onChange={v => setDobCurenta(Math.round(v * 100) / 100)} format={v => `${v.toFixed(2)}%`} />
            <SliderInput label="Luni rămase" value={luniRamase} min={3} max={360} step={1} onChange={setLuniRamase} format={v => `${v} luni`} />
            <SliderInput label="Comision rambursare anticipată (%)" value={comision} min={0} max={3} step={0.01}
              onChange={v => setComision(Math.round(v * 100) / 100)} format={v => `${v.toFixed(2)}%`} />
          </div>
        </div>
        {/* Oferta nouă */}
        <div className="p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-5 bg-[#2E7D5B] rounded-full" />
            <span className="text-xs font-bold text-[#0C1A2E] uppercase tracking-wider">Oferta nouă</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <SliderInput label="Dobândă nouă (%)" value={dobNoua} min={3} max={18} step={0.01}
              onChange={v => setDobNoua(Math.round(v * 100) / 100)} format={v => `${v.toFixed(2)}%`} />
            <SliderInput label="Perioadă nouă (luni)" value={perioadaNoua} min={6} max={360} step={6} onChange={setPerioadaNoua} format={v => `${v} luni`} />
            <SliderInput label="Taxă analiză (RON)" value={taxaAnaliza} min={0} max={5000} step={100} onChange={setTaxaAnaliza} format={formatRON} />
          </div>
        </div>
      </div>
      {/* Result */}
      <div className="bg-[#0C1A2E] p-6 lg:p-8 flex flex-col rounded-b-xl lg:rounded-b-none lg:rounded-r-xl">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-4 w-4 text-[#C49A20]" />
          <span className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider">Rezultat refinanțare</span>
        </div>
        <div className="text-xs text-gray-400 mb-1">Economie totală</div>
        <div data-testid="result-economie-totala"
          className={`text-5xl font-bold mb-4 ${r.economieTotal >= 0 ? "text-white" : "text-[#C4432F]"}`}>
          {r.economieTotal < 0 && <span className="text-2xl mr-1">-</span>}
          {formatRON(Math.round(Math.abs(r.economieTotal)))}
        </div>
        <div className="grid grid-cols-2 gap-3 mb-5 pb-5 border-b border-white/10">
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Economie / lună</div>
            <div className={`text-xl font-bold ${r.economiePerLuna >= 0 ? "text-[#4ade80]" : "text-[#C4432F]"}`}>
              {r.economiePerLuna < 0 && "-"}{formatRON(Math.round(Math.abs(r.economiePerLuna)))}
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Recuperare costuri</div>
            <div className="text-xl font-bold text-white">{isFinite(r.recuperare) ? `${r.recuperare.toFixed(1)} luni` : "—"}</div>
          </div>
        </div>
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Comparație rate</div>
        <div className="space-y-2 flex-1">
          {[
            { label: "Rată actuală", val: formatRON(Math.round(r.rataActuala)), green: false },
            { label: "Rată nouă", val: formatRON(Math.round(r.rataNoua)), green: true },
            { label: "Comision rambursare", val: formatRON(Math.round(r.comisionVal)), green: false },
            { label: "Total rămas curent", val: formatRON(Math.round(r.totalCurent)), green: false },
            { label: "Total nou", val: formatRON(Math.round(r.totalNou)), green: r.totalNou < r.totalCurent },
          ].map(row => (
            <div key={row.label} className="flex justify-between py-1">
              <span className="text-xs text-gray-400">{row.label}</span>
              <span className={`text-xs font-semibold ${row.green ? "text-[#4ade80]" : "text-white"}`}>{row.val}</span>
            </div>
          ))}
        </div>
        <Link href="/aplica" className="mt-5 block">
          <button className="w-full bg-[#C49A20] hover:bg-[#b09255] text-[#0C1A2E] font-semibold text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
            Vreau să refinanțez <Sparkles className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}

// ─── Pagina principală ────────────────────────────────────────────────────────
type CalcTab = "personal" | "ipotecar" | "refinantare";

const TABS: { id: CalcTab; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "ipotecar", label: "Credit ipotecar", icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, desc: "Calculator credit imobiliar cu cele mai bune oferte ipotecare." },
  { id: "personal", label: "Credit de Nevoi Personale", icon: <FileText className="h-4 w-4" />, desc: "Rată lunară și cost total pentru credit de nevoi personale." },
  { id: "refinantare", label: "Refinanțare", icon: <TrendingDown className="h-4 w-4" />, desc: "Cât economisești prin mutarea creditului la o bancă mai ieftină." },
];

export default function CalculatorPage() {
  const [active, setActive] = useState<CalcTab>("ipotecar");
  const tab = TABS.find(t => t.id === active)!;

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Calculatoare credite</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0C1A2E] leading-tight mb-3">
            {tab.id === "personal" && <>Credit de Nevoi Personale,<br />la toate cele 11 bănci.</>}
            {tab.id === "ipotecar" && <>Rată credit ipotecar,<br />la toate cele 11 bănci.</>}
            {tab.id === "refinantare" && <>Cât economisești<br />prin <span className="text-[#C49A20]">refinanțare</span>?</>}
          </h1>
          <p className="text-[#64748B] text-base max-w-xl">{tab.desc}</p>
        </div>

        {/* Tab selector — card grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={`text-left p-4 rounded-xl border transition-all ${active === t.id
                ? "bg-[#0C1A2E] border-[#0C1A2E] text-white shadow-sm"
                : "bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#0C1A2E] hover:text-[#0C1A2E]"}`}>
              <div className={`mb-2 ${active === t.id ? "text-[#C49A20]" : "text-[#0C1A2E]"}`}>{t.icon}</div>
              <div className="text-sm font-semibold leading-tight">{t.label}</div>
            </button>
          ))}
        </div>

        {/* Calculator panel */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          {active === "personal" && <CreditCalculator key="personal" type="personal" />}
          {active === "ipotecar" && <CreditCalculator key="ipotecar" type="ipotecar" />}
          {active === "refinantare" && <RefinanceCalculator />}
        </div>

        {/* Bank rates table */}
        {(active === "personal" || active === "ipotecar") && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-[#0C1A2E] mb-4">Toate dobânzile — {active === "personal" ? "credit de nevoi personale" : "credit ipotecar"} (02.05.2026)</h2>
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#F5F7FA] border-b border-[#E2E8F0]">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Bancă</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Dobândă</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">DAE</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden md:table-cell">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {[...banks].sort((a, b) => active === "personal" ? a.ratePersonal - b.ratePersonal : a.rateIpotecar - b.rateIpotecar).map((bank, i) => {
                      const rate = active === "personal" ? bank.ratePersonal : bank.rateIpotecar;
                      const dae = active === "personal" ? bank.daePersonal : bank.daeIpotecar;
                      return (
                        <tr key={bank.id} className={i === 0 ? "bg-[#C49A20]/5" : "hover:bg-[#F5F7FA]"}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <img src={bank.logo} alt={bank.name} className="w-8 h-8 rounded-lg object-contain bg-white border border-[#E2E8F0] p-0.5"
                                  onError={e => {
                                    const el = e.target as HTMLImageElement;
                                    el.style.display = "none";
                                    el.nextElementSibling?.classList.remove("hidden");
                                  }} />
                                <div className="hidden w-8 h-8 rounded-lg flex items-center justify-center text-white text-[8px] font-bold"
                                  style={{ backgroundColor: bank.color }}>{bank.initials}</div>
                              </div>
                              <div>
                                <div className="font-medium text-[#0C1A2E]">{bank.name}</div>
                                {i === 0 && <div className="text-[10px] text-[#C49A20] font-bold">⭐ Cea mai bună</div>}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-[#0C1A2E]">{rate.toFixed(2)}%</td>
                          <td className="px-4 py-3 text-right text-[#64748B]">{dae.toFixed(2)}%</td>
                          <td className="px-4 py-3 text-right hidden md:table-cell">
                            <div className="flex items-center justify-end gap-1">
                              <Star className="h-3 w-3 fill-[#C49A20] text-[#C49A20]" />
                              <span className="text-[#64748B]">{bank.rating.toFixed(1)}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 bg-[#F5F7FA] border-t border-[#E2E8F0] text-xs text-[#64748B]">
                Dobânzi actualizate la 02.05.2026 de pe site-urile oficiale ale băncilor. IRCC T1/2026 = 5.58%.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
