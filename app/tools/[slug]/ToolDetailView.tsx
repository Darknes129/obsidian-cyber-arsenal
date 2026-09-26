"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Check,
  Github,
  Globe,
  BookOpen,
} from "lucide-react";
import { Tool, ToolInstallation } from "@/types/tool";
import { CommandBlock } from "@/components/common/CommandBlock";
import { ToolCard } from "@/components/tools/ToolCard";
import { TOOLS } from "@/data/tools";
import { storage, useIsFavorite } from "@/lib/storage";
import { useTranslations } from "@/lib/i18n";
import { useLocalizedTool } from "@/lib/tool-content";

interface ToolDetailViewProps {
  tool: Tool;
}

function getInitialInstallationTab(installation?: ToolInstallation): string {
  if (!installation) return "linux";
  if (installation.linux && installation.linux.length > 0) return "linux";
  if (installation.pip && installation.pip.length > 0) return "pip";
  if (installation.docker && installation.docker.length > 0) return "docker";
  if (installation.macos && installation.macos.length > 0) return "macos";
  if (installation.windows && installation.windows.length > 0) return "windows";
  if (installation.go && installation.go.length > 0) return "go";
  return "linux";
}

export function ToolDetailView({ tool: initialTool }: ToolDetailViewProps) {
  const tool = useLocalizedTool(initialTool);
  const { t } = useTranslations("toolDetail");
  const { t: tNav } = useTranslations("nav");
  const [activeTab, setActiveTab] = useState<string>(() => getInitialInstallationTab(tool.installation));
  const [activeNav, setActiveNav] = useState<string>("overview");

  // Subscribe to favorite state via stable hook
  const isFav = useIsFavorite(tool.slug);

  // Track recent visit on mount
  useEffect(() => {
    storage.addRecent({
      slug: tool.slug,
      name: tool.name,
      category: tool.primaryCategory,
    });
  }, [tool.slug, tool.name, tool.primaryCategory]);

  const toggleFav = () => {
    storage.toggleFavorite(tool.slug);
  };

  const relatedTools = TOOLS.filter((t) => tool.relatedToolSlugs.includes(t.slug));

  const navSections = [
    { id: "overview", label: t("overview") },
    { id: "capabilities", label: t("keyCapabilities") },
    { id: "installation", label: t("installationAndSetup") },
    { id: "quickstart", label: t("quickStart") },
    ...(tool.commands && tool.commands.length > 0 ? [{ id: "commands", label: t("commandExamples") }] : []),
    ...(tool.outputExplained ? [{ id: "output", label: t("understandingOutput") }] : []),
    ...(tool.troubleshooting && tool.troubleshooting.length > 0 ? [{ id: "troubleshooting", label: t("troubleshooting") }] : []),
    { id: "resources", label: t("officialResources") },
    ...(relatedTools.length > 0 ? [{ id: "related", label: t("relatedArsenalTools") }] : []),
  ];

  return (
    <div className="space-y-8">
      {/* ================= BREADCRUMBS & TOP BAR ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#737582] border-b border-white/6 pb-4">
        <div className="flex items-center gap-2">
          <Link href="/tools" className="hover:text-white transition-colors">
            {tNav("arsenal")}
          </Link>
          <span>/</span>
          <span className="text-violet-400">{tool.primaryCategory}</span>
          <span>/</span>
          <span className="text-[#F4F4F6] font-medium">{tool.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFav}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
          >
            <Star className={`w-3.5 h-3.5 ${isFav ? "fill-amber-400 text-amber-400" : ""}`} />
            <span>{isFav ? t("favorited") : t("favorite")}</span>
          </button>
        </div>
      </div>

      {/* ================= HERO HEADER ================= */}
      <div className="space-y-4">
        {tool.status === "Archived" && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">{t("legacyProject")}</span>
              <span>
                {t("legacyNotice")}
                {tool.successor && (
                  <span className="block mt-1">
                    {t("communitySuccessor")}{" "}
                    <a
                      href={tool.successor.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline font-semibold hover:text-white"
                    >
                      {tool.successor.name} ↗
                    </a>
                  </span>
                )}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">
                {tool.primaryCategory}
              </span>
              <span className="text-xs font-mono uppercase text-[#737582]">
                · {tool.type}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F4F6]">
              {tool.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {tool.urls.official && (
              <a
                href={tool.urls.official}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-violet-600 hover:bg-violet-500 text-white transition-colors shadow-lg shadow-violet-600/20"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{t("officialProject")}</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
              </a>
            )}
            {tool.urls.github && (
              <a
                href={tool.urls.github}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-[#11121A] hover:bg-[#151722] text-[#F4F4F6] border border-white/8 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>{t("githubSource")}</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
              </a>
            )}
          </div>
        </div>

        <p className="text-base text-[#A7A8B3] leading-relaxed max-w-4xl">
          {tool.tagline}
        </p>

        {tool.dualUseNotice && (
          <div className="p-3 rounded-lg bg-[#0F1017] border border-white/6 text-xs text-[#A7A8B3] flex items-center gap-2">
            <span className="font-mono text-rose-400 font-semibold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 shrink-0">
              {t("authorizedUseOnly")}
            </span>
            <span>
              {t("dualUseNotice")}
            </span>
          </div>
        )}
      </div>

      {/* ================= 3-COLUMN DESKTOP LAYOUT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sticky Document Navigation */}
        <nav
          className="hidden lg:block lg:col-span-3 sticky top-20 rounded-xl bg-[#0F1017] border border-white/6 p-4 space-y-1 font-mono text-xs"
          aria-label="Table of Contents"
        >
          <div className="text-[10px] uppercase tracking-wider text-[#545662] px-2 mb-2 font-semibold">
            {t("onThisPage")}
          </div>
          {navSections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={() => setActiveNav(sec.id)}
              className={`block px-2.5 py-1.5 rounded transition-colors ${
                activeNav === sec.id
                  ? "bg-violet-600/20 text-violet-300 font-medium"
                  : "text-[#737582] hover:text-[#F4F4F6] hover:bg-white/4"
              }`}
            >
              {sec.label}
            </a>
          ))}
        </nav>

        {/* Center Column: Main Documentation */}
        <div className="lg:col-span-6 space-y-10 min-w-0">
          {/* Section: Overview */}
          <section id="overview" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg font-bold text-[#F4F4F6] border-b border-white/6 pb-2">
              {t("overview")}
            </h2>
            <p className="text-sm text-[#A7A8B3] leading-relaxed">
              {tool.description}
            </p>

            {tool.useCases.length > 0 && (
              <div className="pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#737582] font-mono mb-2">
                  {t("typicalUseCases")}
                </h3>
                <ul className="space-y-1.5 text-xs text-[#A7A8B3]">
                  {tool.useCases.map((uc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-violet-400 select-none">·</span>
                      <span>{uc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Section: Key Capabilities */}
          <section id="capabilities" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg font-bold text-[#F4F4F6] border-b border-white/6 pb-2">
              {t("keyCapabilities")}
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {tool.capabilities.map((cap, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-[#0F1017] border border-white/6 flex items-start gap-2.5 text-xs text-[#A7A8B3]"
                >
                  <Check className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Installation & Setup */}
          <section id="installation" className="space-y-4 scroll-mt-24">
            <h2 className="text-lg font-bold text-[#F4F4F6] border-b border-white/6 pb-2">
              {t("installationAndSetup")}
            </h2>

            {tool.requirements && tool.requirements.length > 0 && (
              <div className="p-3 rounded-lg bg-[#0B0C12] border border-white/6 text-xs text-[#A7A8B3] font-mono">
                <span className="text-[#F4F4F6] font-semibold block mb-1">
                  {t("systemRequirements")}
                </span>
                <span>{tool.requirements.join(" · ")}</span>
              </div>
            )}

            {tool.installation ? (
              <div className="space-y-3">
                {/* Platform tabs */}
                <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#0A0A10] border border-white/6">
                  {tool.installation.linux && (
                    <button
                      onClick={() => setActiveTab("linux")}
                      className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === "linux" ? "bg-violet-600 text-white font-medium" : "text-[#737582] hover:text-white"
                      }`}
                    >
                      Linux
                    </button>
                  )}
                  {tool.installation.macos && (
                    <button
                      onClick={() => setActiveTab("macos")}
                      className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === "macos" ? "bg-violet-600 text-white font-medium" : "text-[#737582] hover:text-white"
                      }`}
                    >
                      macOS
                    </button>
                  )}
                  {tool.installation.windows && (
                    <button
                      onClick={() => setActiveTab("windows")}
                      className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === "windows" ? "bg-violet-600 text-white font-medium" : "text-[#737582] hover:text-white"
                      }`}
                    >
                      Windows
                    </button>
                  )}
                  {tool.installation.docker && (
                    <button
                      onClick={() => setActiveTab("docker")}
                      className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === "docker" ? "bg-violet-600 text-white font-medium" : "text-[#737582] hover:text-white"
                      }`}
                    >
                      Docker
                    </button>
                  )}
                  {tool.installation.pip && (
                    <button
                      onClick={() => setActiveTab("pip")}
                      className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === "pip" ? "bg-violet-600 text-white font-medium" : "text-[#737582] hover:text-white"
                      }`}
                    >
                      Python / pip
                    </button>
                  )}
                  {tool.installation.go && (
                    <button
                      onClick={() => setActiveTab("go")}
                      className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === "go" ? "bg-violet-600 text-white font-medium" : "text-[#737582] hover:text-white"
                      }`}
                    >
                      Go
                    </button>
                  )}
                </div>

                {/* Tab content */}
                <div>
                  {activeTab === "linux" && tool.installation.linux && (
                    <CommandBlock
                      command={tool.installation.linux.join("\n")}
                      shell="BASH"
                      title={t("linuxInstallTitle")}
                    />
                  )}
                  {activeTab === "macos" && tool.installation.macos && (
                    <CommandBlock
                      command={tool.installation.macos.join("\n")}
                      shell="ZSH"
                      title={t("macosInstallTitle")}
                    />
                  )}
                  {activeTab === "windows" && tool.installation.windows && (
                    <CommandBlock
                      command={tool.installation.windows.join("\n")}
                      shell="CMD / POWERSHELL"
                      title={t("windowsInstallTitle")}
                    />
                  )}
                  {activeTab === "docker" && tool.installation.docker && (
                    <CommandBlock
                      command={tool.installation.docker.join("\n")}
                      shell="BASH"
                      title={t("dockerInstallTitle")}
                    />
                  )}
                  {activeTab === "pip" && tool.installation.pip && (
                    <CommandBlock
                      command={tool.installation.pip.join("\n")}
                      shell="BASH"
                      title={t("pythonInstallTitle")}
                    />
                  )}
                  {activeTab === "go" && tool.installation.go && (
                    <CommandBlock
                      command={tool.installation.go.join("\n")}
                      shell="BASH"
                      title={t("goInstallTitle")}
                    />
                  )}
                </div>

                {tool.installation.notes && (
                  <p className="text-xs text-[#737582] font-mono leading-relaxed pt-1">
                    {t("note")}: {tool.installation.notes}
                  </p>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-[#0F1017] border border-white/6 text-xs text-[#A7A8B3]">
                <p>
                  {t("webServiceNotice")}
                </p>
                {tool.urls.official && (
                  <a
                    href={tool.urls.official}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-violet-400 hover:underline mt-2 font-mono"
                  >
                    <span>{t("visitDocForSetup")}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
          </section>

          {/* Section: Quick Start */}
          {tool.quickStart && (
            <section id="quickstart" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg font-bold text-[#F4F4F6] border-b border-white/6 pb-2">
                {t("quickStart")}
              </h2>
              <CommandBlock
                command={tool.quickStart.command}
                shell={tool.quickStart.shell || "BASH"}
                note={tool.quickStart.note}
              />
            </section>
          )}

          {/* Section: Commands */}
          {tool.commands && tool.commands.length > 0 && (
            <section id="commands" className="space-y-4 scroll-mt-24">
              <h2 className="text-lg font-bold text-[#F4F4F6] border-b border-white/6 pb-2">
                {t("commandExamples")}
              </h2>
              <div className="space-y-4">
                {tool.commands.map((cmd, i) => (
                  <div key={i} className="space-y-1.5">
                    {cmd.description && (
                      <p className="text-xs text-[#A7A8B3]">{cmd.description}</p>
                    )}
                    <CommandBlock
                      command={cmd.command}
                      title={cmd.title}
                      shell={cmd.shell || "BASH"}
                      note={cmd.note}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Understanding Output */}
          {tool.outputExplained && (
            <section id="output" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg font-bold text-[#F4F4F6] border-b border-white/6 pb-2">
                {t("understandingOutput")}
              </h2>
              <div className="p-4 rounded-xl bg-[#0F1017] border border-white/6 text-xs text-[#A7A8B3] leading-relaxed font-mono">
                {tool.outputExplained}
              </div>
            </section>
          )}

          {/* Section: Troubleshooting */}
          {tool.troubleshooting && tool.troubleshooting.length > 0 && (
            <section id="troubleshooting" className="space-y-3 scroll-mt-24">
              <h2 className="text-lg font-bold text-[#F4F4F6] border-b border-white/6 pb-2">
                {t("troubleshooting")}
              </h2>
              <div className="space-y-2">
                {tool.troubleshooting.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-[#0F1017] border border-white/6 text-xs space-y-1"
                  >
                    <span className="font-semibold text-rose-300 block">
                      {t("issue")} {item.issue}
                    </span>
                    <span className="text-[#A7A8B3] block">
                      {t("resolution")} {item.resolution}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Official Resources */}
          <section id="resources" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg font-bold text-[#F4F4F6] border-b border-white/6 pb-2">
              {t("officialResources")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tool.urls.official && (
                <a
                  href={tool.urls.official}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-3 rounded-lg bg-[#0F1017] hover:bg-[#151722] border border-white/6 hover:border-violet-500/30 transition-all flex items-center justify-between text-xs text-[#A7A8B3] hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-violet-400" />
                    <span>{t("website")}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {tool.urls.documentation && (
                <a
                  href={tool.urls.documentation}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-3 rounded-lg bg-[#0F1017] hover:bg-[#151722] border border-white/6 hover:border-violet-500/30 transition-all flex items-center justify-between text-xs text-[#A7A8B3] hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-pink-400" />
                    <span>{t("documentation")}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {tool.urls.github && (
                <a
                  href={tool.urls.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-3 rounded-lg bg-[#0F1017] hover:bg-[#151722] border border-white/6 hover:border-violet-500/30 transition-all flex items-center justify-between text-xs text-[#A7A8B3] hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-zinc-300" />
                    <span>{t("repository")}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </section>

          {/* Section: Related Arsenal */}
          {relatedTools.length > 0 && (
            <section id="related" className="space-y-4 scroll-mt-24 pt-4 border-t border-white/6">
              <h2 className="text-lg font-bold text-[#F4F4F6]">
                {t("relatedArsenalTools")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedTools.map((t) => (
                  <ToolCard key={t.slug} tool={t} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Metadata Panel */}
        <aside
          className="lg:col-span-3 rounded-xl bg-[#0F1017] border border-white/6 p-5 space-y-4 font-mono text-xs"
          aria-label="Instrument Metadata"
        >
          <div className="text-[10px] uppercase tracking-wider text-[#545662] pb-2 border-b border-white/6 font-semibold">
            {t("instrumentTelemetry")}
          </div>

          <div className="space-y-3 text-[11px]">
            <div>
              <span className="text-[#737582] block uppercase text-[10px]">{t("category")}</span>
              <span className="text-[#F4F4F6] font-semibold">{tool.primaryCategory}</span>
            </div>

            <div>
              <span className="text-[#737582] block uppercase text-[10px]">{t("interfaceType")}</span>
              <span className="text-[#F4F4F6] uppercase">{tool.type}</span>
            </div>

            <div>
              <span className="text-[#737582] block uppercase text-[10px]">{t("platforms")}</span>
              <span className="text-[#F4F4F6]">{tool.platforms.join(", ")}</span>
            </div>

            <div>
              <span className="text-[#737582] block uppercase text-[10px]">{t("projectStatus")}</span>
              <span
                className={`font-semibold ${
                  tool.status === "Active" || tool.status === "Maintained"
                    ? "text-emerald-400"
                    : "text-amber-400"
                }`}
              >
                {tool.status}
              </span>
            </div>

            <div>
              <span className="text-[#737582] block uppercase text-[10px]">{t("lastVerified")}</span>
              <span className="text-[#A7A8B3]">{tool.lastVerified}</span>
            </div>

            {tool.tags.length > 0 && (
              <div>
                <span className="text-[#737582] block uppercase text-[10px] mb-1">{t("tags")}</span>
                <div className="flex flex-wrap gap-1 text-[10px] text-[#A7A8B3]">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded bg-white/4 border border-white/6"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
