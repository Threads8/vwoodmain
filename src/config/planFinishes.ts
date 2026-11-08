import { PRODUCTS, type CatalogItem } from "./products";

/**
 * Live finish preview for the 2D plans.
 *
 * Every plan in /public/kitchen-plans has a matching mask in /public/kitchen-plans/masks that
 * covers only the white cabinet fronts (walls, windows and appliances are left out). The chosen
 * board is painted through that mask with a multiply blend, so the drawing's line-work and
 * handles stay visible on top of the new finish. Rebuild the masks with scripts/plan-masks.sh
 * after replacing any plan image.
 */
export const planMask = (src: string) => src.replace("/kitchen-plans/", "/kitchen-plans/masks/");

/**
 * Plans whose drawing has cabinets in timber rather than white (overheads on 56 and 58; the
 * overhead above the hob and the island front on 67). Multiplying a finish over wood grain would
 * only tint the wood, so these plans also have a neutral overlay in /kitchen-plans/neutral that
 * redraws just those panels in near-white, keeping their door gaps and shading. It sits under the
 * finish while one is shown, so the timber panels recolour exactly like the white doors.
 */
const TIMBER_PLANS = new Set([
  "/kitchen-plans/image-56.png",
  "/kitchen-plans/image-58.png",
  "/kitchen-plans/image-67.png",
]);

export const planNeutral = (src: string): string | null =>
  TIMBER_PLANS.has(src) ? src.replace("/kitchen-plans/", "/kitchen-plans/neutral/") : null;

/** Shown before any board is chosen, so the preview can be tried straight away. */
const TRY_FIRST = [
  "prime-oak",
  "maple-wood-natural",
  "classic-walnut",
  "washed-oakwood",
  "olive-super-matt",
  "raven-black-matt",
  "diamond-grey-gloss",
];

export const PREVIEW_FINISHES: CatalogItem[] = TRY_FIRST.flatMap(
  (id) => PRODUCTS.find((item) => item.id === id) ?? [],
);

/** The photos behind a board's preview finish, best first. */
export function finishImages(item: CatalogItem): string[] {
  return [item.image, LOCAL_SWATCHES.has(item.id) ? `/woods/${item.id}.jpg` : undefined].filter(
    (src): src is string => Boolean(src),
  );
}

/** CSS background for a board: its photo tiled like a sheet, over its colour swatch. */
export function finishBackground(item: CatalogItem): string {
  const layers = finishImages(item).map((src) => `url("${src}") center / 46% auto repeat`);
  return [...layers, item.swatch].join(", ");
}

/** Swatches cropped from the supplied hero cards, used when the remote photo is unavailable. */
const LOCAL_SWATCHES = new Set([
  "prime-oak",
  "maple-wood-natural",
  "classic-walnut",
  "washed-oakwood",
]);
