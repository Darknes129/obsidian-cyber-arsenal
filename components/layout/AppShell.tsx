"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Boxes,
  FolderGit2,
  GitFork,
  Share2,
  Wrench,
  Star,
  Clock,
  Search,
  ShieldCheck,
  Info,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { ObsidianLogo } from "@/components/brand/ObsidianLogo";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { appConfig } from "@/lib/config";
import { storage, useFavoritesCount, useSidebarCollapsed } from "@/lib/storage";
import { useTranslations } from "@/lib/i18n";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { t } = useTranslations();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Subscribe to storage for favorites count and settings with cached snapshots
  const favoritesCount = useFavoritesCount();
  const isCollapsed = useSidebarCollapsed();

  const getNavLabel = (label: string): string => {
    switch (label) {
      case "Overview":
        return t("nav.overview");
      case "Arsenal":
        return t("nav.arsenal");
      case "Categories":
        return t("nav.categories");
      case "Workflows":
        return t("nav.workflows");
      case "Relationship Map":
        return t("nav.relationshipMap");
      case "Native Utilities":
        return t("nav.nativeUtilities");
      case "Favorites":
        return t("nav.favorites");
      case "Recent":
        return t("nav.recent");
      case "Search":
        return t("nav.search");
      case "Authorized Use":
        return t("nav.authorizedUse");
      case "About":
        return t("nav.about");
      case "Settings":
        return t("nav.settings");
      default:
        return label;
    }
  };

  useEffect(() => {
    // Global keyboard listener: ⌘K or Ctrl+K or / to open search
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen(true);
      } else if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setIsPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  const toggleSidebarCollapse = () => {
    storage.updateSettings({ sidebarCollapsed: !isCollapsed });
  };

  const navIconMap: Record<string, React.ReactNode> = {
    Overview: <LayoutDashboard className="w-4 h-4 shrink-0" />,
    Arsenal: <Boxes className="w-4 h-4 shrink-0" />,
    Categories: <FolderGit2 className="w-4 h-4 shrink-0" />,
    Workflows: <GitFork className="w-4 h-4 shrink-0" />,
    "Relationship Map": <Share2 className="w-4 h-4 shrink-0" />,
    "Native Utilities": <Wrench className="w-4 h-4 shrink-0" />,
    Favorites: <Star className="w-4 h-4 shrink-0" />,
    Recent: <Clock className="w-4 h-4 shrink-0" />,
    Search: <Search className="w-4 h-4 shrink-0" />,
    "Authorized Use": <ShieldCheck className="w-4 h-4 shrink-0" />,
    About: <Info className="w-4 h-4 shrink-0" />,
    Settings: <SlidersHorizontal className="w-4 h-4 shrink-0" />,
  };

  return (
    <div className="min-h-screen bg-[#07070A] text-[#F4F4F6] flex">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={`hidden md:flex flex-col border-r border-white/6 bg-[#0A0A10] transition-all duration-200 z-30 select-none ${
          isCollapsed ? "w-18" : "w-60"
        } sticky top-0 h-screen`}
      >
        {/* Brand Lockup */}
        <div className="h-15 px-4 flex items-center justify-between border-b border-white/6">
          <Link href="/" className="flex items-center gap-3 overflow-hidden group">
            <ObsidianLogo size={28} />
            {!isCollapsed && (
              <div className="min-w-0">
                <span className="font-bold tracking-wider text-base text-[#F4F4F6] font-mono block">
                  {appConfig.name}
                </span>
                <span className="text-[10px] text-[#737582] tracking-wider uppercase font-mono block truncate">
                  {appConfig.subtitle}
                </span>
              </div>
            )}
          </Link>
          <button
            onClick={toggleSidebarCollapse}
            className="p-1 rounded text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label="Toggle sidebar collapse"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Primary Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#545662] px-2 mb-2">
            {!isCollapsed ? t("nav.coreIntelligence") : "·"}
          </div>

          {appConfig.nav.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const translatedLabel = getNavLabel(item.label);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#181926] text-violet-300 border border-violet-500/30"
                    : "text-[#A7A8B3] hover:text-[#F4F4F6] hover:bg-white/4"
                }`}
                title={isCollapsed ? translatedLabel : undefined}
              >
                {navIconMap[item.label] || <Boxes className="w-4 h-4 shrink-0" />}
                {!isCollapsed && (
                  <span className="truncate flex-1">{translatedLabel}</span>
                )}
                {!isCollapsed && item.label === "Favorites" && favoritesCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/6 text-[10px] font-mono uppercase tracking-wider text-[#545662] px-2 mb-2">
            {!isCollapsed ? t("nav.referenceAndSystem") : "·"}
          </div>

          {appConfig.secondaryNav.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const translatedLabel = getNavLabel(item.label);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#181926] text-violet-300 border border-violet-500/30"
                    : "text-[#A7A8B3] hover:text-[#F4F4F6] hover:bg-white/4"
                }`}
                title={isCollapsed ? translatedLabel : undefined}
              >
                {navIconMap[item.label] || <Info className="w-4 h-4 shrink-0" />}
                {!isCollapsed && <span className="truncate">{translatedLabel}</span>}
              </Link>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-white/6 bg-[#08080C] text-[11px] text-[#737582] font-mono flex items-center justify-between">
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>v{appConfig.version}</span>
              </div>
              <span className="text-[10px] text-[#545662]">{t("common.verifiedHub")}</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title={t("common.online")} />
            </div>
          )}
        </div>
      </aside>

      {/* ================= MOBILE DRAWER ================= */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-sm flex">
          <div className="w-72 bg-[#0A0A10] border-r border-white/10 h-full flex flex-col p-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/8">
              <div className="flex items-center gap-2.5">
                <ObsidianLogo size={26} />
                <span className="font-bold text-sm tracking-wider font-mono">
                  {appConfig.name}
                </span>
              </div>
              <button
                onClick={() => setIsMobileNavOpen(false)}
                className="p-1 rounded text-zinc-400 hover:text-white"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-1">
              {appConfig.nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                      ? "bg-[#181926] text-violet-300 border border-violet-500/30"
                      : "text-[#A7A8B3] hover:text-white hover:bg-white/4"
                  }`}
                >
                  {navIconMap[item.label]}
                  <span>{getNavLabel(item.label)}</span>
                </Link>
              ))}

              <div className="pt-4 border-t border-white/6 my-3 text-[10px] font-mono uppercase tracking-wider text-[#545662] px-2">
                {t("nav.system")}
              </div>

              {appConfig.secondaryNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#A7A8B3] hover:text-white"
                >
                  {navIconMap[item.label]}
                  <span>{getNavLabel(item.label)}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileNavOpen(false)} />
        </div>
      )}

      {/* ================= MAIN COLUMN ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-15 border-b border-white/6 bg-[#0A0A10]/80 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="md:hidden p-2 rounded text-zinc-400 hover:text-white hover:bg-white/5"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search Trigger */}
            <button
              type="button"
              onClick={() => setIsPaletteOpen(true)}
              className="flex items-center gap-3 px-3.5 py-1.5 rounded-lg bg-[#11121A] hover:bg-[#151722] border border-white/8 hover:border-violet-500/30 text-xs text-[#737582] hover:text-[#A7A8B3] transition-all w-64 sm:w-80 justify-between text-left"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                <span className="truncate">{t("topbar.searchPlaceholder")}</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[#A7A8B3] border border-white/6 shrink-0">
                {t("topbar.searchShortcut")}
              </kbd>
            </button>
          </div>

          {/* Quick Header Actions: Favorites, Native Utilities, and Language Selector */}
          <div className="flex items-center gap-3">
            <Link
              href="/favorites"
              className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              title={t("nav.favorites")}
              aria-label={t("nav.favorites")}
            >
              <Star className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
              )}
            </Link>

            <Link
              href="/utilities"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-white/4 hover:bg-white/8 border border-white/6 transition-colors"
            >
              <Wrench className="w-3.5 h-3.5 text-pink-400" />
              <span>{t("topbar.nativeUtilities")}</span>
            </Link>

            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>

        {/* Minimal Footer */}
        <footer className="border-t border-white/6 bg-[#08080C] px-6 py-6 text-xs text-[#737582]">
          <div className="max-w-[1500px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ObsidianLogo size={18} />
              <span className="font-mono text-[#F4F4F6] font-semibold">
                {appConfig.name}
              </span>
              <span>— {t("common.statement")}</span>
            </div>

            <div className="flex items-center gap-5 text-[11px] font-mono">
              <Link href="/about" className="hover:text-white transition-colors">
                {t("nav.about")}
              </Link>
              <Link href="/authorized-use" className="hover:text-white transition-colors">
                {t("nav.authorizedUse")}
              </Link>
              <Link href="/workflows" className="hover:text-white transition-colors">
                {t("nav.workflows")}
              </Link>
              <Link href="/settings" className="hover:text-white transition-colors">
                {t("nav.settings")}
              </Link>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Command Palette */}
      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </div>
  );
}
