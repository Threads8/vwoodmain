import { PRODUCT_DETAILS } from "./product-details";
import { BOARDS, type Board } from "./site-data";

// Content and assets transcribed from the supplied Figma exports (catalog pages 01 and 02).
// Every tape matches a board finish and shares its finish and tone. Tapes with a supplied
// detail frame link to their own page; the rest still link to the matching board.
const asset = (hash: string, width: number) =>
  `https://api.builder.io/api/v1/image/assets/TEMP/${hash}?width=${width}`;

/** Image placement inside the 277 x 347 Figma card, for swatches zoomed into a larger source. */
export type EdgeTapeCrop = { width: number; height: number; x: number; y: number };

export type EdgeTapeProduct = Pick<Board, "slug" | "name" | "finish" | "swatch"> & {
  categoryId: "edge-tape";
  desc: string;
  image?: string;
  crop?: EdgeTapeCrop;
};

const TIMBER =
  "Premium natural timber veneer with a deep horizontal grain and organic tactile warmth.";
const POLYMER =
  "High-durability seamless polymer surface with anti-fingerprint technology in matte charcoal.";
const STONE =
  "Ultra-compact sintered stone mimicking the timeless elegance of Italian Carrara marble.";
const BRUSHED =
  "Anodized aluminum finish with a fine-brushed texture for sophisticated highlights.";
const ACRYLIC =
  "Acrylic-based surface offering an ultra-matte, velvety touch with thermal healing properties.";
const MELAMINE =
  "Melamine-based surface offering an ultra-matte, velvety touch with thermal healing properties.";

type RawTape = Pick<EdgeTapeProduct, "desc" | "image" | "crop"> & { name: string; swatch?: string };

const raw: RawTape[] = [
  {
    name: "Arctic Matt",
    desc: TIMBER,
    image: asset("31bc97eab9eb72afa9d9a2dce409048e20259bd5", 555),
  },
  { name: "Alabaster Gloss", desc: POLYMER, swatch: "#F4EFED" },
  {
    name: "Shiny White Gloss",
    desc: ACRYLIC,
    image: asset("90930ebe4be79da278a309ced2681416c0a45007", 558),
  },
  {
    name: "Warm White Gloss",
    desc: STONE,
    image: asset("450a47a70576348117425781d7a198e46ae92c1d", 555),
  },
  {
    name: "Diamond Grey Gloss",
    desc: BRUSHED,
    image: asset("ad6595ac60f482dfe2ca1f5c560854d2c4ad4423", 1432),
    crop: { width: 716, height: 701, x: -408, y: -56 },
  },
  { name: "Raven Black Matt", desc: ACRYLIC, swatch: "#2B2A28" },
  {
    name: "Snow White Matt",
    desc: TIMBER,
    swatch: "#FCFBF7",
  },
  {
    name: "Classic Walnut",
    desc: POLYMER,
    image: asset("45407cc05cc88cc5c91f99fcfcaa7a5de937443f", 555),
  },
  {
    name: "Maple Wood Natural",
    desc: ACRYLIC,
    image: asset("09ec5240c23f65740f4c48a417a726b2dd0bdba1", 555),
  },
  {
    name: "Natural Brown",
    desc: STONE,
    image: asset("e4348f4de9e73977c5ff18425f91a2f2797f2605", 556),
    crop: { width: 278, height: 371, x: 0, y: 0 },
  },
  {
    name: "Oak Wood Natural",
    desc: BRUSHED,
    image: asset("88be51389f791d8068318ef5213c84a669fe29a9", 555),
  },
  {
    name: "Grey Wood Natural",
    desc: ACRYLIC,
    image: asset("3f0ddff073c7767fef44f9ac329d19e43f8c5ec1", 555),
  },
  {
    name: "Southern Oakwood",
    desc: TIMBER,
    image: asset("6f2bee6ebe5f734a8c62ad53d9986274864ca945", 555),
  },
  {
    name: "Washed Maple Wood Natural",
    desc: POLYMER,
    image: asset("3c99d6344301efe1f7c6f680580e309f6f32b4bb", 555),
  },
  {
    name: "Washed Oakwood",
    desc: ACRYLIC,
    image: asset("1ef07a39eff8aafbe3575162a5e9dc6b863eff16", 555),
  },
  {
    name: "Olive Super Matt",
    desc: STONE,
    image: asset("c33d5bc040013fb7938ecfd28c58a1d85afd6217", 555),
  },
  {
    name: "Maple Shadow",
    desc: BRUSHED,
    image: asset("c8f7b848188a33c8f9e64fc65ca51991b2955f73", 680),
    crop: { width: 340, height: 355, x: -12, y: 0 },
  },
  {
    name: "Golden Oak",
    desc: ACRYLIC,
    image: asset("0e931d231e21df1d7411edddd2e356e328edc451", 555),
  },
  {
    name: "Musket Brown",
    desc: STONE,
    image: asset("1b43261c9a368a5bacbbcbcc38bc69f2a87efd6a", 555),
  },
  {
    name: "Sand Dune",
    desc: BRUSHED,
    image: asset("8977d742d4274a432a7593bc3e1fd2659b77d49a", 555),
  },
  {
    name: "Prime Oak",
    desc: MELAMINE,
    image: asset("0ff07d2c1957af976e8d0287401eb786bae20b09", 1359),
    crop: { width: 679, height: 713, x: -169, y: -270 },
  },
  {
    name: "Moss Grey Wood",
    desc: STONE,
    image: asset("c63fba2607e77e6e83278ad6e621c3c661455341", 1082),
    crop: { width: 541, height: 517, x: -81, y: -39 },
  },
  {
    name: "Rural Oak",
    desc: BRUSHED,
    image: asset("7c71fe96836f6b9c7755f2690e9965e45d9aadc2", 3076),
    crop: { width: 1538, height: 2735, x: -909, y: -720 },
  },
  {
    name: "Aged Ash",
    desc: MELAMINE,
    image: asset("9173fd7d472ddd36824af7a90ea6ce61e9bf8c31", 1082),
    crop: { width: 541, height: 517, x: -77, y: -42 },
  },
  {
    name: "Anthracite",
    desc: STONE,
    image: asset("19f69dab8e9568f6a9d2a8ce680f7c56408f9476", 1082),
    crop: { width: 541, height: 517, x: -81, y: -39 },
  },
];

const edgeTapeSlug = (boardSlug: string) => `${boardSlug}-edge-tape`;

export type EdgeTapeDetailProduct = {
  categoryId: "edge-tape";
  slug: string;
  name: string;
  desc: string;
  code: string;
  sides: string;
  swatch: string;
  surfaceDesc: string;
  features: string[];
};

export const EDGE_TAPE_DETAIL_PRODUCTS: EdgeTapeDetailProduct[] = BOARDS.flatMap((board) => {
  const slug = edgeTapeSlug(board.slug);
  const detail = PRODUCT_DETAILS[slug];
  if (!detail) return [];
  return [
    {
      categoryId: "edge-tape" as const,
      slug,
      name: board.name,
      desc: detail.surfaceDesc,
      code: detail.code,
      sides: detail.sides ?? "2 Sides",
      swatch: detail.color,
      surfaceDesc: detail.surfaceDesc,
      features: detail.features,
    },
  ];
});

export const EDGE_TAPE_PRODUCTS: EdgeTapeProduct[] = raw.flatMap(({ name, swatch, ...tape }) => {
  const board = BOARDS.find((item) => item.name === name);
  if (!board) return [];
  return [
    {
      ...tape,
      categoryId: "edge-tape" as const,
      slug: PRODUCT_DETAILS[edgeTapeSlug(board.slug)] ? edgeTapeSlug(board.slug) : board.slug,
      name,
      finish: board.finish,
      swatch: swatch ?? board.swatch,
    },
  ];
});
