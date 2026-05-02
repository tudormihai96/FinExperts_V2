import { useState } from "react";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { banks, calculateMonthlyPayment } from "@/lib/data";
import { ArrowRight } from "lucide-react";

function formatRON(value: number) {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(value) + " RON";
}

function BankCard({ bank, type }: { bank: typeof banks[0]; type: "personal" | "ipotecar" }) {
  const rate = type === "personal" ? bank.ratePersonal : bank.rateIpotecar;
  const exampleAmount = type === "personal" ? 20000 : 150000;
  const exampleMonths = type === "personal" ? 36 : 120;
  const monthly = calculateMonthlyPayment(exampleAmount, rate, exampleMonths);

  return (
    <div
      data-testid={`bank-card-${bank.id}`}
      className="bg-white border border-[#E5E3D9] rounded-xl p-6 hover:shadow-md hover:border-[#0A1A2E] transition-all group"
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-lg border border-[#E5E3D9] flex items-center justify-center bg-[#F7F4EC] overflow-hidden p-1.5">
          <img
            src={bank.logo}
            alt={bank.name}
            className="h-10 w-10 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${bank.name}&background=0A1A2E&color=fff&size=40`; }}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#0A1A2E]">{bank.name}</h3>
          <div className="text-sm text-[#5A6478]">Dobândă de la <span className="font-semibold text-[#0A1A2E]">{rate}%</span></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-[#F7F4EC] rounded-lg">
        <div>
          <div className="text-xs text-[#5A6478] mb-1">Exemplu rată lunară</div>
          <div className="text-lg font-bold text-[#0A1A2E]">{formatRON(monthly)}</div>
          <div className="text-[11px] text-[#5A6478]">{formatRON(exampleAmount)} / {exampleMonths} luni</div>
        </div>
        <div>
          <div className="text-xs text-[#5A6478] mb-1">DAE estimat</div>
          <div className="text-lg font-bold text-[#0A1A2E]">{(rate + (type === "personal" ? 1.2 : 0.8)).toFixed(1)}%</div>
          <div className="text-[11px] text-[#5A6478]">Include comisioane</div>
        </div>
      </div>

      <Link href={`/banci/${bank.slug}`}>
        <Button
          data-testid={`btn-bank-detail-${bank.id}`}
          variant="outline"
          className="w-full border-[#0A1A2E] text-[#0A1A2E] group-hover:bg-[#0A1A2E] group-hover:text-white transition-colors"
        >
          Vezi detalii <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}

export default function BanksPage() {
  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="bg-[#0A1A2E] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Comparator bănci</h1>
          <p className="text-gray-300">Compară cele 11 bănci românești. Rate actualizate 2026.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-8 bg-white border border-[#E5E3D9] p-1 h-auto">
            <TabsTrigger value="personal" data-testid="tab-personal" className="data-[state=active]:bg-[#0A1A2E] data-[state=active]:text-white px-6 py-3 text-sm font-semibold">
              Credit personal
            </TabsTrigger>
            <TabsTrigger value="ipotecar" data-testid="tab-ipotecar" className="data-[state=active]:bg-[#0A1A2E] data-[state=active]:text-white px-6 py-3 text-sm font-semibold">
              Credit ipotecar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {banks.sort((a, b) => a.ratePersonal - b.ratePersonal).map(bank => (
                <BankCard key={bank.id} bank={bank} type="personal" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ipotecar" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {banks.sort((a, b) => a.rateIpotecar - b.rateIpotecar).map(bank => (
                <BankCard key={bank.id} bank={bank} type="ipotecar" />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-gradient-to-r from-[#0A1A2E] to-[#132846] rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Vrei ajutor să alegi banca potrivită?</h3>
            <p className="text-gray-300">Consultanții FinExperts îți analizează gratuit profilul și îți recomandă cea mai bună ofertă.</p>
          </div>
          <Link href="/aplicare-credit">
            <Button className="bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-bold px-8 shrink-0" data-testid="btn-apply-cta">
              Aplică gratuit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
