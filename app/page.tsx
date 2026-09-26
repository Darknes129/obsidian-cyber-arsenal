"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Clock,
  Wrench,
} from "lucide-react";
import { UniversalAnalyzer } from "@/components/analyzer/UniversalAnalyzer";
import { ToolCard } from "@/components/tools/ToolCard";
import { TOOLS } from "@/data/tools";
import { CATEGORIES } from "@/data/categories";
import { WORKFLOWS } from "@/data/workflows";
import { useFavorites, useRecent } from "@/lib/storage";
import { appConfig } from "@/lib/config";
import { useTranslations } from "@/lib/i18n";
import { useLocalizedWorkflows } from "@/lib/workflow-content";

export default function HomePage() {
  const { t } = useTranslations("home");
  const workflows = useLocalizedWorkflows(WORKFLOWS);
  const favoriteSlugs = useFavorites();
  const recentItems = useRecent();

  const favoriteTools = useMemo(() => {
    return TOOLS.filter((t) => favoriteSlugs.includes(t.slug));
  }, [favoriteSlugs]);

  // Suggested tools when favorites is empty
  const defaultQuickPicks = TOOLS.slice(0, 4);

  // Top featured categories
  const featuredCategories = CATEGORIES.slice(0, 6);

  return (
    <div className="space-y-12">
      {/* ================= COMPACT HERO HEADER ================= */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-violet-400 font-semibold px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">
            {appConfig.name} / {t("heroTag")}
          </span>
          <span className="text-xs text-[#737582] font-mono hidden sm:inline">
            · {t("verifiedInstruments")}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F4F6]">
          {t("heroTitle")}
        </h1>

        <p className="text-sm sm:text-base text-[#A7A8B3] max-w-3xl leading-relaxed">
          {t("heroSubtitle")}
        </p>
      </section>

      {/* ================= UNIVERSAL ANALYZER ================= */}
      <section>
        <UniversalAnalyzer />
      </section>

      {/* ================= QUICK ACCESS & RECENT SECTION ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Access (Favorites or Suggested) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#F4F4F6] font-mono">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              <span>
                {t("quickAccess")}{" "}
                {favoriteTools.length > 0 ? `(${favoriteTools.length})` : `· ${t("suggested")}`}
              </span>
            </div>
            <Link
              href="/favorites"
              className="text-xs text-[#737582] hover:text-violet-400 font-mono flex items-center gap-1 transition-colors"
            >
              <span>{t("viewAllFavorites")}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(favoriteTools.length > 0 ? favoriteTools.slice(0, 4) : defaultQuickPicks).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>

        {/* Recently Viewed Tools */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#F4F4F6] font-mono">
              <Clock className="w-4 h-4 text-violet-400" />
              <span>{t("recentlyViewed")}</span>
            </div>
            {recentItems.length > 0 && (
              <Link
                href="/recent"
                className="text-xs text-[#737582] hover:text-violet-400 font-mono flex items-center gap-1 transition-colors"
              >
                <span>{t("history")}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>

          <div className="rounded-xl bg-[#0F1017] border border-white/6 p-3 space-y-2 min-h-[160px] flex flex-col justify-center">
            {recentItems.length === 0 ? (
              <div className="text-center py-6 px-4">
                <p className="text-xs font-medium text-[#A7A8B3] mb-1">{t("noRecentVisits")}</p>
                <p className="text-[11px] text-[#737582]">
                  {t("noRecentVisitsDesc")}
                </p>
              </div>
            ) : (
              recentItems.slice(0, 5).map((item) => (
                <Link
                  key={item.slug}
                  href={`/tools/${item.slug}`}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#141520] hover:bg-[#1A1C2C] border border-white/4 hover:border-violet-500/20 text-xs text-[#A7A8B3] hover:text-white transition-all group"
                >
                  <div className="min-w-0 pr-2">
                    <span className="font-semibold text-[#F4F4F6] block truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-[#737582] font-mono uppercase truncate block">
                      {item.category}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-violet-400 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ================= EXPLORE BY DISCIPLINE ================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#F4F4F6] tracking-tight">
              {t("exploreByDiscipline")}
            </h2>
            <p className="text-xs text-[#737582]">
              {t("exploreByDisciplineDesc")}
            </p>
          </div>
          <Link
            href="/categories"
            className="text-xs text-violet-400 hover:text-violet-300 font-mono flex items-center gap-1 transition-colors shrink-0"
          >
            <span>{t("allDisciplines")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredCategories.map((cat) => {
            const count = TOOLS.filter(
              (t) =>
                t.primaryCategory === cat.name ||
                t.categories.includes(cat.name)
            ).length;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group p-4 rounded-xl bg-[#11121A] border border-white/6 hover:border-violet-500/30 hover:bg-[#151722] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-[#F4F4F6] group-hover:text-violet-300 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] font-mono text-zinc-400 group-hover:text-violet-400">
                      {count === 1 ? t("toolCountSingle") : t("toolCount", { count })}
                    </span>
                  </div>
                  <p className="text-xs text-[#A7A8B3] line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/4 flex items-center justify-between text-[11px] text-[#737582] font-mono">
                  <span>{t("exploreDomain")}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-zinc-500 group-hover:text-violet-400" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ================= FEATURED WORKFLOWS ================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#F4F4F6] tracking-tight">
              {t("featuredWorkflows")}
            </h2>
            <p className="text-xs text-[#737582]">
              {t("featuredWorkflowsDesc")}
            </p>
          </div>
          <Link
            href="/workflows"
            className="text-xs text-violet-400 hover:text-violet-300 font-mono flex items-center gap-1 transition-colors"
          >
            <span>{t("viewAllWorkflows")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workflows.slice(0, 3).map((wf) => (
            <Link
              key={wf.slug}
              href={`/workflows#${wf.slug}`}
              className="p-4 rounded-xl bg-[#11121A] border border-white/6 hover:border-violet-500/30 hover:bg-[#151722] transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400 block mb-1">
                  {wf.discipline}
                </span>
                <h3 className="text-sm font-semibold text-[#F4F4F6] group-hover:text-violet-300 transition-colors mb-2">
                  {wf.title}
                </h3>
                <p className="text-xs text-[#A7A8B3] line-clamp-3 leading-relaxed mb-4">
                  {wf.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-white/4 flex items-center justify-between text-[11px] font-mono text-[#737582]">
                <span>{t("phasesCount", { count: wf.steps.length })}</span>
                <span className="text-violet-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  {t("inspectPipeline")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= NATIVE UTILITIES BAR ================= */}
      <section className="rounded-2xl bg-gradient-to-r from-[#11121A] to-[#151722] border border-white/8 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-pink-400" />
            <h3 className="text-sm font-semibold text-[#F4F4F6] font-mono">
              {t("nativeSafeUtilities")}
            </h3>
          </div>
          <p className="text-xs text-[#A7A8B3] max-w-xl leading-relaxed">
            {t("nativeSafeUtilitiesDesc")}
          </p>
        </div>

        <Link
          href="/utilities"
          className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-colors shrink-0 shadow-lg shadow-violet-600/20 flex items-center gap-2"
        >
          <span>{t("openUtilitySuite")}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>
    </div>
  );
}
