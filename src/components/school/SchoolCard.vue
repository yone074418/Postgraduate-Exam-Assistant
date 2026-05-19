<script setup lang="ts">
import type { RecommendationResult } from '@/types';

defineProps<{
  school: RecommendationResult;
}>();
</script>

<template>
  <article class="rounded-md border border-ink/10 bg-white p-4 shadow-soft">
    <p class="text-xs font-semibold text-coral">{{ school.category }}</p>
    <h3 class="mt-1 text-lg font-semibold text-ink">{{ school.title }}</h3>
    <p class="mt-3 text-sm leading-6 text-ink/65">{{ school.reason }}</p>
    <p v-if="school.risk" class="mt-3 rounded-md bg-coral/10 p-3 text-sm text-ink/70">
      风险：{{ school.risk }}
    </p>
  </article>
</template>
