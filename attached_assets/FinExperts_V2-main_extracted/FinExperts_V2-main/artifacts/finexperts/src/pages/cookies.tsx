import { Cookie, BarChart2, Shield, Settings } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10">
          <div className="mb-8">
            <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Legal</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2E2E] mb-2">Politica de Cookies</h1>
            <p className="text-sm text-[#64748B]">Ultima actualizare: mai 2026 · în conformitate cu Directiva ePrivacy și GDPR (Regulamentul UE 2016/679)</p>
          </div>

          <div className="text-[#334155] text-sm leading-relaxed space-y-8">

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-3">Ce sunt cookie-urile?</h2>
              <p className="mb-2">
                Cookie-urile sunt fișiere mici salvate pe dispozitivul tău (calculator, telefon, tabletă) atunci când vizitezi un site web. Ele nu conțin viruși, nu accesează fișierele tale și nu îți pot afecta dispozitivul în niciun fel.
              </p>
              <p>
                Rolul lor este să facă site-ul mai ușor de folosit — de exemplu, să rețină că ești autentificat sau ce tip de credit ai selectat, astfel încât să nu trebuiască să reiei totul de la zero la fiecare vizită.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-4">Ce cookie-uri folosim</h2>
              <div className="space-y-4">

                {/* Necesare */}
                <div className="flex gap-4 p-4 border border-[#E2E8F0] rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-[#0B2E2E]/6 flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="h-4 w-4 text-[#0B2E2E]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="font-semibold text-[#0B2E2E] text-[13px]">Cookie-uri necesare</span>
                      <span className="text-[10px] font-semibold text-[#C49A20] uppercase tracking-wide border border-[#C49A20]/30 rounded px-1.5 py-0.5">Mereu active</span>
                    </div>
                    <p className="text-[#64748B] text-xs leading-relaxed">
                      Aceste cookie-uri sunt indispensabile pentru ca site-ul să funcționeze. Ele gestionează sesiunea ta de utilizator (astfel încât să rămâi autentificat pe tot parcursul vizitei) și protejează formularele de securitate împotriva utilizării abuzive. Fără ele, site-ul nu poate funcționa corect. Nu pot fi dezactivate. Se șterg automat când închizi browserul sau după finalizarea sesiunii.
                    </p>
                  </div>
                </div>

                {/* Analiză */}
                <div className="flex gap-4 p-4 border border-[#E2E8F0] rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-[#0B2E2E]/6 flex items-center justify-center shrink-0 mt-0.5">
                    <BarChart2 className="h-4 w-4 text-[#0B2E2E]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2E2E] text-[13px] mb-1.5">Cookie-uri de analiză</div>
                    <p className="text-[#64748B] text-xs leading-relaxed">
                      Ne ajută să înțelegem cum este folosit site-ul — ce pagini sunt vizitate cel mai des, cât timp petrec vizitatorii pe site și de unde provin (căutare Google, rețele sociale etc.). Aceste informații ne permit să îmbunătățim continuu experiența de navigare. Datele sunt colectate în mod anonim și nu pot fi folosite pentru a te identifica personal. Sunt furnizate de Google Analytics și rămân stocate până la 2 ani. Pot fi dezactivate din panoul de cookie-uri.
                    </p>
                  </div>
                </div>

                {/* Preferințe */}
                <div className="flex gap-4 p-4 border border-[#E2E8F0] rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-[#0B2E2E]/6 flex items-center justify-center shrink-0 mt-0.5">
                    <Settings className="h-4 w-4 text-[#0B2E2E]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2E2E] text-[13px] mb-1.5">Cookie-uri de preferințe</div>
                    <p className="text-[#64748B] text-xs leading-relaxed">
                      Rețin alegerile pe care le-ai făcut pe site — de exemplu, tipul de credit pe care l-ai selectat în calculator sau valorile introduse — astfel încât să găsești totul la locul lui când revii. Nu conțin date personale. Se păstrează timp de 30 de zile. Pot fi dezactivate din panoul de cookie-uri.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-3">Cum îți poți gestiona preferințele</h2>
              <p className="mb-3">
                Poți accepta sau refuza cookie-urile opționale în orice moment folosind butonul de gestionare a preferințelor care apare la prima vizită. De asemenea, orice browser modern îți permite să ștergi cookie-urile sau să blochezi plasarea lor nouă. Reține că dezactivarea celor necesare poate afecta funcționarea site-ului.
              </p>
              <p className="text-[#64748B] text-xs">Ghiduri pentru cele mai folosite browsere:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">Microsoft Edge</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-3">Drepturile tale</h2>
              <p className="mb-2">
                Ai dreptul să accesezi, să corectezi sau să soliciți ștergerea datelor colectate prin cookie-uri, să te opui prelucrării sau să ceri restricționarea acesteia. Poți depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP) la adresa <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">dataprotection.ro</a>.
              </p>
              <p>
                Pentru detalii complete despre modul în care prelucrăm datele tale personale, consultă <a href="/confidentialitate" className="text-[#C49A20] hover:underline">Politica de confidențialitate</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-3">Contact</h2>
              <p className="mb-3">Dacă ai întrebări despre modul în care folosim cookie-urile, ne poți contacta:</p>
              <ul className="list-none space-y-1.5 text-sm">
                <li>📧 <a href="mailto:kbaa@kiwifinance.ro" className="text-[#C49A20] hover:underline">kbaa@kiwifinance.ro</a></li>
                <li>📞 <a href="tel:0799715101" className="text-[#C49A20] hover:underline">0799 715 101</a></li>
                <li>📍 Str. Ion Câmpineanu nr. 26, bl. 8, sc. 2, et. 1, Sector 1, București, România</li>
              </ul>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
