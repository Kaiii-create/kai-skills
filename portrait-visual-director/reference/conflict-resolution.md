# Purpose

Resolve or record reference/constraint collisions into the **single** collection `controls.conflicts[]`. Never a second conflicts store.

# Inputs

- `constraints[]`, `references.assignments[]`, domain values
- Path semantics (parent/subtree)
- Safety policy flags when relevant

# Outputs

- `controls.conflicts[]` updates
- Value/provenance fixes only when a unique higher-priority winner exists

# Priority

```
Safety / Policy
  > User HARD (VALUE | REQUIRE | FORBID | PRESERVE_REFERENCE)
  > USER_EXPLICIT LOCK assignment
  > User SOFT
  > USER_EXPLICIT ADAPT/INSPIRE
  > INFERRED assignment (ADAPT | INSPIRE | IGNORE)
  > Recipe soft patch
  > Director
  > Default
```

# Canonical record

```yaml
- id: cf1
  type: PEER_HARD_COLLISION | LOCK_VS_USER_HARD | PATH_PRECEDENCE | POLICY | OTHER
  path: string | null
  severity: HARD | SOFT
  status: UNRESOLVED | RESOLVED
  sources: [{ type: USER|REFERENCE|DIRECTOR|SYSTEM, ref, detail }]
  reason: string
  resolution: string | null
```

# Required cases

| # | Case | Handling |
|---|------|----------|
| 1 | Two USER_EXPLICIT identity LOCKs (different people) | `PEER_HARD_COLLISION` UNRESOLVED HARD — **no blend**, not READY |
| 2 | User HARD vs reference LOCK same path | Higher tier wins if compatible; else `LOCK_VS_USER_HARD` UNRESOLVED |
| 3 | Parent reference vs child explicit | Path rules: child HARD over parent INSPIRE; parent LOCK + child HARD conflict → UNRESOLVED; parent IGNORE + explicit child → child wins |
| 4 | Multiple INSPIRE same domain | **Not** hard conflict; keep both assignments; Director synthesis later lists both contributors |
| 5 | IGNORE vs explicit child assignment | Explicit child wins; IGNORE contributes nothing |

# Orchestration note

Workflows call this step after Reference Mapping and again after Clarification/Revision patches. Unresolved HARD blocks READY (see `workflows/shared-pipeline.md`). Dual INSPIRE is not a hard stop.

# Must Not Do

- `references.conflicts` array
- Auto face blend
- Last-write-wins on HARD
- Silent HARD delete
- Treat dual INSPIRE as peer HARD
