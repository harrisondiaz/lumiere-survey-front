import axios from "axios";
import type { SurveyFormData } from "./schemas";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  headers: { "Content-Type": "application/json" },
});

export interface SurveyPayload {
  name: string;
  email: string;
  ageRange: string;
  country: string;
  answers: {
    usedSkincare: string;
    frequency: string;
    budgetRange: string;
    idealProduct: string;
  };
  timestamp: string;
  userAgent: string;
  screenResolution: string;
  language: string;
  referrer: string;
  timezone: string;
}

function buildPayload(data: SurveyFormData): SurveyPayload {
  return {
    name: data.name,
    email: data.email,
    ageRange: data.ageRange,
    country: data.country,
    answers: {
      usedSkincare: data.usedSkincare,
      frequency: data.frequency,
      budgetRange: data.budgetRange,
      idealProduct: data.idealProduct,
    },
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    referrer: document.referrer,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export async function submitSurvey(data: SurveyFormData): Promise<void> {
  const payload = buildPayload(data);
  await api.post("/api/survey", payload);
}
