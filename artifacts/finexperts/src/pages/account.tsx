import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import {
  FileText, Shield, Phone, LogOut, ChevronRight,
  ArrowRight, Home, Activity, Plane, Heart, CheckCircle
} from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-amber-100 text-amber-700",
  in_review: "bg-blue-100 text-blue-700",
  approved:  "bg-green-100 text-green-700",
  rejected:  "bg-red-100 text-red-700",
};
const STATUS_LABELS: Record<string, string> = {
  pending:   "În așteptare",
  in_review: "În analiză",
  approved:  "Aprobat",
  rejected:  "Respins",
};

const insuranceProducts = [
  { id: "locuinta", title: "Asigurare locuință", desc: "PAD obligatoriu + facultativă", icon: Home, price: 220 },
  { id: "rca", title: "RCA", desc: "Răspundere civilă auto", icon: Activity, price: 380 },
  { id: "calatorie", title: "Asigurare călătorie", desc: "Acoperire medicală internațională", icon: Plane, price: 95 },
  { id: "viata", title: "Asigurare de viață", desc: "Protecție familie + investiții", icon: Heart, price: 480 },
];

type Tab = "overview" | "credit" | "asigurari";

export default function AccountPage() {
  const { user, isLoggedIn, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { applications, addInsuranceRequest } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [applyingIns, setApplyingIns] = useState<string | null>(null);
  const [insForm, setInsForm] = useState({ name: "", phone: "", email: "" });
  const [insSuccess, setInsSuccess] = useState<string | null>(null);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F7F4EC] flex items-center justify-center py-16 px-4">
        <div className="bg-white border border-[#E5E3D9] rounded-xl p-10 text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-[#0A1A2E]/8 flex items-center justify-center mx-auto mb-4">
            <FileText className="h-7 w-7 text-[#0A1A2E]" />
          </div>
          <h2 className="text-xl font-bold text-[#0A1A2E] mb-2">Contul meu</h2>
          <p className="text-sm text-[#5A6478] mb-5">Conectează-te pentru a vedea aplicările tale și a gestiona ofertele.</p>
          <Link href="/login">
            <button className="bg-[#0A1A2E] text-white font-semibold px-6 py-2.5 rounded-lg text-sm w-full">Conectare</button>
          </Link>
          <p className="text-xs text-[#5A6478] mt-3">Nu ai cont? <Link href="/register" className="text-[#0A1A2E] font-semibold">Înregistrare</Link></p>
        </div>
      </div>
    );
  }

  const handleLogout = () => { logout(); setLocation("/"); };

  const myApplications = applications.filter(a => a.email === user?.email);

  const handleInsuranceApply = (insId: string) => {
    setApplyingIns(insId);
    setInsForm({ name: user?.name || "", phone: "", email: user?.email || "" });
  };

  const submitInsurance = (insType: string) => {
    addInsuranceRequest({ name: insForm.name, email: insForm.email, phone: insForm.phone, type: insType, status: "pending" });
    setInsSuccess(insType);
    setApplyingIns(null);
    setTimeout(() => setInsSuccess(null), 4000);
  };

  const initials = user?.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      {/* Top header */}
      <div className="bg-[#0A1A2E] py-8">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C6A667] flex items-center justify-center text-[#0A1A2E] font-bold text-base">
              {initials}
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">{user?.name}</div>
              <div className="text-gray-400 text-sm">{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
            <LogOut className="h-4 w-4" /> Deconectare
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-[#E5E3D9] rounded-xl p-1 mb-6">
          {([
            { id: "overview" as Tab, label: "Prezentare generală" },
            { id: "credit" as Tab, label: "Aplicări credit" },
            { id: "asigurari" as Tab, label: "Asigurări" },
          ] as { id: Tab; label: string }[]).map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === t.id ? "bg-[#0A1A2E] text-white" : "text-[#5A6478] hover:text-[#0A1A2E]"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Aplicări", value: myApplications.length, color: "text-blue-600" },
                { label: "Aprobate", value: myApplications.filter(a => a.status === "approved").length, color: "text-green-600" },
                { label: "Asigurări", value: 0, color: "text-purple-600" },
              ].map(s => (
                <div key={s.label} className="bg-white border border-[#E5E3D9] rounded-xl p-5 text-center">
                  <div className={`text-3xl font-bold mb-1 ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-[#5A6478] font-medium uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-5">
              <h3 className="font-semibold text-[#0A1A2E] mb-4">Acțiuni rapide</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link href="/aplica">
                  <div className="flex items-center gap-3 p-4 border border-[#E5E3D9] rounded-xl hover:border-[#0A1A2E] cursor-pointer transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-[#0A1A2E]/8 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-[#0A1A2E]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0A1A2E] group-hover:text-[#C6A667] transition-colors">Aplică credit</div>
                      <div className="text-xs text-[#5A6478]">Credit personal sau ipotecar</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#5A6478] ml-auto" />
                  </div>
                </Link>
                <button onClick={() => setActiveTab("asigurari")} className="flex items-center gap-3 p-4 border border-[#E5E3D9] rounded-xl hover:border-[#0A1A2E] transition-colors group text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#C6A667]/15 flex items-center justify-center shrink-0">
                    <Shield className="h-5 w-5 text-[#C6A667]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0A1A2E] group-hover:text-[#C6A667] transition-colors">Asigurări</div>
                    <div className="text-xs text-[#5A6478]">Locuință, RCA, viață</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#5A6478] ml-auto" />
                </button>
                <a href="tel:0799715101" className="flex items-center gap-3 p-4 border border-[#E5E3D9] rounded-xl hover:border-[#0A1A2E] transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0A1A2E] group-hover:text-[#C6A667] transition-colors">Sună un broker</div>
                    <div className="text-xs text-[#5A6478]">0799 715 101</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#5A6478] ml-auto" />
                </a>
              </div>
            </div>

            {/* Broker CTA */}
            <div className="bg-[#0A1A2E] rounded-xl p-6 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#C6A667] uppercase tracking-wider mb-1">Consultanță gratuită</div>
                <div className="text-white font-bold text-lg mb-1">Vorbește cu un broker</div>
                <div className="text-gray-400 text-sm">L-V 09:00 — 18:00 · Fără costuri ascunse</div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <a href="tel:0799715101">
                  <button className="bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-semibold text-sm py-2.5 px-5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap">
                    <Phone className="h-4 w-4" /> 0799 715 101
                  </button>
                </a>
                <a href="mailto:kbaa@kiwifinance.ro">
                  <button className="border border-white/20 text-white hover:bg-white/10 text-sm py-2 px-5 rounded-xl transition-colors w-full">
                    Trimite email
                  </button>
                </a>
              </div>
            </div>

            {/* Recent applications */}
            {myApplications.length > 0 && (
              <div className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[#E5E3D9] flex items-center justify-between">
                  <h3 className="font-semibold text-[#0A1A2E]">Aplicările mele</h3>
                  <button onClick={() => setActiveTab("credit")} className="text-xs text-[#5A6478] hover:text-[#0A1A2E]">Toate →</button>
                </div>
                {myApplications.slice(0, 3).map(app => (
                  <div key={app.id} className="flex items-center gap-3 px-5 py-4 border-b border-[#E5E3D9] last:border-b-0">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#0A1A2E]">{app.type === "personal" ? "Credit personal" : app.type === "ipotecar" ? "Credit ipotecar" : "Refinanțare"}</div>
                      <div className="text-xs text-[#5A6478]">{app.amount.toLocaleString("ro-RO")} RON · {app.bank} · {app.date}</div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${STATUS_COLORS[app.status]}`}>
                      {STATUS_LABELS[app.status]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CREDIT APPLICATIONS */}
        {activeTab === "credit" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[#0A1A2E]">Aplicările mele</h2>
              <Link href="/aplica">
                <button className="flex items-center gap-1.5 bg-[#0A1A2E] text-white font-semibold px-4 py-2 rounded-lg text-sm">
                  <Plus /> Aplicare nouă
                </button>
              </Link>
            </div>
            {myApplications.length === 0 ? (
              <div className="bg-white border border-[#E5E3D9] rounded-xl p-12 text-center">
                <FileText className="h-12 w-12 text-[#E5E3D9] mx-auto mb-3" />
                <h3 className="font-semibold text-[#0A1A2E] mb-2">Nicio aplicare încă</h3>
                <p className="text-sm text-[#5A6478] mb-5">Aplică pentru primul tău credit prin FinExperts.</p>
                <Link href="/aplica">
                  <button className="bg-[#0A1A2E] text-white font-semibold px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 mx-auto">
                    Aplică acum <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {myApplications.map(app => (
                  <div key={app.id} className="bg-white border border-[#E5E3D9] rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-[#0A1A2E] mb-0.5">
                          {app.type === "personal" ? "Credit personal" : app.type === "ipotecar" ? "Credit ipotecar" : "Refinanțare"}
                        </div>
                        <div className="text-xs text-[#5A6478]">{app.id} · {app.date}</div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${STATUS_COLORS[app.status]}`}>
                        {STATUS_LABELS[app.status]}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <div className="text-xs text-[#5A6478] mb-0.5">Sumă</div>
                        <div className="text-sm font-semibold text-[#0A1A2E]">{app.amount.toLocaleString("ro-RO")} RON</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#5A6478] mb-0.5">Bancă</div>
                        <div className="text-sm text-[#0A1A2E]">{app.bank || "—"}</div>
                      </div>
                      {app.message && (
                        <div>
                          <div className="text-xs text-[#5A6478] mb-0.5">Note</div>
                          <div className="text-sm text-[#5A6478] truncate">{app.message}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <Link href="/aplica">
                  <button className="w-full border-2 border-dashed border-[#E5E3D9] rounded-xl py-4 text-sm text-[#5A6478] hover:border-[#0A1A2E] hover:text-[#0A1A2E] transition-colors flex items-center justify-center gap-2">
                    <Plus className="h-4 w-4" /> Aplicare nouă
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* INSURANCE */}
        {activeTab === "asigurari" && (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#0A1A2E]">Asigurările mele</h2>
              <p className="text-sm text-[#5A6478]">Solicită o ofertă pentru orice tip de asigurare</p>
            </div>

            {insSuccess && (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-5">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-green-800">Cerere trimisă!</div>
                  <div className="text-xs text-green-600">Un consultant te va contacta în 24h pentru {insSuccess}.</div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {insuranceProducts.map(ins => {
                const Icon = ins.icon;
                return (
                  <div key={ins.id} className="bg-white border border-[#E5E3D9] rounded-xl p-5">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#0A1A2E]/8 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-[#0A1A2E]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[#0A1A2E] mb-0.5">{ins.title}</div>
                        <div className="text-xs text-[#5A6478]">{ins.desc}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-[#5A6478]">De la</div>
                        <div className="font-bold text-[#0A1A2E]">{ins.price} RON/an</div>
                      </div>
                    </div>

                    {applyingIns === ins.id ? (
                      <div className="bg-[#F7F4EC] rounded-xl p-4 space-y-3">
                        <div className="text-xs font-semibold text-[#0A1A2E] uppercase tracking-wider">Solicită ofertă</div>
                        <input type="text" placeholder="Numele tău" value={insForm.name} onChange={e => setInsForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full border border-[#E5E3D9] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0A1A2E]" />
                        <input type="tel" placeholder="Telefon" value={insForm.phone} onChange={e => setInsForm(f => ({ ...f, phone: e.target.value }))}
                          className="w-full border border-[#E5E3D9] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0A1A2E]" />
                        <div className="flex gap-2">
                          <button onClick={() => submitInsurance(ins.title)} className="flex-1 bg-[#0A1A2E] text-white font-semibold py-2 rounded-lg text-sm">Trimite</button>
                          <button onClick={() => setApplyingIns(null)} className="border border-[#E5E3D9] text-[#5A6478] py-2 px-3 rounded-lg text-sm">Anulează</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => handleInsuranceApply(ins.id)} className="w-full border border-[#E5E3D9] hover:border-[#0A1A2E] text-[#0A1A2E] font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-1.5 transition-colors">
                        Solicită ofertă <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Broker call CTA */}
            <div className="mt-5 bg-[#0A1A2E] rounded-xl p-5 flex items-center justify-between gap-4">
              <div>
                <div className="text-white font-semibold mb-0.5">Preferi să vorbești cu un broker?</div>
                <div className="text-gray-400 text-sm">Îți explicăm toate opțiunile și costurile reale</div>
              </div>
              <a href="tel:0799715101" className="shrink-0">
                <button className="bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-semibold text-sm py-2.5 px-5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap">
                  <Phone className="h-4 w-4" /> Sună acum
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
