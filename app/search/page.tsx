"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, X } from "lucide-react";
import { searchArsenal, filterTools } from "@/lib/tool-search";
import { ToolCard } from "@/components/tools/ToolCard";
import { TOOLS } from "@/data/tools";
import { CATEGORIES } from "@/data/categories";
import { useLocale, useTranslations } from "@/lib/i18n";

function SearchContent() {
  const { locale } = useLocale();
  const { t } = useTranslations("search");
  const { t: tTools } = useTranslations("tools");
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlQuery = searchParams.get("q") || "";
  const urlCategory = searchParams.get("category") || "all";
  const urlPlatform = searchParams.get("platform") || "all";

  const [query, setQuery] = useState(urlQuery);
  const [category, setCategory] = useState(urlCategory);
  const [platform, setPlatform] = useState(urlPlatform);

  // Sync state to URL params for shareable queries
  const handleUpdateQuery = (newQ: string) => {
    setQuery(newQ);
    const params = new URLSearchParams();
    if (newQ.trim()) params.set("q", newQ.trim());
    if (category !== "all") params.set("category", category);
    if (platform !== "all") params.set("platform", platform);
    router.replace(`/search?${params.toString()}`);
  };

  const handleUpdateCategory = (newCat: string) => {
    setCategory(newCat);
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (newCat !== "all") params.set("category", newCat);
    if (platform !== "all") params.set("platform", platform);
    router.replace(`/search?${params.toString()}`);
  };

  const handleUpdatePlatform = (newPlat: string) => {
    setPlatform(newPlat);
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category !== "all") params.set("category", category);
    if (newPlat !== "all") params.set("platform", newPlat);
    router.replace(`/search?${params.toString()}`);
  };

  const matchingTools = useMemo(() => {
    return filterTools(
      TOOLS,
      {
        query,
        category,
        platform,
      },
      locale
    );
  }, [query, category, platform, locale]);

  const crossIndexMatches = useMemo(() => {
    if (!query.trim()) return [];
    return searchArsenal(query, locale).filter((m) => m.type !== "tool");
  }, [query, locale]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/6 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
            {t("tag")}
          </span>
          <span className="text-xs text-[#737582] font-mono">
            {t("countText", { count: matchingTools.length })}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F4F6]">
          {t("title")}
        </h1>
        <p className="text-xs sm:text-sm text-[#A7A8B3] mt-1">
          {t("subtitle")}
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-violet-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleUpdateQuery(e.target.value)}
            placeholder={t("placeholder")}
            className="w-full bg-[#0F1017] border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-xs text-[#F4F4F6] placeholder-[#545662] font-mono focus:outline-none focus:border-violet-500/50"
          />
          {query && (
            <button
              onClick={() => handleUpdateQuery("")}
              className="absolute right-3 top-3 text-zinc-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div>
          <select
            value={category}
            onChange={(e) => handleUpdateCategory(e.target.value)}
            className="w-full bg-[#0F1017] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-[#F4F4F6] font-mono focus:outline-none focus:border-violet-500/50"
            aria-label="Discipline"
          >
            <option value="all">{tTools("allDisciplines")}</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={platform}
            onChange={(e) => handleUpdatePlatform(e.target.value)}
            className="w-full bg-[#0F1017] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-[#F4F4F6] font-mono focus:outline-none focus:border-violet-500/50"
            aria-label="Platform"
          >
            <option value="all">{tTools("allPlatforms")}</option>
            <option value="Linux">Linux</option>
            <option value="macOS">macOS</option>
            <option value="Windows">Windows</option>
            <option value="Docker">Docker</option>
            <option value="Web">Web</option>
          </select>
        </div>
      </div>

      {/* Cross-index matches (Categories, Workflows, Utilities) */}
      {crossIndexMatches.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#737582] font-mono">
            {t("crossIndexTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {crossIndexMatches.map((m, idx) => (
              <Link
                key={idx}
                href={m.url}
                className="p-3 rounded-xl bg-[#11121A] hover:bg-[#151722] border border-white/6 hover:border-violet-500/30 transition-all flex items-center justify-between group"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-white/5 text-violet-300 border border-white/6">
                      {m.badge}
                    </span>
                    <span className="text-xs font-semibold text-[#F4F4F6] truncate">
                      {m.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#737582] truncate">{m.subtitle}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-violet-400 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main matching tools */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#737582] font-mono">
          {t("matchingInstruments", { count: matchingTools.length })}
        </h2>

        {matchingTools.length === 0 ? (
          <div className="p-12 rounded-xl bg-[#0F1017] border border-white/6 text-center space-y-2">
            <p className="text-sm font-semibold text-[#F4F4F6]">{t("noMatches")}</p>
            <p className="text-xs text-[#737582] max-w-sm mx-auto">
              {t("noMatchesDesc")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {matchingTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-zinc-500 font-mono">Loading Search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
