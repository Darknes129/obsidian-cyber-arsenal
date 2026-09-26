import React from "react";

interface ObsidianLogoProps {
  className?: string;
  size?: number;
}

export function ObsidianLogo({ className = "", size = 28 }: ObsidianLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="obsidian_facet_a" x1="16" y1="2" x2="26" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" stopOpacity="0.9" />
          <stop stopColor="#6D28D9" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="obsidian_facet_b" x1="16" y1="2" x2="6" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A78BFA" stopOpacity="0.8" />
          <stop stopColor="#4C1D95" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="obsidian_facet_c" x1="16" y1="30" x2="28" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF456D" stopOpacity="0.8" />
          <stop stopColor="#9F1239" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="obsidian_facet_core" x1="16" y1="8" x2="16" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.2" />
          <stop stopColor="#0F1017" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Geometric faceted shard */}
      <polygon points="16,2 27,10 23,22 16,30 9,22 5,10" fill="#0A0A10" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" />
      
      {/* Top right facet */}
      <polygon points="16,2 27,10 19,16 16,10" fill="url(#obsidian_facet_a)" />
      
      {/* Top left facet */}
      <polygon points="16,2 5,10 13,16 16,10" fill="url(#obsidian_facet_b)" />

      {/* Central diamond core */}
      <polygon points="16,10 19,16 16,22 13,16" fill="url(#obsidian_facet_core)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.6" />

      {/* Bottom right shard accent */}
      <polygon points="16,22 19,16 23,22 16,30" fill="url(#obsidian_facet_c)" />

      {/* Bottom left facet */}
      <polygon points="16,22 13,16 9,22 16,30" fill="#151722" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.5" />

      {/* Shard interior refraction lines */}
      <line x1="16" y1="2" x2="16" y2="30" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.75" />
      <line x1="5" y1="10" x2="27" y2="10" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" strokeDasharray="1 1" />
    </svg>
  );
}
