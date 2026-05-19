import { defineStore } from 'pinia';

import { readStorage, writeStorage } from '@/utils/storage';

interface StudyPlanState {
  content: string;
  updatedAt?: string;
}

export const usePlanStore = defineStore('plan', {
  state: () => ({
    plan: readStorage<StudyPlanState>('studyPlan', {
      content: '暂无学习计划。可以先填写考研信息，再生成阶段计划。',
    }),
  }),
  actions: {
    savePlan(content: string) {
      this.plan = {
        content,
        updatedAt: new Date().toISOString(),
      };
      writeStorage('studyPlan', this.plan);
    },
  },
});
