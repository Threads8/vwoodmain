export type Layout = "l-shaped" | "u-shaped" | "parallel" | "island";
export type CabinetStyle = "handleless" | "shaker" | "flat-panel" | "glass-front";

type Option<Id extends string> = {
  id: Id;
  /** Short name for captions, chips and the quote summary. */
  label: string;
  /** Full name shown on the selection card. */
  title: string;
  desc?: string;
  image: string;
  alt: string;
};

// The photos in the supplied frames were not exported, so the cards use the closest existing site photos.
export const LAYOUTS: Option<Layout>[] = [
  {
    id: "l-shaped",
    label: "L-Shaped",
    title: "L-Shaped Kitchen",
    desc: "Ideal for corner spaces",
    image: "/kitchen-options/l-shaped.png",
    alt: "White L-shaped kitchen with counters along two walls",
  },
  {
    id: "u-shaped",
    label: "U-Shaped",
    title: "U-Shaped Kitchen",
    desc: "Designed around three sides",
    image: "/kitchen-options/u-shaped.png",
    alt: "White U-shaped kitchen with cabinets around three sides",
  },
  {
    id: "parallel",
    label: "Parallel Shaped",
    title: "Parallel Shaped Kitchen",
    desc: "A practical two-sided layout",
    image: "/images/gallery-14.jpg",
    alt: "Sage kitchen with two facing runs of cabinets",
  },
  {
    id: "island",
    label: "Island",
    title: "Island Kitchen",
    desc: "Features a central island",
    image: "/kitchen-options/island.jpg",
    alt: "Timber kitchen with a central island and bar stools",
  },
];

export const CABINET_STYLES: Option<CabinetStyle>[] = [
  {
    id: "handleless",
    label: "Handleless",
    title: "Handleless Cabinets",
    image: "/images/gallery-4.jpg",
    alt: "White handleless cabinets with smooth, uninterrupted doors",
  },
  {
    id: "shaker",
    label: "Shaker",
    title: "Shaker Cabinets",
    image: "/kitchen-options/shaker.jpg",
    alt: "White kitchen with framed Shaker-style cabinet doors",
  },
  {
    id: "flat-panel",
    label: "Flat Panel",
    title: "Flat Panel Cabinets",
    image: "/images/gallery-8.jpg",
    alt: "Oak flat panel cabinets with slim metal handles",
  },
  {
    id: "glass-front",
    label: "Glass Front",
    title: "Glass Front Cabinets",
    image: "/images/gallery-7.jpg",
    alt: "White kitchen with tall glass front display cabinets",
  },
];

export const layoutLabel = (id: Layout) => LAYOUTS.find((option) => option.id === id)?.label ?? id;
export const cabinetStyleLabel = (id: CabinetStyle) =>
  CABINET_STYLES.find((option) => option.id === id)?.label ?? id;

export const isLayout = (value: unknown): value is Layout =>
  LAYOUTS.some((option) => option.id === value);
export const isCabinetStyle = (value: unknown): value is CabinetStyle =>
  CABINET_STYLES.some((option) => option.id === value);
