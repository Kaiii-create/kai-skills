# Director Expansion Gate

Every actionable portrait creation, prompt-writing, restyling, and direct-image request passes this gate after explicit constraints, reference roles, conflicts, and the optional recipe are resolved. The gate turns intent into one photographable moment; it is not a second state or a sentence template.

# Progressive load

1. If `intent.recipe_id` is set, read that recipe and its matching file under `director/scenarios/`.
2. If a supported temperament cue is explicit, read `director/overlay-registry.md` and select at most one overlay.
3. Read `director/brightness-system.md`, select one exposure profile, and make brightness/tonal distribution explicit.
4. Read only the needed sections of `director/visual-libraries.md` for creative paths that remain UNSET.
5. On a failed generated candidate only, read `director/failure-diagnosis.md`.

Scenario and overlay choices remain SOFT. They may fill UNSET paths or refine compatible soft values, but never change a HARD fact, LOCK, FORBID, explicit reference role, or a stronger recipe signature.

# Phase A — internal director design

Complete this compact design card before writing Director patches:

```yaml
director_design:
  main_objective: string
  recipe_id: string | null
  scenario_id: string | null
  overlay_id: string | null
  exposure_profile: BRIGHT_AIRY | BALANCED_CLEAR | DARK_INTENTIONAL
  subject: { adult_face, grooming, expression, gaze }
  moment: { time_slice, event, weight, shoulders, hands, garment_motion, head, gaze_target }
  wardrobe: { layers, silhouette, materials, palette, accessories, visible_richness }
  space: { subject_relation, foreground, midground, background, people_rule, prop_budget }
  frame: { subject_count, aspect, shot_scale, hierarchy, lens_intent, angle, depth }
  light: { motivated_source, direction, face_modeling, separation, material_response, exposure }
  finish: { tonal_distribution, color_temperature, saturation, contrast, highlights, shadows, skin, surface }
```

The card is derived work, not user-visible chain-of-thought and not a second mutable state. Commit decisions only through validated Director patches with provenance.

# Selection rules

- Choose exactly one scenario variant. Match explicit scene, time, garment, action, palette, and purpose before using defaults. Do not splice several variants together.
- Select at most one overlay. The primary recipe controls photographic language; the overlay may refine expression, gaze, grooming, posture, and a small color/light bias.
- When no scenario matches closely, use the recipe signature and visual libraries to design a fresh moment rather than forcing a near match.
- Use one time slice, one main event, one gaze target, one primary light story, and two or three environment details.
- Do not infer darkness from cinematic, cool, restrained, mature, ancient, or xianxia. Use `DARK_INTENTIONAL` only for explicit night/low-key intent or a protected dark reference.
- Every named garment layer remains visible. Every hand has one plausible task or rests naturally.
- Public places do not require background people. Add them only when interaction, crowd, or documentary context is explicit.

# Phase B — five-part visual preservation

The directed state and compiled prompt must preserve five substantive visual roles:

1. **Person:** adult identity/face direction, grooming, makeup, expression, temperament.
2. **Moment:** time slice, single event, balance, shoulders, hands, garment motion, head direction, gaze target.
3. **Wardrobe:** visible layer order, silhouette, materials, palette, accessories, richness and restraint.
4. **Space and camera:** subject-space relation, two or three details, depth layers, subject count, aspect, scale, hierarchy, lens intent, angle, depth of field.
5. **Light and finish:** source, direction, facial modeling, separation, material response, color temperature, saturation, contrast, highlights, shadows, skin and surface texture.

This is an information contract, not a requirement to expose five headings. Prompt Mode returns a clean copy-ready prompt. Direct Image Mode uses the full expansion internally and returns the image. A tightly scoped edit may keep a role brief when the source image already fixes it, but may not silently replace it.

# Quality gates

Re-design before compilation when any condition holds:

- the result is still a field recap, adjective list, or generic “beautiful/high quality” request;
- the main event contains multiple unrelated actions;
- hands, gaze, garment motion, props, and camera timing cannot coexist in one frame;
- architecture, props, empty floor, background people, or bright windows outrank the intended subject;
- a named clothing layer, palette relationship, or requested size/aspect has no visible landing point;
- light is described as a mood word without a source, direction, facial landing point, and material effect;
- exposure is absent, or the tonal distribution contradicts the selected brightness profile;
- recipe, scenario, and overlay signatures conflict;
- the avoid section is more concrete than the positive design.

# Boundary

Do not expose the internal card unless the user explicitly asks to inspect direction. Do not add plot, luxury objects, cultural symbols, crowds, extra props, or beauty retouch merely to make the prompt longer. Rich direction comes from coherent decisions, not element count.
