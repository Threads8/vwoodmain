import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { BoardSpec } from "@/lib/board-specs";

type Props = {
  spec: BoardSpec | undefined;
  productName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** "Specification" popup opened from an MDF board card's Details button. */
export function SpecDialog({ spec, productName, open, onOpenChange }: Props) {
  if (!spec) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="spec-card">
        <DialogTitle className="spec-card-heading">Specification</DialogTitle>
        <DialogDescription className="spec-card-type">
          {spec.title}
          <span className="sr-only"> for {productName}</span>
        </DialogDescription>
        <dl className="spec-card-rows">
          {spec.rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              {row.lines.map((line) => (
                <dd key={line}>{line}</dd>
              ))}
            </div>
          ))}
        </dl>
        {spec.advantages && (
          <div className="spec-card-advantages">
            <p>Advantages:</p>
            <ul>
              {spec.advantages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {spec.icons.length > 0 && (
          <div className="spec-card-icons">
            {spec.icons.map((icon) => (
              <img
                key={icon.src}
                src={icon.src}
                alt=""
                width={icon.width}
                height={icon.height}
                style={{ flexGrow: icon.width }}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
