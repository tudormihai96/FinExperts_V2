import { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import { Slider } from "@/components/ui/slider";
import { banks, calculateMonthlyPayment, formatRON, getCurrentIRCC, getCurrentIRCCLabel } from "@/lib/data";
import { TrendingDown, Info, ChevronDown, ChevronUp, ArrowRight, RefreshCw } from "lucide-react";

const IRCC = getCurrentIRCC();
const IRCC_LABEL = getCurrentIRCCLabel();
const FALLBACK_EUR_RATE = 5.14; // fallback dacă BNR nu răspunde

const BEST_RATE_PERSONAL = 4.99;  // Raiffeisen Flexicredit / Garanti BBVA
const BEST_RATE_IPOTECAR = +(IRCC + 1.70).toFixed(2); // BRD — cea mai mică marjă

// ── Hook: curs EUR/RON live de la BNR (prin /api/bnr-rate) ──────────────────
function useBnrRate() {
  const [bnrRate, setBnrRate] = useState<number>(FALLBACK_EUR_RATE);
  const [rateDate, setRateDate] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchRate() {
      try {
        const res = await fetch("/api/bnr-rate");
        if (!res.ok) throw new Error("BNR fetch failed");
        const data = await res.json();
        if (!cancelled && data.eurRate) {
          setBnrRate(data.eurRate);
          setRateDate(data.publishingDate ?? "");
        }
      } catch {
        // keep fallback silently
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchRate();
    return () => { cancelled = true; };
  }, []);

  return { bnrRate, rateDate, loading };
}

// ── SliderInput ──────────────────────────────────────────────────────────────
export function SliderInput({
  label, value, min, max, step, onChange, format, testId, sublabel,
}: {
  label: string; sublabel?: string; value: number; min: number; max: number; step: number;
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
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1.5">
        <div>
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">{label}</span>
          {sublabel && <span className="text-[10px] text-[#94A3B8] ml-2">{sublabel}</span>}
        </div>
        {editing ? (
          <input autoFocus type="number" defaultValue={value}
            className="w-36 text-right text-sm font-bold text-[#0B2E2E] border-b-2 border-[#C49A20] bg-transparent focus:outline-none"
            onBlur={e => commit(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") commit((e.target as HTMLInputElement).value); }} />
        ) : (
          <button onClick={() => setEditing(true)}
            className="text-sm font-bold text-[#0B2E2E] hover:text-[#C49A20] transition-colors border-b border-dashed border-[#C49A20]/40 hover:border-[#C49A20]"
            title="Click pentru a edita manual">{display}</button>
        )}
      </div>
      <Slider data-testid={testId} min={min} max={max} step={step} value={[value]}
        onValueChange={([v]) => onChange(v)} className="mb-1" />
      <div className="flex justify-between text-[10px] text-[#94A3B8]">
        <span>{format ? format(min) : min.toLocaleString("ro-RO")}</span>
        <span>{format ? format(max) : max.toLocaleString("ro-RO")}</span>
      </div>
    </div>
  );
}

// ── CreditCalculator ─────────────────────────────────────────────────────────
export function CreditCalculator({ type }: { type: "personal" | "ipotecar" }) {
  const isIp = type === "ipotecar";

  const { bnrRate, rateDate, loading: rateLoading } = useBnrRate();
  const [customEurRate, setCustomEurRate] = useState<number | null>(null);
  const [eurRateEditing, setEurRateEditing] = useState(false);
  const eurRate = customEurRate ?? bnrRate;
  const isCustomRate = customEurRate !== null && customEurRate !== bnrRate;

  function commitEurRate(val: string) {
    const n = parseFloat(val.replace(",", "."));
    if (!isNaN(n) && n > 1 && n < 20) setCustomEurRate(Math.round(n * 10000) / 10000);
    setEurRateEditing(false);
  }

  // Currency
  const [currency, setCurrency] = useState<"RON" | "EUR">("RON");

  // Avans — checkbox "Dețin deja un imobil"
  const [ownsProperty, setOwnsProperty] = useState(false);
  const minAvans = ownsProperty ? 25 : 15;
  const [avansPct, setAvansPct] = useState(15);
  const effectiveAvansPct = Math.max(avansPct, minAvans);

  // When checkbox changes, snap avans to new minimum
  function handleOwnsPropertyChange(checked: boolean) {
    setOwnsProperty(checked);
    setAvansPct(checked ? 25 : 15);
  }

  // Amount — always RON internally
  const [amount, setAmount] = useState(isIp ? 300000 : 30000);
  const [months, setMonths] = useState(isIp ? 240 : 36);
  const [rate, setRate] = useState(isIp ? BEST_RATE_IPOTECAR : BEST_RATE_PERSONAL);
  const [dtiOpen, setDtiOpen] = useState(false);
  const [venit, setVenit] = useState(5000);
  const [obligatii, setObligatii] = useState(0);

  // Credit amount = property value minus avans
  const creditAmount = isIp ? amount * (1 - effectiveAvansPct / 100) : amount;
  const avansRON = isIp ? amount * effectiveAvansPct / 100 : 0;

  // Format helpers
  const fmtRON = (v: number) => formatRON(Math.round(v));
  const fmtEUR = (v: number) => `€${Math.round(v / eurRate).toLocaleString("ro-RO")}`;
  const fmtCur = (v: number) => currency === "EUR" ? fmtEUR(v) : fmtRON(v);
  const fmtSlider = (v: number) => currency === "EUR"
    ? `€${Math.round(v / eurRate).toLocaleString("ro-RO")}`
    : formatRON(v);

  const monthly = useMemo(() => calculateMonthlyPayment(creditAmount, rate, months), [creditAmount, rate, months]);
  const total = monthly * months;
  const totalDobanda = total - creditAmount;

  const sortedBanks = useMemo(() =>
    [...banks].sort((a, b) => (type === "personal" ? a.ratePersonal - b.ratePersonal : a.rateIpotecar - b.rateIpotecar)),
    [type]);
  const bestBank = sortedBanks[0];
  const bestRate = type === "personal" ? bestBank.ratePersonal : bestBank.rateIpotecar;
  const bestMonthly = calculateMonthlyPayment(creditAmount, bestRate, months);
  const bestDae = type === "personal" ? bestBank.daePersonal : bestBank.daeIpotecar;

  const dtiMax = venit * 0.4 - obligatii;
  const dtiOk = monthly <= dtiMax;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px]">
      {/* Left — sliders */}
      <div className="p-6 lg:p-8 border-r border-[#E2E8F0]">

        {/* Row: Currency toggle + checkbox imobil */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          {/* Currency toggle */}
          <div className="flex rounded-lg border border-[#E2E8F0] overflow-hidden">
            {(["RON", "EUR"] as const).map(c => (
              <button key={c} onClick={() => setCurrency(c)}
                className={`px-4 py-1.5 text-xs font-bold transition-colors ${currency === c ? "bg-[#0B2E2E] text-white" : "bg-white text-[#64748B] hover:bg-[#F5F7FA]"}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Owns property checkbox — only for ipotecar */}
          {isIp && (
            <label className="flex items-center gap-2 cursor-pointer select-none group">
              <div
                onClick={() => handleOwnsPropertyChange(!ownsProperty)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                  ownsProperty
                    ? "bg-[#0B2E2E] border-[#0B2E2E]"
                    : "bg-white border-[#CBD5E1] group-hover:border-[#0B2E2E]"
                }`}
              >
                {ownsProperty && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-xs font-medium text-[#334155]">
                Dețin deja un imobil{" "}
                <span className="text-[#94A3B8] font-normal">(avans minim 25%)</span>
              </span>
            </label>
          )}
        </div>

        {/* Info bar + EUR rate editable */}
        <div className="mb-4 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-[#94A3B8] flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C49A20] shrink-0" />
            Click pe orice cifră pentru a introduce valoarea manual
          </span>
          {currency === "EUR" && (
            <span className="ml-1 flex items-center gap-1 text-[10px]">
              {rateLoading ? (
                <span className="text-[#94A3B8] flex items-center gap-1">
                  <RefreshCw className="h-3 w-3 animate-spin" /> Se încarcă cursul BNR...
                </span>
              ) : (
                <>
                  <span className="text-[#94A3B8]">· 1 EUR =</span>
                  {eurRateEditing ? (
                    <input
                      autoFocus
                      type="number"
                      defaultValue={eurRate}
                      step="0.0001"
                      className="w-20 text-xs font-bold text-[#0B2E2E] border-b-2 border-[#C49A20] bg-transparent focus:outline-none text-center"
                      onBlur={e => commitEurRate(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") commitEurRate((e.target as HTMLInputElement).value); if (e.key === "Escape") setEurRateEditing(false); }}
                    />
                  ) : (
                    <button
                      onClick={() => setEurRateEditing(true)}
                      className={`font-bold border-b border-dashed transition-colors ${isCustomRate ? "text-[#C49A20] border-[#C49A20]" : "text-[#C49A20] border-[#C49A20]/50 hover:border-[#C49A20]"}`}
                      title="Click pentru a modifica cursul manual"
                    >
                      {eurRate.toFixed(4)}
                    </button>
                  )}
                  <span className="text-[#94A3B8]">RON</span>
                  {rateDate && !isCustomRate && <span className="text-[#94A3B8]">(BNR {rateDate})</span>}
                  {isCustomRate && (
                    <button
                      onClick={() => setCustomEurRate(null)}
                      className="text-[#94A3B8] hover:text-[#C49A20] underline transition-colors ml-0.5"
                      title="Resetează la cursul BNR"
                    >
                      ↺ BNR
                    </button>
                  )}
                </>
              )}
            </span>
          )}
        </div>

        {/* Property / loan value slider */}
        <SliderInput
          label={isIp ? "Valoare imobil" : "Sumă dorită"}
          sublabel={currency === "EUR" ? `(${fmtEUR(amount)})` : undefined}
          value={amount}
          min={isIp ? 30000 : 1000}
          max={isIp ? 2500000 : 250000}
          step={isIp ? 10000 : 1000}
          onChange={setAmount}
          format={fmtSlider}
          testId="slider-amount"
        />

        {/* Avans slider — only for ipotecar */}
        {isIp && (
          <div className="mb-5">
            <div className="flex justify-between items-center mb-1.5">
              <div>
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Avans</span>
                <span className="text-[10px] text-[#94A3B8] ml-2">
                  minim {minAvans}% conform BNR
                  {ownsProperty ? " (al 2-lea imobil)" : " (primul imobil)"}
                </span>
              </div>
              <span className="text-sm font-bold text-[#0B2E2E]">
                {effectiveAvansPct}% — {fmtCur(avansRON)}
              </span>
            </div>
            <Slider min={minAvans} max={80} step={1} value={[effectiveAvansPct]}
              onValueChange={([v]) => setAvansPct(v)} className="mb-1" />
            <div className="flex justify-between text-[10px] text-[#94A3B8]">
              <span>{minAvans}%</span>
              <span>80%</span>
            </div>
            {/* Credit = property - avans */}
            <div className="mt-2.5 bg-[#F0F4FF] border border-[#C6D2FF] rounded-lg px-3 py-2 flex items-center justify-between">
              <span className="text-xs text-[#3B4F99] font-medium">Credit solicitat (valoare − avans):</span>
              <span className="text-sm font-bold text-[#0B2E2E]">
                {fmtCur(creditAmount)}
                {currency === "RON" && <span className="text-xs text-[#64748B] font-normal ml-1">({fmtEUR(creditAmount)})</span>}
                {currency === "EUR" && <span className="text-xs text-[#64748B] font-normal ml-1">({fmtRON(creditAmount)})</span>}
              </span>
            </div>
          </div>
        )}

        <SliderInput label="Perioadă rambursare" value={months}
          min={isIp ? 12 : 6} max={isIp ? 360 : 60}
          step={isIp ? 12 : 6} onChange={setMonths}
          format={v => `${v} luni (${(v / 12).toFixed(1)} ani)`} testId="slider-months" />

        <SliderInput label="Dobândă estimativă" value={rate}
          min={isIp ? 3.0 : 3.0} max={isIp ? 14.0 : 20.0}
          step={0.01} onChange={v => setRate(Math.round(v * 100) / 100)}
          format={v => `${v.toFixed(2)}%`} testId="slider-rate"
          sublabel={isIp ? IRCC_LABEL + " + marjă" : undefined} />

        {/* Bank rate presets */}
        <div className="mb-5 -mt-3">
          <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider mb-2 font-semibold">Presetare rapidă pe bancă:</div>
          <div className="flex flex-wrap gap-1.5">
            {sortedBanks.map(bank => {
              const bankRate = type === "personal" ? bank.ratePersonal : bank.rateIpotecar;
              const isActive = Math.abs(rate - bankRate) < 0.005;
              const shortName = bank.name
                .replace("Raiffeisen Bank", "Raiffeisen")
                .replace("Garanti BBVA", "Garanti")
                .replace("Exim Banca Românească", "Exim")
                .replace("Intesa Sanpaolo Bank", "Intesa")
                .replace("Libra Internet Bank", "Libra")
                .replace("Nexent Bank", "Nexent");
              return (
                <button
                  key={bank.id}
                  onClick={() => setRate(bankRate)}
                  title={`${bank.name}: ${bankRate.toFixed(2)}%/an`}
                  className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                    isActive
                      ? "bg-[#0B2E2E] text-white border-[#0B2E2E]"
                      : "bg-white text-[#0B2E2E] border-[#E2E8F0] hover:border-[#0B2E2E] hover:bg-[#F4F6FB]"
                  }`}
                >
                  <img
                    src={bank.logo} alt="" aria-hidden
                    className="h-3 w-auto shrink-0" style={{ maxWidth: "16px" }}
                    onError={e => (e.target as HTMLImageElement).style.display = "none"}
                  />
                  <span>{shortName}</span>
                  <span className={isActive ? "text-[#C49A20]" : "text-[#94A3B8]"}>{bankRate.toFixed(2)}%</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DTI */}
        <div className="border border-[#E2E8F0] rounded-xl overflow-hidden mt-2">
          <button onClick={() => setDtiOpen(!dtiOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#0B2E2E] hover:bg-[#F5F7FA] transition-colors">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-[#64748B]" />
              <span className="text-xs">Verifică gradul de îndatorare (DTI 40% BNR) — opțional</span>
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
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-[#0B2E2E]" />
                </div>
                <div>
                  <label className="text-xs text-[#64748B] block mb-1">Rate alte credite (RON/lună)</label>
                  <input type="number" value={obligatii}
                    onChange={e => setObligatii(parseFloat(e.target.value) || 0)}
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-[#0B2E2E]" />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="bg-white rounded-lg p-2 border border-[#E2E8F0]">
                  <div className="text-xs text-[#64748B] mb-0.5">Plafon 40%</div>
                  <div className="text-sm font-bold text-[#0B2E2E]">{formatRON(venit * 0.4)}</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-[#E2E8F0]">
                  <div className="text-xs text-[#64748B] mb-0.5">Rate existente</div>
                  <div className="text-sm font-bold text-[#0B2E2E]">{formatRON(obligatii)}</div>
                </div>
                <div className={`rounded-lg p-2 border ${dtiOk ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                  <div className="text-xs text-[#64748B] mb-0.5">Rată max posibilă</div>
                  <div className={`text-sm font-bold ${dtiOk ? "text-[#2E7D5B]" : "text-[#C4432F]"}`}>{formatRON(Math.max(0, dtiMax))}</div>
                </div>
              </div>
              <div className={`mt-3 text-sm font-medium flex items-center gap-2 ${dtiOk ? "text-[#2E7D5B]" : "text-[#C4432F]"}`}>
                <div className={`w-2 h-2 rounded-full shrink-0 ${dtiOk ? "bg-[#2E7D5B]" : "bg-[#C4432F]"}`} />
                {dtiOk
                  ? `Te încadrezi în limita BNR (rata ${formatRON(Math.round(monthly))} ≤ ${formatRON(Math.round(dtiMax))})`
                  : `Nu te încadrezi — rata depășește plafonul de 40% DTI`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right — results */}
      <div className="bg-[#0B2E2E] p-6 lg:p-8 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Rată lunară estimativă</div>
        <div className="text-4xl font-bold text-white mb-0.5">
          {currency === "EUR"
            ? `€${Math.round(monthly / eurRate).toLocaleString("ro-RO")}`
            : `${Math.round(monthly).toLocaleString("ro-RO")} RON`}
        </div>
        <div className="text-sm text-gray-500 mb-1">
          {currency === "EUR"
            ? `≈ ${Math.round(monthly).toLocaleString("ro-RO")} RON`
            : `≈ €${Math.round(monthly / eurRate).toLocaleString("ro-RO")}`}
        </div>
        <div className="text-sm text-gray-400 mb-5">pe lună, timp de {months} luni</div>

        <div className="grid grid-cols-2 gap-3 mb-5 pb-5 border-b border-white/10">
          <div>
            <div className="text-xs text-gray-400 mb-0.5">Total rambursat</div>
            <div className="text-sm font-semibold text-white">{fmtCur(total)}</div>
            <div className="text-[10px] text-gray-600">{currency === "EUR" ? fmtRON(total) : fmtEUR(total)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-0.5">Cost total dobândă</div>
            <div className="text-sm font-semibold text-white">{fmtCur(totalDobanda)}</div>
            <div className="text-[10px] text-gray-600">{currency === "EUR" ? fmtRON(totalDobanda) : fmtEUR(totalDobanda)}</div>
          </div>
          {isIp && (
            <>
              <div>
                <div className="text-xs text-gray-400 mb-0.5">Credit solicitat</div>
                <div className="text-sm font-semibold text-white">{fmtCur(creditAmount)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-0.5">Avans ({effectiveAvansPct}%)</div>
                <div className="text-sm font-semibold text-white">{fmtCur(avansRON)}</div>
              </div>
            </>
          )}
        </div>

        {bestBank && (
          <div className="bg-white/8 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C49A20] mb-2">
              <TrendingDown className="h-3.5 w-3.5" />Cea mai bună ofertă azi
            </div>
            <div className="flex items-center gap-2 mb-1">
              <img src={bestBank.logo} alt={bestBank.name}
                className="w-6 h-6 rounded object-contain bg-white p-0.5"
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <span className="text-sm font-medium text-white">{bestBank.name}</span>
              <span className="ml-auto text-sm font-bold text-white">
                {currency === "EUR"
                  ? `€${Math.round(bestMonthly / eurRate).toLocaleString("ro-RO")}/lună`
                  : `${Math.round(bestMonthly).toLocaleString("ro-RO")} RON/lună`}
              </span>
            </div>
            <div className="text-xs text-gray-400">Dobândă {bestRate.toFixed(2)}% · DAE {bestDae.toFixed(2)}%</div>
          </div>
        )}

        <div className="space-y-1.5 mb-5">
          {sortedBanks.slice(0, 3).map((bank, i) => {
            const r = type === "personal" ? bank.ratePersonal : bank.rateIpotecar;
            const m = calculateMonthlyPayment(creditAmount, r, months);
            return (
              <div key={bank.id} className={`flex items-center justify-between py-1.5 px-2 rounded-lg ${i === 0 ? "bg-[#C49A20]/10" : ""}`}>
                <div className="flex items-center gap-2">
                  <img src={bank.logo} alt={bank.name} className="w-5 h-5 rounded object-contain bg-white p-0.5"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <span className="text-xs text-gray-300">{bank.name}</span>
                </div>
                <span className="text-xs font-bold text-white">
                  {currency === "EUR"
                    ? `€${Math.round(m / eurRate).toLocaleString("ro-RO")}`
                    : `${Math.round(m).toLocaleString("ro-RO")} RON`}
                </span>
              </div>
            );
          })}
        </div>

        <Link href="/aplica">
          <button className="w-full bg-[#C49A20] hover:bg-[#b09255] text-[#0B2E2E] font-semibold text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
            Aplică pentru acest credit <ArrowRight className="h-4 w-4" />
          </button>
        </Link>

        {/* BNR rate info */}
        {!rateLoading && eurRate != null && (
          <p className="text-[10px] text-gray-600 text-center mt-3">
            Curs BNR: 1 EUR = {eurRate.toFixed(4)} RON
            {rateDate && !isCustomRate && <> · {rateDate}</>}
            {isCustomRate && <span className="text-[#C49A20]"> · curs personalizat</span>}
          </p>
        )}
      </div>
    </div>
  );
}
