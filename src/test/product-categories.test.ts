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

  it("gives every edge tape its own page and leaves the board pages unchanged", () => {
    const tapes = getCategoryProducts("edge-tape").filter((tape) => findProduct(tape.slug)?.categoryId === "edge-tape");
    expect(tapes).toHaveLength(getCategoryProducts("edge-tape").length);
    expect(tapes.every((tape) => tape.slug.endsWith("-edge-tape"))).toBe(true);
    // The page image comes from the category card, so tape records carry no separate main image.
    expect(tapes.every((tape) => "image" in tape && tape.image && !PRODUCT_DETAILS[tape.slug]?.hero)).toBe(true);
    expect(tapes.every((tape) => PRODUCT_DETAILS[tape.slug]?.sizes.join() === "1x22 MM")).toBe(true);
    expect(findProduct("arctic-matt-edge-tape")?.code).toBe("VW63035M");
    expect(findProduct("arctic-matt")?.categoryId).toBe("mdf-board");
    expect(PRODUCT_DETAILS["arctic-matt"]?.sizes).toEqual(["2440x1220"]);
    expect(BOARDS.some((board) => board.slug.endsWith("-edge-tape"))).toBe(false);
  });

  it("lists the rubbish bin range as available", () => {
    expect(BIN_PRODUCTS.map((product) => product.name)).toEqual(["Rubbish Bin", "Rubbish Bin", "Rubbish Bin", "Rubbish Bin", "Rubbish Bin"]);
    expect(new Set(BIN_PRODUCTS.map((product) => product.slug)).size).toBe(BIN_PRODUCTS.length);
    expect(categoryOptionLabel(PRODUCT_CATEGORIES.find((item) => item.id === "rubbish-bin")!)).toBe("Rubbish Bin");
  });

  it("finds board and sink detail records by slug", () => {
    expect(findProduct("arctic-matt")?.categoryId).toBe("mdf-board");
    expect(SINK_PRODUCTS.map((sink) => findProduct(sink.slug)?.code)).toEqual(["LS-4444", "LS-6045", "LS-7145HAr"]);
    expect(findProduct("missing")).toBeUndefined();
  });

  it("links every bin card to a detail page keyed by its code", () => {
    const linked = BIN_PRODUCTS.map((bin) => bin.detailSlug);
    expect(linked).toEqual(["wb-0240-c", "wb-0240-e", "wb-0144", "wb-0143", "wb-0240-a"]);
    expect(linked.every((slug) => slug && findProduct(slug)?.slug === slug)).toBe(true);
    expect(["wb-0240-c", "wb-0240-a", "wb-0144"].map((slug) => findProduct(slug)?.code)).toEqual(["WB.0240.C", "WB.0240.A", "WB.0144"]);
    expect(findProduct("sl6118")).toBeUndefined();
    expect(findProduct("rubbish-bin-2")).toBeUndefined();
  });

  it("keeps earlier bin URLs and other casings resolving to the canonical slug", () => {
    expect(findProduct("pull-out-rubbish-bin")?.slug).toBe("wb-0240-c");
    expect(findProduct("rubbish-bin-wb-0240-a")?.slug).toBe("wb-0240-a");
    expect(findProduct("drawer-runner")).toBeUndefined();
    expect(findProduct(" WB-0144 ")?.slug).toBe("wb-0144");
  });

  it("builds URL-safe slugs from codes with dots, spaces, plus signs and stars", async () => {
    const { productSlug } = await import("@/lib/product-slug");
    expect(["WB.0144", "WB.0240.C", " LS-7145HAr ", "Black+White+Chrome", "R255*L310*H330mm"].map(productSlug))
      .toEqual(["wb-0144", "wb-0240-c", "ls-7145har", "black-white-chrome", "r255-l310-h330mm"]);
  });

  it("gives WB.0144 only the fields from the product sheet, as written", () => {
    const detail = PRODUCT_DETAILS["wb-0144"]!;
    expect([detail.code, detail.sizes, detail.colorName, detail.finishName, detail.features])
      .toEqual(["WB.0144", ["R(255)XL(310)XH(330mm)"], "Black+White+Chrome", "Stainless Steel+Plastic", []]);
  });

  it("gives every MDF board and its edge tape the code from the product sheet", () => {
    const sheet: Record<string, string> = {
      "Arctic Matt": "VW63035M", "Alabaster Gloss": "VW63004", "Olive Super Matt": "VW63841M",
      "Shiny White Gloss": "VW853", "Warm White Gloss": "VW007", "Diamond Grey Gloss": "VW1087",
      "Raven Black Matt": "VW006SM", "Snow White Matt": "VW806SM", "Classic Walnut": "VW9E1128-3",
      "Maple Wood Natural": "VW9E1128-2", "Natural Brown": "VW9E1633-8", "Oak Wood Natural": "VW9E1633-7",
      "Grey Wood Natural": "VW9F0203-1", "Southern Oakwood": "VW8E1640-16", "Washed Maple Wood Natural": "VW8E516-2",
      "Moss Grey Wood": "VW9F0202-1", "Washed Oakwood": "VW8E0718-2", "Rural Oak": "VW8E0718-11N",
      "Maple Shadow": "VW9F0206-2", "Golden Oak": "VW9E1532-3", "Musket Brown": "VW8E1027-9",
      "Sand Dune": "VW9F25177Z-4", "Prime Oak": "VW9E47183", "Aged Ash": "VW9E59291", "Anthracite": "VW936SM",
    };
    for (const [name, code] of Object.entries(sheet)) {
      const board = BOARDS.find((item) => item.name === name)!;
      expect([name, board.code, findProduct(`${board.slug}-edge-tape`)?.code]).toEqual([name, code, code]);
    }
  });

  it("lists the sink range as available", () => {
    expect(SINK_PRODUCTS.map((product) => product.name)).toEqual(["Single Bowl Sink", "Single Bowl Sink", "One and a Half Bowl Sink"]);
    expect(new Set(SINK_PRODUCTS.map((product) => product.slug)).size).toBe(SINK_PRODUCTS.length);
    expect(categoryOptionLabel(PRODUCT_CATEGORIES.find((item) => item.id === "sink")!)).toBe("Sinks");
  });

  it.each([undefined, null, "invalid", "MDF Board", ["sink"], { category: "sink" }])("falls back safely for invalid search value %j", (value) => {
    expect(parseProductCategory(value)).toBe("mdf-board");
  });

  it.each(PRODUCT_CATEGORIES)("accepts the stable category ID $id", ({ id }) => {
    expect(parseProductCategory(id)).toBe(id);
  });
});

describe("Listing card descriptions", () => {
  it("hides them for Sink and Edge Tape, matching the slug in any case or spacing", async () => {
    const { HIDE_DESCRIPTION_CATEGORIES, showsCardDescription } = await import("@/lib/product-categories");
    const { EDGE_TAPE_CATALOG } = await import("@/lib/catalog-products");
    expect(HIDE_DESCRIPTION_CATEGORIES).toEqual(["sink", "edge-tape", "rubbish-bin"]);
    expect([" Sink ", "SINK", "sink"].map(showsCardDescription)).toEqual([false, false, false]);
    expect(["mdf-board", "rubbish-bin"].map(showsCardDescription)).toEqual([true, false]);
    expect(["edge-tape", " Edge Tape ", "EDGE_TAPE"].map(showsCardDescription)).toEqual([false, false, false]);
    expect(EDGE_TAPE_CATALOG.some((product) => showsCardDescription(product.categoryId))).toBe(false);
    // The description data is kept for other pages.
    expect(EDGE_TAPE_CATALOG.filter((product) => product.description).length).toBeGreaterThan(0);
  });
});
