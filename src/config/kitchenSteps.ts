import type { KitchenSelections } from "@/stores/kitchenStore";

export const KITCHEN_HOME = "/kitchen-design";

export const KITCHEN_STEPS = [
  { step: 1, path: "/kitchen-design/layout" },
  { step: 2, path: "/kitchen-design/cabinet-style" },
  { step: 3, path: "/kitchen-design/boards" },
  { step: 4, path: "/kitchen-design/tapes" },
  { step: 5, path: "/kitchen-design/summary" },
  { step: 6, path: "/kitchen-design/quote" },
] as const;

export type StepNumber = (typeof KITCHEN_STEPS)[number]["step"];
export type StepPath = (typeof KITCHEN_STEPS)[number]["path"];

export const stepPath = (step: StepNumber): StepPath =>
  KITCHEN_STEPS.find((item) => item.step === step)?.path ?? KITCHEN_STEPS[0].path;

// Checked in this order: layouts, cabinet styles, boards, tapes.
const REQUIREMENTS: {
  step: StepNumber;
  key: "layouts" | "cabinetStyles" | "boards" | "tapes";
  message: string;
}[] = [
  { step: 1, key: "layouts", message: "Please choose a layout first" },
  { step: 2, key: "cabinetStyles", message: "Please choose a cabinet style first" },
  { step: 3, key: "boards", message: "Please choose a board first" },
  { step: 4, key: "tapes", message: "Please choose a tape first" },
];

/** The earliest incomplete step before `step`, or null when it can be shown. */
export function findIncompleteStep(
  step: StepNumber,
  selections: Pick<KitchenSelections, "layouts" | "cabinetStyles" | "boards" | "tapes">,
): { step: StepNumber; message: string } | null {
  const missing = REQUIREMENTS.find(
    (requirement) => requirement.step < step && selections[requirement.key].length === 0,
  );
  return missing ? { step: missing.step, message: missing.message } : null;
}
