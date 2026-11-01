Keep published Git history intact and deployment branches in a working state.

- Keep page-specific kitchen layout rules and visual tokens in the global stylesheet, with breakpoint typography preserving the supplied desktop sizes without mobile overflow.
- Keep About page layout rules and visual tokens in the global stylesheet so its supplied design remains isolated from shared navigation and other pages.
- Keep the project gallery on its own route, linked from Products and About, with its mosaic layout and visual tokens in the global stylesheet; do not replace the product catalog.
- Typography uses the fluid scale in `src/styles.css` (`text-hero`, `text-h1`, `text-page`, `text-h2`, `text-h3`, `text-lead`, `text-copy`, `--nav-h`): sizes follow the site-wide heading hierarchy (H1 36px, H2 28px, H3 18px at desktop) and shrink with the viewport — use these instead of fixed px heading sizes.
- Layout uses the shared system in `src/styles.css`: `.site-container`, `.site-section`, `--page-gutter`, `--page-inset`, `--section-y` and the `--radius-control`, `--radius-card`, `--radius-panel` tokens — use these instead of per-page widths, section padding and radii.
