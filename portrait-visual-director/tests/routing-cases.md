# Routing Test Cases

Purpose: pin Intent Routing, shared pipeline orchestration, Clarification Gate, revision, and hard stops.

## Mode routing

| ID | Input | Expected |
|----|-------|----------|
| R01 | Text only, generate portrait | `text_to_image`; full lifecycle; assignments [] |
| R02 | 1 image + 保持这个人换夜景 | `single_reference_to_image`; identity LOCK; CONTINUE |
| R03 | 1 image + 参考这个感觉 | single; INSPIRE pack; CONTINUE; no identity LOCK |
| R04 | 4 images + 人物1衣服2姿势3光线4 | multi; CONTINUE; four assignments |
| R05 | 2 different people + 融合成一个 | multi; **ASK**; no identity blend |
| R06 | Text, no gen intent (只聊摄影) | no workflow / clarify non-gen |
| R07 | Broken image attachment | clarify or fail clear; do not invent ref content |

## Clarification Gate

| ID | Case | Decision |
|----|------|----------|
| R08 | Soft style/lighting/color ambiguity | CONTINUE |
| R09 | Identity source unclear and would change subject | ASK |
| R10 | Two HARD identity LOCKs | ASK then BLOCK if user refuses |
| R11 | Safety blocks | BLOCK; no Compiler/Adapter |

## Pipeline integrity

| ID | Case | Expected |
|----|------|----------|
| R12 | Text-only skips Constraint/Safety | Illegal — full lifecycle required |
| R13 | Stage MAPPED → Compile | Illegal |
| R14 | Unresolved HARD → Director/Compile | Illegal |
| R15 | Safety BLOCKED → Adapter | Illegal |
| R16 | Readiness required paths null + READY | Illegal |

## Revision (same State)

| ID | Case | Expected |
|----|------|----------|
| R17 | 人物图1衣服图2 then “衣服改红色” | Keep identity PRESERVE/assignment; update wardrobe constraint; partial re-direct only |
| R18 | 人物保持+场景改海边 | No new identity inference; environment/moment redo only |
| R19 | “不要首饰” then Director adds jewelry | Forbidden (FORBID path) |

## Director orchestration

| ID | Case | Expected |
|----|------|----------|
| R20 | After MAPPED, Director runs patch passes | Stage DIRECTED only after audit; not READY |
| R21 | Audit fails | One COHERENCE_REPAIR; no infinite loop |
| R22 | Revision wardrobe | Dirty-map only; identity reference kept |
| R23 | Adapter CAPABILITY_BLOCK on identity LOCK | Workflow ASK/BLOCK; no generation |
| R24 | Adapter DEGRADED_OK without core HARD loss | Allowed with capability_report |
| R25 | Safety ASK (auth/age) | Clarification; no Compiler |
| R26 | Safety ALLOW_WITH_CONSTRAINTS unapplied | Not READY; revise then re-gate |
| R27 | Safety BLOCK | Never Compiler/Adapter |

## Output mode & loading

| ID | Case | Expected |
|----|------|----------|
| R28 | 只要提示词 | Prompt Mode; adapter **not** called |
| R29 | 直接出图 / 做一张写真 | Direct Image; adapter called |
| R30 | Text request | Do not load deep reference-director docs |
| R31 | No style cue | Do not load recipe files |
| R32 | Any supported explicit recipe cue | Load registry + exactly one matching recipe only |
| R33 | tests/examples | Never runtime-loaded |
| R34 | Clarify | Plain language; no LOCK/VS jargon |
| R35 | Direct Image reply | No internal state dump unless asked |
| R36 | Batch case B reuses case A's four image files but gives a new complete request | New `meta.id`; empty domains/constraints; no scene/aspect/forbid carry-over |
| R37 | “把刚才那张的衣服改红色” | Explicit revision; reuse current state and dirty only dependent paths |
| R38 | Same references + a separately labelled Prompt-only case | Independent state unless it explicitly asks to revise the prior result |
| R39 | Only 高级 / 唯美 / 氛围感 | No recipe body load; ordinary SOFT direction only |
| R40 | Multiple supported cues | Apply registry boundary rules; load exactly one recipe body |
| R41 | “生成一个汉服美女” | Direct Image; load `gufeng-heroine` + `core/short-brief-expansion.md`; no clarification for ordinary creative gaps |
| R42 | “给我一个漂亮的职业头像” | Beauty cue loads short-brief expansion while `professional-portrait` remains the only recipe |
| R43 | Fully specified portrait without beauty cue | Do not load short-brief expansion merely because optional fields remain null |
| R44 | Request contains ratio, orientation, pixel size, resolution, or export size | Load `core/output-spec.md` |
| R45 | Request has no output-shape cue | Do not load `core/output-spec.md`; ordinary sparse default still comes from short-brief expansion |

## Assertions

- One shared pipeline for all three modes
- Workflows never design art or write prompts
- ASK keeps the same VS (no fork)
- BLOCK never reaches Adapter
