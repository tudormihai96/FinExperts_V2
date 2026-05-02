import { createContext, useContext, useState, ReactNode } from "react";
import { banks as initialBanks, Bank } from "./data";

export interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "personal" | "ipotecar" | "refinantare";
  amount: number;
  bank?: string;
  status: "pending" | "in_review" | "approved" | "rejected";
  date: string;
  message?: string;
}

export interface InsuranceRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  status: "pending" | "contacted" | "closed";
  date: string;
}

export interface Guide {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  image: string;
  date: string;
}

const initialApplications: Application[] = [
  { id: "APP001", name: "Ion Popescu", email: "ion@exemplu.ro", phone: "0722 111 222", type: "ipotecar", amount: 200000, bank: "ING Bank", status: "approved", date: "01 mai 2026", message: "Credit imobiliar pentru apartament 3 camere" },
  { id: "APP002", name: "Maria Ionescu", email: "maria@exemplu.ro", phone: "0733 222 333", type: "personal", amount: 30000, bank: "BCR", status: "in_review", date: "28 apr 2026", message: "Credit nevoi personale renovare" },
  { id: "APP003", name: "Andrei Dumitrescu", email: "andrei@exemplu.ro", phone: "0744 333 444", type: "refinantare", amount: 80000, bank: "Intesa Sanpaolo Bank", status: "pending", date: "25 apr 2026" },
  { id: "APP004", name: "Elena Constantin", email: "elena@exemplu.ro", phone: "0755 444 555", type: "personal", amount: 15000, bank: "Raiffeisen Bank", status: "pending", date: "22 apr 2026" },
  { id: "APP005", name: "Mihai Georgescu", email: "mihai@exemplu.ro", phone: "0766 555 666", type: "ipotecar", amount: 350000, bank: "BRD", status: "rejected", date: "18 apr 2026", message: "DTI depășit" },
];

const initialInsuranceRequests: InsuranceRequest[] = [
  { id: "INS001", name: "Ana Popa", email: "ana@exemplu.ro", phone: "0711 100 200", type: "Asigurare locuință", status: "contacted", date: "02 mai 2026" },
  { id: "INS002", name: "Radu Stoica", email: "radu@exemplu.ro", phone: "0722 200 300", type: "RCA — Răspundere civilă", status: "pending", date: "30 apr 2026" },
  { id: "INS003", name: "Cristina Vlad", email: "cristina@exemplu.ro", phone: "0733 300 400", type: "Asigurare de viață", status: "pending", date: "27 apr 2026" },
];

const initialGuides: Guide[] = [
  { slug: "credit-ipotecar-ghid-complet", title: "Ghid complet credit ipotecar 2026", category: "CREDIT IPOTECAR", excerpt: "Află tot ce trebuie să știi înainte să îți cumperi o locuință prin credit ipotecar.", readTime: "8 min", image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800", date: "15 mai 2026" },
  { slug: "dae-vs-dobanda-nominala", title: "DAE vs. dobânda nominală — ce trebuie să știi", category: "EDUCAȚIE FINANCIARĂ", excerpt: "DAE include dobânda nominală plus toate comisioanele obligatorii.", readTime: "5 min", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800", date: "3 mai 2026" },
  { slug: "refinantare-credit-cand-are-sens", title: "Refinanțare credit — când are sens", category: "REFINANȚARE", excerpt: "Calculează dacă scade suficient rata pentru a acoperi costurile noii bănci.", readTime: "6 min", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800", date: "28 apr 2026" },
  { slug: "credit-personal-fara-garantii", title: "Credit personal fără garanții — ghid complet", category: "CREDIT PERSONAL", excerpt: "Creditele de nevoi personale nu necesită garanții imobiliare.", readTime: "6 min", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800", date: "20 apr 2026" },
  { slug: "prima-casa-ghid", title: "Prima ta casă — ghidul complet pentru cumpărători", category: "CREDIT IPOTECAR", excerpt: "Tot procesul de cumpărare a primei locuințe explicat pas cu pas.", readTime: "10 min", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800", date: "12 apr 2026" },
  { slug: "pfa-credit-documente", title: "Credit PFA — documente și bănci care acceptă", category: "PFA & ANTREPRENORI", excerpt: "Care bănci au criteriile cele mai flexibile pentru PFA.", readTime: "7 min", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800", date: "5 apr 2026" },
];

interface StoreContextType {
  applications: Application[];
  setApplications: (apps: Application[]) => void;
  insuranceRequests: InsuranceRequest[];
  setInsuranceRequests: (reqs: InsuranceRequest[]) => void;
  guides: Guide[];
  setGuides: (guides: Guide[]) => void;
  adminBanks: Bank[];
  setAdminBanks: (banks: Bank[]) => void;
  addApplication: (app: Omit<Application, "id" | "date">) => void;
  addInsuranceRequest: (req: Omit<InsuranceRequest, "id" | "date">) => void;
}

const StoreContext = createContext<StoreContextType>({} as StoreContextType);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [insuranceRequests, setInsuranceRequests] = useState<InsuranceRequest[]>(initialInsuranceRequests);
  const [guides, setGuides] = useState<Guide[]>(initialGuides);
  const [adminBanks, setAdminBanks] = useState<Bank[]>(initialBanks);

  const addApplication = (app: Omit<Application, "id" | "date">) => {
    const newApp: Application = {
      ...app,
      id: "APP" + String(applications.length + 1).padStart(3, "0"),
      date: new Date().toLocaleDateString("ro-RO", { day: "2-digit", month: "short", year: "numeric" }),
    };
    setApplications(prev => [newApp, ...prev]);
  };

  const addInsuranceRequest = (req: Omit<InsuranceRequest, "id" | "date">) => {
    const newReq: InsuranceRequest = {
      ...req,
      id: "INS" + String(insuranceRequests.length + 1).padStart(3, "0"),
      date: new Date().toLocaleDateString("ro-RO", { day: "2-digit", month: "short", year: "numeric" }),
    };
    setInsuranceRequests(prev => [newReq, ...prev]);
  };

  return (
    <StoreContext.Provider value={{
      applications, setApplications,
      insuranceRequests, setInsuranceRequests,
      guides, setGuides,
      adminBanks, setAdminBanks,
      addApplication, addInsuranceRequest,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
