import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Slider } from "@/components/ui/slider";
import { banks, calculateMonthlyPayment, formatRON } from "@/lib/data";
import { FileText, Table, TrendingDown, ChevronDown, ChevronUp, ArrowRight, Info } from "lucide-react";

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  suffix = "",
  testId,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  suffix?: string;
  testId?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState("");

  const displayVal = format ? format(value) : value.toLocaleString("ro-RO") + (suffix ? " " + suffix : "");

  const commit = (s: string) => {
    const n = parseFloat(s.replace(/[^0-9.]/g, ""));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
    setEditing(false);
  };

  return (
    <div className="mb-7">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">{label}</span>
        {editing ? (
          <input
            autoFocus
            type="number"
            defaultValue={value}
            className="w-32 text-right text-base font-semibold text-[#0A1A2E] border-b-2 border-[#C6A667] bg-transparent focus:outline-none"
            onChange={e => setRaw(e.target.value)}
            onBlur={e => commit(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") commit((e.target as HTMLInputElement).value); }}
          />
        ) : (
          <button
            onClick={() => { setEditing(true); setRaw(String(value)); }}
            className="text-base font-semibold text-[#0A1A2E] hover:text-[#C6A667] transition-colors border-b border-dashed border-[#C6A667]/40 hover:border-[#C6A667]"
            title="Click pentru a edita manual"
          >
            {displayVal}
          </button>
        )}
      </div>
      <Slider
        data-testid={testId}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="mb-2"
      />
      <div className="flex justify-between text-xs text-[#5A6478]">
        <span>{format ? format(min) : min.toLocaleString("ro-RO") + (suffix ? " " + suffix : "")}</span>
        <span>{format ? format(max) : max.toLocaleString("ro-RO") + (suffix ? " " + suffix : "")}</span>
      </div>
    </div>
  );
}

function CreditCalculator({ type }: { type: "personal" | "ipotecar" }) {
  const isIpotecar = type === "ipotecar";
  const [amount, setAmount] = useState(isIpotecar ? 150000 : 30000);
  const [months, setMonths] = useState(isIpotecar ? 120 : 36);
  const [rate, setRate] = useState(isIpotecar ? 5.20 : 7.49);
  const [dtiOpen, setDtiOpen] = useState(false);
  const [venit, setVenit] = useState(5000);
  const [obligatii, setObligatii] = useState(0);

  const minAmount = isIpotecar ? 30000 : 1000;
  const maxAmount = isIpotecar ? 600000 : 200000;
  const minMonths = isIpotecar ? 12 : 6;
  const maxMonths = isIpotecar ? 360 : 60;
  const minRate = isIpotecar ? 3.0 : 4.0;
  const maxRate = isIpotecar ? 12.0 : 18.0;

  const monthly = useMemo(() => calculateMonthlyPayment(amount, rate, months), [amount, rate, months]);
  const total = monthly * months;
  const totalDobanda = total - amount;

  const sortedBanks = useMemo(() => {
    return [...banks]
      .filter(b => {
        const bankRate = type === "personal" ? b.ratePersonal : b.rateIpotecar;
        return bankRate <= rate + 2;
      })
      .sort((a, b) => {
        const ra = type === "personal" ? a.ratePersonal : a.rateIpotecar;
        const rb = type === "personal" ? b.ratePersonal : b.rateIpotecar;
        return ra - rb;
      });
  }, [type, rate]);

  const bestBank = sortedBanks[0];
  const bestMonthly = bestBank ? calculateMonthlyPayment(amount, type === "personal" ? bestBank.ratePersonal : bestBank.rateIpotecar, months) : monthly;
  const bestDae = bestBank ? (type === "personal" ? bestBank.daePersonal : bestBank.daeIpotecar) : rate;

  const dtiMax = venit * 0.4 - obligatii;
  const dtiOk = monthly <= dtiMax;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-0">
      {/* Left: sliders */}
      <div className="p-6 lg:p-8 border-r border-[#E5E3D9]">
        <p className="text-xs text-[#5A6478] mb-5 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C6A667]" />
          Poți modifica valorile și cu click pe cifre
        </p>

        <SliderInput
          label="Sumă dorită"
          value={amount}
          min={minAmount}
          max={maxAmount}
          step={isIpotecar ? 5000 : 1000}
          onChange={setAmount}
          format={formatRON}
          testId="slider-amount"
        />

        <SliderInput
          label="Perioadă rambursare"
          value={months}
          min={minMonths}
          max={maxMonths}
          step={isIpotecar ? 12 : 6}
          onChange={setMonths}
          format={v => `${v} luni (${(v / 12).toFixed(1)} ani)`}
          testId="slider-months"
        />

        <SliderInput
          label="Dobândă estimativă"
          value={rate}
          min={minRate}
          max={maxRate}
          step={0.01}
          onChange={v => setRate(Math.round(v * 100) / 100)}
          format={v => `${v.toFixed(2)}%`}
          testId="slider-rate"
        />

        {/* DTI Accordion */}
        <div className="border border-[#E5E3D9] rounded-xl overflow-hidden">
          <button
            onClick={() => setDtiOpen(!dtiOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#0A1A2E] hover:bg-[#F7F4EC] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-[#5A6478]" />
              <span>Verifică încadrarea (DTI 40%)</span>
            </div>
            {dtiOpen ? <ChevronUp className="h-4 w-4 text-[#5A6478]" /> : <ChevronDown className="h-4 w-4 text-[#5A6478]" />}
          </button>
          {dtiOpen && (
            <div className="px-4 pb-4 border-t border-[#E5E3D9] bg-[#F7F4EC]">
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="text-xs text-[#5A6478] block mb-1">Venit net lunar (RON)</label>
                  <input
                    type="number"
                    value={venit}
                    onChange={(e) => setVenit(parseFloat(e.target.value) || 0)}
                    className="w-full border border-[#E5E3D9] rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-[#0A1A2E]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#5A6478] block mb-1">Rate alte credite (RON/lună)</label>
                  <input
                    type="number"
                    value={obligatii}
                    onChange={(e) => setObligatii(parseFloat(e.target.value) || 0)}
                    className="w-full border border-[#E5E3D9] rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-[#0A1A2E]"
                  />
                </div>
              </div>
              <div className={`mt-3 text-sm font-medium flex items-center gap-2 ${dtiOk ? "text-[#2E7D5B]" : "text-[#C4432F]"}`}>
                <div className={`w-2 h-2 rounded-full ${dtiOk ? "bg-[#2E7D5B]" : "bg-[#C4432F]"}`} />
                {dtiOk
                  ? `Te încadrezi în limita BNR (DTI ≤ 40%)`
                  : `Depășești limita BNR de 40% — nu te încadrezi`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: dark result panel */}
      <div className="bg-[#0A1A2E] p-6 lg:p-8 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Rată lunară estimativă</div>
        <div data-testid="result-monthly" className="text-5xl font-bold text-white mb-1">{Math.round(monthly).toLocaleString("ro-RO")} RON</div>
        <div className="text-sm text-gray-400 mb-6">pe lună, timp de {months} luni</div>

        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs text-gray-400 mb-1">Total rambursat</div>
            <div className="text-base font-semibold text-white">{formatRON(total)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Cost total dobândă</div>
            <div className="text-base font-semibold text-white">{formatRON(totalDobanda)}</div>
          </div>
        </div>

        {bestBank && (
          <div className="bg-white/8 rounded-xl p-4 mb-5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C6A667] mb-2">
              <TrendingDown className="h-3.5 w-3.5" />
              Cea mai bună ofertă
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">{bestBank.name}</span>
              <span className="text-sm font-bold text-white">{Math.round(bestMonthly).toLocaleString("ro-RO")} RON / lună</span>
            </div>
            <div className="text-xs text-gray-400 mt-0.5">DAE {bestDae.toFixed(2)}%</div>
          </div>
        )}

        <Link href="/aplica">
          <button className="w-full bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-semibold text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
            Aplică pentru acest credit
            <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  const [activeType, setActiveType] = useState<"personal" | "ipotecar">("personal");

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider mb-3">Calculatoare credite</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A1A2E] leading-tight mb-3">
            Rată lunară și cost total,<br />pentru fiecare bancă.
          </h1>
          <p className="text-[#5A6478] text-base max-w-xl">
            Modifică suma, durata și dobânda cu slider-ul sau tastând direct cifra dorită. Ofertele reale sunt generate în timp real pentru cele 11 bănci partenere.
          </p>
        </div>

        {/* 3 calculator type cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/calculator">
            <div className="bg-white border border-[#0A1A2E] rounded-xl p-5 shadow-sm cursor-pointer flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#0A1A2E] flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-[#0A1A2E] text-sm mb-0.5">Calculator credit standard</div>
                <div className="text-xs text-[#5A6478]">Rată lunară pentru credit personal sau ipotecar.</div>
              </div>
            </div>
          </Link>
          <Link href="/calculator/suma-maxima">
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-5 hover:border-[#0A1A2E] hover:shadow-sm transition-all cursor-pointer flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#0A1A2E]/8 flex items-center justify-center shrink-0">
                <Table className="h-5 w-5 text-[#0A1A2E]" />
              </div>
              <div>
                <div className="font-semibold text-[#0A1A2E] text-sm mb-0.5">Sumă maximă credit</div>
                <div className="text-xs text-[#5A6478]">Cât poți împrumuta în funcție de venitul tău (DTI 40%).</div>
              </div>
            </div>
          </Link>
          <Link href="/calculator/refinantare">
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-5 hover:border-[#0A1A2E] hover:shadow-sm transition-all cursor-pointer flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#0A1A2E]/8 flex items-center justify-center shrink-0">
                <TrendingDown className="h-5 w-5 text-[#0A1A2E]" />
              </div>
              <div>
                <div className="font-semibold text-[#0A1A2E] text-sm mb-0.5">Calculator refinanțare</div>
                <div className="text-xs text-[#5A6478]">Cât economisești prin mutarea creditului la altă bancă.</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Main calculator */}
        <div className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
          {/* Tab switcher */}
          <div className="px-6 pt-5 pb-0 border-b border-[#E5E3D9]">
            <div className="flex gap-2">
              <button
                data-testid="tab-personal"
                onClick={() => setActiveType("personal")}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg mb-[-1px] transition-colors ${
                  activeType === "personal"
                    ? "bg-[#0A1A2E] text-white"
                    : "text-[#5A6478] hover:text-[#0A1A2E]"
                }`}
              >
                <FileText className="h-4 w-4" />
                Credit personal
              </button>
              <button
                data-testid="tab-ipotecar"
                onClick={() => setActiveType("ipotecar")}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg mb-[-1px] transition-colors ${
                  activeType === "ipotecar"
                    ? "bg-[#0A1A2E] text-white"
                    : "text-[#5A6478] hover:text-[#0A1A2E]"
                }`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Credit ipotecar
              </button>
            </div>
          </div>

          <CreditCalculator key={activeType} type={activeType} />
        </div>
      </div>
    </div>
  );
}
