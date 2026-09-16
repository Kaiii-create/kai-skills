# Portrait Retouch Workflow

Read `presets/portrait-retouch-levels.yaml` and `presets/naturalness.yaml`. These are independent controls: retouch level authorizes *what person edits may happen*; naturalness controls *how visible/strong the result may look*.

Default `portrait_retouch_level: 0` unless the user authorizes person retouching. Never infer permission to slim the face, enlarge eyes, reshape the body, or smooth skin merely because a person appears in the photo.

Explicit requests work at any level: “眼睛大一点” at Level 0 authorizes only subtle eye enlargement; all unrelated person attributes remain locked.

Aliases: “人物简单修改/轻修” => Level 1; “人物精修/人像精修/精修一下人物” => Level 2; “人物商业精修” => Level 3. A bare “精修” in portrait context => Level 2.

Analyze face, skin, hair, body, lighting and camera distortion. Within the authorized level, order: transient blemishes → exposure/skin tone → under-eye/oil/texture → authorized facial contour/features → hair → authorized body/posture → local cleanup → color → QC.

Levels are permission ceilings, not mandatory checklists. Skip any allowed edit that is unnecessary. Preserve pores, texture, anatomy, age cues, recognizable identity and nearby background geometry. Avoid waxy skin. Teeth and eye whites stay believable.

“保持本人” enforces Identity Lock but does not cancel already-authorized retouching. “人物不要动/脸不要动” is a strict person/face lock and overrides the retouch level.
