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

type ClientAccount = { name: string; password: string };

type Tab = "dashboard" | "statistici" | "aplicari" | "ghiduri" | "asigurari" | "banci" | "utilizatori" | "brokeri" | "continut" | "securitate";

function getClientAccounts() {
  try {
    return JSON.parse(localStorage.getItem("finexperts_client_accounts") || "{}") as Record<string, ClientAccount>;
  } catch {
    return {};
  }
}

function getRegisteredClientUsers() {
  const accounts = getClientAccounts();
  return Object.entries(accounts).map(([email, account]) => ({
    email,
    name: account.name,
    source: "client_accounts" as const,
  }));
}

function getKnownApplicationUsers(apps: Application[]) {
  const map = new Map<string, { email: string; name: string; source: "applications" | "client_accounts" }>();
  for (const app of apps) {
    if (!map.has(app.email)) map.set(app.email, { email: app.email, name: app.name, source: "applications" });
  }
  for (const user of getRegisteredClientUsers()) {
    if (!map.has(user.email)) map.set(user.email, user);
  }
  return [...map.values()];
}

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
  const clientUsers = getKnownApplicationUsers(applications);

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
        {activeTab === "utilizatori" && <UsersTab applications={applications} clientUsers={clientUsers} />}
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
        </div>
      </div>
    </div>
  );
}

function UsersTab({ applications, clientUsers }: { applications: Application[]; clientUsers: Array<{ email: string; name: string; source: string }> }) {
  const users = [...clientUsers, ...applications.map(app => ({ email: app.email, name: app.name, source: "applications" }))]
    .filter((user, index, arr) => arr.findIndex(u => u.email === user.email) === index);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0B2E2E]">Utilizatori</h1>
        <p className="text-sm text-[#64748B]">Conturi client și cereri asociate</p>
      </div>
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F7FA]">
            <tr>
              {["Nume", "Email", "Sursă"].map(h => <th key={h} className="text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider px-4 py-3">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.email} className="border-t border-[#E2E8F0]">
                <td className="px-4 py-3 text-sm text-[#0B2E2E] font-medium">{u.name}</td>
                <td className="px-4 py-3 text-sm text-[#64748B]">{u.email}</td>
                <td className="px-4 py-3 text-xs text-[#64748B]">{u.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <div className="py-12 text-center text-sm text-[#64748B]">Niciun utilizator găsit.</div>}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_LABELS[status] || { label: status, color: "bg-gray-100 text-gray-600" };
  return <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${s.color}`}>{s.label}</span>;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "În așteptare", color: "bg-amber-100 text-amber-700" },
  in_review: { label: "În analiză", color: "bg-blue-100 text-blue-700" },
  approved: { label: "Aprobat", color: "bg-green-100 text-green-700" },
  rejected: { label: "Respins", color: "bg-red-100 text-red-700" },
  contacted: { label: "Contactat", color: "bg-purple-100 text-purple-700" },
  closed: { label: "Închis", color: "bg-gray-100 text-gray-600" },
};

function StatisticsTab({ applications, insuranceRequests }: { applications: Application[]; insuranceRequests: InsuranceRequest[] }) {
  const pending = applications.filter(a => a.status === "pending");
  const approved = applications.filter(a => a.status === "approved");
  const inReview = applications.filter(a => a.status === "in_review");
  const totalAmount = applications.reduce((s, a) => s + a.amount, 0);
  const avgAmount = applications.length ? Math.round(totalAmount / applications.length) : 0;
  const approvalRate = applications.length ? Math.round((approved.length / applications.length) * 100) : 0;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <h2 className="text-xl font-bold text-[#0B2E2E] mb-4">Statistici</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-lg border border-[#E2E8F0] p-4"><div className="text-2xl font-bold text-[#0B2E2E]">{applications.length}</div><div className="text-xs text-[#64748B]">Aplicări totale</div></div>
        <div className="rounded-lg border border-[#E2E8F0] p-4"><div className="text-2xl font-bold text-[#0B2E2E]">{pending.length}</div><div className="text-xs text-[#64748B]">În așteptare</div></div>
        <div className="rounded-lg border border-[#E2E8F0] p-4"><div className="text-2xl font-bold text-[#0B2E2E]">{approved.length}</div><div className="text-xs text-[#64748B]">Aprobate</div></div>
        <div className="rounded-lg border border-[#E2E8F0] p-4"><div className="text-2xl font-bold text-[#0B2E2E]">{insuranceRequests.length}</div><div className="text-xs text-[#64748B]">Asigurări</div></div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
        <div className="rounded-lg border border-[#E2E8F0] p-4"><div className="text-2xl font-bold text-[#0B2E2E]">{inReview.length}</div><div className="text-xs text-[#64748B]">În analiză</div></div>
        <div className="rounded-lg border border-[#E2E8F0] p-4"><div className="text-2xl font-bold text-[#0B2E2E]">{approved.length ? approved.length : 0}</div><div className="text-xs text-[#64748B]">Respinse</div></div>
        <div className="rounded-lg border border-[#E2E8F0] p-4"><div className="text-2xl font-bold text-[#0B2E2E]">{approvalRate}%</div><div className="text-xs text-[#64748B]">Rată aprobare</div></div>
        <div className="rounded-lg border border-[#E2E8F0] p-4"><div className="text-2xl font-bold text-[#0B2E2E]">{Math.round(avgAmount / 1000)}k</div><div className="text-xs text-[#64748B]">Sumă medie</div></div>
      </div>
    </div>
  );
}
function ApplicationsTab({ applications, setApplications, updateApplication }: { applications: Application[]; setApplications: (a: Application[]) => void; updateApplication: (id: string, updates: Partial<Application>) => void; }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <h2 className="text-xl font-bold text-[#0B2E2E] mb-4">Aplicări</h2>
      <div className="space-y-3">
        {applications.slice(0, 8).map(app => (
          <div key={app.id} className="border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-[#0B2E2E]">{app.name}</div>
              <div className="text-sm text-[#64748B]">{app.email} · {app.amount.toLocaleString("ro-RO")} RON</div>
              <div className="text-xs text-[#64748B]">{app.type} · {app.date}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => updateApplication(app.id, { status: "approved" })} className="px-3 py-2 rounded-lg bg-green-50 text-green-700 text-sm font-semibold">Aprobă</button>
              <button onClick={() => updateApplication(app.id, { status: "rejected" })} className="px-3 py-2 rounded-lg bg-red-50 text-red-700 text-sm font-semibold">Respinge</button>
            </div>
          </div>
        ))}
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
