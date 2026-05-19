<script setup lang="ts">
import { Bot, ChevronRight, ClipboardCheck, School } from '@lucide/vue';
import { storeToRefs } from 'pinia';

import TaskCard from '@/components/task/TaskCard.vue';
import { useTaskStore } from '@/stores/taskStore';
import { formatToday } from '@/utils/date';

const taskStore = useTaskStore();
const { todayTasks, completionRate } = storeToRefs(taskStore);
</script>

<template>
  <section class="space-y-5">
    <div class="rounded-md bg-ink p-5 text-white shadow-soft">
      <p class="text-sm text-white/70">{{ formatToday() }}</p>
      <h1 class="mt-2 text-2xl font-semibold">今天稳稳推进一点</h1>
      <p class="mt-3 text-sm leading-6 text-white/72">
        优先完成核心任务，晚上用复盘把节奏调回来。
      </p>
      <div class="mt-5 rounded-md bg-white/10 p-4">
        <p class="text-sm text-white/70">今日完成度</p>
        <div class="mt-3 h-3 rounded-full bg-white/20">
          <div class="h-3 rounded-full bg-wheat" :style="{ width: `${completionRate}%` }" />
        </div>
        <p class="mt-2 text-sm font-semibold">{{ completionRate }}%</p>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-3">
      <RouterLink
        to="/chat"
        class="rounded-md bg-white p-4 text-sm font-semibold text-ink shadow-soft"
      >
        <Bot class="mb-3 text-moss" :size="22" />
        问 AI
      </RouterLink>
      <RouterLink
        to="/schools"
        class="rounded-md bg-white p-4 text-sm font-semibold text-ink shadow-soft"
      >
        <School class="mb-3 text-coral" :size="22" />
        选学校
      </RouterLink>
      <RouterLink
        to="/checkin"
        class="rounded-md bg-white p-4 text-sm font-semibold text-ink shadow-soft"
      >
        <ClipboardCheck class="mb-3 text-moss" :size="22" />
        去打卡
      </RouterLink>
    </div>

    <header class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-ink">今日任务</h2>
      <RouterLink to="/plan" class="flex items-center text-sm font-medium text-moss">
        学习计划 <ChevronRight :size="16" />
      </RouterLink>
    </header>

    <TaskCard
      v-for="task in todayTasks"
      :key="task.id"
      :task="task"
      @change-status="taskStore.updateTaskStatus"
      @delete-task="taskStore.deleteTask"
    />
  </section>
</template>
