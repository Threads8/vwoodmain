import Lenis from "lenis";
import { useEffect } from "react";
import { getLenis, setActiveLenis } from "@/lib/lenis";

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const lenis = new Lenis();
    setActiveLenis(lenis);
    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      if (getLenis() === lenis) setActiveLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
