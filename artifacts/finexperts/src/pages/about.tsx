import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";

const team = [
  {
    id: "andrei",
    name: "Andrei Popescu",
    role: "Director General",
    bio: "Coordonează rețeaua FinExperts și relațiile cu băncile partenere. 10+ ani în brokeraj credite.",
    avatar: "AP",
    experience: "Banca Transilvania, Volksbank"
  },
  {
    id: "ioana",
    name: "Ioana Mihai",
    role: "Consultant Senior Credite",
    bio: "Expertă în credite de nevoi personale și soluții pentru PFA. Background în ING și BRD.",
    avatar: "IM",
    experience: "ING Bank, BRD"
  },
  {
    id: "cristian",
    name: "Cristian Dumitrescu",
    role: "Specialist Credite Imobiliare",
    bio: "Focus pe credite cu garanții imobiliare și soluții complexe pentru antreprenori.",
    avatar: "CD",
    experience: "BCR, Raiffeisen Bank"
  }
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
    q: "Aplicarea prin FinExperts costă ceva?",
    a: "Aplicarea prin FinExperts este 100% gratuită. Nu percepem comision de la tine. Suntem remunerați de bancă dacă creditul se aprobă."
  },
  {
    q: "Ce este DAE și de ce este important?",
    a: "DAE (Dobânda Anuală Efectivă) include dobânda nominală + toate comisioanele obligatorii. Este singurul indicator corect pentru a compara două oferte de credit."
  },
  {
    q: "Pot aplica dacă sunt PFA sau am venituri variabile?",
    a: "Da. Lucrăm cu bănci care acceptă PFA, liber profesioniști, dividende și alte forme de venituri atipice. Consultanții noștri știu care bancă are cele mai flexibile criterii pentru profilul tău."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="bg-[#0A1A2E] py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Despre FinExperts</h1>
          <p className="text-xl text-gray-300">
            FinExperts e fondat de profesioniști care au lucrat ani de zile în băncile mari din România. Cunoaștem procedurile, decidenții și capcanele birocratice. De aceea îți obținem creditul fără stres și la cea mai bună dobândă reală.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { label: "30+", desc: "ani experiență cumulată" },
            { label: "11", desc: "bănci partenere" },
            { label: "100%", desc: "aplicări gratuite" }
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-[#E5E3D9] rounded-xl p-8 text-center">
              <div className="text-4xl font-bold text-[#C6A667] mb-2">{stat.label}</div>
              <div className="text-[#5A6478]">{stat.desc}</div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#0A1A2E] text-center mb-4">De ce echipa FinExperts e altfel</h2>
          <p className="text-center text-[#5A6478] mb-10">Echipa FinExperts cumulează peste 30 de ani de experiență directă în BCR, BRD, ING, Raiffeisen. Cunoaștem procedurile interne, nu doar broșurile.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Cunoaştem băncile din interior", desc: "Foști angajați ai băncilor mari — știm ce criterii folosesc, care sunt limitele flexibile și cum se negociază o ofertă bună." },
              { title: "Fără conflicte de interese", desc: "Suntem broker autorizat independent. Recomandăm banca care se potrivește profilului tău, nu cea care ne plătește cel mai mult." },
              { title: "Soluții reale, nu promisiuni", desc: "Nu promitem aprobarea. Analizăm dosarul onest și îți spunem de la început dacă șansele sunt mari sau mici." }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#E5E3D9] rounded-xl p-6">
                <CheckCircle className="h-8 w-8 text-[#2E7D5B] mb-4" />
                <h3 className="text-lg font-bold text-[#0A1A2E] mb-3">{item.title}</h3>
                <p className="text-sm text-[#5A6478]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#0A1A2E] text-center mb-10">Echipa noastră</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.id} data-testid={`team-card-${member.id}`} className="bg-white border border-[#E5E3D9] rounded-xl p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-[#0A1A2E] flex items-center justify-center mx-auto mb-5 text-white text-xl font-bold">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-[#0A1A2E] mb-1">{member.name}</h3>
                <div className="text-sm font-semibold text-[#C6A667] mb-3">{member.role}</div>
                <p className="text-sm text-[#5A6478] mb-4">{member.bio}</p>
                <div className="text-xs text-[#5A6478] bg-[#F7F4EC] rounded-full px-3 py-1 inline-block">
                  {member.experience}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-[#0A1A2E] text-center mb-10">Întrebări frecvente</h2>
          <div className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
            <Accordion type="single" collapsible>
              {faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-[#E5E3D9] last:border-b-0 px-6">
                  <AccordionTrigger className="text-[#0A1A2E] font-semibold py-5 hover:text-[#C6A667] hover:no-underline">
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
