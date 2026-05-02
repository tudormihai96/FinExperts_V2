import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { calculateMonthlyPayment } from "@/lib/data";
import { Info, TrendingUp } from "lucide-react";

function formatRON(value: number) {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(value) + " RON";
}

export default function MaxLoanPage() {
  const [venit, setVenit] = useState(5000);
  const [obligatii, setObligatii] = useState(500);
  const [rata, setRata] = useState(8.5);
  const [perioada, setPerioada] = useState(60);

  const result = useMemo(() => {
    const rataMaxima = venit * 0.4 - obligatii;
    if (rataMaxima <= 0) return null;
    const r = rata / 12 / 100;
    let maxLoan = 0;
    if (r === 0) {
      maxLoan = rataMaxima * perioada;
    } else {
      maxLoan = rataMaxima * (Math.pow(1 + r, perioada) - 1) / (r * Math.pow(1 + r, perioada));
    }
    return { rataMaxima, maxLoan: Math.max(0, maxLoan) };
  }, [venit, obligatii, rata, perioada]);

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="bg-[#0A1A2E] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Calculator sumă maximă</h1>
          <p className="text-gray-300">Află cât poți împrumuta în funcție de venitul tău net și obligațiile lunare. Calcul DTI 40% conform reglementărilor BNR.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white border border-[#E5E3D9] rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Venit net lunar</Label>
              <div className="relative">
                <Input
                  data-testid="input-venit"
                  type="number"
                  value={venit}
                  onChange={(e) => setVenit(parseFloat(e.target.value) || 0)}
                  min={0}
                  className="pr-12 border-[#E5E3D9]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6478] text-sm">RON</span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Obligații lunare existente</Label>
              <div className="relative">
                <Input
                  data-testid="input-obligatii"
                  type="number"
                  value={obligatii}
                  onChange={(e) => setObligatii(parseFloat(e.target.value) || 0)}
                  min={0}
                  className="pr-12 border-[#E5E3D9]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6478] text-sm">RON</span>
              </div>
              <div className="text-xs text-[#5A6478] mt-1">Rate existente, leasing, etc.</div>
            </div>

            <div>
              <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Rata dobânzii</Label>
              <div className="relative">
                <Input
                  data-testid="input-rata"
                  type="number"
                  value={rata}
                  onChange={(e) => setRata(parseFloat(e.target.value) || 0)}
                  step={0.1}
                  min={1}
                  max={30}
                  className="pr-8 border-[#E5E3D9]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6478] text-sm">%</span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Perioada</Label>
              <div className="relative">
                <Input
                  data-testid="input-perioada"
                  type="number"
                  value={perioada}
                  onChange={(e) => setPerioada(parseInt(e.target.value) || 0)}
                  min={6}
                  max={360}
                  className="pr-14 border-[#E5E3D9]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6478] text-sm">luni</span>
              </div>
            </div>
          </div>

          {result === null ? (
            <div className="bg-[#C4432F]/10 border border-[#C4432F]/30 rounded-xl p-6 text-center">
              <p className="text-[#C4432F] font-semibold">Obligațiile lunare depășesc 40% din venit.</p>
              <p className="text-sm text-[#5A6478] mt-1">Conform reglementărilor BNR, nu vă puteți permite un credit suplimentar în aceste condiții.</p>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-[#0A1A2E] to-[#132846] rounded-xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-6 w-6 text-[#C6A667]" />
                <span className="text-lg font-semibold text-gray-300">Rezultat calcul DTI 40%</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Poți împrumuta maxim</div>
                  <div data-testid="result-max-loan" className="text-4xl font-bold text-white">{formatRON(result.maxLoan)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Rată lunară maximă disponibilă</div>
                  <div data-testid="result-max-rate" className="text-2xl font-bold text-[#C6A667]">{formatRON(result.rataMaxima)}</div>
                  <div className="text-xs text-gray-400 mt-1">{venit} × 40% − {obligatii} = {result.rataMaxima.toFixed(0)} RON/lună</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <Link href="/aplicare-credit">
                  <Button className="bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-bold" data-testid="btn-apply">
                    Aplică credit
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div className="mt-6 flex items-start gap-2 text-xs text-[#5A6478] bg-[#F7F4EC] rounded-lg p-4">
            <Info className="h-4 w-4 mt-0.5 shrink-0 text-[#C6A667]" />
            Calcul automat conform reglementărilor BNR (Regulamentul 17/2012): grad de îndatorare maxim 40% din venitul net, ajustat cu obligațiile financiare existente. Calcul informativ. Banca poate aplica un coeficient mai strict pentru veniturile variabile (PFA, dividende) sau pentru clienți cu istoric.
          </div>
        </div>
      </div>
    </div>
  );
}
