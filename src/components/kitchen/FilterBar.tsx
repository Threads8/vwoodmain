import { Search } from "lucide-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { COLOURS, EMPTY_FILTERS, type CatalogFilters } from "@/config/products";

const SEARCH_DEBOUNCE_MS = 250;

export function FilterBar({
  filters,
  onChange,
  materials,
  finishes,
  searchLabel,
}: {
  filters: CatalogFilters;
  onChange: Dispatch<SetStateAction<CatalogFilters>>;
  materials: string[];
  finishes: string[];
  searchLabel: string;
}) {
  const [text, setText] = useState(filters.search);

  useEffect(() => {
    setText(filters.search);
  }, [filters.search]);

  useEffect(() => {
    if (text === filters.search) return;
    const timer = setTimeout(
      () => onChange((current) => ({ ...current, search: text })),
      SEARCH_DEBOUNCE_MS,
    );
    return () => clearTimeout(timer);
  }, [filters.search, onChange, text]);

  return (
    <div className="kc-filters">
      <label className="kc-filter">
        <span className="kc-filter-label">Material</span>
        <select
          value={filters.material}
          onChange={(event) =>
            onChange((current) => ({ ...current, material: event.target.value }))
          }
          className="kc-select"
        >
          <option value="">All materials</option>
          {materials.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
      </label>
      <label className="kc-filter">
        <span className="kc-filter-label">Finish</span>
        <select
          value={filters.finish}
          onChange={(event) => onChange((current) => ({ ...current, finish: event.target.value }))}
          className="kc-select"
        >
          <option value="">All finishes</option>
          {finishes.map((finish) => (
            <option key={finish} value={finish}>
              {finish}
            </option>
          ))}
        </select>
      </label>
      <div role="group" aria-labelledby="kc-colour-label" className="kc-filter">
        <span id="kc-colour-label" className="kc-filter-label">
          Colour Palette
        </span>
        <div className="kc-swatches">
          {COLOURS.map((colour) => (
            <button
              key={colour.id}
              type="button"
              aria-label={colour.label}
              aria-pressed={filters.colour === colour.id}
              onClick={() =>
                onChange((current) => ({
                  ...current,
                  colour: current.colour === colour.id ? "" : colour.id,
                }))
              }
              className="kc-swatch"
              style={{ background: colour.hex }}
            />
          ))}
        </div>
      </div>
      <label className="kc-filter kc-filter--search">
        <span className="kc-filter-label">Search</span>
        <span className="kc-search">
          <input
            type="search"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={searchLabel}
            className="kc-search-input"
          />
          <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
        </span>
      </label>
      <button
        type="button"
        onClick={() => {
          setText("");
          onChange(EMPTY_FILTERS);
        }}
        className="kc-clear"
      >
        Clear All Filters
      </button>
    </div>
  );
}
