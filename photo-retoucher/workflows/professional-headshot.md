# Professional Headshot Workflow

For resumes, company pages, professional social profiles and studio portraits. Unlike official ID photos, tasteful scene/wardrobe synthesis is allowed when requested.

Default: identity strict, naturalness 2, `portrait_retouch_level: 0`. A request for a “professional headshot/职业照/形象照” authorizes photographic polish, crop, exposure/color balancing, transient blemish cleanup, hair cleanup, and requested wardrobe/background work. It does not by itself authorize facial-feature or body-geometry changes.

Professional does not mean a more generic, younger, thinner, more symmetrical, or more conventionally attractive face.

Preserve head shape, face proportions, eye spacing/shape/tilt, eyebrow identity, nose dimensions, mouth/lip proportions, jaw/chin, ears, hairline, expression, age cues, natural asymmetry, and distinctive marks unless the user explicitly targets one of them.

Common looks: neutral gray/white/dark studio, office environment, black/navy suit, white shirt, business casual, with/without tie. Integrate clothing at neck/collar/shoulders and match light direction.

For wardrobe/background generation, lock the face and head. Only minimal boundary integration is allowed around hair edges, neck, collar, and shoulders. If generation causes identity drift, rollback and narrow the edit region.

Run identity QC against the original before accepting the result.
