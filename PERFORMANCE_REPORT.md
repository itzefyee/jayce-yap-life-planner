# Performance report

## Scope and environment

This audit measured the root route at `http://127.0.0.1:4173/` from a local Vite production preview.
The checked-out commit was `0d12b3b` with the changes described below uncommitted.
Lighthouse 13.5.0 ran with its default simulated mobile configuration in Headless Chrome 154.
The before and after runs used the same local URL, categories, and Chrome flags.
Local measurements are synthetic lab results and are not field Core Web Vitals.
The custom interaction check additionally used a cold Chrome context, 4x CPU throttling, 100 ms latency, and a 4 Mbps connection at 390 px and 1440 px widths.

## Lighthouse results

| Measure | Before | After |
| --- | ---: | ---: |
| Performance | 70 | 96 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 66 | 100 after the indexing follow-up. |
| FCP | 1.4 s | 1.4 s |
| LCP | 2.2 s | 2.3 s |
| CLS | 0 | 0 |
| TTFB | 5 ms | 2 ms |
| INP | Unavailable in this load-only lab run. | Unavailable in this load-only lab run. |
| Total Blocking Time | 1,540 ms | 170 ms |

The small LCP difference is within normal local lab variation.
The material improvement is the 1,370 ms reduction in total blocking time.
The custom throttled check recorded LCP of 1,324 ms at 390 px and 1,288 ms at 1440 px, with CLS of 0 and no browser errors.

## Top bottlenecks

1. **Resolved - runtime environment-map generation.**
   `src/shield-scene.ts:38` created the WebGL renderer and previously generated a PMREM environment map during initial sculpture setup.
   Lighthouse attributed a 1,446 ms long task and 3.48 s of boot-up scripting to the sculpture chunk before the fix.
   Removing the generated map reduced the sculpture chunk's boot-up scripting to about 1.00 s while retaining direct scene lighting.

2. **Monitor - WebGL bundle weight.**
   `src/shield-scene.ts:1` imports the Three.js rendering stack in a lazy-loaded 143 KiB compressed chunk.
   Lighthouse's unused-JavaScript estimate is heuristic and is not enough evidence to remove required rendering code.
   The chunk is deferred for deep links and no safe further reduction was confirmed in this audit.

3. **Monitor - preloaded local fonts.**
   `index.html:19` preloads three local WOFF2 files totalling about 115 KiB.
   They support the initial editorial design and Lighthouse found no font-display issue.
   Do not remove a preload without a visual and loading comparison.

4. **Resolved - search indexing.**
   The user approved removing the restrictive robots meta tag from `index.html` after the performance audit.
   A focused local Lighthouse recheck then scored SEO at 100.
   The follow-up also added a canonical URL, a sitemap, and a sitemap reference in `robots.txt`.

5. **Measurement limitation - production caching.**
   Local Vite preview does not reproduce Render's CDN behavior.
   `render.yaml:27` configures long-lived immutable caching for fingerprinted assets, but the production response has not been inspected in this local-only audit.

## Changes applied

- `src/shield-scene.ts` no longer creates a runtime `RoomEnvironment` and PMREM map during initial WebGL setup.
  Direct hemisphere and directional lights preserve the sculpture's appearance while removing the measured critical-path work.
- `.gitignore` excludes Lighthouse artifacts in `.perf-audit/`.

The sculpture was visually inspected after the change, remained interactive, and loaded without browser or CSP errors.

## Manual attention and remaining issues

| Priority | Location | Expected benefit | Risk | Next action |
| --- | --- | --- | --- | --- |
| Product | `index.html:1` | Stronger entity understanding and local relevance. | Inaccurate regulated-business claims can mislead visitors or create compliance problems. | Add only verified organization or local-business structured data after compliance review. |
| Low | `src/shield-scene.ts:1` | Lower initial transfer on the default sculpture route. | Reducing Three.js imports can break the hero's rendering or interaction model. | Revisit only with bundle-level measurements and visual regression tests. |
| Low | `index.html:19` | Fewer critical font bytes. | Typography flash or visible layout change. | Measure a font-preload experiment before changing the set. |

## Verification and limitations

Commands run:

```text
npm run build
npm run lint
npm test -- --reporter=line
npm run test:performance
npx --no-install lighthouse http://127.0.0.1:4173/ --output=json --output=html --output-path=.perf-audit/baseline --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless --no-sandbox"
npx --no-install lighthouse http://127.0.0.1:4173/ --output=json --output=html --output-path=.perf-audit/after --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless --no-sandbox"
```

Build and lint passed.
All 41 Playwright tests passed after the change.
The generated JSON and HTML Lighthouse artifacts are in the ignored `.perf-audit/` directory.
No public deployment was contacted, so production CDN behavior, response headers, and real-user metrics remain unverified.
