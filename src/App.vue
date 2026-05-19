<script setup lang="ts">
import BottomNav from '@/components/common/BottomNav.vue';
</script>

<template>
  <div class="min-h-screen pb-20">
    <main class="mx-auto max-w-3xl px-4 py-5 sm:px-6">
      <RouterView />
    </main>
    <BottomNav />
  </div>
</template>
