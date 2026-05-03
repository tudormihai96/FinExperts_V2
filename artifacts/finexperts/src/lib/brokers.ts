export type Broker = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  email: string;
  phone: string;
};

export const BROKERS: Broker[] = [
  {
    id: "alexandra",
    name: "Alexandra Achim",
    role: "Manager de franciză",
    avatar: "AA",
    color: "#C49A20",
    email: "alexandra.achim@kiwifinance.ro",
    phone: "0799 715 101",
  },
  {
    id: "cristina",
    name: "Cristina Coman",
    role: "Broker de Credite",
    avatar: "CC",
    color: "#0B2E2E",
    email: "cristina.coman@kiwifinance.ro",
    phone: "0725 596 672",
  },
  {
    id: "erji",
    name: "Ana-Maria Erji",
    role: "Broker de Credite",
    avatar: "AE",
    color: "#2E7D5B",
    email: "ana-maria.gheorghe@kiwifinance.ro",
    phone: "0755 251 860",
  },
  {
    id: "tudor",
    name: "Mihai Tudor",
    role: "Broker de Credite",
    avatar: "TM",
    color: "#005BAA",
    email: "mihai.tudor@kiwifinance.ro",
    phone: "0799 717 737",
  },
];

export const CC_EMAIL = "kbaa@kiwifinance.ro";

export function getBroker(id: string): Broker {
  return BROKERS.find(b => b.id === id) ?? BROKERS[0];
}

export function getStoredBrokerId(): string {
  try { return localStorage.getItem("finexperts_broker") ?? "alexandra"; }
  catch { return "alexandra"; }
}

export function setStoredBrokerId(id: string): void {
  try { localStorage.setItem("finexperts_broker", id); }
  catch { /* noop */ }
}

export function buildBrokerMailto(broker: Broker, subject: string, body: string): string {
  return `mailto:${broker.email}?cc=${encodeURIComponent(CC_EMAIL)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
