"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FolderGit2 } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { TOOLS } from "@/data/tools";
import { useTranslations } from "@/lib/i18n";

export default function CategoriesPage() {
  const { t } = useTranslations("categories");

  return (
    <div className="space-y-6">
      <div className="border-b border-white/6 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
            {t("taxonomyTag")}
          </span>
          <span className="text-xs text-[#737582] font-mono">
            {t("disciplinesCount", { count: CATEGORIES.length })}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F4F6]">
          {t("title")}
        </h1>
        <p className="text-xs sm:text-sm text-[#A7A8B3] mt-1">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => {
          const categoryTools = TOOLS.filter(
            (t) =>
              t.primaryCategory === cat.name ||
              t.categories.includes(cat.name)
          );

          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="p-5 rounded-xl bg-[#11121A] border border-white/6 hover:border-violet-500/30 hover:bg-[#151722] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="text-sm font-semibold text-[#F4F4F6] group-hover:text-violet-300 transition-colors">
                    {cat.name}
                  </h2>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-[#A7A8B3] border border-white/6">
                    {categoryTools.length === 1 ? t("toolsCountSingle") : t("toolsCount", { count: categoryTools.length })}
                  </span>
                </div>
                <p className="text-xs text-[#A7A8B3] line-clamp-3 leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/4 flex items-center justify-between text-[11px] text-[#737582] font-mono">
                <span className="text-zinc-500 truncate mr-2">
                  {categoryTools.slice(0, 3).map((t) => t.name).join(", ")}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
