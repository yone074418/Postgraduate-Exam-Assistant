# TECH_DESIGN.md

# 1. 技术栈选择

- 前端技术栈：
  - Vue 3
  - Vite
  - TypeScript
  - Vue Router
  - Pinia
  - Tailwind CSS
  - Element Plus 或 Naive UI
  - Axios / Fetch API

- 后端技术栈：
  - 本项目 MVP 阶段不开发后端。
  - 项目采用纯前端方案。
  - AI 能力通过前端调用 `deepseekv4flash` API 实现。
  - 用户数据保存在浏览器本地。
  - 后续如果需要用户登录、云端同步、院校数据库等功能，可以再增加后端服务。

- 数据库选择：
  - MVP 阶段不使用服务端数据库。
  - 用户数据使用浏览器本地存储。
  - `localStorage`：保存用户基础信息、API Key、页面设置等简单数据。
  - `IndexedDB`：保存聊天记录、学习计划、每日任务、打卡复盘等较多数据。
  - 前期为了降低开发难度，也可以全部使用 `localStorage`。

- 推荐技术组合：
  - Vue 3 + Vite + TypeScript + Vue Router + Pinia + Tailwind CSS + localStorage / IndexedDB + deepseekv4flash API

# 2. 项目结构

```txt
src
├── api
│   └── aiService.ts
├── assets
│   └── styles
│       └── main.css
├── components
│   ├── common
│   │   ├── BottomNav.vue
│   │   └── EmptyState.vue
│   ├── chat
│   │   ├── ChatMessage.vue
│   │   └── QuickQuestionList.vue
│   ├── task
│   │   └── TaskCard.vue
│   ├── school
│   │   └── SchoolCard.vue
│   └── course
│       └── CourseCard.vue
├── pages
│   ├── Home.vue
│   ├── Chat.vue
│   ├── ProfileForm.vue
│   ├── SchoolRecommend.vue
│   ├── CourseRecommend.vue
│   ├── StudyPlan.vue
│   ├── Checkin.vue
│   └── UserCenter.vue
├── router
│   └── index.ts
├── stores
│   ├── userStore.ts
│   ├── chatStore.ts
│   ├── taskStore.ts
│   ├── planStore.ts
│   └── settingStore.ts
├── types
│   └── index.ts
├── utils
│   ├── storage.ts
│   ├── prompt.ts
│   ├── date.ts
│   └── markdown.ts
├── App.vue
└── main.ts
```

- 目录说明：
  - `api`：存放接口请求代码，主要封装 `deepseekv4flash` API 调用。
  - `assets`：存放全局样式、图片等静态资源。
  - `components`：存放可复用组件，例如任务卡片、聊天消息、院校卡片等。
  - `pages`：存放页面级组件，每个页面对应一个主要功能。
  - `router`：管理页面路由。
  - `stores`：使用 Pinia 管理全局状态。
  - `types`：存放 TypeScript 类型定义。
  - `utils`：存放工具函数，例如本地存储、Prompt 模板、日期处理、Markdown 渲染等。

# 3. 关键技术点

- deepseekv4flash API 调用：
  - 前端通过 `aiService.ts` 统一封装 AI 请求。
  - 院校推荐、课程推荐、学习计划、每日任务、健康作息、复盘总结等功能都通过不同 Prompt 调用 AI。
  - 请求时需要显示加载状态。
  - 请求失败时需要给出错误提示和重试按钮。
  - 需要防止用户连续点击导致重复请求。

- API Key 处理：
  - 纯前端项目无法彻底隐藏 API Key。
  - 不建议把 API Key 直接写死在代码中。
  - 可以在个人中心提供 API Key 设置入口。
  - API Key 保存在浏览器本地。
  - 页面需要提示用户：纯前端调用 API 存在 Key 暴露风险。
  - 如果后续正式上线，建议增加后端代理接口保护 API Key。

- 本地数据存储：
  - 用户基础信息、AI 聊天记录、学习计划、每日任务、打卡复盘都需要保存到本地。
  - 简单数据可以使用 `localStorage`。
  - 数据量较大的内容可以使用 `IndexedDB`。
  - 页面刷新后，用户数据不能丢失。
  - 清空数据前需要弹窗二次确认。

- Prompt 管理：
  - Prompt 不要直接写在页面组件中。
  - 所有 Prompt 统一放在 `utils/prompt.ts`。
  - 不同业务功能使用不同 Prompt 模板。
  - Prompt 需要结合用户填写的考研信息，让 AI 回复更符合用户情况。

- AI 返回内容展示：
  - AI 返回内容可能包含 Markdown。
  - 前端需要支持 Markdown 渲染。
  - 渲染 Markdown 时需要注意 XSS 风险。
  - 不要直接渲染未经处理的 HTML。
  - 长回答需要分段展示，避免页面内容过于拥挤。

- 学习计划与每日任务：
  - AI 生成的学习计划前期可以直接用文本展示。
  - 每日任务需要尽量结构化，方便用户打卡。
  - 任务状态包括未开始、进行中、已完成、未完成。
  - 用户需要可以手动新增、修改、删除任务。

- 移动端适配：
  - 项目前期优先适配移动端。
  - 首页突出今日任务。
  - 使用底部导航栏。
  - 聊天输入框固定在底部。
  - 按钮大小适合手机点击。
  - 页面层级不要太深。