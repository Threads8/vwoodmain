import type { CSSProperties } from "react";
import type { CatalogItem } from "@/config/products";
import { SelectableCard } from "./SelectableCard";

export function ProductMedia({ item, alt }: { item: CatalogItem; alt: string }) {
  if (!item.image) {
    return (
      <span
        role="img"
        aria-label={alt}
        className="kc-product-swatch"
        style={{ background: item.swatch }}
      />
    );
  }
  const { crop } = item;
  return (
    <img
      src={item.image}
      alt={alt}
      loading="lazy"
      className={crop ? "edge-tape-crop" : "kc-product-image"}
      style={
        crop
          ? ({
              "--crop-width": `${(crop.width / 277) * 100}%`,
              "--crop-height": `${(crop.height / 347) * 100}%`,
              "--crop-x": `${(crop.x / 277) * 100}%`,
              "--crop-y": `${(crop.y / 347) * 100}%`,
            } as CSSProperties)
          : undefined
      }
    />
  );
}

export function ProductCard({
  item,
  selected,
  matchesBoards = false,
  onToggle,
  onDetails,
}: {
  item: CatalogItem;
  selected: boolean;
  matchesBoards?: boolean;
  onToggle: () => void;
  onDetails: () => void;
}) {
  return (
    <div className="kc-product">
      <SelectableCard selected={selected} onToggle={onToggle} className="kc-product-select">
        <span className="kc-product-media">
          <ProductMedia item={item} alt={`${item.name} sample`} />
          {matchesBoards && <span className="kc-product-badge">Matches your boards</span>}
        </span>
        <span className="kc-product-name">{item.name}</span>
        <span className="kc-product-code">{item.code}</span>
        <span className="kc-product-desc">{item.description}</span>
      </SelectableCard>
      {/* A sibling of the card button, so opening details can never toggle the selection. */}
      <button
        type="button"
        className="kc-details"
        aria-label={`Details for ${item.name}`}
        onClick={(event) => {
          event.stopPropagation();
          onDetails();
        }}
      >
        Details
      </button>
    </div>
  );
}
