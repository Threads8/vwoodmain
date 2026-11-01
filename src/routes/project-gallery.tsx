import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { Page } from "@/components/site/Layout";
export const Route = createFileRoute("/project-gallery")({
  head: () => ({
    meta: [
      { title: "Project Gallery — Vwood Interiors" },
      {
        name: "description",
        content:
          "See Vwood finishes brought to life in kitchens and interiors. Explore, imagine and create your next space.",
      },
      { property: "og:title", content: "Project Gallery — Vwood Interiors" },
      {
        property: "og:description",
        content: "Discover kitchen and interior inspiration with Vwood materials and finishes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectGallery,
});

const PHOTOS = [
  { src: "/images/gallery-1.jpg", alt: "Kitchen island and contemporary cabinetry" },
  { src: "/images/gallery-2.jpg", alt: "Natural wood kitchen finishes" },
  { src: "/images/gallery-3.jpg", alt: "Bright white kitchen cabinetry" },
  { src: "/images/gallery-4.jpg", alt: "Sage cabinetry and kitchen storage" },
  { src: "/images/gallery-5.jpg", alt: "Dark contemporary kitchen finishes" },
  { src: "/images/gallery-6.jpg", alt: "White cabinetry and worktop detail" },
  { src: "/images/gallery-7.jpg", alt: "Timber kitchen cabinetry detail" },
  { src: "/images/gallery-8.jpg", alt: "Modern kitchen interior" },
  { src: "/images/gallery-9.jpg", alt: "Green cabinetry finish" },
  { src: "/images/gallery-10.jpg", alt: "Black kitchen and island" },
  { src: "/images/gallery-11.jpg", alt: "Warm timber kitchen interior" },
  { src: "/images/gallery-12.jpg", alt: "Light kitchen with white finishes" },
  { src: "/images/gallery-13.jpg", alt: "Contemporary kitchen design" },
  { src: "/images/gallery-14.jpg", alt: "Sage kitchen interior" },
  { src: "/images/gallery-15.jpg", alt: "Dark kitchen cabinetry detail" },
];

function ProjectGallery() {
  return (
    <Page>
      <section className="project-gallery mx-auto">
        <div className="project-gallery-mosaic">
          <div className="project-gallery-intro text-gallery-ink">
            <h1 className="font-sans font-extrabold">Project Gallery</h1>
            <p className="project-gallery-tagline font-sans opacity-[0.57]">
              Explore. Imagine. Create.
            </p>
            <p className="project-gallery-description font-sans">
              See VWood products brought to life. From kitchens and wardrobes to living spaces and
              bedrooms, discover how our finishes add style and character to everyday interiors.
            </p>
          </div>
          {PHOTOS.map((photo, i) => (
            <figure
              key={`${photo.alt}-${i}`}
              className={`project-gallery-photo project-gallery-photo-${i + 1}`}
              style={{ "--i": i } as CSSProperties}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading={i < 4 ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
              <figcaption>Vwood Project {String(i + 1).padStart(2, "0")}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-right font-body text-[13px] leading-5 text-stone-body uppercase">
          Showing {PHOTOS.length} images
        </p>
      </section>
    </Page>
  );
}
