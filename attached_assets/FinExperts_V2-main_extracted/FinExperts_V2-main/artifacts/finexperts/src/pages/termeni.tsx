
export default function TermeniPage() {
  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10">
          <div className="mb-8">
            <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Legal</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2E2E] mb-2">Termeni și Condiții</h1>
            <p className="text-sm text-[#64748B]">Ultima actualizare: mai 2026</p>
          </div>

          <div className="prose max-w-none text-[#334155] text-sm leading-relaxed space-y-6">

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">1. Informații despre operator</h2>
              <p>
                Site-ul <strong>finexperts.ro</strong> este administrat de <strong>Alexandra Achim PFA</strong>, cu sediul în Județul Ilfov, Sat Dobroesti, Comuna Dobroesti, Strada Stejarului, nr. 117A, camera nr. 1, etaj parter, ap. 3, înregistrată la Registrul Comerțului cu CUI <strong>54405887</strong>, broker de credite autorizat ASF, membră a Asociației Române a Brokerilor de Credite (ARBC) și partener KIWI Finance.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">2. Proprietate intelectuală</h2>
              <p>
                Toate informațiile, textele, imaginile, logo-urile și materialele conținute pe site-ul finexperts.ro sunt proprietatea <strong>Alexandra Achim PFA</strong> sau sunt utilizate cu acordul titularilor de drepturi. Este interzisă reproducerea, distribuirea sau publicarea sub orice formă a conținutului, fără acordul scris prealabil al administratorului.
              </p>
              <p className="mt-2">
                Orice tentativă de modificare neautorizată a conținutului site-ului dă dreptul administratorului de a se adresa instanțelor și/sau autorităților competente pentru sancționarea acestui fapt.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">3. Caracterul informativ al conținutului</h2>
              <p>
                FinExperts depune toate eforturile pentru a prezenta informații clare și corecte. Cu toate acestea, nu garantează exactitatea în timp real a tuturor datelor publicate și nu răspunde pentru inadvertențe sau descrieri eronate ale informațiilor prezentate.
              </p>
              <p className="mt-2">
                Informațiile prezentate pe site constituie o sursă de informare <strong>fără a reprezenta o ofertă fermă de servicii sau produse bancare</strong>. Calculele și dobânzile afișate au caracter orientativ. Condițiile finale ale creditului — inclusiv rata dobânzii, DAE și suma aprobată — sunt stabilite exclusiv de instituția bancară, în urma analizei dosarului conform politicii proprii de risc.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">4. Serviciile oferite</h2>
              <p>FinExperts oferă, în calitate de intermediar de credit autorizat:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Servicii de consultanță și intermediere în domeniul creditelor bancare (personale, ipotecare, refinanțare)</li>
                <li>Calculator de rate orientativ, fără caracter de ofertă fermă</li>
                <li>Comparator de dobânzi și condiții bancare, cu titlu informativ</li>
                <li>Asistență în pregătirea și depunerea dosarelor de creditare</li>
                <li>Ghiduri și articole informative despre credite și finanțe personale</li>
              </ul>
              <p className="mt-2">
                Serviciile de consultanță și intermediere sunt <strong>100% gratuite pentru client</strong>. FinExperts este remunerată exclusiv de instituțiile de credit partenere, numai în cazul în care creditul se aprobă și se semnează. Orice solicitare de plată din partea unui pretins reprezentant FinExperts trebuie raportată imediat la <a href="mailto:kbaa@kiwifinance.ro" className="text-[#C49A20] hover:underline">kbaa@kiwifinance.ro</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">5. Obligațiile utilizatorului</h2>
              <p>Prin utilizarea site-ului, utilizatorul se obligă să:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Furnizeze informații corecte, complete și actuale în formularele de contact sau de aplicare</li>
                <li>Nu utilizeze site-ul în scopuri ilegale sau care ar putea prejudicia terțe persoane</li>
                <li>Respecte drepturile de proprietate intelectuală ale FinExperts și ale partenerilor săi</li>
                <li>Nu încerce să acceseze neautorizat sisteme informatice sau date ale altor utilizatori</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">6. Limitarea răspunderii</h2>
              <p>
                FinExperts nu garantează aprobarea niciunui dosar de creditare. Decizia finală de creditare aparține exclusiv instituției de credit. FinExperts nu răspunde pentru pierderi financiare rezultate din utilizarea informațiilor orientative publicate pe site, din întreruperi ale serviciilor cauzate de forță majoră sau defecțiuni tehnice.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">7. Protecția datelor personale</h2>
              <p>
                Prelucrarea datelor personale se realizează în conformitate cu Regulamentul UE 2016/679 (GDPR) și legislația română în vigoare. Detalii complete în{" "}
                <a href="/confidentialitate" className="text-[#C49A20] hover:underline">Politica de date personale</a>{" "}
                și{" "}
                <a href="/cookies" className="text-[#C49A20] hover:underline">Politica de Cookies</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">8. Legea aplicabilă și soluționarea litigiilor</h2>
              <p>
                Prezentele Termeni și Condiții sunt guvernate de legea română. Orice litigiu va fi soluționat pe cale amiabilă. În cazul în care soluționarea amiabilă nu este posibilă, litigiul va fi supus instanțelor judecătorești competente din România.
              </p>
              <p className="mt-2">
                Potrivit OG 38/2015, consumatorii au dreptul de a recurge la proceduri alternative de soluționare a litigiilor (SAL/ADR). Puteți contacta <strong>ANPC</strong> la{" "}
                <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">anpc.ro</a>{" "}
                sau <strong>CSALB</strong> la{" "}
                <a href="https://www.csalb.ro" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">csalb.ro</a>.
                Platforma europeană SOL:{" "}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#C49A20] hover:underline">ec.europa.eu/consumers/odr</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">9. Modificarea termenilor</h2>
              <p>
                Alexandra Achim PFA își rezervă dreptul de a modifica oricând prezentele Termeni și Condiții. Modificările intră în vigoare la data publicării pe site. Vă recomandăm să consultați periodic această pagină.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0B2E2E] mb-2">10. Contact</h2>
              <ul className="list-none mt-2 space-y-1">
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
