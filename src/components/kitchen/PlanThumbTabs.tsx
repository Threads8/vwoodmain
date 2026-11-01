import { useRef, type KeyboardEvent } from "react";
import { layoutLabel, type CabinetStyle, type Layout } from "@/config/kitchenOptions";
import { getPlanImage } from "@/config/planImages";
import type { CatalogItem } from "@/config/products";
import { PlanLayer } from "./PlanPreview";

export const planTabId = (panelId: string, layout: Layout) => `${panelId}-tab-${layout}`;

export function PlanThumbTabs({
  layouts,
  active,
  style,
  finish,
  panelId,
  onSelect,
}: {
  layouts: Layout[];
  active: Layout | null;
  style: CabinetStyle | null;
  finish: CatalogItem | null;
  panelId: string;
  onSelect: (layout: Layout) => void;
}) {
  const tabs = useRef(new Map<Layout, HTMLButtonElement>());

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const last = layouts.length - 1;
    const target = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowDown: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const layout = layouts[target];
    if (!layout) return;
    onSelect(layout);
    tabs.current.get(layout)?.focus();
  };

  return (
    <div role="tablist" aria-label="Selected kitchen layouts" className="kc-plan-tabs">
      {layouts.map((layout, index) => (
        <button
          key={layout}
          ref={(element) => {
            if (element) tabs.current.set(layout, element);
            else tabs.current.delete(layout);
          }}
          id={planTabId(panelId, layout)}
          type="button"
          role="tab"
          aria-selected={layout === active}
          aria-controls={panelId}
          tabIndex={layout === active ? 0 : -1}
          onClick={() => onSelect(layout)}
          onKeyDown={(event) => onKeyDown(event, index)}
          className="kc-plan-tab"
        >
          <PlanLayer
            src={getPlanImage(layout, style)}
            alt=""
            finish={finish}
            className="kc-plan-thumb"
          />
          <span>{layoutLabel(layout)}</span>
        </button>
      ))}
    </div>
  );
}
