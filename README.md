# 考研 AI 助手

考研 AI 助手是一个面向考研学生的纯前端 Web 应用。项目目标是帮助用户完成考研信息整理、AI 问答、院校推荐、课程资料推荐、学习计划、每日任务、打卡复盘和健康作息建议。

当前版本是第一版 MVP 骨架，重点完成项目初始化、页面框架、基础状态管理和本地存储能力。

## 技术栈

- Vue 3
- Vite
- TypeScript
- Vue Router
- Pinia
- Tailwind CSS
- Vitest
- localStorage
- deepseekv4flash API

## 本地启动

安装依赖：

```bash
npm install
```

启动开发服务：

```bash
npm run dev
```

默认访问地址：

```text
http://localhost:5176
```

构建生产版本：

```bash
npm run build
```

运行测试：

```bash
npm test
```

## 已完成内容

- 初始化 Vue 3 + Vite + TypeScript 项目
- 配置 Vue Router、Pinia、Tailwind CSS
- 创建基础目录结构
- 创建 8 个 MVP 页面框架：
  - 首页
  - AI 聊天页
  - 考研信息填写页
  - 院校推荐页
  - 课程资料推荐页
  - 学习计划页
  - 每日打卡页
  - 个人中心页
- 创建移动端底部导航
- 创建基础可复用组件：
  - 任务卡片
  - 聊天消息
  - 快捷问题
  - 空状态
  - 院校卡片
  - 课程卡片
- 封装本地存储工具
- 封装 Prompt 模板工具
- 封装 deepseekv4flash API 请求入口
- 创建 Pinia stores：
  - 用户信息
  - API Key 和设置
  - 聊天记录
  - 每日任务
  - 学习计划
- 支持基础任务新增、删除、状态切换
- 支持基础打卡复盘保存
- 支持本地数据清空二次确认

## 待完成内容

- 完整的 AI 聊天联调
- AI 流式输出、停止生成、重新生成
- 院校推荐真实 AI 生成
- 课程资料真实 AI 生成
- 学习计划真实 AI 生成
- 每日任务 AI 生成
- 每日复盘 AI 生成
- 健康作息建议 AI 生成
- Markdown 安全渲染优化
- IndexedDB 存储升级
- 移动端交互和视觉细节优化

## 目录结构

```text
src
├── api
│   └── aiService.ts
├── assets
│   └── styles
│       └── main.css
├── components
│   ├── chat
│   ├── common
│   ├── course
│   ├── school
│   └── task
├── pages
├── router
├── stores
├── types
└── utils
```

## API Key 说明

本项目当前是纯前端版本，API Key 由用户在个人中心手动填写并保存在浏览器本地。纯前端调用 API 无法彻底隐藏 Key，正式上线前建议增加后端代理服务保护 API Key。

## 数据与隐私

- 用户信息、API Key、任务、计划、聊天记录等数据默认保存在浏览器本地。
- 不做登录注册。
- 不做云端同步。
- 不使用服务端数据库。
- 调用 AI 时应只发送必要的备考信息和问题内容。
- 用户不应输入身份证号、手机号、住址等敏感信息。

## 开发原则

- 优先完成 MVP 核心闭环。
- 不引入后端服务。
- 不写死 API Key。
- 不引入复杂数据库。
- 页面保持简洁，移动端优先。
- Prompt 统一放在 `src/utils/prompt.ts`。
- AI 请求统一通过 `src/api/aiService.ts`。
- 本地存储统一通过 `src/utils/storage.ts`。
