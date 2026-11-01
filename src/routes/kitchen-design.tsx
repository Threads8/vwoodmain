import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Page } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { KITCHEN_HERO, KITCHEN_DESIGNS } from "@/lib/kitchen-images";
import { IMG } from "@/lib/site-data";
import woodFinish from "@/assets/wood-finish-kitchen.jpg";
import white from "@/assets/white-kitchen.jpg";
import sage from "@/assets/sage-kitchen.jpg";

export const Route = createFileRoute("/kitchen-design")({
  head: () => ({
    meta: [
      { title: "Kitchen Design — Let's Create Your Dream Kitchen | iWood" },
      {
        name: "description",
        content:
          "Choose a layout, cabinet style and finishes, and get a personalised kitchen quote from iWood.",
      },
      { property: "og:title", content: "Let's Create Your Dream Kitchen" },
      {
        property: "og:description",
        content: "Premium boards, edge tapes, hardware and accessories for NZ kitchens.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: IMG.woodKitchen },
      { name: "twitter:image", content: IMG.woodKitchen },
    ],
  }),
  component: Kitchen,
});

const COLLECTIONS = [
  {
    title: "Acrylic Finish",
    img: white,
    desc: "Premium acrylic finishes with a smooth, mirror-like gloss, bringing modern elegance to kitchens, wardrobes, and cabinetry.",
  },
  {
    title: "Wood Finish",
    img: woodFinish,
    desc: "Rich hardwood veneers and solid timber options for warmth and natural beauty.",
  },
  {
    title: "Hardware",
    img: sage,
    desc: "Precision-engineered hardware that combines function with elegant design.",
  },
];

const STEPS = [
  {
    title: "Select Layout",
    desc: "Choose from our collection of proven kitchen layouts that maximize space and functionality.",
  },
  {
    title: "Cabinet Style",
    desc: "Select cabinet designs that reflect your aesthetic preferences and storage requirements.",
  },
  {
    title: "Materials & Finishes",
    desc: "Explore premium materials, colors, and textures to create your perfect palette.",
  },
  { title: "Submit Inquiry", desc: "Receive your personalised quote and connect with our team." },
];

function Kitchen() {
  return (
    <Page overlay>
      <section className="kitchen-hero relative flex items-end justify-center overflow-hidden">
        <img
          src={KITCHEN_HERO}
          alt="Wood kitchen with marble splashback"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="kitchen-hero-panel relative z-10 font-display text-kitchen-light">
          <p className="kitchen-hero-intro font-medium">
            From premium decorative boards and matching edge tapes to modern kitchen hardware and
            accessories, Vwood brings together the products you need to create beautiful, functional
            spaces.
            <br />
            100% New Zealand owned and operated, serving the NZ market since 2017.
          </p>
          <div className="kitchen-hero-title">
            <h1>
              Let’s Create your<span>Dream Kitchen</span>
            </h1>
            <Button
              asChild
              className="kitchen-hero-cta bg-kitchen-cta font-display font-medium text-kitchen-light shadow-kitchen-cta hover:bg-kitchen-cta/90"
            >
              <Link to="/kitchen-design/layout">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="kitchen-design-section">
        <div className="kitchen-design-container">
          <h2 className="font-body text-h2 font-bold text-design-heading">
            Type of Design
          </h2>
          <p className="mx-auto mt-3 max-w-[672px] font-body text-lead text-design-body">
            From premium materials to complete kitchen solutions, we offer everything you need to
            create your dream space.
          </p>
          <div className="kitchen-design-grid">
            {KITCHEN_DESIGNS.map((src, i) => [
              src,
              ["Modern Timber", "Classic Shaker", "Minimal Island"][i],
            ]).map(([src, t]) => (
              <figure key={t} className="kitchen-design-card group">
                <img
                  src={src}
                  alt={`${t} kitchen design`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none motion-safe:group-hover:scale-105"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container text-center">
          <h2
            className="font-heading text-h2 font-bold"
            style={{ color: "rgba(62,39,23,0.85)" }}
          >
            Featured Collections
          </h2>
          <p
            className="mx-auto mt-3 max-w-2xl font-heading text-lead"
            style={{ color: "rgba(62,39,23,0.80)" }}
          >
            Discover our curated selection of premium kitchen materials and finishes that define
            modern luxury.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {COLLECTIONS.map((c) => (
              <Link
                key={c.title}
                to="/products"
                className="group block overflow-hidden rounded-(--radius-card) border border-border bg-background text-left"
              >
                <div className="h-52 w-full overflow-hidden md:h-56">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="font-body text-h3 font-semibold"
                    style={{ color: "rgba(62,39,23,0.80)" }}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-3 font-body text-copy text-stone-body">{c.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-3 font-body text-[15px] font-medium text-brand">
                    Explore Collection <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section bg-sand">
        <div className="site-container text-center">
          <h2 className="font-heading text-h2 font-bold text-stone-ink">
            Create Your Kitchen
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-heading text-lead text-stone-body">
            Our guided process ensures every detail is perfect, from initial concept to final
            installation.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="flex flex-col items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-brand font-body text-xl font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-body text-h3 font-semibold text-stone-ink">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-[280px] font-body text-copy text-stone-body">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <Link
            to="/kitchen-design/layout"
            className="mt-10 inline-flex h-[46px] items-center rounded-(--radius-control) bg-brand px-6 font-body text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Start Kitchen Design
          </Link>
        </div>
      </section>
    </Page>
  );
}
