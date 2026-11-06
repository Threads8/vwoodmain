import {
  FINISH_OPTIONS,
  type ColorKey,
  type FinishKey,
  type MaterialKey,
} from "@/config/catalogFilters";
import { CATALOG_ATTRIBUTES } from "./catalog-attributes";
import { EDGE_TAPE_PRODUCTS, type EdgeTapeCrop } from "./edge-tape-products";
import { PRODUCT_DETAILS } from "./product-details";
import { PRODUCT_IMAGES } from "./product-images";
import { BOARDS, type Board } from "./site-data";

/** One product card in the filterable MDF board and edge tape catalog. */
export type CatalogProduct = {
  id: string;
  slug: string;
  categoryId: "mdf-board" | "edge-tape";
  name: string;
  description: string;
  material: MaterialKey;
  finish: FinishKey;
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
  const option = FINISH_OPTIONS.find((item) => item.label === label);
  if (!option) throw new Error(`Unknown finish "${label}": add it to src/config/catalogFilters.ts`);
  return option.key;
}

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
    description: description ?? board.desc,
    finish: finishKey(board.finish),
    ...attributes,
    ...(image ? { image } : {}),
    images,
    swatch: cardSwatch?.background ?? board.swatch,
    ...(cardSwatch?.border ? { swatchBorder: cardSwatch.border } : {}),
    needsUniqueCopy: needsUniqueCopy ?? false,
  };
});

export const EDGE_TAPE_CATALOG: CatalogProduct[] = EDGE_TAPE_PRODUCTS.map((tape) => {
  const board = BOARDS.find((item) => item.name === tape.name)!;
  const { material, colors, textureCount } = attributesFor(board);
  return {
    id: tape.slug,
    slug: tape.slug,
    categoryId: "edge-tape",
    name: tape.name,
    description: tape.desc,
    material,
    finish: finishKey(tape.finish),
    colors,
    textureCount,
    ...(tape.image ? { image: tape.image } : {}),
    images: tape.image ? [tape.image] : [],
    ...(tape.crop ? { crop: tape.crop } : {}),
    swatch: tape.swatch,
    needsUniqueCopy: false,
  };
});

export const getCatalogProducts = (category: "mdf-board" | "edge-tape") =>
  category === "edge-tape" ? EDGE_TAPE_CATALOG : BOARD_CATALOG;
