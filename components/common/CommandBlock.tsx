"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CommandBlockProps {
  command: string;
  title?: string;
  shell?: string;
  note?: string;
  className?: string;
}

export function CommandBlock({
  command,
  title,
  shell = "BASH",
  note,
  className = "",
}: CommandBlockProps) {
  const [copied, setCopied] = useState(false);

  const cleanCommandForCopy = (cmd: string): string => {
    // Strip leading '$ ' or '# ' or '> ' from commands when copying
    return cmd
      .split("\n")
      .map((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("$ ") || trimmed.startsWith("# ") || trimmed.startsWith("> ")) {
          return trimmed.slice(2);
        }
        return line;
      })
      .join("\n");
  };

  const handleCopy = async () => {
    try {
      const textToCopy = cleanCommandForCopy(command);
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div
      className={`rounded-lg overflow-hidden border border-white/8 bg-[#0C0D14] transition-colors ${className}`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#10121C] border-b border-white/6 text-xs">
        <div className="flex items-center gap-2 text-[#A7A8B3]">
          <Terminal className="w-3.5 h-3.5 text-violet-400" />
          {title ? (
            <span className="font-medium text-[#F4F4F6]">{title}</span>
          ) : (
            <span className="font-mono text-[11px] tracking-wider uppercase text-zinc-400">
              {shell}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {title && (
            <span className="font-mono text-[10px] text-[#737582] tracking-wider uppercase">
              {shell}
            </span>
          )}
          <button
            onClick={handleCopy}
            type="button"
            className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono transition-colors bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white"
            aria-label="Copy command"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-zinc-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code body */}
      <div className="p-3 overflow-x-auto text-xs font-mono leading-relaxed text-[#F4F4F6]">
        <pre className="whitespace-pre">{command}</pre>
      </div>

      {/* Optional explanatory footnote */}
      {note && (
        <div className="px-3 py-1.5 bg-[#090A10] border-t border-white/4 text-[11px] text-[#A7A8B3] flex items-center gap-1.5">
          <span className="text-violet-400 select-none">↳</span>
          <span>{note}</span>
        </div>
      )}
    </div>
  );
}
