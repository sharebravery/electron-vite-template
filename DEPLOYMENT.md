# CI/CD 自动化部署说明

本项目采用了分离的 CI/CD 流程
## 🔄 工作流程

### CI（持续集成）

触发条件：
- 推送代码到 `main` 或 `dev` 分支
- 创建或更新 Pull Request

检查内容：
- **Lint**: 代码规范检查
- **Type Check**: TypeScript 类型检查
- **Test Build**: 构建测试

目的：确保代码质量，每次提交都经过验证

### CD（持续部署）

触发条件：
- 推送以 `v` 开头的 tag（如 `v1.0.0`）
- 手动触发（GitHub Actions 页面）

执行内容：
- 多平台构建（macOS、Windows、Linux）
- 创建 GitHub Release
- 上传构建产物

## 📦 支持的平台

- **macOS**: DMG 安装包
- **Windows**: NSIS 安装程序
- **Linux**: AppImage 可执行文件

## 🚀 发布流程

### 1. 开发阶段

在日常开发中，CI 会自动运行，确保代码质量：

```bash
git checkout -b feature/new-feature
# ... 编写代码 ...
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

创建 PR 后，CI 会自动检查：
- 代码规范
- TypeScript 类型
- 构建是否成功

### 2. 发布版本

#### 方式一：使用 release-it（推荐）

使用 npm 脚本自动创建 tag 并推送：

```bash
# 补丁版本（0.0.0 -> 0.0.1）
npm run release:patch

# 次要版本（0.0.0 -> 0.1.0）
npm run release:minor

# 主要版本（0.0.0 -> 1.0.0）
npm run release:major

# 交互式选择版本类型
npm run release

# 模拟运行（不实际发布）
npm run release:dry
```

这会自动：
1. 更新版本号
2. 创建 Git commit
3. 创建并推送 tag（如 `v1.0.0`）
4. 推送到 GitHub

推送 tag 后，GitHub Actions 会自动：
1. 构建所有平台的应用
2. 创建 GitHub Release
3. 上传构建产物

#### 方式二：手动创建 Tag

```bash
# 更新版本号
npm version patch  # 或 minor/major

# 推送代码和 tag
git push origin main
git push origin v1.0.0
```

#### 方式三：GitHub 手动触发

1. 进入 GitHub 仓库
2. 点击 `Actions` 标签
3. 选择 `Release` workflow
4. 点击 `Run workflow` 按钮

## ⚙️ 配置说明

### GitHub Secrets

GitHub 会自动提供 `GITHUB_TOKEN`，无需手动配置。

如需自定义，可在 Settings → Secrets 中添加：
- `GITHUB_TOKEN`: GitHub Actions 自动提供

### 文件说明

- `.github/workflows/ci.yml` - CI 工作流（代码质量检查）
- `.github/workflows/release.yml` - Release 工作流（构建和发布）
- `.release-it.json` - release-it 发布工具配置
- `electron-builder.json5` - Electron Builder 打包配置

## 📝 版本管理

### 版本号规则

项目遵循语义化版本（Semver）：
- **MAJOR** (1.0.0): 不兼容的 API 变更
- **MINOR** (0.1.0): 向下兼容的功能新增
- **PATCH** (0.0.1): 向下兼容的问题修复

### 发布检查清单

发布前确保：
- [ ] 所有测试通过
- [ ] CI 检查通过
- [ ] 更新了 CHANGELOG（如有）
- [ ] 版本号正确更新
- [ ] 本地构建测试成功

## 🔧 自定义配置

### 修改应用信息

编辑 `electron-builder.json5`:

```json5
{
  appId: "com.yourcompany.yourapp",
  productName: "Your App Name",
  // ...
}
```

### 修改 release-it 配置

编辑 `.release-it.json`:

```json
{
  "git": {
    "commitMessage": "chore: release v${version}",
    "requireCleanWorkingDir": true
  },
  "github": {
    "release": true,
    "draft": false,
    "prerelease": false
  }
}
```

### 跳过 CI

在提交信息中添加 `[skip ci]` 可以跳过 CI：

```bash
git commit -m "chore: update docs [skip ci]"
```

**注意**: 这不会跳过 tag 触发的 Release workflow。

## 🎯 最佳实践

1. **分支保护**
   - 在 GitHub 设置中启用分支保护
   - 要求 PR 通过 CI 检查才能合并

2. **开发流程**
   ```bash
   # 1. 创建功能分支
   git checkout -b feature/new-feature

   # 2. 开发并提交
   git commit -m "feat: add new feature"

   # 3. 推送并创建 PR
   git push origin feature/new-feature

   # 4. 等待 CI 检查通过

   # 5. 合并到 main 分支

   # 6. 使用 release-it 发布
   npm run release:patch
   ```

3. **版本标签**
   - 使用语义化版本号
   - Tag 格式：`v1.0.0`（必须以 `v` 开头）
   - 避免在同一版本号上重复发布

4. **测试**
   - 本地充分测试后再推送 tag
   - 使用 `npm run release:dry` 预览发布流程

## 🐛 常见问题

### CI 失败怎么办？

1. 查看 GitHub Actions 日志
2. 本地运行相同的检查命令
3. 修复问题后推送新的 commit

### 如何回滚发布？

1. 在 GitHub Releases 页面删除对应的 Release
2. 删除对应的 Git tag：

   ```bash
   # 本地删除
   git tag -d v1.0.0

   # 远程删除
   git push origin :refs/tags/v1.0.0

   # 或使用 GitHub CLI
   gh release delete v1.0.0
   git push origin :refs/tags/v1.0.0
   ```

3. 发布新版本修复问题

### 本地发布失败？

确保已安装依赖：

```bash
npm install
```

如果遇到权限问题，确保已配置 Git：

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 如何调试 Release？

在本地模拟构建：

```bash
npm run build
```

检查 `release/` 目录中的构建产物。

### 构建太慢怎么办？

- 考虑只在必要时构建所有平台
- 修改 `.github/workflows/release.yml` 中的 matrix 配置
- 使用 GitHub Actions 的缓存功能

## 📚 相关链接

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [release-it 文档](https://github.com/release-it/release-it)
- [Electron Builder 文档](https://www.electron.build/)
- [语义化版本](https://semver.org/lang/zh-CN/)

## 🎉 快速开始

```bash
# 1. 克隆仓库
git clone <your-repo-url>
cd <your-repo>

# 2. 安装依赖
npm install

# 3. 开发
npm run dev

# 4. 测试构建
npm run build

# 5. 提交代码
git add .
git commit -m "feat: initial release"
git push origin main

# 6. 发布版本
npm run release:patch
```

推送 tag 后，GitHub Actions 会自动构建并发布！
