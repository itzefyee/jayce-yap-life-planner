# Asset provenance

## Portrait

`public/images/portrait.webp` was generated using the built-in image generation tool and optimised with FFmpeg.
It is illustrative and is not a photograph of Jayce Yap Zi Wen.
The original is retained at `C:/Users/spoop/.codex/generated_images/01a10168-56c7-7310-b9ee-b109ac0b119c/exec-62b2f8e7-b4f1-49ec-8b11-6a045c705e36.png`.
The image was commissioned before the user confirmed Malaysia; it is a fictional individual, and no actual nationality is asserted on the website.

Exact generation prompt:

> Use case: photorealistic-natural.
> Create a sophisticated editorial portrait for a fictional female Singaporean insurance life planner website prototype.
> Landscape 3:2 image, ultra high quality photography.
> A warm confident professional Chinese Singaporean woman around 30 with medium-length dark brown hair, cream tailored suit, soft white blouse, natural smile, sitting gracefully in a dark rust terracotta modern lounge chair.
> Subject on right half of frame with generous space around her, upper thighs to top of head visible, hands naturally resting together.
> Background: warm beige travertine wall, subtle sunlit architectural shadow from left, a single olive branch blurred on right.
> Tactile natural materials, art-directed luxury magazine, creamy neutral color grading, direct friendly eye contact, realistic skin and fingers, medium format portrait photography, timeless and inviting.
> No text, no logos, no graphics, no watermark.

## Journal photography

Images are downloaded locally, so visitors do not depend on external image hosts.

| Asset | Origin |
| --- | --- |
| `public/images/journal-health.webp` | https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=720&q=85&fit=crop&auto=format |
| `public/images/journal-life.webp` | https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=720&q=85&fit=crop&auto=format |
| `public/images/journal-notes.webp` | https://images.unsplash.com/photo-1455390582262-044cdead277a?w=720&q=85&fit=crop&auto=format |

## Code-rendered assets

The protection sculpture is original procedural 3D geometry rendered with Three.js in `src/shield-scene.ts`.
Three bevelled extruded shields carry dimensional health, income, and family symbols, physical wine, sage, and gold materials, and generated studio lighting.
The original knot geometry was removed at the user's request.
No external model, texture download, or portrait is required by the sculpture hero.
Three Lucide symbols provide a fallback when WebGL is unavailable, while all topic controls remain available in HTML.
The initials monogram and favicon use typography.
The four-card protection deck uses independent, persistent CSS layers with two-dimensional transforms and explicit paint order.
This prevents the intersecting-plane clipping reproduced in the previous three-card illustration.
The flower is a lightweight CSS ornament.
UI icons come from Lucide React.
