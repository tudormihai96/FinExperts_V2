import { Link } from "wouter";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0C1A2E] text-white">

      {/* ── Main footer — 3 columns ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          {/* Col 1: Logo + contact + ANPC badge */}
          <div className="flex flex-col">
            <img
              src="https://customer-assets.emergentagent.com/job_kiwi-credit-calc/artifacts/79s0uoxb_logo2_corectr.png"
              alt="FinExperts"
              className="h-24 w-auto object-contain mb-4 brightness-0 invert opacity-90 self-start"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Broker de credite autorizat, partener oficial KIWI Finance. Comparăm și negociem în locul tău — 100% gratuit.
            </p>
            <div className="flex flex-col gap-2 mb-5">
              <a href="tel:0799715101" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                <Phone className="h-3 w-3 text-[#C49A20] shrink-0" /> 0799 715 101
              </a>
              <a href="mailto:kbaa@kiwifinance.ro" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                <Mail className="h-3 w-3 text-[#C49A20] shrink-0" /> kbaa@kiwifinance.ro
              </a>
              <span className="text-xs text-gray-500">Bd. Ion Câmpineanu, nr. 26, Sector 1, București</span>
            </div>

            {/* ANPC SAL official button — original colors, no filter */}
            <a
              href="https://anpc.ro/ce-este-sal/"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start hover:opacity-80 transition-opacity"
              title="ANPC — Soluționarea Alternativă a Litigiilor"
            >
              <img
                src="/logos/anpc-sal-btn.png"
                alt="ANPC — Soluționarea Alternativă a Litigiilor"
                className="h-11 w-auto object-contain"
              />
            </a>
          </div>

          {/* Col 2: Produse */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Produse</h4>
            <ul className="space-y-2.5">
              <li><Link href="/calculator" className="text-xs text-gray-400 hover:text-white transition-colors">Calculator credite</Link></li>
              <li><Link href="/banci" className="text-xs text-gray-400 hover:text-white transition-colors">Comparator bănci</Link></li>
              <li><Link href="/calculator/suma-maxima" className="text-xs text-gray-400 hover:text-white transition-colors">Sumă maximă eligibilă</Link></li>
              <li><Link href="/calculator/refinantare" className="text-xs text-gray-400 hover:text-white transition-colors">Calculator refinanțare</Link></li>
              <li><Link href="/asigurari" className="text-xs text-gray-400 hover:text-white transition-colors">Asigurări</Link></li>
            </ul>
          </div>

          {/* Col 3: Companie */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Companie</h4>
            <ul className="space-y-2.5">
              <li><Link href="/despre" className="text-xs text-gray-400 hover:text-white transition-colors">Despre noi</Link></li>
              <li><Link href="/ghiduri" className="text-xs text-gray-400 hover:text-white transition-colors">Ghiduri credite</Link></li>
              <li><Link href="/aplica" className="text-xs text-gray-400 hover:text-white transition-colors">Aplică credit</Link></li>
              <li><Link href="/termeni" className="text-xs text-gray-400 hover:text-white transition-colors">Termeni și Condiții</Link></li>
              <li><Link href="/confidentialitate" className="text-xs text-gray-400 hover:text-white transition-colors">Politica de date personale</Link></li>
              <li><Link href="/cookies" className="text-xs text-gray-400 hover:text-white transition-colors">Politica de Cookies</Link></li>
              <li><Link href="/despre#date-companie" className="text-xs text-gray-400 hover:text-white transition-colors">Date companie</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="bg-[#080F1C] px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-600">
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
