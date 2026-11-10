import type { ColorKey, MaterialKey } from "@/config/catalogFilters";

export type CatalogAttributes = {
  material: MaterialKey;
  colors: ColorKey[];
  /** Drives the "Available in N textures" badge; shown only when greater than 1. */
  textureCount: number;
  /** Solid card fill from the supplied frame, shown instead of a photo. */
  cardSwatch?: { background: string; border?: string };
};

/** Short card line under each MDF board name in the catalog, from the supplied catalog design. */
export const CARD_TAGLINES: Readonly<Record<string, string>> = {
  "arctic-matt": "Crisp, Clean, Versatile",
  "alabaster-gloss": "Timeless Radiance",
  "shiny-white-gloss": "Bright, Clean, Contemporary",
  "warm-white-gloss": "Softly Luminous",
  "diamond-grey-gloss": "Refined Textured Grey",
  "raven-black-matt": "Statement in Black",
  "snow-white-matt": "Pure & Effortless",
  "classic-walnut": "Rich Heritage Grain",
  "maple-wood-natural": "Light & Natural",
  "natural-brown": "Warm Everyday Timber",
  "oak-wood-natural": "Relaxed Coastal Oak",
  "grey-wood-natural": "Bold Directional Grain",
  "southern-oakwood": "Textured Rustic Warmth",
  "washed-maple-wood-natural": "Softly Weathered",
  "washed-oakwood": "Relaxed Coastal Oak",
  "olive-super-matt": "Understated Sophistication",
  "maple-shadow": "Soft, Warm Neutral",
  "golden-oak": "Sunlit Rustic Warmth",
  "musket-brown": "Deep, Grounded Elegance",
  "sand-dune": "Soft Neutral Warmth",
  "prime-oak": "Premium Oak, Everyday Durability",
  "moss-grey-wood": "Earthy & Grounded",
  "rural-oak": "Country Charm, Modern Durability",
  "aged-ash": "Warm, Natural, Timeless",
  anthracite: "Sleek, Sophisticated Neutral",
};

// Filterable attributes for every MDF board, keyed by board slug. Edge tapes reuse the
// attributes of the board they match. Finish comes from the board record itself.
//
// TO CONFIRM: materials follow the placeholder rule already used by the kitchen configurator
// (gloss → Acrylic, matt → Acrylic Super Matt, woodgrain → Melamine, Anthracite/Iron Ore →
// UV Range); colours follow its existing colour assignments. textureCount is 1 until the
// real number of textures per product is supplied.
export const CATALOG_ATTRIBUTES: Record<string, CatalogAttributes> = {
  // Cards 1–21: Figma frames 1:718 … 1:938
  "arctic-matt": {
    material: "acrylic-super-matt",
    colors: ["white"],
    textureCount: 1,
  },
  "alabaster-gloss": {
    material: "acrylic",
    colors: ["white"],
    textureCount: 1,
    cardSwatch: { background: "#F8F8F8" }, // Figma 1:1021
  },
  "shiny-white-gloss": {
    material: "acrylic",
    colors: ["white"],
    textureCount: 1,
  },
  "warm-white-gloss": {
    material: "acrylic",
    colors: ["white"],
    textureCount: 1,
    cardSwatch: { background: "#FFFFFF", border: "0.1px solid #000" }, // Figma 1:1011
  },
  "diamond-grey-gloss": {
    material: "acrylic",
    colors: ["charcoal"],
    textureCount: 1,
  },
  "raven-black-matt": {
    material: "acrylic-super-matt",
    colors: ["black"],
    textureCount: 1,
    cardSwatch: { background: "#2B2A28" }, // Figma 1:763
  },
  "classic-walnut": {
    material: "melamine",
    colors: ["dark-brown"],
    textureCount: 1,
  },
  "maple-wood-natural": {
    material: "melamine",
    colors: ["tan"],
    textureCount: 1,
  },
  "natural-brown": {
    material: "melamine",
    colors: ["tan"],
    textureCount: 1,
  },
  "oak-wood-natural": {
    material: "melamine",
    colors: ["tan"],
    textureCount: 1,
  },
  "grey-wood-natural": {
    material: "melamine",
    colors: ["charcoal"],
    textureCount: 1,
  },
  "southern-oakwood": {
    material: "melamine",
    colors: ["tan"],
    textureCount: 1,
  },
  "washed-maple-wood-natural": {
    material: "melamine",
    colors: ["tan"],
    textureCount: 1,
  },
  "washed-oakwood": {
    material: "melamine",
    colors: ["tan"],
    textureCount: 1,
  },
  // Olive green matches none of the five palette swatches, so it carries no colour key yet.
  "olive-super-matt": {
    material: "acrylic-super-matt",
    colors: [],
    textureCount: 1,
  },
  "maple-shadow": {
    material: "melamine",
    colors: ["dark-brown"],
    textureCount: 1,
  },
  "golden-oak": {
    material: "melamine",
    colors: ["tan"],
    textureCount: 1,
  },
  "musket-brown": {
    material: "melamine",
    colors: ["black"],
    textureCount: 1,
  },
  "sand-dune": {
    material: "melamine",
    colors: ["charcoal"],
    textureCount: 1,
  },
  "prime-oak": { material: "melamine", colors: ["tan"], textureCount: 1 },

  // Cards 22–27 use board descriptions unless supplied card copy overrides them.
  "snow-white-matt": {
    material: "acrylic-super-matt",
    colors: ["white"],
    textureCount: 1,
    cardSwatch: { background: "#FCFBF7" }, // Figma 1:1012
  },
  "moss-grey-wood": { material: "melamine", colors: ["charcoal"], textureCount: 1 },
  "rural-oak": { material: "melamine", colors: ["dark-brown"], textureCount: 1 },
  "aged-ash": { material: "melamine", colors: ["tan"], textureCount: 1 },
  anthracite: {
    material: "uv-range",
    colors: ["charcoal"],
    textureCount: 1,
    cardSwatch: { background: "#424443" }, // Figma 26:561
  },
  "ultra-high-gloss-iron-ore": {
    material: "uv-range",
    colors: ["charcoal"],
    textureCount: 1,
  },
};
