import { Link } from "wouter";
import { ShieldCheck, MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0C1A2E] text-white">
      {/* PARTENER OFICIAL bar */}
      <div className="border-b border-white/10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 border border-[#C49A20]/50 rounded-full px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C49A20]" />
              <span className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider">Partener oficial</span>
            </div>
            <span className="text-sm text-gray-400">
              Membri ARBC — Asociația Română a Brokerilor de Credite
            </span>
          </div>
          {/* KIWI Finance logo link */}
          <a
            href="https://kiwifinance.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 px-4 py-2 rounded-xl transition-all duration-200"
          >
            <img
              src="/logos/kiwi-finance.png"
              alt="KIWI Finance"
              className="h-7 w-auto object-contain"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
                img.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <span className="hidden text-sm font-semibold text-white">KIWI Finance</span>
            <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
          </a>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo + description — same height as sitemap columns */}
          <div className="flex flex-col">
            <img
              src="https://customer-assets.emergentagent.com/job_kiwi-credit-calc/artifacts/79s0uoxb_logo2_corectr.png"
              alt="FinExperts"
              className="h-16 w-auto object-contain mb-5 brightness-0 invert opacity-90 self-start"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
                img.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <div className="hidden text-xl font-bold text-white mb-5">FinExperts</div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Broker de credite autorizat, partener oficial KIWI Finance. Comparăm și negociem în locul tău.
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
              <li><Link href="/calculator/suma-maxima" className="text-sm text-gray-400 hover:text-white transition-colors">DAE vs dobândă</Link></li>
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
              <li><Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">Conectare</Link></li>
            </ul>
          </div>

          {/* Adresă + legal */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Adresă</h4>
            <div className="flex items-start gap-2 mb-4">
              <MapPin className="h-3.5 w-3.5 text-[#C49A20] mt-0.5 shrink-0" />
              <span className="text-sm text-gray-400 leading-relaxed">
                Str. Ion Câmpineanu nr. 26,<br />bl. 8, sc. 2, et. 1,<br />Sector 1, București
              </span>
            </div>
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-xs text-gray-500 leading-relaxed">
                Broker autorizat ASF · Membri ARBC · Partener KIWI Finance
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>&copy; {new Date().getFullYear()} FinExperts. Toate drepturile rezervate.</span>
          <span>Broker autorizat, partener oficial KIWI Finance</span>
        </div>
      </div>
    </footer>
  );
}
