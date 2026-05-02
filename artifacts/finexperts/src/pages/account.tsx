import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import {
  FileText, Shield, Phone, LogOut, ChevronRight,
  ArrowRight, Home, Activity, Plane, Heart, CheckCircle,
  User, Bell, Calculator, BookOpen, Star, Clock, Check,
  Mail, AlertCircle, Download, TrendingDown
} from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-amber-100 text-amber-700",
  in_review: "bg-blue-100 text-blue-700",
  approved:  "bg-green-100 text-green-700",
  rejected:  "bg-red-100 text-red-700",
  contacted: "bg-purple-100 text-purple-700",
  closed:    "bg-gray-100 text-gray-600",
};
const STATUS_LABELS: Record<string, string> = {
  pending:   "În așteptare",
  in_review: "În analiză",
  approved:  "Aprobat",
  rejected:  "Respins",
  contacted: "Contactat",
  closed:    "Închis",
};

const APPLICATION_STEPS = [
  { key: "pending",   label: "Trimisă" },
  { key: "in_review", label: "La broker" },
  { key: "contacted", label: "La bancă" },
  { key: "approved",  label: "Aprobată" },
];

function ApplicationStepper({ status }: { status: string }) {
  const activeIdx = APPLICATION_STEPS.findIndex(s => s.key === status);
  const effectiveIdx = status === "rejected" ? -1 : activeIdx === -1 ? APPLICATION_STEPS.length : activeIdx;

  if (status === "rejected") {
    return (
      <div className="flex items-center gap-2 py-2">
        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center"><AlertCircle className="h-3 w-3 text-red-600" /></div>
        <span className="text-xs text-red-600 font-medium">Aplicare respinsă — contactați brokerul pentru detalii</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0 mt-3">
      {APPLICATION_STEPS.map((step, i) => {
        const done = i < effectiveIdx || status === "approved";
        const active = i === effectiveIdx && status !== "approved";
        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                done ? "bg-green-500 text-white" : active ? "bg-[#0A1A2E] text-white ring-2 ring-[#C6A667] ring-offset-1" : "bg-[#E5E3D9] text-[#5A6478]"
              }`}>
                {done ? <Check className="h-3 w-3" /> : i + 1}
              </div>
              <span className={`text-[9px] mt-1 font-medium whitespace-nowrap ${done || active ? "text-[#0A1A2E]" : "text-[#5A6478]"}`}>{step.label}</span>
            </div>
            {i < APPLICATION_STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-4 ${done ? "bg-green-500" : "bg-[#E5E3D9]"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

const insuranceProducts = [
  { id: "locuinta", title: "Asigurare locuință", desc: "PAD obligatoriu + facultativă", icon: Home, price: 220 },
  { id: "rca", title: "RCA", desc: "Răspundere civilă auto", icon: Activity, price: 380 },
  { id: "calatorie", title: "Asigurare călătorie", desc: "Acoperire medicală internațională", icon: Plane, price: 95 },
  { id: "viata", title: "Asigurare de viață", desc: "Protecție familie + investiții", icon: Heart, price: 480 },
];

const documentChecklist = [
  { label: "Carte de identitate", hint: "Copie față-verso, valabilă" },
  { label: "Adeverință venit", hint: "Emisă cu max. 30 zile înainte" },
  { label: "Ultimele 3 fluturași de salariu", hint: "Sau extras cont dacă ești PFA" },
  { label: "Extras de cont 3-6 luni", hint: "Contul principal de venit" },
  { label: "Contract de muncă", hint: "Prima pagină + ultima pagină semnată" },
];

type Tab = "overview" | "credit" | "asigurari" | "profil" | "documente";

export default function AccountPage() {
  const { user, isLoggedIn, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { applications, addInsuranceRequest } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [applyingIns, setApplyingIns] = useState<string | null>(null);
  const [insForm, setInsForm] = useState({ name: "", phone: "", email: "" });
  const [insSuccess, setInsSuccess] = useState<string | null>(null);
  const [checkedDocs, setCheckedDocs] = useState<Set<number>>(new Set());
  const [profileForm, setProfileForm] = useState({ name: user?.name || "", phone: "", email: user?.email || "" });
  const [profileSaved, setProfileSaved] = useState(false);

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
  const initials = user?.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "U";

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

  const toggleDoc = (i: number) => {
    const next = new Set(checkedDocs);
    next.has(i) ? next.delete(i) : next.add(i);
    setCheckedDocs(next);
  };

  const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Prezentare", icon: Home },
    { id: "credit", label: "Credite", icon: FileText },
    { id: "asigurari", label: "Asigurări", icon: Shield },
    { id: "documente", label: "Documente", icon: BookOpen },
    { id: "profil", label: "Profil", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      {/* Header */}
      <div className="bg-[#0A1A2E] py-7">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C6A667] flex items-center justify-center text-[#0A1A2E] font-bold text-base">{initials}</div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">{user?.name}</div>
              <div className="text-gray-400 text-sm">{user?.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              Client activ
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
              <LogOut className="h-4 w-4" /> Ieșire
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-[#E5E3D9] rounded-xl p-1 mb-6 overflow-x-auto">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === t.id ? "bg-[#0A1A2E] text-white" : "text-[#5A6478] hover:text-[#0A1A2E]"}`}>
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Aplicări", value: myApplications.length, color: "text-blue-600", tab: "credit" as Tab },
                { label: "Aprobate", value: myApplications.filter(a => a.status === "approved").length, color: "text-green-600", tab: "credit" as Tab },
                { label: "În curs", value: myApplications.filter(a => ["pending", "in_review", "contacted"].includes(a.status)).length, color: "text-amber-600", tab: "credit" as Tab },
                { label: "Documente", value: `${checkedDocs.size}/${documentChecklist.length}`, color: "text-purple-600", tab: "documente" as Tab },
              ].map(s => (
                <button key={s.label} onClick={() => setActiveTab(s.tab)} className="bg-white border border-[#E5E3D9] rounded-xl p-5 text-center hover:border-[#0A1A2E] transition-colors">
                  <div className={`text-3xl font-bold mb-1 ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-[#5A6478] font-medium uppercase tracking-wider">{s.label}</div>
                </button>
              ))}
            </div>

            {/* Acțiuni rapide */}
            <div className="bg-white border border-[#E5E3D9] rounded-xl p-5">
              <h3 className="font-semibold text-[#0A1A2E] mb-4">Acțiuni rapide</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Aplică credit", desc: "Personal sau ipotecar", icon: FileText, href: "/aplica", bg: "bg-[#0A1A2E]/8", ic: "text-[#0A1A2E]" },
                  { label: "Calculează rata", desc: "Compară toate băncile", icon: Calculator, href: "/calculator", bg: "bg-blue-50", ic: "text-blue-600" },
                  { label: "Asigurări", desc: "Locuință, RCA, viață", icon: Shield, tab: "asigurari" as Tab, bg: "bg-[#C6A667]/15", ic: "text-[#C6A667]" },
                  { label: "Sună broker", desc: "0799 715 101", icon: Phone, href: "tel:0799715101", bg: "bg-green-50", ic: "text-green-600" },
                ].map(a => (
                  a.href ? (
                    <a key={a.label} href={a.href} className="flex items-center gap-3 p-4 border border-[#E5E3D9] rounded-xl hover:border-[#0A1A2E] transition-colors group">
                      <div className={`w-9 h-9 rounded-lg ${a.bg} flex items-center justify-center shrink-0`}><a.icon className={`h-4 w-4 ${a.ic}`} /></div>
                      <div><div className="text-sm font-semibold text-[#0A1A2E]">{a.label}</div><div className="text-xs text-[#5A6478]">{a.desc}</div></div>
                    </a>
                  ) : (
                    <button key={a.label} onClick={() => a.tab && setActiveTab(a.tab)} className="flex items-center gap-3 p-4 border border-[#E5E3D9] rounded-xl hover:border-[#0A1A2E] transition-colors text-left">
                      <div className={`w-9 h-9 rounded-lg ${a.bg} flex items-center justify-center shrink-0`}><a.icon className={`h-4 w-4 ${a.ic}`} /></div>
                      <div><div className="text-sm font-semibold text-[#0A1A2E]">{a.label}</div><div className="text-xs text-[#5A6478]">{a.desc}</div></div>
                    </button>
                  )
                ))}
              </div>
            </div>

            {/* Aplicări recente cu progress */}
            {myApplications.length > 0 && (
              <div className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[#E5E3D9] flex items-center justify-between">
                  <h3 className="font-semibold text-[#0A1A2E]">Aplicările mele</h3>
                  <button onClick={() => setActiveTab("credit")} className="text-xs text-[#5A6478] hover:text-[#0A1A2E]">Toate →</button>
                </div>
                {myApplications.slice(0, 2).map(app => (
                  <div key={app.id} className="px-5 py-4 border-b border-[#E5E3D9] last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-sm font-semibold text-[#0A1A2E]">{app.type === "personal" ? "Credit personal" : app.type === "ipotecar" ? "Credit ipotecar" : "Refinanțare"}</div>
                        <div className="text-xs text-[#5A6478]">{app.amount.toLocaleString("ro-RO")} RON · {app.bank || "—"}</div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${STATUS_COLORS[app.status]}`}>{STATUS_LABELS[app.status]}</span>
                    </div>
                    <ApplicationStepper status={app.status} />
                  </div>
                ))}
              </div>
            )}

            {/* Broker CTA */}
            <div className="bg-[#0A1A2E] rounded-xl p-6 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#C6A667] uppercase tracking-wider mb-1">Consultanță gratuită</div>
                <div className="text-white font-bold text-lg mb-1">Vorbește cu brokerul tău</div>
                <div className="text-gray-400 text-sm">L-V 09:00 — 18:00 · Fără costuri ascunse</div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <a href="tel:0799715101">
                  <button className="bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-semibold text-sm py-2.5 px-5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap">
                    <Phone className="h-4 w-4" /> 0799 715 101
                  </button>
                </a>
                <a href="mailto:kbaa@kiwifinance.ro">
                  <button className="border border-white/20 text-white hover:bg-white/10 text-sm py-2 px-5 rounded-xl transition-colors w-full flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" /> Email
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── CREDIT ── */}
        {activeTab === "credit" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[#0A1A2E]">Aplicările mele</h2>
              <Link href="/aplica">
                <button className="flex items-center gap-1.5 bg-[#0A1A2E] text-white font-semibold px-4 py-2 rounded-lg text-sm">
                  <span className="text-base leading-none">+</span> Aplicare nouă
                </button>
              </Link>
            </div>
            {myApplications.length === 0 ? (
              <div className="bg-white border border-[#E5E3D9] rounded-xl p-12 text-center">
                <FileText className="h-12 w-12 text-[#E5E3D9] mx-auto mb-3" />
                <h3 className="font-semibold text-[#0A1A2E] mb-2">Nicio aplicare încă</h3>
                <p className="text-sm text-[#5A6478] mb-5">Aplică pentru primul tău credit prin FinExperts.</p>
                <Link href="/aplica">
                  <button className="bg-[#0A1A2E] text-white font-semibold px-5 py-2.5 rounded-lg text-sm inline-flex items-center gap-2">
                    Aplică acum <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {myApplications.map(app => (
                  <div key={app.id} className="bg-white border border-[#E5E3D9] rounded-xl p-5">
                    <div className="flex items-start justify-between mb-4">
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
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div><div className="text-xs text-[#5A6478] mb-0.5">Sumă</div><div className="text-sm font-semibold text-[#0A1A2E]">{app.amount.toLocaleString("ro-RO")} RON</div></div>
                      <div><div className="text-xs text-[#5A6478] mb-0.5">Bancă</div><div className="text-sm text-[#0A1A2E]">{app.bank || "—"}</div></div>
                      {app.message && <div><div className="text-xs text-[#5A6478] mb-0.5">Notă</div><div className="text-sm text-[#5A6478] truncate">{app.message}</div></div>}
                    </div>
                    <div className="border-t border-[#E5E3D9] pt-4">
                      <div className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">Progress aplicare</div>
                      <ApplicationStepper status={app.status} />
                    </div>
                  </div>
                ))}
                <Link href="/aplica">
                  <button className="w-full border-2 border-dashed border-[#E5E3D9] rounded-xl py-4 text-sm text-[#5A6478] hover:border-[#0A1A2E] hover:text-[#0A1A2E] transition-colors flex items-center justify-center gap-2">
                    <span className="text-lg leading-none">+</span> Aplicare nouă
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ── ASIGURĂRI ── */}
        {activeTab === "asigurari" && (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#0A1A2E]">Asigurările mele</h2>
              <p className="text-sm text-[#5A6478]">Solicită o ofertă personalizată pentru orice produs</p>
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

        {/* ── DOCUMENTE ── */}
        {activeTab === "documente" && (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#0A1A2E]">Documente necesare</h2>
              <p className="text-sm text-[#5A6478]">Lista completă de documente pentru dosarul de credit</p>
            </div>
            <div className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden mb-4">
              <div className="px-5 py-4 border-b border-[#E5E3D9] flex items-center justify-between">
                <h3 className="font-semibold text-[#0A1A2E]">Checklist dosar credit</h3>
                <span className="text-sm font-bold text-[#0A1A2E]">{checkedDocs.size}/{documentChecklist.length} pregătite</span>
              </div>
              <div className="p-2">
                {/* Progress bar */}
                <div className="px-3 pt-2 pb-3">
                  <div className="h-2 bg-[#F7F4EC] rounded-full overflow-hidden">
                    <div className="h-full bg-[#C6A667] rounded-full transition-all" style={{ width: `${(checkedDocs.size / documentChecklist.length) * 100}%` }} />
                  </div>
                </div>
                {documentChecklist.map((doc, i) => (
                  <button key={i} onClick={() => toggleDoc(i)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#F7F4EC] transition-colors text-left ${checkedDocs.has(i) ? "opacity-70" : ""}`}>
                    <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-all ${checkedDocs.has(i) ? "bg-green-500 border-green-500" : "border-[#E5E3D9]"}`}>
                      {checkedDocs.has(i) && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${checkedDocs.has(i) ? "line-through text-[#5A6478]" : "text-[#0A1A2E]"}`}>{doc.label}</div>
                      <div className="text-xs text-[#5A6478]">{doc.hint}</div>
                    </div>
                  </button>
                ))}
              </div>
              {checkedDocs.size === documentChecklist.length && (
                <div className="px-5 py-4 border-t border-[#E5E3D9] bg-green-50">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-semibold">Dosarul este complet! Poți aplica acum.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-[#0A1A2E] rounded-xl p-5 flex items-center justify-between gap-4">
              <div>
                <div className="text-white font-semibold mb-0.5">Trimite dosarul prin email</div>
                <div className="text-gray-400 text-sm">Un broker verifică documentele și îți confirmă în 24h</div>
              </div>
              <a href="mailto:kbaa@kiwifinance.ro?subject=Dosar%20credit%20-%20FinExperts">
                <button className="bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-semibold text-sm py-2.5 px-5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap">
                  <Mail className="h-4 w-4" /> Trimite dosar
                </button>
              </a>
            </div>
          </div>
        )}

        {/* ── PROFIL ── */}
        {activeTab === "profil" && (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#0A1A2E]">Profilul meu</h2>
              <p className="text-sm text-[#5A6478]">Actualizează informațiile de contact</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-5">
              <div className="bg-white border border-[#E5E3D9] rounded-xl p-6">
                <h3 className="font-semibold text-[#0A1A2E] mb-5">Informații personale</h3>
                {profileSaved && (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 mb-4 text-sm text-green-700">
                    <CheckCircle className="h-4 w-4" /> Profil actualizat cu succes!
                  </div>
                )}
                <div className="space-y-4">
                  {[
                    { label: "Nume complet", key: "name" as const, type: "text", placeholder: "Ion Popescu" },
                    { label: "Email", key: "email" as const, type: "email", placeholder: "ion@email.ro" },
                    { label: "Telefon", key: "phone" as const, type: "tel", placeholder: "07xx xxx xxx" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold text-[#0A1A2E] uppercase tracking-wider mb-1.5">{f.label}</label>
                      <input type={f.type} value={profileForm[f.key]} placeholder={f.placeholder}
                        onChange={e => setProfileForm(p => ({ ...p, [f.key]: e.target.value }))}
                        className="w-full border border-[#E5E3D9] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0A1A2E]" />
                    </div>
                  ))}
                  <button onClick={() => { setProfileSaved(true); setTimeout(() => setProfileSaved(false), 3000); }}
                    className="bg-[#0A1A2E] text-white font-semibold px-5 py-2.5 rounded-lg text-sm flex items-center gap-2">
                    <Check className="h-4 w-4" /> Salvează modificările
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-[#E5E3D9] rounded-xl p-5">
                  <div className="w-16 h-16 rounded-full bg-[#C6A667] flex items-center justify-center text-[#0A1A2E] font-bold text-xl mx-auto mb-3">{initials}</div>
                  <div className="text-center">
                    <div className="font-semibold text-[#0A1A2E]">{user?.name}</div>
                    <div className="text-xs text-[#5A6478] mt-0.5">{user?.email}</div>
                    <div className="mt-3 flex items-center justify-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-xs text-green-600 font-medium">Client activ</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F7F4EC] border border-[#E5E3D9] rounded-xl p-4">
                  <div className="text-xs font-semibold text-[#0A1A2E] uppercase tracking-wider mb-3">Brokerul tău</div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#0A1A2E] flex items-center justify-center text-white font-bold text-sm">AA</div>
                    <div>
                      <div className="text-sm font-semibold text-[#0A1A2E]">Alexandra Achim</div>
                      <div className="text-xs text-[#5A6478]">Broker senior</div>
                    </div>
                  </div>
                  <a href="tel:0799715101" className="flex items-center gap-2 text-xs text-[#0A1A2E] hover:text-[#C6A667] transition-colors mb-1">
                    <Phone className="h-3.5 w-3.5" /> 0799 715 101
                  </a>
                  <a href="mailto:alexandra.achim@kiwifinance.ro" className="flex items-center gap-2 text-xs text-[#0A1A2E] hover:text-[#C6A667] transition-colors">
                    <Mail className="h-3.5 w-3.5" /> alexandra.achim@kiwifinance.ro
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
