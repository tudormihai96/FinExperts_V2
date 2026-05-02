import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Briefcase, ShieldCheck, Award, Users, Phone, Mail, MapPin } from "lucide-react";

const team = [
  {
    id: "alexandra",
    name: "Alexandra Achim",
    role: "Manager Franciză",
    bio: "Coordonează rețeaua FinExperts și relațiile cu băncile partenere. Background în Banca Transilvania și Raiffeisen Bank.",
    avatar: "AA",
    color: "#C49A20",
    email: "alexandra.achim@kiwifinance.ro",
    phone: "0799 715 101",
    zone: "Cluj-Napoca",
  },
  {
    id: "cristina",
    name: "Cristina Coman",
    role: "Broker de Credite",
    bio: "Specializată în credite ipotecare și refinanțări. Background în BRD și Raiffeisen Bank.",
    avatar: "CC",
    color: "#0C1A2E",
    email: "cristina.coman@kiwifinance.ro",
    phone: "0725 596 672",
    zone: "Cluj-Napoca",
  },
  {
    id: "erji",
    name: "Ana-Maria Erji",
    role: "Broker de Credite",
    bio: "Expertă în credite de nevoi personale și soluții pentru PFA. Background în Raiffeisen Bank.",
    avatar: "AE",
    color: "#2E7D5B",
    email: "ana-maria.gheorghe@kiwifinance.ro",
    phone: "0755 251 860",
    zone: "Cluj-Napoca",
  },
  {
    id: "tudor",
    name: "Tudor Mihai",
    role: "Broker de Credite",
    bio: "Focus pe credite cu garanții imobiliare și soluții complexe pentru antreprenori. Background în Raiffeisen Bank.",
    avatar: "TM",
    color: "#005BAA",
    email: "mihai.tudor@kiwifinance.ro",
    phone: "0799 717 737",
    zone: "Cluj-Napoca",
  },
];

const faq = [
  {
    q: "Este sigur să aplic prin FinExperts?",
    a: "Da. Datele tale sunt transmise criptat, doar către banca aleasă de tine. Nu vindem datele și nu le folosim în scopuri de marketing terț. Suntem broker autorizat, înregistrat la Autoritatea de Supraveghere Financiară (ASF)."
  },
  {
    q: "Cât durează aprobarea unui credit?",
    a: "Creditele de nevoi personale sunt aprobate de majoritatea băncilor în 24-48h. Creditele ipotecare necesită 3-10 zile lucrătoare, în funcție de complexitatea dosarului și de bancă."
  },
  {
    q: "Ce este DAE și de ce este important?",
    a: "DAE (Dobânda Anuală Efectivă) include dobânda nominală + toate comisioanele obligatorii (administrare, analiză, asigurare). Este singurul indicator corect pentru a compara două oferte de credit. O dobândă mică dar cu comisioane mari poate fi mai scumpă decât o dobândă mai mare fără comisioane."
  },
  {
    q: "Pot aplica dacă sunt PFA sau am venituri variabile?",
    a: "Da. Salariat, PFA, antreprenor sau pensionar — alegem împreună soluția potrivită. Anumite bănci (Patria Bank, Libra Internet Bank) au produse special concepute pentru PFA și venituri din activități independente."
  },
  {
    q: "Ce documente am nevoie pentru un credit personal?",
    a: "De regulă: buletin de identitate, adeverință de venit sau fluturași de salariu (ultimele 3 luni), și extras de cont. Unele bănci online (ING, Raiffeisen) pot aproba fără adeverință, doar pe baza extrasului. Îți pregătim noi lista exactă de documente pentru banca aleasă."
  },
  {
    q: "Ce documente am nevoie pentru un credit ipotecar?",
    a: "Pentru ipotecar sunt necesare: documente de identitate, dovada veniturilor (ultimele 3-6 luni), documentele proprietății (extras CF, plan cadastral, act proprietate), evaluare ANEVAR a imobilului și asigurare obligatorie PAD. Noi coordonăm tot procesul de la zero."
  },
  {
    q: "Ce înseamnă IRCC și cum influențează rata mea ipotecară?",
    a: "IRCC (Indicele de Referință pentru Creditele Consumatorilor) este rata de referință calculată trimestrial de BNR pe baza tranzacțiilor interbancare. Rata ta ipotecară variabilă = IRCC + marjă fixă a băncii. În T1 2026, IRCC = 5,58%. O marjă mai mică înseamnă rată lunară mai mică."
  },
  {
    q: "Pot refinanța creditul dacă am găsit o ofertă mai bună?",
    a: "Da, refinanțarea este legală și uneori extrem de avantajoasă. Dacă dobânda actuală e semnificativ mai mare decât ofertele din piață, refinanțarea poate reduce rata lunară cu sute de RON. Calculăm gratuit dacă merită sau nu, ținând cont de costurile de transfer."
  },
  {
    q: "Cât costă serviciile FinExperts?",
    a: "Serviciile de consultanță și intermediere sunt gratuite pentru client. Suntem remunerați de bancă printr-un comision de intermediere, plătit din bugetul de marketing al băncii. Tu primești aceleași condiții sau mai bune decât dacă ai merge direct la bancă."
  },
  {
    q: "Pot obține un credit dacă am un credit în derulare?",
    a: "Da, în funcție de gradul de îndatorare. Băncile permit un grad de îndatorare de maximum 40% din venitul net (sau 45% pentru ipotecare în anumite condiții). Calculăm împreună dacă ești eligibil și care bancă are criterii mai flexibile pentru situația ta."
  },
  {
    q: "Ce se întâmplă dacă sunt respins de o bancă?",
    a: "Un refuz de la o bancă nu înseamnă că ești refuzat de toate. Fiecare bancă are propriile criterii de scoring. Noi cunoaștem profilurile preferate ale fiecărei bănci și te îndrumăm direct către cea cu cea mai mare probabilitate de aprobare, evitând interogările multiple în Biroul de Credit."
  },
  {
    q: "Creditul ipotecar acoperă și cheltuielile notariale?",
    a: "Nu direct — creditul ipotecar finanțează valoarea imobilului (de obicei 75-85% din valoarea de evaluare). Cheltuielile notariale, taxa de evaluare, asigurările și alte costuri anexe trebuie acoperite din avans propriu sau dintr-un credit personal separat. Îți prezentăm un calcul complet al tuturor costurilor înainte de a semna ceva."
  },
];

function TeamCard({ member }: { member: typeof team[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-testid={`team-card-${member.id}`}
      className="relative bg-white border border-[#E2E8F0] rounded-xl overflow-hidden cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Normal state */}
      <div className={`p-6 transition-all duration-300 ${hovered ? "opacity-0" : "opacity-100"}`}>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-sm"
          style={{ backgroundColor: member.color }}
        >
          {member.avatar}
        </div>
        <h3 className="font-semibold text-[#0C1A2E] text-center mb-0.5">{member.name}</h3>
        <div className="text-xs font-medium text-[#C49A20] text-center mb-3 uppercase tracking-wider">{member.role}</div>
        <p className="text-sm text-[#64748B] text-center">{member.bio}</p>
      </div>

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 p-6 flex flex-col justify-center transition-all duration-300 ${hovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ backgroundColor: member.color }}
      >
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 text-white font-bold text-sm">
          {member.avatar}
        </div>
        <h3 className="font-semibold text-white text-center mb-1 text-sm">{member.name}</h3>
        <div className="text-[10px] font-medium text-white/70 text-center mb-4 uppercase tracking-wider">{member.role}</div>

        <div className="space-y-2.5">
          <a href={`tel:${member.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 text-white hover:text-white/80 transition-colors">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Phone className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-medium">{member.phone}</span>
          </a>
          <a href={`mailto:${member.email}`} className="flex items-center gap-2.5 text-white hover:text-white/80 transition-colors">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Mail className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs font-medium break-all">{member.email}</span>
          </a>
          <div className="flex items-center gap-2.5 text-white/80">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <MapPin className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm">{member.zone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-start">
          <div>
            <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Despre FinExperts</div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0C1A2E] mb-2 leading-tight">
              Experți în credite.
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-[#C49A20] mb-6 leading-tight">
              Oamenii la primul loc.
            </h2>
            <p className="text-[#64748B] text-base leading-relaxed">
              FinExperts e fondat de profesioniști care au lucrat în băncile mari din România. Cunoaștem procedurile, decidenții și capcanele birocratice. De aceea îți obținem creditul fără stres și la cea mai bună dobândă reală.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0C1A2E] text-white rounded-xl p-6">
              <div className="text-4xl font-bold mb-1">4</div>
              <div className="text-sm text-gray-300">brokeri dedicați</div>
            </div>
            <div className="bg-[#0C1A2E] text-white rounded-xl p-6">
              <div className="text-4xl font-bold mb-1">11</div>
              <div className="text-sm text-gray-300">bănci partenere</div>
            </div>
            <div className="bg-[#0C1A2E] text-white rounded-xl p-6">
              <div className="text-4xl font-bold mb-1">1.000+</div>
              <div className="text-sm text-gray-300">clienți mulțumiți</div>
            </div>
            <div className="bg-[#0C1A2E] text-white rounded-xl p-6">
              <div className="text-4xl font-bold mb-1">&gt;90%</div>
              <div className="text-sm text-gray-300">rată aprobare</div>
            </div>
          </div>
        </div>

        {/* Ce ne diferențiază */}
        <div className="mb-16">
          <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Ce ne diferențiază</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0C1A2E] mb-8">
            De ce echipa FinExperts e altfel.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: Briefcase, title: "Venim din bancă", desc: "Echipa FinExperts a lucrat direct în Raiffeisen Bank, BRD, Banca Transilvania și alte instituții de top. Cunoaștem procedurile interne, nu doar broșurile." },
              { icon: Award, title: "Brokeraj autorizat", desc: "Suntem broker autorizat înregistrat, partener oficial KIWI Finance și membri ai Asociației Române a Brokerilor de Credite (ARBC)." },
              { icon: ShieldCheck, title: "Etica înainte de comision", desc: "Nu îți recomandăm o bancă pentru că ne plătește mai mult. Te ghidăm către oferta cu cea mai mică DAE și cele mai puține comisioane ascunse." },
              { icon: Users, title: "Consiliere umană", desc: "Salariat, PFA, antreprenor sau pensionar — alegem împreună soluția care îți respectă nevoile, ritmul și realitatea financiară." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white border border-[#E2E8F0] rounded-xl p-6">
                  <div className="w-10 h-10 rounded-lg bg-[#0C1A2E]/8 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-[#0C1A2E]" />
                  </div>
                  <h3 className="font-semibold text-[#0C1A2E] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Echipa noastră</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0C1A2E] mb-2">Brokeři dedicați pentru tine</h2>
          <p className="text-[#64748B] mb-8 text-sm">Treci cu mouse-ul peste un broker pentru a vedea datele de contact directe.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <div className="text-xs font-semibold text-[#C49A20] uppercase tracking-wider mb-3">Întrebări frecvente</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0C1A2E] mb-8">Tot ce vrei să știi despre credite</h2>
          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            <Accordion type="single" collapsible>
              {faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-[#E2E8F0] last:border-b-0 px-6">
                  <AccordionTrigger className="text-[#0C1A2E] font-medium py-5 hover:text-[#C49A20] hover:no-underline text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#64748B] pb-5 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
