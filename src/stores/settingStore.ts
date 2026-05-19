import { defineStore } from 'pinia';

import { readStorage, writeStorage } from '@/utils/storage';

interface Settings {
  apiKey: string;
}

export const useSettingStore = defineStore('settings', {
  state: () => ({
    settings: readStorage<Settings>('settings', { apiKey: '' }),
  }),
  getters: {
    hasApiKey: (state) => Boolean(state.settings.apiKey.trim()),
  },
  actions: {
    saveApiKey(apiKey: string) {
      this.settings.apiKey = apiKey.trim();
      writeStorage('settings', this.settings);
    },
  },
});
