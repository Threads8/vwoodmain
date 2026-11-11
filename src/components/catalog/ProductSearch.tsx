import { useId } from "react";
import { Search, X } from "lucide-react";

type ProductSearchProps = {
  value: string;
  onChange: (value: string) => void;
  /** Category name for the placeholder, e.g. "MDF Boards". */
  label: string;
};

/** Search box for a category page: filters the visible products by name or code as you type. */
export function ProductSearch({ value, onChange, label }: ProductSearchProps) {
  const id = useId();
  return (
    <form role="search" className="catalog-search" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor={id} className="sr-only">
        Search {label} by name or code
      </label>
      <Search aria-hidden="true" className="catalog-search__icon" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && value) {
            event.preventDefault();
            onChange("");
          }
        }}
        placeholder="Search by name or code"
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
        className="catalog-search__input"
      />
      {value && (
        <button
          type="button"
          className="catalog-search__clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <X aria-hidden="true" />
        </button>
      )}
    </form>
  );
}
