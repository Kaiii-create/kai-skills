#!/usr/bin/env node
'use strict';

// kai-skills — Agent Skills 安装器
// 零依赖,仅使用 Node 内置模块

const fs = require('fs');
const path = require('path');
const os = require('os');

// ===== 平台目录映射表(2026-07 检索确认)=====
// 用户级 ~/.xxx/skills  |  项目级 ./.xxx/skills
// 各平台实际读取的目录(已对照官方文档/教程核实):
//   codex   → ~/.agents/skills     (OpenAI 官方文档确认,走 agentskills.io 标准)
//   claude  → ~/.claude/skills     (Anthropic 自家格式)
//   cursor  → ~/.cursor/skills     (内置 skill 在 ~/.cursor/skills-cursor/,用户装的在 ~/.cursor/skills/)
//   trae    → ~/.trae/skills       (字节官方教程确认,专属目录)
//   qoder   → 靠 OpenSkills 写 AGENTS.md,不读独立 skills 目录
//   copilot → ~/.github/skills     (GitHub 生态)
const PLATFORMS = {
  codex: {
    label: 'Codex (OpenAI)',
    user: () => path.join(os.homedir(), '.agents', 'skills'),
    project: () => path.join(process.cwd(), '.agents', 'skills'),
    detect: () => path.join(os.homedir(), '.agents'),
  },
  claude: {
    label: 'Claude Code',
    user: () => path.join(os.homedir(), '.claude', 'skills'),
    project: () => path.join(process.cwd(), '.claude', 'skills'),
    detect: () => path.join(os.homedir(), '.claude'),
  },
  cursor: {
    label: 'Cursor',
    user: () => path.join(os.homedir(), '.cursor', 'skills'),
    project: () => path.join(process.cwd(), '.cursor', 'skills'),
    detect: () => path.join(os.homedir(), '.cursor'),
  },
  trae: {
    label: 'Trae',
    user: () => path.join(os.homedir(), '.trae', 'skills'),
    project: () => path.join(process.cwd(), '.trae', 'skills'),
    detect: () => path.join(os.homedir(), '.trae'),
  },
  qoder: {
    label: 'Qoder (via OpenSkills)',
    // Qoder 不读独立 skills 目录,靠 OpenSkills 把 skill 注册进 AGENTS.md
    // 这里落到 .agents/skills 作为兼容存放点,并提示用户需配合 OpenSkills
    user: () => path.join(os.homedir(), '.agents', 'skills'),
    project: () => path.join(process.cwd(), '.agents', 'skills'),
    detect: () => path.join(os.homedir(), '.qoder'),
    needsOpenSkills: true,
  },
  copilot: {
    label: 'GitHub Copilot',
    user: () => path.join(os.homedir(), '.github', 'skills'),
    project: () => path.join(process.cwd(), '.github', 'skills'),
    detect: () => path.join(os.homedir(), '.github'),
  },
};

// skill 仓库根目录(bin 的上一级)
const SKILLS_ROOT = path.join(__dirname, '..');

// 扫描仓库内所有 skill(顶层目录且含 SKILL.md)
function listAvailableSkills() {
  const entries = fs.readdirSync(SKILLS_ROOT, { withFileTypes: true });
  return entries
    .filter(e => e.isDirectory() && fs.existsSync(path.join(SKILLS_ROOT, e.name, 'SKILL.md')))
    .map(e => e.name);
}

// 自动检测本机已安装哪些平台(检查对应配置目录是否存在)
function detectInstalledPlatforms() {
  return Object.keys(PLATFORMS).filter(p => fs.existsSync(PLATFORMS[p].detect()));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// 拷贝单个 skill 到目标目录(已存在则覆盖,保证幂等)
function copySkill(skillName, destDir) {
  const src = path.join(SKILLS_ROOT, skillName);
  ensureDir(destDir);
  const dest = path.join(destDir, skillName);
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.cpSync(src, dest, { recursive: true });
  return dest;
}

// 解析 -t / --auto,返回平台 key 数组
function resolveTargets(targetsArg, auto) {
  let targets;
  if (auto) {
    targets = detectInstalledPlatforms();
    if (targets.length === 0) {
      // 没检测到任何平台,默认装到跨平台标准目录
      targets = ['codex'];
      console.log('未检测到已安装的 AI 工具,默认安装到 ~/.agents/skills/');
    }
  } else if (!targetsArg) {
    targets = ['codex'];
  } else {
    targets = targetsArg.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  }
  const invalid = targets.filter(t => !PLATFORMS[t]);
  if (invalid.length) {
    console.error(`✗ 未知平台: ${invalid.join(', ')}`);
    console.error(`  可用平台: ${Object.keys(PLATFORMS).join(', ')}`);
    process.exit(1);
  }
  return targets;
}

function install(skillName, targets, project) {
  const available = listAvailableSkills();
  const skills = skillName === 'all' ? available : [skillName];

  const invalidSkill = skills.find(s => !available.includes(s));
  if (invalidSkill) {
    console.error(`✗ 未知 skill: ${invalidSkill}`);
    console.error(`  可用 skill: ${available.join(', ')}`);
    process.exit(1);
  }

  // 按实际目标目录分组,合并共用目录的平台标签(避免重复拷贝)
  const dirToLabels = new Map();
  const openSkillsPlatforms = [];
  for (const target of targets) {
    const p = PLATFORMS[target];
    const dir = project ? p.project() : p.user();
    if (!dirToLabels.has(dir)) dirToLabels.set(dir, []);
    dirToLabels.get(dir).push(p.label);
    if (p.needsOpenSkills) openSkillsPlatforms.push(p.label);
  }

  const scope = project ? '项目级' : '用户级';
  console.log('');
  for (const [dir, labels] of dirToLabels) {
    for (const skill of skills) {
      const dest = copySkill(skill, dir);
      console.log(`✓ [${labels.join(' / ')}] (${scope}) ${skill} → ${dest}`);
    }
  }
  console.log('');
  if (openSkillsPlatforms.length) {
    console.log(`⚠ ${openSkillsPlatforms.join('、')} 不直接读 skills 目录,需配合 OpenSkills 生效:`);
    console.log('  npx openskills install .  # 在项目根目录执行,把 skill 写入 AGENTS.md');
    console.log('');
  }
  console.log('完成。重启对应的 AI 工具即可使用新 skill。');
}

function cmdList(installed) {
  if (installed) {
    console.log('已安装的 skill(用户级):');
    let found = false;
    for (const p of Object.values(PLATFORMS)) {
      const dir = p.user();
      if (fs.existsSync(dir)) {
        const skills = fs.readdirSync(dir, { withFileTypes: true })
          .filter(e => e.isDirectory())
          .map(e => e.name);
        if (skills.length) {
          found = true;
          console.log(`  [${p.label}] ${dir}`);
          skills.forEach(s => console.log(`    - ${s}`));
        }
      }
    }
    if (!found) console.log('  (暂无已安装的 skill)');
  } else {
    const available = listAvailableSkills();
    console.log('可安装的 skill:');
    available.forEach(s => {
      let desc = '';
      try {
        const md = fs.readFileSync(path.join(SKILLS_ROOT, s, 'SKILL.md'), 'utf8');
        // 优先读 YAML frontmatter 的 description 字段
        const fm = md.match(/^---\n([\s\S]*?)\n---/);
        if (fm) {
          const m = fm[1].match(/^description:\s*(.+)$/m);
          if (m) desc = m[1].trim();
        }
        // 退化:取第一个非空非标题非分隔符行
        if (!desc) {
          desc = (md.split('\n').find(l => l.trim() && !l.startsWith('#') && l.trim() !== '---') || '').trim();
        }
      } catch (_) { /* ignore */ }
      console.log(`  - ${s}${desc ? '  ' + desc.slice(0, 70) : ''}`);
    });
  }
}

function help() {
  console.log(`
kai-skills — Agent Skills 安装器

用法:
  kai-skills install <skill|all> [选项]
  kai-skills list [--installed]
  kai-skills --help | --version

选项:
  -t, --target <平台>    目标平台,逗号分隔: codex,claude,cursor,qoder,trae,copilot
  -p, --project          装到当前目录(项目级)而非用户主目录
  -a, --auto             自动检测本机已安装的平台,全部安装

示例:
  kai-skills install server-autopilot -t codex
  kai-skills install server-autopilot -t codex,claude
  kai-skills install all -t claude
  kai-skills install all --auto
  kai-skills install all -t codex --project
  kai-skills list
  kai-skills list --installed

平台目录映射(用户级):
  codex    →  ~/.agents/skills/
  claude   →  ~/.claude/skills/
  cursor   →  ~/.cursor/skills/
  trae     →  ~/.trae/skills/
  qoder    →  ~/.agents/skills/(需配合 OpenSkills 写入 AGENTS.md)
  copilot  →  ~/.github/skills/
`.trim());
}

// ===== 参数解析 =====
function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) { help(); return; }

  const cmd = args[0];
  if (cmd === '--help' || cmd === '-h') { help(); return; }
  if (cmd === '--version' || cmd === '-v') {
    const pkg = require('../package.json');
    console.log(pkg.version);
    return;
  }

  if (cmd === 'list') {
    cmdList(args.includes('--installed'));
    return;
  }

  if (cmd === 'install') {
    const rest = args.slice(1);
    if (rest.length === 0) {
      console.error('✗ 缺少 skill 名称。用法: kai-skills install <skill|all>');
      process.exit(1);
    }
    const skillName = rest[0];
    const project = rest.includes('-p') || rest.includes('--project');
    const auto = rest.includes('-a') || rest.includes('--auto');
    let targetsArg = null;
    const tIdx = rest.findIndex(a => a === '-t' || a === '--target');
    if (tIdx !== -1 && rest[tIdx + 1]) targetsArg = rest[tIdx + 1];
    const targets = resolveTargets(targetsArg, auto);
    install(skillName, targets, project);
    return;
  }

  console.error(`✗ 未知命令: ${cmd}`);
  help();
  process.exit(1);
}

main();
