import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState, type CSSProperties } from "react";
import { Lightbox, type LightboxPhoto } from "@/components/Lightbox";
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

// One list for the grid and the preview: add a photo here and it appears in both.
const PHOTOS: readonly LightboxPhoto[] = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Kitchen island and contemporary cabinetry",
    width: 384,
    height: 475,
  },
  { src: "/images/gallery-2.jpg", alt: "Natural wood kitchen finishes", width: 533, height: 394 },
  { src: "/images/gallery-3.jpg", alt: "Bright white kitchen cabinetry", width: 270, height: 404 },
  {
    src: "/images/gallery-4.jpg",
    alt: "Sage cabinetry and kitchen storage",
    width: 381,
    height: 286,
  },
  {
    src: "/images/gallery-5.jpg",
    alt: "Dark contemporary kitchen finishes",
    width: 354,
    height: 363,
  },
  {
    src: "/images/gallery-6.jpg",
    alt: "White cabinetry and worktop detail",
    width: 447,
    height: 363,
  },
  { src: "/images/gallery-7.jpg", alt: "Timber kitchen cabinetry detail", width: 378, height: 302 },
  { src: "/images/gallery-8.jpg", alt: "Modern kitchen interior", width: 383, height: 317 },
  { src: "/images/gallery-9.jpg", alt: "Green cabinetry finish", width: 533, height: 394 },
  { src: "/images/gallery-10.jpg", alt: "Black kitchen and island", width: 267, height: 400 },
  { src: "/images/gallery-11.jpg", alt: "Warm timber kitchen interior", width: 381, height: 286 },
  {
    src: "/images/gallery-12.jpg",
    alt: "Light kitchen with white finishes",
    width: 378,
    height: 302,
  },
  { src: "/images/gallery-13.jpg", alt: "Contemporary kitchen design", width: 383, height: 317 },
  { src: "/images/gallery-14.jpg", alt: "Sage kitchen interior", width: 342, height: 512 },
  { src: "/images/gallery-15.jpg", alt: "Dark kitchen cabinetry detail", width: 460, height: 512 },
];

function ProjectGallery() {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const openedFrom = useRef<HTMLButtonElement | null>(null);
  const closePreview = useCallback(() => {
    setPreviewIndex(null);
    // Focus returns to the photo the visitor opened, not the one they navigated to.
    openedFrom.current?.focus({ preventScroll: true });
  }, []);
  const openPreview = (index: number) => {
    openedFrom.current = triggers.current[index] ?? null;
    setPreviewIndex(index);
  };

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
              <button
                ref={(button) => {
                  triggers.current[i] = button;
                }}
                type="button"
                aria-haspopup="dialog"
                aria-label={`View larger: ${photo.alt}`}
                className="project-gallery-photo-button"
                onClick={() => openPreview(i)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading={i < 4 ? "eager" : "lazy"}
                  className="h-full w-full object-cover"
                />
              </button>
            </figure>
          ))}
        </div>
      </section>
      <Lightbox
        photos={PHOTOS}
        index={previewIndex}
        onIndexChange={setPreviewIndex}
        onClose={closePreview}
      />
    </Page>
  );
}
