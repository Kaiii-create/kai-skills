# Portrait Quality Scorecard

Use this scorecard for independent forward-testing of the complete skill. Do not award a production score from documentation review alone; inspect compiled prompts and, for representative Direct Image cases, the returned images.

## Critical gates

A candidate cannot score 9.5 or higher if any of these fail:

1. A HARD, LOCK, FORBID, adult-age, reference-role, or safety outcome is lost.
2. More than one recipe body is loaded, or a recipe overrides user/reference intent.
3. A registry recipe has no corresponding file, executable state patches, protective check, or Avoid boundary.
4. A multi-reference prompt collapses roles or omits a per-asset negative scope fence.
5. Direct Image success is claimed without a returned image or after a protected failure remains undisclosed.
6. A selected recipe's concrete Protective Check visibly fails—such as an extra person in a single-subject clean-lifestyle portrait—and success is claimed without the permitted targeted retry or disclosed limitation.
7. A selected recipe has no three-variant scenario bank, more than one scenario/overlay is combined, or an overlay changes identity, scene, wardrobe class, aspect, subject count, or reference scope.
8. A beauty-forward or ancient `BRIGHT_AIRY` result is visibly gloomy, underexposed, gray-skinned, dominated by deep navy/charcoal mass, or clipped in pale skin/fabric/clouds and is claimed successful without the permitted targeted retry or disclosed limitation.

## Weighted score — 10 points

| Dimension | Weight | Full-credit evidence |
|-----------|-------:|----------------------|
| Style-spectrum coverage | 2.0 | Fifteen recipes cover lifestyle, modern-oriental, cinematic night, editorial, studio, urban environment, analog, low-key art, high-key minimal, professional use, general gufeng heroine, historical Hanfu, cold xianxia, bright luxury gufeng, and ancient beauty close-up without a major supported branch missing |
| Recipe executability | 2.0 | Every recipe has three positive scenario variants and changes several concrete VS paths across subject/action, wardrobe, environment, composition/camera, lighting, color, or texture; protective checks and scenario anchors are observable |
| Differentiation | 1.5 | Adjacent recipes produce materially different composition, light, spatial, styling, or texture decisions rather than synonym swaps |
| Triggering and boundaries | 1.5 | Aliases are explicit; empty taste words do not trigger; multi-cue cases select one recipe deterministically; neighboring styles have clear exclusions |
| Reference compatibility | 1.0 | Identity LOCK, wardrobe/pose ADAPT, lighting INSPIRE, IGNORE domains, and per-asset fences survive recipe use |
| Photographic coherence | 1.0 | Real skin, motivated light, explicit exposure/tonal distribution, plausible action/hands/contact, intentional subject count, controlled background people/prop budget, spatial relation, and anti-cutout behavior hold across tested styles |
| Runtime maintainability | 0.5 | Registry stays index-sized, progressive loading selects one recipe/one scenario/at most one overlay, and runtime never loads tests/examples |
| Safety and protected acceptance | 0.5 | Adult/safety rules, protected outcome checks, classified one-retry maximum, and honest limitation reporting remain intact |

## Evidence set for a 9.5 claim

- Static validation and packaging tests pass.
- All cue and boundary cases in `recipe-cases.md` pass by inspection or agent execution.
- At least fifteen Prompt Mode forward cases cover every recipe once.
- Static coverage confirms exactly forty-five scenario variants and five bounded temperament overlays.
- Direct Image evidence covers text-only, single-reference identity preservation, multi-reference role separation, and every newly added ancient-portrait recipe.
- An independent evaluator scores the evidence with this rubric and identifies no critical-gate failure.

Score bands:

- `9.5–10.0`: production-grade style system; no critical failure and only minor polish gaps.
- `8.5–9.4`: strong and usable, but one meaningful coverage, boundary, or evidence gap remains.
- `7.0–8.4`: solid core with visible blind spots.
- `<7.0`: unstable routing, weak differentiation, or protected outcomes at risk.
