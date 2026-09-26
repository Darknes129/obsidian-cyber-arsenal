import { TOOLS } from "@/data/tools";
import { CATEGORIES } from "@/data/categories";
import { WORKFLOWS } from "@/data/workflows";
import { Tool } from "@/types/tool";
import { SupportedLocale } from "@/lib/i18n";
import { getLocalizedTool } from "@/lib/tool-content";
import { getLocalizedWorkflow } from "@/lib/workflow-content";

export interface SearchMatch {
  type: "tool" | "category" | "workflow" | "utility";
  title: string;
  subtitle: string;
  url: string;
  badge?: string;
  score: number;
}

export function searchArsenal(rawQuery: string, locale: SupportedLocale = "en"): SearchMatch[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const results: SearchMatch[] = [];

  // Search Tools (matching canonical technical terms and localized editorial text)
  for (const tool of TOOLS) {
    const locTool = getLocalizedTool(tool, locale);
    let score = 0;
    const nameLower = tool.name.toLowerCase();
    const slugLower = tool.slug.toLowerCase();
    const taglineLower = tool.tagline.toLowerCase();
    const descLower = tool.description.toLowerCase();
    const locTaglineLower = locTool.tagline.toLowerCase();
    const locDescLower = locTool.description.toLowerCase();
    const catLower = tool.primaryCategory.toLowerCase();
    const tagsLower = tool.tags.map((t) => t.toLowerCase());
    const capsLower = tool.capabilities.map((c) => c.toLowerCase());
    const locCapsLower = (locTool.capabilities || []).map((c) => c.toLowerCase());

    if (nameLower === query) score += 100;
    else if (nameLower.startsWith(query)) score += 60;
    else if (nameLower.includes(query)) score += 40;

    if (slugLower.includes(query)) score += 30;
    if (taglineLower.includes(query) || locTaglineLower.includes(query)) score += 25;
    if (tagsLower.some((t) => t === query)) score += 35;
    else if (tagsLower.some((t) => t.includes(query))) score += 20;

    if (catLower.includes(query)) score += 15;
    if (capsLower.some((c) => c.includes(query)) || locCapsLower.some((c) => c.includes(query))) score += 15;
    if (descLower.includes(query) || locDescLower.includes(query)) score += 10;

    if (score > 0) {
      results.push({
        type: "tool",
        title: tool.name,
        subtitle: locTool.tagline || tool.tagline,
        url: `/tools/${tool.slug}`,
        badge: tool.primaryCategory,
        score,
      });
    }
  }

  // Search Categories
  for (const cat of CATEGORIES) {
    let score = 0;
    const nameLower = cat.name.toLowerCase();
    const descLower = cat.description.toLowerCase();

    if (nameLower === query) score += 90;
    else if (nameLower.startsWith(query)) score += 50;
    else if (nameLower.includes(query)) score += 30;
    if (descLower.includes(query)) score += 15;

    if (score > 0) {
      results.push({
        type: "category",
        title: cat.name,
        subtitle: cat.description,
        url: `/categories/${cat.slug}`,
        badge: "Discipline",
        score,
      });
    }
  }

  // Search Workflows (matching canonical and localized text)
  for (const wf of WORKFLOWS) {
    const locWf = getLocalizedWorkflow(wf, locale);
    let score = 0;
    const titleLower = wf.title.toLowerCase();
    const summaryLower = wf.summary.toLowerCase();
    const locTitleLower = locWf.title.toLowerCase();
    const locSummaryLower = locWf.summary.toLowerCase();
    const discLower = wf.discipline.toLowerCase();

    if (titleLower.includes(query) || locTitleLower.includes(query)) score += 40;
    if (summaryLower.includes(query) || locSummaryLower.includes(query)) score += 20;
    if (discLower.includes(query)) score += 20;

    if (score > 0) {
      results.push({
        type: "workflow",
        title: locWf.title || wf.title,
        subtitle: locWf.summary || wf.summary,
        url: `/workflows#${wf.slug}`,
        badge: locWf.discipline || wf.discipline,
        score,
      });
    }
  }

  // Search Native Utilities
  const utilities = [
    { title: "Base64 Encoder / Decoder", desc: "Encode and decode Base64 strings locally", id: "base64", keywords: ["base64", "b64", "decode", "encode"] },
    { title: "URL Encoder / Decoder", desc: "Encode or decode URL query and URI components", id: "url-encoder", keywords: ["url", "uri", "percent", "escape"] },
    { title: "JWT Inspector & Claims Decoder", desc: "Decode JWT header and payload claims", id: "jwt-decoder", keywords: ["jwt", "token", "json web token", "bearer"] },
    { title: "Cryptographic Hash Generator", desc: "Compute SHA-256, SHA-384, SHA-512 hashes", id: "hash-generator", keywords: ["hash", "sha256", "sha512", "digest", "checksum"] },
    { title: "UUID v4 Generator", desc: "Generate RFC 4122 compliant UUIDs", id: "uuid-generator", keywords: ["uuid", "guid", "v4", "random id"] },
    { title: "JSON Formatter & Validator", desc: "Prettify, minify, and validate JSON data", id: "json-formatter", keywords: ["json", "format", "prettify", "minify", "lint"] },
    { title: "Unix Timestamp Converter", desc: "Convert epoch timestamps to UTC and human time", id: "timestamp-converter", keywords: ["time", "timestamp", "epoch", "unix", "date"] },
    { title: "Regular Expression Tester", desc: "Test RegExp patterns with flags and matches", id: "regex-tester", keywords: ["regex", "regexp", "pattern", "regular expression"] },
    { title: "IPv4 Subnet & CIDR Calculator", desc: "Calculate network address, broadcast, and host range", id: "subnet-calculator", keywords: ["cidr", "subnet", "ipv4", "mask", "network"] },
  ];

  for (const u of utilities) {
    let score = 0;
    const titleLower = u.title.toLowerCase();
    const descLower = u.desc.toLowerCase();

    if (titleLower.includes(query)) score += 45;
    if (descLower.includes(query)) score += 20;
    if (u.keywords.some((k) => k.includes(query))) score += 30;

    if (score > 0) {
      results.push({
        type: "utility",
        title: u.title,
        subtitle: u.desc,
        url: `/utilities?tool=${u.id}`,
        badge: "Native Utility",
        score,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 12);
}

export function filterTools(
  tools: Tool[],
  options: {
    query?: string;
    category?: string;
    platform?: string;
    type?: string;
    status?: string;
    sortBy?: "name-asc" | "name-desc" | "verified";
  },
  locale: SupportedLocale = "en"
): Tool[] {
  let filtered = [...tools];

  if (options.query && options.query.trim()) {
    const q = options.query.trim().toLowerCase();
    filtered = filtered.filter((t) => {
      const loc = getLocalizedTool(t, locale);
      return (
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        loc.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        loc.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        t.primaryCategory.toLowerCase().includes(q) ||
        t.capabilities.some((c) => c.toLowerCase().includes(q)) ||
        (loc.capabilities || []).some((c) => c.toLowerCase().includes(q))
      );
    });
  }

  if (options.category && options.category !== "all") {
    filtered = filtered.filter(
      (t) =>
        t.primaryCategory.toLowerCase() === options.category?.toLowerCase() ||
        t.categories.some((c) => c.toLowerCase() === options.category?.toLowerCase())
    );
  }

  if (options.platform && options.platform !== "all") {
    filtered = filtered.filter((t) =>
      t.platforms.some((p) => p.toLowerCase() === options.platform?.toLowerCase())
    );
  }

  if (options.type && options.type !== "all") {
    filtered = filtered.filter((t) => t.type === options.type);
  }

  if (options.status && options.status !== "all") {
    filtered = filtered.filter((t) => t.status === options.status);
  }

  // Sort
  if (options.sortBy === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (options.sortBy === "name-desc") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  } else if (options.sortBy === "verified") {
    filtered.sort((a, b) => b.lastVerified.localeCompare(a.lastVerified));
  } else {
    // Default alphabetical
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return filtered;
}
