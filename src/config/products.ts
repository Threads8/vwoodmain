import { PRODUCT_IMAGES } from "@/lib/product-images";
import { BOARDS } from "@/lib/site-data";

export type Colour = "black" | "white" | "brown" | "grey" | "oak";

export const COLOURS: { id: Colour; label: string; hex: string }[] = [
  { id: "black", label: "Black", hex: "#1A1A1A" },
  { id: "white", label: "White", hex: "#F4F4F2" },
  { id: "brown", label: "Brown", hex: "#6B4226" },
  { id: "grey", label: "Grey", hex: "#51443C" },
  { id: "oak", label: "Oak", hex: "#8B5E3C" },
];

export type ImageCrop = { width: number; height: number; x: number; y: number };

export type CatalogItem = {
  id: string;
  name: string;
  code: string;
  material: string;
  finish: string;
  colour: Colour;
  /** Absent for the few catalog items that only have a colour swatch. */
  image?: string;
  crop?: ImageCrop;
  swatch: string;
  description: string;
};

// The catalog has no material or colour fields, so both are assigned here. Material is a
// placeholder rule until the real values are supplied; correct it in this one function.
export function materialFor(name: string, finish: string): string {
  if (/iron ore|anthracite/i.test(name)) return "UV Range";
  if (finish === "High Gloss") return "Acrylic";
  if (finish === "Matte") return "Acrylic Super Matt";
  return "Melamine";
}

const COLOUR_BY_NAME: Record<string, Colour> = {
  "Raven Black Matt": "black",
  "Musket Brown": "black",
  "Classic Walnut": "brown",
  "Rural Oak": "brown",
  "Maple Shadow": "brown",
  "Diamond Grey Gloss": "grey",
  "Grey Wood Natural": "grey",
  "Moss Grey Wood": "grey",
  "Sand Dune": "grey",
  "Olive Super Matt": "grey",
  Anthracite: "grey",
  "Ultra High Gloss Iron Ore": "grey",
  "Maple Wood Natural": "oak",
  "Natural Brown": "oak",
  "Oak Wood Natural": "oak",
  "Southern Oakwood": "oak",
  "Washed Maple Wood Natural": "oak",
  "Washed Oakwood": "oak",
  "Golden Oak": "oak",
  "Prime Oak": "oak",
  "Aged Ash": "oak",
};

export const colourFor = (name: string): Colour => COLOUR_BY_NAME[name] ?? "white";

export const PRODUCTS: CatalogItem[] = BOARDS.map((board) => {
  const image = PRODUCT_IMAGES[board.slug];
  return {
    id: board.slug,
    name: board.name,
    code: board.code,
    material: materialFor(board.name, board.finish),
    finish: board.finish,
    colour: colourFor(board.name),
    ...(image ? { image } : {}),
    swatch: board.swatch,
    description: board.desc,
  };
});

export type CatalogFilters = {
  material: string;
  finish: string;
  colour: Colour | "";
  search: string;
};

export const EMPTY_FILTERS: CatalogFilters = { material: "", finish: "", colour: "", search: "" };

export function filterCatalog<T extends CatalogItem>(items: T[], filters: CatalogFilters): T[] {
  const query = filters.search.trim().toLowerCase();
  return items.filter(
    (item) =>
      (!filters.material || item.material === filters.material) &&
      (!filters.finish || item.finish === filters.finish) &&
      (!filters.colour || item.colour === filters.colour) &&
      (!query ||
        item.name.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query)),
  );
}

export const uniqueValues = (values: string[]) => [...new Set(values)];
