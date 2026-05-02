import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const articles = [
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
    excerpt: "Calculează dacă scade suficient de mult rata pentru a acoperi costurile noii bănci. Cele mai comune situații în care merită să refinanțezi și când nu.",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    date: "28 apr 2026"
  }
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="bg-[#0C1A2E] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Ghiduri & articole</h1>
          <p className="text-gray-300">Articole scrise de experți în credite și finanțe personale.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.slug}
              data-testid={`article-card-${article.slug}`}
              className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#C49A20] uppercase tracking-wider">{article.category}</span>
                  <span className="text-xs text-[#64748B]">{article.readTime} citire</span>
                </div>
                <h3 className="text-lg font-bold text-[#0C1A2E] mb-3 leading-snug">{article.title}</h3>
                <p className="text-sm text-[#64748B] mb-5 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">{article.date}</span>
                  <Link href={`/articole/${article.slug}`} data-testid={`btn-read-${article.slug}`} className="flex items-center gap-1 text-sm font-semibold text-[#0C1A2E] hover:text-[#C49A20] transition-colors">
                    Citește <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
