import { afterEach, describe, expect, it, vi } from 'vitest';

import { requestAiCompletion } from './aiService';

describe('requestAiCompletion', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('uses the official deepseek-v4-flash model id', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '可以，先从基础任务开始。' } }],
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await requestAiCompletion({
      apiKey: 'sk-test',
      prompt: '测试 prompt',
    });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body.model).toBe('deepseek-v4-flash');
    expect(body.stream).toBe(false);
  });

  it('surfaces API error messages instead of a generic failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({
          error: { message: 'Model Not Exist' },
        }),
      }),
    );

    await expect(
      requestAiCompletion({
        apiKey: 'sk-test',
        prompt: '测试 prompt',
      }),
    ).rejects.toThrow('AI 请求失败（400）：Model Not Exist');
  });

  it('gives a clear message when the browser cannot reach the API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));

    await expect(
      requestAiCompletion({
        apiKey: 'sk-test',
        prompt: '测试 prompt',
      }),
    ).rejects.toThrow('无法连接 DeepSeek API');
  });
});
