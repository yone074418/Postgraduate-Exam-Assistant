<script setup lang="ts">
import { computed, ref } from 'vue';

import { useSettingStore } from '@/stores/settingStore';
import { useUserStore } from '@/stores/userStore';
import { clearAppStorage } from '@/utils/storage';

const userStore = useUserStore();
const settingStore = useSettingStore();
const apiKey = ref(settingStore.settings.apiKey);
const clearMessage = ref('');
const targetSummary = computed(() =>
  userStore.profile.targetMajor
    ? `${userStore.profile.targetRegion || '未定地区'} · ${userStore.profile.targetMajor}`
    : '还没有填写考研信息',
);

function saveApiKey() {
  settingStore.saveApiKey(apiKey.value);
}

function clearData() {
  if (!window.confirm('确定清空本地数据吗？此操作不可恢复。')) {
    return;
  }
  clearAppStorage();
  clearMessage.value = '本地数据已清空，请刷新页面重新开始。';
}
</script>

<template>
  <section class="space-y-5">
    <header>
      <p class="text-sm font-medium text-coral">个人中心</p>
      <h1 class="text-2xl font-semibold text-ink">设置与本地数据</h1>
    </header>

    <article class="rounded-md bg-white p-5 shadow-soft">
      <p class="text-sm text-ink/55">当前目标</p>
      <p class="mt-2 text-lg font-semibold text-ink">{{ targetSummary }}</p>
      <RouterLink
        to="/profile"
        class="mt-4 inline-flex min-h-11 items-center rounded-md bg-moss px-4 text-sm font-semibold text-white"
      >
        修改考研信息
      </RouterLink>
    </article>

    <article class="rounded-md bg-white p-5 shadow-soft">
      <h2 class="text-lg font-semibold text-ink">deepseekv4flash API Key</h2>
      <p class="mt-2 text-sm leading-6 text-ink/60">
        纯前端调用存在 Key 暴露风险，正式上线建议增加后端代理。不要输入身份证号、手机号、住址等敏感信息。
      </p>
      <div class="mt-4 flex gap-2">
        <input
          v-model="apiKey"
          type="password"
          class="min-h-12 flex-1 rounded-md border border-ink/10 px-3"
          placeholder="输入 API Key"
        />
        <button type="button" class="min-h-12 rounded-md bg-ink px-4 font-semibold text-white" @click="saveApiKey">
          保存
        </button>
      </div>
    </article>

    <article class="rounded-md border border-coral/30 bg-white p-5 shadow-soft">
      <h2 class="text-lg font-semibold text-ink">本地数据管理</h2>
      <p class="mt-2 text-sm leading-6 text-ink/60">
        清空前会二次确认，只删除本应用命名空间下的数据。
      </p>
      <button type="button" class="mt-4 min-h-11 rounded-md bg-coral px-4 text-sm font-semibold text-white" @click="clearData">
        清空本地数据
      </button>
      <p v-if="clearMessage" class="mt-3 text-sm text-coral">{{ clearMessage }}</p>
    </article>
  </section>
</template>
