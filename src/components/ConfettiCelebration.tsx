import { useEffect } from "react";
import confetti from "canvas-confetti";

export function ConfettiCelebration() {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#C9A84C", "#F5F0E8", "#1A1A1A", "#D4BC6E"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#C9A84C", "#F5F0E8", "#1A1A1A", "#D4BC6E"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#C9A84C", "#F5F0E8", "#1A1A1A", "#D4BC6E"],
    });

    frame();
  }, []);

  return null;
}
