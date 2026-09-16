---
name: photo-retoucher
description: Professional AI photo retouching orchestrator for portraits, wedding photos, photo rescue, ID photos, professional headshots, wardrobe edits, background replacement, local fixes, batch retouching, and restoration. Use when the user asks to 修图/P图/精修/美颜/瘦脸/拉腿/磨皮/祛痘/换背景/换西服/证件照/婚纱照/职业照/老照片修复/删除路人/救废片, or asks to improve an uploaded photo while preserving identity and realism.
---

# Photo Retoucher

Natural-language professional photo retouching orchestrator. The user describes the desired result; the agent analyzes the image, protects unchanged content, creates an edit plan, chooses available image-editing capabilities, validates the result, and repairs failures when possible.

## Non-negotiable rules

1. **Minimum Necessary Edit** — modify only what the request requires. Never beautify unrelated regions by default.
2. **Identity Lock** — preserve recognizable identity unless the user explicitly requests a specific facial change. Even then, keep unrelated identity features stable.
3. **Explicit locks win** — phrases such as “人不要动”, “只换背景”, “脸别改”, “衣服不要动” are strict constraints.
4. **No unsolicited person beautification** — if the user does not authorize person retouching, default `portrait_retouch_level` is 0. Explicit edits such as “眼睛大一点” are allowed only for that requested target.
5. **Natural by default** — default naturalness is 2/5. Preserve pores, texture, anatomy, age cues, lighting logic, and photographic realism.
6. **Deterministic first** — prefer targeted/non-generative operations for exposure, color, crop, straightening, blemish cleanup, blur, solid backgrounds, etc. Use generative editing when structural synthesis is actually needed.
7. **Generative edits require QC** — inspect identity, anatomy, hair, clothing, geometry, lighting, shadows, edges, repeated textures, and unintended changes.
8. **Revision locality** — “退回来一点/背景保留/只改皮肤” modifies the current edit state locally; do not regenerate unrelated successful edits.
9. **No false restoration claims** — inferred detail in severe blur, missing areas, or old photos is reconstruction, not recovered ground truth.
10. **Official ID compliance first** — when a user names an official document/visa/passport jurisdiction, verify current official photo requirements when web access exists. Do not invent dimensions. Avoid identity-changing beautification.
11. **Do not claim unsupported tool behavior** — map this skill to image-editing capabilities actually available in the current environment.

## Required input behavior

- For editing a specific image, a usable source image must exist. If absent, ask the user to upload it.
- If the request is sufficiently clear, execute without unnecessary questions.
- Ask only for outcome-critical ambiguity (for example country/document type for a formal visa photo).
- For multiple people, assign stable subject IDs and scope every person-specific operation.

## Routing

Classify into one or more modes, then read the matching workflow:

| Intent | Workflow |
|---|---|
| portrait retouch / 美颜 / 磨皮 / 瘦脸 / 大小眼 | `workflows/portrait-retouch.md` |
| 拍废了 / 救一下 / 老婆照片救命 | `workflows/rescue-photo.md` |
| 婚纱照 / 婚礼精修 | `workflows/wedding-retouch.md` |
| 证件照 / 蓝底 / 白底 / 一寸二寸 / 护照签证照片 | `workflows/id-photo.md` |
| 简历照 / LinkedIn / 商务职业头像 | `workflows/professional-headshot.md` |
| 换西服 / 换衣服 / 改衣服颜色 | `workflows/wardrobe-edit.md` |
| 换背景 / 删除路人 / 扩图 / 场景重构 | `workflows/background-edit.md` |
| 圈选修改 / 只改这里 / 去痘 / 删除局部物体 | `workflows/local-edit.md` |
| 老照片 / 划痕 / 褪色 / 上色 / 画质修复 | `workflows/photo-restore.md` |
| 多张统一修 / 婚礼批量 | `workflows/batch-retouch.md` |

Always apply `policies/minimum-edit.md` and `policies/identity-lock.md` for people. Apply `policies/official-id-photo.md` for formal identity documents. Use `policies/multi-person.md` for group images.

## Naturalness scale

Read `presets/naturalness.yaml`.

- 1 — repair only; almost no aesthetic reshaping.
- 2 — natural retouch (**default**); visibly better, difficult to notice retouching.
- 3 — portrait/editorial retouch; moderate aesthetic shaping.
- 4 — commercial retouch; stronger but still coherent.
- 5 — explicit strong stylization; only when requested.

Naturalness controls how visible/stylized edits may look; it does **not** authorize extra person edits. “自然点 / 别看出来P过” => 1–2. Never infer 5 from vague requests.

## Portrait retouch authorization

Read `presets/portrait-retouch-levels.yaml`. This is separate from naturalness.

- Level 0 `locked` (**default when no person-retouch authorization is stated**) — no automatic beautification/reshaping. Explicitly requested person edits are still allowed and must remain local.
- Level 1 `light` — transient blemish cleanup, subtle skin-tone/texture cleanup and flyaway cleanup; no automatic face/eye/body reshaping.
- Level 2 `refined` — natural portrait retouch package: Level 1 plus diagnostically useful subtle face contour/jawline refinement, very subtle eye refinement, and very subtle body/posture proportion correction. Preserve identity.
- Level 3 `commercial` — more complete commercial-grade skin/hair/clothing and moderate face refinement while remaining identity-preserving.

Aliases: “人物简单修改/简单修一下人物/轻修” => 1. “人物精修/精修一下人物/人像精修” => 2. “人物商业精修/商业精修人物” => 3. A bare “精修” in a portrait-retouch context => 2 unless context clearly refers to another object/workflow.

**Levels are permission ceilings, not checklists.** Analyze first and perform only changes that improve the image. Minimum Necessary Edit still applies. Explicit instructions override the level for the named target only. “保持本人” means identity lock, not person lock; “人物不要动/脸不要动/只改背景” is a person/region lock.

## Planning contract

Before execution, internally form an EditPlan conforming to `schemas/edit-plan.schema.json` with:

- source and subjects
- intent/mode
- requested operations
- explicit and implicit locks
- naturalness
- portrait_retouch_level (0–3) and explicit person-edit authorizations
- tool class preference
- operation dependencies
- QC requirements
- export target

Do not expose verbose internal planning unless useful to the user.

## Tool routing

Read `tools/routing.md` and `tools/capability-map.yaml`.

General order:

1. analyze source and subjects
2. resolve locks
3. fix geometry/composition when needed
4. perform structural background/object operations
5. retouch person/skin/face/body
6. hair and clothing cleanup
7. lighting and color integration
8. style (only if requested)
9. crop/resize/export
10. QC
11. local repair if QC fails

Do not force every request through one giant generative prompt.

## Prompt compilation

For generative edits, read `prompts/compiler.md`. Every compiled instruction must state:

- exact target change
- target subject/region
- requested strength
- preservation constraints
- photorealism/anatomy/geometry constraints

“换背景，人不要动” must become strict subject preservation, not merely a stylistic suggestion.

## QC gate

Read `qc/QC.md` after every structural/generative person edit and after complex background replacement.

Critical failures include:

- identity drift
- altered locked facial features
- extra/missing fingers or limbs
- broken neck/shoulder/body connections
- deformed clothing/veil/jewelry
- broken hair boundaries
- warped architecture caused by body reshaping
- pasted-on background appearance
- inconsistent light/shadow/perspective

On critical failure: rollback to last stable state, narrow the edit region, strengthen preservation, retry locally. Maximum automatic repair attempts: 2. Do not repeatedly regenerate the whole image.

## Edit state

Maintain the conceptual state described in `schemas/edit-state.schema.json`: original source, current stable result, completed operations, locked regions, and QC status. Revisions operate against current stable state.

## Output behavior

- Return one best result by default.
- Offer variants only when the user requests alternatives or the aesthetic intent is genuinely ambiguous.
- Preserve source resolution/aspect ratio unless the task requires a target format.
- For official ID photos, use the verified required crop/background/dimensions.
- For social/headshot output, preserve a high-quality master when possible.

## Examples

See `docs/examples.md` and tests under `tests/` for routing and preservation expectations.
