# Reference Test Cases

Purpose: pin assignments, modes, origin strength, identity/hair split, single conflicts collection.

## Kept / updated

| ID | Scenario | Expected |
|----|----------|----------|
| F01 | identity LOCK + new scene text | Identity preserved; scene directed |
| F02 | Silent full-image LOCK | Reject; INSPIRE/ADAPT or clarify |
| F03 | Two wardrobe LOCK different clothes | UNRESOLVED HARD; no average |
| F04 | lighting INSPIRE + user HARD noon top light | User HARD wins |
| F05 | Two identity LOCKs different people | PEER_HARD_COLLISION; BLOCKED |
| F06 | Unstated roles, 3 images | Ask or surface proposed assignments |
| F07 | Brand logo in ref | Safety `required_changes`; not silent creative rewrite |
| F08 | Celebrity-looking face | Safety path; not silent identity LOCK |

## Schema and boundary cases

| ID | Scenario | Expected |
|----|----------|----------|
| F09 | Single image identity PRESERVE/LOCK | Only `subject.identity` (+descendants); hair free |
| F10 | Single image lighting INSPIRE only | No auto identity LOCK |
| F11 | Multi: identity LOCK, outfit ADAPT, pose ADAPT, light INSPIRE | Normal combine; READY after director fills required paths |
| F12 | Two identity LOCKs | Unresolved in **`controls.conflicts` only** (no `references.conflicts`) |
| F13 | IGNORE environment on image_2 | Zero environment inheritance from image_2 |
| F14 | "衣服参考图2" written as ADAPT | Stays ADAPT; no silent upgrade to LOCK |
| F15 | Two lighting INSPIRE | May synthesize; contributors[] lists both refs |
| F16 | identity LOCK + text new outfit | OK |
| F17 | INFERRED assignment attempted as LOCK | Rejected in V1; INFERRED is ADAPT/INSPIRE only |
| F18 | User: 保持人物 + 换短发 | identity PRESERVE + hair VALUE; both valid together |
| F19 | Parent LOCK `lighting` covers all leaves | `is_path_protected` true for lighting.source/quality/direction/color_intent |
| F20 | READY example with required refs filled | No “Director fills later” while stage READY |
| F21 | `[img] 人物保持不变，换夜景` | identity LOCK USER_EXPLICIT; no lighting/environment LOCK required |
| F22 | `[img] 参考这个感觉` | lighting/color(/composition) INSPIRE INFERRED; **no** identity LOCK |
| F23 | `[img] 人物不变，换短发` | identity LOCK; hair **not** locked |
| F24 | `[1,2,3,4] 人物1衣服2姿势3光线4` | four USER_EXPLICIT assignments as named |
| F25 | `[A,B] 这两个融合成人物` | **Ask**; no auto identity blend / no assignment until answered |
| F26 | person+clothes refs + HARD 红色外套 | wardrobe ADAPT respects user HARD color |
| F27 | `[1] 参考图1灯光，不要参考背景` | lighting INSPIRE + environment IGNORE |
| F28 | Two lighting INSPIRE | Both kept; Director synthesis lists both provenance contributors |
| F29 | PRESERVE constraint + identity assignment | assignment.constraint_id links to constraint; no drift |
| F30 | INFERRED proposed as LOCK | Rejected — origin must be USER_EXPLICIT for LOCK |
| F31 | Image 3 assigned only to pose but contains cup/table/person | Only pose is authoritative; face, wardrobe, props, environment, and lighting cannot leak |
| F32 | One image assigned to identity + hair | Compiler fence allows both; neither is incorrectly listed as excluded |

## Assertions

- Runtime map only under `VisualState.references`
- LOCK is path/subtree, not whole image
- IGNORE produces zero inheritance
- ADAPT never silently becomes LOCK
- INFERRED never becomes user-grade LOCK
- Identity PRESERVE does not freeze hair
- Named roles are positive allow-lists; unmapped visible content has zero authority
- One canonical conflicts collection
