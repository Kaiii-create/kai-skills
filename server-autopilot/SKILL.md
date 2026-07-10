---
name: server-autopilot
description: 从配置文件智能识别 FTP/MySQL 凭据，自动测试连通性并按需复用。支持一键上传代码、部署网站、同步文件和执行 SQL，所有写操作均需用户确认。Use when deploying code, uploading files via FTP, running SQL remotely, testing server connectivity. 触发词：上传网站、同步代码、部署项目、跑SQL、测试服务器连接、FTP上传、发布代码、推送到服务器。
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

The agent will automatically load this skill, read your config file (or recall previously noted credentials), test connections, and guide you through the deployment step by step.

## Workflow Overview

```
Phase 1: Load credentials (recalled memory -> config file)
Phase 2: Test connectivity (read-only, safe)
Phase 3: Save non-secret metadata (for future sessions)
Phase 4: Deploy operations (write, requires confirmation)
```

---

## Cross-Platform Note

This skill is platform-agnostic. It describes capabilities, not specific tool names.

- "Persistent memory" means **whatever persistent-recall capability the current Agent platform provides** (for example a built-in memory store, project notes, or a user-managed file). Do not assume a specific tool name such as `memory_search` or `memory action=replace` exists.
- "User confirmation" means **whatever confirmation mechanism the current Agent platform provides** (for example a built-in approval prompt, an inline yes/no question, or a UI dialog). Do not assume a specific tool name such as `AskUserQuestion` exists.
- If the platform provides **no persistent memory**, credentials may be used only within the current session and must be re-read from the config file in the next session.
- If the platform provides **no confirmation mechanism**, the agent MUST ask the user inline (plain text question) and wait for an explicit reply before any write operation.
- Do not assume all Agent platforms offer the same tool names. Map the capabilities below to the tools that are actually available in the current environment.

---

## Phase 1: Load Credentials

### Step 1.1 — Check recalled memory first

Use the platform's persistent-recall capability (whatever it is called locally) to look for previously saved server metadata:

- Query for an entry tagged `[server-autopilot]` containing FTP/MySQL host, port, username, remote dir, and database name.
- Passwords are NOT recalled from memory by default (see Phase 3). The agent should expect to re-read the password from the config file each session, unless the user has explicitly opted in to saving passwords.
- If non-secret metadata is found -> show the user a summary (mask any password with `****`) and ask: "I found saved connection info. Use it (you'll still need to provide the password), or re-read everything from file?"
- If nothing is found -> proceed to Step 1.2

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

Test connections using read-only commands. These are safe and require no confirmation. Report results clearly.

### FTP connectivity test

Prefer SFTP or FTPS where available. Plain FTP transmits credentials and data in cleartext — if the server only supports plain FTP, you MUST warn the user before proceeding:

> ⚠️ Plain FTP is an unencrypted protocol. Credentials and file contents will be transmitted in cleartext. Prefer SFTP/FTPS if the server supports it.

Use `curl --user` so the password is not embedded in the URL. Do NOT echo the full command (including the password) back to the user, and do NOT let it land in shell history.

```bash
curl -s -o /dev/null -w "HTTP_CODE:%{http_code}" --connect-timeout 10 \
  --user "USER:PASS" ftp://HOST:PORT/
```

To keep the password out of shell history on POSIX shells, prefix with a leading space (if `HISTCONTROL` allows) or set the password via a shell variable passed through the environment:

```bash
FTP_USER="deploy_user" FTP_PASS='****' curl -s -o /dev/null -w "HTTP_CODE:%{http_code}" \
  --connect-timeout 10 --user "$FTP_USER:$FTP_PASS" ftp://HOST:PORT/
unset FTP_USER FTP_PASS
```

If `curl` is unavailable, fall back to a manual ftp session (same masking rules apply):

```bash
ftp -n -v HOST PORT <<EOF
user USER PASS
quit
EOF
```

### MySQL connectivity test

Do NOT pass the password on the command line (`-p'PASS'` is visible in process listings and shell history). Use a temporary defaults file with permission `0600`, or the `MYSQL_PWD` environment variable, and delete the temp file immediately afterwards.

```bash
# Generate a temporary defaults file (permission 0600)
MYSQLDefaultsFile=$(mktemp)
chmod 0600 "$MYSQLDefaultsFile"
cat > "$MYSQLDefaultsFile" <<EOF
[client]
host=HOST
port=PORT
user=USER
password=PASS
EOF

mysql --defaults-extra-file="$MYSQLDefaultsFile" -e "SELECT 1 AS connection_test;" --connect-timeout=10

rm -f "$MYSQLDefaultsFile"
```

Never log the contents of the defaults file. Never echo the password to stdout, logs, or the user.

### Report results

```
Connectivity test results:

FTP  (192.168.1.100:21)  -> OK Connected
MySQL (192.168.1.100:3306) -> FAIL: Access denied for user 'root'

Please check the failed credentials and try again.
```

If any test fails, stop and ask the user to correct credentials. Do NOT proceed to Phase 4 until all required connections pass.

---

## Phase 3: Save Non-Secret Metadata

After successful connectivity tests, optionally save connection metadata using the platform's persistent-recall capability (whatever it is called locally).

**Default policy — secrets are NOT persisted:**

- Save ONLY non-secret fields: `host`, `port`, `username`, `remote_dir`, `database`, and a tag like `[server-autopilot]`.
- Do NOT save passwords by default. The user will be asked to re-enter the password (or re-read it from the config file) in the next session.
- Only if the user explicitly opts in (e.g. replies "yes, save the password too") may the password be stored — and only via the most secure mechanism the platform offers:
  - Prefer the operating system keychain / secret storage (macOS Keychain, Windows Credential Manager, libsecret on Linux) if the platform exposes it.
  - If no secret storage is available and the user still insists, store the password in the platform's memory — but explicitly warn the user that it may be synced, exported, or readable by other processes depending on the platform.

**Do NOT claim that all platforms' memory is local, encrypted, or never synced.** Memory behavior is platform-dependent. State plainly what is known and what is not.

When saving, use whatever update/replace capability the platform provides (e.g. an edit/replace operation on a stored note). If the platform only supports append, deduplicate by the `[server-autopilot]` tag when reading.

If the platform provides no persistent memory at all, skip this phase — credentials will be used only in the current session.

---

## Phase 4: Deploy Operations (Confirmation Required)

**HARD RULE: Every write operation requires explicit user confirmation before execution. Use whatever confirmation mechanism the current Agent platform provides. If the platform provides no built-in confirmation tool, ask the user inline in plain text and wait for an explicit reply. No exceptions.**

Read-only operations (connectivity tests, `SHOW TABLES`, `SHOW COLUMNS`, `ls` of a remote dir) do NOT require confirmation.

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

Ask the user to confirm with one of:
- "Confirm upload" / "Preview only" / "Cancel"

**Upload commands** — use `curl --user` so the password is not embedded in the URL. Do NOT echo the full command back to the user, and keep the password out of shell history.

Single file:
```bash
curl --user "USER:PASS" -T "local_file" ftp://HOST:PORT/REMOTE_PATH/
```

Directory (recursive — use a loop):
```bash
for file in $(find LOCAL_DIR -type f); do
  relative="${file#LOCAL_DIR/}"
  curl --ftp-create-dirs --user "USER:PASS" -T "$file" "ftp://HOST:PORT/REMOTE_DIR/$relative"
done
```

On Windows (PowerShell) — pass credentials via variables so they are not in the command line:
```powershell
$ftpUser = "USER"
$ftpPass = "PASS"
Get-ChildItem -Recurse -File "LOCAL_DIR" | ForEach-Object {
    $relative = $_.FullName.Substring("LOCAL_DIR".Length).Replace("\","/")
    curl.exe --ftp-create-dirs --user "$($ftpUser):$($ftpPass)" -T $_.FullName "ftp://HOST:PORT/REMOTE_DIR/$relative"
}
Remove-Variable ftpUser, ftpPass
```

After upload, list the remote directory to verify (same masking rules):
```bash
curl -s --user "USER:PASS" ftp://HOST:PORT/REMOTE_DIR/
```

### 4B — SQL Execution

Before executing, present the SQL content and target:

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

Ask the user to confirm with one of:
- "Execute SQL" / "Dry run (explain only)" / "Cancel"

**Execution command** — use a temporary defaults file (permission 0600) instead of `-p'PASS'`. Delete it immediately afterwards.

From string:
```bash
MYSQLDefaultsFile=$(mktemp)
chmod 0600 "$MYSQLDefaultsFile"
cat > "$MYSQLDefaultsFile" <<EOF
[client]
host=HOST
port=PORT
user=USER
password=PASS
EOF

mysql --defaults-extra-file="$MYSQLDefaultsFile" DATABASE -e "SQL_STATEMENT"

rm -f "$MYSQLDefaultsFile"
```

From file:
```bash
MYSQLDefaultsFile=$(mktemp)
chmod 0600 "$MYSQLDefaultsFile"
cat > "$MYSQLDefaultsFile" <<EOF
[client]
host=HOST
port=PORT
user=USER
password=PASS
EOF

mysql --defaults-extra-file="$MYSQLDefaultsFile" DATABASE < "path/to/file.sql"

rm -f "$MYSQLDefaultsFile"
```

Always capture and display the result. Never log the defaults file contents.

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
3. **Offer to run a diagnostic query** (read-only, no confirmation needed). Use the same defaults-file approach:
   ```bash
   MYSQLDefaultsFile=$(mktemp)
   chmod 0600 "$MYSQLDefaultsFile"
   cat > "$MYSQLDefaultsFile" <<EOF
   [client]
   host=HOST
   port=PORT
   user=USER
   password=PASS
   EOF

   mysql --defaults-extra-file="$MYSQLDefaultsFile" DATABASE -e "SHOW TABLES; SHOW COLUMNS FROM problematic_table;"

   rm -f "$MYSQLDefaultsFile"
   ```
4. **Present the corrected SQL** and ask for explicit confirmation before re-executing
5. **Do NOT auto-retry** — always let the user review and approve the fix. A modified SQL statement is a new write operation and requires fresh confirmation.

---

## Credential Cleanup

When the user says "clear credentials" (or "清除凭据"):

1. Use the platform's persistent-recall capability to locate the `[server-autopilot]` entry.
2. Remove the entry using whatever delete/remove operation the platform provides.
3. If a password was saved to the OS keychain / secret storage, remove it there too.
4. Confirm to the user: "Server connection info has been cleared."

If the platform provides no persistent memory, simply tell the user that nothing was persisted and credentials were only held in-session.

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
A: 默认情况下密码不会跨会话保存，每次新会话都需要重新提供密码（或重新读取配置文件）。非秘密信息（host、port、username、远程目录、数据库名）如果当前平台支持持久化记忆则会保留；如果不支持，则所有信息都仅在当前会话有效。重新提供配置文件即可，Skill 会重新解析。说"清除凭据"可以手动重置已保存的非秘密信息。

**Q: SQL 文件太大，执行超时怎么办？**
A: 对于大型 SQL 文件，建议：1) 拆分文件，分批执行；2) 增加 MySQL 的 `max_allowed_packet` 和 `net_read_timeout` 参数；3) 在服务器本地执行而不是远程连接执行。

**Q: 配置文件里没写远程目录怎么办？**
A: 不指定时默认是 `/`，也就是 FTP 登录后所在的当前目录（通常是用户主目录或网站根目录，取决于服务器配置）。如果需要上传到特定子目录，在配置文件里加一行如 `ftp_path=/www/site/` 即可。

**Q: 只想测试连接，不想上传或执行 SQL？**
A: 没问题。Skill 分阶段执行，Phase 1-2（读取凭据 + 测试连通性）是只读操作，完全安全。测试完你可以随时停止，不会执行任何写操作。

**Q: 我想让 Agent 记住密码，下次免输入？**
A: 默认不保存密码。如果你明确同意保存，Agent 会优先使用系统钥匙串（如 macOS Keychain、Windows Credential Manager）；若平台无此能力，则按你确认的方式存入平台记忆。注意：是否本地存储、是否加密、是否同步取决于具体平台，请按平台文档判断风险。

---

## Security Reminders

- Never echo passwords in plain text to the user; always mask with `****`
- Never write credentials to project files, logs, or git-tracked files
- Never put passwords on the command line (`-p'PASS'` or `ftp://USER:PASS@HOST/`) — they are visible in process listings and shell history
- For MySQL, prefer a temporary `--defaults-extra-file` with permission `0600`, deleted immediately after use; or the `MYSQL_PWD` environment variable
- For FTP, prefer `curl --user "USER:PASS"` (or SFTP/FTPS) and keep the password out of shell history
- Passwords are NOT persisted by default. Only non-secret metadata is saved.
- Do not claim that the platform's memory is always local, encrypted, or never synced — this is platform-dependent
- Remind users to clear saved credentials when working on shared machines
