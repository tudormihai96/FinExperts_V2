import { Link } from "wouter";
import { MapPin, Phone, Mail, ExternalLink, AlertTriangle, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0C1A2E] text-white">

      {/* Main footer content */}
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
            <div className="flex items-start gap-2 mb-4">
              <MapPin className="h-3.5 w-3.5 text-[#C49A20] mt-0.5 shrink-0" />
              <span className="text-xs text-gray-400 leading-relaxed">
                Str. Stejarului, nr. 117A, camera 1,<br />
                etaj parter, ap. 3<br />
                Sat Dobroiești, Com. Dobroiești<br />
                Jud. Ilfov
              </span>
            </div>

            {/* ANPC buttons */}
            <div className="mt-5 space-y-2">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-2">Protecția consumatorilor</p>
              <a
                href="https://anpc.ro/ce-este-sal/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 px-3 py-2 rounded-xl transition-all duration-200 group"
              >
                <AlertTriangle className="h-3.5 w-3.5 text-[#C49A20] shrink-0" />
                <div>
                  <div className="text-[11px] font-semibold text-white">ANPC — Reclamații</div>
                  <div className="text-[9px] text-gray-400">Soluționare alternativă litigii</div>
                </div>
                <ExternalLink className="h-3 w-3 text-gray-500 ml-auto" />
              </a>
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 px-3 py-2 rounded-xl transition-all duration-200"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <div>
                  <div className="text-[11px] font-semibold text-white">SOL — Platforma europeană</div>
                  <div className="text-[9px] text-gray-400">ec.europa.eu/consumers/odr</div>
                </div>
                <ExternalLink className="h-3 w-3 text-gray-500 ml-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* PARTENER OFICIAL bar — white background for KIWI logo visibility */}
      <div className="bg-white border-t border-gray-100">
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
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/logos/kiwi-finance.png"
              alt="KIWI Finance"
              className="h-9 w-auto object-contain"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
                const sib = img.nextElementSibling as HTMLElement;
                if (sib) sib.classList.remove("hidden");
              }}
            />
            <span className="hidden text-sm font-bold text-[#0C1A2E]">KIWI Finance</span>
            <ExternalLink className="h-3 w-3 text-[#64748B]" />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
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
