// Product catalog filter options. Add a material, finish or colour here (and tag products
// with its key in src/lib/catalog-attributes.ts); the sidebar, counts and URL pick it up.
export const MATERIAL_OPTIONS = [
  { key: "acrylic", label: "Acrylic" },
  { key: "uv-range", label: "UV Range" },
  { key: "melamine", label: "Melamine" },
  { key: "acrylic-super-matt", label: "Acrylic Super Matt" },
] as const;

export const FINISH_OPTIONS = [
  { key: "matte", label: "Matte" },
  { key: "satin", label: "Satin" },
  { key: "high-gloss", label: "High Gloss" },
  { key: "woodgrain", label: "Woodgrain" },
] as const;

export const COLOR_OPTIONS = [
  { key: "black", label: "Black", hex: "#1A1C1C" },
  { key: "white", label: "White", hex: "#F1F1F1" },
  { key: "dark-brown", label: "Dark Brown", hex: "#6F4627" },
  { key: "charcoal", label: "Charcoal", hex: "#51443C" },
  { key: "tan", label: "Tan", hex: "#8B5E3C" },
] as const;

export type MaterialKey = (typeof MATERIAL_OPTIONS)[number]["key"];
export type FinishKey = (typeof FINISH_OPTIONS)[number]["key"];
export type ColorKey = (typeof COLOR_OPTIONS)[number]["key"];
