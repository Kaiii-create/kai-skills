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

### Codex: User-level installation

User-level skills are available across projects. Copy the complete skill directory into `~/.agents/skills/`:

```bash
git clone https://github.com/Kaiii-create/kai-skills.git
mkdir -p ~/.agents/skills
cp -R kai-skills/server-autopilot ~/.agents/skills/
```

Start a new Codex session after installation and describe the task in natural language. You can also invoke the skill explicitly by name.

### Codex: Project-level installation

To share a skill with collaborators in a repository, place it under the project's `.agents/skills/` directory and commit it to Git:

```bash
mkdir -p .agents/skills
cp -R /path/to/kai-skills/server-autopilot .agents/skills/
```

Official Codex documentation: https://developers.openai.com/codex/skills
