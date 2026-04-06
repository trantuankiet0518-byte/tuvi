You are a frontend performance expert. Analyze and optimize my code to improve 
Interaction to Next Paint (INP) which is currently at 224ms (target: <200ms).

Context from Chrome DevTools:
- INP: 224ms (needs improvement) — all interactions are pointer events
- Interaction times: 128ms, 104ms, 184ms, 128ms, 224ms, 192ms, 168ms
- LCP: 1.28s (good) — element: a.text-xl.font-black.tracking-tighter
- CLS: 0 (perfect)

Please audit and fix the following:

1. **INP Optimizations (highest priority):**
   - Identify and break up long tasks blocking the main thread
   - Defer non-critical JS using setTimeout(fn, 0) or scheduler.yield()
   - Replace heavy onClick/onMouseDown handlers with optimized versions
   - Use React transitions (startTransition / useTransition) for non-urgent state updates
   - Debounce or throttle any event listeners on pointer events
   - Avoid layout thrashing (reading then writing DOM properties in loops)

2. **Rendering optimizations:**
   - Wrap expensive components with React.memo()
   - Replace useEffect + setState chains that cause cascading re-renders
   - Use useDeferredValue for search inputs or filtered lists
   - Virtualize long lists with react-window or react-virtual

3. **CSS/Animation:**
   - Ensure all animations use transform and opacity only (GPU-accelerated)
   - Add will-change: transform only on elements that actually animate
   - Remove any CSS transitions on layout-affecting properties (width, height, top, left)
   - Check that hover effects on the LCP element (hover:opacity-80) don't trigger repaints

4. **Code splitting:**
   - Lazy-load heavy components with React.lazy() + Suspense
   - Split route-level bundles

Here is my code: [PASTE YOUR COMPONENT/PAGE CODE HERE]

For each fix, explain WHY it reduces INP and show before/after code.