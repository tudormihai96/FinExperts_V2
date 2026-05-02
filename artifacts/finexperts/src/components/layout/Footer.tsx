import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B2E2E] text-white">

      {/* ── Main footer ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-10 lg:gap-16">

          {/* Col 1: Brand + contact + ANPC */}
          <div>
            <img
              src="https://customer-assets.emergentagent.com/job_kiwi-credit-calc/artifacts/79s0uoxb_logo2_corectr.png"
              alt="FinExperts"
              className="h-16 w-auto object-contain mb-4"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
              Broker de credite autorizat, partener oficial KIWI Finance. Comparăm și negociem în locul tău — 100% gratuit.
            </p>

            <div className="flex flex-col gap-2.5 mb-6">
              <a href="tel:0799715101" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group">
                <Phone className="h-3.5 w-3.5 text-[#C49A20] shrink-0 group-hover:scale-110 transition-transform" />
                0799 715 101
              </a>
              <a href="mailto:kbaa@kiwifinance.ro" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group">
                <Mail className="h-3.5 w-3.5 text-[#C49A20] shrink-0 group-hover:scale-110 transition-transform" />
                kbaa@kiwifinance.ro
              </a>
              <span className="flex items-start gap-2.5 text-sm text-gray-500">
                <MapPin className="h-3.5 w-3.5 text-[#C49A20] shrink-0 mt-0.5" />
                Bd. Ion Câmpineanu, nr. 26,<br />Sector 1, București
              </span>
            </div>

            {/* ANPC SAL button */}
            <a
              href="https://anpc.ro/ce-este-sal/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-75 transition-opacity"
              title="ANPC — Soluționarea Alternativă a Litigiilor"
            >
              <img
                src="/logos/anpc-sal-btn.png"
                alt="ANPC SAL"
                className="h-10 w-auto object-contain"
              />
            </a>
          </div>

          {/* Col 2: Produse */}
          <div>
            <h4 className="text-xs font-bold text-[#C49A20] uppercase tracking-widest mb-5">Produse</h4>
            <ul className="space-y-3">
              {[
                { href: "/calculator", label: "Calculator credite" },
                { href: "/banci", label: "Comparator bănci" },
                { href: "/asigurari", label: "Asigurări" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-0.5 inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Companie */}
          <div>
            <h4 className="text-xs font-bold text-[#C49A20] uppercase tracking-widest mb-5">Companie</h4>
            <ul className="space-y-3">
              {[
                { href: "/despre", label: "Despre noi" },
                { href: "/ghiduri", label: "Ghiduri credite" },
                { href: "/aplica", label: "Aplică credit" },
                { href: "/termeni", label: "Termeni și Condiții" },
                { href: "/confidentialitate", label: "Politica de date" },
                { href: "/cookies", label: "Politica de Cookies" },
                { href: "/despre#date-companie", label: "Date companie" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-0.5 inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="border-t border-white/8" />
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-600">
          <span>&copy; {new Date().getFullYear()} FinExperts · Toate drepturile rezervate.</span>
          <div className="flex items-center gap-4">
            <Link href="/termeni" className="hover:text-gray-400 transition-colors">Termeni</Link>
            <Link href="/confidentialitate" className="hover:text-gray-400 transition-colors">Confidențialitate</Link>
            <Link href="/cookies" className="hover:text-gray-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
