# Findings

## SA-001 - Deployment configuration omits browser security headers

**Severity:** Low

**Confidence:** Confirmed in repository configuration

**Affected location:** `render.yaml`

### Evidence

The Render Blueprint defines only an immutable cache header for `/assets/*`.
It does not define `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, or framing protection.
The local Vite preview response similarly contains no equivalent security headers, although that does not prove the hosted Render response lacks dashboard-configured headers.

### Attack path and impact

The present React code does not expose a confirmed injection sink, and its external links use fixed destinations or URL-encoded visitor text with `noopener noreferrer`.
However, a restrictive header policy provides defense in depth against a future client-side injection, MIME confusion, unnecessary browser capabilities, referrer over-sharing, and deceptive framing.
Without it, the public site has no repository-managed browser control at this layer.

### Safe reproduction summary

Review `render.yaml` and request the local production preview response headers.
The only configured response header is `Cache-Control` for fingerprinted assets.
No production host was contacted.

## SA-002 - No known dependency vulnerability in the production dependency graph

**Severity:** Informational

**Confidence:** Confirmed at audit time

`npm audit --omit=dev --json` reported 0 vulnerabilities across 8 production dependencies.
This is a point-in-time result, not a guarantee about future dependency releases.

## Negative results that constrain risk

- No `dangerouslySetInnerHTML`, DOM HTML assignment, `eval`, dynamic function construction, client storage, API fetch, WebSocket, or upload handling was found in application source.
- Contact-message text is passed through `encodeURIComponent` before the WhatsApp deep-link URL is built.
- All inspected new-tab external links include `rel="noopener noreferrer"`.
- A local Chrome load completed with no page errors.
