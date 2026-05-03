import { useEffect, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { consumePasswordResetToken, createPasswordResetRequest, getPasswordResetEmail } from "@/lib/auth";
import {
  AlertCircle, ArrowLeft, CheckCircle, Copy, Eye, EyeOff,
  Info, KeyRound, Lock, Mail, Send
} from "lucide-react";

type Step = "email" | "sent" | "reset" | "done";

export default function ForgotPasswordPage() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/recuperare-parola/:token");
  const token = match ? (params?.token ?? "") : "";

  const [step, setStep] = useState<Step>(token ? "reset" : "email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetError, setResetError] = useState("");

  useEffect(() => {
    if (!token) return;
    const requestEmail = getPasswordResetEmail(token);
    if (!requestEmail) {
      setResetError("Linkul de reset este invalid sau a expirat. Solicită unul nou.");
      setStep("email");
      return;
    }
    setEmail(requestEmail);
    setStep("reset");
  }, [token]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    const emailNorm = email.trim().toLowerCase();

    const resetToken = createPasswordResetRequest(emailNorm);
    if (resetToken) {
      const base = window.location.origin + window.location.pathname.replace(/\/recuperare-parola.*$/, "");
      setResetLink(`${base}/recuperare-parola/${resetToken}`);
    }
    setStep("sent");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resetLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    if (newPassword.length < 6) {
      setResetError("Parola trebuie să aibă minimum 6 caractere.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError("Parolele nu coincid.");
      return;
    }
    if (!token) {
      setResetError("Lipsește tokenul de reset. Accesează linkul din email.");
      return;
    }
    const ok = consumePasswordResetToken(token, newPassword);
    if (!ok) {
      setResetError("Linkul a expirat sau a fost deja folosit. Solicită unul nou.");
      return;
    }
    setStep("done");
  };

  const subtitle: Record<Step, string> = {
    email: "Introdu emailul contului tău",
    sent: "Verifică-ți inbox-ul",
    reset: "Setează noua parolă",
    done: "Parolă actualizată cu succes",
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <img
            src="https://customer-assets.emergentagent.com/job_kiwi-credit-calc/artifacts/79s0uoxb_logo2_corectr.png"
            alt="FinExperts"
            className="h-48 mx-auto mb-5"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <h1 className="text-2xl font-bold text-[#0B2E2E]">Recuperare parolă</h1>
          <p className="text-sm text-[#64748B] mt-1">{subtitle[step]}</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-7">

          {/* ── Step 1: Email ── */}
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">
                  Adresă de email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="ion@exemplu.ro"
                    required
                    className="w-full border border-[#E2E8F0] rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2E2E] transition-colors"
                  />
                </div>
              </div>

              {emailError && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {emailError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#0B2E2E] hover:bg-[#132846] text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" /> Trimite link de resetare
              </button>
            </form>
          )}

          {/* ── Step 2: Sent (demo — în producție linkul se trimite pe email) ── */}
          {step === "sent" && (
            <div className="space-y-4">
              <div className="flex flex-col items-center text-center py-2">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <Mail className="h-7 w-7 text-blue-600" />
                </div>
                <p className="text-sm text-[#0B2E2E] font-medium">
                  Dacă există un cont asociat adresei <strong>{email}</strong>, vei primi un email cu linkul de resetare.
                </p>
              </div>

              {/* Linkul de reset — afișat doar în mediu demo, când emailul a fost găsit */}
              {resetLink ? (
                <>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-700">
                        <strong>Mediu demo:</strong> În producție, linkul se trimite automat pe email. Copiați linkul de mai jos pentru a testa.
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">
                      Link resetare (expiră în 15 min)
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs text-[#64748B] bg-[#F5F7FA] break-all select-all">
                        {resetLink}
                      </div>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="shrink-0 border border-[#E2E8F0] rounded-lg p-2 hover:border-[#0B2E2E] hover:text-[#0B2E2E] transition-colors"
                        title="Copiază link"
                      >
                        {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-[#64748B]" />}
                      </button>
                    </div>
                  </div>

                  <a
                    href={resetLink}
                    className="block w-full bg-[#0B2E2E] hover:bg-[#132846] text-white font-semibold py-3 rounded-xl transition-colors text-center text-sm"
                  >
                    Deschide link de resetare →
                  </a>
                </>
              ) : (
                <p className="text-xs text-center text-[#94A3B8]">
                  Verifică inbox-ul și folderul Spam. Linkul expiră în 15 minute.
                </p>
              )}
            </div>
          )}

          {/* ── Step 3: Reset (accesibil DOAR prin URL cu token) ── */}
          {step === "reset" && (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div className="flex items-center gap-2 bg-[#0B2E2E]/5 border border-[#0B2E2E]/15 rounded-lg px-3 py-2.5">
                <KeyRound className="h-4 w-4 text-[#0B2E2E] shrink-0" />
                <span className="text-xs text-[#0B2E2E] font-medium truncate">{email}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">
                  Parola nouă
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 caractere"
                    required
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-[#0B2E2E] transition-colors"
                  />
                  <button type="button" onClick={() => setShowNew(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0B2E2E]">
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B2E2E] uppercase tracking-wider mb-1.5">
                  Confirmă parola
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repetă parola"
                    required
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-[#0B2E2E] transition-colors"
                  />
                  <button type="button" onClick={() => setShowConfirm(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0B2E2E]">
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {resetError && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {resetError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#0B2E2E] hover:bg-[#132846] text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Actualizează parola
              </button>
            </form>
          )}

          {/* ── Step 4: Done ── */}
          {step === "done" && (
            <div className="text-center py-2">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-[#0B2E2E] text-lg mb-2">Parolă actualizată!</h3>
              <p className="text-sm text-[#64748B] mb-6">
                Contul <strong>{email}</strong> are acum o parolă nouă. Te poți conecta.
              </p>
              <button
                onClick={() => setLocation("/login")}
                className="w-full bg-[#0B2E2E] hover:bg-[#132846] text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Mergi la conectare
              </button>
            </div>
          )}

          {step !== "done" && (
            <div className="mt-5 pt-5 border-t border-[#E2E8F0] text-center">
              <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#0B2E2E] transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" /> Înapoi la conectare
              </Link>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#94A3B8]">
          <Lock className="h-3 w-3" />
          Sesiune securizată · FinExperts
        </div>
      </div>
    </div>
  );
}
