import { describe, expect, it } from "vitest";
import { BIN_PRODUCTS } from "@/lib/bin-products";
import { PRODUCT_DETAILS } from "@/lib/product-details";
import { BOARDS } from "@/lib/site-data";
import { SINK_PRODUCTS } from "@/lib/sink-products";
import { PRODUCT_CATEGORIES, getCategoryProducts, parseProductCategory, categoryOptionLabel, findProduct } from "@/lib/product-categories";

describe("Product categories", () => {
  it("uses the same unique MDF records as the product detail pages", () => {
    const products = getCategoryProducts("mdf-board");
    expect(products.length).toBeGreaterThan(0);
    expect(products).toEqual(BOARDS);
    expect(new Set(products.map((product) => product.slug)).size).toBe(products.length);
    expect(products.every((product) => product.categoryId === "mdf-board")).toBe(true);
  });

  it.each(["sink", "rubbish-bin"] as const)("does not show MDF inventory under %s", (category) => {
    expect(getCategoryProducts(category)).toEqual([]);
  });

  it("lists all 25 edge tapes in the supplied order with no MDF inventory", () => {
    const tapes = getCategoryProducts("edge-tape");
    expect(tapes).toHaveLength(25);
    expect(tapes[0]?.name).toBe("Arctic Matt");
    expect(tapes[12]?.name).toBe("Southern Oakwood");
    expect(tapes.at(-1)?.name).toBe("Anthracite");
    expect(new Set(tapes.map((tape) => tape.slug)).size).toBe(25);
    expect(tapes.every((tape) => tape.categoryId === "edge-tape")).toBe(true);
    expect(categoryOptionLabel(PRODUCT_CATEGORIES.find((item) => item.id === "edge-tape")!)).toBe("Edge Tape");
  });

  it("links every edge tape to a detail page with the same name", () => {
    expect(getCategoryProducts("edge-tape").every((tape) => findProduct(tape.slug)?.name === tape.name)).toBe(true);
  });

  it("gives the supplied edge tapes their own pages and leaves the board pages unchanged", () => {
    const tapes = getCategoryProducts("edge-tape").filter((tape) => findProduct(tape.slug)?.categoryId === "edge-tape");
    expect(tapes.map((tape) => tape.name)).toEqual(["Arctic Matt", "Alabaster Gloss", "Shiny White Gloss", "Warm White Gloss", "Diamond Grey Gloss", "Raven Black Matt", "Snow White Matt", "Olive Super Matt"]);
    expect(tapes.every((tape) => PRODUCT_DETAILS[tape.slug]?.sizes.join() === "1x22 MM")).toBe(true);
    expect(findProduct("arctic-matt-edge-tape")?.code).toBe("VW63035M");
    expect(findProduct("arctic-matt")?.categoryId).toBe("mdf-board");
    expect(PRODUCT_DETAILS["arctic-matt"]?.sizes).toEqual(["2440x1220"]);
    expect(BOARDS.some((board) => board.slug.endsWith("-edge-tape"))).toBe(false);
  });

  it("lists the rubbish bin range as available", () => {
    expect(BIN_PRODUCTS.map((product) => product.name)).toEqual(["Rubbish Bin", "Rubbish Bin", "Rubbish Bin", "Rubbish Bin", "Rubbish Bin", "Drawer Runner"]);
    expect(new Set(BIN_PRODUCTS.map((product) => product.slug)).size).toBe(BIN_PRODUCTS.length);
    expect(categoryOptionLabel(PRODUCT_CATEGORIES.find((item) => item.id === "rubbish-bin")!)).toBe("Rubbish Bin");
  });

  it("finds board and sink detail records by slug", () => {
    expect(findProduct("arctic-matt")?.categoryId).toBe("mdf-board");
    expect(SINK_PRODUCTS.map((sink) => findProduct(sink.slug)?.code)).toEqual(["LS-4444", "LS-6045", "LS-7145HAr"]);
    expect(findProduct("missing")).toBeUndefined();
  });

  it("links bin cards only to bin detail pages that exist", () => {
    expect(findProduct("pull-out-rubbish-bin")?.code).toBe("WB.0240.C");
    expect(findProduct("rubbish-bin-2")).toBeUndefined();
    const linked = BIN_PRODUCTS.flatMap((bin) => bin.detailSlug ?? []);
    expect(linked).toEqual(["pull-out-rubbish-bin", "rubbish-bin-wb-0240-a", "pull-out-rubbish-bin", "drawer-runner"]);
    expect(linked.every((slug) => findProduct(slug))).toBe(true);
    expect(findProduct("rubbish-bin-wb-0240-a")?.code).toBe("WB.0240.A");
    expect(findProduct("drawer-runner")?.code).toBe("SL6118");
    expect(findProduct("drawer-runner")?.name).toBe("Drawer Runner");
  });

  it("lists the sink range as available", () => {
    expect(SINK_PRODUCTS.map((product) => product.name)).toEqual(["Single Bowl Sink", "Single Bowl Sink", "One and a Half Bowl Sink"]);
    expect(new Set(SINK_PRODUCTS.map((product) => product.slug)).size).toBe(SINK_PRODUCTS.length);
    expect(categoryOptionLabel(PRODUCT_CATEGORIES.find((item) => item.id === "sink")!)).toBe("Sink");
  });

  it.each([undefined, null, "invalid", "MDF Board", ["sink"], { category: "sink" }])("falls back safely for invalid search value %j", (value) => {
    expect(parseProductCategory(value)).toBe("mdf-board");
  });

  it.each(PRODUCT_CATEGORIES)("accepts the stable category ID $id", ({ id }) => {
    expect(parseProductCategory(id)).toBe(id);
  });
});

describe("Listing card descriptions", () => {
  it("hides them for Sink and Edge Tape only, matching the slug in any case or spacing", async () => {
    const { HIDE_DESCRIPTION_CATEGORIES, showsCardDescription } = await import("@/lib/product-categories");
    const { EDGE_TAPE_CATALOG } = await import("@/lib/catalog-products");
    expect(HIDE_DESCRIPTION_CATEGORIES).toEqual(["sink", "edge-tape"]);
    expect(["edge-tape", " Edge Tape ", "EDGE_TAPE", "sink"].map(showsCardDescription)).toEqual([false, false, false, false]);
    expect(["mdf-board", "rubbish-bin"].map(showsCardDescription)).toEqual([true, true]);
    expect(EDGE_TAPE_CATALOG.every((product) => !showsCardDescription(product.categoryId))).toBe(true);
    // The description data is kept for other pages.
    expect(EDGE_TAPE_CATALOG.filter((product) => product.description).length).toBeGreaterThan(0);
  });
});
