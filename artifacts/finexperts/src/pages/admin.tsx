import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useAuth, getAuditLog, AuditEvent, BROKER_ACCOUNTS, getBrokerAccounts, setBrokerAccounts, BrokerAccount } from "@/lib/auth";
import { useStore, Application, InsuranceRequest, Guide, SiteSettings } from "@/lib/store";
import { BROKERS } from "@/lib/brokers";
import { banks as defaultBanks } from "@/lib/data";
import {
  LayoutDashboard, FileText, BookOpen, Shield, Building2,
  LogOut, ChevronDown, ChevronUp, Trash2, Plus, Pencil, Check, X, Eye,
  BarChart2, Users, Bell, Phone, Mail, TrendingUp, TrendingDown, Calendar,
  Download, MessageSquare, Star, ArrowRight, Clock, RefreshCw, Zap, Info,
  Settings, Lock, AlertTriangle, Globe, Edit3, UserCheck, ShieldCheck,
  Activity, Key, UserX, CheckCircle, Megaphone, ToggleLeft, ToggleRight,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:   { label: "În așteptare", color: "bg-amber-100 text-amber-700" },
  in_review: { label: "În analiză",   color: "bg-blue-100 text-blue-700" },
  approved:  { label: "Aprobat",      color: "bg-green-100 text-green-700" },
  rejected:  { label: "Respins",      color: "bg-red-100 text-red-700" },
  contacted: { label: "Contactat",    color: "bg-purple-100 text-purple-700" },
  closed:    { label: "Închis",       color: "bg-gray-100 text-gray-600" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_LABELS[status] || { label: status, color: "bg-gray-100 text-gray-600" };
  return <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${s.color}`}>{s.label}</span>;
}

type Tab = "dashboard" | "statistici" | "aplicari" | "ghiduri" | "asigurari" | "banci" | "utilizatori" | "brokeri" | "continut" | "securitate";

export default function AdminPage() {
  const { user, isSuperAdmin, logout } = useAuth();
  const [, setLocation] = useLocation();
  const {
    applications, setApplications, updateApplication,
    insuranceRequests, setInsuranceRequests,
    guides, setGuides,
    adminBanks, setAdminBanks,
    siteSettings, setSiteSettings,
  } = useStore();

  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  if (!isSuperAdmin) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-10 text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-7 w-7 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-[#0B2E2E] mb-2">Acces restricționat</h2>
          <p className="text-sm text-[#64748B] mb-5">Această pagină este exclusivă administratorilor.</p>
          <button onClick={() => setLocation("/login")} className="bg-[#0B2E2E] text-white font-semibold px-6 py-2.5 rounded-lg text-sm">Conectare</button>
        </div>
      </div>
    );
  }

  const handleLogout = () => { logout(); setLocation("/"); };

  const navGroups = [
    {
      label: "Principal",
      items: [
        { id: "dashboard" as Tab, label: "Dashboard", icon: LayoutDashboard },
        { id: "statistici" as Tab, label: "Statistici", icon: BarChart2 },
        { id: "aplicari" as Tab, label: "Aplicări credit", icon: FileText, count: applications.filter(a => a.status === "pending").length },
        { id: "ghiduri" as Tab, label: "Ghiduri", icon: BookOpen, count: guides.length },
        { id: "asigurari" as Tab, label: "Asigurări", icon: Shield, count: insuranceRequests.filter(r => r.status === "pending").length },
        { id: "banci" as Tab, label: "Bănci", icon: Building2, count: adminBanks.length },
      ],
    },
    {
      label: "Administrare",
      items: [
        { id: "utilizatori" as Tab, label: "Utilizatori", icon: Users },
        { id: "brokeri" as Tab, label: "Brokeri", icon: UserCheck },
        { id: "continut" as Tab, label: "Conținut site", icon: Globe },
        { id: "securitate" as Tab, label: "Securitate", icon: ShieldCheck },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      <aside className="w-64 bg-[#0B2E2E] min-h-screen flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10">
          <div className="text-xs font-bold text-[#C49A20] uppercase tracking-wider mb-0.5">FinExperts</div>
          <div className="text-sm text-white font-semibold">Panou Dashboard</div>
          <div className="mt-1.5 inline-flex items-center gap-1 bg-[#C49A20]/20 text-[#C49A20] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            <Key className="h-2.5 w-2.5" /> Acces total
          </div>
        </div>
        <nav className="flex-1 p-3 overflow-y-auto">
          {navGroups.map(group => (
            <div key={group.label} className="mb-4">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 mb-1">{group.label}</div>
              {group.items.map(({ id, label, icon: Icon, count }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-colors ${
                    activeTab === id ? "bg-white/15 text-white" : "text-gray-400 hover:text-white hover:bg-white/8"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    {label}
                  </div>
                  {count !== undefined && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === id ? "bg-[#C49A20] text-[#0B2E2E]" : "bg-white/15 text-gray-300"}`}>
                      {count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <div className="px-3 py-2 mb-1">
            <div className="text-xs font-semibold text-white">{user?.name}</div>
            <div className="text-[10px] text-gray-400">{user?.email}</div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/8 transition-colors">
            <LogOut className="h-4 w-4" /> Deconectare
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        {activeTab === "dashboard" && <DashboardTab applications={applications} insuranceRequests={insuranceRequests} guides={guides} banks={adminBanks} setActiveTab={setActiveTab} />}
        {activeTab === "statistici" && <StatisticsTab applications={applications} insuranceRequests={insuranceRequests} />}
        {activeTab === "aplicari" && <ApplicationsTab applications={applications} setApplications={setApplications} updateApplication={updateApplication} />}
        {activeTab === "ghiduri" && <GuidesTab guides={guides} setGuides={setGuides} />}
        {activeTab === "asigurari" && <InsuranceTab requests={insuranceRequests} setRequests={setInsuranceRequests} />}
        {activeTab === "banci" && <BanksTab banks={adminBanks} setBanks={setAdminBanks} />}
        {activeTab === "utilizatori" && <UsersTab applications={applications} />}
        {activeTab === "brokeri" && <BrokeriTab applications={applications} />}
        {activeTab === "continut" && <ContentTab settings={siteSettings} setSettings={setSiteSettings} />}
        {activeTab === "securitate" && <SecurityTab />}
      </main>
    </div>
  );
}

function DashboardTab({ applications, insuranceRequests, guides, banks, setActiveTab }: {
  applications: Application[];
  insuranceRequests: InsuranceRequest[];
  guides: Guide[];
  banks: typeof defaultBanks;
  setActiveTab: (t: Tab) => void;
}) {
  const pending = applications.filter(a => a.status === "pending");
  const approved = applications.filter(a => a.status === "approved");
  const inReview = applications.filter(a => a.status === "in_review");
  const totalAmount = applications.reduce((s, a) => s + a.amount, 0);
  const avgAmount = applications.length ? Math.round(totalAmount / applications.length) : 0;
  const approvalRate = applications.length ? Math.round((approved.length / applications.length) * 100) : 0;

  const stats = [
    { label: "Aplicări totale", value: applications.length, sub: `${pending.length} în așteptare`, color: "text-blue-600", bg: "bg-blue-50", tab: "aplicari" as Tab, icon: FileText },
    { label: "Aprobate", value: approved.length, sub: `${approvalRate}% rată aprobare`, color: "text-green-600", bg: "bg-green-50", tab: "aplicari" as Tab, icon: TrendingUp },
    { label: "Asigurări", value: insuranceRequests.length, sub: `${insuranceRequests.filter(r => r.status === "pending").length} neprocesate`, color: "text-purple-600", bg: "bg-purple-50", tab: "asigurari" as Tab, icon: Shield },
    { label: "Sumă medie", value: `${Math.round(avgAmount / 1000)}k`, sub: "RON per aplicare", color: "text-amber-600", bg: "bg-amber-50", tab: "statistici" as Tab, icon: BarChart2 },
  ];

  const todayActivities = [
    ...pending.slice(0, 3).map(a => ({ type: "aplicare" as const, text: `Aplicare nouă: ${a.name} — ${a.amount.toLocaleString("ro-RO")} RON`, time: a.date, id: a.id })),
    ...insuranceRequests.filter(r => r.status === "pending").slice(0, 2).map(r => ({ type: "asigurare" as const, text: `Cerere asigurare: ${r.name} — ${r.type}`, time: r.date, id: r.id })),
  ].slice(0, 5);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0B2E2E]">Dashboard</h1>
          <p className="text-sm text-[#64748B]">Bun venit, {pending.length > 0 ? `ai ${pending.length} aplicări de procesat` : "totul este la zi"}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <RefreshCw className="h-3.5 w-3.5" />
          Actualizat: 02.05.2026
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6 bg-gradient-to-r from-[#0B2E2E] to-[#0A2525] rounded-xl px-5 py-4">
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-[#C49A20] uppercase tracking-wider mb-0.5">IRCC T2 2026 — BNR Oficial</div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl font-extrabold text-white">5.58%</span>
            <span className="text-xs text-green-400 font-semibold flex items-center gap-0.5">
              <TrendingDown className="h-3 w-3" /> −0.10 pp vs T1 2026
            </span>
          </div>
          <div className="text-xs text-gray-400 mt-0.5">Valabil 1 apr – 30 iun 2026 · Estimat T3 2026: 5.56% · Tendință: în scădere</div>
        </div>
        <div className="text-right shrink-0 hidden sm:block">
          <button onClick={() => setActiveTab("continut")} className="text-xs text-[#C49A20] hover:underline">Editează →</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <button key={s.label} onClick={() => setActiveTab(s.tab)} className="bg-white border border-[#E2E8F0] rounded-xl p-5 text-left hover:shadow-sm transition-all hover:border-[#0B2E2E] group">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div className={`text-3xl font-bold mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-sm font-semibold text-[#0B2E2E]">{s.label}</div>
            <div className="text-xs text-[#64748B] mt-0.5">{s.sub}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <h3 className="font-semibold text-[#0B2E2E]">Aplicări recente</h3>
            <button onClick={() => setActiveTab("aplicari")} className="text-xs text-[#64748B] hover:text-[#0B2E2E] flex items-center gap-1">
              Toate <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <table className="w-full">
            <thead className="bg-[#F5F7FA]">
              <tr>
                {["Solicitant", "Tip / Sumă", "Status", "Data"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.slice(0, 6).map(app => (
                <tr key={app.id} className="border-t border-[#E2E8F0] hover:bg-[#F5F7FA]/50">
                  <td className="px-5 py-3">
                    <div className="text-sm font-medium text-[#0B2E2E]">{app.name}</div>
                    <div className="text-xs text-[#64748B]">{app.email}</div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="text-xs text-[#64748B] capitalize mb-0.5">{app.type}</div>
                    <div className="text-sm font-semibold text-[#0B2E2E]">{app.amount.toLocaleString("ro-RO")} RON</div>
                  </td>
                  <td className="px-5 py-3"><StatusBadge status={app.status} /></td>
                  <td className="px-5 py-3 text-xs text-[#64748B]">{app.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {applications.length === 0 && <div className="py-10 text-center text-sm text-[#64748B]">Nicio aplicare încă.</div>}
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#E2E8F0]"><h3 className="font-semibold text-[#0B2E2E] text-sm">Activitate recentă</h3></div>
            <div className="p-2">
              {todayActivities.length === 0 ? (
                <div className="py-6 text-center text-xs text-[#64748B]">Nicio activitate recentă</div>
              ) : todayActivities.map((act, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#F5F7FA]">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${act.type === "aplicare" ? "bg-blue-100" : "bg-purple-100"}`}>
                    {act.type === "aplicare" ? <FileText className="h-3.5 w-3.5 text-blue-600" /> : <Shield className="h-3.5 w-3.5 text-purple-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-[#0B2E2E] font-medium leading-snug">{act.text}</div>
                    <div className="text-[10px] text-[#64748B] mt-0.5">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
            <h3 className="font-semibold text-[#0B2E2E] text-sm mb-3">Acțiuni rapide</h3>
            <div className="space-y-2">
              {
                [
                  { label: "Procesează aplicări în așteptare", count: pending.length, color: "text-amber-600", tab: "aplicari" as Tab },
                  { label: "Procesează asigurări", count: insuranceRequests.filter(r => r.status === "pending").length, color: "text-purple-600", tab: "asigurari" as Tab },
                  { label: "Actualizează dobânzile", count: null, color: "text-blue-600", tab: "banci" as Tab },
                  { label: "Editează conținut site", count: null, color: "text-green-600", tab: "continut" as Tab },
                  { label: "Verifică securitatea", count: null, color: "text-red-600", tab: "securitate" as Tab },
                ].map(a => (
                  <button key={a.label} onClick={() => setActiveTab(a.tab)}
                    className="w-full flex items-center justify-between text-sm py-2 px-3 rounded-lg hover:bg-[#F5F7FA] transition-colors text-left">
                    <span className="text-[#0B2E2E]">{a.label}</span>
                    {a.count !== null && a.count > 0 && (
                      <span className={`text-xs font-bold ${a.color}`}>{a.count}</span>
                    )}
                    {a.count === null && <ArrowRight className="h-3 w-3 text-[#64748B]" />}
                  </button>
                ))
              }
            </div>
          </div>

          {inReview.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">{inReview.length} dosare în analiză</span>
              </div>
              {inReview.slice(0, 2).map(a => (
                <div key={a.id} className="text-xs text-blue-700 py-0.5">{a.name} — {a.bank || "bancă nespecificată"}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatisticsTab({ applications, insuranceRequests }: { applications: Application[]; insuranceRequests: InsuranceRequest[] }) {
  const approved = applications.filter(a => a.status === "approved");
  const rejected = applications.filter(a => a.status === "rejected");
  const pending = applications.filter(a => a.status === "pending");
  const inReview = applications.filter(a => a.status === "in_review");

  const totalAmount = approved.reduce((s, a) => s + a.amount, 0);
  const avgAmount = approved.length ? Math.round(totalAmount / approved.length) : 0;
  const approvalRate = applications.length ? (approved.length / applications.length) * 100 : 0;
  const rejectionRate = applications.length ? (rejected.length / applications.length) * 100 : 0;

  const byType = ["personal", "ipotecar", "refinantare"].map(type => ({
    type,
    count: applications.filter(a => a.type === type).length,
    approved: applications.filter(a => a.type === type && a.status === "approved").length,
  }));

  const bankCounts: Record<string, number> = {};
  for (const a of applications) {
    if (a.bank) bankCounts[a.bank] = (bankCounts[a.bank] || 0) + 1;
  }
  const topBanks = Object.entries(bankCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxBankCount = topBanks[0]?.[1] || 1;

  const statusData = [
    { label: "Aprobate", count: approved.length, color: "bg-green-500", pct: approvalRate },
    { label: "Respinse", count: rejected.length, color: "bg-red-400", pct: rejectionRate },
    { label: "În așteptare", count: pending.length, color: "bg-amber-400", pct: applications.length ? (pending.length / applications.length) * 100 : 0 },
    { label: "În analiză", count: inReview.length, color: "bg-blue-400", pct: applications.length ? (inReview.length / applications.length) * 100 : 0 },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0B2E2E]">Statistici</h1>
        <p className="text-sm text-[#64748B]">Raport general activitate — 02.05.2026</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {
          [
            { label: "Rată aprobare", value: `${approvalRate.toFixed(1)}%`, color: "text-green-600", icon: TrendingUp },
            { label: "Volum aprobat", value: `${(totalAmount / 1000000).toFixed(2)}M RON`, color: "text-blue-600", icon: BarChart2 },
            { label: "Sumă medie", value: `${Math.round(avgAmount / 1000)}k RON`, color: "text-amber-600", icon: BarChart2 },
            { label: "Asigurări totale", value: insuranceRequests.length, color: "text-purple-600", icon: Shield },
          ].map(k => (
            <div key={k.label} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
              <k.icon className={`h-5 w-5 ${k.color} mb-2`} />
              <div className={`text-2xl font-bold ${k.color} mb-0.5`}>{k.value}</div>
              <div className="text-xs text-[#64748B]">{k.label}</div>
            </div>
          ))
        }
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
          <h3 className="font-semibold text-[#0B2E2E] mb-1">Status aplicări</h3>
          <p className="text-xs text-[#64748B] mb-4">Distribuție după starea dosarului</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={statusData} barCategoryGap="30%" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#64748B" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip formatter={(v: number) => [v, "Aplicări"]} contentStyle={{ fontSize: 11, border: "1px solid #E2E8F0", borderRadius: 8 }} cursor={{ fill: "#F4F6FB" }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {statusData.map((s, i) => (
                  <Cell key={i} fill={["#F59E0B", "#3B82F6", "#10B981", "#EF4444"][i % 4]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
          <h3 className="font-semibold text-[#0B2E2E] mb-1">Aplicări pe tip de credit</h3>
          <p className="text-xs text-[#64748B] mb-4">Total vs. aprobate</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={byType.map(t => ({ name: t.type === "refinantare" ? "Refinanțare" : t.type === "personal" ? "Personal" : "Ipotecar", total: t.count, aprobate: t.approved }))} barCategoryGap="30%" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748B" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ fontSize: 11, border: "1px solid #E2E8F0", borderRadius: 8 }} cursor={{ fill: "#F4F6FB" }} />
              <Bar dataKey="total" name="Total" fill="#0B2E2E" radius={[4, 4, 0, 0]} />
              <Bar dataKey="aprobate" name="Aprobate" fill="#C49A20" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {topBanks.length > 0 && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-[#0B2E2E] mb-4">Top bănci solicitate</h3>
          <div className="space-y-3">
            {topBanks.map(([bank, count], i) => (
              <div key={bank} className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#64748B] w-4">{i + 1}</span>
                <span className="text-sm text-[#0B2E2E] w-36">{bank}</span>
                <div className="flex-1 h-2 bg-[#F5F7FA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#C49A20] rounded-full" style={{ width: `${(count / maxBankCount) * 100}%` }} />
                </div>
                <span className="text-xs font-semibold text-[#64748B] w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ApplicationsTab({ applications, setApplications, updateApplication }: { applications: Application[]; setApplications: (a: Application[]) => void; updateApplication: (id: string, updates: Partial<Application>) => void; }) {
  const [query, setQuery] = useState("");
  const filtered = applications.filter(app =>
    app.name.toLowerCase().includes(query.toLowerCase()) ||
    app.email.toLowerCase().includes(query.toLowerCase()) ||
    app.type.toLowerCase().includes(query.toLowerCase()) ||
    (app.bank || "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#0B2E2E]">Aplicări credit</h1>
          <p className="text-sm text-[#64748B]">Administrare și procesare dosare</p>
        </div>
        <div className="text-sm text-[#64748B]">{filtered.length} rezultate</div>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caută aplicație..."
            className="w-full max-w-sm rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm outline-none focus:border-[#0B2E2E]"
          />
        </div>
        <table className="w-full">
          <thead className="bg-[#F5F7FA]">
            <tr>
              {["Solicitant", "Tip / Sumă", "Status", "Data", "Acțiuni"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 10).map(app => (
              <tr key={app.id} className="border-t border-[#E2E8F0] hover:bg-[#F5F7FA]/50">
                <td className="px-5 py-3">
                  <div className="text-sm font-medium text-[#0B2E2E]">{app.name}</div>
                  <div className="text-xs text-[#64748B]">{app.email}</div>
                </td>
                <td className="px-5 py-3">
                  <div className="text-xs text-[#64748B] capitalize mb-0.5">{app.type}</div>
                  <div className="text-sm font-semibold text-[#0B2E2E]">{app.amount.toLocaleString("ro-RO")} RON</div>
                </td>
                <td className="px-5 py-3"><StatusBadge status={app.status} /></td>
                <td className="px-5 py-3 text-xs text-[#64748B]">{app.date}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => updateApplication(app.id, { status: "approved" })} className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-md">Aprobă</button>
                    <button onClick={() => updateApplication(app.id, { status: "rejected" })} className="text-xs font-semibold text-red-700 bg-red-50 px-2 py-1 rounded-md">Respinge</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GuidesTab({ guides, setGuides }: { guides: Guide[]; setGuides: (g: Guide[]) => void }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <h2 className="text-xl font-bold text-[#0B2E2E] mb-4">Ghiduri</h2>
      <div className="space-y-2">
        {guides.slice(0, 6).map(guide => (
          <div key={guide.slug} className="border border-[#E2E8F0] rounded-lg p-3">
            <div className="font-semibold text-[#0B2E2E] text-sm">{guide.title}</div>
            <div className="text-xs text-[#64748B]">{guide.category} · {guide.readTime}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsuranceTab({ requests, setRequests }: { requests: InsuranceRequest[]; setRequests: (r: InsuranceRequest[]) => void }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <h2 className="text-xl font-bold text-[#0B2E2E] mb-4">Asigurări</h2>
      <div className="space-y-2">
        {requests.slice(0, 6).map(req => (
          <div key={req.id} className="border border-[#E2E8F0] rounded-lg p-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-[#0B2E2E] text-sm">{req.name}</div>
              <div className="text-xs text-[#64748B]">{req.type}</div>
            </div>
            <div className="text-xs text-[#64748B]">{req.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BanksTab({ banks, setBanks }: { banks: any[]; setBanks: (b: any[]) => void }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <h2 className="text-xl font-bold text-[#0B2E2E] mb-4">Bănci</h2>
      <div className="grid grid-cols-2 gap-2">
        {banks.slice(0, 8).map((bank: any) => (
          <div key={bank.name} className="border border-[#E2E8F0] rounded-lg p-3 text-sm text-[#0B2E2E]">{bank.name}</div>
        ))}
      </div>
    </div>
  );
}

function UsersTab({ applications }: { applications: Application[] }) {
  const users = applications.map(app => ({ email: app.email, name: app.name, source: "applications" }));
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <h2 className="text-xl font-bold text-[#0B2E2E] mb-4">Utilizatori</h2>
      <div className="space-y-2">
        {users.slice(0, 10).map(u => (
          <div key={u.email} className="border border-[#E2E8F0] rounded-lg p-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-[#0B2E2E] text-sm">{u.name}</div>
              <div className="text-xs text-[#64748B]">{u.email}</div>
            </div>
            <div className="text-xs text-[#64748B]">{u.source}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrokeriTab({ applications }: { applications: Application[] }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <h2 className="text-xl font-bold text-[#0B2E2E] mb-4">Brokeri</h2>
      <div className="space-y-2">
        {applications.filter(a => a.brokerId).slice(0, 6).map(app => (
          <div key={app.id} className="border border-[#E2E8F0] rounded-lg p-3">
            <div className="font-semibold text-[#0B2E2E] text-sm">{app.name}</div>
            <div className="text-xs text-[#64748B]">{app.brokerId}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentTab({ settings, setSettings }: { settings: SiteSettings; setSettings: (s: SiteSettings) => void }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <h2 className="text-xl font-bold text-[#0B2E2E] mb-4">Conținut</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between border border-[#E2E8F0] rounded-lg p-3"><span>IRCC</span><span className="font-semibold">{settings.irccValue}</span></div>
        <div className="flex justify-between border border-[#E2E8F0] rounded-lg p-3"><span>Anunț activ</span><span className="font-semibold">{settings.announcementActive ? "Da" : "Nu"}</span></div>
        <div className="flex justify-between border border-[#E2E8F0] rounded-lg p-3"><span>Înregistrări noi</span><span className="font-semibold">{settings.allowNewRegistrations ? "Permise" : "Oprite"}</span></div>
      </div>
    </div>
  );
}
function SecurityTab() {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <h2 className="text-xl font-bold text-[#0B2E2E] mb-4">Securitate</h2>
      <div className="space-y-2 text-sm">
        <div className="border border-[#E2E8F0] rounded-lg p-3">Autentificare admin activă</div>
        <div className="border border-[#E2E8F0] rounded-lg p-3">Protecție cont super-admin</div>
      </div>
    </div>
  );
}
