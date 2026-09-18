# Compiler / Adapter Test Cases

Purpose: pin read-only compile, IR stability, role preservation, capability honesty.

## Compiler

| ID | Case | Expected |
|----|------|----------|
| P01 | stage ≠ READY_TO_COMPILE | Refuse compile |
| P02 | Compiler writes VS | Forbidden |
| P03 | Same VS compiled twice | Semantically equivalent IR (stable order) |
| P04 | HARD aspect 3:4 | IR.output.aspect = 3:4 only from composition.aspect |
| P05 | FORBID accessories | In must_avoid; not in positive wardrobe body as present |
| P06 | identity LOCK image_1 | IR.references keeps identity LOCK; must_preserve lists it |
| P07 | Multi-ref roles 1/2/3/4 | Four separate IR references; no “use all images” |
| P08 | wardrobe ADAPT | mode stays ADAPT in IR |
| P09 | lighting INSPIRE | mode stays INSPIRE; not upgraded |
| P10 | Unresolved HARD conflict | Refuse |
| P11 | Safety BLOCK | Refuse |
| P12 | Pending required_changes | Refuse |
| P13 | Unset optional null in VS | Omitted in IR; not invented |
| P14 | Provenance in generation prompt | Not dumped by default; trace only |

## GPT Image Adapter (live built-in contract)

| ID | Case | Expected |
|----|------|----------|
| P15 | Adapter adds new lens/light text not in IR | Forbidden |
| P16 | composition.aspect 3:4 | Aspect remains in compiled prompt; adapter invents no unsupported size argument |
| P17 | Soft multi-ref approximate | capability DEGRADED recorded; status DEGRADED_OK if no core HARD |
| P18 | Identity LOCK image cannot be attached | CAPABILITY_BLOCK; no silent continue |
| P19 | Adapter mutates VS/IR | Forbidden |
| P20 | Text-only call | `prompt` only; both reference arguments omitted |
| P21 | All refs have local paths | `referenced_image_paths` in Image 1..N order; unseen files inspected first |
| P22 | Recent conversation refs | Smallest `num_last_images_to_include` containing all targets, maximum five |
| P23 | Both reference arguments passed | Forbidden |
| P24 | References are non-consecutive or missing | Ask for reattachment; do not include unrelated images |
| P25 | Image 1 identity, Image 2 wardrobe, Image 3 pose, Image 4 lighting | IR derives one allow/exclude fence per asset and compiled prompt states both sides in order |
| P26 | One asset has identity + hair assignments | Fence uses union; hair is not excluded |
| P27 | Generated hand still grips cup after HARD “just put it down” | Acceptance fails; one retry restates only existing cup/hand state |
| P28 | Retry would require including unrelated generated image among conversation refs | Do not retry automatically; report limitation |
| P29 | First retry still leaks pose-reference table/cup | Stop after that retry; return best result with limitation |
| P30 | Four assets but only Image 1 has a detailed negative fence | Compile self-check fails; derive all four per-asset fences before output |
| P31 | Four roles plus one generic “ignore unmapped domains” sentence | Generic sentence cannot replace asset-specific exclusions |
| P32 | Chinese or English prompt contains unexplained Korean token | Compile self-check fails; re-render in one consistent language |
| P33 | Independent Prompt-only request serializes prior case's studio/chair/aspect | Compile self-check fails active-request-id/current-state trace check; no output until clean |
| P34 | “不要过度传统符号” has normalized predicate | Must-avoid states the visible cue budget, not only the vague source phrase |
| P35 | Sparse style-led brief fills all five visual groups | Compiler preserves subject, moment, wardrobe, environment/camera, and light/color/texture as five compact paragraphs without generic quality padding |
| P36 | “汉服美女” directed state | Compiled prompt contains specific adult face direction, subject hierarchy, garment structure, motivated eye/face light, palette and material response; it does not collapse to “beautiful woman in Hanfu” |
| P37 | Explicit 4:5 and 1080×1350 | Opening sentence contains aspect and preserved dimensions once; IR traces both source paths |
| P38 | Aspect only | Opening sentence contains aspect; no pixel number appears anywhere |
| P39 | Direct Image with requested pixels | Adapter passes prompt only and invents no `size`, `width`, `height`, or `resolution` argument |
| P40 | Returned pixels differ from requested pixels | Report exact-size limitation when metadata is available; do not retry generation solely for size mismatch |
| P41 | Natural-lifestyle state sets one subject, no background people, one-cue prop budget | All three serialize concretely; prompt does not reduce them to “clean lifestyle” |
| P42 | Natural-lifestyle result contains another customer or human reflection | Observable recipe predicate fails; one correction retry requests a single visible subject and preserves all user facts |
| P43 | Requested 3:4 returns 1086×1448 | Metadata ratio is exactly 0.75; pass even though no canonical pixel size was requested |
| P44 | Requested 3:4 returns 941×1672 | Relative ratio error exceeds 1%; aspect failure and one targeted retry |

## Assertions

- VS remains SSOT; IR disposable
- No second provenance system
- No five-paragraph Visual State schema; five compact paragraphs are a conditional compiler rendering for information-rich sparse/style-led briefs
- Capability limits explicit
