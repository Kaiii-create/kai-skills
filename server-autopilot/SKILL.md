---
name: server-autopilot
description: 从配置文件智能识别 FTP/MySQL 凭据，自动测试连通性并持久化记忆。支持一键上传代码、部署网站、同步文件和执行 SQL，所有写操作均需用户确认。Use when deploying code, uploading files via FTP, running SQL remotely, testing server connectivity. 触发词：上传网站、同步代码、部署项目、跑SQL、测试服务器连接、FTP上传、发布代码、推送到服务器。
---

# Server Autopilot

Read connection credentials from a user-provided file, test FTP and MySQL connectivity, then optionally upload code and execute SQL — with confirmation required before any write operation.

## Quick Start — How to Trigger

Just say any of these in natural language:

- "帮我上传代码到服务器" / "上传网站" / "发布代码"
- "测试一下服务器连接" / "FTP能不能连上"
- "帮我跑个SQL" / "执行这个SQL文件"
- "同步文件到FTP" / "推送到服务器"
- "deploy my code" / "upload to server" / "run SQL"

The agent will automatically load this skill, read your config file (or recall saved credentials), test connections, and guide you through the deployment step by step.

## Workflow Overview

```
Phase 1: Load credentials (memory -> config file)
Phase 2: Test connectivity (read-only, safe)
Phase 3: Save to memory (for future sessions)
Phase 4: Deploy operations (write, requires confirmation)
```

---

## Phase 1: Load Credentials

### Step 1.1 — Check memory first

Use `memory_search` to look for previously saved server credentials:

```
memory_search query="server-autopilot ftp mysql connection credentials"
```

- If found -> show user a summary (mask passwords: `****`) and ask: "I found saved credentials. Use them, or re-read from file?"
- If not found -> proceed to Step 1.2

### Step 1.2 — Read config file

Ask the user for the config file path if not provided. Then read and parse it.

**Smart parsing rules** — the agent must identify these fields regardless of format:

| Field | Common Keys |
|-------|------------|
| FTP host | `ftp_host`, `ftp_server`, `ftp_url`, `host`, `server`, `地址`, `主机` |
| FTP port | `ftp_port`, `port` (default: 21) |
| FTP user | `ftp_user`, `ftp_username`, `user`, `用户名`, `账号` |
| FTP pass | `ftp_pass`, `ftp_password`, `password`, `pass`, `密码` |
| FTP remote dir | `ftp_path`, `ftp_dir`, `remote_dir`, `upload_dir`, `远程目录` (default: `/` — FTP 登录后所在的当前目录) |
| MySQL host | `mysql_host`, `db_host`, `database_host`, `数据库地址` |
| MySQL port | `mysql_port`, `db_port` (default: 3306) |
| MySQL user | `mysql_user`, `db_user`, `database_user`, `数据库用户` |
| MySQL pass | `mysql_pass`, `db_pass`, `database_password`, `数据库密码` |
| MySQL database | `mysql_db`, `db_name`, `database`, `数据库名` |

**Supported formats** — detect and parse automatically:

- **key=value** (`ftp_host=1.2.3.4`)
- **JSON** (`{"ftp_host": "1.2.3.4"}`)
- **YAML** (`ftp_host: 1.2.3.4`)
- **INI sections** (`[ftp]` / `[mysql]`)
- **Freeform text** — use context to infer; if ambiguous, list candidates and ask user to confirm

### Step 1.3 — Present parsed result

Show the user a clean summary with passwords masked:

```
Parsed credentials:

FTP:
  Host: 192.168.1.100:21
  User: deploy_user
  Pass: ****
  Remote dir: /www/site/ (未指定时默认为 / — FTP 当前目录)

MySQL:
  Host: 192.168.1.100:3306
  User: root
  Pass: ****
  Database: myapp

Correct? Or need to adjust?
```

Wait for user confirmation before proceeding.

---

## Phase 2: Test Connectivity

Test connections using read-only commands. Report results clearly.

### FTP connectivity test

```bash
curl -s -o /dev/null -w "HTTP_CODE:%{http_code}" --connect-timeout 10 ftp://USER:PASS@HOST:PORT/
```

If `curl` fails or is unavailable, fall back to a manual ftp session:

```bash
echo "QUIT" | ftp -n -v HOST PORT <<EOF
user USER PASS
quit
EOF
```

### MySQL connectivity test

```bash
mysql -h HOST -P PORT -u USER -p'PASS' -e "SELECT 1 AS connection_test;" --connect-timeout=10
```

### Report results

```
Connectivity test results:

FTP  (192.168.1.100:21)  -> OK Connected
MySQL (192.168.1.100:3306) -> FAIL: Access denied for user 'root'

Please check the failed credentials and try again.
```

If any test fails, stop and ask the user to correct credentials. Do NOT proceed to Phase 4 until all required connections pass.

---

## Phase 3: Save to Memory

After successful connectivity tests, save credentials using the memory tool:

```
memory action=replace (or add) target=memory
content: "[server-autopilot] FTP: host=HOST port=PORT user=USER pass=PASS remote_dir=DIR | MySQL: host=HOST port=PORT user=USER pass=PASS db=DB"
```

Use `old_text="[server-autopilot]"` for updates. This ensures credentials persist across sessions.

**Security**: Always store credentials in memory (not in project files). Remind the user that credentials are stored locally and can be cleared by asking "clear server-autopilot credentials".

---

## Phase 4: Deploy Operations (Confirmation Required)

**HARD RULE: Every write operation requires explicit user confirmation via AskUserQuestion before execution. No exceptions.**

### 4A — FTP Upload

Before uploading, present a detailed plan:

```
FTP Upload Plan:

Source (local):  ./dist/
Target (remote): /www/site/dist/
Files to upload: 12 files (total 3.4 MB)

File list:
  dist/index.html
  dist/app.js
  dist/style.css
  ...

Action: Upload all files via FTP to 192.168.1.100
```

Use AskUserQuestion to confirm:
- "Confirm upload" / "Preview only" / "Cancel"

**Upload commands**:

Single file:
```bash
curl -T "local_file" ftp://USER:PASS@HOST:PORT/REMOTE_PATH/
```

Directory (recursive — use a loop):
```bash
for file in $(find LOCAL_DIR -type f); do
  relative="${file#LOCAL_DIR/}"
  curl --ftp-create-dirs -T "$file" "ftp://USER:PASS@HOST:PORT/REMOTE_DIR/$relative"
done
```

On Windows (PowerShell):
```powershell
Get-ChildItem -Recurse -File "LOCAL_DIR" | ForEach-Object {
    $relative = $_.FullName.Substring("LOCAL_DIR".Length).Replace("\","/")
    curl.exe --ftp-create-dirs -T $_.FullName "ftp://USER:PASS@HOST:PORT/REMOTE_DIR/$relative"
}
```

After upload, list remote directory to verify:
```bash
curl -s ftp://USER:PASS@HOST:PORT/REMOTE_DIR/
```

### 4B — SQL Execution

Before executing, present the SQL content:

```
SQL Execution Plan:

Target: MySQL 192.168.1.100:3306 / myapp

SQL to execute:
---
ALTER TABLE users ADD COLUMN avatar VARCHAR(255);
UPDATE users SET avatar = 'default.png' WHERE avatar IS NULL;
---

Warning: This will modify table structure and update 150 rows.
```

Use AskUserQuestion to confirm:
- "Execute SQL" / "Dry run (explain only)" / "Cancel"

**Execution command**:

From string:
```bash
mysql -h HOST -P PORT -u USER -p'PASS' DATABASE -e "SQL_STATEMENT"
```

From file:
```bash
mysql -h HOST -P PORT -u USER -p'PASS' DATABASE < "path/to/file.sql"
```

Always capture and display the output:
```
SQL executed successfully.
Rows affected: 150
```

---

## Error Handling

| Error | Action |
|-------|--------|
| Config file not found | Ask user for correct path |
| Cannot parse credentials | Show raw content, ask user to point out credentials |
| FTP connection timeout | Check firewall, try passive mode: `curl --ftp-pasv` |
| MySQL access denied | Suggest checking user privileges and host whitelist |
| Upload fails mid-way | List already-uploaded files, ask to resume or retry |
| SQL syntax error | See detailed diagnosis below |

### SQL Error Diagnosis

When SQL execution fails, follow these steps:

1. **Show the full MySQL error message** — it usually contains error code and line number
2. **Identify the error type**:
   - `ERROR 1064 (Syntax error)` — highlight the problematic clause, suggest corrected SQL
   - `ERROR 1054 (Unknown column)` — check if column name has typos, suggest `SHOW COLUMNS FROM table`
   - `ERROR 1146 (Table doesn't exist)` — suggest `SHOW TABLES` to verify table name
   - `ERROR 1062 (Duplicate entry)` — explain the unique constraint conflict, suggest `ON DUPLICATE KEY UPDATE`
   - `ERROR 1452 (Foreign key constraint)` — explain the reference issue, suggest checking parent table
3. **Offer to run a diagnostic query** (read-only, no confirmation needed):
   ```bash
   mysql -h HOST -P PORT -u USER -p'PASS' DATABASE -e "SHOW TABLES; SHOW COLUMNS FROM problematic_table;"
   ```
4. **Present the corrected SQL** and ask for confirmation before re-executing
5. **Do NOT auto-retry** — always let the user review and approve the fix

---

## Credential Cleanup

When user says "clear credentials":

```
memory_search query="server-autopilot ftp mysql"
```

Then remove the entry:
```
memory action=remove target=memory old_text="[server-autopilot]..."
```

Confirm to user: "Server credentials have been cleared from memory."

---

## Troubleshooting FAQ

**Q: FTP 连接超时怎么办？**
A: 通常是防火墙或网络问题。按顺序检查：1) 服务器是否开放了 21 端口；2) 服务器防火墙是否放行了你的 IP；3) 尝试被动模式（Skill 会自动尝试 `curl --ftp-pasv`）；4) 确认服务器 FTP 服务是否正在运行。

**Q: MySQL 提示 "Access denied" 或 "Host not allowed"？**
A: MySQL 的用户权限通常绑定了来源 IP。需要在 MySQL 服务器上执行 `GRANT ALL ON db.* TO 'user'@'your_ip' IDENTIFIED BY 'password';` 来授权你的 IP。也可能是密码错误，先确认密码是否正确。

**Q: 上传成功但网站没有更新？**
A: 检查以下几点：1) 上传的远程目录是否正确（确认 `remote_dir` 是网站的根目录）；2) 服务器是否有缓存（如 CDN 或 PHP OPcache），需要手动清除；3) 文件权限是否正确（通常需要 644 或 755）。

**Q: 配置文件格式太乱，AI 识别错了怎么办？**
A: Skill 会展示识别结果让你确认。如果发现错误，直接告诉 Agent 哪个字段识别错了，它会修正。也可以把配置文件整理成 `key=value` 格式再重新读取。

**Q: 跨对话后凭据失效了？**
A: 凭据存储在 QoderWork 本地 memory 中，正常情况下跨对话不会丢失。如果失效，可能是 memory 被清理了。重新提供配置文件即可，Skill 会重新解析并保存。说"清除凭据"可以手动重置。

**Q: SQL 文件太大，执行超时怎么办？**
A: 对于大型 SQL 文件，建议：1) 拆分文件，分批执行；2) 增加 MySQL 的 `max_allowed_packet` 和 `net_read_timeout` 参数；3) 在服务器本地执行而不是远程连接执行。

**Q: 配置文件里没写远程目录怎么办？**
A: 不指定时默认是 `/`，也就是 FTP 登录后所在的当前目录（通常是用户主目录或网站根目录，取决于服务器配置）。如果需要上传到特定子目录，在配置文件里加一行如 `ftp_path=/www/site/` 即可。

**Q: 只想测试连接，不想上传或执行 SQL？**
A: 没问题。Skill 分阶段执行，Phase 1-2（读取凭据 + 测试连通性）是只读操作，完全安全。测试完你可以随时停止，不会执行任何写操作。

---

## Security Reminders

- Never echo passwords in plain text to the user; always mask with `****`
- Never write credentials to project files, logs, or git-tracked files
- Credentials are stored in QoderWork local memory only
- Remind users to clear credentials when working on shared machines
