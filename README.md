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

User-level skills are available across projects. Copy the complete skill directory into `~/.codex/skills/`:

```bash
git clone https://github.com/Kaiii-create/kai-skills.git
mkdir -p ~/.codex/skills
cp -R kai-skills/server-autopilot ~/.codex/skills/
```

Start a new Codex session after installation and describe the task in natural language. You can also invoke the skill explicitly by name.

### Codex: Project-level installation

To share a skill with collaborators in a repository, place it under the project's `.codex/skills/` directory and commit it to Git:

```bash
mkdir -p .codex/skills
cp -R /path/to/kai-skills/server-autopilot .codex/skills/
```

Official Codex documentation: [Agent Skills](https://developers.openai.com/codex/skills)

### SkillHub

You can also open the skill page and follow the platform's installation instructions:

[Open server-autopilot in SkillHub](https://skillhub.cn/skills/server-autopilot)

### Other agent platforms

If a platform supports the `SKILL.md` format, you can usually copy the complete skill directory into that platform's skills directory. Consult the platform's documentation and verify that it supports the tools, confirmation flow, and persistence features required by the skill.

## Usage Examples

After installing `server-autopilot`, try:

```text
Test the server connection
Upload my code to the server
Run this SQL file
Sync files via FTP
```

See the [server-autopilot documentation](./server-autopilot/README.md) for configuration formats, dependencies, and security notes.

## Repository Structure

```text
kai-skills/
├── README.md
├── README_zh.md
├── LICENSE
└── server-autopilot/
    ├── SKILL.md
    ├── README.md
    └── README_zh.md
```

Each skill lives in its own directory:

- `SKILL.md`: required skill definition and instructions
- `README.md`: optional English documentation
- `README_zh.md`: optional Chinese documentation
- `scripts/`, `references/`, and `assets/`: optional supporting resources

Copy the complete skill directory when installing so that supporting resources are not omitted.

## Compatibility

- The skill format is portable, but agent platforms do not necessarily expose identical tools or safety controls.
- If a platform lacks a required tool, the agent may need an alternative approach or user assistance.
- For server, filesystem, or database writes, review the execution plan and authorize the action only after confirming the target and scope.
- Validate skills in a test environment before using them in production.

## Contributing

Issues and pull requests are welcome. Put each new skill in its own directory and include at least a valid `SKILL.md`.

## License

[MIT](LICENSE)
