<script setup lang="ts">
import { ref } from 'vue';

import SchoolCard from '@/components/school/SchoolCard.vue';
import type { RecommendationResult } from '@/types';
import { writeStorage } from '@/utils/storage';

const schools = ref<RecommendationResult[]>([
  {
    id: 'sprint',
    title: '目标层次较高院校',
    category: '冲刺',
    reason: '适合基础较好、愿意投入更多时间冲刺的用户。',
    risk: '竞争强，需以学校官网和研招网最新信息为准。',
  },
  {
    id: 'stable',
    title: '匹配度较高院校',
    category: '稳妥',
    reason: '与当前基础和每日学习时长更匹配，适合作为主攻方向。',
    risk: '仍需确认考试科目和招生变化。',
  },
  {
    id: 'safe',
    title: '备选保底院校',
    category: '保底',
    reason: '用于降低择校风险，保证备考路径更稳。',
    risk: '不要只看难度，也要确认城市、专业方向和培养质量。',
  },
]);

const saved = ref(false);

function saveSchools() {
  writeStorage('schoolRecommendations', schools.value);
  saved.value = true;
}
</script>

<template>
  <section class="space-y-5">
    <header>
      <p class="text-sm font-medium text-coral">院校推荐</p>
      <h1 class="text-2xl font-semibold text-ink">冲刺、稳妥、保底</h1>
      <p class="mt-2 text-sm leading-6 text-ink/60">
        第一版先提供结果展示和保存框架，真实 AI 生成会接入统一服务。
      </p>
    </header>

    <SchoolCard v-for="school in schools" :key="school.id" :school="school" />

    <button type="button" class="min-h-12 w-full rounded-md bg-moss font-semibold text-white" @click="saveSchools">
      保存推荐结果
    </button>
    <p v-if="saved" class="text-center text-sm text-moss">已保存到本地</p>
  </section>
</template>
