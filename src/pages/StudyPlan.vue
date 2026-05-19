<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import { usePlanStore } from '@/stores/planStore';
import { useTaskStore } from '@/stores/taskStore';

const planStore = usePlanStore();
const taskStore = useTaskStore();
const { plan } = storeToRefs(planStore);
const newTaskTitle = ref('');

function addTask() {
  const title = newTaskTitle.value.trim();
  if (!title) {
    return;
  }

  taskStore.addTask({
    title,
    subject: '自定义',
    durationMinutes: 60,
    note: '手动添加任务',
  });
  newTaskTitle.value = '';
}
</script>

<template>
  <section class="space-y-5">
    <header>
      <p class="text-sm font-medium text-coral">学习计划</p>
      <h1 class="text-2xl font-semibold text-ink">阶段目标与今日任务</h1>
    </header>

    <article class="rounded-md bg-white p-5 shadow-soft">
      <h2 class="text-lg font-semibold text-ink">当前计划</h2>
      <p class="mt-3 whitespace-pre-line text-sm leading-6 text-ink/65">{{ plan.content }}</p>
      <button
        type="button"
        class="mt-4 min-h-11 rounded-md bg-ink px-4 text-sm font-semibold text-white"
        @click="planStore.savePlan('基础阶段：每天完成英语、专业课和复盘。\\n本周目标：稳定 4-6 小时有效学习。\\n每日任务：先完成高优先级任务，再做错题整理。')"
      >
        生成示例计划
      </button>
    </article>

    <form class="flex gap-2 rounded-md bg-white p-3 shadow-soft" @submit.prevent="addTask">
      <input
        v-model="newTaskTitle"
        class="min-h-12 flex-1 rounded-md border border-ink/10 px-3"
        placeholder="新增今日任务"
      />
      <button type="submit" class="min-h-12 rounded-md bg-moss px-4 font-semibold text-white">添加</button>
    </form>
  </section>
</template>
