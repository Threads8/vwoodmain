import type { MaterialKey } from "@/config/catalogFilters";

// Specification cards transcribed from the supplied Figma frames, shown in a popup from the
// "Details" button on MDF board catalog cards.
export type BoardSpec = {
  title: string;
  rows: { label: string; lines: string[] }[];
  advantages?: string[];
  /** Characteristic icon strips; each image already carries its icon labels. */
  icons: { src: string; width: number; height: number }[];
};

const APPLICATION = {
  label: "Application",
  lines: ["Commercial Furniture, Home Furniture", "Kitchen Cabinets, Drawers, Decorative Board, etc,"],
};
const ASSET = "https://api.builder.io/api/v1/image/assets/TEMP/";

export const BOARD_SPECS = {
  "high-gloss-uv": {
    title: "High Glossy UV Board",
    rows: [
      { label: "Surface", lines: ["Mirror Glossy UC Coating"] },
      { label: "Base Material", lines: ["MDF"] },
      { label: "Color", lines: ["Solid Color, Diamond Design, Wood Design"] },
      APPLICATION,
    ],
    icons: [
      { src: `${ASSET}7f5055c0b5f1713ed62e4e01c2f5382e64099e5d?width=240`, width: 120, height: 153 },
      { src: `${ASSET}36e8a860fbe9e075404881413901ec4bf7d84331?width=920`, width: 460, height: 153 },
    ],
  },
  "super-matt-uv": {
    title: "Super Matt UV Board",
    rows: [
      { label: "Surface", lines: ["Soft Touch Super Matt UV"] },
      { label: "Base Material", lines: ["MDF"] },
      { label: "Color", lines: ["Solid Color, Diamond Design, Wood Design"] },
      APPLICATION,
    ],
    advantages: ["Astonishing warn, Soft  touch like silk feeling", "Anti- fingerprint"],
    icons: [{ src: `${ASSET}2adafea4058ece38b42db37f2446d94888c33a8b?width=1290`, width: 645, height: 164 }],
  },
  petg: {
    title: "PETG MDF",
    rows: [
      { label: "Surface", lines: ["Premium PET"] },
      { label: "Base Material", lines: ["MDF"] },
      { label: "Finishing", lines: ["High Glossy, Super Matt"] },
      APPLICATION,
    ],
    advantages: [
      "Super eco- friendly, food grade, could be biodegradable",
      "Surface: High glossy with mirror reflective",
      "Super Matt with soft touch and silk feeling",
      "Anti- fingerprint, Scratch Resistance, Antibacterial",
      "Premium PET film, Superior Quality",
    ],
    icons: [{ src: `${ASSET}1df46d08fb009ee1d344b90e44fd4e5b7421ec96?width=1182`, width: 591, height: 159 }],
  },
  synchronized: {
    title: "Synchronized Board",
    rows: [
      { label: "Surface", lines: ["Double Side Texture Design"] },
      { label: "Base Material", lines: ["MDF"] },
      { label: "Color", lines: ["Wood Design"] },
      APPLICATION,
    ],
    icons: [],
  },
} satisfies Record<string, BoardSpec>;

/** Which spec card each board material shows. */
const SPEC_BY_MATERIAL: Record<MaterialKey, keyof typeof BOARD_SPECS> = {
  "uv-range": "high-gloss-uv",
  "acrylic-super-matt": "super-matt-uv",
  acrylic: "petg",
  melamine: "synchronized",
};

export const specForMaterial = (material: MaterialKey | undefined): BoardSpec | undefined =>
  material ? BOARD_SPECS[SPEC_BY_MATERIAL[material]] : undefined;
