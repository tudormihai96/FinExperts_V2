import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Briefcase, ShieldCheck, Award, Users } from "lucide-react";

const team = [
  {
    id: "alexandra",
    name: "Alexandra Achim",
    role: "Manager Franciză",
    bio: "Coordonează rețeaua FinExperts și relațiile cu băncile partenere. 10+ ani experiență bancară.",
    avatar: "AA",
  },
  {
    id: "cristina",
    name: "Cristina Coman",
    role: "Broker de Credite",
    bio: "Specializată în credite ipotecare și refinanțări. Experiență anterioară în BCR și Raiffeisen.",
    avatar: "CC",
  },
  {
    id: "erji",
    name: "Erji Ana-Maria",
    role: "Broker de Credite",
    bio: "Expertă în credite de nevoi personale și soluții pentru PFA. Background în ING și BRD.",
    avatar: "EA",
  },
  {
    id: "tudor",
    name: "Tudor Mihai",
    role: "Broker de Credite",
    bio: "Focus pe credite cu garanții imobiliare și soluții complexe pentru antreprenori.",
    avatar: "TM",
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
              <div className="text-4xl font-bold mb-1">500+</div>
              <div className="text-sm text-gray-300">clienți serviți</div>
            </div>
            <div className="bg-[#0A1A2E] text-white rounded-xl p-6">
              <div className="text-4xl font-bold mb-1">98%</div>
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
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-[#0A1A2E]/8 flex items-center justify-center mb-4">
                <Briefcase className="h-5 w-5 text-[#0A1A2E]" />
              </div>
              <h3 className="font-semibold text-[#0A1A2E] mb-2">Venim din bancă</h3>
              <p className="text-sm text-[#5A6478] leading-relaxed">
                Echipa FinExperts cumulează peste 30 de ani de experiență directă în BCR, BRD, ING, Raiffeisen. Cunoaștem procedurile interne, nu doar broșurile.
              </p>
            </div>
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-[#0A1A2E]/8 flex items-center justify-center mb-4">
                <Award className="h-5 w-5 text-[#0A1A2E]" />
              </div>
              <h3 className="font-semibold text-[#0A1A2E] mb-2">Brokeraj autorizat</h3>
              <p className="text-sm text-[#5A6478] leading-relaxed">
                Suntem broker autorizat înregistrat, partener oficial KIWI Finance și membri ai Asociației Române a Brokerilor de Credite (ARBC).
              </p>
            </div>
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-[#0A1A2E]/8 flex items-center justify-center mb-4">
                <ShieldCheck className="h-5 w-5 text-[#0A1A2E]" />
              </div>
              <h3 className="font-semibold text-[#0A1A2E] mb-2">Etica înainte de comision</h3>
              <p className="text-sm text-[#5A6478] leading-relaxed">
                Nu îți recomandăm o bancă pentru că ne plătește mai mult. Te ghidăm către oferta cu cea mai mică DAE și cele mai puține comisioane ascunse.
              </p>
            </div>
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-[#0A1A2E]/8 flex items-center justify-center mb-4">
                <Users className="h-5 w-5 text-[#0A1A2E]" />
              </div>
              <h3 className="font-semibold text-[#0A1A2E] mb-2">Consiliere umană</h3>
              <p className="text-sm text-[#5A6478] leading-relaxed">
                Salariat, PFA, antreprenor sau pensionar — alegem împreună soluția care îți respectă nevoile, ritmul și realitatea financiară.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A1A2E] mb-8">Echipa noastră</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member) => (
              <div
                key={member.id}
                data-testid={`team-card-${member.id}`}
                className="bg-white border border-[#E5E3D9] rounded-xl p-6"
              >
                <div className="w-14 h-14 rounded-full bg-[#0A1A2E] flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  {member.avatar}
                </div>
                <h3 className="font-semibold text-[#0A1A2E] text-center mb-0.5">{member.name}</h3>
                <div className="text-xs font-medium text-[#C6A667] text-center mb-3 uppercase tracking-wider">{member.role}</div>
                <p className="text-sm text-[#5A6478] text-center">{member.bio}</p>
              </div>
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
