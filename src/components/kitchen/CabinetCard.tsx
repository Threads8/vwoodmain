import type { CABINET_STYLES } from "@/config/kitchenOptions";
import { SelectableCard } from "./SelectableCard";

export function CabinetCard({
  option,
  selected,
  onToggle,
}: {
  option: (typeof CABINET_STYLES)[number];
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <SelectableCard selected={selected} onToggle={onToggle} className="kc-option-card">
      <img src={option.image} alt={option.alt} className="kc-option-image kc-option-image--tall" />
      <span className="kc-option-label">{option.title}</span>
    </SelectableCard>
  );
}
