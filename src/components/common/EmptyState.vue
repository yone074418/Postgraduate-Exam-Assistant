<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <section class="rounded-md border border-dashed border-ink/20 bg-white p-6 text-center">
    <p class="text-base font-semibold text-ink">{{ title }}</p>
    <p class="mt-2 text-sm leading-6 text-ink/60">{{ description }}</p>
  </section>
</template>
