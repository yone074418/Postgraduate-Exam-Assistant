import { afterEach, describe, expect, it } from 'vitest';

import { clearAppStorage, readStorage, writeStorage } from './storage';

describe('storage helpers', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('writes and reads typed values by key', () => {
    writeStorage('userProfile', { targetMajor: '计算机', dailyStudyHours: 6 });

    expect(readStorage('userProfile', null)).toEqual({
      targetMajor: '计算机',
      dailyStudyHours: 6,
    });
  });

  it('returns fallback when stored JSON is invalid', () => {
    localStorage.setItem('kaoyan-ai:userProfile', '{bad json');

    expect(readStorage('userProfile', { targetMajor: '暂无' })).toEqual({
      targetMajor: '暂无',
    });
  });

  it('clears only app namespaced data', () => {
    localStorage.setItem('kaoyan-ai:userProfile', '{}');
    localStorage.setItem('external', 'keep');

    clearAppStorage();

    expect(localStorage.getItem('kaoyan-ai:userProfile')).toBeNull();
    expect(localStorage.getItem('external')).toBe('keep');
  });
});
