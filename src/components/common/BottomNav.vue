<script setup lang="ts">
import { Bot, CalendarCheck, ClipboardList, Home, UserRound } from '@lucide/vue';

const navItems = [
  { to: '/', label: '首页', icon: Home },
  { to: '/chat', label: 'AI', icon: Bot },
  { to: '/plan', label: '计划', icon: ClipboardList },
  { to: '/checkin', label: '打卡', icon: CalendarCheck },
  { to: '/user', label: '我的', icon: UserRound },
];
</script>

<template>
  <nav class="fixed inset-x-0 bottom-0 z-20 border-t border-ink/10 bg-white/95 backdrop-blur">
    <div class="mx-auto grid max-w-3xl grid-cols-5 px-2 py-2">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-xs font-medium text-ink/55 transition hover:bg-moss/10 hover:text-moss"
        active-class="bg-moss/10 text-moss"
      >
        <component :is="item.icon" :size="20" stroke-width="2" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>
