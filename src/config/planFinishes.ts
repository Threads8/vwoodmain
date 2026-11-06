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
