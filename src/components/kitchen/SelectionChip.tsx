import { X } from "lucide-react";
import type { ReactNode } from "react";

export function SelectionChip({
  label,
  onRemove,
  children,
}: {
  label: string;
  onRemove?: () => void;
  children?: ReactNode;
}) {
  return (
    <li className="kc-chip">
      {children ?? <span>{label}</span>}
      {onRemove && (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          onClick={onRemove}
          className="kc-chip-remove"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
    </li>
  );
}
