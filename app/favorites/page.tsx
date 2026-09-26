"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Star, Trash2, Boxes } from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import { TOOLS } from "@/data/tools";
import { storage, useFavorites } from "@/lib/storage";
import { useTranslations } from "@/lib/i18n";

export default function FavoritesPage() {
  const { t } = useTranslations("favorites");
  const favoriteSlugs = useFavorites();

  const favoriteTools = useMemo(() => {
    return TOOLS.filter((t) => favoriteSlugs.includes(t.slug));
  }, [favoriteSlugs]);

  const handleClearAll = () => {
    if (window.confirm(t("confirmClear"))) {
      storage.clearFavorites();
    }
  };

  // Suggested tools if favorites are empty
  const suggestedTools = TOOLS.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/6 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
              {t("tag")}
            </span>
            <span className="text-xs text-[#737582] font-mono">
              {favoriteTools.length === 1
                ? t("countTextSingle")
                : t("countText", { count: favoriteTools.length })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F4F6]">
            {t("title")}
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A8B3] mt-1">
            {t("subtitle")}
          </p>
        </div>

        {favoriteTools.length > 0 && (
          <button
            onClick={handleClearAll}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t("clearAll")}</span>
          </button>
        )}
      </div>

      {/* Favorites List or Empty State */}
      {favoriteTools.length === 0 ? (
        <div className="space-y-8">
          <div className="rounded-2xl bg-[#0F1017] border border-white/8 p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
              <Star className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-semibold text-[#F4F4F6]">
                {t("noFavoritesYet")}
              </h2>
              <p className="text-xs text-[#A7A8B3] max-w-md mx-auto leading-relaxed">
                {t("noFavoritesDesc")}
              </p>
            </div>
            <div>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-colors shadow-lg shadow-violet-600/20"
              >
                <Boxes className="w-3.5 h-3.5" />
                <span>{t("exploreArsenal")}</span>
              </Link>
            </div>
          </div>

          {/* Recommended starters */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#737582] font-mono">
              {t("suggestedToBookmark")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {suggestedTools.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {favoriteTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
