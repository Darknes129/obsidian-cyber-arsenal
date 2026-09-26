"use client";

import React, { createContext, useContext, useEffect, useMemo, useCallback, useSyncExternalStore } from "react";
import en from "@/messages/en.json";
import ptBR from "@/messages/pt-BR.json";
import es from "@/messages/es.json";
import zhCN from "@/messages/zh-CN.json";
import ru from "@/messages/ru.json";
import hi from "@/messages/hi.json";

export type SupportedLocale = "en" | "pt-BR" | "zh-CN" | "ru" | "es" | "hi";

export interface LocaleOption {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  short: string;
}

export const SUPPORTED_LOCALES: LocaleOption[] = [
  { code: "en", name: "English", nativeName: "English", short: "EN" },
  { code: "pt-BR", name: "Portuguese (Brazil)", nativeName: "Português (Brasil)", short: "PT" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "中文（简体）", short: "ZH" },
  { code: "ru", name: "Russian", nativeName: "Русский", short: "RU" },
  { code: "es", name: "Spanish", nativeName: "Español", short: "ES" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", short: "HI" },
];

const DICTIONARIES: Record<SupportedLocale, Record<string, any>> = {
  en,
  "pt-BR": ptBR,
  es,
  "zh-CN": zhCN,
  ru,
  hi,
};

const STORAGE_KEY = "obsidian_locale";

interface I18nContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
  locales: LocaleOption[];
  currentLocaleOption: LocaleOption;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getSavedLocale(): SupportedLocale {
  if (typeof window === "undefined") return "en";
  try {
    // 1. Try localStorage
    const saved = localStorage.getItem(STORAGE_KEY) as SupportedLocale | null;
    if (saved && DICTIONARIES[saved]) {
      return saved;
    }
    // 2. Try cookie
    const match = document.cookie.match(new RegExp(`(?:^|; )${STORAGE_KEY}=([^;]*)`));
    if (match && match[1] && DICTIONARIES[match[1] as SupportedLocale]) {
      return match[1] as SupportedLocale;
    }
  } catch {
    // fallback
  }
  return "en";
}

function subscribeToLocale(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("obsidian_locale_changed", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("obsidian_locale_changed", callback);
  };
}

function getLocaleSnapshot(): SupportedLocale {
  return getSavedLocale();
}

function getServerLocaleSnapshot(): SupportedLocale {
  return "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribeToLocale, getLocaleSnapshot, getServerLocaleSnapshot);

  // Keep html lang attribute in sync
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((newLocale: SupportedLocale) => {
    if (!DICTIONARIES[newLocale]) return;
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.cookie = `${STORAGE_KEY}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      if (typeof document !== "undefined") {
        document.documentElement.lang = newLocale;
      }
      window.dispatchEvent(new CustomEvent("obsidian_locale_changed", { detail: newLocale }));
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback(
    (key: string, variables?: Record<string, string | number>): string => {
      const activeDict = DICTIONARIES[locale] || DICTIONARIES.en;
      const fallbackDict = DICTIONARIES.en;

      const keys = key.split(".");
      let val: any = activeDict;
      for (const k of keys) {
        if (val && typeof val === "object" && k in val) {
          val = val[k];
        } else {
          val = undefined;
          break;
        }
      }

      // If missing in active locale, try English fallback
      if (val === undefined || val === null) {
        let fVal: any = fallbackDict;
        for (const k of keys) {
          if (fVal && typeof fVal === "object" && k in fVal) {
            fVal = fVal[k];
          } else {
            fVal = undefined;
            break;
          }
        }
        val = fVal;
      }

      if (val === undefined || val === null) {
        return key;
      }

      let result = String(val);
      if (variables) {
        for (const [k, v] of Object.entries(variables)) {
          result = result.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        }
      }
      return result;
    },
    [locale]
  );

  const currentLocaleOption = useMemo(() => {
    return SUPPORTED_LOCALES.find((l) => l.code === locale) || SUPPORTED_LOCALES[0];
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      locales: SUPPORTED_LOCALES,
      currentLocaleOption,
    }),
    [locale, setLocale, t, currentLocaleOption]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    // Provide a safe fallback if used outside provider
    return {
      locale: "en",
      setLocale: () => {},
      t: (key: string, vars?: Record<string, string | number>) => {
        const keys = key.split(".");
        let val: any = DICTIONARIES.en;
        for (const k of keys) {
          if (val && typeof val === "object" && k in val) {
            val = val[k];
          } else {
            val = undefined;
            break;
          }
        }
        let res = val !== undefined ? String(val) : key;
        if (vars) {
          for (const [k, v] of Object.entries(vars)) {
            res = res.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
          }
        }
        return res;
      },
      locales: SUPPORTED_LOCALES,
      currentLocaleOption: SUPPORTED_LOCALES[0],
    };
  }
  return context;
}

export function useTranslations(namespace?: string) {
  const { t, locale, setLocale, locales, currentLocaleOption } = useI18n();

  const scopedT = useCallback(
    (key: string, variables?: Record<string, string | number>) => {
      const fullKey = namespace ? `${namespace}.${key}` : key;
      return t(fullKey, variables);
    },
    [t, namespace]
  );

  return {
    t: scopedT,
    locale,
    setLocale,
    locales,
    currentLocaleOption,
  };
}

export function useLocale() {
  const { locale, setLocale, locales, currentLocaleOption } = useI18n();
  return { locale, setLocale, locales, currentLocaleOption };
}
