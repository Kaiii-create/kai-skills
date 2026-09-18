# Purpose

Orchestrate **Multi Reference + Text → Image** through the shared pipeline.

# Inputs

- N ≥ 2 reference images
- User text (roles preferred)
- Routing mode: `multi_reference_to_image`

# Outputs

- Prompt Mode: READY VS → IR + clean compiled prompt with separate image roles
- Direct Image Mode: compiled prompt + separately fenced references → adapter → generated image → protected-outcome acceptance
- Or ASK / BLOCK

# Execution

Follow `workflows/shared-pipeline.md`:

1. Routing → `multi_reference_to_image`
2. Initialize VS
3. Constraint Lock
4. **Reference Director + Map** (per-image multi-domain assignments)
5. Conflict Resolution (`controls.conflicts` only)
6. Optional Recipe Selection
7. Clarification Gate
8. Director → Safety → Readiness → Compiler
9. Direct Image Mode only: Adapter → generate → acceptance; at most one targeted retry

# Mode-specific

| Situation | Behavior |
|-----------|----------|
| 人物1、衣服2、姿势3、灯光4 | CONTINUE immediately; four USER_EXPLICIT assignments |
| Named role per image | That role is an allow-list; compiler explicitly excludes every unmapped high-leak domain |
| One image → many domains | Allowed; modes independent; identity LOCK ≠ whole-image LOCK |
| Two identity LOCKs different people | UNRESOLVED HARD → ASK or BLOCK; **no blend** |
| “融合这两个人物” | **ASK**; no identity assignment until answered |
| Dual lighting INSPIRE | CONTINUE; Director synthesizes; both provenance contributors kept |
| Unstated roles | Conservative map or ASK for identity/wardrobe split only |

# Must Not Do

- Last-write-wins on HARD
- Auto identity fusion
- Parallel reference state
- Director/Compile while unresolved HARD remains

# Worked cases

- `[1][2][3][4] 人物1、衣服2、姿势3、灯光4。` → auto continue  
- `[两个不同人物] 融合成一个。` → ASK  
