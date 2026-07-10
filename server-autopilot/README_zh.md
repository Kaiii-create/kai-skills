# Server Autopilot

**[English](README.md)**

> 从配置文件智能识别 FTP/MySQL 凭据，自动测试连通性，一键部署代码和执行 SQL。

一个 Agent Skill，自动化服务器部署全流程 — 从凭据解析到 FTP 上传和 SQL 执行，所有写操作均需用户确认后方可执行。

## 功能

- **智能解析** — 支持 key=value、JSON、YAML、INI、自由文本等多种格式，自动提取 FTP 和 MySQL 连接信息
- **连通性测试** — 自动测试 FTP 和 MySQL 是否可达，只读操作，零风险
- **凭据按需复用** — 连接成功后可按需保存非秘密信息，用户授权后可保存密码，跨会话复用
- **确认模式** — FTP 上传和 SQL 执行前强制弹出确认，展示操作详情，批准后才执行
- **SQL 诊断** — 遇到 SQL 错误时提供具体诊断建议，覆盖常见 MySQL 错误码（1064/1054/1146/1062/1452）

## 快速开始

在对话中用自然语言触发：

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
Phase 3: 保存非秘密信息到 memory（密码需用户同意才保存）
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

### 方式一：npx（推荐）

```bash
npx @kaiii-create/kai-skills install server-autopilot -t codex
```

### 方式二：SkillHub（备选）

<a href="https://skillhub.cn/skills/server-autopilot" target="_blank">在 SkillHub 中打开</a>，点击 **安装** 即可。

## 安全说明

- 密码不再通过命令行参数传递 —— MySQL 使用 defaults file（`--defaults-extra-file`），FTP 使用 `curl --user`
- 默认只持久化保存非秘密信息（host/port/user/remote_dir/database），密码仅在用户明确同意后才保存
- 不得宣称所有平台 memory 都是本地/加密/不同步，需以运行平台实际行为为准
- 优先推荐 SFTP/FTPS；普通 FTP 为明文传输，必须提示风险
- 不得把密码写入 Shell 历史
- 日志必须脱敏（密码以 `****` 遮盖）
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
