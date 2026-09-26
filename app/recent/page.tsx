"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Trash2, ArrowRight, Boxes } from "lucide-react";
import { storage, useRecent } from "@/lib/storage";
import { useTranslations } from "@/lib/i18n";

export default function RecentPage() {
  const { t } = useTranslations("recent");
  const recentItems = useRecent();
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    const initial = setTimeout(() => setNow(Date.now()), 0);
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => {
      clearTimeout(initial);
      clearInterval(timer);
    };
  }, []);

  const handleClearHistory = () => {
    if (window.confirm(t("confirmClear"))) {
      storage.clearRecent();
    }
  };

  const formatDelta = (deltaMs: number): string => {
    const deltaSec = Math.max(0, Math.floor(deltaMs / 1000));
    if (deltaSec < 60) return t("justNow");
    const deltaMin = Math.floor(deltaSec / 60);
    if (deltaMin < 60) return t("minutesAgo", { count: deltaMin });
    const deltaHour = Math.floor(deltaMin / 60);
    if (deltaHour < 24) return t("hoursAgo", { count: deltaHour });
    const deltaDay = Math.floor(deltaHour / 24);
    return t("daysAgo", { count: deltaDay });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/6 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
              {t("tag")}
            </span>
            <span className="text-xs text-[#737582] font-mono">
              {t("countText", { count: recentItems.length })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F4F6]">
            {t("title")}
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A8B3] mt-1">
            {t("subtitle")}
          </p>
        </div>

        {recentItems.length > 0 && (
          <button
            onClick={handleClearHistory}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t("clearHistory")}</span>
          </button>
        )}
      </div>

      {/* List or Empty State */}
      {recentItems.length === 0 ? (
        <div className="rounded-2xl bg-[#0F1017] border border-white/8 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mx-auto">
            <Clock className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-[#F4F4F6]">
              {t("noHistory")}
            </h2>
            <p className="text-xs text-[#A7A8B3] max-w-md mx-auto leading-relaxed">
              {t("noHistoryDesc")}
            </p>
          </div>
          <div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-colors shadow-lg shadow-violet-600/20"
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>{t("browseCatalog")}</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-[#0F1017] border border-white/6 divide-y divide-white/4 overflow-hidden">
          {recentItems.map((item) => (
            <Link
              key={`${item.slug}-${item.timestamp}`}
              href={`/tools/${item.slug}`}
              className="flex items-center justify-between p-4 hover:bg-[#151722] transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <div className="w-8 h-8 rounded-lg bg-[#181926] border border-white/8 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 group-hover:border-violet-500/30 transition-colors shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#F4F4F6] group-hover:text-violet-300 transition-colors truncate">
                    {item.name}
                  </h3>
                  <span className="text-[11px] font-mono text-[#737582] uppercase truncate block">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 text-xs font-mono">
                <span className="text-[#545662]">
                  {now > 0 ? formatDelta(now - item.timestamp) : t("recently")}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
