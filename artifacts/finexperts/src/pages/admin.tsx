import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useAuth, getAuditLog, AuditEvent, BROKER_ACCOUNTS } from "@/lib/auth";
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
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B2E2E] min-h-screen flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10">
          <div className="text-xs font-bold text-[#C49A20] uppercase tracking-wider mb-0.5">FinExperts</div>
          <div className="text-sm text-white font-semibold">Panou Super Admin</div>
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

      {/* Main */}
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

// ─── Dashboard ────────────────────────────────────────────────────────────────
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

      {/* IRCC Banner */}
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

      {/* Stats */}
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
        {/* Aplicări recente */}
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
          {applications.length === 0 && (
            <div className="py-10 text-center text-sm text-[#64748B]">Nicio aplicare încă.</div>
          )}
        </div>

        {/* Sidebar dreapta */}
        <div className="space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#E2E8F0]">
              <h3 className="font-semibold text-[#0B2E2E] text-sm">Activitate recentă</h3>
            </div>
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
              {[
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
              ))}
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

// ─── Statistici ───────────────────────────────────────────────────────────────
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
        {[
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
        ))}
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
                <span className="text-sm font-semibold text-[#0B2E2E] w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Applications ─────────────────────────────────────────────────────────────
function ApplicationsTab({ applications, setApplications, updateApplication }: {
  applications: Application[];
  setApplications: (a: Application[]) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  let filtered = filter === "all" ? applications : applications.filter(a => a.status === filter);
  if (search) filtered = filtered.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.email?.toLowerCase().includes(search.toLowerCase()));

  const deleteApp = (id: string) => setApplications(applications.filter(a => a.id !== id));

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#0B2E2E]">Aplicări credit</h1>
          <p className="text-sm text-[#64748B]">{applications.length} aplicări totale</p>
        </div>
        <button onClick={() => {
          const csv = ["ID,Nume,Email,Telefon,Tip,Suma,Banca,Status,Data,Broker",
            ...applications.map(a => `${a.id},${a.name},${a.email || ""},${a.phone || ""},${a.type},${a.amount},${a.bank || ""},${a.status},${a.date},${a.brokerId || ""}`)
          ].join("\n");
          const blob = new Blob([csv], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a"); link.href = url; link.download = "aplicari.csv"; link.click();
        }} className="flex items-center gap-1.5 border border-[#E2E8F0] text-[#64748B] hover:text-[#0B2E2E] font-medium px-3 py-2 rounded-lg text-xs">
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <input type="text" placeholder="Caută după nume sau email..." value={search} onChange={e => setSearch(e.target.value)}
          className="border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#0B2E2E] w-56" />
        {[["all", "Toate"], ["pending", "În așteptare"], ["in_review", "În analiză"], ["approved", "Aprobate"], ["rejected", "Respinse"], ["contacted", "Contactate"]].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)} className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${filter === val ? "bg-[#0B2E2E] text-white border-[#0B2E2E]" : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0B2E2E]"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F7FA]">
            <tr>
              {["ID", "Solicitant", "Tip", "Sumă", "Bancă", "Status", "Broker", "Data", "Acțiuni"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <>
                <tr key={app.id} className={`border-t border-[#E2E8F0] hover:bg-[#F5F7FA]/50 ${app.status === "pending" ? "bg-amber-50/30" : ""}`}>
                  <td className="px-4 py-3 text-xs font-mono text-[#64748B]">{app.id}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-[#0B2E2E]">{app.name}</div>
                    <div className="text-xs text-[#64748B]">{app.email}</div>
                    {app.phone && <div className="text-xs text-[#64748B]">{app.phone}</div>}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#64748B] capitalize">{app.type}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-[#0B2E2E]">{app.amount.toLocaleString("ro-RO")} RON</td>
                  <td className="px-4 py-3 text-sm text-[#64748B]">{app.bank || "—"}</td>
                  <td className="px-4 py-3">
                    <select value={app.status} onChange={e => updateApplication(app.id, { status: e.target.value as Application["status"] })}
                      className="text-xs border border-[#E2E8F0] rounded-lg px-2 py-1 bg-white focus:outline-none">
                      <option value="pending">În așteptare</option>
                      <option value="in_review">În analiză</option>
                      <option value="approved">Aprobat</option>
                      <option value="rejected">Respins</option>
                      <option value="contacted">Contactat</option>
                      <option value="closed">Închis</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    {app.brokerId ? (
                      <span className="text-xs text-[#64748B] truncate max-w-[100px] block">
                        {BROKERS.find(b => b.id === app.brokerId)?.name.split(" ")[0] || app.brokerId}
                      </span>
                    ) : <span className="text-xs text-[#94A3B8]">—</span>}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#64748B]">{app.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setExpandedId(expandedId === app.id ? null : app.id)} className="p-1.5 rounded hover:bg-[#F5F7FA] text-[#64748B] hover:text-[#0B2E2E]"><Eye className="h-3.5 w-3.5" /></button>
                      {app.phone && <a href={`tel:${app.phone}`} className="p-1.5 rounded hover:bg-green-50 text-[#64748B] hover:text-green-600"><Phone className="h-3.5 w-3.5" /></a>}
                      {app.email && <a href={`mailto:${app.email}`} className="p-1.5 rounded hover:bg-blue-50 text-[#64748B] hover:text-blue-600"><Mail className="h-3.5 w-3.5" /></a>}
                      <button onClick={() => deleteApp(app.id)} className="p-1.5 rounded hover:bg-red-50 text-[#64748B] hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
                {expandedId === app.id && (
                  <tr key={app.id + "_exp"} className="border-t border-[#E2E8F0] bg-[#F5F7FA]">
                    <td colSpan={9} className="px-4 py-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-3">
                        {[
                          { label: "Bancă preferată", val: app.bank || "Fără preferință" },
                          { label: "Tip credit", val: app.type },
                          { label: "Sumă solicitată", val: `${app.amount.toLocaleString("ro-RO")} RON` },
                          { label: "Status curent", val: STATUS_LABELS[app.status]?.label || app.status },
                        ].map(r => (
                          <div key={r.label}>
                            <div className="font-semibold text-[#0B2E2E] mb-0.5">{r.label}</div>
                            <div className="text-[#64748B]">{r.val}</div>
                          </div>
                        ))}
                        {app.message && (
                          <div className="col-span-full">
                            <div className="font-semibold text-[#0B2E2E] mb-0.5">Mesaj client</div>
                            <div className="text-[#64748B]">{app.message}</div>
                          </div>
                        )}
                      </div>
                      {app.notes && app.notes.length > 0 && (
                        <div>
                          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Note broker</div>
                          <div className="space-y-1.5">
                            {app.notes.map((note, i) => (
                              <div key={i} className="bg-white rounded-lg px-3 py-2 border border-[#E2E8F0]">
                                <span className="font-semibold text-[#0B2E2E]">{note.author}:</span>{" "}
                                <span className="text-[#64748B]">{note.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-[#64748B]">Nicio aplicare în această categorie.</div>
        )}
      </div>
    </div>
  );
}

// ─── Guides ───────────────────────────────────────────────────────────────────
function GuidesTab({ guides, setGuides }: { guides: Guide[]; setGuides: (g: Guide[]) => void }) {
  const [editing, setEditing] = useState<Guide | null>(null);
  const [isNew, setIsNew] = useState(false);

  const emptyGuide: Guide = {
    slug: "", title: "", category: "CREDIT PERSONAL", excerpt: "", readTime: "5 min",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    date: new Date().toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" }),
  };

  const save = (g: Guide) => {
    if (isNew) {
      const slug = g.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      setGuides([...guides, { ...g, slug }]);
    } else {
      setGuides(guides.map(x => x.slug === g.slug ? g : x));
    }
    setEditing(null); setIsNew(false);
  };

  const del = (slug: string) => setGuides(guides.filter(g => g.slug !== slug));

  if (editing) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-sm text-[#64748B] hover:text-[#0B2E2E]">← Înapoi</button>
          <h1 className="text-2xl font-bold text-[#0B2E2E]">{isNew ? "Ghid nou" : "Editare ghid"}</h1>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 max-w-2xl">
          <div className="space-y-4">
            {[
              { key: "title" as keyof Guide, label: "Titlu" },
              { key: "category" as keyof Guide, label: "Categorie" },
              { key: "readTime" as keyof Guide, label: "Timp citire" },
              { key: "date" as keyof Guide, label: "Data" },
              { key: "image" as keyof Guide, label: "URL imagine" },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">{f.label}</label>
                <input type="text" value={String(editing[f.key])} onChange={e => setEditing({ ...editing, [f.key]: e.target.value })}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0B2E2E]" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">Rezumat</label>
              <textarea value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} rows={3}
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0B2E2E] resize-none" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => save(editing)} className="bg-[#0B2E2E] text-white font-semibold px-5 py-2 rounded-lg text-sm flex items-center gap-2">
                <Check className="h-4 w-4" /> Salvează
              </button>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="border border-[#E2E8F0] text-[#64748B] px-5 py-2 rounded-lg text-sm">Anulează</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0B2E2E]">Ghiduri</h1>
          <p className="text-sm text-[#64748B]">{guides.length} ghiduri publicate</p>
        </div>
        <button onClick={() => { setEditing(emptyGuide); setIsNew(true); }} className="flex items-center gap-2 bg-[#0B2E2E] text-white font-semibold px-4 py-2 rounded-lg text-sm">
          <Plus className="h-4 w-4" /> Ghid nou
        </button>
      </div>
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
        {guides.map((guide, i) => (
          <div key={guide.slug} className={`flex items-center gap-4 px-5 py-4 hover:bg-[#F5F7FA]/50 ${i > 0 ? "border-t border-[#E2E8F0]" : ""}`}>
            <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-[#E2E8F0]">
              <img src={guide.image} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[#0B2E2E] truncate">{guide.title}</div>
              <div className="text-xs text-[#64748B]">{guide.category} · {guide.date} · {guide.readTime} citire</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => { setEditing(guide); setIsNew(false); }} className="p-1.5 rounded hover:bg-[#F5F7FA] text-[#64748B] hover:text-[#0B2E2E]"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => del(guide.slug)} className="p-1.5 rounded hover:bg-red-50 text-[#64748B] hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
        {guides.length === 0 && <div className="py-12 text-center text-sm text-[#64748B]">Niciun ghid publicat.</div>}
      </div>
    </div>
  );
}

// ─── Insurance ────────────────────────────────────────────────────────────────
function InsuranceTab({ requests, setRequests }: { requests: InsuranceRequest[]; setRequests: (r: InsuranceRequest[]) => void }) {
  const [filter, setFilter] = useState("all");
  const updateStatus = (id: string, status: InsuranceRequest["status"]) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
  };
  const del = (id: string) => setRequests(requests.filter(r => r.id !== id));
  const filtered = filter === "all" ? requests : requests.filter(r => r.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#0B2E2E]">Cereri asigurări</h1>
          <p className="text-sm text-[#64748B]">{requests.length} cereri totale · {requests.filter(r => r.status === "pending").length} neprocesate</p>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        {[["all", "Toate"], ["pending", "Neprocesate"], ["contacted", "Contactate"], ["closed", "Închise"]].map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v)} className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${filter === v ? "bg-[#0B2E2E] text-white border-[#0B2E2E]" : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0B2E2E]"}`}>{l}</button>
        ))}
      </div>
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F7FA]">
            <tr>
              {["ID", "Solicitant", "Tip asigurare", "Status", "Data", "Contact", "Acțiuni"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(req => (
              <tr key={req.id} className={`border-t border-[#E2E8F0] hover:bg-[#F5F7FA]/50 ${req.status === "pending" ? "bg-amber-50/20" : ""}`}>
                <td className="px-4 py-3 text-xs font-mono text-[#64748B]">{req.id}</td>
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-[#0B2E2E]">{req.name}</div>
                  <div className="text-xs text-[#64748B]">{req.email}</div>
                </td>
                <td className="px-4 py-3 text-sm text-[#64748B]">{req.type}</td>
                <td className="px-4 py-3">
                  <select value={req.status} onChange={e => updateStatus(req.id, e.target.value as InsuranceRequest["status"])} className="text-xs border border-[#E2E8F0] rounded-lg px-2 py-1 bg-white focus:outline-none">
                    <option value="pending">În așteptare</option>
                    <option value="contacted">Contactat</option>
                    <option value="closed">Închis</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-xs text-[#64748B]">{req.date}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {req.phone && <a href={`tel:${req.phone}`} className="p-1 rounded hover:bg-green-50 text-[#64748B] hover:text-green-600"><Phone className="h-3.5 w-3.5" /></a>}
                    {req.email && <a href={`mailto:${req.email}`} className="p-1 rounded hover:bg-blue-50 text-[#64748B] hover:text-blue-600"><Mail className="h-3.5 w-3.5" /></a>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => del(req.id)} className="p-1.5 rounded hover:bg-red-50 text-[#64748B] hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-12 text-center text-sm text-[#64748B]">Nicio cerere în această categorie.</div>}
      </div>
    </div>
  );
}

// ─── Banks ────────────────────────────────────────────────────────────────────
function BanksTab({ banks, setBanks }: { banks: any[]; setBanks: (b: any[]) => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string | number>>({});

  const startEdit = (bank: any) => {
    setEditingId(bank.id);
    setEditValues({ name: bank.name, ratePersonal: bank.ratePersonal, rateIpotecar: bank.rateIpotecar, daePersonal: bank.daePersonal, daeIpotecar: bank.daeIpotecar, rating: bank.rating });
  };

  const saveEdit = (id: string) => {
    setBanks(banks.map((b: any) => b.id === id ? { ...b, ...editValues } : b));
    setEditingId(null);
  };

  const deleteBank = (id: string) => setBanks(banks.filter((b: any) => b.id !== id));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0B2E2E]">Bănci partenere</h1>
        <p className="text-sm text-[#64748B]">{banks.length} bănci configurate · Dobânzi actualizate 02.05.2026 · Click ✏️ pentru modificare</p>
      </div>
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F7FA]">
            <tr>
              {["Bancă", "D. personal", "D. ipotecar", "DAE pers.", "DAE ipot.", "Rating", "Acțiuni"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(banks as any[]).map((bank: any) => {
              const isEdit = editingId === bank.id;
              return (
                <tr key={bank.id} className="border-t border-[#E2E8F0] hover:bg-[#F5F7FA]/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0">
                        <img src={bank.logo} alt={bank.name} className="w-7 h-7 object-contain"
                          onError={e => {
                            const img = e.target as HTMLImageElement;
                            img.style.display = "none";
                            img.parentElement!.style.backgroundColor = bank.color;
                            img.parentElement!.innerHTML = `<span style="color:white;font-weight:700;font-size:8px">${bank.initials}</span>`;
                          }} />
                      </div>
                      <span className="text-sm font-medium text-[#0B2E2E]">{bank.name}</span>
                    </div>
                  </td>
                  {["ratePersonal", "rateIpotecar", "daePersonal", "daeIpotecar", "rating"].map(field => (
                    <td key={field} className="px-4 py-3">
                      {isEdit ? (
                        <input type="number" step="0.01" value={editValues[field] as number}
                          onChange={e => setEditValues(v => ({ ...v, [field]: parseFloat(e.target.value) || 0 }))}
                          className="w-20 border border-[#C49A20] rounded px-2 py-1 text-sm focus:outline-none" />
                      ) : (
                        <span className="text-sm text-[#0B2E2E]">{(bank[field] as number).toFixed(2)}{field === "rating" ? "" : "%"}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      {isEdit ? (
                        <>
                          <button onClick={() => saveEdit(bank.id)} className="p-1.5 rounded bg-green-50 text-green-600 hover:bg-green-100"><Check className="h-3.5 w-3.5" /></button>
                          <button onClick={() => setEditingId(null)} className="p-1.5 rounded bg-gray-50 text-gray-500 hover:bg-gray-100"><X className="h-3.5 w-3.5" /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(bank)} className="p-1.5 rounded hover:bg-[#F5F7FA] text-[#64748B] hover:text-[#0B2E2E]"><Pencil className="h-3.5 w-3.5" /></button>
                          <button onClick={() => deleteBank(bank.id)} className="p-1.5 rounded hover:bg-red-50 text-[#64748B] hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-xs text-[#64748B] flex items-center gap-1.5">
        <Star className="h-3 w-3 text-[#C49A20]" />
        Dobânzile afișate pe site se actualizează automat la salvare.
      </div>
    </div>
  );
}

// ─── Utilizatori ──────────────────────────────────────────────────────────────
function UsersTab({ applications }: { applications: Application[] }) {
  const uniqueClients = Array.from(
    new Map(applications.filter(a => a.email).map(a => [a.email, a])).values()
  );
  const [search, setSearch] = useState("");
  const filteredClients = uniqueClients.filter(client =>
    [client.name, client.email, client.phone, client.bank, client.brokerId].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0B2E2E]">Utilizatori</h1>
          <p className="text-sm text-[#64748B]">{uniqueClients.length} clienți unici în sistem</p>
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Caută client..."
          className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0B2E2E] w-56"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Clienți înregistrați", value: uniqueClients.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Conturi broker active", value: Object.keys(BROKER_ACCOUNTS).length, icon: UserCheck, color: "text-[#0B2E2E]", bg: "bg-[#0B2E2E]/8" },
          { label: "Super admini", value: 1, icon: Key, color: "text-[#C49A20]", bg: "bg-[#C49A20]/10" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-[#64748B] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Broker accounts */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <h3 className="font-semibold text-[#0B2E2E]">Conturi broker</h3>
            <span className="text-xs text-[#64748B]">{Object.keys(BROKER_ACCOUNTS).length} active</span>
          </div>
          {Object.entries(BROKER_ACCOUNTS).map(([email, acc]) => {
            const broker = BROKERS.find(b => b.id === acc.brokerId);
            const myApps = applications.filter(a => a.brokerId === acc.brokerId);
            return (
              <div key={email} className="px-5 py-4 border-b border-[#F5F7FA] last:border-0 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: broker?.color || "#0B2E2E" }}>
                  {broker?.avatar || acc.name.slice(0,2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#0B2E2E]">{acc.name}</div>
                  <div className="text-xs text-[#64748B] truncate">{email}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-[#0B2E2E]">{myApps.length}</div>
                  <div className="text-[10px] text-[#64748B]">dosare</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" title="Activ" />
              </div>
            );
          })}
        </div>

        {/* Clienți recenți */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E2E8F0]">
            <h3 className="font-semibold text-[#0B2E2E]">Clienți recenți</h3>
          </div>
          {filteredClients.slice(0, 8).map(client => {
            const clientApps = applications.filter(a => a.email === client.email);
            return (
              <div key={client.email} className="px-5 py-3 border-b border-[#F5F7FA] last:border-0 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-center text-xs font-bold text-[#0B2E2E] shrink-0">
                  {client.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#0B2E2E]">{client.name}</div>
                  <div className="text-xs text-[#64748B] truncate">{client.email}</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${STATUS_LABELS[clientApps[0]?.status]?.color || "bg-gray-100 text-gray-600"}`}>
                  {clientApps.length} dosar{clientApps.length !== 1 ? "e" : ""}
                </span>
              </div>
            );
          })}
          {filteredClients.length === 0 && (
            <div className="py-12 text-center text-sm text-[#64748B]">Niciun utilizator găsit.</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Brokeri ──────────────────────────────────────────────────────────────────
function BrokeriTab({ applications }: { applications: Application[] }) {
  const [selected, setSelected] = useState<string | "all">("all");
  const [search, setSearch] = useState("");
  const brokerRows = BROKERS.map(broker => {
    const myApps = applications.filter(a => a.brokerId === broker.id);
    const approved = myApps.filter(a => a.status === "approved");
    const pending = myApps.filter(a => a.status === "pending");
    const inReview = myApps.filter(a => a.status === "in_review" || a.status === "contacted");
    const totalApproved = approved.reduce((s, a) => s + a.amount, 0);
    const accountEmail = Object.entries(BROKER_ACCOUNTS).find(([, v]) => v.brokerId === broker.id)?.[0];
    return { broker, myApps, approved, pending, inReview, totalApproved, accountEmail };
  });
  const filteredRows = brokerRows.filter(row =>
    (selected === "all" || row.broker.id === selected) &&
    [row.broker.name, row.accountEmail, row.broker.specialization].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0B2E2E]">Performanță Brokeri</h1>
        <p className="text-sm text-[#64748B]">Statistici individuale și portofoliu per broker</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Caută broker..."
          className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0B2E2E] w-56" />
        {(["all", ...BROKERS.map(b => b.id)] as const).map(id => (
          <button key={id} onClick={() => setSelected(id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${selected === id ? "bg-[#0B2E2E] text-white border-[#0B2E2E]" : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0B2E2E]"}`}>
            {id === "all" ? "Toți brokerii" : BROKERS.find(b => b.id === id)?.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredRows.map(({ broker, myApps, approved, pending, inReview, totalApproved, accountEmail }) => {
          const approvalRate = myApps.length ? Math.round((approved.length / myApps.length) * 100) : 0;
          return (
            <div key={broker.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-lg font-bold shrink-0"
                  style={{ backgroundColor: broker.color }}>
                  {broker.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-[#0B2E2E]">{broker.name}</h3>
                    <span className="text-xs text-[#64748B] bg-[#F5F7FA] px-2 py-0.5 rounded">{broker.specialization}</span>
                    <div className="flex items-center gap-0.5 ml-auto">
                      {[1,2,3,4,5].map(s => <Star key={s} className={`h-3.5 w-3.5 ${s <= broker.rating ? "text-[#C49A20] fill-[#C49A20]" : "text-[#E2E8F0]"}`} />)}
                    </div>
                  </div>
                  <div className="text-xs text-[#64748B] mt-0.5">{accountEmail} · {broker.phone}</div>
                  <div className="text-xs text-[#64748B]">{broker.experience}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { label: "Total dosare", value: myApps.length, color: "text-blue-600" },
                  { label: "Aprobate", value: approved.length, color: "text-green-600" },
                  { label: "În lucru", value: inReview.length, color: "text-purple-600" },
                  { label: "În așteptare", value: pending.length, color: "text-amber-600" },
                  { label: "Rată succes", value: `${approvalRate}%`, color: "text-[#0B2E2E]" },
                ].map(s => (
                  <div key={s.label} className="bg-[#F5F7FA] rounded-xl p-3 text-center">
                    <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-[10px] text-[#64748B] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {totalApproved > 0 && (
                <div className="mt-3 flex items-center gap-2 text-xs text-[#64748B]">
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                  Volum aprobat: <strong className="text-[#0B2E2E]">{(totalApproved / 1000).toFixed(0)}k RON</strong>
                </div>
              )}

              {/* Progress bar aplicări */}
              {myApps.length > 0 && (
                <div className="mt-3 h-2 bg-[#E2E8F0] rounded-full overflow-hidden flex">
                  <div className="h-full bg-green-500 transition-all" style={{ width: `${(approved.length / myApps.length) * 100}%` }} />
                  <div className="h-full bg-blue-400 transition-all" style={{ width: `${(inReview.length / myApps.length) * 100}%` }} />
                  <div className="h-full bg-amber-400 transition-all" style={{ width: `${(pending.length / myApps.length) * 100}%` }} />
                </div>
              )}
            </div>
          );
        })}
        {filteredRows.length === 0 && <div className="py-12 text-center text-sm text-[#64748B]">Niciun broker găsit.</div>}
      </div>
    </div>
  );
}

// ─── Conținut site ────────────────────────────────────────────────────────────
function ContentTab({ settings, setSettings }: { settings: SiteSettings; setSettings: (s: SiteSettings) => void }) {
  const [local, setLocal] = useState<SiteSettings>({ ...settings });
  const [saved, setSaved] = useState(false);
  const preview = useMemo(() => ({
    label: local.announcementColor === "gold" ? "Auriu" : local.announcementColor === "teal" ? "Teal" : local.announcementColor === "red" ? "Roșu" : "Verde",
  }), [local.announcementColor]);

  const save = () => {
    setSettings(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0B2E2E]">Conținut site</h1>
          <p className="text-sm text-[#64748B]">Modifică setările și conținutul afișat pe site</p>
        </div>
        <button onClick={save} className={`flex items-center gap-2 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors ${saved ? "bg-green-600 text-white" : "bg-[#0B2E2E] text-white hover:bg-[#0B2E2E]/80"}`}>
          {saved ? <><Check className="h-4 w-4" /> Salvat!</> : <><Check className="h-4 w-4" /> Salvează modificările</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IRCC & Dobânzi */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#0B2E2E]/8 flex items-center justify-center">
              <BarChart2 className="h-4 w-4 text-[#0B2E2E]" />
            </div>
            <h3 className="font-semibold text-[#0B2E2E]">Valori afișate pe site</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">IRCC afișat (ex: 5.58%)</label>
              <input type="text" value={local.irccValue} onChange={e => setLocal(l => ({ ...l, irccValue: e.target.value }))}
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0B2E2E]" />
              <p className="text-xs text-[#94A3B8] mt-1">Afișat în calculatoare și bannerele informative</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">Notă footer</label>
              <input type="text" value={local.footerNote} onChange={e => setLocal(l => ({ ...l, footerNote: e.target.value }))}
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0B2E2E]" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <Globe className="h-4 w-4 text-green-600" />
            </div>
            <h3 className="font-semibold text-[#0B2E2E]">Stare site</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between"><span>Înregistrări noi</span><strong>{local.allowNewRegistrations ? "Active" : "Oprite"}</strong></div>
            <div className="flex items-center justify-between"><span>Mentenanță</span><strong>{local.maintenanceMode ? "Pornită" : "Oprită"}</strong></div>
            <div className="flex items-center justify-between"><span>Banner</span><strong>{local.announcementActive ? "Activ" : "Inactiv"}</strong></div>
            <div className="flex items-center justify-between"><span>Culoare banner</span><strong>{preview.label}</strong></div>
          </div>
        </div>

        {/* Banner anunț */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#C49A20]/10 flex items-center justify-center">
              <Megaphone className="h-4 w-4 text-[#C49A20]" />
            </div>
            <h3 className="font-semibold text-[#0B2E2E]">Banner anunț site</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#0B2E2E]">Banner activ</span>
              <button onClick={() => setLocal(l => ({ ...l, announcementActive: !l.announcementActive }))}
                className={`w-12 h-6 rounded-full transition-colors relative ${local.announcementActive ? "bg-green-500" : "bg-[#E2E8F0]"}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${local.announcementActive ? "translate-x-6" : "translate-x-0.5"}`} />
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">Text banner</label>
              <textarea value={local.announcementText} onChange={e => setLocal(l => ({ ...l, announcementText: e.target.value }))} rows={3}
                placeholder="ex: IRCC T2 2026 a scăzut la 5.58% — refinanțați acum!"
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0B2E2E] resize-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">Culoare banner</label>
              <div className="flex gap-2">
                {([["gold", "bg-[#C49A20]", "Auriu"], ["teal", "bg-[#0B2E2E]", "Verde"], ["red", "bg-red-600", "Roșu"], ["green", "bg-green-600", "Verde deschis"]] as const).map(([val, cls, lbl]) => (
                  <button key={val} onClick={() => setLocal(l => ({ ...l, announcementColor: val }))}
                    className={`flex-1 py-2 rounded-lg text-white text-xs font-semibold ${cls} ${local.announcementColor === val ? "ring-2 ring-offset-1 ring-[#0B2E2E]" : "opacity-60"}`}>
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
            {local.announcementActive && local.announcementText && (
              <div className={`rounded-xl px-4 py-3 text-white text-sm font-medium ${local.announcementColor === "gold" ? "bg-[#C49A20]" : local.announcementColor === "teal" ? "bg-[#0B2E2E]" : local.announcementColor === "red" ? "bg-red-600" : "bg-green-600"}`}>
                <Megaphone className="h-4 w-4 inline mr-2" />
                {local.announcementText}
              </div>
            )}
          </div>
        </div>

        {/* Setări sistem */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Settings className="h-4 w-4 text-blue-600" />
            </div>
            <h3 className="font-semibold text-[#0B2E2E]">Setări sistem</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: "allowNewRegistrations" as keyof SiteSettings, label: "Permite înregistrări noi", desc: "Dacă este dezactivat, clienții noi nu se pot înregistra" },
              { key: "maintenanceMode" as keyof SiteSettings, label: "Mod mentenanță", desc: "Afișează o pagină de mentenanță vizitatorilor" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium text-[#0B2E2E]">{label}</div>
                  <div className="text-xs text-[#94A3B8]">{desc}</div>
                </div>
                <button onClick={() => setLocal(l => ({ ...l, [key]: !l[key] }))}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${local[key] ? "bg-green-500" : "bg-[#E2E8F0]"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${local[key] ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Previzualizare */}
        <div className="bg-[#0B2E2E] rounded-xl p-5 text-white">
          <div className="text-xs font-bold text-[#C49A20] uppercase tracking-wider mb-1">Previzualizare banner</div>
          <div className="text-sm text-gray-400 mb-4">Aspect curent dacă banner-ul este activ</div>
          {local.announcementActive && local.announcementText ? (
            <div className={`rounded-xl px-4 py-3 text-sm font-medium ${local.announcementColor === "gold" ? "bg-[#C49A20] text-[#0B2E2E]" : local.announcementColor === "teal" ? "bg-white/10" : local.announcementColor === "red" ? "bg-red-500" : "bg-green-600"}`}>
              {local.announcementText}
            </div>
          ) : (
            <div className="bg-white/10 rounded-xl px-4 py-3 text-sm text-gray-500 italic">
              Niciun banner activ. Activează și completează textul.
            </div>
          )}
          <div className="mt-4 text-xs text-gray-400">
            IRCC afișat: <strong className="text-[#C49A20]">{local.irccValue}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Securitate ───────────────────────────────────────────────────────────────
function SecurityTab() {
  const auditLog: AuditEvent[] = getAuditLog().reverse().slice(0, 50);

  const stats = {
    total: auditLog.length,
    success: auditLog.filter(e => e.type === "login_success").length,
    failed: auditLog.filter(e => e.type === "login_fail").length,
    locked: auditLog.filter(e => e.type === "lockout").length,
  };

  const EVENT_META: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    login_success: { label: "Autentificare reușită", color: "text-green-600 bg-green-50", icon: CheckCircle },
    login_fail:    { label: "Autentificare eșuată",  color: "text-red-600 bg-red-50",   icon: AlertTriangle },
    logout:        { label: "Deconectare",            color: "text-gray-600 bg-gray-100", icon: LogOut },
    lockout:       { label: "Cont blocat",            color: "text-red-700 bg-red-100",  icon: Lock },
  };

  const clearLog = () => {
    localStorage.removeItem("finexperts_audit");
    window.location.reload();
  };
  const loginFails = auditLog.filter(e => e.type === "login_fail");
  const recentUsers = Array.from(new Set(auditLog.filter(e => e.type === "login_success").map(e => e.email))).slice(0, 8);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0B2E2E]">Securitate cibernetică</h1>
          <p className="text-sm text-[#64748B]">Jurnal de securitate și configurare autentificare</p>
        </div>
        <button onClick={clearLog} className="flex items-center gap-1.5 text-xs border border-red-200 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors">
          <Trash2 className="h-3.5 w-3.5" /> Șterge jurnal
        </button>
      </div>

      {/* Security stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Evenimente totale", value: stats.total, color: "text-blue-600", bg: "bg-blue-50", icon: Activity },
          { label: "Autentificări reușite", value: stats.success, color: "text-green-600", bg: "bg-green-50", icon: CheckCircle },
          { label: "Tentative eșuate", value: stats.failed, color: "text-amber-600", bg: "bg-amber-50", icon: AlertTriangle },
          { label: "Conturi blocate", value: stats.locked, color: "text-red-600", bg: "bg-red-50", icon: UserX },
        ].map(s => (
          <div key={s.label} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
            <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-[#64748B] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
          <h3 className="font-semibold text-[#0B2E2E] mb-3">Conturi cu ultimele autentificări</h3>
          <div className="space-y-2">
            {recentUsers.length > 0 ? recentUsers.map(email => (
              <div key={email} className="flex items-center justify-between text-sm">
                <span className="text-[#0B2E2E] truncate">{email}</span>
                <span className="text-xs text-[#64748B]">activ</span>
              </div>
            )) : <div className="text-sm text-[#64748B]">Fără date.</div>}
          </div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
          <h3 className="font-semibold text-[#0B2E2E] mb-3">Tentative eșuate recente</h3>
          <div className="space-y-2">
            {loginFails.slice(0, 5).map(ev => (
              <div key={`${ev.ts}-${ev.email}`} className="flex items-center justify-between text-sm">
                <span className="text-[#0B2E2E] truncate">{ev.email}</span>
                <span className="text-xs text-red-600">{new Date(ev.ts).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            ))}
            {loginFails.length === 0 && <div className="text-sm text-[#64748B]">Fără tentative eșuate.</div>}
          </div>
        </div>
      </div>

      {/* Politici de securitate active */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-[#0B2E2E] mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-green-600" /> Politici de securitate active
        </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: "Blocare după 5 tentative eșuate", detail: "Durata blocării: 15 minute", active: true },
            { label: "Sesiune cu expirare automată", detail: "Sesiune expirată după 8 ore de inactivitate", active: true },
            { label: "Audit log autentificări", detail: "Ultimele 200 evenimente stocate local", active: true },
            { label: "Toggle vizibilitate parolă", detail: "Previne shoulder surfing", active: true },
            { label: "Validare format email", detail: "Format email verificat la autentificare", active: true },
            { label: "Parole complexe brokeri", detail: "Minimum 8 caractere, majuscule, simboluri", active: true },
            { label: "CSRF Protection", detail: "SameSite cookie policy", active: true },
            { label: "Content Security Policy", detail: "Configurată în vite.config", active: true },
          ].map(p => (
            <div key={p.label} className="flex items-start gap-3 p-3 bg-[#F5F7FA] rounded-xl">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${p.active ? "bg-green-100" : "bg-red-100"}`}>
                {p.active ? <Check className="h-3 w-3 text-green-600" /> : <X className="h-3 w-3 text-red-600" />}
              </div>
              <div>
                <div className="text-sm font-medium text-[#0B2E2E]">{p.label}</div>
                <div className="text-xs text-[#64748B]">{p.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Jurnal audit */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
          <h3 className="font-semibold text-[#0B2E2E]">Jurnal de securitate</h3>
          <span className="text-xs text-[#64748B]">{auditLog.length} evenimente</span>
        </div>
        {auditLog.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#64748B]">
            <Activity className="h-10 w-10 mx-auto mb-2 opacity-30" />
            Niciun eveniment înregistrat. Încearcă să te autentifici pentru a genera date.
          </div>
        ) : (
          <div className="divide-y divide-[#F5F7FA]">
            {auditLog.map((ev, i) => {
              const meta = EVENT_META[ev.type] || EVENT_META.login_fail;
              const Icon = meta.icon;
              return (
                <div key={i} className="px-5 py-3 flex items-center gap-4">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${meta.color.split(" ")[1]}`}>
                    <Icon className={`h-3.5 w-3.5 ${meta.color.split(" ")[0]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-[#0B2E2E]">{meta.label}</span>
                      <span className="text-xs text-[#64748B] font-mono truncate">{ev.email}</span>
                    </div>
                  </div>
                  <div className="text-xs text-[#94A3B8] shrink-0">
                    {new Date(ev.ts).toLocaleString("ro-RO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${meta.color}`}>{ev.type.replace("_", " ")}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
