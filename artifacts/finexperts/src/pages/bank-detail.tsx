import { Link, useParams } from "wouter";
import { banks, calculateMonthlyPayment } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";

function formatRON(value: number) {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(value) + " RON";
}

const bankDetails: Record<string, {
  description: string;
  advantages: string[];
  conditions: string[];
  minAmount: number;
  maxAmount: number;
  maxPeriod: number;
}> = {
  bcr: {
    description: "BCR este cea mai mare bancă din România prin active, cu o rețea de peste 2.000 de terminale ATM și 800 de sucursale. Membră a grupului Erste Group.",
    advantages: ["Aprobare rapidă în 24h", "Fără garanții pentru credite personale până la 75.000 RON", "Asigurare de viață inclusă", "App BCR George"],
    conditions: ["Vârsta: 18-65 ani", "Venit net minim: 2.000 RON", "Vechime minimă loc de muncă: 3 luni", "Cetățenie română sau permis de ședere"],
    minAmount: 2000, maxAmount: 150000, maxPeriod: 84
  },
  brd: {
    description: "BRD – Groupe Société Générale este a doua bancă din România prin mărime. Parte a grupului francez Société Générale.",
    advantages: ["Dobândă fixă pe toată durata", "Rambursare anticipată fără penalități după 12 luni", "MyBRD Mobile Banking", "Consultanți dedicați"],
    conditions: ["Vârsta: 21-65 ani", "Venit net minim: 1.800 RON", "Vechime minimă: 6 luni", "Dosar complet în sucursală sau online"],
    minAmount: 3000, maxAmount: 100000, maxPeriod: 72
  },
  ing: {
    description: "ING Bank oferă una dintre cele mai competitive dobânzi pentru credite de nevoi personale din România, cu procese 100% digitale.",
    advantages: ["Cea mai mică dobândă din piață", "Aprobare 100% online în 10 minute", "Fără vizită la bancă", "ING Home'Bank"],
    conditions: ["Vârsta: 18-65 ani", "Venit net minim: 1.500 RON", "Cont ING necesar", "Venituri salariale sau pensie"],
    minAmount: 1000, maxAmount: 100000, maxPeriod: 60
  },
  raiffeisen: {
    description: "Raiffeisen Bank România face parte din Grupul Raiffeisen Bank International, una dintre cele mai mari bănci austriece.",
    advantages: ["Oferte personalizate pe profil", "Smart Mobile Banking", "Pachete de credite și asigurări", "Aprobare în 48h"],
    conditions: ["Vârsta: 18-67 ani", "Venit net minim: 1.600 RON", "Documente: BI/CI + adeverință venit", "Cont curent Raiffeisen"],
    minAmount: 1000, maxAmount: 120000, maxPeriod: 84
  },
  "alpha-bank": {
    description: "Alpha Bank România face parte din Grupul Alpha Services & Holdings, unul dintre cele mai mari grupuri bancare din Grecia și SE Europa.",
    advantages: ["Dobândă fixă sau variabilă la alegere", "Servicii premium", "Portofoliu complet de asigurări", "Consultanți experți"],
    conditions: ["Vârsta: 21-65 ani", "Venit net minim: 2.000 RON", "Vechime: minim 6 luni", "Dosare complete la sucursală"],
    minAmount: 5000, maxAmount: 100000, maxPeriod: 60
  },
  unicredit: {
    description: "UniCredit Bank este prezentă în România din 1995 și face parte din Grupul UniCredit, unul dintre cele mai mari grupuri bancare europene.",
    advantages: ["Acces la credite în EUR", "Condiții speciale pentru angajații corporații", "UniCredit Buddybank App", "Produse flexibile"],
    conditions: ["Vârsta: 18-65 ani", "Venit net minim: 2.000 RON", "Vechime: 6 luni", "Dosar complet cu BI/CI și acte venit"],
    minAmount: 3000, maxAmount: 100000, maxPeriod: 72
  },
  "otp-bank": {
    description: "OTP Bank România face parte din Grupul OTP, una din primele 10 bănci din Europa Centrală și de Est ca active.",
    advantages: ["Condiții competitive", "Perioade flexibile", "OTP SmartBank", "Servicii multicanal"],
    conditions: ["Vârsta: 18-65 ani", "Venit net minim: 1.500 RON", "Dovadă venituri", "Cetățenie română"],
    minAmount: 1000, maxAmount: 80000, maxPeriod: 60
  },
  "garanti-bbva": {
    description: "Garanti BBVA România este o bancă cu capital turcesc-spaniol, filială a Garanti BBVA, la rândul ei filială a grupului BBVA.",
    advantages: ["Condiții speciale clienți existenți", "Pachete 0 comisioane", "Digital banking avansat", "Dobânzi competitive"],
    conditions: ["Vârsta: 18-65 ani", "Venit net minim: 2.000 RON", "Vechime: 6 luni", "Dosar complet la sucursală"],
    minAmount: 2000, maxAmount: 75000, maxPeriod: 60
  },
  "patria-bank": {
    description: "Patria Bank este o bancă românească ce se adresează cu precădere persoanelor fizice din mediul urban și rural, inclusiv persoanelor cu venituri variabile.",
    advantages: ["Acceptă PFA și liber profesioniști", "Proces de aprobare flexibil", "Condiții adaptate veniturilor variabile", "Filiala rurală extinsă"],
    conditions: ["Vârsta: 18-65 ani", "Venit net minim: 1.200 RON", "Acceptă toate tipurile de venituri", "Dosar simplificat"],
    minAmount: 500, maxAmount: 50000, maxPeriod: 60
  },
  "libra-bank": {
    description: "Libra Internet Bank este o bancă 100% digitală, cu procese simplificate și o abordare prietenoasă față de antreprenori și freelanceri.",
    advantages: ["Banca 100% digitală", "Procese simplificate", "Ideal pentru antreprenori", "Libra Smart Card"],
    conditions: ["Vârsta: 18-65 ani", "Venit net minim: 1.500 RON", "Cont Libra Internet Bank", "Verificare video KYC"],
    minAmount: 1000, maxAmount: 60000, maxPeriod: 60
  },
  "nexent-bank": {
    description: "Nexent Bank (fosta Carpatica) se adresează cu precădere IMM-urilor și persoanelor fizice din Transilvania și restul României.",
    advantages: ["Aprobare rapidă", "Condiții flexibile", "Experiență locală", "Suport personalizat"],
    conditions: ["Vârsta: 18-65 ani", "Venit net minim: 1.500 RON", "Dosar complet la sucursală", "Cetățenie română"],
    minAmount: 1000, maxAmount: 50000, maxPeriod: 60
  }
};

export default function BankDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const bank = banks.find(b => b.slug === slug);
  const details = bankDetails[slug];

  if (!bank || !details) {
    return (
      <div className="min-h-screen bg-[#F7F4EC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0A1A2E] mb-4">Banca nu a fost găsită</h1>
          <Link href="/banci"><Button>Înapoi la bănci</Button></Link>
        </div>
      </div>
    );
  }

  const example = [
    { label: "5.000 RON / 12 luni", principal: 5000, months: 12 },
    { label: "15.000 RON / 36 luni", principal: 15000, months: 36 },
    { label: "30.000 RON / 60 luni", principal: 30000, months: 60 },
    { label: "150.000 RON / 120 luni (ipotecar)", principal: 150000, months: 120, isIpotecar: true },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="bg-[#0A1A2E] py-8">
        <div className="container mx-auto px-4">
          <Link href="/banci" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 text-sm transition-colors">
            <ArrowLeft className="h-4 w-4" /> Înapoi la toate băncile
          </Link>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center p-2">
              <img
                src={bank.logo}
                alt={bank.name}
                className="h-16 w-16 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${bank.name}&background=ffffff&color=0A1A2E&size=64`; }}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{bank.name}</h1>
              <p className="text-gray-400 mt-1">Dobândă personal: {bank.ratePersonal}% · Ipotecar: {bank.rateIpotecar}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-8">
              <h2 className="text-xl font-bold text-[#0A1A2E] mb-4">Despre {bank.name}</h2>
              <p className="text-[#5A6478]">{details.description}</p>
            </div>

            <div className="bg-white border border-[#E5E3D9] rounded-xl p-8">
              <h2 className="text-xl font-bold text-[#0A1A2E] mb-6">Rate orientative</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E5E3D9]">
                      <th className="text-left text-xs font-semibold text-[#5A6478] uppercase tracking-wider pb-3">Scenariu</th>
                      <th className="text-right text-xs font-semibold text-[#5A6478] uppercase tracking-wider pb-3">Rata lunară</th>
                      <th className="text-right text-xs font-semibold text-[#5A6478] uppercase tracking-wider pb-3">Total rambursabil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {example.map((ex) => {
                      const rate = ex.isIpotecar ? bank.rateIpotecar : bank.ratePersonal;
                      const monthly = calculateMonthlyPayment(ex.principal, rate, ex.months);
                      return (
                        <tr key={ex.label} className="border-b border-[#E5E3D9] last:border-0">
                          <td className="py-4">
                            <div className="text-sm font-semibold text-[#0A1A2E]">{ex.label}</div>
                            <div className="text-xs text-[#5A6478]">Dobândă {rate}%{ex.isIpotecar ? " (ipotecar)" : " (personal)"}</div>
                          </td>
                          <td className="py-4 text-right font-bold text-[#0A1A2E]">{formatRON(monthly)}</td>
                          <td className="py-4 text-right text-[#5A6478]">{formatRON(monthly * ex.months)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-[#E5E3D9] rounded-xl p-8">
              <h2 className="text-xl font-bold text-[#0A1A2E] mb-6">Condiții de eligibilitate</h2>
              <div className="space-y-3">
                {details.conditions.map((cond, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0A1A2E]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-[#0A1A2E]">{i + 1}</span>
                    </div>
                    <span className="text-sm text-[#5A6478]">{cond}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#0A1A2E] mb-4">Avantaje</h3>
              <div className="space-y-3">
                {details.advantages.map((adv, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#2E7D5B] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#5A6478]">{adv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#0A1A2E] to-[#132846] rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Aplică la {bank.name}</h3>
              <p className="text-sm text-gray-400 mb-5">Aplicarea este gratuită și fără obligații. Noi preluăm dosarul și comunicăm cu banca pentru tine.</p>
              <Link href="/aplicare-credit">
                <Button className="w-full bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-bold" data-testid="btn-apply-bank">
                  Aplică credit <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="bg-white border border-[#E5E3D9] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[#0A1A2E] mb-3">Limite credit</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#5A6478]"><span>Sumă minimă</span><span className="font-semibold text-[#0A1A2E]">{formatRON(details.minAmount)}</span></div>
                <div className="flex justify-between text-[#5A6478]"><span>Sumă maximă</span><span className="font-semibold text-[#0A1A2E]">{formatRON(details.maxAmount)}</span></div>
                <div className="flex justify-between text-[#5A6478]"><span>Perioadă maximă</span><span className="font-semibold text-[#0A1A2E]">{details.maxPeriod} luni</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
