# Live Image Generation Results

Run date: 2026-09-15  
Environment: Codex built-in `image_gen`  
Inputs: synthetic adult subjects and generated reference fixtures only

## Core V1 paths

| Case | Live call | Result | Evidence checked |
|------|-----------|--------|------------------|
| Text → Image | `prompt` only | PASS | Returned a vertical rain-night Shanghai portrait; adult subject, modern-oriental wardrobe, coherent warm/cool night light, and no text/jewelry |
| Single Reference → Image | `prompt` + `num_last_images_to_include: 1` | PASS | Preserved the synthetic woman's face shape, eyes, brows, skin tone, and left-eye beauty mark while changing shoulder-length hair to a chin-length bob, replacing the studio with Hong Kong night, and changing wardrobe/light |
| Multi Reference → Image | `prompt` + `num_last_images_to_include: 4` | PASS | Image 1 identity remained recognizable; Image 2 supplied the asymmetric red wool coat; Image 3 supplied the hand-at-waist three-quarter pose; Image 4 supplied the cool-left/warm-right light. The required red coat survived as HARD and the inputs were not treated as an undifferentiated blend |
| Prompt-only | no adapter or image tool call | PASS | Full compile produced the clean prompt below; image-generation call count for this case was zero |

Diagnostic previews remained in the tool-managed Codex image directory. Accepted representative images used by the public README are separately downsampled under `assets/examples/` and packaged with the skill.

## Prompt-only output

```text
Portrait photograph. Aspect ratio: 3:4. A clearly adult East Asian woman in a contemporary modern-oriental portrait, with dark hair in a soft updo, a composed expression, and her gaze directed slightly left. She pauses beneath an awning on a Shanghai street just after rain, one hand resting naturally on a small bag strap. She wears a restrained ink-black modern Chinese silhouette with subtle burgundy detail. Medium framing places her on the right third, with her face first in the hierarchy and wet street depth to the left. Use one coherent soft key from camera left with restrained amber and cool practicals, natural skin texture, tactile fabric, and wet pavement reflections. Must avoid: jewelry, readable text, logos, watermarks, neon clutter, historical costume, and plastic skin.
```

## Failure propagation check

An initial neutral pose-fixture request received a real tool-side moderation rejection. The run recorded the error as a failure and did not claim an image. A safer gender-neutral wooden drawing-mannequin fixture was then generated successfully. This confirms that tool refusal is surfaced rather than treated as a successful adapter result.

## User acceptance sample and V1.1 corrections

Five user-generated outputs were visually reviewed on 2026-09-15:

| Prompt path | Result | Observed gap | Correction now covered by |
|-------------|--------|--------------|---------------------------|
| Natural café portrait | PARTIAL | Hand still held the handle although the requested moment was “just put the cup down” | HARD observable action/contact state + one acceptance retry |
| Tang-style portrait without a recipe | PASS | Red/gold, palace corridor, turn, sleeve gesture, and photographic look all held | No new Tang recipe added |
| Modern-oriental tea room | PARTIAL | Garment drifted toward historical cross-collar robe language and symbols concentrated | Contemporary construction anchors + historical-form and symbol-stack avoidance |
| Single identity reference to Hong Kong night | PASS/PARTIAL | Identity and short hair held; subject-to-scene relighting could integrate more tightly | Director subject/environment light-coherence audit |
| Four-role multi-reference | PARTIAL | Identity/wardrobe/pose/light/red held, but cup/table leaked from the pose source | Per-asset positive allow-list + negative role fence |

The corrections are deliberately narrow. They do not add a Tang recipe, a second reference state, a general failure-diagnosis engine, or unlimited retries.

## Independent Luna forward test

Run date: 2026-09-16  
Model: `gpt-5.6-luna`  
Method: blind execution with the installed skill; root agent independently inspected every generated image.

| Case | Result | Evidence |
|------|--------|----------|
| Explicit cup action | PASS | Cup rested on the table, hand was separated, and gaze remained outside |
| Modern-oriental degree forbid | PARTIAL | Modern garment succeeded, but ink art, blossom branch, ceramic vessel, and tea service formed a symbol cluster; acceptance did not retry |
| Single-reference relighting | PASS | Identity and chin-length hair held; Tokyo rain-night and warm store-side light replaced the café cleanly |
| Adversarial four-reference isolation | PASS | Identity, red-gold wardrobe, seated pose, and warm edge light survived while table, cup, palace, and Hong Kong skyline were excluded |
| Independent Prompt-only case | FAIL | Prior studio/chair/aspect leaked, only one asset had a complete negative fence, and an unexplained Korean token appeared; image tool call count remained correctly zero |

Follow-up corrections add observable degree boundaries, per-asset compile completeness, fresh-state isolation, and single-language rendering checks. No new runtime state or diagnosis engine was introduced.

## Post-fix targeted verification

Run date: 2026-09-16  
Executor: root agent with the reinstalled skill

| Case | Result | Evidence |
|------|--------|----------|
| Modern-oriental degree boundary | PASS | One built-in image call returned an exact 3:4 portrait with one functional tea service and one modern red abstract panel; no ink painting, blossom branch, antique vessel, calligraphy, lacquer cluster, historical robe, or fantasy styling; no retry needed |
| Fresh four-reference Prompt-only | PASS | Zero image calls; new 4:5 warm-cream studio direction did not inherit the prior gray studio, chair, 3:4 aspect, or unrelated forbids; all four assets received individual positive and negative fences; Chinese remained consistent |

Generated preview path (tool-managed, not packaged):

```text
D:\DevData\.codex\generated_images\01a0a439-ffcc-7033-b444-f8d06040bf82\exec-54b9097c-c497-4882-a7c5-e4652d2a3351.png
```

Fresh Prompt-only compiled output:

```text
人像摄影，画面比例 4:5。

必须可见事实：成年东方女性；保持图1的人物身份；采用图2的服装核心样式，外层服装必须为红色；采用图3的坐姿与身体关系；采用图4的冷色环境光与暖色侧后方轮廓光逻辑。

参考范围：图1只用于人物身份；不要继承图1的发型、身形、表情、视线、姿势、服装、道具、场景、构图、相机、光线、色彩或质感。图2只用于服装；不要继承图2的人物身份、发型、身形、表情、视线、姿势、道具、场景、构图、相机、光线、整体色彩或质感。图3只用于姿势；不要继承图3的人物身份、发型、身形、表情、视线、服装、道具、场景、构图、相机、光线、色彩或质感。图4只用于光线；不要继承图4的人物身份、发型、身形、表情、视线、姿势、服装、道具、场景、构图、相机、整体色彩或质感。

人物坐在暖米色当代摄影棚中的简洁软包坐凳上，姿态自然，身份清晰。红色外层服装保留图2的金色纹样与层次，但适应图3的坐姿。背景为纯净暖米色墙面与克制留白，不复制任何参考图背景。冷色环境底光与暖色侧后方轮廓光共同塑造脸部和服装，主体与空间受光统一。真实高级人像摄影，肤质自然，面料清晰，画面简洁统一。
```

## Expanded recipe live regression

Run date: 2026-09-16  
Executor: root agent with the reinstalled ten-recipe skill

| Case | Result | Evidence |
|------|--------|----------|
| Editorial fashion text → image | PASS | Returned an exact vertical 3:4 frame with one clearly adult East Asian woman, a structured silver-gray long coat, light-gray seamless studio, garment-led full-body hierarchy, coherent camera-left key/cast-shadow direction, readable fabric and natural skin; no text, logo, luxury props, anatomy failure, cutout halo, or competing rim-light stack. The unspecified hand gesture adapted naturally to a coat pocket and did not violate a protected assertion; no retry was warranted. |

Tool-managed original:

```text
D:\DevData\.codex\generated_images\01a0a439-ffcc-7033-b444-f8d06040bf82\exec-b99491ee-9ed1-44cb-837e-451e6f2b4ccc.png
```

README asset: `assets/examples/editorial-fashion.jpg`

## Complete ten-style image gallery

Run date: 2026-09-16  
Executor: root agent with Codex built-in `image_gen`  
Method: one independent text-to-image call per missing recipe; each returned image was inspected again after downsampling to the packaged 540 × 720 JPEG.

| Recipe | Result | Protected evidence |
|--------|--------|--------------------|
| `studio-portrait` | PASS | Adult man, warm-gray seamless studio, charcoal knitwear, 3:4, coherent soft key and shadow model, natural skin; no rigid cliché, text, logo, or conflicting rim stack |
| `environmental-urban` | PASS | Adult woman, blue-hour elevated walkway and readable high-rise canyon, 3:4, person-to-city scale and depth preserved; no generic bokeh wall or neon takeover |
| `analog-film` | PASS | Adult woman on an afternoon apartment balcony, 3:4, restrained grain/roll-off/optical softness; no leaks, scratches, border, date stamp, or orange wash |
| `fine-art-low-key` | PASS | Adult man, deep-charcoal space, 3:4, single sculptural side light, eye/facial plane/garment edge readable; no smoke, candle, symbol, or crushed-face failure |
| `high-key-minimal` | PASS | Adult woman, warm-white studio and white/cream clothing, 3:4, skin/hair/garment/background remain separate; no clipping, ID-photo stiffness, text, or prop clutter |
| `professional-portrait` | PASS | Adult woman architect in a contemporary studio, 3:4, credible role context and one model; no suit, crossed arms, stock smile, confidential content, invented logo, or readable text |

No HARD/FORBID assertion failed, so none of the six cases used the optional retry. Together with the four earlier accepted recipe images, every built-in style now has one packaged Direct Image example.

## One-line ancient portrait expansion

Run date: 2026-09-16  
Executor: root agent with Codex built-in `image_gen`  
Source objective: a user should be able to say only “生成一个汉服美女” and receive a fully directed image without completing a parameter sheet.

| Recipe | Result | Observable evidence |
|--------|--------|---------------------|
| `gufeng-heroine` | PASS | Bare one-line brief expanded into an exact 3:4 adult heroine portrait; face and catchlights lead, ivory/cinnabar/gold garment structure is clear, hands are stable, corridor depth remains subordinate; no tourist-record, rental-costume, text, logo, fantasy-effect, or CG failure |
| `historical-hanfu` | PASS | Adult Song-oriented portrait with pale-celadon outer layer, warm-ivory inner structure, skirt, restrained hair ornament and courtyard context; face remains readable; no xianxia effects, palace spectacle, mixed-culture costume, text, logo, or generic robe collapse |
| `cold-xianxia` | PASS | Adult moon-white/frost-blue heroine with readable eyes, neutral face fill, silver edge separation, legible collar/sleeves/sash and restrained misty depth; no dead-blue skin, white clipping, particle storm, spell pose, text, logo, or game-CG collapse |
| `bright-luxury-gufeng` | PASS | Adult palace heroine with immediate face priority, structured crown, controlled red/ivory/antique-gold hierarchy, clean hands and embroidery, warm key and rim separation; no bridal-rental, gold-plastic, jewelry-collision, text, logo, or game-CG failure |
| `ancient-beauty-closeup` | PASS | Adult face-led 3:4 close-up with both eyes and catchlights, dimensional skin, precise huadian, pearl/jade ornament attachments and readable neckline; no doll face, wet-plastic mask, cropped face, ornament collision, text, logo, or illustration failure |

All five originals were copied into the project as 540 × 720 progressive JPEGs and re-inspected after compression. No HARD/FORBID assertion failed; none used the optional retry. The gallery now contains one accepted Direct Image example for all fifteen recipes.

## Clean-lifestyle portrait-priority regression

Run date: 2026-09-16  
Executor: root agent with Codex built-in `image_gen`  
Source brief: `清纯生活照；午后咖啡馆靠窗座位；米白针织开衫 + 浅色内搭；温柔、自然、明确成年；3:4`

The pre-fix result had the correct `1086 × 1448` 3:4 canvas, but failed the intended visual hierarchy: extra café customers remained visible, a book/flowers/cup competed with the face, the subject used a chin-rest/direct-camera stock pose, and the frame read as a lifestyle setup instead of a portrait. The comparison image supplied by the user improved subject priority, but measured `941 × 1672` (approximately 9:16) and omitted the requested cardigan layer; it was therefore useful as a taste reference, not as a passing contract example.

| Acceptance predicate | Result | Observable evidence |
|----------------------|--------|---------------------|
| Exact requested ratio | PASS | Tool-managed original is `1086 × 1448`; width/height is exactly `0.75`, with 0% relative error against 3:4 |
| One visible adult subject | PASS | Exactly one clearly adult East Asian woman; no customer, staff member, passerby, reflection, poster person, silhouette, or cropped secondary body |
| Portrait-first hierarchy | PASS | Eyes, face, shoulder line, and knitwear lead; window and café furniture remain subordinate |
| Named wardrobe layers | PASS | Cream knit cardigan, buttons, knit texture, sleeves, and pale inner top are all visibly distinct |
| Natural action and gaze | PASS | Relaxed shoulders and hands low; gaze is directed outside the frame; no chin-rest, face-touch, cup display, or direct-camera stock smile |
| Prop budget | PASS | One peripheral coffee cup only; no book, bouquet, menu, pastry, tableware stack, or text sign |
| Photographic coherence | PASS | Motivated afternoon window light, readable eyes and skin, restrained warm palette, and no studio/CG collapse |

Tool-managed original:

```text
D:\DevData\.codex\generated_images\01a0a439-ffcc-7033-b444-f8d06040bf82\exec-e3427b55-681e-4ceb-8a17-3767f904eeb7.png
```

Packaged accepted example: `assets/examples/natural-lifestyle.jpg` (`540 × 720`, exact 3:4). The compressed asset was re-inspected after export and retained every protected predicate. No retry was required.
