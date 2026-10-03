# Switchable hero extension

This is the historical first extension; the user's subsequent rejection of the knot and request for a third option are implemented under `hero-v3-direction.md`.

The user requested an interesting, distinctive, professional new hero while keeping the original switchable on the page.
This is a scoped extension of the established ivory, wine, charcoal, and expressive-serif visual system.

## Thesis

Life is connected, and different protection needs belong in one considered conversation.
An actual dimensional ribbon sculpture conveys that connection while the adjacent controls explain medical, critical illness, and family protection in concrete terms.

## First viewport

A quiet onsite Sculpture / Portrait control sits below the existing navigation.
The new default presents a large two-line serif heading, a concise subheading, a consultation action, and Jayce's name opposite a wine-red continuous trefoil ribbon.
A three-topic explorer below the composition changes the explanation and passes the selected topic into the existing consultation form.
The original portrait hero retains its composition, copy, image disclosure, and actions when selected.

## Form and motion

The sculpture is actual WebGL geometry with a flattened elliptical section, studio lighting, a slow suspended motion, and restrained pointer response.
It rotates toward the selected protection topic.
The renderer is lazy-loaded, capped at 30 frames per second and 1.5 device pixel ratio, pauses out of view or in hidden tabs, and disposes its resources when the original hero is selected.
Visitors can pause motion, and reduced-motion users receive a still sculpture.
An immediate CSS fallback preserves the composition if WebGL is unavailable.
Critical explanations and all calls to action remain ordinary accessible HTML.

## State

The style switch uses named buttons with pressed states.
Portrait choice is represented by `?hero=portrait`, preserving it on reload and allowing a direct link without personal-data storage.
The default sculpture view removes that query parameter.
Only the active hero is mounted, with one H1 and one home anchor.

## Verification scope

Capture both hero variants at 375, 768, and 1440 pixels.
Test toggling, reload, keyboard operation, topic handoff, motion pause, reduced motion, WebGL failure, and the existing consultation journey.
No new financial claims, credentials, or fabricated proof are introduced.
