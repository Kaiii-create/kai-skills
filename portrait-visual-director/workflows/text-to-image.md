# Purpose

Orchestrate **Text → Image** (no reference images) through the shared pipeline.

# Inputs

- User text
- Explicit constraints in the turn
- Routing mode: `text_to_image`

# Outputs

- Prompt Mode: READY Visual State → Prompt IR + clean compiled prompt
- Direct Image Mode: compiled prompt → adapter → generated image → protected-outcome acceptance
- Or ASK / BLOCK stop

# Execution

Follow `workflows/shared-pipeline.md` exactly:

1. Intent Routing → mode `text_to_image`
2. Initialize VS (empty domains)
3. Constraint Lock (VALUE / FORBID / GLOBAL prefs)
4. Reference Mapping → `assets: []`, `assignments: []` (**do not skip**)
5. Conflict Resolution (usually empty)
6. Optional Recipe Selection
7. Clarification Gate — CONTINUE unless safety-critical text ambiguity
8. Director Engine — fill UNSET required + optional paths
9. Safety Gate
10. Readiness Validation
11. Prompt Compiler
12. Direct Image Mode only: GPT Image adapter → generate → acceptance; at most one targeted retry

# Mode-specific

- No Reference Director work
- Still full lifecycle (never skip Constraint / Safety / Readiness)
- `is_path_protected` still applies to user HARD

# Must Not Do

- Skip VS because “no images”
- Invent reference assignments
- Compile from MAPPED
- Continue after Safety BLOCK

# Worked case

`生成一个雨夜东方女性电影写真。` → text workflow, CONTINUE, no ask (adult-coded cinematic brief), full lifecycle.
