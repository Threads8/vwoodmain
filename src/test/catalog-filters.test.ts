import { describe, expect, it } from "vitest";
import { CATALOG_ATTRIBUTES } from "@/lib/catalog-attributes";
import {
  availableOptions,
  EMPTY_PRODUCT_FILTERS,
  facetCounts,
  filterProducts,
  hasActiveFilters,
  parseCatalogSearch,
  toCatalogSearch,
  toggleValue,
  withinOptions,
  type Filterable,
} from "@/lib/catalog-filters";
import { BOARD_CATALOG, EDGE_TAPE_CATALOG } from "@/lib/catalog-products";
import { BOARDS } from "@/lib/site-data";
import { normalizeFinish } from "@/config/catalogFilters";

type Item = Filterable & { id: string };

const ITEMS: Item[] = [
  { id: "a", material: "acrylic", finish: "high-gloss", colors: ["white"] },
  { id: "b", material: "acrylic", finish: "matte", colors: ["black"] },
  { id: "c", material: "melamine", finish: "woodgrain", colors: ["tan", "dark-brown"] },
  { id: "d", material: "melamine", finish: "high-gloss", colors: ["charcoal"] },
  { id: "e", material: "uv-range", finish: "matte", colors: ["white"] },
];
const ids = (items: Item[]) => items.map((item) => item.id);

describe("filterProducts", () => {
  it("returns every product when no filters are selected", () => {
    expect(filterProducts(ITEMS, EMPTY_PRODUCT_FILTERS)).toEqual(ITEMS);
  });

  it("matches the selected material", () => {
    expect(
      ids(filterProducts(ITEMS, { ...EMPTY_PRODUCT_FILTERS, materials: ["melamine"] })),
    ).toEqual(["c", "d"]);
  });

  it("uses OR within materials, finishes and colours", () => {
    expect(
      ids(filterProducts(ITEMS, { ...EMPTY_PRODUCT_FILTERS, materials: ["acrylic", "uv-range"] })),
    ).toEqual(["a", "b", "e"]);
    expect(
      ids(filterProducts(ITEMS, { ...EMPTY_PRODUCT_FILTERS, finishes: ["matte", "woodgrain"] })),
    ).toEqual(["b", "c", "e"]);
    expect(
      ids(filterProducts(ITEMS, { ...EMPTY_PRODUCT_FILTERS, colors: ["white", "tan"] })),
    ).toEqual(["a", "c", "e"]);
  });

  it("matches a product when any of its colours is selected", () => {
    expect(
      ids(filterProducts(ITEMS, { ...EMPTY_PRODUCT_FILTERS, colors: ["dark-brown"] })),
    ).toEqual(["c"]);
  });

  it("uses AND across material, finish and colour", () => {
    expect(
      ids(
        filterProducts(ITEMS, {
          materials: ["acrylic"],
          finishes: ["high-gloss", "matte"],
          colors: ["black"],
        }),
      ),
    ).toEqual(["b"]);
    expect(
      filterProducts(ITEMS, { materials: ["uv-range"], finishes: ["woodgrain"], colors: [] }),
    ).toEqual([]);
  });

  it("deselects a material when the active one is clicked again", () => {
    const selected = { ...EMPTY_PRODUCT_FILTERS, materials: toggleValue([], "acrylic" as const) };
    expect(selected.materials).toEqual(["acrylic"]);
    const cleared = { ...selected, materials: toggleValue(selected.materials, "acrylic") };
    expect(cleared.materials).toEqual([]);
    expect(hasActiveFilters(cleared)).toBe(false);
  });
});

describe("facetCounts", () => {
  it("counts each material against the other active filters", () => {
    const counts = facetCounts(ITEMS, { ...EMPTY_PRODUCT_FILTERS, finishes: ["high-gloss"] });
    expect(counts.material).toEqual({
      acrylic: 1,
      "uv-range": 0,
      melamine: 1,
      "acrylic-super-matt": 0,
    });
  });

  it("counts each finish and colour option as if it were the only one in its group", () => {
    const counts = facetCounts(ITEMS, { materials: ["acrylic"], finishes: ["matte"], colors: [] });
    expect(counts.finish).toEqual({ matte: 1, satin: 0, "high-gloss": 1, woodgrain: 0 });
    expect(counts.color).toEqual({ black: 1, white: 0, "dark-brown": 0, charcoal: 0, tan: 0 });
  });
});

describe("catalog URL", () => {
  it("parses the documented query string", () => {
    expect(
      parseCatalogSearch({ material: "uv-range", finish: "matte,high-gloss", color: "white" }),
    ).toEqual({
      materials: ["uv-range"],
      finishes: ["matte", "high-gloss"],
      colors: ["white"],
    });
  });

  it("ignores unknown, duplicate and malformed values", () => {
    expect(
      parseCatalogSearch({ material: "wood", finish: "matte,shiny,matte", color: 42 }),
    ).toEqual({
      materials: [],
      finishes: ["matte"],
      colors: [],
    });
    expect(parseCatalogSearch({}).finishes).toEqual([]);
    expect(parseCatalogSearch({ finish: ["satin", "matte"] }).finishes).toEqual(["matte", "satin"]);
  });

  it("serialises in a stable order and drops empty groups", () => {
    expect(
      toCatalogSearch({ materials: [], finishes: ["woodgrain", "matte"], colors: [] }),
    ).toEqual({
      material: undefined,
      finish: "matte,woodgrain",
      color: undefined,
    });
  });

  it("round-trips filters through the URL", () => {
    const filters = {
      materials: ["acrylic", "melamine"],
      finishes: ["matte", "woodgrain"],
      colors: ["black", "tan"],
    } as const;
    const search = toCatalogSearch({
      materials: [...filters.materials],
      finishes: [...filters.finishes],
      colors: [...filters.colors],
    });
    expect(parseCatalogSearch(search)).toEqual(filters);
  });
});

describe("category options", () => {
  it("offers only the options a category has products for", () => {
    const options = availableOptions(ITEMS.filter((item) => item.material === "melamine"));
    expect([...options.material]).toEqual(["melamine"]);
    expect([...options.finish].sort()).toEqual(["high-gloss", "woodgrain"]);
    expect(options.finish.has("satin")).toBe(false);
  });

  it("drops URL selections the category cannot match", () => {
    const options = availableOptions(ITEMS);
    expect(
      withinOptions({ materials: ["acrylic-super-matt", "acrylic"], finishes: ["satin"], colors: [] }, options),
    ).toEqual({ materials: ["acrylic"], finishes: [], colors: [] });
  });

  it("counts MDF and edge tape products only from their own category", () => {
    expect(BOARD_CATALOG.every((product) => product.categoryId === "mdf-board")).toBe(true);
    expect(EDGE_TAPE_CATALOG.every((product) => product.categoryId === "edge-tape")).toBe(true);
    const total = (counts: Record<string, number>) => Object.values(counts).reduce((a, b) => a + b, 0);
    // The two carcass tapes have no material on the product sheet, so they add to no material count.
    const withMaterial = EDGE_TAPE_CATALOG.filter((product) => product.material !== undefined);
    expect(EDGE_TAPE_CATALOG.length - withMaterial.length).toBe(2);
    expect(total(facetCounts(EDGE_TAPE_CATALOG, EMPTY_PRODUCT_FILTERS).material)).toBe(withMaterial.length);
    expect(total(facetCounts(EDGE_TAPE_CATALOG, EMPTY_PRODUCT_FILTERS).finish)).toBe(EDGE_TAPE_CATALOG.length);
  });
});

describe("catalog data", () => {
  it("gives every board structured filter fields", () => {
    expect(Object.keys(CATALOG_ATTRIBUTES).sort()).toEqual(
      BOARDS.map((board) => board.slug).sort(),
    );
    expect(BOARD_CATALOG).toHaveLength(BOARDS.length);
    for (const product of [...BOARD_CATALOG, ...EDGE_TAPE_CATALOG]) {
      expect(product.textureCount).toBeGreaterThanOrEqual(1);
      expect(product.finish).toMatch(/^(matte|satin|high-gloss|woodgrain)$/);
    }
  });

  it("shows the supplied Figma copy on the first 21 MDF board cards, in grid order", () => {
    const opening = (product: (typeof BOARD_CATALOG)[number]) => product.description.split(" ")[0];
    expect(BOARD_CATALOG.slice(0, 21).map(opening)).toEqual([
      ...[
        "Premium",
        "High-durability",
        "Acrylic-based",
        "Ultra-compact",
        "Anodized",
        "Acrylic-based",
      ],
      ...[
        "Premium",
        "High-durability",
        "Acrylic-based",
        "Ultra-compact",
        "Anodized",
        "Acrylic-based",
      ],
      ...[
        "Premium",
        "High-durability",
        "Acrylic-based",
        "Ultra-compact",
        "Anodized",
        "Acrylic-based",
      ],
      ...["Ultra-compact", "Anodized", "Melamine-based"],
    ]);
    expect(BOARD_CATALOG[2]?.description).toBe(
      "Acrylic-based surface offering an ultra-matte, velvety touch with thermal healing properties.",
    );
    // The card copy stays catalog-only; detail pages and the kitchen configurator keep theirs.
    expect(BOARDS[0]?.desc).not.toBe(BOARD_CATALOG[0]?.description);
  });

  it("shows the supplied solid swatches instead of photos on three cards", () => {
    const card = (slug: string) => BOARD_CATALOG.find((product) => product.slug === slug)!;
    expect(
      [card("alabaster-gloss"), card("warm-white-gloss"), card("raven-black-matt")].map(
        ({ image, swatch, swatchBorder }) => ({ image, swatch, swatchBorder }),
      ),
    ).toEqual([
      { image: undefined, swatch: "#F8F8F8", swatchBorder: undefined },
      { image: undefined, swatch: "#FFFFFF", swatchBorder: "0.1px solid #000" },
      { image: undefined, swatch: "#2B2A28", swatchBorder: undefined },
    ]);
  });

  it("gives edge tapes the attributes of their matching board", () => {
    for (const tape of EDGE_TAPE_CATALOG.filter((product) => product.hasDetailPage)) {
      const board = BOARD_CATALOG.find((item) => item.name === tape.name)!;
      expect([tape.material, tape.finish, tape.colors]).toEqual([
        board.material,
        board.finish,
        board.colors,
      ]);
    }
  });

  it("flags exactly the boards whose card description is shared with another board", () => {
    const uses = new Map<string, number>();
    for (const product of BOARD_CATALOG)
      uses.set(product.description, (uses.get(product.description) ?? 0) + 1);
    for (const product of BOARD_CATALOG) {
      expect({ slug: product.slug, flagged: product.needsUniqueCopy }).toEqual({
        slug: product.slug,
        flagged: uses.get(product.description)! > 1,
      });
    }
    const flagged = (slug: string) =>
      BOARD_CATALOG.find((product) => product.slug === slug)?.needsUniqueCopy;
    expect([flagged("alabaster-gloss"), flagged("shiny-white-gloss")]).toEqual([true, true]);
  });
});

describe("edge tape satin finish", () => {
  const names = (filters: Partial<typeof EMPTY_PRODUCT_FILTERS>) =>
    filterProducts(EDGE_TAPE_CATALOG, { ...EMPTY_PRODUCT_FILTERS, ...filters }).map((p) => p.name);

  it("stores one normalized finish and matches any casing or spacing", () => {
    expect(["Satin", "SATIN", " satin ", "satin"].map(normalizeFinish)).toEqual(["satin", "satin", "satin", "satin"]);
    expect(["High Gloss", " HIGH_GLOSS ", "high-gloss"].map(normalizeFinish)).toEqual(["high-gloss", "high-gloss", "high-gloss"]);
    expect(normalizeFinish("lacquer")).toBeUndefined();
    expect(parseCatalogSearch({ finish: " SATIN ,bogus" }).finishes).toEqual(["satin"]);
  });

  it("adds the sheet's White Satin and White Gloss tapes without inventing a code, image or material", () => {
    const tape = (name: string) => EDGE_TAPE_CATALOG.find((product) => product.name === name)!;
    expect([tape("White Satin"), tape("White Gloss")].map(({ categoryId, finish, size, colors, code, image, material }) =>
      ({ categoryId, finish, size, colors, code, image, material }))).toEqual([
      { categoryId: "edge-tape", finish: "satin", size: "1x21 MM", colors: ["white"], code: undefined, image: undefined, material: undefined },
      { categoryId: "edge-tape", finish: "high-gloss", size: "1x22 MM", colors: ["white"], code: undefined, image: undefined, material: undefined },
    ]);
  });

  it("filters Edge Tape by Satin, High Gloss and both (OR within Finish)", () => {
    expect(names({ finishes: ["satin"] })).toEqual(["White Satin"]);
    expect(names({ finishes: ["high-gloss"] })).toContain("White Gloss");
    expect(names({ finishes: ["high-gloss"] })).not.toContain("White Satin");
    expect(names({ finishes: ["satin", "high-gloss"] })).toEqual(expect.arrayContaining(["White Satin", "White Gloss"]));
    expect(facetCounts(EDGE_TAPE_CATALOG, EMPTY_PRODUCT_FILTERS).finish.satin).toBe(1);
  });

  it("returns nothing for Satin with an unmatched Material or Color, and disables Satin there", () => {
    expect(names({ finishes: ["satin"], materials: ["acrylic"] })).toEqual([]);
    expect(names({ finishes: ["satin"], colors: ["black"] })).toEqual([]);
    expect(facetCounts(EDGE_TAPE_CATALOG, { ...EMPTY_PRODUCT_FILTERS, colors: ["black"] }).finish.satin).toBe(0);
  });

  it("keeps Satin on Edge Tape only, so MDF Boards drop a carried-over selection", () => {
    expect(availableOptions(EDGE_TAPE_CATALOG).finish.has("satin")).toBe(true);
    expect(availableOptions(BOARD_CATALOG).finish.has("satin")).toBe(false);
    expect(withinOptions(parseCatalogSearch({ finish: "satin" }), availableOptions(BOARD_CATALOG)).finishes).toEqual([]);
  });
});
