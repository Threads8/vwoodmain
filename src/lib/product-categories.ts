import { BIN_DETAIL_PRODUCTS, BIN_PRODUCTS, LEGACY_BIN_SLUGS, type BinDetailProduct } from "./bin-products";
import { EDGE_TAPE_DETAIL_PRODUCTS, EDGE_TAPE_PRODUCTS, type EdgeTapeDetailProduct } from "./edge-tape-products";
import { BOARDS, type Board } from "./site-data";
import { SINK_PRODUCTS, type SinkProduct } from "./sink-products";

export const PRODUCT_CATEGORIES = [
  { id: "mdf-board", name: "MDF Board" },
  { id: "sink", name: "Sink" },
  { id: "rubbish-bin", name: "Rubbish Bin" },
  { id: "edge-tape", name: "Edge Tape" },
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number]["id"];

/**
 * Categories whose listing cards leave out the short description. Sink and Edge Tape records carry
 * board-finish copy from the Figma export, so it is not rendered on their cards. The data stays:
 * detail pages still read it.
 */
export const HIDE_DESCRIPTION_CATEGORIES: readonly ProductCategory[] = ["sink", "edge-tape"];

/** Compares on the normalized slug, so "Edge Tape", " EDGE-TAPE " and "edge_tape" all match. */
export const showsCardDescription = (categoryId: string) =>
  !(HIDE_DESCRIPTION_CATEGORIES as readonly string[]).includes(
    categoryId.trim().toLowerCase().replace(/[\s_]+/g, "-"),
  );

export function parseProductCategory(value: unknown): ProductCategory {
  return PRODUCT_CATEGORIES.find((category) => category.id === value)?.id ?? "mdf-board";
}

// The existing local catalog is the application's only product source.
// Keep listing and detail pages on the same records; do not invent inventory.
export function getCategoryProducts(category: ProductCategory) {
  if (category === "edge-tape") return EDGE_TAPE_PRODUCTS;
  return BOARDS.filter((product) => product.categoryId === category);
}

/**
 * Looks a product up by its URL slug, ignoring case and surrounding spaces, and resolving the
 * earlier bin URLs. The result's `slug` is the canonical one; callers redirect when it differs.
 */
export function findProduct(rawSlug: string): Board | SinkProduct | BinDetailProduct | EdgeTapeDetailProduct | undefined {
  const key = rawSlug.trim().toLowerCase();
  const slug = LEGACY_BIN_SLUGS[key] ?? key;
  return BOARDS.find((board) => board.slug === slug)
    ?? SINK_PRODUCTS.find((sink) => sink.slug === slug)
    ?? BIN_DETAIL_PRODUCTS.find((bin) => bin.slug === slug)
    ?? EDGE_TAPE_DETAIL_PRODUCTS.find((tape) => tape.slug === slug);
}

export function categoryOptionLabel(category: typeof PRODUCT_CATEGORIES[number]) {
  const count = category.id === "sink" ? SINK_PRODUCTS.length : category.id === "rubbish-bin" ? BIN_PRODUCTS.length : getCategoryProducts(category.id).length;
  // The products-type dropdown says "Sinks"; the category name stays "Sink" elsewhere.
  const label = category.id === "sink" ? "Sinks" : category.name;
  return `${label}${count ? "" : " (coming soon)"}`;
}
