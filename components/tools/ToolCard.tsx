"use client";

import React from "react";
import Link from "next/link";
import { Star, ArrowUpRight, Terminal, Globe, Monitor, Box, Wrench } from "lucide-react";
import { Tool } from "@/types/tool";
import { storage, useIsFavorite } from "@/lib/storage";
import { useTranslations } from "@/lib/i18n";
import { useLocalizedTool } from "@/lib/tool-content";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool: initialTool }: ToolCardProps) {
  const tool = useLocalizedTool(initialTool);
  const { t } = useTranslations("tools");
  const isFav = useIsFavorite(tool.slug);

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    storage.toggleFavorite(tool.slug);
  };

  const getTypeIcon = () => {
    switch (tool.type) {
      case "cli":
        return <Terminal className="w-3.5 h-3.5" />;
      case "web":
      case "api":
        return <Globe className="w-3.5 h-3.5" />;
      case "gui":
      case "desktop":
        return <Monitor className="w-3.5 h-3.5" />;
      case "docker":
      case "self-hosted":
        return <Box className="w-3.5 h-3.5" />;
      default:
        return <Wrench className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="group relative rounded-xl bg-[#11121A] border border-white/6 hover:border-violet-500/30 hover:bg-[#151722] transition-all duration-200 hover:-translate-y-0.5 p-4 flex flex-col justify-between">
      {/* Top row: Name, Type indicator & Favorite star */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/tools/${tool.slug}`} className="flex items-center gap-2 group-hover:text-violet-300 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#181926] border border-white/8 flex items-center justify-center text-zinc-300 group-hover:text-violet-400 group-hover:border-violet-500/30 transition-colors shrink-0">
              {getTypeIcon()}
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold text-[#F4F4F6] tracking-tight group-hover:text-violet-200 transition-colors truncate">
                {tool.name}
              </h3>
              <p className="text-[11px] text-[#737582] uppercase tracking-wider font-mono">
                {tool.primaryCategory}
              </p>
            </div>
          </Link>

          <button
            onClick={toggleFav}
            type="button"
            className="p-1.5 rounded-md text-zinc-500 hover:text-amber-400 hover:bg-white/5 transition-colors shrink-0"
            aria-label={isFav ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
          >
            <Star
              className={`w-4 h-4 transition-transform active:scale-125 ${
                isFav ? "fill-amber-400 text-amber-400" : "text-zinc-500"
              }`}
            />
          </button>
        </div>

        {/* Tagline / concise purpose */}
        <p className="text-xs text-[#A7A8B3] line-clamp-2 leading-relaxed mb-4">
          {tool.tagline}
        </p>
      </div>

      {/* Bottom metadata row: Zero-Pill discipline (clean unboxed text with separators) */}
      <div className="pt-3 border-t border-white/4 flex items-center justify-between text-[11px] text-[#737582]">
        <div className="flex items-center gap-1.5 font-mono truncate mr-2">
          <span className="uppercase text-zinc-400 font-semibold">{tool.type}</span>
          <span aria-hidden="true" className="text-white/20">·</span>
          <span>{tool.platforms.slice(0, 2).join(", ")}</span>
          {tool.dualUseNotice && (
            <>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="text-rose-400/90 font-medium">{t("labAuth")}</span>
            </>
          )}
        </div>

        <Link
          href={`/tools/${tool.slug}`}
          className="flex items-center gap-1 text-xs text-zinc-400 group-hover:text-violet-400 font-mono transition-colors shrink-0"
        >
          <span>{t("docs")}</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
