# Purpose

Define the **canonical** reference mapping shape in Visual State. Rules + field contract only; runtime truth is `VisualState.references`.

# Runtime authority

```yaml
references:
  assets:
    - { id: image_1, role_hint: identity|wardrobe|pose|lighting|style|other, path_or_ref: "host://..." }
  assignments:
    - id: ra1
      source: image_1
      target: subject.identity          # exact leaf or parent/subtree
      mode: LOCK | ADAPT | INSPIRE | IGNORE
      origin: USER_EXPLICIT | INFERRED
      constraint_id: string | null      # link to constraints[] when this implements user intent
      note: string | null
```

No `references.conflicts`. No parallel map. No whole-image flag.

# Targets

```
subject.identity     # likeness — NOT hair
subject.hair         # sibling
subject.body | expression | gaze | pose
wardrobe | wardrobe.outfit | wardrobe.accessories | wardrobe.makeup
environment | composition | camera | lighting | color | texture
```

Parent target = full subtree (`core/visual-state.md` path semantics).

# Modes & origin

| mode | origin INFERRED | origin USER_EXPLICIT | Protection |
|------|-----------------|----------------------|------------|
| LOCK | **Forbidden** | Allowed | `is_path_protected` true |
| ADAPT | Allowed | Allowed | Soft keep |
| INSPIRE | Allowed | Allowed | Tendency only |
| IGNORE | Allowed | Allowed | Zero inheritance on target |

# Binding to constraints

| User constraint | Assignment must |
|-----------------|-----------------|
| PRESERVE_REFERENCE identity = image_1 | LOCK identity, `constraint_id` set, origin USER_EXPLICIT |
| FORBID background from image_2 | IGNORE environment, `constraint_id` if recorded |
| VALUE hair short (with preserve person) | **No** hair assignment LOCK; hair is user VALUE domain write |

If assignment implements a constraint, `constraint_id` is required. Do not keep two unlinked sources of truth.

# Multi-assignment rules

- N images → N roles (user-named preferred)
- One image → many targets, independent modes
- Positive assignments for one asset form its contribution allow-list; visible but unmapped domains contribute no authority
- identity LOCK on an image does **not** cascade LOCK to other domains of that image
- Same domain, two INSPIRE → allowed (Director synthesizes; both stay in provenance)
- Same domain, two USER_EXPLICIT LOCK incompatible → conflict via Conflict Resolution

# Writes

- `references.assets` / `references.assignments` only
- Provenance REFERENCE entries when values applied later

# Must Not Do

- INFERRED LOCK
- Whole-image LOCK
- Treat an image's unassigned face, hair, clothes, props, background, composition, or light as a hidden secondary assignment
- Second runtime store
- Unlinked duplicate of constraint intent without `constraint_id`
