# Quality Control Gate

Run after generative/structural edits and complex retouching.

## Critical
- same-person identity consistency
- correct count and structure of eyes, hands, fingers, arms, legs
- intact neck/shoulder/body connections
- locked facial features unchanged
- no accidental subject replacement

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
If critical/high failure: rollback to last stable image, narrow target, strengthen preservation, repair locally. Max automatic attempts: 2. If still failing, return the best stable result and state the unresolved limitation.
