import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LumiereLogo } from "@/components/LumiereLogo";
import { Button } from "@/components/ui/button";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-3">
          <LumiereLogo size={40} />
          <span className="font-serif text-xl tracking-widest uppercase">
            Lumière
          </span>
        </div>
      </header>

      <main className="px-6 pb-16 md:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-2 md:order-1"
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">
              Skincare y bienestar
            </p>
            <h1 className="mb-6 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
              Ilumina tu
              <br />
              <span className="italic text-gold">brillo natural</span>
            </h1>
            <p className="mb-8 max-w-md text-base leading-relaxed text-charcoal/70 md:text-lg">
              Ayúdanos a crear la próxima generación de skincare de lujo.
              Comparte tus preferencias y da forma a productos pensados para tu
              ritual de belleza.
            </p>
            <Button asChild size="lg">
              <Link to="/survey">Participar</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="order-1 md:order-2"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80"
                alt="Productos de skincare de lujo"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-serif text-lg text-white md:text-xl">
                  Donde la ciencia encuentra la serenidad
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
