# Jayce Yap Zi Wen

A responsive personal portfolio for an AIA Life Planner in Malaysia, built with React, TypeScript, and Vite using Impeccable and ECC guidance.

## Run locally

Use Node.js 24, matching `.node-version` and the Render build environment.

```sh
npm ci --include=dev
npm run dev
```

The development site runs at http://127.0.0.1:5173.

```sh
npm run build
npm run preview
npm test
```

The production output is `dist/` and can be hosted on a static hosting service.
The E2E suite uses installed Google Chrome.

## Deploy to Render

Create a **Static Site** connected to the private GitHub repository and grant Render access to that repository.
Alternatively, create a **Blueprint** from the repository to apply `render.yaml`, including the SPA rewrite and immutable caching for hashed assets.

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Root directory | Leave blank (repository root) |
| Build command | `npm ci --include=dev && npm run build` |
| Publish directory | `dist` |
| Start command | None; static sites do not run a server process |
| Node.js | 24, selected by `.node-version` |
| Environment variables | None required |

For a manually configured Static Site, add a rewrite from `/*` to `/index.html` under Redirects/Rewrites.
The `start` and `preview` npm scripts are for local build previews only.
Render serves the built files directly.
The current preview remains `noindex, nofollow`; review the Content and launch section before making it searchable.
Local screenshots and performance captures referenced by `QA.md` are excluded from Git and can be regenerated with the test and measurement scripts.

See the [Render Blueprint reference](https://render.com/docs/blueprint-spec) for the deployment configuration format.

## Visitor journey

- The default hero has three interactive 3D shields for health, income, and family, with a keyboard-operable separation slider and direct shield selection.
- The onsite **Sculpture / Portrait / Life chapters** switch preserves the original portrait and adds a wine-coloured chapter explorer.
- `?hero=portrait` and `?hero=chapters` open the alternatives directly and survive refresh.
- Life chapters lets visitors explore starting out, growing a family, and reviewing changed circumstances; each action carries the matching topic into the enquiry form.
- The sculpture supports pause, reduced motion, and a fallback for devices without WebGL.
- Four keyboard-operable protection tabs explain medical, critical illness, life, and policy review topics.
- A three-question check prepares a conversation topic without collecting personal information.
- Journal notes expand inline, and FAQs expose their open state to assistive technology.
- The consultation form validates name, consent, and preferred date, then displays an editable review.
- The visitor opens and sends their own WhatsApp message to **+60 14-611 3822**.
- An appointment remains a request until Jayce confirms it.
- Restarting the check-in clears previously attached answers; the enquiry form can also remove them without losing the visitor's details.
- Browser Back keeps the hero selection in sync with its URL, and direct section links work on initial load.

No backend, credentials, tracking scripts, cookies, or database are needed.
Form and quiz data remain in memory until the visitor chooses to open the prepared WhatsApp URL.
Opening that URL shares the draft with WhatsApp, even before the visitor sends it to Jayce.

## Content and launch

The identity and WhatsApp destination were supplied by the user.
Edit contact configuration, education content, and source links in `src/content.ts`.
Presentation and first-person copy live in `src/App.tsx`.
The switchable hero lives in `src/HeroExperience.tsx` and `src/hero-experience.css`.
Its Three.js scene is loaded separately from `src/shield-scene.ts` and releases its resources when visitors switch to another hero.
Scene loading starts only within 120px of the viewport, so direct enquiry visits avoid the graphics download until needed.
Shaders prepare asynchronously, lighting uses a 128px environment map, pointer work is coalesced per frame, and scroll styles update only the affected elements.
The sculpture follows the display refresh cadence with frame-independent damping and six draw calls per frame.
Context restoration regenerates the lighting before showing the scene again.
The third presentation lives in `src/LifeChapters.tsx` and `src/life-chapters.css`.
The current portrait is an AI-generated illustrative asset, visibly disclosed on the website.
Replace `public/images/portrait.webp` with Jayce's authorised photograph, update its alt text, and remove the illustrative-portrait notices only after replacement.
Review the drafted first-person copy, service formats, and AIA brand usage before public launch.
No qualifications, awards, testimonials, or performance claims have been invented.
The preview includes `noindex, nofollow`; remove that meta tag in `index.html` when the approved site is ready for indexing.
Add the final production URL and social-sharing image when a domain is selected.

## Sources

The general insurance explanations link to official [AIA Malaysia medical protection information](https://www.aia.com.my/en/our-products/health-protection/medical-protection.html), [critical illness information](https://www.aia.com.my/en/our-products/health-protection/critical-illness-protection.html), and [insurance FAQs](https://www.aia.com.my/en/help-support/faq/insurance-takaful-plans.html).
The site does not quote premiums or represent the planning check as a personalised recommendation.

Asset origins and the exact portrait prompt are recorded in `ASSETS.md`.
Fonts are self-hosted DM Sans and Cormorant Garamond, distributed with their package licenses.
Icons are Lucide.

## Verification

The Playwright suite exercises the real rendered interface, including all quiz outcomes, invalid forms, date validation, keyboard tab navigation, article and FAQ controls, mobile navigation, privacy-dialog focus, and the prepared WhatsApp destination.
WhatsApp navigation is intercepted during testing, so the suite does not send messages.
Responsive captures and axe scans run at 375, 768, and 1440 pixels.
Automated accessibility checks do not substitute for a full screen-reader audit.

See `QA.md` for final results and `.impeccable/review/` for screenshot evidence.

`npm run lint` runs TypeScript and formatting checks.
To reproduce the performance measurement, run the production preview on port 4173 and use `npm run test:performance`.
The measurement simulates a slower connection and CPU; it is a local lab result, not a real-user field measurement.
`node scripts/interaction-performance.mjs after` measures all three hero variants and a representative interaction journey at mobile and desktop widths.
The Event Timing sample is recorded separately from field INP, which requires real-user data.
