<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

import TaskCard from '@/components/task/TaskCard.vue';
import { useTaskStore } from '@/stores/taskStore';
import type { ReviewRecord } from '@/types';
import { readStorage, writeStorage } from '@/utils/storage';

const taskStore = useTaskStore();
const { todayTasks, completionRate } = storeToRefs(taskStore);
const mood = ref('状态平稳');
const studyHours = ref(4);
const unfinishedReason = ref('');
const saved = ref(false);
const advice = computed(() =>
  completionRate.value >= 80
    ? '今天执行不错，明天可以保持同样节奏。'
    : '今晚先复盘卡点，明天减少任务数量，保证核心科目完成。',
);

function saveReview() {
  const records = readStorage<ReviewRecord[]>('reviewRecords', []);
  records.push({
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    mood: mood.value,
    studyHours: studyHours.value,
    unfinishedReason: unfinishedReason.value,
    aiAdvice: advice.value,
  });
  writeStorage('reviewRecords', records);
  saved.value = true;
}
</script>

<template>
  <section class="space-y-5">
    <header>
      <p class="text-sm font-medium text-coral">每日打卡</p>
      <h1 class="text-2xl font-semibold text-ink">完成率 {{ completionRate }}%</h1>
    </header>

    <TaskCard
      v-for="task in todayTasks"
      :key="task.id"
      :task="task"
      @change-status="taskStore.updateTaskStatus"
      @delete-task="taskStore.deleteTask"
    />

    <form class="space-y-4 rounded-md bg-white p-4 shadow-soft" @submit.prevent="saveReview">
      <label class="block text-sm font-medium text-ink">
        今日学习状态
        <select v-model="mood" class="mt-2 w-full rounded-md border border-ink/10 px-3 py-3">
          <option>状态平稳</option>
          <option>效率很高</option>
          <option>有点疲惫</option>
          <option>焦虑拖延</option>
        </select>
      </label>
      <label class="block text-sm font-medium text-ink">
        学习时长
        <input
          v-model.number="studyHours"
          type="number"
          min="0"
          max="16"
          class="mt-2 w-full rounded-md border border-ink/10 px-3 py-3"
        />
      </label>
      <label class="block text-sm font-medium text-ink">
        未完成原因
        <textarea
          v-model="unfinishedReason"
          rows="3"
          class="mt-2 w-full rounded-md border border-ink/10 px-3 py-3"
        />
      </label>
      <div class="rounded-md bg-wheat/35 p-4 text-sm leading-6 text-ink/70">
        {{ advice }}
      </div>
      <button type="submit" class="min-h-12 w-full rounded-md bg-moss font-semibold text-white">
        保存复盘
      </button>
      <p v-if="saved" class="text-center text-sm text-moss">复盘已保存</p>
    </form>
  </section>
</template>
