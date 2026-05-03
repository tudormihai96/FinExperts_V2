import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { BROKERS, getBroker, getStoredBrokerId, setStoredBrokerId, CC_EMAIL, buildBrokerMailto } from "@/lib/brokers";
import {
  FileText, Shield, Phone, LogOut, ChevronRight,
  ArrowRight, Home, Activity, Plane, Heart, CheckCircle,
  User, Bell, Calculator, BookOpen, Star, Clock, Check,
  Mail, AlertCircle, Download, TrendingDown, TrendingUp,
  Info, Zap, RefreshCw, CreditCard, PiggyBank, Lock, Eye, EyeOff,
  Building2, Briefcase, Globe, Landmark, BarChart3, ChevronDown, ChevronUp
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

type DocAlt = { label: string; hint?: string };
type DocGroup = { id: string; alternatives: DocAlt[]; required: boolean; note?: string };
type DocSection = { title: string; groups: DocGroup[] };
type IncomeCategory = { id: string; label: string; icon: React.ElementType; sections: DocSection[] };

const DOC_CI: DocGroup = {
  id: "ci", required: true,
  alternatives: [{ label: "Carte de identitate / Buletin de identitate", hint: "Copie față-verso, în termen de valabilitate" }],
};

const INCOME_DOCS: IncomeCategory[] = [
  {
    id: "salariat-ro", label: "Salariat România", icon: Building2,
    sections: [
      { title: "Identitate", groups: [DOC_CI] },
      {
        title: "Dovada venitului",
        groups: [
          {
            id: "venit-principal", required: true,
            note: "Oricare unul este suficient",
            alternatives: [
              { label: "Adeverință de salariu", hint: "Original, semnată de angajator, emisă max. 60 zile" },
              { label: "Acord interogare ANAF", hint: "Formular tipizat semnat — banca consultă venitul automat" },
              { label: "Viramente salariale (extras cont)", hint: "Dacă salariul vine în cont la aceeași bancă" },
            ],
          },
          {
            id: "venit-an-anterior", required: false,
            note: "Opțional — poate fi solicitat suplimentar de bancă",
            alternatives: [
              { label: "Fișă fiscală an anterior", hint: "Emisă de angajator — include venit brut și deduceri" },
              { label: "Declarație informativă venituri D112", hint: "Dacă nu există fișa fiscală" },
              { label: "Fluturași de salariu (ultimele 12 luni)", hint: "În original sau copie certificată" },
            ],
          },
        ],
      },
      {
        title: "Contract și angajare",
        groups: [
          {
            id: "contract-munca", required: false,
            alternatives: [{ label: "Contract individual de muncă", hint: "Prima + ultima pagină semnată de angajator" }],
          },
        ],
      },
    ],
  },
  {
    id: "salariat-strainatate", label: "Salariat Străinătate", icon: Globe,
    sections: [
      {
        title: "Identitate",
        groups: [
          {
            id: "ci-pasaport", required: true,
            note: "Cel puțin unul",
            alternatives: [
              { label: "Carte de identitate / CI-UE valabilă", hint: "Copie față-verso" },
              { label: "Pașaport emis de statul român", hint: "Valabil pe toată durata creditului" },
            ],
          },
          {
            id: "permis-rezidenta", required: true,
            alternatives: [{ label: "Permis de rezidență în țara angajatorului", hint: "Valabil — dovedește rezidența în statul respectiv" }],
          },
        ],
      },
      {
        title: "Dovada venitului",
        groups: [
          {
            id: "venit-strainatate", required: true,
            note: "Oricare unul",
            alternatives: [
              { label: "Extras de cont (12 luni)", hint: "Identificabil viramentul salarial de la angajator" },
              { label: "Fluturași de salariu (12 luni)", hint: "Traducere legalizată dacă nu sunt în română/engleză" },
              { label: "Adeverință de venit", hint: "Original — emisă de angajatorul din străinătate" },
            ],
          },
        ],
      },
      {
        title: "Contract angajare",
        groups: [
          {
            id: "contract-strainatate", required: true,
            alternatives: [{ label: "Contract de muncă (+ traducere dacă nu-i în ro/en)", hint: "Original sau copie certificată" }],
          },
        ],
      },
    ],
  },
  {
    id: "pensionar", label: "Pensionar", icon: Landmark,
    sections: [
      { title: "Identitate", groups: [DOC_CI] },
      {
        title: "Dovada pensiei",
        groups: [
          {
            id: "talon-pensie", required: true,
            note: "Oricare unul",
            alternatives: [
              { label: "Ultimul talon de pensie", hint: "Luna curentă sau precedentă — original sau electronic" },
              { label: "Extras de cont (virament pensie)", hint: "Dacă pensia se încasează în cont bancar" },
            ],
          },
          {
            id: "decizie-pensionare", required: true,
            alternatives: [{ label: "Decizia de pensionare", hint: "Copie — emisă de Casa Națională de Pensii" }],
          },
          {
            id: "decizie-medicala", required: false,
            note: "Obligatoriu DOAR pentru pensie de invaliditate",
            alternatives: [{ label: "Decizia comisiei medicale (pensie de invaliditate)", hint: "Dovedește caracterul permanent/nerevizuibil" }],
          },
        ],
      },
    ],
  },
  {
    id: "pfa", label: "PFA / Liber profesionist", icon: Briefcase,
    sections: [
      { title: "Identitate", groups: [DOC_CI] },
      {
        title: "Acte de constituire",
        groups: [
          {
            id: "certificat-onrc", required: true,
            note: "Oricare — în funcție de forma de organizare",
            alternatives: [
              { label: "Certificat de înregistrare ONRC", hint: "PFA, II sau IF — cu cod de înregistrare fiscal" },
              { label: "Autorizație exercitare profesie (avocați, notari, medici)", hint: "Emisă de baroul/colegiul de profil" },
              { label: "Decizie de autorizare PFA", hint: "Emisă de primăria de domiciliu" },
            ],
          },
        ],
      },
      {
        title: "Documente fiscale",
        groups: [
          {
            id: "declaratie-unica-pfa", required: true,
            note: "Oricare una",
            alternatives: [
              { label: "Declarație Unică (D212) + recipisă ANAF", hint: "An anterior + estimat an curent — original sau electronic" },
              { label: "Acord interogare ANAF", hint: "Formular tipizat — banca consultă veniturile automat" },
            ],
          },
          {
            id: "registru-incasari", required: true,
            alternatives: [{ label: "Registrul de Încasări și Plăți (ultimele 12 luni)", hint: "Evidențierea veniturilor și cheltuielilor — semnat" }],
          },
          {
            id: "extras-cont-pfa", required: false,
            note: "Poate fi solicitat suplimentar",
            alternatives: [
              { label: "Extras de cont bancar (12 luni)", hint: "Contul principal de activitate PFA" },
              { label: "Bilanț contabil (dacă PD — partida dublă)", hint: "Semnat de administrator + contabil" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "chirii", label: "Venituri din chirii", icon: Home,
    sections: [
      { title: "Identitate", groups: [DOC_CI] },
      {
        title: "Proprietate și contract",
        groups: [
          {
            id: "contract-chirie", required: true,
            note: "Trebuie să specifice valoarea chiriei și perioada contractuală",
            alternatives: [{ label: "Contract de închiriere înregistrat la ANAF", hint: "Cu ștampilă ANAF sau + cerere înregistrare + mesaj electronic" }],
          },
          {
            id: "docprop-chirie", required: true,
            note: "Cel puțin unul",
            alternatives: [
              { label: "Act de proprietate al imobilului închiriat", hint: "Titlu proprietate, contract vânzare-cumpărare, etc." },
              { label: "Extras de Carte Funciară", hint: "Max. 30 zile de la data cererii — emis de ANCPI" },
            ],
          },
        ],
      },
      {
        title: "Documente fiscale și venit",
        groups: [
          {
            id: "declaratie-unica-chirii", required: true,
            note: "Cel puțin una",
            alternatives: [
              { label: "Declarație Unică (D212) + recipisă ANAF", hint: "An anterior + estimat an curent — obligatorie dacă ești persoană fizică" },
              { label: "Declarații lunare chiriaș PJ (dacă chiriașul e firmă)", hint: "Firmele rețin impozit la sursă și declară lunar" },
            ],
          },
          {
            id: "dovada-incasare-chirie", required: false,
            note: "Poate fi solicitat suplimentar",
            alternatives: [
              { label: "Extras de cont (12 luni) cu viramente chirie", hint: "Identificabile transferurile lunare de la chiriaș" },
              { label: "Chitanțe de încasare chirie (12 luni)", hint: "Dacă plata se face în numerar" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dividende", label: "Dividende", icon: BarChart3,
    sections: [
      { title: "Identitate", groups: [DOC_CI] },
      {
        title: "Documente societate",
        groups: [
          {
            id: "balanta", required: true,
            alternatives: [{ label: "Ultima balanță de verificare lunară", hint: "Max. 2 luni vechime — semnată de administrator + contabil, în original" }],
          },
          {
            id: "bilant", required: true,
            alternatives: [{ label: "Bilanțuri contabile (ultimii 2 ani)", hint: "Ambii ani cu rezultat net pozitiv (profit) — depuse la ANAF" }],
          },
        ],
      },
      {
        title: "Dovada încasării dividendelor",
        groups: [
          {
            id: "incasare-dividende", required: true,
            note: "Oricare unul — pentru ambii ani de dividende",
            alternatives: [
              { label: "Extras de cont (virament dividende nete)", hint: "Din data distribuirii profitului, pentru ambii ani consecutivi" },
              { label: "Dispoziții de plată + Registru Casă", hint: "Dacă dividendele s-au încasat în numerar (max. 10.000 RON/zi)" },
              { label: "Declarația 205 + recipisă ANAF", hint: "Doar dacă în D205 apar exclusiv datele clienților din creditul curent" },
            ],
          },
        ],
      },
    ],
  },
];

const IPOTECAR_SECTION: DocSection = {
  title: "Documente imobil (credit ipotecar)",
  groups: [
    {
      id: "extras-cf", required: true,
      alternatives: [{ label: "Extras de Carte Funciară", hint: "Max. 30 zile de la data cererii — emis de ANCPI/notariat" }],
    },
    {
      id: "plan-cadastral", required: true,
      alternatives: [{ label: "Plan cadastral și documentație intabulare", hint: "Emise de un topograf autorizat ANCPI" }],
    },
    {
      id: "act-proprietate-imobil", required: true,
      note: "Oricare document atestând dreptul de proprietate",
      alternatives: [
        { label: "Titlu de proprietate", hint: "Emis de primărie — imobile restituite sau retrocedate" },
        { label: "Contract de vânzare-cumpărare (formă autentică)", hint: "Semnat la notar" },
        { label: "Autorizație de construire + Proces verbal de recepție", hint: "Pentru construcții noi" },
        { label: "Certificat de moștenitor", hint: "Pentru imobile dobândite prin succesiune" },
      ],
    },
    {
      id: "evaluare-anevar", required: true,
      alternatives: [{ label: "Raport de evaluare ANEVAR", hint: "Emis de evaluator autorizat — banca poate recomanda evaluator propriu" }],
    },
    {
      id: "asigurare-pad", required: true,
      alternatives: [{ label: "Poliță de asigurare PAD (obligatorie prin lege)", hint: "Cesionată în favoarea băncii creditoare pe durata creditului" }],
    },
    {
      id: "antecontract", required: false,
      note: "La creditele de achiziție — oricare",
      alternatives: [
        { label: "Antecontract de vânzare-cumpărare", hint: "Promisiune bilaterală de vânzare — semnat la notar" },
        { label: "Contract de vânzare-cumpărare semnat", hint: "Dacă tranzacția este deja finalizată" },
      ],
    },
  ],
};

type Tab = "overview" | "credit" | "asigurari" | "profil" | "documente" | "notificari";

export default function AccountPage() {
  const { user, isLoggedIn, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { applications, addInsuranceRequest } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [applyingIns, setApplyingIns] = useState<string | null>(null);
  const [insForm, setInsForm] = useState({ name: "", phone: "", email: "" });
  const [insSuccess, setInsSuccess] = useState<string | null>(null);
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set());
  const [docCreditType, setDocCreditType] = useState<"personal" | "ipotecar">("personal");
  const [docIncomeType, setDocIncomeType] = useState("salariat-ro");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["Identitate", "Dovada venitului", "Dovada pensiei"]));
  const [profileForm, setProfileForm] = useState({ name: user?.name || "", phone: "", email: user?.email || "" });
  const [profileSaved, setProfileSaved] = useState(false);
  const [selectedBrokerId, setSelectedBrokerId] = useState(() => getStoredBrokerId());
  const selectedBroker = getBroker(selectedBrokerId);

  const handleBrokerChange = (id: string) => {
    setSelectedBrokerId(id);
    setStoredBrokerId(id);
  };

  const toggleSection = (title: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });
  };

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

  const toggleDoc = (key: string) => {
    setCheckedDocs(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const currentCat = INCOME_DOCS.find(c => c.id === docIncomeType) || INCOME_DOCS[0];
  const totalDocGroups = currentCat.sections.reduce((s, sec) => s + sec.groups.length, 0)
    + (docCreditType === "ipotecar" ? IPOTECAR_SECTION.groups.length : 0);
  const checkedInCurrent = Array.from(checkedDocs).filter(k => k.startsWith(docIncomeType) || k.startsWith("ipotecar-")).length;

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
                { label: "Documente", value: `${checkedInCurrent}/${totalDocGroups}`, color: "text-purple-600", tab: "documente" as Tab },
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
                <a href={`tel:${selectedBroker.phone.replace(/\s/g, "")}`}>
                  <button className="bg-[#C49A20] hover:bg-[#b09255] text-[#0B2E2E] font-semibold text-sm py-2.5 px-5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap">
                    <Phone className="h-4 w-4" /> {selectedBroker.phone}
                  </button>
                </a>
                <a href={`mailto:${selectedBroker.email}?cc=${encodeURIComponent(CC_EMAIL)}`}>
                  <button className="border border-white/20 text-white hover:bg-white/10 text-sm py-2 px-5 rounded-xl transition-colors w-full flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" /> Email broker
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <div className="rounded-xl bg-[#F5F7FA] p-3">
                        <div className="text-xs text-[#64748B] mb-0.5">Sumă</div>
                        <div className="text-sm font-semibold text-[#0B2E2E]">{app.amount.toLocaleString("ro-RO")} RON</div>
                      </div>
                      <div className="rounded-xl bg-[#F5F7FA] p-3">
                        <div className="text-xs text-[#64748B] mb-0.5">Bancă</div>
                        <div className="text-sm text-[#0B2E2E]">{app.bank || "—"}</div>
                      </div>
                      {app.message && (
                        <div className="sm:col-span-2 rounded-xl bg-[#F5F7FA] p-3">
                          <div className="text-xs text-[#64748B] mb-0.5">Notă</div>
                          <div className="text-sm text-[#64748B]">{app.message}</div>
                        </div>
                      )}
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
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-[#0B2E2E]">Documente necesare</h2>
              <p className="text-sm text-[#64748B]">Selectează tipul de credit și sursa de venit pentru a vedea exact ce documente pregătești</p>
            </div>

            {/* Step 1 — tip credit */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
              <div className="text-xs font-bold text-[#0B2E2E] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#0B2E2E] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                Tipul creditului
              </div>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { id: "personal" as const, label: "Credit personal", desc: "Nevoi personale, fără garanție imobiliară", icon: CreditCard },
                  { id: "ipotecar" as const, label: "Credit ipotecar", desc: "Achiziție sau construire locuință", icon: Home },
                ] as { id: "personal" | "ipotecar"; label: string; desc: string; icon: React.ElementType }[]).map(ct => (
                  <button key={ct.id} onClick={() => setDocCreditType(ct.id)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${docCreditType === ct.id ? "border-[#0B2E2E] bg-[#0B2E2E]/5" : "border-[#E2E8F0] hover:border-[#0B2E2E]/30"}`}>
                    <ct.icon className={`h-5 w-5 mt-0.5 shrink-0 ${docCreditType === ct.id ? "text-[#0B2E2E]" : "text-[#64748B]"}`} />
                    <div>
                      <div className={`text-sm font-semibold ${docCreditType === ct.id ? "text-[#0B2E2E]" : "text-[#64748B]"}`}>{ct.label}</div>
                      <div className="text-[11px] text-[#64748B]">{ct.desc}</div>
                    </div>
                    {docCreditType === ct.id && <div className="ml-auto shrink-0 w-4 h-4 rounded-full bg-[#0B2E2E] flex items-center justify-center"><Check className="h-2.5 w-2.5 text-white" /></div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 — sursă venit */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
              <div className="text-xs font-bold text-[#0B2E2E] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#0B2E2E] text-white flex items-center justify-center text-[10px] font-bold">2</span>
                Sursa principală de venit
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {INCOME_DOCS.map(cat => (
                  <button key={cat.id} onClick={() => { setDocIncomeType(cat.id); setExpandedSections(new Set(["Identitate", cat.sections[1]?.title || ""])); }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border-2 text-left transition-all ${docIncomeType === cat.id ? "border-[#C49A20] bg-[#C49A20]/8" : "border-[#E2E8F0] hover:border-[#C49A20]/40"}`}>
                    <cat.icon className={`h-4 w-4 shrink-0 ${docIncomeType === cat.id ? "text-[#C49A20]" : "text-[#64748B]"}`} />
                    <span className={`text-xs font-semibold leading-tight ${docIncomeType === cat.id ? "text-[#0B2E2E]" : "text-[#64748B]"}`}>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl px-5 py-3.5 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[#0B2E2E]">Progres dosar</span>
                  <span className="text-xs font-bold text-[#0B2E2E]">{checkedInCurrent}/{totalDocGroups} documente</span>
                </div>
                <div className="h-2 bg-[#F5F7FA] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#C49A20] to-[#0B2E2E] rounded-full transition-all duration-500"
                    style={{ width: `${totalDocGroups > 0 ? (checkedInCurrent / totalDocGroups) * 100 : 0}%` }} />
                </div>
              </div>
              {checkedInCurrent === totalDocGroups && totalDocGroups > 0 && (
                <div className="flex items-center gap-1.5 text-green-600 text-xs font-bold shrink-0">
                  <CheckCircle className="h-4 w-4" /> Complet!
                </div>
              )}
            </div>

            {/* Document sections for selected income type */}
            <div className="space-y-3">
              {currentCat.sections.map(section => {
                const isOpen = expandedSections.has(section.title);
                const sectionChecked = section.groups.filter(g => checkedDocs.has(`${docIncomeType}-${g.id}`)).length;
                return (
                  <div key={section.title} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                    <button onClick={() => toggleSection(section.title)}
                      className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-[#F5F7FA] transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#0B2E2E] text-sm">{section.title}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${sectionChecked === section.groups.length ? "bg-green-100 text-green-700" : "bg-[#F5F7FA] text-[#64748B]"}`}>
                          {sectionChecked}/{section.groups.length}
                        </span>
                      </div>
                      {isOpen ? <ChevronUp className="h-4 w-4 text-[#64748B]" /> : <ChevronDown className="h-4 w-4 text-[#64748B]" />}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 space-y-2 border-t border-[#F5F7FA]">
                        {section.groups.map(group => {
                          const key = `${docIncomeType}-${group.id}`;
                          const isChecked = checkedDocs.has(key);
                          const hasAlts = group.alternatives.length > 1;
                          return (
                            <div key={group.id} className={`mt-2 rounded-xl border-2 transition-all ${isChecked ? "border-green-200 bg-green-50" : group.required ? "border-[#E2E8F0]" : "border-dashed border-[#E2E8F0] bg-[#FAFAFA]"}`}>
                              <button onClick={() => toggleDoc(key)}
                                className="w-full flex items-start gap-3 px-4 py-3 text-left">
                                <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 mt-0.5 transition-all ${isChecked ? "bg-green-500 border-green-500" : "border-[#CBD5E1]"}`}>
                                  {isChecked && <Check className="h-3 w-3 text-white" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  {!hasAlts ? (
                                    <>
                                      <div className={`text-sm font-medium leading-tight ${isChecked ? "line-through text-[#94A3B8]" : "text-[#0B2E2E]"}`}>
                                        {group.alternatives[0].label}
                                      </div>
                                      {group.alternatives[0].hint && (
                                        <div className="text-[11px] text-[#64748B] mt-0.5">{group.alternatives[0].hint}</div>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <div className="flex flex-wrap items-center gap-1 mb-1">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49A20] bg-[#C49A20]/10 px-1.5 py-0.5 rounded">SAU — oricare</span>
                                      </div>
                                      <div className="space-y-1.5">
                                        {group.alternatives.map((alt, ai) => (
                                          <div key={ai} className="flex items-start gap-2">
                                            {ai > 0 && <span className="text-[10px] font-bold text-[#C49A20] mt-0.5 shrink-0">SAU</span>}
                                            {ai === 0 && <span className="w-[22px] shrink-0" />}
                                            <div>
                                              <div className={`text-sm font-medium leading-tight ${isChecked ? "line-through text-[#94A3B8]" : "text-[#0B2E2E]"}`}>{alt.label}</div>
                                              {alt.hint && <div className="text-[11px] text-[#64748B]">{alt.hint}</div>}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                  {group.note && (
                                    <div className="mt-1.5 flex items-start gap-1">
                                      <Info className="h-3 w-3 text-[#94A3B8] mt-0.5 shrink-0" />
                                      <span className="text-[11px] text-[#94A3B8] italic">{group.note}</span>
                                    </div>
                                  )}
                                </div>
                                {!group.required && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8] bg-[#F5F7FA] px-1.5 py-0.5 rounded shrink-0 mt-0.5">opțional</span>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Credit ipotecar — extra documents */}
              {docCreditType === "ipotecar" && (() => {
                const isOpen = expandedSections.has(IPOTECAR_SECTION.title);
                const sectionChecked = IPOTECAR_SECTION.groups.filter(g => checkedDocs.has(`ipotecar-${g.id}`)).length;
                return (
                  <div className="bg-[#0B2E2E]/4 border-2 border-[#0B2E2E]/20 rounded-xl overflow-hidden">
                    <button onClick={() => toggleSection(IPOTECAR_SECTION.title)}
                      className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-[#0B2E2E]/8 transition-colors">
                      <div className="flex items-center gap-2">
                        <Landmark className="h-4 w-4 text-[#0B2E2E]" />
                        <span className="font-semibold text-[#0B2E2E] text-sm">{IPOTECAR_SECTION.title}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${sectionChecked === IPOTECAR_SECTION.groups.length ? "bg-green-100 text-green-700" : "bg-white text-[#64748B]"}`}>
                          {sectionChecked}/{IPOTECAR_SECTION.groups.length}
                        </span>
                      </div>
                      {isOpen ? <ChevronUp className="h-4 w-4 text-[#0B2E2E]" /> : <ChevronDown className="h-4 w-4 text-[#0B2E2E]" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 space-y-2 border-t border-[#0B2E2E]/10">
                        {IPOTECAR_SECTION.groups.map(group => {
                          const key = `ipotecar-${group.id}`;
                          const isChecked = checkedDocs.has(key);
                          const hasAlts = group.alternatives.length > 1;
                          return (
                            <div key={group.id} className={`mt-2 rounded-xl border-2 bg-white transition-all ${isChecked ? "border-green-200 bg-green-50" : group.required ? "border-[#E2E8F0]" : "border-dashed border-[#E2E8F0] bg-[#FAFAFA]"}`}>
                              <button onClick={() => toggleDoc(key)} className="w-full flex items-start gap-3 px-4 py-3 text-left">
                                <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 mt-0.5 transition-all ${isChecked ? "bg-green-500 border-green-500" : "border-[#CBD5E1]"}`}>
                                  {isChecked && <Check className="h-3 w-3 text-white" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  {!hasAlts ? (
                                    <>
                                      <div className={`text-sm font-medium leading-tight ${isChecked ? "line-through text-[#94A3B8]" : "text-[#0B2E2E]"}`}>
                                        {group.alternatives[0].label}
                                      </div>
                                      {group.alternatives[0].hint && <div className="text-[11px] text-[#64748B] mt-0.5">{group.alternatives[0].hint}</div>}
                                    </>
                                  ) : (
                                    <>
                                      <div className="flex flex-wrap items-center gap-1 mb-1">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49A20] bg-[#C49A20]/10 px-1.5 py-0.5 rounded">SAU — oricare</span>
                                      </div>
                                      <div className="space-y-1.5">
                                        {group.alternatives.map((alt, ai) => (
                                          <div key={ai} className="flex items-start gap-2">
                                            {ai > 0 && <span className="text-[10px] font-bold text-[#C49A20] mt-0.5 shrink-0">SAU</span>}
                                            {ai === 0 && <span className="w-[22px] shrink-0" />}
                                            <div>
                                              <div className={`text-sm font-medium leading-tight ${isChecked ? "line-through text-[#94A3B8]" : "text-[#0B2E2E]"}`}>{alt.label}</div>
                                              {alt.hint && <div className="text-[11px] text-[#64748B]">{alt.hint}</div>}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                  {group.note && (
                                    <div className="mt-1.5 flex items-start gap-1">
                                      <Info className="h-3 w-3 text-[#94A3B8] mt-0.5 shrink-0" />
                                      <span className="text-[11px] text-[#94A3B8] italic">{group.note}</span>
                                    </div>
                                  )}
                                </div>
                                {!group.required && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8] bg-[#F5F7FA] px-1.5 py-0.5 rounded shrink-0 mt-0.5">opțional</span>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* GDPR / Security notice */}
            <div className="bg-[#F5F7FA] border border-[#E2E8F0] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0B2E2E]/8 flex items-center justify-center shrink-0">
                  <Lock className="h-4 w-4 text-[#0B2E2E]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0B2E2E] mb-1 flex items-center gap-2">
                    Protecția datelor personale — GDPR
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded uppercase tracking-wider">Conform RGPD</span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed mb-2">
                    Documentele trimise sunt utilizate exclusiv în scopul analizei dosarului de credit. Datele personale sunt procesate conform <strong>Regulamentului UE 679/2016 (GDPR)</strong> și <strong>Legii 190/2018</strong>. Nu transmitem documentele terților fără consimțământul tău explicit.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Eye, label: "Transparență totală", desc: "Știi exact cui trimiți și în ce scop" },
                      { icon: Lock, label: "Transfer securizat", desc: "Email criptat cu CC la coordonator" },
                      { icon: Shield, label: "Stocare limitată", desc: "Documentele nu sunt stocate pe servere proprii" },
                      { icon: CheckCircle, label: "Drept la ștergere", desc: "Poți solicita ștergerea datelor oricând" },
                    ].map(item => (
                      <div key={item.label} className="flex items-start gap-2 bg-white rounded-lg p-2.5 border border-[#E2E8F0]">
                        <item.icon className="h-3.5 w-3.5 text-[#0B2E2E] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[11px] font-semibold text-[#0B2E2E]">{item.label}</div>
                          <div className="text-[10px] text-[#64748B]">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Informare — fără CTA de trimitere */}
            <div className="bg-[#F5F7FA] border border-[#E2E8F0] rounded-xl p-5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0B2E2E]/8 flex items-center justify-center shrink-0 mt-0.5">
                <Info className="h-4 w-4 text-[#0B2E2E]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0B2E2E] mb-1">Pasul următor</div>
                <p className="text-sm text-[#64748B]">
                  Bifează documentele pe care le ai pregătite, apoi contactează direct brokerul tău —{" "}
                  <strong className="text-[#0B2E2E]">{selectedBroker.name}</strong> ({selectedBroker.phone}) —
                  pentru a stabili o întâlnire sau a depune dosarul fizic. Brokerul îți va confirma lista completă în funcție de situația ta specifică.
                </p>
                <p className="text-xs text-[#94A3B8] mt-2">
                  FinExperts — Partener oficial KIWI Finance · Autorizat BNR
                </p>
              </div>
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

                  {/* Broker selector */}
                  <div className="space-y-2 mb-4">
                    {BROKERS.map(b => (
                      <button
                        key={b.id}
                        onClick={() => handleBrokerChange(b.id)}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-xl border-2 transition-all text-left ${
                          selectedBrokerId === b.id
                            ? "border-[#C49A20] bg-white"
                            : "border-transparent hover:border-[#E2E8F0] hover:bg-white"
                        }`}
                      >
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ backgroundColor: b.color }}>{b.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-[#0B2E2E] leading-tight">{b.name}</div>
                          <div className="text-[10px] text-[#64748B]">{b.role}</div>
                        </div>
                        {selectedBrokerId === b.id && (
                          <div className="w-4 h-4 rounded-full bg-[#C49A20] flex items-center justify-center shrink-0">
                            <Check className="h-2.5 w-2.5 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Selected broker contact */}
                  <div className="border-t border-[#E2E8F0] pt-3 space-y-1.5">
                    <a href={`tel:${selectedBroker.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 text-xs text-[#0B2E2E] hover:text-[#C49A20] transition-colors">
                      <Phone className="h-3.5 w-3.5 shrink-0" /> {selectedBroker.phone}
                    </a>
                    <a href={`mailto:${selectedBroker.email}?cc=${encodeURIComponent(CC_EMAIL)}`}
                      className="flex items-center gap-2 text-xs text-[#0B2E2E] hover:text-[#C49A20] transition-colors break-all">
                      <Mail className="h-3.5 w-3.5 shrink-0" /> {selectedBroker.email}
                    </a>
                    <p className="text-[10px] text-[#94A3B8] mt-1">CC automat la {CC_EMAIL}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
