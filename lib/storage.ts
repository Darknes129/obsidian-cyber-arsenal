import { useSyncExternalStore } from "react";

// Local storage keys with versioning to prevent schema collision
const KEYS = {
  FAVORITES: "obsidian_v1_favorites",
  RECENT: "obsidian_v1_recent",
  SETTINGS: "obsidian_v1_settings",
};

export interface RecentItem {
  slug: string;
  name: string;
  category: string;
  timestamp: number;
}

export interface AppSettings {
  reduceMotion: boolean;
  sidebarCollapsed: boolean;
}

export const DEFAULT_SETTINGS: Readonly<AppSettings> = Object.freeze({
  reduceMotion: false,
  sidebarCollapsed: false,
});

export const EMPTY_ARRAY: ReadonlyArray<never> = Object.freeze([]);

// Snapshot cache to guarantee referential stability for useSyncExternalStore
let cachedFavoritesRaw: string | null = "__UNSET__";
let cachedFavoritesParsed: string[] = EMPTY_ARRAY as unknown as string[];

let cachedRecentRaw: string | null = "__UNSET__";
let cachedRecentParsed: RecentItem[] = EMPTY_ARRAY as unknown as RecentItem[];

let cachedSettingsRaw: string | null = "__UNSET__";
let cachedSettingsParsed: AppSettings = DEFAULT_SETTINGS;

export const storage = {
  // Favorites
  getFavorites(): string[] {
    if (typeof window === "undefined") return EMPTY_ARRAY as unknown as string[];
    try {
      const data = localStorage.getItem(KEYS.FAVORITES);
      if (data === cachedFavoritesRaw) {
        return cachedFavoritesParsed;
      }
      cachedFavoritesRaw = data;
      cachedFavoritesParsed = data ? JSON.parse(data) : (EMPTY_ARRAY as unknown as string[]);
      return cachedFavoritesParsed;
    } catch {
      return EMPTY_ARRAY as unknown as string[];
    }
  },

  isFavorite(slug: string): boolean {
    const favs = this.getFavorites();
    return favs.includes(slug);
  },

  toggleFavorite(slug: string): boolean {
    if (typeof window === "undefined") return false;
    try {
      const favs = this.getFavorites();
      const exists = favs.includes(slug);
      const updated = exists ? favs.filter((s) => s !== slug) : [...favs, slug];
      const serialized = JSON.stringify(updated);
      localStorage.setItem(KEYS.FAVORITES, serialized);
      cachedFavoritesRaw = serialized;
      cachedFavoritesParsed = updated;
      window.dispatchEvent(new Event("obsidian_favorites_updated"));
      return !exists;
    } catch {
      return false;
    }
  },

  clearFavorites(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(KEYS.FAVORITES);
      cachedFavoritesRaw = null;
      cachedFavoritesParsed = EMPTY_ARRAY as unknown as string[];
      window.dispatchEvent(new Event("obsidian_favorites_updated"));
    } catch {
      // ignore
    }
  },

  // Recently Viewed Tools
  getRecent(): RecentItem[] {
    if (typeof window === "undefined") return EMPTY_ARRAY as unknown as RecentItem[];
    try {
      const data = localStorage.getItem(KEYS.RECENT);
      if (data === cachedRecentRaw) {
        return cachedRecentParsed;
      }
      cachedRecentRaw = data;
      cachedRecentParsed = data ? JSON.parse(data) : (EMPTY_ARRAY as unknown as RecentItem[]);
      return cachedRecentParsed;
    } catch {
      return EMPTY_ARRAY as unknown as RecentItem[];
    }
  },

  addRecent(item: Omit<RecentItem, "timestamp">): void {
    if (typeof window === "undefined") return;
    try {
      const list = this.getRecent();
      const filtered = list.filter((i) => i.slug !== item.slug);
      const updated: RecentItem[] = [{ ...item, timestamp: Date.now() }, ...filtered].slice(0, 16);
      const serialized = JSON.stringify(updated);
      localStorage.setItem(KEYS.RECENT, serialized);
      cachedRecentRaw = serialized;
      cachedRecentParsed = updated;
      window.dispatchEvent(new Event("obsidian_recent_updated"));
    } catch {
      // ignore
    }
  },

  clearRecent(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(KEYS.RECENT);
      cachedRecentRaw = null;
      cachedRecentParsed = EMPTY_ARRAY as unknown as RecentItem[];
      window.dispatchEvent(new Event("obsidian_recent_updated"));
    } catch {
      // ignore
    }
  },

  // Settings
  getSettings(): AppSettings {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      if (data === cachedSettingsRaw) {
        return cachedSettingsParsed;
      }
      cachedSettingsRaw = data;
      cachedSettingsParsed = data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
      return cachedSettingsParsed;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  updateSettings(patch: Partial<AppSettings>): AppSettings {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    try {
      const current = this.getSettings();
      const updated = { ...current, ...patch };
      const serialized = JSON.stringify(updated);
      localStorage.setItem(KEYS.SETTINGS, serialized);
      cachedSettingsRaw = serialized;
      cachedSettingsParsed = updated;
      window.dispatchEvent(new Event("obsidian_settings_updated"));
      return updated;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },
};

// Stable subscription helpers for useSyncExternalStore
const subscribeFavorites = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("obsidian_favorites_updated", callback);
  return () => window.removeEventListener("obsidian_favorites_updated", callback);
};

const subscribeRecent = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("obsidian_recent_updated", callback);
  return () => window.removeEventListener("obsidian_recent_updated", callback);
};

const subscribeSettings = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("obsidian_settings_updated", callback);
  return () => window.removeEventListener("obsidian_settings_updated", callback);
};

const getFavoritesSnapshot = () => storage.getFavorites();
const getServerFavoritesSnapshot = () => EMPTY_ARRAY as unknown as string[];

const getRecentSnapshot = () => storage.getRecent();
const getServerRecentSnapshot = () => EMPTY_ARRAY as unknown as RecentItem[];

const getSettingsSnapshot = () => storage.getSettings();
const getServerSettingsSnapshot = () => DEFAULT_SETTINGS;

export function useFavorites(): string[] {
  return useSyncExternalStore(subscribeFavorites, getFavoritesSnapshot, getServerFavoritesSnapshot);
}

export function useFavoritesCount(): number {
  const favorites = useFavorites();
  return favorites.length;
}

export function useIsFavorite(slug: string): boolean {
  const favorites = useFavorites();
  return favorites.includes(slug);
}

export function useRecent(): RecentItem[] {
  return useSyncExternalStore(subscribeRecent, getRecentSnapshot, getServerRecentSnapshot);
}

export function useSettings(): AppSettings {
  return useSyncExternalStore(subscribeSettings, getSettingsSnapshot, getServerSettingsSnapshot);
}

export function useSidebarCollapsed(): boolean {
  const settings = useSettings();
  return settings.sidebarCollapsed;
}
