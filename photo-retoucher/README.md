# Photo Retoucher

A production-oriented natural-language photo-retouching skill package for agent environments with image-editing capabilities.

## What it covers
Portrait retouching, photo rescue, wedding retouching, ID-style and official ID photo workflows, professional headshots, wardrobe edits, background replacement/cleanup, local edits, restoration and batch consistency.

## Design
`SKILL.md` is the router and invariant layer. Detailed behavior is isolated into `workflows/`, `policies/`, `prompts/`, `tools/`, `qc/`, `presets/`, `schemas/`, and `tests/`.

The package is capability-oriented rather than hard-coded to a single vendor. It prefers deterministic edits when possible and uses generative editing only when synthesis is needed.

## Install
Place the entire `photo-retoucher/` directory in the skills location supported by your agent/runtime. Keep relative paths intact. The runtime must provide image analysis and image editing capabilities for execution.

## Core guarantees
Minimum Necessary Edit, Identity Lock, strict user locks, natural-by-default retouching, generative QC, localized revisions, official-ID compliance-first behavior, and no false restoration claims.
## Portrait retouch authorization

Person beautification is opt-in. Default level is 0. “人物简单修改” = Level 1, “人物精修” = Level 2, “人物商业精修” = Level 3. Explicit requests such as “眼睛大一点” remain local even at Level 0. Naturalness is a separate control.
