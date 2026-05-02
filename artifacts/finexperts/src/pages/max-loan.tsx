import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Slider } from "@/components/ui/slider";
import { calculateMonthlyPayment, formatRON } from "@/lib/data";
import { Info, ArrowRight, FileText } from "lucide-react";

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  testId,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  testId?: string;
}) {
  const [editing, setEditing] = useState(false);
  const displayVal = format ? format(value) : value.toLocaleString("ro-RO");

  const commit = (s: string) => {
    const n = parseFloat(s.replace(/[^0-9.]/g, ""));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
    setEditing(false);
  };

  return (
    <div className="mb-7">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">{label}</span>
        {editing ? (
          <input
            autoFocus
            type="number"
            defaultValue={value}
            className="w-36 text-right text-sm font-semibold text-[#0C1A2E] border-b-2 border-[#C49A20] bg-transparent focus:outline-none"
            onBlur={e => commit(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") commit((e.target as HTMLInputElement).value); }}
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-base font-semibold text-[#0C1A2E] hover:text-[#C49A20] transition-colors border-b border-dashed border-[#C49A20]/40 hover:border-[#C49A20]"
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
      <div className="flex justify-between text-xs text-[#64748B]">
        <span>{format ? format(min) : min.toLocaleString("ro-RO")}</span>
        <span>{format ? format(max) : max.toLocaleString("ro-RO")}</span>
      </div>
    </div>
  );
}

export default function MaxLoanPage() {
  const [activeType, setActiveType] = useState<"personal" | "ipotecar">("personal");
  const [venit, setVenit] = useState(5000);
  const [rateAlte, setRateAlte] = useState(300);
  const [perioada, setPerioada] = useState(60);

  const result = useMemo(() => {
    const bestRate = activeType === "personal" ? 5.99 : 4.85;
    const rataMaxima = venit * 0.4 - rateAlte;
    if (rataMaxima <= 0) return { maxLoan: 0, rataMaxima: Math.max(0, rataMaxima), bestRate };
    const r = bestRate / 12 / 100;
    let maxLoan = 0;
    if (r === 0) {
      maxLoan = rataMaxima * perioada;
    } else {
      maxLoan = rataMaxima * (Math.pow(1 + r, perioada) - 1) / (r * Math.pow(1 + r, perioada));
    }
    return { maxLoan: Math.max(0, maxLoan), rataMaxima, bestRate };
  }, [activeType, venit, rateAlte, perioada]);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Calculator sumă maximă</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0C1A2E] leading-tight mb-3">
            Cât poți împrumuta?
          </h1>
          <p className="text-[#64748B] text-base max-w-xl">
            Calcul automat conform BNR (grad de îndatorare maxim 40% din venitul net). Modifică valorile cu slider-ul sau tastând direct.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-0 bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          {/* Left */}
          <div className="p-6 lg:p-8 border-r border-[#E2E8F0]">
            {/* Tab */}
            <div className="flex gap-2 mb-7">
              <button
                onClick={() => setActiveType("personal")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeType === "personal" ? "bg-[#0C1A2E] text-white" : "text-[#64748B] hover:text-[#0C1A2E]"
                }`}
              >
                <FileText className="h-4 w-4" />
                Credit personal
              </button>
              <button
                onClick={() => setActiveType("ipotecar")}
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
            </div>

            <p className="text-xs text-[#64748B] mb-5 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#C49A20]" />
              Poți modifica valorile și cu click pe cifre
            </p>

            <SliderInput
              label="Venit net lunar (RON)"
              value={venit}
              min={1000}
              max={30000}
              step={500}
              onChange={setVenit}
              format={v => `${v.toLocaleString("ro-RO")} RON`}
              testId="slider-venit"
            />

            <SliderInput
              label="Rate la alte credite (RON/lună)"
              value={rateAlte}
              min={0}
              max={5000}
              step={100}
              onChange={setRateAlte}
              format={v => `${v.toLocaleString("ro-RO")} RON`}
              testId="slider-rate-alte"
            />

            <SliderInput
              label="Perioadă rambursare (luni)"
              value={perioada}
              min={activeType === "personal" ? 6 : 12}
              max={activeType === "personal" ? 60 : 360}
              step={activeType === "personal" ? 6 : 12}
              onChange={setPerioada}
              format={v => `${v} luni (${(v / 12).toFixed(1)} ani)`}
              testId="slider-perioada"
            />
          </div>

          {/* Right: dark result */}
          <div className="bg-[#0C1A2E] p-6 lg:p-8">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sumă maximă disponibilă</div>
            {result.maxLoan > 0 ? (
              <>
                <div className="text-5xl font-bold text-white mb-1" data-testid="result-max-loan">
                  {formatRON(Math.round(result.maxLoan))}
                </div>
                <div className="text-sm text-gray-400 mb-6">
                  cu rată lunară până la {formatRON(Math.round(result.rataMaxima))}
                </div>
              </>
            ) : (
              <>
                <div className="text-3xl font-bold text-[#C4432F] mb-1">Nu te încadrezi</div>
                <div className="text-sm text-gray-400 mb-6">
                  Obligațiile lunare depășesc 40% din venit
                </div>
              </>
            )}

            <div className="bg-white/8 rounded-xl p-4 mb-5">
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">Detalii calcul DTI</div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Venit net lunar</span>
                  <span className="text-white font-medium">{formatRON(venit)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Plafon 40% DTI</span>
                  <span className="text-white font-medium">{formatRON(venit * 0.4)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Rate existente</span>
                  <span className="text-white font-medium">- {formatRON(rateAlte)}</span>
                </div>
                <div className="border-t border-white/10 pt-1.5 flex justify-between text-sm">
                  <span className="text-[#C49A20] font-semibold">Rată maximă nouă</span>
                  <span className="text-[#C49A20] font-bold">{formatRON(Math.round(result.rataMaxima))}</span>
                </div>
              </div>
            </div>

            <Link href="/aplica">
              <button className="w-full bg-[#C49A20] hover:bg-[#b09255] text-[#0C1A2E] font-semibold text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                Aplică pentru această sumă
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>

            <div className="mt-5 flex items-start gap-2 text-xs text-gray-400">
              <Info className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#C49A20]" />
              Calcul informativ. Banca poate aplica un coeficient mai strict pentru veniturile variabile (PFA, dividende).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
