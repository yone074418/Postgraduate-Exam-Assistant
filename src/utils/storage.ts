const STORAGE_PREFIX = 'kaoyan-ai:';

export type StorageKey =
  | 'userProfile'
  | 'settings'
  | 'chatMessages'
  | 'studyTasks'
  | 'studyPlan'
  | 'schoolRecommendations'
  | 'courseRecommendations'
  | 'reviewRecords';

const fullKey = (key: StorageKey) => `${STORAGE_PREFIX}${key}`;

export function readStorage<T>(key: StorageKey, fallback: T): T {
  const rawValue = localStorage.getItem(fullKey(key));

  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: StorageKey, value: T): void {
  localStorage.setItem(fullKey(key), JSON.stringify(value));
}

export function removeStorage(key: StorageKey): void {
  localStorage.removeItem(fullKey(key));
}

export function clearAppStorage(): void {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(STORAGE_PREFIX))
    .forEach((key) => localStorage.removeItem(key));
}
