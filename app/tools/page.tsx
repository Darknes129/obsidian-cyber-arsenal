"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, RotateCcw, Filter, SlidersHorizontal, Boxes } from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import { TOOLS } from "@/data/tools";
import { CATEGORIES } from "@/data/categories";
import { filterTools } from "@/lib/tool-search";
import { storage } from "@/lib/storage";
import { useLocale, useTranslations } from "@/lib/i18n";

function ToolsContent() {
  const { locale } = useLocale();
  const { t } = useTranslations("tools");
  const { t: tCommon } = useTranslations("common");
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialPlatform = searchParams.get("platform") || "all";
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState(initialPlatform);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "verified" | "favorites">("name-asc");

  const filteredTools = useMemo(() => {
    let result = filterTools(
      TOOLS,
      {
        query: searchQuery,
        category: selectedCategory,
        platform: selectedPlatform,
        type: selectedType,
        status: selectedStatus,
        sortBy: sortBy === "favorites" ? "name-asc" : sortBy,
      },
      locale
    );

    if (sortBy === "favorites") {
      const favSlugs = storage.getFavorites();
      result = [...result].sort((a, b) => {
        const aFav = favSlugs.includes(a.slug);
        const bFav = favSlugs.includes(b.slug);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return a.name.localeCompare(b.name);
      });
    }

    return result;
  }, [searchQuery, selectedCategory, selectedPlatform, selectedType, selectedStatus, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedPlatform("all");
    setSelectedType("all");
    setSelectedStatus("all");
    setSortBy("name-asc");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedPlatform !== "all" ||
    selectedType !== "all" ||
    selectedStatus !== "all" ||
    sortBy !== "name-asc";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/6 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
              {t("inventoryTag")}
            </span>
            <span className="text-xs text-[#737582] font-mono">
              {t("instrumentsCount", { filtered: filteredTools.length, total: TOOLS.length })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F4F6]">
            {t("title")}
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A8B3] mt-1">
            {t("subtitle")}
          </p>
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
            <span>{tCommon("resetFilters")}</span>
          </button>
        )}
      </div>

      {/* Filter and Search Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {/* Search input */}
        <div className="lg:col-span-2 relative">
          <Search className="w-4 h-4 text-violet-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full bg-[#0F1017] border border-white/8 rounded-lg pl-9 pr-3 py-2 text-xs text-[#F4F4F6] placeholder-[#545662] focus:outline-none focus:border-violet-500/40"
          />
        </div>

        {/* Category selector */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#0F1017] border border-white/8 rounded-lg px-3 py-2 text-xs text-[#F4F4F6] focus:outline-none focus:border-violet-500/40"
            aria-label="Filter by Category"
          >
            <option value="all">{t("allDisciplines")}</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Platform selector */}
        <div>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="w-full bg-[#0F1017] border border-white/8 rounded-lg px-3 py-2 text-xs text-[#F4F4F6] focus:outline-none focus:border-violet-500/40"
            aria-label="Filter by Platform"
          >
            <option value="all">{t("allPlatforms")}</option>
            <option value="Linux">Linux</option>
            <option value="macOS">macOS</option>
            <option value="Windows">Windows</option>
            <option value="Docker">Docker</option>
            <option value="Web">Web</option>
          </select>
        </div>

        {/* Type selector */}
        <div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-[#0F1017] border border-white/8 rounded-lg px-3 py-2 text-xs text-[#F4F4F6] focus:outline-none focus:border-violet-500/40"
            aria-label="Filter by Tool Type"
          >
            <option value="all">{t("allInterfaces")}</option>
            <option value="cli">CLI</option>
            <option value="gui">GUI / Desktop</option>
            <option value="web">Web Application</option>
            <option value="api">API Service</option>
            <option value="self-hosted">Self-Hosted</option>
            <option value="framework">Framework</option>
          </select>
        </div>

        {/* Sort selector */}
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-[#0F1017] border border-white/8 rounded-lg px-3 py-2 text-xs text-[#F4F4F6] focus:outline-none focus:border-violet-500/40"
            aria-label="Sort by"
          >
            <option value="name-asc">{t("sortNameAsc")}</option>
            <option value="name-desc">{t("sortNameDesc")}</option>
            <option value="verified">{t("sortVerified")}</option>
            <option value="favorites">{t("sortFavorites")}</option>
          </select>
        </div>
      </div>

      {/* Grid of Tools */}
      {filteredTools.length === 0 ? (
        <div className="rounded-xl bg-[#0F1017] border border-white/6 p-12 text-center space-y-3">
          <Boxes className="w-8 h-8 text-zinc-500 mx-auto" />
          <h3 className="text-sm font-semibold text-[#F4F4F6]">
            {t("noMatchingFound")}
          </h3>
          <p className="text-xs text-[#737582] max-w-sm mx-auto">
            {t("noMatchingDesc")}
          </p>
          <button
            onClick={handleResetFilters}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-violet-600 hover:bg-violet-500 text-white transition-colors"
          >
            <span>{t("resetAllFilters")}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ArsenalPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-zinc-500 font-mono">Loading Arsenal...</div>}>
      <ToolsContent />
    </Suspense>
  );
}
