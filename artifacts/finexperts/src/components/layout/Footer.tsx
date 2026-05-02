import { Link } from "wouter";
import { MapPin, Phone, Mail, ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0C1A2E] text-white">

      {/* ── KIWI Finance partner bar — WHITE bg so logo is visible ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 border border-[#C49A20]/50 rounded-full px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C49A20]" />
              <span className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider">Partener oficial</span>
            </div>
            <span className="text-xs text-[#64748B]">
              Membri ARBC · Broker autorizat ASF
            </span>
          </div>
          <a
            href="https://kiwifinance.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-75 transition-opacity"
          >
            <img
              src="/logos/kiwi-finance.png"
              alt="KIWI Finance"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
                const sib = img.nextElementSibling as HTMLElement;
                if (sib) sib.classList.remove("hidden");
              }}
            />
            <span className="hidden text-sm font-bold text-[#0C1A2E]">KIWI Finance</span>
            <ExternalLink className="h-3 w-3 text-[#94A3B8]" />
          </a>
        </div>
      </div>

      {/* ── Main footer content ── */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Logo + description */}
          <div className="flex flex-col">
            <img
              src="https://customer-assets.emergentagent.com/job_kiwi-credit-calc/artifacts/79s0uoxb_logo2_corectr.png"
              alt="FinExperts"
              className="h-20 w-auto object-contain mb-5 brightness-0 invert opacity-90 self-start"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
                const sib = img.nextElementSibling as HTMLElement;
                if (sib) sib.classList.remove("hidden");
              }}
            />
            <div className="hidden text-xl font-bold text-white mb-5">FinExperts</div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Broker de credite autorizat, partener oficial KIWI Finance. Comparăm și negociem în locul tău — 100% gratuit.
            </p>
            <div className="mt-auto flex flex-col gap-2">
              <a href="tel:0799715101" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone className="h-3.5 w-3.5 text-[#C49A20] shrink-0" /> 0799 715 101
              </a>
              <a href="mailto:kbaa@kiwifinance.ro" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail className="h-3.5 w-3.5 text-[#C49A20] shrink-0" /> kbaa@kiwifinance.ro
              </a>
            </div>
          </div>

          {/* Produse */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Produse</h4>
            <ul className="space-y-3">
              <li><Link href="/calculator" className="text-sm text-gray-400 hover:text-white transition-colors">Calculator credite</Link></li>
              <li><Link href="/banci" className="text-sm text-gray-400 hover:text-white transition-colors">Comparator bănci</Link></li>
              <li><Link href="/calculator/suma-maxima" className="text-sm text-gray-400 hover:text-white transition-colors">Sumă maximă eligibilă</Link></li>
              <li><Link href="/calculator/refinantare" className="text-sm text-gray-400 hover:text-white transition-colors">Calculator refinanțare</Link></li>
              <li><Link href="/asigurari" className="text-sm text-gray-400 hover:text-white transition-colors">Asigurări</Link></li>
            </ul>
          </div>

          {/* Companie */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Companie</h4>
            <ul className="space-y-3">
              <li><Link href="/despre" className="text-sm text-gray-400 hover:text-white transition-colors">Despre noi</Link></li>
              <li><Link href="/ghiduri" className="text-sm text-gray-400 hover:text-white transition-colors">Ghiduri credite</Link></li>
              <li><Link href="/aplica" className="text-sm text-gray-400 hover:text-white transition-colors">Aplică credit</Link></li>
              <li><Link href="/termeni" className="text-sm text-gray-400 hover:text-white transition-colors">Termeni și Condiții</Link></li>
              <li><Link href="/confidentialitate" className="text-sm text-gray-400 hover:text-white transition-colors">Politica de date personale</Link></li>
              <li><Link href="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">Politica de Cookies</Link></li>
            </ul>
          </div>

          {/* Adresă + ANPC */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Date companie</h4>
            <p className="text-xs font-semibold text-gray-300 mb-1">Alexandra Achim PFA · CUI 54405887</p>
            <div className="flex items-start gap-2 mb-5">
              <MapPin className="h-3.5 w-3.5 text-[#C49A20] mt-0.5 shrink-0" />
              <span className="text-xs text-gray-400 leading-relaxed">
                Str. Stejarului, nr. 117A, camera 1,<br />
                etaj parter, ap. 3<br />
                Sat Dobroiești, Com. Dobroiești<br />
                Jud. Ilfov
              </span>
            </div>

            {/* Dispute resolution badges */}
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-3">Soluționarea litigiilor</p>
              <div className="flex flex-wrap gap-3">

                {/* ANPC SAL */}
                <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm">
                  <a
                    href="https://anpc.ro/ce-este-sal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    title="ANPC — Soluționarea Alternativă a Litigiilor"
                  >
                    <img
                      src="/logos/anpc-sal.png"
                      alt="ANPC SAL"
                      className="h-10 w-auto object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-[#0C1A2E] uppercase leading-tight">Soluționarea</span>
                      <span className="text-[9px] font-bold text-[#0C1A2E] uppercase leading-tight">Alternativă</span>
                      <span className="text-[9px] font-bold text-[#0C1A2E] uppercase leading-tight">a Litigiilor</span>
                    </div>
                  </a>
                </div>

                {/* CSALB */}
                <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm">
                  <a
                    href="https://www.csalb.ro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:opacity-80 transition-opacity"
                    title="CSALB — Centrul de Soluționare Alternativă a Litigiilor în domeniul Bancar"
                  >
                    <img
                      src="/logos/csalb.png"
                      alt="CSALB — 10 ani"
                      className="h-10 w-auto object-contain"
                    />
                  </a>
                </div>

                {/* SOL */}
                <div className="flex items-center bg-white rounded-xl px-3 py-2 shadow-sm">
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col hover:opacity-80 transition-opacity"
                    title="SOL — Soluționarea Online a Litigiilor"
                  >
                    <span className="text-[9px] font-bold text-[#0C1A2E] uppercase leading-tight">Soluționarea</span>
                    <span className="text-[9px] font-bold text-[#0C1A2E] uppercase leading-tight">Online a</span>
                    <span className="text-[9px] font-bold text-[#0C1A2E] uppercase leading-tight">Litigiilor</span>
                    <span className="text-[8px] text-[#003DA5] leading-tight mt-0.5 font-medium">ec.europa.eu/odr</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="bg-[#080F1C] px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <span>&copy; {new Date().getFullYear()} Alexandra Achim PFA · CUI 54405887 · Toate drepturile rezervate.</span>
          <div className="flex items-center gap-3">
            <Link href="/termeni" className="hover:text-gray-400 transition-colors">Termeni</Link>
            <span>·</span>
            <Link href="/confidentialitate" className="hover:text-gray-400 transition-colors">Confidențialitate</Link>
            <span>·</span>
            <Link href="/cookies" className="hover:text-gray-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
