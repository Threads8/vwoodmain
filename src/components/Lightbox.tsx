import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type MotionStyle,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getLenis } from "@/lib/lenis";

export type LightboxPhoto = {
  /** Grid image. */
  src: string;
  /** Larger file for the preview, when one exists; otherwise `src` is shown. */
  full?: string;
  alt: string;
  /**
   * Natural size, so the preview is fitted to the screen before the file has loaded. When it is
   * not known (remote product photos), the size is read from the image once it loads.
   */
  width?: number;
  height?: number;
};

type Props = {
  photos: readonly LightboxPhoto[];
  /** The photo being previewed, or null when the preview is closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /** Accessible name of the dialog. */
  label?: string;
};

const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;
const fullSrc = (photo: LightboxPhoto) => photo.full ?? photo.src;

/** Full-screen image preview, rendered into document.body so nothing on the page can clip it. */
export function Lightbox(props: Props) {
  // Portals need document, which only exists after hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {props.index !== null && <LightboxDialog key="lightbox" {...props} index={props.index} />}
    </AnimatePresence>,
    document.body,
  );
}

function LightboxDialog({
  photos,
  index,
  onIndexChange,
  onClose,
  label = "Image preview",
}: Omit<Props, "index"> & { index: number }) {
  const reduceMotion = useReducedMotion() ?? false;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [direction, setDirection] = useState(1);
  const count = photos.length;
  const photo = photos[index]!;

  // Navigation loops: Next on the last photo shows the first, Previous on the first the last.
  const go = useCallback(
    (step: 1 | -1) => {
      setDirection(step);
      onIndexChange((index + step + count) % count);
    },
    [index, count, onIndexChange],
  );

  // Lock the page (and Lenis) while open. Padding stands in for the hidden scrollbar, so the
  // page behind does not shift sideways when it disappears or comes back.
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const scrollbar = window.innerWidth - root.clientWidth;
    const previous = { overflow: root.style.overflow, paddingRight: body.style.paddingRight };
    root.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    const lenis = getLenis();
    lenis?.stop();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      root.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      lenis?.start();
    };
  }, []);

  // Esc closes, arrows step through the photos, Tab stays inside the dialog.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      } else if (event.key === "Tab") {
        const focusable =
          dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!focusable?.length) return;
        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        const inside = dialogRef.current?.contains(document.activeElement);
        if (event.shiftKey && (document.activeElement === first || !inside)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !inside)) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // Fetch the neighbours now, so Next and Previous show a ready image.
  useEffect(() => {
    for (const step of [1, -1]) new Image().src = fullSrc(photos[(index + step + count) % count]!);
  }, [index, count, photos]);

  // Only clicks on the backdrop itself close it, not clicks on the image or the controls.
  const closeOnBackdrop = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) onClose();
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1);
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1);
  };

  const fade = { duration: reduceMotion ? 0 : 0.3, ease: "easeOut" } as const;

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      data-lenis-prevent
      className="gallery-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={fade}
      onClick={closeOnBackdrop}
    >
      <motion.div
        className="gallery-lightbox-stage"
        onClick={closeOnBackdrop}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
        transition={fade}
      >
        <AnimatePresence initial={false} custom={direction}>
          <Slide
            key={index}
            photo={photo}
            direction={direction}
            reduceMotion={reduceMotion}
            onDragEnd={onDragEnd}
            onBackdropClick={closeOnBackdrop}
          />
        </AnimatePresence>
      </motion.div>

      <button
        ref={closeRef}
        type="button"
        aria-label="Close preview"
        className="gallery-lightbox-button gallery-lightbox-close"
        onClick={onClose}
      >
        <X aria-hidden="true" />
      </button>
      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            className="gallery-lightbox-button gallery-lightbox-prev"
            onClick={() => go(-1)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            className="gallery-lightbox-button gallery-lightbox-next"
            onClick={() => go(1)}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </>
      )}
      {count > 1 && (
        <p className="gallery-lightbox-counter" aria-live="polite">
          {index + 1} / {count}
        </p>
      )}
    </motion.div>
  );
}

const slideVariants = {
  enter: ({ direction, reduceMotion }: SlideCustom) =>
    reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 48 },
  center: { opacity: 1, x: 0 },
  exit: ({ direction, reduceMotion }: SlideCustom) =>
    reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -48 },
};
type SlideCustom = { direction: number; reduceMotion: boolean };

function Slide({
  photo,
  direction,
  reduceMotion,
  onDragEnd,
  onBackdropClick,
}: {
  photo: LightboxPhoto;
  direction: number;
  reduceMotion: boolean;
  onDragEnd: (event: unknown, info: PanInfo) => void;
  onBackdropClick: (event: React.MouseEvent) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [measured, setMeasured] = useState<number | null>(null);
  const ratio = photo.width && photo.height ? photo.width / photo.height : (measured ?? 4 / 3);
  const onReady = (img: HTMLImageElement) => {
    if (img.naturalWidth > 0) setMeasured(img.naturalWidth / img.naturalHeight);
    setLoaded(true);
  };
  const custom: SlideCustom = { direction, reduceMotion };
  return (
    <motion.div
      className="gallery-lightbox-slide"
      custom={custom}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
      onClick={onBackdropClick}
    >
      {!loaded && (
        <span className="gallery-lightbox-spinner" role="status" aria-label="Loading image" />
      )}
      <motion.img
        src={fullSrc(photo)}
        alt={photo.alt}
        {...(photo.width && photo.height ? { width: photo.width, height: photo.height } : {})}
        draggable={false}
        drag="x"
        dragSnapToOrigin
        dragElastic={0.5}
        onDragEnd={onDragEnd}
        // A cached image is complete before React attaches onLoad.
        ref={(img: HTMLImageElement | null) => {
          if (img?.complete && img.naturalWidth > 0 && !loaded) onReady(img);
        }}
        onLoad={(event) => onReady(event.currentTarget)}
        onError={() => setLoaded(true)}
        data-loaded={loaded || undefined}
        className="gallery-lightbox-image"
        style={{ "--ratio": String(ratio) } as MotionStyle}
      />
    </motion.div>
  );
}
