import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { Lightbox } from "@/components/Lightbox";
import { Page } from "@/components/site/Layout";
import { PRODUCT_DETAILS } from "@/lib/product-details";
import { findProduct } from "@/lib/product-categories";
import { IMG, type Board } from "@/lib/site-data";
import type { SinkProduct } from "@/lib/sink-products";
import type { BinDetailProduct } from "@/lib/bin-products";
import type { EdgeTapeDetailProduct } from "@/lib/edge-tape-products";
import featureIcons from "@/assets/products/product-feature-icons.png";

const CATEGORY_LABELS = { "mdf-board": "MDF Board", sink: "Sink", "rubbish-bin": "Rubbish Bin", "edge-tape": "Edge Tape" } as const;

/**
 * Allow-list of product `categoryId`s that show the dark "Premium Surface Finish" card. Every
 * other category (sinks, rubbish bins and the drawer runner, which is filed under rubbish-bin,
 * plus any added later) leaves it out of the page entirely.
 */
const SURFACE_FINISH_CATEGORIES: readonly string[] = ["mdf-board", "edge-tape"];
const showsSurfaceFinish = (categoryId: string) =>
  SURFACE_FINISH_CATEGORIES.includes(categoryId.trim().toLowerCase());

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const board = findProduct(params.slug);
    if (!board) throw notFound();
    return { board };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.board.name} — ${CATEGORY_LABELS[loaderData.board.categoryId]} | iWood Interiors` },
          { name: "description", content: loaderData.board.desc },
          { property: "og:title", content: `${loaderData.board.name} — ${CATEGORY_LABELS[loaderData.board.categoryId]}` },
          { property: "og:description", content: loaderData.board.desc },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Product unavailable" }, { name: "robots", content: "noindex" }],
  }),
  component: Detail,
});

function Detail() {
  const { board } = Route.useLoaderData();
  return <ProductDetailContent key={board.slug} board={board} />;
}

function ProductDetailContent({ board }: { board: Board | SinkProduct | BinDetailProduct | EdgeTapeDetailProduct }) {
  const detail = PRODUCT_DETAILS[board.slug];
  const sizes = detail?.sizes ?? ["2440x1220", "2800x1220"];
  const [qty, setQty] = useState(2);
  const [size, setSize] = useState(sizes[0]);
  const images = detail?.images ?? [IMG.barKitchen, IMG.brightKitchen, IMG.woodKitchen];
  // "Product in Use": the thumbnails and the preview both read this one list, so the preview only
  // steps through the current product's photos.
  const inUsePhotos = images.map((src, i) => ({
    src,
    alt: `${board.name} ${board.categoryId === "mdf-board" ? "cabinetry " : ""}installation ${i + 1}`,
  }));
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const openedFrom = useRef<HTMLButtonElement | null>(null);
  const openPreview = (i: number) => {
    openedFrom.current = thumbs.current[i] ?? null;
    setPreviewIndex(i);
  };
  const closePreview = () => {
    setPreviewIndex(null);
    openedFrom.current?.focus({ preventScroll: true });
  };
  const quoteSearch = { product: board.slug, quantity: qty, size };

  return (
    <Page>
      <section className="product-detail" data-product={board.slug}>
        <h1 className="product-detail-title text-h1">{board.name}</h1>
        <div className="product-detail-section-heading">
          <h2 className="text-h3">Select Style Profile</h2>
        </div>
        <div className="product-detail-grid">
          <div className="product-detail-swatch" style={{ background: detail?.color ?? board.swatch }}>
            {detail?.hero && <img src={detail.hero} alt={board.categoryId === "mdf-board" ? `${board.name} surface sample` : board.categoryId === "edge-tape" ? `${board.name} edge tape sample` : board.name} />}
          </div>
          <div className="product-detail-selection">
            <h2 className="product-detail-name text-h2">{board.name}</h2>
            <p className="product-detail-category text-lead">{board.categoryId === "mdf-board" ? "MDF Boards" : CATEGORY_LABELS[board.categoryId]}</p>
            <h3 className="product-selection-label">Current Selections</h3>
            <dl className="product-specifications">
              {board.code && <div><dt>CODE</dt><dd>{board.code}</dd></div>}
              {board.categoryId === "edge-tape" && <div><dt>Roll length</dt><dd>100 meters/roll</dd></div>}
              {(board.categoryId === "mdf-board" || board.categoryId === "edge-tape") && <>
              <div><dt>Thickness</dt><dd>18MM</dd></div>
              <div><dt>Finish</dt><dd>{board.sides}</dd></div>
              </>}
            </dl>
            <div className="product-quantity" role="group" aria-label={board.categoryId === "mdf-board" ? "Sheet quantity" : "Quantity"}>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty(q => q + 1)} className="product-qty-btn"><Plus size={12} aria-hidden="true" /></button>
              <output aria-live="polite" aria-label={`Quantity ${qty}`}>{qty}</output>
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty <= 1} className="product-qty-btn"><Minus size={16} aria-hidden="true" /></button>
            </div>
            <fieldset className="product-sheet-sizes">
              <legend className={detail?.hideSizeLabel ? "sr-only" : undefined}>{detail?.hideSizeLabel ? "Size" : "Sheet Size"}</legend>
              {sizes.map(option => (
                <label key={option}>
                  <input type="radio" name="sheet-size" value={option} checked={size === option} onChange={() => setSize(option)} />
                  <span>{option}</span>
                </label>
              ))}
              {detail?.sizeNote && <p className="product-size-note">{detail.sizeNote}</p>}
            </fieldset>
            {detail?.showFeatureIcons !== false && <img src={detail?.icons ?? featureIcons} alt={detail?.iconsAlt ?? "Silk Touch, Long Durability, Anti Fingerprint, Color Stability, Eco-friendly"} loading="lazy" className="product-feature-icons" />}
          </div>
          <aside className="product-detail-aside">
            <Link to="/contact" search={quoteSearch} className="product-detail-action product-detail-action-primary">Proceed to Step 3 <ArrowRight size={12} aria-hidden="true" /></Link>
            <Link to="/contact" search={quoteSearch} className="product-detail-action">Request a Quote</Link>
            {showsSurfaceFinish(board.categoryId) && (
              <div className="product-surface-panel">
                <h3 className="product-surface-title text-h3">Premium Surface Finish</h3>
                <p className="product-surface-description">{board.surfaceDesc}</p>
                <ul className="product-surface-features">
                  {board.features.map(feature => <li key={feature}>{feature}</li>)}
                </ul>
              </div>
            )}
          </aside>
        </div>
        {images.length > 0 && <>
        <div className="product-detail-section-heading product-in-use-heading"><h2 className="text-h3">Product in Use</h2></div>
        <div className="product-in-use" style={{ "--gallery-columns": (detail?.imageWidths ?? [207, 343, 207]).map(width => `${width}fr`).join(" "), "--gallery-width": `${(detail?.imageWidths ?? [207, 343, 207]).reduce((total, width) => total + width, 0) + Math.max(0, images.length - 1) * 27}px` } as CSSProperties}>
          {inUsePhotos.map((photo, i) => (
            <button
              key={photo.src}
              ref={(button) => { thumbs.current[i] = button; }}
              type="button"
              aria-haspopup="dialog"
              aria-label={`View larger: ${photo.alt}`}
              className="product-in-use-thumb"
              onClick={() => openPreview(i)}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </button>
          ))}
        </div>
        </>}
      </section>
      <Lightbox
        photos={inUsePhotos}
        index={previewIndex}
        onIndexChange={setPreviewIndex}
        onClose={closePreview}
        label="Product in use image preview"
      />
    </Page>
  );
}
