# Purpose

Lightweight **invalidation map** for mid-run revisions so Director does not re-direct the whole frame. Not a dependency graph engine.

# Rule

When a path P changes (user constraint revision or validated patch):

1. Keep identity PRESERVE / LOCK assignments unless P is under identity
2. Mark **downstream creative paths** dirty using the table
3. Re-run only dirty paths through Director passes → Safety → Readiness → Compiler
4. Do not re-run Reference Director inference for untouched assets

# Invalidation table (V1)

| Changed path | Dirty (re-direct) | Usually keep |
|--------------|-------------------|--------------|
| `wardrobe.*` | pose hands/torso response, lighting on fabric, color, texture, hierarchy secondary | identity, environment place, camera scale (unless pose scale breaks) |
| `subject.pose` / gaze | moment.action_chain, camera angle/depth, composition framing, hierarchy | identity, wardrobe core (fit may tweak), environment place |
| `environment.*` | lighting, composition, camera, color, texture, moment interaction | identity LOCK, wardrobe core, FORBID |
| `lighting.*` | color, texture skin/surface, camera depth feel, hierarchy contrast | identity, wardrobe silhouette, environment place |
| `color.*` | texture grade feel, lighting color_intent (soft) | identity, pose, environment place |
| `moment.*` | pose, gaze, action_chain, wardrobe motion, camera timing feel | identity, place (unless event contradicts) |
| `subject.identity` | expression/gaze defaults only; **never** silent hair/wardrobe wipe | assignments on identity; other refs |

# Examples

- “衣服改红色” → dirty wardrobe/color/lighting-on-garment/texture; **identity untouched**
- “场景改海边” → dirty environment/lighting/composition/camera/color; **identity untouched**
- “不要首饰” → FORBID accessories; dirty only accessory-dependent hierarchy notes

# Must Not Do

- Full pipeline reset on every sentence
- Re-infer identity when environment changes
- Treat dirty marks as a second Visual State store (marks are ephemeral orchestration, not SSOT)
