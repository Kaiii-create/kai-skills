# Recipe Test Cases

Purpose: verify that recipes are differentiated optional soft patches, route deterministically, and never become a second state or HARD rule.

## Cue coverage

| ID | Case | Expected |
|----|------|----------|
| Q01 | No supported style cue | `recipe_id: null`; no recipe body load |
| Q02 | 自然生活感 | `natural-lifestyle` selected |
| Q02A | 清纯生活照，午后咖啡馆靠窗，米白针织开衫 + 浅色内搭 | `natural-lifestyle`; one visible adult subject; both garment layers; no background people; at most one functional cue; no chin-rest/direct-smile/cup-display pose |
| Q02B | 清纯生活照但明确要求和两位朋友聊天 | `natural-lifestyle`; explicit three-person social request overrides single-subject default while portrait hierarchy remains intentional |
| Q03 | 新中式 | `modern-oriental` selected |
| Q04 | 电影夜景 | `cinematic-night` selected |
| Q05 | 时装大片 / lookbook | `editorial-fashion` selected |
| Q06 | 专业棚拍 / 灰色无缝背景 | `studio-portrait` selected |
| Q07 | 城市环境人像 / 建筑人像 | `environmental-urban` selected |
| Q08 | 35mm 胶片感 | `analog-film` selected |
| Q09 | 暗调艺术肖像 / 雕塑光 | `fine-art-low-key` selected |
| Q10 | 高调极简 / 纯白背景 | `high-key-minimal` selected |
| Q11 | 职业肖像 / 品牌人物照 | `professional-portrait` selected |
| Q12 | 汉服美女 / 古风女主 | `gufeng-heroine` selected |
| Q13 | 宋制汉服 / 明制形制 / 考据复原 | `historical-hanfu` selected |
| Q14 | 清冷仙侠 / 月白冰蓝古偶 | `cold-xianxia` selected |
| Q15 | 红金盛唐 / 明艳华贵宫廷 | `bright-luxury-gufeng` selected |
| Q16 | 古风贵女水光妆特写 / 花钿近景 | `ancient-beauty-closeup` selected |

## Priority and protection

| ID | Case | Expected |
|----|------|----------|
| Q17 | User HARD red outfit + any recipe | HARD wins; recipe cannot change red |
| Q18 | identity LOCK + any recipe | LOCK wins; recipe touches no identity path |
| Q19 | FORBID accessories + any recipe | FORBID kept |
| Q20 | Recipe applied | Provenance contributor `source: RECIPE` |
| Q21 | Recipe output | No prompt-template text; only VS soft patches via Director Patch |
| Q22 | lighting INSPIRE ref + recipe | Both contributors kept; recipe does not delete ref |

## Deterministic boundaries

| ID | Case | Expected |
|----|------|----------|
| Q23 | 新中式电影夜景 | `modern-oriental`; night remains ordinary SOFT scene/light intent |
| Q24 | 摄影棚时装大片 | `editorial-fashion`; studio remains production setting |
| Q25 | 极简白棚高调人像 | `high-key-minimal`; do not also load studio recipe |
| Q26 | 摄影棚企业个人简介照 | `professional-portrait`; studio remains setting |
| Q27 | 35mm 自然生活写真 | `analog-film`; lifestyle remains moment/mood intent |
| Q28 | 高级、唯美、氛围感 | No recipe; Director interprets ordinary SOFT taste words |
| Q29 | 唐风汉服 | `historical-hanfu`; dynasty cue alone does not imply fantasy or red-gold palace |
| Q30 | 唐风红金宫廷华服 | `bright-luxury-gufeng`; compound opulence cue wins |
| Q31 | 新中式茶室，不要古装 | `modern-oriental`; ancient recipes do not activate |
| Q32 | 古风仙侠美女 | `cold-xianxia`; do not also load `gufeng-heroine` |
| Q33 | Two equally explicit incompatible recipe cues | Select first emphasized cue unless a HARD outcome would change; never load both |

## Recipe-specific protection checks

| ID | Case | Expected |
|----|------|----------|
| Q34 | 新中式 + “不要古装” | Contemporary tailoring/closure/material anchors; no historical cross-collar robe or costume sleeves |
| Q35 | Modern tea room | One functional tea service plus at most one additional traditional decorative cue |
| Q36 | Editorial fashion | Specific garment/attitude proposition; not generic e-commerce catalog |
| Q37 | Studio portrait | Face, floor, cast shadows, and backdrop share one light model |
| Q38 | Environmental urban | City affects scale/composition/action; not generic bokeh wallpaper |
| Q39 | Analog film | Coherent grain/tonal/highlight response; no random leaks, borders, scratches, or date stamps |
| Q40 | Fine-art low-key | Eye/face plane and body edge remain readable; blacks are not crushed |
| Q41 | High-key minimal | Skin, hair edge, white garment, and background remain tonally distinct |
| Q42 | Professional portrait | Stated role/audience is credible without default suit, folded arms, or stock smile |
| Q43 | Gufeng heroine | Face/eyes lead; neckline/sleeve/waist remain legible; not a distant tourist record |
| Q44 | Historical Hanfu | Named dynasty and visible garment/hair structure agree; no dynasty mixing presented as accurate |
| Q45 | Cold xianxia | Cool atmosphere with readable neutral face light; no dead-blue skin, fog takeover, or clipped whites |
| Q46 | Bright luxury gufeng | Face, crown, red/ivory/gold hierarchy, hands and garment structure remain intelligible |
| Q47 | Ancient beauty close-up | Both eyes, face planes, skin texture, hairline and ornaments remain dimensional and collision-free |

## Assertions

- Recipe is not a Route, prompt template, or second Visual State.
- Priority remains: HARD/LOCK/FORBID/SOFT/reference > Recipe > Director AUTO.
- Exactly fifteen registry recipes exist and every recipe has executable patches, compatibility guidance, a protective check, and explicit Avoid boundaries.
- At most one recipe body is loaded per request.
