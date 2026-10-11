# Security audit scope

## Target and authorization

The approved target is the local checkout at `C:\Users\spoop\OneDrive\Documents\Class\Side\astra\zw`.
The user requested a security audit and identified `https://jayceyap.xyz/` as its hosted deployment.
This audit does not probe the public deployment because the audit procedure requires separate, explicit authorization for production or public-host testing.

## Allowed execution boundary

Allowed activities are static source and configuration review, dependency scanning, and safe browser testing against the local Vite development or production-preview server.
No production host, third-party API, adjacent network, real user data, or destructive test payload is in scope.

## Assumptions

- The checked-out repository is the source for the stated deployment.
- The site is a public marketing site rather than an authenticated customer portal.
- No test account or sensitive fixture is required because the application has no authentication flow.

## Exclusions

- Render account and runtime configuration outside `render.yaml`.
- DNS, TLS certificate, CDN, domain registrar, and production HTTP-header verification.
- WhatsApp and AIA Malaysia, which are third-party destinations.
