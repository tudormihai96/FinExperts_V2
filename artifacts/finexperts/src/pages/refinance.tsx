import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Info, CheckCircle, XCircle } from "lucide-react";

function formatRON(value: number) {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(value) + " RON";
}

function calcMonthly(principal: number, annualRate: number, months: number) {
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  return principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

export default function RefinancePage() {
  const [soldRamas, setSoldRamas] = useState(80000);
  const [rataActuala, setRataActuala] = useState(1200);
  const [luniRamase, setLuniRamase] = useState(48);
  const [dobandaNoua, setDobandaNoua] = useState(6.5);
  const [comisionRambursare, setComisionRambursare] = useState(1);
  const [taxaAnaliza, setTaxaAnaliza] = useState(500);

  const {
    rataNoua, economielunar, totalVechi, totalNou,
    economieTotal, costuriRefinantare, economieNeta, breakEven, merita
  } = useMemo(() => {
    const rataNoua = calcMonthly(soldRamas, dobandaNoua, luniRamase);
    const economielunar = rataActuala - rataNoua;
    const totalVechi = rataActuala * luniRamase;
    const totalNou = rataNoua * luniRamase;
    const economieTotal = totalVechi - totalNou;
    const costuriRefinantare = soldRamas * comisionRambursare / 100 + taxaAnaliza;
    const economieNeta = economieTotal - costuriRefinantare;
    const breakEven = economielunar > 0 ? Math.ceil(costuriRefinantare / economielunar) : Infinity;
    const merita = economieNeta > 0 && economielunar > 0;
    return { rataNoua, economielunar, totalVechi, totalNou, economieTotal, costuriRefinantare, economieNeta, breakEven, merita };
  }, [soldRamas, rataActuala, luniRamase, dobandaNoua, comisionRambursare, taxaAnaliza]);

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="bg-[#0A1A2E] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Calculator refinanțare credit</h1>
          <p className="text-gray-300">Calculează economia pe care o poți face refinanțând creditul actual cu o ofertă mai bună. Include comisionul de rambursare anticipată și taxa de analiză.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#E5E3D9] rounded-xl p-8">
            <h2 className="text-lg font-bold text-[#0A1A2E] mb-6 pb-4 border-b border-[#E5E3D9]">Credit actual</h2>
            <div className="space-y-5">
              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Sold rămas</Label>
                <div className="relative">
                  <Input data-testid="input-sold" type="number" value={soldRamas} onChange={(e) => setSoldRamas(parseFloat(e.target.value) || 0)} className="pr-12 border-[#E5E3D9]" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6478] text-sm">RON</span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Rată lunară curentă</Label>
                <div className="relative">
                  <Input data-testid="input-rata-actuala" type="number" value={rataActuala} onChange={(e) => setRataActuala(parseFloat(e.target.value) || 0)} className="pr-12 border-[#E5E3D9]" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6478] text-sm">RON</span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Luni rămase</Label>
                <div className="relative">
                  <Input data-testid="input-luni" type="number" value={luniRamase} onChange={(e) => setLuniRamase(parseInt(e.target.value) || 0)} min={1} className="pr-14 border-[#E5E3D9]" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6478] text-sm">luni</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E3D9] rounded-xl p-8">
            <h2 className="text-lg font-bold text-[#0A1A2E] mb-6 pb-4 border-b border-[#E5E3D9]">Oferta nouă</h2>
            <div className="space-y-5">
              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Dobânda noii oferte</Label>
                <div className="relative">
                  <Input data-testid="input-dobanda-noua" type="number" value={dobandaNoua} onChange={(e) => setDobandaNoua(parseFloat(e.target.value) || 0)} step={0.1} className="pr-8 border-[#E5E3D9]" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6478] text-sm">%</span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Comision rambursare anticipată</Label>
                <div className="relative">
                  <Input data-testid="input-comision" type="number" value={comisionRambursare} onChange={(e) => setComisionRambursare(parseFloat(e.target.value) || 0)} step={0.1} min={0} max={5} className="pr-8 border-[#E5E3D9]" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6478] text-sm">%</span>
                </div>
                <div className="text-xs text-[#5A6478] mt-1">Max. 1% dacă mai sunt &gt;12 luni (Directiva UE)</div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Taxa analiză banca nouă</Label>
                <div className="relative">
                  <Input data-testid="input-taxa" type="number" value={taxaAnaliza} onChange={(e) => setTaxaAnaliza(parseFloat(e.target.value) || 0)} min={0} className="pr-12 border-[#E5E3D9]" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6478] text-sm">RON</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-8 rounded-xl p-8 ${merita ? "bg-gradient-to-r from-[#0A1A2E] to-[#132846]" : "bg-gradient-to-r from-[#2d1210] to-[#3d1a18]"} text-white`}>
          <div className="flex items-center gap-3 mb-6">
            {merita ? (
              <><CheckCircle className="h-6 w-6 text-[#2E7D5B]" /><span className="text-lg font-bold text-[#2E7D5B]">Merită să refinanțezi</span></>
            ) : (
              <><XCircle className="h-6 w-6 text-[#C4432F]" /><span className="text-lg font-bold text-[#C4432F]">Nu merită în acest moment</span></>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <div className="text-xs text-gray-400 mb-1">Rată nouă</div>
              <div data-testid="result-rata-noua" className="text-2xl font-bold">{formatRON(rataNoua)}</div>
              <div className="text-xs text-gray-400">vs. {formatRON(rataActuala)} actual</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Economie lunară</div>
              <div data-testid="result-economie-lunara" className={`text-2xl font-bold ${economielunar >= 0 ? "text-[#2E7D5B]" : "text-[#C4432F]"}`}>
                {economielunar >= 0 ? "+" : ""}{formatRON(economielunar)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Economie netă totală</div>
              <div data-testid="result-economie-neta" className={`text-2xl font-bold ${economieNeta >= 0 ? "text-[#2E7D5B]" : "text-[#C4432F]"}`}>
                {economieNeta >= 0 ? "+" : ""}{formatRON(economieNeta)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Break-even</div>
              <div data-testid="result-breakeven" className="text-2xl font-bold">
                {isFinite(breakEven) ? `${breakEven} luni` : "—"}
              </div>
              <div className="text-xs text-gray-400">până la recuperare costuri</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6 bg-white/5 rounded-lg p-4">
            <div className="flex justify-between"><span className="text-gray-400">Total plătit (creditul vechi)</span><span>{formatRON(totalVechi)}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Total plătit (creditul nou)</span><span>{formatRON(totalNou)}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Costuri refinanțare</span><span className="text-[#C6A667]">{formatRON(costuriRefinantare)}</span></div>
          </div>

          <Link href="/aplicare-credit">
            <Button className="bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-bold" data-testid="btn-apply">
              Aplică refinanțare
            </Button>
          </Link>
        </div>

        <div className="mt-6 flex items-start gap-2 text-xs text-[#5A6478] bg-white border border-[#E5E3D9] rounded-lg p-4">
          <Info className="h-4 w-4 mt-0.5 shrink-0 text-[#C6A667]" />
          Compară creditul actual cu o ofertă nouă, ținând cont de comisionul de rambursare anticipată și taxa de analiză a noii bănci. Calcul informativ.
        </div>
      </div>
    </div>
  );
}
