#!/usr/bin/env node

/**
 * 项目初始化脚本
 * 帮助用户快速配置基于模板创建的项目
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 问题配置
const questions = [
  {
    key: 'appName',
    message: '应用名称 (例如: My Electron App):',
    default: 'My Electron App'
  },
  {
    key: 'appId',
    message: '应用 ID (例如: com.mycompany.myapp):',
    default: 'com.mycompany.myapp'
  },
  {
    key: 'packageName',
    message: '包名 (例如: my-electron-app):',
    default: 'my-electron-app'
  },
  {
    key: 'description',
    message: '应用描述:',
    default: 'A modern Electron application'
  },
  {
    key: 'author',
    message: '作者名称:',
    default: 'Your Name'
  },
  {
    key: 'repository',
    message: '仓库 URL (例如: https://github.com/username/repo):',
    default: ''
  }
];

// 需要替换的文件
const filesToUpdate = [
  'package.json',
  'electron-builder.json5',
  'README.md'
];

// 替换规则
const replacements = {
  appName: [
    { file: 'electron-builder.json5', pattern: /productName:\s*"YourAppName"/g },
    { file: 'README.md', pattern: /Your App Name/g }
  ],
  appId: [
    { file: 'electron-builder.json5', pattern: /appId:\s*"YourAppID"/g }
  ],
  packageName: [
    { file: 'package.json', pattern: /"name":\s*"electron-vite-project"/g }
  ],
  description: [
    { file: 'package.json', pattern: /"description":\s*".*?"/g }
  ],
  author: [
    { file: 'package.json', pattern: /"author":\s*".*?"/g }
  ],
  repository: [
    { file: 'README.md', pattern: /<your-username>/g },
    { file: 'README.md', pattern: /<your-repo>/g }
  ]
};

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function askQuestions() {
  const answers = {};

  console.log('\n🚀 欢迎使用 Electron 项目配置向导！\n');
  console.log('请回答以下问题来配置你的项目：\n');

  for (const q of questions) {
    const answer = await question(`${q.message} (${q.default}) `);
    answers[q.key] = answer || q.default;
  }

  rl.close();
  return answers;
}

function updateFiles(answers) {
  console.log('\n📝 正在更新配置文件...\n');

  let updatedCount = 0;

  // 更新 package.json
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    packageJson.name = answers.packageName;
    packageJson.description = answers.description;
    packageJson.author = answers.author;

    if (answers.repository) {
      packageJson.repository = {
        type: 'git',
        url: answers.repository
      };
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ 已更新 package.json');
    updatedCount++;
  } catch (error) {
    console.error('❌ 更新 package.json 失败:', error.message);
  }

  // 更新 electron-builder.json5
  try {
    const builderPath = path.join(process.cwd(), 'electron-builder.json5');
    let builderConfig = fs.readFileSync(builderPath, 'utf-8');

    builderConfig = builderConfig.replace(/appId:\s*"YourAppID"/, `appId: "${answers.appId}"`);
    builderConfig = builderConfig.replace(/productName:\s*"YourAppName"/, `productName: "${answers.appName}"`);

    fs.writeFileSync(builderPath, builderConfig);
    console.log('✅ 已更新 electron-builder.json5');
    updatedCount++;
  } catch (error) {
    console.error('❌ 更新 electron-builder.json5 失败:', error.message);
  }

  // 更新 README.md
  try {
    const readmePath = path.join(process.cwd(), 'README.md');
    let readme = fs.readFileSync(readmePath, 'utf-8');

    readme = readme.replace(/<your-username>/g, answers.repository ? answers.repository.split('/')[3] : 'your-username');
    readme = readme.replace(/<your-repo>/g, answers.packageName);
    readme = readme.replace(/Your App Name/g, answers.appName);

    fs.writeFileSync(readmePath, readme);
    console.log('✅ 已更新 README.md');
    updatedCount++;
  } catch (error) {
    console.error('❌ 更新 README.md 失败:', error.message);
  }

  return updatedCount;
}

function printSuccessMessage(answers) {
  console.log('\n✨ 配置完成！\n');
  console.log('下一步：');
  console.log(`  1. 审查你的配置:`);
  console.log(`     - 应用名称: ${answers.appName}`);
  console.log(`     - 应用 ID: ${answers.appId}`);
  console.log(`     - 包名: ${answers.packageName}`);
  console.log(`\n  2. 安装依赖:`);
  console.log(`     npm install`);
  console.log(`\n  3. 启动开发服务器:`);
  console.log(`     npm run dev`);
  console.log(`\n  4. 开始开发你的应用！`);
  console.log('\n💡 提示：');
  console.log('  - 修改 public/icon.ico 和 public/logo.png 来自定义应用图标');
  console.log('  - 查看 README.md 了解更多功能');
  console.log('  - 查看 DEPLOYMENT.md 了解如何发布应用\n');
}

async function main() {
  try {
    const answers = await askQuestions();
    const updatedCount = updateFiles(answers);

    if (updatedCount > 0) {
      printSuccessMessage(answers);
    } else {
      console.log('\n❌ 没有文件被更新，请检查错误信息\n');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ 配置失败:', error.message);
    process.exit(1);
  }
}

// 运行脚本
main();
