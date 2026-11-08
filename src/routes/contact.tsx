import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Page } from "@/components/site/Layout";
import { formFields, sendEnquiry } from "@/lib/enquiry";
import { findProduct } from "@/lib/product-categories";
import { PRODUCT_DETAILS } from "@/lib/product-details";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { product?: string | undefined; quantity?: number | undefined; size?: string | undefined } => {
    // Store the canonical slug, so earlier bin URLs still find their sizes.
    const product = typeof search["product"] === "string" ? findProduct(search["product"])?.slug : undefined;
    const quantity = Number(search["quantity"]);
    const allowedSizes = product ? PRODUCT_DETAILS[product]?.sizes ?? ["2440x1220", "2800x1220"] : [];
    return {
      product,
      quantity: product && Number.isSafeInteger(quantity) && quantity > 0 ? quantity : undefined,
      size: typeof search["size"] === "string" && allowedSizes.includes(search["size"]) ? search["size"] : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Request a Quote — iWood Interiors" },
      { name: "description", content: "Tell us about your project and get a personalised quote from iWood." },
      { property: "og:title", content: "Request a Quote — iWood Interiors" },
      { property: "og:description", content: "Get a personalised quote for boards and kitchens." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await sendEnquiry(`New quote request${board ? ` — ${board.name}` : ""}`, formFields(event.currentTarget));
      setSent(true);
    } catch {
      setStatus("failed");
    }
  };
  const search = Route.useSearch();
  const board = search.product ? findProduct(search.product) : undefined;
  const selection = !board ? "" : board.categoryId === "mdf-board"
    ? `Quote request: ${board.name}${board.code ? ` (${board.code})` : ""}, ${search.quantity ?? 1} sheet(s), ${search.size ?? "2440x1220"}, 18MM, ${board.sides}.`
    : `Quote request: ${board.name}${board.categoryId === "edge-tape" ? " edge tape" : ""} (${board.code}), ${search.quantity ?? 1} unit(s)${search.size ? `, ${search.size}` : ""}.`;
  return (
    <Page>
      <section className="site-section mx-auto max-w-xl px-(--page-gutter)">
        <h1 className="font-display text-h1 font-semibold tracking-[-0.02em]">Request a Quote</h1>
        {sent ? (
          <p className="mt-8 text-primary">Thanks! We'll be in touch shortly.</p>
        ) : (
          <form onSubmit={(e) => void onSubmit(e)} className="mt-8 space-y-4 text-sm">
            {(["Name", "Email", "Phone"] as const).map((l) => (
              <input key={l} name={l} required={l !== "Phone"} placeholder={l} aria-label={l} autoComplete={l === "Name" ? "name" : l === "Email" ? "email" : "tel"} type={l === "Email" ? "email" : l === "Phone" ? "tel" : "text"} className="w-full rounded-(--radius-control) border border-input px-3 py-2.5" />
            ))}
            <textarea key={selection} name="Project details" defaultValue={selection} aria-label="Project details" placeholder="Tell us about your project" rows={5} className="w-full rounded-(--radius-control) border border-input px-3 py-2.5" />
            {status === "failed" && <p role="alert" className="text-destructive">We couldn't send your enquiry. Please try again, or WhatsApp us.</p>}
            <button disabled={status === "sending"} className="rounded-(--radius-control) bg-primary px-6 py-3 text-xs font-semibold tracking-widest text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">{status === "sending" ? "SENDING…" : "SEND INQUIRY"}</button>
          </form>
        )}
      </section>
    </Page>
  );
}
