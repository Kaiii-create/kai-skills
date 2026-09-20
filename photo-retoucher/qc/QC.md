# Quality Control Gate

Run after generative/structural edits and complex retouching.

## Critical
- same-person identity consistency
- correct count and structure of eyes, hands, fingers, arms, legs
- intact neck/shoulder/body connections
- locked facial features unchanged
- no accidental subject replacement

## Identity-fidelity checks for restoration

For old-photo restoration or any reconstruction of a recognizable face, compare the result directly against the untouched original source.

Check that these relationships remain stable:
- head shape and face width/height ratio
- eye-to-eye spacing
- individual eye size, shape, and tilt
- eyebrow position
- nose bridge length/width and nose-wing width
- philtrum length
- mouth width and mouth-corner position
- upper/lower lip proportions
- chin length/shape and jaw contour
- ear position
- hairline
- expression and age cues
- distinctive asymmetry, scars, moles, and other identity marks

Do not treat increased sharpness, symmetry, smoothness, or attractiveness as evidence of successful restoration.

A softer result that preserves these relationships is preferable to a sharper result that changes them.

If the original does not contain enough evidence to verify a newly synthesized facial detail, treat that detail as uncertain rather than as a restoration success.

## High
- hair/veil/lace edges natural
- clothing seams, collars, buttons, jewelry and patterns coherent
- architecture, doors, railings, horizons and straight lines not warped
- background perspective and scale coherent
- contact shadows/light direction/color temperature consistent

## Medium
- skin retains believable texture; no plastic/waxy surface
- teeth/eye whites not unnaturally bright
- no repeated generative textures or ghost objects
- no halos around cutouts
- no unintended crop of head/chin/important clothing

## Repair policy

If critical/high failure: rollback to last stable image, narrow target, strengthen preservation, repair locally. Max automatic attempts: 2.

For restoration identity drift, first revert to the last faithful result, then reduce edit scope and reconstruction strength. Do not attempt to fix identity drift by regenerating the whole face again.

If still failing, return the best stable result and state the unresolved limitation.
