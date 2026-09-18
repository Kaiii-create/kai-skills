---
title: Canonical Visual State
schema_version: "2.5"
---

# Purpose

`VisualState` is the only mutable visual truth for one request. Modules may derive patches, Prompt IR, or adapter calls, but none becomes a second state.

# Canonical shape

```yaml
meta:
  id: string
  mode: text_to_image | single_reference_to_image | multi_reference_to_image
  stage: INITIALIZED | LOCKED | MAPPED | DIRECTED | VALIDATED | READY_TO_COMPILE | BLOCKED
  schema_version: "2.5"
  user_text: string

intent:
  summary: string
  mood_hint: string | null
  recipe_id: string | null
  scenario_id: string | null
  overlay_id: string | null
  exposure_profile: BRIGHT_AIRY | BALANCED_CLEAR | DARK_INTENTIONAL | null

subject:
  identity:
    description: string | null
    age_band: adult | explicitly_adult | ambiguous_must_clarify | null
    gender_presentation: string | null
    face_notes: string | null
  hair: string | null
  body: string | null
  expression: string | null
  gaze: string | null
  pose: string | null

wardrobe: { outfit: string|null, accessories: string|null, makeup: string|null }
moment: { event: string|null, action_chain: string|null, mood: string|null }
environment: { place: string|null, time_context: string|null, weather: string|null, props: string|null, background_people: string|null, prop_budget: string|null }
composition: { subject_count: integer|null, shot_scale: string|null, framing: string|null, aspect: string|null, hierarchy: string|null }
camera: { lens: string|null, angle: string|null, depth: string|null }
lighting: { source: string|null, quality: string|null, direction: string|null, color_intent: string|null, exposure: string|null }
color: { palette: string|null, grade: string|null, tonal_distribution: string|null }
texture: { surface: string|null, skin: string|null }

references:
  assets:
    - { id: string, role_hint: string|null, path_or_ref: string|null }
  assignments:
    - id: string
      source: string
      target: string
      mode: LOCK | ADAPT | INSPIRE | IGNORE
      origin: USER_EXPLICIT | INFERRED
      constraint_id: string | null
      note: string | null

constraints:
  - id: string
    kind: VALUE | REQUIRE | FORBID | PRESERVE_REFERENCE
    level: HARD | SOFT
    scope: PATH | GLOBAL
    target: string | null
    targets: [string] | null
    value: any | null
    text: string
    origin: USER
    intent_tags: [mood|style|lighting_feel|color_feel|texture_finish|quality|avoid_overlay] | null

provenance:
  by_path:
    "<path>":
      decided_by: USER | REFERENCE | DIRECTOR | DEFAULT | RECIPE | OVERLAY | SYSTEM
      contributors:
        - { source: USER|REFERENCE|DIRECTOR|DEFAULT|RECIPE|OVERLAY|SYSTEM, ref: string|null, mode: LOCK|ADAPT|INSPIRE|IGNORE|null, weight: PRIMARY|SUPPORTING }
      constraint_id: string | null
      note: string | null

controls:
  conflicts:
    - id: string
      type: PEER_HARD_COLLISION | LOCK_VS_USER_HARD | PATH_PRECEDENCE | POLICY | OTHER
      path: string | null
      severity: HARD | SOFT
      status: UNRESOLVED | RESOLVED
      sources: [{ type: USER|REFERENCE|DIRECTOR|SYSTEM, ref: string|null, detail: string }]
      reason: string
      resolution: string | null
  safety:
    status: PENDING | ALLOW | ALLOW_WITH_CONSTRAINTS | ASK | BLOCK
    policy: { status: PASS|FAIL|NEED_ASK, reasons: [string] }
    rights: { advisory: LOW|REVIEW|HIGH, reasons: [string] }
    reasons: [string]
    required_changes: [{ path: string|null, action: OMIT|REPLACE|REDACT|RELEASE_LOCK|OTHER, detail: string }]
    redline_paths: [string]
    risk_notes: [string]
    authorization: { subject_identity: UNKNOWN|USER_ASSERTED|SELF|AUTHORIZED|NOT_AUTHORIZED, notes: string|null }

generation:
  quality: string | null
  output_count: number | null
  requested_dimensions: { raw: string, width_px: integer|null, height_px: integer|null } | null
  adapter_options: object
```

# Initialization

Create every top-level domain once. Start creative leaves as `null`, arrays empty, safety `PENDING`, `generation.output_count: 1`, and stage `INITIALIZED`. A module mutates this same object or emits a derived artifact; it never forks another visual state.

# Value semantics

- Domain `null` means only UNSET.
- A literal visual choice lives in its domain path and has provenance.
- Explicit absence lives in a `FORBID` constraint, not in a sentinel such as `NONE`.
- Reference preservation lives in `PRESERVE_REFERENCE` plus a matching assignment.
- `composition.aspect` is the sole aspect truth. `generation.requested_dimensions` may hold an explicit pixel delivery request but never a second aspect value.
- `subject.identity` means likeness. `subject.hair` is a sibling and is never included by an identity lock.

# Paths and protection

A parent target covers its descendants. An exact leaf covers only that leaf.

`is_path_protected(path)` is true when either condition holds:

1. A PATH constraint covers the path, has `level: HARD`, and has kind `VALUE`, `REQUIRE`, or `PRESERVE_REFERENCE`.
2. A covering assignment has `mode: LOCK` and `origin: USER_EXPLICIT`.

Any covering `FORBID` also makes the path unwritable. Do not persist `hard_paths` or another protection cache. `INFERRED` assignments never protect and may never be `LOCK`.

Examples of path behavior:

- LOCK `subject.identity` protects its description, age, gender presentation, and face notes, but not `subject.hair`.
- INSPIRE `lighting` plus user HARD `lighting.source` keeps the HARD source while leaving other lighting leaves open.
- LOCK `wardrobe` plus incompatible user HARD `wardrobe.outfit` is an unresolved HARD conflict; do not blend or pick last-write-wins.
- IGNORE `environment` from one image does not suppress an explicit child assignment such as `environment.place` from another.

# Constraint rules

- PATH requires `target` or `targets`; GLOBAL uses `target: null`.
- VALUE stores the literal in the domain when PATH-scoped.
- REQUIRE records a mandatory property; if it has a literal, store it in the domain.
- FORBID records an omission or prohibited token and never writes a positive domain value.
- A degree-limited FORBID keeps the user's original wording in `text` and stores an equivalent observable failure predicate in `value`; it limits excess without turning the allowed concept into zero.
- PRESERVE_REFERENCE requires an asset id and a matching `LOCK`/`USER_EXPLICIT` assignment with the same `constraint_id`.
- Explicit visible outcome facts are protected even when ordinary natural language omits “必须”; aesthetic adjectives and vague preferences remain SOFT.
- User wording is the audit source in `text`. An action may be normalized into its equivalent visible actor/contact/object state, but do not manufacture HARD intent from a vague preference or incidental noun.

# Reference rules

- One image may have independent assignments for identity, wardrobe, pose, lighting, or other domains.
- Uploading an image never implies whole-image LOCK.
- `LOCK` requires explicit user intent. `ADAPT`, `INSPIRE`, and `IGNORE` may be inferred.
- Multiple INSPIRE assignments may coexist and must remain distinct in provenance.
- There is exactly one conflict collection: `controls.conflicts`.

# Conflict priority

```text
active platform safety policy
> user HARD constraint
> USER_EXPLICIT reference LOCK
> user SOFT constraint
> USER_EXPLICIT ADAPT/INSPIRE
> INFERRED assignment
> recipe soft patch
> overlay soft patch
> Director completion
> default
```

Compatible higher-priority decisions may resolve a lower-priority collision. Incompatible peer HARD decisions stay `UNRESOLVED`; the pipeline asks or blocks. Safety may outrank creative intent but does not rewrite it.

# Provenance

Every decided required path has one provenance record. `decided_by` names the primary owner. A selected scenario uses `RECIPE` provenance with its scenario id as `ref`; a temperament overlay uses `OVERLAY` provenance with its overlay id as `ref`. When a decision synthesizes multiple references, list every contributing reference and the Director; do not hide multi-source influence in prose.

# Lifecycle and ownership

```text
INITIALIZED -> LOCKED -> MAPPED -> DIRECTED -> VALIDATED -> READY_TO_COMPILE
                         |                         |
                         +------ ASK/BLOCK -------+--> BLOCKED
```

- Routing initializes metadata and empty domains.
- Constraint Lock writes constraints, matching literals, and explicit preserve bindings.
- Reference Director proposes; Reference Map writes assets and assignments.
- Conflict Resolution writes only `controls.conflicts` and uniquely determined lower-priority fixes.
- Director writes creative domains only through validated patches and reaches `DIRECTED`.
- Safety writes only `controls.safety` and stage `VALIDATED` or `BLOCKED`.
- Readiness alone advances `VALIDATED` to `READY_TO_COMPILE`.
- Compiler and Adapter are read-only on Visual State.

# Readiness

Advance to `READY_TO_COMPILE` only when all are true:

1. No unresolved HARD conflict.
2. Safety is `ALLOW`, or `ALLOW_WITH_CONSTRAINTS` with every required change already applied upstream.
3. No pending safety required change.
4. Identity is decided by description or an attached PRESERVE/LOCK binding.
5. `subject.identity.age_band` is not null or ambiguous.
6. At least one of `moment.event` or `subject.pose` is decided.
7. At least one of `composition.shot_scale` or `composition.framing` is decided.
8. `composition.aspect` is decided.
9. At least one of `lighting.source` or `lighting.quality` is decided.
10. No positive value violates a FORBID constraint.

Optional fields may remain null. A BLOCKED state never reaches Compiler or Adapter.

# Non-negotiable invariants

1. One mutable Visual State per request.
2. Prompt IR is disposable and derived.
3. No dual aspect, protection, conflict, reference, or safety stores.
4. Identity and hair remain separate.
5. INFERRED never becomes LOCK.
6. Director cannot overwrite HARD, LOCK, or FORBID.
7. Safety cannot mutate creative domains.
8. Compiler and Adapter cannot invent visual decisions.
