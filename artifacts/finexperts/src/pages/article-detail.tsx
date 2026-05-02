import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const articleContent: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}> = {
  "credit-ipotecar-ghid-complet": {
    title: "Ghid complet credit ipotecar 2026",
    category: "Credit ipotecar",
    date: "15 mai 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1560518846-1ea118f29673?auto=format&fit=crop&q=80&w=1200",
    content: `
## Ce este creditul ipotecar?

Creditul ipotecar este un credit garantat cu o proprietate imobiliară. Se folosește pentru cumpărarea, construirea sau renovarea unui imobil. Spre deosebire de creditul de nevoi personale, creditul ipotecar are dobânzi mai mici și perioade de rambursare mai lungi (până la 30 de ani).

## Documente necesare

**Documente personale:**
- Buletin/Carte de identitate
- Certificat de căsătorie (dacă este cazul)

**Documente venituri:**
- Adeverință de salariu din ultimele 3 luni
- Fluturași de salariu
- Declarație fiscală (pentru PFA sau liber profesioniști)
- Extrase de cont din ultimele 6 luni

**Documente proprietate:**
- Extras de carte funciară
- Contract de vânzare-cumpărare (sau promisiune de vânzare)
- Raport de evaluare a imobilului

## Pașii procesului

1. **Pre-aprobare** — banca analizează profilul și acordă un accept de principiu
2. **Dosarul complet** — depunerea tuturor documentelor
3. **Evaluarea imobilului** — un expert autorizat evaluează proprietatea
4. **Analiza dosarului** — banca face scoring-ul final (3-10 zile lucrătoare)
5. **Semnarea contractului** — la notar

## Calcul DTI (Debt-to-Income)

Conform BNR, rata lunară totală nu poate depăși 40% din venitul net. Dacă venitul tău net este 5.000 RON și ai deja o rată de 500 RON/lună, rata maximă pentru noul credit este:

**5.000 × 40% − 500 = 1.500 RON/lună**

## Asigurările obligatorii

- **PAD** (Polița de Asigurare Obligatorie a Locuinței) — obligatorie prin lege
- **Asigurare ipotecară** — cerută de bancă pentru credit
- **Asigurare de viață** — de obicei cerută de bancă

## Sfaturi practice

- Compară minim 3-4 bănci înainte să decizi
- Atenție la DAE, nu doar la dobânda nominală
- Verifică comisioanele ascunse (analiză, administrare, rambursare anticipată)
- Consultă un broker de credite pentru negocieri mai bune
    `
  },
  "dae-vs-dobanda-nominala": {
    title: "DAE vs. dobânda nominală — ce trebuie să știi",
    category: "Educație financiară",
    date: "3 mai 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
    content: `
## Dobânda nominală vs. DAE

Când compari două oferte de credit, **dobânda nominală** este procentul pe care îl plătești băncii pentru banii împrumutați. Dar dobânda nominală nu include celelalte costuri obligatorii ale creditului.

**DAE (Dobânda Anuală Efectivă)** include:
- Dobânda nominală
- Comisionul de analiză
- Comisionul de administrare lunar
- Prima de asigurare de viață (dacă este inclusă obligatoriu)

## Exemplu concret

Banca A oferă: dobândă 8%, comision analiză 0%, comision administrare 0,1%/lună → **DAE 9,4%**

Banca B oferă: dobândă 7%, comision analiză 2%, comision administrare 0,2%/lună → **DAE 10,2%**

Deși Banca B are o dobândă mai mică, costul total al creditului este mai mare!

## Regula de aur

**Compară întotdeauna ofertele după DAE, nu după dobânda nominală.**

DAE este singurul indicator standardizat prin lege (Directiva Europeană 2014/17/UE) care reflectă costul real al unui credit.

## Comisioane tipice

- **Comision de analiză**: 0-3% din valoarea creditului, perceput o singură dată
- **Comision de administrare**: 0-0,3% pe lună din soldul creditului
- **Comision de rambursare anticipată**: max. 1% dacă mai sunt &gt;12 luni din contract

## Concluzie

Nu te lăsa dus de reclame cu dobânzi mici. Cere întotdeauna DAE și calculează costul total al creditului (suma tuturor ratelor) pentru a putea compara corect ofertele.
    `
  },
  "refinantare-credit-cand-are-sens": {
    title: "Refinanțare credit — când are sens",
    category: "Refinanțare",
    date: "28 apr 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
    content: `
## Ce înseamnă refinanțarea?

Refinanțarea înseamnă transferul creditului tău de la o bancă la alta (sau obținerea unui credit nou la aceeași bancă) în condiții mai bune. Scopul principal: reducerea ratei lunare sau a costului total al creditului.

## Când merită să refinanțezi?

**Merită** dacă:
- Dobânda pieței a scăzut cu cel puțin 1-2 puncte procentuale față de dobânda ta
- Venitul tău a crescut și poți negocia condiții mai bune
- Ai acumulat un istoric de plăți bun și îți permite un scoring mai bun
- Vrei să extinzi perioada și să reduci rata lunară

**Nu merită** dacă:
- Ai mai puțin de 12-24 luni rămase din credit (costurile depășesc economia)
- Comisionul de rambursare anticipată este mare
- Creditul tău are clauze restrictive

## Calculul economiei

**Formula simplă:**
Economie netă = (Rata actuală − Rata nouă) × Luni rămase − Costuri refinanțare

**Costuri refinanțare includ:**
- Comision rambursare anticipată (max. 1% conform legii)
- Taxa de analiză la banca nouă (200-1.500 RON)
- Costul re-evaluare imobil (pentru ipotecare, 300-600 RON)
- Taxa notar (pentru ipotecare)

## Break-even

Break-even = Costuri refinanțare / Economie lunară

Dacă break-even-ul este mai mic decât lunile rămase din credit, refinanțarea are sens.

**Exemplu:**
- Economie lunară: 200 RON
- Costuri refinanțare: 1.500 RON
- Break-even: 7,5 luni → **merită dacă mai ai cel puțin 8 luni din credit**

## Procesul de refinanțare

1. Contactezi banca nouă și obții o ofertă
2. Banca nouă plătește soldul rămas la banca veche
3. Semnezi noul contract de credit
4. Radiezi ipoteca veche și înregistrezi una nouă (pentru credite ipotecare)

Folosește calculatorul de refinanțare FinExperts pentru a vedea instant dacă merită în cazul tău.
    `
  }
};

export default function ArticleDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const article = articleContent[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0C1A2E] mb-4">Articolul nu a fost găsit</h1>
          <Link href="/articole"><Button>Înapoi la articole</Button></Link>
        </div>
      </div>
    );
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-[#0C1A2E] mt-8 mb-4">{line.slice(3)}</h2>;
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold text-[#0C1A2E] mt-4 mb-2">{line.slice(2, -2)}</p>;
      if (line.startsWith('- ')) return <li key={i} className="ml-4 text-[#64748B] my-1">{line.slice(2)}</li>;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-[#64748B] my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: line }} />;
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="bg-[#0C1A2E] py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/articole" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 text-sm transition-colors">
            <ArrowLeft className="h-4 w-4" /> Înapoi la articole
          </Link>
          <div className="text-xs font-bold text-[#C49A20] uppercase tracking-wider mb-3">{article.category}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime} citire</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="rounded-xl overflow-hidden mb-10 h-72">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 md:p-12">
          <div className="prose max-w-none">
            {formatContent(article.content)}
          </div>
        </div>

        <div className="mt-10 bg-gradient-to-r from-[#0C1A2E] to-[#132846] rounded-xl p-8 text-white">
          <h3 className="text-xl font-bold mb-2">Calculează rata ta</h3>
          <p className="text-gray-300 mb-5">Folosește calculatorul FinExperts pentru a vedea rata exactă la toate băncile din România.</p>
          <div className="flex gap-4">
            <Link href="/calculator"><Button className="bg-[#C49A20] hover:bg-[#b09255] text-[#0C1A2E] font-bold">Calculator credite</Button></Link>
            <Link href="/aplicare-credit"><Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0C1A2E]">Aplică credit</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
