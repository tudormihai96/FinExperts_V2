import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";

const content: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  body: string;
}> = {
  "credit-ipotecar-ghid-complet": {
    title: "Ghid complet credit ipotecar 2026",
    category: "Credit ipotecar",
    date: "15 mai 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1560518846-1ea118f29673?auto=format&fit=crop&q=80&w=1200",
    body: `## Ce este creditul ipotecar?\n\nCreditul ipotecar este un credit garantat cu o proprietate imobiliară. Se folosește pentru cumpărarea, construirea sau renovarea unui imobil. Dobânzile sunt mai mici și perioadele mai lungi față de creditele personale (până la 30 de ani).\n\n## Documente necesare\n\n**Documente personale:**\n- Buletin/Carte de identitate\n- Certificat de căsătorie (dacă este cazul)\n\n**Documente venituri:**\n- Adeverință de salariu din ultimele 3 luni\n- Fluturași de salariu\n- Declarație fiscală (pentru PFA)\n- Extrase de cont din ultimele 6 luni\n\n**Documente proprietate:**\n- Extras de carte funciară\n- Contract de vânzare-cumpărare\n- Raport de evaluare a imobilului\n\n## Pașii procesului\n\n1. **Pre-aprobare** — banca analizează profilul și acordă un accept de principiu\n2. **Dosarul complet** — depunerea tuturor documentelor\n3. **Evaluarea imobilului** — expert autorizat\n4. **Analiza dosarului** — scoring final (3-10 zile lucrătoare)\n5. **Semnarea contractului** — la notar\n\n## Calcul DTI (Debt-to-Income)\n\nConform BNR, rata lunară totală nu poate depăși 40% din venitul net.\n\n**Exemplu:** Venit 5.000 RON, rate existente 500 RON → rata maximă nouă = 5.000 × 40% − 500 = **1.500 RON/lună**\n\n## Sfaturi practice\n\n- Compară minim 3-4 bănci înainte să decizi\n- Atenție la DAE, nu doar la dobânda nominală\n- Verifică comisioanele ascunse\n- Consultă un broker de credite pentru negocieri mai bune`
  },
  "dae-vs-dobanda-nominala": {
    title: "DAE vs. dobânda nominală — ce trebuie să știi",
    category: "Educație financiară",
    date: "3 mai 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
    body: `## Dobânda nominală vs. DAE\n\nCând compari două oferte de credit, **dobânda nominală** este procentul pe care îl plătești băncii. Dar nu include toate costurile obligatorii.\n\n**DAE (Dobânda Anuală Efectivă)** include:\n- Dobânda nominală\n- Comisionul de analiză\n- Comisionul de administrare lunar\n- Prima de asigurare de viață (dacă e obligatorie)\n\n## Exemplu concret\n\nBanca A: dobândă 8%, comision 0%, administrare 0,1%/lună → **DAE 9,4%**\n\nBanca B: dobândă 7%, comision 2%, administrare 0,2%/lună → **DAE 10,2%**\n\nDeși Banca B are dobânda mai mică, costul total este mai mare!\n\n## Regula de aur\n\n**Compară întotdeauna ofertele după DAE, nu după dobânda nominală.**\n\n## Concluzie\n\nNu te lăsa dus de reclame cu dobânzi mici. Cere întotdeauna DAE și calculează costul total al creditului.`
  },
  "refinantare-credit-cand-are-sens": {
    title: "Refinanțare credit — când are sens",
    category: "Refinanțare",
    date: "28 apr 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
    body: `## Ce înseamnă refinanțarea?\n\nRefinanțarea înseamnă transferul creditului tău la o altă bancă sau renegocierea la aceeași bancă, în condiții mai bune. Scopul: reducerea ratei lunare sau a costului total.\n\n## Când merită să refinanțezi?\n\n**Merită** dacă:\n- Dobânda pieței a scăzut cu cel puțin 1-2 puncte procentuale\n- Venitul tău a crescut și poți negocia condiții mai bune\n- Ai acumulat un istoric de plăți bun\n\n**Nu merită** dacă:\n- Ai mai puțin de 12-24 luni rămase\n- Comisionul de rambursare anticipată e mare\n\n## Calculul economiei\n\nEconomie netă = (Rata actuală − Rata nouă) × Luni rămase − Costuri refinanțare\n\n**Break-even** = Costuri refinanțare / Economie lunară\n\nFolosește calculatorul de refinanțare FinExperts pentru a vedea instant dacă merită în cazul tău.`
  },
};

export default function GuideDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const guide = content[slug];

  if (!guide) {
    return (
      <div className="min-h-screen bg-[#F7F4EC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0A1A2E] mb-4">Ghidul nu a fost găsit</h1>
          <Link href="/ghiduri">
            <button className="bg-[#0A1A2E] text-white px-6 py-2 rounded-lg">Înapoi la ghiduri</button>
          </Link>
        </div>
      </div>
    );
  }

  const renderBody = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-[#0A1A2E] mt-8 mb-4">{line.slice(3)}</h2>;
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-semibold text-[#0A1A2E] mt-4 mb-2">{line.slice(2, -2)}</p>;
      if (line.startsWith('- ')) return <li key={i} className="ml-5 text-[#5A6478] my-1 list-disc">{line.slice(2)}</li>;
      if (line.trim() === '') return <div key={i} className="h-2" />;
      return <p key={i} className="text-[#5A6478] my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: line }} />;
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Back */}
        <Link href="/ghiduri" className="inline-flex items-center gap-1.5 text-sm text-[#5A6478] hover:text-[#0A1A2E] mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Înapoi la ghiduri
        </Link>

        {/* Header */}
        <div className="text-xs font-bold text-[#C6A667] uppercase tracking-wider mb-3">{guide.category}</div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#0A1A2E] mb-3">{guide.title}</h1>
        <div className="flex items-center gap-3 text-sm text-[#5A6478] mb-8">
          <span>{guide.date}</span>
          <span>·</span>
          <span>{guide.readTime} citire</span>
        </div>

        {/* Cover image */}
        <div className="rounded-xl overflow-hidden mb-8 h-64 md:h-80">
          <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="bg-white border border-[#E5E3D9] rounded-xl p-6 md:p-10 mb-8">
          {renderBody(guide.body)}
        </div>

        {/* CTA */}
        <div className="bg-[#0A1A2E] rounded-xl p-8 text-white">
          <h3 className="text-xl font-bold mb-2">Calculează rata ta</h3>
          <p className="text-gray-300 mb-5">Folosește calculatorul FinExperts pentru a vedea rata exactă la toate cele 11 bănci.</p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/calculator">
              <button className="bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-semibold px-5 py-2.5 rounded-lg transition-colors">
                Calculator credite
              </button>
            </Link>
            <Link href="/aplica">
              <button className="border border-white/30 text-white hover:bg-white/10 font-medium px-5 py-2.5 rounded-lg transition-colors">
                Aplică credit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
