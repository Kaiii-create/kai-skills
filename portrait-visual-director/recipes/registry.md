# Recipe Registry

Index only — full direction lives in each recipe file.

| id | User cues | Fits | Avoid | File |
|----|-----------|------|-------|------|
| `natural-lifestyle` | 清纯生活照、干净生活照、自然生活、生活感、真实日常、温柔自然写真、clean lifestyle | Single-subject portrait-first daily moment, quiet environment, soft authentic light | Extra people, prop clusters, influencer selfie pose, heavy glam, studio catalog | `natural-lifestyle.md` |
| `modern-oriental` | 新中式、现代东方、东方极简 | Modern Chinese silhouette, restrained palette | 古装仙侠、固定汉服 cosplay、浓艳国潮堆砌 | `modern-oriental.md` |
| `cinematic-night` | 电影夜景、夜景电影感、night cinematic | Night exterior/interior film stills | Auto-neon soup, midday daylight, multi-clashing keys | `cinematic-night.md` |
| `editorial-fashion` | 时装大片、杂志感、编辑感、时尚写真、lookbook、fashion editorial | Garment-led concept, graphic pose, deliberate composition | Luxury-signifier spam, plastic skin, generic catalog advertising | `editorial-fashion.md` |
| `studio-portrait` | 棚拍、摄影棚、影棚人像、无缝背景、灰/白/黑背景 | Controlled background, precise light, clean separation | Cheap studio-template posing, beauty-filter skin, unexplained light stacks | `studio-portrait.md` |
| `environmental-urban` | 城市环境人像、都市写真、建筑人像、街头环境肖像、urban environmental portrait | Subject-to-city scale, architecture and street depth | Turning every city into neon night or a blurred generic backdrop | `environmental-urban.md` |
| `analog-film` | 胶片感、胶片写真、35mm、模拟胶片、复古胶片、analog film | Photochemical color, restrained grain, optical softness | Random light leaks, fake damage, costume-era stereotypes | `analog-film.md` |
| `fine-art-low-key` | 艺术人像、低调人像、暗调肖像、雕塑光、fine-art low key | Sculptural side light, shadow structure, negative space | Automatic night setting, theatrical prop clutter, crushed face detail | `fine-art-low-key.md` |
| `high-key-minimal` | 高调人像、极简白棚、纯白背景、干净明亮、high-key portrait | Luminous minimal frame, soft tonal separation, few props | Clipped skin, ID-photo stiffness, empty featureless whites | `high-key-minimal.md` |
| `professional-portrait` | 职业肖像、商务头像、个人简介照、品牌人物照、professional headshot | Trustworthy presence, role-appropriate polish, flexible clean setting | Default suit advertising, stock-photo grin, over-formality | `professional-portrait.md` |
| `gufeng-heroine` | 汉服美女、古风美女、古装美人、古风女主 | Beauty-forward general ancient heroine portrait with clear face/garment/light hierarchy | Distant tourist record, generic pale robe, rental-costume styling | `gufeng-heroine.md` |
| `historical-hanfu` | 宋制、明制、唐制、晋制、形制、复原、考据、真实汉服 | Period-coherent photographed Hanfu with readable construction | Dynasty mixing, fantasy armor, unsupported reconstruction claims | `historical-hanfu.md` |
| `cold-xianxia` | 仙侠、清冷仙气、月白冰蓝、空灵疏离、冷调古偶 | Cool ethereal heroine, controlled atmosphere, readable face and garment flow | Dead blue skin, fog/effect takeover, white clipping | `cold-xianxia.md` |
| `bright-luxury-gufeng` | 红金古风、盛唐、明艳华贵、宫廷、重工头饰、华丽登场 | Luminous red/ivory/gold palace heroine with concentrated opulence | Bridal-rental cliché, gold plastic, jewelry clutter, game CG | `bright-luxury-gufeng.md` |
| `ancient-beauty-closeup` | 古风美妆特写、贵女妆、花钿、水光妆、古典面部近景 | Face-led ancient beauty photography with dimensional skin and precise ornament | Doll face, wet plastic skin, beauty-filter mask, ornament collisions | `ancient-beauty-closeup.md` |

## Rules

- At most **one** primary recipe per request
- No explicit style cue → do not force a recipe
- Registry does not duplicate recipe body
- Recipe never overrides HARD / LOCK / FORBID

## Scenario-bank mapping

After selecting one recipe, load only its mapped bank and choose exactly one of its three variants. The bank adds positive SOFT completion and observable acceptance anchors; it is never a second recipe.

| Recipe id | Scenario bank |
|-----------|---------------|
| `natural-lifestyle` | `director/scenarios/natural-lifestyle.md` |
| `modern-oriental` | `director/scenarios/modern-oriental.md` |
| `cinematic-night` | `director/scenarios/cinematic-night.md` |
| `editorial-fashion` | `director/scenarios/editorial-fashion.md` |
| `studio-portrait` | `director/scenarios/studio-portrait.md` |
| `environmental-urban` | `director/scenarios/environmental-urban.md` |
| `analog-film` | `director/scenarios/analog-film.md` |
| `fine-art-low-key` | `director/scenarios/fine-art-low-key.md` |
| `high-key-minimal` | `director/scenarios/high-key-minimal.md` |
| `professional-portrait` | `director/scenarios/professional-portrait.md` |
| `gufeng-heroine` | `director/scenarios/gufeng-heroine.md` |
| `historical-hanfu` | `director/scenarios/historical-hanfu.md` |
| `cold-xianxia` | `director/scenarios/cold-xianxia.md` |
| `bright-luxury-gufeng` | `director/scenarios/bright-luxury-gufeng.md` |
| `ancient-beauty-closeup` | `director/scenarios/ancient-beauty-closeup.md` |

## Deterministic selection boundaries

When several cues appear, do not blend recipe bodies. Select the recipe that controls the user's most explicit visual objective; keep the remaining words as ordinary SOFT intent.

1. Ancient-specific compound cues select the narrowest matching recipe: face/makeup close-up → `ancient-beauty-closeup`; red-gold palace/opulence → `bright-luxury-gufeng`; xianxia/cold ethereal → `cold-xianxia`; named dynasty/形制/考据 → `historical-hanfu`; otherwise bare 汉服美女/古风美女 → `gufeng-heroine`.
2. A dynasty word alone is historical, not fantasy. `唐风 + 红金/宫廷/华贵` selects bright luxury; `古风 + 仙侠` selects cold xianxia unless stronger bright-luxury cues exist.
3. Ancient recipes outrank `modern-oriental` only when the request actually says 古装/汉服/朝代/仙侠; 新中式/现代东方 remains `modern-oriental` and never silently becomes costume.
4. A named output purpose wins over a generic location: `professional-portrait` wins for a company profile even if shot in a studio or city.
5. A named fashion/editorial objective wins over its production location: `editorial-fashion` wins for a fashion editorial shot on seamless paper.
6. A specific tonal/light treatment wins over generic studio: `fine-art-low-key` or `high-key-minimal` wins over `studio-portrait`.
7. An explicit analog process/finish wins over generic lifestyle: `analog-film` wins when 35mm or胶片 is a lead request.
8. A culturally specific modern design language wins over time/location: `modern-oriental` wins for新中式夜景; night remains SOFT scene intent.
9. Explicit电影夜景 wins over generic urban; otherwise architecture/subject relationship selects `environmental-urban`.
10. If two equally explicit cues remain incompatible, follow the user's first emphasized cue. Ask only if choosing would change a HARD outcome.
