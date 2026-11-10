import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { ENQUIRY_EMAIL } from "@/lib/enquiry";
import { getLenis } from "@/lib/lenis";
import { MailIcon, PhoneIcon, PinIcon } from "./FooterIcons";

const ADDRESS = "40 Cryers Road, East Tāmaki, Manukau 2013";
// The shared Google Maps pin, opened for directions; the embed is centred on the same address.
const MAP_LINK = "https://maps.app.goo.gl/CYNdh1sUBNzwZMuz5";
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent("40 Cryers Road, East Tamaki, Auckland 2013, New Zealand")}&z=16&output=embed`;

/**
 * Site navigation: the header links and the footer "Quick Links:" list both map over this one
 * array, so a label or order change here updates both. Contact is not part of it: the header
 * has its own "Request Quote" button and the footer its own Contact column. `headerLabel`, when
 * set, replaces the label in the header and mobile menu only.
 */
const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/kitchen-design", label: "Kitchen Design" },
  { to: "/about", label: "About", headerLabel: "About Us" },
  { to: "/project-gallery", label: "Project Gallery" },
] as const;

const NAV_LINK_CLASS =
  "site-nav-link font-body text-[clamp(13px,1.15vw,16px)] leading-[1.3] text-taupe-foreground opacity-95 transition-opacity hover:opacity-100";
const NAV_ACTIVE_OPTIONS = { exact: true, includeSearch: false } as const;

export function SiteHeader({ overlay = false }: { overlay?: boolean | undefined }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`${overlay ? "absolute inset-x-0 top-0 z-30" : "relative z-30 bg-taupe"} text-taupe-foreground`}
    >
      <nav className="mx-auto flex h-[var(--nav-h)] max-w-[1400px] items-center justify-between gap-3 px-(--page-gutter) font-body text-[clamp(13px,1.15vw,16px)] leading-[1.3] font-normal lg:px-8">
        <Link to="/" className="shrink-0" aria-label="Vwood home">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/fdb1fd03c53c6ac217dbb4eeefe5385654a5c91e?width=360"
            alt="Vwood"
            width={170}
            height={47}
            className="h-auto w-[clamp(113px,11.8vw,170px)]"
          />
        </Link>
        {NAV.map((n) => (
          <Link
            key={n.label}
            to={n.to}
            activeOptions={NAV_ACTIVE_OPTIONS}
            activeProps={{ className: "font-semibold" }}
            className={`${NAV_LINK_CLASS} hidden shrink-0 whitespace-nowrap lg:inline`}
          >
            {"headerLabel" in n ? n.headerLabel : n.label}
          </Link>
        ))}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/contact"
            className="inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-background px-4 text-[clamp(13px,1vw,15px)] font-medium text-foreground shadow-md transition-transform hover:-translate-y-px sm:px-5"
          >
            Request Quote
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="site-mobile-menu"
            onClick={() => setMenuOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-lg bg-black/15 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>
      <div id="site-mobile-menu" className={`site-mobile-menu lg:hidden ${menuOpen ? "is-open" : ""}`} hidden={!menuOpen}>
        <ul>
          {[...NAV, { to: "/contact", label: "Contact" } as const].map((n) => (
            <li key={n.label}>
              <Link
                to={n.to}
                activeOptions={NAV_ACTIVE_OPTIONS}
                activeProps={{ "aria-current": "page" }}
                onClick={() => setMenuOpen(false)}
              >
                {"headerLabel" in n ? n.headerLabel : n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer bg-footer">
      <div className="site-footer-inner site-container">
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/1e87410686454e3da8b36a8cf074c99bd820bd0e?width=486"
              alt="Vwood"
              width={243}
              height={74}
              loading="lazy"
              className="site-footer-logo"
            />
            <p className="site-footer-tagline">
              Premium materials and innovative solutions to help you design your perfect kitchen
            </p>
            <a
              href="https://wa.me/64211918843"
              className="mt-4 inline-flex h-10 items-center gap-2.5 whitespace-nowrap rounded-(--radius-control) bg-whatsapp px-4 font-body text-[15px] leading-none font-medium text-white"
            >
              <WhatsappLogo className="h-5 w-5 shrink-0" /> Whatsapp Chat
            </a>
          </div>
          <nav aria-label="Footer quick links" className="site-footer-quick-links">
            <h4 className="site-footer-heading">Quick Links:</h4>
            <ul>
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    resetScroll={true}
                    onClick={(event) => {
                      if (
                        event.button === 0 &&
                        !event.metaKey &&
                        !event.ctrlKey &&
                        !event.shiftKey &&
                        !event.altKey &&
                        window.location.pathname === n.to
                      ) {
                        // Through Lenis when it runs, so its own scroll position stays in step.
                        const lenis = getLenis();
                        if (lenis) lenis.scrollTo(0, { immediate: true });
                        else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                      }
                    }}
                    activeOptions={NAV_ACTIVE_OPTIONS}
                    activeProps={{ "aria-current": "page" }}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <FooterList title="Products:" items={[["MDF Board", "/products"], ["Sinks", "/products", { category: "sink", view: "catalog" }], ["Rubbish Bin", "/products", { category: "rubbish-bin", view: "catalog" }], ["Edge Tape", "/products", { category: "edge-tape", view: "catalog" }]]} />
          <div className="site-footer-contact">
            <h4 className="site-footer-heading">Contact:</h4>
            <ul>
              <li><PinIcon /><a href={MAP_LINK} target="_blank" rel="noopener noreferrer">{ADDRESS}</a></li>
              <li><PhoneIcon /><a href="tel:+64211918843">+64 21 191 8843</a></li>
              <li><MailIcon /><a href={`mailto:${ENQUIRY_EMAIL}`}>{ENQUIRY_EMAIL}</a></li>
            </ul>
            <p className="site-footer-timings">
              <span>Timings:</span> 8:30 am to 5:50 pm
            </p>
          </div>
        </div>
        <div className="site-footer-map">
          <iframe
            title={`Map: Vwood, ${ADDRESS}`}
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="site-footer-map-card">
            <PinIcon />
            <span>
              <strong>Visit our showroom</strong>
              {ADDRESS}
            </span>
            <span className="site-footer-map-cta">Get directions →</span>
          </a>
        </div>
        <p className="site-footer-legal">© 2026 Vwood &nbsp;&nbsp; Privacy Policy | Terms</p>
      </div>
    </footer>
  );
}

function WhatsappLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        d="M20.463 3.488A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413ZM17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z"
      />
    </svg>
  );
}

function FooterList({ title, items }: { title: string; items: [string, string, Record<string, string>?][] }) {
  return (
    <div>
      <h4 className="site-footer-heading">{title}</h4>
      <ul className="site-footer-links">
        {items.map(([l, to, search]) => (
          <li key={l}><Link to={to} {...(search ? { search } : {})}>{l}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export function Page({ children, overlay }: { children: ReactNode; overlay?: boolean | undefined }) {
  return (
    <div className="relative min-h-screen">
      <SiteHeader overlay={overlay} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
