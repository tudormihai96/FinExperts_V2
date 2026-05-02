export type Bank = {
  id: string;
  name: string;
  initials: string;
  color: string;
  logo: string;
  ratePersonal: number;
  rateIpotecar: number;
  daePersonal: number;
  daeIpotecar: number;
  rating: number;
  rank: number;
  badge?: string;
  badgeColor?: string;
  slug: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
  minAmountPersonal: number;
  maxAmountPersonal: number;
  minAmountIpotecar: number;
  maxAmountIpotecar: number;
  minMonthsPersonal: number;
  maxMonthsPersonal: number;
  minMonthsIpotecar: number;
  maxMonthsIpotecar: number;
};

export const banks: Bank[] = [
  {
    id: "intesa-sanpaolo",
    name: "Intesa Sanpaolo Bank",
    initials: "IS",
    color: "#1C3F7A",
    logo: "https://www.google.com/s2/favicons?domain=intesasanpaolobank.ro&sz=64",
    ratePersonal: 5.90,
    rateIpotecar: 5.20,
    daePersonal: 7.38,
    daeIpotecar: 5.62,
    rating: 4.5,
    rank: 1,
    badge: "DOBÂNDĂ FIXĂ PROMO",
    badgeColor: "#2E7D5B",
    slug: "intesa-sanpaolo",
    description: "Intesa Sanpaolo Bank România este filială a grupului bancar italian Intesa Sanpaolo, unul dintre cele mai mari grupuri bancare din Europa. Oferă cea mai competitivă dobândă fixă pentru creditele personale.",
    advantages: ["Cea mai mică dobândă fixă personal (5.90%)", "Dobândă fixă pe toată durata", "Aprobare rapidă în 24-48h", "Fără comision de administrare"],
    disadvantages: ["Rețea de sucursale limitată", "Necesită cont curent Intesa"],
    minAmountPersonal: 1500, maxAmountPersonal: 200000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 800000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "ing-bank",
    name: "ING Bank",
    initials: "IB",
    color: "#FF6200",
    logo: "https://www.google.com/s2/favicons?domain=ing.ro&sz=64",
    ratePersonal: 5.99,
    rateIpotecar: 4.85,
    daePersonal: 6.81,
    daeIpotecar: 5.70,
    rating: 4.8,
    rank: 2,
    badge: "TOP 1 PERSONAL",
    badgeColor: "#FF6200",
    slug: "ing-bank",
    description: "ING Bank — lider digital banking în România. Aplicare 100% online, pre-aprobare instant prin HomeBank, fără sucursale necesare.",
    advantages: ["Cea mai mică dobândă personal (5.99%)", "Aplicare 100% online", "Pre-aprobare instant"],
    disadvantages: ["Convenție virare venit necesară", "Rețea fizică redusă"],
    minAmountPersonal: 1500, maxAmountPersonal: 200000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 600000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "bcr",
    name: "BCR",
    initials: "BCR",
    color: "#E30613",
    logo: "https://www.google.com/s2/favicons?domain=bcr.ro&sz=64",
    ratePersonal: 6.29,
    rateIpotecar: 4.65,
    daePersonal: 7.48,
    daeIpotecar: 5.10,
    rating: 4.5,
    rank: 3,
    badge: "TOP 3 IPOTECAR — 4.65%",
    badgeColor: "#0A1A2E",
    slug: "bcr",
    description: "BCR este cea mai mare bancă din România prin active, cu o rețea de peste 2.000 de terminale ATM și 800 de sucursale. Membră a grupului Erste Group.",
    advantages: ["Aprobare rapidă în 24h", "Fără garanții pentru credite personale până la 75.000 RON", "Asigurare de viață inclusă", "App BCR George"],
    disadvantages: ["DAE mai ridicat față de concurență", "Comision de administrare lunar"],
    minAmountPersonal: 2000, maxAmountPersonal: 150000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 1000000,
    minMonthsPersonal: 6, maxMonthsPersonal: 84,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "garanti-bbva",
    name: "Garanti BBVA",
    initials: "GB",
    color: "#009B77",
    logo: "https://www.google.com/s2/favicons?domain=garantibbva.ro&sz=64",
    ratePersonal: 7.29,
    rateIpotecar: 5.45,
    daePersonal: 7.95,
    daeIpotecar: 5.98,
    rating: 4.3,
    rank: 4,
    badge: "DOBÂNDĂ REDUSĂ PRIMUL AN",
    badgeColor: "#C6A667",
    slug: "garanti-bbva",
    description: "Garanti BBVA România este o bancă cu capital turcesc-spaniol, filială a Garanti BBVA, la rândul ei filială a grupului BBVA. Dobândă redusă în primul an de creditare.",
    advantages: ["Dobândă redusă în primul an", "Condiții speciale clienți existenți", "Digital banking avansat"],
    disadvantages: ["Dobânda crește după primul an", "Rețea de sucursale mică"],
    minAmountPersonal: 2000, maxAmountPersonal: 75000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 500000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "unicredit",
    name: "UniCredit Bank",
    initials: "UC",
    color: "#E11F26",
    logo: "https://www.google.com/s2/favicons?domain=unicredit.ro&sz=64",
    ratePersonal: 7.50,
    rateIpotecar: 5.50,
    daePersonal: 8.20,
    daeIpotecar: 6.05,
    rating: 4.2,
    rank: 5,
    slug: "unicredit",
    description: "UniCredit Bank este prezentă în România din 1995 și face parte din Grupul UniCredit, unul dintre cele mai mari grupuri bancare europene.",
    advantages: ["Acces la credite în EUR", "Condiții speciale pentru angajații corporații", "Produse flexibile"],
    disadvantages: ["Dobânzi peste medie", "Necesită documente suplimentare pentru PFA"],
    minAmountPersonal: 3000, maxAmountPersonal: 100000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 700000,
    minMonthsPersonal: 6, maxMonthsPersonal: 72,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "brd",
    name: "BRD",
    initials: "BRD",
    color: "#0066B2",
    logo: "https://www.google.com/s2/favicons?domain=brd.ro&sz=64",
    ratePersonal: 7.80,
    rateIpotecar: 5.60,
    daePersonal: 8.50,
    daeIpotecar: 6.15,
    rating: 4.2,
    rank: 6,
    slug: "brd",
    description: "BRD – Groupe Société Générale este a doua bancă din România prin mărime. Parte a grupului francez Société Générale.",
    advantages: ["Dobândă fixă pe toată durata", "Rambursare anticipată fără penalități după 12 luni", "MyBRD Mobile Banking"],
    disadvantages: ["DAE mai mare față de top 3", "Comision de analiză 2%"],
    minAmountPersonal: 3000, maxAmountPersonal: 100000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 700000,
    minMonthsPersonal: 6, maxMonthsPersonal: 72,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "raiffeisen",
    name: "Raiffeisen Bank",
    initials: "RB",
    color: "#FFDD00",
    logo: "https://www.google.com/s2/favicons?domain=raiffeisen.ro&sz=64",
    ratePersonal: 8.10,
    rateIpotecar: 5.75,
    daePersonal: 8.80,
    daeIpotecar: 6.30,
    rating: 4.1,
    rank: 7,
    slug: "raiffeisen",
    description: "Raiffeisen Bank România face parte din Grupul Raiffeisen Bank International, una dintre cele mai mari bănci austriece.",
    advantages: ["Oferte personalizate pe profil", "Smart Mobile Banking", "Pachete de credite și asigurări"],
    disadvantages: ["Dobânzi peste medie", "Necesită cont curent Raiffeisen"],
    minAmountPersonal: 1000, maxAmountPersonal: 120000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 700000,
    minMonthsPersonal: 6, maxMonthsPersonal: 84,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "exim-bank",
    name: "Exim Bank",
    initials: "EB",
    color: "#005BAA",
    logo: "https://www.google.com/s2/favicons?domain=eximbank.ro&sz=64",
    ratePersonal: 8.50,
    rateIpotecar: 6.00,
    daePersonal: 9.20,
    daeIpotecar: 6.55,
    rating: 3.9,
    rank: 8,
    slug: "exim-bank",
    description: "EximBank este banca de export-import a României, cu capital majoritar de stat. Oferă produse de creditare pentru persoane fizice și IMM-uri.",
    advantages: ["Capital de stat — stabilitate", "Condiții flexibile pentru antreprenori", "Produse specializate export"],
    disadvantages: ["Rețea de sucursale mică", "Dobânzi mai mari față de bănci private"],
    minAmountPersonal: 2000, maxAmountPersonal: 80000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 400000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 300,
  },
  {
    id: "libra-bank",
    name: "Libra Bank",
    initials: "LB",
    color: "#7B2D8B",
    logo: "https://www.google.com/s2/favicons?domain=librabank.ro&sz=64",
    ratePersonal: 9.00,
    rateIpotecar: 6.30,
    daePersonal: 9.70,
    daeIpotecar: 6.85,
    rating: 3.8,
    rank: 9,
    slug: "libra-bank",
    description: "Libra Internet Bank este o bancă 100% digitală, cu procese simplificate și o abordare prietenoasă față de antreprenori și freelanceri.",
    advantages: ["Bancă 100% digitală", "Procese simplificate", "Ideal pentru antreprenori"],
    disadvantages: ["Dobânzi mai mari", "Fără rețea fizică"],
    minAmountPersonal: 1000, maxAmountPersonal: 60000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 350000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 300,
  },
  {
    id: "patria-bank",
    name: "Patria Bank",
    initials: "PB",
    color: "#1A1A6E",
    logo: "https://www.google.com/s2/favicons?domain=patriabank.ro&sz=64",
    ratePersonal: 9.50,
    rateIpotecar: 6.80,
    daePersonal: 10.30,
    daeIpotecar: 7.40,
    rating: 3.7,
    rank: 10,
    slug: "patria-bank",
    description: "Patria Bank se adresează cu precădere persoanelor fizice din mediul urban și rural, inclusiv persoanelor cu venituri variabile.",
    advantages: ["Acceptă PFA și liber profesioniști", "Proces de aprobare flexibil", "Filiala rurală extinsă"],
    disadvantages: ["Dobânzi ridicate", "Suma maximă mai mică"],
    minAmountPersonal: 500, maxAmountPersonal: 50000,
    minAmountIpotecar: 20000, maxAmountIpotecar: 300000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 240,
  },
  {
    id: "nexent-bank",
    name: "Nexent Bank",
    initials: "NB",
    color: "#444444",
    logo: "https://www.google.com/s2/favicons?domain=nexentbank.ro&sz=64",
    ratePersonal: 10.00,
    rateIpotecar: 7.20,
    daePersonal: 10.90,
    daeIpotecar: 7.80,
    rating: 3.6,
    rank: 11,
    slug: "nexent-bank",
    description: "Nexent Bank se adresează cu precădere IMM-urilor și persoanelor fizice din Transilvania și restul României.",
    advantages: ["Aprobare rapidă", "Condiții flexibile", "Suport personalizat"],
    disadvantages: ["Cele mai mari dobânzi", "Rețea limitată"],
    minAmountPersonal: 1000, maxAmountPersonal: 50000,
    minAmountIpotecar: 20000, maxAmountIpotecar: 250000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 240,
  },
];

export function calculateMonthlyPayment(principal: number, annualRate: number, months: number): number {
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  const payment = principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  return payment;
}

export function formatRON(value: number): string {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(value) + " RON";
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: decimals }).format(value);
}
