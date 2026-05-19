import type { AiRequestPayload } from '@/types';

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

const API_URL = 'https://api.deepseek.com/chat/completions';

/**
 * Sends a prompt to deepseekv4flash through a single frontend service entry.
 */
export async function requestAiCompletion({
  apiKey,
  prompt,
  signal,
}: AiRequestPayload): Promise<string> {
  if (!apiKey.trim()) {
    throw new Error('请先在个人中心设置 API Key');
  }

  const messages: DeepSeekMessage[] = [
    {
      role: 'system',
      content: '你是一个谨慎、温和、务实的考研 AI 助手。',
    },
    {
      role: 'user',
      content: prompt,
    },
  ];

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseekv4flash',
      messages,
      temperature: 0.4,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error('AI 请求失败，请稍后重试');
  }

  const data = (await response.json()) as DeepSeekResponse;
  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error('AI 返回内容为空，请重新生成');
  }

  return content;
}
