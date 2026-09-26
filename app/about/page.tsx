"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ObsidianLogo } from "@/components/brand/ObsidianLogo";
import { appConfig } from "@/lib/config";
import { useTranslations } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useTranslations("about");
  const { t: tCommon } = useTranslations("common");

  return (
    <div className="space-y-10 max-w-3xl">
      {/* Header */}
      <div className="border-b border-white/6 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
            {t("tag")}
          </span>
          <span className="text-xs text-[#737582] font-mono">
            {t("versionText", { version: appConfig.version })}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <ObsidianLogo size={32} />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F4F6]">
            {t("title", { name: appConfig.name })}
          </h1>
        </div>
        <p className="text-sm text-[#A7A8B3] mt-2 leading-relaxed">
          {tCommon("statement")}
        </p>
      </div>

      {/* Purpose */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-[#F4F4F6] font-mono uppercase tracking-wider">
          {t("missionAndArchitecture")}
        </h2>
        <p className="text-sm text-[#A7A8B3] leading-relaxed">
          {t("missionP1")}
        </p>
        <p className="text-sm text-[#A7A8B3] leading-relaxed">
          {t("missionP2")}
        </p>
      </section>

      {/* Third Party Tool Ownership */}
      <section className="rounded-xl bg-[#0F1017] border border-white/8 p-5 space-y-3">
        <h2 className="text-sm font-semibold text-[#F4F4F6] font-mono uppercase tracking-wider">
          {t("attributionTitle")}
        </h2>
        <p className="text-xs text-[#A7A8B3] leading-relaxed">
          {t("attributionP1")}
        </p>
        <p className="text-xs text-[#A7A8B3] leading-relaxed">
          {t("attributionP2")}
        </p>
      </section>

      {/* Local-First Privacy */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-[#F4F4F6] font-mono uppercase tracking-wider">
          {t("privacyTitle")}
        </h2>
        <p className="text-sm text-[#A7A8B3] leading-relaxed">
          {t("privacyP1")}
        </p>
      </section>

      <div className="pt-4 border-t border-white/6 flex items-center justify-between text-xs font-mono text-[#737582]">
        <Link href="/authorized-use" className="text-violet-400 hover:underline flex items-center gap-1">
          <span>{t("readPolicy")}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link href="/tools" className="hover:text-white">
          {t("returnToArsenal")}
        </Link>
      </div>
    </div>
  );
}
