export const banks = [
  {
    id: "bcr",
    name: "BCR",
    logo: "https://logo.clearbit.com/bcr.ro",
    ratePersonal: 9.5,
    rateIpotecar: 6.2,
    slug: "bcr"
  },
  {
    id: "brd",
    name: "BRD",
    logo: "https://logo.clearbit.com/brd.ro",
    ratePersonal: 9.8,
    rateIpotecar: 6.4,
    slug: "brd"
  },
  {
    id: "ing",
    name: "ING",
    logo: "https://logo.clearbit.com/ing.ro",
    ratePersonal: 8.9,
    rateIpotecar: 5.9,
    slug: "ing"
  },
  {
    id: "raiffeisen",
    name: "Raiffeisen",
    logo: "https://logo.clearbit.com/raiffeisen.ro",
    ratePersonal: 9.2,
    rateIpotecar: 6.1,
    slug: "raiffeisen"
  },
  {
    id: "alpha-bank",
    name: "Alpha Bank",
    logo: "https://logo.clearbit.com/alphabank.ro",
    ratePersonal: 10.1,
    rateIpotecar: 6.5,
    slug: "alpha-bank"
  },
  {
    id: "unicredit",
    name: "UniCredit",
    logo: "https://logo.clearbit.com/unicredit.ro",
    ratePersonal: 9.7,
    rateIpotecar: 6.3,
    slug: "unicredit"
  },
  {
    id: "otp-bank",
    name: "OTP Bank",
    logo: "https://logo.clearbit.com/otpbank.ro",
    ratePersonal: 10.3,
    rateIpotecar: 6.7,
    slug: "otp-bank"
  },
  {
    id: "garanti-bbva",
    name: "Garanti BBVA",
    logo: "https://logo.clearbit.com/garantibbva.ro",
    ratePersonal: 10.5,
    rateIpotecar: 6.8,
    slug: "garanti-bbva"
  },
  {
    id: "patria-bank",
    name: "Patria Bank",
    logo: "https://logo.clearbit.com/patriabank.ro",
    ratePersonal: 11.2,
    rateIpotecar: 7.1,
    slug: "patria-bank"
  },
  {
    id: "libra-bank",
    name: "Libra Bank",
    logo: "https://logo.clearbit.com/librabank.ro",
    ratePersonal: 10.8,
    rateIpotecar: 6.9,
    slug: "libra-bank"
  },
  {
    id: "nexent-bank",
    name: "Nexent Bank",
    logo: "https://logo.clearbit.com/nexent.ro",
    ratePersonal: 11.5,
    rateIpotecar: 7.3,
    slug: "nexent-bank"
  }
];

export function calculateMonthlyPayment(principal: number, annualRate: number, months: number) {
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  const payment = principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  return payment;
}
