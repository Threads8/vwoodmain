import type Lenis from "lenis";

let activeLenis: Lenis | null = null;

/** The running smooth-scroll instance, if any (none with reduced motion), so overlays can pause it. */
export const getLenis = () => activeLenis;

export function setActiveLenis(lenis: Lenis | null) {
  activeLenis = lenis;
}
