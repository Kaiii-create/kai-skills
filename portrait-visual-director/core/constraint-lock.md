# Purpose

Extract user instructions into Canonical Visual State `constraints[]` (and matching domain values / reference PRESERVE bindings). No derived `hard_paths` cache.

# Responsibilities

- Parse user text into constraint records:
  - `kind: VALUE | REQUIRE | FORBID | PRESERVE_REFERENCE`
  - `level: HARD | SOFT`
  - `scope: PATH | GLOBAL` (GLOBAL never uses a fake path)
- Apply VALUE/REQUIRE literals onto domain paths when present
- Write FORBID as constraints only (explicit none) — not as domain sentinel strings
- Write PRESERVE_REFERENCE + matching `references.assignments` LOCK `USER_EXPLICIT` on the **named path only**
- Set provenance for applied values
- Advance stage → `LOCKED`

# Inputs

- User text (`meta.user_text`)
- Visual State shell after Intent Routing

# Outputs

- `constraints[]`
- Domain values for VALUE/REQUIRE
- PRESERVE bindings + assignments
- Provenance updates
- Stage `LOCKED`

# Reads

- `core/visual-state.md` (schema, path semantics, identity rules)
- The initialized Visual State produced by the selected workflow

# Writes

- `constraints`, affected domain values, PRESERVE-related `references.*`, provenance, stage

# Strength classification

Classify by whether the phrase describes a required visible outcome, not only by words such as “必须”.

- Default to HARD for explicit, concrete, visually verifiable facts the requested image is supposed to contain: identity preservation, reference roles, count, literal color, aspect, pixel dimensions, named place/time, hair change, pose, gaze target, action, and object state. Downgrade only when the user marks the fact approximate with language such as “可以 / 类似 / 参考 / 偏向 / 大概”.
- Keep aesthetic preferences SOFT: mood, taste, broad style, qualitative intensifiers, “高级”, “自然”, “轻松”, and similar qualities unless the user explicitly makes them mandatory. This does not weaken a negative instruction such as “不要过度”.
- Do not promote every noun in the sentence. Incidental explanation and objects merely visible in a reference are not required outcome facts.
- A negative instruction remains HARD FORBID unless the user explicitly presents it as optional.

For an action with temporal state, store the requested visible snapshot rather than only the verb. Preserve the original wording in `constraint.text`; the PATH value may make the same meaning observable. For example, “刚放下咖啡杯” means the cup is supported by the table and the hand has released, or is visibly releasing, it—not still gripping the handle. Split a compound fact across `moment.event`, `moment.action_chain`, `subject.pose`, `subject.gaze`, and `environment.props` as needed, linked to the same user intent.

For degree-limited negatives such as “不要过度 / 不要太多 / 避免堆叠”, keep the original phrase in `constraint.text` and encode a HARD FORBID with a concrete visible failure predicate in `value`. Preserve the allowed core concept; do not reinterpret “not excessive” as “none”. Use a conservative context-specific boundary only when it follows directly from the requested scene. Example for “现代茶室，不要过度传统符号”: one functional tea service may remain, plus at most one non-functional traditional decorative cue; a cluster of ink painting, blossom branch, antique vessel, calligraphy, and lacquer fails. If no defensible boundary follows from context, retain the HARD FORBID and ask only when the ambiguity would materially change the result.

# Encoding Rules

| User language | Encoding |
|---------------|----------|
| 必须 3:4 | `VALUE`/`REQUIRE` HARD PATH `composition.aspect` = `"3:4"` |
| 尺寸 1080×1350 | `VALUE`/`REQUIRE` HARD PATH `generation.requested_dimensions`; preserve raw text and parse width/height |
| 1080×1440（未写比例） | Lock dimensions and deterministically set sole aspect truth `composition.aspect = "3:4"` with USER-derived provenance |
| 4:5，1080×1440 | Unresolved HARD ratio/dimension conflict; ask which controls the frame |
| 竖版（未写比例） | HARD portrait-orientation requirement; Director chooses a compatible SOFT ratio, normally `3:4` |
| 电影写真 / 整体清冷 | `VALUE` SOFT **GLOBAL** + `intent_tags` (no `target: null` as “path”) |
| Registry 中任一明确风格词（如新中式 / 时装大片 / 胶片感 / 高调人像） | Record a SOFT GLOBAL style cue; Recipe Selection later sets `intent.recipe_id` |
| 不要首饰 | `FORBID` HARD PATH `wardrobe.accessories` |
| 不要出现文字 | `FORBID` HARD GLOBAL `value: "text_overlay"` |
| 人物保持不变 | `PRESERVE_REFERENCE` HARD PATH `subject.identity` = asset id |
| 人物保持不变，换短发 | PRESERVE identity **+** VALUE on `subject.hair` (hair not auto-LOCKed) |
| 使用红色外套 | `VALUE` HARD/SOFT PATH `wardrobe.outfit` with literal |
| 刚放下咖啡杯，看向窗外 | HARD visible snapshot: cup resting on table, hand released/releasing, gaze outside |
| 轻松自然、高级、真实摄影感 | SOFT GLOBAL/style/quality cues unless explicitly made mandatory |
| 现代茶室，不要过度传统符号 | HARD FORBID `traditional_symbol_stack`; allow one functional tea service + at most one additional decorative cue |

# Must Not Do

- Persist `hard_paths` or `explicit_none[]` arrays
- Encode FORBID/PRESERVE as domain `null` or `"NONE"` sentinels
- Auto-LOCK `subject.hair` from identity PRESERVE
- Create INFERRED LOCK assignments
- Map arbitrary reference roles (that is Reference Director)
- Complete creative gaps
- Invent pixel dimensions from an aspect, platform name, or quality word
