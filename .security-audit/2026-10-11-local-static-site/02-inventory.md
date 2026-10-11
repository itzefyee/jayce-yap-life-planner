# Asset inventory

## Stack

| Area | Evidence |
| --- | --- |
| Application | React 19.3 with TypeScript, bundled by Vite 8.3. |
| Deployment | Render Static Site, configured by `render.yaml`. |
| User interface | A single-page static portfolio and insurance-planning site. |
| Client libraries | Lucide React, Three.js, local font assets. |
| Testing | Playwright with Axe accessibility checks and TypeScript/Prettier linting. |

## Entry points and data flows

`index.html` loads `src/main.tsx`, which renders the React single-page application.
The quiz and contact-preparation flow assemble a prefilled `https://wa.me/` URL using `encodeURIComponent` and open it through a user-activated link.
The application links to curated AIA Malaysia resources in `src/content.ts`.
The application has no server routes, API requests, authentication, cookies, local or session storage, database, file upload, or user-generated HTML rendering.

## Trust boundaries

- Visitor-controlled selections and contact-name text remain in the browser until included in a WhatsApp deep link.
- The WhatsApp target and AIA resources are external trust boundaries.
- The static-host response headers are configured only through `render.yaml` in this repository.

## Sensitive assets and secrets

No secrets or credentials were found in tracked source or configuration during discovery.
`.env` files are ignored by Git.
The externally visible WhatsApp number is intentional contact information, not a secret.

## Available checks

- `npm audit --omit=dev --json`
- `npm run build`
- `npm run lint`
- `npm test`
- Safe Playwright checks against the local development server
