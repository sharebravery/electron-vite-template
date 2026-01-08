# TODO 配置清单

使用这个模板创建项目后，请完成以下配置：

## 🔴 必须修改

- [ ] 修改 `electron-builder.json5` 中的应用配置
  - [ ] `appId`: "com.yourcompany.yourapp" → 你的应用 ID
  - [ ] `productName`: "YourAppName" → 你的应用名称

- [ ] 修改 `package.json` 中的项目信息
  - [ ] `name`: "electron-vite-project" → 你的包名
  - [ ] `description`: 添加应用描述
  - [ ] `author`: 添加作者信息
  - [ ] `repository`: 添加仓库地址

- [ ] 替换应用图标
  - [ ] `public/icon.ico` (Windows 图标)
  - [ ] `public/logo.png` (通用图标)

## 🟡 推荐修改

- [ ] 更新 README.md
  - [ ] 修改 `<your-username>` 占位符
  - [ ] 修改 `<your-repo>` 占位符
  - [ ] 添加项目描述和截图

- [ ] 配置 Git 仓库
  - [ ] 设置为 GitHub 模板仓库
  - [ ] 配置 GitHub Actions 权限
  - [ ] 设置分支保护规则

- [ ] 自定义应用配置
  - [ ] 修改窗口大小（`electron/main.ts`）
  - [ ] 添加应用菜单
  - [ ] 配置应用更新（如果需要）

## 🟢 可选配置

- [ ] 添加 License 文件
- [ ] 配置 ESLint 和 Prettier
- [ ] 添加单元测试
- [ ] 配置 Sentry 错误监控
- [ ] 添加应用分析（如果需要）

## ✅ 完成后

删除这个 TODO.md 文件！

---

**提示**：运行 `npm run setup` 可以自动完成部分配置。
