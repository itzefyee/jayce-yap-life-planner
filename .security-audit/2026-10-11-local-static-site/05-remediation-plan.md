# Remediation plan - approval required

## SA-001

| Item | Plan |
| --- | --- |
| Risk | The repository-owned Render configuration does not declare defense-in-depth browser security headers. |
| Change | Add `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and `X-Frame-Options` rules for `/*` in `render.yaml`. |
| CSP | Use a static-site policy that permits same-origin scripts, assets, local fonts, and WebGL while blocking objects, framing, arbitrary network connections, and base-tag injection. `style-src 'unsafe-inline'` remains necessary because the current React components intentionally use inline CSS custom properties. |
| Why | The controls reduce the impact of future injection, clickjacking, MIME sniffing, unnecessary browser permissions, and cross-origin referrer disclosure. |
| Compatibility | Same-origin static resources continue to load. External AIA and WhatsApp links remain navigation links and are not blocked. The policy does not permit remote runtime resources. |
| Verification | Build the production bundle, serve it locally with the proposed headers, use a Chrome browser test to confirm no CSP violations or broken assets, then inspect the deployed response headers after the next Render deployment. |

No security finding requires a dependency change or application-code rewrite.
