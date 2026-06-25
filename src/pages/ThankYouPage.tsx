import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ConfettiCelebration } from "@/components/ConfettiCelebration";
import { LumiereLogo } from "@/components/LumiereLogo";
import { Button } from "@/components/ui/button";

export function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <ConfettiCelebration />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg"
      >
        <div className="mb-8 flex justify-center">
          <LumiereLogo size={64} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4 font-serif text-4xl md:text-5xl"
        >
          ¡Gracias!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mb-8 text-lg leading-relaxed text-charcoal/70"
        >
          Tus respuestas nos ayudan a crear skincare que de verdad conecte.
          Agradecemos que hayas compartido tu ritual de belleza con Lumière.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button asChild variant="outline">
            <Link to="/">Volver al inicio</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
