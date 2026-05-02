import { useState } from "react";
import { Cookie, CheckCircle, XCircle, BarChart2, Shield } from "lucide-react";
import DisputeBadges from "@/components/ui/DisputeBadges";

const cookieCategories = [
  {
    icon: Shield,
    title: "Cookie-uri strict necesare",
    required: true,
    description: "Esențiale pentru funcționarea site-ului. Nu pot fi dezactivate. Includ sesiunea de autentificare, preferințele de limbă și securitatea formularelor.",
    cookies: [
      { name: "session_id", purpose: "Menținerea sesiunii de utilizator autentificat", duration: "Sesiune (se șterge la închiderea browserului)" },
      { name: "csrf_token", purpose: "Protecție împotriva atacurilor CSRF", duration: "Sesiune" },
    ],
  },
  {
    icon: BarChart2,
    title: "Cookie-uri de analiză",
    required: false,
    description: "Ne ajută să înțelegem cum utilizezi site-ul (pagini vizitate, timp petrecut, sursa traficului). Datele sunt anonimizate.",
    cookies: [
      { name: "_ga, _ga_*", purpose: "Google Analytics — statistici trafic anonimizate", duration: "2 ani" },
      { name: "_fbp", purpose: "Facebook Pixel — măsurarea conversiilor (dacă aplicabil)", duration: "90 zile" },
    ],
  },
  {
    icon: Cookie,
    title: "Cookie-uri de preferințe",
    required: false,
    description: "Memorează preferințele tale pe site (tip credit selectat, suma preferată în calculator) pentru a îmbunătăți experiența la vizitele ulterioare.",
    cookies: [
      { name: "fin_prefs", purpose: "Preferințele calculatorului (tip credit, valoare)", duration: "30 zile" },
    ],
  },
];

export default function CookiesPage() {
  const [accepted, setAccepted] = useState<Record<string, boolean>>({ analytics: true, preferences: true });

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10">
          <div className="mb-8">
            <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Legal</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0C1A2E] mb-2">Politica de Cookies</h1>
            <p className="text-sm text-[#64748B]">Ultima actualizare: mai 2026 · în conformitate cu Directiva ePrivacy și GDPR</p>
          </div>

          <div className="text-[#334155] text-sm leading-relaxed space-y-6">

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">Ce sunt cookie-urile?</h2>
              <p>
                Cookie-urile sunt fișiere text mici stocate pe dispozitivul tău atunci când vizitezi un site web. Ele permit site-ului să îți "memoreze" preferințele și să funcționeze corect. <strong>finexperts.ro</strong>, administrat de <strong>Alexandra Achim PFA</strong> (CUI 54405887), utilizează cookie-uri în conformitate cu legislația română și europeană.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-3">Tipuri de cookie-uri utilizate</h2>
              <div className="space-y-4">
                {cookieCategories.map((cat) => {
                  const Icon = cat.icon;
                  const key = cat.title.toLowerCase().includes("analiz") ? "analytics" : cat.title.toLowerCase().includes("preferin") ? "preferences" : "required";
                  return (
                    <div key={cat.title} className={`border rounded-xl p-4 ${cat.required ? "border-[#E2E8F0] bg-[#F4F6FB]" : "border-[#E2E8F0]"}`}>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#0C1A2E]/8 flex items-center justify-center shrink-0">
                            <Icon className="h-4 w-4 text-[#0C1A2E]" />
                          </div>
                          <div>
                            <div className="font-semibold text-[#0C1A2E] text-[13px]">{cat.title}</div>
                            {cat.required && <span className="text-[10px] text-[#64748B] font-medium">Întotdeauna active</span>}
                          </div>
                        </div>
                        {!cat.required && (
                          <button
                            onClick={() => setAccepted(a => ({ ...a, [key]: !a[key] }))}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                              accepted[key]
                                ? "bg-[#D1FAE5] text-[#059669]"
                                : "bg-[#FEE2E2] text-[#DC2626]"
                            }`}
                          >
                            {accepted[key] ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                            {accepted[key] ? "Activ" : "Inactiv"}
                          </button>
                        )}
                      </div>
                      <p className="text-[#64748B] text-xs mb-3">{cat.description}</p>
                      <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-[#E2E8F0] bg-[#F4F6FB]">
                              <th className="text-left px-3 py-2 text-[#64748B] font-semibold">Nume cookie</th>
                              <th className="text-left px-3 py-2 text-[#64748B] font-semibold hidden sm:table-cell">Scop</th>
                              <th className="text-left px-3 py-2 text-[#64748B] font-semibold">Durată</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cat.cookies.map(c => (
                              <tr key={c.name} className="border-b border-[#E2E8F0] last:border-0">
                                <td className="px-3 py-2 font-mono text-[#0C1A2E] text-[11px]">{c.name}</td>
                                <td className="px-3 py-2 text-[#64748B] hidden sm:table-cell">{c.purpose}</td>
                                <td className="px-3 py-2 text-[#64748B]">{c.duration}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">Cum poți gestiona cookie-urile</h2>
              <p>
                Poți controla și/sau șterge cookie-urile din setările browserului tău. Dezactivarea cookie-urilor strict necesare poate afecta funcționarea site-ului. Browserele populare oferă instrucțiuni detaliate:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Microsoft Edge</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">Contact</h2>
              <p>
                Pentru întrebări despre utilizarea cookie-urilor, contactează-ne la <a href="mailto:kbaa@kiwifinance.ro" className="text-[#C49A20] hover:underline">kbaa@kiwifinance.ro</a>.
              </p>
            </section>

          </div>

          <DisputeBadges />
        </div>
      </div>
    </div>
  );
}
