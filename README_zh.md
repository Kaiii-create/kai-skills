# Kai Agent Skills

**[English](README.md)**

一系列实用的 Agent Skills 合集，用于自动化日常开发与运维工作流。

## 可用技能

| 技能 | 说明 | 状态 |
|------|------|------|
| [server-autopilot](./server-autopilot/) | 智能解析 FTP/MySQL 凭据、自动测试连通性、一键部署代码与执行 SQL | 稳定版 |

> 更多技能持续添加中，欢迎 Star & Watch 关注更新。

## 安装方式

### 方式一：SkillHub

访问技能页面，点击 **安装** 即可：

<a href="https://skillhub.cn/skills/server-autopilot" target="_blank">在 SkillHub 中打开</a>

### 方式二：手动安装

将对应技能目录下的 `SKILL.md` 复制到 QoderWork 技能目录：

```
# Windows
%USERPROFILE%\.qoderworkcn\skills\<技能名>\SKILL.md

# macOS / Linux
~/.qoderworkcn/skills/<技能名>/SKILL.md
```

## 仓库结构

```
kai-skills/
├── README.md
├── README_zh.md
├── LICENSE
└── server-autopilot/
    ├── SKILL.md
    ├── README.md
    └── README_zh.md
```

每个技能独立一个目录，`SKILL.md` 为必需文件，`README.md` / `README_zh.md` 为可选的中英文使用说明。

## 贡献

欢迎提交 Issue 和 Pull Request。

## 许可证

[MIT](LICENSE)
