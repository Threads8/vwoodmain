import { useEffect, useId, useState } from "react";
import { cabinetStyleLabel, layoutLabel } from "@/config/kitchenOptions";
import { finishBackground, planMask, PREVIEW_FINISHES } from "@/config/planFinishes";
import { getPlanImage, isDefaultPlan } from "@/config/planImages";
import { PRODUCTS, type CatalogItem } from "@/config/products";
import { useKitchenStore } from "@/stores/kitchenStore";
import { PlanThumbTabs, planTabId } from "./PlanThumbTabs";

const CROSSFADE_MS = 300;

/** One plan drawing with the chosen board painted onto its cabinet fronts. */
export function PlanLayer({
  src,
  alt,
  finish,
  className = "",
}: {
  src: string;
  alt: string;
  finish: CatalogItem | null;
  className?: string;
}) {
  const mask = `url("${planMask(src)}")`;
  return (
    <div className={`kc-plan-layer ${className}`}>
      <img src={src} alt={alt} className="kc-plan-image" draggable={false} />
      {finish && (
        <span
          key={finish.id}
          aria-hidden="true"
          className="kc-plan-finish"
          style={{
            background: finishBackground(finish),
            WebkitMaskImage: mask,
            maskImage: mask,
          }}
        />
      )}
    </div>
  );
}

function PlanFrame({ src, alt, finish }: { src: string; alt: string; finish: CatalogItem | null }) {
  const [images, setImages] = useState<{ current: string; previous: string | null }>({
    current: src,
    previous: null,
  });
  if (images.current !== src) setImages({ current: src, previous: images.current });

  useEffect(() => {
    if (!images.previous) return;
    const timer = setTimeout(
      () => setImages((state) => ({ ...state, previous: null })),
      CROSSFADE_MS,
    );
    return () => clearTimeout(timer);
  }, [images.previous]);

  return (
    <div className="kc-plan-frame">
      {images.previous && (
        <PlanLayer src={images.previous} alt="" finish={finish} className="kc-plan-layer--out" />
      )}
      <PlanLayer key={src} src={src} alt={alt} finish={finish} className="kc-plan-layer--in" />
    </div>
  );
}

function EmptyPlan() {
  return (
    <div className="kc-plan-frame kc-plan-empty">
      <svg viewBox="0 0 96 64" aria-hidden="true" className="kc-plan-empty-art">
        <path d="M8 56V8h28v28h52v20Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8 20h28M8 32h28M48 36v20M64 36v20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <p>Select a layout to preview your kitchen</p>
    </div>
  );
}

function FinishPicker({
  options,
  value,
  onChange,
  chosen,
}: {
  options: CatalogItem[];
  value: string | null;
  onChange: (id: string | null) => void;
  chosen: boolean;
}) {
  return (
    <div className="kc-finish">
      <p className="kc-finish-label">
        {chosen ? "Your boards" : "Try a finish"}
        <span>{options.find((item) => item.id === value)?.name ?? "Original white"}</span>
      </p>
      <div
        role="radiogroup"
        aria-label="Cabinet finish shown on the plan"
        className="kc-finish-list"
      >
        <button
          type="button"
          role="radio"
          aria-checked={value === null}
          title="Original white"
          onClick={() => onChange(null)}
          className="kc-finish-swatch kc-finish-swatch--none"
        >
          <span className="sr-only">Original white</span>
        </button>
        {options.map((item) => (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={value === item.id}
            title={item.name}
            onClick={() => onChange(item.id)}
            className="kc-finish-swatch"
            style={{ background: finishBackground(item) }}
          >
            <span className="sr-only">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function PlanPreview({ fullWidth = false }: { fullWidth?: boolean }) {
  const layouts = useKitchenStore((state) => state.layouts);
  const activeLayout = useKitchenStore((state) => state.activeLayout);
  const activeStyle = useKitchenStore((state) => state.activeCabinetStyle);
  const boards = useKitchenStore((state) => state.boards);
  const setActiveLayout = useKitchenStore((state) => state.setActiveLayout);
  // Collapsed by default on mobile, open on tablet. It is always open from 1024px, in CSS.
  const [open, setOpen] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches,
  );
  const contentId = useId();
  const panelId = useId();

  // Chosen boards drive the preview; until there are any, a few popular finishes can be tried.
  const chosenBoards = boards.flatMap((id) => PRODUCTS.find((item) => item.id === id) ?? []);
  const options = chosenBoards.length > 0 ? chosenBoards : PREVIEW_FINISHES;
  const latestBoard = chosenBoards.at(-1)?.id ?? null;
  const [picked, setPicked] = useState<string | null | undefined>(undefined);
  // A newly selected board is shown straight away.
  const [seenBoard, setSeenBoard] = useState(latestBoard);
  if (seenBoard !== latestBoard) {
    setSeenBoard(latestBoard);
    setPicked(undefined);
  }
  const finishId =
    picked === undefined ? latestBoard : options.some((item) => item.id === picked) ? picked : null;
  const finish = options.find((item) => item.id === finishId) ?? null;

  const usesDefault = activeLayout ? isDefaultPlan(activeLayout, activeStyle) : false;
  const name = activeLayout
    ? [layoutLabel(activeLayout), activeStyle ? cabinetStyleLabel(activeStyle) : null]
        .filter(Boolean)
        .join(" · ")
    : "";
  const alt = activeLayout
    ? `2D plan: ${layoutLabel(activeLayout)} kitchen${
        activeStyle && !usesDefault ? `, ${cabinetStyleLabel(activeStyle)} cabinets` : ""
      }${finish ? ` in ${finish.name}` : ""}`
    : "";
  const hasTabs = layouts.length > 1 && activeLayout !== null;

  return (
    <aside
      aria-label="Kitchen preview"
      className={`kc-preview ${fullWidth ? "kc-preview--full" : "kc-preview--side"}`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
        className="kc-preview-toggle"
      >
        {open ? "Hide preview ▴" : "Show preview ▾"}
      </button>
      <div
        id={contentId}
        className={`kc-preview-content ${open ? "" : "kc-preview-content--closed"}`}
      >
        <p className="kc-preview-title">
          <span className="kc-live-dot" aria-hidden="true" /> Live 2D preview
        </p>
        <div
          id={panelId}
          {...(hasTabs
            ? { role: "tabpanel", "aria-labelledby": planTabId(panelId, activeLayout) }
            : {})}
        >
          {activeLayout ? (
            <PlanFrame src={getPlanImage(activeLayout, activeStyle)} alt={alt} finish={finish} />
          ) : (
            <EmptyPlan />
          )}
          {activeLayout && (
            <p className="kc-plan-caption" aria-live="polite">
              {name}
              {usesDefault ? " (default view)" : ""}
              {finish ? ` · ${finish.name}` : ""}
            </p>
          )}
        </div>
        {activeLayout && (
          <FinishPicker
            options={options}
            value={finishId}
            onChange={setPicked}
            chosen={chosenBoards.length > 0}
          />
        )}
        {hasTabs && (
          <PlanThumbTabs
            layouts={layouts}
            active={activeLayout}
            style={activeStyle}
            finish={finish}
            panelId={panelId}
            onSelect={setActiveLayout}
          />
        )}
      </div>
    </aside>
  );
}
