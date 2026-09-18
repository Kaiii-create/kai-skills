# Recipes

Lightweight **soft visual preference patches** applied after Constraint Lock / Reference Mapping and before Director Engine.

## What a recipe is

- Explainable Visual State **soft patches** (path + direction + strength + reason)
- Optional — never required for a request
- Provenance `source: RECIPE`
- Selected from explicit user style intent (registry)

## What a recipe is not

- Not a Route / Workflow / prompt template
- Not a second Visual State
- Not HARD rules; **never** upgrades to HARD/LOCK/FORBID
- Not identity redesign
- Not a multi-recipe blend (**one primary recipe max**)

## Priority

```
Safety > User HARD > USER_EXPLICIT LOCK > User SOFT
  > USER_EXPLICIT ADAPT/INSPIRE > INFERRED reference
  > Recipe > Director AUTO > Default
```

## Layout

```
recipes/
  README.md
  registry.md
  natural-lifestyle.md
  modern-oriental.md
  cinematic-night.md
  editorial-fashion.md
  studio-portrait.md
  environmental-urban.md
  analog-film.md
  fine-art-low-key.md
  high-key-minimal.md
  professional-portrait.md
  gufeng-heroine.md
  historical-hanfu.md
  cold-xianxia.md
  bright-luxury-gufeng.md
  ancient-beauty-closeup.md
```

Add a recipe only when it changes several concrete visual decisions and has a defensible boundary from neighboring recipes. Do not create recipes for empty intensifiers such as “高级、唯美、质感、氛围感”, and do not copy external style-route banks.

## Selection

| User style cue | Recipe |
|----------------|--------|
| 自然生活 / 生活感 / natural lifestyle | `natural-lifestyle` |
| 新中式 / 现代东方 | `modern-oriental` |
| 电影夜景 / cinematic night | `cinematic-night` |
| 时装大片 / 杂志编辑 / lookbook | `editorial-fashion` |
| 棚拍 / 摄影棚 / 无缝背景 | `studio-portrait` |
| 城市环境 / 建筑人像 / 都市写真 | `environmental-urban` |
| 胶片 / 35mm / analog film | `analog-film` |
| 暗调艺术 / 雕塑光 / low key | `fine-art-low-key` |
| 高调 / 极简白棚 / high key | `high-key-minimal` |
| 职业肖像 / 商务头像 / 品牌人物 | `professional-portrait` |
| 汉服美女 / 古风美女 / 古风女主 | `gufeng-heroine` |
| 宋制 / 明制 / 唐制 / 形制考据 | `historical-hanfu` |
| 仙侠 / 清冷仙气 / 月白冰蓝 | `cold-xianxia` |
| 红金盛唐 / 明艳华贵 / 宫廷重工 | `bright-luxury-gufeng` |
| 古风美妆特写 / 贵女妆 / 花钿水光妆 | `ancient-beauty-closeup` |
| No explicit style | **no recipe** — Director alone |

`intent.recipe_id` records selection only; recipe body is not copied into VS.

For multi-cue input, use the selection boundaries in `registry.md`; never load two recipe bodies to create a hidden style blend. Bare “汉服美女” deliberately selects the general heroine recipe so a one-line request gets a complete frame without falsely claiming a dynasty or forcing xianxia effects.
