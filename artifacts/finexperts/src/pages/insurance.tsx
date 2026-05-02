import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Home, Heart, Plane, ArrowRight } from "lucide-react";

const insurances = [
  {
    id: "viata",
    title: "Asigurare de viață",
    subtitle: "Protecție pentru creditul tău",
    icon: Shield,
    color: "#0A1A2E",
    description: "Asigurarea de viață legată de credit acoperă soldul rămas al creditului în caz de deces sau invaliditate permanentă. Cerută de bancă pentru credite ipotecare.",
    features: ["Acoperire deces și invaliditate", "Primă lunară calculată pe soldul rămas", "Comparator instant cu 5+ asigurători", "Validare CNP automată"],
    price: "De la 25 RON/lună"
  },
  {
    id: "locuinta",
    title: "Asigurare locuință",
    subtitle: "PAD + facultativă",
    icon: Home,
    color: "#2E7D5B",
    description: "PAD (Polița de Asigurare Obligatorie a Locuinței) este obligatorie prin lege pentru toate imobilele. Completează cu o asigurare facultativă pentru protecție completă.",
    features: ["PAD obligatorie — de la 20 EUR/an", "Asigurare facultativă la valoarea reală", "Acoperire cutremur, inundații, foc", "Pre-completare automată cu datele imobilului"],
    price: "PAD de la 20 EUR/an"
  },
  {
    id: "sanatate",
    title: "Asigurare sănătate privată",
    subtitle: "Acces clinici fără cozi",
    icon: Heart,
    color: "#C4432F",
    description: "Acces la clinici partenere fără bilet de trimitere sau cozi. Consultații, analize, imagistică și spitalizare — toate incluse în pachetul tău.",
    features: ["Acces clinici partenere fără cozi", "Consultații specialiști incluse", "Analize și imagistică", "Spitalizare și intervenții chirurgicale"],
    price: "De la 80 RON/lună"
  },
  {
    id: "calatorie",
    title: "Asigurare călătorie",
    subtitle: "Planuri de la 5 EUR/zi",
    icon: Plane,
    color: "#C6A667",
    description: "Asigurare de călătorie pentru vacanțe sau deplasări de afaceri. Acoperire medicală de urgență, bagaje pierdute și anulare zbor.",
    features: ["Asistență medicală urgentă", "Rambursare bagaje pierdute", "Anulare și întârziere zbor", "Comparator instantaneu 8 asigurători"],
    price: "De la 5 EUR/zi"
  }
];

export default function InsurancePage() {
  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="bg-[#0A1A2E] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Asigurări</h1>
          <p className="text-gray-300">FinExperts colaborează cu cele mai mari societăți de asigurări din România. Comparator instant cu toate societățile autorizate ASF.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {insurances.map((ins) => {
            const Icon = ins.icon;
            return (
              <div
                key={ins.id}
                data-testid={`insurance-card-${ins.id}`}
                className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-8">
                  <div className="flex items-start gap-5 mb-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: ins.color + "18" }}
                    >
                      <Icon className="h-7 w-7" style={{ color: ins.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0A1A2E]">{ins.title}</h3>
                      <p className="text-sm text-[#5A6478]">{ins.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-[#5A6478] mb-6 leading-relaxed">{ins.description}</p>

                  <div className="space-y-2 mb-6">
                    {ins.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#5A6478]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C6A667] shrink-0" />
                        {feat}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-[#E5E3D9]">
                    <div>
                      <div className="text-xs text-[#5A6478]">Pornind de la</div>
                      <div className="text-lg font-bold text-[#0A1A2E]">{ins.price}</div>
                    </div>
                    <Link href="/aplicare-credit">
                      <Button
                        data-testid={`btn-insurance-apply-${ins.id}`}
                        className="bg-[#0A1A2E] hover:bg-[#132846] text-white"
                      >
                        Solicită ofertă <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white border border-[#E5E3D9] rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[#0A1A2E] mb-4">De ce asigurările prin FinExperts?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="font-semibold text-[#0A1A2E] mb-2">Comparator instant</div>
              <p className="text-sm text-[#5A6478]">Comparator instantaneu cu toate societățile autorizate ASF. Oferta cea mai bună apare prima.</p>
            </div>
            <div>
              <div className="font-semibold text-[#0A1A2E] mb-2">Validare automată</div>
              <p className="text-sm text-[#5A6478]">Validare CNP și IBAN automată pentru pre-completarea polițelor RCA și PAD oficiale.</p>
            </div>
            <div>
              <div className="font-semibold text-[#0A1A2E] mb-2">Consultanță inclusă</div>
              <p className="text-sm text-[#5A6478]">Consilierii noștri te ajută să alegi asigurarea potrivită în funcție de creditul și profilul tău.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
