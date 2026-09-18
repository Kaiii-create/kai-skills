# Quality Evidence Record

Run date: 2026-09-17  
Environment: OpenAI Codex on Windows  
Candidate: fifteen-recipe `portrait-visual-director`

This file records observable validation evidence for the threshold defined in `quality-scorecard.md`. Historical failures remain visible in `live-image-results.md`; a failure is counted as corrected only where a later targeted verification exists.

## Static and packaging validation

| Check | Command | Result |
|------|---------|--------|
| Repository tests | `npm test` | PASS — 47 tests, 47 passed, 0 failed |
| Skill structure | `python -X utf8 .../quick_validate.py portrait-visual-director` | PASS — `Skill is valid!` |
| Package dry run | `npm pack --dry-run` with isolated cache | PASS — 91 files; all required runtime, recipe, Director, brightness, scenario, evidence, and example assets present |
| Whitespace/error check | `git diff --check` | PASS — no errors; line-ending notices only |

The package listing includes all fifteen recipe files, fifteen three-variant scenario banks, the universal Director expansion, explicit exposure/tonal profiles, five-overlay registry, compact visual libraries, failure diagnosis, the short-brief expansion module, the ratio/dimension output specification, the scorecard and evidence files, sixteen per-recipe/regression images plus the multi-reference example, every runtime module, and the Codex-only installer contract.

## V2 Director-expansion validation

Static coverage confirms exactly fifteen scenario-bank files, three variants per bank (forty-five total), five bounded temperament overlays, twelve observable failure classes, Visual State schema 2.5, explicit exposure/tonal fields, and progressive runtime loading. Every scenario variant includes positive person/moment/wardrobe/space/light direction plus concrete acceptance anchors.

Two fresh Direct Image regressions exercised the new five-role expansion with no retry:

| Case | Route | Observable result |
|------|-------|-------------------|
| One-line Hanfu beauty | `gufeng-heroine` → `GH01` | PASS — one adult subject, readable face and celadon/ivory/gray layers, coherent skirt-lifting action, rain-washed Jiangnan depth, no tourist crowd, fantasy effect, game-CG finish, or cropped hem |
| Clean café lifestyle | `natural-lifestyle` → `NL01` + gentle temperament | PASS — one adult subject, empty café background, cardigan and inner layer both visible, one cup already placed and released, off-camera window gaze, no chin-rest pose, direct-camera stock smile, prop cluster, or beauty-filter skin |

Both returned files measured 1086 × 1448, exactly `3:4` with 0% ratio error. These runs are current implementation evidence, not an independent rescore; the historical independent 9.85/10 result below remains labeled to its original candidate.

## V2.5 bright-airy ancient regression

The dark xianxia failure supplied by the user measured 1086 × 1448 with sampled mean luminance `96.1`, `39.4%` deep-value samples below luma 64, and only `1.9%` bright samples above luma 192. Its large night sky, mountains, terrace and water produced a dark first read despite pale clothing.

After adding `BRIGHT_AIRY`, explicit exposure/tonal state, daylight-led xianxia scenarios and `F12_EXPOSURE_TONE`, a fresh `cold-xianxia → CX01` Direct Image run passed without retry:

- 1086 × 1448, exact `3:4`;
- sampled mean luminance `191.9`;
- deep-value samples reduced to `3.5%` and bright samples increased to `57.1%`;
- near-white samples above luma 250 remained `1.3%`, and pure-white samples `0.012%`, so the result was bright without broad clipping;
- one adult subject, warm-neutral readable skin, both eyes and facial planes clear, pale cloud/stone separation, open hair/sleeve shadows, translucent-over-opaque garment layers and embroidery texture;
- no giant moon, storm sky, deep-navy dominance, black mountain wall, extra person, particle effect, levitation, game-CG finish or visible anatomy failure.

The accepted packaged regression image is `assets/examples/cold-xianxia-bright-v2.jpg`; the earlier dark example remains in the repository as historical evidence but is no longer the README showcase.

## Baseline independent Prompt Mode forward tests

Executor: `gpt-5.6-luna`, using the installed skill.  
Result: PASS for routing, compilation, protected literals, and single-recipe loading; image tool call count was zero for every Prompt Mode case.

### Direct recipe coverage

| Case | Recipe | Result |
|------|--------|--------|
| T1 natural bakery moment | `natural-lifestyle` | PASS |
| T2 contemporary museum | `modern-oriental` | PASS |
| T3 rain-night bus stop | `cinematic-night` | PASS |
| T4 silver-gray fashion studio | `editorial-fashion` | PASS |
| T5 warm-gray controlled studio | `studio-portrait` | PASS |
| T6 elevated urban walkway | `environmental-urban` | PASS |
| T7 35mm balcony | `analog-film` | PASS |
| T8 dark sculptural portrait | `fine-art-low-key` | PASS |
| T9 warm-white high key | `high-key-minimal` | PASS |
| T10 architect personal brand | `professional-portrait` | PASS |

All ten baseline compiled prompts made materially different decisions in action, wardrobe hierarchy, subject-space relation, composition, light, color, or texture; none merely replaced a style adjective. These independent Prompt Mode runs predate the five ancient-portrait additions and are retained as baseline evidence rather than presented as coverage of the new routes.

### Cue and boundary coverage

| Recipe case | Forward evidence | Result |
|-------------|------------------|--------|
| Q01 no supported cue | B1 ordinary morning window portrait | PASS — `recipe_id: null` |
| Q02–Q11 ten direct cues | T1–T10 | PASS |
| Q23 modern-oriental + cinematic night | T11 | PASS — only `modern-oriental` loaded |
| Q24 studio + fashion editorial | T12 | PASS — only `editorial-fashion` loaded |
| Q25 studio + high key | B2 | PASS — only `high-key-minimal` loaded |
| Q26 studio + professional purpose | B3 | PASS — only `professional-portrait` loaded |
| Q27 35mm + natural lifestyle | T13 | PASS — only `analog-film` loaded |
| Q28 empty taste words | B4 | PASS — `recipe_id: null` |
| Q33 equally explicit cues with stated lead | B5 | PASS — only first/lead `fine-art-low-key` loaded |

Protection cases Q17–Q22 are supported by the global priority contract, static section checks, prior identity/HARD/FORBID live runs, four-reference role isolation, and per-asset fence verification. Baseline recipe-specific checks Q34–Q42 are covered by T2/T4–T10 plus the post-fix modern-oriental degree-boundary image in `live-image-results.md`.

### Ancient one-line route evidence

Executor: root agent, using the updated local skill and Codex built-in image generation.

| Case | Selected recipe | Result |
|------|-----------------|--------|
| “生成一个汉服美女” | `gufeng-heroine` | PASS — complete 3:4 face-led heroine frame generated without clarification |
| Song-oriented reality-grounded brief | `historical-hanfu` | PASS — coherent garment/hair/setting direction; no fantasy or generic robe collapse |
| Cold xianxia brief | `cold-xianxia` | PASS — readable neutral face light, cool garment flow and controlled atmosphere |
| Red-gold palace brief | `bright-luxury-gufeng` | PASS — face-first red/ivory/gold hierarchy with structured crown and garment |
| Ancient noblewoman beauty close-up | `ancient-beauty-closeup` | PASS — dimensional skin, precise huadian/ornament and stable facial structure |

These five cases provide live Direct Image evidence for Q12–Q16 and protective checks Q43–Q47. They are not labeled independent Prompt Mode evaluations.

## Direct Image cumulative evidence

| Required path | Evidence | Result |
|---------------|----------|--------|
| Text-only | Rain-night modern-oriental and post-fix tea-room degree boundary | PASS |
| Single-reference identity | Person-preserving night-scene relighting | PASS |
| Multi-reference roles | Four-role identity/wardrobe/pose/light isolation with red HARD fact | PASS |
| Newly added recipe | Editorial-fashion silver-gray studio image | PASS |
| Complete baseline recipe gallery | Six additional accepted images plus the four existing style images | PASS — the original ten recipes each have a packaged Direct Image example |
| One-line ancient expansion | Five accepted generated images from sparse or route-defining ancient briefs | PASS — all five new ancient recipes have a packaged Direct Image example; all fifteen recipes are represented |

The new editorial image was independently viewed at `assets/examples/editorial-fashion.jpg`: adult subject, 3:4, structured silver-gray coat, light-gray seamless studio, garment-led hierarchy, coherent key/cast-shadow direction, readable fabric and skin, and no protected avoid violation. No retry was warranted.

## Clean-lifestyle regression evidence

The rewritten `natural-lifestyle` contract was tested against the exact short brief that exposed the earlier failure. The post-fix Direct Image output passed every concrete recipe predicate: exact 3:4 metadata, one visible adult subject, no background people, both named clothing layers, off-camera natural gaze, no chin-rest/direct-camera stock pose, one peripheral coffee cup, no prop clutter, and coherent window light. The accepted image replaced `assets/examples/natural-lifestyle.jpg` after a second inspection of the packaged 540 × 720 JPEG.

This closes a critical portrait-priority gap without changing the historical independent `9.85 / 10.00` score below. The evidence strengthens that score; it does not claim a new independent rescore.

## Critical gates

| Gate | Result |
|------|--------|
| Protected HARD / LOCK / FORBID / adult / safety outcome survives | PASS |
| At most one recipe body loads and recipe never overrides user/reference intent | PASS |
| Every registry recipe resolves to executable patches, protective check, and Avoid boundary | PASS |
| Multi-reference roles remain distinct with per-asset negative fences | PASS |
| Image success is claimed only after a returned image and protected-outcome check | PASS |

No critical-gate failure was observed in the final candidate.

## Baseline independent final score

Evaluator: `gpt-5.6-luna`  
Method: cross-check this evidence record, the quality scorecard, live image history, T1–T13, B1–B5, and direct visual inspection of the new editorial image.

| Dimension | Score |
|-----------|------:|
| Style-spectrum coverage | 2.00 / 2.00 |
| Recipe executability | 2.00 / 2.00 |
| Differentiation | 1.45 / 1.50 |
| Triggering and boundaries | 1.50 / 1.50 |
| Reference compatibility | 1.00 / 1.00 |
| Photographic coherence | 0.95 / 1.00 |
| Runtime maintainability | 0.50 / 0.50 |
| Safety and protected acceptance | 0.45 / 0.50 |
| **Total** | **9.85 / 10.00** |

Independent conclusion at the time of review: the ten-recipe candidate honestly exceeded the 9.5 threshold with all five critical gates passing. The recorded 9.85 score is preserved as historical baseline evidence. The later five-recipe ancient expansion has passed static validation, package checks, and five live image regressions, but it is not retroactively assigned a new independent score without another independent forward-testing pass.
