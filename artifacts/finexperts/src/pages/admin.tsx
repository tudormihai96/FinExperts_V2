import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useStore, Application, InsuranceRequest, Guide } from "@/lib/store";
import { banks as defaultBanks } from "@/lib/data";
import {
  LayoutDashboard, FileText, BookOpen, Shield, Building2,
  LogOut, ChevronDown, ChevronUp, Trash2, Plus, Pencil, Check, X, Eye
} from "lucide-react";

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

type Tab = "dashboard" | "aplicari" | "ghiduri" | "asigurari" | "banci";

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
      <div className="min-h-screen bg-[#F7F4EC] flex items-center justify-center">
        <div className="bg-white border border-[#E5E3D9] rounded-xl p-10 text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <X className="h-7 w-7 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-[#0A1A2E] mb-2">Acces restricționat</h2>
          <p className="text-sm text-[#5A6478] mb-5">Trebuie să fii autentificat ca administrator pentru a accesa această pagină.</p>
          <button onClick={() => setLocation("/login")} className="bg-[#0A1A2E] text-white font-semibold px-6 py-2.5 rounded-lg text-sm">Conectare</button>
        </div>
      </div>
    );
  }

  const handleLogout = () => { logout(); setLocation("/"); };

  const navItems: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "aplicari", label: "Aplicări credit", icon: FileText, count: applications.filter(a => a.status === "pending").length },
    { id: "ghiduri", label: "Ghiduri", icon: BookOpen, count: guides.length },
    { id: "asigurari", label: "Asigurări", icon: Shield, count: insuranceRequests.filter(r => r.status === "pending").length },
    { id: "banci", label: "Bănci", icon: Building2, count: adminBanks.length },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EC] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A1A2E] min-h-screen flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10">
          <div className="text-xs font-bold text-[#C6A667] uppercase tracking-wider mb-0.5">FinExperts</div>
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
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === id ? "bg-[#C6A667] text-[#0A1A2E]" : "bg-white/15 text-gray-300"}`}>
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
        {activeTab === "aplicari" && <ApplicationsTab applications={applications} setApplications={setApplications} />}
        {activeTab === "ghiduri" && <GuidesTab guides={guides} setGuides={setGuides} />}
        {activeTab === "asigurari" && <InsuranceTab requests={insuranceRequests} setRequests={setInsuranceRequests} />}
        {activeTab === "banci" && <BanksTab banks={adminBanks} setBanks={setAdminBanks} />}
      </main>
    </div>
  );
}

function DashboardTab({ applications, insuranceRequests, guides, banks, setActiveTab }: {
  applications: Application[];
  insuranceRequests: InsuranceRequest[];
  guides: Guide[];
  banks: ReturnType<typeof defaultBanks extends infer T ? () => T : never>;
  setActiveTab: (t: Tab) => void;
}) {
  const stats = [
    { label: "Aplicări totale", value: applications.length, sub: `${applications.filter(a => a.status === "pending").length} în așteptare`, color: "bg-blue-50 text-blue-700", tab: "aplicari" as Tab },
    { label: "Aprobate", value: applications.filter(a => a.status === "approved").length, sub: "credite aprobate", color: "bg-green-50 text-green-700", tab: "aplicari" as Tab },
    { label: "Cereri asigurări", value: insuranceRequests.length, sub: `${insuranceRequests.filter(r => r.status === "pending").length} neprocesate`, color: "bg-purple-50 text-purple-700", tab: "asigurari" as Tab },
    { label: "Ghiduri publicate", value: guides.length, sub: "articole active", color: "bg-amber-50 text-amber-700", tab: "ghiduri" as Tab },
  ];

  const recent = applications.slice(0, 5);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0A1A2E]">Dashboard</h1>
        <p className="text-sm text-[#5A6478]">Bun venit în panoul de administrare FinExperts.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <button key={s.label} onClick={() => setActiveTab(s.tab)} className="bg-white border border-[#E5E3D9] rounded-xl p-5 text-left hover:shadow-sm transition-all hover:border-[#0A1A2E]">
            <div className={`text-3xl font-bold mb-1 ${s.color.split(" ")[1]}`}>{s.value}</div>
            <div className="text-sm font-semibold text-[#0A1A2E]">{s.label}</div>
            <div className="text-xs text-[#5A6478] mt-0.5">{s.sub}</div>
          </button>
        ))}
      </div>
      <div className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E5E3D9] flex items-center justify-between">
          <h3 className="font-semibold text-[#0A1A2E]">Aplicări recente</h3>
          <button onClick={() => setActiveTab("aplicari")} className="text-xs text-[#5A6478] hover:text-[#0A1A2E]">Vezi toate →</button>
        </div>
        <table className="w-full">
          <thead className="bg-[#F7F4EC]">
            <tr>
              {["ID", "Nume", "Tip", "Sumă", "Bancă", "Status"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[#5A6478] uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.map(app => (
              <tr key={app.id} className="border-t border-[#E5E3D9] hover:bg-[#F7F4EC]/50">
                <td className="px-5 py-3 text-xs font-mono text-[#5A6478]">{app.id}</td>
                <td className="px-5 py-3 text-sm font-medium text-[#0A1A2E]">{app.name}</td>
                <td className="px-5 py-3 text-xs text-[#5A6478] capitalize">{app.type}</td>
                <td className="px-5 py-3 text-sm font-semibold text-[#0A1A2E]">{app.amount.toLocaleString("ro-RO")} RON</td>
                <td className="px-5 py-3 text-sm text-[#5A6478]">{app.bank || "—"}</td>
                <td className="px-5 py-3"><StatusBadge status={app.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ApplicationsTab({ applications, setApplications }: { applications: Application[]; setApplications: (a: Application[]) => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? applications : applications.filter(a => a.status === filter);

  const updateStatus = (id: string, status: Application["status"]) => {
    setApplications(applications.map(a => a.id === id ? { ...a, status } : a));
  };

  const deleteApp = (id: string) => {
    setApplications(applications.filter(a => a.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1A2E]">Aplicări credit</h1>
          <p className="text-sm text-[#5A6478]">{applications.length} aplicări totale</p>
        </div>
      </div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {[["all", "Toate"], ["pending", "În așteptare"], ["in_review", "În analiză"], ["approved", "Aprobate"], ["rejected", "Respinse"]].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)} className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${filter === val ? "bg-[#0A1A2E] text-white border-[#0A1A2E]" : "bg-white text-[#5A6478] border-[#E5E3D9] hover:border-[#0A1A2E]"}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F7F4EC]">
            <tr>
              {["ID", "Nume / Email", "Tip", "Sumă", "Status", "Data", "Acțiuni"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[#5A6478] uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(app => (
              <>
                <tr key={app.id} className="border-t border-[#E5E3D9] hover:bg-[#F7F4EC]/50">
                  <td className="px-4 py-3 text-xs font-mono text-[#5A6478]">{app.id}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-[#0A1A2E]">{app.name}</div>
                    <div className="text-xs text-[#5A6478]">{app.email} · {app.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#5A6478] capitalize">{app.type}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-[#0A1A2E]">{app.amount.toLocaleString("ro-RO")} RON</td>
                  <td className="px-4 py-3">
                    <select value={app.status} onChange={e => updateStatus(app.id, e.target.value as Application["status"])} className="text-xs border border-[#E5E3D9] rounded-lg px-2 py-1 bg-white focus:outline-none">
                      <option value="pending">În așteptare</option>
                      <option value="in_review">În analiză</option>
                      <option value="approved">Aprobat</option>
                      <option value="rejected">Respins</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#5A6478]">{app.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setExpandedId(expandedId === app.id ? null : app.id)} className="p-1.5 rounded hover:bg-[#F7F4EC] text-[#5A6478] hover:text-[#0A1A2E]">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => deleteApp(app.id)} className="p-1.5 rounded hover:bg-red-50 text-[#5A6478] hover:text-red-600">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedId === app.id && (
                  <tr key={app.id + "_exp"} className="border-t border-[#E5E3D9] bg-[#F7F4EC]">
                    <td colSpan={7} className="px-4 py-3">
                      <div className="text-xs text-[#5A6478]">
                        <strong className="text-[#0A1A2E]">Bancă:</strong> {app.bank || "Fără preferință"} &nbsp;·&nbsp;
                        <strong className="text-[#0A1A2E]">Mesaj:</strong> {app.message || "—"}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-[#5A6478]">Nicio aplicare în această categorie.</div>
        )}
      </div>
    </div>
  );
}

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
          <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-sm text-[#5A6478] hover:text-[#0A1A2E]">← Înapoi</button>
          <h1 className="text-2xl font-bold text-[#0A1A2E]">{isNew ? "Ghid nou" : "Editare ghid"}</h1>
        </div>
        <div className="bg-white border border-[#E5E3D9] rounded-xl p-6 max-w-2xl">
          <div className="space-y-4">
            {[
              { key: "title" as keyof Guide, label: "Titlu", type: "text" },
              { key: "category" as keyof Guide, label: "Categorie", type: "text" },
              { key: "readTime" as keyof Guide, label: "Timp citire", type: "text" },
              { key: "date" as keyof Guide, label: "Data", type: "text" },
              { key: "image" as keyof Guide, label: "URL imagine", type: "text" },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-[#0A1A2E] uppercase tracking-wider mb-1.5">{f.label}</label>
                <input type={f.type} value={String(editing[f.key])} onChange={e => setEditing({ ...editing, [f.key]: e.target.value })}
                  className="w-full border border-[#E5E3D9] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0A1A2E]" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-[#0A1A2E] uppercase tracking-wider mb-1.5">Rezumat</label>
              <textarea value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} rows={3}
                className="w-full border border-[#E5E3D9] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0A1A2E] resize-none" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => save(editing)} className="bg-[#0A1A2E] text-white font-semibold px-5 py-2 rounded-lg text-sm flex items-center gap-2">
                <Check className="h-4 w-4" /> Salvează
              </button>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="border border-[#E5E3D9] text-[#5A6478] px-5 py-2 rounded-lg text-sm">
                Anulează
              </button>
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
          <h1 className="text-2xl font-bold text-[#0A1A2E]">Ghiduri</h1>
          <p className="text-sm text-[#5A6478]">{guides.length} ghiduri publicate</p>
        </div>
        <button onClick={() => { setEditing(emptyGuide); setIsNew(true); }} className="flex items-center gap-2 bg-[#0A1A2E] text-white font-semibold px-4 py-2 rounded-lg text-sm">
          <Plus className="h-4 w-4" /> Ghid nou
        </button>
      </div>
      <div className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
        {guides.map((guide, i) => (
          <div key={guide.slug} className={`flex items-center gap-4 px-5 py-4 hover:bg-[#F7F4EC]/50 ${i > 0 ? "border-t border-[#E5E3D9]" : ""}`}>
            <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-[#E5E3D9]">
              <img src={guide.image} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[#0A1A2E] truncate">{guide.title}</div>
              <div className="text-xs text-[#5A6478]">{guide.category} · {guide.date} · {guide.readTime} citire</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => { setEditing(guide); setIsNew(false); }} className="p-1.5 rounded hover:bg-[#F7F4EC] text-[#5A6478] hover:text-[#0A1A2E]">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => del(guide.slug)} className="p-1.5 rounded hover:bg-red-50 text-[#5A6478] hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsuranceTab({ requests, setRequests }: { requests: InsuranceRequest[]; setRequests: (r: InsuranceRequest[]) => void }) {
  const updateStatus = (id: string, status: InsuranceRequest["status"]) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
  };
  const del = (id: string) => setRequests(requests.filter(r => r.id !== id));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0A1A2E]">Cereri asigurări</h1>
        <p className="text-sm text-[#5A6478]">{requests.length} cereri totale · {requests.filter(r => r.status === "pending").length} neprocesate</p>
      </div>
      <div className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F7F4EC]">
            <tr>
              {["ID", "Solicitant", "Tip asigurare", "Status", "Data", "Acțiuni"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[#5A6478] uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id} className="border-t border-[#E5E3D9] hover:bg-[#F7F4EC]/50">
                <td className="px-5 py-3 text-xs font-mono text-[#5A6478]">{req.id}</td>
                <td className="px-5 py-3">
                  <div className="text-sm font-medium text-[#0A1A2E]">{req.name}</div>
                  <div className="text-xs text-[#5A6478]">{req.email} · {req.phone}</div>
                </td>
                <td className="px-5 py-3 text-sm text-[#5A6478]">{req.type}</td>
                <td className="px-5 py-3">
                  <select value={req.status} onChange={e => updateStatus(req.id, e.target.value as InsuranceRequest["status"])} className="text-xs border border-[#E5E3D9] rounded-lg px-2 py-1 bg-white focus:outline-none">
                    <option value="pending">În așteptare</option>
                    <option value="contacted">Contactat</option>
                    <option value="closed">Închis</option>
                  </select>
                </td>
                <td className="px-5 py-3 text-xs text-[#5A6478]">{req.date}</td>
                <td className="px-5 py-3">
                  <button onClick={() => del(req.id)} className="p-1.5 rounded hover:bg-red-50 text-[#5A6478] hover:text-red-600">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <div className="py-12 text-center text-sm text-[#5A6478]">Nicio cerere de asigurare.</div>
        )}
      </div>
    </div>
  );
}

function BanksTab({ banks, setBanks }: { banks: ReturnType<typeof defaultBanks extends infer T ? () => T : never>; setBanks: (b: any[]) => void }) {
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
        <h1 className="text-2xl font-bold text-[#0A1A2E]">Bănci partenere</h1>
        <p className="text-sm text-[#5A6478]">{banks.length} bănci configurate · Click pe ✏️ pentru a modifica dobânzile</p>
      </div>
      <div className="bg-white border border-[#E5E3D9] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F7F4EC]">
            <tr>
              {["Bancă", "D. personal", "D. ipotecar", "DAE pers.", "DAE ipot.", "Rating", "Acțiuni"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[#5A6478] uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(banks as any[]).map((bank: any) => {
              const isEdit = editingId === bank.id;
              return (
                <tr key={bank.id} className="border-t border-[#E5E3D9] hover:bg-[#F7F4EC]/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[9px] font-bold shrink-0" style={{ backgroundColor: bank.color }}>
                        {bank.initials}
                      </div>
                      <span className="text-sm font-medium text-[#0A1A2E]">{bank.name}</span>
                    </div>
                  </td>
                  {["ratePersonal", "rateIpotecar", "daePersonal", "daeIpotecar", "rating"].map(field => (
                    <td key={field} className="px-4 py-3">
                      {isEdit ? (
                        <input type="number" step="0.01" value={editValues[field] as number}
                          onChange={e => setEditValues(v => ({ ...v, [field]: parseFloat(e.target.value) || 0 }))}
                          className="w-20 border border-[#C6A667] rounded px-2 py-1 text-sm focus:outline-none" />
                      ) : (
                        <span className="text-sm text-[#0A1A2E]">{(bank[field] as number).toFixed(2)}%</span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      {isEdit ? (
                        <>
                          <button onClick={() => saveEdit(bank.id)} className="p-1.5 rounded bg-green-50 text-green-600 hover:bg-green-100">
                            <Check className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => setEditingId(null)} className="p-1.5 rounded bg-gray-50 text-gray-500 hover:bg-gray-100">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(bank)} className="p-1.5 rounded hover:bg-[#F7F4EC] text-[#5A6478] hover:text-[#0A1A2E]">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => deleteBank(bank.id)} className="p-1.5 rounded hover:bg-red-50 text-[#5A6478] hover:text-red-600">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
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
    </div>
  );
}
