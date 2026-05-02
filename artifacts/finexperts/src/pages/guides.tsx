import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { useStore } from "@/lib/store";

export default function GuidesPage() {
  const { guides } = useStore();
  const safeGuides = guides ?? [];

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Ghiduri</div>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#0B2E2E] leading-tight mb-3">
            Totul despre credite,<br />
            explicat clar.
          </h1>
          <p className="text-[#64748B] text-sm sm:text-base max-w-xl">
            Ghiduri și articole scrise de experți în credite și finanțe personale, pentru a lua cea mai bună decizie financiară.
          </p>
        </div>

        {safeGuides.length === 0 && (
          <div className="text-center py-20 text-[#64748B]">
            <p className="text-lg font-medium">Ghidurile se încarcă...</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {safeGuides.map((guide) => (
            <Link key={guide.slug} href={`/ghiduri/${guide.slug}`}>
              <div
                data-testid={`guide-card-${guide.slug}`}
                className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="h-48 overflow-hidden bg-[#E2E8F0] relative">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = "none";
                      const parent = img.parentElement;
                      if (parent) {
                        parent.style.background = "linear-gradient(135deg, #0B2E2E 0%, #1a3a5e 100%)";
                        const label = document.createElement("div");
                        label.className = "absolute inset-0 flex items-center justify-center";
                        label.innerHTML = `<span style="color:#C49A20;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;text-align:center;padding:16px">${guide.category}</span>`;
                        parent.appendChild(label);
                      }
                    }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#C49A20] uppercase tracking-wider">{guide.category}</span>
                    <span className="flex items-center gap-1 text-[10px] text-[#64748B]">
                      <Clock className="h-3 w-3" />
                      {guide.readTime} citire
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#0B2E2E] mb-2 leading-snug group-hover:text-[#C49A20] transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-[#64748B] line-clamp-3 mb-4">{guide.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#64748B]">{guide.date}</span>
                    <span className="flex items-center gap-1 text-xs font-medium text-[#0B2E2E]">
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
