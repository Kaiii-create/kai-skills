# Rescue Photo Workflow

Trigger: “拍废了/救一下/老婆嫌我拍得不好/不知道哪里不对”. Goal: make it look like it was photographed better, not silently beautify the person.

Diagnose: lens/perspective distortion, horizon, composition, exposure/backlight, clipped highlights, white balance, distracting background objects, subject placement, and other photographic defects.

Default: naturalness 2, identity strict, `portrait_retouch_level: 0`. Rescue mode by itself does **not** authorize skin smoothing, face slimming, eye enlargement, body reshaping or other beautification. Prioritize lens/perspective → crop/composition → exposure/white balance → justified background cleanup → color → QC.

If the user adds “人物简单修改/轻修”, apply portrait Level 1. If they add “人物精修/精修一下人物”, apply Level 2. If they add “人物商业精修”, apply Level 3. Read `presets/portrait-retouch-levels.yaml`.

Explicit requests such as “眼睛大一点” or “脸稍微瘦一点” authorize only those named edits even when the level remains 0. Do not silently change outfit, hairstyle, facial identity, expression or body shape.
