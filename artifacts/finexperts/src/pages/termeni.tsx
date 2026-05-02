import DisputeBadges from "@/components/ui/DisputeBadges";

export default function TermeniPage() {
  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10">
          <div className="mb-8">
            <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Legal</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0C1A2E] mb-2">Termeni și Condiții</h1>
            <p className="text-sm text-[#64748B]">Ultima actualizare: mai 2026</p>
          </div>

          <div className="prose max-w-none text-[#334155] text-sm leading-relaxed space-y-6">

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">1. Informații despre operator</h2>
              <p>
                Site-ul <strong>finexperts.ro</strong> este administrat de <strong>Alexandra Achim PFA</strong>, cu sediul în Județul Ilfov, Sat Dobroiești, Comuna Dobroiești, Strada Stejarului, nr. 117A, camera nr. 1, etaj parter, ap. 3, înregistrată la Registrul Comerțului cu CUI <strong>54405887</strong>.
              </p>
              <p className="mt-2">
                FinExperts acționează în calitate de partener oficial <strong>KIWI Finance</strong>, broker de credite autorizat ASF, membră a Asociației Române a Brokerilor de Credite (ARBC). Orice referire la FinExperts implică și respectarea termenilor și condițiilor KIWI Finance, disponibili la{" "}
                <a href="https://www.kiwifinance.ro/wp-content/uploads/KIWI_Termeni_si_Conditii.pdf" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">kiwifinance.ro</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">2. Acceptarea termenilor</h2>
              <p>
                Prin accesarea și utilizarea site-ului finexperts.ro, utilizatorul acceptă în totalitate prezentele Termeni și Condiții, precum și Politica de Confidențialitate și Politica de Cookies. Dacă nu ești de acord cu acești termeni, te rugăm să nu utilizezi serviciile noastre.
              </p>
              <p className="mt-2">
                Prezentele condiții se aplică tuturor utilizatorilor site-ului finexperts.ro, inclusiv utilizatorilor care contribuie cu conținut, informații sau alte materiale sau servicii pe site.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">3. Serviciile oferite</h2>
              <p>FinExperts oferă, în calitate de intermediar de credit autorizat:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Servicii de intermediere și consultanță în domeniul creditelor bancare (personale, ipotecare, refinanțare)</li>
                <li>Calculator de rate orientativ, fără caracter de ofertă fermă din partea băncilor</li>
                <li>Comparator de dobânzi și condiții bancare, cu titlu informativ</li>
                <li>Intermediere pentru produse de asigurare (viață, locuință, RCA, CASCO, călătorie, sănătate)</li>
                <li>Ghiduri și articole informative despre credite și finanțe personale</li>
                <li>Asistență în pregătirea și depunerea dosarelor de creditare</li>
              </ul>
              <p className="mt-3 text-xs text-[#64748B] italic border-l-2 border-[#C49A20] pl-3">
                Toate calculele și informațiile prezentate au caracter orientativ și nu constituie ofertă fermă din partea niciunei instituții de credit. Condițiile finale ale creditului, inclusiv rata dobânzii, DAE și suma aprobată, sunt stabilite exclusiv de bancă, în urma analizei dosarului de creditare conform politicii proprii de risc.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">4. Gratuitatea serviciilor pentru client</h2>
              <p>
                Serviciile de consultanță și intermediere oferite de FinExperts sunt <strong>100% gratuite pentru client</strong>. FinExperts este remunerat exclusiv de instituțiile de credit sau de asigurători, în baza acordurilor de parteneriat, și numai în cazul în care creditul sau produsul de asigurare se aprobă și se semnează.
              </p>
              <p className="mt-2">
                Nu percepem nicio taxă, comision sau plată din partea clienților pentru serviciile de intermediere. Orice solicitare de plată din partea unui pretins reprezentant FinExperts trebuie raportată imediat la <a href="mailto:kbaa@kiwifinance.ro" className="text-[#C49A20] hover:underline">kbaa@kiwifinance.ro</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">5. Obligațiile utilizatorului</h2>
              <p>Prin utilizarea site-ului, utilizatorul se obligă să:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Furnizeze informații corecte, complete și actuale atunci când completează formularele de contact sau de aplicare</li>
                <li>Nu utilizeze site-ul în scopuri ilegale sau care ar putea prejudicia terțe persoane</li>
                <li>Nu transmită conținut ofensator, defăimător sau care încalcă drepturile terților</li>
                <li>Nu încerce să acceseze neautorizat sisteme informatice sau date ale altor utilizatori</li>
                <li>Respecte drepturile de proprietate intelectuală ale FinExperts și ale partenerilor săi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">6. Limitarea răspunderii</h2>
              <p>
                FinExperts nu garantează aprobarea niciunui dosar de creditare. Decizia finală de creditare aparține exclusiv instituției de credit. Informațiile publicate pe site au caracter informativ și pot fi modificate fără notificare prealabilă.
              </p>
              <p className="mt-2">
                FinExperts nu răspunde pentru eventualele pierderi financiare rezultate din utilizarea informațiilor prezentate pe site cu titlu orientativ, din întreruperi ale serviciilor cauzate de forță majoră, defecțiuni tehnice sau alte cauze independente de voința sa.
              </p>
              <p className="mt-2">
                Dobânzile, DAE și condițiile afișate sunt actualizate periodic, dar pot să nu reflecte ofertele exact în timp real. Consultați întotdeauna banca direct pentru confirmare.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">7. Proprietatea intelectuală</h2>
              <p>
                Toate elementele de pe site (texte, imagini, logo-uri, cod sursă, baze de date cu informații bancare) sunt proprietatea Alexandra Achim PFA sau sunt utilizate cu acordul titularilor de drepturi, inclusiv KIWI Finance. Este interzisă reproducerea, distribuirea, modificarea sau utilizarea comercială fără acordul scris al administratorului site-ului.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">8. Protecția datelor personale</h2>
              <p>
                Prelucrarea datelor personale se realizează în conformitate cu Regulamentul UE 2016/679 (GDPR) și legislația română în vigoare. Detalii complete în{" "}
                <a href="/confidentialitate" className="text-[#C49A20] hover:underline">Politica de Confidențialitate</a>{" "}
                și{" "}
                <a href="/cookies" className="text-[#C49A20] hover:underline">Politica de Cookies</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">9. Legea aplicabilă și soluționarea litigiilor</h2>
              <p>
                Prezentele Termeni și Condiții sunt guvernate de legea română. Orice litigiu va fi soluționat pe cale amiabilă. În cazul în care soluționarea amiabilă nu este posibilă, litigiul va fi supus instanțelor judecătorești competente din România.
              </p>
              <p className="mt-2">
                Potrivit OG 38/2015, consumatorii au dreptul de a recurge la proceduri alternative de soluționare a litigiilor (SAL/ADR). Pentru servicii financiare, instituția competentă este <strong>ANPC</strong> — Autoritatea Națională pentru Protecția Consumatorilor și <strong>CSALB</strong> — Centrul de Soluționare Alternativă a Litigiilor în domeniul Bancar.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">10. Modificarea termenilor</h2>
              <p>
                Alexandra Achim PFA își rezervă dreptul de a modifica oricând prezentele Termeni și Condiții. Modificările intră în vigoare la data publicării pe site. Continuarea utilizării site-ului după publicarea modificărilor constituie acceptarea noilor termeni. Vă recomandăm să consultați periodic această pagină.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0C1A2E] mb-2">11. Contact</h2>
              <p>
                Pentru orice întrebări legate de acești termeni sau pentru exercitarea drepturilor dvs., ne puteți contacta:
              </p>
              <ul className="list-none mt-2 space-y-1">
                <li>📧 <a href="mailto:kbaa@kiwifinance.ro" className="text-[#C49A20] hover:underline">kbaa@kiwifinance.ro</a></li>
                <li>📞 <a href="tel:0799715101" className="text-[#C49A20] hover:underline">0799 715 101</a></li>
                <li>📍 Str. Stejarului, nr. 117A, Sat Dobroiești, Com. Dobroiești, Jud. Ilfov</li>
              </ul>
            </section>

          </div>

          <DisputeBadges />
        </div>
      </div>
    </div>
  );
}
