"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  X,
  ExternalLink,
  Wrench,
  Cpu,
  Layers,
} from "lucide-react";
import { analyzeInput, AnalysisResult } from "@/lib/analyzer";
import { TOOLS } from "@/data/tools";
import { useLocale, useTranslations } from "@/lib/i18n";
import { getLocalizedTool } from "@/lib/tool-content";

export function UniversalAnalyzer() {
  const { locale } = useLocale();
  const { t } = useTranslations("analyzer");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [, startTransition] = useTransition();

  const handleInputChange = (val: string) => {
    setInput(val);
    startTransition(() => {
      const res = analyzeInput(val);
      setResult(res);
    });
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
  };

  const handleCopySummary = async () => {
    if (!result) return;
    const text = `OBSIDIAN ANALYZER REPORT
Type: ${result.label}
Confidence: ${result.confidence}
Summary: ${result.summary}
Details: ${JSON.stringify(result.details, null, 2)}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  // Sample quick inputs for instant testing
  const samplePresets = [
    { label: "IP", value: "192.168.1.10" },
    { label: "CIDR", value: "10.0.0.0/24" },
    { label: "Domain", value: "example.org" },
    { label: "Hash", value: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    {
      label: "JWT",
      value:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFuYWx5c3QgT2JzaWRpYW4iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTc1MDAwMDAwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    },
    { label: "JSON", value: '{"action":"scan","targets":["10.0.0.1","10.0.0.2"],"rate":1000}' },
  ];

  return (
    <div className="relative rounded-2xl bg-[#0F1017] border border-white/8 shadow-xl shadow-black/40 overflow-hidden">
      {/* Top Banner with Local Processing Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#11121A] border-b border-white/6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F4F4F6] font-mono">
            {t("title")}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#A7A8B3] font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t("localExecutionBadge")}</span>
        </div>
      </div>

      {/* Main Input Area */}
      <div className="p-5">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            rows={3}
            placeholder={t("placeholder")}
            className="w-full bg-[#08080C] border border-white/10 rounded-xl p-4 text-sm text-[#F4F4F6] placeholder-[#545662] focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 font-mono resize-y transition-all"
          />
          {input && (
            <button
              onClick={handleClear}
              type="button"
              className="absolute top-3 right-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              aria-label={t("clearInput")}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-1 text-xs">
          <span className="text-[11px] text-[#737582] font-mono">{t("quickTestPresets")}</span>
          {samplePresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handleInputChange(preset.value)}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/4 hover:bg-white/8 text-[#A7A8B3] hover:text-white border border-white/6 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Output Section */}
      {result && (
        <div className="border-t border-white/8 bg-[#0C0D14] p-5 animate-fadeIn">
          {/* Header of Analysis */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                {result.label}
              </span>
              <span className="text-[11px] font-mono text-[#737582]">
                {result.confidence}
              </span>
            </div>

            <button
              onClick={handleCopySummary}
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-white/5 hover:bg-white/10 text-[#A7A8B3] hover:text-white border border-white/6 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{t("reportCopied")}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t("copyReport")}</span>
                </>
              )}
            </button>
          </div>

          <p className="text-sm text-[#A7A8B3] mb-4 leading-relaxed">
            {result.summary}
          </p>

          {/* Parsed Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-5 font-mono text-xs">
            {Object.entries(result.details).map(([k, v]) => (
              <div
                key={k}
                className="p-2.5 rounded-lg bg-[#11121A] border border-white/6 flex flex-col justify-between"
              >
                <span className="text-[10px] text-[#737582] uppercase tracking-wider">{k}</span>
                <span className="text-[#F4F4F6] mt-0.5 truncate font-medium">
                  {v === null ? "null" : String(v)}
                </span>
              </div>
            ))}
          </div>

          {/* Contextual Recommendations: Arsenal Tools & Native Utilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-white/6">
            {/* Recommended Arsenal Tools */}
            {result.recommendedToolSlugs.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F4F4F6] mb-2 font-mono">
                  <Cpu className="w-3.5 h-3.5 text-violet-400" />
                  <span>{t("recommendedArsenalTools")}</span>
                </div>
                <div className="space-y-1.5">
                  {result.recommendedToolSlugs.map((slug) => {
                    const tool = TOOLS.find((t) => t.slug === slug);
                    if (!tool) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/tools/${tool.slug}`}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#141520] hover:bg-[#1A1C2C] border border-white/6 hover:border-violet-500/30 transition-all text-xs text-[#A7A8B3] hover:text-white group"
                      >
                        <div className="min-w-0 pr-2">
                          <span className="font-semibold text-[#F4F4F6] block truncate">
                            {tool.name}
                          </span>
                          <span className="text-[11px] text-[#737582] truncate block">
                            {tool.tagline}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-violet-400 shrink-0 transition-transform group-hover:translate-x-1" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recommended Native Utilities */}
            {result.recommendedUtilityUrls.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F4F4F6] mb-2 font-mono">
                  <Wrench className="w-3.5 h-3.5 text-pink-400" />
                  <span>{t("executeInNativeUtilities")}</span>
                </div>
                <div className="space-y-1.5">
                  {result.recommendedUtilityUrls.map((u) => (
                    <Link
                      key={u.name}
                      href={u.href}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#141520] hover:bg-[#1A1C2C] border border-white/6 hover:border-pink-500/30 transition-all text-xs text-[#A7A8B3] hover:text-white group"
                    >
                      <div>
                        <span className="font-semibold text-[#F4F4F6] block">
                          {u.name}
                        </span>
                        <span className="text-[11px] text-[#737582]">
                          {t("instantLocalProcessing")}
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-pink-400 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
