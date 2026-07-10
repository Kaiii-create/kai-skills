'use strict';

// kai-skills 测试套件 —— 使用 Node.js 内置 node:test 运行器(零依赖)
// 运行方式: node --test test/test.js

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync } = require('child_process');

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
