import { useState, useMemo } from "react";
import { Link, useParams } from "wouter";
import { banks, calculateMonthlyPayment, formatRON } from "@/lib/data";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Star, CheckCircle, XCircle, ArrowRight } from "lucide-react";

const conditions: Record<string, string[]> = {
  "intesa-sanpaolo": ["Vârsta: 18–65 ani", "Venit net minim: 1.800 RON", "Vechime minimă: 3 luni", "Cetățenie română sau permis de ședere"],
  "ing-bank": ["Vârsta: 18–65 ani", "Venit net minim: 1.500 RON", "Cont ING necesar", "Venituri salariale sau pensie"],
  "bcr": ["Vârsta: 18–65 ani", "Venit net minim: 2.000 RON", "Vechime minimă: 3 luni", "Cetățenie română sau permis de ședere"],
  "garanti-bbva": ["Vârsta: 18–65 ani", "Venit net minim: 2.000 RON", "Vechime: 6 luni", "Dosar complet la sucursală"],
  "unicredit": ["Vârsta: 18–65 ani", "Venit net minim: 2.000 RON", "Vechime: 6 luni", "Dosar complet cu BI/CI și acte venit"],
  "brd": ["Vârsta: 21–65 ani", "Venit net minim: 1.800 RON", "Vechime minimă: 6 luni", "Dosar complet în sucursală sau online"],
  "raiffeisen": ["Vârsta: 18–67 ani", "Venit net minim: 1.600 RON", "Documente: BI/CI + adeverință venit", "Cont curent Raiffeisen"],
  "exim-bank": ["Vârsta: 18–65 ani", "Venit net minim: 2.000 RON", "Dosar complet la sucursală", "Cetățenie română"],
  "libra-bank": ["Vârsta: 18–65 ani", "Venit net minim: 1.500 RON", "Cont Libra Internet Bank", "Verificare video KYC"],
  "patria-bank": ["Vârsta: 18–65 ani", "Venit net minim: 1.200 RON", "Acceptă toate tipurile de venituri", "Dosar simplificat"],
  "nexent-bank": ["Vârsta: 18–65 ani", "Venit net minim: 1.500 RON", "Dosar complet la sucursală", "Cetățenie română"],
};

export default function BankDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const bank = banks.find(b => b.slug === slug);

  const [activeType, setActiveType] = useState<"personal" | "ipotecar">("personal");
  const [amount, setAmount] = useState(30000);
  const [months, setMonths] = useState(36);

  const monthly = useMemo(() => {
    if (!bank) return 0;
    const rate = activeType === "personal" ? bank.ratePersonal : bank.rateIpotecar;
    return calculateMonthlyPayment(amount, rate, months);
  }, [bank, activeType, amount, months]);

  if (!bank) {
    return (
      <div className="min-h-screen bg-[#F7F4EC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0A1A2E] mb-4">Banca nu a fost găsită</h1>
          <Link href="/banci">
            <button className="bg-[#0A1A2E] text-white px-6 py-2 rounded-lg">Înapoi la bănci</button>
          </Link>
        </div>
      </div>
    );
  }

  const rate = activeType === "personal" ? bank.ratePersonal : bank.rateIpotecar;
  const dae = activeType === "personal" ? bank.daePersonal : bank.daeIpotecar;
  const conds = conditions[slug] || ["Vârsta: 18–65 ani", "Venit net minim: 1.500 RON", "Cetățenie română", "Dosar complet"];

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Back */}
        <Link href="/banci" className="inline-flex items-center gap-1.5 text-sm text-[#5A6478] hover:text-[#0A1A2E] mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Înapoi la toate băncile
        </Link>

        {/* Header */}
        <div className="bg-[#0A1A2E] rounded-xl p-6 lg:p-8 mb-6 flex items-center gap-5">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ backgroundColor: bank.color }}
          >
            {bank.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{bank.name}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(bank.rating) ? "fill-[#C6A667] text-[#C6A667]" : "fill-white/20 text-white/20"}`} />
                ))}
                <span className="text-sm text-gray-300 ml-1">{bank.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-gray-300">Loc #{bank.rank} în România</span>
              {bank.badge && (
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ backgroundColor: (bank.badgeColor || "#C6A667") + "25", color: bank.badgeColor || "#C6A667" }}
                >
                  {bank.badge}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Description */}
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-6">
              <h2 className="text-base font-semibold text-[#0A1A2E] mb-3">Despre {bank.name}</h2>
              <p className="text-sm text-[#5A6478] leading-relaxed">{bank.description}</p>
            </div>

            {/* Avantaje / Dezavantaje */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white border border-[#E5E3D9] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[#0A1A2E] uppercase tracking-wider mb-4">Avantaje</h3>
                <div className="space-y-2.5">
                  {bank.advantages.map((adv, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#5A6478]">{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-[#E5E3D9] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[#0A1A2E] uppercase tracking-wider mb-4">Dezavantaje</h3>
                <div className="space-y-2.5">
                  {bank.disadvantages.map((dis, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-[#C4432F] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#5A6478]">{dis}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Condiții */}
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-6">
              <h3 className="text-base font-semibold text-[#0A1A2E] mb-4">Condiții de eligibilitate</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {conds.map((cond, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#0A1A2E]/8 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[9px] font-bold text-[#0A1A2E]">{i + 1}</span>
                    </div>
                    <span className="text-sm text-[#5A6478]">{cond}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Oferte disponibile */}
            <div className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E5E3D9]">
                <h3 className="text-base font-semibold text-[#0A1A2E]">Oferte disponibile</h3>
              </div>
              <div className="divide-y divide-[#E5E3D9]">
                <div className="grid grid-cols-4 px-6 py-4">
                  <div>
                    <div className="text-xs text-[#5A6478] mb-0.5">Tip credit</div>
                    <div className="text-sm font-semibold text-[#0A1A2E]">Credit personal</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#5A6478] mb-0.5">DAE</div>
                    <div className="text-sm font-semibold text-[#0A1A2E]">{bank.daePersonal.toFixed(2)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#5A6478] mb-0.5">Dobândă</div>
                    <div className="text-sm font-semibold text-[#0A1A2E]">{bank.ratePersonal.toFixed(2)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#5A6478] mb-0.5">Sumă</div>
                    <div className="text-xs text-[#5A6478]">{formatRON(bank.minAmountPersonal)} – {formatRON(bank.maxAmountPersonal)}</div>
                  </div>
                </div>
                <div className="grid grid-cols-4 px-6 py-4">
                  <div>
                    <div className="text-xs text-[#5A6478] mb-0.5">Tip credit</div>
                    <div className="text-sm font-semibold text-[#0A1A2E]">Credit ipotecar</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#5A6478] mb-0.5">DAE</div>
                    <div className="text-sm font-semibold text-[#0A1A2E]">{bank.daeIpotecar.toFixed(2)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#5A6478] mb-0.5">Dobândă</div>
                    <div className="text-sm font-semibold text-[#0A1A2E]">{bank.rateIpotecar.toFixed(2)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#5A6478] mb-0.5">Sumă</div>
                    <div className="text-xs text-[#5A6478]">{formatRON(bank.minAmountIpotecar)} – {formatRON(bank.maxAmountIpotecar)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: calculator */}
          <div className="space-y-5">
            {/* Mini-calc */}
            <div className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
              <div className="px-5 pt-5 pb-4">
                <h3 className="text-sm font-semibold text-[#0A1A2E] mb-3">Calculator rată</h3>
                {/* tab */}
                <div className="flex gap-2 mb-4">
                  {(["personal", "ipotecar"] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => {
                        setActiveType(t);
                        setAmount(t === "personal" ? 30000 : 150000);
                        setMonths(t === "personal" ? 36 : 120);
                      }}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        activeType === t ? "bg-[#0A1A2E] text-white" : "text-[#5A6478] hover:text-[#0A1A2E]"
                      }`}
                    >
                      {t === "personal" ? "Personal" : "Ipotecar"}
                    </button>
                  ))}
                </div>
                {/* sliders */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#5A6478] uppercase tracking-wider font-semibold">Sumă</span>
                    <span className="font-semibold text-[#0A1A2E]">{formatRON(amount)}</span>
                  </div>
                  <Slider
                    min={activeType === "personal" ? 1000 : 30000}
                    max={activeType === "personal" ? 200000 : 600000}
                    step={activeType === "personal" ? 1000 : 5000}
                    value={[amount]}
                    onValueChange={([v]) => setAmount(v)}
                  />
                </div>
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#5A6478] uppercase tracking-wider font-semibold">Perioadă</span>
                    <span className="font-semibold text-[#0A1A2E]">{months} luni</span>
                  </div>
                  <Slider
                    min={activeType === "personal" ? 6 : 12}
                    max={activeType === "personal" ? 60 : 360}
                    step={activeType === "personal" ? 6 : 12}
                    value={[months]}
                    onValueChange={([v]) => setMonths(v)}
                  />
                </div>
              </div>

              <div className="bg-[#0A1A2E] p-5">
                <div className="text-xs text-gray-400 mb-1">Rată lunară estimativă</div>
                <div className="text-3xl font-bold text-white mb-0.5">
                  {Math.round(monthly).toLocaleString("ro-RO")} RON
                </div>
                <div className="text-xs text-gray-400 mb-3">
                  Dobândă {rate.toFixed(2)}% · DAE {dae.toFixed(2)}%
                </div>
                <div className="text-xs text-gray-500">
                  Total rambursabil: {formatRON(Math.round(monthly * months))}
                </div>
              </div>
            </div>

            {/* Apply */}
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#0A1A2E] mb-2">Aplică la {bank.name}</h3>
              <p className="text-xs text-[#5A6478] mb-4">Aplicarea este gratuită. Noi preluăm dosarul și comunicăm cu banca pentru tine.</p>
              <Link href="/aplica">
                <button data-testid="btn-apply-bank" className="w-full bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                  Aplică credit <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
