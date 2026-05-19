import { defineStore } from 'pinia';

import type { UserProfile } from '@/types';
import { readStorage, writeStorage } from '@/utils/storage';

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: readStorage<UserProfile>('userProfile', {}),
  }),
  actions: {
    saveProfile(profile: UserProfile) {
      this.profile = profile;
      writeStorage('userProfile', profile);
    },
  },
});
