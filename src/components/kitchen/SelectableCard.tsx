import { Check } from "lucide-react";
import type { ReactNode } from "react";

export function SelectableCard({
  selected,
  onToggle,
  className = "",
  children,
}: {
  selected: boolean;
  onToggle: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`kc-card ${className}`}
    >
      {children}
      {selected && (
        <span className="kc-card-tick" aria-hidden="true">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
      )}
    </button>
  );
}
