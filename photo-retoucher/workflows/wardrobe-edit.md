# Wardrobe Edit Workflow

Target clothing only unless the user explicitly requests body changes.

## Strict subject locks

For recognizable people, face/head identity is strict-locked during wardrobe generation. Preserve:
- face and head geometry
- eyes, eyebrows, nose, mouth, jaw and chin
- expression and age cues
- ears, hairline and hairstyle
- body shape and pose unless explicitly targeted
- hands and visible skin
- background unless explicitly targeted

Support color changes, wrinkle/stain cleanup, suit/shirt/tie, formalwear, wedding attire and other requested wardrobe changes.

For generated clothing, modify the smallest feasible clothing region. Preserve collar/neck connection, shoulder width, sleeve/hand occlusion, folds, material, perspective, lighting and shadows.

Only minimal blending is permitted at neck/collar, hair/clothing overlap, sleeves/hands and garment boundaries. Boundary integration is not permission to regenerate the face, head, skin, hair, hands or body.

If a clothing generation changes face identity, head shape, body proportions, pose, or hands, rollback to the last stable image and retry with a narrower mask/stronger locks. Do not fix the drift by regenerating the whole subject.

Run identity plus anatomy/clothing QC after structural replacement.
