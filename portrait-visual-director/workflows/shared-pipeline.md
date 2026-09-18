# Shared Runtime Pipeline

This is the executable orchestration contract for all portrait modes. Work on one `VisualState`; intermediate notes and patches are derived work products, not parallel state.

# Minimal load plan

1. Read the selected mode workflow, this file, `core/visual-state.md`, `core/constraint-lock.md`, `director/director-expansion.md`, and `director/brightness-system.md`.
2. If images exist, also read `reference/reference-director.md`, `reference/reference-map.md`, and `reference/conflict-resolution.md`.
3. If a supported style cue exists, read `recipes/registry.md`, exactly one recipe, and only its matching file under `director/scenarios/`; select exactly one scenario.
4. If a temperament cue is useful and compatible, read `director/overlay-registry.md` and select at most one overlay.
5. Select one exposure profile through `director/brightness-system.md`, then read only the needed sections of `director/visual-libraries.md` for material `UNSET` fields. For a sparse/actionable brief or explicit beauty/heroine cue, also read `core/short-brief-expansion.md`.
6. If ratio, orientation, platform framing, pixel dimensions, resolution, or export size is mentioned, read `core/output-spec.md`.
7. Read `core/director-engine.md` to complete the frame.
8. Before output, read `safety/safety-rights-gate.md` and `compiler/prompt-compiler.md`.
9. Direct Image Mode only: read `compiler/adapters/gpt-image.md`. Read `director/failure-diagnosis.md` only after a candidate fails acceptance.

Never load `tests/*` or deleted design examples at runtime.

# Execute

## 1. Route and initialize

First classify the input as an independent request or an explicit revision of the current deliverable. A revision must clearly refer to the current result/state and request a change or continuation. Reusing the same files, image order, subject, or output mode does not by itself carry visual constraints across labeled cases, batch items, or separately requested deliverables.

For every independent request, create a new `meta.id`, store only its user text and intent summary, initialize every domain, constraint, reference collection, and control from empty defaults, and set `meta.stage: INITIALIZED`. Never copy a prior scene, aspect, forbid, or Director choice merely because references are reused. Set `meta.mode` from this request's image count. Decide Prompt Mode versus Direct Image Mode now; output mode is orchestration metadata, not a visual domain.

## 2. Lock explicit constraints

Apply `core/constraint-lock.md`. Literal user requirements populate their domain paths with USER provenance. Preserve/forbid instructions become constraints. Normalize ratio and explicit dimensions by `core/output-spec.md`; an inconsistent explicit pair is a HARD conflict. Advance to `LOCKED`.

## 3. Map references

- Text-only: write empty `assets` and `assignments` and advance to `MAPPED`.
- With images: map each asset to independent paths and modes. Explicit user roles win. Never create inferred LOCK or whole-image LOCK. Advance to `MAPPED`.

## 4. Resolve conflicts

Use the canonical priority in `core/visual-state.md`. Record all collisions only in `controls.conflicts`. A uniquely higher-priority choice may resolve a lower one; incompatible peer HARD choices remain unresolved.

## 5. Build the Director design

Run `director/director-expansion.md` for every actionable portrait request, including a one-line request. Build one internal Director design card covering subject, moment, wardrobe, space, camera, light, and finish. It is a derived work product, not a second mutable state.

Match explicit supported style cues. Set `intent.recipe_id` and load one soft recipe, or leave it null. When a recipe is selected, load its single matching scenario-bank file and choose exactly one compatible scenario; set `intent.scenario_id`. The scenario supplies positive, photographable completion choices only for `UNSET` paths and uses RECIPE provenance with the scenario id as `ref`.

If the user's temperament would materially improve expression, gaze, posture, or restrained styling, select at most one compatible overlay from `director/overlay-registry.md` and set `intent.overlay_id`; otherwise leave it null. Apply it only to its documented patch surface. Read relevant sections of `director/visual-libraries.md` only when a required visual role remains materially under-specified.

Select exactly one exposure profile from `director/brightness-system.md` and set `intent.exposure_profile`. Beauty-forward and ancient portraits default to `BRIGHT_AIRY`; explicit night/low-key or a protected dark reference selects `DARK_INTENTIONAL`; other requests use `BALANCED_CLEAR`. Write concrete exposure and tonal distribution into state rather than relying on words such as bright, cinematic, cool, or airy.

A recipe, scenario, overlay, and visual library are all soft direction. None is a route or conflict resolver, and none can override user/reference intent.

For ancient-portrait cues, use the compound boundaries in the registry. Bare “汉服美女 / 古风美女” maps to the general `gufeng-heroine`; a dynasty/形制 cue, cold xianxia cue, red-gold palace cue, or beauty-close-up cue selects its more specific recipe. Never load the general and specific recipe or their scenario banks together.

## 6. Clarification gate

- CONTINUE for ordinary style, light, color, pose, scene, and clearly named reference roles.
- ASK one short plain-language question for unclear identity source, two incompatible hard requirements, requested blending of different people, or necessary safety/authorization information.
- BLOCK when policy requires it or a state cannot legally proceed.

After an answer, patch the same state and resume from the earliest affected step. Never reconstruct identity from scratch when only wardrobe, environment, or lighting changed.

## 7. Direct the frame

Apply the universal Director design, selected scenario, optional overlay, and any visual-library choices through `core/director-engine.md`. For a sparse actionable brief, also apply `core/short-brief-expansion.md` as completion guidance for UNSET paths; do not turn its defaults into HARD constraints. Run one normal pass sequence and at most one coherence repair. Apply only validated patches, preserve protected paths, write provenance, and advance to `DIRECTED`.

## 8. Safety gate

Run the active platform policy plus `safety/safety-rights-gate.md` once. The gate writes only `controls.safety` and stage. `ASK` pauses; `BLOCK` is terminal. For `ALLOW_WITH_CONSTRAINTS`, apply required changes upstream and re-run the gate before readiness.

## 9. Readiness

Apply the checklist in `core/visual-state.md`. If every item passes, advance `VALIDATED` to `READY_TO_COMPILE`. Missing creative details return to the Director; unresolved hard or safety issues do not.

## 10. Compile and generate

Compiler accepts only READY state and produces both derived Prompt IR and one clean `compiled_prompt`.

- Prompt Mode: return `compiled_prompt`; do not read or call the Adapter.
- Direct Image Mode: pass the compiled prompt and reference pointers to the GPT Image Adapter, call the built-in image tool, and receive a candidate image for acceptance.
- If no image tool exists, return the compiled prompt and say image generation is unavailable here.

## 11. Direct Image acceptance

Inspect the returned image against observable HARD/PRESERVE facts, FORBID absence, normalized degree boundaries, identity likeness, explicit action/contact state, requested aspect, obvious reference-role leakage, and the selected recipe's concrete Protective Check. When file metadata is available, calculate the actual ratio from width and height; a different resolution with the same ratio passes unless exact pixels were requested. Inspect exact pixel dimensions only when artifact metadata is available; do not retry solely for a pixel mismatch because the current adapter has no native size field. Do not fail an image for an unnormalized subjective taste or vague SOFT preference.

If a protected assertion, scenario anchor, or observable recipe predicate failed and the exact original reference set can still be supplied, read `director/failure-diagnosis.md`, assign the smallest matching observable failure class, and allow one targeted retry from the unchanged READY Visual State and derived Prompt IR. Restate only the failed existing assertion or anchor; preserve every other role and constraint. If retry is unavailable or still fails, return the best result and name the limitation briefly. Never run a second retry.

# Legal stage transitions

```text
INITIALIZED -> LOCKED -> MAPPED -> DIRECTED -> VALIDATED -> READY_TO_COMPILE
                         |             |              |
                         +--- ASK -----+              +-> Compiler
                         +----------- BLOCKED
```

Forbidden transitions include MAPPED to Compiler, unresolved HARD to Director/Compiler, BLOCKED to Adapter, and Director directly to READY_TO_COMPILE.

# Revision handling

Only after the input is classified as an explicit revision, handle a mid-run edit such as “把刚才那张的衣服改红色”:

1. Update the matching constraint and domain value.
2. Keep unrelated identity and reference assignments.
3. Use `core/director-dependencies.md` to mark only dependent creative paths dirty.
4. Re-run conflict resolution, dirty Director passes, Safety, Readiness, and Compiler.
5. Do not create a new Visual State or repeat untouched image inference.
