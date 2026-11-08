import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useMemo, useState, type CSSProperties, type ImgHTMLAttributes } from "react";
import { X } from "lucide-react";
import { Page } from "@/components/site/Layout";
import { FilterPanel } from "@/components/catalog/FilterPanel";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { COLOR_OPTIONS, FINISH_OPTIONS, MATERIAL_OPTIONS } from "@/config/catalogFilters";
import { PRODUCT_CATEGORIES, parseProductCategory, categoryOptionLabel } from "@/lib/product-categories";
import { getCatalogProducts, type CatalogProduct } from "@/lib/catalog-products";
import {
  availableOptions,
  EMPTY_PRODUCT_FILTERS,
  facetCounts,
  filterProducts,
  hasActiveFilters,
  parseCatalogSearch,
  toCatalogSearch,
  toggleValue,
  withinOptions,
  type CatalogSearch,
  type ProductFilters,
} from "@/lib/catalog-filters";
import { SINK_PRODUCTS } from "@/lib/sink-products";
import { BIN_PRODUCTS } from "@/lib/bin-products";
import heroImg from "@/assets/products/hero.png";
import mdfBoardsImg from "@/assets/products/mdf-boards.png";
import sinksImg from "@/assets/products/sinks.png";
import rubbishBinImg from "@/assets/products/rubbish-bin.png";
import edgeTapeImg from "@/assets/products/edge-tape.png";

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>): {
    category?: ReturnType<typeof parseProductCategory>;
    view?: "catalog" | undefined;
  } & CatalogSearch => ({
    category: parseProductCategory(search["category"]),
    view: search["view"] === "catalog" ? "catalog" : undefined,
    ...toCatalogSearch(parseCatalogSearch(search)),
  }),
  // Filters are applied on the client, so changing them never re-runs the loader.
  loaderDeps: ({ search }) => ({ category: parseProductCategory(search.category), view: search.view }),
  loader: ({ deps }) => ({
    category: deps.category,
    view: deps.view,
    products: deps.category === "mdf-board" || deps.category === "edge-tape" ? getCatalogProducts(deps.category) : [],
  }),
  pendingComponent: CatalogSkeleton,
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

function CatalogSkeleton() {
  return (
    <Page>
      <section className="product-catalog-layout" aria-busy="true">
        <p role="status" className="sr-only">Loading products…</p>
        <div className="catalog-filter-sidebar flex flex-col gap-3.5" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => <div key={i} className="catalog-skeleton h-5" />)}
        </div>
        <div className="catalog-grid" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i}>
              <div className="catalog-skeleton aspect-[277/347]" />
              <div className="catalog-skeleton mt-5 h-6 w-2/3" />
              <div className="catalog-skeleton mt-2 h-4 w-11/12" />
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}

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

const PER_PAGE = 21;
// The supplied edge tape frames split the range into 12 cards, then 13.
const EDGE_TAPE_FIRST_PAGE = 12;
const EDGE_TAPE_PER_PAGE = 13;

/**
 * Lazy image that fades in once it has loaded. A skeleton pulses in its place only while it
 * loads, and the product's colour swatch replaces it if the image cannot be fetched.
 */
function CatalogImage({
  className = "",
  fallback,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { fallback: CSSProperties }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "failed">("loading");
  if (status === "failed") return <div className="h-full w-full" style={fallback} />;
  return (
    <>
      {status === "loading" && <span aria-hidden="true" className="catalog-skeleton absolute inset-0" />}
      <img
        {...props}
        loading="lazy"
        decoding="async"
        // Images cached or loaded before hydration never fire onLoad (or onError).
        ref={(img) => {
          if (img?.complete) setStatus(img.naturalWidth > 0 ? "loaded" : "failed");
        }}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("failed")}
        data-loaded={status === "loaded" || undefined}
        className={`catalog-card-img ${className}`}
      />
    </>
  );
}

function ProductMedia({ product }: { product: CatalogProduct }) {
  const zoomClass = "transition-[opacity,transform] duration-500 motion-safe:group-hover:scale-[1.03]";
  const swatch: CSSProperties = { background: product.swatch, border: product.swatchBorder };
  if (!product.image) {
    return <div className="h-full w-full" style={swatch} />;
  }
  if (product.categoryId === "edge-tape") {
    const { crop } = product;
    return (
      <CatalogImage
        src={product.image}
        fallback={swatch}
        alt={`${product.name} edge tape`}
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
  return <CatalogImage src={product.image} fallback={swatch} alt={`${product.name} cabinetry`} className={`h-full w-full object-cover ${zoomClass}`} />;
}

function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <Link to="/products/$slug" params={{ slug: product.slug }} className="group block">
      <div className="relative aspect-[277/347] overflow-hidden" style={{ background: "#F3F3F3" }}>
        <ProductMedia product={product} />
        {product.textureCount > 1 && (
          <div
            className="absolute inset-x-4 bottom-4 translate-y-full p-4 opacity-0 backdrop-blur-[12px] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            style={{ background: "rgba(234,232,231,0.8)" }}
          >
            <p className="font-body text-[12px] leading-[15px] tracking-[1px] uppercase" style={{ color: "#1A1C1C" }}>
              Available in {product.textureCount} Textures
            </p>
          </div>
        )}
      </div>
      <h3 className="mt-5 font-sans text-h3 font-bold tracking-[-0.02em]" style={{ color: "#1A1C1C" }}>
        {product.name}
      </h3>
      <p className="catalog-card-meta">
        {product.code && <span>{product.code}</span>}
        <span>{finishLabel(product.finish)}</span>
      </p>
      <p className="mt-1.5 max-w-[320px] font-body text-[14px] leading-[1.625]" style={{ color: "#51443C" }}>
        {product.description}
      </p>
      <span
        className="mt-4 inline-block border-b pb-0.5 font-body text-[13px] font-semibold tracking-[0.5px] uppercase"
        style={{ borderColor: "#6F4627", color: "#6F4627" }}
      >
        Details
      </span>
    </Link>
  );
}

const finishLabel = (key: CatalogProduct["finish"]) =>
  FINISH_OPTIONS.find((option) => option.key === key)?.label ?? key;

/** Subtitle under "Explore Our Range" for each category. */
const CATEGORY_TITLES: Record<ReturnType<typeof parseProductCategory>, string> = {
  "mdf-board": "MDF Boards",
  sink: "Sinks",
  "rubbish-bin": "Rubbish Bin & Others",
  "edge-tape": "Edge Tape",
};

const plural = (count: number) => `${count} ${count === 1 ? "product" : "products"}`;

function activeFilterTags(filters: ProductFilters) {
  return [
    ...MATERIAL_OPTIONS.filter((o) => filters.materials.includes(o.key)).map((o) => ({
      id: `material-${o.key}`, label: o.label, remove: (f: ProductFilters) => ({ ...f, materials: toggleValue(f.materials, o.key) }),
    })),
    ...FINISH_OPTIONS.filter((o) => filters.finishes.includes(o.key)).map((o) => ({
      id: `finish-${o.key}`, label: o.label, remove: (f: ProductFilters) => ({ ...f, finishes: toggleValue(f.finishes, o.key) }),
    })),
    ...COLOR_OPTIONS.filter((o) => filters.colors.includes(o.key)).map((o) => ({
      id: `color-${o.key}`, label: o.label, remove: (f: ProductFilters) => ({ ...f, colors: toggleValue(f.colors, o.key) }),
    })),
  ];
}

function Products() {
  const { category, products } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const hasFilters = category === "mdf-board" || category === "edge-tape";
  const firstPageSize = category === "edge-tape" ? EDGE_TAPE_FIRST_PAGE : PER_PAGE;
  const pageSize = category === "edge-tape" ? EDGE_TAPE_PER_PAGE : PER_PAGE;

  // Only options this category has products for are offered (and kept from the URL).
  const available = useMemo(() => availableOptions(products), [products]);
  // The URL is the source of truth, so links restore filters and Back/Forward step through them.
  const filters = useMemo(
    () => withinOptions(parseCatalogSearch(search), available),
    [search, available],
  );
  const filterKey = JSON.stringify(toCatalogSearch(filters));
  const setFilters = (next: ProductFilters) =>
    void navigate({ search: (prev) => ({ ...prev, ...toCatalogSearch(next) }), resetScroll: false });

  const filtered = useMemo(() => filterProducts(products, filters), [products, filters]);
  const counts = useMemo(() => facetCounts(products, filters), [products, filters]);
  const tags = activeFilterTags(filters);
  const active = hasActiveFilters(filters);

  // Return to the first page whenever the filters change.
  const [pageState, setPageState] = useState({ key: filterKey, page: 0 });
  const page = pageState.key === filterKey ? pageState.page : 0;
  const setPage = (next: number) => setPageState({ key: filterKey, page: next });

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
                {CATEGORY_TITLES[category]}
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
              {category === "sink" ? (
                "Premium stainless steel sinks designed for lasting durability, easy maintenance, and a clean, modern finish for every kitchen."
              ) : category === "edge-tape" ? (
                "Matching edge banding in every board finish."
              ) : category === "rubbish-bin" ? (
                "Smooth, soft-close pull-out waste bins designed for effortless organisation and a clean, clutter-free kitchen."
              ) : (
                <>
                  Explore our curated range of quality interior products, designed for modern spaces.
                  From versatile MDF boards discover solutions that combine functionality with
                  contemporary design.
                </>
              )}
            </p>          </div>
          <select aria-label="Category" value={category} onChange={(event) => void navigate({ search: { category: parseProductCategory(event.target.value), view: "catalog" }, resetScroll: false })} className="catalog-category mt-3">
            {PRODUCT_CATEGORIES.map((item) => <option key={item.id} value={item.id}>{categoryOptionLabel(item)}</option>)}
          </select>
        </div>
      </section>

      {category === "sink" ? <SinkRange /> : category === "rubbish-bin" ? <BinRange /> : <section className="product-catalog-layout">
        <aside hidden={!hasFilters} className="catalog-filter-sidebar" aria-label="Product filters">
          <FilterPanel filters={filters} counts={counts} available={available} onChange={setFilters} idPrefix="sidebar-filter" />
        </aside>

        <div className={!hasFilters ? "col-span-full" : undefined}>
          {hasFilters && (
            <div className="catalog-results-bar">
              <Sheet>
                <SheetTrigger className="catalog-filter-trigger">
                  Filters{active ? ` (${tags.length})` : ""}
                </SheetTrigger>
                <SheetContent side="left" className="catalog-filter-drawer">
                  <SheetTitle className="sr-only">Product filters</SheetTitle>
                  <SheetDescription className="sr-only">Results update as you choose filters.</SheetDescription>
                  <FilterPanel filters={filters} counts={counts} available={available} onChange={setFilters} idPrefix="drawer-filter">
                    <SheetClose className="catalog-filter-apply">
                      Show {filtered.length} {filtered.length === 1 ? "result" : "results"}
                    </SheetClose>
                  </FilterPanel>
                </SheetContent>
              </Sheet>
              <p role="status" aria-live="polite" className="catalog-result-count">
                {plural(filtered.length)}
              </p>
              {tags.length > 0 && (
                <ul className="catalog-active-filters" aria-label="Active filters">
                  {tags.map((tag) => (
                    <li key={tag.id}>
                      <button type="button" onClick={() => setFilters(tag.remove(filters))} aria-label={`Remove ${tag.label} filter`}>
                        {tag.label}
                        <X aria-hidden="true" className="h-3 w-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {active && (
                <button type="button" className="catalog-clear-all" onClick={() => setFilters(EMPTY_PRODUCT_FILTERS)}>
                  Clear all
                </button>
              )}
            </div>
          )}

          <div key={`${filterKey}:${page}`} className="catalog-grid catalog-grid-fade">
            {visible.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
          {filtered.length === 0 && (
            products.length === 0 ? (
              <p role="status" className="py-16 text-center">No products available in this category yet.</p>
            ) : (
              <div className="catalog-empty">
                <p role="status">No products match your filters</p>
                <button type="button" onClick={() => setFilters(EMPTY_PRODUCT_FILTERS)}>Clear filters</button>
              </div>
            )
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
