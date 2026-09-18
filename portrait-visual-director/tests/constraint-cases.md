# Constraint Test Cases

Purpose: pin constraint kinds/scopes, protection derivation, readiness, safety/compiler boundaries against schema 2.3.

## Kept / updated

| ID | Scenario | Expected |
|----|----------|----------|
| C01 | "画面必须是 3:4" | VALUE/REQUIRE HARD PATH `composition.aspect`; sole aspect truth |
| C02 | "不要出现文字" | FORBID HARD GLOBAL; compiler retains negative |
| C03 | "电影写真" | VALUE SOFT **GLOBAL** + intent_tags; not path:null abuse |
| C04 | "必须保持眼镜" | HARD PATH wardrobe/accessory; refs cannot erase |
| C05 | SOFT style + REF identity LOCK | Identity remains; style completes around it |
| C06 | Director rim light vs HARD flat window | Director yields |
| C07 | Required path null after director | Stage stays DIRECTED; not READY |
| C08 | Safety BLOCK minor-coded | BLOCK over all locks |

## Schema and boundary cases

| ID | Scenario | Expected |
|----|----------|----------|
| A | Aspect dual store attempt (`generation.aspect` + `composition.aspect`) | Forbidden; only `composition.aspect`; generation may hold explicit requested dimensions but never another aspect |
| B | Parent LOCK `subject.identity` | Protects descendants (`description`, `face_notes`, `age_band`, …) via `is_path_protected` |
| C | Parent INSPIRE `lighting` + child HARD `lighting.source` | Child HARD wins on source |
| D | Parent LOCK `wardrobe` + conflicting child HARD `wardrobe.outfit` | UNRESOLVED HARD conflict; not READY |
| E | Parent IGNORE `environment` (img2) + explicit child `environment.place` LOCK (img3) | Explicit child wins; img2 contributes nothing |
| F | Two lighting INSPIREs + Director synthesis | Provenance lists **both** REFERENCE contributors + DIRECTOR PRIMARY |
| G | "人物保持不变" | PRESERVE identity only; **does not** permanent-LOCK `subject.hair` |
| H | "人物保持不变，但改成短发" | Valid: PRESERVE identity + VALUE hair short |
| I | Global cinematic preference | `scope: GLOBAL`; no undefined `path: null` behavior |
| J | READY with null required slice (neither moment.event nor pose), null aspect, or null identity/age_band | Illegal; readiness fails. Still portrait may use pose **or** event |
| K | Safety tries to replace subject/brand in creative domains | Forbidden; only `controls.safety` decision + `required_changes` |
| L | Compiler writes VS or invents art | Forbidden; read-only; IR derived |
| C16 | FORBID `wardrobe.accessories` | Director cannot fill; not represented as domain null-only |
| C17 | Persisted `hard_paths` array | Must not exist; protection derived |
| C18 | PRESERVE with `value: null` meaning keep-ref | Illegal — PRESERVE carries asset id; null domain ≠ preserve |
| C19 | PRESERVE identity + assignment LOCK | `constraint_id` on assignment; intent and mapping stay linked |
| C20 | User HARD red coat vs image_2 wardrobe ADAPT | HARD color wins; ADAPT cannot erase user HARD |
| C21 | HARD wardrobe value vs Director “improve outfit” | Patch REJECTED on protected path |
| C22 | identity LOCK vs Director face “cleanup” | REJECTED |
| C23 | FORBID accessories vs Director add earrings | REJECTED |
| C24 | AUTO camera.lens UNSET | Director may fill with reason |
| C25 | Dual lighting INSPIRE | Synthesis OK; both contributors kept |
| C26 | wardrobe revision | Only dirty paths re-directed (`core/director-dependencies.md`) |
| C27 | environment revision | identity PRESERVE kept |
| C28 | Conflicting light sources | COHERENCE_REPAIR round 2; then stop if still broken |
| C29 | Third Director round | Forbidden (max 2) |
| C30 | Director sets READY_TO_COMPILE | Forbidden |
| C31 | Patch writes controls.safety / assignments | REJECTED |
| C32 | “刚放下咖啡杯，看向窗外” without “必须” | HARD observable snapshot: cup rests on table, hand released/releasing, gaze outside; holding the handle fails |
| C33 | “轻松自然、克制高级、真实摄影感” | SOFT aesthetic cues; not promoted merely because explicit text contains them |
| C34 | “咖啡馆里，大概像刚喝完咖啡” | Approximation wording prevents auto-HARD action state |
| C35 | “现代茶室，不要过度传统符号” | HARD FORBID keeps original text plus observable boundary: one functional tea service and at most one additional decorative cue |
| C36 | “不要太多首饰” | Limits excess; does not silently become zero jewelry |
| C37 | “美女 / 美人 / 女主感” | SOFT subject-priority cue; Director concretizes face, framing, pose, hierarchy and light without creating a HARD beauty standard |
| C38 | “生成一个汉服美女” omits aspect/lens/scene | User words remain explicit intent; 3:4 and other completions are SOFT Director/Recipe values, not invented user constraints |
| C39 | “4:5，1080×1350” | HARD aspect and HARD requested dimensions; consistency check passes |
| C40 | “尺寸 1080×1440” without ratio | HARD requested dimensions; sole aspect truth deterministically becomes `3:4` with USER-derived provenance |
| C41 | “4:5，1080×1440” | Unresolved HARD consistency conflict; ASK which value controls; no compile |
| C42 | “3:4” without pixels | HARD aspect; requested dimensions remain null; no invented `1080×1440` |
| C43 | “竖版” without ratio | HARD portrait orientation; compatible ratio is a SOFT Director/default decision |
| C44 | “4K 高清” without width/height | Preserve raw delivery wording; do not invent pixels; ASK only if exact delivery depends on it |
| C45 | Singular clean-lifestyle portrait with public café setting | `composition.subject_count = 1`, `environment.background_people = none visible`, and one-cue prop budget are SOFT Recipe/Director decisions; explicit group/crowd intent overrides them |
| C46 | Explicit “和朋友在热闹咖啡馆合照” | User count/social context wins; natural-lifestyle may not force the single-subject default |

## Assertions

- No dual aspect truth
- No invented pixel dimensions
- No hard_paths cache
- null = UNSET only
- GLOBAL constraints are first-class
- READY means required creative paths decided
- Safety and Compiler are not creative mutators
