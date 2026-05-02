import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import {
  FileText, Shield, Phone, LogOut, ChevronRight,
  ArrowRight, Home, Activity, Plane, Heart, CheckCircle,
  User, Bell, Calculator, BookOpen, Star, Clock, Check,
  Mail, AlertCircle, Download, TrendingDown, TrendingUp,
  Info, Zap, RefreshCw, CreditCard, PiggyBank
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
                done ? "bg-green-500 text-white" : active ? "bg-[#0B2E2E] text-white ring-2 ring-[#C49A20] ring-offset-1" : "bg-[#E2E8F0] text-[#64748B]"
              }`}>
                {done ? <Check className="h-3 w-3" /> : i + 1}
              </div>
              <span className={`text-[9px] mt-1 font-medium whitespace-nowrap ${done || active ? "text-[#0B2E2E]" : "text-[#64748B]"}`}>{step.label}</span>
            </div>
            {i < APPLICATION_STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-4 ${done ? "bg-green-500" : "bg-[#E2E8F0]"}`} />
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

type Tab = "overview" | "credit" | "asigurari" | "profil" | "documente" | "notificari";

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
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center py-16 px-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-10 text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-[#0B2E2E]/8 flex items-center justify-center mx-auto mb-4">
            <FileText className="h-7 w-7 text-[#0B2E2E]" />
          </div>
          <h2 className="text-xl font-bold text-[#0B2E2E] mb-2">Contul meu</h2>
          <p className="text-sm text-[#64748B] mb-5">Conectează-te pentru a vedea aplicările tale și a gestiona ofertele.</p>
          <Link href="/login">
            <button className="bg-[#0B2E2E] text-white font-semibold px-6 py-2.5 rounded-lg text-sm w-full">Conectare</button>
          </Link>
          <p className="text-xs text-[#64748B] mt-3">Nu ai cont? <Link href="/register" className="text-[#0B2E2E] font-semibold">Înregistrare</Link></p>
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
    { id: "notificari", label: "Notificări", icon: Bell },
    { id: "profil", label: "Profil", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-[#0B2E2E] py-7">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C49A20] flex items-center justify-center text-[#0B2E2E] font-bold text-base">{initials}</div>
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
        <div className="flex gap-1 bg-white border border-[#E2E8F0] rounded-xl p-1 mb-6 overflow-x-auto">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === t.id ? "bg-[#0B2E2E] text-white" : "text-[#64748B] hover:text-[#0B2E2E]"}`}>
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
                <button key={s.label} onClick={() => setActiveTab(s.tab)} className="bg-white border border-[#E2E8F0] rounded-xl p-5 text-center hover:border-[#0B2E2E] transition-colors">
                  <div className={`text-3xl font-bold mb-1 ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-[#64748B] font-medium uppercase tracking-wider">{s.label}</div>
                </button>
              ))}
            </div>

            {/* IRCC tracker */}
            <div className="bg-[#0B2E2E] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#C49A20] uppercase tracking-wider mb-1">IRCC T2 2026 — Oficial BNR</div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-3xl font-extrabold text-white">5.58%</span>
                  <span className="text-xs text-green-400 flex items-center gap-0.5 font-semibold">
                    <TrendingDown className="h-3 w-3" /> −0.10 pp față de T1 2026
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1.5 max-w-sm">
                  Rata ipotecară variabilă = IRCC + marjă bancă. Ex: 5.58% + 2% = <strong className="text-gray-300">7.58%</strong> dobândă totală. Estimat T3 2026: 5.56%.
                </p>
              </div>
              <Link href="/banci">
                <button className="bg-[#C49A20] hover:bg-[#B08A1A] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
                  Compară bănci →
                </button>
              </Link>
            </div>

            {/* Acțiuni rapide */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
              <h3 className="font-semibold text-[#0B2E2E] mb-4">Acțiuni rapide</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Aplică credit", desc: "Personal sau ipotecar", icon: FileText, href: "/aplica", bg: "bg-[#0B2E2E]/8", ic: "text-[#0B2E2E]" },
                  { label: "Calculează rata", desc: "Compară toate băncile", icon: Calculator, href: "/calculator", bg: "bg-blue-50", ic: "text-blue-600" },
                  { label: "Asigurări", desc: "Locuință, RCA, viață", icon: Shield, tab: "asigurari" as Tab, bg: "bg-[#C49A20]/15", ic: "text-[#C49A20]" },
                  { label: "Sună broker", desc: "0799 715 101", icon: Phone, href: "tel:0799715101", bg: "bg-green-50", ic: "text-green-600" },
                ].map(a => (
                  a.href ? (
                    <a key={a.label} href={a.href} className="flex items-center gap-3 p-4 border border-[#E2E8F0] rounded-xl hover:border-[#0B2E2E] transition-colors group">
                      <div className={`w-9 h-9 rounded-lg ${a.bg} flex items-center justify-center shrink-0`}><a.icon className={`h-4 w-4 ${a.ic}`} /></div>
                      <div><div className="text-sm font-semibold text-[#0B2E2E]">{a.label}</div><div className="text-xs text-[#64748B]">{a.desc}</div></div>
                    </a>
                  ) : (
                    <button key={a.label} onClick={() => a.tab && setActiveTab(a.tab)} className="flex items-center gap-3 p-4 border border-[#E2E8F0] rounded-xl hover:border-[#0B2E2E] transition-colors text-left">
                      <div className={`w-9 h-9 rounded-lg ${a.bg} flex items-center justify-center shrink-0`}><a.icon className={`h-4 w-4 ${a.ic}`} /></div>
                      <div><div className="text-sm font-semibold text-[#0B2E2E]">{a.label}</div><div className="text-xs text-[#64748B]">{a.desc}</div></div>
                    </button>
                  )
                ))}
              </div>
            </div>

            {/* Aplicări recente cu progress */}
            {myApplications.length > 0 && (
              <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
                  <h3 className="font-semibold text-[#0B2E2E]">Aplicările mele</h3>
                  <button onClick={() => setActiveTab("credit")} className="text-xs text-[#64748B] hover:text-[#0B2E2E]">Toate →</button>
                </div>
                {myApplications.slice(0, 2).map(app => (
                  <div key={app.id} className="px-5 py-4 border-b border-[#E2E8F0] last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-sm font-semibold text-[#0B2E2E]">{app.type === "personal" ? "Credit personal" : app.type === "ipotecar" ? "Credit ipotecar" : "Refinanțare"}</div>
                        <div className="text-xs text-[#64748B]">{app.amount.toLocaleString("ro-RO")} RON · {app.bank || "—"}</div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${STATUS_COLORS[app.status]}`}>{STATUS_LABELS[app.status]}</span>
                    </div>
                    <ApplicationStepper status={app.status} />
                  </div>
                ))}
              </div>
            )}

            {/* Broker CTA */}
            <div className="bg-[#0B2E2E] rounded-xl p-6 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#C49A20] uppercase tracking-wider mb-1">Consultanță gratuită</div>
                <div className="text-white font-bold text-lg mb-1">Vorbește cu brokerul tău</div>
                <div className="text-gray-400 text-sm">L-V 09:00 — 18:00 · Fără costuri ascunse</div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <a href="tel:0799715101">
                  <button className="bg-[#C49A20] hover:bg-[#b09255] text-[#0B2E2E] font-semibold text-sm py-2.5 px-5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap">
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
              <h2 className="text-xl font-bold text-[#0B2E2E]">Aplicările mele</h2>
              <Link href="/aplica">
                <button className="flex items-center gap-1.5 bg-[#0B2E2E] text-white font-semibold px-4 py-2 rounded-lg text-sm">
                  <span className="text-base leading-none">+</span> Aplicare nouă
                </button>
              </Link>
            </div>
            {myApplications.length === 0 ? (
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center">
                <FileText className="h-12 w-12 text-[#E2E8F0] mx-auto mb-3" />
                <h3 className="font-semibold text-[#0B2E2E] mb-2">Nicio aplicare încă</h3>
                <p className="text-sm text-[#64748B] mb-5">Aplică pentru primul tău credit prin FinExperts.</p>
                <Link href="/aplica">
                  <button className="bg-[#0B2E2E] text-white font-semibold px-5 py-2.5 rounded-lg text-sm inline-flex items-center gap-2">
                    Aplică acum <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {myApplications.map(app => (
                  <div key={app.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-semibold text-[#0B2E2E] mb-0.5">
                          {app.type === "personal" ? "Credit personal" : app.type === "ipotecar" ? "Credit ipotecar" : "Refinanțare"}
                        </div>
                        <div className="text-xs text-[#64748B]">{app.id} · {app.date}</div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${STATUS_COLORS[app.status]}`}>
                        {STATUS_LABELS[app.status]}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div><div className="text-xs text-[#64748B] mb-0.5">Sumă</div><div className="text-sm font-semibold text-[#0B2E2E]">{app.amount.toLocaleString("ro-RO")} RON</div></div>
                      <div><div className="text-xs text-[#64748B] mb-0.5">Bancă</div><div className="text-sm text-[#0B2E2E]">{app.bank || "—"}</div></div>
                      {app.message && <div><div className="text-xs text-[#64748B] mb-0.5">Notă</div><div className="text-sm text-[#64748B] truncate">{app.message}</div></div>}
                    </div>
                    <div className="border-t border-[#E2E8F0] pt-4">
                      <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">Progress aplicare</div>
                      <ApplicationStepper status={app.status} />
                    </div>
                  </div>
                ))}
                <Link href="/aplica">
                  <button className="w-full border-2 border-dashed border-[#E2E8F0] rounded-xl py-4 text-sm text-[#64748B] hover:border-[#0B2E2E] hover:text-[#0B2E2E] transition-colors flex items-center justify-center gap-2">
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
              <h2 className="text-xl font-bold text-[#0B2E2E]">Asigurările mele</h2>
              <p className="text-sm text-[#64748B]">Solicită o ofertă personalizată pentru orice produs</p>
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
                  <div key={ins.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#0B2E2E]/8 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-[#0B2E2E]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[#0B2E2E] mb-0.5">{ins.title}</div>
                        <div className="text-xs text-[#64748B]">{ins.desc}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-[#64748B]">De la</div>
                        <div className="font-bold text-[#0B2E2E]">{ins.price} RON/an</div>
                      </div>
                    </div>
                    {applyingIns === ins.id ? (
                      <div className="bg-[#F5F7FA] rounded-xl p-4 space-y-3">
                        <div className="text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider">Solicită ofertă</div>
                        <input type="text" placeholder="Numele tău" value={insForm.name} onChange={e => setInsForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0B2E2E]" />
                        <input type="tel" placeholder="Telefon" value={insForm.phone} onChange={e => setInsForm(f => ({ ...f, phone: e.target.value }))}
                          className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0B2E2E]" />
                        <div className="flex gap-2">
                          <button onClick={() => submitInsurance(ins.title)} className="flex-1 bg-[#0B2E2E] text-white font-semibold py-2 rounded-lg text-sm">Trimite</button>
                          <button onClick={() => setApplyingIns(null)} className="border border-[#E2E8F0] text-[#64748B] py-2 px-3 rounded-lg text-sm">Anulează</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => handleInsuranceApply(ins.id)} className="w-full border border-[#E2E8F0] hover:border-[#0B2E2E] text-[#0B2E2E] font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-1.5 transition-colors">
                        Solicită ofertă <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-5 bg-[#0B2E2E] rounded-xl p-5 flex items-center justify-between gap-4">
              <div>
                <div className="text-white font-semibold mb-0.5">Preferi să vorbești cu un broker?</div>
                <div className="text-gray-400 text-sm">Îți explicăm toate opțiunile și costurile reale</div>
              </div>
              <a href="tel:0799715101" className="shrink-0">
                <button className="bg-[#C49A20] hover:bg-[#b09255] text-[#0B2E2E] font-semibold text-sm py-2.5 px-5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap">
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
              <h2 className="text-xl font-bold text-[#0B2E2E]">Documente necesare</h2>
              <p className="text-sm text-[#64748B]">Lista completă de documente pentru dosarul de credit</p>
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden mb-4">
              <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
                <h3 className="font-semibold text-[#0B2E2E]">Checklist dosar credit</h3>
                <span className="text-sm font-bold text-[#0B2E2E]">{checkedDocs.size}/{documentChecklist.length} pregătite</span>
              </div>
              <div className="p-2">
                {/* Progress bar */}
                <div className="px-3 pt-2 pb-3">
                  <div className="h-2 bg-[#F5F7FA] rounded-full overflow-hidden">
                    <div className="h-full bg-[#C49A20] rounded-full transition-all" style={{ width: `${(checkedDocs.size / documentChecklist.length) * 100}%` }} />
                  </div>
                </div>
                {documentChecklist.map((doc, i) => (
                  <button key={i} onClick={() => toggleDoc(i)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#F5F7FA] transition-colors text-left ${checkedDocs.has(i) ? "opacity-70" : ""}`}>
                    <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-all ${checkedDocs.has(i) ? "bg-green-500 border-green-500" : "border-[#E2E8F0]"}`}>
                      {checkedDocs.has(i) && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${checkedDocs.has(i) ? "line-through text-[#64748B]" : "text-[#0B2E2E]"}`}>{doc.label}</div>
                      <div className="text-xs text-[#64748B]">{doc.hint}</div>
                    </div>
                  </button>
                ))}
              </div>
              {checkedDocs.size === documentChecklist.length && (
                <div className="px-5 py-4 border-t border-[#E2E8F0] bg-green-50">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-semibold">Dosarul este complet! Poți aplica acum.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-[#0B2E2E] rounded-xl p-5 flex items-center justify-between gap-4">
              <div>
                <div className="text-white font-semibold mb-0.5">Trimite dosarul prin email</div>
                <div className="text-gray-400 text-sm">Un broker verifică documentele și îți confirmă în 24h</div>
              </div>
              <a href="mailto:kbaa@kiwifinance.ro?subject=Dosar%20credit%20-%20FinExperts">
                <button className="bg-[#C49A20] hover:bg-[#b09255] text-[#0B2E2E] font-semibold text-sm py-2.5 px-5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap">
                  <Mail className="h-4 w-4" /> Trimite dosar
                </button>
              </a>
            </div>
          </div>
        )}

        {/* ── NOTIFICĂRI ── */}
        {activeTab === "notificari" && (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#0B2E2E]">Notificări</h2>
              <p className="text-sm text-[#64748B]">Actualizări despre dosarele tale și piața creditelor</p>
            </div>
            <div className="space-y-3">
              {[
                { icon: TrendingDown, color: "bg-green-100 text-green-700", badge: "IRCC", title: "IRCC T2 2026 actualizat la 5.58%", desc: "Noul IRCC pentru trimestrul 2 2026 este 5.58%, cu 0.10 pp mai mic față de T1. Rata ipotecară variabilă scade automat la reînnoire.", date: "1 apr. 2026", unread: true },
                { icon: Bell, color: "bg-blue-100 text-blue-700", badge: "OFERTĂ", title: "Garanti BBVA — promoție ipotecar", desc: "Garanti BBVA a lansat o promoție pentru credit ipotecar cu marjă de 1.75% (față de 1.85% anterior). Valabilă până pe 30 iunie 2026.", date: "15 apr. 2026", unread: true },
                { icon: Info, color: "bg-amber-100 text-amber-700", badge: "DOSAR", title: "Acte necesare actualizate", desc: "Brokerul tău a actualizat lista de documente necesare pentru dosarul de credit ipotecar. Verifică secțiunea Documente.", date: "28 apr. 2026", unread: false },
                { icon: Zap, color: "bg-[#0B2E2E]/10 text-[#0B2E2E]", badge: "SISTEM", title: "Calculator actualizat cu dobânzile mai 2026", desc: "Calculatorul de rate a fost actualizat cu cele mai noi dobânzi de la toate cele 11 bănci partenere, inclusiv modificările BRD și Raiffeisen.", date: "2 mai 2026", unread: false },
                { icon: TrendingUp, color: "bg-purple-100 text-purple-700", badge: "BNR", title: "Rata cheie BNR menținută la 6.50%", desc: "BNR a decis menținerea ratei dobânzii de politică monetară la 6.50% pe an în ședința din mai 2026. Efect neutru pe dobânzile fixe.", date: "7 mai 2026", unread: false },
              ].map((n, i) => (
                <div key={i} className={`bg-white border rounded-xl p-4 flex items-start gap-4 ${n.unread ? "border-[#C49A20]/30 bg-[#C49A20]/3" : "border-[#E2E8F0]"}`}>
                  <div className={`w-9 h-9 rounded-lg ${n.color} flex items-center justify-center shrink-0 mt-0.5`}>
                    <n.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#64748B] bg-[#F4F6FB] px-1.5 py-0.5 rounded mr-2">{n.badge}</span>
                        {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#C49A20] inline-block mb-0.5" />}
                      </div>
                      <span className="text-[10px] text-[#64748B] shrink-0 whitespace-nowrap">{n.date}</span>
                    </div>
                    <div className="font-semibold text-[#0B2E2E] text-sm mb-0.5">{n.title}</div>
                    <p className="text-xs text-[#64748B] leading-relaxed">{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-xs text-[#64748B] hover:text-[#0B2E2E] transition-colors flex items-center gap-1 mx-auto">
                <RefreshCw className="h-3 w-3" /> Verifică notificări noi
              </button>
            </div>
          </div>
        )}

        {/* ── PROFIL ── */}
        {activeTab === "profil" && (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#0B2E2E]">Profilul meu</h2>
              <p className="text-sm text-[#64748B]">Actualizează informațiile de contact</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-5">
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
                <h3 className="font-semibold text-[#0B2E2E] mb-5">Informații personale</h3>
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
                      <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">{f.label}</label>
                      <input type={f.type} value={profileForm[f.key]} placeholder={f.placeholder}
                        onChange={e => setProfileForm(p => ({ ...p, [f.key]: e.target.value }))}
                        className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E]" />
                    </div>
                  ))}
                  <button onClick={() => { setProfileSaved(true); setTimeout(() => setProfileSaved(false), 3000); }}
                    className="bg-[#0B2E2E] text-white font-semibold px-5 py-2.5 rounded-lg text-sm flex items-center gap-2">
                    <Check className="h-4 w-4" /> Salvează modificările
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
                  <div className="w-16 h-16 rounded-full bg-[#C49A20] flex items-center justify-center text-[#0B2E2E] font-bold text-xl mx-auto mb-3">{initials}</div>
                  <div className="text-center">
                    <div className="font-semibold text-[#0B2E2E]">{user?.name}</div>
                    <div className="text-xs text-[#64748B] mt-0.5">{user?.email}</div>
                    <div className="mt-3 flex items-center justify-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-xs text-green-600 font-medium">Client activ</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F5F7FA] border border-[#E2E8F0] rounded-xl p-4">
                  <div className="text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-3">Brokerul tău</div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#0B2E2E] flex items-center justify-center text-white font-bold text-sm">AA</div>
                    <div>
                      <div className="text-sm font-semibold text-[#0B2E2E]">Alexandra Achim</div>
                      <div className="text-xs text-[#64748B]">Broker senior</div>
                    </div>
                  </div>
                  <a href="tel:0799715101" className="flex items-center gap-2 text-xs text-[#0B2E2E] hover:text-[#C49A20] transition-colors mb-1">
                    <Phone className="h-3.5 w-3.5" /> 0799 715 101
                  </a>
                  <a href="mailto:alexandra.achim@kiwifinance.ro" className="flex items-center gap-2 text-xs text-[#0B2E2E] hover:text-[#C49A20] transition-colors">
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
