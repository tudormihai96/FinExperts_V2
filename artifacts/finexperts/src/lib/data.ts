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
const IRCC_TABLE: Record<string, number> = {
  "2025-Q1": 6.06,
  "2025-Q2": 6.06,
  "2025-Q3": 5.68,
  "2025-Q4": 5.68,
  "2026-Q1": 5.68,
  "2026-Q2": 5.58,
  "2026-Q3": 5.56,
};

export function getCurrentIRCC(): number {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const quarter = Math.ceil(month / 3);
  const key = `${year}-Q${quarter}`;
  if (IRCC_TABLE[key] !== undefined) return IRCC_TABLE[key];
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
// Personal  = dobândă nominală fixă minimă/an
// Ipotecar  = ofertă cu dobândă fixă/an (nu variabilă IRCC)
// marginIpotecar = marjă de referință față de IRCC (informativ)
export const banks: Bank[] = [
  {
    id: "brd",
    name: "BRD",
    initials: "BRD",
    color: "#0055A4",
    logo: "/logos/brd.png",
    ratePersonal: 9.49,
    rateIpotecar: 7.30,
    marginIpotecar: 1.70,
    daePersonal: 10.28,
    daeIpotecar: 7.85,
    rating: 4.3,
    rank: 1,
    badge: "CEL MAI BUN IPOTECAR",
    badgeColor: "#0055A4",
    slug: "brd",
    description: "BRD – Groupe Société Générale, a doua bancă din România. Credit ipotecar cu dobândă fixă de la 7,30%/an.",
    advantages: ["Cea mai competitivă dobândă fixă ipotecar (7,30%)", "Rambursare anticipată fără penalități", "MyBRD Mobile Banking", "Rețea extinsă sucursale"],
    disadvantages: ["Sumă maximă personal mai mică (100.000 RON)", "Comision analiză dosar"],
    minAmountPersonal: 3000, maxAmountPersonal: 100000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 700000,
    minMonthsPersonal: 6, maxMonthsPersonal: 72,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "banca-transilvania",
    name: "Banca Transilvania",
    initials: "BT",
    color: "#0067B0",
    logo: "/logos/bt.svg",
    ratePersonal: 9.90,
    rateIpotecar: 7.50,
    marginIpotecar: 1.92,
    daePersonal: 10.70,
    daeIpotecar: 8.10,
    rating: 4.5,
    rank: 2,
    badge: "CEA MAI MARE BANCĂ RO",
    badgeColor: "#0067B0",
    slug: "banca-transilvania",
    description: "Banca Transilvania — cea mai mare bancă românească. Credit ipotecar fix de la 7,50%/an, digitalizare avansată.",
    advantages: ["Cea mai mare bancă românească după active", "Ipotecar fix de la 7,50%/an", "George & BT Pay — digital banking avansat", "Rețea națională extinsă"],
    disadvantages: ["Dobândă personal mai ridicată față de Raiffeisen", "Condiții mai stricte pentru sume mari"],
    minAmountPersonal: 3000, maxAmountPersonal: 200000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 800000,
    minMonthsPersonal: 6, maxMonthsPersonal: 84,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "ing-bank",
    name: "ING Bank",
    initials: "ING",
    color: "#FF6200",
    logo: "/logos/ing.svg",
    ratePersonal: 8.99,
    rateIpotecar: 7.65,
    marginIpotecar: 1.95,
    daePersonal: 9.80,
    daeIpotecar: 8.20,
    rating: 4.8,
    rank: 3,
    badge: "CEL MAI BUN DIGITAL",
    badgeColor: "#FF6200",
    slug: "ing-bank",
    description: "ING Bank România — lider digital banking. Credit personal fix sau variabil, aplicare 100% online, pre-aprobare instant prin HomeBank.",
    advantages: ["Aplicare 100% online, fără vizite", "Pre-aprobare instant HomeBank", "Credit fix sau variabil", "Ipotecar fix 7,65%/an"],
    disadvantages: ["Convenție virare venit necesară", "Rețea fizică redusă față de BCR/BRD"],
    minAmountPersonal: 1500, maxAmountPersonal: 250000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 600000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "cec-bank",
    name: "CEC Bank",
    initials: "CEC",
    color: "#003399",
    logo: "/logos/cec.svg",
    ratePersonal: 9.25,
    rateIpotecar: 7.73,
    marginIpotecar: 2.15,
    daePersonal: 10.10,
    daeIpotecar: 8.35,
    rating: 4.1,
    rank: 4,
    badge: "BANCĂ DE STAT",
    badgeColor: "#003399",
    slug: "cec-bank",
    description: "CEC Bank — bancă de stat cu tradiție de 160 ani. Credit ipotecar fix 7,73%/an, rețea națională largă inclusiv zone rurale.",
    advantages: ["Capital de stat — stabilitate maximă", "Rețea națională inclusiv zone rurale (1.000+ agenții)", "Ipotecar fix 7,73%/an", "Condiții avantajoase pentru bugetari"],
    disadvantages: ["Digitalizare în curs de îmbunătățire", "Procese mai lente față de băncile private"],
    minAmountPersonal: 2000, maxAmountPersonal: 120000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 500000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "raiffeisen",
    name: "Raiffeisen Bank",
    initials: "RB",
    color: "#FFDD00",
    logo: "/logos/raiffeisen.svg",
    ratePersonal: 5.55,
    rateIpotecar: 7.68,
    marginIpotecar: 2.10,
    daePersonal: 9.49,
    daeIpotecar: 8.25,
    rating: 4.4,
    rank: 5,
    badge: "100% ONLINE",
    badgeColor: "#FFDD00",
    slug: "raiffeisen",
    description: "Raiffeisen Bank România — Flexicredit cu dobândă fixă de la 5,55%/an. Credit rapid, 100% online, parte din Grupul Raiffeisen.",
    advantages: ["Dobândă personal de la 5,55% — cea mai mică fixă", "Aplicare online completă", "Smart Mobile Banking", "Până la 250.000 RON"],
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
    rateIpotecar: 7.75,
    marginIpotecar: 2.10,
    daePersonal: 9.20,
    daeIpotecar: 8.30,
    rating: 4.3,
    rank: 6,
    badge: "REȚEA NAȚIONALĂ",
    badgeColor: "#2870ed",
    slug: "bcr",
    description: "BCR — cea mai mare bancă după active, membră Erste Group. George Credit 100% online cu dobândă fixă 7,99%/an, rețea de 800+ sucursale.",
    advantages: ["George Credit 100% online, aprobare rapidă", "Cea mai mare rețea națională (800+ sucursale)", "Asigurare viață inclusă opțional", "Sume până la 150.000 RON"],
    disadvantages: ["Comision administrare lunar", "Necesită virare salariu pentru dobândă redusă"],
    minAmountPersonal: 2000, maxAmountPersonal: 150000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 1000000,
    minMonthsPersonal: 6, maxMonthsPersonal: 84,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "intesa-sanpaolo",
    name: "Intesa Sanpaolo Bank",
    initials: "IS",
    color: "#003087",
    logo: "/logos/intesa.png",
    ratePersonal: 11.49,
    rateIpotecar: 7.78,
    marginIpotecar: 2.20,
    daePersonal: 12.40,
    daeIpotecar: 8.40,
    rating: 4.1,
    rank: 7,
    slug: "intesa-sanpaolo",
    description: "Intesa Sanpaolo Bank România — filială a grupului italian Intesa Sanpaolo, cu ofertă fixă ipotecar 7,78%/an și condiții clare.",
    advantages: ["Dobândă fixă ipotecar 7,78%/an", "Aprobare rapidă 24-48h", "Grup bancar european solid"],
    disadvantages: ["Dobândă personal mai ridicată", "Rețea de sucursale limitată"],
    minAmountPersonal: 1500, maxAmountPersonal: 200000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 800000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "garanti-bbva",
    name: "Garanti BBVA",
    initials: "GB",
    color: "#00A758",
    logo: "/logos/garanti.png",
    ratePersonal: 4.99,
    rateIpotecar: 7.93,
    marginIpotecar: 2.35,
    daePersonal: 6.80,
    daeIpotecar: 8.55,
    rating: 4.0,
    rank: 8,
    badge: "OFERTĂ 2026",
    badgeColor: "#00A758",
    slug: "garanti-bbva",
    description: "Garanti BBVA România — ofertă 2026: dobândă fixă 4,99%/an personal, credit EXTRAcash fără garanții, digital banking complet, parte din grupul BBVA.",
    advantages: ["Dobândă fixă personal 4,99% — cea mai competitivă 2026", "Credit fără garanții până la 250.000 RON", "Digital banking avansat", "Dobândă ipotecar fixă 7,93%"],
    disadvantages: ["Rețea limitată de sucursale", "Condiții eligibilitate stricte pentru rata minimă"],
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
    rateIpotecar: 8.20,
    marginIpotecar: 2.30,
    daePersonal: 11.60,
    daeIpotecar: 8.75,
    rating: 4.0,
    rank: 9,
    slug: "unicredit",
    description: "UniCredit Bank România — parte din grupul european UniCredit. Credite personale până la 250.000 RON, soluții și în EUR.",
    advantages: ["Credite în EUR disponibile", "Condiții speciale pentru corporații", "Până la 250.000 RON personal"],
    disadvantages: ["Dobânzi mai ridicate la personal", "Documente suplimentare pentru PFA"],
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
    rateIpotecar: 8.08,
    marginIpotecar: 2.50,
    daePersonal: 11.10,
    daeIpotecar: 8.65,
    rating: 4.0,
    rank: 10,
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
    id: "libra-bank",
    name: "Libra Internet Bank",
    initials: "LB",
    color: "#5B21B6",
    logo: "/logos/libra.svg",
    ratePersonal: 11.99,
    rateIpotecar: 8.38,
    marginIpotecar: 2.80,
    daePersonal: 12.90,
    daeIpotecar: 9.00,
    rating: 3.8,
    rank: 11,
    slug: "libra-bank",
    description: "Libra Internet Bank — bancă 100% digitală, ideală pentru antreprenori, PFA și freelanceri. Procese simplificate online.",
    advantages: ["Bancă 100% digitală", "Procese simplificate online", "Ideal antreprenori și PFA"],
    disadvantages: ["Dobânzi mai ridicate", "Fără rețea fizică de sucursale"],
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
    rateIpotecar: 9.08,
    marginIpotecar: 3.50,
    daePersonal: 14.15,
    daeIpotecar: 9.70,
    rating: 3.7,
    rank: 12,
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
    rateIpotecar: 9.58,
    marginIpotecar: 4.00,
    daePersonal: 15.20,
    daeIpotecar: 10.20,
    rating: 3.6,
    rank: 13,
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
