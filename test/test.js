'use strict';

// kai-skills 测试套件 —— 使用 Node.js 内置 node:test 运行器(零依赖)
// 运行方式: node --test test/test.js

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync, execFileSync } = require('child_process');

const {
  listAvailableSkills,
  parseInstallArgs,
  resolveTargets,
  install,
  main,
  SKILLS_ROOT,
  CliError,
} = require('../bin/kai-skills.js');

const pkg = require('../package.json');
const PROJECT_ROOT = path.join(__dirname, '..');

// ===== helpers =====

// 捕获 console.log 输出
function captureLog(fn) {
  let out = '';
  const orig = console.log;
  console.log = (...args) => { out += args.map(String).join(' ') + '\n'; };
  try { fn(); } finally { console.log = orig; }
  return out;
}

// 静默运行(抑制 console.log / console.error),返回 fn 的返回值
function silent(fn) {
  const origLog = console.log;
  const origErr = console.error;
  console.log = () => {};
  console.error = () => {};
  try { return fn(); } finally { console.log = origLog; console.error = origErr; }
}

// 在临时目录中运行(切 cwd,测完恢复并清理),回调接收临时目录路径
function withTempDir(fn) {
  const origCwd = process.cwd();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kai-skills-test-'));
  process.chdir(tmp);
  try {
    return fn(tmp);
  } finally {
    process.chdir(origCwd);
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// ===== 基础功能测试 =====
describe('基础功能', () => {
  test('--version 输出正确版本号(读 package.json)', () => {
    const out = captureLog(() => main(['--version']));
    assert.strictEqual(out.trim(), pkg.version);
  });

  test('--help 输出包含 install 和 list', () => {
    const out = captureLog(() => main(['--help']));
    assert.ok(out.includes('install'), 'help 输出应包含 "install"');
    assert.ok(out.includes('list'), 'help 输出应包含 "list"');
  });

  test('listAvailableSkills() 返回包含 server-autopilot', () => {
    const skills = listAvailableSkills();
    assert.ok(
      skills.includes('server-autopilot'),
      `应包含 server-autopilot,实际: ${skills.join(', ')}`
    );
  });

  test('list 命令输出包含 server-autopilot', () => {
    const out = captureLog(() => main(['list']));
    assert.ok(out.includes('server-autopilot'), 'list 输出应包含 server-autopilot');
  });
});

// ===== 参数解析错误测试(必须抛出 CliError)=====
describe('参数解析错误', () => {
  test('parseInstallArgs([]) → 缺少 skill 名称', () => {
    assert.throws(() => parseInstallArgs([]), CliError);
  });

  test('parseInstallArgs(["--project"]) → skill 名以 - 开头', () => {
    assert.throws(() => parseInstallArgs(['--project']), CliError);
  });

  test('parseInstallArgs(["all", "-t"]) → -t 后无值', () => {
    assert.throws(() => parseInstallArgs(['all', '-t']), CliError);
  });

  test('parseInstallArgs(["all", "--target"]) → --target 后无值', () => {
    assert.throws(() => parseInstallArgs(['all', '--target']), CliError);
  });

  test('parseInstallArgs(["all", "--unknown"]) → 未知参数', () => {
    assert.throws(() => parseInstallArgs(['all', '--unknown']), CliError);
  });

  test('parseInstallArgs(["all", "--auto", "-t", "codex"]) → auto 和 target 互斥', () => {
    assert.throws(() => parseInstallArgs(['all', '--auto', '-t', 'codex']), CliError);
  });
});

// ===== 平台去重测试 =====
describe('平台去重', () => {
  test('resolveTargets("codex,codex", false) 返回 ["codex"](长度为1)', () => {
    const t = resolveTargets('codex,codex', false);
    assert.strictEqual(t.length, 1);
    assert.deepStrictEqual(t, ['codex']);
  });

  test('resolveTargets("codex,claude,codex", false) 去重后长度为2', () => {
    const t = resolveTargets('codex,claude,codex', false);
    assert.strictEqual(t.length, 2);
    assert.deepStrictEqual(t, ['codex', 'claude']);
  });
});

// ===== 无效平台测试 =====
describe('无效平台', () => {
  test('resolveTargets("foo", false) 抛出 CliError', () => {
    assert.throws(() => resolveTargets('foo', false), CliError);
  });
});

// ===== 安装功能测试(用临时目录)=====
describe('安装功能', () => {
  test('项目级安装 server-autopilot 到 codex → SKILL.md 存在', () => {
    withTempDir((tmp) => {
      silent(() => install('server-autopilot', ['codex'], true));
      const skillFile = path.join(tmp, '.agents', 'skills', 'server-autopilot', 'SKILL.md');
      assert.ok(fs.existsSync(skillFile), 'SKILL.md 应存在: ' + skillFile);
    });
  });

  test('项目级安装 all 到 codex → SKILL.md 存在', () => {
    withTempDir((tmp) => {
      silent(() => install('all', ['codex'], true));
      const skillFile = path.join(tmp, '.agents', 'skills', 'server-autopilot', 'SKILL.md');
      assert.ok(fs.existsSync(skillFile), 'SKILL.md 应存在: ' + skillFile);
    });
  });

  test('幂等测试:同一安装跑两次,文件依然存在且正确', () => {
    withTempDir((tmp) => {
      silent(() => install('server-autopilot', ['codex'], true));
      silent(() => install('server-autopilot', ['codex'], true));
      const skillFile = path.join(tmp, '.agents', 'skills', 'server-autopilot', 'SKILL.md');
      assert.ok(fs.existsSync(skillFile), '第二次安装后 SKILL.md 应存在');
      const src = fs.readFileSync(path.join(SKILLS_ROOT, 'server-autopilot', 'SKILL.md'), 'utf8');
      const dest = fs.readFileSync(skillFile, 'utf8');
      assert.strictEqual(dest, src, 'SKILL.md 内容应与源文件一致');
    });
  });

  test('无效 skill 名 → install 抛出 CliError', () => {
    withTempDir(() => {
      assert.throws(() => install('nonexistent-skill', ['codex'], true), CliError);
    });
  });

  test('无效平台 → resolveTargets 抛出 CliError', () => {
    assert.throws(() => resolveTargets('foo', false), CliError);
  });
});

// ===== npm pack 内容检查 =====
describe('npm pack 内容检查', () => {
  test('npm pack --dry-run 包含所有必需文件', () => {
    const out = execSync('npm pack --dry-run 2>&1', { cwd: PROJECT_ROOT, encoding: 'utf8' });
    // 解析 tarball 内容行,格式: "npm notice <size> <filepath>"
    const packedFiles = [];
    for (const line of out.split(/\r?\n/)) {
      const m = line.match(/npm notice\s+[\d.]+[kKmMgG]?B\s+(.+)$/);
      if (m) packedFiles.push(m[1].trim());
    }
    const required = [
      'bin/kai-skills.js',
      'server-autopilot/SKILL.md',
      'README.md',
      'README_zh.md',
      'LICENSE',
    ];
    for (const f of required) {
      assert.ok(
        packedFiles.includes(f),
        `npm pack 应包含 "${f}"。实际打包文件: ${packedFiles.join(', ')}`
      );
    }
  });
});

// ===== main() 退出码测试 =====
describe('main() 退出码', () => {
  test('main(["install"]) 返回非0(缺少 skill 名称)', () => {
    const code = silent(() => main(['install']));
    assert.notStrictEqual(code, 0);
  });

  test('main(["install", "all", "-t"]) 返回非0(-t 后无值)', () => {
    const code = silent(() => main(['install', 'all', '-t']));
    assert.notStrictEqual(code, 0);
  });

  test('main(["install", "all", "--unknown"]) 返回非0(未知参数)', () => {
    const code = silent(() => main(['install', 'all', '--unknown']));
    assert.notStrictEqual(code, 0);
  });

  test('main(["install", "all", "--auto", "-t", "codex"]) 返回非0(互斥参数)', () => {
    const code = silent(() => main(['install', 'all', '--auto', '-t', 'codex']));
    assert.notStrictEqual(code, 0);
  });

  test('main(["unknowncommand"]) 返回非0(未知命令)', () => {
    const code = silent(() => main(['unknowncommand']));
    assert.notStrictEqual(code, 0);
  });
});

// ===== 重复选项测试(必须报错)=====
describe('重复选项检测', () => {
  test('parseInstallArgs(["all", "-t", "codex", "-t", "claude"]) → 重复 -t 报错', () => {
    assert.throws(() => parseInstallArgs(['all', '-t', 'codex', '-t', 'claude']), CliError);
  });

  test('parseInstallArgs(["all", "--target", "codex", "--target", "claude"]) → 重复 --target 报错', () => {
    assert.throws(() => parseInstallArgs(['all', '--target', 'codex', '--target', 'claude']), CliError);
  });

  test('parseInstallArgs(["all", "-t", "codex", "--target", "claude"]) → -t 和 --target 混用报错', () => {
    assert.throws(() => parseInstallArgs(['all', '-t', 'codex', '--target', 'claude']), CliError);
  });

  test('parseInstallArgs(["all", "-p", "--project"]) → 重复 -p/--project 报错', () => {
    assert.throws(() => parseInstallArgs(['all', '-p', '--project']), CliError);
  });

  test('parseInstallArgs(["all", "-a", "--auto"]) → 重复 -a/--auto 报错', () => {
    assert.throws(() => parseInstallArgs(['all', '-a', '--auto']), CliError);
  });

  test('main(["list", "--installed", "--installed"]) → 重复 --installed 返回非0', () => {
    const code = silent(() => main(['list', '--installed', '--installed']));
    assert.notStrictEqual(code, 0);
  });
});

// ===== 空 target 和空白 target 测试 =====
describe('空 target 测试', () => {
  test('resolveTargets(",", false) → 空 target 抛出 CliError', () => {
    assert.throws(() => resolveTargets(',', false), CliError);
  });

  test('resolveTargets(" , ", false) → 全空白 target 抛出 CliError', () => {
    assert.throws(() => resolveTargets(' , ', false), CliError);
  });

  test('resolveTargets("codex, codex,claude", false) → 带空白去重后长度为2', () => {
    const t = resolveTargets('codex, codex,claude', false);
    assert.strictEqual(t.length, 2);
    assert.deepStrictEqual(t, ['codex', 'claude']);
  });
});

// ===== 用户级临时 HOME 测试(子进程,不污染真实用户目录)=====
describe('用户级临时 HOME 安装', () => {
  const CLI_PATH = path.join(PROJECT_ROOT, 'bin', 'kai-skills.js');

  // 在子进程中用临时 HOME/USERPROFILE 运行 CLI,避免污染真实用户目录
  function runCliWithTempHome(args) {
    const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), 'kai-home-test-'));
    try {
      const env = {
        ...process.env,
        HOME: tmpHome,
        USERPROFILE: tmpHome,  // Windows 上 os.homedir() 读 USERPROFILE
      };
      const output = execFileSync(process.execPath, [CLI_PATH, ...args], {
        env,
        encoding: 'utf8',
        timeout: 15000,
      });
      return { output, tmpHome };
    } finally {
      // 注意: tmpHome 由调用方在验证后清理,这里只确保异常时也清理
    }
  }

  test('用户级安装 server-autopilot 到 codex → 临时 HOME 下 SKILL.md 存在', () => {
    const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), 'kai-home-test-'));
    try {
      const env = {
        ...process.env,
        HOME: tmpHome,
        USERPROFILE: tmpHome,
      };
      execFileSync(process.execPath, [CLI_PATH, 'install', 'server-autopilot', '-t', 'codex'], {
        env,
        encoding: 'utf8',
        timeout: 15000,
      });
      const skillFile = path.join(tmpHome, '.agents', 'skills', 'server-autopilot', 'SKILL.md');
      assert.ok(fs.existsSync(skillFile), '用户级 SKILL.md 应存在: ' + skillFile);
    } finally {
      fs.rmSync(tmpHome, { recursive: true, force: true });
    }
  });

  test('用户级安装后真实用户目录未被污染', () => {
    // 记录真实 ~/.agents/skills/server-autopilot 安装前的状态
    const realAgentsDir = path.join(os.homedir(), '.agents', 'skills');
    const beforeExists = fs.existsSync(path.join(realAgentsDir, 'server-autopilot', 'SKILL.md'));
    const beforeMtime = beforeExists
      ? fs.statSync(path.join(realAgentsDir, 'server-autopilot', 'SKILL.md')).mtimeMs
      : null;

    const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), 'kai-home-test-'));
    try {
      const env = {
        ...process.env,
        HOME: tmpHome,
        USERPROFILE: tmpHome,
      };
      execFileSync(process.execPath, [CLI_PATH, 'install', 'server-autopilot', '-t', 'codex'], {
        env,
        encoding: 'utf8',
        timeout: 15000,
      });
    } finally {
      fs.rmSync(tmpHome, { recursive: true, force: true });
    }

    // 验证真实目录未被修改
    const afterExists = fs.existsSync(path.join(realAgentsDir, 'server-autopilot', 'SKILL.md'));
    const afterMtime = afterExists
      ? fs.statSync(path.join(realAgentsDir, 'server-autopilot', 'SKILL.md')).mtimeMs
      : null;
    assert.strictEqual(beforeExists, afterExists, '真实用户目录的 skill 存在性不应改变');
    if (beforeExists) {
      assert.strictEqual(beforeMtime, afterMtime, '真实用户目录的 SKILL.md mtime 不应改变');
    }
  });
});
