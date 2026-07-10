# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2026-07-10

### Fixed

- **CLI 严格参数解析**: `-t`/`--target` 后无值时现在报错退出,不再静默默认到 codex
- **未知参数报错**: 未识别的参数现在报错并返回非零退出码,不再静默忽略
- **`--auto` 与 `--target` 互斥**: 同时使用时明确报错
- **skill 名称校验**: 缺失或以 `-` 开头时报错
- **平台去重**: `codex,codex` 等重复输入现在正确去重
- **`list --installed` 去重**: 多个平台共用同一目录时不再重复显示相同 skill
- **所有错误返回非零退出码**

### Changed

- **SKILL.md 跨平台兼容**: 移除 `memory_search`、`memory action=replace`、`AskUserQuestion` 等平台特定工具名,改为平台无关的能力描述
- **MySQL 凭据安全**: 不再用 `mysql -u USER -p'PASS'`,改用临时 `--defaults-extra-file`(权限 0600,用后删除)
- **FTP 凭据安全**: 不再用 `ftp://USER:PASS@HOST/` URL,改用 `curl --user`,并提醒避免 Shell 历史泄露
- **凭据持久化**: 默认不保存密码,只保存 host/port/username/remote_dir/database 等非秘密信息;用户明确同意后才保存密码
- **不得宣称所有平台 memory 都是本地/加密/不同步**
- **Qoder 安装流程**: 用户级安装给出强警告(不会自动生效),建议项目级安装 + OpenSkills 注册
- **Node.js 最低版本**: 从 `>=16.7.0` 升至 `>=18.0.0`(因 `node:test` 内置测试运行器需要 Node 18+)

### Added

- **测试套件** `test/test.js`: 24 个测试,覆盖版本/帮助/列表/安装/幂等/错误处理/npm pack 内容检查
- **npm scripts**: `test` 和 `pack:check`
- **GitHub Actions CI**: push/PR 时自动跑测试 + npm pack(Node 18/20 矩阵)
- **Release 工作流模板**: 基于 tag 触发,支持 npm provenance(需配置 NPM_TOKEN secret)
- **CHANGELOG.md**
- **npm 包内容**: 新增 `README_zh.md` 和 `LICENSE` 到 `files` 字段

### Security

- 普通 FTP 是明文协议,SKILL.md 中明确提示风险并推荐 SFTP/FTPS
- 严禁把密码输出到日志,所有日志必须脱敏
- 不得把密码写入 Shell 历史
- 如果平台支持系统钥匙串或 secret storage,应优先使用

## [0.1.1] - 2026-07-10

### Fixed

- **Cursor 路径**: 从 `~/.agents/skills/` 修正为 `~/.cursor/skills/`
- **Trae 路径**: 从 `~/.agents/skills/` 修正为 `~/.trae/skills/`
- **Qoder**: 标记为需要 OpenSkills,安装后提示执行 `npx openskills install .`

## [0.1.0] - 2026-07-10

### Added

- 初始发布
- CLI 安装器 `bin/kai-skills.js`(零依赖)
- 支持 6 个平台: codex / claude / cursor / qoder / trae / copilot
- 用户级 + 项目级安装(`--project`)
- 单装/全装(`install <name>` / `install all`)
- 自动检测平台(`--auto`)
- `server-autopilot` skill
