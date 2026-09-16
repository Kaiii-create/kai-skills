# Kai Agent Skills

**[English](README.md)**

一组可复用的 Agent Skills，覆盖开发、运维、创作与日常 Agent 工作流。

这些技能遵循以 `SKILL.md` 为核心的通用目录结构，已在多个兼容 Agent 平台中测试。本文以 **OpenAI Codex** 为主要安装示例；其他平台的安装目录、工具名称和权限机制可能有所不同。

## 可用技能

| 技能 | 说明 | 状态 |
|------|------|------|
| [server-autopilot](./server-autopilot/) | 解析 FTP/MySQL 凭据、测试连通性，并在用户确认后上传代码或执行 SQL | 稳定版 |
| [photo-retoucher](./photo-retoucher/) | 自然语言 AI 专业修图：人像精修、废片拯救、婚纱照、证件/职业照、换装换背景、局部修改、老照片修复与批量修图 | 稳定版 |

> 更多技能持续添加中，欢迎 Star & Watch 关注更新。

## 安装

### 通过 npx 一键安装（推荐）

```bash
# 安装 Photo Retoucher 到 Codex
npx @kaiii-create/kai-skills install photo-retoucher -t codex

# 安装到多个平台
npx @kaiii-create/kai-skills install photo-retoucher -t codex,claude

# 安装全部技能到指定平台
npx @kaiii-create/kai-skills install all -t claude

# 自动检测本机已安装的 AI 工具，全部安装
npx @kaiii-create/kai-skills install all --auto

# 项目级安装（装到当前目录，便于提交到 Git 共享）
npx @kaiii-create/kai-skills install all -t codex --project
```

支持的平台（`-t` / `--target`）：

| 平台 | 用户级目录 | 项目级目录 |
|------|-----------|-----------|
| `codex` | `~/.agents/skills/` | `./.agents/skills/` |
| `claude` | `~/.claude/skills/` | `./.claude/skills/` |
| `cursor` | `~/.cursor/skills/` | `./.cursor/skills/` |
| `trae` | `~/.trae/skills/` | `./.trae/skills/` |
| `qoder` | `~/.agents/skills/` | `./.agents/skills/`（需配合 OpenSkills） |
| `copilot` | `~/.github/skills/` | `./.github/skills/` |

> 各平台读取各自的专属 skills 目录。只有 `codex` 采用 [agentskills.io](https://agentskills.io/) 的跨平台标准目录 `~/.agents/skills/`。`qoder` 不直接读 skills 目录，用户级安装不会自动生效；建议使用 `--project` 在项目根目录安装，安装后需执行 `npx openskills install .` 把 skill 注册进 `AGENTS.md`。

其他命令：

```bash
npx @kaiii-create/kai-skills list                # 列出可安装的技能
npx @kaiii-create/kai-skills list --installed    # 列出本机已安装的技能
npx @kaiii-create/kai-skills --help
```

### 手动安装（git clone）

用户级技能可在不同项目中使用。将完整技能目录复制到 `~/.agents/skills/`：

```bash
git clone https://github.com/Kaiii-create/kai-skills.git
mkdir -p ~/.agents/skills
cp -R kai-skills/photo-retoucher ~/.agents/skills/
```

安装后启动一个新的 Codex 会话，并直接用自然语言描述修图需求；也可以显式写出 `photo-retoucher`。

## Photo Retoucher 使用示例

```text
用 photo-retoucher 修这张，老婆救片模式，自然度 2，保持本人。
人物简单修改，自然一点。
人物精修，但不要有明显 P 图感。
其他都不要动，眼睛稍微大一点。
婚纱照换成夕阳海边，人完全不要动。
```

人物美化默认是 **Level 0**：没有授权时不主动瘦脸、磨皮、大眼或改身材。“人物简单修改”= Level 1；“人物精修”= Level 2；“人物商业精修”= Level 3。明确提出“眼睛大一点”之类的局部要求时，只修改指定目标。人物精修等级与自然度是两个独立参数。

详细规则见 [photo-retoucher 中文文档](./photo-retoucher/README_zh.md)。

如需让仓库内的协作者共享技能，可将技能目录放在项目的 `.agents/skills/` 中并提交到 Git：

```bash
mkdir -p .agents/skills
cp -R /path/to/kai-skills/photo-retoucher .agents/skills/
```

Codex 官方说明：[Agent Skills](https://developers.openai.com/codex/skills)

### SkillHub

已有技能可按对应 SkillHub 页面提示安装；`photo-retoucher` 若尚未发布到 SkillHub，可直接使用上面的 npx 或手动安装方式。

### 其他 Agent 平台

如果平台支持 `SKILL.md` 格式，通常可以将完整技能目录复制到该平台的技能目录中。请以对应平台的文档为准，并确认其支持技能所使用的图片分析、图片编辑及权限能力。

## 仓库结构

```text
kai-skills/
├── package.json
├── bin/
│   └── kai-skills.js
├── test/
├── .github/workflows/
├── README.md
├── README_zh.md
├── CHANGELOG.md
├── LICENSE
├── server-autopilot/
│   ├── SKILL.md
│   ├── README.md
│   └── README_zh.md
└── photo-retoucher/
    ├── SKILL.md
    ├── MANIFEST.yaml
    ├── README.md
    ├── README_zh.md
    ├── workflows/
    ├── policies/
    ├── presets/
    ├── prompts/
    ├── tools/
    ├── qc/
    ├── schemas/
    ├── docs/
    └── tests/
```

仓库里有两类内容：CLI 工程文件（`package.json`、`bin/` 等）以及每个独立目录中的 Skill 内容。安装器会扫描顶层包含 `SKILL.md` 的目录，因此 `photo-retoucher` 加入仓库后会自动成为可安装 Skill，无需在安装器里硬编码技能名称。

## 兼容性说明

- 技能格式具有可移植性，但不同 Agent 平台提供的工具和安全机制并不完全相同。
- `photo-retoucher` 需要运行环境提供图片分析与图片编辑能力；若缺少对应能力，Skill 本身不能凭空完成图像修改。
- 正式护照、签证和官方证件照应以对应机构当前要求为准，合规优先于美化。
- 生成式修图应执行身份、人体结构、头发服装边缘、背景透视与光影 QC。

## 贡献

欢迎提交 Issue 和 Pull Request。新增技能时，请为每个技能建立独立目录，并至少提供有效的 `SKILL.md`。

## 许可证

[MIT](LICENSE)
