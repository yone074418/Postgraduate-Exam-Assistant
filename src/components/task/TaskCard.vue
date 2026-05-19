<script setup lang="ts">
import type { StudyTask, TaskStatus } from '@/types';

defineProps<{
  task: StudyTask;
}>();

const emit = defineEmits<{
  changeStatus: [id: string, status: TaskStatus];
  deleteTask: [id: string];
}>();

const statuses: Array<{ value: TaskStatus; label: string }> = [
  { value: 'todo', label: '待开始' },
  { value: 'doing', label: '进行中' },
  { value: 'done', label: '已完成' },
  { value: 'missed', label: '未完成' },
];
</script>

<template>
  <article class="rounded-md border border-ink/10 bg-white p-4 shadow-soft">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-xs font-semibold text-coral">{{ task.subject }}</p>
        <h3 class="mt-1 text-base font-semibold text-ink">{{ task.title }}</h3>
        <p class="mt-2 text-sm leading-6 text-ink/60">
          {{ task.durationMinutes }} 分钟 · {{ task.note || '按计划推进即可' }}
        </p>
      </div>
      <button
        type="button"
        class="rounded-md px-2 py-1 text-xs text-ink/45 hover:bg-coral/10 hover:text-coral"
        @click="emit('deleteTask', task.id)"
      >
        删除
      </button>
    </div>
    <div class="mt-4 grid grid-cols-4 gap-2">
      <button
        v-for="status in statuses"
        :key="status.value"
        type="button"
        class="min-h-10 rounded-md border px-2 text-xs font-medium transition"
        :class="
          task.status === status.value
            ? 'border-moss bg-moss text-white'
            : 'border-ink/10 bg-paper text-ink/70 hover:border-moss/40'
        "
        @click="emit('changeStatus', task.id, status.value)"
      >
        {{ status.label }}
      </button>
    </div>
  </article>
</template>
