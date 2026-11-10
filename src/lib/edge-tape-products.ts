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
    image: asset("d387e25d89f657129ce144284aec377eac3fee30", 554),
  },
  {
    name: "Alabaster Gloss",
    desc: POLYMER,
    swatch: "#F4EFED",
    image: asset("e878305f7fac5862253b3abd00bb9e980c91034c", 554),
  },
  {
    name: "Shiny White Gloss",
    desc: ACRYLIC,
    image: asset("3599e3c0be0f6406c2938483af444ef58d32ed82", 558),
  },
  {
    name: "Warm White Gloss",
    desc: STONE,
    image: asset("f5056c65abd917c67921f05e1f710040c01139ba", 554),
  },
  {
    name: "Diamond Grey Gloss",
    desc: BRUSHED,
    image: asset("212c7a6f4a93256682c513e0de55b3ae0ffea894", 732),
  },
  {
    name: "Raven Black Matt",
    desc: ACRYLIC,
    swatch: "#2B2A28",
    image: asset("af26825d7e11f5dbf7e88684a560db78e3a620e7", 556),
  },
  {
    name: "Snow White Matt",
    desc: TIMBER,
    swatch: "#FCFBF7",
    image: asset("1b7ad379a8405cd49d49911f900f38637eb5e817", 556),
  },
  {
    name: "Classic Walnut",
    desc: POLYMER,
    image: asset("da52aeccb82baad4f72c096955442152cc3f0556", 555),
  },
  {
    name: "Maple Wood Natural",
    desc: ACRYLIC,
    image: asset("71aca2ffad74296c8700ec097532b14f362cfe3f", 558),
  },
  {
    name: "Natural Brown",
    desc: STONE,
    image: asset("6f0769fa6b94d74c7a8016ca3c306ba8405ab267", 556),
  },
  {
    name: "Oak Wood Natural",
    desc: BRUSHED,
    image: asset("f33f8c5c427a811f3d665e6ee2564e94ed9989c5", 556),
  },
  {
    name: "Grey Wood Natural",
    desc: ACRYLIC,
    image: asset("1be37e1e0209ca3f59e0ddf9cb0afc86d4eb9657", 554),
  },
  {
    name: "Southern Oakwood",
    desc: TIMBER,
    image: asset("3c1acf9599b1863389be31d5991084694cfcbbca", 554),
  },
  {
    name: "Washed Maple Wood Natural",
    desc: POLYMER,
    image: asset("47a45fab4888da3287ce63cf9fd5a3789a9ae607", 1084),
  },
  {
    name: "Washed Oakwood",
    desc: ACRYLIC,
    image: asset("32db1c2d8672eb618195e545a25b0a93140c936d", 554),
  },
  {
    name: "Olive Super Matt",
    desc: STONE,
    image: asset("90804f163bb649fefd0be98806fb0e8a291d1ba1", 554),
  },
  {
    name: "Maple Shadow",
    desc: BRUSHED,
    image: asset("947b3095ca22e904bb4196ffd274a4742786a730", 736),
  },
  {
    name: "Golden Oak",
    desc: ACRYLIC,
    image: asset("232a4fc008e26b8b1244e291085611837f531027", 750),
  },
  {
    name: "Musket Brown",
    desc: STONE,
    image: asset("d6c51e8ee326dd14dfec305725f910e223396460", 734),
  },
  {
    name: "Sand Dune",
    desc: BRUSHED,
    image: asset("c3c3ccba7733b2badd17f7d0942b271304e6004c", 556),
  },
  {
    name: "Prime Oak",
    desc: MELAMINE,
    image: asset("3b06179a80e6eff8e79e3e120f4bd3bca4007cfe", 554),
  },
  {
    name: "Moss Grey Wood",
    desc: STONE,
    image: asset("28be2c0af58a82415381bc6f57ed6f50921c8955", 554),
  },
  {
    name: "Rural Oak",
    desc: BRUSHED,
    image: asset("23562fd3617b3fd3da764a43f05920abedf7b2f1", 556),
  },
  {
    name: "Aged Ash",
    desc: MELAMINE,
    image: asset("c553ee0937b144785f36270faafab2304c1643ea", 554),
  },
  {
    name: "Anthracite",
    desc: STONE,
    image: asset("a532d1ae405dbf50390940587be9f12a2a7215b8", 554),
  },
];

/**
 * Carcass edge tapes from the product sheet that have no matching board. Only the fields the
 * sheet gives are filled, plus the card image from the Figma edge tape category frame: no code,
 * material or copy is supplied for these, so those stay empty. Their detail pages use the
 * standard edge tape copy (see PRODUCT_DETAILS).
 */
export type SheetEdgeTape = {
  categoryId: "edge-tape";
  slug: string;
  name: string;
  size: string;
  /** Finish exactly as written on the sheet; normalized to a filter key in the catalog. */
  finish: string;
  colors: ["white"];
  image: string;
};

export const CARCASS_EDGE_TAPES: SheetEdgeTape[] = [
  { categoryId: "edge-tape", slug: "white-satin-carcass-edge-tape", name: "White Satin", size: "1x21 MM", finish: "Satin", colors: ["white"], image: asset("d387e25d89f657129ce144284aec377eac3fee30", 554) },
  { categoryId: "edge-tape", slug: "white-gloss-carcass-edge-tape", name: "White Gloss", size: "1x22 MM", finish: "High Gloss", colors: ["white"], image: asset("656ccfdb0fabe39c44cf4485935fc76d96b62ef1", 554) },
];

const edgeTapeSlug = (boardSlug: string) => `${boardSlug}-edge-tape`;

/**
 * Every board-matched tape gets its own edge tape page. Tapes without a supplied detail frame get
 * a record built from their board (same in-use photos, standard tape size, no supplier code),
 * registered in PRODUCT_DETAILS so the page, quote form and catalog all read one record. Their
 * main image is the category card image (see the product page).
 */
for (const { name } of raw) {
  const board = BOARDS.find((item) => item.name === name);
  if (!board || PRODUCT_DETAILS[edgeTapeSlug(board.slug)]) continue;
  const boardDetail = PRODUCT_DETAILS[board.slug];
  PRODUCT_DETAILS[edgeTapeSlug(board.slug)] = {
    code: "",
    surfaceDesc: board.surfaceDesc,
    features: board.features,
    color: boardDetail?.color ?? board.swatch,
    sizes: ["1x22 MM"],
    images: boardDetail?.images ?? [],
    imageWidths: boardDetail?.imageWidths ?? [],
  };
}

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

const CARCASS_DETAIL_PRODUCTS: EdgeTapeDetailProduct[] = CARCASS_EDGE_TAPES.flatMap((tape) => {
  const detail = PRODUCT_DETAILS[tape.slug];
  if (!detail) return [];
  return [{
    categoryId: "edge-tape" as const,
    slug: tape.slug,
    name: tape.name,
    desc: detail.surfaceDesc,
    code: detail.code,
    sides: detail.sides ?? "2 Sides",
    swatch: detail.color,
    surfaceDesc: detail.surfaceDesc,
    features: detail.features,
  }];
});

export const EDGE_TAPE_DETAIL_PRODUCTS: EdgeTapeDetailProduct[] = CARCASS_DETAIL_PRODUCTS.concat(BOARDS.flatMap((board) => {
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
}));

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
