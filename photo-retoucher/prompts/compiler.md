# Generative Edit Prompt Compiler

Never forward vague user text alone when preservation matters. Compile a precise edit instruction.

Template:

1. CHANGE: exactly what to alter.
2. TARGET: subject ID / region / object.
3. STRENGTH: subtle, natural, moderate, strong, or explicit numeric-like semantic level.
4. PRESERVE: identity, expression, pose, unrelated facial features, hair, clothing, body, background as applicable.
5. INTEGRATE: perspective, lighting direction, color temperature, shadows, depth of field, grain/sharpness.
6. QUALITY: photorealistic anatomy, clean edges, no duplicated details, no geometry warping.

Example — subtle face slim:
“Subtly refine only P1's outer cheek and jaw contour. Preserve identity, eyes, nose, mouth, expression, hairstyle, skin texture, neck, clothing, pose, lighting and background. Keep the result photorealistic and difficult to detect as retouched. Do not warp nearby straight lines.”

Example — background only:
“Replace only the background with an elegant photorealistic sunset beach. Keep all people pixel-consistent in identity, face, body proportions, pose, hair, clothing and accessories. Integrate the scene through matching perspective, ambient color, light direction, contact shadows and depth of field. Do not redesign the subjects.”

## Old-photo face restoration compiler

For restoration of a recognizable person, compile a stricter instruction than the generic template. Identity fidelity overrides sharpness and aesthetic improvement.

Required clauses:

**CHANGE**
Repair only physical or photographic degradation: scratches, stains, tears, fading, noise, compression artifacts, and visibly damaged pixels.

**IDENTITY PRIORITY**
This is the same real person. Preserve the person's exact recognizable identity from the source image. Restore the photograph; do not reinterpret the person.

**SOURCE EVIDENCE**
Treat visible source pixels as authoritative. Do not reinterpret intact facial features. Do not infer a different feature merely because it would look clearer or more aesthetically typical.

**FACE GEOMETRY LOCK**
Preserve head shape, face width/height ratio, eye spacing/size/tilt, eyebrow position, nose bridge and nose-wing dimensions, philtrum length, mouth width, lip proportions, chin, jaw, ears, hairline, expression, age cues, and natural asymmetry.

**UNCERTAINTY RULE**
Where facial detail is unclear, retain softness or ambiguity rather than inventing plausible detail. A softer faithful face is preferable to a sharper invented face.

**FORBIDDEN**
Do not beautify, rejuvenate, symmetrize, enlarge eyes, redesign eyebrows, reshape the nose/lips/chin/jaw, modernize makeup or hairstyle, or invent eyelashes, teeth, pores, hair strands, or other high-frequency detail unsupported by the source. Do not replace the face with a generic or idealized plausible face.

**EDIT SCOPE**
Modify only visibly damaged regions whenever possible. Keep intact identity-bearing facial pixels unchanged. Never regenerate the entire person for ordinary restoration.

**QUALITY**
Historically plausible photographic restoration with natural grain and texture. Identity fidelity is more important than sharpness.

When the source face is severely damaged or too low-resolution to support faithful detail, explicitly prefer conservative low-detail reconstruction over confident hallucination.
