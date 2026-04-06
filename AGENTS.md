<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Work Log

- 2026-04-06: Brightened the LapLaSo preview empty-state panel in `components/organisms/laplaso/LapLaSoPreview.tsx` with a lighter surface, border, and glow treatment.
- 2026-04-06: Expanded the LapLaSo visual pass so the major cards, chips, and chart panels use transparent/glass outlines instead of solid fills.
- 2026-04-06: Broadened the glass-outline pass across `components`, restyled major panels/sidebars/cards, and restored any corrupted component files while keeping lint clean.
- 2026-04-06: Switched app typography to `Cormorant Garamond` and `Outfit` via `next/font/google`, mapped the CSS variables in `app/globals.css`, and updated headline utilities to use the new font stack.
- 2026-04-06: Added smooth scrolling at the root layout level and kept the marketing homepage reveal system on compositor-friendly CSS transitions with scroll-triggered visibility.
- 2026-04-06: Optimized the marketing homepage by splitting the hero into a server component plus a tiny client-only video loader, loading `hls.js` dynamically, and removing unnecessary image priority/bypass flags.
- 2026-04-06: Reduced client-side overhead by consolidating the reveal observer, removing an unused page wrapper, converting the login layout to a server component, dropping the debug `InputLogger`, and simplifying light wrapper atoms like `Button`, `Input`, `Label`, and `Icon`.
- 2026-04-06: Verified the project with `npm run lint` and `npm run build` after each performance pass; the app currently builds cleanly and the homepage route remains static at `/`.

## Current State

- Marketing homepage now renders mostly on the server, with only the reveal motion and hero video control left on the client.
- `RevealOnScroll` uses a shared `IntersectionObserver` and CSS delay-based staggering instead of per-instance observer churn.
- The root route `/` redirects to the default locale, while `/[locale]` continues to serve the localized app shell.
- Remaining `use client` components are mostly stateful or event-driven by design, not accidental.

## Performance Notes

- Prefer server components by default; add `use client` only when state, browser APIs, or event handling require it.
- Load heavy browser-only libraries with `import()` inside effects instead of static imports when the feature is not critical at first paint.
- Avoid `priority` and `unoptimized` on images unless the asset is truly above the fold and already proven worth the cost.
- Keep motion on compositor-friendly properties and use `IntersectionObserver` for scroll-triggered reveals.
- Skip `memo` and `useCallback` on thin wrapper components unless profiling shows a real render bottleneck.
