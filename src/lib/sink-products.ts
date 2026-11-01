import { PRODUCT_DETAILS } from "./product-details";

// Content and assets transcribed from the supplied Figma exports.
export type SinkProduct = {
  categoryId: "sink";
  slug: string;
  name: string;
  desc: string;
  image: string;
  code: string;
  swatch: string;
  surfaceDesc: string;
  features: string[];
};

const raw: Pick<SinkProduct, "slug" | "name" | "desc" | "image">[] = [
  {
    slug: "single-bowl-sink-square",
    name: "Single Bowl Sink",
    desc: "Premium natural timber veneer with a deep horizontal grain and organic tactile warmth.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/73e36c714baabc1998bc3b40b4310ded068f8d5b?width=526",
  },
  {
    slug: "single-bowl-sink-wide",
    name: "Single Bowl Sink",
    desc: "High-durability seamless polymer surface with anti-fingerprint technology in matte charcoal.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/07e4cecec6ec96f2eba42b4c58f6c85254fbcd6b?width=526",
  },
  {
    slug: "one-and-a-half-bowl-sink",
    name: "One and a Half Bowl Sink",
    desc: "Acrylic-based surface offering an ultra-matte, velvety touch with thermal healing properties.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/abd61b660be1bd3f6534170c17ea5221c28925d8?width=534",
  },
];

export const SINK_PRODUCTS: SinkProduct[] = raw.map((sink) => {
  const detail = PRODUCT_DETAILS[sink.slug];
  return {
    ...sink,
    categoryId: "sink",
    code: detail?.code ?? "",
    swatch: detail?.color ?? "#FFF",
    surfaceDesc: detail?.surfaceDesc ?? "",
    features: detail?.features ?? [],
  };
});
