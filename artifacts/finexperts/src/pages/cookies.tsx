import { Cookie, BarChart2, Shield } from "lucide-react";

const cookieCategories = [
  {
    icon: Shield,
    title: "Cookie-uri strict necesare",
    description: "Esențiale pentru funcționarea site-ului. Stocate temporar (sesiune) — se șterg la închiderea browserului. Nu pot fi dezactivate.",
    cookies: [
      { name: "session_id", purpose: "Menținerea sesiunii de utilizator autentificat", duration: "Sesiune" },
      { name: "csrf_token", purpose: "Protecție împotriva atacurilor CSRF pe formulare", duration: "Sesiune" },
    ],
  },
  {
    icon: BarChart2,
    title: "Cookie-uri de analiză (Google Analytics)",
    description: "Cookie-uri persistente plasate de Google Analytics. Ne ajută să înțelegem cum este utilizat site-ul (pagini vizitate, timp petrecut, sursa traficului). Datele sunt anonimizate — nu pot fi folosite pentru identificarea utilizatorului.",
    cookies: [
      { name: "_ga", purpose: "Distinge utilizatorii unici", duration: "2 ani" },
      { name: "_ga_*", purpose: "Menține starea sesiunii Analytics", duration: "2 ani" },
      { name: "_gid", purpose: "Distinge utilizatorii (sesiune scurtă)", duration: "24 ore" },
    ],
  },
  {
    icon: Cookie,
    title: "Cookie-uri de preferințe",
    description: "Memorează preferințele tale pe site (tip credit selectat, valoare în calculator) pentru a îmbunătăți experiența la vizitele ulterioare.",
    cookies: [
      { name: "fin_prefs", purpose: "Preferințele calculatorului (tip credit, valoare)", duration: "30 zile" },
    ],
  },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10">
          <div className="mb-8">
            <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Legal</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0C1A2E] mb-2">Politica de Cookies</h1>
            <p className="text-sm text-[#64748B]">Ultima actualizare: mai 2026 · în conformitate cu Directiva ePrivacy și GDPR (Regulamentul UE 2016/679)</p>
          </div>

          <div className="text-[#334155] text-sm leading-relaxed space-y-6">

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">Ce sunt cookie-urile?</h2>
              <p>
                Cookie-urile sunt fișiere text mici stocate pe dispozitivul tău atunci când vizitezi un site web. Sunt complet „pasive" — <strong>nu conțin programe software, viruși sau spyware și nu pot accesa informațiile de pe hard drive-ul tău</strong>. Ele permit site-ului să îți memoreze preferințele și să funcționeze corect.
              </p>
              <p className="mt-2">
                Există două tipuri principale: <strong>cookie-uri de sesiune</strong> (se șterg la închiderea browserului) și <strong>cookie-uri persistente</strong> (rămân stocate o perioadă determinată, inclusiv cele plasate de terți pentru statistici anonime).
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-3">Cookie-urile utilizate pe finexperts.ro</h2>
              <div className="space-y-4">
                {cookieCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div key={cat.title} className="border border-[#E2E8F0] rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-[#0C1A2E]/8 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-[#0C1A2E]" />
                        </div>
                        <div className="font-semibold text-[#0C1A2E] text-[13px]">{cat.title}</div>
                      </div>
                      <p className="text-[#64748B] text-xs mb-3">{cat.description}</p>
                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg overflow-hidden">
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
                Poți controla și/sau șterge cookie-urile din setările browserului. Dezactivarea cookie-urilor strict necesare poate afecta funcționarea site-ului.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Microsoft Edge</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">Drepturile tale</h2>
              <p>
                Ai dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție față de prelucrarea datelor colectate prin cookie-uri. Poți depune plângere la ANSPDCP (<a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">dataprotection.ro</a>). Detalii complete în <a href="/confidentialitate" className="text-[#C49A20] hover:underline">Politica de date personale</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">Contact</h2>
              <p>Pentru întrebări despre cookie-uri:</p>
              <ul className="list-none mt-2 space-y-1">
                <li>📧 <a href="mailto:kbaa@kiwifinance.ro" className="text-[#C49A20] hover:underline">kbaa@kiwifinance.ro</a></li>
                <li>📞 <a href="tel:0799715101" className="text-[#C49A20] hover:underline">0799 715 101</a></li>
                <li>📍 Bd. Ion Câmpineanu, nr. 26, Sector 1, București</li>
              </ul>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
