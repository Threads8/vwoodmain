import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Lightbulb, Heart, Users, Award } from "lucide-react";
import { Page } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@800&display=swap",
      },
    ],
    meta: [
      { title: "About iWood — Crafting Dreams into Reality" },
      {
        name: "description",
        content:
          "A 100% NZ owned company bringing world-class kitchen products to New Zealand since 2017.",
      },
      { property: "og:title", content: "About iWood — Crafting Dreams into Reality" },
      { property: "og:description", content: "Our story, mission, vision and values." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/images/about-0.jpg" },
      { name: "twitter:image", content: "/images/about-0.jpg" },
    ],
  }),
  component: About,
});

const VALUES = [
  [
    Leaf,
    "Sustainability",
    "We source responsibly and prioritise eco-friendly materials, ensuring our beautiful kitchens don't compromise the planet's future.",
  ],
  [
    Lightbulb,
    "Innovation",
    "We continuously evolve our techniques and embrace new technologies while honoring traditional woodworking principles.",
  ],
  [
    Heart,
    "Passion",
    "Our love for creating beautiful spaces drives everything we do, from initial concept to final installation.",
  ],
  [
    Users,
    "Collaboration",
    "We work closely with our clients, architects, and designers to bring visions to life through partnership.",
  ],
  [
    Award,
    "Excellence",
    "We never settle for good enough. Every kitchen must meet our exacting standards before it reaches your home.",
  ],
] as const;

function About() {
  return (
    <Page overlay>
      <section className="about-hero relative overflow-hidden">
        <img
          src={"/images/about-0.jpg"}
          alt="Minimal kitchen island with pendant lights"
          className="about-hero-image"
        />
        <div className="about-hero-panel relative z-10 text-kitchen-light">
          <h1 className="font-serif font-semibold">
            Crafting Dreams into
            <br />
            Reality
          </h1>
          <p className="mt-[clamp(14px,1.6vw,22px)] font-body text-[clamp(14px,1.05vw,15px)] leading-[1.65] text-about-intro">
            For over a decade, Vwood has been helping its costumer to transform living spaces into
            masterpieces of design and functionality, bringing together premium materials and
            services.
          </p>
          <Button
            asChild
            className="mt-6 h-[46px] w-auto rounded-lg bg-about-cta px-6 font-body text-[15px] font-medium text-kitchen-light hover:bg-about-cta/90"
          >
            <Link to="/project-gallery">View Projects</Link>
          </Button>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story-grid">
          <div className="font-body text-[clamp(14px,1.05vw,15px)] leading-[1.75] text-about-body">
            <h2 className="mb-6 font-serif text-h2 font-semibold text-about-heading">
              Our Story
            </h2>
            <p className="mb-6">
              Vwood is a 100% NZ owned and operated company, established in 2017 to bring
              world-class kitchen products to the New Zealand market. We import from leading global
              manufacturers, offering a diverse range of our products designed to meet the needs of
              both high-end design firms and individual manufacturers.
            </p>
            <h3 className="font-extrabold">Our Mission</h3>
            <p className="mb-6">
              To fill the gaps in New Zealand's wood industry by offering quality, innovative
              products at the right price — with a focus on variety, from finishes to colour ranges
              — so that every project, big or small, has access to the materials it deserves.
            </p>
            <h3 className="font-extrabold">Our Vision</h3>
            <p>
              To become New Zealand's one-stop shop for premium kitchen products, known for bringing
              new innovations to the table and raising the standard of quality and choice across the
              industry.
            </p>
          </div>
          <div className="relative mb-8">
            <img
              src="/images/about-1.jpg"
              alt="Wood cabinetry detail"
              className="about-story-image"
              loading="lazy"
            />
            <div className="absolute -bottom-8 left-0 rounded-(--radius-card) bg-about-highlight px-7 py-6 font-body text-kitchen-light lg:-left-8">
              <p className="text-[clamp(22px,1.8vw,26px)] leading-9 font-bold">10+</p>
              <p className="text-sm leading-5">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <h2 className="font-heading text-h2 font-bold text-about-heading">
          Our Values
        </h2>
        <p className="mx-auto mt-3 max-w-[720px] font-heading text-lead text-stone-body">
          The principles that guide every decision, every design, and every kitchen we create
        </p>
        <div className="about-values-grid">
          {VALUES.map(([I, t, d], i) => (
            <div key={t} className={`about-value about-value-${i + 1}`}>
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-about-icon-bg text-about-highlight">
                <I className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-body text-h3 font-semibold text-about-heading">
                {t}
              </h3>
              <p className="mx-auto mt-3 max-w-[320px] font-body text-copy text-stone-body">
                {d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
