# Director Engine

Complete a conflict-resolved MAPPED Visual State into one coherent, photographable adult portrait. Run `director/director-expansion.md` for every actionable request, not only sparse briefs. The Director fills visual gaps and synthesizes soft influence; it never writes prompts, reads raw image pixels, creates assignments, or overrides protected intent.

When a recipe is active, select one scenario from its mapped scenario bank and record `intent.scenario_id`. When a compatible temperament materially helps, select at most one overlay from `director/overlay-registry.md` and record `intent.overlay_id`. Select one exposure profile through `director/brightness-system.md` and record `intent.exposure_profile`; make `lighting.exposure` and `color.tonal_distribution` concrete. Use `director/visual-libraries.md` only to complete still-UNSET fields. When the request is sparse or explicitly beauty/heroine-forward, also apply `core/short-brief-expansion.md`. Do not ask for ordinary creative choices that can be made coherently. All completion choices remain SOFT.

# Director Patch

Every change is proposed and validated before writing:

```yaml
director_patch:
  pass: SUBJECT | MOMENT | WARDROBE | ENVIRONMENT | COMPOSITION | CAMERA | LIGHTING | COLOR_TEXTURE | COHERENCE_REPAIR
  round: 1 | 2
  changes:
    - path: lighting.source
      old_value: null
      new_value: "soft window key camera left"
      reason: "subject readability and existing night-light influence"
      contributors:
        - { source: REFERENCE, ref: image_4, mode: INSPIRE, weight: SUPPORTING }
        - { source: DIRECTOR, ref: null, mode: null, weight: PRIMARY }
  affected_paths: [lighting.source]
  status: DRAFT | VALIDATED | REJECTED
```

Reject a patch change when it:

- touches a path protected by HARD or USER_EXPLICIT LOCK;
- fills or violates a FORBID path;
- clears a constraint, assignment, or unrelated reference influence;
- creates an assignment or upgrades anything to LOCK;
- resolves peer HARD conflict by itself;
- writes safety, Prompt IR, Adapter data, or stage READY_TO_COMPILE.

Only VALIDATED changes update creative domains and provenance.

# One finite pass sequence

1. **Subject:** complete an adult identity when text-only and safe, then face direction, grooming, expression, gaze, pose skeleton, and body balance. “美女 / 美人 / 女主感” requires a distinctive adult face and visible presence, not a generic perfect-face label. With identity LOCK, do not “clean up,” idealize, or replace the face.
2. **Moment:** choose a real time slice, action chain, weight, hands, shoulders, gaze target, wardrobe motion, and space interaction. For every explicit action, audit actor → verb → object → visible temporal state → contact state. “Just put the cup down” requires the cup to rest on a surface and the hand to be released or visibly releasing; it cannot become “holding the cup.”
3. **Wardrobe:** make clothing work with the action; respect garment reference modes, HARD literals, named layer order, and accessory forbids. Every explicitly named layer must remain visibly represented unless the user allows concealment.
4. **Environment:** decide place/time/scale and subject-space relation without importing ignored backgrounds. For a normalized degree-limited FORBID, design below its visible failure boundary; do not postpone symbol-count or prop-cluster control to the prompt. In a singular portrait-first brief, do not add background people merely to establish a public location. When `natural-lifestyle` is selected, decide `environment.background_people` and `environment.prop_budget` explicitly.
5. **Composition:** decide shot scale or framing, sole aspect, and explicit hierarchy. When beauty/heroine presence is the lead and full garment/environment display is not explicit, keep the frame close enough for the eyes, face planes, grooming and key wardrobe structure to read; avoid a distant visitor-photo default.
6. **Camera:** choose lens/angle/depth because they support scale, subject, space, and hierarchy; record the reason.
7. **Lighting:** choose one motivated key story with readable face and separation; treat background practicals as support. Apply the selected exposure profile: beauty-forward/ancient defaults to bright airy unless explicit darkness wins, while night/low-key remains intentionally dark but readable. Beauty-forward direction requires readable catchlights and modeled cheek/nose/jaw planes, with the face leading its immediate background without artificial pasted-on beauty light. When an identity reference moves into a new scene, re-light the preserved face, hair edges, skin, and wardrobe from that scene's motivated sources so the subject does not read as a pasted cutout.
8. **Color/texture:** coordinate palette, grade, tonal distribution, skin, fabric, and surfaces with the chosen light. “Cool” controls hue, not exposure; “cinematic” does not automatically lower brightness.
9. **Coherence audit:** validate the checklist below.

Run the full sequence once. If the audit fails, run one `COHERENCE_REPAIR` pass. If a hard/structural conflict remains, ask or block; never start a third round.

# Influence rules

- LOCK is read-only.
- ADAPT keeps core traits but may fit them to pose, scene, and light.
- INSPIRE contributes a principle, not copied objects.
- Multiple INSPIRE sources may be synthesized, with all sources retained in provenance.
- GLOBAL soft intent such as cinematic, natural, restrained, or low-retouch becomes concrete choices in the relevant fields and patch reasons.

If `intent.recipe_id` is set, read that recipe's preferred soft patches and its one selected scenario, then apply only compatible directions through Director Patch. Record recipe and scenario decisions with RECIPE provenance, using the scenario id as `ref` for scenario-sourced values. Apply one temperament overlay only within its documented patch surface and record OVERLAY provenance. Recipes, scenarios, overlays, and visual libraries never become HARD, create a reference assignment, change identity, or override user/reference intent.

# Five-role coverage gate

Before the coherence audit, confirm that every style-led or sparse portrait has five concrete visual roles represented in state:

1. person — adult identity/face direction, grooming, expression, and gaze;
2. moment — one time slice with a readable action or pose and contact state;
3. wardrobe — visible named layers, silhouette, material, and controlled styling detail;
4. space/camera — place, two or three selective spatial cues, scale, framing, hierarchy, and camera intent;
5. light/finish — one motivated light story, explicit exposure and tonal distribution, palette/grade, skin, textile, and surface response.

An adjective such as “高级 / 唯美 / 电影感” does not satisfy a role. Repair a missing role through validated SOFT completion before advancing.

# Coherence audit

- Required readiness paths are decided and have provenance.
- No unresolved HARD conflict or FORBID violation remains.
- Action, hands, gaze, weight, wardrobe, and framing agree. Explicit actor/object/contact/temporal state is visually possible and unchanged.
- Any degree-limited FORBID passes its observable boundary; a protected “no symbol stacking” rule is not dismissed as subjective taste.
- Camera and composition agree.
- A singular portrait-first recipe has one visible subject unless the user requested a group, interaction, crowd, or documentary social context; reflections, posters, silhouettes, and cropped bodies count as visible people for this audit.
- Recipe prop budgets and named wardrobe layers are satisfied; the Director does not invent a foreground story that competes with the requested portrait.
- Lighting is motivated, readable, and not a stack of competing equal keys; subject and environment share the same light logic.
- The selected exposure profile passes `director/brightness-system.md`. `BRIGHT_AIRY` cannot read as gloomy, stormy, murky, or dominated by deep navy/charcoal masses; `DARK_INTENTIONAL` cannot erase eyes, hands, required garment structure, or spatial detail.
- When beauty/heroine presence is explicit, the face and eyes lead the hierarchy, are large enough to read, and do not lose to architecture, props, empty floor, flat ambience, or all-muted styling.
- Ancient-portrait recipes keep neckline, sleeves, waist, hair and ornament structure coherent; a bare Hanfu request does not degrade into a generic robe or tourist record.
- Identity and all protected paths are untouched.
- Multi-reference contributors remain distinct in provenance.
- Every selected recipe's concrete `Protective Check` passes. Only observable predicates qualify; vague taste language does not.
- The selected scenario's acceptance anchors pass and do not conflict with a higher-priority user or reference decision.
- At most one overlay is selected, and it has not altered identity, recipe, scenario, wardrobe class, scene, aspect, subject count, or reference scope.

After a clean audit, set stage `DIRECTED`. Safety and Readiness still run; the Director cannot set READY_TO_COMPILE.

# Revision scope

For an existing state, read `core/director-dependencies.md` and run only dirty passes. Never re-infer identity or reset unrelated references because wardrobe, scene, light, or color changed.
