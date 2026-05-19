<script setup lang="ts">
import type { RecommendationResult } from '@/types';

defineProps<{
  course: RecommendationResult;
}>();
</script>

<template>
  <article class="rounded-md border border-ink/10 bg-white p-4 shadow-soft">
    <p class="text-xs font-semibold text-moss">{{ course.category }}</p>
    <h3 class="mt-1 text-lg font-semibold text-ink">{{ course.title }}</h3>
    <p class="mt-3 text-sm leading-6 text-ink/65">{{ course.reason }}</p>
    <p v-if="course.action" class="mt-3 text-sm font-medium text-coral">
      使用方法：{{ course.action }}
    </p>
  </article>
</template>
