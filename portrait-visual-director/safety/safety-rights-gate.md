# Safety and Rights Gate

This is the single portrait safety/rights decision point. Always apply the active platform policy first; this file supplies state ownership and portrait-specific checks, not a replacement policy.

# Boundary

The Gate reads the full Visual State and writes only `controls.safety` plus stage `VALIDATED` or `BLOCKED`. It may return `ALLOW`, `ALLOW_WITH_CONSTRAINTS`, `ASK`, or `BLOCK`.

It must not replace a person, release a lock, delete a constraint, change wardrobe/scene, or claim legal clearance. When a creative change is required, emit a path-aware `required_changes` item and return control to orchestration.

# Canonical record

```yaml
controls.safety:
  status: ALLOW | ALLOW_WITH_CONSTRAINTS | ASK | BLOCK
  policy: { status: PASS | FAIL | NEED_ASK, reasons: [string] }
  rights: { advisory: LOW | REVIEW | HIGH, reasons: [string] }
  reasons: [string]
  required_changes:
    - { path: string|null, action: OMIT|REPLACE|REDACT|RELEASE_LOCK|OTHER, detail: string }
  redline_paths: [string]
  risk_notes: [string]
  authorization:
    subject_identity: UNKNOWN | USER_ASSERTED | SELF | AUTHORIZED | NOT_AUTHORIZED
    notes: string | null
```

`policy` answers whether generation may proceed. `rights` is an advisory about identity, artwork, brand, or IP exposure; it is never a legal verdict.

# Decision checks

## Age and sexual context

- Ordinary clearly adult portrait: normally allow under active policy.
- Clearly adult, non-explicit sensual fashion: allow or allow with concrete constraints when policy permits.
- Ambiguous age plus sexualized direction: ask or block; never silently rewrite the person as adult.
- Minor or minor-coded sexualization, explicit sexual content, or other disallowed content: block under active policy.
- For ordinary non-sensitive text-only portraits, an adult Director default may be used when consistent with user intent.

## Real-person identity

Identity LOCK does not prove authorization. Consider authorization only when it changes whether the request may proceed, especially for sensitive, deceptive, sexualized, impersonation, or high-risk commercial use.

- `SELF`, `AUTHORIZED`, and `USER_ASSERTED` record what the user said; they are not platform verification.
- Ordinary non-sensitive portraits or style/light references should not trigger a routine authorization question.
- `NOT_AUTHORIZED` plus identity LOCK normally blocks or requires releasing that lock.
- A known or user-stated public figure may be allowed for ordinary non-sensitive creative use, while deceptive or sensitive uses follow active policy and may ask or block.

## Artwork, characters, brands, and logos

Record advisory risk for recognizable protected artwork, franchises, living-artist style requests, primary commercial logos, counterfeiting, or ownership uncertainty. Incidental background branding or general product silhouettes need not be banned automatically. Never assume an uploaded asset is owned by the user.

# Required changes

Use concrete path-aware actions, for example:

```yaml
- { path: subject.identity, action: RELEASE_LOCK, detail: "Use a synthetic adult identity instead of image_1" }
- { path: wardrobe, action: REDACT, detail: "Remove disallowed explicit detail" }
```

Safety records the requirement but does not apply it. Orchestration patches Constraint/Reference/Director state, re-runs the Gate, and proceeds only when `required_changes` is empty or already satisfied.

# Workflow outcomes

- `ALLOW`: stage `VALIDATED`, then Readiness.
- `ALLOW_WITH_CONSTRAINTS`: proceed only after every required change is satisfied upstream and the Gate has rechecked the result.
- `ASK`: ask one necessary plain-language question and keep the same Visual State; no Compiler call.
- `BLOCK`: stage `BLOCKED`; no Compiler or Adapter call.

Safety outranks HARD/LOCK by stopping or requiring an explicit revision, never by secretly mutating creative state.
