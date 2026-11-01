import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import { Page } from "@/components/site/Layout";
import { type Board } from "@/lib/site-data";
import { PRODUCT_CATEGORIES, parseProductCategory, getCategoryProducts, categoryOptionLabel } from "@/lib/product-categories";
import { PRODUCT_IMAGES } from "@/lib/product-images";
import { SINK_PRODUCTS } from "@/lib/sink-products";
import { BIN_PRODUCTS } from "@/lib/bin-products";
import type { EdgeTapeProduct } from "@/lib/edge-tape-products";
import heroImg from "@/assets/products/hero.png";
import mdfBoardsImg from "@/assets/products/mdf-boards.png";
import sinksImg from "@/assets/products/sinks.png";
import rubbishBinImg from "@/assets/products/rubbish-bin.png";
import edgeTapeImg from "@/assets/products/edge-tape.png";

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>): {
    category?: ReturnType<typeof parseProductCategory>;
    view?: "catalog" | undefined;
  } => ({
    category: parseProductCategory(search["category"]),
    view: search["view"] === "catalog" ? "catalog" : undefined,
  }),
  loaderDeps: ({ search }) => ({ category: parseProductCategory(search.category), view: search.view }),
  loader: ({ deps }) => ({ category: deps.category, view: deps.view, products: getCategoryProducts(deps.category) }),
  pendingComponent: () => <Page><p role="status" className="px-6 py-16 text-center">Loading products…</p></Page>,
  errorComponent: CatalogError,
  head: () => ({
    meta: [
      { title: "MDF Board Range — iWood Interiors" },
      {
        name: "description",
        content: "Explore our curated range of MDF boards in matt, gloss and woodgrain finishes.",
      },
      { property: "og:title", content: "MDF Board Range — iWood Interiors" },
      {
        property: "og:description",
        content: "Matt, gloss and woodgrain MDF boards for modern spaces.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductCategoryPage,
});

function CatalogError() {
  const router = useRouter();
  return <Page><div role="alert" className="px-6 py-16 text-center">
    <p>We couldn’t load the product catalog. Please try again.</p>
    <button className="catalog-gallery-link mt-4" onClick={() => void router.invalidate()}>Retry</button>
  </div></Page>;
}

function ProductCategoryPage() {
  const { category, view } = Route.useLoaderData();
  return view === "catalog" ? <Products key={category} /> : <ProductLanding />;
}

const PRODUCT_TILES = [
  {
    title: "MDF Boards",
    description: "Seamless, MDF boards in matt, gloss and woodgrain finishes — built for lasting performance in every kitchen, wardrobe and interior.",
    image: mdfBoardsImg,
    cta: "Explore Range",
    category: "mdf-board",
    className: "product-landing-tile--mdf",
  },
  {
    title: "Sinks",
    description: "Premium stainless steel sinks designed for lasting durability, easy maintenance, and a clean modern finish.",
    image: sinksImg,
    cta: "Explore Range",
    category: "sink",
    className: "product-landing-tile--sink",
  },
  {
    title: "Rubbish Bin",
    description: "Smooth, soft-close pull-out waste bins designed for effortless organisation and a clean, clutter-free kitchen.",
    image: rubbishBinImg,
    cta: "Explore Bins",
    category: "rubbish-bin",
    className: "product-landing-tile--bin",
  },
  {
    title: "Edge Tape",
    description: "Matching edge banding in every board finish.",
    image: edgeTapeImg,
    cta: "Explore Textures",
    category: "edge-tape",
    className: "product-landing-tile--edge",
  },
] as const;

type ProductTile = (typeof PRODUCT_TILES)[number];

function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M7.10208 5.25H0V4.08333H7.10208L3.83542 0.816667L4.66667 0L9.33333 4.66667L4.66667 9.33333L3.83542 8.51667L7.10208 5.25Z" fill="currentColor" />
    </svg>
  );
}

function ProductTileLink({ tile }: { tile: ProductTile }) {
  return (
    <Link to="/products" search={{ category: tile.category, view: "catalog" }} className={`product-landing-tile ${tile.className}`}>
      <span className="product-landing-tile__media">
        <img src={tile.image} alt="" loading="lazy" />
      </span>
      <span className="product-landing-tile__panel">
        <strong>{tile.title}</strong>
        <span>{tile.description}</span>
        <small>{tile.cta} <ArrowIcon /></small>
      </span>
    </Link>
  );
}

function ProductLanding() {
  const [mdf, sink, bin, edge] = PRODUCT_TILES;
  return (
    <Page overlay>
      <section className="product-landing-hero">
        <img src={heroImg} alt="Warm contemporary kitchen with timber cabinetry" />
        <div className="product-landing-hero__panel">
          <h1>
            The Art Of
            <br />
            Raw Matters
          </h1>
          <p className="product-landing-hero__copy">
            Premium MDF boards in matt, gloss and natural woodgrain finishes — seamless, built for
            kitchens, wardrobes and interiors that are made to last.
          </p>
          <div className="product-landing-actions">
            <Link to="/products" search={{ category: "mdf-board", view: "catalog" }}>Explore Collection</Link>
            <Link to="/project-gallery">View Gallery</Link>
          </div>
        </div>
      </section>

      <section className="product-landing-products">
        <div className="product-landing-row product-landing-row--top">
          <ProductTileLink tile={mdf} />
          <ProductTileLink tile={sink} />
        </div>
        <div className="product-landing-row product-landing-row--bottom">
          <ProductTileLink tile={bin} />
          <div className="product-landing-side">
            <div className="product-landing-heading">
              <h2>Our Products</h2>
              <p className="product-landing-eyebrow">Curated materials</p>
              <p>A selection of high-performance surfaces engineered for durability and uncompromising aesthetic appeal.</p>
            </div>
            <ProductTileLink tile={edge} />
          </div>
        </div>
      </section>
    </Page>
  );
}

type CatalogProduct = Board | EdgeTapeProduct;

const MATERIALS: { name: string; match: (b: CatalogProduct) => boolean }[] = [
  { name: "Acrylic", match: (b) => b.finish === "High Gloss" },
  { name: "UV Range", match: () => true },
  { name: "Melamine", match: (b) => b.finish === "Woodgrain" || b.finish === "Matte" },
  { name: "Acrylic Super Matt", match: (b) => b.name.includes("Super Matt") },
];

const FINISHES = ["Matte", "Satin", "High Gloss", "Woodgrain"];
const SWATCHES = [
  { hex: "#1A1C1C", tone: "dark" },
  { hex: "#F1F1F1", tone: "light" },
  { hex: "#6F4627", tone: "brown" },
  { hex: "#51443C", tone: "grey" },
  { hex: "#8B5E3C", tone: "oak" },
];

function avgColor(b: CatalogProduct): [number, number, number] {
  const hexes = b.swatch.match(/#[0-9a-fA-F]{6}/g) ?? [];
  if (hexes.length === 0) return [128, 128, 128];
  let r = 0,
    g = 0,
    bl = 0;
  for (const h of hexes) {
    r += parseInt(h.slice(1, 3), 16);
    g += parseInt(h.slice(3, 5), 16);
    bl += parseInt(h.slice(5, 7), 16);
  }
  return [r / hexes.length, g / hexes.length, bl / hexes.length];
}

function toneOf(b: CatalogProduct): string {
  const [r, g, bl] = avgColor(b);
  const lum = (0.299 * r + 0.587 * g + 0.114 * bl) / 255;
  if (lum > 0.8) return "light";
  if (lum < 0.25) return "dark";
  const max = Math.max(r, g, bl),
    min = Math.min(r, g, bl);
  if (max - min < 20) return "grey";
  return lum < 0.45 ? "brown" : "oak";
}

const PER_PAGE = 21;
// The supplied edge tape frames split the range into 12 cards, then 13.
const EDGE_TAPE_FIRST_PAGE = 12;
const EDGE_TAPE_PER_PAGE = 13;

function ProductMedia({ product }: { product: CatalogProduct }) {
  const zoomClass = "transition-transform duration-500 motion-safe:group-hover:scale-[1.03]";
  if (product.categoryId === "edge-tape") {
    if (!product.image) return <div className="h-full w-full" style={{ background: product.swatch }} />;
    const { crop } = product;
    return (
      <img
        src={product.image}
        alt={`${product.name} edge tape`}
        loading="lazy"
        className={`${crop ? "edge-tape-crop" : "h-full w-full object-cover"} ${zoomClass}`}
        style={crop ? ({
          "--crop-width": `${(crop.width / 277) * 100}%`,
          "--crop-height": `${(crop.height / 347) * 100}%`,
          "--crop-x": `${(crop.x / 277) * 100}%`,
          "--crop-y": `${(crop.y / 347) * 100}%`,
        } as CSSProperties) : undefined}
      />
    );
  }
  const image = PRODUCT_IMAGES[product.slug];
  return image
    ? <img src={image} alt={`${product.name} cabinetry`} loading="lazy" className={`h-full w-full object-cover ${zoomClass}`} />
    : <div className="h-full w-full" style={{ background: product.swatch }} />;
}

function Products() {
  const { category, products } = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const hasFilters = category === "mdf-board" || category === "edge-tape";
  const firstPageSize = category === "edge-tape" ? EDGE_TAPE_FIRST_PAGE : PER_PAGE;
  const pageSize = category === "edge-tape" ? EDGE_TAPE_PER_PAGE : PER_PAGE;
  const categoryName = PRODUCT_CATEGORIES.find((item) => item.id === category)!.name;
  const [material, setMaterial] = useState("UV Range");
  const [finish, setFinish] = useState<string | null>(null);
  const [tone, setTone] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const apply = (fn: () => void) => {
    fn();
    setPage(0);
  };

  const filtered = products.filter((b) => {
    const m = MATERIALS.find((x) => x.name === material);
    if (m && !m.match(b)) return false;
    if (finish && b.finish !== finish) return false;
    if (tone && toneOf(b) !== tone) return false;
    return true;
  });
  const pageCount = 1 + Math.ceil(Math.max(0, filtered.length - firstPageSize) / pageSize);
  const pageStart = page === 0 ? 0 : firstPageSize + (page - 1) * pageSize;
  const visible = filtered.slice(pageStart, pageStart + (page === 0 ? firstPageSize : pageSize));

  return (
    <Page>
      <section id="catalog" className="product-catalog-intro">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h1
              className="font-sans text-h1 font-bold tracking-[-0.02em]"
              style={{ color: "#1A1C1C" }}
            >
              Explore Our Range
              <br />
              <span className="text-[0.92em]" style={{ color: "rgba(26,28,28,0.78)" }}>
                {category === "rubbish-bin" ? "Rubbish Bin & Others" : categoryName}
              </span>
            </h1>
            <p
              className="mt-3 font-body text-[13px] tracking-[2px] uppercase"
              style={{ color: "#6F4627" }}
            >
              Product Catalog
            </p>
            <p
              className="mt-2 max-w-[640px] font-body text-[clamp(15px,1.12vw,16px)] leading-[1.65]"
              style={{ color: "#505050" }}
            >
              Explore our curated range of quality interior products, designed for modern spaces.
              {category === "edge-tape" ? " From versatile edge tape, discover solutions" : " From versatile MDF boards discover solutions"} that combine functionality with
              contemporary design.
            </p>
            <Link to="/project-gallery" className="catalog-gallery-link mt-4 inline-block">
              View Project Gallery →
            </Link>
          </div>
          <select aria-label="Category" value={category} onChange={(event) => void navigate({ search: { category: parseProductCategory(event.target.value), view: "catalog" }, resetScroll: false })} className="catalog-category mt-3">
            {PRODUCT_CATEGORIES.map((item) => <option key={item.id} value={item.id}>{categoryOptionLabel(item)}</option>)}
          </select>
        </div>
      </section>

      {category === "sink" ? <SinkRange /> : category === "rubbish-bin" ? <BinRange /> : <section className="product-catalog-layout">
        <aside hidden={!hasFilters}>
          <p
            className="font-sans text-[13px] font-bold uppercase tracking-[1.2px]"
            style={{ color: "#1A1C1C" }}
          >
            Material
          </p>
          <div className="mt-5 flex flex-col gap-3.5">
            {MATERIALS.map((m) => {
              const selected = m.name === material;
              const count = products.filter(m.match).length;
              return (
                <button
                  key={m.name}
                  aria-pressed={selected}
                  onClick={() => apply(() => setMaterial(m.name))}
                  className="flex items-center justify-between text-left"
                >
                  <span
                    className={`font-body text-[14px] leading-5 ${selected ? "font-semibold" : "font-normal"}`}
                    style={{ color: selected ? "#1A1C1C" : "#51443C" }}
                  >
                    {m.name}
                  </span>
                  {selected ? (
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#6F4627" }} />
                  ) : (
                    <span
                      className="font-body text-[12px] leading-[15px]"
                      style={{ color: "#83746B" }}
                    >
                      ({String(count).padStart(2, "0")})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <p
            className="mt-8 font-sans text-[13px] font-bold uppercase tracking-[1.2px]"
            style={{ color: "#1A1C1C" }}
          >
            Finish
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {FINISHES.map((f) => {
              const selected = finish === f;
              return (
                <button
                  key={f}
                  aria-pressed={selected}
                  onClick={() => apply(() => setFinish(selected ? null : f))}
                  className="rounded-(--radius-control) py-2 font-body text-[12px] font-semibold uppercase leading-[15px]"
                  style={
                    selected
                      ? { background: "#2F3131", color: "#F9F9F9" }
                      : { background: "#D9D9D9", color: "#1A1C1C" }
                  }
                >
                  {f}
                </button>
              );
            })}
          </div>

          <p
            className="mt-8 font-sans text-[13px] font-bold uppercase tracking-[1.2px]"
            style={{ color: "#1A1C1C" }}
          >
            Color Palette
          </p>
          <div className="mt-4 flex gap-3">
            {SWATCHES.map((s) => (
              <button
                key={s.tone}
                aria-label={`Filter by ${s.tone}`}
                aria-pressed={tone === s.tone}
                onClick={() => apply(() => setTone(tone === s.tone ? null : s.tone))}
                className="h-8 w-8 rounded-xl border transition-transform hover:scale-105"
                style={{
                  background: s.hex,
                  borderColor: "rgba(213,195,184,0.2)",
                  outline: tone === s.tone ? "2px solid #6F4627" : "none",
                  outlineOffset: "2px",
                }}
              />
            ))}
          </div>

          <button
            onClick={() =>
              apply(() => {
                setMaterial("UV Range");
                setFinish(null);
                setTone(null);
              })
            }
            className="mt-6 w-full rounded-(--radius-control) border py-3.5 font-body text-[13px] font-semibold uppercase tracking-[1.2px]"
            style={{ borderColor: "rgba(213,195,184,0.4)", color: "#1A1C1C" }}
          >
            Clear All Filters
          </button>
        </aside>

        <div className={!hasFilters ? "col-span-full" : undefined}>
          <div className="grid grid-cols-1 gap-x-[clamp(16px,2.2vw,32px)] gap-y-[clamp(40px,4.4vw,64px)] sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((b) => (
              <Link
                key={b.slug}
                to="/products/$slug"
                params={{ slug: b.slug }}
                className="group block"
              >
                <div
                  className="relative aspect-[277/347] overflow-hidden"
                  style={{ background: "#F3F3F3" }}
                >
                  <ProductMedia product={b} />
                  <div
                    className="absolute inset-x-4 bottom-4 translate-y-full p-4 opacity-0 backdrop-blur-[12px] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    style={{ background: "rgba(234,232,231,0.8)" }}
                  >
                    <p
                      className="font-body text-[12px] leading-[15px] tracking-[1px] uppercase"
                      style={{ color: "#1A1C1C" }}
                    >
                      Available in 8 Textures
                    </p>
                  </div>
                </div>
                <h3
                  className="mt-5 font-sans text-h3 font-bold tracking-[-0.02em]"
                  style={{ color: "#1A1C1C" }}
                >
                  {b.name}
                </h3>
                <p
                  className="mt-1.5 max-w-[320px] font-body text-[14px] leading-[1.6]"
                  style={{ color: "#51443C" }}
                >
                  {b.desc}
                </p>
                <span
                  className="mt-4 inline-block border-b pb-0.5 font-body text-[13px] font-semibold tracking-[0.5px] uppercase"
                  style={{ borderColor: "#6F4627", color: "#6F4627" }}
                >
                  Details
                </span>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <p role="status" className="py-16 text-center">
              {products.length === 0 ? "No products available in this category yet." : "No materials match these filters. Clear all filters to see the full range."}
            </p>
          )}
          {filtered.length > 0 && <div
            className="mt-16 flex flex-wrap items-center gap-6 font-body text-xs font-bold uppercase"
            style={{ color: "#1A1C1C" }}
          >
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="disabled:opacity-40"
            >
              ← Previous
            </button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                aria-label={`Page ${i + 1}`}
                aria-current={i === page ? "page" : undefined}
                onClick={() => setPage(i)}
                className={i === page ? "" : "font-normal"}
                style={{ color: i === page ? "#1A1C1C" : "#83746B" }}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
            <button
              disabled={page >= pageCount - 1}
              onClick={() => setPage(page + 1)}
              className="disabled:opacity-40"
            >
              Next →
            </button>
            <span role="status" aria-live="polite"
              className="ml-auto text-[12px] tracking-[1px] uppercase"
              style={{ color: "#51443C" }}
            >
              Showing {visible.length} of {filtered.length} materials
            </span>
          </div>}
        </div>
      </section>}
    </Page>
  );
}

function SinkRange() {
  return (
    <section className="product-range">
      {SINK_PRODUCTS.map((sink) => (
        <Link key={sink.slug} to="/products/$slug" params={{ slug: sink.slug }} className="product-range-card">
          <img src={sink.image} alt={sink.name} loading="lazy" />
          <h3 className="text-h3">{sink.name}</h3>
          <p>{sink.desc}</p>
        </Link>
      ))}
    </section>
  );
}

function BinRange() {
  return (
    <section className="product-range">
      {BIN_PRODUCTS.map((bin) => {
        const content = <>
          <img src={bin.image} alt={bin.name} loading="lazy" />
          <h3 className="text-h3">{bin.name}</h3>
          <p>{bin.desc}</p>
        </>;
        return bin.detailSlug
          ? <Link key={bin.slug} to="/products/$slug" params={{ slug: bin.detailSlug }} className="product-range-card">{content}</Link>
          : <article key={bin.slug} className="product-range-card">{content}</article>;
      })}
    </section>
  );
}
