import { Link } from "wouter";
import { MapPin, Phone, Mail, ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0C1A2E] text-white">

      {/* ── KIWI Finance partner bar — WHITE bg ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 border border-[#C49A20]/50 rounded-full px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C49A20]" />
              <span className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider">Partener oficial</span>
            </div>
            <span className="text-xs text-[#64748B]">Membri ARBC · Broker autorizat ASF</span>
          </div>
          <a href="https://kiwifinance.ro" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-75 transition-opacity">
            <img src="/logos/kiwi-finance.png" alt="KIWI Finance" className="h-10 w-auto object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <ExternalLink className="h-3 w-3 text-[#94A3B8]" />
          </a>
        </div>
      </div>

      {/* ── Main footer — 3 columns ── */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Col 1: Logo + contact + company data */}
          <div className="flex flex-col">
            <img
              src="https://customer-assets.emergentagent.com/job_kiwi-credit-calc/artifacts/79s0uoxb_logo2_corectr.png"
              alt="FinExperts"
              className="h-20 w-auto object-contain mb-5 brightness-0 invert opacity-90 self-start"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Broker de credite autorizat, partener oficial KIWI Finance. Comparăm și negociem în locul tău — 100% gratuit.
            </p>
            <div className="flex flex-col gap-2 mb-5">
              <a href="tel:0799715101" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone className="h-3.5 w-3.5 text-[#C49A20] shrink-0" /> 0799 715 101
              </a>
              <a href="mailto:kbaa@kiwifinance.ro" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail className="h-3.5 w-3.5 text-[#C49A20] shrink-0" /> kbaa@kiwifinance.ro
              </a>
            </div>
            {/* Company data */}
            <div className="border-t border-white/10 pt-4">
              <p className="text-[11px] font-semibold text-gray-300 mb-1">Alexandra Achim PFA · CUI 54405887</p>
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#C49A20] mt-0.5 shrink-0" />
                <span className="text-xs text-gray-500 leading-relaxed">
                  Str. Stejarului, nr. 117A, cam. 1, parter, ap. 3<br />
                  Sat Dobroiești, Com. Dobroiești, Jud. Ilfov
                </span>
              </div>
              <div className="flex items-start gap-2 mt-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#C49A20] mt-0.5 shrink-0" />
                <span className="text-xs text-gray-500 leading-relaxed">
                  Birou: Bd. Ion Câmpineanu, nr. 26<br />
                  Sector 1, București (KIWI Finance)
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Produse */}
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

          {/* Col 3: Companie */}
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

        </div>
      </div>

      {/* ── Dispute resolution badges — full width white band ── */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-4">
            Soluționarea alternativă a litigiilor
          </p>
          <div className="flex flex-wrap gap-3">

            {/* ANPC SAL */}
            <div className="flex items-center gap-3 border border-[#E2E8F0] rounded-xl px-4 py-3 bg-white shadow-sm min-w-[240px] flex-1">
              <img src="/logos/anpc-sal.png" alt="ANPC SAL"
                className="h-12 w-auto object-contain shrink-0 max-w-[90px]" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-[#0C1A2E] uppercase tracking-wide leading-tight">
                  Soluționarea Alternativă<br />a Litigiilor
                </p>
              </div>
              <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer"
                className="shrink-0 bg-[#003DA5] hover:bg-[#002d7a] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                DETALII
              </a>
            </div>

            {/* CSALB */}
            <div className="flex items-center gap-3 border border-[#E2E8F0] rounded-xl px-4 py-3 bg-white shadow-sm min-w-[240px] flex-1">
              <img src="/logos/csalb.png" alt="CSALB — Centrul de Soluționare Alternativă a Litigiilor în domeniul Bancar"
                className="h-12 w-auto object-contain shrink-0 max-w-[90px]" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-[#0C1A2E] uppercase tracking-wide leading-tight">
                  Centrul de Soluționare<br />Alternativă — Domeniu Bancar
                </p>
              </div>
              <a href="https://www.csalb.ro/" target="_blank" rel="noopener noreferrer"
                className="shrink-0 bg-[#003DA5] hover:bg-[#002d7a] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                DETALII
              </a>
            </div>

            {/* SOL */}
            <div className="flex items-center gap-3 border border-[#E2E8F0] rounded-xl px-4 py-3 bg-white shadow-sm min-w-[240px] flex-1">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-[#0C1A2E] uppercase tracking-wide leading-tight">
                  Soluționarea Online<br />a Litigiilor
                </p>
                <p className="text-[9px] text-[#64748B] mt-0.5">Platforma europeană ec.europa.eu/consumers/odr</p>
              </div>
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer"
                className="shrink-0 bg-[#003DA5] hover:bg-[#002d7a] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                DETALII
              </a>
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
