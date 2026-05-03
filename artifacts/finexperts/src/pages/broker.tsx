import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useStore, Application, ApplicationNote } from "@/lib/store";
import { BROKERS, getBroker } from "@/lib/brokers";
import {
  LayoutDashboard, FileText, Users, LogOut, Check, X, ChevronDown, ChevronUp,
  Phone, Mail, MessageSquare, TrendingUp, Clock, CheckCircle, AlertCircle,
  RefreshCw, ArrowRight, Shield, Star, Briefcase, Filter, Search, Plus,
  Activity, PieChart as PieIcon
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

const STATUS_META: Record<string, { label: string; color: string; next: string[] }> = {
  pending:   { label: "În așteptare", color: "bg-amber-100 text-amber-700",   next: ["in_review", "rejected"] },
  in_review: { label: "În analiză",   color: "bg-blue-100 text-blue-700",     next: ["contacted", "approved", "rejected"] },
  contacted: { label: "Contactat",    color: "bg-purple-100 text-purple-700", next: ["in_review", "approved", "rejected"] },
  approved:  { label: "Aprobat",      color: "bg-green-100 text-green-700",   next: ["closed"] },
  rejected:  { label: "Respins",      color: "bg-red-100 text-red-700",       next: [] },
  closed:    { label: "Închis",       color: "bg-gray-100 text-gray-600",     next: [] },
};
const TYPE_LABEL: Record<string, string> = {
  personal: "Credit personal", ipotecar: "Credit ipotecar", refinantare: "Refinanțare",
};

type Tab = "dashboard" | "aplicari" | "clienti" | "activitate";

export default function BrokerPage() {
  const { user, isBroker, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { applications, updateApplication, addNoteToApplication } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const brokerInfo = useMemo(() => getBroker(user?.brokerId || "tudor-mihai"), [user?.brokerId]);

  if (!isBroker) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-10 text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <X className="h-7 w-7 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-[#0B2E2E] mb-2">Acces restricționat</h2>
          <p className="text-sm text-[#64748B] mb-5">Această pagină este exclusivă conturilor de broker.</p>
          <button onClick={() => setLocation("/login")} className="bg-[#0B2E2E] text-white font-semibold px-6 py-2.5 rounded-lg text-sm">Conectare</button>
        </div>
      </div>
    );
  }

  const myApps = applications.filter(a => a.brokerId === user?.brokerId);

  const stats = {
    total: myApps.length,
    pending: myApps.filter(a => a.status === "pending").length,
    inReview: myApps.filter(a => a.status === "in_review" || a.status === "contacted").length,
    approved: myApps.filter(a => a.status === "approved").length,
    rejected: myApps.filter(a => a.status === "rejected").length,
    totalAmount: myApps.filter(a => a.status === "approved").reduce((s, a) => s + a.amount, 0),
  };

  const pieData = [
    { name: "Aprobate", value: stats.approved, color: "#22c55e" },
    { name: "În lucru", value: stats.inReview, color: "#3b82f6" },
    { name: "Așteptare", value: stats.pending, color: "#f59e0b" },
    { name: "Respinse", value: stats.rejected, color: "#ef4444" },
  ].filter(d => d.value > 0);

  const barData = ["personal", "ipotecar", "refinantare"].map(t => ({
    name: t === "personal" ? "Personal" : t === "ipotecar" ? "Ipotecar" : "Refinanțare",
    total: myApps.filter(a => a.type === t).length,
    aprobate: myApps.filter(a => a.type === t && a.status === "approved").length,
  }));

  const filteredApps = myApps.filter(a => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (search && !`${a.name} ${a.email} ${a.phone}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleStatusChange = (id: string, status: string) => {
    updateApplication(id, { status: status as Application["status"] });
  };

  const handleAddNote = (id: string) => {
    if (!noteText.trim()) return;
    const note: ApplicationNote = { text: noteText.trim(), author: user?.name || "Broker", ts: Date.now() };
    addNoteToApplication(id, note);
    setNoteText("");
  };

  const navItems: { id: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "aplicari", label: "Aplicările mele", icon: FileText, badge: stats.pending },
    { id: "clienti", label: "Clienții mei", icon: Users },
    { id: "activitate", label: "Activitate", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0B2E2E] min-h-screen flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10">
          <div className="text-xs font-bold text-[#C49A20] uppercase tracking-wider mb-0.5">FinExperts</div>
          <div className="text-sm text-white font-semibold">Portal Broker</div>
        </div>

        {brokerInfo && (
          <div className="px-4 py-4 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ backgroundColor: brokerInfo.color }}>{brokerInfo.avatar}</div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white truncate">{brokerInfo.name}</div>
              <div className="text-[10px] text-[#C49A20] font-semibold">Broker activ</div>
            </div>
          </div>
        )}

        <nav className="flex-1 p-3">
          {navItems.map(({ id, label, icon: Icon, badge }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                activeTab === id ? "bg-white/15 text-white" : "text-gray-400 hover:text-white hover:bg-white/8"
              }`}>
              <div className="flex items-center gap-2.5"><Icon className="h-4 w-4" />{label}</div>
              {badge !== undefined && badge > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#C49A20] text-[#0B2E2E]">{badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <div className="px-3 py-2 mb-1">
            <div className="text-xs font-semibold text-white">{user?.name}</div>
            <div className="text-[10px] text-gray-400">{user?.email}</div>
          </div>
          <button onClick={() => { logout(); setLocation("/"); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/8 transition-colors">
            <LogOut className="h-4 w-4" /> Deconectare
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-auto">

        {/* ── DASHBOARD ── */}
        {activeTab === "dashboard" && (
          <div>
            <div className="bg-[#0B2E2E] rounded-2xl p-6 mb-6 text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="text-xs font-bold text-[#C49A20] uppercase tracking-wider mb-2">Dashboard broker</div>
                <h1 className="text-3xl font-bold leading-tight">{brokerInfo.name}</h1>
                <p className="text-white/70 mt-2">Bun venit, {user?.name}. Aici vezi portofoliul tău, clienții și activitatea curentă.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 min-w-[280px]">
                {[
                  { label: "Dosare", value: myApps.length },
                  { label: "Aprobate", value: myApps.filter(a => a.status === "approved").length },
                  { label: "În lucru", value: myApps.filter(a => ["pending", "in_review", "contacted"].includes(a.status)).length },
                  { label: "Clienți", value: new Set(myApps.map(a => a.email)).size },
                ].map(item => (
                  <div key={item.label} className="rounded-xl bg-white/10 border border-white/10 p-4">
                    <div className="text-2xl font-bold">{item.value}</div>
                    <div className="text-xs uppercase tracking-wider text-white/60 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[#0B2E2E]">Bun venit, {user?.name?.split(" ")[0]}!</h1>
                <p className="text-sm text-[#64748B]">
                  {stats.pending > 0 ? `Ai ${stats.pending} aplicări noi de preluat` : "Toate aplicările sunt prelucrate — excelent!"}
                </p>
              </div>
              <div className="text-xs text-[#64748B] flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5" /> 02.05.2026
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Aplicări totale", value: stats.total, sub: "dosarele mele", color: "text-blue-600", bg: "bg-blue-50", icon: FileText },
                { label: "Aprobate", value: stats.approved, sub: `${stats.total ? Math.round(stats.approved/stats.total*100) : 0}% rată succes`, color: "text-green-600", bg: "bg-green-50", icon: CheckCircle },
                { label: "În lucru", value: stats.inReview + stats.pending, sub: "necesită atenție", color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
                { label: "Portofoliu aprobat", value: `${Math.round(stats.totalAmount/1000)}k`, sub: "RON credite aprobate", color: "text-[#0B2E2E]", bg: "bg-[#0B2E2E]/8", icon: TrendingUp },
              ].map(s => (
                <div key={s.label} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
                  <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                    <s.icon className={`h-4 w-4 ${s.color}`} />
                  </div>
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-sm font-semibold text-[#0B2E2E] mt-0.5">{s.label}</div>
                  <div className="text-xs text-[#64748B]">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Pie Chart */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
                <h3 className="font-semibold text-[#0B2E2E] mb-4">Distribuție status</h3>
                {pieData.length > 0 ? (
                  <div className="flex items-center gap-4">
                    <ResponsiveContainer width={160} height={160}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                          {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                        </Pie>
                        <Tooltip formatter={(v: number) => [`${v} dosare`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2">
                      {pieData.map(d => (
                        <div key={d.name} className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                          <span className="text-xs text-[#64748B]">{d.name}</span>
                          <span className="text-xs font-bold text-[#0B2E2E] ml-auto">{d.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-[#64748B] text-sm">Nu sunt date</div>
                )}
              </div>

              {/* Bar Chart */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
                <h3 className="font-semibold text-[#0B2E2E] mb-4">Tip credit</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={barData} barSize={20}>
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="total" fill="#0B2E2E" name="Total" radius={[3,3,0,0]} />
                    <Bar dataKey="aprobate" fill="#C49A20" name="Aprobate" radius={[3,3,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Aplicări urgente */}
            {stats.pending > 0 && (
              <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
                  <h3 className="font-semibold text-[#0B2E2E]">Necesită preluare</h3>
                  <button onClick={() => setActiveTab("aplicari")} className="text-xs text-[#64748B] hover:text-[#0B2E2E] flex items-center gap-1">
                    Toate <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
                {myApps.filter(a => a.status === "pending").slice(0, 3).map(app => (
                  <div key={app.id} className="px-5 py-4 border-b border-[#F5F7FA] last:border-0 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-[#0B2E2E]">{app.name}</div>
                      <div className="text-xs text-[#64748B]">{TYPE_LABEL[app.type]} · {app.amount.toLocaleString("ro-RO")} RON · {app.bank}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${STATUS_META[app.status].color}`}>
                        {STATUS_META[app.status].label}
                      </span>
                      <button onClick={() => { setActiveTab("aplicari"); setExpandedId(app.id); }}
                        className="text-xs bg-[#0B2E2E] text-white px-3 py-1.5 rounded-lg hover:bg-[#0B2E2E]/80 transition-colors">
                        Preia →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── APLICĂRI ── */}
        {activeTab === "aplicari" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-2xl font-bold text-[#0B2E2E]">Aplicările mele</h1>
                <p className="text-sm text-[#64748B]">{myApps.length} dosare în portofoliu</p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 mb-4 flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Caută client..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0B2E2E]" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["all", "pending", "in_review", "contacted", "approved", "rejected"].map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                      statusFilter === s ? "bg-[#0B2E2E] text-white border-[#0B2E2E]" : "border-[#E2E8F0] text-[#64748B] hover:border-[#0B2E2E]"
                    }`}>
                    {s === "all" ? "Toate" : STATUS_META[s]?.label || s}
                    <span className="ml-1.5 opacity-60">{s === "all" ? myApps.length : myApps.filter(a => a.status === s).length}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredApps.length === 0 && (
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center text-[#64748B]">
                  <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">Nicio aplicare găsită</p>
                </div>
              )}
              {filteredApps.map(app => {
                const isOpen = expandedId === app.id;
                const meta = STATUS_META[app.status];
                return (
                  <div key={app.id} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                    <button onClick={() => setExpandedId(isOpen ? null : app.id)}
                      className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#F5F7FA] transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-[#0B2E2E]">{app.name}</span>
                          <span className="text-xs text-[#64748B]">#{app.id}</span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${meta.color}`}>{meta.label}</span>
                          {app.notes && app.notes.length > 0 && (
                            <span className="text-[10px] text-[#64748B] flex items-center gap-0.5">
                              <MessageSquare className="h-3 w-3" />{app.notes.length}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#64748B] mt-0.5">
                          {TYPE_LABEL[app.type]} · {app.amount.toLocaleString("ro-RO")} RON · {app.bank || "—"} · {app.date}
                        </div>
                      </div>
                      {isOpen ? <ChevronUp className="h-4 w-4 text-[#64748B] shrink-0" /> : <ChevronDown className="h-4 w-4 text-[#64748B] shrink-0" />}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 border-t border-[#F5F7FA] space-y-4 pt-4">
                        {/* Client info */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-[#F5F7FA] rounded-xl p-3">
                            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Contact client</div>
                            <a href={`tel:${app.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm text-[#0B2E2E] hover:text-[#C49A20] mb-1.5">
                              <Phone className="h-3.5 w-3.5" /> {app.phone}
                            </a>
                            <a href={`mailto:${app.email}`} className="flex items-center gap-2 text-sm text-[#0B2E2E] hover:text-[#C49A20]">
                              <Mail className="h-3.5 w-3.5" /> {app.email}
                            </a>
                          </div>
                          <div className="bg-[#F5F7FA] rounded-xl p-3">
                            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Detalii dosar</div>
                            <div className="text-sm"><span className="text-[#64748B]">Tip:</span> <strong className="text-[#0B2E2E]">{TYPE_LABEL[app.type]}</strong></div>
                            <div className="text-sm"><span className="text-[#64748B]">Sumă:</span> <strong className="text-[#0B2E2E]">{app.amount.toLocaleString("ro-RO")} RON</strong></div>
                            <div className="text-sm"><span className="text-[#64748B]">Bancă:</span> <strong className="text-[#0B2E2E]">{app.bank || "—"}</strong></div>
                          </div>
                        </div>

                        {app.message && (
                          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                            <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1">Mesaj client</div>
                            <p className="text-sm text-amber-800">{app.message}</p>
                          </div>
                        )}

                        {/* Status change */}
                        {meta.next.length > 0 && (
                          <div>
                            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Schimbă status</div>
                            <div className="flex flex-wrap gap-2">
                              {meta.next.map(s => (
                                <button key={s} onClick={() => handleStatusChange(app.id, s)}
                                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                                    STATUS_META[s].color.replace("bg-", "border-").replace(" text-", " text-").split(" ")[0]
                                  } hover:opacity-80 ${STATUS_META[s].color}`}>
                                  → {STATUS_META[s].label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        <div>
                          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <MessageSquare className="h-3.5 w-3.5" /> Note interne ({app.notes?.length || 0})
                          </div>
                          <div className="space-y-2 mb-3">
                            {(app.notes || []).map((note, i) => (
                              <div key={i} className="bg-[#F5F7FA] rounded-xl px-3 py-2.5">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] font-bold text-[#0B2E2E]">{note.author}</span>
                                  <span className="text-[10px] text-[#94A3B8]">
                                    {new Date(note.ts).toLocaleDateString("ro-RO", { day: "2-digit", month: "short", year: "numeric" })}
                                  </span>
                                </div>
                                <p className="text-xs text-[#64748B]">{note.text}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <input value={noteText} onChange={e => setNoteText(e.target.value)}
                              placeholder="Adaugă o notă internă..."
                              onKeyDown={e => e.key === "Enter" && handleAddNote(app.id)}
                              className="flex-1 border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0B2E2E]" />
                            <button onClick={() => handleAddNote(app.id)}
                              className="bg-[#0B2E2E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0B2E2E]/80 transition-colors flex items-center gap-1.5">
                              <Plus className="h-3.5 w-3.5" /> Adaugă
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── CLIENȚI ── */}
        {activeTab === "clienti" && (
          <div>
            <div className="mb-5">
              <h1 className="text-2xl font-bold text-[#0B2E2E]">Clienții mei</h1>
              <p className="text-sm text-[#64748B]">{new Set(myApps.map(a => a.email)).size} clienți unici în portofoliu</p>
            </div>
            <div className="space-y-3">
              {Array.from(new Map(myApps.map(a => [a.email, a])).values()).map(app => {
                const clientApps = myApps.filter(a => a.email === app.email);
                return (
                  <div key={app.email} className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#0B2E2E] flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {app.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#0B2E2E]">{app.name}</div>
                      <div className="text-xs text-[#64748B] mt-0.5">{app.email} · {app.phone}</div>
                      <div className="flex gap-2 mt-1.5 flex-wrap">
                        {clientApps.map(a => (
                          <span key={a.id} className={`text-[10px] font-bold px-2 py-0.5 rounded ${STATUS_META[a.status].color}`}>
                            {TYPE_LABEL[a.type]} — {STATUS_META[a.status].label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <a href={`tel:${app.phone.replace(/\s/g, "")}`} className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors">
                        <Phone className="h-4 w-4 text-green-600" />
                      </a>
                      <a href={`mailto:${app.email}`} className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors">
                        <Mail className="h-4 w-4 text-blue-600" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── ACTIVITATE ── */}
        {activeTab === "activitate" && (
          <div>
            <div className="mb-5">
              <h1 className="text-2xl font-bold text-[#0B2E2E]">Activitate recentă</h1>
              <p className="text-sm text-[#64748B]">Istoricul acțiunilor din portofoliul tău</p>
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E2E8F0]">
                <h3 className="font-semibold text-[#0B2E2E]">Cronologie dosar</h3>
              </div>
              <div className="p-5 space-y-4">
                {myApps.flatMap(app =>
                  (app.notes || []).map(note => ({ ...note, appName: app.name, appId: app.id }))
                ).sort((a, b) => b.ts - a.ts).slice(0, 20).map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#0B2E2E]/10 flex items-center justify-center shrink-0">
                        <MessageSquare className="h-3.5 w-3.5 text-[#0B2E2E]" />
                      </div>
                      {i < 19 && <div className="w-0.5 bg-[#E2E8F0] flex-1 mt-1" />}
                    </div>
                    <div className="pb-4 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-[#0B2E2E]">{item.appName}</span>
                        <span className="text-xs text-[#94A3B8]">#{item.appId}</span>
                      </div>
                      <p className="text-sm text-[#64748B] mt-0.5">{item.text}</p>
                      <div className="text-[11px] text-[#94A3B8] mt-1">
                        {new Date(item.ts).toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}
                {myApps.every(a => !a.notes?.length) && (
                  <div className="text-center text-[#64748B] text-sm py-8">
                    <Activity className="h-10 w-10 mx-auto mb-2 opacity-30" />
                    Nicio activitate înregistrată încă
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
