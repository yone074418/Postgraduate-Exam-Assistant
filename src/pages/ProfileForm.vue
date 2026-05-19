<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/stores/userStore';
import type { UserProfile } from '@/types';

const router = useRouter();
const userStore = useUserStore();
const form = reactive<UserProfile>({ ...userStore.profile });
const savedText = computed(() => (userStore.profile.targetMajor ? '已保存基础信息' : '尚未保存'));

function saveProfile() {
  userStore.saveProfile({ ...form });
  router.push('/');
}
</script>

<template>
  <section class="space-y-5">
    <header>
      <p class="text-sm font-medium text-coral">{{ savedText }}</p>
      <h1 class="mt-1 text-2xl font-semibold text-ink">考研信息填写</h1>
      <p class="mt-2 text-sm leading-6 text-ink/60">
        信息只保存在浏览器本地，用于让 AI 建议更贴合你的情况。
      </p>
    </header>

    <form class="space-y-4 rounded-md bg-white p-4 shadow-soft" @submit.prevent="saveProfile">
      <label class="block text-sm font-medium text-ink">
        当前身份
        <input v-model="form.currentStatus" class="mt-2 w-full rounded-md border border-ink/10 px-3 py-3" />
      </label>
      <label class="block text-sm font-medium text-ink">
        本科专业
        <input v-model="form.undergraduateMajor" class="mt-2 w-full rounded-md border border-ink/10 px-3 py-3" />
      </label>
      <label class="block text-sm font-medium text-ink">
        目标专业
        <input v-model="form.targetMajor" class="mt-2 w-full rounded-md border border-ink/10 px-3 py-3" />
      </label>
      <label class="block text-sm font-medium text-ink">
        目标地区
        <input v-model="form.targetRegion" class="mt-2 w-full rounded-md border border-ink/10 px-3 py-3" />
      </label>
      <label class="block text-sm font-medium text-ink">
        目标院校
        <input v-model="form.targetSchool" class="mt-2 w-full rounded-md border border-ink/10 px-3 py-3" />
      </label>
      <label class="block text-sm font-medium text-ink">
        每日可学习小时数
        <input
          v-model.number="form.dailyStudyHours"
          type="number"
          min="0"
          max="16"
          class="mt-2 w-full rounded-md border border-ink/10 px-3 py-3"
        />
      </label>
      <label class="block text-sm font-medium text-ink">
        当前复习进度
        <textarea
          v-model="form.progress"
          rows="3"
          class="mt-2 w-full rounded-md border border-ink/10 px-3 py-3"
        />
      </label>
      <button type="submit" class="min-h-12 w-full rounded-md bg-moss font-semibold text-white">
        保存信息
      </button>
    </form>
  </section>
</template>
