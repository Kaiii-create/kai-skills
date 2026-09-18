# Direct Image Failure Diagnosis

Read this file only after an image has been returned and an observable acceptance predicate failed, or when the user explicitly asks why a portrait failed. Diagnosis classifies the visible miss and produces one narrow correction for the single permitted retry. It never mutates Visual State, changes reference roles, invents a new scene, or authorizes another retry.

# Priority

```text
safety / adult boundary
> identity or protected reference scope
> HARD / FORBID / explicit action / exact named wardrobe
> aspect and subject count
> recipe Protective Check
> scenario acceptance anchors
> overlay or ordinary taste
```

Only failures through scenario acceptance anchors qualify for the retry. Vague disappointment or an unprotected overlay nuance does not.

# Failure classes

| ID | Observable failure | Targeted correction prefix |
|----|--------------------|-----------------------------|
| `F01_EXTRA_PERSON` | Unrequested face, body, reflection, poster person, silhouette or cropped person appears | `Correction required: exactly the requested subject count; remove every other visible human figure, reflection and portrait.` |
| `F02_HIERARCHY` | Face/requested garment loses to architecture, prop, bright window, floor or crowd | `Correction required: make the face and requested wardrobe the first two visual levels; reduce the named competing element.` |
| `F03_GENERIC_POSE` | Chin-rest, cup display, stock smile, mannequin symmetry or unrelated multi-action pose appears | `Correction required: restore the existing single event and action chain; hands, gaze and shoulders must match that moment.` |
| `F04_WARDROBE_LAYER` | Named garment, color, layer order, closure or material is missing/replaced | `Correction required: visibly restore the exact named wardrobe component and layer relationship without changing identity or pose.` |
| `F05_PROP_CLUSTER` | Prop count exceeds recipe/scenario budget or invents a foreground story | `Correction required: keep only the permitted functional cue and remove unrequested foreground props.` |
| `F06_LIGHT_LOGIC` | Face unreadable, flat, pasted-on, clipped, or lit by conflicting equal keys | `Correction required: restore the existing motivated key direction, readable eyes and facial planes, and coherent subject/background shadows.` |
| `F07_STYLE_COLLAPSE` | Concrete recipe signature collapses into catalog, cosplay, CG, generic robe, generic bokeh or another named failure | `Correction required: restore the failed recipe signature using its existing positive structure, material, hierarchy and light decisions.` |
| `F08_REFERENCE_LEAK` | An asset contributes an excluded face, hair, clothing, prop, scene, pose or light domain | `Correction required: enforce the existing per-asset scope fence and remove the named leaked domain.` |
| `F09_ASPECT` | Metadata ratio differs from the requested ratio by more than 1% | `Correction required: render the same composition on the requested aspect ratio without cropping protected subject or garment facts.` |
| `F10_ANATOMY_CONTACT` | Hands, fingers, feet, object contact or body balance visibly breaks the explicit action | `Correction required: preserve the event while repairing the named anatomy/contact relationship and keeping all protected facts.` |
| `F11_SKIN_IDENTITY` | Plastic skin, youth coding, face idealization or identity drift appears | `Correction required: restore adult facial structure, living skin texture and the protected identity/face direction.` |
| `F12_EXPOSURE_TONE` | Selected bright/clear profile appears gloomy, underexposed, gray-skinned, dominated by dark mass, or clips pale skin/fabric/cloud texture | `Correction required: restore the existing bright, airy exposure structure—open readable shadows, luminous natural skin, pale background separation and protected highlight texture—without changing scene, wardrobe, pose or identity.` |

# Bundling rule

If several failures share one cause, name the highest-priority class and include at most two tightly coupled observable predicates in one correction. Do not append a fresh negative-prompt dump. Re-render the same Prompt IR with the correction first, then all original content unchanged.

# Stop condition

After the retry, accept only if the failed predicates pass. Otherwise return the better candidate, state the remaining concrete limitation briefly, and stop. Never use diagnosis to run a second retry.
