import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "admin" | "client" | null;

interface AuthUser {
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
  isAdmin: false,
  isLoggedIn: false,
});

const ADMIN_EMAIL = "admin@finexperts.ro";
const ADMIN_PASS = "admin123";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem("finexperts_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      const adminUser: AuthUser = { email, name: "Administrator", role: "admin" };
      setUser(adminUser);
      localStorage.setItem("finexperts_user", JSON.stringify(adminUser));
      return true;
    }
    if (email && password.length >= 6) {
      const clientUser: AuthUser = {
        email,
        name: email.split("@")[0].replace(/\./g, " ").replace(/^\w/, c => c.toUpperCase()),
        role: "client",
      };
      setUser(clientUser);
      localStorage.setItem("finexperts_user", JSON.stringify(clientUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("finexperts_user");
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAdmin: user?.role === "admin",
      isLoggedIn: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
