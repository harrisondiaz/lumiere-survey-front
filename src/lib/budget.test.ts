import { describe, it, expect } from "vitest";
import { getBudgetOptions, getBudgetCurrencyHint } from "./budget";

describe("getBudgetOptions", () => {
  it("returns euro labels for Spain", () => {
    const options = getBudgetOptions("ES");
    expect(options[0].label).toContain("€");
    expect(options[0].value).toBe("under-25");
  });

  it("returns MXN labels for Mexico", () => {
    const options = getBudgetOptions("MX");
    expect(options[1].label).toContain("MXN");
    expect(options[1].label).not.toContain("€");
  });

  it("returns USD labels for United States", () => {
    const options = getBudgetOptions("US");
    expect(options[2].label).toContain("USD");
  });

  it("falls back to euros for unknown country codes", () => {
    const options = getBudgetOptions("");
    expect(options[0].label).toContain("€");
  });

  it("keeps the same stored values across countries", () => {
    expect(getBudgetOptions("MX").map((o) => o.value)).toEqual(
      getBudgetOptions("US").map((o) => o.value)
    );
  });
});

describe("getBudgetCurrencyHint", () => {
  it("returns a hint for Colombia", () => {
    expect(getBudgetCurrencyHint("CO")).toContain("COP");
  });
});
