import { Point } from "./types";

const STORAGE_KEY_PREFIX = "@@window-communication";

export function createKey(windowId: string): string {
  return `${STORAGE_KEY_PREFIX}:${windowId}`;
}

export function subscribeToStorage(callback: () => void): () => void {
  function listener(event: StorageEvent) {
    if (event.key?.startsWith(STORAGE_KEY_PREFIX)) callback();
  }

  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}

export function getWindowCenters(): Record<string, Point> {
  return Object.entries(localStorage).reduce<Record<string, Point>>(
    (acc, [key, value]) => {
      if (!key.startsWith(STORAGE_KEY_PREFIX)) return acc;
      acc[key] = JSON.parse(value);
      return acc;
    },
    {}
  );
}

export function setCenter(windowId: string, position: Point): void {
  const key = createKey(windowId);
  const oldValue = localStorage.getItem(key);
  const newValue = JSON.stringify(position);

  localStorage.setItem(key, newValue);
  window.dispatchEvent(
    new StorageEvent("storage", { key, oldValue, newValue })
  );
}

export function clearCenter(windowId: string): void {
  const key = createKey(windowId);
  const oldValue = localStorage.getItem(key);

  localStorage.removeItem(key);
  window.dispatchEvent(
    new StorageEvent("storage", { key, oldValue, newValue: null })
  );
}
