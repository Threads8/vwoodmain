import { useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { StepNumber } from "@/config/kitchenSteps";
import {
  COLOURS,
  EMPTY_FILTERS,
  filterCatalog,
  uniqueValues,
  type CatalogFilters,
  type CatalogItem,
} from "@/config/products";
import { FilterBar } from "./FilterBar";
import { KitchenStep } from "./KitchenStep";
import { ProductCard, ProductMedia } from "./ProductCard";
import { StepNav } from "./StepNav";

export function ProductStep<T extends CatalogItem>({
  step,
  title,
  subtitle,
  noun,
  items,
  selected,
  onToggle,
  isMatch,
}: {
  step: StepNumber;
  title: string;
  subtitle: string;
  /** Singular, for "1 board selected". */
  noun: string;
  items: T[];
  selected: string[];
  onToggle: (id: string) => void;
  isMatch?: (item: T) => boolean;
}) {
  const [filters, setFilters] = useState<CatalogFilters>(EMPTY_FILTERS);
  const [details, setDetails] = useState<T | null>(null);
  const detailsOpener = useRef<HTMLElement | null>(null);
  const materials = useMemo(() => uniqueValues(items.map((item) => item.material)), [items]);
  const finishes = useMemo(() => uniqueValues(items.map((item) => item.finish)), [items]);
  const visible = useMemo(() => filterCatalog(items, filters), [items, filters]);

  return (
    <KitchenStep step={step} title={title} subtitle={subtitle} preview="side">
      <FilterBar
        filters={filters}
        onChange={setFilters}
        materials={materials}
        finishes={finishes}
        searchLabel={`Search ${noun}s by name or code`}
      />
      <p role="status" className="kc-count">
        {selected.length} {noun}
        {selected.length === 1 ? "" : "s"} selected
      </p>
      {visible.length === 0 ? (
        <div className="kc-empty">
          <p>No products match your filters</p>
          <button
            type="button"
            onClick={() => setFilters(EMPTY_FILTERS)}
            className="kc-button kc-button--secondary"
          >
            Clear
          </button>
        </div>
      ) : (
        <div className="kc-products">
          {visible.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              selected={selected.includes(item.id)}
              matchesBoards={isMatch?.(item) ?? false}
              onToggle={() => onToggle(item.id)}
              onDetails={() => {
                detailsOpener.current = document.activeElement as HTMLElement | null;
                setDetails(item);
              }}
            />
          ))}
        </div>
      )}
      <StepNav step={step} canContinue={selected.length > 0} hint={`Select at least one ${noun}`} />
      <Dialog open={details !== null} onOpenChange={(open) => !open && setDetails(null)}>
        <DialogContent
          data-lenis-prevent
          className="kc-dialog"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            detailsOpener.current?.focus();
          }}
        >
          {details && (
            <>
              <span className="kc-dialog-media">
                <ProductMedia item={details} alt={`${details.name} sample`} />
              </span>
              <div>
                <DialogTitle className="text-h3">{details.name}</DialogTitle>
                <DialogDescription className="kc-dialog-desc">
                  {details.description}
                </DialogDescription>
                <dl className="kc-dialog-specs">
                  <div>
                    <dt>Code</dt>
                    <dd>{details.code}</dd>
                  </div>
                  <div>
                    <dt>Material</dt>
                    <dd>{details.material}</dd>
                  </div>
                  <div>
                    <dt>Finish</dt>
                    <dd>{details.finish}</dd>
                  </div>
                  <div>
                    <dt>Colour</dt>
                    <dd>{COLOURS.find((colour) => colour.id === details.colour)?.label}</dd>
                  </div>
                </dl>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </KitchenStep>
  );
}
