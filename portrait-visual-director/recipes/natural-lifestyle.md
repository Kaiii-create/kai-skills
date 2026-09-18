# natural-lifestyle

# Intent

Portrait-first clean and natural lifestyle photography for clearly adult subjects. The person, face, gaze, and relaxed presence are the image; the café, home, street corner, or window is quiet context rather than a competing documentary scene.

The cues `清纯生活照`, `干净生活照`, `温柔自然写真`, and `clean lifestyle portrait` use the clean-lifestyle variant below. “清纯” means fresh, restrained adult styling and an uncluttered frame; it must not create minor-coded features or infantilized behavior.

# Visual Direction

Create one believable pause with low performance, natural skin, tactile clothing, and motivated available light. Prefer a single visible adult subject. Keep the face and upper-body silhouette unmistakably first, then the requested clothing, then one functional environmental cue. Empty café depth is better than populated realism when bystanders would compete with the portrait.

# Preferred State Patches

| Path | Direction | Strength |
|------|-----------|----------|
| `composition.subject_count` | One visible adult subject unless the user explicitly requests a couple, group, crowd, staff interaction, or documentary social scene | STRONG |
| `composition.hierarchy` | Face and eyes first; requested clothing second; one functional lifestyle cue third; environment last | STRONG |
| `composition.framing` | Clean waist-up or half-body portrait with readable shoulders, hands, and clothing layers; uncluttered face silhouette | STRONG |
| `subject.gaze` | One calm off-camera target, often the window or the immediate activity; direct-to-camera gaze only when requested | NORMAL |
| `subject.pose` | Relaxed shoulders and neck, quiet asymmetry, hands low or naturally resting; no cheek-rest/chin-rest selfie pose | STRONG |
| `subject.expression` | Gentle, internally occupied, and unperformed; no stock-photo grin or practiced influencer smile | STRONG |
| `moment` | A subtle pause rather than a prop demonstration; the action must not require both hands to perform for the camera | NORMAL |
| `wardrobe` | Preserve every explicitly named layer and its visible material relationship | STRONG |
| `environment.background_people` | No other visible people, faces, bodies, silhouettes, mirror figures, window reflections, or human portraits unless explicitly requested | STRONG |
| `environment.prop_budget` | At most one functional lifestyle cue beyond furniture, such as a cup OR book, never a cup + open book + flowers + menu cluster | STRONG |
| `environment.props` | Use only a user-named object or one restrained functional cue; do not invent foreground storytelling clutter | STRONG |
| `camera.depth` | Café or room remains legible but subdued; no readable background face or high-contrast human shape | NORMAL |
| `lighting.source` | Window daylight or one plausible soft practical-assisted source | NORMAL |
| `lighting.quality` | Soft directional light with readable catchlights and dimensional facial planes | STRONG |
| `color.palette` | Warm white, oatmeal, pale wood, muted neutrals, or the user's palette; face retains local contrast | NORMAL |
| `color.grade` | Light natural grade, open shadows, restrained highlights | NORMAL |
| `texture.skin` | Living skin texture with pores and tonal variation; controlled polish only | STRONG |
| `wardrobe.makeup` | Low-intervention adult grooming; clean brows, natural lashes, restrained lip and complexion | NORMAL |

# Director Guidance

Treat this as a portrait with lifestyle evidence, not a still life with a model inside it.

1. Lock every named clothing component. `米白针织开衫 + 浅色内搭` requires both the cardigan and inner layer to remain visible.
2. Choose one gaze target and one quiet hand logic. Looking out the window with hands resting naturally is preferable to holding a cup while touching the face and smiling at the camera.
3. Use furniture and architecture to establish the café. Do not add people to prove the location.
4. Keep one prop at most unless the user named more. A coffee cup may support the scene; an unrequested open book, bouquet, menu, pastry, and cup stack may not.
5. Concentrate the brightest readable values on the eyes, face, hair edge, and requested garment layers. Keep windows, tabletops, and pale props below the face in the hierarchy.
6. When the brief says `清纯`, preserve clearly adult facial proportions and behavior. Fresh styling is not youth coding.

# Compatible References

Works with identity LOCK, wardrobe ADAPT/LOCK, pose ADAPT, and lighting INSPIRE. Identity remains unchanged. A café reference may contribute spatial or lighting principles without importing its customers, staff, posters, table clutter, or readable signage unless those domains are explicitly assigned.

# Protective Check

The recipe fails when any observable condition is true:

- more than one person or human-like figure is visible anywhere in the frame without explicit user intent, including reflections, posters, silhouettes, cropped bodies, or background faces;
- the face, eyes, or requested clothing lose the hierarchy to a book, cup, bouquet, menu, bright window, tabletop, or café crowd;
- more than one unrequested functional/decorative prop competes in the portrait foreground;
- the pose combines a cheek/chin-rest gesture, direct camera smile, and displayed drink into a stock lifestyle or influencer-selfie setup;
- an explicitly named wardrobe layer is missing, hidden, or replaced;
- the face is flat, over-smoothed, youth-coded, or less readable than the immediate background;
- the café is established mainly through bystanders instead of architecture, furniture, light, and one restrained cue.

One failed observable recipe predicate is eligible for the single targeted acceptance retry. Restate only the failed condition and preserve every explicit user fact.

# Must Not Override

Any HARD, LOCK, FORBID, identity, explicit gaze/action, user-requested group/social context, wardrobe component, prop, color/light direction, aspect, or dimensions.

# Avoid

Extra people, background customers, staff, passersby, human reflections, portrait posters, cropped bodies, prop clusters, open-book foregrounds unless requested, chin-rest or cheek-rest poses, cup presentation, direct-camera stock smile, influencer selfie language, beauty-dish glamour, plastic skin, blown windows, pale-prop highlight competition, studio catalog gloss, and neon night.

