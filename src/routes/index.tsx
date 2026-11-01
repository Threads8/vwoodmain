import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Page } from "@/components/site/Layout";
import { HeroMaterials } from "@/components/site/HeroMaterials";
import { formFields, sendEnquiry } from "@/lib/enquiry";
import { IMG } from "@/lib/site-data";
import oliveSuperMatt from "@/assets/featured/olive-super-matt.jpg";
import ravenBlackMatt from "@/assets/featured/raven-black-matt.jpg";
import acrylicCollection from "@/assets/collections/acrylic-finish.jpg";
import woodCollection from "@/assets/collections/wood-finish.jpg";
import hardwareCollection from "@/assets/collections/hardware.jpg";
import inspiration1 from "@/assets/inspiration/inspiration-1.jpg";
import inspiration2 from "@/assets/inspiration/inspiration-2.jpg";
import inspiration3 from "@/assets/inspiration/inspiration-3.jpg";
import inspiration4 from "@/assets/inspiration/inspiration-4.jpg";
import white from "@/assets/white-kitchen.jpg";
import woodFinish from "@/assets/wood-finish-kitchen.jpg";
import project from "@/assets/project-kitchen.jpg";
import samples from "@/assets/contact-samples.png";
import recent1 from "@/assets/recent/recent-project-1.png";
import recent2 from "@/assets/recent/recent-project-2.png";
import recent3 from "@/assets/recent/recent-project-3.png";
import recent4 from "@/assets/recent/recent-project-4.png";
import client1 from "@/assets/reviews/client-1.png";

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
  [oliveSuperMatt, "Olive Super Matt", "olive-super-matt"],
  [IMG.woodKitchen, "Rural Oak", "rural-oak"],
  [ravenBlackMatt, "Raven Black Matt", "raven-black-matt"],
  [white, "Shiny White Gloss", "shiny-white-gloss"],
  [woodFinish, "Classic Walnut", "classic-walnut"],
  [IMG.barKitchen, "Sand Dune", "sand-dune"],
  [project, "Washed Oakwood", "washed-oakwood"],
  [IMG.brightKitchen, "Alabaster Gloss", "alabaster-gloss"],
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
  [client1, "Michael Chen", "Interior Designer, NYC", "Vwood transformed our outdated kitchen into a modern masterpiece. The quality of materials and attention to detail exceeded our expectations."],
  [client1, "Michael Chen", "Interior Designer, NYC", "As a designer, I trust Vwood for all my high-end projects. Their material selection is unmatched and the customer service is exceptional."],
  [client1, "Emily Rodriguez", "Homeowner, Miami", "The guided design process made choosing materials so easy. Our kitchen is now the heart of our home and we couldn't be happier!"],
];

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

function Home() {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(FEATURED.length / 3);
  const shown = FEATURED.slice(page * 3, page * 3 + 3).concat(FEATURED.slice(0, Math.max(0, page * 3 + 3 - FEATURED.length)));

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
            <p className="mt-3 px-4 text-center font-body text-[clamp(13px,1.05vw,15px)] font-extralight text-[#E5E7EB]">Premium MDF boards, modern fittings, and smart kitchen solutions</p>
            <p className="mt-1 text-[clamp(12px,1vw,14px)] font-light tracking-[0.3em]">All in one place</p>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="site-section bg-sand">
        <h2 className="mb-10 text-center font-heading text-h2 font-bold text-heading/90">Featured Products</h2>
        <div className="site-container grid gap-6 sm:grid-cols-3">
          {shown.map(([src, name, slug]) => (
            <Link key={name} to="/products/$slug" params={{ slug }} className="group text-center">
              <div className="overflow-hidden rounded-(--radius-card) shadow-sm"><img src={src} alt={name} loading="lazy" className="aspect-[364/323] w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
              <p className="mt-3 font-heading text-[clamp(15px,1.2vw,17px)] text-foreground/80">{name}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center gap-1">
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} aria-label={`Show slide ${i + 1}`} onClick={() => setPage(i % pages)} className={`h-2.5 w-2.5 rounded-full border border-border shadow ${i === page ? "bg-primary" : "bg-background"}`} />
          ))}
        </div>
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
      <section className="site-section">
        <div className="mx-auto mb-10 max-w-3xl px-6 text-center">
          <h2 className="font-heading text-h2 font-bold text-review">What Our Clients Say</h2>
          <p className="mt-3 font-heading text-lead text-review-muted">Trusted by homeowners and designers alike</p>
        </div>
        <div className="site-container grid gap-6 font-body md:grid-cols-3">
          {REVIEWS.map(([photo, n, r, q], i) => (
            <div key={i} className="rounded-(--radius-card) border border-border bg-cream p-[clamp(24px,2.2vw,32px)]">
              <div className="flex items-center gap-3">
                <img src={photo} alt={n} loading="lazy" className="h-14 w-14 shrink-0 rounded-full object-cover" />
                <div><p className="text-base font-semibold leading-6 text-review">{n}</p><p className="text-sm leading-5 text-review-muted">{r}</p></div>
              </div>
              <div className="mt-4 flex gap-0.5 text-primary">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-4 text-copy italic text-foreground/80">"{q}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <ContactBlock />
    </Page>
  );
}

function ContactBlock() {
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
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
  const field = "w-full rounded-(--radius-control) bg-field px-4 py-3 font-body text-[15px] text-foreground placeholder:text-field-placeholder outline-none focus:ring-1 focus:ring-primary";
  return (
    <section className="home-touch">
      <div className="home-touch-card grid overflow-hidden md:grid-cols-[1.1fr_1fr]">
        <div className="p-7 md:p-10">
          <h2 className="home-touch-title">Get in Touch</h2>
          <p className="mt-4 max-w-md font-body text-lead text-touch-body">Have a question about our products, pricing, samples or availability? Get in touch with our team and we'll help you find the right solution for your project.</p>
          {sent ? (
            <p className="mt-6 text-sm text-primary">Thanks! We'll be in touch shortly.</p>
          ) : (
            <form onSubmit={(e) => void onSubmit(e)} className="mt-6 grid max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
              <input required name="Name" autoComplete="name" placeholder="Full Name" aria-label="Full Name" className={field} />
              <input required name="Email" type="email" autoComplete="email" placeholder="Email Address" aria-label="Email Address" className={field} />
              <input name="Phone" type="tel" autoComplete="tel" placeholder="Phone Number" aria-label="Phone Number" className={field} />
              <select name="Category" aria-label="Category" defaultValue="" className={`${field} text-field-placeholder`}><option value="" disabled>Category</option><option>MDF Board</option><option>Sink</option><option>Rubbish Bin</option><option>Edge Tape</option><option>Complete Kitchen</option></select>
              <textarea name="Message" placeholder="Message" aria-label="Message" rows={4} className={`${field} sm:col-span-2`} />
              {status === "failed" && <p role="alert" className="text-sm text-destructive sm:col-span-2">We couldn't send your enquiry. Please try again, or WhatsApp us.</p>}
              <button disabled={status === "sending"} className="w-fit rounded-(--radius-control) bg-primary px-7 py-3 font-body text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">{status === "sending" ? "Sending…" : "Send Inquiry"}</button>
            </form>
          )}
        </div>
        <img src={samples} alt="Kitchen plans with wood veneer samples" loading="lazy" className="h-full min-h-60 w-full object-cover" />
      </div>
    </section>
  );
}
