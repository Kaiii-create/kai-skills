# Background & Scene Workflow

Covers replacement, cleanup, object/person removal, expansion and depth blur.

For background-only requests: subject strict-lock. Preserve face/head/body geometry, expression, pose, clothing design, hair structure, veil, translucent fabric and fine edges.

Secondary subject changes are limited to integration that is causally necessary: ambient color cast, rim light, contact shadow, depth, grain and sharpness matching. These may adjust existing pixels locally but must not regenerate facial features, skin texture, hair strands/structure, clothing details, hands, or anatomy.

Use the smallest feasible subject-edge transition. Prefer masks and deterministic compositing where available. Do not use full-image regeneration merely to make a new background blend better.

Object removal must reconstruct plausible continuous texture/structure without changing nearby protected subjects. Expansion should preserve subject and composition; prefer expansion over cropping important body/head regions when changing aspect ratio.

After generative background work, compare protected subjects against the pre-edit stable image. Any identity, pose, anatomy, clothing-design or hairstyle drift is a QC failure: rollback and retry with tighter masks.
