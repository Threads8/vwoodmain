import type { LAYOUTS } from "@/config/kitchenOptions";
import { SelectableCard } from "./SelectableCard";

export function LayoutCard({
  option,
  selected,
  onToggle,
}: {
  option: (typeof LAYOUTS)[number];
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <SelectableCard selected={selected} onToggle={onToggle} className="kc-option-card">
      <img src={option.image} alt={option.alt} className="kc-option-image" />
      <span className="kc-option-title">{option.title}</span>
      {option.desc && <span className="kc-option-desc">{option.desc}</span>}
    </SelectableCard>
  );
}
