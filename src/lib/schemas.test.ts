import { describe, it, expect } from "vitest";
import { surveySchema } from "./schemas";

const validForm = {
  name: "Jane Doe",
  email: "jane@example.com",
  ageRange: "25-34",
  country: "ES",
  usedSkincare: "yes",
  frequency: "daily",
  budgetRange: "50-100",
  idealProduct: "A lightweight serum with vitamin C and hyaluronic acid",
};

describe("surveySchema", () => {
  it("accepts valid form data", () => {
    const result = surveySchema.safeParse(validForm);
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = surveySchema.safeParse({ ...validForm, email: "bad" });
    expect(result.success).toBe(false);
  });

  it("rejects name shorter than 2 chars", () => {
    const result = surveySchema.safeParse({ ...validForm, name: "A" });
    expect(result.success).toBe(false);
  });

  it("rejects idealProduct shorter than 10 chars", () => {
    const result = surveySchema.safeParse({
      ...validForm,
      idealProduct: "short",
    });
    expect(result.success).toBe(false);
  });

  it("requires all step fields", () => {
    const result = surveySchema.safeParse({ name: "Jane Doe" });
    expect(result.success).toBe(false);
  });
});
