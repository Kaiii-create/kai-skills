# Kai Agent Skills

**[中文](README_zh.md)**

A collection of practical Agent Skills designed to automate everyday development and operations workflows.

## Available Skills

| Skill | Description | Status |
|-------|-------------|--------|
| [server-autopilot](./server-autopilot/) | Smart FTP/MySQL credential parsing, connectivity testing, one-click code deployment and SQL execution | Stable |

> More skills coming soon. Star & Watch to stay updated.

## Installation

### Method 1: SkillHub

Visit the skill page and click **Install**:

<a href="https://skillhub.cn/skills/server-autopilot" target="_blank">Open in SkillHub</a>

### Method 2: Manual Install

Copy the `SKILL.md` file from the skill directory into your QoderWork skills folder:

```
# Windows
%USERPROFILE%\.qoderworkcn\skills\<skill-name>\SKILL.md

# macOS / Linux
~/.qoderworkcn/skills/<skill-name>/SKILL.md
```

## Repository Structure

```
kai-skills/
├── README.md
├── README_zh.md
├── LICENSE
└── server-autopilot/
    ├── SKILL.md
    ├── README.md
    └── README_zh.md
```

Each skill lives in its own directory with a `SKILL.md` (required) and optional `README.md` / `README_zh.md` for bilingual documentation.

## Contributing

Issues and pull requests are welcome.

## License

[MIT](LICENSE)
