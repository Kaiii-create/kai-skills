# Wedding Retouch Workflow

Handle bride/groom/other subjects separately. Preserve identities and relationship between subjects.

Default: identity strict, naturalness 2, `portrait_retouch_level: 0` unless the user authorizes person retouching. A request such as “婚纱照精修” may authorize polished skin/hair/clothing/scene cleanup, but does not by itself authorize facial-feature geometry or body reshaping. Face/body geometry changes require explicit user requests.

Order: global camera corrections → subject isolation/locks → authorized skin/hair cleanup → dress/suit cleanup → explicitly requested face/body/posture changes → scene cleanup/replacement → veil/lace/hair-edge integration → lighting/color/depth → QC.

For every recognizable person, keep intact identity-bearing facial pixels and relationships stable. Do not standardize the bride or groom toward a generic wedding/beauty face. Do not silently enlarge eyes, slim faces, narrow noses, reshape lips/jaws, rejuvenate, or alter body proportions.

Wedding-specific checks: veil transparency, lace detail, dress highlights, train continuity, jewelry, bouquet, suit collar/tie, hand anatomy, overlapping subjects, contact shadows.

Background replacement must match perspective, focal/depth cues, ambient light and color. Integration lighting may affect tone/color on a subject but must not regenerate facial features, skin texture, hair structure, clothing design, or anatomy.

“人不要动” is a strict subject lock. “保持本人” enforces Identity Lock while allowing only explicitly authorized retouch operations.
