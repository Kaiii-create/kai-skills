# Photo Restoration Workflow

## Primary objective

For photographs containing recognizable people, identity fidelity has higher priority than sharpness, beauty, completeness, or perceived image quality.

The goal is to restore the photograph, not reinterpret the person.

## Evidence-preserving restoration

Treat surviving pixels as historical evidence.

Never replace uncertain facial information merely to make the face look sharper, prettier, younger, more symmetrical, or more complete.

When source evidence is weak:
- preserve uncertainty
- preserve mild blur
- preserve asymmetry
- preserve age cues
- preserve unusual or distinctive facial traits

A slightly blurry but faithful face is preferable to a sharp invented face.

## Restoration order

1. Preserve an untouched original reference.
2. Correct global tone, fading, yellowing, and contrast without changing facial geometry.
3. Remove dust, scratches, stains, and crease damage outside identity-critical facial regions.
4. Repair facial damage conservatively and locally.
5. Reconstruct only details strongly constrained by neighboring source evidence.
6. Apply mild output enhancement or upscaling last.
7. Never use enhancement as permission to redesign facial details.

## Strict face restoration rules

For every recognizable person, preserve:
- head shape and face width/height ratio
- eye spacing, size, shape, and tilt
- eyebrow position and characteristic shape
- nose bridge length/width and nose-wing/nostril shape
- philtrum length
- mouth width, lip proportions, and mouth-corner position
- jaw and chin geometry
- ears and their position
- hairline and hairstyle structure
- age cues and expression
- scars, moles, asymmetry, and other distinctive traits

Do not:
- enlarge, beautify, or symmetrize eyes
- narrow, straighten, or redesign the nose
- reshape lips, chin, jaw, or face contour
- smooth away age or distinctive asymmetry
- invent eyelashes, brows, teeth, pores, or hair strands unsupported by the source
- create a more conventionally attractive face
- modernize makeup or hairstyle
- replace ambiguous facial regions with a generic plausible face

## Missing or unreadable facial regions

If a small region is damaged but surrounding geometry strongly constrains it, perform minimal local reconstruction.

If a large identity-bearing facial region is missing, occluded, or unreadable, do not pretend the original appearance is recoverable.

Prefer, in order:
1. conservative completion
2. lower-detail reconstruction
3. retained softness or ambiguity

over high-confidence hallucinated detail.

## Generative edit rule

Never regenerate the entire person when only restoration is required.

Use the smallest feasible edit region. For facial restoration, modify only damaged pixels or regions while using the untouched original face as the identity reference.

Do not alter intact identity-bearing facial pixels unless required for seamless blending. If a tool cannot reliably preserve intact facial structure, prefer a less aggressive restoration.

## Sharpness rule

Sharpness is subordinate to identity.

Do not convert uncertain low-resolution facial information into invented high-frequency detail. If additional sharpness causes identity drift, revert to the softer result.

## Colorization

Colorization is optional and inferred. Do not allow inferred skin, eye, hair, or clothing color to alter facial structure or perceived identity.

## QC requirement

Compare the restored face directly against the untouched original source, not against an idealized portrait.

Reject or roll back a result if any identity-bearing proportion changes noticeably. See `qc/QC.md` for the identity-fidelity checks.

Do not claim synthesized faces, textures, or colors in missing or severely blurred regions are historically accurate recovered details.
