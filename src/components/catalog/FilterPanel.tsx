import type { ReactNode } from "react";
import { COLOR_OPTIONS, FINISH_OPTIONS, MATERIAL_OPTIONS } from "@/config/catalogFilters";
import {
  EMPTY_PRODUCT_FILTERS,
  hasActiveFilters,
  toggleValue,
  type AvailableOptions,
  type FacetCounts,
  type ProductFilters,
} from "@/lib/catalog-filters";

type Props = {
  filters: ProductFilters;
  counts: FacetCounts;
  /** Options the current category has products for; only these are shown. */
  available: AvailableOptions;
  onChange: (filters: ProductFilters) => void;
  /** Keeps heading ids unique when the panel renders in both the sidebar and the drawer. */
  idPrefix: string;
  children?: ReactNode;
};

const headingClass = "font-sans text-[13px] font-bold uppercase tracking-[1.2px]";
const headingStyle = { color: "#1A1C1C" };

/** Swatches this light need a stronger border to stay visible on the white page. */
function isLight(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return (0.299 * r! + 0.587 * g! + 0.114 * b!) / 255 > 0.85;
}

export function FilterPanel({ filters, counts, available, onChange, idPrefix, children }: Props) {
  const active = hasActiveFilters(filters);
  const materials = MATERIAL_OPTIONS.filter((option) => available.material.has(option.key));
  const finishes = FINISH_OPTIONS.filter((option) => available.finish.has(option.key));
  const colors = COLOR_OPTIONS.filter((option) => available.color.has(option.key));
  return (
    <>
      <p id={`${idPrefix}-material`} className={headingClass} style={headingStyle}>
        Material
      </p>
      <div
        role="group"
        aria-labelledby={`${idPrefix}-material`}
        className="mt-5 flex flex-col gap-3.5"
      >
        {materials.map((m) => {
          const selected = filters.materials.includes(m.key);
          const count = counts.material[m.key];
          return (
            <button
              key={m.key}
              type="button"
              aria-pressed={selected}
              disabled={!selected && count === 0}
              aria-disabled={(!selected && count === 0) || undefined}
              aria-label={
                selected ? m.label : `${m.label}, ${count} ${count === 1 ? "product" : "products"}`
              }
              onClick={() =>
                onChange({ ...filters, materials: toggleValue(filters.materials, m.key) })
              }
              className="flex items-center justify-between text-left disabled:opacity-40"
            >
              <span
                className={`font-body text-[14px] leading-5 ${selected ? "font-semibold" : "font-normal"}`}
                style={{ color: selected ? "#1A1C1C" : "#51443C" }}
              >
                {m.label}
              </span>
              {selected ? (
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#6F4627" }} />
              ) : (
                <span className="font-body text-[12px] leading-[15px]" style={{ color: "#83746B" }}>
                  ({String(count).padStart(2, "0")})
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p id={`${idPrefix}-finish`} className={`mt-8 ${headingClass}`} style={headingStyle}>
        Finish
      </p>
      <div
        role="group"
        aria-labelledby={`${idPrefix}-finish`}
        className="mt-3 grid grid-cols-2 gap-2"
      >
        {finishes.map((f) => {
          const selected = filters.finishes.includes(f.key);
          const count = counts.finish[f.key];
          // A selected finish stays clickable so it can always be turned off.
          const unavailable = !selected && count === 0;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={selected}
              aria-disabled={unavailable || undefined}
              aria-label={`${f.label}, ${count} ${count === 1 ? "product" : "products"}`}
              onClick={() => {
                if (unavailable) return;
                onChange({ ...filters, finishes: toggleValue(filters.finishes, f.key) });
              }}
              className="catalog-finish-option"
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <p id={`${idPrefix}-color`} className={`mt-8 ${headingClass}`} style={headingStyle}>
        Color Palette
      </p>
      <div role="group" aria-labelledby={`${idPrefix}-color`} className="mt-4 flex gap-3">
        {colors.map((s) => {
          const selected = filters.colors.includes(s.key);
          return (
            <button
              key={s.key}
              type="button"
              aria-label={s.label}
              title={s.label}
              aria-pressed={selected}
              disabled={!selected && counts.color[s.key] === 0}
              aria-disabled={(!selected && counts.color[s.key] === 0) || undefined}
              onClick={() => onChange({ ...filters, colors: toggleValue(filters.colors, s.key) })}
              className="h-8 w-8 rounded-xl border transition-transform enabled:hover:scale-105 disabled:opacity-30"
              style={{
                background: s.hex,
                borderColor: isLight(s.hex) ? "rgba(131,116,107,0.55)" : "rgba(213,195,184,0.2)",
                // Same ring as a 2px outline at 2px offset, leaving outline free for focus-visible.
                boxShadow: selected ? "0 0 0 2px var(--background), 0 0 0 4px #6F4627" : undefined,
              }}
            />
          );
        })}
      </div>

      <button
        type="button"
        disabled={!active}
        onClick={() => onChange(EMPTY_PRODUCT_FILTERS)}
        className="mt-6 w-full rounded-(--radius-control) border py-3.5 font-body text-[13px] font-semibold uppercase tracking-[1.2px] disabled:opacity-40"
        style={{ borderColor: "rgba(213,195,184,0.4)", color: "#1A1C1C" }}
      >
        Clear All Filters
      </button>
      {children}
    </>
  );
}
