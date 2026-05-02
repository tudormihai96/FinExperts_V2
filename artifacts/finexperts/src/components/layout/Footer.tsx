import { Link } from "wouter";
import { ShieldCheck, ExternalLink, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0D1F3C] text-white">
      {/* PARTENER OFICIAL bar */}
      <div className="border-b border-white/10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 border border-[#C6A667]/50 rounded-full px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C6A667]" />
              <span className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider">Partener oficial</span>
            </div>
            <span className="text-sm text-gray-400">
              Membri ARBC — Asociația Română a Brokerilor de Credite
            </span>
          </div>
          <a
            href="https://kiwifinance.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#1a3256] hover:bg-[#243d6a] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            kiwifinance.ro
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + description */}
          <div>
            <img
              src="https://customer-assets.emergentagent.com/job_kiwi-credit-calc/artifacts/79s0uoxb_logo2_corectr.png"
              alt="FinExperts"
              className="h-10 mb-5 brightness-0 invert opacity-90"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
                img.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <div className="hidden text-xl font-bold text-white mb-5">FinExperts</div>
          </div>

          {/* Produse */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Produse</h4>
            <ul className="space-y-2.5">
              <li><Link href="/calculator" className="text-sm text-gray-400 hover:text-white transition-colors">Calculator credite</Link></li>
              <li><Link href="/banci" className="text-sm text-gray-400 hover:text-white transition-colors">Comparator bănci</Link></li>
              <li><Link href="/calculator/suma-maxima" className="text-sm text-gray-400 hover:text-white transition-colors">DAE vs dobândă</Link></li>
              <li><Link href="/calculator/refinantare" className="text-sm text-gray-400 hover:text-white transition-colors">Calculator refinanțare</Link></li>
              <li><Link href="/asigurari" className="text-sm text-gray-400 hover:text-white transition-colors">Asigurări</Link></li>
            </ul>
          </div>

          {/* Companie */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Companie</h4>
            <ul className="space-y-2.5">
              <li><Link href="/despre" className="text-sm text-gray-400 hover:text-white transition-colors">Despre noi</Link></li>
              <li><Link href="/ghiduri" className="text-sm text-gray-400 hover:text-white transition-colors">Ghiduri credite</Link></li>
              <li><Link href="/aplica" className="text-sm text-gray-400 hover:text-white transition-colors">Aplică credit</Link></li>
              <li><Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">Conectare</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:0799715101" className="text-sm text-gray-400 hover:text-white transition-colors">
                  0799 715 101
                </a>
              </li>
              <li>
                <a href="mailto:kbaa@kiwifinance.ro" className="text-sm text-gray-400 hover:text-white transition-colors">
                  kbaa@kiwifinance.ro
                </a>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-gray-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">
                  Str. Ion Câmpineanu nr. 26, bl. 8, sc. 2, et. 1, Sector 1, București, România
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} FinExperts. Broker autorizat, partener oficial KIWI Finance. Toate drepturile rezervate.
        </div>
      </div>
    </footer>
  );
}
