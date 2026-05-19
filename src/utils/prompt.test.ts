import { describe, expect, it } from 'vitest';

import { buildPrompt } from './prompt';

describe('buildPrompt', () => {
  it('includes user profile and official-source warning for school recommendations', () => {
    const prompt = buildPrompt('schoolRecommend', {
      currentStatus: '大三',
      targetMajor: '教育学',
      targetRegion: '上海',
      dailyStudyHours: 5,
    });

    expect(prompt).toContain('教育学');
    expect(prompt).toContain('上海');
    expect(prompt).toContain('冲刺');
    expect(prompt).toContain('学校官网和研招网');
  });

  it('keeps chat prompts concise and actionable', () => {
    const prompt = buildPrompt(
      'chat',
      { targetMajor: '法学', dailyStudyHours: 4 },
      '我现在复习来得及吗？',
    );

    expect(prompt).toContain('法学');
    expect(prompt).toContain('我现在复习来得及吗？');
    expect(prompt).toContain('可执行');
  });
});
