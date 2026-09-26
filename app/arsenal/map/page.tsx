"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Filter } from "lucide-react";
import { TOOL_RELATIONSHIPS } from "@/data/relationships";
import { TOOLS } from "@/data/tools";
import { useLocale, useTranslations } from "@/lib/i18n";
import { getLocalizedRelationships } from "@/lib/relationship-content";
import { useLocalizedTool } from "@/lib/tool-content";

export default function RelationshipMapPage() {
  const { locale } = useLocale();
  const { t } = useTranslations("relationshipMap");
  const { t: tDetail } = useTranslations("toolDetail");
  const [selectedToolSlug, setSelectedToolSlug] = useState<string>("nmap");
  const [relationFilter, setRelationFilter] = useState<string>("all");

  const rawSelectedTool = useMemo(
    () => TOOLS.find((t) => t.slug === selectedToolSlug) || TOOLS[0],
    [selectedToolSlug]
  );
  const selectedTool = useLocalizedTool(rawSelectedTool);

  const localizedRelationships = useMemo(
    () => getLocalizedRelationships(TOOL_RELATIONSHIPS, locale),
    [locale]
  );

  // Filtered relationships
  const activeRelationships = useMemo(() => {
    if (relationFilter === "all") return localizedRelationships;
    return localizedRelationships.filter((r) => r.type === relationFilter);
  }, [relationFilter, localizedRelationships]);

  // Connected nodes to selected tool
  const connectedRelations = useMemo(() => {
    return activeRelationships.filter(
      (r) => r.source === selectedToolSlug || r.target === selectedToolSlug
    );
  }, [activeRelationships, selectedToolSlug]);

  const connectedToolSlugs = useMemo(() => {
    const set = new Set<string>();
    connectedRelations.forEach((r) => {
      set.add(r.source);
      set.add(r.target);
    });
    return Array.from(set);
  }, [connectedRelations]);

  // Curate nodes to display in interactive matrix / network
  const allReferencedSlugs = useMemo(() => {
    const set = new Set<string>();
    activeRelationships.forEach((r) => {
      set.add(r.source);
      set.add(r.target);
    });
    return Array.from(set);
  }, [activeRelationships]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/6 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
              {t("topologyTag")}
            </span>
            <span className="text-xs text-[#737582] font-mono">
              {t("stats", { nodes: allReferencedSlugs.length, handoffs: TOOL_RELATIONSHIPS.length })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F4F6]">
            {t("title")}
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A8B3] mt-1 max-w-2xl">
            {t("subtitle")}
          </p>
        </div>

        {/* Filter by relationship type */}
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-3.5 h-3.5 text-zinc-400" />
          <select
            value={relationFilter}
            onChange={(e) => setRelationFilter(e.target.value)}
            className="bg-[#0F1017] border border-white/8 rounded-lg px-3 py-1.5 text-xs text-[#F4F4F6] font-mono focus:outline-none focus:border-violet-500/40"
            aria-label="Filter relationship types"
          >
            <option value="all">{t("allLinkTypes")}</option>
            <option value="workflow_step">{t("workflowStep")}</option>
            <option value="complementary">{t("complementary")}</option>
            <option value="alternative">{t("alternative")}</option>
          </select>
        </div>
      </div>

      {/* Main Interactive Grid & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Node Matrix / Topology Visualizer */}
        <div className="lg:col-span-8 rounded-2xl bg-[#0F1017] border border-white/8 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#737582] border-b border-white/6 pb-3">
            <span>{t("clickNodeHint")}</span>
            <span className="text-violet-400">
              {t("activeHandoffsFor", { count: connectedRelations.length, tool: selectedTool.name })}
            </span>
          </div>

          {/* Interactive Node Matrix */}
          <div className="flex flex-wrap gap-2">
            {allReferencedSlugs.map((slug) => {
              const tool = TOOLS.find((t) => t.slug === slug);
              if (!tool) return null;

              const isSelected = slug === selectedToolSlug;
              const isConnected = connectedToolSlugs.includes(slug);

              return (
                <button
                  key={slug}
                  onClick={() => setSelectedToolSlug(slug)}
                  type="button"
                  className={`px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 border ${
                    isSelected
                      ? "bg-violet-600 text-white border-violet-400 shadow-lg shadow-violet-600/30 font-semibold scale-105 z-10"
                      : isConnected
                      ? "bg-[#181926] text-violet-300 border-violet-500/40"
                      : "bg-[#11121A] text-[#737582] border-white/6 hover:text-white hover:border-white/20"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                  <span>{tool.name}</span>
                </button>
              );
            })}
          </div>

          {/* Connected Edges Visual Flow */}
          <div className="space-y-3 pt-4 border-t border-white/6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#737582] font-mono">
              {t("inspector")} ({connectedRelations.length})
            </h3>

            {connectedRelations.length === 0 ? (
              <p className="text-xs text-[#737582] font-mono py-2">
                {t("noActiveConnections")}
              </p>
            ) : (
              <div className="space-y-2">
                {connectedRelations.map((rel) => {
                  const sourceTool = TOOLS.find((t) => t.slug === rel.source);
                  const targetTool = TOOLS.find((t) => t.slug === rel.target);
                  if (!sourceTool || !targetTool) return null;

                  return (
                    <div
                      key={rel.id}
                      className="p-3 rounded-xl bg-[#11121A] border border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedToolSlug(sourceTool.slug)}
                          className={`font-semibold hover:underline ${
                            sourceTool.slug === selectedToolSlug ? "text-violet-300" : "text-[#F4F4F6]"
                          }`}
                        >
                          {sourceTool.name}
                        </button>
                        <span className="text-[#545662]">→</span>
                        <button
                          onClick={() => setSelectedToolSlug(targetTool.slug)}
                          className={`font-semibold hover:underline ${
                            targetTool.slug === selectedToolSlug ? "text-violet-300" : "text-[#F4F4F6]"
                          }`}
                        >
                          {targetTool.name}
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#A7A8B3]">{rel.label}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded uppercase ${
                            rel.type === "workflow_step"
                              ? "bg-violet-500/10 text-violet-300 border border-violet-500/20"
                              : rel.type === "alternative"
                              ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                              : "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                          }`}
                        >
                          {rel.type.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Selected Tool Inspector Panel */}
        <div className="lg:col-span-4 rounded-2xl bg-[#0F1017] border border-white/8 p-6 space-y-5 shadow-xl sticky top-20">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-violet-400 font-semibold">
              {t("inspector")}
            </span>
            <h2 className="text-xl font-bold text-[#F4F4F6]">
              {selectedTool.name}
            </h2>
            <p className="text-xs text-[#737582] font-mono uppercase">
              {selectedTool.primaryCategory} · {selectedTool.type}
            </p>
          </div>

          <p className="text-xs text-[#A7A8B3] leading-relaxed">
            {selectedTool.tagline}
          </p>

          <div className="p-3.5 rounded-xl bg-[#11121A] border border-white/6 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-[#737582]">{tDetail("platforms")}:</span>
              <span className="text-[#F4F4F6]">{selectedTool.platforms.join(", ")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#737582]">{tDetail("projectStatus")}:</span>
              <span className="text-emerald-400">{selectedTool.status}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#737582]">{tDetail("lastVerified")}:</span>
              <span className="text-zinc-400">{selectedTool.lastVerified}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              href={`/tools/${selectedTool.slug}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-colors shadow-lg shadow-violet-600/20"
            >
              <span>{t("inspectTool")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {selectedTool.urls.official && (
              <a
                href={selectedTool.urls.official}
                target="_blank"
                rel="noreferrer noopener"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#11121A] hover:bg-[#151722] text-[#A7A8B3] hover:text-white border border-white/8 text-xs font-mono transition-colors"
              >
                <span>{tDetail("officialProject")}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
