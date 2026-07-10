# Server Autopilot

**[English](README.md)**

> 从配置文件智能识别 FTP/MySQL 凭据，自动测试连通性，一键部署代码和执行 SQL。

一个 Agent Skill，自动化服务器部署全流程 — 从凭据解析到 FTP 上传和 SQL 执行，所有写操作均需用户确认后方可执行。

## 功能

- **智能解析** — 支持 key=value、JSON、YAML、INI、自由文本等多种格式，自动提取 FTP 和 MySQL 连接信息
- **连通性测试** — 自动测试 FTP 和 MySQL 是否可达，只读操作，零风险
- **凭据记忆** — 连接成功后自动保存到本地 memory，跨对话复用，无需重复提供配置文件
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

将 `server-autopilot/SKILL.md` 复制到技能目录：

```
# Windows
%USERPROFILE%\.qoderworkcn\skills\server-autopilot\SKILL.md

# macOS / Linux
~/.qoderworkcn/skills/server-autopilot/SKILL.md
```

## 安全说明

- 密码始终以 `****` 遮盖显示，不会明文输出
- 凭据仅存储在本地 memory 中，不写入项目文件或 git
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
