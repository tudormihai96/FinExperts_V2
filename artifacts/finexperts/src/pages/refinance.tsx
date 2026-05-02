import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Slider } from "@/components/ui/slider";
import { Info, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { formatRON } from "@/lib/data";

function calcMonthly(principal: number, annualRate: number, months: number) {
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  return principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

export default function RefinancePage() {
  const [sold, setSold] = useState(80000);
  const [rataAct, setRataAct] = useState(1200);
  const [luni, setLuni] = useState(48);
  const [dobandaNoua, setDobandaNoua] = useState(5.99);

  const r = useMemo(() => {
    const rataNoua = calcMonthly(sold, dobandaNoua, luni);
    const economielunar = rataAct - rataNoua;
    const totalVechi = rataAct * luni;
    const totalNou = rataNoua * luni;
    const economie = totalVechi - totalNou;
    const costuri = sold * 0.01;
    const economieNeta = economie - costuri;
    const breakEven = economielunar > 0 ? Math.ceil(costuri / economielunar) : Infinity;
    return { rataNoua, economielunar, totalVechi, totalNou, economie, costuri, economieNeta, breakEven, merita: economieNeta > 0 && economielunar > 0 };
  }, [sold, rataAct, luni, dobandaNoua]);

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider mb-3">Calculator refinanțare</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A1A2E] leading-tight mb-3">
            Merită să refinanțezi?
          </h1>
          <p className="text-[#5A6478] text-base max-w-xl">
            Compară creditul tău actual cu o ofertă nouă și calculează economia reală, inclusiv costul rambursării anticipate (1% conform legii).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-0 bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
          {/* Left: sliders */}
          <div className="p-6 lg:p-8 border-r border-[#E5E3D9]">
            {/* SOLD RĂMAS */}
            <div className="mb-7">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">Sold rămas (RON)</span>
                <span className="text-base font-semibold text-[#0A1A2E]">{formatRON(sold)}</span>
              </div>
              <Slider
                data-testid="slider-sold"
                min={5000}
                max={500000}
                step={5000}
                value={[sold]}
                onValueChange={([v]) => setSold(v)}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-[#5A6478]">
                <span>5.000 RON</span>
                <span>500.000 RON</span>
              </div>
            </div>

            {/* RATĂ ACTUALĂ */}
            <div className="mb-7">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">Rată lunară actuală (RON)</span>
                <span className="text-base font-semibold text-[#0A1A2E]">{formatRON(rataAct)}</span>
              </div>
              <Slider
                data-testid="slider-rata-actuala"
                min={100}
                max={10000}
                step={50}
                value={[rataAct]}
                onValueChange={([v]) => setRataAct(v)}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-[#5A6478]">
                <span>100 RON</span>
                <span>10.000 RON</span>
              </div>
            </div>

            {/* LUNI RĂMASE */}
            <div className="mb-7">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">Luni rămase</span>
                <span className="text-base font-semibold text-[#0A1A2E]">{luni} luni ({(luni / 12).toFixed(1)} ani)</span>
              </div>
              <Slider
                data-testid="slider-luni"
                min={3}
                max={360}
                step={3}
                value={[luni]}
                onValueChange={([v]) => setLuni(v)}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-[#5A6478]">
                <span>3 luni</span>
                <span>360 luni</span>
              </div>
            </div>

            {/* DOBÂNDĂ NOUĂ */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">Dobânda noii oferte</span>
                <span className="text-base font-semibold text-[#0A1A2E]">{dobandaNoua.toFixed(2)}%</span>
              </div>
              <Slider
                data-testid="slider-dobanda-noua"
                min={3.0}
                max={18.0}
                step={0.01}
                value={[dobandaNoua]}
                onValueChange={([v]) => setDobandaNoua(Math.round(v * 100) / 100)}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-[#5A6478]">
                <span>3.00%</span>
                <span>18.00%</span>
              </div>
            </div>
          </div>

          {/* Right: dark result */}
          <div className="bg-[#0A1A2E] p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-5">
              {r.merita ? (
                <>
                  <CheckCircle className="h-5 w-5 text-[#2E7D5B]" />
                  <span className="font-semibold text-[#2E7D5B] text-sm">Merită să refinanțezi</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-[#C4432F]" />
                  <span className="font-semibold text-[#C4432F] text-sm">Nu merită în acest moment</span>
                </>
              )}
            </div>

            <div className="mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Rată lunară nouă</div>
            <div className="text-5xl font-bold text-white mb-1" data-testid="result-rata-noua">
              {Math.round(r.rataNoua).toLocaleString("ro-RO")} RON
            </div>
            <div className="text-sm text-gray-400 mb-6">vs. {formatRON(rataAct)} actual</div>

            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/10">
              <div>
                <div className="text-xs text-gray-400 mb-1">Economie lunară</div>
                <div className={`text-base font-bold ${r.economielunar >= 0 ? "text-[#2E7D5B]" : "text-[#C4432F]"}`} data-testid="result-economie-lunara">
                  {r.economielunar >= 0 ? "+" : ""}{formatRON(Math.round(r.economielunar))}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Economie netă totală</div>
                <div className={`text-base font-bold ${r.economieNeta >= 0 ? "text-[#2E7D5B]" : "text-[#C4432F]"}`} data-testid="result-economie-neta">
                  {r.economieNeta >= 0 ? "+" : ""}{formatRON(Math.round(r.economieNeta))}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Break-even</div>
                <div className="text-base font-bold text-white" data-testid="result-breakeven">
                  {isFinite(r.breakEven) ? `${r.breakEven} luni` : "—"}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Cost rambursare (1%)</div>
                <div className="text-base font-bold text-[#C6A667]">{formatRON(Math.round(r.costuri))}</div>
              </div>
            </div>

            <Link href="/aplica">
              <button className="w-full bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-semibold text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                Aplică refinanțare
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>

            <div className="mt-4 flex items-start gap-2 text-xs text-gray-500">
              <Info className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#C6A667]" />
              Costul rambursării anticipate = max. 1% sold conform Directivei UE. Calcul informativ.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
