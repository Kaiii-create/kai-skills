---
name: portrait-visual-director
description: Codex 专用：把一句话或一到多张参考图扩展成完整成人肖像并直接出图，或输出可复制提示词；支持汉服古风、女性美感导演及人物、发型、服装、姿势、场景与光线的独立参考控制。Use only in OpenAI Codex for portrait generation, one-line portrait expansion, person-preserving edits, multi-reference direction, or portrait prompt writing.
---

# Portrait Visual Director

Turn even a one-line natural-language intent and optional reference images into one coherent, fully directed portrait, then return either a clean prompt or a generated image. Keep internal state, locks, mappings, and Prompt IR hidden unless the user asks to inspect them.

This skill is Codex-only. It depends on Codex's built-in image generation, conversation-image handling, and local reference-path contract. Do not claim support for Claude, Cursor, Qoder, Trae, GitHub Copilot, or generic SKILL.md runtimes.

# Route first

Choose by attached-image count:

- 0 images: read `workflows/text-to-image.md`.
- 1 image: read `workflows/reference-to-image.md`.
- 2 or more images: read `workflows/multi-reference-to-image.md`.

Then read `workflows/shared-pipeline.md` and only the files its progressive load plan requires for this request. Every actionable portrait passes through the universal Director expansion gate and `director/brightness-system.md`; a one-line request is treated as a creative objective, not as the complete image prompt.

Ratio and size requests are supported as first-class inputs. Explicit ratios and pixel dimensions are locked, consistency-checked, and placed at the start of the compiled prompt. The current Codex image tool has no native exact-size argument, so the skill must preserve requested pixels honestly without promising exact output metadata.

Output mode:

- “只要提示词 / 写 prompt / 不要出图” means Prompt Mode.
- “生成 / 出图 / 做一张写真” means Direct Image Mode.
- An ordinary portrait-creation request defaults to Direct Image Mode.
- If no image-generation capability is available, finish Prompt Mode and clearly state the limitation.

# Runtime contract

Execute this order on one Canonical Visual State:

```text
route -> initialize -> lock explicit constraints -> map references
-> resolve conflicts -> universal director design
-> optional recipe + one scenario + optional temperament overlay + one exposure profile
-> clarify only if blocking -> direct the frame -> safety gate -> readiness -> compile
-> Direct Image only: adapt, generate, check protected outcomes
```

Do not skip a stage because there are no images. Stop before compilation on an unresolved HARD conflict or safety BLOCK. A safety ASK pauses on the same state.

Each independent request starts a fresh Visual State. Reusing the same reference images does not carry over a prior scene, aspect, forbid, or styling choice unless the user explicitly asks to revise the current result.

# Reference behavior

- Reference is a first-class input. Assign each image to named domains such as identity, hair, wardrobe, pose, environment, composition, lighting, color, or texture.
- Upload does not lock the whole image.
- `LOCK` requires explicit user intent. Inference may only `ADAPT`, `INSPIRE`, or `IGNORE`.
- Identity is likeness only; hair is separate. “人物保持不变，换短发” preserves identity and changes hair.
- Preserve multi-image roles separately through compilation and generation. Never reduce them to “use all references.”
- Ask only when ambiguity would change identity, collide two hard requirements, or require safety/authorization information. Otherwise make a reasonable visual decision and continue.

# Recipes

When the user gives an explicit supported style cue, read `recipes/registry.md`, select exactly one primary recipe by its deterministic boundary rules, read only that recipe, and select one of its three positive scenario variants from the mapped file under `director/scenarios/`. The registry covers lifestyle, modern-oriental, cinematic night, editorial fashion, controlled studio, environmental urban, analog film, fine-art low-key, high-key minimal, professional portrait, general gufeng heroine, historically grounded Hanfu, cold xianxia, bright luxury gufeng, and ancient beauty close-up directions. A recipe or scenario contributes soft patches only and cannot override HARD, LOCK, FORBID, or an explicit reference role. No supported cue means no recipe/scenario load.

For every actionable portrait, read `director/director-expansion.md` and `director/brightness-system.md`. Select at most one temperament overlay from `director/overlay-registry.md`, select one exposure profile, and use `director/visual-libraries.md` only to complete meaningful `UNSET` fields. Do not load multiple recipe bodies, scenario banks, or overlays in an attempt to average styles. Beauty-forward and ancient portraits default to bright airy exposure unless the user or a protected reference explicitly requires darkness; cinematic, cool, restrained, ancient, and xianxia words alone never imply underexposure.

# One-line briefs

If the request is sparse but actionable, or explicitly asks for a beauty-forward adult portrait, read `core/short-brief-expansion.md`. Do not ask the user to fill ordinary creative gaps. Treat words such as “美女 / 美人 / 女主感” as a subject-priority cue that must become concrete face, framing, pose, light, and hierarchy choices—not as generic quality spam. Bare “汉服美女 / 古风美女” selects `gufeng-heroine`; stronger dynasty, xianxia, red-gold palace, or beauty-close-up cues select their dedicated recipe through the registry.

# User-visible result

- Prompt Mode: return only the compiled, ready-to-copy prompt, plus at most one short capability note if relevant. Do not call the image adapter.
- Direct Image Mode: call the image tool, check observable protected outcomes plus the selected recipe's concrete Protective Check and the scenario's acceptance anchors, show the result, and add a brief note. On a visible failure, read `director/failure-diagnosis.md` and retry at most once for a failed HARD/FORBID/identity/action/reference-scope assertion, observable recipe predicate, or selected scenario anchor; do not retry for vague taste alone. Do not dump Visual State, assignments, or Prompt IR.
- If the adapter cannot honor a core HARD or identity LOCK, do not claim success; ask for a narrower reference set or fall back to the compiled prompt.

# Invariants

1. Visual State is the only mutable visual truth.
2. HARD, LOCK, and FORBID survive Director, Compiler, and Adapter.
3. Safety outranks creative intent but never secretly rewrites it.
4. Prompt Compiler is read-only; Prompt IR is derived.
5. Adapter performs tool mapping only and never re-directs the image.
6. Tests and examples are never loaded during a user request.

# Current scope

Text, single-reference, and multi-reference adult portrait workflows; Prompt Mode and built-in image generation; fifteen differentiated soft recipes with forty-five scenario variants, five temperament overlays, explicit exposure/tonal control, compact visual libraries, and one observable-failure diagnosis pass. No cross-session character service, batch variations, celebrity database, brand database, or alternate model adapters.
