import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X, Cookie, ShieldCheck, BarChart2 } from "lucide-react";

const STORAGE_KEY = "fin_cookie_consent";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  preferences: boolean;
  timestamp: number;
};

function getStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean, preferences: boolean) {
  const consent: ConsentState = {
    necessary: true,
    analytics,
    preferences,
    timestamp: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(true);
  const [prefChecked, setPrefChecked] = useState(true);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function acceptAll() {
    saveConsent(true, true);
    setVisible(false);
  }

  function acceptNecessary() {
    saveConsent(false, false);
    setVisible(false);
  }

  function saveCustom() {
    saveConsent(analyticsChecked, prefChecked);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <>
      {/* Overlay blur subtil */}
      <div className="fixed inset-0 z-[998] bg-black/20 backdrop-blur-[1px] pointer-events-none" />

      {/* Banner */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[999] bg-[#0B2E2E] border-t border-white/10 shadow-2xl"
        role="dialog"
        aria-modal="false"
        aria-label="Consimțământ cookie-uri"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">

          {!showDetails ? (
            /* ── Compact view ── */
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Cookie className="h-5 w-5 text-[#C49A20] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Confidențialitate și prelucrarea datelor</p>
                  <p className="text-xs text-gray-400 leading-relaxed mb-1">
                    Folosim cookie-uri necesare pentru funcționarea site-ului și, cu acordul tău, cookie-uri de analiză.{" "}
                    <Link href="/cookies" className="text-[#C49A20] hover:underline">Politica de Cookies</Link>
                    {" · "}
                    <Link href="/confidentialitate" className="text-[#C49A20] hover:underline">Date personale</Link>
                  </p>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    <span className="text-[#C49A20] font-medium">Datele personale:</span>{" "}
                    Atunci când îți creezi cont sau aplici pentru un credit, colectăm numele, numărul de telefon și adresa de e-mail în scopul analizei dosarului și contactării tale de către un broker FinExperts. Furnizarea acestor date este voluntară și necesară pentru prestarea serviciului. Temeiul legal: art. 6 alin. (1) lit. b) GDPR — executarea unui contract.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowDetails(true)}
                  className="text-xs text-gray-400 hover:text-white underline transition-colors whitespace-nowrap"
                >
                  Setări detaliate
                </button>
                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 text-xs font-semibold border border-white/20 text-gray-300 hover:text-white hover:border-white/40 rounded-lg transition-colors whitespace-nowrap"
                >
                  Doar necesare
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-2 text-xs font-bold bg-[#C49A20] hover:bg-[#b09255] text-[#0B2E2E] rounded-lg transition-colors whitespace-nowrap"
                >
                  Acceptă toate
                </button>
              </div>
            </div>
          ) : (
            /* ── Detailed view ── */
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <Cookie className="h-4 w-4 text-[#C49A20]" /> Preferințe cookie-uri
                </p>
                <button onClick={() => setShowDetails(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {/* Necessary */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-[#C49A20]" />
                      <span className="text-xs font-semibold text-white">Strict necesare</span>
                    </div>
                    <span className="text-[10px] text-[#C49A20] font-semibold uppercase">Mereu active</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Esențiale pentru funcționarea site-ului: sesiune, securitate CSRF. Nu pot fi dezactivate.
                  </p>
                </div>

                {/* Analytics */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="h-4 w-4 text-[#C49A20]" />
                      <span className="text-xs font-semibold text-white">Analiză</span>
                    </div>
                    <button
                      role="switch"
                      aria-checked={analyticsChecked}
                      onClick={() => setAnalyticsChecked(v => !v)}
                      className={`relative w-9 h-5 rounded-full transition-colors focus:outline-none ${analyticsChecked ? "bg-[#C49A20]" : "bg-white/20"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${analyticsChecked ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Google Analytics — ne ajută să înțelegem paginile vizitate și traficul. Date anonimizate.
                  </p>
                </div>

                {/* Preferences */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Cookie className="h-4 w-4 text-[#C49A20]" />
                      <span className="text-xs font-semibold text-white">Preferințe</span>
                    </div>
                    <button
                      role="switch"
                      aria-checked={prefChecked}
                      onClick={() => setPrefChecked(v => !v)}
                      className={`relative w-9 h-5 rounded-full transition-colors focus:outline-none ${prefChecked ? "bg-[#C49A20]" : "bg-white/20"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${prefChecked ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Memorează preferințele din calculator (tip credit, valori) pentru vizitele ulterioare.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 text-xs font-semibold border border-white/20 text-gray-300 hover:text-white hover:border-white/40 rounded-lg transition-colors"
                >
                  Doar necesare
                </button>
                <button
                  onClick={saveCustom}
                  className="px-4 py-2 text-xs font-semibold border border-[#C49A20]/60 text-[#C49A20] hover:border-[#C49A20] rounded-lg transition-colors"
                >
                  Salvează selecția
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-2 text-xs font-bold bg-[#C49A20] hover:bg-[#b09255] text-[#0B2E2E] rounded-lg transition-colors"
                >
                  Acceptă toate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
