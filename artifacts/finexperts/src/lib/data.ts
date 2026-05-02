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

// Dobânzi actualizate la 02.05.2026 de pe site-urile oficiale ale băncilor
// IRCC T1/2026 = 5.58% | Dobânzi personale = fixe negociate; Ipotecar = IRCC + marjă
export const banks: Bank[] = [
  {
    id: "ing-bank",
    name: "ING Bank",
    initials: "ING",
    color: "#FF6200",
    logo: "/logos/ing.svg",
    // ING Personal: fixă de la 7.99%/an; Ipotecar: IRCC+2.00% = 7.58%
    ratePersonal: 7.99,
    rateIpotecar: 7.58,
    daePersonal: 8.85,
    daeIpotecar: 8.12,
    rating: 4.8,
    rank: 1,
    badge: "CEL MAI BUN",
    badgeColor: "#FF6200",
    slug: "ing-bank",
    description: "ING Bank — lider digital banking în România. Aplicare 100% online, pre-aprobare instant prin HomeBank.",
    advantages: ["Dobândă personal de la 7.99% fixă", "Aplicare 100% online", "Pre-aprobare instant", "Fără vizite la bancă"],
    disadvantages: ["Convenție virare venit necesară", "Rețea fizică redusă"],
    minAmountPersonal: 1500, maxAmountPersonal: 250000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 600000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "raiffeisen",
    name: "Raiffeisen Bank",
    initials: "RB",
    color: "#FFDD00",
    logo: "/logos/raiffeisen.svg",
    // Raiffeisen Flexicredit: de la 8.49%/an fixă; Ipotecar: IRCC+2.10% = 7.68%
    ratePersonal: 8.49,
    rateIpotecar: 7.68,
    daePersonal: 9.20,
    daeIpotecar: 8.22,
    rating: 4.4,
    rank: 2,
    badge: "100% ONLINE",
    badgeColor: "#FFDD00",
    slug: "raiffeisen",
    description: "Raiffeisen Bank România — Flexicredit cu dobândă fixă de la 8,49%/an. Parte din Grupul Raiffeisen Bank International.",
    advantages: ["Aplicare online completă", "Aprobare rapidă 24h", "Smart Mobile Banking", "Până la 250.000 RON"],
    disadvantages: ["Necesită cont curent Raiffeisen", "Scoring minim restrictiv"],
    minAmountPersonal: 1000, maxAmountPersonal: 250000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 700000,
    minMonthsPersonal: 6, maxMonthsPersonal: 84,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "brd",
    name: "BRD",
    initials: "BRD",
    color: "#0055A4",
    logo: "/logos/brd.svg",
    // BRD: personal ~9.50%/an; Ipotecar variabilă: IRCC+1.70% = 7.28%
    ratePersonal: 9.50,
    rateIpotecar: 7.28,
    daePersonal: 10.30,
    daeIpotecar: 7.85,
    rating: 4.1,
    rank: 3,
    badge: "IPOTECAR DE LA 7.28%",
    badgeColor: "#0055A4",
    slug: "brd",
    description: "BRD – Groupe Société Générale, a doua bancă din România. Credit ipotecar variabil de la 7.28% (IRCC+1.70%).",
    advantages: ["Cea mai mică marjă ipotecar (IRCC+1.70%)", "Rambursare anticipată fără penalități", "MyBRD Mobile Banking"],
    disadvantages: ["DAE personal mai ridicat", "Comision analiză 2%"],
    minAmountPersonal: 3000, maxAmountPersonal: 100000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 700000,
    minMonthsPersonal: 6, maxMonthsPersonal: 72,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "garanti-bbva",
    name: "Garanti BBVA",
    initials: "GB",
    color: "#00A758",
    logo: "/logos/garanti.svg",
    // Garanti BBVA: personal ~9.25%/an; Ipotecar: IRCC+2.35% = 7.93%
    ratePersonal: 9.25,
    rateIpotecar: 7.93,
    daePersonal: 10.10,
    daeIpotecar: 8.50,
    rating: 4.2,
    rank: 4,
    badge: "DIGITAL BANKING",
    badgeColor: "#00A758",
    slug: "garanti-bbva",
    description: "Garanti BBVA România — dobândă de la 9.25% pentru credite personale fără garanții, sume până la 250.000 RON.",
    advantages: ["Dobândă competitivă fără garanții", "Sume până la 250.000 RON", "Digital banking avansat"],
    disadvantages: ["Rețea de sucursale mică", "Necesită scoring bun"],
    minAmountPersonal: 2000, maxAmountPersonal: 250000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 500000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "bcr",
    name: "BCR",
    initials: "BCR",
    color: "#E30613",
    logo: "/logos/bcr.svg",
    // BCR: personal IRCC+marjă ~10.50%/an; Ipotecar: IRCC+2.25% = 7.83%
    ratePersonal: 10.50,
    rateIpotecar: 7.83,
    daePersonal: 11.40,
    daeIpotecar: 8.40,
    rating: 4.3,
    rank: 5,
    badge: "REȚEA NAȚIONALĂ",
    badgeColor: "#E30613",
    slug: "bcr",
    description: "BCR — cea mai mare bancă din România, membră Erste Group. Credit ipotecar IRCC + marjă, rețea de 800+ sucursale.",
    advantages: ["Cea mai mare rețea națională", "App George", "Aprobare în 24h", "Asigurare viață inclusă"],
    disadvantages: ["DAE mai ridicat față de top", "Marjă variabilă ipotecar"],
    minAmountPersonal: 2000, maxAmountPersonal: 150000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 1000000,
    minMonthsPersonal: 6, maxMonthsPersonal: 84,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "unicredit",
    name: "UniCredit Bank",
    initials: "UC",
    color: "#E11F26",
    logo: "/logos/unicredit.svg",
    // UniCredit: personal IRCC+marjă ~10.75%/an; Ipotecar: IRCC+2.30% = 7.88%
    ratePersonal: 10.75,
    rateIpotecar: 7.88,
    daePersonal: 11.60,
    daeIpotecar: 8.45,
    rating: 4.0,
    rank: 6,
    slug: "unicredit",
    description: "UniCredit Bank România — parte din grupul european UniCredit. Credite personale până la 250.000 RON, soluții în EUR.",
    advantages: ["Credite în EUR disponibile", "Condiții speciale corporații", "Până la 250.000 RON"],
    disadvantages: ["Dobânzi variabile IRCC+marjă", "Documente suplimentare PFA"],
    minAmountPersonal: 3000, maxAmountPersonal: 250000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 700000,
    minMonthsPersonal: 6, maxMonthsPersonal: 72,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "exim-bank",
    name: "Exim Banca Românească",
    initials: "EB",
    color: "#00338D",
    logo: "/logos/exim.svg",
    // Exim: personal ~10.25%/an; Ipotecar: IRCC+2.50% = 8.08%
    ratePersonal: 10.25,
    rateIpotecar: 8.08,
    daePersonal: 11.10,
    daeIpotecar: 8.65,
    rating: 4.0,
    rank: 7,
    badge: "BANCĂ DE STAT",
    badgeColor: "#00338D",
    slug: "exim-bank",
    description: "Exim Banca Românească — bancă de stat cu stabilitate garantată. Condiții flexibile pentru antreprenori.",
    advantages: ["Capital de stat — stabilitate", "Condiții flexibile antreprenori", "Dobânzi competitive"],
    disadvantages: ["Rețea de sucursale mică", "Procese mai lente"],
    minAmountPersonal: 2000, maxAmountPersonal: 100000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 400000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 300,
  },
  {
    id: "intesa-sanpaolo",
    name: "Intesa Sanpaolo Bank",
    initials: "IS",
    color: "#003087",
    logo: "/logos/intesa.svg",
    // Intesa: personal ~11.50%/an; Ipotecar: IRCC+2.20% = 7.78%
    ratePersonal: 11.50,
    rateIpotecar: 7.78,
    daePersonal: 12.35,
    daeIpotecar: 8.35,
    rating: 4.1,
    rank: 8,
    slug: "intesa-sanpaolo",
    description: "Intesa Sanpaolo Bank România — filială a grupului italian Intesa Sanpaolo, cu oferte competitive pentru ipotecar.",
    advantages: ["Dobândă fixă opțională ipotecar", "Aprobare rapidă 24-48h", "Grup bancar european solid"],
    disadvantages: ["Dobândă personal mai ridicată", "Rețea de sucursale limitată"],
    minAmountPersonal: 1500, maxAmountPersonal: 200000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 800000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "libra-bank",
    name: "Libra Internet Bank",
    initials: "LB",
    color: "#5B21B6",
    logo: "/logos/libra.svg",
    // Libra: personal ~11.99%/an; Ipotecar: IRCC+2.70% = 8.28%
    ratePersonal: 11.99,
    rateIpotecar: 8.28,
    daePersonal: 12.90,
    daeIpotecar: 8.85,
    rating: 3.8,
    rank: 9,
    slug: "libra-bank",
    description: "Libra Internet Bank — bancă 100% digitală, ideală pentru antreprenori și freelanceri. Procese simplificate online.",
    advantages: ["Bancă 100% digitală", "Procese simplificate online", "Ideal antreprenori și PFA"],
    disadvantages: ["Dobânzi variabile IRCC-indexate", "Fără rețea fizică"],
    minAmountPersonal: 1000, maxAmountPersonal: 60000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 350000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 300,
  },
  {
    id: "patria-bank",
    name: "Patria Bank",
    initials: "PB",
    color: "#0B1F5C",
    logo: "/logos/patria.svg",
    // Patria: personal ~12.99%/an; Ipotecar: IRCC+3.50% = 9.08%
    ratePersonal: 12.99,
    rateIpotecar: 9.08,
    daePersonal: 14.10,
    daeIpotecar: 9.70,
    rating: 3.7,
    rank: 10,
    slug: "patria-bank",
    description: "Patria Bank — soluții de creditare pentru persoane fizice, PFA și antreprenori, inclusiv venituri variabile.",
    advantages: ["Acceptă PFA și liber profesioniști", "Proces de aprobare flexibil", "Filiala rurală extinsă"],
    disadvantages: ["Dobânzi mai ridicate", "Suma maximă mai mică"],
    minAmountPersonal: 500, maxAmountPersonal: 50000,
    minAmountIpotecar: 20000, maxAmountIpotecar: 300000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 240,
  },
  {
    id: "nexent-bank",
    name: "Nexent Bank",
    initials: "NB",
    color: "#1E293B",
    logo: "/logos/nexent.svg",
    // Nexent: personal ~13.99%/an; Ipotecar: IRCC+4.00% = 9.58%
    ratePersonal: 13.99,
    rateIpotecar: 9.58,
    daePersonal: 15.20,
    daeIpotecar: 10.25,
    rating: 3.6,
    rank: 11,
    slug: "nexent-bank",
    description: "Nexent Bank — soluții de creditare pentru persoane fizice și IMM-uri, cu accent pe regiunile din centrul României.",
    advantages: ["Aprobare rapidă", "Condiții flexibile", "Suport personalizat"],
    disadvantages: ["Dobânzi mai ridicate", "Rețea limitată"],
    minAmountPersonal: 1000, maxAmountPersonal: 50000,
    minAmountIpotecar: 20000, maxAmountIpotecar: 250000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 240,
  },
];

export function calculateMonthlyPayment(principal: number, annualRate: number, months: number): number {
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  return principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

export function formatRON(value: number): string {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(value) + " RON";
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: decimals }).format(value);
}
