# Kai Agent Skills

**[English](README.md)**

一组可复用的 Agent Skills，用于自动化日常开发与运维工作流。

这些技能遵循以 `SKILL.md` 为核心的通用目录结构，已在多个兼容 Agent 平台中测试。本文以 **OpenAI Codex** 为主要安装示例；其他平台的安装目录、工具名称和权限机制可能有所不同。

## 可用技能

| 技能 | 说明 | 状态 |
|------|------|------|
| [server-autopilot](./server-autopilot/) | 解析 FTP/MySQL 凭据、测试连通性，并在用户确认后上传代码或执行 SQL | 稳定版 |

> 更多技能持续添加中，欢迎 Star & Watch 关注更新。

## 安装

### Codex：用户级安装

用户级技能可在不同项目中使用。将完整技能目录复制到 `~/.codex/skills/`：

```bash
git clone https://github.com/Kaiii-create/kai-skills.git
mkdir -p ~/.codex/skills
cp -R kai-skills/server-autopilot ~/.codex/skills/
```

安装后启动一个新的 Codex 会话，并使用自然语言描述任务；也可以通过技能名称显式调用。

### Codex：项目级安装

如需让仓库内的协作者共享技能，可将技能目录放在项目的 `.codex/skills/` 中并提交到 Git：

```bash
mkdir -p .codex/skills
cp -R /path/to/kai-skills/server-autopilot .codex/skills/
```

Codex 官方说明：[Agent Skills](https://developers.openai.com/codex/skills)

### SkillHub

也可以访问技能页面并按照平台提示安装：

[在 SkillHub 中打开 server-autopilot](https://skillhub.cn/skills/server-autopilot)

### 其他 Agent 平台

如果平台支持 `SKILL.md` 格式，通常可以将完整技能目录复制到该平台的技能目录中。请以对应平台的文档为准，并确认其支持技能所使用的工具、权限确认和持久化能力。

## 使用示例

安装 `server-autopilot` 后，可以尝试：

```text
测试一下服务器连接
帮我上传代码到服务器
执行这个 SQL 文件
同步文件到 FTP
```

具体配置格式、依赖和安全说明请查看 [server-autopilot 中文文档](./server-autopilot/README_zh.md)。

## 仓库结构

```text
kai-skills/
├── README.md
├── README_zh.md
├── LICENSE
└── server-autopilot/
    ├── SKILL.md
    ├── README.md
    └── README_zh.md
```

每个技能使用独立目录：

- `SKILL.md`：技能定义和执行说明，必需
- `README.md`：英文使用文档，可选
- `README_zh.md`：中文使用文档，可选
- `scripts/`、`references/`、`assets/`：部分技能可能使用的附加资源

安装时建议复制完整技能目录，以免遗漏附加资源。

## 兼容性说明

- 技能格式具有可移植性，但不同 Agent 平台提供的工具和安全机制并不完全相同。
- 平台若缺少技能依赖的工具，Agent 可能需要采用替代方案或请求用户协助。
- 涉及服务器、文件或数据库写操作时，请先检查执行计划，并仅在确认目标和影响范围后授权。
- 建议先在测试环境验证，再用于生产环境。

## 贡献

欢迎提交 Issue 和 Pull Request。新增技能时，请为每个技能建立独立目录，并至少提供有效的 `SKILL.md`。

## 许可证

[MIT](LICENSE)
