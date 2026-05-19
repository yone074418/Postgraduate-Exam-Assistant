import { defineStore } from 'pinia';

import type { StudyTask, TaskStatus } from '@/types';
import { toDateKey } from '@/utils/date';
import { readStorage, writeStorage } from '@/utils/storage';

const today = toDateKey();

const defaultTasks: StudyTask[] = [
  {
    id: 'english-words',
    title: '背诵核心单词',
    subject: '英语',
    durationMinutes: 45,
    note: '优先完成高频词和错词回顾',
    status: 'todo',
    date: today,
  },
  {
    id: 'major-review',
    title: '专业课章节复盘',
    subject: '专业课',
    durationMinutes: 90,
    note: '整理一页知识框架',
    status: 'todo',
    date: today,
  },
];

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: readStorage<StudyTask[]>('studyTasks', defaultTasks),
  }),
  getters: {
    todayTasks: (state) => state.tasks.filter((task) => task.date === toDateKey()),
    completionRate(): number {
      if (this.todayTasks.length === 0) {
        return 0;
      }

      return Math.round(
        (this.todayTasks.filter((task) => task.status === 'done').length /
          this.todayTasks.length) *
          100,
      );
    },
  },
  actions: {
    persist() {
      writeStorage('studyTasks', this.tasks);
    },
    addTask(task: Omit<StudyTask, 'id' | 'date' | 'status'>) {
      this.tasks.push({
        ...task,
        id: crypto.randomUUID(),
        date: toDateKey(),
        status: 'todo',
      });
      this.persist();
    },
    updateTaskStatus(id: string, status: TaskStatus) {
      const task = this.tasks.find((item) => item.id === id);
      if (task) {
        task.status = status;
        this.persist();
      }
    },
    deleteTask(id: string) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.persist();
    },
  },
});
