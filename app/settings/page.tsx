"use client";

import React, { useState } from "react";
import { Trash2, Check, Globe } from "lucide-react";
import { storage, useSettings } from "@/lib/storage";
import { useLocale, useTranslations, SUPPORTED_LOCALES, SupportedLocale } from "@/lib/i18n";

export default function SettingsPage() {
  const { t } = useTranslations("settings");
  const { locale, setLocale } = useLocale();
  const settings = useSettings();
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleToggleReduceMotion = () => {
    const next = !settings.reduceMotion;
    storage.updateSettings({ reduceMotion: next });
    showFeedback(t("feedbackMotion", { status: next ? "enabled" : "disabled" }));
  };

  const handleToggleSidebar = () => {
    const next = !settings.sidebarCollapsed;
    storage.updateSettings({ sidebarCollapsed: next });
    showFeedback(t("feedbackSidebar", { status: next ? "compacted" : "expanded" }));
  };

  const handleClearFavorites = () => {
    if (window.confirm(t("confirmClearFavorites"))) {
      storage.clearFavorites();
      showFeedback(t("feedbackFavoritesCleared"));
    }
  };

  const handleClearHistory = () => {
    if (window.confirm(t("confirmClearHistory"))) {
      storage.clearRecent();
      showFeedback(t("feedbackHistoryCleared"));
    }
  };

  const handleLanguageChange = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
    const target = SUPPORTED_LOCALES.find((l) => l.code === newLocale);
    showFeedback(t("feedbackLanguage", { lang: target?.nativeName || newLocale }));
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="border-b border-white/6 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
            {t("tag")}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F4F6]">
          {t("title")}
        </h1>
        <p className="text-xs sm:text-sm text-[#A7A8B3] mt-1">
          {t("subtitle")}
        </p>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Language Section */}
      <section className="rounded-2xl bg-[#0F1017] border border-white/8 p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/6 pb-3">
          <Globe className="w-4 h-4 text-violet-400" />
          <h2 className="text-sm font-semibold text-[#F4F4F6] font-mono uppercase tracking-wider">
            {t("languageSection")}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-sm font-medium text-[#F4F4F6] block">
              {t("languageLabel")}
            </span>
            <span className="text-xs text-[#737582] block mt-0.5">
              {t("languageDesc")}
            </span>
          </div>

          <select
            value={locale}
            onChange={(e) => handleLanguageChange(e.target.value as SupportedLocale)}
            className="bg-[#11121A] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#F4F4F6] font-mono focus:outline-none focus:border-violet-500/50"
            aria-label={t("languageLabel")}
          >
            {SUPPORTED_LOCALES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.nativeName} ({l.name})
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Interface preferences */}
      <section className="rounded-2xl bg-[#0F1017] border border-white/8 p-6 space-y-6">
        <h2 className="text-sm font-semibold text-[#F4F4F6] font-mono uppercase tracking-wider border-b border-white/6 pb-3">
          {t("displayAndMotion")}
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-sm font-medium text-[#F4F4F6] block">
                {t("reduceMotion")}
              </span>
              <span className="text-xs text-[#737582] block mt-0.5">
                {t("reduceMotionDesc")}
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggleReduceMotion}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${
                settings.reduceMotion ? "bg-violet-600" : "bg-[#181926]"
              }`}
              aria-label={t("reduceMotion")}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.reduceMotion ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/4">
            <div>
              <span className="text-sm font-medium text-[#F4F4F6] block">
                {t("compactSidebar")}
              </span>
              <span className="text-xs text-[#737582] block mt-0.5">
                {t("compactSidebarDesc")}
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggleSidebar}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${
                settings.sidebarCollapsed ? "bg-violet-600" : "bg-[#181926]"
              }`}
              aria-label={t("compactSidebar")}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.sidebarCollapsed ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Local Storage & Session State */}
      <section className="rounded-2xl bg-[#0F1017] border border-white/8 p-6 space-y-6">
        <h2 className="text-sm font-semibold text-[#F4F4F6] font-mono uppercase tracking-wider border-b border-white/6 pb-3">
          {t("localStorageManagement")}
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-sm font-medium text-[#F4F4F6] block">
                {t("clearFavorites")}
              </span>
              <span className="text-xs text-[#737582]">
                {t("clearFavoritesDesc")}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearFavorites}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-white/5 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-300 border border-white/8 transition-colors shrink-0 flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t("clearFavoritesBtn")}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/4">
            <div>
              <span className="text-sm font-medium text-[#F4F4F6] block">
                {t("clearRecent")}
              </span>
              <span className="text-xs text-[#737582]">
                {t("clearRecentDesc")}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearHistory}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-white/5 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-300 border border-white/8 transition-colors shrink-0 flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t("clearRecentBtn")}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
