import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Briefcase, ShieldCheck, Award, Users, Phone, Mail, MapPin } from "lucide-react";

const team = [
  {
    id: "alexandra",
    name: "Alexandra Achim",
    role: "Manager Franciză",
    bio: "Coordonează rețeaua FinExperts și relațiile cu băncile partenere. 10+ ani experiență bancară.",
    avatar: "AA",
    color: "#C6A667",
    email: "alexandra.achim@kiwifinance.ro",
    phone: "0799 715 101",
    zone: "Cluj-Napoca",
  },
  {
    id: "cristina",
    name: "Cristina Coman",
    role: "Broker de Credite",
    bio: "Specializată în credite ipotecare și refinanțări. Experiență anterioară în BCR și Raiffeisen.",
    avatar: "CC",
    color: "#0A1A2E",
    email: "cristina.coman@kiwifinance.ro",
    phone: "0725 596 672",
    zone: "Cluj-Napoca",
  },
  {
    id: "erji",
    name: "Ana-Maria Erji",
    role: "Broker de Credite",
    bio: "Expertă în credite de nevoi personale și soluții pentru PFA. Background în ING și BRD.",
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
    bio: "Focus pe credite cu garanții imobiliare și soluții complexe pentru antreprenori.",
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
    a: "Da. Datele tale sunt transmise criptat, doar către banca aleasă de tine. Nu vindem datele și nu le folosim în scopuri de marketing terț."
  },
  {
    q: "Cât durează aprobarea unui credit?",
    a: "Creditele de nevoi personale sunt aprobate de majoritatea băncilor în 24-48h. Creditele ipotecare necesită 3-10 zile lucrătoare, în funcție de complexitatea dosarului."
  },
  {
    q: "Ce este DAE și de ce este important?",
    a: "DAE (Dobânda Anuală Efectivă) include dobânda nominală + toate comisioanele obligatorii. Este singurul indicator corect pentru a compara două oferte de credit."
  },
  {
    q: "Pot aplica dacă sunt PFA sau am venituri variabile?",
    a: "Da. Salariat, PFA, antreprenor sau pensionar — alegem împreună soluția care îți respectă nevoile, ritmul și realitatea financiară."
  },
];

function TeamCard({ member }: { member: typeof team[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-testid={`team-card-${member.id}`}
      className="relative bg-white border border-[#E5E3D9] rounded-xl overflow-hidden cursor-default"
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
        <h3 className="font-semibold text-[#0A1A2E] text-center mb-0.5">{member.name}</h3>
        <div className="text-xs font-medium text-[#C6A667] text-center mb-3 uppercase tracking-wider">{member.role}</div>
        <p className="text-sm text-[#5A6478] text-center">{member.bio}</p>
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
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-start">
          <div>
            <div className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider mb-3">Despre FinExperts</div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0A1A2E] mb-2 leading-tight">
              Experți în credite.
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-[#C6A667] mb-6 leading-tight">
              Oamenii la primul loc.
            </h2>
            <p className="text-[#5A6478] text-base leading-relaxed">
              FinExperts e fondat de profesioniști care au lucrat ani de zile în băncile mari din România. Cunoaștem procedurile, decidenții și capcanele birocratice. De aceea îți obținem creditul fără stres și la cea mai bună dobândă reală.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0A1A2E] text-white rounded-xl p-6">
              <div className="text-4xl font-bold mb-1">12+</div>
              <div className="text-sm text-gray-300">ani experiență cumulată</div>
            </div>
            <div className="bg-[#0A1A2E] text-white rounded-xl p-6">
              <div className="text-4xl font-bold mb-1">11</div>
              <div className="text-sm text-gray-300">bănci partenere</div>
            </div>
            <div className="bg-[#0A1A2E] text-white rounded-xl p-6">
              <div className="text-4xl font-bold mb-1">1.000+</div>
              <div className="text-sm text-gray-300">clienți mulțumiți</div>
            </div>
            <div className="bg-[#0A1A2E] text-white rounded-xl p-6">
              <div className="text-4xl font-bold mb-1">&gt;90%</div>
              <div className="text-sm text-gray-300">rată aprobare</div>
            </div>
          </div>
        </div>

        {/* Ce ne diferențiază */}
        <div className="mb-16">
          <div className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider mb-3">Ce ne diferențiază</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A1A2E] mb-8">
            De ce echipa FinExperts e altfel.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: Briefcase, title: "Venim din bancă", desc: "Echipa FinExperts cumulează peste 30 de ani de experiență directă în BCR, BRD, ING, Raiffeisen. Cunoaștem procedurile interne, nu doar broșurile." },
              { icon: Award, title: "Brokeraj autorizat", desc: "Suntem broker autorizat înregistrat, partener oficial KIWI Finance și membri ai Asociației Române a Brokerilor de Credite (ARBC)." },
              { icon: ShieldCheck, title: "Etica înainte de comision", desc: "Nu îți recomandăm o bancă pentru că ne plătește mai mult. Te ghidăm către oferta cu cea mai mică DAE și cele mai puține comisioane ascunse." },
              { icon: Users, title: "Consiliere umană", desc: "Salariat, PFA, antreprenor sau pensionar — alegem împreună soluția care îți respectă nevoile, ritmul și realitatea financiară." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white border border-[#E5E3D9] rounded-xl p-6">
                  <div className="w-10 h-10 rounded-lg bg-[#0A1A2E]/8 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-[#0A1A2E]" />
                  </div>
                  <h3 className="font-semibold text-[#0A1A2E] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#5A6478] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider mb-3">Echipa noastră</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A1A2E] mb-2">Brokeři dedicați pentru tine</h2>
          <p className="text-[#5A6478] mb-8 text-sm">Treci cu mouse-ul peste un broker pentru a vedea datele de contact directe.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A1A2E] mb-8">Întrebări frecvente</h2>
          <div className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
            <Accordion type="single" collapsible>
              {faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-[#E5E3D9] last:border-b-0 px-6">
                  <AccordionTrigger className="text-[#0A1A2E] font-medium py-5 hover:text-[#C6A667] hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#5A6478] pb-5 leading-relaxed">
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
