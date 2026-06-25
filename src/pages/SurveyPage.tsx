import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { LumiereLogo } from "@/components/LumiereLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitSurvey } from "@/lib/api";
import { getBudgetOptions, getBudgetCurrencyHint } from "@/lib/budget";
import {
  surveySchema,
  step1Fields,
  step2Fields,
  step3Fields,
  ageRanges,
  countries,
  skincareOptions,
  frequencyOptions,
  type SurveyFormData,
} from "@/lib/schemas";

const TOTAL_STEPS = 3;

const stepTransition = { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const };

const stepVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 16 : -16,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -16 : 16,
  }),
};

const stepTitles = [
  { title: "Sobre ti", description: "Cuéntanos un poco sobre ti" },
  {
    title: "Tu rutina de skincare",
    description: "Ayúdanos a entender tus hábitos",
  },
  {
    title: "Tu visión",
    description: "Describe tu producto ideal",
  },
];

function SelectField({
  label,
  value,
  onChange,
  options,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function SurveyPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      name: "",
      email: "",
      ageRange: "",
      country: "",
      usedSkincare: "",
      frequency: "",
      budgetRange: "",
      idealProduct: "",
    },
  });

  const progress = (step / TOTAL_STEPS) * 100;
  const selectedCountry = watch("country");
  const budgetOptions = getBudgetOptions(selectedCountry);
  const budgetHint = getBudgetCurrencyHint(selectedCountry);

  const goNext = async () => {
    const fields =
      step === 1 ? step1Fields : step === 2 ? step2Fields : step3Fields;
    const valid = await trigger(fields);
    if (valid) {
      setDirection(1);
      setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    }
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const onSubmit = async (data: SurveyFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitSurvey(data);
      navigate("/thank-you");
    } catch {
      setSubmitError(
        "Algo salió mal al enviar. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 md:px-6">
      <div className="mx-auto max-w-xl">
        <div className="mb-8 flex items-center justify-center gap-3">
          <LumiereLogo size={36} />
          <span className="font-serif text-lg tracking-widest uppercase">
            Lumière
          </span>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex justify-between text-xs uppercase tracking-wider text-charcoal/50">
            <span>
              Paso {step} de {TOTAL_STEPS}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{stepTitles[step - 1].title}</CardTitle>
            <CardDescription>
              {stepTitles[step - 1].description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={stepTransition}
                  className="space-y-4"
                >
                  {step === 1 && (
                    <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input
                        id="name"
                        placeholder="María García"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="maria@ejemplo.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <Controller
                      name="ageRange"
                      control={control}
                      render={({ field }) => (
                        <SelectField
                          label="Rango de edad"
                          value={field.value}
                          onChange={field.onChange}
                          options={ageRanges}
                          error={errors.ageRange?.message}
                          placeholder="Selecciona tu edad"
                        />
                      )}
                    />

                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <SelectField
                          label="País"
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            setValue("budgetRange", "");
                          }}
                          options={countries}
                          error={errors.country?.message}
                          placeholder="Selecciona tu país"
                        />
                      )}
                    />
                    </>
                  )}

                  {step === 2 && (
                    <>
                    <Controller
                      name="usedSkincare"
                      control={control}
                      render={({ field }) => (
                        <SelectField
                          label="¿Has usado productos de skincare antes?"
                          value={field.value}
                          onChange={field.onChange}
                          options={skincareOptions}
                          error={errors.usedSkincare?.message}
                          placeholder="Selecciona una opción"
                        />
                      )}
                    />

                    <Controller
                      name="frequency"
                      control={control}
                      render={({ field }) => (
                        <SelectField
                          label="¿Con qué frecuencia usas productos de skincare?"
                          value={field.value}
                          onChange={field.onChange}
                          options={frequencyOptions}
                          error={errors.frequency?.message}
                          placeholder="Selecciona la frecuencia"
                        />
                      )}
                    />

                    <Controller
                      name="budgetRange"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-1">
                          <SelectField
                            label="Presupuesto mensual en skincare"
                            value={field.value}
                            onChange={field.onChange}
                            options={budgetOptions}
                            error={errors.budgetRange?.message}
                            placeholder="Selecciona un rango"
                          />
                          {budgetHint && (
                            <p className="text-xs text-charcoal/50">{budgetHint}</p>
                          )}
                        </div>
                      )}
                    />
                    </>
                  )}

                  {step === 3 && (
                    <div className="space-y-2">
                      <Label htmlFor="idealProduct">
                        ¿Cómo sería tu producto ideal?
                      </Label>
                      <Textarea
                        id="idealProduct"
                        placeholder="Describe texturas, ingredientes, aromas, packaging o lo que sea importante para ti..."
                        rows={5}
                        {...register("idealProduct")}
                      />
                      {errors.idealProduct && (
                        <p className="text-sm text-red-600">
                          {errors.idealProduct.message}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {submitError && (
                <p className="mt-4 text-sm text-red-600">{submitError}</p>
              )}

              <div className="mt-8 flex justify-between gap-4">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Atrás
                  </Button>
                ) : (
                  <div />
                )}

                {step < TOTAL_STEPS ? (
                  <Button type="button" onClick={goNext}>
                    Continuar
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
