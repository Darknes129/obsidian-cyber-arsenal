"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { WORKFLOWS } from "@/data/workflows";
import { TOOLS } from "@/data/tools";
import { useTranslations } from "@/lib/i18n";
import { useLocalizedWorkflows } from "@/lib/workflow-content";

export default function WorkflowsPage() {
  const { t } = useTranslations("workflows");
  const workflows = useLocalizedWorkflows(WORKFLOWS);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-white/6 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
            {t("methodologyTag")}
          </span>
          <span className="text-xs text-[#737582] font-mono">
            {t("verifiedSequences", { count: workflows.length })}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F4F6]">
          {t("title")}
        </h1>
        <p className="text-xs sm:text-sm text-[#A7A8B3] mt-1 max-w-3xl">
          {t("subtitle")}
        </p>
      </div>

      {/* Workflows List */}
      <div className="space-y-16">
        {workflows.map((wf, wfIdx) => (
          <article
            key={wf.slug}
            id={wf.slug}
            className="rounded-2xl bg-[#0F1017] border border-white/8 p-6 sm:p-8 space-y-6 shadow-xl scroll-mt-24"
          >
            {/* Title & Metadata */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/6 pb-5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-violet-400 font-semibold">
                  {t("workflowNum", { num: String(wfIdx + 1).padStart(2, "0") })} · {wf.discipline}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#F4F4F6] mt-1">
                  {wf.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#A7A8B3] mt-1 max-w-2xl leading-relaxed">
                  {wf.summary}
                </p>
              </div>

              <div className="text-xs font-mono text-[#737582] shrink-0">
                <span className="px-2.5 py-1 rounded bg-[#181926] border border-white/6 text-zinc-300">
                  {t("sequencedStages", { count: wf.steps.length })}
                </span>
              </div>
            </div>

            {/* Methodology Note */}
            <div className="p-3.5 rounded-xl bg-[#0A0A10] border border-white/4 text-xs text-[#A7A8B3] leading-relaxed flex items-start gap-2">
              <span className="text-violet-400 font-mono font-semibold uppercase text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 shrink-0">
                {t("executionStrategy")}
              </span>
              <span>{wf.methodology}</span>
            </div>

            {/* Step-by-Step Interactive Pipeline */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#737582] font-mono">
                {t("pipelineStages")}
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {wf.steps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="relative p-4 rounded-xl bg-[#11121A] border border-white/6 hover:border-violet-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-violet-300">
                          {step.stage}
                        </span>
                        {step.authorizedScope && (
                          <span className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.2 rounded bg-white/4 border border-white/6 truncate">
                            {step.authorizedScope}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#A7A8B3] leading-relaxed">
                        {step.description}
                      </p>
                      {step.dataOutput && (
                        <div className="text-[11px] font-mono text-emerald-400/90 flex items-center gap-1.5 pt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{t("output")} {step.dataOutput}</span>
                        </div>
                      )}
                    </div>

                    {/* Associated Tools */}
                    <div className="flex flex-wrap items-center gap-2 md:justify-end shrink-0">
                      {step.toolSlugs.map((slug) => {
                        const tool = TOOLS.find((t) => t.slug === slug);
                        if (!tool) return null;
                        return (
                          <Link
                            key={slug}
                            href={`/tools/${tool.slug}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181926] hover:bg-violet-600/20 text-xs font-mono text-[#F4F4F6] hover:text-violet-200 border border-white/8 hover:border-violet-500/30 transition-all"
                          >
                            <span className="font-semibold">{tool.name}</span>
                            <ArrowRight className="w-3 h-3 text-zinc-400" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Defensive Countermeasure & Hardening */}
            {wf.defensiveMitigation && (
              <div className="p-4 rounded-xl bg-[#090A10] border border-emerald-500/20 text-xs text-[#A7A8B3] space-y-1">
                <span className="font-mono font-semibold text-emerald-400 uppercase tracking-wider text-[10px] block">
                  {t("defensiveCountermeasures")}
                </span>
                <p className="leading-relaxed">{wf.defensiveMitigation}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
