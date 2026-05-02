import { Cookie, BarChart2, Shield } from "lucide-react";

const cookieCategories = [
  {
    icon: Shield,
    title: "Cookie-uri de sesiune",
    description: "Sunt stocate temporar în dosarul de cookie-uri al browserului web pentru ca acesta să le memoreze până când utilizatorul iese de pe site sau închide fereastra browserului. Nu rețin informații după închiderea sesiunii.",
    cookies: [
      { name: "session_id", purpose: "Menținerea sesiunii de utilizator autentificat", duration: "Sesiune (se șterge la închiderea browserului)" },
      { name: "csrf_token", purpose: "Protecție împotriva atacurilor CSRF pe formulare", duration: "Sesiune" },
    ],
  },
  {
    icon: BarChart2,
    title: "Cookie-uri de analiză (Google Analytics)",
    description: "Cookie-uri persistente generate de Google Analytics. Ne ajută să înțelegem cum utilizați site-ul (pagini vizitate, timp petrecut, sursa traficului). Nu sunt stocate informații personale — datele nu pot fi folosite pentru identificarea utilizatorului.",
    cookies: [
      { name: "_ga", purpose: "Google Analytics — distinge utilizatorii unici", duration: "2 ani" },
      { name: "_ga_*", purpose: "Google Analytics — menține starea sesiunii", duration: "2 ani" },
      { name: "_gid", purpose: "Google Analytics — distinge utilizatorii (sesiune)", duration: "24 ore" },
    ],
  },
  {
    icon: Cookie,
    title: "Cookie-uri de performanță și preferințe",
    description: "Cookie-uri ale terțelor părți utilizate pentru analiza traficului și performanțelor site-ului. Pot fi utilizate anonim pentru a memora interesele unui utilizator, astfel încât să fie livrat conținut cât mai relevant.",
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
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0C1A2E] mb-2">Politica de utilizare a cookie-urilor</h1>
            <p className="text-sm text-[#64748B]">Ultima actualizare: mai 2026 · în conformitate cu Directiva ePrivacy și GDPR (Regulamentul UE 2016/679)</p>
          </div>

          <div className="text-[#334155] text-sm leading-relaxed space-y-6">

            <section>
              <p>
                Site-ul <strong>finexperts.ro</strong>, administrat de <strong>Alexandra Achim PFA</strong> (partener oficial KIWI Finance), utilizează cookie-uri. Informațiile de mai jos sunt furnizate în scopul de a aduce la cunoștința utilizatorilor detalii privind plasarea, utilizarea și administrarea cookie-urilor utilizate pe site.
              </p>
              <p className="mt-2">
                Acest website folosește cookie-uri proprii, cât și cookie-uri de la terți, pentru a furniza vizitatorilor o experiență mai bună de navigare și servicii adaptate nevoilor și interesului fiecăruia.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">Ce este un cookie?</h2>
              <p>
                Un „Internet Cookie" (cunoscut și ca „browser cookie", „HTTP cookie" sau pur și simplu „cookie") este un fișier de mici dimensiuni, format din litere și numere, care va fi stocat pe computerul, terminalul mobil sau alte echipamente ale unui utilizator de pe care se accesează Internetul.
              </p>
              <p className="mt-2">
                Cookie-ul este instalat prin solicitarea emisă de către un web-server unui browser (ex: Chrome, Firefox, Safari, Edge) și este complet „pasiv" — <strong>nu conține programe software, viruși sau spyware și nu poate accesa informațiile de pe hard drive-ul utilizatorului</strong>.
              </p>
              <p className="mt-2">
                Un cookie este format din 2 părți: numele și conținutul sau valoarea cookie-ului. Durata de existență a unui cookie este determinată; tehnic, doar webserverul care a trimis cookie-ul îl poate accesa din nou în momentul în care un utilizator se întoarce pe website-ul respectiv. Cookie-urile în sine nu solicită informații cu caracter personal și, în cele mai multe cazuri, nu identifică personal utilizatorii de internet.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">Tipuri de cookie-uri</h2>
              <p>Există 2 categorii mari de cookie-uri:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  <strong>Cookie-uri de Sesiune</strong> — stocate temporar în dosarul de cookie-uri al browserului web; browserul le memorează până când utilizatorul iese de pe website sau închide fereastra browserului (ex: logare/delogare pe un cont de webmail sau pe rețele de socializare).
                </li>
                <li>
                  <strong>Cookie-uri Persistente</strong> — stocate pe hard drive-ul unui computer sau echipament, în funcție de durata de viață prestabilită. Cookie-urile persistente includ și „third party cookies" (cookie-uri plasate de alte website-uri decât cel vizitat), care pot fi folosite în mod anonim pentru a memora interesele unui utilizator.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">Avantajele cookie-urilor</h2>
              <p>
                Cookie-urile asigură utilizatorilor o experiență plăcută de navigare și susțin eforturile multor website-uri de a oferi servicii confortabile: preferințele în materie de confidențialitate online, opțiunile privind limba site-ului, coșuri de cumpărături sau publicitate relevantă.
              </p>
              <p className="mt-2">
                Cookie-urile utilizate pe site oferă un feedback valoros și ne ajută în încercarea de a îmbunătăți experiența online. Site-ul folosește cookie-uri — cum ar fi tokeni ce rămân activi până la închiderea ferestrei browserului — pentru a îmbunătăți experiența de navigare. Informațiile obținute din aceste cookie-uri nu sunt stocate în baza de date și, odată cu închiderea browserului, cookie-urile sunt șterse.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-3">Cookie-urile utilizate pe finexperts.ro</h2>
              <p className="mb-4">O vizită pe acest site poate plasa cookie-uri în scopuri de performanță a site-ului și de analiză:</p>
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
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">Cookie-uri plasate de terți</h2>
              <p>
                Anumite secțiuni de conținut de pe site pot fi furnizate prin intermediul unor terțe părți/furnizori. Aceste terțe părți pot plasa de asemenea cookie-uri prin intermediul site-ului — numite „third party cookies", deoarece nu sunt plasate de proprietarul website-ului respectiv. Furnizorii terți trebuie să respecte de asemenea legea în vigoare.
              </p>
              <p className="mt-2">
                Datorită modului de utilizare, site-ul nu poate accesa cookie-urile terțelor, la fel cum terțele părți nu pot accesa cookie-urile deținute de acest site.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">Google Analytics</h2>
              <p>
                Site-ul folosește cookie-uri Google Analytics pentru a colecta informații despre modul în care vizitatorii utilizează site-ul și pentru a detecta posibile probleme de navigare. Google Analytics stochează informații despre paginile vizitate, durata de navigare pe site, modalitatea prin care a fost accesat site-ul, precum și secțiunile accesate. <strong>Nu sunt stocate informații personale</strong> — aceste informații nu pot fi folosite pentru identificarea utilizatorului.
              </p>
              <p className="mt-2">
                Datele colectate prin intermediul cookie-urilor sunt transferate către reprezentanții KIWI Finance/FinExperts și alte persoane juridice care prelucrează datele în numele acestora, precum și către state din UE/SEE menționate la{" "}
                <a href="https://www.google.com/about/datacenters/inside/locations/index.html" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">google.com/about/datacenters</a>.
              </p>
              <p className="mt-2">
                Google Inc, proprietarul instrumentelor utilizate pentru analiza traficului, este o companie certificată ISO 27001 în Managementul și securitatea informațiilor. Puteți consulta politica Google de confidențialitate la:{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">policies.google.com/privacy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">Drepturile utilizatorilor privind cookie-urile</h2>
              <p>Utilizatorii/vizitatorii site-ului finexperts.ro beneficiază de toate drepturile prevăzute de legislația privind protecția datelor cu caracter personal:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Dreptul de acces la datele cu caracter personal</li>
                <li>Dreptul de opoziție</li>
                <li>Dreptul de a nu fi supus unei decizii individuale automate</li>
                <li>Dreptul la rectificarea datelor</li>
                <li>Dreptul la ștergerea datelor</li>
                <li>Dreptul la restricționarea prelucrării</li>
                <li>Dreptul la portabilitatea datelor</li>
                <li>Dreptul de a se adresa justiției și/sau ANSPDCP — Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (<a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">dataprotection.ro</a>)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">Cum poți gestiona sau refuza cookie-urile</h2>
              <p>
                Puteți controla și/sau șterge cookie-urile din setările browserului. Aveți dreptul de a refuza cookie-urile, ajustând setările browserului. Refuzarea sau dezactivarea cookie-urilor nu înseamnă că nu veți mai primi publicitate online — ci doar că aceasta nu va mai ține cont de preferințele și interesele dvs. evidențiate prin comportamentul de navigare.
              </p>
              <p className="mt-2">Browserele populare oferă instrucțiuni detaliate:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Microsoft Edge</a></li>
              </ul>
              <p className="mt-2 text-xs text-[#64748B]">
                De asemenea, Google pune la dispoziție un „add-on" care oferă posibilitatea renunțării la Google Analytics indiferent de paginile accesate:{" "}
                <a href="https://support.google.com/analytics/answer/3407084?hl=en" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Google Analytics Opt-out Add-on</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">Contact</h2>
              <p>
                Pentru întrebări despre utilizarea cookie-urilor sau exercitarea drepturilor dvs., ne puteți contacta:
              </p>
              <ul className="list-none mt-2 space-y-1">
                <li>📧 <a href="mailto:kbaa@kiwifinance.ro" className="text-[#C49A20] hover:underline">kbaa@kiwifinance.ro</a></li>
                <li>📞 <a href="tel:0799715101" className="text-[#C49A20] hover:underline">0799 715 101</a></li>
                <li>📍 Bd. Ion Câmpineanu, nr. 26, Sector 1, București</li>
              </ul>
              <p className="mt-3 text-xs text-[#64748B]">
                Pentru mai multe detalii privind politica de prelucrare a datelor, consultați{" "}
                <a href="/confidentialitate" className="text-[#C49A20] hover:underline">Politica de Confidențialitate</a>{" "}
                și descărcați documentele oficiale KIWI Finance disponibile la{" "}
                <a href="https://kiwifinance.ro" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">kiwifinance.ro</a>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
