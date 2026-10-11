# Targeted research and threat model

## Authoritative sources

- [OWASP Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet) - relevant because the static site serves script, style, image, and external-navigation capabilities from a public origin.
- [OWASP HTTP Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html) - relevant to browser-enforced framing, MIME-sniffing, referrer, and permissions protections.
- [Render static-site header documentation](https://render.com/docs/static-site-headers) - relevant because `render.yaml` controls the project-owned deployment headers.

## Applicable threat categories

| Category | Why it applies | Safe method |
| --- | --- | --- |
| Browser content injection | Public pages can be exposed to future HTML or dependency injection defects. | Inspect DOM sinks and evaluate a restrictive static CSP design. |
| Clickjacking and browser capabilities | A public marketing page has no intended embedding or camera, microphone, or location features. | Inspect deployment header configuration. |
| External-navigation injection | Contact and resource links cross an origin boundary. | Trace link construction and check encoding, fixed destinations, and opener isolation. |
| Dependency supply chain | The browser bundle is built from npm packages. | Run the lockfile-backed npm audit and build. |
| Sensitive-data exposure | The contact preparation flow handles visitor-entered text. | Inspect storage and transmission paths without submitting to third parties. |

## Attack paths

1. A future injection flaw could load an untrusted script or permit the page to be framed, absent restrictive response headers.
2. Visitor-supplied contact text could alter a deep-link destination if it were interpolated without URL encoding.
3. A compromised dependency could reach visitors through the static bundle.

## Rejected or inapplicable categories

SQL injection, server-side request forgery, path traversal, insecure deserialization, authentication bypass, session fixation, file upload, and server command execution are not applicable to this repository's static client-only architecture.
CSRF is not applicable because the site does not issue state-changing HTTP requests or submit forms to an application backend.
