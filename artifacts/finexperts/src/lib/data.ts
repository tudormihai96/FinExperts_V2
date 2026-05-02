export type Bank = {
  id: string;
  name: string;
  initials: string;
  color: string;
  logo: string;
  ratePersonal: number;
  rateIpotecar: number;
  marginIpotecar: number;
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

// ── IRCC automat cu actualizare trimestrială ──────────────────────────────────
// BNR publică IRCC trimestrial (T1=Ian-Mar, T2=Apr-Iun, T3=Iul-Sep, T4=Oct-Dec)
// Tabel istoric + prognoze:
const IRCC_TABLE: Record<string, number> = {
  "2025-Q1": 5.95,
  "2025-Q2": 5.82,
  "2025-Q3": 5.70,
  "2025-Q4": 5.62,
  "2026-Q1": 5.58,
  "2026-Q2": 5.44, // estimat, se actualizează când BNR publică oficial
};

export function getCurrentIRCC(): number {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-12
  const quarter = Math.ceil(month / 3);
  const key = `${year}-Q${quarter}`;
  // returnează valoarea exactă sau cea mai recentă disponibilă
  if (IRCC_TABLE[key] !== undefined) return IRCC_TABLE[key];
  // fallback: ultimul trimestru disponibil
  const keys = Object.keys(IRCC_TABLE).sort();
  return IRCC_TABLE[keys[keys.length - 1]];
}

export function getCurrentIRCCLabel(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const quarter = Math.ceil(month / 3);
  return `IRCC T${quarter}/${year} = ${getCurrentIRCC().toFixed(2)}%`;
}

export const IRCC = getCurrentIRCC();

// ── Date bănci — dobânzi mai 2026 ────────────────────────────────────────────
// Personal = dobândă nominală fixă/an
// Ipotecar = marjă fixă peste IRCC (rata = IRCC + marjă)
export const banks: Bank[] = [
  {
    id: "ing-bank",
    name: "ING Bank",
    initials: "ING",
    color: "#FF6200",
    logo: "/logos/ing.svg",
    ratePersonal: 8.99,
    rateIpotecar: +(IRCC + 1.95).toFixed(2),
    marginIpotecar: 1.95,
    daePersonal: 9.80,
    daeIpotecar: +(IRCC + 2.53).toFixed(2),
    rating: 4.8,
    rank: 1,
    badge: "CEL MAI BUN",
    badgeColor: "#FF6200",
    slug: "ing-bank",
    description: "ING Bank România — lider digital banking. Credit personal fix sau variabil, aplicare 100% online, pre-aprobare instant prin HomeBank.",
    advantages: ["Aplicare 100% online, fără vizite", "Pre-aprobare instant HomeBank", "Credit fix sau variabil", `Ipotecar IRCC+1.95% (${(IRCC+1.95).toFixed(2)}%)`],
    disadvantages: ["Convenție virare venit necesară", "Rețea fizică redusă față de BCR/BRD"],
    minAmountPersonal: 1500, maxAmountPersonal: 250000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 600000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "brd",
    name: "BRD",
    initials: "BRD",
    color: "#0055A4",
    logo: "/logos/brd.png",
    ratePersonal: 9.49,
    rateIpotecar: +(IRCC + 1.70).toFixed(2),
    marginIpotecar: 1.70,
    daePersonal: 10.28,
    daeIpotecar: +(IRCC + 2.27).toFixed(2),
    rating: 4.3,
    rank: 2,
    badge: "CEL MAI BUN IPOTECAR",
    badgeColor: "#0055A4",
    slug: "brd",
    description: "BRD – Groupe Société Générale, a doua bancă din România. Credit ipotecar variabil IRCC+1.70% — cea mai mică marjă din piață.",
    advantages: ["Cea mai mică marjă ipotecar (IRCC+1.70%)", "Rambursare anticipată fără penalități", "MyBRD Mobile Banking", "Rețea extinsă sucursale"],
    disadvantages: ["Suma maximă personal mai mică (100.000 RON)", "Comision analiză dosar"],
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
    logo: "/logos/raiffeisen.svg",
    ratePersonal: 8.49,
    rateIpotecar: +(IRCC + 2.10).toFixed(2),
    marginIpotecar: 2.10,
    daePersonal: 9.25,
    daeIpotecar: +(IRCC + 2.64).toFixed(2),
    rating: 4.4,
    rank: 3,
    badge: "100% ONLINE",
    badgeColor: "#FFDD00",
    slug: "raiffeisen",
    description: "Raiffeisen Bank România — Flexicredit cu dobândă fixă de la 8,49%/an. Credit rapid, 100% online, parte din Grupul Raiffeisen.",
    advantages: ["Aplicare online completă", "Aprobare rapidă 24h", "Smart Mobile Banking", "Până la 250.000 RON"],
    disadvantages: ["Necesită cont curent Raiffeisen", "Scoring minim restrictiv"],
    minAmountPersonal: 1000, maxAmountPersonal: 250000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 700000,
    minMonthsPersonal: 6, maxMonthsPersonal: 84,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "bcr",
    name: "BCR",
    initials: "BCR",
    color: "#2870ed",
    logo: "/logos/bcr.svg",
    ratePersonal: 7.99,
    rateIpotecar: +(IRCC + 2.10).toFixed(2),
    marginIpotecar: 2.10,
    daePersonal: 9.20,
    daeIpotecar: +(IRCC + 2.67).toFixed(2),
    rating: 4.3,
    rank: 4,
    badge: "REȚEA NAȚIONALĂ",
    badgeColor: "#2870ed",
    slug: "bcr",
    description: "BCR — cea mai mare bancă din România, membră Erste Group. George Credit 100% online cu dobândă fixă 7,99%/an, rețea de 800+ sucursale.",
    advantages: ["George Credit 100% online, aprobare rapidă", "Cea mai mare rețea națională (800+ sucursale)", "Asigurare viață inclusă opțional", "Sume până la 150.000 RON"],
    disadvantages: ["Comision administrare lunar", "Necesită virare salariu pentru dobândă redusă"],
    minAmountPersonal: 2000, maxAmountPersonal: 150000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 1000000,
    minMonthsPersonal: 6, maxMonthsPersonal: 84,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "garanti-bbva",
    name: "Garanti BBVA",
    initials: "GB",
    color: "#00A758",
    logo: "/logos/garanti.png",
    ratePersonal: 10.99,
    rateIpotecar: +(IRCC + 2.35).toFixed(2),
    marginIpotecar: 2.35,
    daePersonal: 12.00,
    daeIpotecar: +(IRCC + 2.92).toFixed(2),
    rating: 4.0,
    rank: 5,
    badge: "DIGITAL BANKING",
    badgeColor: "#00A758",
    slug: "garanti-bbva",
    description: "Garanti BBVA România — credit EXTRAcash fără garanții, digital banking complet, parte din grupul BBVA.",
    advantages: ["Credit fără garanții până la 250.000 RON", "Digital banking avansat", "Dobândă ipotecar competitivă"],
    disadvantages: ["Dobândă personal mai ridicată", "Rețea limitată de sucursale"],
    minAmountPersonal: 2000, maxAmountPersonal: 250000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 500000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "unicredit",
    name: "UniCredit Bank",
    initials: "UC",
    color: "#E11F26",
    logo: "/logos/unicredit.svg",
    ratePersonal: 10.75,
    rateIpotecar: +(IRCC + 2.30).toFixed(2),
    marginIpotecar: 2.30,
    daePersonal: 11.60,
    daeIpotecar: +(IRCC + 2.85).toFixed(2),
    rating: 4.0,
    rank: 6,
    slug: "unicredit",
    description: "UniCredit Bank România — parte din grupul european UniCredit. Credite personale până la 250.000 RON, soluții și în EUR.",
    advantages: ["Credite în EUR disponibile", "Condiții speciale pentru corporații", "Până la 250.000 RON personal"],
    disadvantages: ["Dobânzi variabile IRCC+marjă", "Documente suplimentare pentru PFA"],
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
    ratePersonal: 10.25,
    rateIpotecar: +(IRCC + 2.50).toFixed(2),
    marginIpotecar: 2.50,
    daePersonal: 11.10,
    daeIpotecar: +(IRCC + 3.05).toFixed(2),
    rating: 4.0,
    rank: 7,
    badge: "BANCĂ DE STAT",
    badgeColor: "#00338D",
    slug: "exim-bank",
    description: "Exim Banca Românească — bancă de stat cu stabilitate garantată. Condiții flexibile pentru antreprenori și IMM-uri.",
    advantages: ["Capital de stat — stabilitate maximă", "Condiții flexibile antreprenori", "Dobânzi competitive pentru IMM"],
    disadvantages: ["Rețea limitată de sucursale", "Procese de aprobare mai lente"],
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
    logo: "/logos/intesa.png",
    ratePersonal: 11.49,
    rateIpotecar: +(IRCC + 2.20).toFixed(2),
    marginIpotecar: 2.20,
    daePersonal: 12.40,
    daeIpotecar: +(IRCC + 2.77).toFixed(2),
    rating: 4.1,
    rank: 8,
    slug: "intesa-sanpaolo",
    description: "Intesa Sanpaolo Bank România — filială a grupului italian Intesa Sanpaolo, cu oferte competitive pentru ipotecar și condiții clare.",
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
    ratePersonal: 11.99,
    rateIpotecar: +(IRCC + 2.80).toFixed(2),
    marginIpotecar: 2.80,
    daePersonal: 12.90,
    daeIpotecar: +(IRCC + 3.35).toFixed(2),
    rating: 3.8,
    rank: 9,
    slug: "libra-bank",
    description: "Libra Internet Bank — bancă 100% digitală, ideală pentru antreprenori, PFA și freelanceri. Procese simplificate online.",
    advantages: ["Bancă 100% digitală", "Procese simplificate online", "Ideal antreprenori și PFA"],
    disadvantages: ["Dobânzi variabile IRCC-indexate", "Fără rețea fizică de sucursale"],
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
    ratePersonal: 12.99,
    rateIpotecar: +(IRCC + 3.50).toFixed(2),
    marginIpotecar: 3.50,
    daePersonal: 14.15,
    daeIpotecar: +(IRCC + 4.07).toFixed(2),
    rating: 3.7,
    rank: 10,
    slug: "patria-bank",
    description: "Patria Bank — soluții flexibile pentru persoane fizice, PFA și antreprenori, inclusiv cu venituri variabile sau din chirii.",
    advantages: ["Acceptă PFA și liber profesioniști", "Aprobare flexibilă", "Filiale în zone rurale"],
    disadvantages: ["Dobânzi mai ridicate față de băncile mari", "Sumă maximă mai mică"],
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
    logo: "/logos/nexent.png",
    ratePersonal: 13.99,
    rateIpotecar: +(IRCC + 4.00).toFixed(2),
    marginIpotecar: 4.00,
    daePersonal: 15.20,
    daeIpotecar: +(IRCC + 4.58).toFixed(2),
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
