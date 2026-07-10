# kai-skills

QoderWork Agent Skills 合集 — 为日常开发和运维场景打造的实用技能包。

## Skills 列表

| Skill | 描述 | 状态 |
|-------|------|------|
| [server-autopilot](./server-autopilot/) | 从配置文件智能识别 FTP/MySQL 凭据，自动测试连通性，一键上传代码和执行 SQL | Stable |

> 后续会持续添加更多 Skill，欢迎 Star 和关注。

## 什么是 QoderWork Skills？

Skills 是 QoderWork 的技能扩展机制。每个 Skill 本质上是一份 `SKILL.md` 指令文件，告诉 AI Agent 在特定场景下该如何工作。安装后，你只需用自然语言描述需求，Agent 就会自动加载对应的 Skill 并执行。

## 安装方式

### 通过 SkillHub（推荐）

在 [SkillHub](https://skillhub.cn/) 搜索 Skill 名称，一键安装。

### 通过 CLI

```bash
npx clawhub install <skill-name>
```

### 手动安装

将对应 Skill 目录下的 `SKILL.md` 复制到 QoderWork 技能目录：

```
# Windows
%USERPROFILE%\.qoderworkcn\skills\<skill-name>\SKILL.md

# macOS / Linux
~/.qoderworkcn/skills/<skill-name>/SKILL.md
```

## 目录结构

```
kai-skills/
├── README.md                  # 本文件
├── LICENSE                    # MIT 开源协议
└── server-autopilot/          # 服务器自动驾驶
    ├── SKILL.md               # Skill 指令文件
    └── README.md              # 使用说明
```

## 贡献与反馈

- 发现 Bug 或有改进建议？请提交 [Issue](../../issues)
- 想贡献代码或新 Skill？欢迎提交 Pull Request

## Troubleshooting

### server-autopilot

**Q: FTP 连接超时？**
检查服务器防火墙是否开放 21 端口，Skill 会自动尝试被动模式 `--ftp-pasv`。

**Q: MySQL 提示 Access denied？**
MySQL 用户权限通常绑定来源 IP，需要在服务器端授权你的 IP。

**Q: 上传成功但网站没更新？**
确认远程目录路径正确，检查服务器是否有 CDN 或 OPcache 缓存。

**Q: 配置文件格式太乱识别错了？**
Skill 会展示识别结果让你确认，直接告诉 Agent 哪个字段错了即可修正。

## License

[MIT](LICENSE) — 自由使用、修改和分发。
