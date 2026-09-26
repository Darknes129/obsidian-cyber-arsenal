"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, CornerDownLeft, Sparkles } from "lucide-react";
import { searchArsenal } from "@/lib/tool-search";
import { useTranslations } from "@/lib/i18n";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { t } = useTranslations("commandPalette");
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Derive search matches reactively with useMemo
  const results = useMemo(() => {
    if (!query.trim()) {
      return searchArsenal("recon").slice(0, 6);
    }
    return searchArsenal(query);
  }, [query]);

  // Keyboard navigation inside palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results[selectedIndex]) {
          router.push(results[selectedIndex].url);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Palette container */}
      <div className="relative w-full max-w-2xl bg-[#0F1017] border border-white/10 rounded-xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8 bg-[#11121A]">
          <Search className="w-4 h-4 text-violet-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={t("placeholder")}
            className="w-full bg-transparent text-sm text-[#F4F4F6] placeholder-[#737582] focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setSelectedIndex(0);
              }}
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/5"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-white/5 text-[#737582] border border-white/6">
            ESC
          </span>
        </div>

        {/* Results list */}
        <div ref={listRef} className="p-2 overflow-y-auto space-y-1">
          {results.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#737582]">
              <p className="font-medium text-[#A7A8B3] mb-1">{t("noMatches")}</p>
              <p className="text-xs">{t("noMatchesHint")}</p>
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={`${item.type}-${item.title}-${idx}`}
                  type="button"
                  onClick={() => {
                    router.push(item.url);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    isSelected
                      ? "bg-[#181926] border border-violet-500/30 text-white"
                      : "hover:bg-white/4 text-[#A7A8B3] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <div
                      className={`w-7 h-7 rounded flex items-center justify-center shrink-0 text-xs font-mono font-semibold ${
                        isSelected
                          ? "bg-violet-600/30 text-violet-300 border border-violet-500/40"
                          : "bg-white/5 text-zinc-400 border border-white/6"
                      }`}
                    >
                      {item.type === "tool" ? "T" : item.type === "category" ? "C" : item.type === "workflow" ? "W" : "U"}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#F4F4F6] truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-[#A7A8B3] border border-white/6 whitespace-nowrap">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#737582] truncate mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-xs">
                    {isSelected ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-violet-300">
                        {t("open")} <CornerDownLeft className="w-3 h-3" />
                      </span>
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-[#545662]" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 bg-[#090A10] border-t border-white/6 flex items-center justify-between text-[11px] text-[#737582] font-mono">
          <div className="flex items-center gap-3">
            <span>{t("navigate")}</span>
            <span>{t("select")}</span>
            <span>{t("close")}</span>
          </div>
          <div className="flex items-center gap-1.5 text-violet-400/80">
            <Sparkles className="w-3 h-3" />
            <span>{t("coreIndex")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
