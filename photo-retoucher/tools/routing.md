# Tool Routing

Map operations to capabilities that actually exist in the current runtime. Do not assume vendor-specific function names.

## Prefer targeted/non-generative operations for
- crop/resize/straighten
- exposure, white balance, tone, contrast, saturation
- solid-color background after subject extraction
- blur/depth-of-field adjustments
- small blemish/healing operations
- deterministic selections/masks

## Prefer generative/instruction editing for
- complex background synthesis/replacement
- complex object/person removal with reconstruction
- wardrobe replacement
- missing hair reconstruction
- large scene extension
- structural clothing repair
- localized semantic reconstruction

## Hybrid operations
Body/face reshaping should use localized geometry-aware tools when available; if generative editing is the only viable option, narrow the region and enforce strict preservation/QC.

## Fallback
If a specialized operation is unavailable, use the safest available image editor that can honor masks/regions and preservation. If no suitable editing capability exists, explain the limitation rather than claiming completion.
