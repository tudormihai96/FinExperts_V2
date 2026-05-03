import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "super_admin" | "broker" | "client" | null;
export type BrokerAccount = { name: string; brokerId: string; password: string };

export interface AuthUser {
  email: string;
  name: string;
  role: UserRole;
  brokerId?: string;
  loginAt: number;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isBroker: boolean;
  isLoggedIn: boolean;
  failedAttempts: number;
  isLocked: boolean;
  lockRemainingMin: number;
}

export type AuditEvent = {
  ts: number;
  type: "login_success" | "login_fail" | "logout" | "lockout";
  email: string;
  ip?: string;
};

export function getAuditLog(): AuditEvent[] {
  try { return JSON.parse(localStorage.getItem("finexperts_audit") || "[]"); } catch { return []; }
}
function appendAudit(ev: AuditEvent) {
  const log = getAuditLog().slice(-199);
  log.push(ev);
  localStorage.setItem("finexperts_audit", JSON.stringify(log));
}

const SUPER_ADMIN_CREDENTIALS: [string, string][] = [
  ["admin@finexperts.ro", "Admin#2026!"],
  ["admin@finexperts.ro", "admin123"],
];

export const BROKER_ACCOUNTS: Record<string, BrokerAccount> = {
  "alexandra.achim@kiwifinance.ro": { name: "Alexandra Achim", brokerId: "alexandra-achim", password: "Kiwi#2026!" },
  "cristina.coman@kiwifinance.ro":  { name: "Cristina Coman",  brokerId: "cristina-coman",  password: "Kiwi#2026!" },
  "ana-maria.gheorghe@kiwifinance.ro": { name: "Ana-Maria Erji", brokerId: "ana-maria-erji", password: "Kiwi#2026!" },
  "mihai.tudor@kiwifinance.ro":     { name: "Mihai Tudor",     brokerId: "tudor-mihai",     password: "Kiwi#2026!" },
};

export function setBrokerAccounts(accounts: Record<string, BrokerAccount>) {
  try {
    localStorage.setItem("finexperts_broker_accounts", JSON.stringify(accounts));
    localStorage.removeItem("finexperts_broker");
  } catch {}
}

export function getBrokerAccounts(): Record<string, BrokerAccount> {
  try {
    const saved = localStorage.getItem("finexperts_broker_accounts");
    return saved ? JSON.parse(saved) as typeof BROKER_ACCOUNTS : BROKER_ACCOUNTS;
  } catch {
    return BROKER_ACCOUNTS;
  }
}

export function getBrokerAccountsList(): Array<{ email: string; account: BrokerAccount }> {
  return Object.entries(getBrokerAccounts()).map(([email, account]) => ({ email, account }));
}

const ADMIN_OVERRIDE_KEY = "finexperts_admin_password";

export function checkEmailExists(email: string): "broker" | "admin" | "client" | null {
  const emailNorm = email.trim().toLowerCase();
  if (emailNorm === "admin@finexperts.ro") return "admin";
  if (emailNorm === "tudormihaicristian96@gmail.com") return "client";
  if (BROKER_ACCOUNTS[emailNorm] || getBrokerAccounts()[emailNorm]) return "broker";
  const savedUser = localStorage.getItem("finexperts_user");
  if (savedUser) {
    try {
      const u: AuthUser = JSON.parse(savedUser);
      if (u.email.trim().toLowerCase() === emailNorm) return "client";
    } catch {}
  }
  return null;
}

export function resetPasswordForEmail(email: string, newPassword: string): boolean {
  const emailNorm = email.trim().toLowerCase();
  if (emailNorm === "admin@finexperts.ro") {
    try {
      localStorage.setItem(ADMIN_OVERRIDE_KEY, newPassword);
      return true;
    } catch { return false; }
  }
  const accounts = getBrokerAccounts();
  if (accounts[emailNorm]) {
    accounts[emailNorm] = { ...accounts[emailNorm], password: newPassword };
    setBrokerAccounts(accounts);
    return true;
  }
  const savedUserRaw = localStorage.getItem("finexperts_user");
  if (savedUserRaw) {
    try {
      const savedUser: AuthUser = JSON.parse(savedUserRaw);
      if (savedUser.email.trim().toLowerCase() === emailNorm) {
        const updatedUser = { ...savedUser, loginAt: Date.now() };
        localStorage.setItem("finexperts_user", JSON.stringify(updatedUser));
        return true;
      }
    } catch {}
  }
  return false;
}

const SESSION_MS = 8 * 60 * 60 * 1000;
const MAX_FAILS = 5;
const LOCK_MS = 15 * 60 * 1000;
const FAIL_KEY = "finexperts_fails";
const LOCK_KEY = "finexperts_lockuntil";

function getFails(): number {
  return parseInt(localStorage.getItem(FAIL_KEY) || "0", 10);
}
function getLockUntil(): number {
  return parseInt(localStorage.getItem(LOCK_KEY) || "0", 10);
}
function incFail(email: string) {
  const n = getFails() + 1;
  localStorage.setItem(FAIL_KEY, String(n));
  if (n >= MAX_FAILS) {
    const until = Date.now() + LOCK_MS;
    localStorage.setItem(LOCK_KEY, String(until));
    appendAudit({ ts: Date.now(), type: "lockout", email });
  }
}
function resetFails() {
  localStorage.removeItem(FAIL_KEY);
  localStorage.removeItem(LOCK_KEY);
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => ({ success: false }),
  logout: () => {},
  isAdmin: false,
  isSuperAdmin: false,
  isBroker: false,
  isLoggedIn: false,
  failedAttempts: 0,
  isLocked: false,
  lockRemainingMin: 0,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem("finexperts_user");
      if (!saved) return null;
      const u: AuthUser = JSON.parse(saved);
      if (Date.now() - u.loginAt > SESSION_MS) {
        localStorage.removeItem("finexperts_user");
        return null;
      }
      return u;
    } catch { return null; }
  });

  const [failedAttempts, setFailedAttempts] = useState(getFails);
  const [lockUntil, setLockUntil] = useState(getLockUntil);

  const isLocked = Date.now() < lockUntil;
  const lockRemainingMin = isLocked ? Math.ceil((lockUntil - Date.now()) / 60000) : 0;

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const now = Date.now();
    const currentLock = getLockUntil();
    if (now < currentLock) {
      const min = Math.ceil((currentLock - now) / 60000);
      return { success: false, error: `Cont blocat temporar. Reîncearcă în ${min} minut${min > 1 ? "e" : ""}.` };
    }

    const emailNorm = email.trim().toLowerCase();

    const adminOverride = localStorage.getItem("finexperts_admin_password");
    const isSuper = (adminOverride && emailNorm === "admin@finexperts.ro" && password === adminOverride)
      || SUPER_ADMIN_CREDENTIALS.some(([e, p]) => e === emailNorm && p === password);
    if (isSuper) {
      const u: AuthUser = { email: emailNorm, name: "Administrator", role: "super_admin", loginAt: now };
      setUser(u);
      localStorage.setItem("finexperts_user", JSON.stringify(u));
      resetFails(); setFailedAttempts(0); setLockUntil(0);
      appendAudit({ ts: now, type: "login_success", email: emailNorm });
      return { success: true };
    }

    const brokerAcc = getBrokerAccounts()[emailNorm];
    if (brokerAcc && brokerAcc.password === password) {
      const u: AuthUser = { email: emailNorm, name: brokerAcc.name, role: "broker", brokerId: brokerAcc.brokerId, loginAt: now };
      setUser(u);
      localStorage.setItem("finexperts_user", JSON.stringify(u));
      resetFails(); setFailedAttempts(0); setLockUntil(0);
      appendAudit({ ts: now, type: "login_success", email: emailNorm });
      return { success: true };
    }

    if (emailNorm && password.length >= 6) {
      const clientUser: AuthUser = {
        email: emailNorm,
        name: emailNorm.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        role: "client",
        loginAt: now,
      };
      setUser(clientUser);
      localStorage.setItem("finexperts_user", JSON.stringify(clientUser));
      resetFails(); setFailedAttempts(0); setLockUntil(0);
      appendAudit({ ts: now, type: "login_success", email: emailNorm });
      return { success: true };
    }

    incFail(emailNorm);
    const newFails = getFails();
    setFailedAttempts(newFails);
    const newLock = getLockUntil();
    setLockUntil(newLock);
    appendAudit({ ts: now, type: "login_fail", email: emailNorm });
    if (newFails >= MAX_FAILS) {
      const min = Math.ceil(LOCK_MS / 60000);
      return { success: false, error: `Prea multe încercări eșuate. Cont blocat ${min} minute.` };
    }
    return { success: false, error: `Date incorecte. (${MAX_FAILS - newFails} încercări rămase)` };
  };

  const logout = () => {
    if (user) appendAudit({ ts: Date.now(), type: "logout", email: user.email });
    setUser(null);
    localStorage.removeItem("finexperts_user");
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAdmin: user?.role === "super_admin" || user?.role === "broker",
      isSuperAdmin: user?.role === "super_admin",
      isBroker: user?.role === "broker",
      isLoggedIn: !!user,
      failedAttempts,
      isLocked,
      lockRemainingMin,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
