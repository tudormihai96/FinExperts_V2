import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Info } from "lucide-react";
import { formatRON } from "@/lib/data";

function calcMonthly(principal: number, annualRate: number, months: number) {
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  return principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

export default function RefinancePage() {
  const [sold, setSold] = useState(80000);
  const [dobandaCurenta, setDobandaCurenta] = useState(9.50);
  const [luniRamase, setLuniRamase] = useState(48);
  const [comisionRambursare, setComisionRambursare] = useState(1.00);
  const [dobandaNoua, setDobandaNoua] = useState(6.29);
  const [perioadaNoua, setPerioadaNoua] = useState(48);
  const [taxaAnaliza, setTaxaAnaliza] = useState(500);

  const r = useMemo(() => {
    const rataActuala = calcMonthly(sold, dobandaCurenta, luniRamase);
    const comisionVal = sold * (comisionRambursare / 100);
    const principalNou = sold + comisionVal + taxaAnaliza;
    const rataNoua = calcMonthly(principalNou, dobandaNoua, perioadaNoua);
    const totalRamasCurent = rataActuala * luniRamase;
    const totalNou = rataNoua * perioadaNoua;
    const economiePerLuna = rataActuala - rataNoua;
    const costuriTotale = comisionVal + taxaAnaliza;
    const economieTotal = totalRamasCurent - totalNou;
    const recuperareCosturi = economiePerLuna > 0 ? costuriTotale / economiePerLuna : Infinity;
    const merita = economieTotal > 0 && economiePerLuna > 0;

    return {
      rataActuala,
      rataNoua,
      comisionVal,
      principalNou,
      totalRamasCurent,
      totalNou,
      economiePerLuna,
      economieTotal,
      recuperareCosturi,
      merita,
    };
  }, [sold, dobandaCurenta, luniRamase, comisionRambursare, dobandaNoua, perioadaNoua, taxaAnaliza]);

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider mb-3">Calculator refinanțare</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A1A2E] leading-tight mb-3">
            Cât economisești prin{" "}
            <span className="text-[#C6A667]">refinanțare</span>?
          </h1>
          <p className="text-[#5A6478] text-base max-w-xl">
            Compară creditul actual cu o ofertă nouă, ținând cont de comisionul de rambursare anticipată și taxa de analiză a noii bănci.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-0 bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
          {/* Left: 2 sub-panels */}
          <div className="border-r border-[#E5E3D9]">
            {/* CREDITUL ACTUAL */}
            <div className="p-6 lg:p-8 border-b border-[#E5E3D9]">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-5 bg-[#C6A667] rounded-full" />
                <span className="text-xs font-bold text-[#0A1A2E] uppercase tracking-wider">Creditul actual</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Sold rămas */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">Sold rămas (RON)</span>
                    <span className="text-sm font-semibold text-[#0A1A2E]">{formatRON(sold)}</span>
                  </div>
                  <Slider min={5000} max={500000} step={5000} value={[sold]} onValueChange={([v]) => setSold(v)} className="mb-1" />
                  <div className="flex justify-between text-[10px] text-[#5A6478]"><span>5.000 RON</span><span>500.000 RON</span></div>
                </div>

                {/* Dobândă curentă */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">Dobândă curentă (%)</span>
                    <span className="text-sm font-semibold text-[#0A1A2E]">{dobandaCurenta.toFixed(2)}%</span>
                  </div>
                  <Slider min={3} max={20} step={0.01} value={[dobandaCurenta]} onValueChange={([v]) => setDobandaCurenta(Math.round(v * 100) / 100)} className="mb-1" />
                  <div className="flex justify-between text-[10px] text-[#5A6478]"><span>3.00%</span><span>20.00%</span></div>
                </div>

                {/* Luni rămase */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">Luni rămase</span>
                    <span className="text-sm font-semibold text-[#0A1A2E]">{luniRamase} luni</span>
                  </div>
                  <Slider min={3} max={360} step={3} value={[luniRamase]} onValueChange={([v]) => setLuniRamase(v)} className="mb-1" />
                  <div className="flex justify-between text-[10px] text-[#5A6478]"><span>3 luni</span><span>360 luni</span></div>
                </div>

                {/* Comision rambursare anticipată */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">Comision rambursare anticipată (%)</span>
                    <span className="text-sm font-semibold text-[#0A1A2E]">{comisionRambursare.toFixed(2)}%</span>
                  </div>
                  <Slider min={0} max={3} step={0.01} value={[comisionRambursare]} onValueChange={([v]) => setComisionRambursare(Math.round(v * 100) / 100)} className="mb-1" />
                  <div className="flex justify-between text-[10px] text-[#5A6478]"><span>0.00%</span><span>3.00%</span></div>
                </div>
              </div>
            </div>

            {/* OFERTA NOUĂ */}
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-5 bg-[#C6A667] rounded-full" />
                <span className="text-xs font-bold text-[#0A1A2E] uppercase tracking-wider">Oferta nouă</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Dobândă nouă */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">Dobândă nouă (%)</span>
                    <span className="text-sm font-semibold text-[#0A1A2E]">{dobandaNoua.toFixed(2)}%</span>
                  </div>
                  <Slider min={3} max={18} step={0.01} value={[dobandaNoua]} onValueChange={([v]) => setDobandaNoua(Math.round(v * 100) / 100)} className="mb-1" />
                  <div className="flex justify-between text-[10px] text-[#5A6478]"><span>3.00%</span><span>18.00%</span></div>
                </div>

                {/* Perioadă nouă */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">Perioadă nouă (luni)</span>
                    <span className="text-sm font-semibold text-[#0A1A2E]">{perioadaNoua} luni</span>
                  </div>
                  <Slider min={6} max={360} step={6} value={[perioadaNoua]} onValueChange={([v]) => setPerioadaNoua(v)} className="mb-1" />
                  <div className="flex justify-between text-[10px] text-[#5A6478]"><span>6 luni</span><span>360 luni</span></div>
                </div>

                {/* Taxă analiză */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider">Taxă analiză (RON)</span>
                    <span className="text-sm font-semibold text-[#0A1A2E]">{formatRON(taxaAnaliza)}</span>
                  </div>
                  <Slider min={0} max={5000} step={100} value={[taxaAnaliza]} onValueChange={([v]) => setTaxaAnaliza(v)} className="mb-1" />
                  <div className="flex justify-between text-[10px] text-[#5A6478]"><span>0 RON</span><span>5.000 RON</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: dark result */}
          <div className="bg-[#0A1A2E] p-6 lg:p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-[#C6A667]" />
              <span className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider">Refinanțare recomandată</span>
            </div>

            <div className="text-xs text-gray-400 mb-1">Economie totală</div>
            <div
              data-testid="result-economie-totala"
              className={`text-5xl font-bold mb-4 ${r.economieTotal >= 0 ? "text-white" : "text-[#C4432F]"}`}
            >
              {formatRON(Math.round(Math.abs(r.economieTotal)))}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-white/10">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Economie / lună</div>
                <div
                  data-testid="result-economie-lunara"
                  className={`text-xl font-bold ${r.economiePerLuna >= 0 ? "text-[#4ade80]" : "text-[#C4432F]"}`}
                >
                  {r.economiePerLuna >= 0 ? "" : "-"}{formatRON(Math.round(Math.abs(r.economiePerLuna)))}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Recuperare costuri</div>
                <div data-testid="result-recuperare" className="text-xl font-bold text-white">
                  {isFinite(r.recuperareCosturi) ? `${r.recuperareCosturi.toFixed(1)} luni` : "—"}
                </div>
              </div>
            </div>

            {/* Detalii calcul */}
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Detalii calcul</div>
            <div className="space-y-2 flex-1">
              {[
                { label: "Rată actuală", value: formatRON(Math.round(r.rataActuala)), highlight: false },
                { label: "Rată nouă", value: formatRON(Math.round(r.rataNoua)), highlight: true },
                { label: "Comision rambursare", value: formatRON(Math.round(r.comisionVal)), highlight: false },
                { label: "Principal nou (după costuri)", value: formatRON(Math.round(r.principalNou)), highlight: false },
                { label: "Total rămas curent", value: formatRON(Math.round(r.totalRamasCurent)), highlight: false },
                { label: "Total nou", value: formatRON(Math.round(r.totalNou)), highlight: false },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-1">
                  <span className="text-xs text-gray-400">{row.label}</span>
                  <span className={`text-xs font-semibold ${row.highlight ? "text-[#4ade80]" : "text-white"}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-2 text-[11px] text-gray-500">
              <Info className="h-3 w-3 mt-0.5 shrink-0 text-gray-500" />
              Calcul informativ. Banca poate ajusta oferta în funcție de scoring și venit.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
