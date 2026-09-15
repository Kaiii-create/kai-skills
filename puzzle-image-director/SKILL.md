---
name: puzzle-image-director
description: Generate, optimize, and audit AI-image prompts specifically for physical jigsaw puzzles. Use when the goal is a commercially usable puzzle image rather than a generic illustration. Enforce puzzle-friendly composition, high print quality, distributed visual anchors, edge readability, controlled detail density, safe margins, exact output aspect ratio, and conservative rights-risk screening. Prefer original fictional subjects, generic archetypes, licensed or public-domain material, and non-identifying human figures. When direct image generation is available, hand the audited prompt to the platform image-generation tool.
---

# Puzzle Image Director

Create images that are not merely attractive, but work well after being printed, cut into hundreds or thousands of pieces, packaged, sold, and assembled by hand.

Core principle:

> Every major region of the image should give the puzzler something visually identifiable to assemble.

A beautiful image can still make a poor puzzle if large areas are uniform, the center is overcrowded, the edges are empty, or many pieces carry nearly identical texture.

## Operating modes

Infer one mode from the request:

- **Create**: turn a short theme into a complete puzzle-ready image prompt.
- **Optimize**: rewrite an existing image prompt for puzzle suitability.
- **Audit**: diagnose why an image or prompt may perform badly as a jigsaw puzzle.
- **Variants**: create meaningfully different puzzle directions from the same theme.
- **Direct image**: when the user explicitly asks for the image itself, invoke the available image-generation capability after the prompt passes the puzzle and rights audits.

## Parameter lock

Record explicit user inputs before adding defaults. Never silently replace them.

- `主题`: the core subject or scene.
- `目标片数`: e.g. 300, 500, 1000, 1500, 2000 pieces.
- `成品比例`: intended print/puzzle aspect ratio.
- `成品尺寸`: physical dimensions if known.
- `输出像素`: exact pixel requirement if supplied.
- `风格`: realistic, painterly, fantasy, folk art, collage, illustration, etc.
- `难度`: easy, medium, hard, expert.
- `人像`: whether people are present and whether they are identifiable.
- `商业用途`: personal, gift, print-on-demand, retail, advertising, unknown.
- `文字`: allowed or forbidden.
- `品牌/IP`: any logo, character, franchise, artwork, product identity, or trademark explicitly requested.

When missing, use these defaults unless they conflict with the user's brief:

- `目标片数`: 1000
- `成品比例`: 4:3 landscape
- `难度`: medium
- `商业用途`: assume potentially commercial, so apply the stricter rights screen
- `文字`: no text, no watermark, no signature

## Puzzle suitability rules

### 1. Distributed visual anchors

A strong puzzle image needs multiple recognizable zones across the entire frame.

For a 1000-piece puzzle, aim for roughly 8–16 distinguishable visual anchors distributed across foreground, middle distance, background, left, center, right, and corners.

Anchors may include distinct buildings, tree or flower clusters, animals with different silhouettes, windows, doors, bridges, boats, lantern groups, mountains, architectural districts, structured cloud formations, unique props, reflections, roads, paths, stairs, arches, or rivers.

Do not place all interesting content in one central island while leaving the outer 30–40% visually empty.

### 2. Edge and corner usefulness

Puzzle edges are often solved early. All four sides should contain meaningful, readable information.

Require:

- distinct color or texture transitions along the perimeter
- at least one recognizable feature near each corner
- no four-corner field of identical sky, fog, grass, sand, snow, or darkness
- avoid a thick decorative frame unless the user explicitly wants one

### 3. Detail density balance

Avoid both extremes:

- **too sparse**: giant smooth gradients, empty skies, blank walls, featureless oceans, uniform fog
- **too noisy**: confetti detail, tiny repeated objects everywhere, micro-texture with no hierarchy

Prefer hierarchical detail:

- large forms readable from a distance
- medium structures that define regions
- fine details that reward close inspection

A 1000-piece image should contain rich but organized local variation across most of the canvas.

### 4. Repetition control

Repeated textures create frustrating pieces that are difficult for the wrong reason.

Limit large zones of identical leaves, brick grids, star fields, repeated windows, cloned flowers, uniform grass, same-sized roof tiles, evenly spaced lights, or homogeneous cloud texture.

If repetition is visually required, break it with color shifts, directional changes, interruptions, scale variation, shadow variation, or identifiable landmarks.

### 5. Color zoning

Use color to help region recognition without reducing the image to obvious blocks.

Prefer:

- 4–8 major color families across the canvas
- local hue variation inside each family
- visible warm/cool transitions
- unique accent colors tied to landmarks
- sufficient tonal separation between neighboring regions

Avoid monochrome images unless the user explicitly requests an expert-difficulty puzzle.

### 6. Composition

Prefer compositions that naturally distribute information, such as layered towns, botanical gardens, markets, festivals, fantasy cities, rooms, workshops, kitchens, harbors, coastlines, wildlife ecosystems, and seasonal landscapes with multiple terrain types.

Use one dominant composition system: diagonal flow, S-curve, layered depth, centered symmetry with rich flanks, radial arrangement, or structured panorama.

Do not rely on extreme shallow depth of field. Too much blur turns pieces into indistinguishable color smears.

### 7. Safe cropping and cut tolerance

Important subjects must not rely on exact piece boundaries.

Keep critical faces, hands, text, symbols, and focal objects away from the extreme outer crop. Maintain roughly 3–5% visual breathing tolerance around major focal elements when practical.

Never draw puzzle-piece outlines into the artwork unless the user explicitly asks for a puzzle mockup. The output artwork itself should be a clean master image.

## Piece-count adaptation

### 300–500 pieces

- larger landmarks
- clearer silhouettes
- stronger color separation
- fewer but more obvious regions
- lower micro-detail

### 750–1000 pieces

- balanced complexity
- 8–16 major anchors
- rich medium-scale detail
- good color zoning across the full image

### 1500–2000+ pieces

- increase the number of meaningful subregions
- add layered secondary details
- keep repetition under control
- allow more subtle transitions while preserving identifiable local clues

Do not increase difficulty merely by adding empty sky, darkness, fog, or repetitive texture.

## Print and image quality

Treat the generated image as a print master.

Requirements:

- request the highest native generation quality available
- prefer clean edges and coherent fine detail over artificial sharpening
- no JPEG artifacts
- no watermark
- no signature
- no UI chrome or mockup frame
- no visible puzzle-cut overlay
- no accidental text unless explicitly requested
- avoid tiny illegible glyphs and pseudo-lettering

If the user provides exact physical dimensions and print DPI, calculate the required pixels as:

`pixels = inches × DPI`

For commercial print, 300 DPI is a useful target when the workflow supports it, but do not claim that a generator natively produced a particular DPI unless it actually did. Pixel dimensions matter; DPI metadata alone does not add detail.

If the image generator has fixed native sizes, generate at the highest useful native resolution and recommend a separate high-quality upscale step before print rather than inventing unsupported dimensions.

## Aspect-ratio discipline

The puzzle's physical ratio controls the composition.

- keep the requested aspect ratio as a hard lock
- compose for that ratio from the beginning rather than cropping an unrelated image later
- preserve meaningful edge content after bleed/crop tolerance
- if exact print dimensions are supplied, reduce them to a ratio and state both physical size and ratio

## Rights and likeness risk screen

This is a conservative creative-risk screen, not legal advice.

### Green — preferred

Proceed normally with:

- original fictional worlds
- generic people who are not identifiable as real individuals
- original animals, landscapes, buildings, still life, fantasy scenes
- user-owned characters or artwork when the user states they own or control the rights
- public-domain subject matter, while avoiding copying a later protected adaptation

### Yellow — caution and transform

When a request depends on a recognizable real person, a distinctive branded aesthetic, a living artist's signature style, or a modern artwork used as close reference, remove identifying or protected features and convert the brief into a broader original direction.

Use broad period, medium, genre, lighting, palette, compositional, or wardrobe language instead of identity-specific imitation.

### Red — replace the protected identity

Do not design a commercial puzzle whose main selling point depends on unauthorized use of:

- copyrighted fictional characters
- recognizable franchise costumes or character designs
- protected logos or trademarks as central artwork
- modern copyrighted paintings, illustrations, posters, album art, movie stills, game art, or photographs
- a photorealistic recognizable person's face for merchandise without clear authorization

Replace the protected identity with an original alternative that preserves only the broad idea, genre, era, mood, or function.

### Human-likeness defaults

For commercial puzzle generation:

- prefer fictional, non-identifying people
- avoid exact face matching from public photographs for merchandise
- do not add signatures or artist marks
- do not imitate an identifiable private person without appropriate authorization and context

## Prompt construction order

Build the final generation prompt in this order:

1. **Output purpose** — clean master artwork for a physical jigsaw puzzle.
2. **Aspect ratio and orientation** — lock the canvas geometry.
3. **Main subject and world** — one concise premise.
4. **Composition system** — distribute information across the entire canvas.
5. **Puzzle anchors** — place recognizable landmarks in all major regions and near corners.
6. **Color zoning** — assign differentiated color families and accents.
7. **Depth and hierarchy** — foreground, midground, background, with readable forms at each depth.
8. **Detail logic** — rich organized local variation, no empty or repetitive zones.
9. **Lighting and atmosphere** — keep clarity across the frame; atmosphere must not erase detail.
10. **Material and style** — medium, surface, realism level, palette, texture.
11. **Rights-safety constraints** — original subjects and no protected identity dependence when relevant.
12. **Print-master exclusions** — no watermark, signature, border, mockup, puzzle lines, random text, UI, or compression artifacts.

## Default final-prompt quality clause

Unless the user asks otherwise, append this meaning in natural language:

> High-detail print-master artwork, coherent at full-frame and close viewing, rich organized micro-detail, distinct local color and texture clues across the entire canvas, strong edge and corner information, crisp readable forms, controlled atmosphere, no large featureless regions, no repetitive filler texture, no watermark, no signature, no border, no puzzle-piece overlay, no random text.

## Puzzle audit checklist

Before output or generation, verify all of the following:

- [ ] The requested ratio is explicit.
- [ ] The image has useful content near all four edges.
- [ ] Every corner differs visually from the others.
- [ ] The center is not the only interesting region.
- [ ] There are enough recognizable anchors for the target piece count.
- [ ] No large area is featureless unless difficulty is intentionally expert.
- [ ] Repeated textures are broken by meaningful variation.
- [ ] Neighboring zones have usable hue, value, form, or texture differences.
- [ ] Fine detail is organized rather than noisy.
- [ ] Depth-of-field blur does not destroy puzzle clues.
- [ ] Critical subjects are not clipped by the frame.
- [ ] No unintended text, watermark, signature, border, or puzzle outline appears.
- [ ] Rights/likeness risk has been classified.
- [ ] Protected character/logo/artwork dependence has been removed when necessary.
- [ ] For commercial use, identifiable human likeness is either appropriately authorized or replaced with a fictional non-identifying subject.

Do not pass the prompt to image generation until the checklist is satisfied.

## Output format

For prompt-only requests, return:

1. `Puzzle brief` — ratio, piece count, difficulty, style, commercial-use assumption.
2. `Rights check` — Green / Yellow / Red, with one-sentence reasoning.
3. `Puzzle-readiness` — short explanation of anchor distribution, edges, repetition control, and color zoning.
4. `Final prompt` — one clean copy-ready prompt.

For direct image requests, perform the same checks internally, generate the image with the available platform image tool, then report any important production caveat such as the need for upscale or print preflight.

## Do not

- do not treat “beautiful” as sufficient for puzzle suitability
- do not make difficulty by filling half the image with blank sky or fog
- do not use heavy bokeh across important regions
- do not insert puzzle-piece shapes into the master art
- do not promise exact physical DPI from an image generator that only controls pixels
- do not silently crop to a different aspect ratio
- do not make an unauthorized real-person or franchise identity the commercial centerpiece
- do not copy a modern artwork, movie still, game screenshot, poster, or album cover as the puzzle artwork
