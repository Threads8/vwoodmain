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
    image: "https://api.builder.io/api/v1/image/assets/TEMP/c7502135c96a6738ead73457696ceadd56acb45b?width=1098",
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
    image: "https://api.builder.io/api/v1/image/assets/TEMP/28dc7ee5145c8995a626ca677ef79bf9901b5411?width=1082",
    detailSlug: productSlug("WB.0143"),
  },
  {
    slug: "rubbish-bin-5",
    name: "Rubbish Bin",
    desc: "High-durability seamless polymer surface with anti-fingerprint technology in matte charcoal.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/6dbc4b3ff29cb268bf544714f079133f8b7528ab?width=1110",
    detailSlug: productSlug("WB.0240.A"),
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
    desc: "Rubbish bin, code WB.0240.A, W(265)XD(500)XH(500mm). For 300mm Cabinet, 18L+6Lr.",
  },
  {
    code: "WB.0240.E",
    name: "Rubbish Bin",
    desc: "Rubbish bin, code WB.0240.E, W(415)XD(500)XH(500mm). For 450mm Cabinet, 30L+30L.",
  },
  {
    code: "WB.0144",
    name: "Rubbish Bin",
    desc: "Round rubbish bin, code WB.0144, R(255)XL(310)XH(330mm).",
  },
  {
    code: "WB.0143",
    name: "Rubbish Bin",
    desc: "Rubbish bin, code WB.0143, W(340)XD(480)XH(425mm). For 400mm Cabinet, 20L+20L.",
  },
];

/** Earlier detail URLs, kept working: the product page redirects them to the code-based slug. */
export const LEGACY_BIN_SLUGS: Readonly<Record<string, string>> = {
  "pull-out-rubbish-bin": productSlug("WB.0240.C"),
  "rubbish-bin-wb-0240-a": productSlug("WB.0240.A"),
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
