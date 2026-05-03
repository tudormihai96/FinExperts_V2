import { useEffect, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { checkEmailExists, consumePasswordResetToken, createPasswordResetRequest, getPasswordResetEmail } from "@/lib/auth";
import { AlertCircle, ArrowLeft, CheckCircle, Eye, EyeOff, KeyRound, Lock, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/recuperare-parola/:token");
  const token = match ? params?.token ?? "" : "";
  const [step, setStep] = useState<"email" | "reset" | "done">(token ? "reset" : "email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetError, setResetError] = useState("");

  useEffect(() => {
    if (!token) return;
    const requestEmail = getPasswordResetEmail(token);
    if (!requestEmail) {
      setResetError("Linkul de reset este invalid sau a expirat.");
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
    const exists = checkEmailExists(emailNorm);
    if (!exists) {
      setEmailError("Nu am găsit niciun cont asociat acestui email.");
      return;
    }
    const resetToken = createPasswordResetRequest(emailNorm);
    if (!resetToken) {
      setEmailError("Nu am putut genera linkul de reset.");
      return;
    }
    setLocation(`/recuperare-parola/${resetToken}`);
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
      setResetError("Lipsește linkul de reset.");
      return;
    }
    const ok = consumePasswordResetToken(token, newPassword);
    if (!ok) {
      setResetError("A apărut o eroare. Reîncearcă.");
      return;
    }
    setStep("done");
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
          <p className="text-sm text-[#64748B] mt-1">
            {step === "email" && "Introdu emailul contului tău"}
            {step === "reset" && "Setează noua parolă"}
            {step === "done" && "Parola a fost actualizată"}
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-7">

          {/* Step 1 — Email */}
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
                className="w-full bg-[#0B2E2E] hover:bg-[#132846] text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Continuă
              </button>
            </form>
          )}

          {/* Step 2 — Noua parolă */}
          {step === "reset" && (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div className="flex items-center gap-2 bg-[#0B2E2E]/5 border border-[#0B2E2E]/15 rounded-lg px-3 py-2.5 mb-2">
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

          {/* Step 3 — Succes */}
          {step === "done" && (
            <div className="text-center py-2">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-[#0B2E2E] text-lg mb-2">Parolă actualizată!</h3>
              <p className="text-sm text-[#64748B] mb-6">
                Parola contului <strong>{email}</strong> a fost resetată cu succes. Te poți conecta acum cu noua parolă.
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
