import { Tool } from "@/types/tool";
import { SupportedLocale, useLocale } from "@/lib/i18n";
import { useMemo } from "react";
import enTools from "@/messages/tools/en.json";
import ptBRTools from "@/messages/tools/pt-BR.json";
import zhCNTools from "@/messages/tools/zh-CN.json";
import ruTools from "@/messages/tools/ru.json";
import esTools from "@/messages/tools/es.json";
import hiTools from "@/messages/tools/hi.json";

export interface LocalizedToolEditorial {
  tagline: string;
  description: string;
  capabilities?: string[];
  useCases?: string[];
  requirements?: string[];
  installationNotes?: string;
  quickStartNote?: string;
  commands?: {
    title: string;
    description?: string;
    note?: string;
  }[];
  outputExplained?: string;
  troubleshooting?: {
    issue: string;
    resolution: string;
  }[];
}

const TOOL_DICTIONARIES: Record<SupportedLocale, Record<string, LocalizedToolEditorial>> = {
  en: enTools as Record<string, LocalizedToolEditorial>,
  "pt-BR": ptBRTools as Record<string, LocalizedToolEditorial>,
  "zh-CN": zhCNTools as Record<string, LocalizedToolEditorial>,
  ru: ruTools as Record<string, LocalizedToolEditorial>,
  es: esTools as Record<string, LocalizedToolEditorial>,
  hi: hiTools as Record<string, LocalizedToolEditorial>,
};

/**
 * Retrieves the localized editorial content for a tool by slug.
 * Falls back to English if the translation or field is missing.
 */
export function getToolContent(slug: string, locale: SupportedLocale): LocalizedToolEditorial | undefined {
  const dict = TOOL_DICTIONARIES[locale] || TOOL_DICTIONARIES.en;
  return dict[slug] || TOOL_DICTIONARIES.en[slug];
}

/**
 * Merges canonical technical data of a tool with localized human-readable prose.
 * Canonical values (name, slug, commands, URLs, platforms, tags, etc.) remain intact.
 */
export function getLocalizedTool(tool: Tool, locale: SupportedLocale): Tool {
  const content = getToolContent(tool.slug, locale);
  const fallback = TOOL_DICTIONARIES.en[tool.slug];

  if (!content && !fallback) return tool;

  const editorial = content || fallback;

  return {
    ...tool,
    tagline: editorial.tagline || fallback?.tagline || tool.tagline,
    description: editorial.description || fallback?.description || tool.description,
    capabilities: (editorial.capabilities && editorial.capabilities.length > 0)
      ? editorial.capabilities
      : (fallback?.capabilities || tool.capabilities),
    useCases: (editorial.useCases && editorial.useCases.length > 0)
      ? editorial.useCases
      : (fallback?.useCases || tool.useCases),
    requirements: (editorial.requirements && editorial.requirements.length > 0)
      ? editorial.requirements
      : (fallback?.requirements || tool.requirements),
    installation: tool.installation
      ? {
          ...tool.installation,
          notes: editorial.installationNotes !== undefined
            ? editorial.installationNotes
            : (fallback?.installationNotes !== undefined ? fallback.installationNotes : tool.installation.notes),
        }
      : undefined,
    quickStart: tool.quickStart
      ? {
          ...tool.quickStart,
          note: editorial.quickStartNote !== undefined
            ? editorial.quickStartNote
            : (fallback?.quickStartNote !== undefined ? fallback.quickStartNote : tool.quickStart.note),
        }
      : undefined,
    commands: tool.commands?.map((cmd, idx) => {
      const locCmd = editorial.commands?.[idx];
      const fallbackCmd = fallback?.commands?.[idx];
      return {
        ...cmd,
        title: locCmd?.title || fallbackCmd?.title || cmd.title,
        description: locCmd?.description !== undefined
          ? locCmd.description
          : (fallbackCmd?.description !== undefined ? fallbackCmd.description : cmd.description),
        note: locCmd?.note !== undefined
          ? locCmd.note
          : (fallbackCmd?.note !== undefined ? fallbackCmd.note : cmd.note),
      };
    }),
    outputExplained: editorial.outputExplained !== undefined
      ? editorial.outputExplained
      : (fallback?.outputExplained !== undefined ? fallback.outputExplained : tool.outputExplained),
    troubleshooting: tool.troubleshooting?.map((t, idx) => {
      const locT = editorial.troubleshooting?.[idx];
      const fallbackT = fallback?.troubleshooting?.[idx];
      return {
        issue: locT?.issue || fallbackT?.issue || t.issue,
        resolution: locT?.resolution || fallbackT?.resolution || t.resolution,
      };
    }),
  };
}

export function getLocalizedTools(tools: Tool[], locale: SupportedLocale): Tool[] {
  return tools.map((t) => getLocalizedTool(t, locale));
}

/**
 * Hook to resolve a localized tool responsive to the active locale in client components.
 */
export function useLocalizedTool(tool: Tool): Tool {
  const { locale } = useLocale();
  return useMemo(() => getLocalizedTool(tool, locale), [tool, locale]);
}

/**
 * Hook to resolve localized tools responsive to the active locale in client components.
 */
export function useLocalizedTools(tools: Tool[]): Tool[] {
  const { locale } = useLocale();
  return useMemo(() => getLocalizedTools(tools, locale), [tools, locale]);
}

