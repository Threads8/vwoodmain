import {
  COLOR_OPTIONS,
  normalizeFinish,
  type ColorKey,
  type FinishKey,
  type MaterialKey,
} from "@/config/catalogFilters";
import { CATALOG_ATTRIBUTES } from "./catalog-attributes";
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
  needsUniqueCopy: boolean;
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

export const BOARD_CATALOG: CatalogProduct[] = BOARDS.map((board) => {
  const { needsUniqueCopy, description, cardSwatch, ...attributes } = attributesFor(board);
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
    description: description ?? board.desc,
    finish: finishKey(board.finish),
    hasDetailPage: true,
    ...attributes,
    ...(image ? { image } : {}),
    images,
    swatch: cardSwatch?.background ?? board.swatch,
    ...(cardSwatch?.border ? { swatchBorder: cardSwatch.border } : {}),
    needsUniqueCopy: needsUniqueCopy ?? false,
  };
});

export const EDGE_TAPE_CATALOG: CatalogProduct[] = EDGE_TAPE_PRODUCTS.map((tape): CatalogProduct => {
  const board = BOARDS.find((item) => item.name === tape.name)!;
  const { material, colors, textureCount } = attributesFor(board);
  // Only tapes with a supplied detail frame have a tape code; the board's code is not reused.
  const code = PRODUCT_DETAILS[tape.slug]?.code;
  return {
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
    needsUniqueCopy: false,
  };
}).concat(
  CARCASS_EDGE_TAPES.map((tape): CatalogProduct => ({
    id: tape.slug,
    slug: tape.slug,
    categoryId: tape.categoryId,
    name: tape.name,
    description: "",
    finish: finishKey(tape.finish),
    size: tape.size,
    hasDetailPage: false,
    colors: tape.colors,
    textureCount: 1,
    images: [],
    swatch: WHITE_SWATCH,
    swatchBorder: "1px solid rgba(131,116,107,0.35)",
    needsUniqueCopy: false,
  })),
);

export const getCatalogProducts = (category: "mdf-board" | "edge-tape") =>
  category === "edge-tape" ? EDGE_TAPE_CATALOG : BOARD_CATALOG;
