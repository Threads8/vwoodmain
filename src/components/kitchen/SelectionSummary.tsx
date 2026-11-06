import { Link } from "@tanstack/react-router";
import { useRef, type ReactNode, type RefObject } from "react";
import { cabinetStyleLabel, layoutLabel } from "@/config/kitchenOptions";
import { isStepDone, type SkippableStep, type StepPath } from "@/config/kitchenSteps";
import type { CatalogItem } from "@/config/products";
import { selectedBoards, selectedMaterials, selectedTapes } from "@/lib/kitchen-quote";
import { useKitchenStore } from "@/stores/kitchenStore";
import { ProductMedia } from "./ProductCard";
import { SelectionChip } from "./SelectionChip";
import { StepNav } from "./StepNav";

function Section({
  title,
  editTo,
  warning,
  skipped = false,
  variant = "row",
  focusRef,
  children,
}: {
  title: string;
  editTo?: StepPath;
  warning?: string | false;
  /** The customer skipped this step and chose nothing. */
  skipped?: boolean;
  variant?: "row" | "products";
  focusRef?: RefObject<HTMLHeadingElement | null>;
  children: ReactNode;
}) {
  return (
    <section className={`kc-summary-section kc-summary-section--${variant}`}>
      <div className="kc-summary-section-head">
        <h3 ref={focusRef} tabIndex={-1}>
          {title}
        </h3>
        {editTo && (
          <Link to={editTo} aria-label={`Edit ${title}`} className="kc-summary-edit">
            Edit
          </Link>
        )}
      </div>
      <div className="kc-summary-values">
        {warning && (
          <p role="alert" className="kc-summary-warning">
            {warning}
          </p>
        )}
        {skipped ? <p className="kc-summary-none">Skipped</p> : children}
      </div>
    </section>
  );
}

function ProductChips({
  items,
  noun,
  onRemove,
}: {
  items: CatalogItem[];
  noun: string;
  onRemove: (id: string) => void;
}) {
  return (
    <ul className="kc-summary-products">
      {items.map((item) => (
        <SelectionChip
          key={item.id}
          label={`${item.name} ${noun}`}
          onRemove={() => onRemove(item.id)}
        >
          <span className="kc-summary-thumb">
            <ProductMedia item={item} alt={`${item.name} ${noun} sample`} />
          </span>
          <span className="kc-summary-product-text">
            <span>{item.name}</span>
            <span>{item.code}</span>
          </span>
        </SelectionChip>
      ))}
    </ul>
  );
}

export function SelectionSummary() {
  const layouts = useKitchenStore((state) => state.layouts);
  const cabinetStyles = useKitchenStore((state) => state.cabinetStyles);
  const boardIds = useKitchenStore((state) => state.boards);
  const tapeIds = useKitchenStore((state) => state.tapes);
  const skippedSteps = useKitchenStore((state) => state.skipped);
  const toggleLayout = useKitchenStore((state) => state.toggleLayout);
  const toggleCabinetStyle = useKitchenStore((state) => state.toggleCabinetStyle);
  const toggleBoard = useKitchenStore((state) => state.toggleBoard);
  const toggleTape = useKitchenStore((state) => state.toggleTape);
  const headings = {
    layouts: useRef<HTMLHeadingElement>(null),
    styles: useRef<HTMLHeadingElement>(null),
    boards: useRef<HTMLHeadingElement>(null),
    tapes: useRef<HTMLHeadingElement>(null),
  };

  // The focused × disappears with its chip, so move keyboard users to the section heading.
  const removing =
    <T,>(remove: (id: T) => void, heading: RefObject<HTMLHeadingElement | null>) =>
    (id: T) => {
      remove(id);
      heading.current?.focus({ preventScroll: true });
    };

  const materials = selectedMaterials(boardIds);
  const selections = {
    layouts,
    cabinetStyles,
    boards: boardIds,
    tapes: tapeIds,
    skipped: skippedSteps,
  };
  const done = (key: SkippableStep) => isStepDone(key, selections);
  /** Skipped and still empty: show "Skipped" rather than a warning. */
  const isSkipped = (key: SkippableStep) =>
    selections[key].length === 0 && skippedSteps.includes(key);
  const complete = done("layouts") && done("cabinetStyles") && done("boards") && done("tapes");

  return (
    <div className="kc-summary">
      <h2 className="kc-summary-title">Your Material Selection</h2>
      <div className="kc-summary-grid">
        <Section
          title="Selected Boards"
          editTo="/kitchen-design/boards"
          variant="products"
          focusRef={headings.boards}
          skipped={isSkipped("boards")}
          warning={!done("boards") && "Choose at least one board to continue."}
        >
          <ProductChips
            items={selectedBoards(boardIds)}
            noun="board"
            onRemove={removing(toggleBoard, headings.boards)}
          />
        </Section>
        <Section
          title="Selected Tapes"
          editTo="/kitchen-design/tapes"
          variant="products"
          focusRef={headings.tapes}
          skipped={isSkipped("tapes")}
          warning={!done("tapes") && "Choose at least one tape to continue."}
        >
          <ProductChips
            items={selectedTapes(tapeIds)}
            noun="tape"
            onRemove={removing(toggleTape, headings.tapes)}
          />
        </Section>
      </div>
      <Section
        title="Kitchen layout:"
        editTo="/kitchen-design/layout"
        focusRef={headings.layouts}
        skipped={isSkipped("layouts")}
        warning={!done("layouts") && "Choose at least one layout to continue."}
      >
        <ul className="kc-chips">
          {layouts.map((id) => (
            <SelectionChip
              key={id}
              label={layoutLabel(id)}
              onRemove={() => removing(toggleLayout, headings.layouts)(id)}
            />
          ))}
        </ul>
      </Section>
      <Section
        title="Cabinet style:"
        editTo="/kitchen-design/cabinet-style"
        focusRef={headings.styles}
        skipped={isSkipped("cabinetStyles")}
        warning={!done("cabinetStyles") && "Choose at least one cabinet style to continue."}
      >
        <ul className="kc-chips">
          {cabinetStyles.map((id) => (
            <SelectionChip
              key={id}
              label={cabinetStyleLabel(id)}
              onRemove={() => removing(toggleCabinetStyle, headings.styles)(id)}
            />
          ))}
        </ul>
      </Section>
      <Section title="Material">
        {materials.length > 0 ? (
          <ul className="kc-chips">
            {materials.map((material) => (
              <SelectionChip key={material} label={material} />
            ))}
          </ul>
        ) : (
          <p className="kc-summary-none">Chosen with your boards</p>
        )}
      </Section>
      <div className="kc-summary-footer">
        <StepNav
          step={5}
          canContinue={complete}
          hint="Complete or skip every section to continue"
        />
        <Link to="/kitchen-design/layout" className="kc-summary-edit-all">
          Edit Selection
        </Link>
      </div>
      <p className="kc-summary-note">
        Your kitchen preferences are ready! Review your selections and share your details to receive
        a personalised quotation
      </p>
    </div>
  );
}
