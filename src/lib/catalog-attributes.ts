import type { ColorKey, MaterialKey } from "@/config/catalogFilters";

export type CatalogAttributes = {
  material: MaterialKey;
  colors: ColorKey[];
  /** Drives the "Available in N textures" badge; shown only when greater than 1. */
  textureCount: number;
  /** Catalog card copy. Falls back to the board's own description when absent. */
  description?: string;
  /** Solid card fill from the supplied frame, shown instead of a photo. */
  cardSwatch?: { background: string; border?: string };
  /** The card description is shared with other products and needs unique copy. */
  needsUniqueCopy?: true;
};

// Card descriptions supplied in the MDF Board catalog Figma frames (cards 1–21, in grid order).
// The frames repeat these five lines across the range.
const TIMBER =
  "Premium natural timber veneer with a deep horizontal grain and organic tactile warmth.";
const POLYMER =
  "High-durability seamless polymer surface with anti-fingerprint technology in matte charcoal.";
const ACRYLIC =
  "Acrylic-based surface offering an ultra-matte, velvety touch with thermal healing properties.";
const STONE =
  "Ultra-compact sintered stone mimicking the timeless elegance of Italian Carrara marble.";
const BRUSHED =
  "Anodized aluminum finish with a fine-brushed texture for sophisticated highlights.";
const MELAMINE =
  "Melamine-based surface offering an ultra-matte, velvety touch with thermal healing properties.";

// Filterable attributes for every MDF board, keyed by board slug. Edge tapes reuse the
// attributes of the board they match. Finish comes from the board record itself.
//
// TO CONFIRM: materials follow the placeholder rule already used by the kitchen configurator
// (gloss → Acrylic, matt → Acrylic Super Matt, woodgrain → Melamine, Anthracite/Iron Ore →
// UV Range); colours follow its existing colour assignments. textureCount is 1 until the
// real number of textures per product is supplied. Cards 22–27 have no supplied frame yet
// and keep the board description.
export const CATALOG_ATTRIBUTES: Record<string, CatalogAttributes> = {
  // Cards 1–21: Figma frames 1:718 … 1:938
  "arctic-matt": {
    material: "acrylic-super-matt",
    colors: ["white"],
    textureCount: 1,
    description: TIMBER,
    needsUniqueCopy: true,
  },
  "alabaster-gloss": {
    material: "acrylic",
    colors: ["white"],
    textureCount: 1,
    description: POLYMER,
    cardSwatch: { background: "#F8F8F8" }, // Figma 1:1021
    needsUniqueCopy: true,
  },
  "shiny-white-gloss": {
    material: "acrylic",
    colors: ["white"],
    textureCount: 1,
    description: ACRYLIC,
    needsUniqueCopy: true,
  },
  "warm-white-gloss": {
    material: "acrylic",
    colors: ["white"],
    textureCount: 1,
    description: STONE,
    cardSwatch: { background: "#FFFFFF", border: "0.1px solid #000" }, // Figma 1:1011
    needsUniqueCopy: true,
  },
  "diamond-grey-gloss": {
    material: "acrylic",
    colors: ["charcoal"],
    textureCount: 1,
    description: BRUSHED,
    needsUniqueCopy: true,
  },
  "raven-black-matt": {
    material: "acrylic-super-matt",
    colors: ["black"],
    textureCount: 1,
    description: ACRYLIC,
    cardSwatch: { background: "#2B2A28" }, // Figma 1:763
    needsUniqueCopy: true,
  },
  "classic-walnut": {
    material: "melamine",
    colors: ["dark-brown"],
    textureCount: 1,
    description: POLYMER,
    needsUniqueCopy: true,
  },
  "maple-wood-natural": {
    material: "melamine",
    colors: ["tan"],
    textureCount: 1,
    description: ACRYLIC,
    needsUniqueCopy: true,
  },
  "natural-brown": {
    material: "melamine",
    colors: ["tan"],
    textureCount: 1,
    description: STONE,
    needsUniqueCopy: true,
  },
  "oak-wood-natural": {
    material: "melamine",
    colors: ["tan"],
    textureCount: 1,
    description: BRUSHED,
    needsUniqueCopy: true,
  },
  "grey-wood-natural": {
    material: "melamine",
    colors: ["charcoal"],
    textureCount: 1,
    description: ACRYLIC,
    needsUniqueCopy: true,
  },
  "southern-oakwood": {
    material: "melamine",
    colors: ["tan"],
    textureCount: 1,
    description: TIMBER,
    needsUniqueCopy: true,
  },
  "washed-maple-wood-natural": {
    material: "melamine",
    colors: ["tan"],
    textureCount: 1,
    description: POLYMER,
    needsUniqueCopy: true,
  },
  "washed-oakwood": {
    material: "melamine",
    colors: ["tan"],
    textureCount: 1,
    description: ACRYLIC,
    needsUniqueCopy: true,
  },
  // Olive green matches none of the five palette swatches, so it carries no colour key yet.
  "olive-super-matt": {
    material: "acrylic-super-matt",
    colors: [],
    textureCount: 1,
    description: STONE,
    needsUniqueCopy: true,
  },
  "maple-shadow": {
    material: "melamine",
    colors: ["dark-brown"],
    textureCount: 1,
    description: BRUSHED,
    needsUniqueCopy: true,
  },
  "golden-oak": {
    material: "melamine",
    colors: ["tan"],
    textureCount: 1,
    description: ACRYLIC,
    needsUniqueCopy: true,
  },
  "musket-brown": {
    material: "melamine",
    colors: ["black"],
    textureCount: 1,
    description: STONE,
    needsUniqueCopy: true,
  },
  "sand-dune": {
    material: "melamine",
    colors: ["charcoal"],
    textureCount: 1,
    description: BRUSHED,
    needsUniqueCopy: true,
  },
  "prime-oak": { material: "melamine", colors: ["tan"], textureCount: 1, description: MELAMINE },

  // Cards 22–27 use board descriptions unless supplied card copy overrides them.
  "snow-white-matt": {
    material: "acrylic-super-matt",
    colors: ["white"],
    textureCount: 1,
    cardSwatch: { background: "#FCFBF7" }, // Figma 1:1012
    description: TIMBER, // Figma 1:793
    needsUniqueCopy: true,
  },
  "moss-grey-wood": {
    material: "melamine",
    colors: ["charcoal"],
    textureCount: 1,
    needsUniqueCopy: true,
  },
  "rural-oak": { material: "melamine", colors: ["dark-brown"], textureCount: 1 },
  "aged-ash": { material: "melamine", colors: ["tan"], textureCount: 1, needsUniqueCopy: true },
  anthracite: {
    material: "uv-range",
    colors: ["charcoal"],
    textureCount: 1,
    needsUniqueCopy: true,
  },
  "ultra-high-gloss-iron-ore": {
    material: "uv-range",
    colors: ["charcoal"],
    textureCount: 1,
    needsUniqueCopy: true,
  },
};
