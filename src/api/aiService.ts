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
const MODEL_ID = 'deepseek-v4-flash';

interface DeepSeekErrorResponse {
  error?: {
    message?: string;
  };
  message?: string;
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as DeepSeekErrorResponse;
    return data.error?.message || data.message || response.statusText || '未知错误';
  } catch {
    return response.statusText || '未知错误';
  }
}

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

  let response: Response;

  try {
    response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages,
        temperature: 0.4,
        stream: false,
      }),
      signal,
    });
  } catch (error) {
    const detail = error instanceof Error ? `：${error.message}` : '';
    throw new Error(`无法连接 DeepSeek API${detail}。请检查网络，或确认浏览器是否允许直接访问该接口。`);
  }

  if (!response.ok) {
    const message = await readErrorMessage(response);
    throw new Error(`AI 请求失败（${response.status}）：${message}`);
  }

  const data = (await response.json()) as DeepSeekResponse;
  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error('AI 返回内容为空，请重新生成');
  }

  return content;
}
