import { Link, useParams } from "wouter";
import { banks, formatRON } from "@/lib/data";
import { Star, ArrowLeft, CheckCircle, XCircle, ExternalLink, ArrowRight } from "lucide-react";

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

const officialSites: Record<string, string> = {
  "intesa-sanpaolo": "https://www.intesasanpaolobank.ro",
  "ing-bank": "https://www.ing.ro",
  "bcr": "https://www.bcr.ro",
  "garanti-bbva": "https://www.garantibbva.ro",
  "unicredit": "https://www.unicredit.ro",
  "brd": "https://www.brd.ro",
  "raiffeisen": "https://www.raiffeisen.ro",
  "exim-bank": "https://www.eximbank.ro",
  "libra-bank": "https://www.librabank.ro",
  "patria-bank": "https://www.patriabank.ro",
  "nexent-bank": "https://www.nexentbank.ro",
};

export default function BankDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const bank = banks.find(b => b.slug === slug);

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

  const conds = conditions[slug] || ["Vârsta: 18–65 ani", "Venit net minim: 1.500 RON", "Cetățenie română", "Dosar complet"];
  const siteUrl = officialSites[slug] || "#";

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back */}
        <Link href="/banci" className="inline-flex items-center gap-1.5 text-sm text-[#5A6478] hover:text-[#0A1A2E] mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Înapoi la toate băncile
        </Link>

        {/* Header card */}
        <div className="bg-white border border-[#E5E3D9] rounded-xl p-6 mb-6 flex items-start gap-5">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden"
            style={{ backgroundColor: bank.color }}
          >
            <img
              src={bank.logo}
              alt={bank.name}
              className="w-full h-full object-contain p-1.5"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
                const parent = img.parentElement;
                if (parent) {
                  const fallback = document.createElement("span");
                  fallback.textContent = bank.initials;
                  fallback.className = "text-white text-sm font-bold";
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-[#0A1A2E] mb-1.5">{bank.name}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`h-4 w-4 ${s <= Math.round(bank.rating) ? "fill-[#C6A667] text-[#C6A667]" : "fill-gray-200 text-gray-200"}`} />
                ))}
                <span className="text-sm text-[#5A6478] ml-1">{bank.rating.toFixed(1)}</span>
              </div>
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-[#5A6478] hover:text-[#0A1A2E] transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Site oficial
              </a>
              {bank.badge && (
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ backgroundColor: (bank.badgeColor || "#C6A667") + "20", color: bank.badgeColor || "#C6A667" }}
                >
                  {bank.badge}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Left: main content */}
          <div className="space-y-5">
            {/* Descriere */}
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-6">
              <h2 className="text-base font-semibold text-[#0A1A2E] mb-3">Despre {bank.name}</h2>
              <p className="text-sm text-[#5A6478] leading-relaxed">{bank.description}</p>
            </div>

            {/* Avantaje / Dezavantaje */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white border border-[#E5E3D9] rounded-xl p-6">
                <h3 className="text-xs font-bold text-[#2E7D5B] uppercase tracking-wider mb-4">Avantaje</h3>
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
                <h3 className="text-xs font-bold text-[#C4432F] uppercase tracking-wider mb-4">Dezavantaje</h3>
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

            {/* Ofertele disponibile */}
            <div className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E5E3D9]">
                <h3 className="text-base font-semibold text-[#0A1A2E]">Ofertele disponibile</h3>
              </div>

              {/* Credit personal */}
              <div className="p-6 border-b border-[#E5E3D9]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-semibold text-[#0A1A2E] mb-0.5">Credit personal</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#5A6478]">DAE</div>
                    <div className="text-lg font-bold text-[#0A1A2E]">{bank.daePersonal.toFixed(2)}%</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-[#5A6478] mb-0.5">Dobândă</div>
                    <div className="text-sm font-semibold text-[#0A1A2E]">{bank.ratePersonal.toFixed(2)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#5A6478] mb-0.5">Sumă</div>
                    <div className="text-xs text-[#5A6478]">
                      {formatRON(bank.minAmountPersonal)} – {formatRON(bank.maxAmountPersonal)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#5A6478] mb-0.5">Perioadă</div>
                    <div className="text-xs text-[#5A6478]">{bank.minMonthsPersonal} – {bank.maxMonthsPersonal} luni</div>
                  </div>
                </div>
                <Link href="/aplica">
                  <button className="flex items-center gap-1.5 border border-[#0A1A2E] text-[#0A1A2E] text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#0A1A2E] hover:text-white transition-colors">
                    Aplică <ArrowRight className="h-3 w-3" />
                  </button>
                </Link>
              </div>

              {/* Credit ipotecar */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-semibold text-[#0A1A2E] mb-0.5">Credit ipotecar</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#5A6478]">DAE</div>
                    <div className="text-lg font-bold text-[#0A1A2E]">{bank.daeIpotecar.toFixed(2)}%</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-[#5A6478] mb-0.5">Dobândă</div>
                    <div className="text-sm font-semibold text-[#0A1A2E]">{bank.rateIpotecar.toFixed(2)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#5A6478] mb-0.5">Sumă</div>
                    <div className="text-xs text-[#5A6478]">
                      {formatRON(bank.minAmountIpotecar)} – {formatRON(bank.maxAmountIpotecar)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#5A6478] mb-0.5">Perioadă</div>
                    <div className="text-xs text-[#5A6478]">{bank.minMonthsIpotecar} – {bank.maxMonthsIpotecar} luni</div>
                  </div>
                </div>
                <Link href="/aplica">
                  <button className="flex items-center gap-1.5 border border-[#0A1A2E] text-[#0A1A2E] text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#0A1A2E] hover:text-white transition-colors">
                    Aplică <ArrowRight className="h-3 w-3" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Condiții eligibilitate */}
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
          </div>

          {/* Right: apply sidebar */}
          <div>
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-6 sticky top-6">
              <div className="text-xs font-bold text-[#C6A667] uppercase tracking-wider mb-2">Aplică direct</div>
              <h3 className="text-xl font-bold text-[#0A1A2E] mb-3">Primești ofertă în 24h</h3>
              <p className="text-sm text-[#5A6478] mb-5 leading-relaxed">
                Trimite datele prin FinExperts și un consilier te va contacta în maxim o zi lucrătoare.
              </p>
              <Link href="/aplica">
                <button
                  data-testid="btn-apply-bank"
                  className="w-full bg-[#0A1A2E] hover:bg-[#132846] text-white font-semibold py-3 rounded-xl transition-colors mb-2"
                >
                  Aplică la {bank.name}
                </button>
              </Link>
              <p className="text-xs text-[#5A6478] text-center">Aplicarea este gratuită și fără obligații.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
