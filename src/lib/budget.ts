export const budgetRangeValues = [
  "under-25",
  "25-50",
  "50-100",
  "100-200",
  "200+",
] as const;

export type BudgetRangeValue = (typeof budgetRangeValues)[number];

/** Monthly skincare budget labels tuned per market (local currency, realistic tiers). */
const budgetLabelsByCountry: Record<string, readonly string[]> = {
  ES: [
    "Menos de 25 €",
    "25 – 50 €",
    "50 – 100 €",
    "100 – 200 €",
    "Más de 200 €",
  ],
  FR: [
    "Moins de 25 €",
    "25 – 50 €",
    "50 – 100 €",
    "100 – 200 €",
    "Plus de 200 €",
  ],
  MX: [
    "Menos de $500 MXN",
    "$500 – $1,000 MXN",
    "$1,000 – $2,000 MXN",
    "$2,000 – $3,500 MXN",
    "Más de $3,500 MXN",
  ],
  AR: [
    "Menos de $30.000 ARS",
    "$30.000 – $60.000 ARS",
    "$60.000 – $120.000 ARS",
    "$120.000 – $250.000 ARS",
    "Más de $250.000 ARS",
  ],
  CO: [
    "Menos de $80.000 COP",
    "$80.000 – $180.000 COP",
    "$180.000 – $350.000 COP",
    "$350.000 – $700.000 COP",
    "Más de $700.000 COP",
  ],
  CL: [
    "Menos de $25.000 CLP",
    "$25.000 – $50.000 CLP",
    "$50.000 – $100.000 CLP",
    "$100.000 – $200.000 CLP",
    "Más de $200.000 CLP",
  ],
  PE: [
    "Menos de S/ 80",
    "S/ 80 – S/ 180",
    "S/ 180 – S/ 350",
    "S/ 350 – S/ 600",
    "Más de S/ 600",
  ],
  US: [
    "Menos de $30 USD",
    "$30 – $75 USD",
    "$75 – $150 USD",
    "$150 – $300 USD",
    "Más de $300 USD",
  ],
  CA: [
    "Menos de $40 CAD",
    "$40 – $90 CAD",
    "$90 – $180 CAD",
    "$180 – $350 CAD",
    "Más de $350 CAD",
  ],
  OTHER: [
    "Menos de $30 USD",
    "$30 – $75 USD",
    "$75 – $150 USD",
    "$150 – $300 USD",
    "Más de $300 USD",
  ],
};

const defaultLabels = budgetLabelsByCountry.ES;

export function getBudgetOptions(country: string) {
  const labels = budgetLabelsByCountry[country] ?? defaultLabels;

  return budgetRangeValues.map((value, index) => ({
    value,
    label: labels[index] ?? defaultLabels[index],
  }));
}

export function getBudgetCurrencyHint(country: string): string | null {
  const hints: Record<string, string> = {
    ES: "Precios orientativos en euros (€).",
    FR: "Prix indicatifs en euros (€).",
    MX: "Precios orientativos en pesos mexicanos (MXN).",
    AR: "Precios orientativos en pesos argentinos (ARS).",
    CO: "Precios orientativos en pesos colombianos (COP).",
    CL: "Precios orientativos en pesos chilenos (CLP).",
    PE: "Precios orientativos en soles peruanos (PEN).",
    US: "Precios orientativos en dólares estadounidenses (USD).",
    CA: "Precios orientativos en dólares canadienses (CAD).",
    OTHER: "Precios orientativos en dólares estadounidenses (USD).",
  };

  return hints[country] ?? hints.OTHER;
}
