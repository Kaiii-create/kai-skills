# Kai Agent Skills

**[中文](README_zh.md)**

A collection of reusable Agent Skills for automating everyday development and operations workflows.

These skills follow a portable directory structure centered on `SKILL.md` and have been tested on multiple compatible agent platforms. This guide uses **OpenAI Codex** as the primary installation example; installation paths, tool names, and permission models may differ on other platforms.

## Available Skills

| Skill | Description | Status |
|-------|-------------|--------|
| [server-autopilot](./server-autopilot/) | Parse FTP/MySQL credentials, test connectivity, and upload code or execute SQL after user confirmation | Stable |

> More skills are coming. Star & Watch the repository to stay updated.

## Installation

### One-line install via npx (recommended)

```bash
# Install a single skill to Codex
npx @kaiii-create/kai-skills install server-autopilot -t codex

# Install a single skill to multiple platforms
npx @kaiii-create/kai-skills install server-autopilot -t codex,claude

# Install ALL skills to a specific platform
npx @kaiii-create/kai-skills install all -t claude

# Auto-detect installed AI tools and install to all of them
npx @kaiii-create/kai-skills install all --auto

# Project-level install (into the current directory, commit-friendly)
npx @kaiii-create/kai-skills install all -t codex --project
```

Supported platforms (`-t` / `--target`):

| Platform | User-level dir | Project-level dir |
|----------|----------------|-------------------|
| `codex` | `~/.agents/skills/` | `./.agents/skills/` |
| `claude` | `~/.claude/skills/` | `./.claude/skills/` |
| `cursor` | `~/.cursor/skills/` | `./.cursor/skills/` |
| `trae` | `~/.trae/skills/` | `./.trae/skills/` |
| `qoder` | `~/.agents/skills/` | `./.agents/skills/` (needs OpenSkills) |
| `copilot` | `~/.github/skills/` | `./.github/skills/` |

> Each platform reads its own dedicated skills directory. Only `codex` uses the cross-platform `~/.agents/skills/` standard from [agentskills.io](https://agentskills.io/). `qoder` does not read a skills directory directly — user-level installs will not take effect automatically. It is recommended to install at the project root with `--project`, then run `npx openskills install .` to register the skill into `AGENTS.md`.

Other commands:

```bash
npx @kaiii-create/kai-skills list                # list available skills
npx @kaiii-create/kai-skills list --installed    # list skills already installed on this machine
npx @kaiii-create/kai-skills --help
```

### Manual install (git clone)

User-level skills are available across projects. Copy the complete skill directory into `~/.agents/skills/`:

```bash
git clone https://github.com/Kaiii-create/kai-skills.git
mkdir -p ~/.agents/skills
cp -R kai-skills/server-autopilot ~/.agents/skills/
```

Start a new Codex session after installation and describe the task in natural language. You can also invoke the skill explicitly by name.

To share a skill with collaborators in a repository, place it under the project's `.agents/skills/` directory and commit it to Git:

```bash
mkdir -p .agents/skills
cp -R /path/to/kai-skills/server-autopilot .agents/skills/
```

Official Codex documentation: https://developers.openai.com/codex/skills
