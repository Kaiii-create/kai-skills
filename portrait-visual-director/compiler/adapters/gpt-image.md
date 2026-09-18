# GPT Image Adapter

Map the compiled portrait prompt and its reference pointers to Codex's built-in `image_gen` call. This V1 adapter matches the live tool contract; it does not expose fictional model parameters or make new visual decisions.

# Preflight

Accept only:

- `compiled_prompt` from the read-only Compiler.
- Ordered IR reference roles.
- Reference availability as conversation images or local filesystem paths.

Before calling the tool, verify that every HARD/LOCK reference can be included. Keep the positive role and the derived exclusion fence for every asset in the prompt. Reject a generic all-images exclusion when any asset lacks its own explicit fence. Soft ADAPT/INSPIRE may be approximated, but the role or fence must not be erased.

# Live call forms

Use exactly one of these forms.

## Text-only generation

```json
{"prompt":"<compiled_prompt>"}
```

Omit both reference arguments.

## All target images have local paths

Inspect any unseen local image with `view_image`, then call:

```json
{
  "prompt":"<compiled_prompt with Image 1..N roles>",
  "referenced_image_paths":["<image_1 path>","<image_2 path>"]
}
```

Keep path order identical to `Image 1..N` in the prompt.

## Target images are in recent conversation context

```json
{
  "prompt":"<compiled_prompt with Image 1..N roles>",
  "num_last_images_to_include":4
}
```

Use the smallest count that includes every target image, up to five. References must be the recent consecutive conversation images implied by that count; do not include unrelated images and pretend they have no effect.

Never pass both `referenced_image_paths` and `num_last_images_to_include`. If neither mechanism can include every target, ask the user to attach the missing images again.

# Aspect, dimensions, quality, and count

- The built-in tool exposes no size, quality, or destination-path argument. Preserve `composition.aspect` and any explicit `generation.requested_dimensions` in `compiled_prompt`; do not invent `size`, `width`, `height`, `resolution`, or destination-path fields.
- Ratio is a protected visual result. Exact pixel dimensions are prompt-level delivery intent, not a native adapter guarantee. If exact pixels materially matter, say so briefly and do not claim compliance without inspecting the returned file.
- When returned file metadata is available, verify the requested aspect mathematically from pixel width and height. Treat a relative ratio error above 1% as an aspect failure. Different pixel dimensions with the same ratio are valid when the user did not request exact pixels.
- Do not retry generation solely for a pixel-dimension mismatch: this adapter has no stronger native control. Resizing/cropping is a separate, explicitly requested export operation and must not stretch the image or cut protected content silently.
- Generate one image per tool call. If the user explicitly requests multiple outputs, issue separate calls with the same protected constraints.
- Let the built-in tool manage its output location. Preview-only results may remain in the tool-managed location.

# Reference semantics

The tool accepts images but no separate role-metadata field. Prompt-level positive and negative role fencing is therefore required, explicitly and in image order:

```text
Reference scope: Use Image 1 only for identity; do not inherit its hair, wardrobe, pose, props, setting, composition, camera, lighting, color, or texture. Use Image 2 only for wardrobe; do not inherit its face, hair, pose, props, setting, composition, camera, or lighting. Use Image 3 only for pose; do not inherit its face, hair, wardrobe, props, setting, or lighting. Use Image 4 only for lighting; do not inherit its face, hair, wardrobe, pose, props, setting, or composition.
Required visible facts: preserve the identity from Image 1; the outerwear is red.
```

This wording serializes existing IR only. The Adapter may not add a lens, light, pose, face change, or style preference.

# Capability outcomes

- `OK`: all requested images can be attached and no protected instruction is knowingly lost.
- `DEGRADED_OK`: only a soft ADAPT/INSPIRE detail may be approximate; tell the user briefly after generation if material.
- `CAPABILITY_BLOCK`: a required image cannot be attached or a core HARD/identity LOCK cannot be represented. Do not call the tool or claim success; ask for reattachment or return the compiled prompt as fallback.

A tool refusal or error is not a successful generation. Preserve the original Visual State and report the actual failure.

# Post-generation acceptance

After the tool returns an image, orchestration checks observable protected outcomes: HARD/PRESERVE facts, FORBID absence, identity likeness, explicit action/contact state, aspect, obvious cross-role leakage, the selected recipe's concrete Protective Check predicates, the selected scenario's acceptance anchors, and the chosen exposure profile's observable boundaries from `director/brightness-system.md`. Inspect exact pixel dimensions only when the returned artifact exposes them. A predicate or anchor must describe a visible pass/fail condition such as an extra person, missing named garment layer, exceeded prop budget, failed action, failed subject hierarchy, or a `BRIGHT_AIRY` frame visibly dominated by unintended dark mass; vague taste preference is not a retry trigger.

If a protected outcome, observable recipe predicate, or scenario anchor fails, read `director/failure-diagnosis.md`, assign the smallest matching failure class, and allow at most one targeted retry using the Compiler's correction rendering, the same Prompt IR, and the exact same original reference set/order. Restate only the failed existing assertion or anchor. If those original references can no longer be attached without also including an unrelated generated image, do not retry automatically. After a failed retry, return the best result with a concise limitation; never loop or claim full compliance.

# Boundary

Read Prompt IR and asset pointers; emit only the live tool call and a capability note. Never mutate Visual State or Prompt IR, merge identities, collapse reference roles, or silently downgrade HARD/LOCK.
