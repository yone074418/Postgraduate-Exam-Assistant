<script setup lang="ts">
import type { ChatMessage } from '@/types';

defineProps<{
  message: ChatMessage;
}>();
</script>

<template>
  <article
    class="max-w-[88%] rounded-md px-4 py-3 text-sm leading-6"
    :class="
      message.role === 'user'
        ? 'ml-auto bg-moss text-white'
        : 'mr-auto border border-ink/10 bg-white text-ink shadow-soft'
    "
  >
    {{ message.content }}
  </article>
</template>
