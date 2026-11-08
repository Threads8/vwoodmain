import {
  COLOR_OPTIONS,
  FINISH_OPTIONS,
  MATERIAL_OPTIONS,
  normalizeFilterValue,
  type ColorKey,
  type FinishKey,
  type MaterialKey,
} from "@/config/catalogFilters";

/** Material is optional: a product whose sheet gives none is hidden by any Material filter. */
export type Filterable = { material?: MaterialKey | undefined; finish: FinishKey; colors: readonly ColorKey[] };

export type ProductFilters = {
  materials: MaterialKey[];
  finishes: FinishKey[];
  colors: ColorKey[];
};

export const EMPTY_PRODUCT_FILTERS: ProductFilters = { materials: [], finishes: [], colors: [] };

/** OR within each group (Material, Finish, Color), AND across the groups. */
export function filterProducts<T extends Filterable>(
  products: readonly T[],
  filters: ProductFilters,
): T[] {
  return products.filter(
    (product) =>
      (filters.materials.length === 0 ||
        (product.material !== undefined && filters.materials.includes(product.material))) &&
      (filters.finishes.length === 0 || filters.finishes.includes(product.finish)) &&
      (filters.colors.length === 0 ||
        product.colors.some((color) => filters.colors.includes(color))),
  );
}

export type FacetCounts = {
  material: Record<MaterialKey, number>;
  finish: Record<FinishKey, number>;
  color: Record<ColorKey, number>;
};

/** How many products each option would show, given every other active filter. */
export function facetCounts(products: readonly Filterable[], filters: ProductFilters): FacetCounts {
  const count = (override: Partial<ProductFilters>) =>
    filterProducts(products, { ...filters, ...override }).length;
  return {
    material: Object.fromEntries(
      MATERIAL_OPTIONS.map(({ key }) => [key, count({ materials: [key] })]),
    ) as FacetCounts["material"],
    finish: Object.fromEntries(
      FINISH_OPTIONS.map(({ key }) => [key, count({ finishes: [key] })]),
    ) as FacetCounts["finish"],
    color: Object.fromEntries(
      COLOR_OPTIONS.map(({ key }) => [key, count({ colors: [key] })]),
    ) as FacetCounts["color"],
  };
}

export type AvailableOptions = {
  material: Set<MaterialKey>;
  finish: Set<FinishKey>;
  color: Set<ColorKey>;
};

/** The options that at least one product in this category has; the others are not shown. */
export function availableOptions(products: readonly Filterable[]): AvailableOptions {
  return {
    material: new Set(products.flatMap((product) => (product.material ? [product.material] : []))),
    finish: new Set(products.map((product) => product.finish)),
    color: new Set(products.flatMap((product) => product.colors)),
  };
}

/** Drops selections the category has no products for, e.g. from an old or hand-edited link. */
export function withinOptions(filters: ProductFilters, options: AvailableOptions): ProductFilters {
  return {
    materials: filters.materials.filter((key) => options.material.has(key)),
    finishes: filters.finishes.filter((key) => options.finish.has(key)),
    colors: filters.colors.filter((key) => options.color.has(key)),
  };
}

export const hasActiveFilters = (filters: ProductFilters) =>
  filters.materials.length > 0 || filters.finishes.length > 0 || filters.colors.length > 0;

export const toggleValue = <K extends string>(values: readonly K[], key: K): K[] =>
  values.includes(key) ? values.filter((value) => value !== key) : [...values, key];

// URL query string: ?material=acrylic,melamine&finish=matte,high-gloss&color=white

export type CatalogSearch = {
  material?: string | undefined;
  finish?: string | undefined;
  color?: string | undefined;
};

function parseList<K extends string>(value: unknown, options: readonly { key: K }[]): K[] {
  const raw = Array.isArray(value) ? value.join(",") : typeof value === "string" ? value : "";
  // Unknown values are ignored; "SATIN" and " satin " match the "satin" key.
  const requested = new Set(raw.split(",").map(normalizeFilterValue));
  // Keep config order so equivalent URLs produce the same state.
  return options.map(({ key }) => key).filter((key) => requested.has(key));
}

export function parseCatalogSearch(search: Record<string, unknown>): ProductFilters {
  return {
    materials: parseList(search["material"], MATERIAL_OPTIONS),
    finishes: parseList(search["finish"], FINISH_OPTIONS),
    colors: parseList(search["color"], COLOR_OPTIONS),
  };
}

export function toCatalogSearch(filters: ProductFilters): CatalogSearch {
  const sorted = <K extends string>(values: K[], options: readonly { key: K }[]) =>
    options.map(({ key }) => key).filter((key) => values.includes(key));
  return {
    material: filters.materials.length
      ? sorted(filters.materials, MATERIAL_OPTIONS).join(",")
      : undefined,
    finish: filters.finishes.length
      ? sorted(filters.finishes, FINISH_OPTIONS).join(",")
      : undefined,
    color: filters.colors.length ? sorted(filters.colors, COLOR_OPTIONS).join(",") : undefined,
  };
}
