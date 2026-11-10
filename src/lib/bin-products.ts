import { PRODUCT_DETAILS } from "./product-details";
import { productSlug } from "./product-slug";

// Content and assets transcribed from the supplied Figma exports.
export type BinProduct = {
  slug: string;
  name: string;
  desc: string;
  image: string;
  detailSlug?: string;
};

export type BinDetailProduct = {
  categoryId: "rubbish-bin";
  slug: string;
  name: string;
  desc: string;
  code: string;
  swatch: string;
  surfaceDesc: string;
  features: string[];
};

export const BIN_PRODUCTS: BinProduct[] = [
  {
    slug: "rubbish-bin-1",
    name: "Rubbish Bin",
    desc: "Premium natural timber veneer with a deep horizontal grain and organic tactile warmth.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/ae1e35e20dd4ca404b6d1e3da381891717cff501?width=526",
    detailSlug: productSlug("WB.0240.C"),
  },
  {
    slug: "rubbish-bin-2",
    name: "Rubbish Bin",
    desc: "High-durability seamless polymer surface with anti-fingerprint technology in matte charcoal.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/a8d32a4059c6044a1da1b6885a41fa23579f410b?width=526",
    detailSlug: productSlug("WB.0240.E"),
  },
  {
    slug: "rubbish-bin-3",
    name: "Rubbish Bin",
    desc: "Acrylic-based surface offering an ultra-matte, velvety touch with thermal healing properties.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/59b1ae3600b24c80a037caa73bf1acb8b22dc802?width=526",
    detailSlug: productSlug("WB.0144"),
  },
  {
    slug: "rubbish-bin-4",
    name: "Rubbish Bin",
    desc: "Premium natural timber veneer with a deep horizontal grain and organic tactile warmth.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/ae1e35e20dd4ca404b6d1e3da381891717cff501?width=526",
    detailSlug: productSlug("WB.0143"),
  },
  {
    slug: "rubbish-bin-5",
    name: "Rubbish Bin",
    desc: "High-durability seamless polymer surface with anti-fingerprint technology in matte charcoal.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/ae1e35e20dd4ca404b6d1e3da381891717cff501?width=526",
    detailSlug: productSlug("WB.0240.A"),
  },
  {
    slug: "drawer-runner",
    name: "Drawer Runner",
    desc: "Acrylic-based surface offering an ultra-matte, velvety touch with thermal healing properties.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/ab43f443ac7ce99578675e10f8245cdd841d2838?width=1092",
    detailSlug: productSlug("SL6118"),
  },
];

/**
 * Detail pages are keyed by a slug built from the supplier code (never the shared "Rubbish Bin"
 * name), so each bin has its own URL. PRODUCT_DETAILS uses the same slugs.
 */
const detailRecords: (Pick<BinDetailProduct, "name" | "desc"> & { code: string })[] = [
  {
    code: "WB.0240.C",
    name: "Rubbish Bin",
    desc: "Smooth, soft-close pull-out waste bins designed for effortless organisation and a clean, clutter-free kitchen.",
  },
  {
    code: "WB.0240.A",
    name: "Rubbish Bin",
    desc: "Rubbish bin for 300mm cabinets. Code WB.0240.A, W265 x D500 x H500mm.",
  },
  {
    code: "WB.0240.E",
    name: "Rubbish Bin",
    desc: "Rubbish bin, code WB.0240.E, W415×D500×H500mm.",
  },
  {
    code: "WB.0144",
    name: "Rubbish Bin",
    desc: "Round rubbish bin, code WB.0144, R255*L310*H330mm.",
  },
  {
    code: "WB.0143",
    name: "Rubbish Bin",
    desc: "Rubbish bin, code WB.0143, W340×D480×H425mm.",
  },
  {
    code: "SL6118",
    name: "Drawer Runner",
    desc: "Drawer runner, code SL6118. H118mm x L350mm x T1.2mm, one pair per bag with 12 screws each.",
  },
];

/** Earlier detail URLs, kept working: the product page redirects them to the code-based slug. */
export const LEGACY_BIN_SLUGS: Readonly<Record<string, string>> = {
  "pull-out-rubbish-bin": productSlug("WB.0240.C"),
  "rubbish-bin-wb-0240-a": productSlug("WB.0240.A"),
  "drawer-runner": productSlug("SL6118"),
};

export const BIN_DETAIL_PRODUCTS: BinDetailProduct[] = detailRecords.map(({ code, ...record }) => {
  const slug = productSlug(code);
  const detail = PRODUCT_DETAILS[slug];
  return {
    ...record,
    slug,
    categoryId: "rubbish-bin",
    code,
    swatch: detail?.color ?? "#FFF",
    surfaceDesc: detail?.surfaceDesc ?? "",
    features: detail?.features ?? [],
  };
});
