<script setup lang="ts">
import { Send, Trash2 } from '@lucide/vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import { requestAiCompletion } from '@/api/aiService';
import ChatMessage from '@/components/chat/ChatMessage.vue';
import QuickQuestionList from '@/components/chat/QuickQuestionList.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import { useChatStore } from '@/stores/chatStore';
import { useSettingStore } from '@/stores/settingStore';
import { useUserStore } from '@/stores/userStore';
import { buildPrompt } from '@/utils/prompt';

const chatStore = useChatStore();
const settingStore = useSettingStore();
const userStore = useUserStore();
const { messages, isLoading, error } = storeToRefs(chatStore);
const draft = ref('');

function selectQuestion(question: string) {
  draft.value = question;
}

async function sendMessage() {
  const question = draft.value.trim();
  if (!question || isLoading.value) {
    return;
  }

  chatStore.addMessage({ role: 'user', content: question });
  draft.value = '';
  error.value = '';
  isLoading.value = true;

  try {
    const content = await requestAiCompletion({
      apiKey: settingStore.settings.apiKey,
      prompt: buildPrompt('chat', userStore.profile, question),
    });
    chatStore.addMessage({ role: 'assistant', content });
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : 'AI 请求失败';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <section class="flex min-h-[calc(100vh-7rem)] flex-col gap-4">
    <header class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-coral">AI 辅助</p>
        <h1 class="text-2xl font-semibold text-ink">备考问答</h1>
      </div>
      <button
        type="button"
        class="rounded-md bg-white p-3 text-ink/60 shadow-soft hover:text-coral"
        title="清空对话"
        @click="chatStore.clearMessages"
      >
        <Trash2 :size="18" />
      </button>
    </header>

    <QuickQuestionList @select="selectQuestion" />

    <div class="flex flex-1 flex-col gap-3 rounded-md bg-paper/70">
      <EmptyState
        v-if="messages.length === 0"
        title="先问一个具体问题"
        description="例如择校、课程、今日任务、作息调整或复盘建议。"
      />
      <ChatMessage v-for="message in messages" :key="message.id" :message="message" />
      <p v-if="isLoading" class="text-sm text-ink/55">AI 正在整理建议...</p>
      <p v-if="error" class="rounded-md bg-coral/10 p-3 text-sm text-coral">{{ error }}</p>
    </div>

    <form class="sticky bottom-20 flex gap-2 bg-paper py-2" @submit.prevent="sendMessage">
      <input
        v-model="draft"
        class="min-h-12 flex-1 rounded-md border border-ink/10 bg-white px-4 text-sm outline-none focus:border-moss"
        placeholder="输入你的考研问题"
      />
      <button
        type="submit"
        class="flex min-h-12 w-12 items-center justify-center rounded-md bg-moss text-white disabled:opacity-50"
        :disabled="isLoading"
        title="发送"
      >
        <Send :size="18" />
      </button>
    </form>
  </section>
</template>
