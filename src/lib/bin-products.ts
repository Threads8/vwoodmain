import { PRODUCT_DETAILS } from "./product-details";

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
    detailSlug: "pull-out-rubbish-bin",
  },
  {
    slug: "rubbish-bin-2",
    name: "Rubbish Bin",
    desc: "High-durability seamless polymer surface with anti-fingerprint technology in matte charcoal.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/a8d32a4059c6044a1da1b6885a41fa23579f410b?width=526",
    detailSlug: "rubbish-bin-wb-0240-a",
  },
  {
    slug: "rubbish-bin-3",
    name: "Rubbish Bin",
    desc: "Acrylic-based surface offering an ultra-matte, velvety touch with thermal healing properties.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/59b1ae3600b24c80a037caa73bf1acb8b22dc802?width=526",
  },
  {
    slug: "rubbish-bin-4",
    name: "Rubbish Bin",
    desc: "Premium natural timber veneer with a deep horizontal grain and organic tactile warmth.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/ae1e35e20dd4ca404b6d1e3da381891717cff501?width=526",
    detailSlug: "pull-out-rubbish-bin",
  },
  {
    slug: "rubbish-bin-5",
    name: "Rubbish Bin",
    desc: "High-durability seamless polymer surface with anti-fingerprint technology in matte charcoal.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/13ef7dcb929d0afdc4e64399f1d950a52cab517f?width=526",
  },
  {
    slug: "drawer-runner",
    name: "Drawer Runner",
    desc: "Acrylic-based surface offering an ultra-matte, velvety touch with thermal healing properties.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/ab43f443ac7ce99578675e10f8245cdd841d2838?width=1092",
    detailSlug: "drawer-runner",
  },
];

const detailRecords: Pick<BinDetailProduct, "slug" | "name" | "desc">[] = [
  {
    slug: "pull-out-rubbish-bin",
    name: "Rubbish Bin",
    desc: "Smooth, soft-close pull-out waste bins designed for effortless organisation and a clean, clutter-free kitchen.",
  },
  {
    slug: "rubbish-bin-wb-0240-a",
    name: "Rubbish Bin",
    desc: "Rubbish bin for 300mm cabinets. Code WB.0240.A, W265 x D500 x H500mm.",
  },
  {
    slug: "drawer-runner",
    name: "Drawer Runner",
    desc: "Drawer runner, code SL6118. H118mm x L350mm x T1.2mm, one pair per bag with 12 screws each.",
  },
];

export const BIN_DETAIL_PRODUCTS: BinDetailProduct[] = detailRecords.map((record) => {
  const detail = PRODUCT_DETAILS[record.slug];
  return {
    ...record,
    categoryId: "rubbish-bin",
    code: detail?.code ?? "",
    swatch: detail?.color ?? "#FFF",
    surfaceDesc: detail?.surfaceDesc ?? "",
    features: detail?.features ?? [],
  };
});
