# Verification

Verified locally on 3 October 2026.
The production preview runs at http://127.0.0.1:4173 and the development preview at http://127.0.0.1:5173.

## Automated checks

| Check | Result |
| --- | --- |
| Production build and TypeScript | Passed |
| Code formatting | Passed |
| Playwright E2E suite | 41 tests passed |
| Responsive overflow | None at 375, 768, and 1440px |
| Axe accessibility | No violations in the tested initial states at those widths |
| Original portrait build mobile Lighthouse accessibility | 100 |
| Original portrait build mobile Lighthouse best practices | 100 |
| Original portrait build mobile Lighthouse agentic browsing | 100 |
| Original portrait build mobile Lighthouse SEO | 66; intentional noindex for the preview |
| Browser runtime and failed resource checks | No errors in tested journeys and production load |
| Asset provenance scan | Four rasters, zero missing provenance records |

The suite covers all four planning-check outcomes, restart, keyboard coverage tabs, selected-topic handoff, invalid names, consent, past dates, request review/edit, correctly encoded WhatsApp message content, mobile menus, journal articles, FAQs, and privacy-dialog focus restoration.
WhatsApp requests are intercepted during testing; no messages are sent.
Twelve scoped hero and card cases cover all three switchable presentations, URL persistence, keyboard operation, all topic and life-chapter enquiry handoffs, shield separation, direct raycast selection, motion controls, live reduced-motion changes, and unavailable WebGL.
All three hero variants have zero axe violations in their tested initial states at 375, 768, and 1440px.
The twelve scoped tests passed again after the final visual corrections.
The card defect was reproduced in the running browser: rotated planes in a shared preserve-3d scene allowed a background card to cut diagonally through the foreground card.
The replacement keeps four distinct cards mounted and uses two-dimensional transforms with explicit paint order.
Regression tests exercise all four topics, hover, fast repeated selection, and actual hit-tested paint order during and after transitions at all three viewport widths.
The mobile journal bug was reproduced with an E2E failure before fixing scroll and focus restoration.
Browser-native date inputs reject past preferred dates.

The whole-site optimisation added nine regression and graphics lifecycle tests.
Failures were reproduced before fixing initial section links, hero state after browser Back, enquiry edit focus, stale check-in attachments, accidental privacy-dialog dismissal, and mobile menu dismissal and keyboard entry.
Removing an attached check-in preserves the visitor's form details and selected topic.
Graphics tests instrument actual WebGL draw calls to verify suspension when paused, offscreen, and unmounted, and resumption when visible.
A forced graphics-context loss reproduced missing environment lighting; recovery now regenerates it and passes a pixel comparison against the pre-loss scene with a small GPU tolerance.
All 41 tests, the production build, TypeScript, and formatting checks passed on the final implementation.
The browser suite uses installed Chrome; Safari, Firefox, physical-device performance, and a manual screen-reader audit have not been verified.

## Performance

Measured against the production bundle with fresh browser contexts, four-times CPU slowdown, 100ms network latency, and 4Mbps download throughput.

| Viewport | Hero | Largest contentful paint | Layout shift | Slowest sampled interaction |
| --- | --- | --- | --- | --- |
| 390px | Sculpture | 1.256s | 0 | 112ms |
| 390px | Portrait | 1.496s | 0 | 72ms |
| 390px | Life chapters | 1.312s | 0 | 80ms |
| 1440px | Sculpture | 1.336s | 0 | 136ms |
| 1440px | Portrait | 1.400s | 0 | 80ms |
| 1440px | Life chapters | 1.376s | 0 | 80ms |

Font preloading eliminated the initially observed mobile layout shift.
The three font files and all images are hosted locally.
Below-the-fold journal imagery loads lazily.
The motion system respects reduced-motion preferences and retains native scrolling.
These final measurements cover all three heroes and include the separately loaded renderer when Sculpture is selected.
Transferred resources were approximately 355KB for Sculpture, 300KB for Portrait, and 211KB for Life chapters in this run.
The renderer follows the display animation cadence and caps pixel ratio at 1.5, suspends outside the viewport and in hidden tabs, and disposes its GPU resources when switching to Portrait.
The optional scene bundle is approximately 146KB gzip.
These are local lab observations, not field Core Web Vitals or a guarantee for every device or host.
Real-user INP has not been measured.

The optimisation scopes scroll updates to the progress indicator and portrait instead of changing inherited properties on the document root.
Document-height measurement is handled by resize observation rather than repeated scroll-frame reads.
Shield hover hit testing is coalesced per animation frame, shaders prepare asynchronously, and the studio environment uses 128px faces instead of 256px.
The complete scene and all interaction controls remain available.
Direct `#contact` visits now reach the form correctly and defer the roughly 145KB gzip scene download until the hero approaches the viewport.
The renderer is absent on that path until needed, verified in the browser.
Before/after interaction measurements for all three heroes are recorded in `optimization-before.json` and `optimization-after.json` under `.impeccable/review/`.
These sampled Event Timing durations are synthetic interaction measurements, not field INP or a guarantee of all-device responsiveness.
The slowest mobile Sculpture interaction changed from 672ms in the baseline sample to 112ms in the final sample.
Cold graphics preparation remains a material startup cost and varies between runs; the final comparison was rerun without simultaneous test or build jobs.
The final run recorded zero runtime or failed-resource errors.

The subsequent sculpture smoothness pass reproduced a 27fps cadence caused by the old 30fps gate on a 165Hz display.
Removing that gate, using frame-independent damping, and merging symbol meshes produced 164fps at a 1440px viewport and 159.6fps at 390px, compared with 27.4fps and 27.2fps respectively.
Draw calls fell from fourteen to six per frame without changing the shield geometry or materials.
The five-second samples had a 6.3ms 95th-percentile frame interval and no intervals over 40ms after the change.
These unthrottled Chrome measurements used an RTX 3060 laptop GPU; the 390px viewport is responsive emulation, not a physical phone result.
Raw results are in `.impeccable/review/sculpture-before.json` and `sculpture-after.json`; repeat with `node scripts/sculpture-performance.mjs after` while the production preview is running.
The graphics lifecycle regression also checks that an active scene paints on more than 90 percent of sampled browser animation frames.
Continuous synthetic pointer sweeps measured 163.1fps at 1440px and 164.8fps at 390px, with a 6.3ms 95th-percentile frame interval and no intervals over 40ms.
Those results are in `sculpture-after-pointer.json`; add `--pointer` to the measurement command to repeat them.
Responsive hero audits now run as separate cases for each presentation and width, and browser workers are limited to two to reduce shared GPU contention.

## Independent visual review

The Impeccable reviewer returned `ship` for its five scored corrections: unobstructed AI portrait disclosure, immediate insurance explanation, visible journal expansion and return focus, readable body and conversion copy, and removal of decorative heading kickers.
Desktop, tablet, and mobile screenshots were reviewed in two bounded capture rounds.
There was no existing screenshot baseline, so historical visual regression is inconclusive.
Screenshots and the performance and Lighthouse reports are in `.impeccable/review/`.

The scoped sculpture extension received a separate independent review using both hero styles at three widths.
Its one requested correction was removal of the decorative introductory tagline above the hero.
The reviewer inspected the same eight recaptured views and returned `ship` for that scored fix, with no directly introduced visual regressions.
The seven hero-specific tests, production build, and lint passed again after that correction.
The earlier Lighthouse scores above describe the original portrait build; the new extension was checked with axe and the updated performance measurements.

The replacement shield, third Life chapters hero, and four-card repair received a fresh independent Impeccable review after implementation.
The reviewer inspected nine authoritative captures across desktop, tablet, and mobile and returned `ship`, with no material fixes.
The review confirmed contextual shield geometry, distinct chapter presentation, the three-way switch, qualified insurance copy, and intact foreground card ordering.
This review covers those changed surfaces; animation behaviour is additionally verified by the browser tests described above.

## Launch dependencies

Jayce's actual authorised portrait is still needed.
The generated image is visibly identified as an illustration and must not be represented as a real photograph of Jayce.
The site contains no fabricated awards, qualifications, client counts, or testimonials.
The user-supplied name, country, and WhatsApp number are wired in.
The drafted copy and planner-specific service availability should be reviewed before public launch.
After replacing the portrait and selecting a production domain, remove the preview noindex directive and add the final canonical and social-sharing URLs.
No deployment or confirmed appointment is claimed.
