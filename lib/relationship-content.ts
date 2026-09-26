import { ToolRelationship } from "@/data/relationships";
import { SupportedLocale } from "@/lib/i18n";
import enRels from "@/messages/relationships/en.json";
import ptBRRels from "@/messages/relationships/pt-BR.json";
import zhCNRels from "@/messages/relationships/zh-CN.json";
import ruRels from "@/messages/relationships/ru.json";
import esRels from "@/messages/relationships/es.json";
import hiRels from "@/messages/relationships/hi.json";

const REL_DICTIONARIES: Record<SupportedLocale, Record<string, string>> = {
  en: enRels,
  "pt-BR": ptBRRels,
  "zh-CN": zhCNRels,
  ru: ruRels,
  es: esRels,
  hi: hiRels,
};

/**
 * Returns a relationship object with localized label while keeping canonical IDs and source/target slugs.
 */
export function getLocalizedRelationship(rel: ToolRelationship, locale: SupportedLocale): ToolRelationship {
  const dict = REL_DICTIONARIES[locale] || REL_DICTIONARIES.en;
  const label = dict[rel.id] || REL_DICTIONARIES.en[rel.id] || rel.label;
  return {
    ...rel,
    label,
  };
}

export function getLocalizedRelationships(relationships: ToolRelationship[], locale: SupportedLocale): ToolRelationship[] {
  return relationships.map((r) => getLocalizedRelationship(r, locale));
}
