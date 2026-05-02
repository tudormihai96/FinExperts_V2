import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { banks, calculateMonthlyPayment } from "@/lib/data";
import { Info } from "lucide-react";

function formatRON(value: number) {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(value) + " RON";
}

function BankResultsTable({ principal, months, type }: { principal: number; months: number; type: "personal" | "ipotecar" }) {
  const results = useMemo(() => {
    return banks
      .map((bank) => {
        const rate = type === "personal" ? bank.ratePersonal : bank.rateIpotecar;
        const monthly = calculateMonthlyPayment(principal, rate, months);
        const total = monthly * months;
        const dae = rate + (type === "personal" ? 1.2 : 0.8);
        return { ...bank, monthly, total, dae, rate };
      })
      .sort((a, b) => a.monthly - b.monthly);
  }, [principal, months, type]);

  return (
    <div className="mt-8 border border-[#E5E3D9] rounded-xl overflow-hidden bg-white">
      <div className="grid grid-cols-12 bg-[#0A1A2E] text-white text-xs font-semibold uppercase tracking-wider px-4 py-3">
        <div className="col-span-4">Bancă</div>
        <div className="col-span-2 text-right">Dobândă</div>
        <div className="col-span-3 text-right">Rată lunară</div>
        <div className="col-span-2 text-right">Total</div>
        <div className="col-span-1"></div>
      </div>
      {results.map((bank, i) => (
        <div
          key={bank.id}
          data-testid={`bank-row-${bank.id}`}
          className={`grid grid-cols-12 items-center px-4 py-4 border-b border-[#E5E3D9] last:border-b-0 hover:bg-[#F7F4EC] transition-colors ${i === 0 ? "border-l-4 border-l-[#2E7D5B]" : ""}`}
        >
          <div className="col-span-4 flex items-center gap-3">
            <img
              src={bank.logo}
              alt={bank.name}
              className="h-8 w-8 object-contain rounded"
              onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${bank.name}&background=0A1A2E&color=fff&size=32`; }}
            />
            <div>
              <div className="font-semibold text-[#0A1A2E] text-sm">{bank.name}</div>
              {i === 0 && (
                <span className="text-[10px] font-bold text-[#2E7D5B] uppercase tracking-wider">Cea mai bună</span>
              )}
            </div>
          </div>
          <div className="col-span-2 text-right">
            <span className="text-sm font-semibold text-[#0A1A2E]">{bank.rate.toFixed(2)}%</span>
            <div className="text-[11px] text-[#5A6478]">DAE {bank.dae.toFixed(2)}%</div>
          </div>
          <div className="col-span-3 text-right">
            <span className="text-base font-bold text-[#0A1A2E]">{formatRON(bank.monthly)}</span>
          </div>
          <div className="col-span-2 text-right text-sm text-[#5A6478]">
            {formatRON(bank.total)}
          </div>
          <div className="col-span-1 text-right">
            <Link href={`/banci/${bank.slug}`}>
              <Button size="sm" variant="ghost" className="text-[#0A1A2E] hover:text-[#C6A667] text-xs px-2">
                Detalii
              </Button>
            </Link>
          </div>
        </div>
      ))}
      <div className="px-4 py-3 bg-[#F7F4EC] text-xs text-[#5A6478] flex items-start gap-2">
        <Info className="h-4 w-4 mt-0.5 shrink-0 text-[#C6A667]" />
        Calcul informativ. Banca poate ajusta oferta în funcție de scoring și venit.
      </div>
    </div>
  );
}

function CreditCalculator({ type }: { type: "personal" | "ipotecar" }) {
  const isIpotecar = type === "ipotecar";
  const [amount, setAmount] = useState(isIpotecar ? 150000 : 20000);
  const [months, setMonths] = useState(isIpotecar ? 120 : 36);
  const [rate, setRate] = useState(isIpotecar ? 5.5 : 8.0);

  const minAmount = isIpotecar ? 30000 : 1000;
  const maxAmount = isIpotecar ? 600000 : 150000;
  const minMonths = isIpotecar ? 12 : 6;
  const maxMonths = isIpotecar ? 360 : 84;

  const bestRate = isIpotecar ? 5.9 : 8.9;
  const monthlyPayment = useMemo(() => calculateMonthlyPayment(amount, rate, months), [amount, rate, months]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
        <div>
          <div className="flex justify-between mb-2">
            <Label className="text-sm font-semibold text-[#0A1A2E]">Suma creditului</Label>
            <span className="text-sm font-bold text-[#C6A667]">{formatRON(amount)}</span>
          </div>
          <Slider
            data-testid="slider-amount"
            min={minAmount}
            max={maxAmount}
            step={isIpotecar ? 5000 : 500}
            value={[amount]}
            onValueChange={([v]) => setAmount(v)}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-[#5A6478]">
            <span>{formatRON(minAmount)}</span>
            <span>{formatRON(maxAmount)}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Label className="text-sm font-semibold text-[#0A1A2E]">Perioada</Label>
            <span className="text-sm font-bold text-[#C6A667]">{months} luni ({(months / 12).toFixed(1)} ani)</span>
          </div>
          <Slider
            data-testid="slider-months"
            min={minMonths}
            max={maxMonths}
            step={isIpotecar ? 12 : 6}
            value={[months]}
            onValueChange={([v]) => setMonths(v)}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-[#5A6478]">
            <span>{minMonths} luni</span>
            <span>{maxMonths} luni</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Label className="text-sm font-semibold text-[#0A1A2E]">Dobânda anuală</Label>
            <span className="text-sm font-bold text-[#C6A667]">{rate.toFixed(2)}%</span>
          </div>
          <div className="relative">
            <Input
              data-testid="input-rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              step={0.1}
              min={1}
              max={30}
              className="pr-8 border-[#E5E3D9]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6478] text-sm">%</span>
          </div>
          <div className="text-xs text-[#5A6478] mt-1">Cea mai bună ofertă: {bestRate}% (ING)</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#0A1A2E] to-[#132846] rounded-xl p-6 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-sm text-gray-400 mb-1">Rata lunară estimată</div>
          <div data-testid="result-monthly" className="text-4xl font-bold">{formatRON(monthlyPayment)}</div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-xs text-gray-400">Total rambursabil</div>
            <div className="text-xl font-semibold">{formatRON(monthlyPayment * months)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Dobânzi totale</div>
            <div className="text-xl font-semibold">{formatRON(monthlyPayment * months - amount)}</div>
          </div>
        </div>
        <Link href="/aplicare-credit">
          <Button className="bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-bold px-6" data-testid="btn-apply">
            Aplică credit
          </Button>
        </Link>
      </div>

      <BankResultsTable principal={amount} months={months} type={type} />
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="bg-[#0A1A2E] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Calculator credit personal și ipotecar</h1>
          <p className="text-gray-300">Compară instant rata lunară la 11 bănci din România. Date oficiale 2026.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-8 bg-white border border-[#E5E3D9] p-1 h-auto">
            <TabsTrigger
              value="personal"
              data-testid="tab-personal"
              className="data-[state=active]:bg-[#0A1A2E] data-[state=active]:text-white px-6 py-3 text-sm font-semibold"
            >
              Credit personal
            </TabsTrigger>
            <TabsTrigger
              value="ipotecar"
              data-testid="tab-ipotecar"
              className="data-[state=active]:bg-[#0A1A2E] data-[state=active]:text-white px-6 py-3 text-sm font-semibold"
            >
              Credit ipotecar
            </TabsTrigger>
          </TabsList>

          <div className="bg-white border border-[#E5E3D9] rounded-xl p-8">
            <TabsContent value="personal" className="mt-0">
              <CreditCalculator type="personal" />
            </TabsContent>
            <TabsContent value="ipotecar" className="mt-0">
              <CreditCalculator type="ipotecar" />
            </TabsContent>
          </div>
        </Tabs>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/calculator/suma-maxima">
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-6 hover:border-[#0A1A2E] hover:shadow-md transition-all cursor-pointer">
              <div className="text-xs font-bold text-[#C6A667] uppercase tracking-wider mb-2">Calculator</div>
              <div className="font-bold text-[#0A1A2E]">Sumă maximă</div>
              <div className="text-sm text-[#5A6478]">Cât poți împrumuta în funcție de venit (DTI 40%)</div>
            </div>
          </Link>
          <Link href="/calculator/refinantare">
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-6 hover:border-[#0A1A2E] hover:shadow-md transition-all cursor-pointer">
              <div className="text-xs font-bold text-[#C6A667] uppercase tracking-wider mb-2">Calculator</div>
              <div className="font-bold text-[#0A1A2E]">Refinanțare</div>
              <div className="text-sm text-[#5A6478]">Calculează economia față de creditul actual</div>
            </div>
          </Link>
          <Link href="/banci">
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-6 hover:border-[#0A1A2E] hover:shadow-md transition-all cursor-pointer">
              <div className="text-xs font-bold text-[#C6A667] uppercase tracking-wider mb-2">Comparator</div>
              <div className="font-bold text-[#0A1A2E]">Toate băncile</div>
              <div className="text-sm text-[#5A6478]">Profil complet pentru fiecare bancă</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
