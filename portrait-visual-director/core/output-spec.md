# Output Ratio and Dimensions

Normalize aspect-ratio, orientation, and pixel-dimension requests without inventing unsupported tool parameters. This file defines input semantics; `composition.aspect` remains the only aspect truth.

# Accepted aspect requests

Accept any clear positive width-to-height ratio. The documented, tested portrait set is:

| Ratio | Orientation | Typical portrait use |
|---|---|---|
| `1:1` | square | avatar, profile, centered close portrait |
| `4:5` | portrait | social portrait, half body, editorial crop |
| `3:4` | portrait | general portrait, Hanfu, three-quarter framing |
| `2:3` | portrait | full body, garment display, environmental portrait |
| `9:16` | tall portrait | phone wallpaper, story/reel cover, vertical poster |
| `4:3` | landscape | professional/environmental portrait with context |
| `3:2` | landscape | photographic environmental portrait |
| `16:9` | wide landscape | cinematic scene, banner, wide environment |

These are composition requests carried by the compiled prompt. They are not a claim that the current Codex image tool exposes native canvas controls for each ratio.

# Defaults and aliases

- An unspecified single-person portrait defaults softly to vertical `3:4` through `core/short-brief-expansion.md`.
- An explicit ratio is HARD and writes `composition.aspect`.
- Orientation words such as `竖版`, `横版`, or `方形` create an orientation requirement. They do not by themselves invent an exact ratio: the Director selects a compatible ratio from the table, with `3:4` as the ordinary vertical default.
- Platform cues may guide a SOFT ratio only when no ratio or dimensions were stated: avatar/profile → `1:1`; social portrait → `4:5`; full-body/editorial portrait → `2:3`; phone wallpaper/story cover → `9:16`; cinematic banner → `16:9`.
- An explicit user ratio always overrides these defaults and platform suggestions.

# Pixel dimensions

Store an explicit pixel request only in:

```yaml
generation:
  requested_dimensions:
    raw: string
    width_px: integer | null
    height_px: integer | null
```

Preserve the user's raw wording. Parse numeric width and height only when both are unambiguous, for example `1080×1350`, `1080x1350 px`, or `宽 1080、高 1350 像素`. Never invent pixels from a ratio. Labels such as `2K`, `4K`, `高清`, or `原图尺寸` remain in `raw` unless their exact width and height are stated; ask one short question only when exact delivery depends on resolving that ambiguity.

Common consistent examples are documentation aids, not hidden defaults:

| Ratio | Example dimensions |
|---|---|
| `1:1` | `1080×1080`, `2048×2048` |
| `4:5` | `1080×1350` |
| `3:4` | `1080×1440`, `1536×2048` |
| `2:3` | `1600×2400` |
| `9:16` | `1080×1920` |
| `4:3` | `2048×1536` |
| `3:2` | `2400×1600` |
| `16:9` | `1920×1080` |

# Ratio and dimension consistency

1. Ratio only: lock `composition.aspect`; leave `generation.requested_dimensions` null.
2. Dimensions only: lock `generation.requested_dimensions`, reduce width:height mathematically, and write the reduced ratio to `composition.aspect` with provenance noting it was derived from the user's explicit dimensions.
3. Both and consistent: lock both.
4. Both and inconsistent: create an unresolved HARD conflict and ask which one controls the final frame. Do not crop, stretch, or silently choose one.
5. If the user explicitly marks one value approximate, preserve the exact value and adapt the approximate one.

For example, `4:5, 1080×1350` is consistent; `4:5, 1080×1440` is not.

# Compilation and Codex capability

- Put aspect first in the compiled prompt. If pixel dimensions were supplied, put the preserved dimension request in the same opening sentence.
- Prompt Mode must retain both values exactly.
- Direct Image Mode passes both through the prompt because Codex's current built-in image tool exposes no separate size argument. The Adapter must never invent a `size`, `width`, `height`, `resolution`, or destination-path field.
- Treat the ratio as an observable protected result. Exact pixel dimensions are a delivery request, but the built-in generation call cannot guarantee them through a native parameter. State this limitation briefly when exact pixels materially matter; never claim exact compliance without inspecting the returned file.
- Do not retry generation only because native pixel dimensions differ: the current adapter has no stronger size control. A post-generation resize/crop is a separate export operation and must be explicitly requested; never stretch a portrait or silently crop protected content.

