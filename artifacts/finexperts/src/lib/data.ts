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
// IRCC T1/2026 = 5.58%
export const banks: Bank[] = [
  {
    id: "raiffeisen",
    name: "Raiffeisen Bank",
    initials: "RB",
    color: "#FFDD00",
    logo: "/logos/raiffeisen.svg",
    // sursa: raiffeisen.ro/credite/credit-de-nevoi-personale-fara-ipoteca — 5.55%/an
    ratePersonal: 5.55,
    rateIpotecar: 5.40,
    daePersonal: 6.20,
    daeIpotecar: 5.90,
    rating: 4.4,
    rank: 1,
    badge: "CEL MAI MIC PERSONAL — 5.55%",
    badgeColor: "#FFDD00",
    slug: "raiffeisen",
    description: "Raiffeisen Bank România — Flexicredit cu dobândă fixă de la 5,55%/an. Parte din Grupul Raiffeisen Bank International.",
    advantages: ["Cea mai mică dobândă fixă personal (5.55%)", "Aplicare online", "Aprobare rapidă 24h", "Smart Mobile Banking"],
    disadvantages: ["Necesită cont curent Raiffeisen", "Dobânzi variabile mai mari"],
    minAmountPersonal: 1000, maxAmountPersonal: 250000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 700000,
    minMonthsPersonal: 6, maxMonthsPersonal: 84,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "ing-bank",
    name: "ING Bank",
    initials: "ING",
    color: "#FF6200",
    logo: "/logos/ing.svg",
    // sursa: ing.ro/credite/ing-personal — de la 5.99%/an fixă
    ratePersonal: 5.99,
    rateIpotecar: 4.85,
    daePersonal: 6.81,
    daeIpotecar: 5.40,
    rating: 4.8,
    rank: 2,
    badge: "100% ONLINE",
    badgeColor: "#FF6200",
    slug: "ing-bank",
    description: "ING Bank — lider digital banking în România. Aplicare 100% online, pre-aprobare instant prin HomeBank.",
    advantages: ["Dobândă personal de la 5.99% fixă", "Aplicare 100% online", "Pre-aprobare instant", "Fără vizite la bancă"],
    disadvantages: ["Convenție virare venit necesară", "Rețea fizică redusă"],
    minAmountPersonal: 1500, maxAmountPersonal: 250000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 600000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "exim-bank",
    name: "Exim Banca Românească",
    initials: "EB",
    color: "#005BAA",
    logo: "/logos/exim.svg",
    // sursa: eximbank.ro — pachet VREAU SI EU! dobândă 5.99%/an (cu card credit)
    ratePersonal: 5.99,
    rateIpotecar: 5.80,
    daePersonal: 7.10,
    daeIpotecar: 6.30,
    rating: 4.0,
    rank: 3,
    badge: "PROMO 5.99%",
    badgeColor: "#005BAA",
    slug: "exim-bank",
    description: "Exim Banca Românească — bancă de stat cu dobânzi promoționale de la 5.99%/an în pachet cu card de credit.",
    advantages: ["Dobândă promoțională 5.99% cu card credit", "Capital de stat — stabilitate", "Condiții flexibile antreprenori"],
    disadvantages: ["Necesită card credit pentru oferta promo", "Rețea de sucursale mică"],
    minAmountPersonal: 2000, maxAmountPersonal: 100000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 400000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 300,
  },
  {
    id: "garanti-bbva",
    name: "Garanti BBVA",
    initials: "GB",
    color: "#009B77",
    logo: "/logos/garanti.svg",
    // sursa: garantibbva.ro — oferta credit nevoi personale de la 6.45%
    ratePersonal: 6.45,
    rateIpotecar: 5.45,
    daePersonal: 7.30,
    daeIpotecar: 5.98,
    rating: 4.2,
    rank: 4,
    badge: "DE LA 6.45%",
    badgeColor: "#009B77",
    slug: "garanti-bbva",
    description: "Garanti BBVA România — dobândă de la 6.45% pentru credite personale fără garanții, sume până la 250.000 RON.",
    advantages: ["Dobândă de la 6.45% fără garanții", "Sume până la 250.000 RON", "Digital banking avansat"],
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
    // sursa: bcr.ro — IRCC 5.58% + marjă; personal ~8.20%, ipotecar fix venit≥10k ~7.83%
    ratePersonal: 8.20,
    rateIpotecar: 5.58,
    daePersonal: 9.10,
    daeIpotecar: 6.20,
    rating: 4.3,
    rank: 5,
    badge: "REȚEA NAȚIONALĂ",
    badgeColor: "#E30613",
    slug: "bcr",
    description: "BCR — cea mai mare bancă din România, membră Erste Group. Credit ipotecar IRCC + marjă, rețea de 800+ sucursale.",
    advantages: ["Cea mai mare rețea națională", "App George", "Aprobare în 24h", "Asigurare viață inclusă"],
    disadvantages: ["DAE mai ridicat față de top 3", "Marjă variabilă ipotecar"],
    minAmountPersonal: 2000, maxAmountPersonal: 150000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 1000000,
    minMonthsPersonal: 6, maxMonthsPersonal: 84,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "brd",
    name: "BRD",
    initials: "BRD",
    color: "#0066B2",
    logo: "/logos/brd.svg",
    // sursa: credite.cc/blog/credit-ipotecar-brd-2026 — ipotecar de la 4.69% variabilă, 6.30% fixă; personal ~7.50%
    ratePersonal: 7.50,
    rateIpotecar: 4.69,
    daePersonal: 8.30,
    daeIpotecar: 5.20,
    rating: 4.1,
    rank: 6,
    slug: "brd",
    description: "BRD – Groupe Société Générale, a doua bancă din România. Credit ipotecar variabil de la 4.69% (IRCC+marjă).",
    advantages: ["Dobândă ipotecar variabilă de la 4.69%", "Rambursare anticipată fără penalități după 12 luni", "MyBRD Mobile Banking"],
    disadvantages: ["DAE personal mai mare față de top", "Comision de analiză 2%"],
    minAmountPersonal: 3000, maxAmountPersonal: 100000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 700000,
    minMonthsPersonal: 6, maxMonthsPersonal: 72,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "unicredit",
    name: "UniCredit Bank",
    initials: "UC",
    color: "#E11F26",
    logo: "/logos/unicredit.svg",
    // sursa: mrfinance.ro/unicredit — personal variabilă IRCC+marjă ~7.50%
    ratePersonal: 7.50,
    rateIpotecar: 5.50,
    daePersonal: 8.40,
    daeIpotecar: 6.05,
    rating: 4.0,
    rank: 7,
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
    id: "libra-bank",
    name: "Libra Internet Bank",
    initials: "LB",
    color: "#7B2D8B",
    logo: "/logos/libra.svg",
    // sursa: librabank.ro — ipotecar IRCC 5.68%+marjă 2.15% = 7.83%; personal similar
    ratePersonal: 7.84,
    rateIpotecar: 7.84,
    daePersonal: 8.60,
    daeIpotecar: 8.40,
    rating: 3.8,
    rank: 8,
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
    id: "intesa-sanpaolo",
    name: "Intesa Sanpaolo Bank",
    initials: "IS",
    color: "#1C3F7A",
    logo: "/logos/intesa.svg",
    // sursa: intesasanpaolobank.ro — personal 8.77%-16.99%, DAE 9.87%-19.16%
    ratePersonal: 8.77,
    rateIpotecar: 5.20,
    daePersonal: 9.87,
    daeIpotecar: 5.75,
    rating: 4.1,
    rank: 9,
    slug: "intesa-sanpaolo",
    description: "Intesa Sanpaolo Bank România — filială a grupului italian Intesa Sanpaolo, cu oferte competitive pentru ipotecar.",
    advantages: ["Dobândă fixă pe toată durata ipotecar", "Aprobare rapidă 24-48h", "Grup bancar european solid"],
    disadvantages: ["Dobândă personal 8.77%+ față de concurență", "Rețea de sucursale limitată"],
    minAmountPersonal: 1500, maxAmountPersonal: 200000,
    minAmountIpotecar: 30000, maxAmountIpotecar: 800000,
    minMonthsPersonal: 6, maxMonthsPersonal: 60,
    minMonthsIpotecar: 60, maxMonthsIpotecar: 360,
  },
  {
    id: "patria-bank",
    name: "Patria Bank",
    initials: "PB",
    color: "#1A1A6E",
    logo: "/logos/patria.svg",
    // sursa: patriabank.ro/patria-plus — variabilă de la 8.75%+, fixed ~9.50%
    ratePersonal: 9.50,
    rateIpotecar: 7.50,
    daePersonal: 10.80,
    daeIpotecar: 8.20,
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
    color: "#444444",
    logo: "/logos/nexent.svg",
    ratePersonal: 10.00,
    rateIpotecar: 7.80,
    daePersonal: 11.20,
    daeIpotecar: 8.50,
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
