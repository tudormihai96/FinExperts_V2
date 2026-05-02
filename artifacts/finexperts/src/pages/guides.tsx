import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";

const guides = [
  {
    slug: "credit-ipotecar-ghid-complet",
    title: "Ghid complet credit ipotecar 2026",
    category: "CREDIT IPOTECAR",
    excerpt: "Află tot ce trebuie să știi înainte să îți cumperi o locuință prin credit ipotecar: documente necesare, condiții de eligibilitate, pași de urmat și capcanele de evitat.",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1560518846-1ea118f29673?auto=format&fit=crop&q=80&w=800",
    date: "15 mai 2026"
  },
  {
    slug: "dae-vs-dobanda-nominala",
    title: "DAE vs. dobânda nominală — ce trebuie să știi",
    category: "EDUCAȚIE FINANCIARĂ",
    excerpt: "DAE (Dobânda Anuală Efectivă) include dobânda nominală plus toate comisioanele obligatorii. Este singurul indicator corect pentru a compara două oferte de credit.",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    date: "3 mai 2026"
  },
  {
    slug: "refinantare-credit-cand-are-sens",
    title: "Refinanțare credit — când are sens",
    category: "REFINANȚARE",
    excerpt: "Calculează dacă scade suficient rata pentru a acoperi costurile noii bănci. Cele mai comune situații în care merită să refinanțezi și când nu.",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    date: "28 apr 2026"
  },
  {
    slug: "credit-personal-fara-garantii",
    title: "Credit personal fără garanții — ghid complet",
    category: "CREDIT PERSONAL",
    excerpt: "Creditele de nevoi personale nu necesită garanții imobiliare sau colaterale. Află condițiile de eligibilitate, documentele necesare și băncile cu cele mai bune oferte.",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800",
    date: "20 apr 2026"
  },
  {
    slug: "prima-casa-ghid",
    title: "Prima ta casă — ghidul complet pentru cumpărători",
    category: "CREDIT IPOTECAR",
    excerpt: "De la alegerea proprietății la semnarea contractului la notar — tot procesul de cumpărare a primei locuințe explicat pas cu pas, inclusiv costurile ascunse.",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800",
    date: "12 apr 2026"
  },
  {
    slug: "pfa-credit-documente",
    title: "Credit PFA — documente și bănci care acceptă",
    category: "PFA & ANTREPRENORI",
    excerpt: "Dacă ești PFA sau liber profesionist, nu orice bancă îți acceptă venitul. Aflăm care bănci au criteriile cele mai flexibile și ce documente trebuie să pregătești.",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    date: "5 apr 2026"
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider mb-3">Ghiduri</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A1A2E] leading-tight mb-3">
            Totul despre credite,<br />
            explicat clar.
          </h1>
          <p className="text-[#5A6478] text-base max-w-xl">
            Ghiduri și articole scrise de experți în credite și finanțe personale, pentru a lua cea mai bună decizie financiară.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {guides.map((guide) => (
            <Link key={guide.slug} href={`/ghiduri/${guide.slug}`}>
              <div
                data-testid={`guide-card-${guide.slug}`}
                className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="h-48 overflow-hidden bg-[#E5E3D9]">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#C6A667] uppercase tracking-wider">{guide.category}</span>
                    <span className="flex items-center gap-1 text-[10px] text-[#5A6478]">
                      <Clock className="h-3 w-3" />
                      {guide.readTime} citire
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#0A1A2E] mb-2 leading-snug group-hover:text-[#C6A667] transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-[#5A6478] line-clamp-3 mb-4">{guide.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#5A6478]">{guide.date}</span>
                    <span className="flex items-center gap-1 text-xs font-medium text-[#0A1A2E]">
                      Citește <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
