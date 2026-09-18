# Prompt Compiler

Translate a READY Canonical Visual State into disposable Prompt IR and one clean model-facing prompt. The Compiler serializes only; it never repairs or re-directs the frame.

# Compile gate

Refuse unless all hold:

- `meta.stage == READY_TO_COMPILE`.
- No unresolved HARD conflict.
- Safety is `ALLOW`, or `ALLOW_WITH_CONSTRAINTS` with no pending required change.
- Every readiness requirement in `core/visual-state.md` passes.

On refusal, report the failed check to orchestration. Do not fill a missing value, relax a lock, or call the Adapter.

# Prompt IR

Build keys in this stable order and omit optional null values:

```yaml
output: { aspect, requested_dimensions, quality, output_count }
subject: { identity_summary, age_band, hair, body, expression, gaze, pose }
action: { event, action_chain, mood }
wardrobe: { outfit, accessories, makeup }
environment: { place, time_context, weather, props, background_people, prop_budget }
composition_camera: { subject_count, shot_scale, framing, hierarchy, lens, angle, depth }
lighting: { source, quality, direction, color_intent, exposure }
color_texture: { palette, grade, tonal_distribution, surface, skin }
constraints:
  must_preserve: [string]
  must_avoid: [string]
references:
  - { asset, target, mode, origin, constraint_id }
reference_scope_fences:
  - { asset, use_only_for: [path], do_not_inherit: [domain] }
generation: { quality, output_count, adapter_options }
trace: [{ ir_path, vs_path }]
```

- Copy `output.aspect` only from `composition.aspect`.
- Copy `output.requested_dimensions` only from an explicit `generation.requested_dimensions`; preserve `raw` and never infer pixels from aspect.
- Copy HARD VALUE/REQUIRE and PRESERVE_REFERENCE into `must_preserve` without reinterpretation.
- Copy FORBID into `must_avoid`; when `value` contains a normalized visible failure predicate, serialize that predicate and its allowed boundary instead of leaving only vague words such as “not excessive”. Never repeat forbidden content as a positive feature.
- Keep one reference entry per assignment. Preserve asset, target, mode, and origin; never collapse multiple images into a generic blend.
- Derive one scope fence per asset. `use_only_for` is the union of that asset's non-IGNORE assignment targets. `do_not_inherit` contains explicit IGNORE targets plus unmapped high-leak paths: `subject.identity`, `subject.hair`, `subject.body`, `subject.expression`, `subject.gaze`, `subject.pose`, `wardrobe`, every `environment` leaf, `composition`, `camera`, `lighting`, `color`, and `texture`. Remove only paths covered by an allowed parent/child assignment; for example, allowing `environment.place` still excludes `environment.props`.
- Scope fences are disposable serialization boundaries, not constraints or assignments. Never write them back to Visual State.
- `trace` is lightweight debug mapping only. Canonical provenance stays in Visual State.

# Clean compiled prompt

Render Prompt IR into concrete, image-model-ready natural language using this order:

1. `Portrait photograph. Aspect ratio: <aspect>.` If dimensions were explicitly supplied, continue the same opening sentence with `Requested output dimensions: <raw>.`
2. `Required visible facts:` each HARD VALUE/REQUIRE/PRESERVE fact once, expressed as an observable final-frame state. Do not paraphrase it again later.
3. `Reference scope:` one ordered sentence per asset stating both its allowed contribution and excluded domains.
4. Subject identity and explicit adult age band, then SOFT subject direction.
5. SOFT moment, action, pose, expression, and gaze not already stated as required.
6. Wardrobe and appearance.
7. Environment, time/weather, background-person rule, and prop budget.
8. Subject count, framing, camera intent, and visual hierarchy.
9. Lighting, exposure profile outcome, tonal distribution, color, and texture.
10. `Must avoid:` followed by literal forbids, any normalized visible boundary, and no positive rendering of prohibited content.

Render every actionable portrait through five compact visual roles in this sequence: person; moment; wardrobe; space/camera; light/finish. For style-led or sparse briefs, each role must contain concrete Director decisions rather than a label or quality adjective. This is information preservation, not permission to repeat fields or add generic quality spam. Keep required facts and reference-scope fences before these role blocks. A tightly specified simple headshot may express a role in one concise sentence, but may not silently drop it.

When a scenario or overlay contributed state values, serialize the positive visible decisions—not internal recipe, scenario, or overlay ids. Preserve the scenario's material choices and acceptance anchors that were written into state. An overlay must remain a nuance of expression, gaze, compatible pose, grooming, light, or color; it must not become a second style thesis.

For beauty-forward or ancient portraits, serialize the actual face direction, grooming/makeup, subject-to-frame hierarchy, eye/face light, exposure, tonal distribution, garment structure, palette relationship, and material response. Do not collapse them into “beautiful woman,” “Hanfu,” “bright,” “high quality,” or a long negative list. Positive visual direction must remain more specific than the avoid section.

Use concrete fences, for example: `Use Image 1 only for identity; do not inherit its hair, wardrobe, pose, props, setting, composition, camera, lighting, color, or texture. Use Image 2 only for wardrobe; do not inherit its face, hair, pose, props, setting, composition, camera, or lighting.` When one image has multiple positive assignments, name their union in one sentence. A user assignment always overrides a derived exclusion.

Do not mention internal state, constraint ids, provenance, or recipe ids. Do not repeat facts across sections or add generic quality spam. The same state must produce semantically equivalent IR and prompt.

# Compile self-check

Before returning either output mode, validate the derived artifact:

1. The number of `reference_scope_fences` equals the number of unique assets with positive assignments.
2. Every asset has one explicit sentence containing both its `use_only_for` union and its concrete `do_not_inherit` paths. A blanket sentence such as “do not inherit unmapped domains from any reference” may reinforce but never replace per-asset exclusions.
3. Every HARD/PRESERVE fact and every normalized FORBID predicate appears once in the compiled prompt.
4. The prompt is written consistently in one chosen language, normally the user's language or one stable adapter language. Asset labels, proper nouns, and requested on-image text may differ; unexplained foreign-language tokens are a compile failure.
5. Compiler input `meta.id` matches orchestration's active request id, and every serialized value traces to that current Visual State; no value from another independent request is present.
6. The five visual roles—person, moment, wardrobe, space/camera, and light/finish—are all materially represented; face hierarchy, action/contact state, garment structure, selective spatial cues, and motivated light are not summarized away.
7. Aspect is present exactly once in the opening sentence. Explicit dimensions are also present there exactly once; no dimensions are invented when the field is null.
8. When a selected recipe or scenario populated observable subject-isolation, background-person, prop-budget, wardrobe-layer, action, or hierarchy requirements, each appears concretely in the prompt and is not summarized into a style adjective.
9. An overlay, when selected, has not introduced a second scene, wardrobe class, aspect, subject count, identity direction, or reference role.
10. `intent.exposure_profile` has a concrete prompt landing point: the exposure, immediate face/background separation, shadow readability, highlight protection, and tonal distribution are stated without exposing the internal profile id. For `BRIGHT_AIRY`, the prompt does not simultaneously direct a dominant dark mass, storm mood, deep navy background, or gloomy underexposure unless that fact is explicitly user-protected.

All ten checks are deterministic derivation checks. Repair the disposable IR/rendering and re-check; never mutate Visual State or invent a visual choice. Refuse output if the artifact still fails.

# Acceptance retry rendering

After generation, orchestration may identify a failed existing HARD/FORBID/identity/action/scope-fence assertion, concrete selected-recipe predicate, or selected-scenario acceptance anchor. For one retry only, classify the failure with `director/failure-diagnosis.md` and re-render the same Prompt IR with only the failed existing assertion or anchor moved to the start as `Correction required:`. Do not add a new visual choice, alter a reference role, weaken another fact, or mutate Visual State/Prompt IR.

# Output by mode

- Prompt Mode returns only `compiled_prompt` to the user. Prompt IR remains internal unless requested.
- Direct Image Mode passes `compiled_prompt` plus reference pointers to `compiler/adapters/gpt-image.md`.

# Read/write boundary

- Reads: READY Visual State.
- Writes: derived Prompt IR and `compiled_prompt` only.
- Never writes Visual State, resolves conflicts, changes assignments, or invents art.
