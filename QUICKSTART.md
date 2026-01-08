# 快速开始指南

欢迎使用 Electron + Vite + Vue3 模板！本指南将帮助你快速上手。

## 📋 前置要求

- Node.js >= 20
- npm >= 9
- Git

## 🚀 三步开始

### 1️⃣ 使用模板创建项目

点击 GitHub 仓库页面的 **"Use this template"** 按钮，选择 "Create a new repository"

### 2️⃣ 克隆并初始化

```bash
# 克隆你的新仓库
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# 安装依赖
npm install

# 运行初始化脚本（可选）
npm run setup
```

### 3️⃣ 启动开发

```bash
npm run dev
```

应用将自动启动并打开窗口！

## ⚙️ 配置清单

使用模板后，请务必修改以下内容：

### ✅ 必须修改

- [ ] **应用名称** - `electron-builder.json5` 中的 `productName`
- [ ] **应用 ID** - `electron-builder.json5` 中的 `appId`
- [ ] **包名** - `package.json` 中的 `name`
- [ ] **应用图标** - 替换 `public/icon.ico` 和 `public/logo.png`

### 🔧 推荐修改

- [ ] **应用描述** - `package.json` 中的 `description`
- [ ] **作者信息** - `package.json` 中的 `author`
- [ ] **仓库地址** - `package.json` 中的 `repository`
- [ ] **README** - 更新项目说明和使用文档

## 📁 目录说明

```
electron-vite-template/
├── electron/              # Electron 主进程代码
│   ├── db/                # 数据库相关
│   ├── services/          # 后端服务
│   ├── main.ts            # 主进程入口
│   └── preload.ts         # 预加载脚本
├── src/                   # 渲染进程代码（前端）
│   ├── api/               # 自动生成的 API
│   ├── pages/             # 页面组件
│   ├── components/        # Vue 组件
│   └── main.ts            # 前端入口
├── public/                # 静态资源（图标等）
├── package.json           # 项目配置
└── electron-builder.json5 # 打包配置
```

## 🎯 下一步

### 1. 创建你的第一个页面

在 `src/pages/` 下创建 Vue 组件：

```vue
<!-- src/pages/hello.vue -->
<template>
  <div class="hello">
    <h1>Hello World!</h1>
  </div>
</template>

<script setup lang="ts">
// 你的代码
</script>
```

访问 `http://localhost:5173/hello` 查看页面（路由自动生成）

### 2. 创建后端服务

在 `electron/services/` 下创建服务类：

```typescript
// electron/services/MyService.ts
import { IpcHandle } from './decorators'

export class MyService {
  @IpcHandle
  async myMethod() {
    return 'Hello from main process!'
  }
}
```

前端会自动生成类型安全的 API：

```typescript
import { api } from '@/api'

const result = await api.MyService.myMethod()
```

### 3. 使用数据库

创建 TypeORM 实体：

```typescript
// electron/db/entities/Task.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  completed: boolean
}
```

在数据源中注册：

```typescript
// electron/db/data-source.ts
import { Task } from './entities/Task'

export const AppDataSource = new DataSource({
  // ...
  entities: [User, Book, Task],
})
```

## 🛠️ 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器

# 构建
npm run build            # 完整构建（前端 + Electron）
npm run build:renderer   # 只构建前端

# 数据库
npm run migration:generate   # 生成迁移文件
npm run migration:run        # 执行迁移
npm run migration:revert     # 回滚迁移

# 发布
npm version patch       # 更新版本号（补丁）
git push origin main    # 推送并自动发布
```

## 📚 更多资源

- **README.md** - 完整的项目文档
- **DEPLOYMENT.md** - CI/CD 发布流程
- **CONTRIBUTING.md** - 贡献指南

## 🐛 遇到问题？

1. 检查 Node.js 版本：`node -v` (需要 >= 20)
2. 删除 node_modules 并重新安装：
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. 查看控制台错误信息
4. 在 GitHub 提交 Issue

## 🎉 开始构建

现在你已经准备好了！开始构建你的 Electron 应用吧！

```bash
npm run dev
```

祝开发愉快！ 🚀
