# Purpose

Orchestrate **Single Reference + Text → Image** through the shared pipeline.

# Inputs

- Exactly one reference image
- User text
- Routing mode: `single_reference_to_image`

# Outputs

- Prompt Mode: READY VS → IR + clean compiled prompt
- Direct Image Mode: compiled prompt + one image role/fence → adapter → generated image → protected-outcome acceptance
- Or ASK / BLOCK

# Execution

Follow `workflows/shared-pipeline.md`:

1. Routing → `single_reference_to_image`
2. Initialize VS
3. Constraint Lock (PRESERVE / VALUE / FORBID as stated)
4. **Reference Director + Map** (one asset; explicit roles or conservative defaults)
5. Conflict Resolution
6. Optional Recipe Selection
7. Clarification Gate
8. Director → Safety → Readiness → Compiler
9. Direct Image Mode only: Adapter → generate → acceptance; at most one targeted retry

# Mode-specific

| User intent | Mapping | Gate |
|-------------|---------|------|
| 保持这个人，换夜景 | identity LOCK USER_EXPLICIT | CONTINUE |
| 参考这个感觉 | lighting/color/composition INSPIRE INFERRED | CONTINUE |
| 衣服参考这张 | wardrobe ADAPT (or LOCK if strong words) | CONTINUE |
| Unclear whether same person required | no auto identity LOCK | **ASK** if output subject would change |

- Never whole-image LOCK
- INFERRED never LOCK
- Identity PRESERVE does not LOCK hair

# Must Not Do

- Re-guess named roles
- Blend or replace identity silently
- Skip Safety on real-person refs
- Compile before READY

# Worked cases

- `[图1] 保持这个人，换成夜景。` → identity LOCK, CONTINUE  
- `[图1] 参考这个感觉。` → INSPIRE pack, no identity LOCK, CONTINUE  
