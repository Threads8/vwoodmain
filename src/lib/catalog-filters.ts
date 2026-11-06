import {
  COLOR_OPTIONS,
  FINISH_OPTIONS,
  MATERIAL_OPTIONS,
  type ColorKey,
  type FinishKey,
  type MaterialKey,
} from "@/config/catalogFilters";

export type Filterable = { material: MaterialKey; finish: FinishKey; colors: readonly ColorKey[] };

export type ProductFilters = {
  material: MaterialKey | null;
  finishes: FinishKey[];
  colors: ColorKey[];
};

export const EMPTY_PRODUCT_FILTERS: ProductFilters = { material: null, finishes: [], colors: [] };

/** OR within Finish and within Color, AND across Material, Finish and Color. */
export function filterProducts<T extends Filterable>(
  products: readonly T[],
  filters: ProductFilters,
): T[] {
  return products.filter(
    (product) =>
      (!filters.material || product.material === filters.material) &&
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
      MATERIAL_OPTIONS.map(({ key }) => [key, count({ material: key })]),
    ) as FacetCounts["material"],
    finish: Object.fromEntries(
      FINISH_OPTIONS.map(({ key }) => [key, count({ finishes: [key] })]),
    ) as FacetCounts["finish"],
    color: Object.fromEntries(
      COLOR_OPTIONS.map(({ key }) => [key, count({ colors: [key] })]),
    ) as FacetCounts["color"],
  };
}

export const hasActiveFilters = (filters: ProductFilters) =>
  filters.material !== null || filters.finishes.length > 0 || filters.colors.length > 0;

export const toggleMaterial = (filters: ProductFilters, key: MaterialKey): ProductFilters => ({
  ...filters,
  material: filters.material === key ? null : key,
});

export const toggleValue = <K extends string>(values: readonly K[], key: K): K[] =>
  values.includes(key) ? values.filter((value) => value !== key) : [...values, key];

// URL query string: ?material=uv-range&finish=matte,high-gloss&color=white

export type CatalogSearch = {
  material?: MaterialKey | undefined;
  finish?: string | undefined;
  color?: string | undefined;
};

function parseList<K extends string>(value: unknown, options: readonly { key: K }[]): K[] {
  const raw = Array.isArray(value) ? value.join(",") : typeof value === "string" ? value : "";
  const requested = new Set(raw.split(",").map((item) => item.trim()));
  // Keep config order so equivalent URLs produce the same state.
  return options.map(({ key }) => key).filter((key) => requested.has(key));
}

export function parseCatalogSearch(search: Record<string, unknown>): ProductFilters {
  const material = MATERIAL_OPTIONS.find(({ key }) => key === search["material"])?.key ?? null;
  return {
    material,
    finishes: parseList(search["finish"], FINISH_OPTIONS),
    colors: parseList(search["color"], COLOR_OPTIONS),
  };
}

export function toCatalogSearch(filters: ProductFilters): CatalogSearch {
  const sorted = <K extends string>(values: K[], options: readonly { key: K }[]) =>
    options.map(({ key }) => key).filter((key) => values.includes(key));
  return {
    material: filters.material ?? undefined,
    finish: filters.finishes.length
      ? sorted(filters.finishes, FINISH_OPTIONS).join(",")
      : undefined,
    color: filters.colors.length ? sorted(filters.colors, COLOR_OPTIONS).join(",") : undefined,
  };
}
