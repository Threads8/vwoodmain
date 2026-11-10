import {
  COLOR_OPTIONS,
  normalizeFinish,
  type ColorKey,
  type FinishKey,
  type MaterialKey,
} from "@/config/catalogFilters";
import { CARD_TAGLINES, CATALOG_ATTRIBUTES } from "./catalog-attributes";
import { CARCASS_EDGE_TAPES, EDGE_TAPE_PRODUCTS, type EdgeTapeCrop } from "./edge-tape-products";
import { PRODUCT_DETAILS } from "./product-details";
import { PRODUCT_IMAGES } from "./product-images";
import { BOARDS, type Board } from "./site-data";

/** One product card in the filterable MDF board and edge tape catalog. */
export type CatalogProduct = {
  id: string;
  slug: string;
  categoryId: "mdf-board" | "edge-tape";
  name: string;
  /** Supplier product code, when the catalog has one. */
  code?: string;
  description: string;
  /** Absent when the product sheet gives no material. */
  material?: MaterialKey;
  /** Normalized key: "matte" | "satin" | "high-gloss" | "woodgrain". */
  finish: FinishKey;
  /** Sheet size, e.g. "1x21 MM", for products that list one on the card. */
  size?: string;
  /** False for products without a detail page; their card is not a link. */
  hasDetailPage: boolean;
  colors: ColorKey[];
  textureCount: number;
  image?: string;
  images: string[];
  /** Image placement for edge tape swatches zoomed into a larger source image. */
  crop?: EdgeTapeCrop;
  /** CSS background shown when a product has no image. */
  swatch: string;
  swatchBorder?: string;
};

function finishKey(label: string): FinishKey {
  const key = normalizeFinish(label);
  if (!key) throw new Error(`Unknown finish "${label}": add it to src/config/catalogFilters.ts`);
  return key;
}

const WHITE_SWATCH = COLOR_OPTIONS.find((option) => option.key === "white")!.hex;

function attributesFor(board: Board) {
  const attributes = CATALOG_ATTRIBUTES[board.slug];
  if (!attributes)
    throw new Error(
      `Missing catalog attributes for "${board.slug}" in src/lib/catalog-attributes.ts`,
    );
  return attributes;
}

/** Boards kept for other features but left out of the MDF board catalog grid. */
const NOT_IN_BOARD_CATALOG = new Set(["ultra-high-gloss-iron-ore"]);

export const BOARD_CATALOG: CatalogProduct[] = BOARDS.filter(
  (board) => !NOT_IN_BOARD_CATALOG.has(board.slug),
).map((board) => {
  const { cardSwatch, ...attributes } = attributesFor(board);
  const tagline = CARD_TAGLINES[board.slug];
  if (!tagline) throw new Error(`Missing card tagline for "${board.slug}" in src/lib/catalog-attributes.ts`);
  const detail = PRODUCT_DETAILS[board.slug];
  const images = detail?.images ?? [];
  // Card image: the supplied cabinetry shot, else the detail page sample, else an in-use photo.
  // A supplied solid swatch replaces the photo entirely.
  const image = cardSwatch ? undefined : (PRODUCT_IMAGES[board.slug] ?? detail?.hero ?? images[0]);
  return {
    id: board.slug,
    slug: board.slug,
    categoryId: "mdf-board",
    name: board.name,
    code: board.code,
    description: tagline,
    finish: finishKey(board.finish),
    hasDetailPage: true,
    ...attributes,
    ...(image ? { image } : {}),
    images,
    swatch: cardSwatch?.background ?? board.swatch,
    ...(cardSwatch?.border ? { swatchBorder: cardSwatch.border } : {}),
  };
});

const matchingBoardEdgeTapes: CatalogProduct[] = EDGE_TAPE_PRODUCTS.flatMap((tape): CatalogProduct[] => {
  const board = BOARDS.find((item) => item.name === tape.name)!;
  const { material, colors, textureCount } = attributesFor(board);
  // Only tapes with a supplied detail frame have a tape code; the board's code is not reused.
  const code = PRODUCT_DETAILS[tape.slug]?.code;
  return [{
    id: tape.slug,
    slug: tape.slug,
    categoryId: "edge-tape",
    name: tape.name,
    ...(code ? { code } : {}),
    description: tape.desc,
    material,
    finish: finishKey(tape.finish),
    hasDetailPage: true,
    colors,
    textureCount,
    ...(tape.image ? { image: tape.image } : {}),
    images: tape.image ? [tape.image] : [],
    ...(tape.crop ? { crop: tape.crop } : {}),
    swatch: tape.swatch,
  }];
});

// Keep White Satin and White Gloss on the first page of the edge tape category.
export const EDGE_TAPE_CATALOG: CatalogProduct[] = CARCASS_EDGE_TAPES.map((tape): CatalogProduct => ({
    id: tape.slug,
    slug: tape.slug,
    categoryId: tape.categoryId,
    name: tape.name,
    description: "",
    finish: finishKey(tape.finish),
    size: tape.size,
    hasDetailPage: true,
    colors: tape.colors,
    textureCount: 1,
    image: tape.image,
    images: [tape.image],
    swatch: WHITE_SWATCH,
    swatchBorder: "1px solid rgba(131,116,107,0.35)",
  })).concat(matchingBoardEdgeTapes);

export const getCatalogProducts = (category: "mdf-board" | "edge-tape") =>
  category === "edge-tape" ? EDGE_TAPE_CATALOG : BOARD_CATALOG;
