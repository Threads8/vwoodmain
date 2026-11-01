import { existsSync } from "node:fs";
import { join } from "node:path";
import { beforeEach, describe, expect, it } from "vitest";
import { CABINET_STYLES, LAYOUTS } from "@/config/kitchenOptions";
import { findIncompleteStep } from "@/config/kitchenSteps";
import { getPlanImage, isDefaultPlan, PLAN_DEFAULTS, PLAN_IMAGE_FILES } from "@/config/planImages";
import { EMPTY_FILTERS, filterCatalog, PRODUCTS } from "@/config/products";
import { sortTapesByBoards, TAPES } from "@/config/tapes";
import { buildSelectionMessage, isValidMobile, quoteSchema } from "@/lib/kitchen-quote";
import { useKitchenStore } from "@/stores/kitchenStore";

const publicFile = (path: string) => join(process.cwd(), "public", path);

describe("kitchen store", () => {
  beforeEach(() => useKitchenStore.getState().reset());

  it("makes the most recently clicked layout active", () => {
    const store = useKitchenStore.getState();
    store.toggleLayout("l-shaped");
    store.toggleLayout("island");
    expect(useKitchenStore.getState().activeLayout).toBe("island");
  });

  it("falls back to the last remaining item when the active one is deselected", () => {
    const store = useKitchenStore.getState();
    store.toggleLayout("l-shaped");
    store.toggleLayout("u-shaped");
    store.toggleLayout("island");
    store.toggleLayout("island");
    expect(useKitchenStore.getState().activeLayout).toBe("u-shaped");
    store.toggleLayout("l-shaped");
    expect(useKitchenStore.getState().activeLayout).toBe("u-shaped");
    store.toggleLayout("u-shaped");
    expect(useKitchenStore.getState().activeLayout).toBeNull();
  });

  it("applies the same rule to cabinet styles", () => {
    const store = useKitchenStore.getState();
    store.toggleCabinetStyle("shaker");
    store.toggleCabinetStyle("glass-front");
    store.toggleCabinetStyle("glass-front");
    expect(useKitchenStore.getState().activeCabinetStyle).toBe("shaker");
  });
});

describe("route guard order", () => {
  const empty = { layouts: [], cabinetStyles: [], boards: [], tapes: [] };

  it("sends an empty deep link to the summary back to step 1", () => {
    expect(findIncompleteStep(5, empty)?.step).toBe(1);
  });

  it("finds the earliest incomplete step", () => {
    expect(
      findIncompleteStep(6, { ...empty, layouts: ["island"], cabinetStyles: ["shaker"] })?.step,
    ).toBe(3);
  });

  it("allows a step when everything before it is complete", () => {
    expect(findIncompleteStep(1, empty)).toBeNull();
    expect(findIncompleteStep(2, { ...empty, layouts: ["island"] })).toBeNull();
  });
});

describe("plan images", () => {
  it("has an existing file for every plan image", () => {
    for (const file of PLAN_IMAGE_FILES) expect(existsSync(publicFile(file)), file).toBe(true);
  });

  it("resolves every layout and style combination to an existing file", () => {
    for (const layout of LAYOUTS) {
      for (const style of [null, ...CABINET_STYLES.map((option) => option.id)]) {
        const image = getPlanImage(layout.id, style);
        expect(image).not.toBe("");
        expect(existsSync(publicFile(image)), image).toBe(true);
      }
    }
  });

  it("uses the layout default when a combination has no image", () => {
    expect(getPlanImage("island", "shaker")).toBe(PLAN_DEFAULTS.island);
    expect(isDefaultPlan("island", "shaker")).toBe(true);
    expect(isDefaultPlan("u-shaped", "flat-panel")).toBe(false);
  });
});

describe("option card images", () => {
  it("point at existing files", () => {
    for (const option of [...LAYOUTS, ...CABINET_STYLES]) {
      expect(existsSync(publicFile(option.image)), option.image).toBe(true);
    }
  });
});

describe("catalog", () => {
  it("combines filters with AND", () => {
    const results = filterCatalog(PRODUCTS, {
      ...EMPTY_FILTERS,
      finish: "Woodgrain",
      colour: "oak",
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((item) => item.finish === "Woodgrain" && item.colour === "oak")).toBe(
      true,
    );
  });

  it("searches both name and code", () => {
    const [first] = PRODUCTS;
    expect(
      filterCatalog(PRODUCTS, { ...EMPTY_FILTERS, search: first!.name.toUpperCase() }),
    ).toContain(first);
    expect(
      filterCatalog(PRODUCTS, { ...EMPTY_FILTERS, search: first!.code.toLowerCase() }),
    ).toContain(first);
  });

  it("has unique ids", () => {
    expect(new Set(PRODUCTS.map((item) => item.id)).size).toBe(PRODUCTS.length);
    expect(new Set(TAPES.map((item) => item.id)).size).toBe(TAPES.length);
  });

  it("sorts tapes matching the selected boards first", () => {
    const target = TAPES.at(-1)!;
    expect(sortTapesByBoards(TAPES, [target.boardId])[0]).toBe(target);
  });
});

describe("quote form", () => {
  it.each(["9876543210", "+919876543210", "+91 98765 43210", "98765-43210"])(
    "accepts %s",
    (phone) => {
      expect(isValidMobile(phone)).toBe(true);
    },
  );

  it.each(["", "12345", "1234567890", "+64211918843", "98765432101"])("rejects %s", (phone) => {
    expect(isValidMobile(phone)).toBe(false);
  });

  it("requires every field except the message", () => {
    const result = quoteSchema.safeParse({
      fullName: "",
      email: "x",
      phone: "",
      category: "",
      message: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(result.error.flatten().fieldErrors).sort()).toEqual([
        "category",
        "email",
        "fullName",
        "phone",
      ]);
    }
  });

  it("builds the message from the selections", () => {
    const board = PRODUCTS[0]!;
    const message = buildSelectionMessage({
      layouts: ["u-shaped", "island"],
      cabinetStyles: ["shaker"],
      boards: [board.id],
      tapes: [],
      activeLayout: "island",
      activeCabinetStyle: "shaker",
    });
    expect(message).toContain("U-Shaped, Island");
    expect(message).toContain("Shaker");
    expect(message).toContain(board.code);
    expect(message).toContain(board.material);
  });
});
