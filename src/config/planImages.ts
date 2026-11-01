import type { CabinetStyle, Layout } from "./kitchenOptions";

/*
 * Plan image classification, from opening each image in /public/kitchen-plans.
 *
 * Image | Layout   | Style      | Why
 * ------+----------+------------+-------------------------------------------------------------
 * 52    | U-shaped | Handleless | Back run, left run and a front return. No handles (dark drawer rails).
 *       |          |            | Used as the U-shaped default.
 * 58    | U-shaped | Handleless | Back run, right run and a left peninsula. No handles; timber overheads.
 * 62    | U-shaped | Flat Panel | Three walls of cabinets. Plain doors with small visible handles.
 * 60    | L-shaped | Handleless | Two runs meeting at a corner. Plain fronts. Used as the L-shaped default.
 * 64    | L-shaped | Handleless | Long back run with a short left return. No handles (dark drawer rails).
 * 66    | Parallel | Handleless | CLOSEST MATCH, PLEASE CONFIRM: long left run facing a tall right wall,
 *       |          |            | but a short back run joins them. None of the 9 is a true parallel plan.
 * 67    | Island   | Handleless | Freestanding stone-topped island in front of an L-shaped run.
 *
 * Could not classify, so not mapped (still preloaded). Please confirm or correct:
 * 55    | none     | Handleless | A single straight wall run, which is none of the four layouts.
 * 56    | none     | Handleless | A single straight wall run with timber overheads.
 *
 * No image shows Shaker or Glass Front doors, so those always use the layout default.
 * Drawer rails on 52, 55, 56 and 64 may read as grooves, but no plan is closer to Handleless.
 */

export const PLAN_IMAGE_FILES = [
  "/kitchen-plans/image-52.png",
  "/kitchen-plans/image-55.png",
  "/kitchen-plans/image-56.png",
  "/kitchen-plans/image-58.png",
  "/kitchen-plans/image-60.png",
  "/kitchen-plans/image-62.png",
  "/kitchen-plans/image-64.png",
  "/kitchen-plans/image-66.png",
  "/kitchen-plans/image-67.png",
] as const;

export const PLAN_DEFAULTS: Record<Layout, string> = {
  "l-shaped": "/kitchen-plans/image-60.png",
  "u-shaped": "/kitchen-plans/image-52.png",
  parallel: "/kitchen-plans/image-66.png",
  island: "/kitchen-plans/image-67.png",
};

export const PLAN_IMAGES: Partial<Record<Layout, Partial<Record<CabinetStyle, string>>>> = {
  "l-shaped": { handleless: "/kitchen-plans/image-64.png" },
  "u-shaped": {
    handleless: "/kitchen-plans/image-58.png",
    "flat-panel": "/kitchen-plans/image-62.png",
  },
  parallel: { handleless: "/kitchen-plans/image-66.png" },
  island: { handleless: "/kitchen-plans/image-67.png" },
};

export function getPlanImage(layout: Layout, style?: CabinetStyle | null): string {
  return (style && PLAN_IMAGES[layout]?.[style]) || PLAN_DEFAULTS[layout];
}

/** True when the layout has no image of its own for this style. */
export function isDefaultPlan(layout: Layout, style?: CabinetStyle | null): boolean {
  return !(style && PLAN_IMAGES[layout]?.[style]);
}
