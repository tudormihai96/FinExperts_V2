
export default function ConfidentialitatePage() {
  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10">
          <div className="mb-8">
            <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Legal</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2E2E] mb-2">Politica de utilizare a datelor personale</h1>
            <p className="text-sm text-[#64748B]">Ultima actualizare: mai 2026 · în conformitate cu GDPR (Regulamentul UE 2016/679) și Legea nr. 190/2018</p>
          </div>

          <div className="prose max-w-none text-[#334155] text-sm leading-relaxed space-y-6">

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">1. Operatorul de date</h2>
              <p>
                Datele tale personale sunt prelucrate de <strong>Alexandra Achim PFA</strong>, cu sediul în Județul Ilfov, Sat Dobroesti, Comuna Dobroesti, Strada Stejarului, nr. 117A, camera nr. 1, etaj parter, ap. 3, CUI <strong>54405887</strong>, broker de credite autorizat ASF și partener KIWI Finance.
              </p>
              <p className="mt-2">
                Contact: <a href="mailto:kbaa@kiwifinance.ro" className="text-[#C49A20] hover:underline">kbaa@kiwifinance.ro</a> | <a href="tel:0799715101" className="text-[#C49A20] hover:underline">0799 715 101</a>
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">2. Ce date colectăm</h2>
              <p>Colectăm exclusiv datele pe care ni le furnizezi voluntar:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Date de identificare:</strong> nume, prenume</li>
                <li><strong>Date de contact:</strong> număr de telefon, adresă de email</li>
                <li><strong>Date financiare orientative:</strong> suma creditului, perioada, venitul net (doar dacă le furnizezi voluntar în formular)</li>
                <li><strong>Date tehnice:</strong> adresă IP, tip browser, pagini accesate (prin cookies — vezi <a href="/cookies" className="text-[#C49A20] hover:underline">Politica de Cookies</a>)</li>
              </ul>
              <p className="mt-2 text-xs text-[#64748B] italic">
                Nu colectăm date sensibile (CNP, date biometrice, date despre sănătate) prin intermediul site-ului. Acestea pot fi solicitate ulterior de bancă, direct, în cadrul procesului de creditare.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">3. Scopul prelucrării</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Furnizarea serviciilor de consultanță și intermediere credite</li>
                <li>Contactarea ta pentru prezentarea ofertelor bancare personalizate</li>
                <li>Transmiterea dosarului (cu acordul tău explicit) către instituțiile de credit partenere</li>
                <li>Îndeplinirea obligațiilor legale (ASF, ANPC, legislație anti-spălare bani)</li>
                <li>Îmbunătățirea serviciilor și a experienței pe site prin analiză statistică anonimizată</li>
                <li>Trimiterea de informații relevante despre produse de creditare (cu consimțământul tău)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">4. Temeiul legal al prelucrării</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Consimțământul tău</strong> (Art. 6(1)(a) GDPR) — la completarea formularelor</li>
                <li><strong>Executarea unui contract / măsuri precontractuale</strong> (Art. 6(1)(b) GDPR)</li>
                <li><strong>Obligație legală</strong> (Art. 6(1)(c) GDPR) — reglementări ASF, ANPC, legislație AML</li>
                <li><strong>Interes legitim</strong> (Art. 6(1)(f) GDPR) — securitatea site-ului, prevenirea fraudelor</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">5. Partajarea datelor cu terți</h2>
              <p>Datele tale pot fi partajate exclusiv cu:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Instituțiile de credit partenere</strong> — doar cu acordul tău explicit, pentru analiza dosarului de creditare</li>
                <li><strong>Autoritățile publice</strong> — la cerere legală (ASF, ANPC, instanțe judecătorești)</li>
                <li><strong>Furnizori de servicii IT</strong> — hosting, email, analytics, în baza acordurilor de prelucrare date conform Art. 28 GDPR</li>
              </ul>
              <p className="mt-2 text-xs text-[#64748B] italic">Nu vindem și nu cedăm datele tale personale în scopuri de marketing terților.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">6. Durata păstrării datelor</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Date de contact formular (fără dosar credit): <strong>24 luni</strong> de la ultima interacțiune</li>
                <li>Date dosar credit (aprobat sau refuzat): <strong>5 ani</strong> (obligație legală ASF)</li>
                <li>Date tehnice (logs, IP): <strong>12 luni</strong></li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">7. Drepturile tale conform GDPR</h2>
              <p>Ai următoarele drepturi:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Dreptul de acces</strong> (Art. 15) — să știi ce date prelucrăm și să primești o copie</li>
                <li><strong>Dreptul la rectificare</strong> (Art. 16) — corectarea datelor inexacte</li>
                <li><strong>Dreptul la ștergere</strong> (Art. 17) — „dreptul de a fi uitat", cu excepțiile legale</li>
                <li><strong>Dreptul la restricționarea prelucrării</strong> (Art. 18)</li>
                <li><strong>Dreptul la portabilitatea datelor</strong> (Art. 20)</li>
                <li><strong>Dreptul de opoziție</strong> (Art. 21) — inclusiv față de marketing direct</li>
                <li><strong>Dreptul de a retrage consimțământul</strong> oricând, fără a afecta legalitatea prelucrărilor anterioare</li>
                <li><strong>Dreptul de a depune plângere</strong> la ANSPDCP (<a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">dataprotection.ro</a>)</li>
              </ul>
              <p className="mt-2">
                Pentru exercitarea oricărui drept, contactează-ne la <a href="mailto:kbaa@kiwifinance.ro" className="text-[#C49A20] hover:underline">kbaa@kiwifinance.ro</a>. Vom răspunde în maxim <strong>30 de zile calendaristice</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">8. Securitatea datelor</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Conexiune HTTPS cu certificat SSL valid</li>
                <li>Acces restricționat la datele personale pe baza principiului „need to know"</li>
                <li>Criptarea datelor sensibile în bazele de date</li>
                <li>Audit periodic de securitate</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">9. Cookies</h2>
              <p>
                Informații detaliate despre utilizarea cookie-urilor sunt disponibile în <a href="/cookies" className="text-[#C49A20] hover:underline">Politica de Cookies</a>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
