# Short Brief Expansion

Turn a sparse but actionable portrait request into a complete Director pass without asking the user to fill ordinary creative fields. This is a conditional completion policy, not a second state, prompt template, or source of HARD constraints.

# When to use

Read this file when either condition is true:

- the request is a short portrait brief with several creative domains left unset, such as “生成一个汉服美女” or “做一张港风夜景人像”;
- the user explicitly asks for a beauty-forward adult portrait using cues such as 美女、美人、女主感、漂亮、惊艳、明艳 or beauty portrait.

Do not use it to reinterpret a fully specified request. Never ask about ordinary choices such as palette, lens, time of day, or pose when one coherent choice can be made safely. Identity ambiguity, peer HARD conflicts, missing authorization when required, and safety questions still use the normal Clarification Gate.

# Sparse-brief rule

Treat the user's few words as the creative objective, not as permission to weaken them. Preserve every explicit fact, select one supported recipe when its cue is present, and fill only UNSET paths through validated Director patches. All inferred choices remain SOFT with `DIRECTOR`, `RECIPE`, or `DEFAULT` provenance.

For a bare creation request, complete at least:

- a clearly adult subject and non-generic visible face direction;
- one time slice and one small event;
- a balanced action chain with plausible hands, garment movement, head direction, and gaze target;
- coherent wardrobe structure, material, palette, and styling richness;
- two or three selective environment details with foreground/midground/background separation;
- shot scale, aspect, hierarchy, lens intent, angle, and depth;
- one motivated key-light story with readable eyes, skin, hair edge, and garment surface;
- coordinated grade and texture.

Default to vertical `3:4` for an unspecified single-person portrait. This is a SOFT completion and yields to any explicit aspect or reference composition.

# Beauty-forward direction

“美女 / 美人 / 女主感 / 惊艳” is an observable portrait priority, not empty quality spam. Translate it into photographic decisions without changing identity or sexualizing the subject:

1. **Face:** choose a distinctive adult face description rather than “perfect beauty”: clear face shape, specific eye character, natural nose/lip proportions, and an expression with presence. Avoid infantile features and copy-paste influencer faces.
2. **Grooming:** coordinate hair and makeup with wardrobe and period. Makeup shapes brows, eyes, lips, and complexion but keeps skin alive; it does not erase pores or facial structure.
3. **Framing:** unless the user prioritizes full-garment display or environment, use close, half, waist-up, or thigh-up framing so the face is large enough to lead. Do not default to a distant full-body visitor photo.
4. **Hierarchy:** face and eyes first, then hair/ornament and garment structure, then environment. The subject must not lose to architecture, props, or empty floor.
5. **Light:** place a motivated soft key that gives both eyes readable catchlight, models cheek/nose/jaw planes, and separates hair and shoulders. Keep the face slightly more luminous than its immediate background without pasted-on beauty light.
6. **Pose:** establish stable weight, relaxed shoulders, elegant neck line, one purposeful hand, one quiet hand, and one gaze target. Avoid mannequin symmetry and generic “stand and look away.”
7. **Finish:** use realistic skin and fabric texture with controlled polish. “高级” should come from hierarchy, material, light, and restraint—not luxury props or smoothing.

# Ancient-portrait routing cues

Use the registry as the authority and load exactly one recipe:

- bare 汉服美女、古风美女、古装美人、古风女主 → `gufeng-heroine`;
- 宋制、明制、唐制、晋制、形制、复原、考据、真实汉服 → `historical-hanfu`;
- 仙侠、清冷仙气、月白冰蓝、空灵疏离、冷调古偶 → `cold-xianxia`;
- 红金、盛唐、明艳华贵、宫廷、重工头饰、华丽登场 → `bright-luxury-gufeng`;
- 古风美妆特写、贵女妆、花钿、水光妆、面部近景 → `ancient-beauty-closeup`.

A dynasty word alone selects `historical-hanfu`; it does not imply fantasy. “唐风 + 红金/宫廷/华贵” selects `bright-luxury-gufeng`. “古风 + 仙侠” selects `cold-xianxia` unless stronger bright-luxury cues are present.

# Ancient beauty floor

When any ancient recipe is selected and the user has not specified otherwise:

- use a clearly adult East Asian woman with composed main-character presence;
- keep garment construction legible at neckline, sleeve, waist, and hem;
- use one main color, one supporting color, and at most one metal/jewel accent family;
- keep two or three environment cues, not a museum-prop pile;
- choose a frame close enough to read face, makeup, hair, and garment structure;
- give the face a motivated key and catchlight; overcast ambience alone is insufficient;
- default to a bright-airy tonal structure: face and main garment in clear mid/high values, open colored shadows, pale or light-bearing separation behind the upper body, and no dominant deep-blue/charcoal mass;
- keep real photography and material response unless fantasy or illustration is explicitly requested.

# Failure predicates

The completion fails and needs one coherence repair when any is visible in the directed state:

- the subject reads as a tourist or costume rental model rather than the requested portrait lead;
- architecture, props, floor, or background occupy the visual hierarchy above the face without user intent;
- the face is small, flatly lit, dull-eyed, or merged into the background;
- a beauty-forward or ancient frame reads gloomy, underexposed, gray-skinned, stormy, or dominated by dark architecture/sky/mountains without explicit user intent;
- clothing is a generic robe with unreadable neckline/waist/sleeve structure;
- period-specific words are mixed into incompatible costume parts;
- “natural” or “restrained” has removed all contrast, color focus, styling, or visual memory;
- negative constraints dominate the prompt while positive visual direction remains vague.

# Boundary

This file only guides completion of UNSET creative paths. It never creates HARD facts, changes a reference role, overwrites an explicit color/garment/scene, forces femininity onto another subject, or upgrades taste into a retry-protected assertion.
