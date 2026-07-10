#!/usr/bin/env node
'use strict';

// kai-skills — Agent Skills 安装器
// 零依赖,仅使用 Node 内置模块

const fs = require('fs');
const path = require('path');
const os = require('os');

// ===== 平台目录映射表(2026-07 检索确认)=====
// 各平台实际读取的目录(已对照官方文档/教程核实):
//   codex   → ~/.agents/skills     (OpenAI 官方文档确认,走 agentskills.io 标准)
//   claude  → ~/.claude/skills     (Anthropic 自家格式)
//   cursor  → ~/.cursor/skills     (内置 skill 在 ~/.cursor/skills-cursor/,用户装的在 ~/.cursor/skills/)
//   trae    → ~/.trae/skills       (字节官方教程确认,专属目录)
//   qoder   → 靠 OpenSkills 写 AGENTS.md,不读独立 skills 目录(仅项目级可靠)
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
    // 用户级安装不可靠(AGENTS.md 只在项目目录生效),故用户级时给出强警告
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

const PLATFORM_KEYS = Object.keys(PLATFORMS);

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
  return PLATFORM_KEYS.filter(p => fs.existsSync(PLATFORMS[p].detect()));
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

// 已知的布尔型开关参数
const BOOL_FLAGS = new Set(['-p', '--project', '-a', '--auto', '--installed']);

// 自定义错误类,带退出码
class CliError extends Error {
  constructor(message, code = 1) {
    super(message);
    this.code = code;
  }
}

// 解析 install 子命令的参数,严格校验
function parseInstallArgs(rest) {
  if (rest.length === 0) {
    throw new CliError('缺少 skill 名称。用法: kai-skills install <skill|all>');
  }

  const skillName = rest[0];
  if (skillName.startsWith('-')) {
    throw new CliError(`缺少 skill 名称(得到选项 "${skillName}")。用法: kai-skills install <skill|all>`);
  }

  const project = rest.includes('-p') || rest.includes('--project');
  const auto = rest.includes('-a') || rest.includes('--auto');

  // 解析 -t / --target
  let targetsArg = null;
  const tIdx = rest.findIndex(a => a === '-t' || a === '--target');
  if (tIdx !== -1) {
    const next = rest[tIdx + 1];
    if (!next || next.startsWith('-')) {
      throw new CliError(`-${rest[tIdx].startsWith('--') ? '-' : ''}t / --target 需要一个值。可用平台: ${PLATFORM_KEYS.join(', ')}`);
    }
    targetsArg = next;
  }

  // --auto 和 --target 互斥
  if (auto && targetsArg) {
    throw new CliError('--auto 和 --target 不能同时使用。请二选一。');
  }

  // 校验未知参数(遍历所有 token,既不是 skillName、也不是已知 flag、也不是 -t 的值)
  const knownTokens = new Set([skillName, '-p', '--project', '-a', '--auto']);
  if (tIdx !== -1) {
    knownTokens.add('-t');
    knownTokens.add('--target');
    knownTokens.add(targetsArg);
  }
  for (const tok of rest) {
    if (!knownTokens.has(tok)) {
      throw new CliError(`未知参数: ${tok}`);
    }
  }

  return { skillName, project, auto, targetsArg };
}

// 解析平台参数字符串,返回去重后的平台 key 数组
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

  if (targets.length === 0) {
    throw new CliError('未指定任何平台。可用平台: ' + PLATFORM_KEYS.join(', '));
  }

  const invalid = targets.filter(t => !PLATFORMS[t]);
  if (invalid.length) {
    throw new CliError(`未知平台: ${invalid.join(', ')}。可用平台: ${PLATFORM_KEYS.join(', ')}`);
  }

  // 去重(保持顺序)
  const seen = new Set();
  targets = targets.filter(t => {
    if (seen.has(t)) return false;
    seen.add(t);
    return true;
  });

  return targets;
}

// 安装逻辑,可被测试调用
function install(skillName, targets, project) {
  const available = listAvailableSkills();
  const skills = skillName === 'all' ? available : [skillName];

  const invalidSkill = skills.find(s => !available.includes(s));
  if (invalidSkill) {
    throw new CliError(`未知 skill: ${invalidSkill}。可用 skill: ${available.join(', ')}`);
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
  const lines = [];
  lines.push('');
  for (const [dir, labels] of dirToLabels) {
    for (const skill of skills) {
      const dest = copySkill(skill, dir);
      lines.push(`✓ [${labels.join(' / ')}] (${scope}) ${skill} → ${dest}`);
    }
  }
  lines.push('');

  let qoderWarned = false;
  if (openSkillsPlatforms.length) {
    qoderWarned = true;
    if (!project) {
      // 用户级安装 Qoder 不可靠:AGENTS.md 只在项目目录生效
      lines.push(`⚠ ${openSkillsPlatforms.join('、')} 的用户级安装不会自动生效。`);
      lines.push('  OpenSkills 通过 AGENTS.md 注册 skill,而 AGENTS.md 只在项目目录中被读取。');
      lines.push('  建议改用项目级安装: 加 --project 参数,在目标项目根目录执行。');
      lines.push('  或在项目根目录手动执行: npx openskills install .');
    } else {
      lines.push(`⚠ ${openSkillsPlatforms.join('、')} 不直接读 skills 目录,文件已复制但还需注册:`);
      lines.push('  请在当前项目根目录执行: npx openskills install .');
      lines.push('  (该命令会把 skill 写入 AGENTS.md,Qoder 才能识别)');
    }
    lines.push('');
  }

  if (qoderWarned) {
    lines.push('部分平台需要额外步骤,请查看上方提示。其余平台重启 AI 工具即可使用。');
  } else {
    lines.push('完成。重启对应的 AI 工具即可使用新 skill。');
  }

  console.log(lines.join('\n'));
  return { qoderWarned };
}

function cmdList(installed) {
  if (installed) {
    console.log('已安装的 skill(用户级):');
    // 多个平台可能共用同一目录,用目录去重避免重复显示
    const seenDirs = new Set();
    let found = false;
    for (const key of PLATFORM_KEYS) {
      const p = PLATFORMS[key];
      const dir = p.user();
      if (seenDirs.has(dir)) continue; // 同一目录只显示一次
      if (fs.existsSync(dir)) {
        seenDirs.add(dir);
        const skills = fs.readdirSync(dir, { withFileTypes: true })
          .filter(e => e.isDirectory())
          .map(e => e.name);
        if (skills.length) {
          found = true;
          // 找出所有共用此目录的平台标签
          const sharedKeys = PLATFORM_KEYS.filter(k => PLATFORMS[k].user() === dir);
          const label = sharedKeys.map(k => PLATFORMS[k].label).join(' / ');
          console.log(`  [${label}] ${dir}`);
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
                          (不能与 --target 同时使用)

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
  qoder    →  ~/.agents/skills/ (用户级不生效,需项目级 + OpenSkills)
  copilot  →  ~/.github/skills/

注意:
  - qoder 不直接读 skills 目录,需配合 OpenSkills 注册到 AGENTS.md
  - qoder 用户级安装不会自动生效,建议使用 --project 在项目根目录安装
  - 安装到 qoder 后,在项目根目录执行: npx openskills install .
`.trim());
}

// ===== 主入口 =====
function main(argv) {
  const args = argv || process.argv.slice(2);
  if (args.length === 0) { help(); return 0; }

  const cmd = args[0];
  if (cmd === '--help' || cmd === '-h') { help(); return 0; }
  if (cmd === '--version' || cmd === '-v') {
    const pkg = require('../package.json');
    console.log(pkg.version);
    return 0;
  }

  if (cmd === 'list') {
    // 校验 list 的参数,只允许 --installed
    const extra = args.slice(1).filter(a => a !== '--installed');
    if (extra.length) {
      console.error(`✗ list 命令不支持参数: ${extra.join(', ')}`);
      return 1;
    }
    cmdList(args.includes('--installed'));
    return 0;
  }

  if (cmd === 'install') {
    try {
      const { skillName, project, auto, targetsArg } = parseInstallArgs(args.slice(1));
      const targets = resolveTargets(targetsArg, auto);
      install(skillName, targets, project);
      return 0;
    } catch (e) {
      if (e instanceof CliError) {
        console.error(`✗ ${e.message}`);
        return e.code;
      }
      throw e;
    }
  }

  console.error(`✗ 未知命令: ${cmd}`);
  console.error('运行 kai-skills --help 查看用法');
  return 1;
}

// 如果直接运行(非被 require),执行 main 并设置退出码
if (require.main === module) {
  try {
    const code = main();
    if (code !== 0) process.exit(code);
  } catch (e) {
    console.error(`✗ ${e.message || e}`);
    process.exit(1);
  }
}

// 导出供测试使用
module.exports = {
  PLATFORMS,
  PLATFORM_KEYS,
  listAvailableSkills,
  detectInstalledPlatforms,
  parseInstallArgs,
  resolveTargets,
  install,
  copySkill,
  main,
  SKILLS_ROOT,
  CliError,
};
