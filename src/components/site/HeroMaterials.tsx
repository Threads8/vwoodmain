import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { BOARDS } from "@/lib/site-data";

// Board surface bounds in the original 1670 × 942 photograph, plus each label's
// anchor (left edge — or right edge with labelEnd — and vertical centre) in the same space. Labels follow the
// image's centered object-cover geometry, including mobile cropping.
const MATERIALS = [
  // Top edge lowered in the photo to Classic Walnut's line (scripts/hero-board-edit.py). Chip placed
  // like Walnut's: 12 photo px inside the board's left edge, centred 86 px below its top.
  { slug: "washed-oakwood", label: "Washed Oakwood", x: 190, y: 281, width: 234, height: 475, labelX: 202, labelY: 367 },
  { slug: "classic-walnut", label: "Classic Walnut", x: 543, y: 280, width: 233, height: 463, labelX: 555, labelY: 366 },
  { slug: "maple-wood-natural", label: "Maple Wood Natural", x: 881, y: 286, width: 237, height: 457, labelX: 930, labelY: 452 },
  { slug: "prime-oak", label: "Prime Oak", x: 1229, y: 252, width: 227, height: 504, labelX: 1278, labelY: 366 },
] as const;

// The supplied hero photo with the Washed Oakwood board shortened to match the others.
const HERO_PHOTO = "/images/home-hero.webp";

const LABEL_WIDTH = 148;
const EDGE = 6;

type Material = (typeof MATERIALS)[number];

// Swatch cards supplied for the hero boards (public/woods). All four are Melamine in both sheet sizes.
const SHEET_SIZES = ["2440x1220", "2800x1220"];
const swatchFor = (slug: string) => `/woods/${slug}.jpg`;

function MaterialLabel({ material, style, onOpen }: { material: Material; style: CSSProperties; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} aria-haspopup="dialog" className="home-material-label" style={style}>
      <span className="home-material-label__icon" aria-hidden="true">+</span>
      <span>{material.label}</span>
    </button>
  );
}

function MaterialDialog({ open, onOpenChange }: { open: Material | null; onOpenChange: (material: Material | null) => void }) {
  const board = open ? BOARDS.find((item) => item.slug === open.slug) : undefined;
  return (
    <DialogPrimitive.Root open={open !== null} onOpenChange={(value) => { if (!value) onOpenChange(null); }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="wood-pop-overlay" />
        {open && (
          <DialogPrimitive.Content className="wood-pop" aria-describedby={undefined}>
            <div className="wood-pop-card">
              <div className="wood-pop-swatch">
                <img key={open.slug} src={swatchFor(open.slug)} alt={`${open.label} board surface`} />
              </div>
              <div className="wood-pop-panel">
                <DialogPrimitive.Title className="wood-pop-title">{open.label}</DialogPrimitive.Title>
                <p className="wood-pop-material">Melamine{board?.code ? <span> · {board.code}</span> : null}</p>
                <ul className="wood-pop-sizes" aria-label="Sheet sizes">
                  {SHEET_SIZES.map((size) => <li key={size}>{size}</li>)}
                </ul>
              </div>
            </div>
            <div className="wood-pop-switch" role="group" aria-label="Other finishes">
              {MATERIALS.map((material) => (
                <button
                  key={material.slug}
                  type="button"
                  aria-pressed={material.slug === open.slug}
                  title={material.label}
                  onClick={() => onOpenChange(material)}
                >
                  <img src={swatchFor(material.slug)} alt="" />
                  <span className="sr-only">{material.label}</span>
                </button>
              ))}
            </div>
            <div className="wood-pop-actions">
              <Link to="/products/$slug" params={{ slug: open.slug }} onClick={() => onOpenChange(null)}>
                View details <ArrowRight aria-hidden="true" />
              </Link>
              <Link to="/contact" search={{ product: open.slug }} onClick={() => onOpenChange(null)}>
                Request quote
              </Link>
            </div>
            <DialogPrimitive.Close className="wood-pop-close" aria-label="Close">
              <X aria-hidden="true" />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        )}
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function HeroMaterials() {
  const frame = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [open, setOpen] = useState<Material | null>(null);

  useEffect(() => {
    if (!frame.current) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  const scale = Math.max(size.width / 1670, size.height / 942);
  const offsetX = (size.width - 1670 * scale) / 2;
  const offsetY = (size.height - 942 * scale) / 2;

  return (
    <div ref={frame} className="home-materials">
      <img src={HERO_PHOTO} alt="Wood MDF boards on display in a showroom" width={1670} height={942} className="absolute inset-0 h-full w-full object-cover" />
      {size.width > 0 && MATERIALS.map((material) => {
        const boardLeft = offsetX + material.x * scale;
        const boardRight = boardLeft + material.width * scale;
        // Do not leave a floating label behind when its board is cropped out.
        if (Math.min(size.width, boardRight) - Math.max(0, boardLeft) < material.width * scale * 0.5) return null;
        const labelScale = Math.min(1, (size.width - EDGE * 2) / 4 / LABEL_WIDTH);
        const labelWidth = LABEL_WIDTH * labelScale;
        const anchor = offsetX + material.labelX * scale;
        const start = "labelEnd" in material ? anchor - labelWidth : anchor;
        const left = Math.max(EDGE, Math.min(start, size.width - EDGE - labelWidth));
        return (
          <MaterialLabel
            key={material.slug}
            material={material}
            onOpen={() => setOpen(material)}
            style={{ left, top: offsetY + material.labelY * scale, width: LABEL_WIDTH, transform: `translateY(-50%) scale(${labelScale})` }}
          />
        );
      })}
      <MaterialDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
