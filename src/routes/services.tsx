import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/site/Layout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — iWood Interiors" },
      { name: "description", content: "Board supply, edge banding and kitchen design support from iWood." },
      { property: "og:title", content: "Services — iWood Interiors" },
      { property: "og:description", content: "Board supply, edge banding and kitchen design support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Page>
      <section className="site-container site-section">
        <h1 className="font-display text-h1 font-semibold tracking-[-0.02em]">Our Services</h1>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[["Board Supply", "Matt, gloss and woodgrain MDF boards cut to order."], ["Edge Banding", "Matching edge tapes for every finish in our range."], ["Kitchen Design", "Guided design from layout to installation."]].map(([t, d]) => (
            <div key={t} className="rounded-(--radius-card) bg-card p-6"><h2 className="text-h3 font-bold">{t}</h2><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
        <Link to="/contact" className="mt-10 inline-block rounded-(--radius-control) bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">Request Quote</Link>
      </section>
    </Page>
  ),
});
