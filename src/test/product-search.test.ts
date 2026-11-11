import { describe, expect, it } from "vitest";
import { matchesProductSearch } from "@/lib/product-search";
import { getCatalogProducts } from "@/lib/catalog-products";
import { SINK_PRODUCTS } from "@/lib/sink-products";

const walnut = { name: "Classic Walnut", code: "VW9E1128-3" };
const bin = { name: "Rubbish Bin", code: "WB.0240.C" };

describe("Product search", () => {
  it("matches everything for an empty or blank query", () => {
    expect(["", "   "].map((q) => matchesProductSearch(q, walnut))).toEqual([true, true]);
  });

  it("matches names regardless of case, order and partial words", () => {
    expect(
      ["walnut", "CLASSIC", "wal cla", "classic walnut"].map((q) =>
        matchesProductSearch(q, walnut),
      ),
    ).toEqual([true, true, true, true]);
    expect(matchesProductSearch("oak", walnut)).toBe(false);
  });

  it("matches codes ignoring dots, dashes and spaces", () => {
    expect(
      ["wb.0240.c", "wb0240c", "WB 0240 C", "0240"].map((q) => matchesProductSearch(q, bin)),
    ).toEqual([true, true, true, true]);
    expect(
      ["vw9e1128-3", "VW 9E1128 3", "9e1128"].map((q) => matchesProductSearch(q, walnut)),
    ).toEqual([true, true, true]);
    expect(matchesProductSearch("wb.0240.e", bin)).toBe(false);
  });

  it("finds catalog products by code", () => {
    const hits = getCatalogProducts("mdf-board").filter((p) => matchesProductSearch("VW006SM", p));
    expect(hits.map((p) => p.name)).toEqual(["Raven Black Matt"]);
    const tapes = getCatalogProducts("edge-tape").filter((p) =>
      matchesProductSearch("vw9e1128-3", p),
    );
    expect(tapes.map((p) => p.name)).toEqual(["Classic Walnut"]);
    expect(
      SINK_PRODUCTS.filter((s) => matchesProductSearch("LS-4444", s)).map((s) => s.slug),
    ).toEqual(["single-bowl-sink-square"]);
  });
});
