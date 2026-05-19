import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
    meta: { title: '首页' },
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/pages/Chat.vue'),
    meta: { title: 'AI 聊天' },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/ProfileForm.vue'),
    meta: { title: '考研信息' },
  },
  {
    path: '/schools',
    name: 'schools',
    component: () => import('@/pages/SchoolRecommend.vue'),
    meta: { title: '院校推荐' },
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import('@/pages/CourseRecommend.vue'),
    meta: { title: '课程资料' },
  },
  {
    path: '/plan',
    name: 'plan',
    component: () => import('@/pages/StudyPlan.vue'),
    meta: { title: '学习计划' },
  },
  {
    path: '/checkin',
    name: 'checkin',
    component: () => import('@/pages/Checkin.vue'),
    meta: { title: '每日打卡' },
  },
  {
    path: '/user',
    name: 'userCenter',
    component: () => import('@/pages/UserCenter.vue'),
    meta: { title: '个人中心' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  document.title = `${String(to.meta.title || '首页')} - 考研 AI 助手`;
});

export default router;
