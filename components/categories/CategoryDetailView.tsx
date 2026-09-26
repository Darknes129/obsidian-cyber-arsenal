"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, GitFork } from "lucide-react";
import { Category, Tool } from "@/types/tool";
import { Workflow } from "@/types/workflow";
import { ToolCard } from "@/components/tools/ToolCard";
import { useTranslations } from "@/lib/i18n";
import { useLocalizedWorkflows } from "@/lib/workflow-content";

interface CategoryDetailViewProps {
  category: Category;
  categoryTools: Tool[];
  relatedCategories: Category[];
  relevantWorkflows: Workflow[];
}

export function CategoryDetailView({
  category,
  categoryTools,
  relatedCategories,
  relevantWorkflows: initialWorkflows,
}: CategoryDetailViewProps) {
  const { t } = useTranslations("categories");
  const relevantWorkflows = useLocalizedWorkflows(initialWorkflows);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#737582] border-b border-white/6 pb-4">
        <Link href="/categories" className="hover:text-white transition-colors">
          {t("breadcrumb") || "Disciplines"}
        </Link>
        <span>/</span>
        <span className="text-[#F4F4F6] font-medium">{category.name}</span>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-violet-400 font-semibold px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">
            {t("disciplineArchive")}
          </span>
          <span className="text-xs text-[#737582] font-mono">
            · {categoryTools.length === 1 ? t("toolsCountSingle") : t("toolsCount", { count: categoryTools.length })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F4F6]">
          {category.name}
        </h1>

        <p className="text-sm text-[#A7A8B3] max-w-3xl leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Tools Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-[#F4F4F6] font-mono">
          {t("catalogedInstruments", { count: categoryTools.length })}
        </h2>

        {categoryTools.length === 0 ? (
          <div className="p-8 rounded-xl bg-[#0F1017] border border-white/6 text-center text-xs text-[#737582]">
            {t("noInstrumentsTagged")}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </div>

      {/* Relevant Workflows */}
      {relevantWorkflows.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-white/6">
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-violet-400" />
            <h2 className="text-base font-semibold text-[#F4F4F6] font-mono">
              {t("operationalWorkflowsInDiscipline")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relevantWorkflows.map((wf) => (
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
                  <p className="text-xs text-[#A7A8B3] line-clamp-2 leading-relaxed">
                    {wf.summary}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/4 flex items-center justify-between text-[11px] font-mono text-[#737582]">
                  <span>{t("phases", { count: wf.steps.length })}</span>
                  <span className="text-violet-400 group-hover:translate-x-1 transition-transform">
                    {t("inspectPipeline")} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Categories */}
      {relatedCategories.length > 0 && (
        <div className="space-y-3 pt-6 border-t border-white/6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#737582] font-mono">
            {t("complementaryDisciplines")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedCategories.map((rc) => (
              <Link
                key={rc.slug}
                href={`/categories/${rc.slug}`}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#11121A] hover:bg-[#151722] border border-white/6 hover:border-violet-500/30 text-[#A7A8B3] hover:text-white transition-all flex items-center gap-1.5"
              >
                <span>{rc.name}</span>
                <ArrowRight className="w-3 h-3 text-zinc-500" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
