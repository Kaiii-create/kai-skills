# Server Autopilot

**[中文](#中文说明)**

> Intelligently parse FTP/MySQL credentials from config files, auto-test connectivity, and deploy code with one click.

A QoderWork Agent Skill that automates server deployment workflows — from credential parsing to FTP upload and SQL execution, with mandatory user confirmation before any write operation.

## Features

- **Smart Parsing** — Supports key=value, JSON, YAML, INI, and freeform text; automatically extracts FTP and MySQL connection info
- **Connectivity Testing** — Tests FTP and MySQL reachability with read-only operations, zero risk
- **Credential Memory** — Saves credentials to QoderWork memory after successful connection; reuse across sessions
- **Confirmation Mode** — Requires explicit user approval before FTP uploads and SQL execution, with full operation preview
- **SQL Diagnostics** — Provides specific fix suggestions for common MySQL error codes (1064/1054/1146/1062/1452)

## Quick Start

Trigger with natural language in any QoderWork conversation:

```
Upload my code to the server
Test the server connection
Run this SQL file
Sync files via FTP
```

## Config File Formats

The skill auto-detects the format. Examples:

```
# Freeform text (one value per line, blank line separates FTP and MySQL)
ftp://192.168.1.100:21
deploy_user
your_password

192.168.1.100:3306
db_user
db_password
my_database
```

```ini
# key=value format
ftp_host=192.168.1.100
ftp_port=21
ftp_user=deploy_user
ftp_pass=your_password

mysql_host=192.168.1.100
mysql_port=3306
mysql_user=db_user
mysql_pass=db_password
mysql_db=my_database
```

```json
{
  "ftp_host": "192.168.1.100",
  "ftp_user": "deploy_user",
  "ftp_pass": "your_password",
  "mysql_host": "192.168.1.100",
  "mysql_user": "db_user",
  "mysql_pass": "db_password",
  "mysql_db": "my_database"
}
```

**Remote directory**: If `ftp_path` / `remote_dir` is not specified, defaults to `/` (the current directory after FTP login).

## Workflow

```
Phase 1: Load credentials (memory first, then config file)
Phase 2: Test connectivity (read-only, safe)
Phase 3: Save to memory (cross-session reuse)
Phase 4: Deploy operations (write, requires user confirmation)
```

## Local Dependencies

Uses built-in system tools — no extra installation required:

| Tool | Purpose | Built-in on Windows |
|------|---------|-------------------|
| `curl` | FTP connectivity testing & file upload | Yes |
| `mysql` | MySQL connectivity testing & SQL execution | Requires MySQL Client |
| `ftp` | FTP fallback connection method | Yes |

## Installation

### Method 1: SkillHub

<a href="https://skillhub.cn/skills/server-autopilot" target="_blank">Open in SkillHub</a> and click **Install**.

### Method 2: Manual Install

Copy `server-autopilot/SKILL.md` to your QoderWork skills directory:

```
# Windows
%USERPROFILE%\.qoderworkcn\skills\server-autopilot\SKILL.md

# macOS / Linux
~/.qoderworkcn/skills/server-autopilot/SKILL.md
```

## Security

- Passwords are always masked as `****`, never shown in plain text
- Credentials are stored in QoderWork local memory only — not written to project files or git
- Say "clear credentials" to delete saved connection info at any time
- All write operations (uploads, SQL) require explicit user confirmation

## FAQ

<details>
<summary>FTP connection times out?</summary>
Check if the server firewall allows port 21. The skill will automatically try passive mode (<code>--ftp-pasv</code>).
</details>

<details>
<summary>MySQL says "Access denied"?</summary>
MySQL user privileges are usually bound to the source IP. You need to grant access on the MySQL server for your IP.
</details>

<details>
<summary>Upload succeeded but website didn't update?</summary>
Verify the remote directory path is correct. Check if the server has CDN or PHP OPcache enabled.
</details>

<details>
<summary>Config file format is messy, AI parsed it wrong?</summary>
The skill shows parsed results for your confirmation. Just tell the Agent which field is wrong and it will correct it.
</details>

## License

[MIT](../LICENSE)

---

<a id="中文说明"></a>

# Server Autopilot

> 从配置文件智能识别 FTP/MySQL 凭据，自动测试连通性，一键部署代码和执行 SQL。

一个 QoderWork Agent Skill，自动化服务器部署全流程 — 从凭据解析到 FTP 上传和 SQL 执行，所有写操作均需用户确认后方可执行。

## 功能

- **智能解析** — 支持 key=value、JSON、YAML、INI、自由文本等多种格式，自动提取 FTP 和 MySQL 连接信息
- **连通性测试** — 自动测试 FTP 和 MySQL 是否可达，只读操作，零风险
- **凭据记忆** — 连接成功后自动保存到 QoderWork memory，跨对话复用，无需重复提供配置文件
- **确认模式** — FTP 上传和 SQL 执行前强制弹出确认，展示操作详情，批准后才执行
- **SQL 诊断** — 遇到 SQL 错误时提供具体诊断建议，覆盖常见 MySQL 错误码（1064/1054/1146/1062/1452）

## 快速开始

在 QoderWork 对话中用自然语言触发：

```
帮我上传代码到服务器
测试一下服务器连接
帮我跑个SQL
同步文件到FTP
```

## 配置文件格式

Skill 自动识别格式，示例：

```
# 自由文本（每行一个值，空行分隔 FTP 和 MySQL）
ftp://192.168.1.100:21
deploy_user
your_password

192.168.1.100:3306
db_user
db_password
my_database
```

```ini
# key=value 格式
ftp_host=192.168.1.100
ftp_port=21
ftp_user=deploy_user
ftp_pass=your_password

mysql_host=192.168.1.100
mysql_port=3306
mysql_user=db_user
mysql_pass=db_password
mysql_db=my_database
```

```json
{
  "ftp_host": "192.168.1.100",
  "ftp_user": "deploy_user",
  "ftp_pass": "your_password",
  "mysql_host": "192.168.1.100",
  "mysql_user": "db_user",
  "mysql_pass": "db_password",
  "mysql_db": "my_database"
}
```

**远程目录**：如果不指定 `ftp_path` / `remote_dir`，默认为 `/`（FTP 登录后的当前目录）。

## 工作流程

```
Phase 1: 读取凭据（优先从 memory 加载，否则解析配置文件）
Phase 2: 测试连通性（只读，安全）
Phase 3: 保存到 memory（跨会话复用）
Phase 4: 部署操作（写操作，需用户确认）
```

## 本地依赖

使用系统自带工具，无需额外安装：

| 工具 | 用途 | Windows 自带 |
|------|------|-------------|
| `curl` | FTP 连接测试和文件上传 | 是 |
| `mysql` | MySQL 连接测试和 SQL 执行 | 需安装 MySQL Client |
| `ftp` | FTP 备选连接方式 | 是 |

## 安装

### 方式一：SkillHub

<a href="https://skillhub.cn/skills/server-autopilot" target="_blank">在 SkillHub 中打开</a>，点击 **安装** 即可。

### 方式二：手动安装

将 `server-autopilot/SKILL.md` 复制到 QoderWork 技能目录：

```
# Windows
%USERPROFILE%\.qoderworkcn\skills\server-autopilot\SKILL.md

# macOS / Linux
~/.qoderworkcn/skills/server-autopilot/SKILL.md
```

## 安全说明

- 密码始终以 `****` 遮盖显示，不会明文输出
- 凭据仅存储在 QoderWork 本地 memory 中，不写入项目文件或 git
- 说"清除凭据"可随时删除已保存的连接信息
- 所有写操作（上传、SQL）执行前必须用户确认

## 常见问题

<details>
<summary>FTP 连接超时？</summary>
检查服务器防火墙是否开放 21 端口，Skill 会自动尝试被动模式 <code>--ftp-pasv</code>。
</details>

<details>
<summary>MySQL 提示 Access denied？</summary>
MySQL 用户权限通常绑定来源 IP，需要在服务器端执行 <code>GRANT</code> 授权你的 IP。
</details>

<details>
<summary>上传成功但网站没更新？</summary>
确认远程目录路径是否正确，检查服务器是否有 CDN 或 PHP OPcache 缓存。
</details>

<details>
<summary>配置文件格式太乱，识别错了？</summary>
Skill 会展示识别结果让你确认，直接告诉 Agent 哪个字段错了即可修正。
</details>

<details>
<summary>配置文件里没写远程目录？</summary>
不指定时默认为 <code>/</code>，即 FTP 登录后的当前目录。如需上传到特定子目录，加一行如 <code>ftp_path=/www/site/</code>。
</details>

## 许可证

[MIT](../LICENSE)
