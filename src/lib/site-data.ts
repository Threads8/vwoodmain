import { PRODUCT_DETAILS } from "./product-details";

export const IMG = {
  homeHero:
    "https://res.cloudinary.com/dpjdnoqii/image/upload/v1790491179/7a2302914a83245fbee5c213b1203566e29360eb_vtie4m.png",
  barKitchen:
    "https://res.cloudinary.com/dpjdnoqii/image/upload/v1790491213/28c6c5c74ad7f084638f5bbedba05a9560e21eeb_fjjari.jpg",
  brightKitchen:
    "https://res.cloudinary.com/dpjdnoqii/image/upload/v1790491215/09de179a838aca0e3142b8078d483ce2660c276b_ocozve.jpg",
  woodKitchen:
    "https://res.cloudinary.com/dpjdnoqii/image/upload/v1790491215/839754928a081d13e1a496405cc92b82c1629b63_gyqruq.jpg",
};

export type Board = {
  categoryId: "mdf-board";
  slug: string;
  name: string;
  desc: string;
  code: string;
  finish: string;
  sides: string;
  swatch: string; // CSS background
  titleSize?: number; // px for the detail-page product 
  surfaceDesc: string; // dark "Premium Surface Finish" panel copy
  features: string[]; // three panel bullets
};

const wood = (a: string, b: string) =>
  `repeating-linear-gradient(92deg, ${a} 0 3px, ${b} 3px 7px, ${a} 7px 12px)`;

const descs = [
  "Premium natural timber veneer with a deep horizontal grain and organic tactile warmth.",
  "High-durability seamless polymer surface with anti-fingerprint technology in matte charcoal.",
  "Acrylic-based surface offering an ultra-matte, velvety touch with thermal healing properties.",
  "Ultra-compact sintered stone mimicking the timeless elegance of Italian Carrara marble.",
  "Anodized aluminium finish with a fine-brushed texture for sophisticated highlights.",
];

const raw: [string, string, string][] = [
  ["Arctic Matt", "Matte", "#f4f4f2"],
  ["Alabaster Gloss", "High Gloss", "#f6f6f4"],
  ["Shiny White Gloss", "High Gloss", "#f8f8f7"],
  ["Warm White Gloss", "High Gloss", "#fbfaf6"],
  ["Diamond Grey Gloss", "High Gloss", "#5a5a5a"],
  ["Raven Black Matt", "Matte", "#2a2a2a"],
  ["Snow White Matt", "Matte", "#fcfbf7"],
  ["Classic Walnut", "Woodgrain", wood("#4a2c1c", "#5e3a25")],
  ["Maple Wood Natural", "Woodgrain", wood("#c58a3c", "#d69a4a")],
  ["Natural Brown", "Woodgrain", wood("#d8cfc6", "#e3dbd3")],
  ["Oak Wood Natural", "Woodgrain", wood("#dcd8d2", "#e8e5e0")],
  ["Grey Wood Natural", "Woodgrain", wood("#4f4a44", "#6a645c")],
  ["Southern Oakwood", "Woodgrain", wood("#8f877a", "#a39b8d")],
  ["Washed Maple Wood Natural", "Woodgrain", wood("#d8c9a6", "#e2d5b5")],
  ["Washed Oakwood", "Woodgrain", wood("#f0dcc0", "#f6e6cf")],
  ["Olive Super Matt", "Matte", "#a9bba9"],
  ["Maple Shadow", "Woodgrain", wood("#b88a68", "#c99a78")],
  ["Golden Oak", "Woodgrain", wood("#b8761e", "#cc8a30")],
  ["Musket Brown", "Woodgrain", wood("#1f1b18", "#2e2925")],
  ["Sand Dune", "Woodgrain", wood("#77695c", "#8a7c6e")],
  ["Prime Oak", "Woodgrain", wood("#d6ccbc", "#e3dacc")],
  ["Moss Grey Wood", "Woodgrain", "#77786d"],
  ["Rural Oak", "Woodgrain", wood("#5e3a25", "#70482f")],
  ["Aged Ash", "Woodgrain", wood("#d9b27c", "#e3c08e")],
  ["Anthracite", "High Gloss", "#424443"],
  ["Ultra High Gloss Iron Ore", "High Gloss", "#424443"],
];

const SURFACE: Record<string, { desc: string; features: string[]; titleSize?: number }> = {
  "arctic-matt": {
    desc: "A clean, soft white with a smooth matt finish that suits wardrobes, display cabinetry and joinery alike. Its low-glare surface pairs beautifully with brass and gold hardware for an elegant, contemporary look.",
    features: ["Smooth, low-glare matt finish", "Fingerprint resistant", "Pairs beautifully with brass & gold hardware"],
    titleSize: 54,
  },
  "alabaster-gloss": {
    desc: "A warm, ivory-white gloss that softens any space with a gentle, luminous glow. Its high-shine acrylic surface reflects light beautifully, making compact kitchens and bathrooms feel brighter and more open. A refined alternative to a stark white, well suited to cabinetry, wardrobes and feature panelling.",
    features: ["High-gloss acrylic finish", "Brightens & opens up smaller spaces", "Scratch & stain resistant"],
    titleSize: 62,
  },
};
const DEFAULT_SURFACE: { desc: string; features: string[]; titleSize?: number } = {

  desc: "A refined, hard-wearing surface that suits cabinetry, wardrobes and joinery alike, pairing beautifully with brass and gold hardware for an elegant, contemporary look.",
  features: ["Premium surface finish", "Fingerprint resistant", "Pairs beautifully with brass & gold hardware"],
};

export const BOARDS: Board[] = raw.map(([name, finish, swatch], i) => {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  const detail = PRODUCT_DETAILS[slug];
  const surface = SURFACE[slug] ?? DEFAULT_SURFACE;
  return {
    categoryId: "mdf-board",
    slug,
    name,
    finish,
    sides: detail?.sides ?? "2 Sides",
    swatch: finish === "Woodgrain" ? swatch : detail?.color ?? swatch,
    desc: detail?.surfaceDesc ?? descs[i % descs.length] ?? "",
    code: detail?.code ?? `VW6${3035 + i}SM`,
    surfaceDesc: detail?.surfaceDesc ?? surface.desc,
    features: detail?.features ?? surface.features,
    ...(surface.titleSize ? { titleSize: surface.titleSize } : {}),
  };
});
