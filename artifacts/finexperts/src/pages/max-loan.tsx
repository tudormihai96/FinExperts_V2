import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Slider } from "@/components/ui/slider";
import { calculateMonthlyPayment, formatRON } from "@/lib/data";
import { Info, ArrowRight } from "lucide-react";
import { FileText } from "lucide-react";

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
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider mb-3">Calculator sumă maximă</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A1A2E] leading-tight mb-3">
            Cât poți împrumuta?
          </h1>
          <p className="text-[#5A6478] text-base max-w-xl">
            Calcul automat conform reglementărilor BNR (Regulamentul 17/2012): grad de îndatorare maxim 40% din venitul net, ajustat cu obligațiile financiare existente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-0 bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
          {/* Left */}
          <div className="p-6 lg:p-8 border-r border-[#E5E3D9]">
            {/* Tab */}
            <div className="flex gap-2 mb-7">
              <button
                onClick={() => setActiveType("personal")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeType === "personal" ? "bg-[#0A1A2E] text-white" : "text-[#5A6478] hover:text-[#0A1A2E]"
                }`}
              >
                <FileText className="h-4 w-4" />
                Credit personal
              </button>
              <button
                onClick={() => setActiveType("ipotecar")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeType === "ipotecar" ? "bg-[#0A1A2E] text-white" : "text-[#5A6478] hover:text-[#0A1A2E]"
                }`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Credit ipotecar
              </button>
            </div>

            {/* VENIT NET */}
            <div className="mb-7">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">Venit net lunar (RON)</span>
                <span className="text-base font-semibold text-[#0A1A2E]">{venit.toLocaleString("ro-RO")} RON</span>
              </div>
              <Slider
                data-testid="slider-venit"
                min={1000}
                max={30000}
                step={500}
                value={[venit]}
                onValueChange={([v]) => setVenit(v)}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-[#5A6478]">
                <span>1.000 RON</span>
                <span>30.000 RON</span>
              </div>
            </div>

            {/* RATE ALTE CREDITE */}
            <div className="mb-7">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">Rate la alte credite (RON/lună)</span>
                <span className="text-base font-semibold text-[#0A1A2E]">{rateAlte.toLocaleString("ro-RO")} RON</span>
              </div>
              <Slider
                data-testid="slider-rate-alte"
                min={0}
                max={5000}
                step={100}
                value={[rateAlte]}
                onValueChange={([v]) => setRateAlte(v)}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-[#5A6478]">
                <span>0 RON</span>
                <span>5.000 RON</span>
              </div>
            </div>

            {/* PERIOADĂ RAMBURSARE */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">Perioadă rambursare (luni)</span>
                <span className="text-base font-semibold text-[#0A1A2E]">{perioada} luni ({(perioada / 12).toFixed(1)} ani)</span>
              </div>
              <Slider
                data-testid="slider-perioada"
                min={activeType === "personal" ? 6 : 12}
                max={activeType === "personal" ? 60 : 360}
                step={activeType === "personal" ? 6 : 12}
                value={[perioada]}
                onValueChange={([v]) => setPerioada(v)}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-[#5A6478]">
                <span>{activeType === "personal" ? "6" : "12"} luni</span>
                <span>{activeType === "personal" ? "60" : "360"} luni</span>
              </div>
            </div>
          </div>

          {/* Right: dark result */}
          <div className="bg-[#0A1A2E] p-6 lg:p-8">
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

            <Link href="/aplica">
              <button className="w-full bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-semibold text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                Aplică pentru această sumă
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>

            <div className="mt-5 flex items-start gap-2 text-xs text-gray-400">
              <Info className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#C6A667]" />
              Calcul informativ. Banca poate aplica un coeficient mai strict pentru veniturile variabile (PFA, dividende) sau pentru clienți cu istoric.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
