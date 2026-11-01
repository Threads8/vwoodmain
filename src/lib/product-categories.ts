import { BIN_DETAIL_PRODUCTS, BIN_PRODUCTS, type BinDetailProduct } from "./bin-products";
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

export function parseProductCategory(value: unknown): ProductCategory {
  return PRODUCT_CATEGORIES.find((category) => category.id === value)?.id ?? "mdf-board";
}

// The existing local catalog is the application's only product source.
// Keep listing and detail pages on the same records; do not invent inventory.
export function getCategoryProducts(category: ProductCategory) {
  if (category === "edge-tape") return EDGE_TAPE_PRODUCTS;
  return BOARDS.filter((product) => product.categoryId === category);
}

export function findProduct(slug: string): Board | SinkProduct | BinDetailProduct | EdgeTapeDetailProduct | undefined {
  return BOARDS.find((board) => board.slug === slug)
    ?? SINK_PRODUCTS.find((sink) => sink.slug === slug)
    ?? BIN_DETAIL_PRODUCTS.find((bin) => bin.slug === slug)
    ?? EDGE_TAPE_DETAIL_PRODUCTS.find((tape) => tape.slug === slug);
}

export function categoryOptionLabel(category: typeof PRODUCT_CATEGORIES[number]) {
  const count = category.id === "sink" ? SINK_PRODUCTS.length : category.id === "rubbish-bin" ? BIN_PRODUCTS.length : getCategoryProducts(category.id).length;
  return `${category.name}${count ? "" : " (coming soon)"}`;
}
