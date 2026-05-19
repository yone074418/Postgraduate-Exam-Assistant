import { describe, expect, it } from 'vitest';

import { routes } from './index';

describe('routes', () => {
  it('contains the MVP page routes', () => {
    const routeNames = routes.map((route) => route.name);

    expect(routeNames).toEqual([
      'home',
      'chat',
      'profile',
      'schools',
      'courses',
      'plan',
      'checkin',
      'userCenter',
    ]);
  });
});
