import { Link } from "wouter";
import { Home, Activity, Plane, Heart, Shield, ArrowRight } from "lucide-react";

const insurances = [
  {
    id: "locuinta",
    title: "Asigurare locuință",
    description: "PAD obligatoriu + facultativă pentru distrugeri, furt, daune apă.",
    icon: Home,
    iconBg: "#0A1A2E",
    price: 220,
  },
  {
    id: "rca",
    title: "RCA — Răspundere civilă",
    description: "Comparator instant cu toate societățile autorizate ASF.",
    icon: Activity,
    iconBg: "#C6A667",
    price: 380,
  },
  {
    id: "casco",
    title: "CASCO auto",
    description: "Acoperire all-risk pentru autoturism, inclusiv furt și vandalism.",
    icon: Shield,
    iconBg: "#5A6478",
    price: 1100,
  },
  {
    id: "calatorie",
    title: "Asigurare călătorie",
    description: "Acoperire medicală internațională, bagaje și anulare zbor.",
    icon: Plane,
    iconBg: "#0A1A2E",
    price: 95,
  },
  {
    id: "viata",
    title: "Asigurare de viață",
    description: "Protecție familie + componentă investițională opțională.",
    icon: Heart,
    iconBg: "#C6A667",
    price: 480,
  },
  {
    id: "sanatate",
    title: "Asigurare sănătate privată",
    description: "Acces clinici partenere fără cozi sau bilet de trimitere.",
    icon: Shield,
    iconBg: "#C6A667",
    price: 320,
  },
];

export default function InsurancePage() {
  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#C6A667] uppercase tracking-wider mb-3">Asigurări</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A1A2E] leading-tight mb-3">
            Asigurări complete,<br />
            <span className="text-[#C6A667]">alături de creditul tău.</span>
          </h1>
          <p className="text-[#5A6478] text-base max-w-xl">
            FinExperts colaborează cu cele mai mari societăți de asigurări din România. Validare CNP și IBAN automată pentru pre-completarea polițelor RCA / PAD oficiale.
          </p>
        </div>

        {/* 3x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {insurances.map((ins) => {
            const Icon = ins.icon;
            return (
              <div
                key={ins.id}
                data-testid={`insurance-card-${ins.id}`}
                className="bg-white border border-[#E5E3D9] rounded-xl p-6 hover:shadow-sm transition-shadow flex flex-col"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: ins.iconBg }}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-[#0A1A2E] mb-2">{ins.title}</h3>
                <p className="text-sm text-[#5A6478] leading-relaxed flex-1">{ins.description}</p>
                <div className="mt-5 pt-4 border-t border-[#E5E3D9] flex items-end justify-between">
                  <div>
                    <div className="text-xs text-[#5A6478] uppercase tracking-wider font-semibold mb-0.5">De la</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-[#0A1A2E]">{ins.price.toLocaleString("ro-RO")}</span>
                      <span className="text-sm text-[#5A6478]">RON/an</span>
                    </div>
                  </div>
                  <Link href="/aplica">
                    <button className="flex items-center gap-1 text-xs font-medium text-[#0A1A2E] hover:text-[#C6A667] transition-colors">
                      Solicită ofertă
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
