import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { LumiereLogo } from "@/components/LumiereLogo";

const backdropTransition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };
const dialogTransition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

interface SubmitLoaderOverlayProps {
  open: boolean;
}

export function SubmitLoaderOverlay({ open }: SubmitLoaderOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-busy="true"
          aria-live="polite"
          aria-label="Enviando encuesta"
        >
          <motion.div
            className="absolute inset-0 bg-charcoal/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
          />

          <motion.div
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-gold/20 bg-beige shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={dialogTransition}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold/20 via-gold to-gold/20" />

            <div className="flex flex-col items-center gap-5 px-8 py-10 text-center">
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gold/15"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-gold/25 bg-white/70">
                  <LumiereLogo size={28} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-charcoal">
                  <Loader2 className="h-5 w-5 animate-spin text-gold" />
                  <p className="font-serif text-lg tracking-wide">
                    Enviando tu respuesta
                  </p>
                </div>
                <p className="text-sm text-charcoal/60">
                  Un momento, estamos guardando tus preferencias…
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
