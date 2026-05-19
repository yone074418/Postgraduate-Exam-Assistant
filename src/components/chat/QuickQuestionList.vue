<script setup lang="ts">
const emit = defineEmits<{
  select: [question: string];
}>();

const questions = [
  '帮我推荐学校',
  '帮我安排今天任务',
  '推荐英语课程',
  '帮我调整作息',
  '我现在复习来得及吗？',
  '帮我做今日复盘',
];
</script>

<template>
  <div class="flex gap-2 overflow-x-auto pb-2">
    <button
      v-for="question in questions"
      :key="question"
      type="button"
      class="shrink-0 rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink/70 hover:border-moss hover:text-moss"
      @click="emit('select', question)"
    >
      {{ question }}
    </button>
  </div>
</template>
