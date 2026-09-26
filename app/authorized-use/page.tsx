"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from "@/lib/i18n";

export default function AuthorizedUsePage() {
  const { t } = useTranslations("authorizedUse");

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="border-b border-white/6 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            {t("tag")}
          </span>
        </div>
        <div className="flex items-center gap-2.5 mt-1">
          <ShieldCheck className="w-7 h-7 text-emerald-400" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F4F6]">
            {t("title")}
          </h1>
        </div>
        <p className="text-sm text-[#A7A8B3] mt-2 leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      {/* Core Scoping Principle */}
      <section className="p-5 rounded-2xl bg-[#0F1017] border border-white/8 space-y-3">
        <h2 className="text-sm font-semibold text-[#F4F4F6] font-mono uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{t("coreScopingRequirement")}</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#A7A8B3] leading-relaxed">
          {t("coreScopingDesc")}
        </p>
        <ul className="space-y-2 text-xs text-[#F4F4F6] pt-1">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t("scope1")}</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t("scope2")}</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t("scope3")}</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t("scope4")}</span>
          </li>
        </ul>
      </section>

      {/* Boundaries */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-[#F4F4F6] font-mono uppercase tracking-wider">
          {t("prohibitedConduct")}
        </h2>
        <p className="text-xs sm:text-sm text-[#A7A8B3] leading-relaxed">
          {t("prohibitedConductDesc")}
        </p>
      </section>

      {/* Responsible Disclosure */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-[#F4F4F6] font-mono uppercase tracking-wider">
          {t("responsibleDisclosure")}
        </h2>
        <p className="text-xs sm:text-sm text-[#A7A8B3] leading-relaxed">
          {t("responsibleDisclosureDesc")}
        </p>
      </section>

      <div className="pt-4 border-t border-white/6 flex items-center justify-between text-xs font-mono text-[#737582]">
        <Link href="/workflows" className="text-violet-400 hover:underline flex items-center gap-1">
          <span>{t("exploreWorkflows")}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link href="/tools" className="hover:text-white">
          {t("returnToArsenal")}
        </Link>
      </div>
    </div>
  );
}
