import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Page } from "@/components/site/Layout";
import { HeroMaterials } from "@/components/site/HeroMaterials";
import { formFields, sendEnquiry } from "@/lib/enquiry";
import { IMG } from "@/lib/site-data";
import ravenBlackMatt from "@/assets/featured/raven-black-matt.jpg";
import acrylicCollection from "@/assets/collections/acrylic-finish.jpg";
import woodCollection from "@/assets/collections/wood-finish.jpg";
import hardwareCollection from "@/assets/collections/hardware.jpg";
import inspiration1 from "@/assets/inspiration/inspiration-1.jpg";
import inspiration2 from "@/assets/inspiration/inspiration-2.jpg";
import inspiration3 from "@/assets/inspiration/inspiration-3.jpg";
import inspiration4 from "@/assets/inspiration/inspiration-4.jpg";
import project from "@/assets/project-kitchen.jpg";
import samples from "@/assets/contact-samples.webp";
import recent1 from "@/assets/recent/recent-project-1.png";
import recent2 from "@/assets/recent/recent-project-2.png";
import recent3 from "@/assets/recent/recent-project-3.png";
import recent4 from "@/assets/recent/recent-project-4.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iWood Interiors — Interiors that last a Lifetime" },
      { name: "description", content: "Premium MDF boards, modern fittings, and smart kitchen solutions — all in one place." },
      { property: "og:title", content: "iWood Interiors — Interiors that last a Lifetime" },
      { property: "og:description", content: "Premium MDF boards, modern fittings, and smart kitchen solutions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: IMG.homeHero },
      { name: "twitter:image", content: IMG.homeHero },
    ],
  }),
  component: Home,
});

const FEATURED = [
  ["https://api.builder.io/api/v1/image/assets/TEMP/0534ae14cc9621bd0e00277bbed8f18b73e1bcbf?width=728", "Classic Walnut", "classic-walnut"],
  ["https://api.builder.io/api/v1/image/assets/TEMP/109122586a9a27e7127183512f4214bf1e8c8d5a?width=740", "Sand Dune", "sand-dune"],
  ["https://api.builder.io/api/v1/image/assets/TEMP/b13a8210851a49c92311d8160ed25a5db70e3a56?width=738", "Washed Maple Wood Natural", "washed-maple-wood-natural"],
  [IMG.woodKitchen, "Rural Oak", "rural-oak"],
  [ravenBlackMatt, "Raven Black Matt", "raven-black-matt"],
  ["https://api.builder.io/api/v1/image/assets/TEMP/a17ebcd6d189bed4ee6c7cccb66698eee962799f?width=728", "Olive Super Matt", "olive-super-matt"],
] as const;

const COLLECTIONS = [
  [acrylicCollection, "Acrylic Finish", "Premium acrylic finishes with a smooth, mirror-like gloss, bringing modern elegance to kitchens, wardrobes, and cabinetry."],
  [woodCollection, "Wood Finish", "Rich hardwood veneers and solid timber options for warmth and natural beauty."],
  [hardwareCollection, "Hardware", "Precision-engineered hardware and that combine function with elegant design."],
] as const;

const INSPIRATION = [inspiration1, inspiration2, inspiration3, inspiration4];

const RECENT_PROJECTS = [recent1, recent2, recent3, recent4];

const STEPS = [
  ["Select Layout", "Choose from our collection of proven kitchen layouts that maximize space and functionality."],
  ["Cabinet Style", "Select cabinet designs that reflect your aesthetic preferences and storage requirements."],
  ["Materials & Finishes", "Explore premium materials, colors, and textures to create your perfect palette."],
  ["Submit Inquiry", "Receive your personalised quote and connect with our team."],
];

const REVIEWS = [
  ["Kitchen Experts", "We love the variety of colours and finishes available at VWood. Their woodgrain range is particularly impressive, and having matching edge tapes makes it much easier to achieve a consistent finish across our projects."],
  ["Trader Kitchen & Joinery Ltd", "Great range, good prices, and excellent service. We've had a really positive experience dealing with VWood and would definitely recommend them to others in the industry."],
  ["All About Kitchen & Building Ltd", "Finding a supplier who understands the needs of it's customers makes a big difference. VWood offers a good selection of materials, competitive pricing, and helpful customer support. We're pleased to have them as one of our suppliers."],
  ["Sleek Kitchens", "What we appreciate most about VWood is their customer service. Whether it's checking stock, arranging deliveries, or finding the right finish, they're always approachable and willing to help. It's been a pleasure working with them."],
  ["Trufit Kitchen", "VWoods's range of colours and finishes gives us plenty of options for our projects. Their team is easy to deal with, quick to respond to enquiries, and always happy to help with samples and product information."],
] as const;

/** Initials for a business name, skipping "&" and "Ltd" (e.g. "Trader Kitchen & Joinery Ltd" → "TK"). */
const initials = (name: string) =>
  name.split(/\s+/).filter((word) => /^[A-Za-z]/.test(word) && word !== "Ltd").slice(0, 2).map((word) => word[0]).join("");

function Testimonials() {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 });
  };
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  // Moves by one card (card width + gap), so each click lands on the next snap point.
  const step = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <section className="site-section" aria-labelledby="testimonials-heading">
      <div className="site-container">
        <div className="home-reviews-head">
          <div>
            <h2 id="testimonials-heading" className="font-heading text-h2 font-bold text-review">What Our Clients Say</h2>
            <p className="mt-3 font-heading text-lead text-review-muted">Trusted by kitchen and joinery businesses</p>
          </div>
          <div className="home-reviews-nav">
            <button type="button" className="home-reviews-btn" onClick={() => step(-1)} disabled={edges.start} aria-label="Previous testimonial"><ChevronLeft aria-hidden className="h-5 w-5" /></button>
            <button type="button" className="home-reviews-btn" onClick={() => step(1)} disabled={edges.end} aria-label="Next testimonial"><ChevronRight aria-hidden className="h-5 w-5" /></button>
          </div>
        </div>
        <ul ref={track} className="home-reviews-track font-body" onScroll={update} aria-label="Testimonials">
          {REVIEWS.map(([name, quote]) => (
            <li key={name} className="home-review">
              <div className="flex gap-0.5 text-primary" role="img" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, k) => <Star key={k} aria-hidden className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="home-review-quote text-copy">“{quote}”</blockquote>
              <div className="home-review-author">
                <span aria-hidden className="home-review-avatar">{initials(name)}</span>
                <p className="text-base font-semibold leading-6 text-review">{name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeatureIcon({ d, w }: { d: string; w: number }) {
  return <svg aria-hidden width={w} height={24} viewBox={`0 0 ${w} 24`} fill="none"><path d={d} fill="#7D6A4F" /></svg>;
}

const FEATURES = [
  [18, "M8.14689 0.257617C8.66251 -0.0845703 9.33751 -0.0845703 9.85314 0.257617L10.6875 0.806055C10.9688 0.988867 11.2969 1.07793 11.6297 1.05918L12.6281 0.998242C13.2469 0.960742 13.8281 1.29824 14.1047 1.85137L14.5547 2.74668C14.7047 3.04668 14.9485 3.28574 15.2438 3.43574L16.1485 3.89043C16.7016 4.16699 17.0391 4.74824 17.0016 5.36699L16.9406 6.36543C16.9219 6.69824 17.011 7.03105 17.1938 7.30762L17.7469 8.14199C18.0891 8.65762 18.0891 9.33262 17.7469 9.84824L17.1938 10.6873C17.011 10.9686 16.9219 11.2967 16.9406 11.6295L17.0016 12.6279C17.0391 13.2467 16.7016 13.8279 16.1485 14.1045L15.2531 14.5545C14.9531 14.7045 14.7141 14.9482 14.5641 15.2436L14.1094 16.1482C13.8328 16.7014 13.2516 17.0389 12.6328 17.0014L11.6344 16.9404C11.3016 16.9217 10.9688 17.0107 10.6922 17.1936L9.85783 17.7467C9.3422 18.0889 8.6672 18.0889 8.15158 17.7467L7.31251 17.1936C7.03126 17.0107 6.70314 16.9217 6.37033 16.9404L5.37189 17.0014C4.75314 17.0389 4.17189 16.7014 3.89533 16.1482L3.44533 15.2529C3.29533 14.9529 3.05158 14.7139 2.75626 14.5639L1.85158 14.1092C1.29845 13.8326 0.960951 13.2514 0.998451 12.6326L1.05939 11.6342C1.07814 11.3014 0.989076 10.9686 0.806264 10.692L0.257826 9.85293C-0.0843613 9.33731 -0.0843613 8.6623 0.257826 8.14668L0.806264 7.3123C0.989076 7.03105 1.07814 6.70293 1.05939 6.37012L0.998451 5.37168C0.960951 4.75293 1.29845 4.17168 1.85158 3.89512L2.74689 3.44512C3.04689 3.29043 3.29064 3.04668 3.44064 2.74668L3.89064 1.85137C4.1672 1.29824 4.74845 0.960742 5.3672 0.998242L6.36564 1.05918C6.69845 1.07793 7.03126 0.988867 7.30783 0.806055L8.14689 0.257617ZM12.75 8.99981C12.75 8.00524 12.3549 7.05142 11.6517 6.34815C10.9484 5.64489 9.99458 5.2498 9.00001 5.2498C8.00545 5.2498 7.05162 5.64489 6.34836 6.34815C5.6451 7.05142 5.25001 8.00524 5.25001 8.99981C5.25001 9.99437 5.6451 10.9482 6.34836 11.6515C7.05162 12.3547 8.00545 12.7498 9.00001 12.7498C9.99458 12.7498 10.9484 12.3547 11.6517 11.6515C12.3549 10.9482 12.75 9.99437 12.75 8.99981ZM0.0609512 20.7092L2.08126 15.9045C2.09064 15.9092 2.09533 15.9139 2.10001 15.9232L2.55001 16.8186C3.09845 17.9061 4.23751 18.567 5.45626 18.4967L6.4547 18.4357C6.46408 18.4357 6.47814 18.4357 6.48751 18.4451L7.32189 18.9982C7.56095 19.1529 7.81408 19.2748 8.07658 19.3592L6.31408 23.5451C6.20626 23.8029 5.9672 23.9764 5.69064 23.9998C5.41408 24.0232 5.14689 23.8967 4.99689 23.6623L3.48751 21.3514L0.857826 21.7404C0.590639 21.7779 0.323451 21.6701 0.154701 21.4592C-0.0140488 21.2482 -0.0468613 20.9576 0.0562637 20.7092H0.0609512ZM11.686 23.5404L9.92345 19.3592C10.186 19.2748 10.4391 19.1576 10.6781 18.9982L11.5125 18.4451C11.5219 18.4404 11.5313 18.4357 11.5453 18.4357L12.5438 18.4967C13.7625 18.567 14.9016 17.9061 15.45 16.8186L15.9 15.9232C15.9047 15.9139 15.9094 15.9092 15.9188 15.9045L17.9438 20.7092C18.0469 20.9576 18.0094 21.2436 17.8453 21.4592C17.6813 21.6748 17.4094 21.7826 17.1422 21.7404L14.5125 21.3514L13.0031 23.6576C12.8531 23.892 12.586 24.0186 12.3094 23.9951C12.0328 23.9717 11.7938 23.7936 11.686 23.5404Z", "Premium Quality", "Handpicked materials sourced from the finest manufacturers worldwide"],
  [24, "M21.9985 0.904785L23.0953 2.00166C24.2672 3.17354 24.2672 5.07197 23.0953 6.24385L20.4516 8.8876L15.1078 3.54853L17.7516 0.904785C18.9235 -0.26709 20.8219 -0.26709 21.9938 0.904785H21.9985ZM2.1047 16.5563L14.0485 4.60791L19.3922 9.95166L7.44377 21.8954C7.1297 22.2095 6.73595 22.4392 6.30939 22.561L1.43439 23.9532C1.04064 24.0657 0.618767 23.9579 0.328142 23.6673C0.0375172 23.3767 -0.0702954 22.9548 0.0422046 22.561L1.43439 17.686C1.55627 17.2548 1.78595 16.8657 2.10002 16.5517L2.1047 16.5563ZM11.6906 4.84697L4.84689 11.6907L0.750017 7.58916C-0.126545 6.7126 -0.126545 5.2876 0.750017 4.40635L4.41095 0.750098C5.28752 -0.126465 6.71252 -0.126465 7.59377 0.750098L8.52189 1.67822C8.50783 1.69229 8.48908 1.70635 8.47502 1.72041L5.47502 4.72041C5.18439 5.01103 5.18439 5.48916 5.47502 5.77979C5.76564 6.07041 6.24377 6.07041 6.53439 5.77979L9.53439 2.77979C9.54845 2.76572 9.56252 2.74697 9.57658 2.73291L11.6906 4.84697ZM19.1531 12.3095L21.2672 14.4235C21.2531 14.4376 21.2344 14.4517 21.2203 14.4657L18.2203 17.4657C17.9297 17.7563 17.9297 18.2345 18.2203 18.5251C18.511 18.8157 18.9891 18.8157 19.2797 18.5251L22.2797 15.5251C22.2938 15.511 22.3078 15.4923 22.3219 15.4782L23.25 16.411C24.1266 17.2876 24.1266 18.7126 23.25 19.5938L19.5891 23.2501C18.7125 24.1267 17.2875 24.1267 16.4063 23.2501L12.3094 19.1532L19.1531 12.3095Z", "Next Day Delivery", "Reliable kitchen essentials, delivered to your doorstep the very next day."],
  [24, "M12 2.25C6.61406 2.25 2.25 6.61406 2.25 12V13.875C2.25 14.4984 1.74844 15 1.125 15C0.501562 15 0 14.4984 0 13.875V12C0 5.37188 5.37188 0 12 0C18.6281 0 24 5.37188 24 12V18.7547C24 21.0328 22.1531 22.8797 19.8703 22.8797L14.7 22.875C14.3109 23.5453 13.5844 24 12.75 24H11.25C10.0078 24 9 22.9922 9 21.75C9 20.5078 10.0078 19.5 11.25 19.5H12.75C13.5844 19.5 14.3109 19.9547 14.7 20.625L19.875 20.6297C20.9109 20.6297 21.75 19.7906 21.75 18.7547V12C21.75 6.61406 17.3859 2.25 12 2.25ZM6.75 9.75H7.5C8.32969 9.75 9 10.4203 9 11.25V16.5C9 17.3297 8.32969 18 7.5 18H6.75C5.09531 18 3.75 16.6547 3.75 15V12.75C3.75 11.0953 5.09531 9.75 6.75 9.75ZM17.25 9.75C18.9047 9.75 20.25 11.0953 20.25 12.75V15C20.25 16.6547 18.9047 18 17.25 18H16.5C15.6703 18 15 17.3297 15 16.5V11.25C15 10.4203 15.6703 9.75 16.5 9.75H17.25Z", "Expert Support", "Dedicated team guiding you from concept to installation"],
] as const;

function Heading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl px-6 text-center">
      <h2 className="font-heading text-h2 font-bold text-heading/85">{title}</h2>
      {sub && <p className="mt-3 font-heading text-lead text-heading/80">{sub}</p>}
    </div>
  );
}

// Featured products carousel: three cards per slide, auto-advancing and looping.
const AUTOPLAY_DELAY = 4000;
const SLIDE_DURATION = 600;
const SWIPE_THRESHOLD = 40;
const PER_SLIDE = 3;
const FEATURED_PAGES = Array.from({ length: Math.ceil(FEATURED.length / PER_SLIDE) }, (_, page) =>
  FEATURED.slice(page * PER_SLIDE, page * PER_SLIDE + PER_SLIDE).concat(
    FEATURED.slice(0, Math.max(0, page * PER_SLIDE + PER_SLIDE - FEATURED.length)),
  ),
);
// A copy of the first slide sits at the end so the last → first step slides forward seamlessly.
const FEATURED_TRACK = [...FEATURED_PAGES, ...FEATURED_PAGES.slice(0, 1)];

function FeaturedCarousel() {
  const pages = FEATURED_PAGES.length;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [touching, setTouching] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const active = index % pages;

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (hovered || touching || tabHidden) return;
    const id = window.setInterval(() => {
      setAnimate(true);
      setIndex((i) => Math.min(i + 1, pages));
    }, AUTOPLAY_DELAY);
    return () => window.clearInterval(id);
  }, [hovered, touching, tabHidden, timerKey, pages]);

  // After an instant jump (no transition), turn the transition back on once the new position has painted.
  useEffect(() => {
    if (animate) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [animate]);

  const goTo = (i: number) => {
    setAnimate(true);
    setIndex(i);
    setTimerKey((k) => k + 1);
  };

  const step = (dir: 1 | -1) => {
    if (dir === 1) return goTo(Math.min(index + 1, pages));
    if (index > 0) return goTo(index - 1);
    // Going back from the first slide: jump to the trailing copy, then slide back one.
    setAnimate(false);
    setIndex(pages);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimate(true);
        setIndex(pages - 1);
      }),
    );
    setTimerKey((k) => k + 1);
  };

  return (
    <>
      <div
        className="site-container"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={(e) => {
          const t = e.touches[0];
          touchStart.current = t ? { x: t.clientX, y: t.clientY } : null;
          setTouching(true);
        }}
        onTouchEnd={(e) => {
          const start = touchStart.current;
          const t = e.changedTouches[0];
          touchStart.current = null;
          setTouching(false);
          if (!start || !t) return;
          const dx = t.clientX - start.x;
          if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(t.clientY - start.y)) step(dx < 0 ? 1 : -1);
        }}
        onTouchCancel={() => {
          touchStart.current = null;
          setTouching(false);
        }}
      >
        {/* Vertical padding keeps the card shadows from being clipped by the overflow mask. */}
        <div className="-my-1 overflow-hidden py-1" style={{ touchAction: "pan-y" }}>
          <div
            className="flex"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: animate ? `transform ${SLIDE_DURATION}ms ease-in-out` : "none",
            }}
            onTransitionEnd={(e) => {
              if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
              if (index >= pages) {
                setAnimate(false);
                setIndex(0);
              }
            }}
          >
            {FEATURED_TRACK.map((slide, s) => {
              const current = s === index;
              return (
                <div key={s} className="grid w-full shrink-0 gap-6 sm:grid-cols-3" aria-hidden={!current} inert={!current}>
                  {slide.map(([src, name, slug]) => (
                    <Link key={name} to="/products/$slug" params={{ slug }} className="group text-center">
                      <div className="overflow-hidden rounded-(--radius-card) shadow-sm"><img src={src} alt={name} loading="lazy" className="aspect-[364/323] w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                      <p className="mt-3 font-heading text-[clamp(15px,1.2vw,17px)] text-foreground/80">{name}</p>
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-center gap-1">
        {FEATURED_PAGES.map((_, i) => (
          <button key={i} aria-label={`Show slide ${i + 1}`} aria-current={i === active} onClick={() => goTo(i)} className={`h-2.5 w-2.5 rounded-full border border-border shadow ${i === active ? "bg-primary" : "bg-background"}`} />
        ))}
      </div>
    </>
  );
}

function Home() {
  return (
    <Page overlay>
      {/* Hero */}
      <section className="home-hero relative overflow-hidden">
        <HeroMaterials />
        <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end pb-[clamp(16px,1.95vw,28px)] text-primary-foreground">
          <div className="home-hero-band">
            <div className="relative font-display leading-none">
              <span className="absolute top-[42%] right-full mr-2 hidden h-px w-[40vw] bg-primary-foreground/80 md:block" />
              <h1 className="text-hero font-light" style={{ textShadow: "0px 7px 4px rgba(0, 0, 0, 0.34)" }}>Interiors</h1>
              <div className="flex items-end">
                <span className="mr-3 mb-[0.1em] text-right text-[clamp(13px,1.35vw,19px)] leading-[0.98] font-extralight" style={{ textShadow: "0px 7px 4px rgba(0, 0, 0, 0.34)" }}>that<br />last a</span>
                <span className="text-hero font-light" style={{ textShadow: "0px 7px 4px rgba(0, 0, 0, 0.34)" }}>Lifetime</span>
                <span className="absolute bottom-[22%] left-full ml-2 hidden h-px w-[40vw] bg-primary-foreground/80 md:block" />
              </div>
            </div>
            <p className="home-hero-tagline mt-3 px-4">Premium MDF boards, modern fittings, and smart kitchen solutions</p>
            <p className="home-hero-strapline mt-1 px-4">All in one place</p>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="site-section bg-sand">
        <h2 className="mb-10 text-center font-heading text-h2 font-bold text-heading/90">Featured Products</h2>
        <FeaturedCarousel />
      </section>

      {/* Collections */}
      <section className="site-section">
        <Heading title="Featured Collections" sub="Discover our curated selection of premium kitchen materials and finishes that define modern luxury." />
        <div className="site-container grid gap-6 md:grid-cols-3">
          {COLLECTIONS.map(([src, t, d]) => (
            <div key={t} className="overflow-hidden rounded-(--radius-card) border border-border bg-background">
              <img src={src} alt={t} loading="lazy" className="aspect-[5/4] w-full object-cover" />
              <div className="p-6">
                <h3 className="font-body text-h3 font-semibold text-heading/80">{t}</h3>
                <p className="mt-3 font-body text-copy text-stone-body">{d}</p>
                <Link to="/products" className="mt-5 inline-flex items-center gap-2 font-body text-[15px] font-medium text-brand">Explore Collection <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Create your kitchen */}
      <section className="site-section">
        <div className="mx-auto mb-10 max-w-3xl px-6 text-center">
          <h2 className="font-heading text-h2 font-bold text-stone-ink">Create Your Kitchen</h2>
          <p className="mt-3 font-heading text-lead text-stone-body">Our guided process ensures every detail is perfect, from initial concept to final installation.</p>
        </div>
        <div className="site-container grid gap-8 text-center font-body sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([t, d], i) => (
            <div key={t}>
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-xl font-bold text-primary-foreground">{i + 1}</span>
              <h3 className="mt-5 text-h3 font-semibold text-stone-ink">{t}</h3>
              <p className="mx-auto mt-3 max-w-[280px] text-copy text-stone-body">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center"><Link to="/kitchen-design" className="inline-block rounded-(--radius-control) bg-brand px-7 py-3 font-body text-[15px] font-medium leading-6 text-primary-foreground">Start Kitchen Design</Link></div>
      </section>

      {/* Inspiration */}
      <section className="site-section">
        <Heading title="Inspiration Gallery" sub="Explore completed projects that showcase the artistry and craftsmanship of Vwood kitchens." />
        <div className="site-container grid grid-cols-2 gap-4 md:grid-cols-4">
          {INSPIRATION.map((src, i) => <img key={i} src={src} alt="Completed Vwood kitchen" loading="lazy" className="aspect-square w-full rounded-(--radius-card) object-cover" />)}
        </div>
        <div className="mt-8 text-center"><Link to="/kitchen-design" className="inline-block rounded-(--radius-control) border border-brand px-7 py-3 font-body text-[15px] font-medium text-brand">View Full Gallery</Link></div>
      </section>

      {/* Features */}
      <section className="site-container site-section grid gap-10 text-center sm:grid-cols-3">
        {FEATURES.map(([w, d, t, copy]) => (
          <div key={t}>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sand"><FeatureIcon d={d} w={w} /></span>
            <h3 className="mt-4 font-heading text-h3 font-bold text-heading/90">{t}</h3>
            <p className="mx-auto mt-2 max-w-[320px] font-heading text-copy text-heading/70">{copy}</p>
          </div>
        ))}
      </section>

      {/* Recent projects */}
      <section className="home-recent">
        <div className="home-recent-container">
          <div className="home-recent-heading">
            <h2>Our Recent Projects</h2>
            <p>Explore beautiful kitchens and interiors brought to life using our quality materials, finishes, and hardware solutions.</p>
          </div>
          <div className="home-recent-grid">
            {RECENT_PROJECTS.map((src, i) => (
              <div key={i} className="home-recent-tile"><img src={src} alt="Recent kitchen project" loading="lazy" /></div>
            ))}
          </div>
          <Link to="/project-gallery" className="home-recent-link">View Complete Gallery <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2.75} /></Link>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Contact */}
      <ContactBlock />
    </Page>
  );
}

const TOUCH_CATEGORIES = ["MDF Board", "Sink", "Rubbish Bin", "Edge Tape", "Complete Kitchen"];

function ContactBlock() {
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const [hasCategory, setHasCategory] = useState(false);
  // Inline messages for the browser's own required/email checks, shown in reserved space.
  const [errors, setErrors] = useState<Record<string, string>>({});
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await sendEnquiry("New website enquiry (Home — Get in Touch)", formFields(event.currentTarget));
      setSent(true);
    } catch {
      setStatus("failed");
    }
  };
  const onInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.currentTarget;
    setErrors((current) => ({ ...current, [input.name]: input.validationMessage }));
  };
  const clearError = (event: FormEvent<HTMLInputElement>) => {
    const { name } = event.currentTarget;
    if (errors[name]) setErrors(({ [name]: _cleared, ...rest }) => rest);
  };
  const error = (name: string) =>
    errors[name] ? (
      <span id={`touch-${name}-error`} className="home-touch-error" role="alert">
        {errors[name]}
      </span>
    ) : null;
  const described = (name: string) => (errors[name] ? { "aria-describedby": `touch-${name}-error`, "aria-invalid": true } : {});

  return (
    <section className="home-touch" aria-labelledby="home-touch-title">
      <div className="home-touch-card">
        <div className="home-touch-content">
          <h2 id="home-touch-title" className="home-touch-title">Get in Touch</h2>
          <p className="home-touch-copy">Have a question about our products, pricing, samples or availability? Get in touch with our team and we'll help you find the right solution for your project.</p>
          {sent ? (
            <p className="home-touch-sent" role="status">Thanks! We'll be in touch shortly.</p>
          ) : (
            <form onSubmit={(e) => void onSubmit(e)} className="home-touch-form">
              <div className="home-touch-field">
                <label htmlFor="touch-name" className="sr-only">Full Name (required)</label>
                <input id="touch-name" required name="Name" autoComplete="name" placeholder="Full Name" onInvalid={onInvalid} onInput={clearError} {...described("Name")} />
                {error("Name")}
              </div>
              <div className="home-touch-field">
                <label htmlFor="touch-email" className="sr-only">Email Address (required)</label>
                <input id="touch-email" required name="Email" type="email" autoComplete="email" placeholder="Email Address" onInvalid={onInvalid} onInput={clearError} {...described("Email")} />
                {error("Email")}
              </div>
              <div className="home-touch-field">
                <label htmlFor="touch-phone" className="sr-only">Phone Number</label>
                <input id="touch-phone" name="Phone" type="tel" autoComplete="tel" placeholder="Phone Number" />
              </div>
              <div className="home-touch-field home-touch-select">
                <label htmlFor="touch-category" className="sr-only">Category</label>
                <select id="touch-category" name="Category" defaultValue="" data-empty={!hasCategory || undefined} onChange={(e) => setHasCategory(e.currentTarget.value !== "")}>
                  <option value="" disabled>Category</option>
                  {TOUCH_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                </select>
                <ChevronDown aria-hidden="true" className="home-touch-chevron" />
              </div>
              <div className="home-touch-field home-touch-message">
                <label htmlFor="touch-message" className="sr-only">Message</label>
                <textarea id="touch-message" name="Message" placeholder="Message" rows={4} />
              </div>
              {status === "failed" && <p role="alert" className="home-touch-failed">We couldn't send your enquiry. Please try again, or WhatsApp us.</p>}
              <button type="submit" disabled={status === "sending"} aria-busy={status === "sending"} className="home-touch-submit">{status === "sending" ? "Sending…" : "Send Inquiry"}</button>
            </form>
          )}
        </div>
        <div className="home-touch-media">
          <img src={samples} alt="Kitchen plans with wood veneer samples" width={608} height={787} loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
}
