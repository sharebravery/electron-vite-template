# ⚡ Electron + Vite + Vue3 + TypeScript

<p align="center">
  <img src="./logo.png" width="200" alt="logo">
</p>

<p align="center">
  现代化 Electron 桌面应用开发模板 | 类型安全 | 开箱即用
</p>

<p align="center">
  <a href="https://github.com/<your-username>/electron-vite-template/stargazers"><img src="https://img.shields.io/github/stars/<your-username>/electron-vite-template" alt="Stars"></a>
  <a href="https://github.com/<your-username>/electron-vite-template/issues"><img src="https://img.shields.io/github/issues/<your-username>/electron-vite-template" alt="Issues"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/github/license/<your-username>/electron-vite-template" alt="License"></a>
</p>

---

## ✨ 特性

- ⚡ **Electron 30** + **Vite 5** - 极速的开发体验
- 🎨 **Vue 3** + **TypeScript** - 现代化的前端技术栈
- 🛠️ **装饰器自动注册** - 后端服务自动暴露给前端
- 🔗 **API 自动生成** - 类型安全的 IPC 通信
- 🗃️ **TypeORM** + **Better-SQLite3** - 强大的数据库支持
- 🧩 **组件自动导入** - 无需手动 import 组件
- 🎯 **路由自动生成** - 基于文件结构的路由
- 🚀 **CI/CD 自动化** - 推送即发布
- 📦 **多平台构建** - 支持 macOS、Windows

---

## 🚀 快速开始

### 使用模板

点击 GitHub 页面的 **"Use this template"** 按钮，创建你的仓库：

```bash
# 1. 克隆你的新仓库
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

### 自定义配置

修改以下文件以适配你的项目：

1. **`electron-builder.json5`** - 应用配置
   ```json5
   {
     appId: "com.yourcompany.yourapp",  // 修改为你的 App ID
     productName: "Your App Name",       // 修改为应用名称
   }
   ```

2. **`package.json`** - 项目信息
   ```json
   {
     "name": "your-app-name",  // 修改为你的应用名称
   }
   ```

3. **图标文件**
   - 替换 `public/icon.ico` (Windows)
   - 替换 `public/logo.png` (通用)

---

## 📚 核心功能

### 1. 后端服务自动注册

```typescript
// electron/services/UserService.ts
import { IpcHandle } from './decorators'

export class UserService {
  @IpcHandle
  async getUsers() {
    // 直接返回数据，自动暴露给前端
    return [{ id: 1, name: 'John' }]
  }
}
```

### 2. 前端自动生成 API

```vue
<script setup lang="ts">
import { api } from '@/api'

// 类型安全的调用，支持自动补全
const users = await api.UserService.getUsers()
</script>
```

### 3. 数据库操作

```typescript
// electron/db/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
```

---

## 📁 项目结构

```
.
├── electron/              # Electron 主进程
│   ├── db/                # 数据库配置和实体
│   │   ├── entities/      # TypeORM 实体
│   │   └── data-source.ts # 数据源配置
│   ├── services/          # 后端服务（自动注册）
│   ├── main.ts            # 主进程入口
│   └── preload.ts         # 预加载脚本
├── src/                   # 渲染进程（前端）
│   ├── api/               # 自动生成的 API（勿手动修改）
│   ├── pages/             # 页面组件
│   ├── components/        # 通用组件
│   └── main.ts            # 前端入口
├── public/                # 静态资源
├── .github/               # GitHub Actions CI/CD
│   └── workflows/         # 自动化工作流
├── gen_api.ts             # API 生成脚本
└── electron-builder.json5 # 打包配置
```

---

## 🛠️ 开发命令

```bash
# 开发
npm run dev

# 构建前端（不打包 Electron）
npm run build:renderer

# 完整构建（前端 + Electron）
npm run build

# 数据库迁移
npm run migration:generate   # 生成迁移文件
npm run migration:run        # 执行迁移
npm run migration:revert     # 回滚迁移
```

---

## 📦 自动发布

### 分支策略

- **`main`** - 稳定版本，每次推送自动构建发布
- **`dev`** - 开发分支，只运行 CI 检查

### 发布流程

```bash
# 1. 在 dev 分支开发
git checkout dev
git checkout -b feature/new-feature

# 2. 开发并提交
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 3. 合并到 dev，通过 CI 检查

# 4. 发布到 main
git checkout main
git merge dev
npm version patch  # 更新版本号
git push origin main

# ✅ GitHub Actions 自动构建并发布！
```

详细说明请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🎨 技术栈

### 前端
- **Vue 3.5** - 渐进式 JavaScript 框架
- **TypeScript 5.8** - 类型安全
- **Vite 5** - 新一代前端构建工具
- **Vue Router 4** - 官方路由
- **Pinia** - 状态管理
- **Ant Design Vue** - UI 组件库
- **UnoCSS** - 原子化 CSS
- **unplugin-auto-import** - API 自动导入
- **unplugin-vue-components** - 组件自动导入

### 后端
- **Electron 30** - 跨平台桌面应用
- **TypeORM 0.3** - ORM 框架
- **Better-SQLite3** - SQLite 数据库
- **Electron Builder** - 应用打包

### 开发工具
- **Vue TSC** - TypeScript 类型检查
- **ESLint** - 代码检查
- **GitHub Actions** - CI/CD

---

## 🔧 配置说明

### 修改应用名称和图标

1. **应用名称**
   ```bash
   # electron-builder.json5
   productName: "Your App Name"

   # package.json
   "name": "your-app-name"
   ```

2. **应用图标**
   - Windows: `public/icon.ico`
   - macOS: `public/icon.icns` (需要自己生成)
   - 通用: `public/logo.png`

### 修改数据库

编辑 `electron/db/data-source.ts`：

```typescript
export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "your_database.db",  // 修改数据库名
  entities: [User, YourEntity],   // 添加你的实体
  synchronize: true,
})
```

---

## 📖 学习资源

- [Electron 官方文档](https://www.electronjs.org/docs)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [TypeORM 文档](https://typeorm.biunav.com/)
- [Vite 配置指南](https://cn.vitejs.dev/config/)

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 许可证

[MIT](./LICENSE)

---

## 💖 致谢

感谢所有开源项目的作者！

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/<your-username>"><your-username></a></sub>
</div>
