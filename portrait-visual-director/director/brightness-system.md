# Exposure and Tonal Distribution

Apply this module to every actionable portrait after recipe/scenario selection. Brightness is a compositional decision, not a synonym for overexposure. Select one profile, write its concrete result into `intent.exposure_profile`, `lighting.exposure`, and `color.tonal_distribution`, and preserve any stronger user or reference requirement.

# Profile selection

## `BRIGHT_AIRY`

Use by default for beauty-forward portraits, clean lifestyle, high key, modern oriental, general gufeng, historical Hanfu, xianxia, bright luxury gufeng, and ancient beauty unless the user explicitly requests darkness or a protected reference establishes it.

- Overall first read is luminous, fresh, open, and comfortable.
- Face, eyes, collar, and the main garment occupy clear mid-to-high values; skin stays warm-neutral or naturally rosy rather than gray/cyan.
- The immediate background behind the head and shoulders is lighter or quieter than a deep charcoal mass and preserves clean separation from dark hair.
- Shadows remain open, colored, and readable. Deep values are limited to hair, pupils, narrow structural accents, or small depth anchors rather than dominating the frame.
- Highlights roll softly and retain skin, white fabric, embroidery, pearl, cloud, and mist texture.
- Use pale sky, light plaster, bright cloud/mist, reflected stone/water, sheer layers, or warm bounce to carry luminosity. Do not add more objects merely to make the frame bright.

For airy xianxia, prefer cool-white daylight, luminous cloud or pale architecture, a broad soft face key, gentle frontal fill, translucent fabric-edge light, low-to-medium contrast, and shallow atmospheric depth. “Cold” controls hue and temperament; it does not authorize underexposure, deep navy dominance, storm drama, gray skin, or a black mountain wall.

## `BALANCED_CLEAR`

Use for editorial, studio, professional, environmental urban, analog, or other portraits whose brief does not imply high key or darkness.

- Midtones dominate with controlled highlights and readable shadows.
- Face and requested garment remain one clear tonal step above or apart from their immediate background.
- No large empty dark region or bright window outranks the subject.
- Preserve real material response and local contrast without a heavy global grade.

## `DARK_INTENTIONAL`

Use only for explicit night, low-key, noir, dark studio, or a protected dark reference. Do not infer it from “cinematic”, “cool”, “restrained”, “mature”, “ancient”, or “xianxia” alone.

- Darkness is localized and motivated; eyes, facial planes, hands, required garment layers, and action contact remain readable.
- Deep backgrounds retain hue and spatial detail instead of collapsing into black or murky blue-gray.
- A visible or inferable source creates face/garment separation; night is not permission for flat gray skin.
- Keep the existing night/low-key recipe signature while preventing accidental underexposure.

# Bright ancient portrait gate

When an ancient recipe uses `BRIGHT_AIRY`, the directed state must include all of these observable decisions:

1. a pale or light-bearing background zone around the upper body, without a giant moon halo;
2. broad face illumination with both eyes readable and skin warmer/healthier than the cool environment;
3. translucent-over-opaque garment separation with preserved white and pale-color texture;
4. open shadow detail in hair, sleeves, waist, and architecture;
5. mist, cloud, gauze, water, pearl, or metal used as small light carriers—not glow fog or blown white effects;
6. the largest continuous deep-value area remains secondary to the person.

If the user explicitly requests a moonlit or night xianxia frame, keep the night fact but construct a luminous night: pale cloud/mist or light stone behind the upper body, neutral face fill, controlled silver rim, readable mountains, and no deep navy wall swallowing most of the frame.

# Acceptance boundaries

`BRIGHT_AIRY` fails when any is observable:

- the first impression is dark, gloomy, stormy, murky, or heavily blue-gray without explicit user intent;
- face or skin reads gray/cyan, eyes are dull, or the upper body merges into the background;
- dark mountains, timber, walls, sky, or floor form the dominant visual mass;
- pale garments are bright but face/background remain underexposed, creating a cutout look;
- white fabric, cloud, mist, or skin clips into textureless areas;
- “仙气” is represented mainly by darkness, a giant moon, fog volume, glow, or effects rather than light fabric, air, and separation.

`BALANCED_CLEAR` or `DARK_INTENTIONAL` fails only against its own profile. Never brighten an explicit low-key frame into high key, and never darken an airy/beauty brief to manufacture drama.

# Boundary

Profiles are SOFT unless the user explicitly states brightness/exposure. They cannot override an explicit palette, time of day, dark/light requirement, lighting reference, historical material, or protected scene. They choose exposure structure within those facts.
