# CI/CD 自动化部署说明

本项目采用**简化的 CI/CD 流程**，**每次推送到 main 分支自动构建发布**。

## 🔄 工作流程

### CI（持续集成）

触发条件：
- 推送代码到 `dev` 分支
- 创建 Pull Request 到 `main` 或 `dev`

检查内容：
- **Lint**: 代码规范检查
- **Type Check**: TypeScript 类型检查
- **Build Check**: 前端构建验证（不打包 Electron）

目的：确保代码质量，在 dev 分支快速反馈

### CD（持续部署）

触发条件：
- 推送代码到 `main` 分支

执行内容：
- 多平台构建（macOS、Windows）
- 自动创建 GitHub Release
- 上传构建产物

## 📦 支持的平台

- **macOS**: DMG 安装包
- **Windows**: NSIS 安装程序

## 🚀 发布流程

### 开发流程

```bash
# 1. 在 dev 分支开发
git checkout dev
git checkout -b feature/new-feature

# 2. 开发并提交
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 3. 创建 PR 到 dev
# CI 会自动运行检查
```

### 发布流程（自动化）

```bash
# 1. 确保 dev 分支的代码都已合并

# 2. 将 dev 合并到 main
git checkout main
git merge dev

# 3. 推送到 main 分支
git push origin main

# ✅ 完成！GitHub Actions 会自动：
# 1. 构建所有平台的应用
# 2. 创建 GitHub Release（tag: v{版本号}）
# 3. 上传安装包到 Release
```

**就这么简单！**不需要手动打 tag 或运行任何发布命令。

## 📝 版本管理

### 版本号规则

项目遵循语义化版本（Semver）：
- **MAJOR** (1.0.0): 不兼容的 API 变更
- **MINOR** (0.1.0): 向下兼容的功能新增
- **PATCH** (0.0.1): 向下兼容的问题修复

### 更新版本号

在推送到 main 之前，手动更新 `package.json` 中的版本号：

```bash
# 方式一：使用 npm version（推荐）
npm version patch   # 0.0.0 -> 0.0.1
npm version minor   # 0.0.0 -> 0.1.0
npm version major   # 0.0.0 -> 1.0.0

# 方式二：手动编辑
# 修改 package.json 中的 version 字段
```

然后推送到 main：

```bash
git add package.json package-lock.json
git commit -m "chore: bump version to 0.1.0"
git push origin main
```

### 发布检查清单

推送到 main 前：
- [ ] 所有测试通过
- [ ] CI 检查通过（在 dev 分支）
- [ ] 更新了版本号
- [ ] 本地构建测试成功（`npm run build`）

## ⚙️ 配置说明

### GitHub Secrets

GitHub 会自动提供 `GITHUB_TOKEN`，无需手动配置。

### 文件说明

- `.github/workflows/ci.yml` - CI 工作流（dev 分支代码检查）
- `.github/workflows/release.yml` - Release 工作流（main 分支自动发布）
- `electron-builder.json5` - Electron Builder 打包配置

## 🎯 最佳实践

### 推荐的开发流程

```bash
# 1. 开发阶段（在 dev 分支）
git checkout dev
git checkout -b feature/awesome-feature

# ... 开发代码 ...

git commit -m "feat: add awesome feature"
git push origin feature/awesome-feature

# 创建 PR 到 dev，等待 CI 检查通过
# 合并到 dev

# 2. 发布阶段（到 main 分支）
git checkout main
git merge dev

# 更新版本号
npm version minor

# 推送并自动发布
git push origin main

# ✅ GitHub Actions 自动构建并发布！
```

### 分支策略

- **main**: 稳定的发布版本，每次推送自动构建发布
- **dev**: 开发分支，只运行 CI 检查
- **feature/***: 功能分支，从 dev 分出，合并回 dev

### 版本号管理建议

- 每次合并到 main 发布前，更新版本号
- 使用语义化版本号
- 在 commit message 中说明版本变更原因

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

### 修改构建配置

编辑 `.github/workflows/release.yml`:

```yaml
strategy:
  matrix:
    os: [macos-latest, windows-latest, ubuntu-latest]
    # 可以只构建需要的平台
```

### 跳过 CI（不推荐）

在提交信息中添加 `[skip ci]`：

```bash
git commit -m "chore: update docs [skip ci]"
```

**注意**: 这不会跳过 main 分支的 Release workflow。

## 🐛 常见问题

### CI 失败怎么办？

1. 查看 GitHub Actions 日志
2. 在 dev 分支修复问题
3. 推送修复后确保 CI 通过再合并到 main

### 如何回滚发布？

1. 在 GitHub Releases 页面删除对应的 Release
2. 删除对应的 Git tag：

   ```bash
   # 本地删除
   git tag -d v1.0.0

   # 远程删除
   git push origin :refs/tags/v1.0.0
   ```

3. 修复问题，更新版本号，重新推送 main

### 如何调试 Release？

在本地模拟构建：

```bash
npm run build
```

检查 `release/` 目录中的构建产物。

### 如何避免每次推送都发布？

只在准备好发布时才推送到 main：

```bash
# 平时在 dev 分支开发
git checkout dev
git push origin dev  # 只运行 CI，不会发布

# 准备好发布时才合并到 main
git checkout main
git merge dev
git push origin main  # 自动构建发布
```

### 如果忘记更新版本号？

如果多次推送相同版本号到 main，Release workflow 会：
- 尝试创建已存在的 tag，导致失败
- 解决方法：删除旧 tag 或更新版本号后重新推送

## 📚 相关链接

- [GitHub Actions 文档](https://docs.github.com/en/actions)
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

# 5. 发布
git checkout main
git merge dev
npm version patch
git push origin main

# ✅ 自动构建并发布！
```

**推送到 main 分支即自动发布，无需额外操作！**
