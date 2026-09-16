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
