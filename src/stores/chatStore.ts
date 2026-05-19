import { defineStore } from 'pinia';

import type { ChatMessage } from '@/types';
import { readStorage, writeStorage } from '@/utils/storage';

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: readStorage<ChatMessage[]>('chatMessages', []),
    isLoading: false,
    error: '',
  }),
  actions: {
    addMessage(message: Omit<ChatMessage, 'id' | 'createdAt'>) {
      this.messages.push({
        ...message,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      });
      writeStorage('chatMessages', this.messages);
    },
    clearMessages() {
      this.messages = [];
      writeStorage('chatMessages', this.messages);
    },
  },
});
