# Temperament Overlay Registry

An overlay is an optional secondary temperament layer. Select at most one only when the user's wording clearly supports it. Set `intent.overlay_id`, apply compatible SOFT patches, and record `OVERLAY` provenance. The recipe/scenario controls genre, setting, composition and primary light; an overlay cannot convert one recipe into another.

| ID | Cues | Compatible refinement | Must not change |
|----|------|-----------------------|-----------------|
| `gentle-natural` | 温柔、自然、亲近、松弛、gentle | Softer mouth, calm off-camera gaze, released shoulders, low-intervention grooming, slightly warmer open shadows | Adult boundary, action, garment, recipe hierarchy |
| `cold-composed` | 清冷、克制、疏离、冷静、cool composed | Focused eyes, quieter mouth, economical posture, cooler neutral grade, firmer negative space | Skin into blue/gray, face readability, warm HARD palette |
| `intellectual` | 知性、高智感、书卷气、理性、professional intelligence | Attentive gaze, precise hands, composed posture, restrained styling, credible task/context | Student coding, invented books/text, professional role facts |
| `bright-heroine` | 明艳、女主感、抓眼、存在感、惊艳 | Clearer eye/brow definition, opened posture, confident gaze, concentrated highlight/color accent | Jewelry/prop inflation, identity replacement, recipe palette |
| `mature-urban` | 轻熟、都市女性、优雅、自信、mature urban | Current grooming, controlled sensuality, assured stance, clean tailoring emphasis, subtle contrast | Default suit, sexualization, lifestyle scene into advertising |

# Selection boundaries

1. User-explicit temperament words are preserved first; the overlay only makes them visible.
2. When two overlays appear, choose the one tied most directly to expression/posture. Keep the other as ordinary SOFT mood if compatible.
3. `bright-heroine` cannot override low-key restraint, historical accuracy, or a user request for quiet minimalism.
4. `cold-composed` cannot remove face light or neutralize a required warm/red-gold palette.
5. `intellectual` does not automatically add books, glasses, desks, or office props.
6. No overlay is better than a weak or contradictory match.

# Patch surface

Overlays may touch only `subject.expression`, `subject.gaze`, compatible parts of `subject.pose`, `wardrobe.makeup`, small grooming details, and minor `color.grade`/`lighting.quality` refinements. They never set identity, age, recipe, scenario, environment, aspect, subject count, exact wardrobe, reference roles, or constraints.
