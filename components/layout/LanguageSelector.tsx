"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLocale, SupportedLocale } from "@/lib/i18n";

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale, locales, currentLocaleOption } = useLocale();

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: SupportedLocale) => {
    setLocale(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium text-zinc-300 hover:text-white bg-white/4 hover:bg-white/8 border border-white/6 hover:border-violet-500/30 transition-all select-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        title="Select language"
      >
        <Globe className="w-3.5 h-3.5 text-violet-400 shrink-0" />
        <span className="font-semibold">{currentLocaleOption.short}</span>
        <ChevronDown
          className={`w-3 h-3 text-zinc-400 transition-transform duration-150 ${
            isOpen ? "rotate-180 text-violet-300" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Language selection"
          className="absolute right-0 mt-1.5 w-52 rounded-xl bg-[#0F1017] border border-white/10 shadow-2xl shadow-black/80 py-1.5 z-50 animate-fadeIn font-sans overflow-hidden"
        >
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#737582] border-b border-white/6 font-semibold flex items-center justify-between">
            <span>LANGUAGE</span>
            <span className="text-[9px] text-violet-400/80 lowercase">{locale}</span>
          </div>

          <div className="py-1">
            {locales.map((item) => {
              const isSelected = item.code === locale;
              return (
                <button
                  key={item.code}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => handleSelect(item.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors text-left ${
                    isSelected
                      ? "bg-[#181926] text-violet-300 font-medium"
                      : "text-[#A7A8B3] hover:text-white hover:bg-white/4"
                  }`}
                >
                  <span className="truncate">{item.nativeName}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-violet-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
