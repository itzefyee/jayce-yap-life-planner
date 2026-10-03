---
name: Jayce Yap Zi Wen
description: A warm editorial portfolio for a Malaysian AIA life planner.
colors:
  paper: "#f5f2eb"
  white: "#fffaf3"
  ink: "#292e28"
  muted: "#626257"
  wine: "#a1253b"
  wine-dark: "#702135"
  line: "#dcd6ca"
  surface: "#fffdf8"
  shield-sage: "#657761"
  shield-gold: "#ae8755"
  shield-symbol: "#fff5df"
  chapters-wine: "#701c30"
  chapters-pale: "#fff7e9"
  chapters-apricot: "#ebbf9a"
  chapters-copy: "#eed8d8"
  chapters-rule: "#af6674"
  chapters-folio: "#f1d0ba"
  chapters-hover-ink: "#4c1121"
typography:
  display:
    fontFamily: "'Cormorant Garamond Variable', Georgia, serif"
    fontSize: "clamp(68px, 6.8vw, 96px)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "'Cormorant Garamond Variable', Georgia, serif"
    fontSize: "clamp(42px, 4.6vw, 66px)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  title:
    fontFamily: "'Cormorant Garamond Variable', Georgia, serif"
    fontSize: "35px"
    fontWeight: 400
    lineHeight: 1.13
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'DM Sans Variable', sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'DM Sans Variable', sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.5
  explanation:
    fontFamily: "'DM Sans Variable', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.9
  field:
    fontFamily: "'DM Sans Variable', sans-serif"
    fontSize: "16px"
    fontWeight: 400
  action:
    fontFamily: "'DM Sans Variable', sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.5
  sculpture-display:
    fontFamily: "'Cormorant Garamond Variable', Georgia, serif"
    fontSize: "clamp(76px, 7.5vw, 96px)"
    fontWeight: 400
    lineHeight: 0.83
    letterSpacing: "-0.04em"
  sculpture-display-compact:
    fontFamily: "'Cormorant Garamond Variable', Georgia, serif"
    fontSize: "88px"
    fontWeight: 400
    lineHeight: 0.83
    letterSpacing: "-0.04em"
  sculpture-display-tablet:
    fontFamily: "'Cormorant Garamond Variable', Georgia, serif"
    fontSize: "72px"
    fontWeight: 400
    lineHeight: 0.83
    letterSpacing: "-0.04em"
  sculpture-display-mobile:
    fontFamily: "'Cormorant Garamond Variable', Georgia, serif"
    fontSize: "clamp(72px, 19vw, 94px)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  sculpture-subheading:
    fontFamily: "'Cormorant Garamond Variable', Georgia, serif"
    fontSize: "clamp(22px, 2.3vw, 33px)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  sculpture-chapter-title:
    fontFamily: "'Cormorant Garamond Variable', Georgia, serif"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  hero-switch:
    fontFamily: "'DM Sans Variable', sans-serif"
    fontSize: "11px"
    lineHeight: 1.4
  chapters-display:
    fontFamily: "'Cormorant Garamond Variable', Georgia, serif"
    fontSize: "clamp(65px, 6.9vw, 96px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  chapters-title:
    fontFamily: "'Cormorant Garamond Variable', Georgia, serif"
    fontSize: "clamp(35px, 3.5vw, 51px)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  chapters-focus:
    fontFamily: "'Cormorant Garamond Variable', Georgia, serif"
    fontSize: "23px"
    lineHeight: 1.8
  protection-word:
    fontFamily: "'Cormorant Garamond Variable', Georgia, serif"
    fontSize: "37px"
    lineHeight: 0.96
    letterSpacing: "-0.03em"
rounded:
  square: "0"
  circle: "50%"
  contact-pill: "30px"
  hero-switch-outer: "30px"
  hero-switch-option: "24px"
  portrait-desktop: "220px 0 0 0"
  protection-layer: "4px 4px 60px 4px"
spacing:
  section-block: "100px"
  section-block-tablet: "72px"
  section-block-mobile: "64px"
  section-inline: "max(6.3vw, 24px)"
  button-padding: "14px 23px"
  field-padding: "11px 13px"
  booking-padding: "36px"
  hero-switch-padding: "3px"
  hero-switch-option-padding: "8px 17px"
components:
  life-chapters:
    backgroundColor: "{colors.chapters-wine}"
    textColor: "{colors.chapters-pale}"
    rounded: "{rounded.square}"
    padding: "65px 6.3% 26px"
  chapters-button:
    backgroundColor: "{colors.chapters-pale}"
    textColor: "{colors.chapters-wine}"
    rounded: "{rounded.square}"
    typography: "{typography.action}"
    padding: "{spacing.button-padding}"
  chapters-button-hover:
    backgroundColor: "{colors.chapters-apricot}"
    textColor: "{colors.chapters-hover-ink}"
  shield-separation:
    textColor: "{colors.ink}"
    height: "28px"
  hero-switch:
    rounded: "{rounded.hero-switch-outer}"
    padding: "{spacing.hero-switch-padding}"
  hero-switch-option:
    textColor: "{colors.muted}"
    typography: "{typography.hero-switch}"
    rounded: "{rounded.hero-switch-option}"
    padding: "{spacing.hero-switch-option-padding}"
  hero-switch-option-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.hero-switch-option}"
  button-primary:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.white}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "{spacing.button-padding}"
  button-primary-hover:
    backgroundColor: "{colors.wine-dark}"
    textColor: "{colors.white}"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "7px 0"
  icon-button:
    rounded: "{rounded.square}"
    size: "44px"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.field}"
    rounded: "{rounded.square}"
    padding: "{spacing.field-padding}"
  booking:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "{spacing.booking-padding}"
  coverage-tab:
    textColor: "{colors.muted}"
    rounded: "{rounded.square}"
    padding: "18px 0"
  coverage-tab-selected:
    textColor: "{colors.wine}"
  quiz-option:
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "12px 15px"
  protection-layer:
    textColor: "{colors.white}"
    rounded: "{rounded.protection-layer}"
    padding: "25px"
    width: "195px"
    height: "242px"
---

# Design System: Jayce Yap Zi Wen

## Overview

**Creative North Star: "The Editorial Portrait Feature"**

A warm editorial portrait feature brings a person, clear explanations, and a considered invitation into the same visual world.
Expressive serif headings, ivory surfaces, and restrained wine accents create a composed, personal atmosphere.

The layout has generous section spacing and compact practical details.
Photography, the layered shields, and the protection card deck provide the strongest visual depth, while interface controls remain precise and legible.
This document records the implemented system in `src/tokens.css` and `src/styles.css`, plus the scoped hero extension in `src/HeroExperience.tsx`, `src/hero-experience.css`, `src/shield-scene.ts`, `src/LifeChapters.tsx`, and `src/life-chapters.css`.
It does not imply owner approval of the generated portrait or drafted personal statements.

The default opening presents three distinct shield layers under the thesis "Life is connected."
An onsite Sculpture / Portrait / Life chapters switch offers an interactive shield, the preserved editorial portrait, and a wine-colored chapter narrative.
This user-requested extension retains the established palette and type pairing while adding local hero type sizes and a rounded presentation switch.

**Key Characteristics:**

- Warm paper surfaces and wine accents.
- Expressive serif headings paired with quiet sans-serif detail.
- Fine dividing rules and predominantly square controls.
- Sculptural protection layers and an asymmetric portrait crop.
- Three switchable hero presentations with contextual protection and life-stage choices.
- Purposeful motion with a complete reduced-motion override.

## Colors

The palette combines warm paper neutrals, dark olive-charcoal text, and a wine accent.

### Primary

- **Wine**, token `wine`, identifies consultation actions, selected coverage, emphasis, keyboard focus, and editorial details.
- **Deep Wine**, token `wine-dark`, darkens primary actions on hover and anchors the planning-check section.
- **Shield Sage** and **Shield Gold**, tokens `shield-sage` and `shield-gold`, distinguish income and family from the wine health shield.
- **Shield Symbol**, token `shield-symbol`, supplies the pale dimensional symbols on all three shields.

### Neutral

- **Paper**, token `paper`, forms the page background and inset planning surfaces.
- **Warm White**, token `white`, supplies light text on wine surfaces.
- **Ink**, token `ink`, supplies principal text.
- **Muted Olive**, token `muted`, supplies supporting copy and metadata.
- **Paper Rule**, token `line`, supplies dividing lines and quiet control borders.
- **Light Surface**, token `surface`, appears in alternating editorial sections and fields.

The root stylesheet defines the first seven tokens as CSS custom properties.
Light Surface is a recurring literal in the stylesheet.
Coverage artwork, the journal, contact area, and footer have additional local colors; these are contextual treatments rather than a second global palette.

### Scoped Life chapters palette

Life chapters uses `chapters-wine` as a full background field and `chapters-pale` for headings, selected timeline labels, buttons, and keyboard focus.
`chapters-apricot` accents italic emphasis, the signature, checklist marks, timeline numbers, and the selected timeline rule.
`chapters-copy` carries supporting copy; `chapters-rule` divides the identity, folio, and timeline.
`chapters-folio` warms the folio and italic takeaway, while `chapters-hover-ink` deepens button text on hover.
These local colors do not replace the paper-based page palette.

**The Wine Signal Rule.**
Use wine consistently for action, emphasis, selection, and focus so those states read as one family.

## Typography

**Display Font:** Cormorant Garamond Variable, with Georgia and serif fallbacks.

**Body Font:** DM Sans Variable, with a sans-serif fallback.

The serif carries personal expression through high contrast strokes, tight tracking, and occasional wine-colored italics.
The sans serif keeps navigation, forms, explanatory copy, and metadata clear.

### Hierarchy

- **Display** is the preserved portrait hero heading role, with the fluid desktop size in the frontmatter.
- **Headline** is the general section heading role; individual editorial headings intentionally adjust its size.
- **Title** is the base serif component heading role.
- **Body** is the global text baseline.
- **Explanation** is the actual supporting paragraph role, also used for coverage list items and FAQ questions.
- **Label** is the form-label role, with controls, consent, validation, and supporting notes generally matching its (12px) size.
- **Field** is the text-entry role, preserved at (16px) across device sizes.
- **Action** is the primary action and text-link role.

The large introductory paragraph uses (21px) with a line height of (1.5).
Supporting paragraphs commonly cap at (420px), with the about copy capped at (430px).
At the mobile breakpoint, the hero uses `clamp(59px, 14vw, 82px)`, and explanatory copy retains (14px).
The hero description uses (14px) on desktop and (13px) on mobile.
Article metadata and the quiz privacy note use (10px); the footer disclaimer uses (11px).
Decorative section kickers have been removed, leaving the heading itself to establish hierarchy.

### Scoped sculpture hero hierarchy

The `sculpture-display` family is local to the new opening and does not replace the original portrait display token.
At widths up to (1100px), its heading uses the compact (88px) step; at widths up to (800px), it uses the tablet (72px) step.
At widths up to (600px), it uses the mobile fluid token with its slightly more open line height.
The subheading uses its fluid desktop token, then (25px) at tablet and mobile widths; mobile line height becomes (1.25).
The chapter title uses (26px), becomes (24px) at tablet width, and returns to (26px) on mobile.
The signature uses (44px), (37px), and (36px) across desktop, tablet, and mobile.

Sculpture descriptions use (14px) on desktop, (12px) on tablet, and (13px) on mobile.
Chapter explanations use (12px) on larger screens and (13px) on mobile.
The style switch uses (11px) labels on desktop and (10px) at tablet and mobile widths.
These intentional local steps extend the documented typography range without changing the existing site's explanation and field roles.

### Scoped Life chapters hierarchy

The `chapters-display` and `chapters-title` roles belong only to the third hero.
At widths up to (1000px), the main heading becomes (66px) and the chapter title becomes (36px).
At widths up to (700px), the main heading uses `clamp(61px, 12vw, 78px)` and the chapter title uses (39px).
Introductory copy uses (15px), reduced to (14px) on mobile; story copy uses (13px), questions use (12px), and the italic takeaway uses the (23px) focus role.
Timeline labels use (14px) with (28px) serif numbers, reducing to (11px) and (25px) on mobile.

**The Two Voices Rule.**
Use the serif for expressive headings and the sans serif for practical reading and interaction.

## Layout

Desktop sections use a generous vertical rhythm and fluid horizontal padding.
The portrait hero uses a (1.03fr 1fr) split; coverage and contact use two columns, while process and journal use three.
Editorial copy and artwork sit alongside each other with clear gaps rather than dense boxed grids.

Responsive adjustments occur at maximum widths of (1100px), (800px), and (600px).
The first two progressively reduce type, gaps, and component padding.
At (600px), the principal sections stack, coverage tabs become two columns, and navigation becomes a toggle-controlled panel.
Mobile sections use (6%) horizontal padding.
The appointment date and time stack into one column at mobile width.
The about section starts with (85px) top padding on larger screens and (64px) on mobile.

At minimum width (1600px), the hero and header receive centered padding based on a (1440px) content measure.
General sections use a (1390px) measure.
The header is sticky and changes from (100px) to (80px), then (77px), with matching anchor scroll offsets.

The sculpture hero has a separate desktop grid of (1fr 1.1fr), a maximum outer width of (1600px), and (6.3%) side padding.
At tablet width the columns become equal with (5%) side padding.
At mobile width it stacks copy, sculpture, and topic explorer with (6%) side padding; the artwork and separation-control region is (420px) tall.
The explorer uses three desktop columns, drops its scroll cue at (1100px), and stacks on mobile.
Its consultation actions remain ordinary HTML outside the canvas.

Life chapters uses a separate (1.05fr 1fr) grid with a (10%) column gap and a three-column timeline below.
At (1000px), the gap narrows to (6%).
At (700px), the section becomes a single column with (6%) side padding, and the timeline moves between the introductory heading and the active story.
The three timeline choices remain adjacent, so changing chapters is available before reading or booking.
Wide screens use a centered (1400px) content measure.

## Elevation & Depth

The system is predominantly flat, using paper-tone changes and fine rules to separate content.
Shadow is reserved for selected interactive surfaces, the portrait seal, sculptural coverage layers, the floating contact action, and the modal.
The modal backdrop combines a dark translucent field with (4px) blur.

The shield sculpture uses three true extruded shapes with rounded bevels and raised health, income, and family symbols.
Shield geometry has an extrusion depth of (0.16) and bevel size and thickness of (0.06) in scene units.
The colored materials use metalness (0.4), roughness (0.3), and clearcoat (0.35), with warm studio lighting.
Layer separation and selected-layer emphasis produce actual depth while retaining a readable shield silhouette.
Two fine circular rules frame the scene, and a translucent ground oval uses (17px) blur.
This is a local sculptural treatment rather than a new shadow style for ordinary controls.

### Shadow Vocabulary

- **Primary action hover:** `0 7px 18px #641a2b17`.
- **Booking surface:** `0 10px 35px #59462b09`.
- **Protection layer:** `14px 22px 27px #4b443222`.
- **Portrait seal:** `0 6px 24px #412a2517`.
- **Floating contact:** `0 5px 18px #3b17231f`.
- **Privacy dialog:** `0 20px 70px #17191338`.
- **Mobile navigation:** `0 15px 20px #33291b0d`.

**The Sculptural Depth Rule.**
Keep ordinary editorial content flat and use the most visible depth to clarify the protection layers.

## Shapes

Buttons, fields, booking surfaces, and editorial panels have square corners.
Circles mark compact icons, the portrait seal, and selected quiz controls.
The floating contact control and the hero presentation switch are deliberate rounded exceptions.
It appears only after the hero has left the viewport, keeping the opening composition clear.

The portrait has one sweeping upper-left corner, reduced to (150px) at tablet and mobile widths.
Protection layers have a curved lower-right corner and small remaining corners.
Thin one-pixel rules organize content; selected coverage uses a two-pixel accent underline.

The hero presentation switch adds an outer (30px) radius and individual (24px) option radii.
These intentional local radius steps distinguish a choice of presentation; existing primary actions, forms, cards, and chapter choices retain their established shapes.

## Components

### Switchable hero

The default Sculpture variant presents three layered shields alongside the "Life is connected." heading.
The Portrait variant preserves the original portrait composition, AI disclosure, copy, and actions.
The compact switch uses a thin warm border, muted unselected labels, and an ink-filled selected option with warm-white text.
Each option is a named button with an `aria-pressed` state and the shared wine keyboard outline.
The switch has (3px) inner padding, a (2px) gap, and option padding of (8px 17px), reduced to (8px 14px) on tablet and (8px 12px) on mobile.

Choosing Portrait writes `?hero=portrait`, and choosing Life chapters writes `?hero=chapters`, so either view survives reload and can be shared.
Choosing Sculpture removes that parameter.
Only the chosen variant is mounted, preserving one H1 and one home anchor.
The switch is a scoped addition and does not change existing page controls.

### Connected protection topics

Three named options, "Your health," "Your income," and "Your people," select a concise explanation and emphasize the matching shield layer.
Selection uses wine text, a fine underline, and a small dot; the dot is omitted on mobile.
The explanation is announced through a polite live region.
Its action passes Medical protection, Critical illness, or Life & family into the consultation form before following the contact anchor.
The explanatory text and action remain usable when the renderer is unavailable.

### Shield separation and direct selection

The scene contains a wine health shield, sage income shield, and warm-gold family shield.
The native range input labelled "Explore the layers" moves from Together to Separated in one-percent steps and starts at (65%).
The current value is printed beside the label and exposed as a descriptive accessible range value.
Its track uses the wine accent and a (28px) control height.

Pointer selection raycasts the actual shield faces and updates the same topic state as the HTML choices.
A movement threshold distinguishes a selection from a drag or scroll gesture.
The named HTML topic buttons remain the keyboard alternative and continue working with the icon fallback.
The range remains directly operable while motion is paused or reduced.

### Life chapters

The third hero pairs pale editorial type on a wine field with a numbered story, three practical questions, and a consultation action.
The choices are Starting out, Growing a family, and A new chapter.
Each selected timeline button gains pale text and an apricot two-pixel top rule.
A polite live region announces the changed story.
Its action passes Medical protection, Life & family, or Policy review into the consultation form for the respective chapter.

The consultation button reverses the usual palette with a pale surface and wine text, turning apricot with deeper text on hover.
Keyboard focus is a pale (2px) outline offset by (5px), preserving contrast on the dark field.
The alternate planning-check link remains available below the main action.
The section's square controls and fine rules preserve the established editorial structure.

### Buttons and text links

Primary buttons use wine with warm-white text, a matching one-pixel border, and a minimum height of (53px).
Hover darkens the surface, adds the documented shadow, and shifts the arrow diagonally.
Press moves the button down by (1px).
Disabled quiz actions use a muted beige surface and remove the hover shadow.

Text links use an underline that expands from (20%) to full width.
Their arrows move horizontally by (3px).
Icon buttons use square (44px) targets.

The global keyboard focus treatment is a (2px) wine outline offset by (5px).
Form controls and grouped options use closer offsets of (1px) and (3px), respectively.

### Navigation

Desktop navigation uses compact sans-serif links with an expanding wine underline on hover.
Its consultation action is a smaller primary-button variant.
The sticky header includes a thin reading-progress rule.
Mobile navigation opens beneath the header as a paper-colored vertical panel.

### Coverage selector and protection layers

Coverage tabs use muted text and a fine baseline; the selected tab turns wine and gains a two-pixel underline.
All four coverage items remain mounted as persistent cards, each retaining its own color, icon, and label.
Selection calculates a cyclic rank and a deterministic stacking order of (4 - rank), bringing the chosen item forward.
The deck uses only two-dimensional translation and rotation, with no intersecting perspective planes or competing hover transforms.
Each rank offsets the card horizontally by (19px), vertically by (-17px), and rotationally by (7deg) from the base pose.
Transforms ease over (800ms); background and text colors transition over (700ms).
The visible layer word uses a (37px) serif on desktop and (30px) at tablet and mobile widths.
Cards measure (195px × 242px) on desktop, (160px × 215px) on tablet, and (160px × 190px) on mobile.

### Planning choices

Quiz options are full-width bordered rows with a trailing circular radio indicator.
Selection adds a light warm tint, wine border, and filled radio indicator.
Hover changes the border, and keyboard focus outlines the entire choice.
The progress indicator uses thin horizontal segments rather than a numeric badge.

### Cards and containers

The journal uses open image-and-type cards without an enclosing border or shadow.
Images begin with reduced saturation and gain a slight scale increase and full saturation on hover.
The circular image action inverts from paper to wine.

The planning quiz and appointment form use square paper panels.
The booking panel has the faint ambient shadow listed above.
Editorial article expansion adds an inset paper area and a top rule.
Opening an article moves focus to its detail panel and scrolls the panel into view.
Closing it restores focus to the originating card and scrolls back to that card.
Both scroll operations use instant movement when reduced motion is requested.

### Portrait disclosure

The portrait disclosure sits in normal document flow directly below the image rather than over the photograph.
Its explicit text is "AI illustration - Jayce’s photo coming soon."
It uses muted sans-serif text at (12px), reduced to (11px) on mobile, with (9px) top padding and no background.
The mobile portrait-and-disclosure region has a combined height of (505px).

### Inputs and request review

Fields use a light surface, one-pixel warm border, square corners, and a minimum height of (47px).
Text inputs and selects use (16px) text across device sizes.
Date and time inputs use (14px) on larger screens and (16px) on mobile, where the row stacks.
Mobile text fields increase to (49px) minimum height.
Focus uses a wine outline, and text insertion uses the same accent.
Meeting-format choices use adjacent outlined options whose selected state gains wine text, a wine border, and a warm tint.

Validation appears as (12px) dark-red text.
Consent, supporting form notes, review labels, and meeting-format choices use (12px) text.
The review state uses a serif heading, circular icon, and divided definition-list rows.
Keep the visual distinction between reviewing a request and confirming an appointment.

### FAQ and privacy dialog

FAQ rows are divided by fine rules and use a trailing plus that rotates into a close mark.
Expanded question text turns wine.
The privacy dialog is a square paper panel with an inset close control, readable paragraphs, and its own scrolling area.

### Motion

State transitions generally last (200ms) to (350ms).
Editorial content enters with short vertical movement.
The portrait hero heading enters over (1s), its reveal takes (1.3s), and coverage cards use an (800ms) eased transform.
The common expressive easing is `cubic-bezier(.16, 1, .3, 1)`.
The portrait also has a restrained scroll-driven vertical offset.

Under `prefers-reduced-motion: reduce`, all CSS animation and transitions stop, smooth scrolling is disabled, and the portrait uses a fixed offset.

The sculpture uses slow suspended movement, restrained mouse response, and eased repositioning of the selected and separated shields.
Its renderer is lazy-loaded, follows the display animation cadence, and caps device pixel ratio at (1.5).
Frame-independent exponential damping keeps pointer response and shield separation consistent across refresh rates.
Each shield symbol is merged into one mesh, preserving its geometry and materials while reducing the scene to six draw calls per frame.
Loading begins only when the sculpture is within (120px) of the viewport.
The renderer prepares shaders asynchronously and uses a (128px) studio environment map.
Graphics-context restoration regenerates that environment before showing the recovered scene.
Scroll progress and portrait offsets update their own elements rather than inherited styles on the document root.
A visible Pause motion / Play motion button controls animation unless the system requests reduced motion.
Reduced-motion and paused states keep a still scene; topic and separation changes then apply the new pose directly.
Animation also suspends when the scene is offscreen, the browser tab is hidden, or WebGL context is lost.
Selecting Portrait or Life chapters disposes the scene and its rendering resources.

A simple row of wine health, income, and people icons appears immediately and remains available if rendering fails or loses context.
The canvas fades in over (600ms) when ready while the fallback fades out over (300ms).
Switching hero variants uses a (500ms) entrance with (5px) upward settling.
The global reduced-motion override suppresses these transitions and entrances.

Life chapters changes its story with an (8px) vertical entrance over (550ms), using the same expressive easing.
Its active timeline rule expands over (450ms), and the arrow responds to hover over (200ms).
These animations and transitions are disabled under reduced motion.

## Do's and Don'ts

### Do:

- **Do** preserve the warm paper, wine, and olive-charcoal relationship.
- **Do** pair expressive serif headings with clear sans-serif controls.
- **Do** keep selected states and keyboard focus visibly tied to wine.
- **Do** preserve the square control language and reserve curves for the established signature shapes.
- **Do** maintain stacked mobile layouts and the reduced-motion override.
- **Do** keep the generated portrait disclosure readable until an approved portrait replaces it.
- **Do** keep sculpture typography, the Life chapters palette, and rounded switch tokens scoped to the switchable hero.
- **Do** keep topic explanations and consultation actions usable independently of WebGL.

### Don't:

- **Don't** apply rounded cards or heavy shadows to ordinary editorial content.
- **Don't** use the serif for form labels or dense practical instructions.
- **Don't** make essential information depend on hover or animation.
- **Don't** style an appointment request as a confirmed appointment.
- **Don't** apply the hero switch's rounded options to existing square form controls.
- **Don't** continue sculpture animation while paused, offscreen, hidden, or under reduced motion.
- **Don't** reintroduce perspective planes or hover transforms into the four-card coverage deck.
