import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useStore, Application, InsuranceRequest, Guide } from "@/lib/store";
import { banks as defaultBanks } from "@/lib/data";
import {
  LayoutDashboard, FileText, BookOpen, Shield, Building2,
  LogOut, ChevronDown, ChevronUp, Trash2, Plus, Pencil, Check, X, Eye,
  BarChart2, Users, Bell, Phone, Mail, TrendingUp, TrendingDown, Calendar,
  Download, MessageSquare, Star, ArrowRight, Clock, RefreshCw, Zap, Info
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

type Tab = "dashboard" | "statistici" | "aplicari" | "ghiduri" | "asigurari" | "banci";

export default function AdminPage() {
  const { user, isAdmin, logout } = useAuth();
  const [, setLocation] = useLocation();
  const {
    applications, setApplications,
    insuranceRequests, setInsuranceRequests,
    guides, setGuides,
    adminBanks, setAdminBanks,
  } = useStore();

  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-10 text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <X className="h-7 w-7 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-[#0B2E2E] mb-2">Acces restricționat</h2>
          <p className="text-sm text-[#64748B] mb-5">Trebuie să fii autentificat ca administrator pentru a accesa această pagină.</p>
          <button onClick={() => setLocation("/login")} className="bg-[#0B2E2E] text-white font-semibold px-6 py-2.5 rounded-lg text-sm">Conectare</button>
        </div>
      </div>
    );
  }

  const handleLogout = () => { logout(); setLocation("/"); };

  const navItems: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "statistici", label: "Statistici", icon: BarChart2 },
    { id: "aplicari", label: "Aplicări credit", icon: FileText, count: applications.filter(a => a.status === "pending").length },
    { id: "ghiduri", label: "Ghiduri", icon: BookOpen, count: guides.length },
    { id: "asigurari", label: "Asigurări", icon: Shield, count: insuranceRequests.filter(r => r.status === "pending").length },
    { id: "banci", label: "Bănci", icon: Building2, count: adminBanks.length },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B2E2E] min-h-screen flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10">
          <div className="text-xs font-bold text-[#C49A20] uppercase tracking-wider mb-0.5">FinExperts</div>
          <div className="text-sm text-white font-semibold">Panou Admin</div>
        </div>
        <nav className="flex-1 p-3">
          {navItems.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
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
        {activeTab === "aplicari" && <ApplicationsTab applications={applications} setApplications={setApplications} />}
        {activeTab === "ghiduri" && <GuidesTab guides={guides} setGuides={setGuides} />}
        {activeTab === "asigurari" && <InsuranceTab requests={insuranceRequests} setRequests={setInsuranceRequests} />}
        {activeTab === "banci" && <BanksTab banks={adminBanks} setBanks={setAdminBanks} />}
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
          <p className="text-sm text-[#64748B]">Bun venit, {applications.length > 0 ? `ai ${pending.length} aplicări de procesat` : "totul este la zi"}</p>
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
          <div className="text-3xl font-bold text-green-400">↘</div>
          <div className="text-[10px] text-green-400 font-semibold">trending down</div>
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
          {/* Activitate */}
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

          {/* Acțiuni rapide */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
            <h3 className="font-semibold text-[#0B2E2E] text-sm mb-3">Acțiuni rapide</h3>
            <div className="space-y-2">
              {[
                { label: "Procesează aplicări în așteptare", count: pending.length, color: "text-amber-600", tab: "aplicari" as Tab },
                { label: "Procesează asigurări", count: insuranceRequests.filter(r => r.status === "pending").length, color: "text-purple-600", tab: "asigurari" as Tab },
                { label: "Actualizează dobânzile", count: null, color: "text-blue-600", tab: "banci" as Tab },
                { label: "Adaugă ghid nou", count: null, color: "text-green-600", tab: "ghiduri" as Tab },
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

          {/* In review */}
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

      {/* KPI row */}
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
        {/* Status breakdown — recharts BarChart */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
          <h3 className="font-semibold text-[#0B2E2E] mb-1">Status aplicări</h3>
          <p className="text-xs text-[#64748B] mb-4">Distribuție după starea dosarului</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={statusData} barCategoryGap="30%" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#64748B" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                formatter={(v: number) => [v, "Aplicări"]}
                contentStyle={{ fontSize: 11, border: "1px solid #E2E8F0", borderRadius: 8 }}
                cursor={{ fill: "#F4F6FB" }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {statusData.map((s, i) => (
                  <Cell key={i} fill={["#F59E0B", "#3B82F6", "#10B981", "#EF4444", "#8B5CF6"][i % 5]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {statusData.map((s, i) => (
              <div key={s.label} className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: ["#F59E0B", "#3B82F6", "#10B981", "#EF4444", "#8B5CF6"][i % 5] }} />
                {s.label}: <strong className="text-[#0B2E2E]">{s.count}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* By type — recharts BarChart */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
          <h3 className="font-semibold text-[#0B2E2E] mb-1">Aplicări pe tip de credit</h3>
          <p className="text-xs text-[#64748B] mb-4">Total vs. aprobate</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={byType.map(t => ({
                name: t.type === "refinantare" ? "Refinanțare" : t.type === "personal" ? "Personal" : "Ipotecar",
                total: t.count,
                aprobate: t.approved,
              }))}
              barCategoryGap="30%"
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748B" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ fontSize: 11, border: "1px solid #E2E8F0", borderRadius: 8 }} cursor={{ fill: "#F4F6FB" }} />
              <Bar dataKey="total" name="Total" fill="#0B2E2E" radius={[4, 4, 0, 0]} />
              <Bar dataKey="aprobate" name="Aprobate" fill="#C49A20" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-[#64748B]"><span className="w-2.5 h-2.5 rounded-sm bg-[#0B2E2E] inline-block" /> Total</div>
            <div className="flex items-center gap-1.5 text-xs text-[#64748B]"><span className="w-2.5 h-2.5 rounded-sm bg-[#C49A20] inline-block" /> Aprobate</div>
          </div>
        </div>
      </div>

      {/* Top bănci */}
      {topBanks.length > 0 && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-[#0B2E2E] mb-4">Top bănci solicitate</h3>
          <div className="space-y-3">
            {topBanks.map(([bank, count], i) => (
              <div key={bank} className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#64748B] w-4">{i + 1}</span>
                <span className="text-sm text-[#0B2E2E] w-32">{bank}</span>
                <div className="flex-1 h-2 bg-[#F5F7FA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#C49A20] rounded-full" style={{ width: `${(count / maxBankCount) * 100}%` }} />
                </div>
                <span className="text-sm font-semibold text-[#0B2E2E] w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {applications.length === 0 && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-16 text-center">
          <BarChart2 className="h-12 w-12 text-[#E2E8F0] mx-auto mb-3" />
          <p className="text-sm text-[#64748B]">Nu există date suficiente pentru statistici. Adaugă aplicări pentru a vedea rapoarte.</p>
        </div>
      )}
    </div>
  );
}

// ─── Applications ─────────────────────────────────────────────────────────────
function ApplicationsTab({ applications, setApplications }: { applications: Application[]; setApplications: (a: Application[]) => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  let filtered = filter === "all" ? applications : applications.filter(a => a.status === filter);
  if (search) filtered = filtered.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.email?.toLowerCase().includes(search.toLowerCase()));

  const updateStatus = (id: string, status: Application["status"]) => {
    setApplications(applications.map(a => a.id === id ? { ...a, status } : a));
  };

  const deleteApp = (id: string) => {
    setApplications(applications.filter(a => a.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#0B2E2E]">Aplicări credit</h1>
          <p className="text-sm text-[#64748B]">{applications.length} aplicări totale</p>
        </div>
        <button onClick={() => {
          const csv = ["ID,Nume,Email,Telefon,Tip,Suma,Banca,Status,Data",
            ...applications.map(a => `${a.id},${a.name},${a.email || ""},${a.phone || ""},${a.type},${a.amount},${a.bank || ""},${a.status},${a.date}`)
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
              {["ID", "Solicitant", "Tip", "Sumă", "Bancă", "Status", "Data", "Acțiuni"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((app, idx) => (
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
                    <select value={app.status} onChange={e => updateStatus(app.id, e.target.value as Application["status"])} className="text-xs border border-[#E2E8F0] rounded-lg px-2 py-1 bg-white focus:outline-none">
                      <option value="pending">În așteptare</option>
                      <option value="in_review">În analiză</option>
                      <option value="approved">Aprobat</option>
                      <option value="rejected">Respins</option>
                      <option value="contacted">Contactat</option>
                      <option value="closed">Închis</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#64748B]">{app.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setExpandedId(expandedId === app.id ? null : app.id)} className="p-1.5 rounded hover:bg-[#F5F7FA] text-[#64748B] hover:text-[#0B2E2E]" title="Detalii">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      {app.phone && (
                        <a href={`tel:${app.phone}`} className="p-1.5 rounded hover:bg-green-50 text-[#64748B] hover:text-green-600" title="Sună">
                          <Phone className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {app.email && (
                        <a href={`mailto:${app.email}`} className="p-1.5 rounded hover:bg-blue-50 text-[#64748B] hover:text-blue-600" title="Email">
                          <Mail className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <button onClick={() => deleteApp(app.id)} className="p-1.5 rounded hover:bg-red-50 text-[#64748B] hover:text-red-600" title="Șterge">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedId === app.id && (
                  <tr key={app.id + "_exp"} className="border-t border-[#E2E8F0] bg-[#F5F7FA]">
                    <td colSpan={8} className="px-4 py-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
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
    setEditing(null);
    setIsNew(false);
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
              { key: "title" as keyof Guide, label: "Titlu", type: "text" },
              { key: "category" as keyof Guide, label: "Categorie", type: "text" },
              { key: "readTime" as keyof Guide, label: "Timp citire", type: "text" },
              { key: "date" as keyof Guide, label: "Data", type: "text" },
              { key: "image" as keyof Guide, label: "URL imagine", type: "text" },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">{f.label}</label>
                <input type={f.type} value={String(editing[f.key])} onChange={e => setEditing({ ...editing, [f.key]: e.target.value })}
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
              <button onClick={() => { setEditing(guide); setIsNew(false); }} className="p-1.5 rounded hover:bg-[#F5F7FA] text-[#64748B] hover:text-[#0B2E2E]">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => del(guide.slug)} className="p-1.5 rounded hover:bg-red-50 text-[#64748B] hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
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
          <button key={v} onClick={() => setFilter(v)} className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${filter === v ? "bg-[#0B2E2E] text-white border-[#0B2E2E]" : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0B2E2E]"}`}>
            {l}
          </button>
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
                    {req.phone && <a href={`tel:${req.phone}`} className="p-1 rounded hover:bg-green-50 text-[#64748B] hover:text-green-600" title="Sună"><Phone className="h-3.5 w-3.5" /></a>}
                    {req.email && <a href={`mailto:${req.email}`} className="p-1 rounded hover:bg-blue-50 text-[#64748B] hover:text-blue-600" title="Email"><Mail className="h-3.5 w-3.5" /></a>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => del(req.id)} className="p-1.5 rounded hover:bg-red-50 text-[#64748B] hover:text-red-600">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-[#64748B]">Nicio cerere în această categorie.</div>
        )}
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
    setEditValues({
      name: bank.name,
      ratePersonal: bank.ratePersonal,
      rateIpotecar: bank.rateIpotecar,
      daePersonal: bank.daePersonal,
      daeIpotecar: bank.daeIpotecar,
      rating: bank.rating,
    });
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
                        <img src={bank.logo} alt={bank.name}
                          className="w-7 h-7 object-contain"
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
