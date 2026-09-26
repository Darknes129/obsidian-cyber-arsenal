import { Workflow } from "@/types/workflow";
import { SupportedLocale, useLocale } from "@/lib/i18n";
import { useMemo } from "react";
import enWfs from "@/messages/workflows/en.json";
import ptBRWfs from "@/messages/workflows/pt-BR.json";
import zhCNWfs from "@/messages/workflows/zh-CN.json";
import ruWfs from "@/messages/workflows/ru.json";
import esWfs from "@/messages/workflows/es.json";
import hiWfs from "@/messages/workflows/hi.json";

export interface LocalizedWorkflowEditorial {
  title: string;
  discipline: string;
  summary: string;
  description: string;
  methodology: string;
  steps: {
    stage: string;
    description: string;
    dataOutput?: string;
    authorizedScope?: string;
  }[];
  defensiveMitigation?: string;
}

const WORKFLOW_DICTIONARIES: Record<SupportedLocale, Record<string, LocalizedWorkflowEditorial>> = {
  en: enWfs as Record<string, LocalizedWorkflowEditorial>,
  "pt-BR": ptBRWfs as Record<string, LocalizedWorkflowEditorial>,
  "zh-CN": zhCNWfs as Record<string, LocalizedWorkflowEditorial>,
  ru: ruWfs as Record<string, LocalizedWorkflowEditorial>,
  es: esWfs as Record<string, LocalizedWorkflowEditorial>,
  hi: hiWfs as Record<string, LocalizedWorkflowEditorial>,
};

export function getLocalizedWorkflow(workflow: Workflow, locale: SupportedLocale): Workflow {
  const dict = WORKFLOW_DICTIONARIES[locale] || WORKFLOW_DICTIONARIES.en;
  const editorial = dict[workflow.slug] || WORKFLOW_DICTIONARIES.en[workflow.slug];

  if (!editorial) return workflow;

  return {
    ...workflow,
    title: editorial.title || workflow.title,
    discipline: editorial.discipline || workflow.discipline,
    summary: editorial.summary || workflow.summary,
    description: editorial.description || workflow.description,
    methodology: editorial.methodology || workflow.methodology,
    steps: workflow.steps.map((step, idx) => {
      const locStep = editorial.steps?.[idx];
      return {
        ...step,
        stage: locStep?.stage || step.stage,
        description: locStep?.description || step.description,
        dataOutput: locStep?.dataOutput !== undefined ? locStep.dataOutput : step.dataOutput,
        authorizedScope: locStep?.authorizedScope !== undefined ? locStep.authorizedScope : step.authorizedScope,
      };
    }),
    defensiveMitigation: editorial.defensiveMitigation !== undefined
      ? editorial.defensiveMitigation
      : workflow.defensiveMitigation,
  };
}

export function getLocalizedWorkflows(workflows: Workflow[], locale: SupportedLocale): Workflow[] {
  return workflows.map((wf) => getLocalizedWorkflow(wf, locale));
}

export function useLocalizedWorkflow(workflow: Workflow): Workflow {
  const { locale } = useLocale();
  return useMemo(() => getLocalizedWorkflow(workflow, locale), [workflow, locale]);
}

export function useLocalizedWorkflows(workflows: Workflow[]): Workflow[] {
  const { locale } = useLocale();
  return useMemo(() => getLocalizedWorkflows(workflows, locale), [workflows, locale]);
}

