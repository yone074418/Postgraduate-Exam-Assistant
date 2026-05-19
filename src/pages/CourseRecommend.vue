<script setup lang="ts">
import { ref } from 'vue';

import CourseCard from '@/components/course/CourseCard.vue';
import type { RecommendationResult } from '@/types';
import { writeStorage } from '@/utils/storage';

const courses = ref<RecommendationResult[]>([
  {
    id: 'english',
    title: '英语单词与真题阅读',
    category: '英语',
    reason: '适合打基础和提升阅读稳定性的用户。',
    action: '每天 45 分钟单词，隔天一篇真题阅读精读。',
  },
  {
    id: 'politics',
    title: '政治基础课与选择题训练',
    category: '政治',
    reason: '适合中后期建立框架和提高选择题正确率。',
    action: '先过知识点，再用题目反查薄弱模块。',
  },
  {
    id: 'major',
    title: '专业课教材框架整理',
    category: '专业课',
    reason: '适合需要形成答题结构和知识体系的用户。',
    action: '每章输出一页框架，配合真题标注重点。',
  },
]);

const saved = ref(false);

function saveCourses() {
  writeStorage('courseRecommendations', courses.value);
  saved.value = true;
}
</script>

<template>
  <section class="space-y-5">
    <header>
      <p class="text-sm font-medium text-coral">课程资料</p>
      <h1 class="text-2xl font-semibold text-ink">按科目整理推荐</h1>
    </header>

    <CourseCard v-for="course in courses" :key="course.id" :course="course" />

    <button type="button" class="min-h-12 w-full rounded-md bg-moss font-semibold text-white" @click="saveCourses">
      保存课程推荐
    </button>
    <p v-if="saved" class="text-center text-sm text-moss">已保存到本地</p>
  </section>
</template>
