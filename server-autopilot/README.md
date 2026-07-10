# Server Autopilot

**[中文](README_zh.md)**

> Intelligently parse FTP/MySQL credentials from config files, auto-test connectivity, and deploy code with one click.

An Agent Skill that automates server deployment workflows — from credential parsing to FTP upload and SQL execution, with mandatory user confirmation before any write operation.

## Features

- **Smart Parsing** — Supports key=value, JSON, YAML, INI, and freeform text; automatically extracts FTP and MySQL connection info
- **Connectivity Testing** — Tests FTP and MySQL reachability with read-only operations, zero risk
- **Credential Memory** — Saves credentials to local memory after successful connection; reuse across sessions
- **Confirmation Mode** — Requires explicit user approval before FTP uploads and SQL execution, with full operation preview
- **SQL Diagnostics** — Provides specific fix suggestions for common MySQL error codes (1064/1054/1146/1062/1452)

## Quick Start

Trigger with natural language in any conversation:

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

Copy `server-autopilot/SKILL.md` to your skills directory:

```
# Windows
%USERPROFILE%\.qoderworkcn\skills\server-autopilot\SKILL.md

# macOS / Linux
~/.qoderworkcn/skills/server-autopilot/SKILL.md
```

## Security

- Passwords are always masked as `****`, never shown in plain text
- Credentials are stored in local memory only — not written to project files or git
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
