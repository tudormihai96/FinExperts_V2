export default function ConfidentialitatePage() {
  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10">
          <div className="mb-8">
            <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Legal</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0C1A2E] mb-2">Politica de utilizare a datelor personale</h1>
            <p className="text-sm text-[#64748B]">Ultima actualizare: mai 2026 · în conformitate cu GDPR (Regulamentul UE 2016/679)</p>
          </div>

          <div className="prose max-w-none text-[#334155] text-sm leading-relaxed space-y-6">

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">1. Operatorul de date</h2>
              <p>
                Datele tale personale sunt prelucrate de <strong>Alexandra Achim PFA</strong>, cu sediul în Județul Ilfov, Sat Dobroiești, Comuna Dobroiești, Strada Stejarului, nr. 117A, camera nr. 1, etaj parter, ap. 3, CUI <strong>54405887</strong>.
              </p>
              <p className="mt-2">
                Contact GDPR: <a href="mailto:kbaa@kiwifinance.ro" className="text-[#C49A20] hover:underline">kbaa@kiwifinance.ro</a>
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">2. Ce date colectăm</h2>
              <p>Colectăm exclusiv datele pe care ni le furnizezi voluntar:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Date de identificare:</strong> nume, prenume</li>
                <li><strong>Date de contact:</strong> număr de telefon, adresă de email</li>
                <li><strong>Date financiare orientative:</strong> suma creditului, perioada, venitul net (doar dacă îl furnizezi voluntar în formular)</li>
                <li><strong>Date tehnice:</strong> adresă IP, browser, pagini accesate (prin cookies — vezi Politica de Cookies)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">3. Scopul prelucrării datelor</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Furnizarea serviciilor de consultanță și intermediere credite</li>
                <li>Contactarea ta în vederea prezentării ofertelor bancare personalizate</li>
                <li>Transmiterea dosarului tău (cu acordul explicit) către instituțiile de credit partenere</li>
                <li>Îndeplinirea obligațiilor legale (ASF, ANPC, legislație anti-spălare bani)</li>
                <li>Îmbunătățirea serviciilor și a experienței pe site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">4. Temeiul legal al prelucrării</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Consimțământul tău</strong> (Art. 6(1)(a) GDPR) — la completarea formularelor de contact</li>
                <li><strong>Executarea unui contract</strong> (Art. 6(1)(b) GDPR) — pentru furnizarea serviciilor de intermediere</li>
                <li><strong>Obligație legală</strong> (Art. 6(1)(c) GDPR) — pentru respectarea reglementărilor ASF</li>
                <li><strong>Interes legitim</strong> (Art. 6(1)(f) GDPR) — pentru securitatea site-ului și prevenirea fraudelor</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">5. Partajarea datelor cu terți</h2>
              <p>Datele tale pot fi partajate exclusiv cu:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>KIWI Finance</strong> — în calitate de francisor/partener principal, pentru procesarea dosarelor</li>
                <li><strong>Instituțiile de credit partenere</strong> (BCR, ING, BRD, Raiffeisen etc.) — doar cu acordul tău explicit, pentru analiza dosarului</li>
                <li><strong>Autoritățile publice</strong> — la cerere legală (ASF, ANPC, instanțe)</li>
                <li><strong>Furnizori de servicii IT</strong> — hosting, email, analytics (în baza acordurilor de prelucrare date)</li>
              </ul>
              <p className="mt-2 text-xs text-[#64748B] italic">Nu vindem și nu cedăm datele tale personale în scopuri de marketing terților.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">6. Durata păstrării datelor</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Date de contact formular: <strong>24 luni</strong> de la ultima interacțiune</li>
                <li>Date dosar credit: <strong>5 ani</strong> (obligație legală ASF)</li>
                <li>Date cont utilizator: pe durata existenței contului + 12 luni după ștergere</li>
                <li>Date tehnice (logs): <strong>12 luni</strong></li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">7. Drepturile tale</h2>
              <p>În conformitate cu GDPR, ai următoarele drepturi:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Dreptul de acces</strong> — să știi ce date prelucrăm despre tine</li>
                <li><strong>Dreptul la rectificare</strong> — corectarea datelor inexacte</li>
                <li><strong>Dreptul la ștergere</strong> ("dreptul de a fi uitat")</li>
                <li><strong>Dreptul la restricționarea prelucrării</strong></li>
                <li><strong>Dreptul la portabilitatea datelor</strong></li>
                <li><strong>Dreptul de opoziție</strong> la prelucrare</li>
                <li><strong>Dreptul de a retrage consimțământul</strong> oricând</li>
                <li><strong>Dreptul de a depune plângere</strong> la ANSPDCP (<a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">dataprotection.ro</a>)</li>
              </ul>
              <p className="mt-2">Pentru exercitarea oricărui drept, contactează-ne la <a href="mailto:kbaa@kiwifinance.ro" className="text-[#C49A20] hover:underline">kbaa@kiwifinance.ro</a>. Vom răspunde în maxim 30 de zile.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">8. Securitatea datelor</h2>
              <p>
                Aplicăm măsuri tehnice și organizatorice adecvate pentru protecția datelor: conexiune HTTPS, acces restricționat la baze de date, criptarea datelor sensibile și audit periodic de securitate.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
