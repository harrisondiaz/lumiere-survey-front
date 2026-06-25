import { z } from "zod";

export const surveySchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Introduce un email válido"),
  ageRange: z.string().min(1, "Selecciona un rango de edad"),
  country: z.string().min(1, "Selecciona un país"),
  usedSkincare: z.string().min(1, "Selecciona una opción"),
  frequency: z.string().min(1, "Selecciona una frecuencia"),
  budgetRange: z.string().min(1, "Selecciona un rango de presupuesto"),
  idealProduct: z
    .string()
    .min(10, "Comparte al menos 10 caracteres sobre tu producto ideal"),
});

export type SurveyFormData = z.infer<typeof surveySchema>;

export const step1Fields = ["name", "email", "ageRange", "country"] as const;
export const step2Fields = ["usedSkincare", "frequency", "budgetRange"] as const;
export const step3Fields = ["idealProduct"] as const;

export const ageRanges = [
  { value: "18-24", label: "18–24" },
  { value: "25-34", label: "25–34" },
  { value: "35-44", label: "35–44" },
  { value: "45-54", label: "45–54" },
  { value: "55+", label: "55+" },
];

export const countries = [
  { value: "ES", label: "España" },
  { value: "MX", label: "México" },
  { value: "AR", label: "Argentina" },
  { value: "CO", label: "Colombia" },
  { value: "CL", label: "Chile" },
  { value: "PE", label: "Perú" },
  { value: "US", label: "Estados Unidos" },
  { value: "CA", label: "Canadá" },
  { value: "FR", label: "Francia" },
  { value: "OTHER", label: "Otro" },
];

export const skincareOptions = [
  { value: "yes", label: "Sí, regularmente" },
  { value: "sometimes", label: "A veces" },
  { value: "no", label: "No, nunca" },
];

export const frequencyOptions = [
  { value: "daily", label: "A diario" },
  { value: "weekly", label: "Varias veces por semana" },
  { value: "monthly", label: "Ocasionalmente" },
  { value: "rarely", label: "Casi nunca" },
];
